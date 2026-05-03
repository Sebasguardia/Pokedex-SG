// ─────────────────────────────────────────────────────────────────
// LOCACIONES — Metadata completa de las 9 regiones
// ─────────────────────────────────────────────────────────────────

export const REGION_ORDER = [
    "kanto", "johto", "hoenn", "sinnoh", "unova",
    "kalos", "alola", "galar", "paldea",
] as const;

export type RegionName = typeof REGION_ORDER[number];

// ── Color único por región ────────────────────────────────────────
export const REGION_COLORS: Record<string, string> = {
    kanto: "#CC0000",
    johto: "#B8860B",
    hoenn: "#1B5E20",
    sinnoh: "#1565C0",
    unova: "#212121",
    kalos: "#6A1B9A",
    alola: "#E65100",
    galar: "#00695C",
    paldea: "#880E4F",
};

// ── Nombre en español (Unova → Teselia es crítico) ────────────────
export const REGION_NAMES_ES: Record<string, string> = {
    kanto: "Kanto",
    johto: "Johto",
    hoenn: "Hoenn",
    sinnoh: "Sinnoh",
    unova: "Teselia",
    kalos: "Kalos",
    alola: "Alola",
    galar: "Galar",
    paldea: "Paldea",
};

// ── Descripción corta de la región ───────────────────────────────
export const REGION_DESCRIPTIONS: Record<string, string> = {
    kanto: "La región original. Hogar de los 151 primeros Pokémon y del legendario Camino Pokémon.",
    johto: "Región rica en tradición y misterio, con los Pokémon Míticos Ho-Oh y Lugia custodiando sus secretos.",
    hoenn: "Archipiélago subtropical bañado por el mar, hogar del conflicto eterno entre tierra y océano.",
    sinnoh: "Región montañosa con el Mt. Corona en su centro y mitos sobre el origen del universo.",
    unova: "Metrópolis moderna y cosmopolita inspirada en Nueva York. Primera región sin Pokémon previos.",
    kalos: "Región de inspiración europea famosa por sus jardines, su Torre de Cristal y la Mega Evolución.",
    alola: "Archipiélago tropical basado en Hawái, con las Pruebas Insulares y formas regionales únicas.",
    galar: "Región inspirada en Gran Bretaña donde los Pokémon participan en épicas Dynamax Battles.",
    paldea: "Vasta región de mundo abierto de inspiración ibérica, hogar del Teracristal y Miraidon.",
};

// ── País / zona de inspiración ────────────────────────────────────
export const REGION_INSPIRATION: Record<string, string> = {
    kanto: "Región de Kantō, Japón",
    johto: "Región de Kansai, Japón",
    hoenn: "Isla de Kyushu, Japón",
    sinnoh: "Isla de Hokkaidō, Japón",
    unova: "Nueva York, EE.UU.",
    kalos: "Francia, Europa",
    alola: "Hawái, EE.UU.",
    galar: "Gran Bretaña, Europa",
    paldea: "España / Portugal, Europa",
};

// ── Generación vinculada ──────────────────────────────────────────
export const REGION_GENERATION: Record<string, string> = {
    kanto: "generation-i",
    johto: "generation-ii",
    hoenn: "generation-iii",
    sinnoh: "generation-iv",
    unova: "generation-v",
    kalos: "generation-vi",
    alola: "generation-vii",
    galar: "generation-viii",
    paldea: "generation-ix",
};

// ── Nombre del Pokédex regional (para /pokedex/{name}) ────────────
export const REGION_POKEDEX_NAME: Record<string, string> = {
    kanto: "kanto",
    johto: "original-johto",
    hoenn: "hoenn",
    sinnoh: "original-sinnoh",
    unova: "original-unova",
    kalos: "kalos-central",
    alola: "original-alola",
    galar: "galar",
    paldea: "paldea",
};

// ── Año de debut ──────────────────────────────────────────────────
export const REGION_YEARS: Record<string, string> = {
    kanto: "1996", johto: "1999", hoenn: "2002", sinnoh: "2006",
    unova: "2010", kalos: "2013", alola: "2016", galar: "2019", paldea: "2022",
};

// ── Juegos en español ─────────────────────────────────────────────
export const REGION_GAMES: Record<string, string[]> = {
    kanto: ["Rojo", "Azul", "Amarillo", "FR/HV"],
    johto: ["Oro", "Plata", "Cristal", "HG/SS"],
    hoenn: ["Rubí", "Zafiro", "Esmeralda", "Rubí Ω", "Zafiro α"],
    sinnoh: ["Diamante", "Perla", "Platino", "BD/PR"],
    unova: ["Negro", "Blanco", "Negro 2", "Blanco 2"],
    kalos: ["X", "Y"],
    alola: ["Sol", "Luna", "Sol Ultra", "Luna Ultra"],
    galar: ["Espada", "Escudo", "Leyendas: Arceus"],
    paldea: ["Escarlata", "Violeta"],
};

