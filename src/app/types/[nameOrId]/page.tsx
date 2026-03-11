"use client"

import { useState } from "react"
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion"
import { notFound } from "next/navigation"
import { useQueryState, parseAsInteger } from "nuqs"

import { useType } from "@/lib/hooks/useTypes"
import { useTypesData } from "@/lib/hooks/useTypesData"
import { usePokemonByType } from "@/lib/hooks/usePokemonByType"
import { useMovesByType } from "@/lib/hooks/useMovesByType"

import { TYPE_COLORS, TYPE_ORDER } from "@/lib/constants/types.constants"

import { PageTransitionType } from "@/components/shared/page-transition-type"
import { TypeDetailHero } from "@/components/types/type-detail-hero"
import { EffectivenessSection } from "@/components/types/effectiveness-section"
import { TypeMatrixSection } from "@/components/types/type-matrix"
import { TypePokemonGrid } from "@/components/types/type-pokemon-grid"
import { TypeMovesTable } from "@/components/types/type-moves-table"
import { TypeHistoryAccordion } from "@/components/types/type-history-accordion"
import { RelatedTypesCarousel } from "@/components/types/related-types-carousel"

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

    const [pokemonTab, setPokemonTab] = useState("all")
    const [pokemonPage, setPokemonPage] = useQueryState("page", parseAsInteger.withDefault(1))
    const { data: pokemonPaginated, limit: pokemonLimit, total: totalPokemon } = usePokemonByType(type?.name, pokemonTab, pokemonPage)

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

    return (
        <>
            <PageTransitionType typeColor={typeColor} typeName={type.name} />

            <main className="min-h-screen bg-[#F8F8F8]">

                <TypeDetailHero
                    type={type}
                    typeColor={typeColor}
                    pokeballParallaxY={pballY}
                    iconBgY={iconY}
                />

                <div className="max-w-[1280px] mx-auto px-4 sm:px-6 divide-y-4 divide-[#E0E0E0]">

                    <EffectivenessSection type={type} typeColor={typeColor} />

                    {/* Matrices are heavy, but they share the same data context */}
                    <TypeMatrixSection
                        open={matrixOpen}
                        onToggle={() => setMatrixOpen(prev => !prev)}
                        currentType={type.name}
                        allTypes={allTypes as any[]}
                    />

                    <TypePokemonGrid
                        pokemon={pokemonPaginated}
                        typeName={type.name}
                        typeColor={typeColor}
                        activeTab={pokemonTab}
                        onTabChange={(t) => {
                            setPokemonTab(t);
                            setPokemonPage(1); // Reset page on tab change
                        }}
                        page={pokemonPage}
                        limit={pokemonLimit}
                        onPageChange={setPokemonPage}
                        total={totalPokemon}
                    />

                    <TypeMovesTable
                        moves={movesRaw}
                        typeName={type.name}
                        typeColor={typeColor}
                        activeFilter={movesFilter}
                        onFilterChange={setMovesFilter}
                    />

                    <TypeHistoryAccordion
                        pastRelations={type.past_damage_relations}
                        currentRelations={type.damage_relations}
                    />

                    <RelatedTypesCarousel currentType={type} typeColor={typeColor} />

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
        <div className="min-h-screen bg-[#F8F8F8] animate-pulse">
            <div className="h-[400px] bg-[#E0E0E0] w-full" />
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12 space-y-12">
                <div className="h-64 bg-[#E0E0E0] rounded" />
                <div className="h-64 bg-[#E0E0E0] rounded" />
            </div>
        </div>
    )
}
