"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeftRight } from "lucide-react"
import { ComparedPokemon } from "@/types/api/compare.types"
import { COMPARE_COLORS } from "@/lib/constants/compare.constants"
import { CompareSelector } from "./compare-selector"
import { CompareSelectorModal } from "./compare-selector-modal"
import { CompareShareButton } from "./compare-share-button"
import { CompareHistory } from "./compare-history"

interface CompareSlotsContainerProps {
    slots:       (string | null)[]
    pokemon:     (ComparedPokemon | null)[]
    loadingSlots: boolean[]
    shareUrl:    string
    onSetSlot:   (index: number, name: string | null) => void
    onClearAll:  () => void
}

export function CompareSlotsContainer({
    slots, pokemon, loadingSlots, shareUrl, onSetSlot, onClearAll
}: CompareSlotsContainerProps) {
    const [modalOpen, setModalOpen] = useState<number | null>(null)
    const filledCount = slots.filter(s => s !== null).length

    const handleSwap = (fromIndex: number, toIndex: number) => {
        const fromSlot = slots[fromIndex]
        const toSlot   = slots[toIndex]
        onSetSlot(fromIndex, toSlot)
        onSetSlot(toIndex, fromSlot)
    }

    return (
        <div>
            {/* Slot grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[0, 1, 2, 3].map(i => (
                    <CompareSelector
                        key={i}
                        index={i}
                        pokemon={pokemon[i]}
                        isLoading={loadingSlots[i]}
                        onAdd={() => setModalOpen(i)}
                        onClear={() => onSetSlot(i, null)}
                        onDrop={(fromIndex) => handleSwap(fromIndex, i)}
                    />
                ))}
            </div>

            {/* Quick swap buttons */}
            <div className="hidden md:flex gap-2 justify-center mt-3">
                {[0, 1, 2].map(i => {
                    const bothFilled = pokemon[i] && pokemon[i + 1]
                    if (!bothFilled) return null
                    return (
                        <AnimatePresence key={i}>
                            <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                onClick={() => handleSwap(i, i + 1)}
                                className="flex items-center gap-1 border-2 border-[#E0E0E0] px-3 py-1.5 hover:border-[#111111] hover:bg-[#F0F0F0] transition-all font-press-start text-[7px] text-gray-500"
                            >
                                <ArrowLeftRight className="w-3 h-3" />
                                {i + 1}↔{i + 2}
                            </motion.button>
                        </AnimatePresence>
                    )
                })}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 items-center mt-4">
                <CompareShareButton shareUrl={shareUrl} filledCount={filledCount} />
                {filledCount > 0 && (
                    <button
                        onClick={onClearAll}
                        className="font-press-start text-[8px] text-gray-500 border-2 border-[#E0E0E0] px-3 py-2 hover:border-[#CC0000] hover:text-[#CC0000] transition-all"
                    >
                        LIMPIAR TODO
                    </button>
                )}
            </div>

            {/* History */}
            <CompareHistory onRestore={(params) => {
                const p = new URLSearchParams(params)
                ;["p1","p2","p3","p4"].forEach((key, i) => {
                    onSetSlot(i, p.get(key) ?? null)
                })
            }} />

            {/* Modal */}
            {modalOpen !== null && (
                <CompareSelectorModal
                    isOpen={modalOpen !== null}
                    slotIndex={modalOpen}
                    currentSlots={slots}
                    onSelect={(name) => onSetSlot(modalOpen, name)}
                    onClose={() => setModalOpen(null)}
                />
            )}
        </div>
    )
}
