// ─────────────────────────────────────────────────────────────────────────────
// TEAM BUILDER — Constantes completas
// ─────────────────────────────────────────────────────────────────────────────

import { PokemonRole, TeamSynergy, TeamMember } from "@/types/api/team-builder.types";

// ── Todos los tipos ───────────────────────────────────────────────────────────
export const ALL_TYPES = [
    "normal", "fire", "water", "electric", "grass", "ice", "fighting", "poison",
    "ground", "flying", "psychic", "bug", "rock", "ghost", "dragon", "dark", "steel", "fairy",
] as const;

export type TypeName = typeof ALL_TYPES[number];

// ── Tabla de efectividad ofensiva: ATACANTE → DEFENSOR → multiplicador ────────
// Para cualquier par no listado, el multiplicador es 1 (neutral)
export const TYPE_CHART: Record<string, Record<string, number>> = {
    normal: { rock: 0.5, ghost: 0, steel: 0.5 },
    fire: { fire: 0.5, water: 0.5, grass: 2, ice: 2, bug: 2, rock: 0.5, dragon: 0.5, steel: 2 },
    water: { fire: 2, water: 0.5, grass: 0.5, ground: 2, rock: 2, dragon: 0.5 },
    electric: { water: 2, electric: 0.5, grass: 0.5, ground: 0, flying: 2, dragon: 0.5 },
    grass: { fire: 0.5, water: 2, grass: 0.5, poison: 0.5, ground: 2, flying: 0.5, bug: 0.5, rock: 2, dragon: 0.5, steel: 0.5 },
    ice: { fire: 0.5, water: 0.5, grass: 2, ice: 0.5, ground: 2, flying: 2, dragon: 2, steel: 0.5 },
    fighting: { normal: 2, ice: 2, poison: 0.5, flying: 0.5, psychic: 0.5, bug: 0.5, rock: 2, ghost: 0, dark: 2, steel: 2, fairy: 0.5 },
    poison: { grass: 2, poison: 0.5, ground: 0.5, rock: 0.5, ghost: 0.5, steel: 0, fairy: 2 },
    ground: { fire: 2, electric: 2, grass: 0.5, poison: 2, flying: 0, bug: 0.5, rock: 2, steel: 2 },
    flying: { electric: 0.5, grass: 2, fighting: 2, bug: 2, rock: 0.5, steel: 0.5 },
    psychic: { fighting: 2, poison: 2, psychic: 0.5, dark: 0, steel: 0.5 },
    bug: { fire: 0.5, grass: 2, fighting: 0.5, flying: 0.5, psychic: 2, ghost: 0.5, dark: 2, steel: 0.5, fairy: 0.5 },
    rock: { fire: 2, ice: 2, fighting: 0.5, ground: 0.5, flying: 2, bug: 2, steel: 0.5 },
    ghost: { normal: 0, psychic: 2, ghost: 2, dark: 0.5 },
    dragon: { dragon: 2, steel: 0.5, fairy: 0 },
    dark: { fighting: 0.5, psychic: 2, ghost: 2, dark: 0.5, fairy: 0.5 },
    steel: { fire: 0.5, water: 0.5, electric: 0.5, ice: 2, rock: 2, steel: 0.5, fairy: 2 },
    fairy: { fire: 0.5, fighting: 2, poison: 0.5, dragon: 2, dark: 2, steel: 0.5 },
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

// ── Habilidades que modifican efectividades ───────────────────────────────────
export const ABILITY_TYPE_OVERRIDES: Record<string, {
    immunities?: string[];
    halfDamage?: string[];
}> = {
    "levitate": { immunities: ["ground"] },
    "flash-fire": { immunities: ["fire"] },
    "water-absorb": { immunities: ["water"] },
    "volt-absorb": { immunities: ["electric"] },
    "motor-drive": { immunities: ["electric"] },
    "lightning-rod": { immunities: ["electric"] },
    "storm-drain": { immunities: ["water"] },
    "sap-sipper": { immunities: ["grass"] },
    "thick-fat": { halfDamage: ["fire", "ice"] },
    "heatproof": { halfDamage: ["fire"] },
    "dry-skin": { immunities: ["water"] },
    "earth-eater": { immunities: ["ground"] },
    "well-baked-body": { immunities: ["fire"] },
    "wind-rider": { immunities: ["flying"] },
};

// ── Roles ─────────────────────────────────────────────────────────────────────
export const ROLE_META: Record<PokemonRole, { label: string; color: string; icon: string }> = {
    physicalSweeper: { label: "Sweeper Físico", color: "#EF4444", icon: "Swords" },
    specialSweeper: { label: "Sweeper Especial", color: "#3B82F6", icon: "Sparkles" },
    physicalWall: { label: "Muro Físico", color: "#F59E0B", icon: "Shield" },
    specialWall: { label: "Muro Especial", color: "#10B981", icon: "ShieldHalf" },
    support: { label: "Soporte", color: "#8B5CF6", icon: "Heart" },
    lead: { label: "Líder", color: "#EC4899", icon: "Star" },
    mixedAttacker: { label: "Atacante Mixto", color: "#F97316", icon: "Zap" },
    pivot: { label: "Pivot", color: "#14B8A6", icon: "RefreshCw" },
    weatherSetter: { label: "Setter de Clima", color: "#60A5FA", icon: "Cloud" },
    trickRoomSetter: { label: "Trick Room", color: "#A78BFA", icon: "Clock" },
};

// ── Score labels ──────────────────────────────────────────────────────────────
export function getScoreMeta(score: number): { label: string; color: string } {
    if (score >= 90) return { label: "Equipo Óptimo", color: "#F59E0B" };
    if (score >= 76) return { label: "Buen Equipo", color: "#22C55E" };
    if (score >= 61) return { label: "Equipo Sólido", color: "#84CC16" };
    if (score >= 41) return { label: "Equipo Básico", color: "#F97316" };
    return { label: "Equipo Débil", color: "#EF4444" };
}

// ── Célula de efectividad ─────────────────────────────────────────────────────
export function getCellMeta(mult: number): { bg: string; text: string; label: string } {
    if (mult >= 4) return { bg: "#FEE2E2", text: "#DC2626", label: "×4" };
    if (mult >= 2) return { bg: "#FEF3C7", text: "#D97706", label: "×2" };
    if (mult === 0) return { bg: "#DBEAFE", text: "#2563EB", label: "×0" };
    if (mult <= 0.25) return { bg: "#BBF7D0", text: "#15803D", label: "×¼" };
    if (mult <= 0.5) return { bg: "#DCFCE7", text: "#16A34A", label: "×½" };
    return { bg: "#F9FAFB", text: "#9CA3AF", label: "×1" };
}

// ── Generación por ID de Pokémon ──────────────────────────────────────────────
export function getGenerationByPokemonId(id: number): number {
    if (id <= 151) return 1;
    if (id <= 251) return 2;
    if (id <= 386) return 3;
    if (id <= 493) return 4;
    if (id <= 649) return 5;
    if (id <= 721) return 6;
    if (id <= 809) return 7;
    if (id <= 905) return 8;
    if (id <= 1025) return 9;
    return 10; // Especiales (Megas, G-Max, etc)
}

export const GEN_COLORS: Record<number, string> = {
    1: "#CC0000", 2: "#B8860B", 3: "#1B5E20", 4: "#1565C0",
    5: "#212121", 6: "#6A1B9A", 7: "#E65100", 8: "#00695C", 9: "#880E4F",
    10: "#444444",
};

// ── Formatear nombre slug ─────────────────────────────────────────────────────
export function formatPokemonName(name: string): string {
    return name.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

// ── Extraer ID de una URL de PokéAPI ─────────────────────────────────────────
export function extractId(url: string): number {
    return parseInt(url.match(/\/(\d+)\/?$/)?.[1] ?? "0");
}

// ── URLs de sprites ───────────────────────────────────────────────────────────
export const SPRITE_URL = (id: number) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
export const ARTWORK_URL = (id: number) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
export const PIXEL_URL = (id: number) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${id}.gif`;

// ── Generación de UUID simple ─────────────────────────────────────────────────
export function generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}