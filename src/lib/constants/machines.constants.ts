// ─────────────────────────────────────────────────────────────────────────────
// TMs / MÁQUINAS — Metadata completa
// ─────────────────────────────────────────────────────────────────────────────

// ── Colores de tipo ───────────────────────────────────────────────────────────
export const TYPE_COLORS: Record<string, string> = {
  normal:   "#A8A878", fire:     "#F08030", water:    "#6890F0",
  electric: "#F8D030", grass:    "#78C850", ice:      "#98D8D8",
  fighting: "#C03028", poison:   "#A040A0", ground:   "#E0C068",
  flying:   "#A890F0", psychic:  "#F85888", bug:      "#A8B820",
  rock:     "#B8A038", ghost:    "#705898", dragon:   "#7038F8",
  dark:     "#705848", steel:    "#B8B8D0", fairy:    "#EE99AC",
};

export const TYPE_NAMES_ES: Record<string, string> = {
  normal:   "Normal",    fire:     "Fuego",     water:    "Agua",
  electric: "Eléctrico", grass:    "Planta",    ice:      "Hielo",
  fighting: "Lucha",     poison:   "Veneno",    ground:   "Tierra",
  flying:   "Volador",   psychic:  "Psíquico",  bug:      "Bicho",
  rock:     "Roca",      ghost:    "Fantasma",  dragon:   "Dragón",
  dark:     "Siniestro", steel:    "Acero",     fairy:    "Hada",
};

// ── Clase de daño ─────────────────────────────────────────────────────────────
export const DAMAGE_CLASS_META: Record<string, { label: string; color: string; icon: string }> = {
  physical: { label: "Físico",   color: "#EF4444", icon: "Swords"   },
  special:  { label: "Especial", color: "#3B82F6", icon: "Sparkles" },
  status:   { label: "Estado",   color: "#10B981", icon: "Shield"   },
};

// ── Version groups → metadata ─────────────────────────────────────────────────
export const VERSION_GROUP_META: Record<string, { label: string; gen: number }> = {
  "red-blue":                        { label: "Rojo / Azul",           gen: 1 },
  "yellow":                          { label: "Amarillo",              gen: 1 },
  "gold-silver":                     { label: "Oro / Plata",           gen: 2 },
  "crystal":                         { label: "Cristal",               gen: 2 },
  "ruby-sapphire":                   { label: "Rubí / Zafiro",         gen: 3 },
  "emerald":                         { label: "Esmeralda",             gen: 3 },
  "firered-leafgreen":               { label: "Rojo Fuego / Hoja Verde",gen: 3 },
  "diamond-pearl":                   { label: "Diamante / Perla",      gen: 4 },
  "platinum":                        { label: "Platino",               gen: 4 },
  "heartgold-soulsilver":            { label: "HeartGold / SoulSilver",gen: 4 },
  "black-white":                     { label: "Negro / Blanco",        gen: 5 },
  "black-2-white-2":                 { label: "Negro 2 / Blanco 2",    gen: 5 },
  "x-y":                             { label: "X / Y",                 gen: 6 },
  "omega-ruby-alpha-sapphire":       { label: "Rubí Omega / Zafiro α", gen: 6 },
  "sun-moon":                        { label: "Sol / Luna",            gen: 7 },
  "ultra-sun-ultra-moon":            { label: "Sol Ultra / Luna Ultra", gen: 7 },
  "sword-shield":                    { label: "Espada / Escudo",       gen: 8 },
  "brilliant-diamond-shining-pearl": { label: "BD / Perla Reluciente", gen: 8 },
  "legends-arceus":                  { label: "Leyendas: Arceus",      gen: 8 },
  "scarlet-violet":                  { label: "Escarlata / Violeta",   gen: 9 },
};

// ── Colores de generación ─────────────────────────────────────────────────────
export const GEN_COLORS: Record<number, string> = {
  1: "#CC0000", 2: "#B8860B", 3: "#1B5E20", 4: "#1565C0",
  5: "#212121", 6: "#6A1B9A", 7: "#E65100", 8: "#00695C", 9: "#880E4F",
};

export const GEN_LABELS: Record<number, string> = {
  1: "Generación I",  2: "Generación II", 3: "Generación III",
  4: "Generación IV", 5: "Generación V",  6: "Generación VI",
  7: "Generación VII",8: "Generación VIII",9: "Generación IX",
};

