// ─────────────────────────────────────────────────────────────────────────────
// FAVORITES — Constantes completas
// ─────────────────────────────────────────────────────────────────────────────

import { FavoritePokemon, FavoriteCollection, FavoritesSortKey } from "@/types/api/favorites.types";

// ── Colores disponibles para colecciones ──────────────────────────────────────
export const COLLECTION_COLORS = [
    "#CC0000","#EF4444","#F97316","#F59E0B","#EAB308",
    "#84CC16","#22C55E","#10B981","#14B8A6","#06B6D4",
    "#3B82F6","#6366F1","#8B5CF6","#A855F7","#EC4899",
    "#111111","#888888",
];

// ── Íconos disponibles para colecciones (nombres de lucide-react) ─────────────
export const COLLECTION_ICONS = [
    "Star","Heart","Trophy","Zap","Flame","Leaf","Snowflake","Mountain",
    "Waves","Sword","Shield","Crown","Gem","Package","BookOpen","Globe",
];

// ── Opciones de ordenación ─────────────────────────────────────────────────────
export const SORT_OPTIONS: { key: FavoritesSortKey; label: string }[] = [
    { key: "addedAt",       label: "Fecha añadido"  },
    { key: "name",          label: "Nombre A-Z"     },
    { key: "id",            label: "Número Pokédex" },
    { key: "bst",           label: "BST total"      },
    { key: "rating",        label: "Rating"         },
    { key: "speed",         label: "Velocidad"      },
    { key: "attack",        label: "Ataque"         },
    { key: "specialAttack", label: "Atk. Especial"  },
];

// ── Colección por defecto ──────────────────────────────────────────────────────
export const DEFAULT_COLLECTION_ID = "all-favorites";

export const DEFAULT_COLLECTION: FavoriteCollection = {
    id:          DEFAULT_COLLECTION_ID,
    name:        "Todos los favoritos",
    description: "Todos tus Pokémon guardados",
    color:       "#CC0000",
    icon:        "Heart",
    pokemonIds:  [],
    createdAt:   0,
    updatedAt:   0,
    isDefault:   true,
};

// ── Generación por ID de Pokémon ──────────────────────────────────────────────
export function getGenerationByPokemonId(id: number): number {
    if (id <=  151) return 1;
    if (id <=  251) return 2;
    if (id <=  386) return 3;
    if (id <=  493) return 4;
    if (id <=  649) return 5;
    if (id <=  721) return 6;
    if (id <=  809) return 7;
    if (id <=  905) return 8;
    return 9;
}

// ── Colores por generación ────────────────────────────────────────────────────
export const GEN_COLORS: Record<number, string> = {
    1:"#CC0000", 2:"#B8860B", 3:"#1B5E20", 4:"#1565C0",
    5:"#212121", 6:"#6A1B9A", 7:"#E65100", 8:"#00695C", 9:"#880E4F",
};

export const GEN_LABELS: Record<number, string> = {
    1: "Gen I", 2: "Gen II", 3: "Gen III", 4: "Gen IV",
    5: "Gen V", 6: "Gen VI", 7: "Gen VII", 8: "Gen VIII", 9: "Gen IX",
};

// ── Colores de tipos ──────────────────────────────────────────────────────────
export const TYPE_COLORS: Record<string, string> = {
    normal: "#A8A878", fire: "#F08030", water: "#6890F0",
    electric: "#F8D030", grass: "#78C850", ice: "#98D8D8",
    fighting: "#C03028", poison: "#A040A0", ground: "#E0C068",
    flying: "#A890F0", psychic: "#F85888", bug: "#A8B820",
    rock: "#B8A038", ghost: "#705898", dragon: "#7038F8",
    dark: "#705848", steel: "#B8B8D0", fairy: "#EE99AC",
};

export const TYPE_NAMES_ES: Record<string, string> = {
    normal: "Normal", fire: "Fuego", water: "Agua",
    electric: "Eléctrico", grass: "Planta", ice: "Hielo",
    fighting: "Lucha", poison: "Veneno", ground: "Tierra",
    flying: "Volador", psychic: "Psíquico", bug: "Bicho",
    rock: "Roca", ghost: "Fantasma", dragon: "Dragón",
    dark: "Siniestro", steel: "Acero", fairy: "Hada",
};

export const ALL_TYPES = [
    "normal","fire","water","electric","grass","ice","fighting","poison",
    "ground","flying","psychic","bug","rock","ghost","dragon","dark","steel","fairy",
];

// ── Límites y validaciones ────────────────────────────────────────────────────
export const MAX_NOTE_LENGTH      = 500;
export const MAX_TAGS_PER_POKEMON = 10;
export const MAX_COLLECTIONS      = 20;
export const MAX_FAVORITES        = 1000;
export const MAX_TAG_LENGTH       = 24;

// ── Filtros por defecto ───────────────────────────────────────────────────────
export const DEFAULT_FILTER_STATE = {
    searchQuery:      "",
    typeFilter:       [] as string[],
    generationFilter: [] as number[],
    ratingFilter:     [] as number[],
    tagFilter:        [] as string[],
    onlyHighlighted:  false,
    onlyLegendary:    false,
    bstRange:         [0, 780] as [number, number],
};

// ── Share / URL ───────────────────────────────────────────────────────────────
export function encodeCollectionToUrl(ids: number[]): string {
    return btoa(JSON.stringify(ids));
}

export function decodeCollectionFromUrl(encoded: string): number[] | null {
    try { return JSON.parse(atob(encoded)); } catch { return null; }
}

// ── Export / Import ───────────────────────────────────────────────────────────
export function favoritesToExportJSON(
    favorites: FavoritePokemon[],
    collections: FavoriteCollection[],
): string {
    return JSON.stringify(
        { version: 1, favorites, collections, exportedAt: Date.now() },
        null, 2
    );
}

export function importFromJSON(
    json: string,
): { favorites: FavoritePokemon[]; collections: FavoriteCollection[] } | null {
    try {
        const data = JSON.parse(json);
        if (!data.favorites || !data.collections) return null;
        return { favorites: data.favorites, collections: data.collections };
    } catch { return null; }
}

// ── UUID simple ───────────────────────────────────────────────────────────────
export function generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

// ── Tiempo relativo ───────────────────────────────────────────────────────────
export function timeAgo(timestamp: number): string {
    const diff = Date.now() - timestamp;
    const mins  = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days  = Math.floor(diff / 86400000);
    if (mins  < 1)  return "Ahora mismo";
    if (mins  < 60) return `Hace ${mins} min`;
    if (hours < 24) return `Hace ${hours}h`;
    if (days  < 7)  return `Hace ${days}d`;
    return new Date(timestamp).toLocaleDateString("es-ES");
}

// ── Stats vacíos ──────────────────────────────────────────────────────────────
export const DEFAULT_STATS = {
    totalCount: 0,
    byType: {},
    byGeneration: {},
    byRating: {},
    averageBST: 0,
    highestBST: null,
    lowestBST: null,
    mostCommonType: null,
    rareTypes: ALL_TYPES,
    legendaryCount: 0,
    mythicalCount: 0,
    highlightedCount: 0,
    collectionCount: 0,
    avgStats: { hp: 0, attack: 0, defense: 0, specialAttack: 0, specialDefense: 0, speed: 0 },
};
