/**
 * Cleans PokéAPI flavor text by removing escape characters
 * and replacing form feeds and line breaks with spaces.
 */
export function cleanFlavorText(text?: string | null): string {
    if (!text) return "";
    return text
        .replace(/\f/g, " ")
        .replace(/\n/g, " ")
        .replace(/\r/g, " ")
        .replace(/\u00ad/g, "")
        .replace(/POKéMON/g, "Pokémon")
        .trim();
}

/** Get flavor text in a preferred language, fallback to English */
export function getFlavorText(
    entries: { flavor_text: string; language: { name: string } }[],
    lang = "es"
): string {
    const found = entries.find((e) => e.language.name === lang)
        ?? entries.find((e) => e.language.name === "en");
    return found ? cleanFlavorText(found.flavor_text) : "";
}
