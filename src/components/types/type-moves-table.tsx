"use client"

import { forwardRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Swords } from "lucide-react"
import Link from "next/link"
import * as ScrollArea from "@radix-ui/react-scroll-area"
import { useMove } from "@/lib/hooks/moves/useMoves"

interface Props {
    moves: { name: string; url: string }[]
    typeName: string
    typeColor: string
    activeFilter: string
    onFilterChange: (filter: string) => void
}

const TYPE_NAMES_ES: Record<string, string> = {
    normal: "Normal", fighting: "Lucha", flying: "Volador", poison: "Veneno",
    ground: "Tierra", rock: "Roca", bug: "Bicho", ghost: "Fantasma",
    steel: "Acero", fire: "Fuego", water: "Agua", grass: "Planta",
    electric: "Eléctrico", psychic: "Psíquico", ice: "Hielo", dragon: "Dragón",
    dark: "Siniestro", fairy: "Hada"
}

export function TypeMovesTable({ moves, typeName, typeColor, activeFilter, onFilterChange }: Props) {
    const displayMoves = moves.slice(0, 30)
    const typeNameES = TYPE_NAMES_ES[typeName] || typeName.toUpperCase()

    return (
        <section className="py-10">
            <div className="flex items-center gap-3 mb-4">
                <span className="w-3 h-3 bg-[#CC0000] block shrink-0" />
                <h2 className="font-['Press_Start_2P'] text-[12px] text-[#111111] uppercase">MOVIMIENTOS DE TIPO {typeNameES}</h2>
                <div 
                    className="px-2 py-0.5 text-white font-['JetBrains_Mono'] text-[11px] font-bold border-2 border-[#111111] shrink-0" 
                    style={{ backgroundColor: typeColor, boxShadow: "2px 2px 0 #111111" }}
                >
                    {moves.length}
                </div>
            </div>
            <div className="h-[3px] bg-[#111111] w-full mb-8" />

            {/* Brutalist Filters */}
            <div className="flex flex-wrap gap-3 mb-8">
                {["all", "physical", "special", "status"].map((f) => {
                    const isActive = activeFilter === f
                    const label = f === "all" ? "Todos" : f === "physical" ? "Físico" : f === "special" ? "Especial" : "Estado"
                    return (
                        <button
                            key={f}
                            onClick={() => onFilterChange(f)}
                            className={`px-4 py-2 font-['JetBrains_Mono'] text-[11px] font-extrabold uppercase transition-all border-2 border-[#111111] ${
                                isActive ? "translate-x-[2px] translate-y-[2px]" : ""
                            }`}
                            style={{
                                backgroundColor: isActive ? typeColor : "#FFFFFF",
                                color: isActive ? "#FFFFFF" : "#111111",
                                boxShadow: isActive ? "none" : "3px 3px 0 #111111"
                            }}
                        >
                            {label}
                        </button>
                    )
                })}
            </div>

            {/* Brutalist Table Wrapper */}
            <ScrollArea.Root 
                className="w-full border-2 border-[#111111] overflow-hidden bg-white"
                style={{ boxShadow: "5px 5px 0 #111111" }}
            >
                <ScrollArea.Viewport className="w-full max-h-[500px]">
                    <div className="min-w-[700px]">
                        {/* Table Header */}
                        <div className="flex items-center h-12 px-5 font-['Press_Start_2P'] text-[8px] text-white bg-[#111111] sticky top-0 z-20 border-b-2 border-[#111111]">
                            <div className="w-[30%]">NOMBRE DEL MOVIMIENTO</div>
                            <div className="w-[20%] text-center">CATEGORÍA</div>
                            <div className="w-[15%] text-center">POTENCIA</div>
                            <div className="w-[15%] text-center">PRECISIÓN</div>
                            <div className="w-[10%] text-center">PP</div>
                            <div className="w-[10%] text-center">GEN</div>
                        </div>

                        {/* Table Body */}
                        <div className="flex flex-col bg-[#FAFAFA]">
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
                <ScrollArea.Scrollbar className="flex select-none touch-none p-0.5 bg-[#111111] w-3" orientation="vertical">
                    <ScrollArea.Thumb className="flex-1 bg-white border-2 border-[#111111]" />
                </ScrollArea.Scrollbar>
            </ScrollArea.Root>

            <Link href={`/moves?type=${typeName}`}>
                <motion.div
                    className="inline-flex items-center gap-3 px-5 py-3 mt-8 bg-white border-2 border-[#111111] font-['JetBrains_Mono'] text-[12px] font-extrabold text-[#111111] uppercase tracking-wider group cursor-pointer"
                    style={{ boxShadow: "4px 4px 0 #111111" }}
                    whileHover={{ x: -2, y: -2, boxShadow: `6px 6px 0 ${typeColor}` }}
                    whileTap={{ x: 2, y: 2, boxShadow: "0px 0px 0 transparent" }}
                >
                    <Swords size={16} color={typeColor} />
                    EXPLORAR LOS {moves.length} Aataques
                    <motion.div variants={{ default: { x: 0 }, hover: { x: 6 } }} initial="default" whileHover="hover">
                        <ArrowRight size={16} className="text-[#111111]" />
                    </motion.div>
                </motion.div>
            </Link>
        </section>
    )
}

