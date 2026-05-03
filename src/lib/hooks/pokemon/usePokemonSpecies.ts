import { useQuery } from "@tanstack/react-query";
import { getPokemonSpecies } from "@/lib/api/pokemon";
import { pokemonKeys } from "@/lib/constants/api/query-keys";

export function usePokemonSpecies(idOrName: string | number) {
    return useQuery({
        queryKey: pokemonKeys.species(idOrName),
        queryFn: () => getPokemonSpecies(idOrName),
        enabled: !!idOrName,
        staleTime: Infinity,
        gcTime: Infinity,
    });
}
