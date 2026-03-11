"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import * as Select from "@radix-ui/react-select"
import { ChevronDown, ChevronUp, X, ArrowUpDown, ArrowUp, ArrowDown, SlidersHorizontal } from "lucide-react"
import { Circle } from "lucide-react"
import { GiPunchBlast, GiStarShuriken } from "react-icons/gi"
import { TYPE_COLORS } from "@/lib/constants/types.constants"
import { DAMAGE_CLASS_LABELS, DAMAGE_CLASS_COLORS, GEN_ROMAN } from "@/lib/constants/moves.constants"

const TYPES = [
    "normal", "fire", "water", "electric", "grass", "ice", "fighting", "poison",
    "ground", "flying", "psychic", "bug", "rock", "ghost", "dragon", "dark", "steel", "fairy"
]

const TYPE_LABELS_ES: Record<string, string> = {
    normal: "Normal", fire: "Fuego", water: "Agua", electric: "Eléctrico",
    grass: "Planta", ice: "Hielo", fighting: "Lucha", poison: "Veneno",
    ground: "Tierra", flying: "Volador", psychic: "Psíquico", bug: "Bicho",
    rock: "Roca", ghost: "Fantasma", dragon: "Dragón", dark: "Siniestro",
    steel: "Acero", fairy: "Hada"
}

const GENERATIONS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"]

interface Props {
    typeFilter?: string | null
    classFilter?: string | null
    genFilter?: string | null
    minPow: number
    maxPow: number
    sortField?: string | null
    sortOrder?: string | null
    searchQuery?: string | null
    onTypeChange: (v: string | null) => void
    onClassChange: (v: string | null) => void
    onGenChange: (v: string | null) => void
    onPowerChange: (v: [number, number]) => void
    onSortChange: (v: string) => void
    onOrderChange: (v: string) => void
    onSearchChange?: (v: string | null) => void
    onClearAll: () => void
    children?: React.ReactNode
}

