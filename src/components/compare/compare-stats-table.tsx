"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import NumberFlow from "@number-flow/react"
import { ComparedPokemon } from "@/types/api/compare.types"
import {
    COMPARE_COLORS,
    STAT_KEYS,
    STAT_LABELS_ES,
} from "@/lib/constants/compare.constants"
import { TYPE_COLORS, TYPE_NAMES_ES } from "@/lib/constants/team-builder.constants"

interface CompareStatsTableProps {
    pokemon:     (ComparedPokemon | null)[]
    statWinners: Record<string, number[]>
    bstWinners:  number[]
}

export function CompareStatsTable({ pokemon, statWinners, bstWinners }: CompareStatsTableProps) {
    const active = pokemon.filter(Boolean)
    if (active.length < 2) return null

    const cols = pokemon.filter(Boolean).length

    return (
        <div className="relative border-2 border-[#111111] bg-white overflow-hidden" style={{ boxShadow: "4px 4px 0 #111111" }}>
            {/* Floating label */}
            <span className="absolute top-[-16px] left-4 bg-[#111111] text-white font-press-start text-[10px] px-3 py-1 z-10">
                TABLA DE ESTADÍSTICAS BASE
            </span>

            <table className="w-full" style={{ minWidth: `${200 + cols * 120}px` }}>
                {/* Header row */}
                <thead>
                    <tr className="bg-[#111111]">
                        <th className="px-4 py-2 text-left font-press-start text-[10px] text-[#888888] w-[120px]">ESTADÍSTICA</th>
                        {pokemon.map((p, i) => {
                            return (
                                <th key={i} className="p-4 border-b border-l border-[#E0E0E0] min-w-[140px]">
                                    {p ? (
                                        <div className="flex flex-col items-center gap-2">
                                            <span className="font-press-start text-[10px]" style={{ color: COMPARE_COLORS[i] }}>
                                                {p.nameEs.toUpperCase()}
                                            </span>
                                            <div className="flex gap-1">
                                                {p.types.map(t => (
                                                    <span key={t} className="px-2 py-0.5 font-press-start text-[8px] text-white" style={{ backgroundColor: TYPE_COLORS[t] }}>
                                                        {TYPE_NAMES_ES[t].charAt(0).toUpperCase()}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <span className="font-press-start text-[8px] text-gray-300">Vacío</span>
                                    )}
                                </th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {STAT_KEYS.map((statKey, ri) => {
                        const winners = statWinners[statKey] ?? []
                        return (
                            <motion.tr
                                key={statKey}
                                className={ri % 2 === 0 ? "bg-[#FAFAFA]" : "bg-white"}
                                initial={{ opacity: 0, x: -12 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: ri * 0.05 }}
                            >
                                <td className="px-4 py-3 font-press-start text-[10px] text-[#444444] border-r-2 border-[#E0E0E0]">
                                    {STAT_LABELS_ES[statKey]}
                                </td>
                                {pokemon.map((p, i) => {
                                    if (!p) return null
                                    const val = p.stats[statKey]
                                    const isWinner = winners.includes(i)
                                    const color = COMPARE_COLORS[i]
                                    return (
                                        <td
                                            key={i}
                                            className="px-3 py-3 text-center transition-colors"
                                            style={isWinner ? { backgroundColor: `${color}18` } : undefined}
                                        >
                                            <span
                                                className="font-jetbrains text-[16px] font-bold"
                                                style={{ color: isWinner ? color : "#111111" }}
                                            >
                                                <NumberFlow value={val} />
                                            </span>
                                            {isWinner && winners.length === 1 && (
                                                <span className="ml-1 font-press-start text-[10px]" style={{ color }}>★</span>
                                            )}
                                        </td>
                                    )
                                })}
                            </motion.tr>
                        )
                    })}

                    {/* BST row */}
                    <tr className="bg-[#111111]">
                        <td className="px-4 py-3 font-press-start text-[10px] text-[#888888] border-r-2 border-[#333333]">
                            TOTAL BST
                        </td>
                        {pokemon.map((p, i) => {
                            if (!p) return null
                            const isWinner = bstWinners.includes(i)
                            const color = COMPARE_COLORS[i]
                            return (
                                <td key={i} className="px-3 py-5 text-center" style={isWinner ? { backgroundColor: `${color}30` } : undefined}>
                                    <span className="font-jetbrains text-[22px] font-black" style={{ color: isWinner ? color : "white" }}>
                                        <NumberFlow value={p.bst} />
                                    </span>
                                    {isWinner && bstWinners.length === 1 && (
                                        <span className="ml-1 font-press-start text-[12px] text-white">★</span>
                                    )}
                                </td>
                            )
                        })}
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
