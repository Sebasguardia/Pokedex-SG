"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { AbilityCategoryBadge } from "./ability-category-badge"
import { inferAbilityCategory } from "@/lib/utils/ability.utils"
import { Users } from "lucide-react"

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
    const isHidden = false // Would need logic if filtering by hidden specifically

    return (
        <Link href={`/abilities/${ability.name}`}>
            <motion.div
                className="group relative bg-white border-2 border-[#111111] overflow-hidden"
                initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
                whileInView={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{
                    duration: 0.35,
                    ease: [0.22, 1, 0.36, 1],
                    delay: (index % 15) * 0.05
                }}
                whileHover={{
                    x: 4,
                    y: 4,
                    boxShadow: "0px 0px 0 #111111"
                }}
                style={{
                    boxShadow: "4px 4px 0 #111111"
                }}
            >
                {/* 3px Top Strip */}
                <div
                    className="h-[3px] w-full"
                    style={{ backgroundColor: isHidden ? "#CC0000" : "#111111" }}
                />

                <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-nunito font-bold text-[16px] text-[#111111] capitalize group-hover:text-[#CC0000] transition-colors line-clamp-1">
                            {ability.names?.find((n: any) => n.language.name === "es")?.name || ability.name.replace("-", " ")}
                        </h3>

                        {isHidden && (
                            <motion.div
                                className="bg-[#111111] text-white font-press-start text-[7px] px-2 py-1 border border-[#CC0000] shrink-0 ml-2"
                                animate={{
                                    boxShadow: [
                                        "0 0 0px rgba(204,0,0,0)",
                                        "0 0 6px rgba(204,0,0,0.5)",
                                        "0 0 0px rgba(204,0,0,0)"
                                    ]
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                OCULTA
                            </motion.div>
                        )}
                    </div>

                    <div className="h-px bg-[#E0E0E0] w-full mb-3" />

                    <div className="font-nunito text-[13px] text-[#888888] line-clamp-2 mb-4 h-[40px]">
                        {fullEffect}
                    </div>

                    <div className="h-px bg-[#E0E0E0] w-full mb-3" />

                    <div className="flex justify-between items-center">
                        <AbilityCategoryBadge category={category} size="sm" />

                        <div className="flex items-center gap-1.5 text-[#888888] font-nunito text-[12px]">
                            <Users size={12} />
                            <span>{ability.pokemon?.length || 0} Pokémon</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    )
}
