import { useQuery } from "@tanstack/react-query";
import { getEvolutionChainById } from "@/lib/api/evolutions";

export function useEvolutionChain(id: number) {
    return useQuery({
        queryKey: ["evolution-chain", id],
        queryFn: () => getEvolutionChainById(id),
        enabled: !!id,
        staleTime: Infinity,
        gcTime: Infinity,
    });
}
