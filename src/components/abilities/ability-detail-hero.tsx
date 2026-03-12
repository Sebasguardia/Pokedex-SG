"use client"

import { motion, useReducedMotion } from "framer-motion"
import { ABILITY_CATEGORIES } from "@/lib/constants/abilities.constants"
import { AbilityCategoryBadge } from "./ability-category-badge"
import Link from "next/link"
import { GiEyeTarget } from "react-icons/gi"

interface Props {
    ability: any
    category: keyof typeof ABILITY_CATEGORIES
    isHidden: boolean
}

export function AbilityDetailHero({ ability, category, isHidden }: Props) {
    const prefersRM = useReducedMotion()
    const config = ABILITY_CATEGORIES[category] || ABILITY_CATEGORIES.passive
    const name = ability.name.toUpperCase()
    const letters = name.split("")

    const particles = Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        bottom: `${Math.random() * 100}%`,
        duration: 4 + Math.random() * 4,
        delay: Math.random() * 4
    }))

    const esEffect = ability.effect_entries?.find((e: any) => e.language.name === "es")?.short_effect
    const enEffect = ability.effect_entries?.find((e: any) => e.language.name === "en")?.short_effect
    const esFlavor = ability.flavor_text_entries?.find((e: any) => e.language.name === "es")?.flavor_text
    const enFlavor = ability.flavor_text_entries?.find((e: any) => e.language.name === "en")?.flavor_text

    const fullEffect = esEffect || enEffect || esFlavor || enFlavor || "No hay descripción disponible."

    return (
        <section className="relative bg-[#111111] pt-16 pb-20 overflow-hidden border-b-2 border-[#111111]">
            {/* INVERTED DOUBLE SEPARATOR AT BOTTOM */}
            <div className="absolute bottom-[-2.5px] left-0 w-full h-[5px] z-20">
                <div className="absolute top-0 left-0 w-full h-[3px] bg-[#CC0000]" />
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#111111]" />
            </div>

            {/* BACKGROUND LAYERS */}
            {/* Layer 1: Particles */}
            {!prefersRM && particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute w-1 h-1 bg-white rounded-full pointer-events-none"
                    style={{ left: p.left, bottom: p.bottom }}
                    animate={{
                        y: [-20, -100],
                        opacity: [0, 0.08, 0]
                    }}
                    transition={{
                        duration: p.duration,
                        delay: p.delay,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            ))}

            {/* Layer 2: Circuit Pattern (Placeholder color/opac) */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

            {/* Layer 3: Giant Icon */}
            <div className="absolute -bottom-10 -right-10 text-white opacity-[0.03] pointer-events-none">
                {isHidden ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 90, repeat: Infinity, ease: "linear" }}>
                        <GiEyeTarget size={250} />
                    </motion.div>
                ) : (
                    <config.icon size={250} />
                )}
            </div>

            {/* Layer 4: Scanline */}
            <motion.div
                className="absolute h-[1px] w-full z-10 pointer-events-none"
                style={{ background: "linear-gradient(90deg, transparent, rgba(204,0,0,0.5), transparent)" }}
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 5 }}
            />

            {/* CONTENT */}
            <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6">
                <div className="font-nunito text-[12px] text-white/45 mb-8">
                    <Link href="/abilities" className="hover:text-white hover:underline transition-colors decoration-[#CC0000]">Habilidades</Link>
                    <span className="mx-2">/</span>
                    <span className="text-white font-bold">{ability.name}</span>
                </div>

                <div className="flex flex-col gap-4 mb-6">
                    <div className="flex flex-wrap gap-2.5">
                        <AbilityCategoryBadge category={category} variant="dark" size="md" />
                        <div className="px-3 py-1 bg-white/5 border border-white/10 text-white/80 font-press-start text-[7px] flex items-center">
                            GEN {ability.generation?.name.split("-")[1]?.toUpperCase() || "???"}
                        </div>
                        {isHidden && (
                            <motion.div
                                className="bg-[#CC0000] text-white font-press-start text-[7px] px-3 py-1 border border-white/30"
                                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.3 }}
                                style={{ boxShadow: "0 0 12px rgba(204,0,0,0.6)" }}
                            >
                                HABILIDAD OCULTA
                            </motion.div>
                        )}
                    </div>

                    <h1 className="font-press-start text-3xl sm:text-5xl text-white tracking-widest flex flex-wrap gap-x-[0.2em]">
                        {letters.map((char: string, i: number) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, filter: "blur(6px)", scale: 0.8 }}
                                animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                                transition={{
                                    delay: i * (isHidden ? 0.08 : 0.05),
                                    duration: 0.3,
                                    ease: "easeOut"
                                }}
                            >
                                {char}
                            </motion.span>
                        ))}
                    </h1>
                </div>

                <div className="max-w-[600px]">
                    <p className="font-nunito text-[16px] text-white/75 leading-relaxed">
                        {fullEffect}
                    </p>
                </div>
            </div>
        </section>
    )
}
