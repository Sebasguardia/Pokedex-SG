// ─────────────────────────────────────────────────────────────────────────────
// NATURALEZAS — Metadata completa de las 25 naturalezas
// ─────────────────────────────────────────────────────────────────────────────

export type StatName = "attack" | "defense" | "special-attack" | "special-defense" | "speed";
export type FlavorName = "spicy" | "dry" | "sweet" | "bitter" | "sour";

export interface NatureMeta {
    name: string;
    nameEs: string;
    increased: StatName | null;
    decreased: StatName | null;
    likesFlavor: FlavorName | null;
    hatesFlavor: FlavorName | null;
    isNeutral: boolean;
}

// ── Las 25 naturalezas ────────────────────────────────────────────────────────
export const NATURES_DATA: NatureMeta[] = [
    // Neutras (diagonal de la tabla — no modifican ningún stat)
    { name: "hardy", nameEs: "Fuerte", increased: null, decreased: null, likesFlavor: null, hatesFlavor: null, isNeutral: true },
    { name: "docile", nameEs: "Dócil", increased: null, decreased: null, likesFlavor: null, hatesFlavor: null, isNeutral: true },
    { name: "serious", nameEs: "Seria", increased: null, decreased: null, likesFlavor: null, hatesFlavor: null, isNeutral: true },
    { name: "bashful", nameEs: "Tímida", increased: null, decreased: null, likesFlavor: null, hatesFlavor: null, isNeutral: true },
    { name: "quirky", nameEs: "Rara", increased: null, decreased: null, likesFlavor: null, hatesFlavor: null, isNeutral: true },
    // +Ataque
    { name: "lonely", nameEs: "Huraña", increased: "attack", decreased: "defense", likesFlavor: "spicy", hatesFlavor: "sour", isNeutral: false },
    { name: "brave", nameEs: "Osada", increased: "attack", decreased: "speed", likesFlavor: "spicy", hatesFlavor: "sweet", isNeutral: false },
    { name: "adamant", nameEs: "Firme", increased: "attack", decreased: "special-attack", likesFlavor: "spicy", hatesFlavor: "dry", isNeutral: false },
    { name: "naughty", nameEs: "Pícara", increased: "attack", decreased: "special-defense", likesFlavor: "spicy", hatesFlavor: "bitter", isNeutral: false },
    // +Defensa
    { name: "bold", nameEs: "Audaz", increased: "defense", decreased: "attack", likesFlavor: "sour", hatesFlavor: "spicy", isNeutral: false },
    { name: "relaxed", nameEs: "Plácida", increased: "defense", decreased: "speed", likesFlavor: "sour", hatesFlavor: "sweet", isNeutral: false },
    { name: "impish", nameEs: "Picante", increased: "defense", decreased: "special-attack", likesFlavor: "sour", hatesFlavor: "dry", isNeutral: false },
    { name: "lax", nameEs: "Floja", increased: "defense", decreased: "special-defense", likesFlavor: "sour", hatesFlavor: "bitter", isNeutral: false },
    // +Atk Especial
    { name: "modest", nameEs: "Modesta", increased: "special-attack", decreased: "attack", likesFlavor: "dry", hatesFlavor: "spicy", isNeutral: false },
    { name: "mild", nameEs: "Afable", increased: "special-attack", decreased: "defense", likesFlavor: "dry", hatesFlavor: "sour", isNeutral: false },
    { name: "quiet", nameEs: "Mansa", increased: "special-attack", decreased: "speed", likesFlavor: "dry", hatesFlavor: "sweet", isNeutral: false },
    { name: "rash", nameEs: "Alocada", increased: "special-attack", decreased: "special-defense", likesFlavor: "dry", hatesFlavor: "bitter", isNeutral: false },
    // +Def Especial
    { name: "calm", nameEs: "Serena", increased: "special-defense", decreased: "attack", likesFlavor: "bitter", hatesFlavor: "spicy", isNeutral: false },
    { name: "gentle", nameEs: "Amable", increased: "special-defense", decreased: "defense", likesFlavor: "bitter", hatesFlavor: "sour", isNeutral: false },
    { name: "sassy", nameEs: "Grosera", increased: "special-defense", decreased: "speed", likesFlavor: "bitter", hatesFlavor: "sweet", isNeutral: false },
    { name: "careful", nameEs: "Cauta", increased: "special-defense", decreased: "special-attack", likesFlavor: "bitter", hatesFlavor: "dry", isNeutral: false },
    // +Velocidad
    { name: "timid", nameEs: "Miedosa", increased: "speed", decreased: "attack", likesFlavor: "sweet", hatesFlavor: "spicy", isNeutral: false },
    { name: "hasty", nameEs: "Activa", increased: "speed", decreased: "defense", likesFlavor: "sweet", hatesFlavor: "sour", isNeutral: false },
    { name: "jolly", nameEs: "Alegre", increased: "speed", decreased: "special-attack", likesFlavor: "sweet", hatesFlavor: "dry", isNeutral: false },
    { name: "naive", nameEs: "Ingenua", increased: "speed", decreased: "special-defense", likesFlavor: "sweet", hatesFlavor: "bitter", isNeutral: false },
];

