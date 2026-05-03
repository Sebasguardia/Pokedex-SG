"use client"

import { motion } from "framer-motion"
import { Move } from "@/types/api/move.types"
import { CONTEST_TYPE_COLORS, CONTEST_TYPE_LABELS } from "@/lib/constants/moves/moves.constants"
import { Star, Heart, Music, ArrowUp, ArrowDown } from "lucide-react"
import Link from "next/link"

interface Props {
    move: Move
}

export function MoveContestSection({ move }: Props) {
    if (!move.contest_type) return null

    const contestType = move.contest_type.name
    const contestColor = CONTEST_TYPE_COLORS[contestType] ?? "#888888"
    const contestLabel = CONTEST_TYPE_LABELS[contestType] ?? contestType

    // Contest combos
    const useBefore = move.contest_combos?.normal?.use_before ?? []
    const useAfter = move.contest_combos?.normal?.use_after ?? []

    return (
        <motion.section
            className="py-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <div className="flex items-center gap-2 mb-4">
                <Star size={14} color="#A855F7" />
                <span className="font-press-start text-[10px] text-[#111111]">CONCURSOS POKÉMON</span>
                <span className="bg-[#111111] text-white font-nunito text-[10px] px-2 py-0.5">Diamante/Perla</span>
            </div>

            <div
                className="p-5 border-2 border-[#E9D5FF] border-l-4"
                style={{
                    backgroundColor: "#FDF4FF",
                    borderLeftColor: "#A855F7",
                }}
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Left: contest type + appeal */}
                    <div className="flex flex-col gap-4">
                        <motion.div
                            initial={{ scale: 0, rotate: -10 }}
                            whileInView={{ scale: 1, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 300, damping: 22 }}
                            className="self-start"
                        >
                            <span
                                className="inline-block px-3 py-1.5 font-nunito text-[13px] font-bold text-white border-2 border-[#111111]"
                                style={{ backgroundColor: contestColor }}
                            >
                                {contestLabel}
                            </span>
                        </motion.div>

                        {/* Appeal hearts */}
                        <div>
                            <span className="font-press-start text-[7px] text-[#888888] block mb-1.5">APPEAL</span>
                            <div className="flex gap-1">
                                {Array.from({ length: 8 }).map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.05, type: "spring", bounce: 0.5 }}
                                    >
                                        <Heart
                                            size={14}
                                            fill={i < 5 ? contestColor : "none"}
                                            color={i < 5 ? contestColor : "#E0E0E0"}
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Jam notes */}
                        <div>
                            <span className="font-press-start text-[7px] text-[#888888] block mb-1.5">JAM</span>
                            <div className="flex gap-1">
                                {Array.from({ length: 8 }).map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.4 + i * 0.05, type: "spring", bounce: 0.5 }}
                                    >
                                        <Music
                                            size={14}
                                            fill={i < 2 ? "#111111" : "none"}
                                            color={i < 2 ? "#111111" : "#E0E0E0"}
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: combos */}
                    {(useBefore.length > 0 || useAfter.length > 0) && (
                        <div className="flex flex-col gap-3">
                            <span className="font-press-start text-[8px] text-[#888888]">COMBOS</span>

                            {useAfter.length > 0 && (
                                <div>
                                    <div className="flex items-center gap-1 mb-2">
                                        <ArrowUp size={12} color="#22C55E" />
                                        <span className="font-nunito text-[11px] text-[#888888]">Usar después de:</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        {useAfter.map(m => (
                                            <Link key={m.name} href={`/moves/${m.name}`} className="font-nunito text-[12px] font-bold text-[#22C55E] hover:underline">
                                                ↑ {m.name.replace(/-/g, " ")}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {useBefore.length > 0 && (
                                <div>
                                    <div className="flex items-center gap-1 mb-2">
                                        <ArrowDown size={12} color="#60A5FA" />
                                        <span className="font-nunito text-[11px] text-[#888888]">Usar antes de:</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        {useBefore.map(m => (
                                            <Link key={m.name} href={`/moves/${m.name}`} className="font-nunito text-[12px] font-bold text-[#60A5FA] hover:underline">
                                                ↓ {m.name.replace(/-/g, " ")}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </motion.section>
    )
}
