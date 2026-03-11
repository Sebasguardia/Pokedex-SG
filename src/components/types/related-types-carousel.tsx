"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { PokemonType } from "@/types/api/type.types"
import { TYPE_COLORS, TYPE_ICON } from "@/lib/constants/types.constants"
import Link from "next/link"

interface Props {
    currentType: PokemonType
    typeColor: string
}

export function RelatedTypesCarousel({ currentType, typeColor }: Props) {
    const prefersRM = useReducedMotion()
    const carouselRef = useRef<HTMLDivElement>(null)
    const [width, setWidth] = useState(0)

    useEffect(() => {
        if (carouselRef.current) {
            setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth)
        }
    }, [currentType])

    // Extract relations
    const defense = currentType.damage_relations
    const vulnerabilities = defense.double_damage_from.map(t => ({ name: t.name, relation: "DÉBIL A", color: "#DC2626", symbol: "<" }))
    const resistances = defense.half_damage_from.map(t => ({ name: t.name, relation: "RESISTE", color: "#22C55E", symbol: ">" }))
    const immunities = defense.no_damage_from.map(t => ({ name: t.name, relation: "INMUNE A", color: "#111111", symbol: "⊘" }))
    const strongAgainst = defense.double_damage_to.map(t => ({ name: t.name, relation: "VENCE A", color: "#22C55E", symbol: ">" }))

    // Combine and deduplicate
    const allRelated = [...vulnerabilities, ...strongAgainst, ...resistances, ...immunities].filter((v, i, a) => a.findIndex(t => t.name === v.name) === i)

    if (allRelated.length === 0) return null

    return (
        <section className="py-8 relative">
            <div className="mb-8">
                <h2 className="font-press-start text-[13px] text-[#111111] mb-2">TIPOS RELACIONADOS</h2>
                <div className="relative h-[5px] mb-3">
                    <motion.div
                        className="absolute top-0 left-0 w-full h-[3px] bg-[#111111] origin-left"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    />
                    <motion.div
                        className="absolute bottom-0 right-0 w-full h-[2px] bg-[#CC0000] origin-right"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                    />
                </div>
                <p className="font-nunito text-[12px] text-[#888888]">
                    Tipos con interacción directa con el Tipo {currentType.names?.find(n => n.language.name === "es")?.name || currentType.name}
                </p>
            </div>

            <div className="relative w-full overflow-hidden" ref={carouselRef}>
                <div className="absolute top-0 left-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute top-0 right-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                <motion.div
                    className="flex gap-4 py-4 px-6 cursor-grab active:cursor-grabbing"
                    drag={prefersRM ? false : "x"}
                    dragConstraints={{ right: 0, left: -width }}
                    style={{ overflowX: prefersRM ? "auto" : "visible" }}
                >
                    {allRelated.map((related, i) => {
                        const Icon = TYPE_ICON[related.name as keyof typeof TYPE_ICON]
                        const bgColor = TYPE_COLORS[related.name] || "#111111"

                        return (
                            <Link href={`/types/${related.name}`} key={related.name}>
                                <motion.div
                                    className="relative min-w-[80px] h-[100px] flex flex-col items-center justify-center p-2 border-2 border-[#111111] bg-white group"
                                    style={{ backgroundColor: bgColor }}
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-20px" }}
                                    transition={{ delay: i * 0.05, type: "spring", bounce: 0.5 }}
                                    whileHover={{ scale: 1.05, boxShadow: "2px 2px 0px #111111" }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 font-jetbrains text-[8px] text-white px-2 py-0.5 whitespace-nowrap border border-white/20 z-20" style={{ backgroundColor: related.color }}>
                                        <span>{related.symbol}</span> {related.relation}
                                    </div>

                                    {Icon && (
                                        <motion.div
                                            className="text-white/90 mb-2"
                                            variants={{ hover: { rotate: [0, -10, 10, -5, 5, 0], scale: 1.1 } }}
                                        >
                                            <Icon size={32} />
                                        </motion.div>
                                    )}

                                    <span className="font-nunito text-[10px] font-bold text-white uppercase text-center">
                                        {related.name}
                                    </span>
                                </motion.div>
                            </Link>
                        )
                    })}
                </motion.div>
            </div>
        </section>
    )
}
