import { useQuery } from "@tanstack/react-query";
import { getNaturesList, getNatureByIdOrName } from "../api/natures";

/** Todas las naturalezas — staleTime: Infinity, son datos estáticos */
export function useNaturesList() {
    return useQuery({
        queryKey: ["natures", "all"],
        queryFn: getNaturesList,
        staleTime: Infinity,
        gcTime: Infinity,
    });
}

/** Una naturaleza individual */
export function useNature(idOrName: string | number) {
    return useQuery({
        queryKey: ["nature", idOrName],
        queryFn: () => getNatureByIdOrName(idOrName),
        enabled: !!idOrName,
        staleTime: Infinity,
    });
}