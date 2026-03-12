import type { BerryFlavorMap } from "@/types/api/berry.types";
import { FLAVOR_COLORS, FLAVOR_META, BERRY_CATEGORIES } from "../constants/berries.constants";

// ─────────────────────────────────────────────────────────────
// getDominantFlavor
// Returns the BerryFlavorMap entry with the highest potency.
// Falls back to spicy with potency 0 if all flavors are 0.
// ─────────────────────────────────────────────────────────────
export function getDominantFlavor(flavors: BerryFlavorMap[]) {
    if (!flavors || flavors.length === 0) {
        return { potency: 0, flavor: { name: "spicy", url: "" } };
    }
    return flavors.reduce((prev, current) =>
        current.potency > prev.potency ? current : prev
    );
}

// ─────────────────────────────────────────────────────────────
// buildHeroGradient
// Builds a CSS gradient from the berry's active flavors.
// Single dominant (≥30) → solid radial.
// Multiple → linear blend of top 3.
// ─────────────────────────────────────────────────────────────
export function buildHeroGradient(flavors: BerryFlavorMap[]): string {
    const active = flavors
        .filter((f) => f.potency > 0)
        .sort((a, b) => b.potency - a.potency);

    if (active.length === 0) {
        return "linear-gradient(135deg, #111111 0%, #333333 100%)";
    }

    if (active.length === 1 || active[0].potency >= 30) {
        const color = FLAVOR_COLORS[active[0].flavor.name] ?? "#111111";
        return `linear-gradient(135deg, ${color} 0%, ${color}99 60%, #111111 100%)`;
    }

    const stops = active.slice(0, 3).map((f, i, arr) => {
        const color = FLAVOR_COLORS[f.flavor.name] ?? "#111111";
        const pct = Math.round((i / Math.max(arr.length - 1, 1)) * 100);
        return `${color} ${pct}%`;
    });

    return `linear-gradient(135deg, ${stops.join(", ")})`;
}

// ─────────────────────────────────────────────────────────────
// getFlavorContext
// Returns the FLAVOR_META entry for a given flavor key.
// ─────────────────────────────────────────────────────────────
export function getFlavorContext(flavorName: string) {
    return FLAVOR_META[flavorName] ?? null;
}

// ─────────────────────────────────────────────────────────────
// getBerryCategory
// Classifies a berry into one of the BERRY_CATEGORIES based on
// its item effect text or known berry name patterns.
// ─────────────────────────────────────────────────────────────

// EV-reducing berries (Gen III+): Pomeg→HP, Kelpsy→Atk,
// Qualot→Def, Hondew→SpA, Grepa→SpD, Tamato→Spe
const EV_BERRIES = [
    "pomeg", "kelpsy", "qualot", "hondew", "grepa", "tamato",
];

// Healing berries: Oran, Sitrus, Figy, Wiki, Mago, Aguav, Iapapa,
// Lum, Leppa, Pecha, Cheri, Chesto, Aspear, Rawst, Persim, etc.
const HEALING_BERRIES = [
    "oran", "sitrus", "figy", "wiki", "mago", "aguav", "iapapa",
    "lum", "leppa", "pecha", "cheri", "chesto", "aspear", "rawst",
    "persim", "enigma", "apicot", "lansat", "starf", "micle", "custap",
];

// Stat-boost berries: Liechi, Ganlon, Salac, Petaya, Apicot,
// Lansat, Starf, Enigma, Micle, Custap, Jaboca, Rowap
const STAT_BERRIES = [
    "liechi", "ganlon", "salac", "petaya", "apicot", "lansat",
    "starf", "enigma", "micle", "custap", "jaboca", "rowap",
];

// Contest berries (main use: Poffins / conditions)
const CONTEST_BERRIES = [
    "razz", "bluk", "nanab", "wepear", "pinap",
    "pomeg", "kelpsy", "qualot", "hondew", "grepa",
    "tamato", "cornn", "magost", "rabuta", "nomel",
    "spelon", "pamtre", "watmel", "durin", "belue",
    "pinap", "nomel", "cornn",
];

export function getBerryCategory(berry: any): string {
    const name: string = berry?.name?.toLowerCase() ?? "";

    if (EV_BERRIES.includes(name)) return "ev-reducing";
    if (HEALING_BERRIES.includes(name)) return "healing";
    if (STAT_BERRIES.includes(name)) return "stats";
    if (CONTEST_BERRIES.includes(name)) return "contest";

    // Fallback: scan effect text
    const effectText: string =
        berry?.item?.effect_entries?.find((e: any) => e.language?.name === "en")?.short_effect?.toLowerCase() ?? "";

    if (effectText.includes("ev") || effectText.includes("base stat")) return "ev-reducing";
    if (effectText.includes("hp") || effectText.includes("restore")) return "healing";
    if (effectText.includes("raises") || effectText.includes("increases")) return "stats";
    if (effectText.includes("poffin") || effectText.includes("contest")) return "contest";
    if (effectText.includes("bait") || effectText.includes("lure")) return "bait";

    return "other";
}

// ─────────────────────────────────────────────────────────────
// getRelatedBerries
// Returns up to 10 berries that share the same dominant flavor,
// excluding the current berry. Falls back to same firmness.
// ─────────────────────────────────────────────────────────────
export function getRelatedBerries(currentBerry: any, allBerries: any[]): any[] {
    if (!currentBerry || !allBerries?.length) return [];

    const currentDominant = getDominantFlavor(currentBerry.flavors)?.flavor.name;

    // Prefer same dominant flavor
    const sameFlavor = allBerries
        .filter((b) => b.name !== currentBerry.name)
        .filter((b) => getDominantFlavor(b.flavors)?.flavor.name === currentDominant);

    if (sameFlavor.length >= 4) return sameFlavor.slice(0, 10);

    // Fill with same firmness if not enough
    const sameFirmness = allBerries
        .filter((b) => b.name !== currentBerry.name && !sameFlavor.includes(b))
        .filter((b) => b.firmness?.name === currentBerry.firmness?.name);

    return [...sameFlavor, ...sameFirmness].slice(0, 10);
}