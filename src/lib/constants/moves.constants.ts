// ─── COLORES DE CLASE DE DAÑO ─────────────────────────────────────────────────
export const DAMAGE_CLASS_COLORS = {
    physical: { bg: "#FED7AA", text: "#C2410C", border: "#C2410C" },
    special: { bg: "#BFDBFE", text: "#1D4ED8", border: "#1D4ED8" },
    status: { bg: "#F3F4F6", text: "#6B7280", border: "#374151" },
} as const

export const DAMAGE_CLASS_LABELS: Record<string, string> = {
    physical: "Físico",
    special: "Especial",
    status: "Estado",
}

// ─── COLORES DE POTENCIA ───────────────────────────────────────────────────────
export function getPowerColor(power: number | null): string {
    if (power === null || power === 0) return "#AAAAAA"
    if (power < 60) return "#888888"
    if (power < 100) return "#444444"
    if (power < 150) return "#CC0000"
    return "#CC0000" // 150+ → gradiente en el componente
}

export function isPowerDevastating(power: number | null): boolean {
    return power !== null && power >= 150
}

// ─── COLORES DE AILMENT (estado alterado) ──────────────────────────────────────
export const AILMENT_COLORS: Record<string, string> = {
    paralysis: "#F8D030",
    poison: "#A040A0",
    burn: "#F08030",
    freeze: "#98D8D8",
    sleep: "#705898",
    confusion: "#F85888",
    infatuation: "#EE99AC",
    fear: "#E0C068",
    "leech-seed": "#78C850",
    "no-type-immunity": "#888888",
    none: "#888888",
    unknown: "#888888",
}

export const AILMENT_LABELS: Record<string, string> = {
    paralysis: "Parálisis",
    poison: "Veneno",
    burn: "Quemadura",
    freeze: "Congelación",
    sleep: "Sueño",
    confusion: "Confusión",
    infatuation: "Atracción",
    fear: "Miedo",
    "leech-seed": "Drenadoras",
    none: "Ninguno",
    unknown: "Desconocido",
}

// ─── GENERACIONES ─────────────────────────────────────────────────────────────
export const GEN_ROMAN: Record<string, string> = {
    "generation-i": "I",
    "generation-ii": "II",
    "generation-iii": "III",
    "generation-iv": "IV",
    "generation-v": "V",
    "generation-vi": "VI",
    "generation-vii": "VII",
    "generation-viii": "VIII",
    "generation-ix": "IX",
}

export const GEN_YEARS: Record<string, string> = {
    "generation-i": "1996",
    "generation-ii": "1999",
    "generation-iii": "2002",
    "generation-iv": "2006",
    "generation-v": "2010",
    "generation-vi": "2013",
    "generation-vii": "2016",
    "generation-viii": "2019",
    "generation-ix": "2022",
}

export const GEN_NAMES: Record<string, string> = {
    "generation-i": "Primera Generación",
    "generation-ii": "Segunda Generación",
    "generation-iii": "Tercera Generación",
    "generation-iv": "Cuarta Generación",
    "generation-v": "Quinta Generación",
    "generation-vi": "Sexta Generación",
    "generation-vii": "Séptima Generación",
    "generation-viii": "Octava Generación",
    "generation-ix": "Novena Generación",
}

// ─── NOMBRES DE STATS ─────────────────────────────────────────────────────────
export const STAT_LABELS_ES: Record<string, string> = {
    "attack": "Ataque",
    "defense": "Defensa",
    "special-attack": "Ataque Esp.",
    "special-defense": "Defensa Esp.",
    "speed": "Velocidad",
    "hp": "PS",
    "accuracy": "Precisión",
    "evasion": "Evasión",
}

// ─── TIPOS DE CONCURSO ─────────────────────────────────────────────────────────
export const CONTEST_TYPE_COLORS: Record<string, string> = {
    cool: "#FBBF24",
    beauty: "#60A5FA",
    cute: "#F472B6",
    smart: "#34D399",
    tough: "#F97316",
}

export const CONTEST_TYPE_LABELS: Record<string, string> = {
    cool: "Frío",
    beauty: "Belleza",
    cute: "Encanto",
    smart: "Inteligencia",
    tough: "Tenacidad",
}

// ─── TARGET LABELS ────────────────────────────────────────────────────────────
export const TARGET_LABELS_ES: Record<string, string> = {
    "specific-move": "Move específico",
    "selected-pokemon-me-first": "Elegido (me first)",
    "ally": "Aliado",
    "users-field": "Campo del usuario",
    "user-or-ally": "Usuario o aliado",
    "opponents-field": "Campo rival",
    "user": "Usuario",
    "random-opponent": "Rival random",
    "all-other-pokemon": "Todos los demás",
    "selected-pokemon": "Pokémon elegido",
    "all-opponents": "Todos los rivales",
    "entire-field": "Campo entero",
    "user-and-allies": "Usuario y aliados",
    "all-pokemon": "Todos los Pokémon",
    "all-allies": "Todos los aliados",
    "fainting-pokemon": "Pokémon debilitado",
}
