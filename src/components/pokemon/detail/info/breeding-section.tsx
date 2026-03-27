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
        <div className="flex items-center gap-3 mt-10 mb-6">
            <h3 className="font-['Press_Start_2P'] text-[12px] text-[#111111] tracking-wide m-0 flex items-center gap-3">
                <span className="w-3 h-3 bg-[#CC0000]" />
                {children}
            </h3>
            <div className="flex-1 h-[2px] bg-[#E0E0E0]" />
        </div>
    )
}

function GenderBar({ genderRate }: { genderRate: number }) {
    if (genderRate === -1) {
        return (
            <div className="flex items-center gap-2 text-[#888888] font-['Press_Start_2P']">
                <Minus size={12} strokeWidth={3} />
                <span className="text-[8px] uppercase">Sin género</span>
            </div>
        )
    }
    const femalePercent = (genderRate / 8) * 100
    const malePercent = 100 - femalePercent
    return (
        <div className="space-y-1">
            <div className="flex items-center gap-4 text-[8px] font-['Press_Start_2P']">
                {malePercent > 0 && (
                    <span className="flex items-center gap-2 text-[#3B82F6]">
                        <Mars size={12} strokeWidth={3} /> {malePercent.toFixed(0)}%
                    </span>
                )}
                {femalePercent > 0 && (
                    <span className="flex items-center gap-2 text-[#EC4899]">
                        <Venus size={12} strokeWidth={3} /> {femalePercent.toFixed(0)}%
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
                {malePercent > 0 && <div style={{ width: `${malePercent}%`, backgroundColor: "#3B82F6" }} className="border-r border-white/20" />}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Grupos Huevo */}
                <div className="p-5 relative overflow-hidden group hover:translate-y-[-2px] transition-all duration-200" style={{ backgroundColor: "#FFFFFF", border: "3px solid #111111", boxShadow: "6px 6px 0 #111111" }}>
                    <Egg size={48} className="absolute -top-2 -right-2 opacity-5 group-hover:opacity-10 transition-opacity" />
                    <div className="flex items-center gap-2 mb-4">
                        <Egg size={20} className="text-[#CC0000]" strokeWidth={3} />
                        <span className="font-['Press_Start_2P'] text-[7px] text-[#888888] font-black uppercase tracking-widest group-hover:text-[#111111] transition-colors leading-none">Grupos Huevo</span>
                    </div>
                    {eggGroups.length > 0 ? (
                        <div className="flex flex-wrap gap-2 relative z-10">
                            {eggGroups.map((g: any) => (
                                <span
                                    key={g.name}
                                    className="font-['Press_Start_2P'] text-[7px] font-black uppercase px-2 py-1.5 border-2 border-[#111111] bg-white shadow-[2px_2px_0_#111111] group-hover:shadow-none group-hover:translate-x-[1px] group-hover:translate-y-[1px] transition-all"
                                >
                                    {EGG_GROUPS_ES[g.name] ?? g.name}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <span className="font-['Press_Start_2P'] text-[10px] font-black text-[#111111] relative z-10 leading-none">SIN HUEVOS</span>
                    )}
                </div>

                {/* Ciclos */}
                <div className="p-5 relative overflow-hidden group hover:translate-y-[-2px] transition-all duration-200" style={{ backgroundColor: "#FFFFFF", border: "3px solid #111111", boxShadow: "6px 6px 0 #111111" }}>
                    <Timer size={48} className="absolute -top-2 -right-2 opacity-5 group-hover:opacity-10 transition-opacity" />
                    <div className="flex items-center gap-2 mb-4">
                        <Timer size={20} className="text-[#CC0000]" strokeWidth={3} />
                        <span className="font-['Press_Start_2P'] text-[7px] text-[#888888] font-black uppercase tracking-widest group-hover:text-[#111111] transition-colors leading-none">Ciclos de Huevo</span>
                    </div>
                    <div className="relative z-10">
                        <NumberFlow
                            value={hatchCounter}
                            suffix=" CICLOS"
                            className="font-['Press_Start_2P'] text-[12px] font-black text-[#111111] block mb-2"
                        />
                        <div className="bg-[#F9F9F9] border-l-4 border-[#CC0000] px-2 py-1">
                            <span className="font-['Press_Start_2P'] text-[6px] text-[#888888]">≈ {steps.toLocaleString()} PASOS</span>
                        </div>
                    </div>
                </div>

                {/* Género */}
                <div className="p-5 relative overflow-hidden group hover:translate-y-[-2px] transition-all duration-200" style={{ backgroundColor: "#FFFFFF", border: "3px solid #111111", boxShadow: "6px 6px 0 #111111" }}>
                    <Mars size={48} className="absolute -top-2 -right-2 opacity-5 group-hover:opacity-10 transition-opacity" />
                    <div className="flex items-center gap-2 mb-4 z-10 relative">
                        <Mars size={20} className="text-[#CC0000]" strokeWidth={3} />
                        <span className="font-['Press_Start_2P'] text-[7px] text-[#888888] font-black uppercase tracking-widest group-hover:text-[#111111] transition-colors leading-none">Género</span>
                    </div>
                    <div className="relative z-10">
                        <GenderBar genderRate={genderRate} />
                    </div>
                </div>

                {/* Forma Bebé */}
                <div className="p-5 relative overflow-hidden group hover:translate-y-[-2px] transition-all duration-200" style={{ backgroundColor: "#FFFFFF", border: "3px solid #111111", boxShadow: "6px 6px 0 #111111" }}>
                    <Baby size={48} className="absolute -top-2 -right-2 opacity-5 group-hover:opacity-10 transition-opacity" />
                    <div className="flex items-center gap-2 mb-4 z-10 relative">
                        <Baby size={20} className="text-[#CC0000]" strokeWidth={3} />
                        <span className="font-['Press_Start_2P'] text-[7px] text-[#888888] font-black uppercase tracking-widest group-hover:text-[#111111] transition-colors leading-none">Forma Bebé</span>
                    </div>
                    <div className="relative z-10 mt-2">
                        {species.evolves_from_species ? (
                            (() => {
                                const id = getIdFromUrl(species.evolves_from_species.url)
                                return (
                                    <Link href={`/pokemon/${id}`} className="flex items-center gap-3 group/baby">
                                        <div className="p-1 border-2 border-[#111111] bg-white shadow-[2px_2px_0_#111111] group-hover/baby:shadow-none group-hover/baby:translate-x-[1px] group-hover/baby:translate-y-[1px] transition-all">
                                            <Image
                                                src={getPokemonSpriteUrl(id)}
                                                alt={species.evolves_from_species.name}
                                                width={32}
                                                height={32}
                                                style={{ imageRendering: "pixelated" }}
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-['Press_Start_2P'] text-[7px] text-[#111111] capitalize group-hover/baby:text-[#CC0000] transition-colors">
                                                {species.evolves_from_species.name.toLowerCase()}
                                            </span>
                                            <span className="font-['Press_Start_2P'] text-[5px] text-[#888888] mt-1">VER INFO</span>
                                        </div>
                                    </Link>
                                )
                            })()
                        ) : (
                            <span className="font-['Press_Start_2P'] text-[10px] font-black text-[#111111] leading-none">—</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
