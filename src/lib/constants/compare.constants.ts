import { PokemonStatMap } from "@/types/api/compare.types"
import { TYPE_CHART } from "./team-builder.constants"

// ── Slot colors (one per Pokémon) ─────────────────────────────────────────────
export const COMPARE_COLORS = ["#CC0000", "#3B82F6", "#22C55E", "#F59E0B"] as const
export type CompareColorIndex = 0 | 1 | 2 | 3

// ── Stats ─────────────────────────────────────────────────────────────────────
export const STAT_KEYS: (keyof PokemonStatMap)[] = [
    "hp", "attack", "defense", "specialAttack", "specialDefense", "speed"
]

export const STAT_LABELS_ES: Record<keyof PokemonStatMap, string> = {
    hp:             "PS",
    attack:         "Ataque",
    defense:        "Defensa",
    specialAttack:  "Atk. Esp.",
    specialDefense: "Def. Esp.",
    speed:          "Velocidad",
}

export const STAT_ABBR_ES: Record<keyof PokemonStatMap, string> = {
    hp:             "PS",
    attack:         "ATK",
    defense:        "DEF",
    specialAttack:  "SpA",
    specialDefense: "SpD",
    speed:          "VEL",
}

// Absolute maximums for bar normalization
export const STAT_MAX: Record<keyof PokemonStatMap, number> = {
    hp:             255,  // Blissey
    attack:         190,  // Deoxys-A
    defense:        230,  // Shuckle
    specialAttack:  194,  // Deoxys-A
    specialDefense: 230,  // Shuckle
    speed:          200,  // Regieleki
}

// ── Speed references ──────────────────────────────────────────────────────────
export const SPEED_REFERENCES = [
    { label: "Regieleki",      speed: 200, note: "Pokémon más veloz" },
    { label: "Deoxys-V",       speed: 180, note: "Forma más veloz de Deoxys" },
    { label: "Ultra-rápido",   speed: 145, note: "Categoría ultra-rápida" },
    { label: "Dragapult",      speed: 130, note: "Meta tier rápido" },
    { label: "Base 100",       speed: 100, note: "Velocidad de referencia" },
    { label: "Trick Room",     speed: 50,  note: "Zona Trick Room viable" },
]

// ── Generations ───────────────────────────────────────────────────────────────
export const GEN_LABELS: Record<number, string> = {
    1: "Gen I", 2: "Gen II", 3: "Gen III", 4: "Gen IV", 5: "Gen V",
    6: "Gen VI", 7: "Gen VII", 8: "Gen VIII", 9: "Gen IX",
}

export const GEN_COLORS: Record<number, string> = {
    1: "#CC0000", 2: "#B8860B", 3: "#1B5E20", 4: "#1565C0",
    5: "#212121", 6: "#6A1B9A", 7: "#E65100", 8: "#00695C", 9: "#880E4F",
}

export function getGenerationByPokemonId(id: number): number {
    if (id <= 151)   return 1
    if (id <= 251)   return 2
    if (id <= 386)   return 3
    if (id <= 493)   return 4
    if (id <= 649)   return 5
    if (id <= 721)   return 6
    if (id <= 809)   return 7
    if (id <= 905)   return 8
    return 9
}

// ── Breeding ──────────────────────────────────────────────────────────────────
export const EGG_GROUPS_ES: Record<string, string> = {
    "monster":       "Monstruo",
    "water1":        "Agua 1",
    "water2":        "Agua 2",
    "water3":        "Agua 3",
    "bug":           "Bicho",
    "flying":        "Volador",
    "field":         "Campo",
    "fairy":         "Hada",
    "grass":         "Planta",
    "human-like":    "Humanoide",
    "mineral":       "Mineral",
    "amorphous":     "Amorfo",
    "ditto":         "Ditto",
    "dragon":        "Dragón",
    "undiscovered":  "Desconocido",
    "no-eggs":       "Sin huevo",
}

export const GROWTH_RATES_ES: Record<string, string> = {
    "slow":              "Lento",
    "medium":            "Medio",
    "fast":              "Rápido",
    "medium-slow":       "Medio-Lento",
    "slow-then-very-fast":"Lento/Muy Rápido",
    "fast-then-very-slow":"Rápido/Muy Lento",
}

