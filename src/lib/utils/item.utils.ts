import { Item } from "@/types/api/item.types"

// This helps map the API's pockets (which can be a bit messy) to our 8 core UI pockets
export function inferItemPocket(item: Item): "medicine" | "pokeballs" | "battle" | "berries" | "mail" | "machines" | "key" | "misc" {
    if (!item) return "misc"

    const category = item.category?.name || ""
    const attributes = item.attributes?.map(a => a.name) || []

    // 1. Explicit categories
    if (category.includes("medicine") || category.includes("healing") || category.includes("revival")) return "medicine"
    if (category.includes("standard-balls") || category.includes("special-balls") || category.includes("apricorn-balls")) return "pokeballs"
    if (category.includes("stat-boosts") || category.includes("flutes")) return "battle"
    if (category === "all-machines") return "machines"

    // Berries
    if (category === "type-protection" && item.name.includes("berry")) return "berries"
    if (category.includes("baking-only")) return "berries"
    if (category === "effort-drop") return "berries"
    if (category.includes("healing") && item.name.includes("berry")) return "berries"

    // Held Items / Mail
    if (category === "held-items" || category.includes("choice") || category.includes("type-enhancement") || category.includes("bad-held-items") || category.includes("training") || category.includes("plates")) return "mail"
    if (attributes.includes("holdable") || attributes.includes("holdable-active") || attributes.includes("holdable-passive")) return "mail"

    // Key Items
    if (category === "event-items" || category.includes("gameplay") || category.includes("plot-advancement") || category.includes("apricorn-boxes") || category.includes("data-cards") || category.includes("dex-completion")) return "key"

    // Fallbacks
    if (category.includes("evolution")) return "misc"
    if (category.includes("loot") || category.includes("mulch") || category.includes("dex-completion") || category.includes("vitamins") || category.includes("collectives")) return "misc"

    return "misc" // Default fallback
}

export function isEvolutionItem(item: Item): boolean {
    if (!item) return false
    return item.category?.name === "evolution" ||
        item.category?.name.includes("evolution") ||
        item.name.includes("stone") ||
        item.name === "metal-coat" ||
        item.name === "kings-rock" ||
        item.name === "dragon-scale" ||
        item.name === "up-grade" ||
        item.name === "dubious-disc" ||
        item.name === "protector" ||
        item.name === "magmarizer" ||
        item.name === "electirizer" ||
        item.name === "reaper-cloth" ||
        item.name === "prism-scale"
}

export function isTMItem(item: Item): boolean {
    return item?.category?.name === "all-machines" || item?.name.startsWith("tm") || item?.name.startsWith("tr") || item?.name.startsWith("hm")
}

// Very similar to the parseEffect for moves, parsing the text
export function parseItemEffect(text: string): React.ReactNode[] {
    const regex = /\[([^\]]+)\]\{(mechanic|move|type|item|pokemon):([^}]+)\}/g
    const parts: React.ReactNode[] = []
    let lastIndex = 0
    let match: RegExpExecArray | null

    while ((match = regex.exec(text)) !== null) {
        if (match.index > lastIndex) {
            parts.push(text.slice(lastIndex, match.index))
        }

        const [, displayText, refType, refName] = match
        // The actual component parsing logic will be injected in the effect section directly
        // to avoid React node injection from non-tsx files. But we can build a simple array parser if needed.

        parts.push(displayText) // Fallback for raw text utilities
        lastIndex = regex.lastIndex
    }

    if (lastIndex < text.length) {
        parts.push(text.slice(lastIndex))
    }

    return parts
}

// Determines the sprite animation mode for the specific pocket
export function getSpriteAnimationByPocket(pocket: string): "float" | "rock" | "pulse" | "rotate" | "none" {
    switch (pocket) {
        case "medicine": return "float"
        case "pokeballs": return "rock"
        case "battle": return "pulse"
        case "machines": return "rotate"
        default: return "none"
    }
}