// ── Posiciones de mapa para la transición (% del panel) ──────────
export const REGION_MAP_POSITIONS: Record<string, { x: number; y: number }> = {
    kanto: { x: 28, y: 30 },
    johto: { x: 35, y: 45 },
    hoenn: { x: 18, y: 58 },
    sinnoh: { x: 42, y: 22 },
    unova: { x: 58, y: 42 },
    kalos: { x: 22, y: 68 },
    alola: { x: 72, y: 33 },
    galar: { x: 48, y: 18 },
    paldea: { x: 62, y: 62 },
};

// ── Métodos de encuentro → label ES + ícono lucide ───────────────
export const ENCOUNTER_METHOD_META: Record<string, { label: string; icon: string }> = {
    "walk": { label: "Hierba", icon: "Leaf" },
    "old-rod": { label: "Caña Vieja", icon: "Fish" },
    "good-rod": { label: "Supercaña", icon: "Fish" },
    "super-rod": { label: "Ultracaña", icon: "Fish" },
    "surf": { label: "Surf", icon: "Waves" },
    "rock-smash": { label: "Romperroca", icon: "Hammer" },
    "headbutt": { label: "Cabezazo", icon: "Zap" },
    "gift": { label: "Regalo", icon: "Gift" },
    "gift-egg": { label: "Huevo Regalo", icon: "CircleDot" },
    "cave": { label: "Cueva", icon: "Mountain" },
    "dark-grass": { label: "Hierba Oscura", icon: "Leaf" },
    "grass-spots": { label: "Manchas Hierba", icon: "Sparkles" },
    "cave-spots": { label: "Manchas Cueva", icon: "Mountain" },
    "bridge-water-spots": { label: "Puente Acuático", icon: "Waves" },
    "rough-terrain": { label: "Terreno Rudo", icon: "Triangle" },
    "sos-battle": { label: "Batalla SOS", icon: "Radio" },
    "wormhole": { label: "Agujero", icon: "CircleDot" },
};

// ── Tipos de locación para filtros ───────────────────────────────
export type LocationType =
    | "city" | "cave" | "route" | "water" | "forest"
    | "building" | "mountain" | "island" | "other";

export const LOCATION_TYPE_META: Record<LocationType, { label: string; icon: string }> = {
    city: { label: "Ciudades", icon: "Building2" },
    cave: { label: "Cuevas", icon: "Mountain" },
    route: { label: "Rutas", icon: "Map" },
    water: { label: "Agua", icon: "Waves" },
    forest: { label: "Bosques", icon: "Trees" },
    building: { label: "Edificios", icon: "Home" },
    mountain: { label: "Montañas", icon: "Mountain2" },
    island: { label: "Islas", icon: "Anchor" },
    other: { label: "Otros", icon: "MapPin" },
};

// ── Helpers ───────────────────────────────────────────────────────

/** Inferir tipo de locación por su nombre (snake-case API) */
export function inferLocationType(name: string): LocationType {
    if (/town|city|village|metro/.test(name)) return "city";
    if (/cave|tunnel|underground|grotto/.test(name)) return "cave";
    if (/route/.test(name)) return "route";
    if (/sea|ocean|water|surf|lake|pond|river|shore|bay|harbor/.test(name)) return "water";
    if (/forest|jungle|woods|grove/.test(name)) return "forest";
    if (/tower|building|mansion|lab|rocket|base|gym|hospital|cemetery|ruins/.test(name)) return "building";
    if (/mountain|peak|summit|cliff|mt-|volcano/.test(name)) return "mountain";
    if (/island|isle/.test(name)) return "island";
    return "other";
}

/** Formatear nombre snake-case → Title Case */
export function formatLocationName(name: string): string {
    return name
        .split("-")
        .map((w) => {
            if (w === "mt") return "Mt.";
            if (w === "ss") return "SS";
            return w.charAt(0).toUpperCase() + w.slice(1);
        })
        .join(" ");
}

/** Todos los metadatos de una región en un objeto */
export function getRegionMeta(name: string) {
    return {
        color: REGION_COLORS[name] ?? "#CC0000",
        nameEs: REGION_NAMES_ES[name] ?? name,
        description: REGION_DESCRIPTIONS[name] ?? "",
        inspiration: REGION_INSPIRATION[name] ?? "",
        generation: REGION_GENERATION[name] ?? "generation-i",
        pokedex: REGION_POKEDEX_NAME[name] ?? name,
        year: REGION_YEARS[name] ?? "????",
        games: REGION_GAMES[name] ?? [],
    };
}