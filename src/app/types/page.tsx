"use client"

import { motion, useReducedMotion } from "framer-motion"
import { useState } from "react"
import { useTypesData } from "@/lib/hooks/types/useTypesData"
import { TypeCard } from "@/components/types/type-card"
import { TYPE_ORDER } from "@/lib/constants/types/types.constants"
import { PageTransitionTypes } from "@/components/shared/page-transitions/types/page-transition-types"
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
        <div className="pb-10 relative">
            <div className="flex justify-between items-end mb-4">
                <div className="flex items-center gap-3">
                    {/* Icono de Título (Cuadrado de Color Acento) */}
                    <div className="w-4 h-4 bg-[#CC0000] shrink-0" />

                    <h1 className="font-['Press_Start_2P'] text-[18px] sm:text-[22px] text-[#111111] leading-none uppercase tracking-tight">
                        TIPOS
                    </h1>

                    {/* Badge de Contador Técnico (Cuadrado) */}
                    <div className="flex items-center justify-center min-w-[32px] h-8 bg-[#111111] border-2 border-[#111111] px-2">
                        <span className="font-['Press_Start_2P'] text-[11px] text-white">18</span>
                    </div>
                </div>

                <div className="hidden sm:block font-['Nunito'] text-[13px] text-[#666666] italic max-w-[250px] text-right">
                    El sistema estratégico que define cada batalla.
                </div>
            </div>

            {/* Separador Brutalista (Línea Negra Sólida y Gruesa) */}
            <div className="h-[3px] bg-[#111111] w-full" />
        </div>
    )
}

function EducationalSection() {
    return (
        <div className="mt-24 mb-16 px-2 lg:px-0">
            <div className="mb-10 relative">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 bg-[#CC0000]" />
                    <h2 className="font-['Press_Start_2P'] text-[12px] sm:text-[14px] text-[#111111] uppercase">
                        EL SISTEMA DE TIPOS
                    </h2>
                </div>
                
                <div className="h-[2px] bg-[#111111] w-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <EduCard
                    title="SÚPER EFECTIVO ×2"
                    desc="El movimiento inflige el doble de daño. El Pokémon defensor recibe 200% del daño normal."
                    icon={TrendingUp} color="#22C55E" bg="#F0FDF4" delay={0}
                />
                <EduCard
                    title="NO MUY EFECTIVO ×0.5"
                    desc="El daño se reduce a la mitad. El Pokémon defensor recibe 50% del daño normal."
                    icon={TrendingDown} color="#F97316" bg="#FFF7ED" delay={1}
                />
                <EduCard
                    title="NO AFECTA ×0"
                    desc="El ataque no tiene ningún efecto. El Pokémon defensor es completamente inmune."
                    icon={Ban} color="#111111" bg="#F8F8F8" delay={2}
                />
            </div>
        </div>
    )
}

function EduCard({ title, desc, icon: Icon, color, bg, delay }: any) {
    return (
        <motion.div
            className="group relative bg-white border-2 border-[#111111] p-6 flex flex-col h-full"
            style={{ 
                boxShadow: "4px 4px 0 #111111",
                borderLeftWidth: "6px",
                borderLeftColor: color
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: delay * 0.1, type: "spring", stiffness: 200, damping: 20 }}
            whileHover={{ x: -2, y: -2, boxShadow: "6px 6px 0 #111111" }}
        >
            <div className="flex items-center gap-3 mb-4">
                <div 
                    className="w-10 h-10 flex items-center justify-center border-2 border-[#111111] transition-transform group-hover:scale-110"
                    style={{ backgroundColor: bg }}
                >
                    <Icon size={20} color={color} strokeWidth={2.5} />
                </div>
                <h3 className="font-['Press_Start_2P'] text-[9px] leading-relaxed" style={{ color: "#111111" }}>{title}</h3>
            </div>
            
            <p className="font-['Nunito'] text-[13px] text-[#444444] leading-relaxed">
                {desc}
            </p>
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
