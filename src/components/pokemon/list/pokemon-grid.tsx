"use client"

import { useRef, useEffect, useState } from "react"
import { useWindowVirtualizer } from "@tanstack/react-virtual"
import { PokemonCard } from "./pokemon-card"
import { NamedAPIResource } from "@/types/api/common.types"

interface PokemonGridProps {
    pokemon: NamedAPIResource[];
    isLoading?: boolean;
}

export function PokemonGrid({ pokemon, isLoading }: PokemonGridProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [cols, setCols] = useState(5)
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
        const updateCols = () => {
            const w = window.innerWidth
            if (w < 640) setCols(2)
            else if (w < 768) setCols(3)
            else if (w < 1024) setCols(4)
            else if (w < 1280) setCols(5)
            else setCols(6)
        }
        updateCols()
        window.addEventListener("resize", updateCols)
        return () => window.removeEventListener("resize", updateCols)
    }, [])

    const rows = Math.ceil(pokemon.length / cols)

    // A loading skeleton row counts as 1 row with `cols` items
    const loadingRows = Math.ceil(20 / cols)

    const rowVirtualizer = useWindowVirtualizer({
        count: isLoading ? loadingRows : rows,
        estimateSize: () => 240, // Height is ~220px + margins
        overscan: 4,
    })

    // Prevent SSR hydration mismatches with window sizes
    if (!isClient) return <div className="min-h-[100vh]" />

    const virtualItems = rowVirtualizer.getVirtualItems()

    return (
        <div ref={containerRef} className="w-full relative min-h-[100vh]">
            {isLoading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <div key={i} className="w-full h-[220px] bg-[#F2F2F2] border-2 border-[#E0E0E0] overflow-hidden relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
                        </div>
                    ))}
                </div>
            ) : (
                <div style={{ height: `${rowVirtualizer.getTotalSize()}px`, width: '100%', position: 'relative' }}>
                    {virtualItems.map((virtualRow) => {
                        const rowStart = virtualRow.index * cols
                        const rowItems = pokemon.slice(rowStart, rowStart + cols)

                        return (
                            <div
                                key={virtualRow.key}
                                data-index={virtualRow.index}
                                ref={rowVirtualizer.measureElement}
                                className="absolute top-0 left-0 w-full grid gap-4"
                                style={{
                                    gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                                    transform: `translateY(${virtualRow.start}px)`,
                                }}
                            >
                                {rowItems.map((p, i) => (
                                    <div key={p.name} className="w-full flex justify-center pb-4">
                                        {/* Wrapped internally the Card to have some bottom margin for shadow */}
                                        <div className="w-full h-[220px]">
                                            <PokemonCard name={p.name} url={p.url} index={rowStart + i} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
