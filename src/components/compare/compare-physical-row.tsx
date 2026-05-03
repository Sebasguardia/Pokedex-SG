"use client"

import { motion } from "framer-motion"
import { ComparedPokemon } from "@/types/api/compare.types"
import {
    COMPARE_COLORS,
    formatHeight,
    formatWeight,
    formatGenderRate,
    GROWTH_RATES_ES,
    EGG_GROUPS_ES,
    getWinners,
    getMinWinners,
} from "@/lib/constants/compare/compare.constants"

interface ComparePhysicalRowProps {
    pokemon: (ComparedPokemon | null)[]
}

export function ComparePhysicalRow({ pokemon }: ComparePhysicalRowProps) {
    const active = pokemon.filter(Boolean)
    if (active.length < 2) return null

    const rows = [
        { key: "height", label: "ALTURA", format: formatHeight, winMode: "higher" },
        { key: "weight", label: "PESO", format: formatWeight, winMode: "higher" },
        { key: "captureRate", label: "TASA CAPTURA", format: String, winMode: "lower" },
        { key: "baseHappiness", label: "FELICIDAD BASE", format: String, winMode: "higher" },
        { key: "baseExperience", label: "EXP. BASE", format: (v: any) => v ?? "—", winMode: "higher" },
        { key: "growthRate", label: "VEL. CRECIMIENTO", format: (v: any) => GROWTH_RATES_ES[v] ?? v, winMode: null },
        { key: "genderRate", label: "GÉNERO", format: formatGenderRate, winMode: null },
        { key: "eggGroups", label: "GRUPOS HUEVO", format: (v: any) => v.map((g: string) => EGG_GROUPS_ES[g] ?? g).join(", "), winMode: null },
    ]

    return (
        <div className="relative border-2 border-[#111111] bg-white " style={{ boxShadow: "4px 4px 0 #111111" }}>
            <span className="absolute top-[-16px] left-4 bg-[#111111] text-white font-press-start text-[10px] px-3 py-1 z-10">
                DATOS FÍSICOS Y CRIANZA
            </span>
            <div className="p-6">
                <div className="overflow-x-auto">
                    <table className="w-full text-center border-collapse" style={{ minWidth: `${200 + active.length * 150}px` }}>
                        <thead>
                            <tr className="bg-[#111111]">
                                <th className="px-4 py-3 text-left font-press-start text-[10px] text-[#888888] w-[160px]">DATO</th>
                                {pokemon.map((p, i) => {
                                    if (!p) return null
                                    return (
                                        <th key={i} className="px-4 py-3 font-press-start text-[10px] text-white">
                                            {p.nameEs.toUpperCase().split(" ")[0]}
                                        </th>
                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, ri) => {
                                const values = pokemon.map(p => p ? p[row.key as keyof ComparedPokemon] : null) as (number | null)[]
                                const winners = row.winMode === "higher" ? getWinners(values)
                                    : row.winMode === "lower" ? getMinWinners(values)
                                        : []

                                return (
                                    <tr key={row.key} className={ri % 2 === 0 ? "bg-[#FAFAFA]" : "bg-white"}>
                                        <td className="px-4 py-3 border-r-2 border-[#E0E0E0] text-left font-press-start text-[9px] text-[#444444]">
                                            {row.label}
                                        </td>
                                        {pokemon.map((p, i) => {
                                            if (!p) return null
                                            const isWinner = winners.includes(i)
                                            const color = COMPARE_COLORS[i]
                                            const val = p[row.key as keyof ComparedPokemon]

                                            return (
                                                <td
                                                    key={i}
                                                    className="px-4 py-3 transition-colors"
                                                    style={isWinner ? { backgroundColor: `${color}10` } : undefined}
                                                >
                                                    <span className={`font-nunito text-[15px] ${isWinner ? "font-bold" : "text-[#111111]"}`} style={{ color: isWinner ? color : undefined }}>
                                                        {row.format(val as any)}
                                                    </span>
                                                    {isWinner && <span className="ml-1 text-[12px]" style={{ color }}>★</span>}
                                                </td>
                                            )
                                        })}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
