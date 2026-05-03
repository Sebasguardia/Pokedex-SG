"use client"

import { motion, MotionValue } from "framer-motion"
import { PokemonType } from "@/types/api/type.types"
import { Calendar, Sword, Sparkles, Circle, Users, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { TypeSvgIcon } from "@/components/shared/icons/type-svg-icon"

interface Props {
    type: PokemonType
    typeColor: string
    pokeballParallaxY: MotionValue<number>
    iconBgY: MotionValue<number>
}

export function TypeDetailHero({ type, typeColor, pokeballParallaxY, iconBgY }: Props) {
    const typeNameES = type.names?.find(n => n.language.name === "es")?.name || type.name
    const letters = typeNameES.toUpperCase().split("")

    const damageClass = type.move_damage_class?.name
    const DamageIcon = damageClass === "physical" ? Sword : damageClass === "special" ? Sparkles : Circle
    const genNumber = type.generation?.name.split("-")[1]?.toUpperCase() || "I"

    return (
        <section
            className="relative overflow-hidden pt-16 pb-24 border-b-[5px] border-[#111111]"
            style={{ backgroundColor: typeColor }}
        >
            {/* FONDO: patrón de puntos */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.06]"
                style={{ backgroundImage: "radial-gradient(circle, #000 2px, transparent 2px)", backgroundSize: "24px 24px" }}
            />

            {/* Pokeball giratoria */}
            <motion.div
                className="absolute -top-[100px] -right-[100px] text-black/5 pointer-events-none"
                style={{ y: pokeballParallaxY }}
                animate={{ rotate: 360 }}
                transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
            >
                <svg width="500" height="500" viewBox="0 0 100 100" fill="currentColor">
                    <path d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 90C28 90 10 72 10 50S28 10 50 10s40 18 40 40-18 40-40 40z" />
                    <path d="M50 35c-8.3 0-15 6.7-15 15s6.7 15 15 15 15-6.7 15-15-6.7-15-15-15zm0 20c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z" />
                    <path d="M11 45h25v10H11zM64 45h25v10H64z" />
                </svg>
            </motion.div>

            {/* Icono SVG gigante de fondo */}
            <motion.div
                className="absolute -bottom-[30px] -left-[30px] pointer-events-none opacity-[0.08]"
                style={{ y: iconBgY }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
                <TypeSvgIcon
                    type={type.name}
                    size={220}
                    style={{ filter: "brightness(0) invert(1)" }}
                />
            </motion.div>

            {/* CONTENIDO */}
            <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6">

                {/* Botón Volver Neo-Brutalista */}
                <div className="mb-8">
                    <Link href="/types">
                        <motion.button
                            className="flex items-center gap-2 bg-white text-[#111111] border-2 border-[#111111] px-4 py-2 font-['Press_Start_2P'] text-[9px] uppercase transition-all"
                            style={{ boxShadow: "4px 4px 0 #111111" }}
                            whileHover={{ x: -2, y: -2, boxShadow: "6px 6px 0 #111111" }}
                            whileTap={{ x: 2, y: 2, boxShadow: "0px 0px 0 #111111" }}
                        >
                            <ArrowLeft size={14} />
                            VOLVER
                        </motion.button>
                    </Link>
                </div>

                <div className="flex flex-col items-center justify-center text-center">

                    {/* Icono SVG central con animaciones */}
                    <div className="relative mb-8">
                        {/* Ring de expansión */}
                        <motion.div
                            className="absolute inset-0 border-2 border-white/40"
                            initial={{ scale: 0, opacity: 0.4 }}
                            animate={{ scale: 2.5, opacity: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        >
                            <motion.div
                                animate={{ rotate: [-5, 5, -3, 3, 0] }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                                className="flex items-center justify-center"
                            >
                                <div
                                    className="w-28 h-28 flex items-center justify-center border-4 border-white/50"
                                    style={{
                                        backgroundColor: "rgba(0,0,0,0.2)",
                                        boxShadow: "6px 6px 0 rgba(0,0,0,0.3)"
                                    }}
                                >
                                    <TypeSvgIcon
                                        type={type.name}
                                        size={72}
                                        style={{ filter: "brightness(0) invert(1)" }}
                                    />
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Título con letras animadas */}
                    <h1 className="font-['Press_Start_2P'] text-3xl sm:text-5xl text-white mb-10 flex justify-center flex-wrap tracking-widest">
                        {letters.map((char, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05, type: "spring", stiffness: 350, damping: 25 }}
                            >
                                {char === " " ? "\u00A0" : char}
                            </motion.span>
                        ))}
                    </h1>

                    {/* Badges estilo Neo-Brutalista cuadrado (blanco) */}
                    <div className="flex flex-wrap justify-center gap-3">
                        <motion.div
                            className="flex items-center gap-2 bg-white text-[#111111] border-2 border-[#111111] px-3 py-1.5 font-['Nunito'] text-[11px] font-bold uppercase"
                            style={{ boxShadow: "3px 3px 0 rgba(0,0,0,0.3)" }}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.1, type: "spring", bounce: 0.5 }}
                        >
                            <Calendar size={12} />
                            GEN {genNumber}
                        </motion.div>

                        {damageClass && (
                            <motion.div
                                className="flex items-center gap-2 bg-white text-[#111111] border-2 border-[#111111] px-3 py-1.5 font-['Nunito'] text-[11px] font-bold uppercase"
                                style={{ boxShadow: "3px 3px 0 rgba(0,0,0,0.3)" }}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.18, type: "spring", bounce: 0.5 }}
                            >
                                <DamageIcon size={12} />
                                {damageClass}
                            </motion.div>
                        )}

                        <motion.div
                            className="flex items-center gap-2 bg-white text-[#111111] border-2 border-[#111111] px-3 py-1.5 font-['Nunito'] text-[11px] font-bold uppercase"
                            style={{ boxShadow: "3px 3px 0 rgba(0,0,0,0.3)" }}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.26, type: "spring", bounce: 0.5 }}
                        >
                            <Users size={12} />
                            {type.pokemon?.length || 0} POKÉMON
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Info mini en esquina (desktop) */}
            <div className="hidden lg:flex absolute bottom-5 right-5 flex-col items-end gap-1 font-['Nunito'] text-[10px] text-white/50">
                <div>Pokémon: {type.pokemon?.length || 0}</div>
                <div>Moves: {type.moves?.length || 0}</div>
                <div>Gen: {genNumber}</div>
            </div>

            {/* Línea decorativa inferior */}
            <motion.div
                className="absolute bottom-0 left-0 w-full h-[2px] origin-center"
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)" }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            />
        </section>
    )
}
