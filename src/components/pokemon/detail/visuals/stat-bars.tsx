"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion"
import NumberFlow from "@number-flow/react"
import * as Tooltip from "@radix-ui/react-tooltip"
import { TrendingDown, TrendingUp } from "lucide-react"

interface Stat {
    stat: { name: string }
    base_stat: number
}

interface Props {
    stats?: Stat[]
}

const STAT_LABELS: Record<string, string> = {
    hp: "HP", attack: "ATK", defense: "DEF",
    "special-attack": "Sp.A", "special-defense": "Sp.D", speed: "SPE"
}

const STAT_NAMES: Record<string, string> = {
    hp: "Puntos de Salud", attack: "Ataque", defense: "Defensa",
    "special-attack": "Ataque Especial", "special-defense": "Defensa Especial", speed: "Velocidad"
}

function getStatColor(val: number) {
    if (val < 50) return "#EF4444" // red
    if (val < 80) return "#F59E0B" // orange
    if (val < 110) return "#22C55E" // green
    if (val < 150) return "#3B82F6" // blue
    return "#8B5CF6" // purple
}

const TIER_MAP = [
    { min: 0, label: "DÉBIL", color: "#888888", icon: TrendingDown },
    { min: 300, label: "NORMAL", color: "#3B82F6", icon: null },
    { min: 450, label: "BUENO", color: "#22C55E", icon: null },
    { min: 550, label: "EXCELENTE", color: "#8B5CF6", icon: null },
    { min: 600, label: "LEGENDARIO", color: "#F59E0B", icon: null },
]

function StatRow({ stat, index, inView, prefersRM }: { stat: Stat, index: number, inView: boolean, prefersRM: boolean | null }) {
    const label = STAT_LABELS[stat.stat.name] ?? stat.stat.name.toUpperCase().slice(0, 3)
    const name = STAT_NAMES[stat.stat.name] ?? stat.stat.name
    const pct = Math.min((stat.base_stat / 255) * 100, 100)
    const color = getStatColor(stat.base_stat)
    const delay = prefersRM ? 0 : index * 0.08

    return (
        <Tooltip.Provider>
            <Tooltip.Root>
                <Tooltip.Trigger asChild>
                    <motion.div
                        className="flex items-center gap-2 py-[10px] border-b-[2px] cursor-default group border-[#F0F0F0]"
                        whileHover={{ backgroundColor: "#F9F9F9" }}
                        transition={{ duration: 0.15 }}
                    >
                        <span className="font-['Press_Start_2P'] text-[10px] w-[56px] text-right transition-colors text-[#888888] group-hover:text-[#111111]">
                            {label}
                        </span>

                        {/* Bar container */}
                        <div className="flex-1 h-[10px] relative overflow-hidden bg-white border-[2px] border-[#111111]">
                            <motion.div
                                className="absolute left-0 top-0 h-full overflow-hidden"
                                initial={{ width: "0%", backgroundColor: "#EEEEEE" }}
                                animate={{ 
                                    width: inView ? `${pct}%` : "0%",
                                    backgroundColor: color 
                                }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            >
                                {/* Static scanlines instead of moving shimmer */}
                                <div 
                                    className="absolute inset-0 opacity-20 pointer-events-none" 
                                    style={{ 
                                        backgroundImage: "linear-gradient(transparent 50%, rgba(255,255,255,0.4) 50%)", 
                                        backgroundSize: "100% 4px" 
                                    }} 
                                />
                            </motion.div>
                        </div>

                        {/* Number */}
                        <div className="w-[42px] text-right">
                            <NumberFlow
                                value={inView ? stat.base_stat : 0}
                                className="font-['Press_Start_2P'] text-[10px]"
                                style={{ color }}
                            />
                        </div>
                        <span className="font-['Press_Start_2P'] text-[8px] w-[32px] text-[#AAAAAA]">/255</span>
                    </motion.div>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                    <Tooltip.Content className="bg-[#111111] text-white font-['Nunito'] text-[11px] px-3 py-2 max-w-[220px] z-50" sideOffset={5}>
                        {name}: determina {name.toLowerCase()} del Pokémon
                        <Tooltip.Arrow className="fill-[#111111]" />
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip.Root>
        </Tooltip.Provider>
    )
}

export function StatBars({ stats }: Props) {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, margin: "-50px 0px" })
    const prefersRM = useReducedMotion()

    if (!stats) return null

    const total = stats.reduce((s, st) => s + st.base_stat, 0)
    const tier = [...TIER_MAP].reverse().find(t => total >= t.min) ?? TIER_MAP[0]
    const TierIcon = tier.icon

    return (
        <div ref={ref} className="mb-6 p-5 sm:p-6 bg-[#FFFFFF] border-[2px] border-[#111111] shadow-[4px_4px_0_rgba(17,17,17,0.15)] rounded-lg">
            
            <h3 className="font-['Press_Start_2P'] text-[12px] mb-4 tracking-wide text-[#111111] border-b-2 border-[#E0E0E0] pb-2 inline-block">ESTADÍSTICAS BASE</h3>

            <div className="relative z-10">
                {stats.map((stat, i) => (
                    <StatRow key={stat.stat.name} stat={stat} index={i} inView={inView} prefersRM={prefersRM} />
                ))}

                {/* Total */}
                <div className="flex items-center gap-3 pt-4 mt-2 border-t-[3px] border-[#111111]">
                    <span className="font-['Press_Start_2P'] text-[10px] w-[56px] text-right text-[#111111]">TOT</span>
                    <div className="flex-1 h-[14px] relative overflow-hidden bg-[#F2F2F2] border-[2px] border-[#111111]">
                        {inView && (
                            <motion.div
                                className="h-full relative overflow-hidden bg-[#111111]"
                                initial={{ width: "0%" }}
                                animate={{ width: `${Math.min((total / (255 * 6)) * 100, 100)}%` }}
                                transition={{ delay: prefersRM ? 0 : 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "linear-gradient(transparent 50%, rgba(255,255,255,0.4) 50%)", backgroundSize: "100% 4px" }} />
                            </motion.div>
                        )}
                    </div>
                    <div className="flex items-center gap-3 w-auto">
                        <NumberFlow
                            value={inView ? total : 0}
                            className="font-['Press_Start_2P'] text-[14px] text-[#111111]"
                        />
                        {/* Tier Badge */}
                        <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: inView ? 1 : 0 }}
                            transition={{ delay: 0.8, type: "spring", bounce: 0.4 }}
                            className="font-['Press_Start_2P'] text-[8px] px-2 py-1 flex items-center gap-1 shadow-[2px_2px_0_rgba(17,17,17,1)]"
                            style={{ backgroundColor: tier.color, color: "#FFFFFF", border: `2px solid #111111` }}
                        >
                            {TierIcon && <TierIcon size={12} strokeWidth={3} />}
                            {tier.label}
                        </motion.span>
                    </div>
                </div>
            </div>
        </div>
    )
}