// ── Popular comparisons ───────────────────────────────────────────────────────
export const POPULAR_COMPARISONS = [
    // Generación 1 - Kanto
    { label: "Pikachu vs Raichu",       params: "p1=pikachu&p2=raichu" },
    { label: "Iniciales Kanto",         params: "p1=bulbasaur&p2=charmander&p3=squirtle" },
    { label: "Aves Kanto",              params: "p1=articuno&p2=zapdos&p3=moltres" },
    { label: "Mewtwo vs Mew",           params: "p1=mewtwo&p2=mew" },
    { label: "Fósiles Kanto",           params: "p1=omastar&p2=kabutops&p3=aerodactyl" },
    { label: "Gengar vs Alakazam",      params: "p1=gengar&p2=alakazam" },
    { label: "Eeveelutions Clásicas",   params: "p1=vaporeon&p2=jolteon&p3=flareon" },
    { label: "Snorlax vs Dragonite",    params: "p1=snorlax&p2=dragonite" },
    
    // Generación 2 - Johto
    { label: "Starters Johto",          params: "p1=chikorita&p2=cyndaquil&p3=totodile" },
    { label: "Perros Legendarios",      params: "p1=raikou&p2=entei&p3=suicune" },
    { label: "Lugia vs Ho-Oh",          params: "p1=lugia&p2=ho-oh" },
    { label: "Día vs Noche (Eevee)",    params: "p1=espeon&p2=umbreon" },
    { label: "Tyranitar vs Dragonite",  params: "p1=tyranitar&p2=dragonite" },
    { label: "Scizor vs Heracross",     params: "p1=scizor&p2=heracross" },

    // Generación 3 - Hoenn
    { label: "Iniciales Hoenn",         params: "p1=treecko&p2=torchic&p3=mudkip" },
    { label: "Creadores Hoenn",         params: "p1=groudon&p2=kyogre&p3=rayquaza" },
    { label: "Los Regis",               params: "p1=regirock&p2=regice&p3=registeel" },
    { label: "Eones Lati",              params: "p1=latias&p2=latios" },
    { label: "Metagross vs Salamence",  params: "p1=metagross&p2=salamence" },
    { label: "Zangoose vs Seviper",     params: "p1=zangoose&p2=seviper" },

    // Generación 4 - Sinnoh
    { label: "Iniciales Sinnoh",        params: "p1=turtwig&p2=chimchar&p3=piplup" },
    { label: "Creación Sinnoh",         params: "p1=dialga&p2=palkia&p3=giratina" },
    { label: "Garchomp vs Dragonite",   params: "p1=garchomp&p2=dragonite" },
    { label: "Lucario vs Infernape",    params: "p1=lucario&p2=infernape" },
    { label: "Glaceon vs Leafeon",      params: "p1=glaceon&p2=leafeon" },
    { label: "Magmortar vs Electivire", params: "p1=magmortar&p2=electivire" },

    // Generación 5 - Teselia/Unova
    { label: "Iniciales Teselia",       params: "p1=snivy&p2=tepig&p3=oshawott" },
    { label: "Dragones Ideales",        params: "p1=reshiram&p2=zekrom&p3=kyurem" },
    { label: "Fuerzas Naturaleza",      params: "p1=tornadus&p2=thundurus&p3=landorus" },
    { label: "Excadrill vs Krookodile", params: "p1=excadrill&p2=krookodile" },
    { label: "Volcarona vs Chandelure", params: "p1=volcarona&p2=chandelure" },

    // Generación 6 - Kalos
    { label: "Iniciales Kalos",         params: "p1=chespin&p2=fennekin&p3=froakie" },
    { label: "Deidades Kalos",          params: "p1=xerneas&p2=yveltal&p3=zygarde" },
    { label: "Sylveon vs Umbreon",      params: "p1=sylveon&p2=umbreon" },
    { label: "Talonflame vs Staraptor", params: "p1=talonflame&p2=staraptor" },

    // Generación 7 - Alola
    { label: "Iniciales Alola",         params: "p1=rowlet&p2=litten&p3=popplio" },
    { label: "Deidades Solares",        params: "p1=solgaleo&p2=lunala&p3=necrozma" },
    { label: "Guardianes Tapu",         params: "p1=tapu-koko&p2=tapu-lele&p3=tapu-bulu&p4=tapu-fini" },
    { label: "Mimikyu vs Pikachu",      params: "p1=mimikyu&p2=pikachu" },

    // Generación 8 - Galar
    { label: "Iniciales Galar",         params: "p1=grookey&p2=scorbunny&p3=sobble" },
    { label: "Héroes Galar",            params: "p1=zacian&p2=zamazenta&p3=eternatus" },
    { label: "Dragapult vs Garchomp",   params: "p1=dragapult&p2=garchomp" },
    { label: "Corviknight vs Skarmory", params: "p1=corviknight&p2=skarmory" },

    // Generación 9 - Paldea
    { label: "Iniciales Paldea",        params: "p1=sprigatito&p2=fuecoco&p3=quaxly" },
    { label: "Monturas Paldea",         params: "p1=koraidon&p2=miraidon" },
    { label: "Tinkaton vs Corviknight", params: "p1=tinkaton&p2=corviknight" },
    { label: "Ceruledge vs Armarouge",  params: "p1=ceruledge&p2=armarouge" },
]

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Returns indices of the items with the max value (can be multiple = tie) */
export function getWinners(values: (number | null)[]): number[] {
    const nonNull = values.filter((v): v is number => v !== null)
    if (nonNull.length === 0) return []
    const max = Math.max(...nonNull)
    return values.reduce<number[]>((acc, v, i) => {
        if (v === max) acc.push(i)
        return acc
    }, [])
}

