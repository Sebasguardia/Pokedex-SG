"use client"

import { PokemonCard } from "./pokemon-card"
import { NamedAPIResource } from "@/types/api/common.types"

interface GridItem extends NamedAPIResource {
    indexTypes?: string[];
}

interface PokemonGridProps {
    pokemon: GridItem[];
    isLoading?: boolean;
}

export function PokemonGrid({ pokemon, isLoading }: PokemonGridProps) {
    if (isLoading) {
        return (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
                {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className="w-full h-[180px] sm:h-[220px] bg-[#F2F2F2] border-2 border-[#E0E0E0] overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
            {pokemon.map((p, i) => (
                <div key={p.name} className="w-full h-[180px] sm:h-[220px]">
                    <PokemonCard name={p.name} url={p.url} index={i} indexTypes={p.indexTypes} />
                </div>
            ))}
        </div>
    )
}
