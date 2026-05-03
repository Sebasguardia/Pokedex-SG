"use client"

import { Suspense, useEffect, useState } from "react"
import { useCompareUrlState, useComparePokemon, useCompareAnalysis } from "@/lib/hooks/compare/useCompare"
import { CompareSlotsContainer } from "@/components/compare/compare-slots-container"
import { CompareEmptyState } from "@/components/compare/compare-empty-state"
import { CompareSingleState } from "@/components/compare/compare-single-state"
import { CompareHeaderRow } from "@/components/compare/compare-header-row"
import { CompareWinnerBadges } from "@/components/compare/compare-winner-badges"
import { CompareStatsTable } from "@/components/compare/compare-stats-table"
import { CompareStatsChart } from "@/components/compare/compare-stats-chart"
import { CompareRadarChart } from "@/components/compare/compare-radar-chart"
import { CompareSpeedChart } from "@/components/compare/compare-speed-chart"
import { CompareTypeAnalysis } from "@/components/compare/compare-type-analysis"
import { CompareTypeSummary } from "@/components/compare/compare-type-summary"
import { CompareAbilitiesRow } from "@/components/compare/compare-abilities-row"
import { ComparePhysicalRow } from "@/components/compare/compare-physical-row"
import { CompareMovesShared } from "@/components/compare/compare-moves-shared"
import { PageTransitionCompare } from "@/components/shared/page-transitions/compare/page-transition-compare"
import { saveCompareHistory } from "@/components/compare/compare-history"
import { SectionHeader } from "@/components/ui/section-header"
import { Scale } from "lucide-react"

function ComparePageContent() {
    const { slots, setSlot, clearAll, shareUrl } = useCompareUrlState()

    // Fetch up to 4 pokemon queries
    const q1 = useComparePokemon(slots[0])
    const q2 = useComparePokemon(slots[1])
    const q3 = useComparePokemon(slots[2])
    const q4 = useComparePokemon(slots[3])

    const queries = [q1, q2, q3, q4]
    const pokemon = queries.map(q => q.data ?? null)
    const active = pokemon.filter(Boolean)
    const loadingSlots = queries.map(q => q.isLoading)

    // Analysis
    const analysis = useCompareAnalysis(pokemon)

    // Sync History
    useEffect(() => {
        if (active.length >= 2) {
            saveCompareHistory(
                slots,
                pokemon.map(p => p?.nameEs ?? null),
                pokemon.map(p => p?.id ?? null)
            )
        }
    }, [slots, pokemon, active.length])

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl min-h-screen">
            <PageTransitionCompare />

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
                <SectionHeader 
                    title="COMPARADOR" 
                    subtitle="Análisis profundo de hasta 4 Pokémon simultáneamente"
                />
            </div>

            {/* Slot Container (Always visible as the "Dashboard") */}
            <CompareSlotsContainer
                slots={slots}
                pokemon={pokemon}
                loadingSlots={loadingSlots}
                shareUrl={shareUrl}
                onSetSlot={setSlot}
                onClearAll={clearAll}
            />

            <div className="mt-4 mb-20">
                {active.length === 0 && (
                    <CompareEmptyState onAddFirst={() => document.querySelector<HTMLButtonElement>('button[style*="slotIndex: 0"]')?.click() || window.scrollTo({ top: 0, behavior: 'smooth' })} />
                )}

                {active.length === 1 && active[0] && (
                    <CompareSingleState 
                        pokemon={active[0]} 
                        onAddMore={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
                    />
                )}

                {active.length >= 2 && analysis && (
                    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {/* 1. Visión General */}
                        <section>
                            <CompareHeaderRow pokemon={pokemon} bstWinners={analysis.bstWinners} />
                            <CompareWinnerBadges pokemon={pokemon} />
                        </section>

                        {/* 2. Estadísticas Detalladas */}
                        <section className="flex flex-col gap-12 max-w-5xl mx-auto">
                            <div className="w-full">
                                <CompareRadarChart pokemon={pokemon} />
                            </div>
                            <div className="w-full">
                                <CompareStatsChart pokemon={pokemon} />
                            </div>
                        </section>

                        {/* 3. Tabla de Comparación */}
                        <section>
                            <CompareStatsTable 
                                pokemon={pokemon} 
                                statWinners={analysis.statWinners} 
                                bstWinners={analysis.bstWinners} 
                            />
                        </section>

                        {/* 4. Velocidad Relativa */}
                        <section>
                            <CompareSpeedChart 
                                pokemon={pokemon} 
                                speedWinners={analysis.speedWinners} 
                            />
                        </section>

                        {/* 5. Análisis de Tipos */}
                        <section>
                            <CompareTypeAnalysis 
                                pokemon={pokemon} 
                                typeDefenseWinners={analysis.typeDefenseWinners} 
                            />
                            <CompareTypeSummary pokemon={pokemon} />
                        </section>

                        {/* 6. Habilidades y Datos Físicos */}
                        <section className="space-y-12">
                            <CompareAbilitiesRow 
                                pokemon={pokemon} 
                                sharedAbilities={analysis.sharedAbilities} 
                            />
                            
                            <ComparePhysicalRow pokemon={pokemon} />
                        </section>

                        {/* 7. Movimientos Compartidos */}
                        <section>
                            <CompareMovesShared 
                                pokemon={pokemon} 
                                sharedMoves={analysis.sharedMoves} 
                            />
                        </section>
                    </div>
                )}
            </div>
        </div>
    )
}

export default function ComparePage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#111111] flex items-center justify-center font-press-start text-white">CARGANDO COMPARADOR...</div>}>
            <ComparePageContent />
        </Suspense>
    )
}