/** Returns indices of the items with the min value (for captureRate etc.) */
export function getMinWinners(values: (number | null)[]): number[] {
    const nonNull = values.filter((v): v is number => v !== null)
    if (nonNull.length === 0) return []
    const min = Math.min(...nonNull)
    return values.reduce<number[]>((acc, v, i) => {
        if (v === min) acc.push(i)
        return acc
    }, [])
}

/** Intersection of move slug arrays */
export function getSharedMoves(pokemonMoves: string[][]): string[] {
    if (pokemonMoves.length < 2) return []
    const sets = pokemonMoves.map(moves => new Set(moves))
    const base = sets[0]
    return Array.from(base).filter(m => sets.slice(1).every(s => s.has(m))).sort()
}

/** Intersection of ability name arrays */
export function getSharedAbilities(pokemonAbilityNames: string[][]): string[] {
    if (pokemonAbilityNames.length < 2) return []
    const sets = pokemonAbilityNames.map(names => new Set(names))
    const base = sets[0]
    return Array.from(base).filter(a => sets.slice(1).every(s => s.has(a)))
}

/** Effectiveness of one attacking type against an array of defending types */
export function getEffectiveness(attackType: string, defTypes: string[]): number {
    return defTypes.reduce((mult, defType) =>
        mult * (TYPE_CHART[attackType]?.[defType] ?? 1), 1)
}

/** Cell style based on type effectiveness multiplier */
export function getCellStyle(mult: number): { bg: string; text: string; label: string } {
    if (mult >= 4)   return { bg: "#FEE2E2", text: "#DC2626", label: "×4" }
    if (mult >= 2)   return { bg: "#FEF3C7", text: "#D97706", label: "×2" }
    if (mult === 0)  return { bg: "#DBEAFE", text: "#2563EB", label: "×0" }
    if (mult <= 0.25) return { bg: "#BBF7D0", text: "#15803D", label: "×¼" }
    if (mult <= 0.5) return { bg: "#DCFCE7", text: "#16A34A", label: "×½" }
    return { bg: "#F9FAFB", text: "#9CA3AF", label: "×1" }
}

export const formatHeight = (h: number) => `${(h / 10).toFixed(1)} m`
export const formatWeight = (w: number) => `${(w / 10).toFixed(1)} kg`

export function formatPokemonName(name: string): string {
    return name.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
}

export function formatGenderRate(rate: number): string {
    if (rate === -1) return "Sin género"
    if (rate === 0)  return "Solo ♂"
    if (rate === 8)  return "Solo ♀"
    const female = (rate / 8) * 100
    return `♂ ${100 - female}%  /  ♀ ${female}%`
}
