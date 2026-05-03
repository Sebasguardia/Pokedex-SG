"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ComparedPokemon } from "@/types/api/compare.types"
import {
    COMPARE_COLORS,
    getGenerationByPokemonId,
    GEN_LABELS,
    GEN_COLORS,
} from "@/lib/constants/compare/compare.constants"
import { TYPE_COLORS, TYPE_NAMES_ES, PIXEL_URL } from "@/lib/constants/team-builder/team-builder.constants"

interface CompareHeaderRowProps {
    pokemon: (ComparedPokemon | null)[]
    bstWinners: number[]
}

const MAX_BST = 720

export function CompareHeaderRow({ pokemon, bstWinners }: CompareHeaderRowProps) {
    const active = pokemon.filter(Boolean)
    if (active.length < 2) return null

    return (
        <div className="relative border-2 border-[#111111]  mt-10" style={{ boxShadow: "4px 4px 0 #111111" }}>
            {/* Floating label */}
            <span className="absolute top-[-16px] left-4 bg-[#111111] text-white font-press-start text-[10px] px-3 py-1 z-10">
                COMPARANDO {active.length} POKÉMON
            </span>

            <div
                className="grid divide-x-2 divide-[#E0E0E0]"
                style={{ gridTemplateColumns: `repeat(${active.length}, 1fr)` }}
            >
                {pokemon.map((p, i) => {
                    if (!p) return null
                    const color = COMPARE_COLORS[i]
                    const gen = getGenerationByPokemonId(p.id)
                    const bstPercent = Math.round((p.bst / MAX_BST) * 100)
                    const isWinner = bstWinners.includes(i)

                    return (
                        <motion.div
                            key={p.id}
                            initial={{ clipPath: "inset(0 100% 0 0)" }}
                            animate={{ clipPath: "inset(0 0% 0 0)" }}
                            transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="flex flex-col items-center p-5 bg-white"
                        >
                            {/* Gen badge */}
                            <span
                                className="self-start font-press-start text-[8px] px-2 py-1 text-white mb-2"
                                style={{ backgroundColor: GEN_COLORS[gen] ?? "#888888" }}
                            >
                                {GEN_LABELS[gen]}
                            </span>

                            {/* Sprite top stripe */}
                            <div className="h-1 w-full mb-3 rounded-full" style={{ backgroundColor: color }} />

                            {/* Animated Sprite */}
                            <div className="relative w-[90px] h-[90px] md:w-[110px] md:h-[110px]">
                                <Image
                                    src={PIXEL_URL(p.id)}
                                    alt={p.nameEs}
                                    fill
                                    className="object-contain"
                                    style={{ 
                                        filter: `drop-shadow(0 4px 14px ${color}66)`,
                                        imageRendering: "pixelated"
                                    }}
                                    unoptimized
                                    sizes="110px"
                                />
                            </div>

                            {/* Name */}
                            <p className="font-press-start text-[14px] text-[#111111] mt-3 text-center leading-tight">
                                {p.nameEs.toUpperCase()}
                            </p>
                            {p.genus && (
                                <p className="font-nunito text-[14px] text-gray-500 italic mt-0.5 text-center font-bold">
                                    {p.genus}
                                </p>
                            )}
                            <p className="font-jetbrains text-[13px] text-gray-400 mt-0.5">
                                #{String(p.id).padStart(4, "0")}
                            </p>

                            {/* Types */}
                            <div className="flex gap-1 mt-2 flex-wrap justify-center">
                                {p.types.map(t => (
                                    <span
                                        key={t}
                                        className="font-press-start text-[8px] text-white px-2 py-1"
                                        style={{ backgroundColor: TYPE_COLORS[t] }}
                                    >
                                        {(TYPE_NAMES_ES[t] ?? t).toUpperCase()}
                                    </span>
                                ))}
                            </div>

                            {/* Legendary / Mythical */}
                            {(p.isLegendary || p.isMythical) && (
                                <span
                                    className="mt-2 font-press-start text-[8px] px-2 py-1 text-white"
                                    style={{ backgroundColor: p.isMythical ? "#8B5CF6" : "#F59E0B" }}
                                >
                                    {p.isMythical ? "MÍTICO" : "LEGENDARIO"}
                                </span>
                            )}

                            {/* BST bar */}
                            <div className="w-full mt-4">
                                <div className="flex justify-between mb-1 items-center">
                                    <span className="font-press-start text-[10px] text-gray-400">BST</span>
                                    <span className="font-jetbrains text-[15px] font-bold" style={{ color }}>
                                        {p.bst}
                                        {isWinner && <span className="ml-1 text-[12px]">★</span>}
                                    </span>
                                </div>
                                <div className="h-2 bg-[#F0F0F0] w-full border border-[#E0E0E0]">
                                    <motion.div
                                        className="h-full"
                                        style={{ backgroundColor: color }}
                                        initial={{ width: "0%" }}
                                        animate={{ width: `${bstPercent}%` }}
                                        transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                                    />
                                </div>
                            </div>

                            {/* Flavor text */}
                            {p.flavorText && (
                                <p className="font-nunito text-[14px] text-gray-400 italic mt-4 text-center line-clamp-2 font-medium">
                                    "{p.flavorText}"
                                </p>
                            )}
                        </motion.div>
                    )
                })}
            </div>
        </div>
    )
}
