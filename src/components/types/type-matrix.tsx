"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Grid, X, Shield } from "lucide-react"
import * as ScrollArea from "@radix-ui/react-scroll-area"
import * as Tooltip from "@radix-ui/react-tooltip"
import { PokemonType } from "@/types/api/type.types"
import { TYPE_COLORS, TYPE_ORDER } from "@/lib/constants/types/types.constants"
import { TypeSvgIcon } from "@/components/shared/icons/type-svg-icon"

interface Props {
    currentType: string
    typeColor: string
    allTypes: PokemonType[]
}

function getDefenseMultiplier(attackerType: PokemonType, def1: PokemonType, def2?: PokemonType): number {
    let m1 = 1
    if (def1.damage_relations.double_damage_from.some(t => t.name === attackerType.name)) m1 = 2
    if (def1.damage_relations.half_damage_from.some(t => t.name === attackerType.name)) m1 = 0.5
    if (def1.damage_relations.no_damage_from.some(t => t.name === attackerType.name)) m1 = 0

    let m2 = 1
    if (def2) {
        if (def2.damage_relations.double_damage_from.some(t => t.name === attackerType.name)) m2 = 2
        if (def2.damage_relations.half_damage_from.some(t => t.name === attackerType.name)) m2 = 0.5
        if (def2.damage_relations.no_damage_from.some(t => t.name === attackerType.name)) m2 = 0
    }

    return m1 * m2
}

function getCellStyle(multi: number) {
    switch (multi) {
        case 4: return { bg: "#7F1D1D", color: "white" } // Dark red
        case 2: return { bg: "#DC2626", color: "white" } // Red
        case 0.5: return { bg: "#22C55E", color: "white" } // Green
        case 0.25: return { bg: "#14532D", color: "white" } // Dark green
        case 0: return { bg: "#111111", color: "white" } // Black
        default: return { bg: "#FFFFFF", color: "#E0E0E0" } // Empty/White
    }
}

const TYPE_NAMES_ES: Record<string, string> = {
    normal: "Normal",
    fighting: "Lucha",
    flying: "Volador",
    poison: "Veneno",
    ground: "Tierra",
    rock: "Roca",
    bug: "Bicho",
    ghost: "Fantasma",
    steel: "Acero",
    fire: "Fuego",
    water: "Agua",
    grass: "Planta",
    electric: "Eléctrico",
    psychic: "Psíquico",
    ice: "Hielo",
    dragon: "Dragón",
    dark: "Siniestro",
    fairy: "Hada",
    stellar: "Estelar",
    unknown: "Desconocido"
}

