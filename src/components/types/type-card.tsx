"use client"

import { motion } from "framer-motion"
import { TYPE_COLORS } from "@/lib/constants/types.constants"
import { PokemonType } from "@/types/api/type.types"
import { Users, Swords, ArrowUpRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { TypeSvgIcon } from "@/components/shared/type-svg-icon"

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
    const ordinal = String(index + 1).padStart(2, "0")
    const typeNameES = type.names?.find(n => n.language.name === "es")?.name?.toUpperCase() || type.name.toUpperCase()

    const strongAgainst = type.damage_relations?.double_damage_to || []
    const weakAgainst = type.damage_relations?.double_damage_from || []
    const displayStrong = strongAgainst.slice(0, 3)
    const extraStrong = strongAgainst.length > 3 ? strongAgainst.length - 3 : 0

    return (
        <motion.div
            className="relative overflow-hidden cursor-pointer border-2 border-[#111111] bg-white"
            style={{
                backgroundColor: typeColor,
                aspectRatio: "3/4"
            }}
            initial={{ opacity: 0, scale: 0.7, y: -20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ delay: index * 0.04, type: "spring", stiffness: 280, damping: 22 }}
            animate={isDimmed
                ? { filter: "grayscale(80%)", opacity: 0.4, boxShadow: "4px 4px 0px #111111" }
                : { filter: "grayscale(0%)", opacity: 1, boxShadow: "4px 4px 0px #111111" }
            }
            whileHover={{
                x: -3,
                y: -3,
                boxShadow: "7px 7px 0px #111111",
                zIndex: 10,
                borderColor: "#111111"
            }}
            whileTap={{ scale: 0.97 }}
            onHoverStart={onHoverStart}
            onHoverEnd={onHoverEnd}
            onClick={() => router.push(`/types/${type.name}`)}
        >
            {/* FONDO: patrón de puntos */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.07]"
                style={{ backgroundImage: "radial-gradient(circle, #fff 2px, transparent 2px)", backgroundSize: "20px 20px" }}
            />

            {/* FONDO: icono SVG grande semi-transparente */}
            <div className="absolute -bottom-4 -right-4 pointer-events-none opacity-[0.12]">
                <TypeSvgIcon type={type.name} size={110} style={{ filter: "brightness(0) invert(1)" }} />
            </div>

            {/* NÚMERO ordinal */}
            <div className="absolute top-2.5 left-3 font-['JetBrains_Mono'] text-[10px] font-bold text-white/40">
                {ordinal}
            </div>

            {/* FLECHA top-right */}
            <motion.div
                className="absolute top-2.5 right-3 text-white/30"
                whileHover={{ x: 2, y: -2, opacity: 0.9 }}
            >
                <ArrowUpRight size={14} />
            </motion.div>

            {/* CONTENIDO */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4">

                {/* Icono SVG central */}
                <motion.div
                    className="flex items-center justify-center"
                    whileHover={{ rotate: [0, -12, 12, -6, 6, 0], scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5 }}
                >
                    <TypeSvgIcon
                        type={type.name}
                        size={44}
                        style={{ filter: "brightness(0) invert(1)" }}
                        className="drop-shadow-sm"
                    />
                </motion.div>

                {/* Nombre */}
                <h3
                    className="font-['Press_Start_2P'] text-[9px] text-white tracking-wider text-center leading-tight"
                    style={{ textShadow: "1px 1px 0 rgba(0,0,0,0.4)" }}
                >
                    {typeNameES}
                </h3>

                {/* Separador */}
                <motion.div
                    className="h-px bg-white/40 w-8"
                    whileInView={{ scaleX: 1 }}
                    initial={{ scaleX: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.04 + 0.2 }}
                />

                {/* Stats: Pokémon & Moves */}
                <div className="flex gap-4 justify-center">
                    <div className="flex items-center gap-1 text-white/80">
                        <Users size={11} />
                        <span className="font-['Nunito'] text-[10px] font-bold">{type.pokemon?.length || 0}</span>
                    </div>
                    <div className="flex items-center gap-1 text-white/80">
                        <Swords size={11} />
                        <span className="font-['Nunito'] text-[10px] font-bold">{type.moves?.length || 0}</span>
                    </div>
                </div>

                {/* Fuertes contra: mini iconos SVG */}
                {displayStrong.length > 0 && (
                    <div className="flex items-center gap-1 justify-center flex-wrap mt-1">
                        {displayStrong.map((t) => (
                            <div
                                key={t.name}
                                className="w-5 h-5 border border-white/40 flex items-center justify-center"
                                style={{ backgroundColor: TYPE_COLORS[t.name] || "#888" }}
                                title={t.name}
                            >
                                <TypeSvgIcon
                                    type={t.name}
                                    size={12}
                                    style={{ filter: "brightness(0) invert(1)" }}
                                />
                            </div>
                        ))}
                        {extraStrong > 0 && (
                            <span className="font-['JetBrains_Mono'] text-[8px] text-white/60">+{extraStrong}</span>
                        )}
                    </div>
                )}
            </div>

            {/* BARRA de color inferior */}
            <div className="absolute bottom-0 left-0 w-full h-[4px] bg-black/20" />
        </motion.div>
    )
}
