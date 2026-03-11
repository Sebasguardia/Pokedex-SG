"use client"

import { motion } from "framer-motion"
import { TYPE_COLORS, TYPE_ICON } from "@/lib/constants/types.constants"
import { PokemonType } from "@/types/api/type.types"
import { Users, Swords, ArrowUpRight } from "lucide-react"
import { useRouter } from "next/navigation"

interface Props {
    type: PokemonType
    index: number
    isHovered: boolean
    isDimmed: boolean
    onHoverStart: () => void
    onHoverEnd: () => void
}

export function TypeCard({ type, index, isHovered, isDimmed, onHoverStart, onHoverEnd }: Props) {
    const router = useRouter()
    const typeColor = TYPE_COLORS[type.name] || "#888888"
    const Icon = TYPE_ICON[type.name as keyof typeof TYPE_ICON]
    const ordinal = String(index + 1).padStart(2, "0")

    // Strong against types
    const strongAgainst = type.damage_relations?.double_damage_to || []
    const displayDots = strongAgainst.slice(0, 3)
    const extraDots = strongAgainst.length > 3 ? strongAgainst.length - 3 : 0

    return (
        <motion.div
            className="relative aspect-[3/4] overflow-hidden cursor-pointer border-2 border-[#111111] bg-white"
            style={{ backgroundColor: typeColor }}
            initial={{ opacity: 0, scale: 0.6, rotate: index % 2 === 0 ? -8 : 8, y: -30 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ delay: index * 0.04, type: "spring", stiffness: 280, damping: 22 }}
            animate={isDimmed ? "dimmed" : "default"}
            variants={{
                default: { filter: "grayscale(0%)", opacity: 1, boxShadow: "4px 4px 0px #111111", x: 0, y: 0 },
                dimmed: { filter: "grayscale(70%)", opacity: 0.45, boxShadow: "4px 4px 0px #111111", x: 0, y: 0 }
            }}
            whileHover={{
                boxShadow: "0px 0px 0px #111111",
                x: 4,
                y: 4,
                zIndex: 10
            }}
            whileTap={{ scale: 0.96 }}
            onHoverStart={onHoverStart}
            onHoverEnd={onHoverEnd}
            onClick={() => {
                // Flash logic would be handled by page transition
                router.push(`/types/${type.name}`)
            }}
        >
            {/* CAPA 1: Pattern Background (Simplified) */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.08]"
                style={{ backgroundImage: 'radial-gradient(circle, #fff 2px, transparent 2px)', backgroundSize: '20px 20px' }}
            />

            {/* CAPA 2: Ícono Grande de Fondo */}
            {Icon && (
                <motion.div
                    className="absolute -bottom-5 -right-5 text-white pointer-events-none"
                    initial={{ opacity: 0.06 }}
                    animate={{
                        rotate: type.name === "fire" ? [0, 5, -3, 0] : type.name === "water" ? [-3, 3, -3] : 0,
                        scale: type.name === "electric" ? [1, 1.03, 1] : 1,
                        y: type.name === "ghost" ? [0, -5, 0] : 0
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    whileHover={{ opacity: 0.12 }}
                >
                    <Icon size={120} />
                </motion.div>
            )}

            {/* CAPA 3: Contenido Principal */}
            <div className="absolute inset-0 p-5 flex flex-col items-center justify-center gap-3">
                {Icon && (
                    <motion.div
                        className="text-white/90"
                        variants={{
                            default: { rotate: 0, scale: 1 },
                        }}
                        whileHover={{ rotate: [0, -15, 15, -8, 8, 0], scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.5 }}
                    >
                        <Icon size={40} />
                    </motion.div>
                )}

                <h3 className="font-press-start text-[10px] text-white tracking-wider" style={{ textShadow: "1px 1px 0 rgba(0,0,0,0.3)" }}>
                    {type.names?.find(n => n.language.name === "es")?.name.toUpperCase() || type.name.toUpperCase()}
                </h3>

                {/* Separator */}
                <motion.div
                    className="h-px bg-white/40"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.04 + 0.2, duration: 0.3 }}
                    variants={{
                        default: { width: 24, scaleX: 1 },
                    }}
                    whileHover={{ scaleX: 1.5 }}
                />

                <div className="flex gap-4 justify-center mt-2">
                    <div className="flex items-center gap-1.5 text-white/85">
                        <Users size={12} />
                        <span className="font-nunito text-[10px] font-bold">{type.pokemon?.length || 0}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-white/85">
                        <Swords size={12} />
                        <span className="font-nunito text-[10px] font-bold">{type.moves?.length || 0}</span>
                    </div>
                </div>

                {/* Mini Effectiveness */}
                {strongAgainst.length > 0 && (
                    <div className="flex items-center gap-1.5 mt-2">
                        {displayDots.map((t, i) => (
                            <motion.div
                                key={t.name}
                                className="w-2 h-2 rounded-full border border-black/30"
                                style={{ backgroundColor: TYPE_COLORS[t.name] || "#fff" }}
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.04 + i * 0.04, type: "spring" }}
                                variants={{
                                    default: { scale: 1 },
                                }}
                                whileHover={{ scale: 1.1 }}
                            />
                        ))}
                        {extraDots > 0 && (
                            <span className="text-[9px] font-jetbrains text-white/60 ml-1">+{extraDots}</span>
                        )}
                    </div>
                )}
            </div>

            {/* CAPA 4: Número Ordinal */}
            <div className="absolute top-2.5 left-3 font-jetbrains text-[11px] text-white/30">
                {ordinal}
            </div>

            {/* CAPA 5: Flecha */}
            <motion.div
                className="absolute bottom-3 right-3 text-white/40"
                variants={{
                    default: { x: 0, y: 0, opacity: 0.4 },
                }}
                whileHover={{ x: 3, y: -3, opacity: 0.9 }}
            >
                <ArrowUpRight size={14} />
            </motion.div>
        </motion.div>
    )
}
