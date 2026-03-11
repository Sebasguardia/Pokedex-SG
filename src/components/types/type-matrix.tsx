"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Grid, X, Info } from "lucide-react"
import * as ScrollArea from "@radix-ui/react-scroll-area"
import * as Tooltip from "@radix-ui/react-tooltip"
import { PokemonType } from "@/types/api/type.types"
import { TYPE_COLORS, TYPE_ORDER } from "@/lib/constants/types.constants"

interface Props {
    open: boolean
    onToggle: () => void
    currentType: string
    allTypes: PokemonType[]
}

export function TypeMatrixSection({ open, onToggle, currentType, allTypes }: Props) {
    const [hasAnimated, setHasAnimated] = useState(false)

    if (!allTypes || allTypes.length === 0) return null

    const handleToggle = () => {
        if (!open) setHasAnimated(true)
        onToggle()
    }

    return (
        <div className="py-8">
            <div className="flex justify-center mb-6">
                <button
                    onClick={handleToggle}
                    className="flex items-center gap-2 bg-[#111111] text-white font-nunito text-[13px] font-bold uppercase px-6 py-3 border-2 border-[#111111] transition-transform hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
                    style={{ boxShadow: open ? "none" : "4px 4px 0 #CC0000", transform: open ? "translate(4px, 4px)" : "none" }}
                >
                    {open ? <X size={16} /> : <Grid size={16} />}
                    {open ? "OCULTAR TABLA COMPLETA" : "MOSTRAR TABLA DE EFECTIVIDADES"}
                </button>
            </div>

            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 30 }}
                        className="overflow-hidden"
                    >
                        <div className="border border-[#E0E0E0] p-4 bg-white/50">
                            <ScrollArea.Root className="w-full h-[600px] overflow-hidden rounded">
                                <ScrollArea.Viewport className="w-full h-full">
                                    <TypeMatrixTable currentType={currentType} allTypes={allTypes} hasAnimated={hasAnimated} />
                                </ScrollArea.Viewport>
                                <ScrollArea.Scrollbar className="flex select-none touch-none p-0.5 bg-black/5 transition-colors duration-[160ms] ease-out hover:bg-black/10 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5" orientation="horizontal">
                                    <ScrollArea.Thumb className="flex-1 bg-black/30 rounded-[10px] relative before:content-[''] before:absolute before:top-1/4 before:left-1/4 before:w-1/2 before:h-1/2 before:min-w-[44px] before:min-h-[44px]" />
                                </ScrollArea.Scrollbar>
                                <ScrollArea.Scrollbar className="flex select-none touch-none p-0.5 bg-black/5 transition-colors duration-[160ms] ease-out hover:bg-black/10 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5" orientation="vertical">
                                    <ScrollArea.Thumb className="flex-1 bg-black/30 rounded-[10px] relative before:content-[''] before:absolute before:top-1/4 before:left-1/4 before:w-1/2 before:h-1/2 before:min-w-[44px] before:min-h-[44px]" />
                                </ScrollArea.Scrollbar>
                                <ScrollArea.Corner className="bg-black/5" />
                            </ScrollArea.Root>

                            <div className="mt-4 flex items-center justify-center gap-2 font-nunito text-[11px] text-[#888888] italic">
                                <Info size={12} />
                                <span>Los multiplicadores ×4 y ×0.25 solo ocurren en Pokémon de tipo dual</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

