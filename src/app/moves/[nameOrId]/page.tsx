"use client"

import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import Link from "next/link"
import { useMove } from "@/lib/hooks/moves/useMoves"
import { useMachines } from "@/lib/hooks/moves/useMachines"
import { TYPE_COLORS } from "@/lib/constants/types/types.constants"
import { MoveDetailHero } from "@/components/moves/move-detail-hero"
import { MoveStatsGrid } from "@/components/moves/move-stats-grid"
import { MoveEffectSection } from "@/components/moves/move-effect-section"
import { MoveContestSection } from "@/components/moves/move-contest-section"
import { MovePokemonList } from "@/components/moves/move-pokemon-list"
import { MoveMachinesSection } from "@/components/moves/move-machines-section"
import { MoveVersionHistory } from "@/components/moves/move-version-history"
import { PageTransitionMove } from "@/components/shared/page-transitions/moves/page-transition-move"
import { ArrowLeft } from "lucide-react"

function MoveDetailSkeleton() {
    return (
        <div className="animate-pulse">
            <div className="h-[340px] bg-[#E0E0E0]" />
            <div className="max-w-[1280px] mx-auto px-6 py-12 space-y-8">
                <div className="grid grid-cols-3 gap-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="h-[100px] bg-[#F2F2F2]" />
                    ))}
                </div>
                <div className="h-[120px] bg-[#F2F2F2]" />
                <div className="h-[200px] bg-[#F2F2F2]" />
            </div>
        </div>
    )
}

export default function MoveDetailPage() {
    const { nameOrId } = useParams<{ nameOrId: string }>()
    const { data: move, isLoading, isError } = useMove(nameOrId)
    const { data: machines } = useMachines(move?.machines)

    if (isLoading) return <MoveDetailSkeleton />

    if (isError || !move) {
        return (
            <div className="max-w-[1280px] mx-auto px-6 py-24 text-center">
                <h1 className="font-press-start text-[16px] text-[#CC0000] mb-4">Move no encontrado</h1>
                <p className="font-nunito text-[14px] text-[#888888] mb-8">El movimiento "{nameOrId}" no existe o no está disponible.</p>
                <Link href="/moves" className="inline-flex items-center gap-2 px-4 py-2 bg-[#CC0000] text-white font-nunito font-bold">
                    <ArrowLeft size={16} />
                    Volver a Movimientos
                </Link>
            </div>
        )
    }

    const typeColor = TYPE_COLORS[move.type?.name ?? ""] ?? "#888888"
    const moveClass = (move.damage_class?.name ?? "status") as "physical" | "special" | "status"

    return (
        <>
            <PageTransitionMove typeColor={typeColor} typeName={move.type?.name ?? ""} moveName={move.name} moveClass={moveClass} />

            {/* Radial tint background */}
            <div
                className="fixed inset-0 pointer-events-none z-0"
                style={{ background: `radial-gradient(circle at 100% 0%, ${typeColor}05, transparent 60%)` }}
            />

            <main className="relative z-10">
                <MoveDetailHero move={move} typeColor={typeColor} />

                <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12 space-y-4">

                    {/* Back to moves link */}
                    <Link href="/moves" className="inline-flex items-center gap-2 font-nunito text-[13px] text-[#888888] hover:text-[#111111] transition-colors">
                        <ArrowLeft size={14} />
                        Volver a Movimientos
                    </Link>

                    {/* Stats Grid */}
                    <MoveStatsGrid move={move} typeColor={typeColor} />

                    {/* Section separator */}
                    <div className="flex gap-0.5 py-2">
                        <div className="flex-1 h-[3px] bg-[#111111]" />
                        <div className="flex-1 h-[2px] bg-[#CC0000] mt-0.5" />
                    </div>

                    {/* Effect Description */}
                    <MoveEffectSection move={move} typeColor={typeColor} />

                    {/* Contest data */}
                    {move.contest_type && (
                        <MoveContestSection move={move} />
                    )}

                    {/* Pokémon list */}
                    {(move.learned_by_pokemon?.length ?? 0) > 0 && (
                        <>
                            <div className="flex gap-0.5 py-2">
                                <div className="flex-1 h-[3px] bg-[#111111]" />
                                <div className="flex-1 h-[2px]" style={{ backgroundColor: typeColor }} />
                            </div>
                            <MovePokemonList move={move} typeColor={typeColor} />
                        </>
                    )}

                    {/* Machines */}
                    {machines && machines.length > 0 && (
                        <MoveMachinesSection machines={machines} moveClass={moveClass} />
                    )}

                    {/* Version History */}
                    {(move.past_values?.length ?? 0) > 0 && (
                        <MoveVersionHistory move={move} pastValues={move.past_values} />
                    )}
                </div>
            </main>
        </>
    )
}
