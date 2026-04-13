"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { GROWTH_RATES_ES } from "@/lib/utils/locale.utils"
import { Dumbbell, TrendingUp } from "lucide-react"
import NumberFlow from "@number-flow/react"

interface Props {
    pokemon?: any
}

const STAT_NAMES_ES: Record<string, string> = {
    hp: "PS", attack: "Ataque", defense: "Defensa",
    "special-attack": "At. Esp.", "special-defense": "Def. Esp.", speed: "Velocidad",
}

// Growth rate ordered from fastest to slowest on a visual line
const GROWTH_ORDER = ["medium-slow", "fast", "medium", "slow-then-very-fast", "slow", "fast-then-very-slow"]

function EVDots({ yield: yieldVal, label }: { yield: number; label: string }) {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, margin: "-20px" })

    if (yieldVal <= 0) return null
    return (
        <div ref={ref} className="flex items-center justify-between gap-2 py-3 border-b-2 border-[#F2F2F2]">
            <span className="font-['Press_Start_2P'] text-[6px] sm:text-[7px] text-[#111111] flex-1 uppercase tracking-tighter">{label}</span>
            <div className="flex gap-2 items-center">
                {Array.from({ length: 3 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="w-[8px] h-[8px] border border-[#111111]"
                        style={{ backgroundColor: i < yieldVal ? "#CC0000" : "#F2F2F2" }}
                        initial={{ scale: 0 }}
                        animate={inView ? { scale: 1 } : { scale: 0 }}
                        transition={{ delay: i * 0.1, type: "spring", stiffness: 400, damping: 20 }}
                    />
                ))}
                <NumberFlow value={yieldVal} className="font-['JetBrains_Mono'] text-[12px] text-[#CC0000] ml-1" />
            </div>
        </div>
    )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-center gap-3 mt-8 sm:mt-10 mb-4 sm:mb-6">
            <h3 className="font-['Press_Start_2P'] text-[10px] sm:text-[12px] text-[#111111] tracking-wide m-0 flex items-center gap-3">
                <span className="w-3 h-3 bg-[#111111]" />
                {children}
            </h3>
            <div className="flex-1 h-[2px] bg-[#E0E0E0]" />
        </div>
    )
}

export function TrainingSection({ pokemon }: Props) {
    if (!pokemon) return null

    const stats = pokemon.stats ?? []
    const evYields = stats.filter((s: any) => s.effort > 0)
    const baseExp = pokemon.base_experience ?? "—"

    // We'd need species for growth rate - pass pokemon only, growth rate comes from species
    // We'll just show EV yield + base exp here; growth rate is in species and will be shown in BreedingSection

    return (
        <div className="mb-6">
            <SectionTitle>ENTRENAMIENTO</SectionTitle>

            {evYields.length > 0 && (
                <div className="mb-6 bg-[#F9F9F9] p-4 sm:p-5 border-2 border-[#111111] shadow-inner">
                    <p className="font-['Press_Start_2P'] text-[7px] text-[#888888] mb-4 uppercase">
                        Puntos de esfuerzo al ser derrotado:
                    </p>
                    {evYields.map((s: any) => (
                        <EVDots
                            key={s.stat.name}
                            yield={s.effort}
                            label={STAT_NAMES_ES[s.stat.name] ?? s.stat.name}
                        />
                    ))}
                </div>
            )}

            <div 
                className="flex items-center justify-between p-4 sm:p-6" 
                style={{ backgroundColor: "#FFFFFF", border: "3px solid #111111", boxShadow: "6px 6px 0 #111111" }}
            >
                <div className="flex items-center gap-4">
                    <TrendingUp size={24} className="text-[#CC0000]" strokeWidth={3} />
                    <span className="font-['Press_Start_2P'] text-[7px] sm:text-[8px] text-[#111111] uppercase leading-tight">Exp. base al derrotarlo</span>
                </div>
                <div className="flex flex-col items-end">
                    <NumberFlow
                        value={typeof baseExp === "number" ? baseExp : 0}
                        className="font-['Press_Start_2P'] text-[14px] text-[#CC0000] font-black"
                    />
                    <span className="font-['Press_Start_2P'] text-[6px] text-[#888888] mt-1">PUNTOS</span>
                </div>
            </div>
        </div>
    )
}
