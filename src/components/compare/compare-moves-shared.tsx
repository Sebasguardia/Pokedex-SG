"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Swords, ChevronDown, ChevronUp, ChevronRight, Zap } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { ComparedPokemon } from "@/types/api/compare.types"
import { useMove } from "@/lib/hooks/useMoves"
import { TYPE_COLORS } from "@/lib/constants/team-builder.constants"

function SharedMoveCard({ moveSlug }: { moveSlug: string }) {
    const { data: move, isLoading } = useMove(moveSlug)
    
    // Default color while loading is black
    const typeColor = move ? TYPE_COLORS[move.type.name as keyof typeof TYPE_COLORS] || "#111111" : "#111111"
    
    return (
        <Link 
            href={`/moves/${moveSlug}`}
            className="group relative flex items-center justify-between px-4 py-3 bg-white border-2 hover:-translate-y-0.5 transition-all overflow-hidden cursor-pointer"
            style={{ 
                borderColor: "#111111", 
                boxShadow: `3px 3px 0 ${typeColor}` 
            }}
            title={`Ver detalles de ${moveSlug.replace("-", " ")}`}
        >
            {/* Hover Sliding Background */}
            <div 
                className="absolute inset-0 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out z-0" 
                style={{ backgroundColor: typeColor }} 
            />
            
            <div className="relative z-10 flex items-center gap-3">
                {isLoading ? (
                    <div className="w-5 h-5 rounded-full bg-gray-200 animate-pulse" />
                ) : move ? (
                    <div className="w-5 h-5 rounded-full flex items-center justify-center p-1" style={{ backgroundColor: typeColor }}>
                        <Image 
                            src={`/icons/${move.type.name}.svg`}
                            alt={move.type.name}
                            width={12}
                            height={12}
                            className="brightness-0 invert object-contain"
                        />
                    </div>
                ) : (
                    <span className="w-1.5 h-1.5 bg-[#111111] group-hover:bg-white rotate-45 transition-colors duration-300" />
                )}
                <span className="font-press-start text-[9px] text-[#111111] group-hover:text-white transition-colors duration-300 pt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
                    {moveSlug.replace("-", " ").toUpperCase()}
                </span>
            </div>
            <ChevronRight className="relative z-10 w-4 h-4 text-white opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
        </Link>
    )
}


interface CompareMovesSharedProps {
    pokemon:     (ComparedPokemon | null)[]
    sharedMoves: string[]
}

export function CompareMovesShared({ pokemon, sharedMoves }: CompareMovesSharedProps) {
    const [expanded, setExpanded] = useState(false)
    const active = pokemon.filter(Boolean)
    if (active.length < 2) return null

    const INITIAL_COUNT = 16 // 4 columns perfectly filled
    const displayCount = expanded ? sharedMoves.length : INITIAL_COUNT
    const visibleMoves = sharedMoves.slice(0, displayCount)
    const hasMore = sharedMoves.length > INITIAL_COUNT

    return (
        <div className="relative border-2 border-[#111111] overflow-hidden bg-white" style={{ boxShadow: "4px 4px 0 #111111" }}>
            <div className="relative z-10 p-5 flex items-center justify-between border-b-2 border-dashed border-gray-200 bg-[#FAFAFA]">
                <div className="flex items-center gap-3">
                    <Swords className="w-5 h-5 text-[#111111]" />
                    <span className="font-press-start text-[10px] text-[#111111] tracking-widest">MOVIMIENTOS COMPARTIDOS</span>
                </div>
                <div className="flex items-center gap-2">
                    <Zap className="w-3 h-3 text-[#CC0000] animate-pulse" />
                    <span className="font-press-start text-[9px] text-[#111111]">{sharedMoves.length} TOTAL</span>
                </div>
            </div>

            <div className="relative z-10 p-6 md:p-8">
                {sharedMoves.length > 0 ? (
                    <div className="flex flex-col items-center">
                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
                            <AnimatePresence>
                                {visibleMoves.map((moveSlug, index) => (
                                    <motion.div
                                        key={moveSlug}
                                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                        transition={{ duration: 0.25, delay: index < INITIAL_COUNT ? index * 0.02 : 0, ease: "easeOut" }}
                                    >
                                        <SharedMoveCard moveSlug={moveSlug} />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {hasMore && (
                            <button
                                onClick={() => setExpanded(!expanded)}
                                className="mt-10 relative flex items-center gap-3 px-8 py-4 bg-[#111111] border-2 border-[#111111] hover:bg-white group transition-colors"
                                style={{ boxShadow: "4px 4px 0 #111111" }}
                            >
                                <span className="relative z-10 font-press-start text-[10px] text-white group-hover:text-[#111111] tracking-wider transition-colors pt-0.5">
                                    {expanded ? "MOSTRAR MENOS" : `CARGAR ${sharedMoves.length - INITIAL_COUNT} MÁS`}
                                </span>
                                {expanded ? (
                                    <ChevronUp className="relative z-10 w-4 h-4 text-white group-hover:text-[#111111] group-hover:-translate-y-1 transition-all" />
                                ) : (
                                    <ChevronDown className="relative z-10 w-4 h-4 text-white group-hover:text-[#111111] group-hover:translate-y-1 transition-all" />
                                )}
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="py-16 flex flex-col items-center justify-center gap-4 text-center">
                        <Swords className="w-16 h-16 text-[#333333]" />
                        <p className="font-press-start text-[12px] text-gray-500">ESTOS POKÉMON NO COMPARTEN MOVIMIENTOS</p>
                    </div>
                )}
            </div>
        </div>
    )
}

