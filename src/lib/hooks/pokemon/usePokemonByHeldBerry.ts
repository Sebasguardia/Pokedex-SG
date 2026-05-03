// src/lib/hooks/usePokemonByHeldBerry.ts

import { useQuery } from "@tanstack/react-query";
import { getItemByIdOrName } from "@/lib/api/items";
import { getPokemonByIdOrName } from "@/lib/api/pokemon";

export function usePokemonByHeldBerry(berryItemName?: string) {
    return useQuery({
        queryKey: ["held-berry", berryItemName],
        enabled: !!berryItemName,
        queryFn: async () => {
            const item = await getItemByIdOrName(berryItemName!);
            if (!item?.held_by_pokemon) return [];
            
            // Get at most 12 pokemon to prevent huge waterfalls
            const pokemonToFetch = item.held_by_pokemon.slice(0, 12);
            
            const promises = pokemonToFetch.map(async (p: any) => {
                const pokemonDetail = await getPokemonByIdOrName(p.pokemon.name);
                return {
                    pokemon: pokemonDetail,
                    version_details: p.version_details
                };
            });
            
            const results = await Promise.all(promises);
            return results;
        },
        staleTime: 1000 * 60 * 60,
    });
}
