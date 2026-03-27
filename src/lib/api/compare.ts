import { apiClient } from "./client"
import { ComparedPokemon } from "@/types/api/compare.types"
import { formatPokemonName } from "@/lib/constants/compare.constants"

export async function getPokemonForCompare(idOrName: string | number): Promise<ComparedPokemon> {
    // Parallel fetch — species can fail for alternate forms
    const [pokemonRes, speciesRes] = await Promise.all([
        apiClient.get(`/pokemon/${idOrName}`),
        apiClient.get(`/pokemon-species/${idOrName}`).catch(() => null),
    ])

    const p = pokemonRes.data
    const s = speciesRes?.data ?? null

    // ── Stats ─────────────────────────────────────────────────────────────────
    const statMap: Record<string, number> = {}
    for (const st of p.stats) {
        statMap[st.stat.name] = st.base_stat
    }

    const stats = {
        hp:             statMap["hp"] ?? 0,
        attack:         statMap["attack"] ?? 0,
        defense:        statMap["defense"] ?? 0,
        specialAttack:  statMap["special-attack"] ?? 0,
        specialDefense: statMap["special-defense"] ?? 0,
        speed:          statMap["speed"] ?? 0,
    }
    const bst = Object.values(stats).reduce((a, b) => a + b, 0)

    // ── Spanish name ──────────────────────────────────────────────────────────
    const nameEs = s?.names?.find((n: any) => n.language.name === "es")?.name
        ?? formatPokemonName(p.name)

    // ── Genus ─────────────────────────────────────────────────────────────────
    const genus = s?.genera?.find((g: any) => g.language.name === "es")?.genus ?? ""

    // ── Flavor text ───────────────────────────────────────────────────────────
    const flavorEntries = (s?.flavor_text_entries ?? []).filter(
        (e: any) => e.language.name === "es" || e.language.name === "en"
    )
    const esEntry = flavorEntries.filter((e: any) => e.language.name === "es").pop()
    const enEntry = flavorEntries.filter((e: any) => e.language.name === "en").pop()
    const flavorText = (esEntry ?? enEntry)?.flavor_text
        ?.replace(/\n|\f/g, " ")
        .replace(/\u00ad/g, "") ?? ""

    // ── Abilities ─────────────────────────────────────────────────────────────
    const abilities = p.abilities.map((a: any) => ({
        name:     a.ability.name,
        nameEs:   formatPokemonName(a.ability.name),
        isHidden: a.is_hidden,
        slot:     a.slot,
    }))

    // ── Types ─────────────────────────────────────────────────────────────────
    const types = p.types
        .sort((a: any, b: any) => a.slot - b.slot)
        .map((t: any) => t.type.name as string)

    // ── Moves (slug names only) ───────────────────────────────────────────────
    const moves: string[] = p.moves.map((m: any) => m.move.name as string)

    // ── Artwork & sprite URLs ─────────────────────────────────────────────────
    const artwork = p.sprites?.other?.["official-artwork"]?.front_default
        ?? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.id}.png`
    const sprite = p.sprites?.front_default
        ?? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`

    return {
        id:             p.id,
        name:           p.name,
        nameEs,
        genus,
        flavorText,
        artwork,
        sprite,
        types,
        stats,
        bst,
        abilities,
        height:          p.height,
        weight:          p.weight,
        baseExperience:  p.base_experience ?? null,
        captureRate:     s?.capture_rate ?? 0,
        baseHappiness:   s?.base_happiness ?? 0,
        genderRate:      s?.gender_rate ?? -1,
        eggGroups:       (s?.egg_groups ?? []).map((g: any) => g.name as string),
        growthRate:      s?.growth_rate?.name ?? "",
        isLegendary:     s?.is_legendary ?? false,
        isMythical:      s?.is_mythical ?? false,
        moves,
    }
}
