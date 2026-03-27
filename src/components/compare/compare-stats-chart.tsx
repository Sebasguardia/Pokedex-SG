"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ComparedPokemon } from "@/types/api/compare.types"
import {
    COMPARE_COLORS,
    STAT_KEYS,
    STAT_LABELS_ES,
    STAT_MAX,
    getWinners,
} from "@/lib/constants/compare.constants"

interface CompareStatsChartProps {
    pokemon: (ComparedPokemon | null)[]
}

export function CompareStatsChart({ pokemon }: CompareStatsChartProps) {
    const active = pokemon.filter(Boolean)
    if (active.length < 2) return null

    return (
        <div className="relative border-2 border-[#111111] bg-white p-8" style={{ boxShadow: "4px 4px 0 #111111" }}>
            <span className="absolute top-[-16px] left-4 bg-[#111111] text-white font-press-start text-[10px] px-3 py-1">
                DISTRIBUCIÓN DE STATS
            </span>

            <div className="space-y-7">
                {STAT_KEYS.map(statKey => {
                    const max = STAT_MAX[statKey]
                    const winners = getWinners(pokemon.map(p => p?.stats[statKey] ?? null))

                    return (
                        <div key={statKey}>
                            <div className="flex justify-between mb-2">
                                <span className="font-press-start text-[11px] text-[#111111]">{STAT_LABELS_ES[statKey]}</span>
                                <span className="font-jetbrains text-[13px] text-gray-400">MAX {STAT_MAX[statKey]}</span>
                            </div>
                            <div className="space-y-2">
                                {pokemon.map((p, i) => {
                                    if (!p) return null
                                    const val = p.stats[statKey]
                                    const pct = Math.round((val / max) * 100)
                                    const color = COMPARE_COLORS[i]
                                    const isWinner = winners.includes(i)

                                    return (
                                        <div key={i} className="flex items-center gap-3">
                                            <Image src={p.sprite} alt={p.nameEs} width={28} height={28} unoptimized className="object-contain shrink-0 drop-shadow-sm" />
                                            <div className="flex-1 h-5 bg-[#EBEBEB] relative border border-[#E0E0E0] overflow-hidden">
                                                <motion.div
                                                    className="h-full relative group"
                                                    style={{ backgroundColor: color, opacity: isWinner ? 0.9 : 0.55 }}
                                                    initial={{ width: "0%" }}
                                                    whileInView={{ width: `${pct}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: i * 0.06, duration: 0.6 }}
                                                >
                                                    {/* Tooltip on hover */}
                                                    <div className="absolute top-[-30px] left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-[#111111] text-white px-2 py-0.5 font-jetbrains text-[13px] pointer-events-none transition-opacity z-10 font-bold">
                                                        {p.stats[statKey]}
                                                    </div>
                                                </motion.div>
                                                {/* Max reference line at 100% */}
                                                <div className="absolute right-0 top-0 h-full w-px border-l border-dashed border-gray-400 opacity-50" />
                                            </div>
                                            <span
                                                className="font-jetbrains text-[14px] w-[36px] text-right font-bold"
                                                style={{ color: isWinner ? color : "#888888" }}
                                            >
                                                {val}{isWinner && winners.length === 1 ? "★" : ""}
                                            </span>
                                        </div>
                                    )
                                })}
                            </div>
                            <p className="font-nunito text-[10px] text-gray-400 mt-0.5">Máx. {max}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
