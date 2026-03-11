import { apiClient } from "./client";
import { NamedAPIResourceList } from "@/types/api/common.types";
import { Pokemon } from "@/types/api/pokemon.types";

// Note: Reusing the same interface for pokemon type as a temporary measure 
// until we separate all types effectively, but keeping API consistent.

export async function getPokemonList(limit = 20, offset = 0) {
    const { data } = await apiClient.get<NamedAPIResourceList>(`/pokemon`, {
        params: { limit, offset }
    });
    return data;
}

export async function getPokemonByIdOrName(idOrName: string | number) {
    const { data } = await apiClient.get<Pokemon>(`/pokemon/${idOrName}`);
    return data;
}

export async function getPokemonSpecies(idOrName: string | number) {
    const { data } = await apiClient.get(`/pokemon-species/${idOrName}`);
    return data;
}
