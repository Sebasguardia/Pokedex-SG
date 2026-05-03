"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Move } from "@/types/api/move.types"
import { TYPE_COLORS, TYPE_ICON } from "@/lib/constants/types/types.constants"
import { GEN_ROMAN, getPowerColor, DAMAGE_CLASS_LABELS } from "@/lib/constants/moves/moves.constants"
import { MoveClassBadge } from "./move-class-badge"
import { MovePowerDisplay } from "./move-power-display"

interface Props {
    move: Move
    index: number
}

export function MoveCard({ move, index }: Props) {
    const typeColor = TYPE_COLORS[move.type?.name ?? ""] ?? "#888888"
    const TypeIcon = TYPE_ICON[move.type?.name as keyof typeof TYPE_ICON]
    const nameES = move.names?.find(n => n.language.name === "es")?.name ?? move.name
    const genRoman = GEN_ROMAN[move.generation?.name ?? ""] ?? "?"
    const effectES =
        move.effect_entries?.find(e => e.language.name === "es")?.short_effect ??
        move.effect_entries?.find(e => e.language.name === "en")?.short_effect ?? ""

    const accColor =
        move.accuracy === null ? "#AAAAAA" :
            move.accuracy === 100 ? "#22C55E" :
                move.accuracy < 70 ? "#F97316" : "#444444"

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.04, type: "spring", stiffness: 300, damping: 28 }}
            className="bg-white border-2 border-[#111111] overflow-hidden cursor-pointer group"
            style={{ boxShadow: "4px 4px 0 #111111" }}
            whileHover={{
                x: -2,
                y: -2,
                boxShadow: `6px 6px 0 #CC0000`,
            }}
            whileTap={{ x: 0, y: 0, boxShadow: "2px 2px 0 #111111" }}
        >
            <Link href={`/moves/${move.name}`} className="block">
                {/* Type color strip + gen badge */}
                <div className="relative h-[5px]" style={{ backgroundColor: typeColor }}>
                    <span
                        className="absolute right-2 -bottom-3 font-press-start text-[6px] px-1.5 py-0.5 border border-[#111111] bg-white text-[#888888] z-10"
                    >
                        Gen {genRoman}
                    </span>
                </div>

                <div className="p-4 pt-5">
                    {/* Badges row */}
                    <div className="flex items-center gap-2 mb-3">
                        <div
                            className="inline-flex items-center gap-1 px-2 py-0.5 border-[1.5px] border-[#111111] font-nunito text-[10px] font-bold text-white uppercase"
                            style={{ backgroundColor: typeColor }}
                        >
                            {TypeIcon && <TypeIcon size={10} />}
                            {move.type?.name}
                        </div>
                        <MoveClassBadge damageClass={move.damage_class?.name ?? "status"} size="sm" />
                    </div>

                    {/* Name */}
                    <h3 className="font-nunito font-black text-[16px] text-[#111111] mb-2 line-clamp-1">
                        {nameES}
                    </h3>

                    {/* Effect */}
                    {effectES && (
                        <p className="font-nunito text-[11px] text-[#888888] italic line-clamp-2 mb-3 leading-relaxed">
                            {effectES.replace(/\$effect_chance/g, `${move.effect_chance ?? 0}`)}
                        </p>
                    )}

                    {/* Hard-edge separator */}
                    <div className="h-[2px] bg-[#111111] mb-3" />

                    {/* Stats row */}
                    <div className="flex items-center justify-between">
                        {[
                            { label: "POT", value: move.power ?? null, type: "power" as const },
                            { label: "PREC", value: move.accuracy !== null ? `${move.accuracy}%` : "—", type: "text" as const, color: accColor },
                            { label: "PP", value: move.pp, type: "text" as const, color: "#888888" },
                            { label: "PRIO", value: move.priority > 0 ? `+${move.priority}` : String(move.priority), type: "text" as const, color: move.priority > 0 ? "#22C55E" : "#888888" },
                            { label: "EF%", value: move.effect_chance ? `${move.effect_chance}%` : "—", type: "text" as const, color: "#888888" },
                        ].map(stat => (
                            <div key={stat.label} className="flex flex-col items-center gap-0.5">
                                <span className="font-press-start text-[5px] text-[#AAAAAA]">{stat.label}</span>
                                {stat.type === "power" ? (
                                    <MovePowerDisplay power={stat.value} showBar={false} />
                                ) : (
                                    <span className="font-jetbrains text-[13px] font-bold" style={{ color: stat.color }}>
                                        {stat.value}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom hover accent bar */}
                <motion.div
                    className="h-[3px] w-full"
                    style={{ backgroundColor: typeColor, scaleX: 0, originX: 0 }}
                    variants={{ hover: { scaleX: 1 }, initial: { scaleX: 0 } }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                />
            </Link>
        </motion.div>
    )
}
