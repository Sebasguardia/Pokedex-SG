import { useQuery } from "@tanstack/react-query";
import { getGenerationList, getGenerationByIdOrName, getGenerationsList } from "@/lib/api/generations";

// Hook original — lista básica (ya existía)
export function useGenerations() {
    return useQuery({
        queryKey: ["generations", "list"],
        queryFn: () => getGenerationList(),
    });
}

// Hook original — detalle individual (ya existía)
export function useGeneration(idOrName: string | number) {
    return useQuery({
        queryKey: ["generations", "detail", idOrName],
        queryFn: () => getGenerationByIdOrName(idOrName),
        enabled: !!idOrName,
    });
}

// NUEVO: carga las 9 generaciones completas de una sola vez
// staleTime: Infinity → datos estáticos, nunca revalidar
export function useGenerationsList() {
    return useQuery({
        queryKey: ["generations", "all"],
        queryFn: getGenerationsList,
        staleTime: Infinity,
        gcTime: Infinity,
    });
}