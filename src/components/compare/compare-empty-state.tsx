"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { POPULAR_COMPARISONS, COMPARE_COLORS } from "@/lib/constants/compare.constants"

interface CompareEmptyStateProps {
    onAddFirst: () => void
}

export function CompareEmptyState({ onAddFirst }: CompareEmptyStateProps) {
    const [randomLinks, setRandomLinks] = useState<typeof POPULAR_COMPARISONS>([])

    useEffect(() => {
        // Shuffle and pick 12 random comparisons on client load
        const shuffled = [...POPULAR_COMPARISONS].sort(() => 0.5 - Math.random())
        setRandomLinks(shuffled.slice(0, 12))
    }, [])
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-8"
        >
            {/* Mini slot preview */}
            <div className="flex gap-3 justify-center mb-8">
                {COMPARE_COLORS.map((color, i) => (
                    <motion.div
                        key={i}
                        className="w-16 h-20 border-2 border-dashed flex items-center justify-center"
                        style={{ borderColor: color, backgroundColor: `${color}10` }}
                        initial={{ scale: 0, rotate: -5 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: i * 0.08, type: "spring", stiffness: 400, damping: 18 }}
                    >
                        <span className="text-[20px] text-gray-300">+</span>
                    </motion.div>
                ))}
            </div>

            {/* CTA */}
            <div className="text-center mb-10">
                <h2 className="font-press-start text-[16px] text-[#111111] mb-4">
                    COMPARA HASTA 4 POKÉMON
                </h2>
                <p className="font-nunito text-[18px] text-gray-500 mb-6">
                    Estadísticas, tipos, habilidades y movimientos, todo lado a lado.
                </p>
                <button
                    onClick={onAddFirst}
                    className="px-6 py-4 bg-[#CC0000] text-white font-press-start text-[11px] border-2 border-[#111111] hover:bg-[#AA0000] transition-colors"
                    style={{ boxShadow: "4px 4px 0 #111111" }}
                >
                    + AÑADIR PRIMER POKÉMON
                </button>
            </div>

            {/* Popular comparisons */}
            <div>
                <div className="relative mb-6">
                    <div className="h-[3px] bg-[#111111]" />
                    <div className="h-[2px] bg-[#CC0000]" />
                    <span className="absolute top-[-16px] left-4 bg-[#111111] text-white font-press-start text-[10px] px-3 py-1">
                        COMPARACIONES POPULARES
                    </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {randomLinks.map((c, i) => (
                        <Link
                            key={i}
                            href={`/compare?${c.params}`}
                            className="border-2 border-[#E0E0E0] bg-[#FAFAFA] px-4 py-4 font-nunito text-[15px] text-[#111111] hover:border-[#CC0000] hover:shadow-[2px_2px_0_#CC0000] transition-all duration-150 text-center font-bold"
                        >
                            {c.label}
                        </Link>
                    ))}
                </div>
            </div>

            {/* How-to steps */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                    { num: "01", text: "Haz click en un slot vacío para buscar un Pokémon" },
                    { num: "02", text: "Añade hasta 4 para comparar en tiempo real" },
                    { num: "03", text: "Comparte la URL para mostrar tu comparación" },
                ].map((step, i) => (
                    <div key={i} className="border-2 border-[#E0E0E0] bg-[#FAFAFA] p-5 flex gap-4 items-start" style={{ boxShadow: "3px 3px 0 #E0E0E0" }}>
                        <span className="font-press-start text-[22px] text-[#CC0000] shrink-0">{step.num}</span>
                        <p className="font-nunito text-[16px] text-[#444444] leading-relaxed font-semibold">{step.text}</p>
                    </div>
                ))}
            </div>
        </motion.div>
    )
}