export function MoveFilterBar({
    typeFilter, classFilter, genFilter, minPow, maxPow,
    sortField, sortOrder, searchQuery,
    onTypeChange, onClassChange, onGenChange, onPowerChange,
    onSortChange, onOrderChange, onSearchChange, onClearAll,
    children
}: Props) {


    const activeCount = [typeFilter, classFilter, genFilter,
        (minPow > 0 || maxPow < 250) ? "power" : null,
        searchQuery
    ].filter(Boolean).length

    const classes = ["physical", "special", "status"] as const
    const classIcons = { physical: GiPunchBlast, special: GiStarShuriken, status: Circle }

    return (
        <div className="bg-white flex flex-col border-b border-[#E0E0E0]">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-3">

                {/* Active filter count badge */}
                <AnimatePresence>
                    {activeCount > 0 && (
                        <motion.div
                            className="flex-shrink-0 bg-[#CC0000] text-white font-press-start text-[7px] px-2 py-1 border border-[#111111]"
                            initial={{ scale: 0, x: -10 }}
                            animate={{ scale: 1, x: 0 }}
                            exit={{ scale: 0, x: -10 }}
                            transition={{ type: "spring", bounce: 0.5 }}
                        >
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={activeCount}
                                    initial={{ y: -8 }}
                                    animate={{ y: 0 }}
                                    exit={{ y: 8 }}
                                    transition={{ duration: 0.15 }}
                                >
                                    {activeCount} filtros
                                </motion.span>
                            </AnimatePresence>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* TYPE SELECT */}
                <Select.Root
                    value={typeFilter ?? "all"}
                    onValueChange={v => onTypeChange(v === "all" ? null : v)}
                >
                    <Select.Trigger className="flex-shrink-0 flex items-center gap-2 px-3 py-1.5 border font-nunito text-[12px] outline-none cursor-pointer transition-colors"
                        style={{
                            backgroundColor: typeFilter ? `${TYPE_COLORS[typeFilter]}22` : "#F2F2F2",
                            borderColor: typeFilter ? TYPE_COLORS[typeFilter] : "#E0E0E0",
                            color: typeFilter ? "#111111" : "#888888",
                        }}
                    >
                        {typeFilter ? (
                            <span className="font-bold">{TYPE_LABELS_ES[typeFilter]}</span>
                        ) : (
                            <span>Todos los tipos</span>
                        )}
                        <Select.Icon asChild>
                            <ChevronDown size={14} />
                        </Select.Icon>
                    </Select.Trigger>
                    <Select.Portal>
                        <Select.Content position="popper" side="bottom" align="start" sideOffset={8} className="bg-white border-2 border-[#111111] z-50 p-2" style={{ boxShadow: "4px 4px 0 #111111" }}>
                            <Select.Viewport>
                                <div className="font-press-start text-[7px] text-[#888888] px-2 py-1 border-b border-[#F2F2F2] mb-2">
                                    FILTRAR POR TIPO
                                </div>
                                <Select.Item value="all" className="flex items-center gap-1.5 px-2 py-1 text-[11px] font-nunito font-bold bg-[#F2F2F2] cursor-pointer mb-1 outline-none hover:bg-[#E0E0E0]">
                                    <Select.ItemText>Todos los tipos</Select.ItemText>
                                </Select.Item>
                                <div className="grid grid-cols-3 gap-1">
                                    {TYPES.map(t => (
                                        <Select.Item
                                            key={t}
                                            value={t}
                                            className="flex items-center gap-1 px-2 py-1 font-nunito text-[10px] font-bold text-white cursor-pointer outline-none hover:scale-105 transition-transform border-2 border-transparent hover:border-[#111111]"
                                            style={{ backgroundColor: TYPE_COLORS[t] }}
                                        >
                                            <Select.ItemText>{TYPE_LABELS_ES[t]}</Select.ItemText>
                                        </Select.Item>
                                    ))}
                                </div>
                            </Select.Viewport>
                        </Select.Content>
                    </Select.Portal>
                </Select.Root>

                {/* CLASS PILLS */}
                {classes.map(cls => {
                    const isActive = classFilter === cls
                    const colors = DAMAGE_CLASS_COLORS[cls]
                    const ClsIcon = classIcons[cls]
                    return (
                        <motion.button
                            key={cls}
                            onClick={() => onClassChange(isActive ? null : cls)}
                            className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 border-2 font-nunito text-[11px] font-bold transition-colors"
                            style={{
                                backgroundColor: isActive ? colors.bg : "#FFFFFF",
                                borderColor: isActive ? colors.border : "#E0E0E0",
                                color: isActive ? colors.text : "#888888",
                            }}
                            animate={{ scale: 1 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", bounce: 0.5 }}
                        >
                            <motion.div animate={{ rotate: isActive ? 360 : 0 }} transition={{ type: "spring", stiffness: 400, damping: 15 }}>
                                <ClsIcon size={12} />
                            </motion.div>
                            <span className="hidden sm:inline">{DAMAGE_CLASS_LABELS[cls]}</span>
                        </motion.button>
                    )
                })}

                {/* GEN SELECT */}
                <Select.Root
                    value={genFilter ?? "all"}
                    onValueChange={v => onGenChange(v === "all" ? null : v)}
                >
                    <Select.Trigger className="flex-shrink-0 flex items-center gap-1 px-2.5 py-1.5 border font-nunito text-[11px] outline-none cursor-pointer"
                        style={{
                            backgroundColor: genFilter ? "#111111" : "#F2F2F2",
                            borderColor: genFilter ? "#111111" : "#E0E0E0",
                            color: genFilter ? "#FFFFFF" : "#888888",
                        }}
                    >
                        {genFilter ? (
                            <span className="font-press-start text-[8px]">Gen {genFilter}</span>
                        ) : (
                            <span>Todas las gens</span>
                        )}
                        <Select.Icon asChild><ChevronDown size={12} /></Select.Icon>
                    </Select.Trigger>
                    <Select.Portal>
                        <Select.Content position="popper" side="bottom" align="start" sideOffset={8} className="bg-white border-2 border-[#111111] z-50 p-2" style={{ boxShadow: "4px 4px 0 #111111" }}>
                            <Select.Viewport>
                                <Select.Item value="all" className="px-3 py-1 font-nunito text-[11px] cursor-pointer hover:bg-[#F2F2F2] outline-none">
                                    <Select.ItemText>Todas las gens</Select.ItemText>
                                </Select.Item>
                                {GENERATIONS.map(g => (
                                    <Select.Item key={g} value={g} className="px-3 py-1 font-press-start text-[8px] cursor-pointer hover:bg-[#F2F2F2] outline-none">
                                        <Select.ItemText>Gen {g}</Select.ItemText>
                                    </Select.Item>
                                ))}
                            </Select.Viewport>
                        </Select.Content>
                    </Select.Portal>
                </Select.Root>

                {/* SORT FIELD */}
                <Select.Root
                    value={sortField ?? "id"}
                    onValueChange={onSortChange}
                >
                    <Select.Trigger className="flex-shrink-0 flex items-center gap-1 px-2.5 py-1.5 border border-[#E0E0E0] font-nunito text-[11px] text-[#888888] bg-[#F2F2F2] outline-none cursor-pointer">
                        <Select.Value />
                        <Select.Icon asChild><ChevronDown size={12} /></Select.Icon>
                    </Select.Trigger>
                    <Select.Portal>
                        <Select.Content position="popper" side="bottom" align="start" sideOffset={8} className="bg-white border-2 border-[#111111] z-50" style={{ boxShadow: "4px 4px 0 #111111" }}>
                            <Select.Viewport>
                                {[
                                    { value: "id", label: "N.° Dex" },
                                    { value: "name", label: "Nombre (A-Z)" },
                                    { value: "power", label: "Potencia" },
                                    { value: "accuracy", label: "Precisión" },
                                    { value: "pp", label: "PP" },
                                ].map(o => (
                                    <Select.Item key={o.value} value={o.value} className="px-3 py-1.5 font-nunito text-[12px] cursor-pointer hover:bg-[#F2F2F2] outline-none">
                                        <Select.ItemText>{o.label}</Select.ItemText>
                                    </Select.Item>
                                ))}
                            </Select.Viewport>
                        </Select.Content>
                    </Select.Portal>
                </Select.Root>

                {/* SORT ORDER TOGGLE */}
                <motion.button
                    onClick={() => onOrderChange(sortOrder === "asc" ? "desc" : "asc")}
                    className="flex-shrink-0 p-1.5 border border-[#E0E0E0] transition-colors"
                    style={{ backgroundColor: sortOrder === "desc" ? "#111111" : "#F2F2F2" }}
                    whileTap={{ scale: 0.9 }}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={sortOrder}
                            initial={{ y: sortOrder === "asc" ? 8 : -8, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: sortOrder === "asc" ? -8 : 8, opacity: 0 }}
                            transition={{ duration: 0.15 }}
                        >
                            {sortOrder === "desc"
                                ? <ArrowDown size={14} color="#FFFFFF" />
                                : <ArrowUp size={14} color="#888888" />
                            }
                        </motion.div>
                    </AnimatePresence>
                </motion.button>

                {/* CLEAR ALL */}
                <AnimatePresence>
                    {activeCount > 0 && (
                        <motion.button
                            onClick={onClearAll}
                            className="flex-shrink-0 flex items-center gap-1 font-nunito text-[12px] text-[#CC0000] hover:text-[#990000]"
                            initial={{ scale: 0, x: -10, opacity: 0 }}
                            animate={{ scale: 1, x: 0, opacity: 1 }}
                            exit={{ scale: 0, x: -10, opacity: 0 }}
                            transition={{ type: "spring", bounce: 0.5 }}
                        >
                            Limpiar
                            <motion.div whileHover={{ rotate: 90 }} transition={{ type: "spring", stiffness: 400 }}>
                                <X size={12} />
                            </motion.div>
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
            {children}
        </div>
    )
}
