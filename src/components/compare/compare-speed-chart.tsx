"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ComparedPokemon } from "@/types/api/compare.types"
import {
    COMPARE_COLORS,
    SPEED_REFERENCES,
    getWinners,
} from "@/lib/constants/compare/compare.constants"

interface CompareSpeedChartProps {
    pokemon:      (ComparedPokemon | null)[]
    speedWinners: number[]
}

const MAX_SPEED = 200

export function CompareSpeedChart({ pokemon, speedWinners }: CompareSpeedChartProps) {
    const active = pokemon.filter(Boolean)
    if (active.length < 2) return null

    // Sort active by speed descending
    const sorted = active
        .map((p, originalIdx) => ({ p, originalIdx, speed: p!.stats.speed }))
        .sort((a, b) => b.speed - a.speed)

    const fastestSpeed = sorted[0]?.speed ?? 0

    return (
        <div className="relative border-2 border-[#111111] bg-white p-8" style={{ boxShadow: "4px 4px 0 #111111" }}>
            <span className="absolute top-[-16px] left-4 bg-[#111111] text-white font-press-start text-[10px] px-3 py-1">
                ANÁLISIS DE VELOCIDAD RELATIVA
            </span>

            {/* Pokémon bars */}
            <div className="space-y-3 mt-2">
                {sorted.map(({ p, originalIdx, speed }, barIdx) => {
                    const pct = (speed / MAX_SPEED) * 100
                    const color = COMPARE_COLORS[originalIdx]
                    const isWinner = speedWinners.includes(originalIdx)

                    // Find the speed tier for the current Pokémon
                    const speedTier = p ? 
                        (SPEED_REFERENCES.find(ref => speed >= ref.speed) || { label: "Lento", color: "#888888" }) 
                        : { label: "N/A", color: "#E0E0E0" };

                    // Make sure speedTier has a color even if it's from SPEED_REFERENCES (which doesn't have it)
                    const tierColor = (speedTier as any).color || (speed >= 100 ? "#CC0000" : "#888888");

                    return (
                        <div key={p?.id || barIdx}>
                            <div className="flex justify-between items-end mb-1">
                                <div className="flex items-center gap-2">
                                    <span className="font-press-start text-[11px]" style={{ color }}>{p?.nameEs.toUpperCase() || "VACÍO"}</span>
                                    {p && (
                                        <span className={`px-2 py-0.5 font-press-start text-[8px] text-white`} style={{ backgroundColor: tierColor }}>
                                            {speedTier.label.toUpperCase()}
                                        </span>
                                    )}
                                </div>
                                <span className="font-jetbrains text-[18px] font-black" style={{ color }}>{p?.stats.speed || 0}</span>
                            </div>
                            <div className="flex-1 relative h-6 bg-[#EBEBEB] border border-[#E0E0E0] overflow-hidden">
                                <motion.div
                                    className="h-full flex items-center"
                                    style={{ backgroundColor: color, opacity: isWinner ? 0.9 : 0.55 }}
                                    initial={{ width: "0%" }}
                                    whileInView={{ width: `${pct}%` }}
                                    viewport={{ once: true }}
                                    transition={{ delay: barIdx * 0.07, duration: 0.6 }}
                                />
                                {/* Reference tick marks */}
                                {SPEED_REFERENCES.map(ref => (
                                    <div
                                        key={ref.speed}
                                        className="absolute top-0 h-full w-px"
                                        style={{ left: `${(ref.speed / MAX_SPEED) * 100}%`, backgroundColor: "rgba(0,0,0,0.2)" }}
                                    />
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="mt-10 pt-6 border-t border-[#E0E0E0] grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h4 className="font-press-start text-[10px] text-[#111111] mb-3">REFERENCIAS COMPETITIVAS</h4>
                    <div className="space-y-2">
                        {SPEED_REFERENCES.map(ref => (
                            <div key={ref.label} className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: ref.speed >= 100 ? "#CC0000" : "#888888" }} />
                                <span className="font-nunito text-[15px] text-gray-500 font-medium">
                                    <strong className="text-[#111111]">{ref.label}</strong> ({ref.speed} VEL) — {ref.note}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-[#111111] p-5 text-white border-l-4 border-[#CC0000]">
                    <h4 className="font-press-start text-[10px] text-[#CC0000] mb-3">NOTAS DE CAMPO</h4>
                    <ul className="space-y-3 font-nunito text-[15px] text-gray-400 font-medium">
                        <li>• El ganador ({pokemon[speedWinners[0]]?.nameEs || "N/A"}) actúa primero en condiciones normales.</li>
                        <li>• Pokémon con +100 VEL se consideran "Fast Tier" en el meta actual.</li>
                        <li>• En <strong>Trick Room</strong>, el orden de estos Pokémon se invertiría totalmente.</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
