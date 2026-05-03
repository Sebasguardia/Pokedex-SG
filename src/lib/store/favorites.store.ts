// ─────────────────────────────────────────────────────────────────────────────
// FAVORITES STORE — Zustand + localStorage
// ─────────────────────────────────────────────────────────────────────────────

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
    FavoritePokemon, FavoriteCollection, FavoritesSortKey, FavoritesFilterState,
} from "@/types/api/favorites.types";
import {
    DEFAULT_COLLECTION, DEFAULT_COLLECTION_ID, DEFAULT_FILTER_STATE,
    generateId, favoritesToExportJSON, importFromJSON as parseImportJSON, MAX_FAVORITES,
} from "@/lib/constants/favorites/favorites.constants";

// ── Tipo adicional para el pokemon de entrada (sin los campos de favorito) ────
export type FavoritePokemonInput = Omit<FavoritePokemon,
    "addedAt" | "note" | "tags" | "rating" | "collectionIds" | "isHighlighted">;

interface FavoritesStore {
    // ── Datos ────────────────────────────────────────────────────────────────
    favorites:    FavoritePokemon[];
    collections:  FavoriteCollection[];

    // ── UI State ─────────────────────────────────────────────────────────────
    activeCollectionId: string | null;
    viewMode:           "grid" | "list" | "album";
    sortBy:             FavoritesSortKey;
    sortDirection:      "asc" | "desc";
    filterState:        FavoritesFilterState;
    selectedIds:        number[];
    isSelectionMode:    boolean;

    // ── CRUD favoritos ────────────────────────────────────────────────────────
    addFavorite:     (pokemon: FavoritePokemonInput) => void;
    removeFavorite:  (pokemonId: number) => void;
    toggleFavorite:  (pokemon: FavoritePokemonInput) => boolean;
    isFavorite:      (pokemonId: number) => boolean;
    updateNote:      (pokemonId: number, note: string) => void;
    updateRating:    (pokemonId: number, rating: number) => void;
    addTag:          (pokemonId: number, tag: string) => void;
    removeTag:       (pokemonId: number, tag: string) => void;
    toggleHighlight: (pokemonId: number) => void;
    clearFavorites:  () => void;

    // ── CRUD colecciones ──────────────────────────────────────────────────────
    createCollection:      (name: string, description?: string, color?: string, icon?: string) => string;
    updateCollection:      (id: string, updates: Partial<FavoriteCollection>) => void;
    deleteCollection:      (id: string) => void;
    addToCollection:       (pokemonId: number, collectionId: string) => void;
    removeFromCollection:  (pokemonId: number, collectionId: string) => void;

    // ── Acciones en masa ──────────────────────────────────────────────────────
    toggleSelect:        (pokemonId: number) => void;
    selectAll:           () => void;
    clearSelection:      () => void;
    bulkAddToCollection: (collectionId: string) => void;
    bulkRemove:          () => void;
    bulkSetRating:       (rating: number) => void;

    // ── UI controls ───────────────────────────────────────────────────────────
    setViewMode:          (mode: "grid" | "list" | "album") => void;
    setSortBy:            (key: FavoritesSortKey, direction?: "asc" | "desc") => void;
    setFilter:            (filter: Partial<FavoritesFilterState>) => void;
    clearFilters:         () => void;
    setActiveCollection:  (id: string | null) => void;
    setSelectionMode:     (on: boolean) => void;

    // ── Import / Export ───────────────────────────────────────────────────────
    exportToJSON:    () => string;
    importFromJSON:  (json: string, mode: "merge" | "replace") => { success: boolean; error?: string };
}

