// ─────────────────────────────────────────────────────────────────────────────
// FAVORITES — Hooks derivados
// ─────────────────────────────────────────────────────────────────────────────

import { useMemo } from "react";
import Fuse from "fuse.js";
import { useFavoritesStore } from "@/lib/store/favorites.store";
import { FavoritePokemon, FavoritesStats } from "@/types/api/favorites.types";
import { ALL_TYPES, DEFAULT_STATS } from "@/lib/constants/favorites.constants";

// Hook principal — acceso al store completo
export function useFavorites() {
    return useFavoritesStore();
}

// Hook derivado — favoritos filtrados y ordenados
export function useFilteredFavorites(): FavoritePokemon[] {
    const {
        favorites, collections, activeCollectionId,
        filterState, sortBy, sortDirection,
    } = useFavoritesStore();

    const fuse = useMemo(
        () => new Fuse(favorites, {
            keys: ["nameEs", "name", "tags"],
            threshold: 0.35,
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [favorites.map((f) => f.id).join(",")]
    );

    return useMemo(() => {
        // 1. Filtrar por colección activa
        let list: FavoritePokemon[] = activeCollectionId
            ? favorites.filter((f) => f.collectionIds.includes(activeCollectionId))
            : [...favorites];

        // 2. Búsqueda con Fuse.js
        if (filterState.searchQuery.trim()) {
            const results = new Fuse(list, { keys: ["nameEs", "name", "tags"], threshold: 0.35 })
                .search(filterState.searchQuery);
            list = results.map((r) => r.item);
        }

        // 3. Filtros de tipo
        if (filterState.typeFilter.length > 0) {
            list = list.filter((f) =>
                filterState.typeFilter.some((t) => f.types?.includes(t))
            );
        }

        // 4. Filtros de generación
        if (filterState.generationFilter.length > 0) {
            list = list.filter((f) => filterState.generationFilter.includes(f.generation));
        }

        // 5. Filtros de rating
        if (filterState.ratingFilter.length > 0) {
            list = list.filter((f) => filterState.ratingFilter.includes(f.rating));
        }

        // 6. Filtro de tags
        if (filterState.tagFilter.length > 0) {
            list = list.filter((f) =>
                filterState.tagFilter.some((tag) => f.tags.includes(tag))
            );
        }

        // 7. BST range
        if (filterState.bstRange[0] > 0 || filterState.bstRange[1] < 780) {
            list = list.filter(
                (f) => f.bst >= filterState.bstRange[0] && f.bst <= filterState.bstRange[1]
            );
        }

        // 8. Solo destacados
        if (filterState.onlyHighlighted) {
            list = list.filter((f) => f.isHighlighted);
        }

        // 9. Solo legendarios/míticos
        if (filterState.onlyLegendary) {
            list = list.filter((f) => f.isLegendary || f.isMythical);
        }

        // 10. Ordenar
        list = [...list].sort((a, b) => {
            let valA: number | string;
            let valB: number | string;

            switch (sortBy) {
                case "addedAt": valA = a.addedAt; valB = b.addedAt; break;
                case "name": valA = a.nameEs; valB = b.nameEs; break;
                case "id": valA = a.id; valB = b.id; break;
                case "bst": valA = a.bst; valB = b.bst; break;
                case "rating": valA = a.rating; valB = b.rating; break;
                case "hp": valA = a.baseStats?.hp ?? 0; valB = b.baseStats?.hp ?? 0; break;
                case "attack": valA = a.baseStats?.attack ?? 0; valB = b.baseStats?.attack ?? 0; break;
                case "defense": valA = a.baseStats?.defense ?? 0; valB = b.baseStats?.defense ?? 0; break;
                case "specialAttack": valA = a.baseStats?.specialAttack ?? 0; valB = b.baseStats?.specialAttack ?? 0; break;
                case "specialDefense": valA = a.baseStats?.specialDefense ?? 0; valB = b.baseStats?.specialDefense ?? 0; break;
                case "speed": valA = a.baseStats?.speed ?? 0; valB = b.baseStats?.speed ?? 0; break;
                default: valA = a.addedAt; valB = b.addedAt;
            }

            if (typeof valA === "string") {
                return sortDirection === "asc"
                    ? valA.localeCompare(valB as string)
                    : (valB as string).localeCompare(valA);
            }
            return sortDirection === "asc"
                ? valA - (valB as number)
                : (valB as number) - valA;
        });

        // Destacados siempre primero
        const highlighted = list.filter((f) => f.isHighlighted);
        const rest = list.filter((f) => !f.isHighlighted);
        return [...highlighted, ...rest];

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        favorites,
        activeCollectionId,
        filterState.searchQuery,
        filterState.typeFilter.join(","),
        filterState.generationFilter.join(","),
        filterState.ratingFilter.join(","),
        filterState.tagFilter.join(","),
        filterState.bstRange[0],
        filterState.bstRange[1],
        filterState.onlyHighlighted,
        filterState.onlyLegendary,
        sortBy,
        sortDirection,
    ]);
}

// Hook de estadísticas
export function useFavoritesStats(): FavoritesStats {
    const { favorites, collections } = useFavoritesStore();

    return useMemo((): FavoritesStats => {
        if (favorites.length === 0) return DEFAULT_STATS;

        const byType: Record<string, number> = {};
        const byGeneration: Record<number, number> = {};
        const byRating: Record<number, number> = {};
        let totalBST = 0;
        const statSums = { hp: 0, attack: 0, defense: 0, specialAttack: 0, specialDefense: 0, speed: 0 };

        favorites.forEach((f) => {
            f.types?.forEach((t) => { byType[t] = (byType[t] ?? 0) + 1; });
            if (f.generation) byGeneration[f.generation] = (byGeneration[f.generation] ?? 0) + 1;
            if (f.rating && f.rating > 0) {
                byRating[f.rating] = (byRating[f.rating] ?? 0) + 1;
            }
            totalBST += (f.bst ?? 0);
            if (f.baseStats) {
                (Object.keys(statSums) as (keyof typeof statSums)[]).forEach((k) => {
                    statSums[k] += f.baseStats[k] ?? 0;
                });
            }
        });

        const n = favorites.length;
        const sortedByType = Object.entries(byType).sort(([, a], [, b]) => b - a);

        return {
            totalCount: n,
            byType,
            byGeneration,
            byRating,
            averageBST: Math.round(totalBST / n),
            highestBST: favorites.length > 0 ? favorites.reduce((a, b) => (a.bst ?? 0) > (b.bst ?? 0) ? a : b) : favorites[0],
            lowestBST: favorites.length > 0 ? favorites.reduce((a, b) => (a.bst ?? Infinity) < (b.bst ?? Infinity) ? a : b) : favorites[0],
            mostCommonType: sortedByType[0]?.[0] ?? null,
            rareTypes: ALL_TYPES.filter((t) => !byType[t]),
            legendaryCount: favorites.filter((f) => f.isLegendary).length,
            mythicalCount: favorites.filter((f) => f.isMythical).length,
            highlightedCount: favorites.filter((f) => f.isHighlighted).length,
            collectionCount: collections.filter((c) => !c.isDefault).length,
            avgStats: Object.fromEntries(
                Object.entries(statSums).map(([k, v]) => [k, Math.round(v / n)])
            ) as FavoritesStats["avgStats"],
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [favorites.map((f) => `${f.id}:${f.rating}`).join(","), collections.length]);
}

// Hook de check rápido
export function useIsFavorite(pokemonId: number): boolean {
    const ids = useFavoritesStore((s) => s.favorites.map((f) => f.id).join(","));
    return useMemo(() => ids.split(",").map(Number).includes(pokemonId), [ids, pokemonId]);
}

// Hook de colección específica
export function useCollection(collectionId: string) {
    return useFavoritesStore((s) => s.collections.find((c) => c.id === collectionId));
}

// Hook de todos los tags únicos
export function useAllTags(): string[] {
    // Use a stable string selector to avoid new array refs on every render
    const tagsKey = useFavoritesStore(
        (s) => s.favorites.flatMap((f) => f.tags).sort().join("|")
    );
    return useMemo(
        () => Array.from(new Set(tagsKey ? tagsKey.split("|") : [])).sort(),
        [tagsKey]
    );
}
