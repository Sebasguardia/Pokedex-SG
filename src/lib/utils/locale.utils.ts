import { cleanFlavorText } from "./flavor-text.utils"

/** Generic entry with a language field */
interface LocaleEntry {
    language: { name: string }
    [key: string]: unknown
}

/**
 * Returns the Spanish text from an array of localized entries.
 * Falls back to English if no Spanish entry is found.
 * Returns { text, isFallback } so the UI can show a "EN" badge.
 */
export function getSpanish<T extends LocaleEntry>(
    entries: T[] | undefined | null,
    field: keyof T
): { text: string; isFallback: boolean } {
    if (!entries || entries.length === 0) return { text: "", isFallback: false }

    const es = entries.find(e => e.language.name.startsWith("es"))
    const en = entries.find(e => e.language.name === "en")
    const entry = es ?? en

    if (!entry) return { text: "", isFallback: false }

    const raw = String(entry[field] ?? "")
    return {
        text: cleanFlavorText(raw),
        isFallback: !es && !!en,
    }
}

/**
 * Shorthand for getSpanish when you only need the text (no badge needed).
 */
export function getSpanishText<T extends LocaleEntry>(
    entries: T[] | undefined | null,
    field: keyof T
): string {
    return getSpanish(entries, field).text
}

/** Map game version slugs to display names in Spanish */
export const VERSION_NAMES_ES: Record<string, string> = {
    "red": "Rojo", "blue": "Azul", "yellow": "Amarillo",
    "gold": "Oro", "silver": "Plata", "crystal": "Cristal",
    "ruby": "Rubí", "sapphire": "Zafiro", "emerald": "Esmeralda",
    "firered": "Rojo Fuego", "leafgreen": "Verde Hoja",
    "diamond": "Diamante", "pearl": "Perla", "platinum": "Platino",
    "heartgold": "Oro HeartGold", "soulsilver": "Plata SoulSilver",
    "black": "Negro", "white": "Blanco",
    "black-2": "Negro 2", "white-2": "Blanco 2",
    "x": "X", "y": "Y",
    "omega-ruby": "Rubí Omega", "alpha-sapphire": "Zafiro Alfa",
    "sun": "Sol", "moon": "Luna",
    "ultra-sun": "Ultrasol", "ultra-moon": "Ultraluna",
    "lets-go-pikachu": "Let's Go Pikachu", "lets-go-eevee": "Let's Go Eevee",
    "sword": "Espada", "shield": "Escudo",
    "brilliant-diamond": "Diamante Brillante", "shining-pearl": "Perla Reluciente",
    "legends-arceus": "Leyendas Arceus",
    "scarlet": "Escarlata", "violet": "Violeta",
}

/** Map encounter method slugs to Spanish */
export const ENCOUNTER_METHODS_ES: Record<string, string> = {
    "walk": "Hierba alta", "surf": "Surf", "rod": "Caña",
    "old-rod": "Caña vieja", "good-rod": "Caña buena", "super-rod": "Super caña",
    "rock-smash": "Romperocas", "headbutt": "Cabezazo",
    "gift": "Obsequio", "only-one": "Único",
    "pokeradar": "Pokéradar", "gift-egg": "Huevo regalo",
    "sos-battle": "Llamada de auxilio", "berry-piles": "Montones de bayas",
    "tall-grass": "Hierba alta", "cave": "Cueva",
    "sea": "Mar", "waterfall": "Cascada",
}

/** Map encounter condition values to Spanish */
export const ENCOUNTER_CONDITIONS_ES: Record<string, string> = {
    "time-morning": "Mañana", "time-day": "Día", "time-night": "Noche",
    "swarm-yes": "Con plaga", "swarm-no": "Sin plaga",
    "radar-on": "Con Pokéradar", "radar-off": "Sin Pokéradar",
    "slot2-none": "Sin slot 2", "radio-off": "Radio apagada",
    "radio-prof-oak": "Radio: Profesor Oak", "radio-poke-flute": "Radio: Flauta Poké",
}

/** Map growth rate names to Spanish */
export const GROWTH_RATES_ES: Record<string, string> = {
    "slow": "Lento",
    "medium": "Media velocidad",
    "fast": "Rápido",
    "medium-slow": "Media-Lenta",
    "slow-then-very-fast": "Errática",
    "fast-then-very-slow": "Fluctuante",
}

/** Map egg group names to Spanish */
export const EGG_GROUPS_ES: Record<string, string> = {
    "monster": "Monstruo", "water1": "Agua 1", "water2": "Agua 2", "water3": "Agua 3",
    "bug": "Bicho", "flying": "Volador", "ground": "Tierra", "fairy": "Hada",
    "plant": "Planta", "humanshape": "Humanoide", "mineral": "Mineral",
    "indeterminate": "Amorfo", "ditto": "Ditto", "dragon": "Dragón",
    "no-eggs": "Sin huevos",
}