export const useFavoritesStore = create<FavoritesStore>()(
    persist(
        (set, get) => ({
            // ── Estado inicial ────────────────────────────────────────────────
            favorites:          [],
            collections:        [DEFAULT_COLLECTION],
            activeCollectionId: null,
            viewMode:           "grid",
            sortBy:             "addedAt",
            sortDirection:      "desc",
            filterState:        DEFAULT_FILTER_STATE,
            selectedIds:        [],
            isSelectionMode:    false,

            // ── CRUD favoritos ────────────────────────────────────────────────
            addFavorite: (pokemon) => {
                if (get().favorites.length >= MAX_FAVORITES) return;
                if (get().isFavorite(pokemon.id)) return;
                const newFav: FavoritePokemon = {
                    ...pokemon,
                    types:         pokemon.types ?? [],
                    baseStats:     pokemon.baseStats ?? { hp: 0, attack: 0, defense: 0, specialAttack: 0, specialDefense: 0, speed: 0 },
                    bst:           pokemon.bst ?? 0,
                    generation:    pokemon.generation ?? 1,
                    addedAt:       Date.now(),
                    note:          "",
                    tags:          [],
                    rating:        0,
                    collectionIds: [],
                    isHighlighted: false,
                };
                set((s) => ({ favorites: [...s.favorites, newFav] }));
            },

            removeFavorite: (pokemonId) =>
                set((s) => ({
                    favorites: s.favorites.filter((f) => f.id !== pokemonId),
                    // También limpiar de las colecciones
                    collections: s.collections.map((c) => ({
                        ...c,
                        pokemonIds: c.pokemonIds.filter((id) => id !== pokemonId),
                    })),
                })),

            toggleFavorite: (pokemon) => {
                if (get().isFavorite(pokemon.id)) {
                    get().removeFavorite(pokemon.id);
                    return false;
                } else {
                    get().addFavorite(pokemon);
                    return true;
                }
            },

            isFavorite: (pokemonId) =>
                get().favorites.some((f) => f.id === pokemonId),

            updateNote: (pokemonId, note) =>
                set((s) => ({
                    favorites: s.favorites.map((f) =>
                        f.id === pokemonId ? { ...f, note } : f
                    ),
                })),

            updateRating: (pokemonId, rating) =>
                set((s) => ({
                    favorites: s.favorites.map((f) =>
                        f.id === pokemonId ? { ...f, rating } : f
                    ),
                })),

            addTag: (pokemonId, tag) => {
                const trimmed = tag.trim().toLowerCase().slice(0, 24);
                if (!trimmed) return;
                set((s) => ({
                    favorites: s.favorites.map((f) => {
                        if (f.id !== pokemonId) return f;
                        if (f.tags.includes(trimmed) || f.tags.length >= 10) return f;
                        return { ...f, tags: [...f.tags, trimmed] };
                    }),
                }));
            },

            removeTag: (pokemonId, tag) =>
                set((s) => ({
                    favorites: s.favorites.map((f) =>
                        f.id === pokemonId
                            ? { ...f, tags: f.tags.filter((t) => t !== tag) }
                            : f
                    ),
                })),

            toggleHighlight: (pokemonId) =>
                set((s) => ({
                    favorites: s.favorites.map((f) =>
                        f.id === pokemonId ? { ...f, isHighlighted: !f.isHighlighted } : f
                    ),
                })),

            clearFavorites: () =>
                set({
                    favorites:   [],
                    collections: [DEFAULT_COLLECTION],
                    selectedIds: [],
                }),

            // ── CRUD colecciones ──────────────────────────────────────────────
            createCollection: (name, description = "", color = "#CC0000", icon = "Star") => {
                const id = generateId();
                const newCol: FavoriteCollection = {
                    id, name, description, color, icon,
                    pokemonIds: [],
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                    isDefault: false,
                };
                set((s) => ({ collections: [...s.collections, newCol] }));
                return id;
            },

            updateCollection: (id, updates) =>
                set((s) => ({
                    collections: s.collections.map((c) =>
                        c.id === id ? { ...c, ...updates, updatedAt: Date.now() } : c
                    ),
                })),

            deleteCollection: (id) => {
                if (id === DEFAULT_COLLECTION_ID) return;
                set((s) => ({
                    collections: s.collections.filter((c) => c.id !== id),
                    favorites: s.favorites.map((f) => ({
                        ...f,
                        collectionIds: f.collectionIds.filter((cid) => cid !== id),
                    })),
                    activeCollectionId:
                        s.activeCollectionId === id ? null : s.activeCollectionId,
                }));
            },

            addToCollection: (pokemonId, collectionId) => {
                set((s) => ({
                    collections: s.collections.map((c) =>
                        c.id === collectionId && !c.pokemonIds.includes(pokemonId)
                            ? { ...c, pokemonIds: [...c.pokemonIds, pokemonId], updatedAt: Date.now() }
                            : c
                    ),
                    favorites: s.favorites.map((f) =>
                        f.id === pokemonId && !f.collectionIds.includes(collectionId)
                            ? { ...f, collectionIds: [...f.collectionIds, collectionId] }
                            : f
                    ),
                }));
            },

            removeFromCollection: (pokemonId, collectionId) =>
                set((s) => ({
                    collections: s.collections.map((c) =>
                        c.id === collectionId
                            ? { ...c, pokemonIds: c.pokemonIds.filter((id) => id !== pokemonId), updatedAt: Date.now() }
                            : c
                    ),
                    favorites: s.favorites.map((f) =>
                        f.id === pokemonId
                            ? { ...f, collectionIds: f.collectionIds.filter((cid) => cid !== collectionId) }
                            : f
                    ),
                })),

            // ── Acciones en masa ──────────────────────────────────────────────
            toggleSelect: (pokemonId) =>
                set((s) => ({
                    selectedIds: s.selectedIds.includes(pokemonId)
                        ? s.selectedIds.filter((id) => id !== pokemonId)
                        : [...s.selectedIds, pokemonId],
                })),

            selectAll: () => {
                const allIds = get().favorites.map((f) => f.id);
                set({ selectedIds: allIds });
            },

            clearSelection: () => set({ selectedIds: [] }),

            bulkAddToCollection: (collectionId) => {
                const { selectedIds } = get();
                selectedIds.forEach((id) => get().addToCollection(id, collectionId));
            },

            bulkRemove: () => {
                const { selectedIds } = get();
                selectedIds.forEach((id) => get().removeFavorite(id));
                set({ selectedIds: [], isSelectionMode: false });
            },

            bulkSetRating: (rating) => {
                const { selectedIds } = get();
                set((s) => ({
                    favorites: s.favorites.map((f) =>
                        selectedIds.includes(f.id) ? { ...f, rating } : f
                    ),
                }));
            },

            // ── UI controls ───────────────────────────────────────────────────
            setViewMode: (mode) => set({ viewMode: mode }),

            setSortBy: (key, direction) =>
                set((s) => ({
                    sortBy: key,
                    sortDirection: direction ?? (s.sortBy === key
                        ? s.sortDirection === "asc" ? "desc" : "asc"
                        : "desc"),
                })),

            setFilter: (filter) =>
                set((s) => ({ filterState: { ...s.filterState, ...filter } })),

            clearFilters: () => set({ filterState: DEFAULT_FILTER_STATE }),

            setActiveCollection: (id) => set({ activeCollectionId: id }),

            setSelectionMode: (on) => set({
                isSelectionMode: on,
                selectedIds: on ? get().selectedIds : [],
            }),

            // ── Import / Export ───────────────────────────────────────────────
            exportToJSON: () => {
                const { favorites, collections } = get();
                return favoritesToExportJSON(favorites, collections);
            },

            importFromJSON: (json, mode) => {
                const parsed = parseImportJSON(json);
                if (!parsed) return { success: false, error: "JSON inválido o formato incorrecto" };
                try {
                    if (mode === "replace") {
                        set({
                            favorites:   parsed.favorites,
                            collections: [
                                DEFAULT_COLLECTION,
                                ...parsed.collections.filter((c) => !c.isDefault),
                            ],
                        });
                    } else {
                        // Merge
                        const { favorites: current, collections: currentCols } = get();
                        const existingIds = new Set(current.map((f) => f.id));

                        const merged = [...current];
                        for (const pf of parsed.favorites) {
                            if (existingIds.has(pf.id)) {
                                // Merge: tags union, keep longer note, take rating if current=0
                                const idx = merged.findIndex((f) => f.id === pf.id);
                                if (idx >= 0) {
                                    const cur = merged[idx];
                                    merged[idx] = {
                                        ...cur,
                                        tags: Array.from(new Set([...cur.tags, ...pf.tags])),
                                        note: pf.note.length > cur.note.length ? pf.note : cur.note,
                                        rating: cur.rating === 0 ? pf.rating : cur.rating,
                                        collectionIds: Array.from(new Set([...cur.collectionIds, ...pf.collectionIds])),
                                    };
                                }
                            } else {
                                merged.push(pf);
                            }
                        }

                        const existingColIds = new Set(currentCols.map((c) => c.id));
                        const newCols = parsed.collections.filter(
                            (c) => !c.isDefault && !existingColIds.has(c.id)
                        );

                        set({ favorites: merged, collections: [...currentCols, ...newCols] });
                    }
                    return { success: true };
                } catch (e) {
                    return { success: false, error: "Error al procesar la importación" };
                }
            },
        }),
        {
            name: "pokedex-favorites",
            storage: createJSONStorage(() => localStorage),
            // Solo persistir datos, no estado de UI efímero
            partialize: (state) => ({
                favorites:   state.favorites,
                collections: state.collections,
                viewMode:    state.viewMode,
                sortBy:      state.sortBy,
                sortDirection: state.sortDirection,
            }),
        }
    )
);
