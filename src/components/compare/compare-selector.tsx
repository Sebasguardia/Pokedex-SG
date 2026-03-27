"use client"

import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, Loader2 } from "lucide-react"
import { ComparedPokemon } from "@/types/api/compare.types"
import {
    COMPARE_COLORS,
    formatPokemonName,
    getGenerationByPokemonId,
    GEN_LABELS,
} from "@/lib/constants/compare.constants"
import { TYPE_COLORS, TYPE_NAMES_ES, PIXEL_URL } from "@/lib/constants/team-builder.constants"

interface CompareSelectorProps {
    index:      number
    pokemon:    ComparedPokemon | null
    isLoading:  boolean
    onAdd:      () => void
    onClear:    () => void
    onDrop?:    (fromIndex: number) => void
}

export function CompareSelector({ index, pokemon, isLoading, onAdd, onClear, onDrop }: CompareSelectorProps) {
    const color = COMPARE_COLORS[index]

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = "move"
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        const fromIndex = parseInt(e.dataTransfer.getData("slotIndex"))
        if (!isNaN(fromIndex) && fromIndex !== index && onDrop) {
            onDrop(fromIndex)
        }
    }

    // ── Empty ─────────────────────────────────────────────────────────────────
    if (!pokemon && !isLoading) {
        return (
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onAdd}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="w-full min-h-[130px] border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-all duration-150 cursor-pointer"
                style={{ borderColor: color, backgroundColor: `${color}08` }}
            >
                <div
                    className="w-12 h-12 border-2 border-dashed flex items-center justify-center text-[24px] font-bold"
                    style={{ borderColor: color, color }}
                >
                    +
                </div>
                <span className="font-press-start text-[10px]" style={{ color }}>SLOT {index + 1}</span>
                <span className="font-nunito text-[15px] text-gray-400">Añadir Pokémon</span>
            </motion.button>
        )
    }

    // ── Loading ───────────────────────────────────────────────────────────────
    if (isLoading) {
        return (
            <div
                className="w-full min-h-[130px] border-2 border-[#111111] flex flex-col items-center justify-center gap-2"
                style={{ boxShadow: `3px 3px 0 ${color}` }}
            >
                <div className="h-1 w-full" style={{ backgroundColor: color }} />
                <Loader2 className="w-7 h-7 animate-spin text-gray-500" />
                <span className="font-nunito text-[15px] text-gray-400">Cargando...</span>
            </div>
        )
    }

    // ── Loaded ────────────────────────────────────────────────────────────────
    const p = pokemon!
    const gen = getGenerationByPokemonId(p.id)
    const bstPercent = Math.round((p.bst / 720) * 100)

    return (
        <motion.div
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="w-full border-2 border-[#111111] relative overflow-hidden"
            style={{ boxShadow: `3px 3px 0 ${color}` }}
            draggable
            onDragStart={(e: any) => e.dataTransfer?.setData("slotIndex", String(index))}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            {/* Color franja */}
            <div className="h-1 w-full" style={{ backgroundColor: color }} />

            <div className="p-3">
                {/* Header row */}
                <div className="flex justify-between items-start mb-2">
                    <span
                        className="font-press-start text-[8px] px-2 py-1 text-white"
                        style={{ backgroundColor: color }}
                    >
                        {GEN_LABELS[gen] ?? "GEN ?"}
                    </span>
                    <button
                        onClick={onClear}
                        className="text-gray-400 hover:text-[#CC0000] transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Animated Sprite */}
                <div className="flex flex-col items-center">
                    <div className="relative w-[80px] h-[80px]">
                        <Image
                            src={PIXEL_URL(p.id)}
                            alt={p.nameEs}
                            fill
                            className="object-contain"
                            style={{ 
                                filter: `drop-shadow(0 4px 10px ${color}55)`,
                                imageRendering: "pixelated" 
                            }}
                            unoptimized
                        />
                    </div>

                    {/* Name */}
                    <p className="font-press-start text-[11px] text-[#111111] mt-2 text-center leading-tight">
                        {p.nameEs.toUpperCase()}
                    </p>
                    <p className="font-jetbrains text-[12px] text-gray-400">#{String(p.id).padStart(4, "0")}</p>

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
                            className="mt-1 font-press-start text-[8px] px-2 py-1 text-white"
                            style={{ backgroundColor: p.isMythical ? "#8B5CF6" : "#F59E0B" }}
                        >
                            {p.isMythical ? "MÍTICO" : "LEGENDARIO"}
                        </span>
                    )}

                    {/* BST bar */}
                    <div className="w-full mt-3">
                        <div className="flex justify-between mb-0.5">
                            <span className="font-press-start text-[8px] text-gray-500">BST</span>
                            <span className="font-jetbrains text-[13px] font-bold" style={{ color }}>{p.bst}</span>
                        </div>
                        <div className="h-1.5 bg-gray-100 w-full">
                            <motion.div
                                className="h-full"
                                style={{ backgroundColor: color }}
                                initial={{ width: "0%" }}
                                animate={{ width: `${bstPercent}%` }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
