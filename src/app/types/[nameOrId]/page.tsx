"use client"

import { useState } from "react"
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion"
import { notFound } from "next/navigation"

import { useType } from "@/lib/hooks/types/useTypes"
import { useTypesData } from "@/lib/hooks/types/useTypesData"
import { useMovesByType } from "@/lib/hooks/moves/useMovesByType"

import { TYPE_COLORS, TYPE_ORDER } from "@/lib/constants/types/types.constants"

import { PageTransitionType } from "@/components/shared/page-transitions/types/page-transition-type"
import { TypeDetailHero } from "@/components/types/type-detail-hero"
import { EffectivenessSection } from "@/components/types/effectiveness-section"
import { TypeMatrixSection } from "@/components/types/type-matrix"
import { TypePokemonGrid } from "@/components/types/type-pokemon-grid"
import { TypeMovesTable } from "@/components/types/type-moves-table"
import { TypeHistoryAccordion } from "@/components/types/type-history-accordion"
import { RelatedTypesCarousel } from "@/components/types/related-types-carousel"
import { TypeZMovesSection } from "@/components/types/type-zmoves-section"
import { TypeDynamaxSection } from "@/components/types/type-dynamax-section"
import { TypeAbilitiesSection } from "@/components/types/type-abilities-section"
import { TypeItemsSection } from "@/components/types/type-items-section"

interface Props {
    params: { nameOrId: string }
}

export default function TypeDetailPage({ params }: Props) {
    const { nameOrId } = params
    const { data: type, isLoading, isError } = useType(nameOrId)

    // Fetch all types for the Matrix
    const typesQueries = useTypesData(TYPE_ORDER)
    const allTypes = typesQueries.map(q => q.data).filter(Boolean)

    // Substate for child components
    const [matrixOpen, setMatrixOpen] = useState(false)

    const [movesFilter, setMovesFilter] = useState("all")
    const { data: movesRaw } = useMovesByType(type?.name, movesFilter)

    // Parallax for Hero
    const { scrollY, scrollYProgress } = useScroll()
    const prefersRM = useReducedMotion()
    const pballY = useTransform(scrollY, [0, 500], [0, prefersRM ? 0 : -100])
    const iconY = useTransform(scrollY, [0, 500], [0, prefersRM ? 0 : 50])

    if (isLoading) return <TypeDetailSkeleton />
    if (isError || !type) return notFound()

    const typeColor = TYPE_COLORS[type.name] || "#111111"

    // Helper: Map all pokemon to simple array format for fallback
    const simplePokemonList = type.pokemon.map((p: any) => p.pokemon)

    return (
        <>
            <PageTransitionType typeColor={typeColor} typeName={type.name} />

            <main className="min-h-screen bg-[#FAFAFA]">

                <TypeDetailHero
                    type={type}
                    typeColor={typeColor}
                    pokeballParallaxY={pballY}
                    iconBgY={iconY}
                />

                {/* Contenido principal dividido en max-w */}
                <div className="max-w-[1280px] mx-auto px-4 sm:px-6">

                    {/* Efectividades y Matriz */}
                    <div className="border-b-4 border-[#111111] pb-12 mb-12">
                        <EffectivenessSection type={type} typeColor={typeColor} />
                        
                        <TypeMatrixSection
                            currentType={type.name}
                            typeColor={typeColor}
                            allTypes={allTypes as any[]}
                        />

                        <TypeHistoryAccordion
                            pastRelations={type.past_damage_relations}
                            currentRelations={type.damage_relations}
                            typeColor={typeColor}
                        />
                    </div>

                    {/* Pokémon */}
                    <div className="border-b-4 border-[#111111] pb-12 mb-12">
                        <TypePokemonGrid
                            pokemon={simplePokemonList}
                            typeName={type.name}
                            typeColor={typeColor}
                            allPokemonWithSlots={type.pokemon}
                        />
                    </div>

                    {/* Movimientos especiales (Z-Moves, Dynamax) */}
                    <div className="border-b-4 border-[#111111] pb-12 mb-12">
                        <TypeZMovesSection typeName={type.name} typeColor={typeColor} />
                        <TypeDynamaxSection typeName={type.name} typeColor={typeColor} />
                    </div>

                    {/* Movimientos regulares */}
                    <div className="border-b-4 border-[#111111] pb-12 mb-12">
                        <TypeMovesTable
                            moves={movesRaw}
                            typeName={type.name}
                            typeColor={typeColor}
                            activeFilter={movesFilter}
                            onFilterChange={setMovesFilter}
                        />
                    </div>

                    {/* Habilidades y Objetos relacionados */}
                    <div className="border-b-4 border-[#111111] pb-12 mb-12">
                        <TypeAbilitiesSection typeName={type.name} typeColor={typeColor} />
                        <TypeItemsSection typeName={type.name} typeColor={typeColor} />
                    </div>

                    {/* Tipos Relacionados */}
                    <div className="pb-24">
                        <RelatedTypesCarousel currentType={type} typeColor={typeColor} />
                    </div>

                </div>
            </main>

            {/* FIXED PROGRESS BAR AT TOP */}
            <motion.div
                className="fixed top-0 left-0 h-1 origin-left z-[100]"
                style={{
                    backgroundColor: typeColor,
                    scaleX: scrollYProgress
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }} // Wait for page transition
            />
        </>
    )
}

function TypeDetailSkeleton() {
    return (
        <div className="min-h-screen bg-[#FAFAFA] animate-pulse">
            <div className="h-[400px] bg-[#111111]/10 w-full" />
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12 space-y-12">
                <div className="h-64 bg-[#111111]/10 rounded-none border-2 border-[#111111]" />
                <div className="h-96 bg-[#111111]/10 rounded-none border-2 border-[#111111]" />
            </div>
        </div>
    )
}
