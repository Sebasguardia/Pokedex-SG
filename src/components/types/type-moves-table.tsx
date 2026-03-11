"use client"

import { forwardRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import * as ScrollArea from "@radix-ui/react-scroll-area"
import { useMove } from "@/lib/hooks/useMoves"

interface Props {
    moves: { name: string; url: string }[]
    typeName: string
    typeColor: string
    activeFilter: string
    onFilterChange: (filter: string) => void
}

export function TypeMovesTable({ moves, typeName, typeColor, activeFilter, onFilterChange }: Props) {
    const displayMoves = moves.slice(0, 30)

    return (
        <section className="py-8">
            <div className="flex items-center gap-3 mb-4">
                <h2 className="font-press-start text-[13px] text-[#111111]">MOVES DE TIPO {typeName.toUpperCase()}</h2>
                <div className="px-2 py-0.5 text-white font-jetbrains text-[10px] rounded-full" style={{ backgroundColor: typeColor }}>
                    {moves.length}
                </div>
            </div>
            <div className="h-px bg-[#E0E0E0] w-full mb-6" />

            <div className="flex flex-wrap gap-2 mb-6">
                {["all", "physical", "special", "status"].map((f) => {
                    const isActive = activeFilter === f
                    const label = f === "all" ? "Todos" : f === "physical" ? "Físico" : f === "special" ? "Especial" : "Estado"
                    return (
                        <button
                            key={f}
                            onClick={() => onFilterChange(f)}
                            className="px-4 py-1.5 font-nunito text-[11px] font-bold uppercase transition-colors border"
                            style={{
                                backgroundColor: isActive ? typeColor : "transparent",
                                borderColor: isActive ? typeColor : "#E0E0E0",
                                color: isActive ? "white" : "#888888"
                            }}
                        >
                            {label}
                        </button>
                    )
                })}
            </div>

            <ScrollArea.Root className="w-full border border-[#111111] overflow-hidden bg-white">
                <ScrollArea.Viewport className="w-full max-h-[500px]">
                    <div className="min-w-[600px]">
                        <div className="flex items-center h-10 px-4 font-press-start text-[7px] text-white" style={{ backgroundColor: typeColor }}>
                            <div className="w-[30%]">NOMBRE</div>
                            <div className="w-[20%] text-center">CLASE</div>
                            <div className="w-[15%] text-center">POTENCIA</div>
                            <div className="w-[15%] text-center">PRECISIÓN</div>
                            <div className="w-[10%] text-center">PP</div>
                            <div className="w-[10%] text-center">GEN</div>
                        </div>

                        <div className="flex flex-col">
                            <AnimatePresence mode="popLayout">
                                {displayMoves.map((m, idx) => (
                                    <TypeMoveRow
                                        key={m.name}
                                        moveName={m.name}
                                        typeColor={typeColor}
                                        isIconic={idx === 0}
                                        index={idx}
                                        activeFilter={activeFilter}
                                    />
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar className="flex select-none touch-none p-0.5 bg-black/5" orientation="vertical">
                    <ScrollArea.Thumb className="flex-1 bg-black/30 rounded relative" />
                </ScrollArea.Scrollbar>
            </ScrollArea.Root>

            <Link href={`/moves?type=${typeName}`}>
                <motion.div
                    className="flex items-center justify-center sm:justify-start gap-2 font-nunito text-[13px] font-bold text-[#111111] group mt-6 hover:underline"
                >
                    VER TODOS LOS MOVES ({moves.length})
                    <motion.div variants={{ default: { x: 0 }, hover: { x: 4 } }} initial="default" whileHover="hover">
                        <ArrowRight size={16} color={typeColor} />
                    </motion.div>
                </motion.div>
            </Link>
        </section>
    )
}

const TypeMoveRow = forwardRef<HTMLDivElement, any>(({ moveName, typeColor, isIconic, index, activeFilter }, ref) => {
    const { data: move } = useMove(moveName)

    if (!move) return <div ref={ref} className="h-12 border-b border-[#E0E0E0] animate-pulse bg-black/5" />

    const damageClass = move.damage_class?.name || "status"

    if (activeFilter !== "all" && damageClass !== activeFilter) {
        return null
    }

    const nameES = move.names?.find((n: any) => n.language.name === "es")?.name || move.name
    const powerColor = move.power && move.power > 80 ? "#CC0000" : move.power ? "#111111" : "#888888"
    const genLabel = move.generation?.name.split("-")[1]?.toUpperCase() || "I"

    return (
        <motion.div
            ref={ref}
            layout
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
            transition={{ delay: (index % 10) * 0.02, duration: 0.3 }}
            className={`group flex items-center h-12 px-4 border-b border-[#E0E0E0] transition-colors border-l-4 ${isIconic ? 'bg-opacity-10' : 'even:bg-white odd:bg-[#FAFAFA]'}`}
            style={{
                borderLeftColor: "transparent",
                backgroundColor: isIconic ? `${typeColor}15` : ""
            }}
            whileHover={{
                borderLeftColor: typeColor,
                backgroundColor: `${typeColor}08`
            }}
        >
            <div className="w-[30%] flex items-center gap-2">
                <Link href={`/moves/${move.name}`} className="font-nunito text-[13px] font-bold text-[#111111] hover:underline" style={{ color: '#111111' }}>
                    {nameES}
                </Link>
                {isIconic && (
                    <span className="bg-[#111111] text-white font-press-start text-[6px] px-1.5 py-1 rounded-sm tracking-wider">
                        ★ ÍCONO
                    </span>
                )}
            </div>

            <div className="w-[20%] flex justify-center">
                <span className="px-2 py-0.5 font-nunito text-[10px] uppercase font-bold text-white max-w-max" style={{ backgroundColor: damageClass === 'physical' ? '#E24040' : damageClass === 'special' ? '#4060E2' : '#888888' }}>
                    {damageClass === "physical" ? "Físico" : damageClass === "special" ? "Especial" : "Estado"}
                </span>
            </div>

            <div className="w-[15%] text-center font-jetbrains text-[12px] font-bold" style={{ color: powerColor }}>
                {move.power || "—"}
            </div>

            <div className="w-[15%] text-center font-jetbrains text-[12px] text-[#111111]">
                {move.accuracy ? `${move.accuracy}%` : "—"}
            </div>

            <div className="w-[10%] text-center font-jetbrains text-[12px] text-[#888888]">
                {move.pp}
            </div>

            <div className="w-[10%] text-center font-press-start text-[8px] text-[#888888]">
                {genLabel}
            </div>
        </motion.div>
    )
})

TypeMoveRow.displayName = "TypeMoveRow"
