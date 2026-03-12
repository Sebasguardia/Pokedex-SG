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
    if (val < 50) return "#EF4444"
    if (val < 80) return "#F59E0B"
    if (val < 110) return "#22C55E"
    if (val < 150) return "#3B82F6"
    return "#8B5CF6"
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
                        className="flex items-center gap-3 py-2 border-b border-[#F2F2F2] cursor-default group"
                        whileHover={{ backgroundColor: "#FAFAFA" }}
                        transition={{ duration: 0.15 }}
                    >
                        <span className="font-['Press_Start_2P'] text-[8px] text-[#888888] w-[52px] text-right group-hover:text-[#111111] transition-colors">
                            {label}
                        </span>

                        {/* Bar container */}
                        <div className="flex-1 h-[8px] bg-[#F2F2F2] border border-[#E0E0E0] relative overflow-hidden">
                            {inView && (
                                <motion.div
                                    className="absolute inset-y-0 left-0 rounded-none"
                                    style={{ backgroundColor: color }}
                                    initial={{ width: "0%" }}
                                    animate={{ width: `${pct}%` }}
                                    transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    {/* Shimmer */}
                                    <motion.div
                                        className="absolute inset-0"
                                        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)" }}
                                        initial={{ x: "-100%" }}
                                        animate={{ x: "200%" }}
                                        transition={{ delay, duration: 0.7, ease: "easeOut" }}
                                    />
                                </motion.div>
                            )}
                        </div>

                        {/* Number */}
                        <div className="w-[36px] text-right">
                            <NumberFlow
                                value={inView ? stat.base_stat : 0}
                                className="font-['JetBrains_Mono'] text-[12px]"
                                style={{ color }}
                            />
                        </div>
                        <span className="font-['Nunito'] text-[10px] text-[#AAAAAA] w-[32px]">/ 255</span>
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
        <div ref={ref} className="mb-6">
            <h3 className="font-['Press_Start_2P'] text-[9px] text-[#888888] mb-3 tracking-wide">BASE STATS</h3>

            {stats.map((stat, i) => (
                <StatRow key={stat.stat.name} stat={stat} index={i} inView={inView} prefersRM={prefersRM} />
            ))}

            {/* Total */}
            <div className="flex items-center gap-3 pt-3 mt-1 border-t-2 border-[#111111]">
                <span className="font-['Press_Start_2P'] text-[8px] text-[#111111] w-[52px] text-right">TOT</span>
                <div className="flex-1 h-[12px] bg-[#F2F2F2] border border-[#E0E0E0] overflow-hidden">
                    {inView && (
                        <motion.div
                            className="h-full"
                            style={{ backgroundColor: "#CC0000" }}
                            initial={{ width: "0%" }}
                            animate={{ width: `${Math.min((total / (255 * 6)) * 100, 100)}%` }}
                            transition={{ delay: prefersRM ? 0 : 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        />
                    )}
                </div>
                <div className="flex items-center gap-2 w-auto">
                    <NumberFlow
                        value={inView ? total : 0}
                        className="font-['Press_Start_2P'] text-[14px] text-[#111111]"
                    />
                    {/* Tier Badge */}
                    <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: inView ? 1 : 0 }}
                        transition={{ delay: 0.8, type: "spring", bounce: 0.4 }}
                        className="font-['Press_Start_2P'] text-[7px] px-2 py-[3px] flex items-center gap-1"
                        style={{ backgroundColor: tier.color + "22", color: tier.color, border: `1px solid ${tier.color}` }}
                    >
                        {TierIcon && <TierIcon size={10} />}
                        {tier.label}
                    </motion.span>
                </div>
            </div>
        </div>
    )
}
