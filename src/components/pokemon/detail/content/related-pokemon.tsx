"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { getPokemonSpriteUrl, formatPokemonId, formatPokemonName } from "@/lib/utils/pokemon.utils"
import { usePokemonIndex, PokemonIndexItem } from "@/lib/hooks/usePokemonIndex"
import { LEGENDARY_IDS, MYTHICAL_IDS, BABY_IDS } from "@/lib/constants/special-pokemon.constants"

interface Props {
    currentId: number;
    currentTypes: string[];
}

const LEGENDARY_SET = new Set(LEGENDARY_IDS)
const MYTHICAL_SET = new Set(MYTHICAL_IDS)
const BABY_SET = new Set(BABY_IDS)

function getBST(stats: any) {
    if (!stats) return 0
    return stats.hp + stats.attack + stats.defense + stats.specialAttack + stats.specialDefense + stats.speed
}

export function RelatedPokemon({ currentId, currentTypes }: Props) {
    const { data: globalPokemon } = usePokemonIndex()

    const relatedPokemonList = useMemo(() => {
        if (!globalPokemon) return []

        const current = globalPokemon.find((p) => p.id === currentId)
        if (!current) return []

        const currentBst = getBST(current.stats)
        const isLeg = LEGENDARY_SET.has(currentId)
        const isMyth = MYTHICAL_SET.has(currentId)
        const isBaby = BABY_SET.has(currentId)

        const scored = globalPokemon
            .filter((p) => p.id !== currentId && p.id <= 1025) // Exclude self and beyond Gen 9
            .map((p) => {
                let score = 0
                const otherBst = getBST(p.stats)
                const otherLeg = LEGENDARY_SET.has(p.id)
                const otherMyth = MYTHICAL_SET.has(p.id)
                const otherBaby = BABY_SET.has(p.id)
                
                const idDiff = Math.abs(currentId - p.id)

                // 1. Exact group logic (Legendary trios etc are usually very close in ID)
                if ((isLeg && otherLeg) || (isMyth && otherMyth)) {
                    // Massive boost if they are the same category AND close in ID (e.g. Articuno 144, Zapdos 145, Moltres 146)
                    if (idDiff < 15) score += 2000
                    else score += 500 // Still favor other legendaries/mythicals
                } else if (isBaby && otherBaby) {
                    score += 300
                }

                // 2. Type matching
                const sharedTypes = p.types.filter(t => currentTypes.includes(t)).length
                if (sharedTypes === 2) score += 400
                else if (sharedTypes === 1) score += 150

                // 3. Proximity / Generation grouping
                // Close IDs mean they are likely from the same generation/route/counterparts
                if (idDiff === 1) score += 300 // Counterparts like Plusle/Minun, Nidoking/Queen
                else if (idDiff <= 5) score += 150
                else if (idDiff <= 20) score += 50
                
                // Subtract points for being far away in the Pokedex
                score -= idDiff

                // 4. Stat similarity (keeps early game bugs together, pseudo-legendaries together)
                const bstDiff = Math.abs(currentBst - otherBst)
                if (bstDiff < 20) score += 100
                else if (bstDiff < 50) score += 50
                
                // Subtract points for vastly different power levels (prevents Caterpie showing next to Rayquaza)
                score -= bstDiff * 0.5

                return { ...p, relationScore: score }
            })

        // Sort by score descending
        scored.sort((a, b) => b.relationScore - a.relationScore)
        
        return scored.slice(0, 16)
    }, [globalPokemon, currentId, currentTypes])

    if (relatedPokemonList.length === 0) return null

    return (
        <div className="mt-12 pt-10 border-t-4 border-[#111111]">
            <div className="flex items-center gap-3 mb-8">
                <span className="w-3 h-3 bg-[#CC0000]" />
                <h2 className="font-['Press_Start_2P'] text-[12px] text-[#111111]">RELACIONADOS</h2>
                <div className="flex-1 h-[2px] bg-[#E0E0E0]" />
            </div>

            <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide">
                {relatedPokemonList.map((p, i) => (
                    <motion.div
                        key={p.id}
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.03, type: "spring", stiffness: 300, damping: 22 }}
                        className="flex-shrink-0"
                    >
                        <Link href={`/pokemon/${p.id}`} className="flex flex-col items-center gap-3 group">
                            <motion.div
                                className="bg-white flex items-center justify-center shadow-[4px_4px_0_rgba(17,17,17,0.1)] group-hover:shadow-[6px_6px_0_#111111] group-hover:translate-x-[-2px] group-hover:translate-y-[-2px] transition-all"
                                style={{ width: 80, height: 80, border: "3px solid #111111" }}
                            >
                                <Image
                                    src={getPokemonSpriteUrl(p.id)}
                                    alt={p.name}
                                    width={64}
                                    height={64}
                                    style={{ imageRendering: "pixelated" }}
                                />
                            </motion.div>
                            <div className="flex flex-col items-center">
                                <span className="font-['Nunito'] text-[12px] font-black text-[#111111] capitalize text-center max-w-[80px] truncate group-hover:text-[#CC0000] transition-colors">{formatPokemonName(p.name)}</span>
                                <span className="font-['JetBrains_Mono'] text-[10px] font-bold text-[#888888]">{formatPokemonId(p.id)}</span>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
