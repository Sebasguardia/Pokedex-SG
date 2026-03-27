// ─────────────────────────────────────────────────────────────────────────────
// API — Team Builder
// ─────────────────────────────────────────────────────────────────────────────

import { apiClient } from "./client";
import {
    PoolPokemon, TeamMember, TeamMemberAbility,
} from "@/types/api/team-builder.types";
import {
    SPRITE_URL, ARTWORK_URL, extractId, getGenerationByPokemonId, formatPokemonName,
} from "@/lib/constants/team-builder.constants";
import { NamedAPIResourceList } from "@/types/api/common.types";

// Lista ligera de todos los Pokémon (name + url) — para la searchbar
export async function getPokemonList(): Promise<NamedAPIResourceList> {
    const { data } = await apiClient.get<NamedAPIResourceList>("/pokemon?limit=10000");
    return data;
}

// Detalle de un Pokémon — para construir un TeamMember completo
export async function getPokemonForTeam(idOrName: string | number): Promise<TeamMember> {
    const { data } = await apiClient.get<any>(`/pokemon/${idOrName}`);
    const speciesUrl = data.species?.url ?? "";
    const speciesName = await getSpeciesNameEs(speciesUrl);

    const types = (data.types as any[]).map((t: any) => t.type.name as string);
    const stats = data.stats as any[];

    const getStatVal = (name: string) =>
        stats.find((s: any) => s.stat.name === name)?.base_stat ?? 0;

    const abilities: TeamMemberAbility[] = (data.abilities as any[]).map((a: any) => ({
        name: a.ability.name as string,
        nameEs: formatPokemonName(a.ability.name as string), // fallback; enriquecido en el hook
        slot: a.slot as number,
    }));

    return {
        pokemonId: data.id as number,
        name: data.name as string,
        nameEs: speciesName,
        types,
        sprite: SPRITE_URL(data.id as number),
        artwork: ARTWORK_URL(data.id as number),
        baseStats: {
            hp: getStatVal("hp"),
            attack: getStatVal("attack"),
            defense: getStatVal("defense"),
            specialAttack: getStatVal("special-attack"),
            specialDefense: getStatVal("special-defense"),
            speed: getStatVal("speed"),
        },
        ability: abilities[0],
        availableAbilities: abilities,
        slot: 0,  // se sobrescribe al insertar en el store
    };
}

async function getSpeciesNameEs(speciesUrl: string): Promise<string> {
    if (!speciesUrl) return "";
    try {
        const path = speciesUrl.replace("https://pokeapi.co/api/v2", "");
        const { data } = await apiClient.get<any>(path);
        return (data.names as any[]).find((n: any) => n.language.name === "es")?.name
            ?? formatPokemonName((data.name as string) ?? "");
    } catch {
        return "";
    }
}

// Pool rápido de los primeros 151 para las recomendaciones
// (en la práctica se puede ampliar lazy)
export async function getLightPokemonPool(limit = 151): Promise<PoolPokemon[]> {
    const { data } = await apiClient.get<NamedAPIResourceList>(
        `/pokemon?limit=${limit}`
    );
    const details = await Promise.allSettled(
        data.results.map((p) => getPokemonForTeam(p.name))
    );
    return details
        .filter((r): r is PromiseFulfilledResult<TeamMember> => r.status === "fulfilled")
        .map((r) => {
            const m = r.value;
            const bst = Object.values(m.baseStats).reduce((a, b) => a + b, 0);
            return {
                id: m.pokemonId,
                name: m.name,
                nameEs: m.nameEs,
                types: m.types,
                sprite: m.sprite,
                artwork: m.artwork,
                bst,
                baseStats: m.baseStats,
                generation: getGenerationByPokemonId(m.pokemonId),
                isLegendary: false,
            } satisfies PoolPokemon;
        });
}