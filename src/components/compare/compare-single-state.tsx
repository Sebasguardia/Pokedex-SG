"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Search } from "lucide-react"
import { ComparedPokemon } from "@/types/api/compare.types"
import { COMPARE_COLORS, STAT_KEYS, STAT_LABELS_ES, STAT_MAX } from "@/lib/constants/compare.constants"
import { TYPE_COLORS, TYPE_NAMES_ES } from "@/lib/constants/team-builder.constants"
import { PokemonSprite } from "@/components/shared/pokemon-sprite"

interface CompareSingleStateProps {
    pokemon:   ComparedPokemon
    onAddMore: () => void
}

export function CompareSingleState({ pokemon, onAddMore }: CompareSingleStateProps) {
    const color = COMPARE_COLORS[0]

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8"
        >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                {/* Left: Visual & Info */}
                <div className="md:col-span-5 flex flex-col items-center">
                    <div className="relative w-[280px] h-[280px] flex items-center justify-center">
                        <PokemonSprite
                            id={pokemon.id}
                            name={pokemon.nameEs}
                            size={280}
                        />
                    </div>
                    
                    <div className="mt-6 text-center">
                        <h2 className="font-press-start text-[20px] text-[#111111] leading-tight">
                            {pokemon.nameEs.toUpperCase()}
                        </h2>
                        <p className="font-nunito text-[16px] text-gray-500 mt-1">{pokemon.genus}</p>
                        <div className="flex gap-2 mt-4 justify-center">
                            {pokemon.types.map(t => (
                                <span
                                    key={t}
                                    className="px-3 py-1 font-press-start text-[8px] text-white"
                                    style={{ backgroundColor: TYPE_COLORS[t] }}
                                >
                                    {TYPE_NAMES_ES[t].toUpperCase()}
                                </span>
                            ))}
                        </div>
                    </div>

                    {pokemon.flavorText && (
                        <div className="mt-8 p-4 border-l-4 border-[#111111] bg-[#FAFAFA] italic font-nunito text-[14px] text-gray-600">
                            &ldquo;{pokemon.flavorText}&rdquo;
                        </div>
                    )}
                </div>

                {/* Right: Quick Stats & CTA */}
                <div className="md:col-span-7">
                    <div className="border-2 border-[#111111] p-6 bg-white relative" style={{ boxShadow: "4px 4px 0 #111111" }}>
                        <span className="absolute top-[-14px] left-4 bg-[#111111] text-white font-press-start text-[8px] px-2 py-1">
                            ESTADÍSTICAS DEL POKÉMON
                        </span>

                        <div className="space-y-4">
                            {STAT_KEYS.map(key => {
                                const val = pokemon.stats[key]
                                const max = STAT_MAX[key]
                                const pct = (val / max) * 100
                                return (
                                    <div key={key}>
                                        <div className="flex justify-between mb-1">
                                            <span className="font-press-start text-[7px] text-gray-400">{STAT_LABELS_ES[key]}</span>
                                            <span className="font-jetbrains text-[13px] font-bold">{val}</span>
                                        </div>
                                        <div className="h-2.5 bg-[#F0F0F0] border border-[#E0E0E0] overflow-hidden">
                                            <motion.div
                                                className="h-full"
                                                style={{ backgroundColor: color }}
                                                initial={{ width: "0%" }}
                                                animate={{ width: `${pct}%` }}
                                                transition={{ duration: 0.8, ease: "easeOut" }}
                                            />
                                        </div>
                                    </div>
                                )
                            })}
                            <div className="pt-4 border-t border-[#E0E0E0] flex justify-between items-center">
                                <span className="font-press-start text-[8px] text-[#111111]">TOTAL BST</span>
                                <span className="font-jetbrains text-[18px] font-black" style={{ color }}>{pokemon.bst}</span>
                            </div>
                        </div>
                    </div>

                    {/* CTA Box */}
                    <div className="mt-8 p-6 bg-[#111111] text-white border-2 border-[#111111]" style={{ boxShadow: "4px 4px 0 #111111" }}>
                        <h3 className="font-press-start text-[10px] mb-4 text-[#CC0000]">SOLO UN POKÉMON CARGADO</h3>
                        <p className="font-nunito text-[15px] mb-6 text-gray-400">
                            Para ver el análisis comparativo completo (ventaja de tipos, habilidades compartidas, tabla de ganadores), necesitas añadir al menos otro Pokémon.
                        </p>
                        <button
                            onClick={onAddMore}
                            className="w-full py-4 bg-white text-[#111111] font-press-start text-[10px] border-2 border-[#CC0000] hover:bg-[#CC0000] hover:text-white transition-all flex items-center justify-center gap-3"
                        >
                            <Search className="w-4 h-4" />
                            AÑADIR POKÉMON PARA COMPARAR
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
