import { useState, useMemo } from "react"
import { useType } from "../types/useTypes"

export function useMovesByType(typeName?: string, tab: string = "all") {
    const { data: type } = useType(typeName || "")

    // In PokeAPI, moves array in type object doesn't tell us if it's physical/special/status.
    // We would need to fetch all moves to know their damage_class. 
    // For now, we return all of them, and the component will handle fetching details or displaying them.

    return {
        data: type?.moves || []
    }
}
