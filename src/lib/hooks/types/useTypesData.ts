"use client"

import { useQueries, useQuery } from "@tanstack/react-query"
import { apiClient } from "@/lib/api/client"
import { PokemonType } from "@/types/api/type.types"

export function useTypesData(typeNames: string[]) {
    return useQueries({
        queries: typeNames.map(name => ({
            queryKey: ["type", "detail", name],
            queryFn: async () => {
                const { data } = await apiClient.get<PokemonType>(`/type/${name}`)
                return data
            },
            enabled: !!name,
            staleTime: Infinity,
        }))
    })
}
