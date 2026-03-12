"use client"

import { motion } from "framer-motion"
import NumberFlow from "@number-flow/react"
import { EGG_GROUPS_ES, GROWTH_RATES_ES } from "@/lib/utils/locale.utils"
import { Egg, Timer, Mars, Venus, Minus, Baby } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { getPokemonSpriteUrl } from "@/lib/utils/pokemon.utils"
import { getIdFromUrl } from "@/lib/utils/pokemon.utils"

interface Props {
    species?: any
}

function SectionTitle({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-center gap-3 mt-6 mb-4">
            <span className="font-['Press_Start_2P'] text-[9px] text-[#888888] tracking-wide">{children}</span>
            <div className="flex-1 h-[1px] bg-[#E0E0E0]" />
        </div>
    )
}

function GenderBar({ genderRate }: { genderRate: number }) {
    if (genderRate === -1) {
        return (
            <div className="flex items-center gap-1 text-[#888888]">
                <Minus size={12} />
                <span className="font-['Nunito'] text-[13px]">Sin género</span>
            </div>
        )
    }
    const femalePercent = (genderRate / 8) * 100
    const malePercent = 100 - femalePercent
    return (
        <div className="space-y-1">
            <div className="flex items-center gap-3 text-[12px] font-['Nunito']">
                {malePercent > 0 && (
                    <span className="flex items-center gap-1 text-[#3B82F6]">
                        <Mars size={12} /> {malePercent.toFixed(0)}%
                    </span>
                )}
                {femalePercent > 0 && (
                    <span className="flex items-center gap-1 text-[#EC4899]">
                        <Venus size={12} /> {femalePercent.toFixed(0)}%
                    </span>
                )}
            </div>
            <motion.div
                className="h-[6px] flex overflow-hidden"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                style={{ transformOrigin: "left" }}
                transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
                {malePercent > 0 && <div style={{ width: `${malePercent}%`, backgroundColor: "#3B82F6" }} />}
                {femalePercent > 0 && <div style={{ width: `${femalePercent}%`, backgroundColor: "#EC4899" }} />}
            </motion.div>
        </div>
    )
}

export function BreedingSection({ species }: Props) {
    if (!species) return null

    const eggGroups = species.egg_groups ?? []
    const hatchCounter = species.hatch_counter ?? 0
    const steps = (hatchCounter + 1) * 256
    const genderRate = species.gender_rate ?? -1
    const babyTriggerItem = species.baby_trigger_item
    const hasBabyForm = eggGroups.some((g: any) => g.name === "no-eggs") && !babyTriggerItem

    return (
        <div className="mb-6">
            <SectionTitle>CRÍA</SectionTitle>
            <div className="grid grid-cols-2 gap-2">
                {/* Grupos Huevo */}
                <div className="p-[14px]" style={{ background: "#F8F8F8", border: "1px solid #E0E0E0" }}>
                    <div className="flex items-center gap-2 mb-2">
                        <Egg size={14} className="text-[#CC0000]" />
                        <span className="font-['Nunito'] text-[10px] text-[#888888] uppercase tracking-[0.05em]">Grupos Huevo</span>
                    </div>
                    {eggGroups.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                            {eggGroups.map((g: any) => (
                                <span
                                    key={g.name}
                                    className="font-['Nunito'] text-[11px] font-bold px-2 py-[2px]"
                                    style={{ backgroundColor: "#D1FAE5", border: "1px solid #6EE7B7", color: "#065F46" }}
                                >
                                    {EGG_GROUPS_ES[g.name] ?? g.name}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <span className="font-['Nunito'] text-[13px] text-[#888888]">Sin huevos</span>
                    )}
                </div>

                {/* Ciclos */}
                <div className="p-[14px]" style={{ background: "#F8F8F8", border: "1px solid #E0E0E0" }}>
                    <div className="flex items-center gap-2 mb-2">
                        <Timer size={14} className="text-[#CC0000]" />
                        <span className="font-['Nunito'] text-[10px] text-[#888888] uppercase tracking-[0.05em]">Ciclos de Huevo</span>
                    </div>
                    <NumberFlow
                        value={hatchCounter}
                        suffix=" ciclos"
                        className="font-['Nunito'] text-[14px] font-bold text-[#111111] block"
                    />
                    <span className="font-['Nunito'] text-[11px] text-[#888888]">≈ {steps.toLocaleString()} pasos</span>
                </div>

                {/* Género */}
                <div className="p-[14px]" style={{ background: "#F8F8F8", border: "1px solid #E0E0E0" }}>
                    <div className="flex items-center gap-2 mb-2">
                        <Mars size={14} className="text-[#CC0000]" />
                        <span className="font-['Nunito'] text-[10px] text-[#888888] uppercase tracking-[0.05em]">Género</span>
                    </div>
                    <GenderBar genderRate={genderRate} />
                </div>

                {/* Forma Bebé */}
                <div className="p-[14px]" style={{ background: "#F8F8F8", border: "1px solid #E0E0E0" }}>
                    <div className="flex items-center gap-2 mb-2">
                        <Baby size={14} className="text-[#CC0000]" />
                        <span className="font-['Nunito'] text-[10px] text-[#888888] uppercase tracking-[0.05em]">Forma Bebé</span>
                    </div>
                    {species.evolves_from_species ? (
                        (() => {
                            const id = getIdFromUrl(species.evolves_from_species.url)
                            return (
                                <Link href={`/pokemon/${id}`} className="flex items-center gap-2 hover:opacity-80">
                                    <Image
                                        src={getPokemonSpriteUrl(id)}
                                        alt={species.evolves_from_species.name}
                                        width={32}
                                        height={32}
                                        style={{ imageRendering: "pixelated" }}
                                    />
                                    <span className="font-['Nunito'] text-[12px] font-bold text-[#111111] capitalize">
                                        {species.evolves_from_species.name}
                                    </span>
                                </Link>
                            )
                        })()
                    ) : (
                        <span className="font-['Nunito'] text-[13px] text-[#888888]">—</span>
                    )}
                </div>
            </div>
        </div>
    )
}