export function TypeMatrixSection({ currentType, typeColor, allTypes }: Props) {
    if (!allTypes || allTypes.length === 0) return null

    const currentTypeObj = allTypes.find(t => t.name === currentType)
    if (!currentTypeObj) return null

    const typeNameES = TYPE_NAMES_ES[currentType] || currentType

    // Ordered attacking types
    const attackingTypes = TYPE_ORDER.map(t => allTypes.find(a => a?.name === t)).filter(Boolean) as PokemonType[]

    // Ordered secondary types (some might be the same as currentType, we skip that to avoid Fire/Fire)
    const secondaryTypes = attackingTypes.filter(t => t.name !== currentType)

    return (
        <section className="py-12">
            <div className="flex items-center gap-3 mb-4">
                <span className="w-3 h-3 bg-[#CC0000] block shrink-0" />
                <h2 className="font-['Press_Start_2P'] text-[11px] text-[#111111] uppercase">DEBILIDADES Y RESISTENCIAS DE {typeNameES} (DOBLE)</h2>
            </div>
            <div className="h-[3px] bg-[#111111] w-full mb-6" />
            
            <p className="font-['Nunito'] text-[12px] text-[#888888] mb-6">
                Descubre qué tan resistente es el tipo {typeNameES.toUpperCase()} al combinarse con otros tipos. Las columnas son los tipos que atacan.
            </p>

            <div className="border-2 border-[#111111] bg-white p-4" style={{ boxShadow: "4px 4px 0 #111111" }}>
                <div className="flex justify-between items-center mb-4 pb-2 border-b border-[#E0E0E0]">
                    <div className="flex flex-wrap gap-4 font-['JetBrains_Mono'] text-[9px] font-bold text-[#111111]">
                        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-[#7F1D1D] inline-block"></span> ×4 (Súper débil)</span>
                        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-[#DC2626] inline-block"></span> ×2 (Débil)</span>
                        <span className="flex items-center gap-1"><span className="w-3 h-3 border border-[#E0E0E0] bg-white inline-block"></span> ×1 (Normal)</span>
                        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-[#22C55E] inline-block"></span> ×0.5 (Resiste)</span>
                        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-[#14532D] inline-block"></span> ×0.25 (Súper resiste)</span>
                    </div>
                </div>

                <ScrollArea.Root className="w-full h-[650px] overflow-hidden">
                    <ScrollArea.Viewport className="w-full h-full pb-4">
                        <DualMatrixTable
                            currentTypeObj={currentTypeObj}
                            typeColor={typeColor}
                            attackingTypes={attackingTypes}
                            secondaryTypes={secondaryTypes}
                        />
                    </ScrollArea.Viewport>
                    <ScrollArea.Scrollbar className="flex select-none touch-none p-0.5 bg-black/5 transition-colors duration-[160ms] hover:bg-black/10 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5" orientation="horizontal">
                        <ScrollArea.Thumb className="flex-1 bg-black/30 relative" />
                    </ScrollArea.Scrollbar>
                    <ScrollArea.Scrollbar className="flex select-none touch-none p-0.5 bg-black/5 transition-colors duration-[160ms] hover:bg-black/10 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5" orientation="vertical">
                        <ScrollArea.Thumb className="flex-1 bg-black/30 relative" />
                    </ScrollArea.Scrollbar>
                </ScrollArea.Root>
            </div>
        </section>
    )
}

function DualMatrixTable({ currentTypeObj, typeColor, attackingTypes, secondaryTypes }: any) {
    const [hoveredRow, setHoveredRow] = useState<number | null>(null)
    const [hoveredCol, setHoveredCol] = useState<number | null>(null)

    // Put 'Pure' type as the first row
    const rows = [{ type: currentTypeObj, secondary: null }, ...secondaryTypes.map((t: any) => ({ type: currentTypeObj, secondary: t }))]

    return (
        <Tooltip.Provider delayDuration={0}>
            <div
                className="grid gap-[1px] bg-[#E0E0E0] border border-[#E0E0E0] min-w-max"
                style={{ gridTemplateColumns: `140px repeat(18, minmax(36px, 1fr))` }}
                onMouseLeave={() => { setHoveredRow(null); setHoveredCol(null); }}
            >
                {/* CORNER CELL */}
                <div className="bg-[#FAFAFA] relative flex items-center justify-center h-12">
                    <svg className="absolute inset-0 w-full h-full text-[#E0E0E0]" preserveAspectRatio="none">
                        <line x1="0" y1="0" x2="100%" y2="100%" stroke="currentColor" strokeWidth="1" />
                    </svg>
                    <span className="absolute top-1 right-2 font-['Press_Start_2P'] text-[6px] text-[#888888] flex items-center gap-1">ATACANTES <Shield size={8} /></span>
                    <span className="absolute bottom-1 left-2 font-['Press_Start_2P'] text-[6px] text-[#888888]">DEFENSORES DOBLES</span>
                </div>

                {/* COLUMN HEADERS (Attackers) */}
                {attackingTypes.map((atkType: any) => {
                    const atkColor = TYPE_COLORS[atkType.name] || "#111111"
                    const atkNameES = TYPE_NAMES_ES[atkType.name] || atkType.name
                    return (
                        <div
                            key={`col-${atkType.name}`}
                            className="flex flex-col items-center justify-center pt-1 pb-1 transition-colors"
                            style={{ backgroundColor: atkColor }}
                        >
                            <TypeSvgIcon type={atkType.name} size={16} style={{ filter: `brightness(0) invert(1) drop-shadow(0px 1px 1px rgba(0,0,0,0.5))` }} />
                            <span className="font-['JetBrains_Mono'] text-[8px] uppercase font-bold mt-1 text-white" style={{ textShadow: "0px 1px 1px rgba(0,0,0,0.5)" }}>
                                {atkNameES.substring(0, 3)}
                            </span>
                        </div>
                    )
                })}

                {/* ROWS (Dual Type Defenders) */}
                {rows.map((rowDesc, r) => {
                    const def2 = rowDesc.secondary
                    const isPure = !def2
                    
                    const curNameES = TYPE_NAMES_ES[currentTypeObj.name] || currentTypeObj.name

                    return (
                        <React.Fragment key={`row-${def2 ? def2.name : 'pure'}`}>
                            {/* ROW HEADER */}
                            <div className="flex items-center justify-start px-2 bg-white border-r border-[#E0E0E0]">
                                {isPure ? (
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center gap-1 border border-black/20 px-1 py-0.5" style={{ backgroundColor: typeColor }}>
                                            <TypeSvgIcon type={currentTypeObj.name} size={12} style={{ filter: "brightness(0) invert(1)" }} />
                                            <span className="font-['Nunito'] text-[9px] font-bold text-white uppercase">{curNameES.substring(0, 3)}</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-1">
                                        <div className="flex items-center gap-1 border border-black/20 px-1 py-0.5 w-[52px]" style={{ backgroundColor: typeColor }}>
                                            <TypeSvgIcon type={currentTypeObj.name} size={10} style={{ filter: "brightness(0) invert(1)" }} />
                                            <span className="font-['Nunito'] text-[8px] font-bold text-white uppercase">{curNameES.substring(0, 3)}</span>
                                        </div>
                                        <span className="text-[#888888] font-['JetBrains_Mono'] text-[8px]">+</span>
                                        <div className="flex items-center gap-1 border border-black/20 px-1 py-0.5 w-[52px]" style={{ backgroundColor: TYPE_COLORS[def2.name] }}>
                                            <TypeSvgIcon type={def2.name} size={10} style={{ filter: "brightness(0) invert(1)" }} />
                                            <span className="font-['Nunito'] text-[8px] font-bold text-white uppercase">{(TYPE_NAMES_ES[def2.name] || def2.name).substring(0, 3)}</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* CELLS */}
                            {attackingTypes.map((atkType: any, c: number) => {
                                const multi = getDefenseMultiplier(atkType, currentTypeObj, def2)
                                const cellProps = getCellStyle(multi)

                                const isHoveredRow = hoveredRow === r
                                const isHoveredCol = hoveredCol === c
                                const isHighlighted = isHoveredRow || isHoveredCol
                                
                                const atkNameES = TYPE_NAMES_ES[atkType.name] || atkType.name

                                return (
                                    <Tooltip.Root key={`cell-${r}-${c}`}>
                                        <Tooltip.Trigger asChild>
                                            <motion.div
                                                className="flex items-center justify-center h-10 w-full cursor-crosshair transition-all relative"
                                                style={{
                                                    backgroundColor: (isHoveredRow && isHoveredCol) ? cellProps.bg : isHighlighted ? "#d4d4d4" : cellProps.bg,
                                                    color: (multi === 1 && !isHighlighted) ? "transparent" : cellProps.color,
                                                    zIndex: (isHoveredRow && isHoveredCol) ? 10 : 1,
                                                    boxShadow: (isHoveredRow && isHoveredCol) ? "0 0 0 2px #111111" : "none",
                                                    filter: isHighlighted && !(isHoveredRow && isHoveredCol) ? "brightness(0.95)" : "none"
                                                }}
                                                animate={{ scale: (isHoveredRow && isHoveredCol) ? 1.05 : 1 }}
                                                transition={{ duration: 0.15 }}
                                                onMouseEnter={() => { setHoveredRow(r); setHoveredCol(c); }}
                                            >
                                                <span className={`font-['JetBrains_Mono'] text-[10px] ${multi !== 1 ? 'font-bold' : ''}`}>
                                                    {multi === 1 ? '·' : `×${multi}`}
                                                </span>
                                            </motion.div>
                                        </Tooltip.Trigger>
                                        <Tooltip.Portal>
                                            <Tooltip.Content className="bg-[#111111] text-white px-3 py-2 text-[12px] font-['Nunito'] z-[1000] border border-white/20 shadow-xl" sideOffset={5}>
                                                <div className="font-bold border-b border-white/20 pb-2 mb-2 flex items-center gap-2">
                                                    <div className="flex items-center gap-1">
                                                        <TypeSvgIcon type={atkType.name} size={14} />
                                                        <span style={{ color: TYPE_COLORS[atkType.name] }} className="uppercase text-[10px]">{atkNameES}</span>
                                                    </div>
                                                    <span className="text-[#888888]">ataca a</span>
                                                    <div className="flex items-center gap-1">
                                                        <span style={{ color: typeColor }} className="uppercase text-[10px]">{curNameES}</span>
                                                        {def2 && <><span className="text-[#888888] text-[10px]">&</span><span style={{ color: TYPE_COLORS[def2.name] }} className="uppercase text-[10px]">{TYPE_NAMES_ES[def2.name] || def2.name}</span></>}
                                                    </div>
                                                </div>
                                                <div className="text-white/80">
                                                    Multiplicador: <strong className="text-white">×{multi}</strong>
                                                </div>
                                                <Tooltip.Arrow className="fill-[#111111]" />
                                            </Tooltip.Content>
                                        </Tooltip.Portal>
                                    </Tooltip.Root>
                                )
                            })}
                        </React.Fragment>
                    )
                })}
            </div>
        </Tooltip.Provider>
    )
}
