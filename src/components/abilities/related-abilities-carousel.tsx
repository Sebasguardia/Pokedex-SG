"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import Link from "next/link"
import { useAbilitiesList } from "@/lib/hooks/useAbilitiesList"
import { AbilityCategoryBadge } from "./ability-category-badge"

interface Props {
    currentAbilityName: string
}

export function RelatedAbilitiesCarousel({ currentAbilityName }: Props) {
    const prefersRM = useReducedMotion()
    const carouselRef = useRef<HTMLDivElement>(null)
    const [width, setWidth] = useState(0)

    const { data } = useAbilitiesList({ limit: 15, page: 1, sort: "name" })

    const related = data?.results.filter((a: any) => a.name !== currentAbilityName) || []

    useEffect(() => {
        if (carouselRef.current && related.length > 0) {
            setTimeout(() => {
                if (carouselRef.current) {
                    setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth)
                }
            }, 100)
        }
    }, [related])

    if (related.length === 0) return null

    return (
        <section className="py-12 relative overflow-hidden">
            <div className="mb-8">
                <h2 className="font-press-start text-[14px] text-[#111111] mb-2 uppercase tracking-tighter">HABILIDADES RELACIONADAS</h2>

                <div className="relative h-[5px] mb-3">
                    <motion.div className="absolute top-0 left-0 w-full h-[3px] bg-[#111111] origin-left" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} />
                    <motion.div className="absolute bottom-0 right-0 w-full h-[2px] bg-[#CC0000] origin-right" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.1 }} />
                </div>

                <p className="font-nunito text-[13px] text-[#888888] italic">
                    Explora otras habilidades similares en la Pokédex.
                </p>
            </div>

            <div className="relative w-full" ref={carouselRef}>
                <div className="absolute top-0 left-0 bottom-0 w-12 bg-gradient-to-r from-[#F8F8F8] to-transparent z-10 pointer-events-none" />
                <div className="absolute top-0 right-0 bottom-0 w-12 bg-gradient-to-l from-[#F8F8F8] to-transparent z-10 pointer-events-none" />

                <motion.div
                    className="flex gap-4 py-4 px-6 cursor-grab active:cursor-grabbing"
                    drag={prefersRM ? false : "x"}
                    dragConstraints={{ right: 0, left: -width }}
                    style={{ overflowX: prefersRM ? "auto" : "visible" }}
                >
                    {related.map((ability: any, i: number) => (
                        <Link href={`/abilities/${ability.name}`} key={ability.name}>
                            <motion.div
                                className="relative min-w-[200px] h-[120px] flex flex-col justify-between p-4 bg-white border-2 border-[#111111] group"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-20px" }}
                                transition={{ delay: i * 0.05, type: "spring", bounce: 0.4 }}
                                whileHover={{ scale: 1.02, boxShadow: "4px 4px 0px #111111", y: -4 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div>
                                    <h3 className="font-nunito font-bold text-[14px] text-[#111111] capitalize group-hover:text-[#CC0000] transition-colors line-clamp-1">
                                        {ability.name.replace("-", " ")}
                                    </h3>
                                    <div className="h-px bg-[#E0E0E0] w-full my-2" />
                                </div>
                                <div className="flex justify-start">
                                    <AbilityCategoryBadge category="passive" size="sm" />
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
