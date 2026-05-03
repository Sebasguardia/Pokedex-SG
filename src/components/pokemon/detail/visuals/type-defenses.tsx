"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { getEffectiveness } from "@/lib/constants/compare/compare.constants"
import { ALL_TYPES, TYPE_COLORS, TYPE_NAMES_ES } from "@/lib/constants/team-builder/team-builder.constants"

interface TypeDefensesProps {
    types: string[]
}

export function TypeDefenses({ types }: TypeDefensesProps) {
    if (!types || types.length === 0) return null

    const weaknesses: string[] = []
    const resistances: string[] = []
    const immunities: string[] = []

    ALL_TYPES.forEach(t => {
        const mult = getEffectiveness(t, types)
        if (mult === 0) immunities.push(t)
        else if (mult > 1) weaknesses.push(t)
        else if (mult < 1) resistances.push(t)
    })

    const renderPill = (type: string, multiplier: number) => {
        let multText = ""
        if (multiplier === 4) multText = "×4"
        if (multiplier === 2) multText = "×2"
        if (multiplier === 0.5) multText = "×½"
        if (multiplier === 0.25) multText = "×¼"

        return (
            <span key={type} className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 shadow-[2px_2px_0_rgba(17,17,17,1)] relative z-10" style={{ backgroundColor: TYPE_COLORS[type], border: "2px solid #111111" }}>
                <Image src={`/icons/${type}.svg`} alt={type} width={12} height={12} className="brightness-0 invert" />
                <span className="font-['Press_Start_2P'] text-[7px] sm:text-[9px] flex gap-1 items-center mt-[1px] text-white">
                    {TYPE_NAMES_ES[type].toUpperCase()}
                    {multText && <span className="opacity-80 font-bold">{multText}</span>}
                </span>
            </span>
        )
    }

    return (
        <div className="mt-6 p-5 sm:p-6 bg-[#FFFFFF] border-[2px] border-[#111111] shadow-[4px_4px_0_rgba(17,17,17,0.15)] rounded-lg">            
            <h3 className="font-['Press_Start_2P'] text-[10px] sm:text-[12px] mb-6 tracking-wide text-center text-[#111111] border-b-2 border-[#E0E0E0] pb-2">EFECTIVIDAD TIPOS</h3>
            
            <div className="flex flex-col gap-6 w-full mx-auto">
                {/* Debilidades */}
                <div className="bg-[#F8F8F8] p-4 border border-[#E0E0E0]">
                    <p className="font-['Press_Start_2P'] text-[10px] mb-4 flex items-center gap-2 text-[#DC2626]">
                        <span className="inline-block w-2.5 h-2.5 rounded-sm bg-[#DC2626]"></span>
                        DEBILIDADES
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                        {weaknesses.length > 0 ? (
                            weaknesses.map(t => renderPill(t, getEffectiveness(t, types)))
                        ) : (
                            <span className="font-['Press_Start_2P'] text-[9px] italic text-[#888888]">NINGUNA</span>
                        )}
                    </div>
                </div>

                {/* Resistencias */}
                <div className="bg-[#F8F8F8] p-4 border border-[#E0E0E0]">
                    <p className="font-['Press_Start_2P'] text-[10px] mb-4 flex items-center gap-2 text-[#16A34A]">
                        <span className="inline-block w-2.5 h-2.5 rounded-sm bg-[#16A34A]"></span>
                        RESISTENCIAS
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                        {resistances.length > 0 ? (
                            resistances.map(t => renderPill(t, getEffectiveness(t, types)))
                        ) : (
                            <span className="font-['Press_Start_2P'] text-[9px] italic text-[#888888]">NINGUNA</span>
                        )}
                    </div>
                </div>

                {/* Inmunidades */}
                {immunities.length > 0 && (
                    <div className="bg-[#F8F8F8] p-4 border border-[#E0E0E0]">
                        <p className="font-['Press_Start_2P'] text-[10px] mb-4 flex items-center gap-2 text-[#2563EB]">
                            <span className="inline-block w-2.5 h-2.5 rounded-sm bg-[#2563EB]"></span>
                            INMUNIDADES
                        </p>
                        <div className="flex flex-wrap gap-2.5">
                            {immunities.map(t => renderPill(t, 0))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
