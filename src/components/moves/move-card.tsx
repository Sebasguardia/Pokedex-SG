"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Move } from "@/types/api/move.types"
import { TYPE_COLORS, TYPE_ICON } from "@/lib/constants/types.constants"
import { GEN_ROMAN, getPowerColor, DAMAGE_CLASS_LABELS } from "@/lib/constants/moves.constants"
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

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.04, type: "spring", stiffness: 300, damping: 28 }}
            whileHover={{
                y: -2,
                boxShadow: `4px 4px 0 ${typeColor}`
            }}
            className="bg-white border-2 border-[#111111] overflow-hidden cursor-pointer"
            style={{ boxShadow: "4px 4px 0 #111111" }}
        >
            <Link href={`/moves/${move.name}`} className="block">
                {/* Type color strip */}
                <div className="h-[4px]" style={{ backgroundColor: typeColor }} />

                <div className="p-4">
                    {/* Badges row */}
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <div
                                className="inline-flex items-center gap-1 px-2 py-0.5 border-[1.5px] border-[#111111] font-nunito text-[10px] font-bold text-white uppercase"
                                style={{ backgroundColor: typeColor }}
                            >
                                {TypeIcon && <TypeIcon size={10} />}
                                {move.type?.name}
                            </div>
                            <MoveClassBadge damageClass={move.damage_class?.name ?? "status"} size="sm" />
                        </div>
                        <span className="font-press-start text-[7px] text-[#888888]">Gen {genRoman}</span>
                    </div>

                    {/* Name */}
                    <h3 className="font-nunito font-bold text-[15px] text-[#111111] mb-2 group-hover:text-typeColor transition-colors line-clamp-1">
                        {nameES}
                    </h3>

                    {/* Effect */}
                    {effectES && (
                        <p className="font-nunito text-[11px] text-[#888888] italic line-clamp-2 mb-3">
                            {effectES.replace(/\$effect_chance/g, `${move.effect_chance ?? 0}`)}
                        </p>
                    )}

                    {/* Separator */}
                    <div className="h-px bg-[#E0E0E0] mb-3" />

                    {/* Stats row */}
                    <div className="flex items-center justify-between">
                        {[
                            { label: "POW", value: move.power ?? null, type: "power" as const },
                            { label: "ACC", value: move.accuracy !== null ? `${move.accuracy}%` : "—", type: "text" as const, color: "#888888" },
                            { label: "PP", value: move.pp, type: "text" as const, color: "#888888" },
                            { label: "PRIO", value: move.priority > 0 ? `+${move.priority}` : String(move.priority), type: "text" as const, color: move.priority > 0 ? "#22C55E" : "#888888" },
                            { label: "EF%", value: move.effect_chance ? `${move.effect_chance}%` : "—", type: "text" as const, color: "#888888" },
                        ].map(stat => (
                            <div key={stat.label} className="flex flex-col items-center">
                                <span className="font-press-start text-[5px] text-[#AAAAAA] mb-1">{stat.label}</span>
                                {stat.type === "power" ? (
                                    <MovePowerDisplay power={stat.value} showBar={false} />
                                ) : (
                                    <span className="font-jetbrains text-[12px] font-bold" style={{ color: stat.color }}>
                                        {stat.value}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}