/** Map move damage class to Spanish */
export const DAMAGE_CLASS_ES: Record<string, string> = {
    "physical": "Físico",
    "special": "Especial",
    "status": "Estado",
}

/** Map move target to Spanish */
export const MOVE_TARGET_ES: Record<string, string> = {
    "selected-pokemon": "Pokémon elegido",
    "all-other-pokemon": "Todos los demás Pokémon",
    "all-opponents": "Todos los rivales",
    "user": "Uno mismo",
    "all-pokemon": "Todos los Pokémon",
    "random-opponent": "Rival aleatorio",
    "entire-field": "Todo el campo",
    "user-or-ally": "Uno mismo o aliado",
    "ally": "Aliado",
    "users-field": "Campo propio",
    "opponents-field": "Campo rival",
    "user-and-allies": "Uno mismo y aliados",
    "selected-pokemon-me-first": "Pokémon elegido (primero)",
    "all-allies": "Todos los aliados",
    "fainting-pokemon": "Pokémon debilitado",
}

/** Map move ailment to Spanish */
export const AILMENT_ES: Record<string, string> = {
    "none": "Ninguno", "burn": "Quemadura", "paralysis": "Parálisis",
    "freeze": "Congelación", "confusion": "Confusión", "poison": "Veneno",
    "bad-poison": "Envenenamiento grave", "sleep": "Sueño", "infatuation": "Enamoramiento",
    "trap": "Trampa", "nightmare": "Pesadilla", "torment": "Tormento",
    "inability": "Incapacidad", "flinch": "Retroceso",
    "embargo": "Embargo", "fluster": "Distracción", "recharge": "Recarga",
    "silence": "Silencio", "heal-block": "Bloqueo cura",
    "no-type-immunity": "Sin inmunidad de tipo",
    "leech-seed": "Drenadoras",
}

/** Map habitat to Spanish */
export const HABITAT_ES: Record<string, string> = {
    "cave": "Cueva", "forest": "Bosque", "grassland": "Pradera",
    "mountain": "Montaña", "rare": "Poco común", "rough-terrain": "Terreno escarpado",
    "sea": "Mar", "urban": "Urbano", "waters-edge": "Orilla del agua",
}

/** Map Pokémon color to Spanish */
export const COLOR_ES: Record<string, string> = {
    "black": "Negro", "blue": "Azul", "brown": "Marrón", "gray": "Gris",
    "green": "Verde", "pink": "Rosa", "purple": "Morado", "red": "Rojo",
    "white": "Blanco", "yellow": "Amarillo",
}

/** Map contest types to Spanish */
export const CONTEST_TYPE_ES: Record<string, string> = {
    "cool": "Cool", "beautiful": "Belleza", "cute": "Lindo",
    "clever": "Inteligencia", "tough": "Dureza",
}

export const ITEMS_ES: Record<string, string> = {
    "water-stone": "Piedra Agua",
    "fire-stone": "Piedra Fuego",
    "thunder-stone": "Piedra Trueno",
    "leaf-stone": "Piedra Hoja",
    "moon-stone": "Piedra Lunar",
    "sun-stone": "Piedra Solar",
    "shiny-stone": "Piedra Día",
    "dusk-stone": "Piedra Noche",
    "dawn-stone": "Piedra Alba",
    "ice-stone": "Piedra Hielo",
    "up-grade": "Mejora",
    "dubious-disc": "Disco Extraño",
    "protector": "Protector",
    "electirizer": "Electrizador",
    "magmarizer": "Magmatizador",
    "reaper-cloth": "Tela Terrible",
    "prism-scale": "Escama Bella",
    "whipped-dream": "Dulce de Nata",
    "sachet": "Saquito Fragante",
    "dragon-scale": "Escama Dragón",
    "kings-rock": "Roca del Rey",
    "metal-coat": "Revestimiento Metálico",
    "oval-stone": "Piedra Oval",
    "razor-claw": "Garra Afilada",
    "razor-fang": "Colmillo Agudo",
    "deep-sea-scale": "Escama Marina",
    "deep-sea-tooth": "Diente Marino",
    "sweet-apple": "Manzana Dulce",
    "tart-apple": "Manzana Ácida",
    "cracked-pot": "Tetera Rota",
    "chipped-pot": "Tetera Desportillada",
    "galarica-cuff": "Brazal Galariano",
    "galarica-wreath": "Corona Galariana",
    "black-augurite": "Mineral Negro",
    "peat-block": "Bloque de Turba",
    "syrupy-apple": "Manzana Melosa",
    "unremarkable-teacup": "Taza Mediocre",
    "masterpiece-teacup": "Taza Exquisita",
    "metal-alloy": "Aleación Metálica",
    "auspicious-armor": "Armadura Auspiciosa",
    "malicious-armor": "Armadura Maliciosa",
    "leaders-crest": "Emblema del Líder"
};
