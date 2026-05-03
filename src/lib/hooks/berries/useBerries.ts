import { useQuery } from "@tanstack/react-query";
import { getBerryList, getBerryByIdOrName } from "@/lib/api/berries";

export function useBerries(limit = 64) {
    return useQuery({
        queryKey: ["berries", "list", limit],
        queryFn: () => getBerryList(limit),
    });
}

export function useBerry(idOrName: string | number) {
    return useQuery({
        queryKey: ["berries", "detail", idOrName],
        queryFn: () => getBerryByIdOrName(idOrName),
        enabled: !!idOrName,
    });
}
