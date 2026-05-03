import { useQuery } from "@tanstack/react-query";
import { getPokemonList } from "@/lib/api/pokemon";
import { pokemonKeys } from "@/lib/constants/api/query-keys";

export function usePokemonList(limit = 20, offset = 0) {
    return useQuery({
        queryKey: pokemonKeys.list({ limit, offset }),
        queryFn: () => getPokemonList(limit, offset),
        staleTime: Infinity,
    });
}
