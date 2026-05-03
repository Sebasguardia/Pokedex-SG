"use client"

import { motion } from "framer-motion"
import { ComparedPokemon } from "@/types/api/compare.types"
import { getEffectiveness, COMPARE_COLORS } from "@/lib/constants/compare/compare.constants"
import { ALL_TYPES, TYPE_COLORS, TYPE_NAMES_ES } from "@/lib/constants/team-builder/team-builder.constants"
import Image from "next/image"


interface CompareTypeSummaryProps {
    pokemon: (ComparedPokemon | null)[]
}

export function CompareTypeSummary({ pokemon }: CompareTypeSummaryProps) {
    const active = pokemon.filter(Boolean)
    if (active.length < 2) return null

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {pokemon.map((p, i) => {
                if (!p) return null
                const color = COMPARE_COLORS[i]
                
                const weaknesses: string[] = []
                const resistances: string[] = []
                const immunities: string[] = []

                ALL_TYPES.forEach(t => {
                    const mult = getEffectiveness(t, p.types)
                    if (mult === 0) immunities.push(t)
                    else if (mult > 1) weaknesses.push(t)
                    else if (mult < 1) resistances.push(t)
                })

                return (
                    <motion.div
                        key={p.id}
                        className="border-2 border-[#111111] bg-white p-4"
                        style={{ boxShadow: `3px 3px 0 ${color}` }}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <p className="font-press-start text-[9px] mb-4 text-[#111111] truncate">{p.nameEs.toUpperCase()}</p>
                        
                        <div className="space-y-4 pt-1">
                            <div>
                                <p className="font-press-start text-[8px] text-[#DC2626] mb-2.5">🔴 DEBILIDADES</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {weaknesses.length > 0 ? weaknesses.map(t => (
                                        <span key={t} className="flex items-center gap-1.5 px-2 py-1 rounded-sm shadow-sm" style={{ backgroundColor: TYPE_COLORS[t] }}>
                                            <Image src={`/icons/${t}.svg`} alt={t} width={12} height={12} className="brightness-0 invert" />
                                            <span className="font-jetbrains text-[11px] text-white font-bold">
                                                {TYPE_NAMES_ES[t].toUpperCase()} {getEffectiveness(t, p.types) > 2 ? "×4" : ""}
                                            </span>
                                        </span>
                                    )) : <span className="font-nunito text-[12px] text-gray-400 italic">Ninguna</span>}
                                </div>
                            </div>

                            <div>
                                <p className="font-press-start text-[8px] text-[#16A34A] mb-2.5">🟢 RESISTENCIAS</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {resistances.length > 0 ? resistances.map(t => (
                                        <span key={t} className="flex items-center gap-1.5 px-2 py-1 rounded-sm shadow-sm" style={{ backgroundColor: TYPE_COLORS[t] }}>
                                            <Image src={`/icons/${t}.svg`} alt={t} width={12} height={12} className="brightness-0 invert" />
                                            <span className="font-jetbrains text-[11px] text-white font-bold">
                                                {TYPE_NAMES_ES[t].toUpperCase()}
                                            </span>
                                        </span>
                                    )) : <span className="font-nunito text-[12px] text-gray-400 italic">Ninguna</span>}
                                </div>
                            </div>

                            {immunities.length > 0 && (
                                <div>
                                    <p className="font-press-start text-[8px] text-[#2563EB] mb-2.5">🔵 INMUNIDADES</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {immunities.map(t => (
                                            <span key={t} className="flex items-center gap-1.5 px-2 py-1 rounded-sm shadow-sm" style={{ backgroundColor: TYPE_COLORS[t] }}>
                                                <Image src={`/icons/${t}.svg`} alt={t} width={12} height={12} className="brightness-0 invert" />
                                                <span className="font-jetbrains text-[11px] text-white font-bold">
                                                    {TYPE_NAMES_ES[t].toUpperCase()}
                                                </span>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )
            })}
        </div>
    )
}
