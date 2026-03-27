"use client"

import { motion } from "framer-motion"
import { CheckCircle2, ExternalLink } from "lucide-react"
import Link from "next/link"

import { ComparedPokemon } from "@/types/api/compare.types"
import { COMPARE_COLORS } from "@/lib/constants/compare.constants"

interface CompareAbilitiesRowProps {
    pokemon: (ComparedPokemon | null)[]
    sharedAbilities: string[]
}

export function CompareAbilitiesRow({ pokemon, sharedAbilities }: CompareAbilitiesRowProps) {
    const active = pokemon.filter(Boolean)
    if (active.length < 2) return null

    return (
        <div className="relative border-2 border-[#111111] bg-white " style={{ boxShadow: "4px 4px 0 #111111" }}>
            <span className="absolute top-[-16px] left-4 bg-[#111111] text-white font-press-start text-[10px] px-3 py-1 z-10">
                HABILIDADES Y PASIVAS
            </span>

            <div
                className="grid divide-x-2 divide-[#E0E0E0]"
                style={{ gridTemplateColumns: `repeat(${active.length}, 1fr)` }}
            >
                {pokemon.map((p, i) => {
                    if (!p) return null
                    const color = COMPARE_COLORS[i]

                    return (
                        <div key={p.id} className="p-4">
                            <div className="h-0.5 w-full mb-3" style={{ backgroundColor: color }} />
                            <p className="font-press-start text-[10px] text-[#111111] mb-4 truncate">{p.nameEs.toUpperCase()}</p>

                            <div className="space-y-4">
                                {p.abilities.sort((a, b) => a.slot - b.slot).map(ab => {
                                    const isShared = sharedAbilities.includes(ab.name)
                                    return (
                                        <div key={ab.name} className="flex flex-col gap-2 p-3 bg-gray-50 border border-gray-100 rounded-sm hover:border-[#CC0000] hover:bg-red-50 transition-colors group">
                                            <div className="flex items-start justify-between gap-2">
                                                <div className="flex flex-col gap-2">
                                                    <span className="font-press-start text-[10px] text-[#111111] group-hover:text-[#CC0000] transition-colors leading-[1.3]">{ab.nameEs.toUpperCase()}</span>
                                                    <div className="flex flex-wrap gap-1.5 mt-1">
                                                        {isShared && (
                                                            <span className="px-1.5 py-0.5 bg-yellow-100 text-yellow-700 font-press-start text-[7px] border border-yellow-200">
                                                                COMÚN
                                                            </span>
                                                        )}
                                                        {ab.isHidden && (
                                                            <span className="px-1.5 py-0.5 bg-gray-200 text-gray-500 font-press-start text-[7px] border border-gray-300">
                                                                OCULTA
                                                            </span>
                                                        )}
                                                        {(!isShared && !ab.isHidden) && (
                                                            <span className="px-1.5 py-0.5 bg-white text-gray-400 font-press-start text-[7px] border border-gray-200">
                                                                NORMAL
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <Link
                                                    href={`/abilities/${ab.name}`}
                                                    className="shrink-0 p-1.5 bg-white border border-gray-200 hover:border-[#CC0000] hover:text-[#CC0000] transition-colors rounded-sm text-gray-400"
                                                    title="Ver detalles de la habilidad"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                </Link>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Shared badge */}
            {sharedAbilities.length > 0 && (
                <div className="bg-[#DCFCE7] p-3 border-t-2 border-[#22C55E] flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                    <span className="font-nunito text-[13px] text-[#15803D]">
                        Habilidades en común: <strong>{sharedAbilities.map(s => s.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")).join(", ")}</strong>
                    </span>
                </div>
            )}
        </div>
    )
}
