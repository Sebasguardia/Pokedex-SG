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
        <div className="mt-12 border-t-2 border-[#111111] pt-8">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-6 bg-[#CC0000]" />
                <h2 className="font-['Press_Start_2P'] text-[10px] text-[#111111]">POKÉMON RELACIONADOS</h2>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none">
                {relatedRaw.map((p, i) => (
                    <motion.div
                        key={p.id}
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.03, type: "spring", stiffness: 300, damping: 22 }}
                        className="flex-shrink-0"
                    >
                        <Link href={`/pokemon/${p.id}`} className="flex flex-col items-center gap-1 group">
                            <motion.div
                                className="bg-[#F8F8F8] flex items-center justify-center"
                                style={{ width: 64, height: 64, border: "1px solid #E0E0E0" }}
                                whileHover={{ scale: 1.1, borderColor: "#111111", boxShadow: "3px 3px 0 #111111" }}
                            >
                                <Image
                                    src={getPokemonSpriteUrl(p.id)}
                                    alt={p.name}
                                    width={56}
                                    height={56}
                                    style={{ imageRendering: "pixelated" }}
                                />
                            </motion.div>
                            <span className="font-['Nunito'] text-[10px] font-bold text-[#888888] group-hover:text-[#111111] transition-colors capitalize text-center max-w-[64px] truncate">{p.name}</span>
                            <span className="font-['JetBrains_Mono'] text-[9px] text-[#AAAAAA]">{formatPokemonId(p.id)}</span>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
