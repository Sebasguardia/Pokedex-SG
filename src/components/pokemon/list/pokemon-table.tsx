"use client"

import { useRef, useEffect, useState } from "react"
import { useWindowVirtualizer } from "@tanstack/react-virtual"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { NamedAPIResource } from "@/types/api/common.types"
import { PokemonSprite } from "@/components/shared/pokemon-sprite"
import { formatPokemonId, formatPokemonName, getIdFromUrl } from "@/lib/utils/pokemon.utils"
import { useUIStore } from "@/lib/store/ui.store"
import { useQueryState } from "nuqs"
import { usePokemon } from "@/lib/hooks/usePokemon"
import { TYPE_CONSTANTS } from "@/lib/constants/types.constants"
import { FavoriteButton } from "@/components/shared/favorite-button"

// Componente para Fila Individual para poder fetchear la data
function PokemonTableRow({ p, index }: { p: NamedAPIResource, index: number }) {
    const id = getIdFromUrl(p.url)
    const { shinyMode } = useUIStore()
    const { data: details, isLoading } = usePokemon(id)

    const delay = index < 20 ? index * 0.03 : 0
    const primaryType = details?.types?.[0]?.type?.name || "normal"
    const color = TYPE_CONSTANTS[primaryType]?.color || "#111111"

    const totalStats = details?.stats?.reduce((acc: number, s: any) => acc + s.base_stat, 0) || 0
    const isHighTotal = totalStats >= 600

    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay }}
            whileHover="hover"
            className="group relative flex items-center bg-white border-2 border-[#111111] mb-2 px-4 py-2 hover:border-[#CC0000] hover:translate-x-[2px] transition-all duration-300 h-[64px]"
            style={{ boxShadow: "3px 3px 0 #111111" }}
            variants={{
                hover: { boxShadow: "4px 4px 0 #CC0000" }
            }}
        >
            {/* Línea lateral izquierda animada */}
            <motion.div
                className="absolute left-0 top-0 bottom-0 w-[4px] origin-bottom z-10"
                style={{ backgroundColor: color }}
                variants={{ hover: { scaleY: 1 } }}
                initial={{ scaleY: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />

            <div className="w-[60px] font-mono text-[12px] text-[#888888]">{formatPokemonId(id)}</div>
            <div className="w-[64px] flex justify-center -ml-4 mr-2">
                <motion.div variants={{ hover: { scale: 1.15 } }} transition={{ type: "spring" }}>
                    <PokemonSprite id={id} name={p.name} shiny={shinyMode} size={64} className="drop-shadow-none" />
                </motion.div>
            </div>
            <div className="flex-1 font-nunito text-[14px] font-bold text-[#111111] capitalize group-hover:text-[#CC0000] transition-colors">
                {formatPokemonName(p.name)}
            </div>
            <div className="w-[120px] hidden sm:flex gap-[4px] items-center">
                {details?.types?.map((t: any) => (
                    <div
                        key={t.type.name}
                        className="w-[20px] h-[20px] rounded-full border border-[#111111] flex items-center justify-center opacity-80"
                        style={{ backgroundColor: TYPE_CONSTANTS[t.type.name]?.color || "#111111" }}
                        title={t.type.name.toUpperCase()}
                    />
                ))}
            </div>
            <div className="w-[80px] text-right font-mono text-[13px] text-[#444444]">
                {totalStats > 0 ? (
                    <span className={isHighTotal ? "text-[#CC0000] font-bold" : ""}>
                        {totalStats} {isHighTotal && "✨"}
                    </span>
                ) : "-"}
            </div>
            <div className="w-[60px] flex justify-end">
                <div onClick={(e) => e.stopPropagation()} className="cursor-pointer">
                    <FavoriteButton pokemonId={id} />
                </div>
            </div>
        </motion.div>
    )
}

interface PokemonTableProps {
    pokemon: NamedAPIResource[];
    isLoading?: boolean;
}

export function PokemonTable({ pokemon, isLoading }: PokemonTableProps) {
    const [sortField, setSortField] = useQueryState("sort", { defaultValue: "id" })
    const [sortOrder, setSortOrder] = useQueryState("order", { defaultValue: "asc" })
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    const rowVirtualizer = useWindowVirtualizer({
        count: isLoading ? 20 : pokemon.length,
        estimateSize: () => 72, // 64 height + 8 margin
        overscan: 10,
    })

    const toggleSort = (field: string) => {
        if (sortField === field) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc")
        } else {
            setSortField(field)
            setSortOrder("asc")
        }
    }

    if (!isClient) return <div className="min-h-[100vh]" />

    return (
        <div className="w-full relative min-h-[100vh]">
            {/* HEADER COMPLETO */}
            <div className="flex items-center bg-[#111111] text-white px-4 py-3 mb-4 sticky top-[64px] z-20 shadow-[4px_4px_0_#CC0000]">
                <div
                    className="w-[60px] font-pixel text-[8px] cursor-pointer outline-none hover:text-[#CC0000] flex items-center gap-1"
                    onClick={() => toggleSort("id")}
                >
                    ID
                    {sortField === "id" && (
                        <motion.div animate={{ rotate: sortOrder === "asc" ? 180 : 0 }} className="inline-block">
                            <ChevronDown size={10} />
                        </motion.div>
                    )}
                </div>
                <div className="w-[64px] -ml-4 mr-2" />
                <div
                    className="flex-1 font-pixel text-[8px] cursor-pointer outline-none hover:text-[#CC0000] flex items-center gap-1"
                    onClick={() => toggleSort("name")}
                >
                    NOMBRE
                    {sortField === "name" && (
                        <motion.div animate={{ rotate: sortOrder === "asc" ? 180 : 0 }} className="inline-block">
                            <ChevronDown size={10} />
                        </motion.div>
                    )}
                </div>
                <div className="w-[120px] hidden sm:block font-pixel text-[8px]">TIPOS</div>
                <div className="w-[80px] text-right font-pixel text-[8px]">TOTAL</div>
                <div className="w-[60px]" />
            </div>

            {isLoading ? (
                <div className="w-full">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <div key={i} className="w-full h-[64px] bg-[#F2F2F2] border-2 border-[#E0E0E0] mb-2 overflow-hidden relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
                        </div>
                    ))}
                </div>
            ) : (
                <div style={{ height: `${rowVirtualizer.getTotalSize()}px`, width: '100%', position: 'relative' }}>
                    {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                        const p = pokemon[virtualRow.index]
                        return (
                            <div
                                key={virtualRow.key}
                                data-index={virtualRow.index}
                                ref={rowVirtualizer.measureElement}
                                className="absolute top-0 left-0 w-full"
                                style={{ transform: `translateY(${virtualRow.start}px)` }}
                            >
                                <PokemonTableRow p={p} index={virtualRow.index} />
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
