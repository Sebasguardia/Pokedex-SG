"use client"

import { motion } from "framer-motion"
import { Move } from "@/types/api/move.types"
import { Zap, Target, Battery, Clock, Percent, Calendar } from "lucide-react"
import { getPowerColor, isPowerDevastating, GEN_NAMES, GEN_YEARS, GEN_ROMAN } from "@/lib/constants/moves.constants"

interface Props {
    move: Move
    typeColor: string
}

function StatCard({ label, icon: Icon, children, borderColor, index }: {
    label: string
    icon: React.ElementType
    children: React.ReactNode
    borderColor?: string
    index: number
}) {
    return (
        <motion.div
            className="flex flex-col gap-2 p-4 bg-[#F8F8F8] border-2 border-[#E0E0E0] transition-all"
            style={borderColor ? { borderLeft: `4px solid ${borderColor}` } : {}}
            initial={{ scale: 0.88, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06, type: "spring", stiffness: 300, damping: 24 }}
            whileHover={{
                borderColor: "#111111",
                boxShadow: "3px 3px 0 #111111",
                transition: { type: "spring", stiffness: 400 }
            }}
        >
            <div className="flex items-center gap-2">
                <Icon size={16} color="#888888" />
                <span className="font-press-start text-[7px] text-[#888888] uppercase">{label}</span>
            </div>
            {children}
        </motion.div>
    )
}

export function MoveStatsGrid({ move, typeColor }: Props) {
    const power = move.power
    const powerColor = getPowerColor(power)
    const devastating = isPowerDevastating(power)
    const genRoman = GEN_ROMAN[move.generation?.name ?? ""] ?? "?"
    const genYear = GEN_YEARS[move.generation?.name ?? ""] ?? ""
    const genName = GEN_NAMES[move.generation?.name ?? ""] ?? ""

    const accColor =
        move.accuracy === null ? "#AAAAAA" :
            move.accuracy === 100 ? "#22C55E" :
                move.accuracy < 70 ? "#F97316" : "#444444"

    const ppRatio = Math.min(((move.pp ?? 0) / 25) * 100, 100)
    const ppFillColor = (move.pp ?? 0) > 15 ? "#22C55E" : (move.pp ?? 0) > 8 ? "#F59E0B" : "#EF4444"

    const effectChance = move.effect_chance
    const effectColor =
        !effectChance ? "#AAAAAA" :
            effectChance < 30 ? "#F97316" :
                effectChance < 70 ? "#F59E0B" : "#22C55E"

    // SVG arc for effect chance
    const r = 16
    const circ = 2 * Math.PI * r
    const offset = effectChance ? circ - (effectChance / 100) * circ : circ

    return (
        <section className="py-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">

                {/* 1. POTENCIA */}
                <StatCard label="Potencia" icon={Zap} borderColor={power !== null ? powerColor : "#E0E0E0"} index={0}>
                    {power === null ? (
                        <span className="font-press-start text-[18px] text-[#AAAAAA]">—</span>
                    ) : devastating ? (
                        <motion.span
                            className="font-press-start text-[18px]"
                            style={{ background: "linear-gradient(90deg, #CC0000, #7C3AED)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                            animate={{ opacity: [1, 0.7, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            {power}
                        </motion.span>
                    ) : (
                        <span className="font-press-start text-[18px]" style={{ color: powerColor }}>{power}</span>
                    )}
                    <span className="font-nunito text-[11px] text-[#AAAAAA]">base power</span>
                </StatCard>

                {/* 2. PRECISIÓN */}
                <StatCard label="Precisión" icon={Target} index={1}>
                    <div className="flex items-center gap-2">
                        {move.accuracy === null ? (
                            <span className="font-press-start text-[18px] text-[#AAAAAA]">—</span>
                        ) : (
                            <>
                                <span className="font-press-start text-[18px]" style={{ color: accColor }}>{move.accuracy}</span>
                                <span className="font-nunito text-[13px]" style={{ color: accColor }}>%</span>
                                {move.accuracy === 100 && (
                                    <motion.span className="text-[#22C55E] text-[16px]" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.6 }}>✓</motion.span>
                                )}
                            </>
                        )}
                    </div>
                    <span className="font-nunito text-[11px] text-[#AAAAAA]">
                        {move.accuracy === null ? "Este move nunca falla" : "% accuracy"}
                    </span>
                </StatCard>

                {/* 3. PP */}
                <StatCard label="PP" icon={Battery} index={2}>
                    <span className="font-press-start text-[18px] text-[#444444]">{move.pp}</span>
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-[6px] bg-[#E0E0E0] rounded-full overflow-hidden">
                            <motion.div
                                className="h-full rounded-full"
                                style={{ backgroundColor: ppFillColor }}
                                initial={{ width: 0 }}
                                whileInView={{ width: `${ppRatio}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                            />
                        </div>
                        <span className="font-nunito text-[10px] text-[#AAAAAA]">Máx: {Math.round((move.pp ?? 0) * 1.6)} con PP Ups</span>
                    </div>
                </StatCard>

                {/* 4. PRIORIDAD */}
                <StatCard label="Prioridad" icon={Clock} index={3}>
                    {move.priority === 0 ? (
                        <span className="font-press-start text-[18px] text-[#888888]">0</span>
                    ) : (
                        <>
                            <span className="font-press-start text-[18px]" style={{ color: move.priority > 0 ? "#22C55E" : "#CC0000" }}>
                                {move.priority > 0 ? `+${move.priority}` : move.priority}
                            </span>
                            <span className="font-press-start text-[7px]" style={{ color: move.priority > 0 ? "#22C55E" : "#CC0000" }}>
                                {move.priority > 0 ? "ATAQUE RÁPIDO" : "ATAQUE LENTO"}
                            </span>
                        </>
                    )}
                    <span className="font-nunito text-[11px] text-[#AAAAAA]">
                        {move.priority === 0 ? "sin modificación" : "en el turno"}
                    </span>
                </StatCard>

                {/* 5. PROB. EFECTO */}
                <StatCard label="Prob. Efecto" icon={Percent} index={4}>
                    <div className="flex items-center gap-3">
                        <span className="font-press-start text-[18px]" style={{ color: effectChance ? effectColor : "#AAAAAA" }}>
                            {effectChance ? `${effectChance}%` : "—"}
                        </span>
                        {effectChance && (
                            <svg width={40} height={40} viewBox="0 0 40 40">
                                <circle cx={20} cy={20} r={r} fill="none" stroke="#E0E0E0" strokeWidth={4} />
                                <motion.circle
                                    cx={20} cy={20} r={r}
                                    fill="none"
                                    stroke={effectColor}
                                    strokeWidth={4}
                                    strokeLinecap="round"
                                    strokeDasharray={circ}
                                    transform="rotate(-90 20 20)"
                                    initial={{ strokeDashoffset: circ }}
                                    whileInView={{ strokeDashoffset: offset }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                />
                            </svg>
                        )}
                    </div>
                    <span className="font-nunito text-[11px] text-[#AAAAAA]">efecto secundario</span>
                </StatCard>

                {/* 6. GENERACIÓN */}
                <StatCard label="Generación" icon={Calendar} index={5}>
                    <span className="font-press-start text-[18px] text-[#444444]">{genRoman}</span>
                    <span className="font-nunito text-[11px] text-[#AAAAAA]">{genName} ({genYear})</span>
                </StatCard>
            </div>
        </section>
    )
}
