"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useQueryClient } from "@tanstack/react-query"
import { PokemonSprite } from "@/components/shared/pokemon-sprite"
import { FavoriteButton } from "@/components/shared/favorite-button"
import { TypeIcon } from "@/components/shared/type-icon"
import { formatPokemonId, formatPokemonName, getIdFromUrl } from "@/lib/utils/pokemon.utils"
import { useUIStore } from "@/lib/store/ui.store"
import { usePokemon } from "@/lib/hooks/usePokemon"
import { TYPE_CONSTANTS } from "@/lib/constants/types.constants"
import { getPokemonByIdOrName } from "@/lib/api/pokemon"
import { pokemonKeys } from "@/lib/constants/query-keys"

interface PokemonCardProps {
    name: string;
    url: string;
    index?: number;
    // Pre-loaded from GraphQL index — avoids individual fetches per card
    indexTypes?: string[];
}

export function PokemonCard({ name, url, index = 0, indexTypes }: PokemonCardProps) {
    const id = getIdFromUrl(url)
    const { shinyMode } = useUIStore()
    const queryClient = useQueryClient()

    // Only fetch from PokeAPI if we don't have type data from the GraphQL index
    const { data: details } = usePokemon(indexTypes ? 0 : id)

    const formattedId = formatPokemonId(id)
    const formattedName = formatPokemonName(name)

    // Prefer index types (from GraphQL, instant) over fetched types
    const typeNames = indexTypes ?? details?.types?.map((t: any) => t.type.name) ?? []
    const primaryType = typeNames[0] || "normal"
    const color = TYPE_CONSTANTS[primaryType]?.color || "#A8A878"

    // Prefetch the Pokemon detail on hover so it's ready when user clicks
    const handleMouseEnter = () => {
        queryClient.prefetchQuery({
            queryKey: pokemonKeys.detail(id),
            queryFn: () => getPokemonByIdOrName(id),
            staleTime: Infinity,
        })
    }

    return (
        <div className="relative isolate" onMouseEnter={handleMouseEnter}>
            <Link href={`/pokemon/${id}`} className="block h-full w-full outline-none group cursor-pointer">
                <motion.div
                    whileHover="hover"
                    className="relative w-full h-[220px] bg-white border-2 border-[#111111] flex flex-col justify-between transition-colors duration-300"
                    variants={{
                        hover: {
                            x: -2, y: -2,
                            boxShadow: "6px 6px 0 #CC0000",
                            borderColor: "#CC0000"
                        }
                    }}
                    style={{ boxShadow: "4px 4px 0 #111111", borderColor: "#111111" }}
                >
                    {/* TOP HEADER */}
                    <div className="flex justify-between items-start p-3 z-10">
                        <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] text-[#888888]">{formattedId}</span>
                            <div className="flex gap-[4px]">
                                {typeNames.map((typeName: string) => (
                                    <TypeIcon
                                        key={typeName}
                                        type={typeName}
                                        size={14}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* SPRITE AREA */}
                    <div className="absolute inset-0 flex items-center justify-center overflow-hidden z-0 mt-3">
                        {/* Background tint */}
                        <div
                            className="absolute inset-0 opacity-[0.07]"
                            style={{ backgroundColor: color }}
                        />
                        <motion.div
                            variants={{ hover: { scale: 1.15, y: -5 } }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        >
                            <PokemonSprite id={id} name={name} shiny={shinyMode} size={90} useArtwork={false} className="drop-shadow-none" />
                        </motion.div>
                    </div>

                    {/* BOTTOM AREA */}
                    <div className="z-10 p-3 pt-0 flex justify-center w-full bg-white/60 backdrop-blur-[2px]">
                        <h3 className="font-nunito text-[14px] font-bold text-[#111111] group-hover:text-[#CC0000] truncate transition-colors text-center w-full">
                            {formattedName}
                        </h3>
                    </div>

                    {/* BOTTOM COLOR BAR */}
                    <div className="absolute bottom-0 left-0 w-full h-[6px] border-t border-[#111111]" style={{ backgroundColor: color }} />

                    {/* FAVORITE TILE */}
                    <div className="absolute top-2 right-2 z-30" onClick={(e) => e.preventDefault()}>
                        <FavoriteButton pokemonId={id} />
                    </div>
                </motion.div>
            </Link>
        </div>
    )
}

// Fallback visual wrapper for mobile where HoverCard isn't ideal
export function PokemonCardMobileWrapper(props: PokemonCardProps) {
    return <PokemonCard {...props} />
}
