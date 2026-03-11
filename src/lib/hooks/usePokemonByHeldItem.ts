import { useQuery } from "@tanstack/react-query"
import { apiClient } from "../api/client"

export function usePokemonByHeldItem(itemName: string | undefined) {
    return useQuery({
        queryKey: ["pokemon-by-held-item", itemName],
        enabled: !!itemName,
        queryFn: async () => {
            if (!itemName) return []

            // The item detail itself contains held_by_pokemon
            // But if we want to fetch it specifically or ensure it's fresh:
            const { data } = await apiClient.get<any>(`/item/${itemName}`)
            return data.held_by_pokemon || []
        },
        staleTime: 1000 * 60 * 60 * 24 // 24 hours
    })
}
