"use client"

import { motion, useReducedMotion } from "framer-motion"
import { useState } from "react"
import { useTypesData } from "@/lib/hooks/useTypesData"
import { TypeCard } from "@/components/types/type-card"
import { TYPE_ORDER } from "@/lib/constants/types.constants"
import { PageTransitionTypes } from "@/components/shared/page-transition-types"
import { TrendingUp, TrendingDown, Ban } from "lucide-react"

export default function TypesPage() {
    const typesQueries = useTypesData(TYPE_ORDER)
    const isLoading = typesQueries.some(q => q.isLoading)
    const [hoveredType, setHoveredType] = useState<string | null>(null)
    const prefersRM = useReducedMotion()

    if (isLoading) return <TypesPageSkeleton />

    const types = typesQueries.map(q => q.data).filter(Boolean)

    return (
        <>
            <PageTransitionTypes />

            <motion.main
                className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
            >
                <TypesPageHeader />

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-8">
                    {types.map((type, i) => (
                        type && (
                            <TypeCard
                                key={type.name}
                                type={type}
                                index={i}
                                isHovered={hoveredType === type.name}
                                isDimmed={hoveredType !== null && hoveredType !== type.name}
                                onHoverStart={() => setHoveredType(type.name)}
                                onHoverEnd={() => setHoveredType(null)}
                            />
                        )
                    ))}
                </div>

                <EducationalSection />
            </motion.main>
        </>
    )
}

function TypesPageHeader() {
    return (
        <div className="pb-8 relative">
            <div className="font-nunito text-[12px] text-[#888888] mb-4">Inicio / Tipos</div>

            <div className="flex justify-between items-end mb-4">
                <div className="flex items-end gap-3">
                    {/* Decoración vertical animada */}
                    <motion.div
                        className="w-1 h-9"
                        animate={{
                            background: [
                                "linear-gradient(180deg, #F08030, #6890F0)",
                                "linear-gradient(180deg, #78C850, #F8D030)",
                                "linear-gradient(180deg, #7038F8, #F85888)",
                                "linear-gradient(180deg, #F08030, #6890F0)"
                            ]
                        }}
                        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    />

                    <h1 className="font-press-start text-[20px] text-[#111111] leading-none">TIPOS</h1>

                    <motion.div
                        className="relative flex items-center justify-center w-8 h-8 bg-[#111111] border-2 border-[#CC0000]"
                        style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
                        initial={{ scale: 0, rotate: -30 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.7, type: "spring", stiffness: 300, damping: 20 }}
                    >
                        <span className="font-press-start text-[10px] text-white">18</span>
                    </motion.div>
                </div>

                <div className="font-nunito text-[13px] text-[#888888] italic max-w-[200px] text-right">
                    El sistema estratégico que define cada batalla
                </div>
            </div>

            {/* Separador doble (negro + rojo) */}
            <div className="relative h-[5px]">
                <motion.div
                    className="absolute top-0 left-0 w-full h-[3px] bg-[#111111] origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
                />
                <motion.div
                    className="absolute bottom-0 right-0 w-full h-[2px] bg-[#CC0000] origin-right"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
                />
            </div>
        </div>
    )
}

function EducationalSection() {
    return (
        <div className="mt-20 hidden lg:block">
            <div className="mb-6 relative">
                <h2 className="font-press-start text-[11px] text-[#111111] mb-2">EL SISTEMA DE TIPOS</h2>
                <div className="relative h-[5px]">
                    <motion.div className="absolute top-0 left-0 w-full h-[3px] bg-[#111111] origin-left" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} />
                    <motion.div className="absolute bottom-0 right-0 w-full h-[2px] bg-[#CC0000] origin-right" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.1 }} />
                </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
                <EduCard
                    title="SÚPER EFECTIVO ×2"
                    desc="El move hace el doble de daño. El Pokémon defensor recibe 200% del daño normal."
                    icon={TrendingUp} color="#22C55E" bg="#F0FDF4" delay={0}
                />
                <EduCard
                    title="NO MUY EFECTIVO ×0.5"
                    desc="El move hace la mitad de daño. El Pokémon defensor recibe 50% del daño normal."
                    icon={TrendingDown} color="#F97316" bg="#FFF7ED" delay={1}
                />
                <EduCard
                    title="NO AFECTA ×0"
                    desc="El move no tiene ningún efecto. El Pokémon defensor es completamente inmune."
                    icon={Ban} color="#111111" bg="#F8F8F8" delay={2}
                />
            </div>
        </div>
    )
}

function EduCard({ title, desc, icon: Icon, color, bg, delay }: any) {
    return (
        <motion.div
            className="p-5 border-l-4"
            style={{ backgroundColor: bg, borderColor: color }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: delay * 0.1, type: "spring", stiffness: 200, damping: 20 }}
        >
            <div className="flex items-center gap-3 mb-3">
                <motion.div
                    initial={{ y: 5, scale: 0.8 }}
                    whileInView={{ y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: delay * 0.1 + 0.2, type: "spring" }}
                >
                    <Icon size={18} color={color} />
                </motion.div>
                <h3 className="font-press-start text-[9px]" style={{ color }}>{title}</h3>
            </div>
            <p className="font-nunito text-[13px] text-[#444444] leading-relaxed">{desc}</p>
        </motion.div>
    )
}

function TypesPageSkeleton() {
    return (
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10">
            <div className="w-48 h-10 bg-[#F2F2F2] animate-pulse mb-8" />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-8">
                {Array.from({ length: 18 }).map((_, i) => (
                    <div key={i} className="aspect-[3/4] border-2 border-[#F2F2F2] bg-[#F8F8F8] animate-pulse relative overflow-hidden">
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-5 gap-3">
                            <div className="w-10 h-10 rounded-full bg-black/5" />
                            <div className="w-20 h-3 bg-black/5 rounded" />
                            <div className="w-full h-px bg-black/5" />
                            <div className="flex gap-4">
                                <div className="w-10 h-3 bg-black/5 rounded" />
                                <div className="w-10 h-3 bg-black/5 rounded" />
                            </div>
                        </div>
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                    </div>
                ))}
            </div>
        </div>
    )
}
