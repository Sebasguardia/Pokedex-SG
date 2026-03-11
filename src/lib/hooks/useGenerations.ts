import { useQuery } from "@tanstack/react-query";
import { getGenerationList, getGenerationByIdOrName } from "../api/generations";

export function useGenerations() {
    return useQuery({
        queryKey: ["generations", "list"],
        queryFn: () => getGenerationList(),
    });
}

export function useGeneration(idOrName: string | number) {
    return useQuery({
        queryKey: ["generations", "detail", idOrName],
        queryFn: () => getGenerationByIdOrName(idOrName),
        enabled: !!idOrName,
    });
}