// ── Colores de stats ──────────────────────────────────────────────────────────
export const STAT_COLORS: Record<string, string> = {
    "attack": "#EF4444",
    "defense": "#F59E0B",
    "special-attack": "#3B82F6",
    "special-defense": "#10B981",
    "speed": "#F472B6",
    "hp": "#A855F7",
};

export const STAT_NAMES_ES: Record<string, string> = {
    "attack": "Ataque",
    "defense": "Defensa",
    "special-attack": "Atk. Esp.",
    "special-defense": "Def. Esp.",
    "speed": "Velocidad",
    "hp": "PS",
};

export const STAT_ABBR: Record<string, string> = {
    "attack": "ATK",
    "defense": "DEF",
    "special-attack": "SpA",
    "special-defense": "SpD",
    "speed": "VEL",
};

// ── Colores y metadata de sabores ─────────────────────────────────────────────
export const FLAVOR_COLORS: Record<string, string> = {
    spicy: "#EF4444",
    dry: "#60A5FA",
    sweet: "#F472B6",
    bitter: "#4ADE80",
    sour: "#FACC15",
};

export const FLAVOR_NAMES_ES: Record<string, string> = {
    spicy: "Picante",
    dry: "Seco",
    sweet: "Dulce",
    bitter: "Amargo",
    sour: "Ácido",
};

// Sabor → stat asociado
export const FLAVOR_STAT_RELATION: Record<string, string> = {
    spicy: "attack",
    dry: "special-attack",
    sweet: "speed",
    bitter: "special-defense",
    sour: "defense",
};

// Bayas representativas por sabor (para cross-link con /berries)
export const BERRIES_BY_FLAVOR: Record<string, { name: string; nameEs: string; id: number }[]> = {
    spicy: [{ name: "cheri", nameEs: "Baya Cheri", id: 1 }, { name: "tamato", nameEs: "Baya Tamato", id: 21 }],
    dry: [{ name: "pecha", nameEs: "Baya Pecha", id: 3 }, { name: "wiki", nameEs: "Baya Wiki", id: 23 }],
    sweet: [{ name: "rawst", nameEs: "Baya Rawst", id: 4 }, { name: "mago", nameEs: "Baya Mago", id: 24 }],
    bitter: [{ name: "aspear", nameEs: "Baya Aspear", id: 5 }, { name: "aguav", nameEs: "Baya Aguav", id: 25 }],
    sour: [{ name: "leppa", nameEs: "Baya Leppa", id: 6 }, { name: "iapapa", nameEs: "Baya Iapapa", id: 26 }],
};

// ── La tabla 5×5 (filas = stat sube, columnas = stat baja) ───────────────────
export const TABLE_STATS: StatName[] = [
    "attack", "defense", "special-attack", "special-defense", "speed",
];

export const NATURE_TABLE: Record<string, Record<string, string>> = {
    "attack": { "attack": "hardy", "defense": "lonely", "special-attack": "adamant", "special-defense": "naughty", "speed": "brave" },
    "defense": { "attack": "bold", "defense": "docile", "special-attack": "impish", "special-defense": "lax", "speed": "relaxed" },
    "special-attack": { "attack": "modest", "defense": "mild", "special-attack": "bashful", "special-defense": "rash", "speed": "quiet" },
    "special-defense": { "attack": "calm", "defense": "gentle", "special-attack": "careful", "special-defense": "quirky", "speed": "sassy" },
    "speed": { "attack": "timid", "defense": "hasty", "special-attack": "jolly", "special-defense": "naive", "speed": "serious" },
};

// ── Tips competitivos por stat ────────────────────────────────────────────────
export const STAT_COMPETITIVE_TIPS: Record<string, string> = {
    "attack": "Ideal para atacantes físicos. Maximiza el daño de movimientos de contacto y físicos. La naturaleza más elegida en equipos ofensivos.",
    "defense": "Para tanques físicos. Reduce el daño recibido de ataques físicos. Muy útil en Pokémon con roles defensivos o de soporte.",
    "special-attack": "Para atacantes especiales. Potencia los movimientos mágicos y de largo alcance. Fundamental en sweepers especiales.",
    "special-defense": "Para tanques especiales. Aguanta mejor los ataques especiales rivales. Clave en roles de Wish-passer o Support defensivo.",
    "speed": "El stat más codiciado en competitivo. Quien golpea primero en muchos casos controla el intercambio. Esencial en sweepers ofensivos.",
};

