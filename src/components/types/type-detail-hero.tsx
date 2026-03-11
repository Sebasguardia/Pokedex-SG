"use client"

import { motion, MotionValue } from "framer-motion"
import { PokemonType } from "@/types/api/type.types"
import { TYPE_ICON } from "@/lib/constants/types.constants"
import { Calendar, Sword, Sparkles, Circle, Users } from "lucide-react"
import Link from "next/link"

interface Props {
    type: PokemonType
    typeColor: string
    pokeballParallaxY: MotionValue<number>
    iconBgY: MotionValue<number>
}

export function TypeDetailHero({ type, typeColor, pokeballParallaxY, iconBgY }: Props) {
    const Icon = TYPE_ICON[type.name as keyof typeof TYPE_ICON]
    const typeNameES = type.names?.find(n => n.language.name === "es")?.name || type.name
    const letters = typeNameES.toUpperCase().split("")

    const damageClass = type.move_damage_class?.name
    const DamageIcon = damageClass === "physical" ? Sword : damageClass === "special" ? Sparkles : Circle
    const genNumber = type.generation?.name.split("-")[1]?.toUpperCase() || "I"

    return (
        <section
            className="relative overflow-hidden pt-16 pb-20 border-b-[5px] border-[#111111]"
            style={{ backgroundColor: typeColor }}
        >
            {/* CAPA DE FONDO */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.06]"
                style={{ backgroundImage: 'radial-gradient(circle, #000 2px, transparent 2px)', backgroundSize: '24px 24px' }}
            />

            {/* Pokeball Parallax */}
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

            {/* Ícono gigante respirando */}
            {Icon && (
                <motion.div
                    className="absolute -bottom-[30px] -left-[30px] text-black/5 pointer-events-none"
                    style={{ y: iconBgY }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                    <Icon size={200} />
                </motion.div>
            )}

            {/* CONTENIDO PRINCIPAL */}
            <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6">
                <div className="font-nunito text-[12px] text-white/65 mb-8">
                    <Link href="/" className="hover:text-white hover:underline transition-colors">Inicio</Link>
                    <span className="mx-2">/</span>
                    <Link href="/types" className="hover:text-white hover:underline transition-colors">Tipos</Link>
                    <span className="mx-2">/</span>
                    <span className="text-white font-bold">{typeNameES}</span>
                </div>

                <div className="flex flex-col items-center justify-center text-center">
                    {Icon && (
                        <div className="relative mb-6">
                            <motion.div
                                className="absolute inset-0 rounded-full border-2 border-white/40"
                                initial={{ scale: 0, opacity: 0.4 }}
                                animate={{ scale: 2, opacity: 0 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                            />
                            <motion.div
                                className="text-white"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                onAnimationComplete={() => {
                                    // Pequeño wobble al terminar de asentarse
                                }}
                            >
                                <motion.div
                                    animate={{ rotate: [-5, 5, -3, 3, 0] }}
                                    transition={{ delay: 0.5, duration: 0.5 }}
                                >
                                    <Icon size={72} />
                                </motion.div>
                            </motion.div>
                        </div>
                    )}

                    <h1 className="font-press-start text-3xl sm:text-5xl text-white mb-8 flex justify-center flex-wrap tracking-widest">
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

                    <div className="flex flex-wrap justify-center gap-2">
                        <motion.div className="flex items-center gap-2 bg-black/25 text-white border border-white/25 px-3 py-1.5 rounded-full font-nunito text-[11px]" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.0, type: "spring", bounce: 0.5 }}>
                            <Calendar size={12} /> Gen {genNumber}
                        </motion.div>
                        {damageClass && (
                            <motion.div className="flex items-center gap-2 bg-black/25 text-white border border-white/25 px-3 py-1.5 rounded-full font-nunito text-[11px] uppercase" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.08, type: "spring", bounce: 0.5 }}>
                                <DamageIcon size={12} /> {damageClass}
                            </motion.div>
                        )}
                        <motion.div className="flex items-center gap-2 bg-black/25 text-white border border-white/25 px-3 py-1.5 rounded-full font-nunito text-[11px]" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.16, type: "spring", bounce: 0.5 }}>
                            <Users size={12} /> {type.pokemon?.length || 0} Pokémon
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* LINEA DECORATIVA INFERIOR */}
            <motion.div
                className="absolute bottom-0 left-0 w-full h-[2px] origin-center"
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)" }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            />

            {/* STAT BADGES (Desktop) */}
            <div className="hidden lg:flex absolute bottom-5 right-5 flex-col items-end gap-1 font-nunito text-[10px] text-white/50">
                <div>Pokémon con este tipo: {type.pokemon?.length || 0}</div>
                <div>Moves de este tipo: {type.moves?.length || 0}</div>
                <div>Introducido en: Gen {genNumber}</div>
            </div>
        </section>
    )
}