const TypeMoveRow = forwardRef<HTMLDivElement, any>(({ moveName, typeColor, isIconic, index, activeFilter }, ref) => {
    const { data: move } = useMove(moveName)

    if (!move) return <div ref={ref} className="h-16 border-b-2 border-[#111111] animate-pulse bg-black/5" />

    const damageClass = move.damage_class?.name || "status"

    if (activeFilter !== "all" && damageClass !== activeFilter) {
        return null
    }

    const nameES = move.names?.find((n: any) => n.language.name === "es")?.name || move.name
    const genLabel = move.generation?.name.split("-")[1]?.toUpperCase() || "I"

    // Colors for the brutalist tags
    const classColors = {
        physical: { bg: "#E24040", text: "#FFFFFF" },
        special: { bg: "#4060E2", text: "#FFFFFF" },
        status: { bg: "#DDDDDD", text: "#111111" }
    }
    const currentClassStyle = classColors[damageClass as keyof typeof classColors] || classColors.status

    return (
        <motion.div
            ref={ref}
            layout
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            transition={{ delay: (index % 10) * 0.04, duration: 0.3 }}
            className={`group flex items-center h-16 px-5 border-b-2 border-[#111111] bg-white transition-colors relative overflow-hidden hover:bg-[#F0F0F0]`}
        >
            {/* Destello lateral sutil al hacer hover */}
            <div className="absolute left-0 top-0 bottom-0 w-1 opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: typeColor }} />

            <div className="w-[30%] flex items-center gap-3 relative z-10">
                <Link href={`/moves/${move.name}`} className="font-['Nunito'] text-[15px] font-black text-[#111111] hover:underline hover:text-[#CC0000] capitalize">
                    {nameES}
                </Link>
                {isIconic && (
                    <span className="bg-[#FFD700] border-2 border-[#111111] text-[#111111] font-['Press_Start_2P'] text-[6px] px-1.5 py-1 tracking-wider" style={{ boxShadow: "2px 2px 0 #111111" }}>
                        ★ ÍCONO
                    </span>
                )}
            </div>

            <div className="w-[20%] flex justify-center relative z-10">
                <span 
                    className="px-2 py-1 font-['JetBrains_Mono'] text-[10px] font-extrabold uppercase border-2 border-[#111111]" 
                    style={{ 
                        backgroundColor: currentClassStyle.bg, 
                        color: currentClassStyle.text,
                        boxShadow: "2px 2px 0 #111111"
                    }}
                >
                    {damageClass === "physical" ? "Físico" : damageClass === "special" ? "Especial" : "Estado"}
                </span>
            </div>

            <div className="w-[15%] text-center relative z-10">
                <span className={`font-['JetBrains_Mono'] text-[14px] font-black ${move.power && move.power > 80 ? 'text-[#CC0000]' : 'text-[#111111]'}`}>
                    {move.power || "—"}
                </span>
            </div>

            <div className="w-[15%] text-center font-['JetBrains_Mono'] text-[13px] font-bold text-[#555555] relative z-10">
                {move.accuracy ? `${move.accuracy}%` : "—"}
            </div>

            <div className="w-[10%] text-center font-['JetBrains_Mono'] text-[13px] font-bold text-[#888888] relative z-10">
                {move.pp}
            </div>

            <div className="w-[10%] text-center font-['Press_Start_2P'] text-[9px] text-[#888888] relative z-10">
                {genLabel}
            </div>
        </motion.div>
    )
})

TypeMoveRow.displayName = "TypeMoveRow"

