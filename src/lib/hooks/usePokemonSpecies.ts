import { useQuery } from "@tanstack/react-query";
import { getPokemonSpecies } from "../api/pokemon";
import { pokemonKeys } from "../constants/query-keys";

export function usePokemonSpecies(idOrName: string | number) {
    return useQuery({
        queryKey: pokemonKeys.species(idOrName),
        queryFn: () => getPokemonSpecies(idOrName),
        enabled: !!idOrName,
    });
}
