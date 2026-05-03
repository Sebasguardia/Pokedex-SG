import { useState, useMemo } from "react"
import { useType } from "../types/useTypes"

export function usePokemonByType(typeName?: string, tab: string = "all", page: number = 1) {
    const { data: type } = useType(typeName || "")
    const limit = 60

    const filteredPokemon = useMemo(() => {
        if (!type || !type.pokemon) return []

        return type.pokemon.filter((p: any) => {
            if (tab === "primary") return p.slot === 1
            if (tab === "secondary") return p.slot === 2
            return true // "all"
        }).map((p: any) => p.pokemon)
    }, [type, tab])

    const startIndex = (page - 1) * limit
    const data = filteredPokemon.slice(startIndex, startIndex + limit)

    return {
        data,
        total: filteredPokemon.length,
        limit
    }
}
