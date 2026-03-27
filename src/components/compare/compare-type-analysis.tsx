"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { ComparedPokemon } from "@/types/api/compare.types"
import {
    COMPARE_COLORS,
    getCellStyle,
    getEffectiveness,
} from "@/lib/constants/compare.constants"
import { ALL_TYPES, TYPE_COLORS, TYPE_NAMES_ES } from "@/lib/constants/team-builder.constants"
import { Shield } from "lucide-react"

interface CompareTypeAnalysisProps {
    pokemon:            (ComparedPokemon | null)[]
    typeDefenseWinners: Record<string, number[]>
}

export function CompareTypeAnalysis({ pokemon, typeDefenseWinners }: CompareTypeAnalysisProps) {
    const [mode, setMode] = useState<"defensive" | "offensive">("defensive")
    const active = pokemon.filter(Boolean)
    if (active.length < 2) return null

    // Group types for defensive view
    const sections = {
        weaknesses: [] as string[],
        immunities: [] as string[],
        neutral:    [] as string[],
    }

    if (mode === "defensive") {
        ALL_TYPES.forEach(t => {
            const mults = active.map(p => getEffectiveness(t, p!.types))
            if (mults.some(m => m === 0)) sections.immunities.push(t)
            else if (mults.some(m => m > 1)) sections.weaknesses.push(t)
            else sections.neutral.push(t)
        })
    }

    const renderHeader = () => (
        <tr className="bg-[#111111]">
            <th className="px-4 py-3 text-left font-press-start text-[10px] text-[#888888] w-[180px]">
                {mode === "defensive" ? "RECIBE DE" : "ATACA A"}
            </th>
            {pokemon.map((p, i) => {
                if (!p) return <th key={i} className="w-[150px]"></th> // Empty slot keeps grid stable
                return (
                    <th key={i} className="px-3 py-3 text-center w-[150px]">
                        <div className="flex flex-col items-center gap-2">
                            <Image src={p.sprite} alt={p.nameEs} width={48} height={48} unoptimized className="object-contain drop-shadow-md" />
                            <span className="font-press-start text-[10px] text-white truncate max-w-[120px]">
                                {p.nameEs.toUpperCase().split(" ")[0]}
                            </span>
                        </div>
                    </th>
                )
            })}
        </tr>
    )


    const renderRow = (type: string, ri: number) => {
        const typeColor = TYPE_COLORS[type]
        const typeName = TYPE_NAMES_ES[type]
        const winners = typeDefenseWinners[type] ?? []

        return (
            <motion.tr
                key={type}
                className={ri % 2 === 0 ? "bg-[#FAFAFA]" : "bg-white"}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: ri * 0.03 }}
            >
                <td className="px-4 py-3 border-r-2 border-[#E0E0E0]">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-inner" style={{ backgroundColor: typeColor }}>
                            <Image src={`/icons/${type}.svg`} alt={type} width={18} height={18} className="brightness-0 invert" />
                        </div>
                        <span className="font-press-start text-[10px] text-[#111111]">{typeName.toUpperCase()}</span>
                    </div>
                </td>
                {pokemon.map((p, i) => {
                    if (!p) return <td key={i} className="px-3 py-3 text-center border-l border-gray-100/50"></td>
                    
                    let mult = 1
                    if (mode === "defensive") {
                        mult = getEffectiveness(type, p.types)
                    } else {
                        // Offensive: Best STAB effectiveness against this type
                        const stabMults = p.types.map(pt => getEffectiveness(pt, [type]))
                        mult = Math.max(...stabMults)
                    }

                    const style = getCellStyle(mult)
                    const isWinner = mode === "defensive" && winners.includes(i)
                    const winColor = COMPARE_COLORS[i]

                    return (
                        <td
                            key={i}
                            className="px-3 py-4 text-center transition-all border-l border-gray-100"
                            style={isWinner ? { backgroundColor: `${winColor}15`, border: `1px solid ${winColor}44` } : undefined}
                        >
                            <span
                                className="font-jetbrains text-[16px] font-bold px-3 py-1 rounded-sm shadow-sm"
                                style={{ backgroundColor: style.bg, color: style.text }}
                            >
                                {style.label}
                            </span>
                            {isWinner && (
                                <div className="mt-2 font-press-start text-[8px]" style={{ color: winColor }}>MÁS RESISTENTE</div>
                            )}
                        </td>
                    )
                })}
            </motion.tr>
        )
    }

    return (
        <div className="relative border-2 border-[#111111] bg-white overflow-hidden" style={{ boxShadow: "4px 4px 0 #111111" }}>
            <div className="bg-[#111111] p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-white" />
                    <span className="font-press-start text-[10px] text-white">ANÁLISIS DE TIPOS</span>
                </div>

                <div className="flex bg-[#222222] p-1 border border-[#333333]">
                    <button 
                        onClick={() => setMode("defensive")}
                        className={`px-4 py-1.5 font-press-start text-[9px] transition-colors ${mode === "defensive" ? "bg-[#CC0000] text-white" : "text-gray-500 hover:text-gray-300"}`}
                    >
                        DEFENSIVO
                    </button>
                    <button 
                        onClick={() => setMode("offensive")}
                        className={`px-4 py-1.5 font-press-start text-[9px] transition-colors ${mode === "offensive" ? "bg-[#CC0000] text-white" : "text-gray-500 hover:text-gray-300"}`}
                    >
                        OFENSIVO
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-center border-collapse table-fixed" style={{ minWidth: `800px` }}>
                    <thead>{renderHeader()}</thead>
                    <tbody>
                        {mode === "defensive" ? (
                            <>
                                {sections.weaknesses.length > 0 && (
                                    <>
                                        <tr className="bg-[#FEF2F2] border-y border-[#FEE2E2]">
                                            <td colSpan={5} className="px-4 py-2 text-left font-press-start text-[10px] text-[#991B1B]">
                                                ⚠ DEBILIDADES (×2 o ×4)
                                            </td>
                                        </tr>
                                        {sections.weaknesses.map((t, ri) => renderRow(t, ri))}
                                    </>
                                )}
                                {sections.immunities.length > 0 && (
                                    <>
                                        <tr className="bg-[#EFF6FF] border-y border-[#DBEAFE]">
                                            <td colSpan={5} className="px-4 py-2 text-left font-press-start text-[10px] text-[#1E40AF]">
                                                🛡 INMUNIDADES (×0)
                                            </td>
                                        </tr>
                                        {sections.immunities.map((t, ri) => renderRow(t, ri))}
                                    </>
                                )}
                                <tr className="bg-[#F9FAFB] border-y border-[#F3F4F6]">
                                    <td colSpan={5} className="px-4 py-2 text-left font-press-start text-[10px] text-gray-500">
                                        NEUTRAL / MIXTO
                                    </td>
                                </tr>
                                {sections.neutral.map((t, ri) => renderRow(t, ri))}
                            </>

                        ) : (
                            ALL_TYPES.map((t, ri) => renderRow(t, ri))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
