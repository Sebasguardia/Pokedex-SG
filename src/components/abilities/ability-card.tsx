"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { AbilityCategoryBadge } from "./ability-category-badge"
import { inferAbilityCategory } from "@/lib/utils/ability.utils"
import { Users, Zap } from "lucide-react"

interface Props {
    ability: any
    index: number
}

export function AbilityCard({ ability, index }: Props) {
    const esEffect = ability.effect_entries?.find((e: any) => e.language.name === "es")?.short_effect
    const enEffect = ability.effect_entries?.find((e: any) => e.language.name === "en")?.short_effect
    const esFlavor = ability.flavor_text_entries?.find((e: any) => e.language.name === "es")?.flavor_text
    const enFlavor = ability.flavor_text_entries?.find((e: any) => e.language.name === "en")?.flavor_text

    const fullEffect = esEffect || enEffect || esFlavor || enFlavor || "No hay descripción disponible."
    const category = inferAbilityCategory(fullEffect) as any

    const categoryColors = {
        offensive: "#CC0000",
        defensive: "#4A90E2",
        support: "#50C878",
        unknown: "#888888"
    }
    const color = categoryColors[category as keyof typeof categoryColors] || "#111111"

    const abilityName = ability.names?.find((n: any) => n.language.name === "es")?.name || ability.name.replace("-", " ")

    return (
        <Link href={`/abilities/${ability.name}`}>
            <motion.div
                className="group relative bg-[#FAFAFA] border-4 border-[#111111] overflow-hidden flex flex-col h-full"
                initial={{ opacity: 0, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
                whileInView={{ opacity: 1, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                    delay: (index % 15) * 0.05
                }}
                whileHover={{
                    translateY: -4,
                    translateX: -4,
                    boxShadow: "10px 10px 0 #111111",
                }}
                style={{
                    boxShadow: "6px 6px 0 #111111"
                }}
            >
                {/* Accent Header Strip */}
                <div
                    className="h-[6px] w-full"
                    style={{ backgroundColor: color }}
                />

                <div className="p-5 sm:p-6 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="font-press-start text-[14px] sm:text-[16px] text-[#111111] uppercase leading-snug group-hover:text-[#CC0000] transition-colors pr-2 break-words max-w-[85%]">
                            {abilityName}
                        </h3>
                        <div className="shrink-0 text-[#111111] opacity-20 group-hover:opacity-100 group-hover:text-[#CC0000] transition-colors" style={{ color: color }}>
                            <Zap size={24} fill={color} />
                        </div>
                    </div>

                    <div className="h-[2px] bg-[#111111] w-full mb-4 opacity-10" />

                    <div className="font-nunito text-[14px] sm:text-[15px] text-[#555555] line-clamp-3 mb-6 flex-1 italic leading-relaxed">
                        "{fullEffect}"
                    </div>

                    <div className="h-[2px] bg-[#111111] w-full mb-4 opacity-10" />

                    <div className="flex justify-between items-center mt-auto">
                        <AbilityCategoryBadge category={category} size="md" />

                        <div className="flex items-center gap-2 bg-[#111111] text-white px-3 py-1.5 border-2 border-[#111111] shadow-[2px_2px_0_#CC0000]">
                            <Users size={14} className="text-[#CC0000]" />
                            <span className="font-press-start text-[8px] sm:text-[9px] translate-y-[1px]">
                                {ability.pokemon?.length || 0}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Hover Reveal Pattern */}
                <div 
                    className="absolute inset-0 z-[-1] opacity-0 group-hover:opacity-5 transition-opacity"
                    style={{
                        backgroundImage: `radial-gradient(${color} 2px, transparent 2px)`,
                        backgroundSize: '16px 16px'
                    }}
                />
            </motion.div>
        </Link>
    )
}