// ── TRs (solo Sword/Shield) ───────────────────────────────────────────────────
export const TR_VERSION_GROUPS = new Set(["sword-shield"]);

// ── Helpers de parsing ────────────────────────────────────────────────────────
export function getMachinePrefix(itemName: string): "TM" | "HM" | "TR" {
  if (itemName.startsWith("hm")) return "HM";
  if (itemName.startsWith("tr")) return "TR";
  return "TM";
}

export function getMachineNumber(itemName: string): string {
  return itemName.replace(/^(tm|hm|tr)/, "").padStart(2, "0");
}

export function getMachineLabel(itemName: string): string {
  return `${getMachinePrefix(itemName)}${getMachineNumber(itemName)}`;
}

/** Extraer el TM más reciente de la lista machines[] de un movimiento */
export function getLatestTMLabel(
  machines: { machine: { name: string; url: string }; version_group: { name: string } }[]
): string {
  if (!machines || machines.length === 0) return "TM??";
  // Ordenar por generación (más alta primero)
  const sorted = [...machines].sort((a, b) => {
    const genA = VERSION_GROUP_META[a.version_group.name]?.gen ?? 0;
    const genB = VERSION_GROUP_META[b.version_group.name]?.gen ?? 0;
    return genB - genA;
  });
  // El item.name está en machine.url pero también en machine.name a veces
  // Intentar extraer desde machine.name directamente
  const latest = sorted[0];
  if (latest.machine.name) return getMachineLabel(latest.machine.name);
  // Fallback: extraer ID de la URL y devolver placeholder
  return "TM??";
}

// ── Movimientos TM populares para carga inicial ───────────────────────────────
export const POPULAR_TM_MOVES = [
  "thunderbolt", "earthquake", "ice-beam", "flamethrower", "psychic",
  "surf", "fly", "cut", "strength", "shadow-ball", "calm-mind",
  "dragon-claw", "brick-break", "toxic", "protect", "rest",
  "attract", "thief", "facade", "focus-blast", "energy-ball",
  "dark-pulse", "rock-tomb", "aerial-ace", "will-o-wisp", "roost",
  "giga-impact", "hyper-beam", "stone-edge", "swords-dance",
  "nasty-plot", "scald", "waterfall", "x-scissor", "bug-buzz",
  "flash-cannon", "shadow-claw", "thunder-wave", "bulk-up",
  "close-combat", "u-turn", "volt-switch", "substitute", "taunt",
  "charge-beam", "overheat", "grass-knot", "fire-blast", "blizzard",
  "thunder", "solar-beam", "steel-wing", "rock-slide", "outrage",
  "dragon-dance", "iron-head", "payback", "return", "return",
  "flare-blitz", "brave-bird",
];

// Sin duplicados
export const POPULAR_TM_MOVES_UNIQUE = Array.from(new Set(POPULAR_TM_MOVES));

// ── Categorías de poder ───────────────────────────────────────────────────────
export function getPowerCategory(power: number | null): { label: string; color: string } {
  if (power === null)  return { label: "Indirecto", color: "#10B981" };
  if (power <= 40)     return { label: "Bajo",      color: "#60A5FA" };
  if (power <= 80)     return { label: "Moderado",  color: "#F59E0B" };
  if (power <= 120)    return { label: "Alto",       color: "#EF4444" };
  return                      { label: "Muy alto",   color: "#A855F7" };
}

// ── Descripción de prioridad ──────────────────────────────────────────────────
export function getPriorityLabel(priority: number): { label: string; color: string } {
  if (priority > 1)  return { label: `+${priority} — Muy rápido`, color: "#EF4444" };
  if (priority === 1) return { label: "+1 — Rápido",              color: "#F59E0B" };
  if (priority === 0) return { label: "Normal",                   color: "#888888" };
  if (priority === -1) return { label: "-1 — Lento",              color: "#60A5FA" };
  return                     { label: `${priority} — Muy lento`,  color: "#3B82F6" };
}

// ── Formatear nombre slug a Title Case ───────────────────────────────────────
export function formatMoveName(name: string): string {
  return name.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

// ── Extraer ID nacional de una URL de Pokémon ─────────────────────────────────
export function extractPokemonId(url: string): number {
  return parseInt(url.match(/\/(\d+)\/?$/)?.[1] ?? "0");
}