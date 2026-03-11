"use client"

import { motion } from "framer-motion"
import { Move } from "@/types/api/move.types"
import { TYPE_COLORS, TYPE_ICON } from "@/lib/constants/types.constants"
import { GEN_ROMAN } from "@/lib/constants/moves.constants"
import { MoveClassBadge } from "./move-class-badge"
import Link from "next/link"
import { GiPunchBlast } from "react-icons/gi"
import { Circle } from "lucide-react"

interface Props {
    move: Move
    typeColor: string
}

const DAMAGE_BG_PATTERNS: Record<string, React.CSSProperties> = {
    physical: {
        backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(0,0,0,0.04) 20px, rgba(0,0,0,0.04) 22px)"
    },
    special: {
        backgroundImage: "radial-gradient(circle, transparent 20px, rgba(0,0,0,0.03) 21px)",
        backgroundSize: "40px 40px"
    },
    status: {
        backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.05) 1.5px, transparent 1.5px)",
        backgroundSize: "20px 20px"
    }
}

export function MoveDetailHero({ move, typeColor }: Props) {
    const TypeIcon = TYPE_ICON[move.type?.name as keyof typeof TYPE_ICON]
    const nameES = move.names?.find(n => n.language.name === "es")?.name ?? move.name
    const genRoman = GEN_ROMAN[move.generation?.name ?? ""] ?? "?"
    const damageClass = move.damage_class?.name as "physical" | "special" | "status"
    const pattern = DAMAGE_BG_PATTERNS[damageClass] ?? DAMAGE_BG_PATTERNS.status

    const effectES =
        move.effect_entries?.find(e => e.language.name === "es")?.short_effect ??
        move.effect_entries?.find(e => e.language.name === "en")?.short_effect ?? ""

    const words = effectES.replace(/\$effect_chance/g, `${move.effect_chance ?? 0}`).split(" ")

    // Letter animation config by class — Use concrete values to satisfy TS strict mode
    const variants = {
        physical: {
            initial: { x: 60, opacity: 0 } as const,
            animate: { x: 0, opacity: 1 } as const,
            transition: { type: "spring" as const, stiffness: 600, damping: 25 },
        },
        special: {
            initial: { scale: 0.3, opacity: 0 } as const,
            animate: { scale: 1, opacity: 1 } as const,
            transition: { type: "spring" as const, stiffness: 400, damping: 22 },
        },
        status: {
            initial: { y: 20, opacity: 0 } as const,
            animate: { y: 0, opacity: 1 } as const,
            transition: { duration: 0.4, ease: "easeOut" as const },
        },
    }
    const v = variants[damageClass] ?? variants.status

    const letters = nameES.toUpperCase().split("")
    const nameDelay = letters.length * 0.04 + 0.1

    // PP dots
    const ppDots = move.pp <= 8 ? Array.from({ length: move.pp }) : null

    return (
        <section
            className="relative overflow-hidden pt-14 pb-20 border-b-[3px] border-[#111111]"
            style={{ backgroundColor: typeColor }}
        >
            {/* Background pattern (class-specific) */}
            <div className="absolute inset-0 pointer-events-none" style={pattern} />

            {/* Background class icon (large) */}
            <div className="absolute -left-5 -bottom-8 pointer-events-none opacity-[0.05]">
                {damageClass === "physical" ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }}>
                        <GiPunchBlast size={160} color="#000" />
                    </motion.div>
                ) : (
                    <Circle size={160} color="#000" />
                )}
            </div>

            {/* Move ID watermark */}
            <div
                className="absolute right-[-10px] bottom-[-20px] font-jetbrains text-black pointer-events-none select-none"
                style={{ fontSize: "120px", opacity: 0.04, lineHeight: 1 }}
            >
                #{String(move.id).padStart(4, "0")}
            </div>

            {/* ── MAIN CONTENT ───────────────────────────────── */}
            <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6">
                {/* Breadcrumb */}
                <div className="font-nunito text-[12px] text-white/60 mb-8">
                    <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
                    <span className="mx-2">/</span>
                    <Link href="/moves" className="hover:text-white transition-colors">Movimientos</Link>
                    <span className="mx-2">/</span>
                    <span className="text-white font-bold">{nameES}</span>
                </div>

                {/* Badges row */}
                <div className="flex flex-wrap items-center gap-3 mb-5">
                    {[
                        {
                            delay: 0, rotate: -5, content: (
                                <Link href={`/types/${move.type?.name}`} className="inline-flex items-center gap-1.5 px-4 py-2 border-2 border-[#111111] font-nunito text-[13px] font-bold text-white uppercase" style={{ backgroundColor: `${typeColor}CC`, boxShadow: "3px 3px 0 #111111" }}>
                                    {TypeIcon && <TypeIcon size={14} />}
                                    {move.type?.name}
                                </Link>
                            )
                        },
                        {
                            delay: 0.08, rotate: 5, content: (
                                <div style={{ boxShadow: "3px 3px 0 #111111" }}>
                                    <MoveClassBadge damageClass={damageClass} size="lg" className="border-2 border-[#111111]" />
                                </div>
                            )
                        },
                        {
                            delay: 0.16, rotate: 0, content: (
                                <motion.div initial={{ y: -15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.16, type: "spring", stiffness: 350, damping: 25 }}>
                                    <span className="bg-[#111111] text-white font-press-start text-[8px] px-3 py-2">Gen {genRoman}</span>
                                </motion.div>
                            )
                        },
                    ].map(({ delay, rotate, content }) => (
                        <motion.div
                            key={delay}
                            initial={{ scale: 0, rotate: rotate * 2 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay, type: "spring", stiffness: 300, damping: 22 }}
                        >
                            {content}
                        </motion.div>
                    ))}
                </div>

                {/* Move name — letter-by-letter */}
                <h1 className="font-press-start text-[24px] sm:text-[32px] text-white mb-2 flex flex-wrap tracking-wider">
                    {letters.map((char, i) => (
                        <motion.span
                            key={i}
                            initial={v.initial}
                            animate={v.animate}
                            transition={{ ...v.transition, delay: i * 0.04 }}
                        >
                            {char === " " ? "\u00A0" : char}
                        </motion.span>
                    ))}
                </h1>

                {/* Short effect — word by word */}
                {effectES && (
                    <p className="font-nunito text-[14px] text-white/85 max-w-[600px] leading-relaxed mt-4 flex flex-wrap gap-1">
                        {words.map((word, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, y: 4 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: nameDelay + i * 0.03, duration: 0.3, ease: "easeOut" }}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </p>
                )}
            </div>

            {/* PP dots — bottom right */}
            <div className="absolute bottom-5 right-5 z-10">
                <div
                    className="flex flex-col items-center gap-1 px-3 py-2 border border-white/20"
                    style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
                >
                    {ppDots ? (
                        <div className="grid grid-cols-4 gap-1">
                            {ppDots.map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="w-2 h-2 rounded-full bg-white/80"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: nameDelay + i * 0.06, type: "spring", bounce: 0.5 }}
                                />
                            ))}
                        </div>
                    ) : (
                        <span className="font-press-start text-[14px] text-white">{move.pp}</span>
                    )}
                    <span className="font-press-start text-[6px] text-white/50">PP</span>
                </div>
            </div>

            {/* Priority badge — bottom left */}
            {move.priority !== 0 && (
                <motion.div
                    className="absolute bottom-5 left-5 z-10"
                    animate={move.priority > 0 ? { y: [0, -4, 0] } : {}}
                    transition={{ duration: 1, repeat: 2 }}
                >
                    <span
                        className="font-press-start text-[7px] px-3 py-2 text-white"
                        style={{ backgroundColor: move.priority > 0 ? "#22C55E" : "#555555" }}
                    >
                        PRIORIDAD {move.priority > 0 ? `+${move.priority}` : move.priority}
                    </span>
                </motion.div>
            )}

            {/* Bottom decorative line */}
            <motion.div
                className="absolute bottom-0 left-0 w-full h-[2px] origin-center"
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)" }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            />
        </section>
    )
}
