// ─────────────────────────────────────────────────────────────────
// GENERACIONES — Constantes completas
// Mantiene el array original + agrega paleta, mascots, años, etc.
// ─────────────────────────────────────────────────────────────────

// Array base (mantiene forma original)
export const GENERATIONS = [
    { id: 1, name: "generation-i", label: "Gen I", region: "Kanto", games: ["Red", "Blue", "Yellow"], range: [1, 151] },
    { id: 2, name: "generation-ii", label: "Gen II", region: "Johto", games: ["Gold", "Silver", "Crystal"], range: [152, 251] },
    { id: 3, name: "generation-iii", label: "Gen III", region: "Hoenn", games: ["Ruby", "Sapphire", "Emerald"], range: [252, 386] },
    { id: 4, name: "generation-iv", label: "Gen IV", region: "Sinnoh", games: ["Diamond", "Pearl", "Platinum"], range: [387, 493] },
    { id: 5, name: "generation-v", label: "Gen V", region: "Unova", games: ["Black", "White"], range: [494, 649] },
    { id: 6, name: "generation-vi", label: "Gen VI", region: "Kalos", games: ["X", "Y"], range: [650, 721] },
    { id: 7, name: "generation-vii", label: "Gen VII", region: "Alola", games: ["Sun", "Moon"], range: [722, 809] },
    { id: 8, name: "generation-viii", label: "Gen VIII", region: "Galar", games: ["Sword", "Shield"], range: [810, 905] },
    { id: 9, name: "generation-ix", label: "Gen IX", region: "Paldea", games: ["Scarlet", "Violet"], range: [906, 1025] },
] as const;

export type GenerationName = typeof GENERATIONS[number]["name"];
export const GENERATION_ORDER = GENERATIONS.map((g) => g.name);

// ── Color único por generación — se usa en sombras y acentos
export const GENERATION_COLORS: Record<string, string> = {
    "generation-i": "#CC0000",
    "generation-ii": "#B8860B",
    "generation-iii": "#1B5E20",
    "generation-iv": "#1565C0",
    "generation-v": "#212121",
    "generation-vi": "#6A1B9A",
    "generation-vii": "#E65100",
    "generation-viii": "#00695C",
    "generation-ix": "#880E4F",
};

// ── Números romanos
export const GENERATION_ROMAN: Record<string, string> = {
    "generation-i": "I", "generation-ii": "II",
    "generation-iii": "III", "generation-iv": "IV",
    "generation-v": "V", "generation-vi": "VI",
    "generation-vii": "VII", "generation-viii": "VIII",
    "generation-ix": "IX",
};

// ── Nombre en español
export const GENERATION_NAMES_ES: Record<string, string> = {
    "generation-i": "Generación I", "generation-ii": "Generación II",
    "generation-iii": "Generación III", "generation-iv": "Generación IV",
    "generation-v": "Generación V", "generation-vi": "Generación VI",
    "generation-vii": "Generación VII", "generation-viii": "Generación VIII",
    "generation-ix": "Generación IX",
};

// ── Año de lanzamiento (Japón)
export const GENERATION_YEARS: Record<string, string> = {
    "generation-i": "1996", "generation-ii": "1999",
    "generation-iii": "2002", "generation-iv": "2006",
    "generation-v": "2010", "generation-vi": "2013",
    "generation-vii": "2016", "generation-viii": "2019",
    "generation-ix": "2022",
};

// ── Juegos en español
export const GENERATION_GAMES_ES: Record<string, string[]> = {
    "generation-i": ["Rojo", "Azul", "Amarillo"],
    "generation-ii": ["Oro", "Plata", "Cristal"],
    "generation-iii": ["Rubí", "Zafiro", "Esmeralda", "FR/HV"],
    "generation-iv": ["Diamante", "Perla", "Platino", "HG/SS"],
    "generation-v": ["Negro", "Blanco", "Negro 2", "Blanco 2"],
    "generation-vi": ["X", "Y", "Rubí Omega", "Zafiro Alfa"],
    "generation-vii": ["Sol", "Luna", "Sol Ultra", "Luna Ultra"],
    "generation-viii": ["Espada", "Escudo", "BD/PR", "Leyendas: Arceus"],
    "generation-ix": ["Escarlata", "Violeta"],
};

// ── Mascota (official artwork)
export const GENERATION_MASCOTS: Record<string, { name: string; id: number }> = {
    "generation-i": { name: "Charizard", id: 6 },
    "generation-ii": { name: "Lugia", id: 249 },
    "generation-iii": { name: "Rayquaza", id: 384 },
    "generation-iv": { name: "Giratina", id: 487 },
    "generation-v": { name: "Zekrom", id: 644 },
    "generation-vi": { name: "Xerneas", id: 716 },
    "generation-vii": { name: "Lunala", id: 792 },
    "generation-viii": { name: "Eternatus", id: 890 },
    "generation-ix": { name: "Miraidon", id: 1007 },
};

// ── Tipos nuevos por generación
export const GENERATION_TYPES_INTRODUCED: Record<string, string[]> = {
    "generation-i": ["normal", "fire", "water", "electric", "grass", "ice", "fighting",
        "poison", "ground", "flying", "psychic", "bug", "rock", "ghost", "dragon"],
    "generation-ii": ["dark", "steel"],
    "generation-iii": [],
    "generation-iv": [],
    "generation-v": [],
    "generation-vi": ["fairy"],
    "generation-vii": [],
    "generation-viii": [],
    "generation-ix": [],
};

// ── Nota de contexto sobre tipos
export const GENERATION_TYPE_NOTES: Record<string, string> = {
    "generation-ii": "Siniestro y Acero fueron añadidos para contrarrestar la dominancia del tipo Psíquico.",
    "generation-vi": "Hada fue introducido para frenar al tipo Dragón, que era casi imparable en combate.",
};

// ── Version groups que son remakes
export const REMAKE_VERSION_GROUPS = new Set([
    "firered-leafgreen", "heartgold-soulsilver", "omegaruby-alphasapphire",
    "brilliant-diamond-and-shining-pearl", "lets-go-pikachu-lets-go-eevee",
]);

// ── Helper: todos los metadatos de una generación en un objeto
export function getGenMeta(name: string) {
    return {
        color: GENERATION_COLORS[name] ?? "#CC0000",
        roman: GENERATION_ROMAN[name] ?? "?",
        nameEs: GENERATION_NAMES_ES[name] ?? name,
        year: GENERATION_YEARS[name] ?? "????",
        games: GENERATION_GAMES_ES[name] ?? [],
        mascot: GENERATION_MASCOTS[name] ?? { name: "Pikachu", id: 25 },
        types: GENERATION_TYPES_INTRODUCED[name] ?? [],
        typeNote: GENERATION_TYPE_NOTES[name] ?? "",
    };
}