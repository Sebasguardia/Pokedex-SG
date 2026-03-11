import { useQuery } from "@tanstack/react-query";
import { getMoveList, getMoveByIdOrName } from "../api/moves";

export function useMoves(limit = 20, offset = 0) {
    return useQuery({
        queryKey: ["moves", "list", { limit, offset }],
        queryFn: () => getMoveList(limit, offset),
    });
}

export function useMove(idOrName: string | number) {
    return useQuery({
        queryKey: ["moves", "detail", idOrName],
        queryFn: () => getMoveByIdOrName(idOrName),
        enabled: !!idOrName,
    });
}
