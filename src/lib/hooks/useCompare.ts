"use client"

import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { useQueryState } from "nuqs"
import { getPokemonForCompare } from "@/lib/api/compare"
import { ComparedPokemon } from "@/types/api/compare.types"
import {
    STAT_KEYS,
    getWinners,
    getSharedMoves,
    getSharedAbilities,
    getEffectiveness,
} from "@/lib/constants/compare.constants"
import { ALL_TYPES } from "@/lib/constants/team-builder.constants"

// ── URL state ─────────────────────────────────────────────────────────────────
export function useCompareUrlState() {
    const [p1, setP1] = useQueryState("p1", { defaultValue: "" })
    const [p2, setP2] = useQueryState("p2", { defaultValue: "" })
    const [p3, setP3] = useQueryState("p3", { defaultValue: "" })
    const [p4, setP4] = useQueryState("p4", { defaultValue: "" })

    const raw = [p1, p2, p3, p4]
    const setters = [setP1, setP2, setP3, setP4]

    // Normalize: empty string → null
    const slots = raw.map(s => (s && s.trim() !== "" ? s : null)) as [
        string | null, string | null, string | null, string | null
    ]

    const setSlot = (index: number, name: string | null) => {
        setters[index](name ?? "")
    }

    const clearSlot = (index: number) => {
        setters[index]("")
    }

    const clearAll = () => {
        setP1(""); setP2(""); setP3(""); setP4("")
    }

    // Build share URL
    const shareUrl = typeof window !== "undefined"
        ? (() => {
            const params = new URLSearchParams()
            if (p1) params.set("p1", p1)
            if (p2) params.set("p2", p2)
            if (p3) params.set("p3", p3)
            if (p4) params.set("p4", p4)
            return `${window.location.origin}/compare?${params.toString()}`
        })()
        : ""

    return { slots, setSlot, clearSlot, clearAll, shareUrl }
}

// ── Single pokemon load ───────────────────────────────────────────────────────
export function useComparePokemon(nameOrId: string | null) {
    return useQuery({
        queryKey:  ["compare-pokemon", nameOrId],
        queryFn:   () => getPokemonForCompare(nameOrId!),
        enabled:   !!nameOrId && nameOrId.trim() !== "",
        staleTime: Infinity,
        gcTime:    Infinity,
    })
}

// ── Derived analysis ──────────────────────────────────────────────────────────
export function useCompareAnalysis(pokemon: (ComparedPokemon | null)[]) {
    const key = pokemon.map(p => p?.id ?? "null").join(",")

    return useMemo(() => {
        const active = pokemon.filter((p): p is ComparedPokemon => !!p)
        if (active.length < 2) return null

        // Stat winners
        const statWinners = Object.fromEntries(
            STAT_KEYS.map(key => [
                key,
                getWinners(pokemon.map(p => p?.stats[key] ?? null))
            ])
        ) as Record<string, number[]>

        // BST winners
        const bstWinners = getWinners(pokemon.map(p => p?.bst ?? null))

        // Combined offense / defense
        const totalDefenseWinners = getWinners(
            pokemon.map(p => p ? p.stats.defense + p.stats.specialDefense : null)
        )
        const totalOffenseWinners = getWinners(
            pokemon.map(p => p ? p.stats.attack + p.stats.specialAttack : null)
        )

        // Speed winners
        const speedWinners = getWinners(pokemon.map(p => p?.stats.speed ?? null))

        // Shared data
        const sharedMoves = getSharedMoves(active.map(p => p.moves))
        const sharedAbilities = getSharedAbilities(
            active.map(p => p.abilities.map(a => a.name))
        )

        // Type defense winners (lowest mult = best defender)
        const typeDefenseWinners = Object.fromEntries(
            ALL_TYPES.map(attackType => {
                const mults = pokemon.map(p =>
                    p ? getEffectiveness(attackType, p.types) : null
                )
                const nonNull = mults.filter((m): m is number => m !== null)
                if (nonNull.length === 0) return [attackType, []]
                const min = Math.min(...nonNull)
                return [
                    attackType,
                    mults.reduce<number[]>((acc, m, i) => {
                        if (m === min) acc.push(i)
                        return acc
                    }, [])
                ]
            })
        ) as Record<string, number[]>

        return {
            statWinners,
            bstWinners,
            totalDefenseWinners,
            totalOffenseWinners,
            speedWinners,
            sharedMoves,
            sharedAbilities,
            typeDefenseWinners,
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key])
}

// ── Compare panel hook (for managing pokemon list) ───────────────────────────
export function useCompare() {
    const { slots, setSlot, clearSlot, clearAll } = useCompareUrlState()
    
    const pokemonIds = slots.map(s => {
        if (!s) return null
        const num = parseInt(s, 10)
        return isNaN(num) ? null : num
    }).filter((id): id is number => id !== null)

    const addPokemon = (id: number) => {
        const emptyIndex = slots.findIndex(s => !s || s.trim() === "")
        if (emptyIndex >= 0) {
            setSlot(emptyIndex, String(id))
        }
    }

    const removePokemon = (id: number) => {
        const index = slots.findIndex(s => s === String(id))
        if (index >= 0) {
            clearSlot(index)
        }
    }

    return {
        pokemonIds,
        addPokemon,
        removePokemon,
        clearAll,
        slots,
    }
}

