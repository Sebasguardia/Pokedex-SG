import { useQuery } from "@tanstack/react-query";
import { getPokemonList } from "../api/pokemon";
import { pokemonKeys } from "../constants/query-keys";

export function usePokemonList(limit = 20, offset = 0) {
    return useQuery({
        queryKey: pokemonKeys.list({ limit, offset }),
        queryFn: () => getPokemonList(limit, offset),
    });
}
