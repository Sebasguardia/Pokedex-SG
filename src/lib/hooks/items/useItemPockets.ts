import { useQuery } from "@tanstack/react-query"
import { getItemPockets } from "@/lib/api/items"

export function useItemPockets() {
    return useQuery({
        queryKey: ["item-pockets"],
        queryFn: async () => {
            const data = await getItemPockets()
            return data.results.map(p => p.name)
        },
        staleTime: Infinity,
        gcTime: Infinity
    })
}
