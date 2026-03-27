"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { getPokemonSpriteUrl, formatPokemonId } from "@/lib/utils/pokemon.utils"
import { TYPE_CONSTANTS } from "@/lib/constants/types.constants"

interface Props {
    currentType?: string
    currentGeneration?: string
    excludeId?: number
    evolutionIds?: number[]
}

async function fetchPokemonByType(type: string) {
    const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`)
    if (!res.ok) return []
    const data = await res.json()
    return data.pokemon.map((p: any) => p.pokemon) as { name: string; url: string }[]
}

export function RelatedPokemon({ currentType, currentGeneration, excludeId, evolutionIds = [] }: Props) {
    // Fetch a batch to find related pokemon by type
    const { data: pokemonList } = useQuery({
        queryKey: ["related-pokemon", currentType],
        queryFn: () => fetchPokemonByType(currentType!),
        enabled: !!currentType,
        staleTime: 1000 * 60 * 5,
    })

    if (!pokemonList) return null

    // Filter out current pokemon, get IDs from URLs
    const relatedRaw = pokemonList
        .map(p => {
            const parts = p.url.split("/").filter(Boolean)
            return { name: p.name, id: parseInt(parts[parts.length - 1]) }
        })
        .filter(p => p.id !== excludeId && p.id <= 1010)
        // random sort logic to mix up the related pokemon if desired, but slicing for now
        .slice(0, 16)

    if (relatedRaw.length === 0) return null

    return (
        <div className="mt-12 pt-10 border-t-4 border-[#111111]">
            <div className="flex items-center gap-3 mb-8">
                <span className="w-3 h-3 bg-[#CC0000]" />
                <h2 className="font-['Press_Start_2P'] text-[12px] text-[#111111]">RELACIONADOS</h2>
                <div className="flex-1 h-[2px] bg-[#E0E0E0]" />
            </div>

            <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide">
                {relatedRaw.map((p, i) => (
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
                                <span className="font-['Nunito'] text-[12px] font-black text-[#111111] capitalize text-center max-w-[80px] truncate group-hover:text-[#CC0000] transition-colors">{p.name}</span>
                                <span className="font-['JetBrains_Mono'] text-[10px] font-bold text-[#888888]">{formatPokemonId(p.id)}</span>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
