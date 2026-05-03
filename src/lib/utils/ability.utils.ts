import { ABILITY_KEYWORDS } from "../constants/abilities/abilities.constants"

/**
 * Infers the category of an ability based on its effect text
 */
export function inferAbilityCategory(effect: string): string {
    const text = effect.toLowerCase()

    // Check Overworld
    if (ABILITY_KEYWORDS.overworld.some(k => text.includes(k.toLowerCase()))) return "overworld"

    // Check Support (clima, terrains, ailments)
    if (ABILITY_KEYWORDS.support.some(k => text.includes(k.toLowerCase()))) return "support"

    // Check Offensive
    if (ABILITY_KEYWORDS.offensive.some(k => text.includes(k.toLowerCase()))) return "offensive"

    // Check Defensive
    if (ABILITY_KEYWORDS.defensive.some(k => text.includes(k.toLowerCase()))) return "defensive"

    return "passive"
}

/**
 * Cleans flavor text from special characters
 */
export function cleanAbilityFlavorText(text: string): string {
    return text
        .replace(/\f/g, "\n")
        .replace(/\u00ad\n/g, "")
        .replace(/\u00ad/g, "")
        .replace(/ -\n/g, " - ")
        .replace(/-\n/g, "-")
        .replace(/\n\s*/g, " ")
        .trim();
}

/**
 * Deduplicates flavor texts by grouping versions with identical text
 */
export function deduplicateFlavorTexts(entries: any[]): any[] {
    const map = new Map<string, string[]>()

    // Filter to English or Spanish
    const filtered = entries.filter(e => e.language.name === "es" || e.language.name === "en")

    // Prioritize Spanish if both exist for same version? 
    // Actually, PokeAPI has specific language entries.

    filtered.forEach(entry => {
        const text = cleanAbilityFlavorText(entry.flavor_text)
        if (map.has(text)) {
            map.get(text)?.push(entry.version_group.name)
        } else {
            map.set(text, [entry.version_group.name])
        }
    })

    return Array.from(map.entries()).map(([text, versions]) => ({
        text,
        versions
    }))
}

/**
 * Extracts numeric values or specific keywords from effect text for highlighting
 */
export function getEffectHighlights(text: string) {
    const stats = ["Ataque", "Defensa", "Velocidad", "Ataque Especial", "Defensa Especial", "Evasión", "Precisión"]
    const types = ["Acero", "Agua", "Bicho", "Dragón", "Eléctrico", "Hada", "Fantasma", "Fuego", "Hielo", "Lucha", "Normal", "Planta", "Psíquico", "Roca", "Siniestro", "Tierra", "Veneno", "Volador"]

    // Logic for regex highlights could go here
    return { stats, types }
}
