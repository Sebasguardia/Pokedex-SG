import { useQuery } from "@tanstack/react-query";
import { getItemList, getItemByIdOrName } from "../api/items";

export function useItems(limit = 20, offset = 0) {
    return useQuery({
        queryKey: ["items", "list", { limit, offset }],
        queryFn: () => getItemList(limit, offset),
    });
}

export function useItem(idOrName: string | number) {
    return useQuery({
        queryKey: ["items", "detail", idOrName],
        queryFn: () => getItemByIdOrName(idOrName),
        enabled: !!idOrName,
    });
}
