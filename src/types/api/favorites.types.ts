// ─────────────────────────────────────────────────────────────────────────────
// FAVORITES — Tipos TypeScript completos
// ─────────────────────────────────────────────────────────────────────────────

export interface FavoritePokemonBaseStats {
    hp:             number;
    attack:         number;
    defense:        number;
    specialAttack:  number;
    specialDefense: number;
    speed:          number;
}

export interface FavoritePokemon {
    // Datos básicos del Pokémon (copiados en el momento de añadir, sin re-fetch)
    id:             number;         // ID nacional (1-1025)
    name:           string;         // slug inglés ("pikachu")
    nameEs:         string;         // nombre en español ("Pikachu")
    artwork:        string;         // URL official-artwork
    sprite:         string;         // URL sprite normal
    types:          string[];       // ["electric"]
    bst:            number;         // base stat total
    baseStats:      FavoritePokemonBaseStats;
    generation:     number;         // 1-9
    isLegendary:    boolean;
    isMythical:     boolean;

    // Datos de favorito
    addedAt:        number;         // timestamp cuando se añadió
    note:           string;         // nota personal del usuario (max 500 chars)
    tags:           string[];       // tags personalizados: ["competitivo", "favorito"]
    rating:         number;         // 1-5 estrellas (0 = sin rating)
    collectionIds:  string[];       // IDs de colecciones a las que pertenece
    isHighlighted:  boolean;        // marcado como destacado (pin)
}

export interface FavoriteCollection {
    id:          string;        // UUID generado localmente
    name:        string;        // nombre de la colección
    description: string;        // descripción opcional
    color:       string;        // color HEX del ícono de la colección
    icon:        string;        // nombre del ícono de lucide-react
    pokemonIds:  number[];      // IDs de los Pokémon en esta colección
    createdAt:   number;
    updatedAt:   number;
    isDefault:   boolean;       // la colección "Todos los favoritos" no se puede eliminar
}

export interface FavoritesStats {
    totalCount:        number;
    byType:            Record<string, number>;
    byGeneration:      Record<number, number>;
    byRating:          Record<number, number>;
    averageBST:        number;
    highestBST:        FavoritePokemon | null;
    lowestBST:         FavoritePokemon | null;
    mostCommonType:    string | null;
    rareTypes:         string[];
    legendaryCount:    number;
    mythicalCount:     number;
    highlightedCount:  number;
    collectionCount:   number;
    avgStats: {
        hp: number; attack: number; defense: number;
        specialAttack: number; specialDefense: number; speed: number;
    };
}

export type FavoritesSortKey =
    | "addedAt" | "name" | "id" | "bst" | "rating"
    | "hp" | "attack" | "defense" | "specialAttack" | "specialDefense" | "speed";

export interface FavoritesFilterState {
    searchQuery:      string;
    typeFilter:       string[];
    generationFilter: number[];
    ratingFilter:     number[];
    tagFilter:        string[];
    onlyHighlighted:  boolean;
    onlyLegendary:    boolean;
    bstRange:         [number, number];
}

export interface FavoritesState {
    // Data
    favorites:    FavoritePokemon[];
    collections:  FavoriteCollection[];
    // UI State
    activeCollectionId: string | null;
    viewMode:           "grid" | "list" | "album";
    sortBy:             FavoritesSortKey;
    sortDirection:      "asc" | "desc";
    filterState:        FavoritesFilterState;
    selectedIds:        number[];
    isSelectionMode:    boolean;
}
