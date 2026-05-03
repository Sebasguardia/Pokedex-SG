import { useQuery } from "@tanstack/react-query"
import { getItemByIdOrName } from "@/lib/api/items"

export function useItem(nameOrId: string | number) {
    return useQuery({
        queryKey: ["item", typeof nameOrId === "string" ? nameOrId.toLowerCase() : nameOrId],
        queryFn: () => getItemByIdOrName(nameOrId),
        staleTime: 1000 * 60 * 60 * 24 // 24 hours
    })
}
