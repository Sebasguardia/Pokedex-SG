"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ComparedPokemon } from "@/types/api/compare.types"
import { COMPARE_COLORS, getWinners } from "@/lib/constants/compare/compare.constants"
import { Star, Zap, Shield } from "lucide-react"

interface CompareWinnerBadgesProps {
    pokemon: (ComparedPokemon | null)[]
}

export function CompareWinnerBadges({ pokemon }: CompareWinnerBadgesProps) {
    const active = pokemon.filter(Boolean)
    if (active.length < 2) return null

    const categories = [
        {
            label: "MAYOR BST",
            icon: Star,
            winners: getWinners(pokemon.map(p => p?.bst ?? null)),
            getValue: (p: ComparedPokemon) => p.bst,
            unit: "",
        },
        {
            label: "MÁS RÁPIDO",
            icon: Zap,
            winners: getWinners(pokemon.map(p => p?.stats.speed ?? null)),
            getValue: (p: ComparedPokemon) => p.stats.speed,
            unit: " VEL",
        },
        {
            label: "MEJOR DEFENSIVO",
            icon: Shield,
            winners: getWinners(pokemon.map(p => p ? p.stats.defense + p.stats.specialDefense : null)),
            getValue: (p: ComparedPokemon) => p.stats.defense + p.stats.specialDefense,
            unit: " DEF",
        },
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {categories.map((cat, ci) => {
                if (cat.winners.length === 0) return null
                const isMultiWinner = cat.winners.length > 1
                const firstWinnerIdx = cat.winners[0]
                const winnerPokemon = pokemon[firstWinnerIdx]!
                const winColor = COMPARE_COLORS[firstWinnerIdx]
                const Icon = cat.icon

                return (
                    <motion.div
                        key={ci}
                        className="border-2 border-[#111111] bg-[#FAFAFA] overflow-hidden relative"
                        style={{ boxShadow: `3px 3px 0 ${winColor}` }}
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: ci * 0.1, duration: 0.3 }}
                    >
                        {/* Top stripe */}
                        <div className="h-1 w-full" style={{ backgroundColor: winColor }} />

                        <div className="p-4 flex items-center gap-3">
                            {/* Icon + label */}
                            <div className="shrink-0">
                                <Icon className="w-5 h-5" style={{ color: winColor }} />
                                <div className="font-press-start text-[7px] text-gray-500 mt-1 leading-tight">{cat.label}</div>
                            </div>

                            {/* Winner sprites + name */}
                            <div className="flex-1">
                                {isMultiWinner ? (
                                    <div>
                                        <div className="flex gap-1">
                                            {cat.winners.map(wi => {
                                                const wp = pokemon[wi]!
                                                return (
                                                    <Image
                                                        key={wi}
                                                        src={wp.sprite}
                                                        alt={wp.nameEs}
                                                        width={32}
                                                        height={32}
                                                        unoptimized
                                                        className="object-contain"
                                                    />
                                                )
                                            })}
                                        </div>
                                        <p className="font-press-start text-[8px] text-gray-500 mt-1">EMPATE</p>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <Image
                                            src={winnerPokemon.sprite}
                                            alt={winnerPokemon.nameEs}
                                            width={40}
                                            height={40}
                                            unoptimized
                                            className="object-contain"
                                        />
                                        <div className="flex flex-col">
                                            <span className="font-press-start text-[14px] text-[#111111] mb-1">
                                                {cat.label}
                                            </span>
                                            <p className="font-jetbrains text-[16px] font-bold" style={{ color: winColor }}>
                                                {cat.getValue(winnerPokemon)}{cat.unit} ★
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )
            })}
        </div>
    )
}