// ── Pokémon icónicos por naturaleza ──────────────────────────────────────────
export const NATURE_ICONIC_POKEMON: Record<string, { name: string; id: number; reason: string }[]> = {
    adamant: [{ name: "Garchomp", id: 445, reason: "Máximo daño físico con Dragon Claw" }, { name: "Dragonite", id: 149, reason: "Dragon Dance + Extremespeed" }, { name: "Scizor", id: 212, reason: "Bullet Punch STAB devastador" }],
    modest: [{ name: "Gardevoir", id: 282, reason: "Moonblast potenciado al máximo" }, { name: "Gengar", id: 94, reason: "Sweeper especial puro" }, { name: "Mewtwo", id: 150, reason: "El rey de los atacantes especiales" }],
    timid: [{ name: "Greninja", id: 658, reason: "Máxima velocidad para atacar primero" }, { name: "Jolteon", id: 135, reason: "Aprovecha su altísima velocidad base" }, { name: "Alakazam", id: 65, reason: "Psíquico veloz y poderoso" }],
    jolly: [{ name: "Talonflame", id: 663, reason: "Flare Blitz + Brave Bird con prioridad" }, { name: "Lucario", id: 448, reason: "Extremespeed físico y Swords Dance" }, { name: "Weavile", id: 461, reason: "Velocidad + ataque físico letal" }],
    bold: [{ name: "Clefable", id: 36, reason: "Tanque especial con Soft-Boiled" }, { name: "Vaporeon", id: 134, reason: "Wish + Protect con alta defensa" }, { name: "Blissey", id: 242, reason: "Pared física casi infranqueable" }],
    calm: [{ name: "Chansey", id: 113, reason: "El mejor tanque especial del juego" }, { name: "Umbreon", id: 197, reason: "Wish + Protect, tanque especial" }],
    impish: [{ name: "Hippowdon", id: 450, reason: "Arena + defensa física monumental" }, { name: "Skarmory", id: 227, reason: "Hazards + defensa física extrema" }, { name: "Ferrothorn", id: 598, reason: "Stealth Rock + Leech Seed" }],
    careful: [{ name: "Snorlax", id: 143, reason: "Tanque mixto con Curse" }, { name: "Tyranitar", id: 248, reason: "Sand Stream + tanque especial" }],
    relaxed: [{ name: "Forretress", id: 205, reason: "Hazards lentos, defensa física" }, { name: "Ferrothorn", id: 598, reason: "Defensa física + lentitud útil" }],
    quiet: [{ name: "Reuniclus", id: 579, reason: "Trick Room sweeper especial" }, { name: "Cofagrigus", id: 563, reason: "Trick Room y soporte" }],
    brave: [{ name: "Snorlax", id: 143, reason: "Trick Room atacante físico" }, { name: "Conkeldurr", id: 534, reason: "Trick Room físico devastador" }],
    naive: [{ name: "Infernape", id: 392, reason: "Atacante mixto veloz" }, { name: "Greninja", id: 658, reason: "Sweeper mixto rapidísimo" }],
    hasty: [{ name: "Greninja", id: 658, reason: "Mixto rápido y potente" }, { name: "Flygon", id: 330, reason: "Outrage + Fire Blast" }],
    mild: [{ name: "Dragonite", id: 149, reason: "Mixto especial/físico" }],
    rash: [{ name: "Deoxys", id: 386, reason: "Forma Ataque puro especial" }],
    naughty: [{ name: "Dragonite", id: 149, reason: "Dragon Dance + Fire Blast mixto" }],
    lonely: [{ name: "Dragonite", id: 149, reason: "Mixto físico potente" }],
    sassy: [{ name: "Bronzong", id: 442, reason: "Trick Room soporte especial" }],
    lax: [],
    gentle: [],
    hardy: [],
    docile: [],
    serious: [],
    bashful: [],
    quirky: [],
};

// ── Helper: obtener meta de una naturaleza por nombre ─────────────────────────
export function getNatureMeta(name: string): NatureMeta | undefined {
    return NATURES_DATA.find((n) => n.name === name);
}

// ── Helper: naturalezas que comparten el mismo stat subido ───────────────────
export function getNaturesWithSameStat(natureName: string): NatureMeta[] {
    const meta = getNatureMeta(natureName);
    if (!meta || meta.isNeutral) return [];
    return NATURES_DATA.filter((n) => n.increased === meta.increased && n.name !== natureName && !n.isNeutral);
}