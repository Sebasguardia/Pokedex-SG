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
        <div ref={ref} className="flex items-center justify-between gap-3 py-2 border-b border-[#F2F2F2]">
            <span className="font-['Nunito'] text-[13px] text-[#444444] flex-1">{label}</span>
            <div className="flex gap-1 items-center">
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
        <div className="flex items-center gap-3 mt-6 mb-4">
            <span className="font-['Press_Start_2P'] text-[9px] text-[#888888] tracking-wide">{children}</span>
            <div className="flex-1 h-[1px] bg-[#E0E0E0]" />
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
                <div className="mb-4">
                    <p className="font-['Nunito'] text-[12px] text-[#888888] italic mb-2">
                        Puntos de esfuerzo que otorga al ser derrotado
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

            <div className="flex items-center justify-between py-2 px-3" style={{ background: "#F8F8F8", border: "1px solid #E0E0E0" }}>
                <div className="flex items-center gap-2">
                    <TrendingUp size={14} className="text-[#CC0000]" />
                    <span className="font-['Nunito'] text-[12px] text-[#888888]">Exp. base al derrotarlo</span>
                </div>
                <NumberFlow
                    value={typeof baseExp === "number" ? baseExp : 0}
                    className="font-['JetBrains_Mono'] text-[13px] font-bold text-[#111111]"
                />
            </div>
        </div>
    )
}