function TypeMatrixTable({ currentType, allTypes, hasAnimated }: { currentType: string, allTypes: PokemonType[], hasAnimated: boolean }) {
    // Ordered types
    const types = TYPE_ORDER.map(t => allTypes.find(a => a?.name === t)).filter(Boolean) as PokemonType[]

    const [hoveredRow, setHoveredRow] = useState<number | null>(null)
    const [hoveredCol, setHoveredCol] = useState<number | null>(null)

    return (
        <Tooltip.Provider delayDuration={200}>
            <div
                className="grid gap-[1px] bg-[#E0E0E0] border border-[#E0E0E0] mx-auto w-max"
                style={{ gridTemplateColumns: `repeat(19, minmax(36px, 1fr))` }}
                onMouseLeave={() => { setHoveredRow(null); setHoveredCol(null); }}
            >
                {/* CORNER CELL */}
                <div className="bg-[#FAFAFA] relative flex items-center justify-center h-10 w-12">
                    <svg className="absolute inset-0 w-full h-full text-[#E0E0E0]" preserveAspectRatio="none">
                        <line x1="0" y1="0" x2="100%" y2="100%" stroke="currentColor" strokeWidth="1" />
                    </svg>
                    <span className="absolute top-1 right-1 font-press-start text-[6px] text-[#888888]">DEF</span>
                    <span className="absolute bottom-1 left-1 font-press-start text-[6px] text-[#888888]">ATK</span>
                </div>

                {/* COLUMN HEADERS (Defenders) */}
                {types.map((t, idx) => (
                    <div
                        key={`col-${t.name}`}
                        className="flex items-center justify-center border-b-[3px] transition-colors"
                        style={{
                            backgroundColor: t.name === currentType ? "#111111" : "#FAFAFA",
                            borderBottomColor: TYPE_COLORS[t.name]
                        }}
                    >
                        <span className="font-nunito text-[10px] uppercase font-bold px-1" style={{ color: t.name === currentType ? "white" : "#111111" }}>
                            {t.name.substring(0, 3)}
                        </span>
                    </div>
                ))}

                {/* ROWS */}
                {types.map((atkType, r) => (
                    <React.Fragment key={`row-${atkType.name}`}>
                        {/* ROW HEADER (Attacker) */}
                        <div
                            className="flex items-center justify-center border-r-[3px] transition-colors"
                            style={{
                                backgroundColor: atkType.name === currentType ? "#111111" : "#FAFAFA",
                                borderRightColor: TYPE_COLORS[atkType.name]
                            }}
                        >
                            <span className="font-nunito text-[10px] uppercase font-bold" style={{ color: atkType.name === currentType ? "white" : "#111111" }}>
                                {atkType.name.substring(0, 3)}
                            </span>
                        </div>

                        {/* CELLS */}
                        {types.map((defType, c) => {
                            const multi = getMultiplier(atkType, defType)
                            const cellProps = getCellStyle(multi)

                            const isHovered = hoveredRow === r && hoveredCol === c
                            const isHighlighted = hoveredRow === r || hoveredCol === c

                            return (
                                <Tooltip.Root key={`cell-${r}-${c}`}>
                                    <Tooltip.Trigger asChild>
                                        <motion.div
                                            className="flex items-center justify-center h-10 w-12 cursor-crosshair transition-all relative"
                                            style={{
                                                backgroundColor: isHovered ? cellProps.bg : isHighlighted ? "#d4d4d4" : cellProps.bg,
                                                color: cellProps.color,
                                                zIndex: isHovered ? 10 : 1,
                                                boxShadow: isHovered ? "0 0 0 2px #CC0000" : "none",
                                                filter: isHighlighted && !isHovered ? "brightness(0.95)" : "none"
                                            }}
                                            initial={hasAnimated ? false : { opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: isHovered ? 1.05 : 1 }}
                                            transition={{
                                                duration: 0.15,
                                                delay: hasAnimated ? 0 : (r + c) * 0.008
                                            }}
                                            onMouseEnter={() => { setHoveredRow(r); setHoveredCol(c); }}
                                        >
                                            <span className={`font-jetbrains text-[10px] ${multi !== 1 ? 'font-bold' : ''}`}>
                                                {multi === 1 ? '1' : `×${multi}`}
                                            </span>
                                        </motion.div>
                                    </Tooltip.Trigger>
                                    <Tooltip.Portal>
                                        <Tooltip.Content className="bg-[#111111] text-white px-3 py-2 text-[12px] font-nunito z-[1000] border border-white/20 shadow-xl" sideOffset={5}>
                                            <div className="font-bold border-b border-white/20 pb-1 mb-1">
                                                <span style={{ color: TYPE_COLORS[atkType.name] }} className="uppercase">{atkType.name}</span> → <span style={{ color: TYPE_COLORS[defType.name] }} className="uppercase">{defType.name}</span>
                                            </div>
                                            <div className="text-white/80">
                                                Multiplicador de daño: <strong className="text-white">×{multi}</strong>
                                            </div>
                                            <Tooltip.Arrow className="fill-[#111111]" />
                                        </Tooltip.Content>
                                    </Tooltip.Portal>
                                </Tooltip.Root>
                            )
                        })}
                    </React.Fragment>
                ))}
            </div>
        </Tooltip.Provider>
    )
}

function getMultiplier(attack: PokemonType, defense: PokemonType): number {
    if (attack.damage_relations.double_damage_to.some(t => t.name === defense.name)) return 2
    if (attack.damage_relations.half_damage_to.some(t => t.name === defense.name)) return 0.5
    if (attack.damage_relations.no_damage_to.some(t => t.name === defense.name)) return 0
    return 1
}

function getCellStyle(multi: number) {
    switch (multi) {
        case 4: return { bg: "#15803D", color: "white" }
        case 2: return { bg: "#22C55E", color: "white" }
        case 0.5: return { bg: "#F97316", color: "white" }
        case 0.25: return { bg: "#DC2626", color: "white" }
        case 0: return { bg: "#111111", color: "white" }
        default: return { bg: "#FFFFFF", color: "#888888" }
    }
}
