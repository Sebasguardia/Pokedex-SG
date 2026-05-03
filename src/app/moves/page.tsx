"use client"

import { Suspense, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { LayoutGrid, Table2, Search, X } from "lucide-react"
import { GiPunchBlast } from "react-icons/gi"
import { useMovesStore } from "@/lib/store/useMovesStore"
import Link from "next/link"
import { useMovesFull } from "@/lib/hooks/moves/useMovesList"
import { MoveRow } from "@/components/moves/move-row"
import { MoveCard } from "@/components/moves/move-card"
import { MoveFilterBar } from "@/components/moves/move-filter-bar"
import { PageTransitionMoves } from "@/components/shared/page-transitions/moves/page-transition-moves"
import { DAMAGE_CLASS_COLORS } from "@/lib/constants/moves/moves.constants"
import { GiStarShuriken } from "react-icons/gi"
import { Circle } from "lucide-react"

function MovesContent() {
    const searchRef = useRef<HTMLInputElement>(null)
    const {
        viewMode, setViewMode,
        typeFilter, setTypeFilter,
        classFilter, setClassFilter,
        genFilter, setGenFilter,
        minPow, setMinPow,
        maxPow, setMaxPow,
        sortField, setSortField,
        sortOrder, setSortOrder,
        search, setSearch,
        clearAllFilters
    } = useMovesStore()

    const { data, totalCount, loadedCount, isLoading, isLoadingMore, loadProgress } = useMovesFull({
        type: typeFilter,
        damageClass: classFilter,
        generation: genFilter,
        minPower: parseInt(minPow),
        maxPower: parseInt(maxPow),
        sort: sortField,
        order: sortOrder,
        search,
    })

    const currentMoves = data?.results ?? []

    const classes = [
        { key: "physical", label: "Físico", Icon: GiPunchBlast },
        { key: "special", label: "Especial", Icon: GiStarShuriken },
        { key: "status", label: "Estado", Icon: Circle },
    ] as const

    return (
        <>
            <PageTransitionMoves />

            <motion.main
                className="max-w-[1440px] mx-auto px-4 sm:px-6 py-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
            >
                {/* ── HEADER ─────────────────────────────────────────── */}
                <motion.div
                    className="pb-6 border-b-2 border-[#111111] relative mb-6"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.35, ease: "easeOut" }}
                >
                    {/* Línea roja debajo del borde */}
                    <motion.div
                        className="absolute bottom-[-2px] left-0 h-[2px] bg-[#CC0000] w-full origin-left"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.05, duration: 0.35, ease: "easeOut" }}
                    />


                    {/* FILA PRINCIPAL */}
                    <div className="flex justify-between items-end flex-wrap gap-4">
                        {/* LADO IZQUIERDO */}
                        <div className="flex items-center gap-4">
                            {/* Barra vertical roja */}
                            <motion.div
                                className="w-[4px] h-[32px] bg-[#CC0000] origin-top"
                                initial={{ scaleY: 0 }}
                                animate={{ scaleY: 1 }}
                                transition={{ delay: 0.15, duration: 0.3, ease: "easeOut" }}
                            />

                            <div className="flex items-center gap-3">
                                <h1 className="font-pixel text-[14px] md:text-[22px] text-[#111111] leading-none m-0 uppercase">
                                    Movimientos
                                </h1>

                                {/* COUNT BADGE — igual al de Pokédex */}
                                <motion.div
                                    key={`badge-${totalCount}`}
                                    className="bg-[#CC0000] text-white font-pixel text-[8px] px-[12px] py-[5px] border-2 border-[#111111] flex items-center h-[24px]"
                                    style={{ boxShadow: "2px 2px 0 #111111" }}
                                    initial={{ scale: 1, backgroundColor: "#CC0000" }}
                                    animate={{
                                        scale: [1, 1.25, 1],
                                        backgroundColor: ["#CC0000", "#990000", "#CC0000"]
                                    }}
                                    transition={{
                                        scale: { duration: 0.3, ease: "easeInOut" },
                                        backgroundColor: { duration: 0.2 }
                                    }}
                                >
                                    <motion.div
                                        key={`text-${totalCount}`}
                                        initial={{ y: -12, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.2, ease: "easeOut" }}
                                    >
                                        {isLoading ? "..." : totalCount}
                                    </motion.div>
                                </motion.div>
                            </div>
                        </div>

                        {/* LADO DERECHO — filtros rápidos de clase */}
                        <div className="flex items-center gap-2">
                            {classes.map(({ key, label, Icon }, i) => {
                                const colors = DAMAGE_CLASS_COLORS[key]
                                const isActive = classFilter === key
                                return (
                                    <motion.button key={key}
                                        onClick={() => setClassFilter(isActive ? null : key)}
                                        className="flex items-center gap-1.5 px-3 py-1.5 font-nunito text-[11px] font-bold border-2 transition-all"
                                        style={{
                                            backgroundColor: isActive ? colors.bg : "#F8F8F8",
                                            borderColor: isActive ? "#111111" : "#E0E0E0",
                                            color: isActive ? colors.text : "#888888",
                                            boxShadow: isActive ? "2px 2px 0 #111111" : "none"
                                        }}
                                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                                        transition={{ delay: 0.1 + i * 0.06, type: "spring", bounce: 0.5 }}
                                        whileHover={{ borderColor: "#111111", boxShadow: "2px 2px 0 #111111" }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Icon size={12} />
                                        <span className="hidden md:inline">{label}</span>
                                    </motion.button>
                                )
                            })}

                            {/* View toggle — igual al de Pokédex */}
                            <div className="flex border-2 border-[#111111] ml-2" style={{ boxShadow: "2px 2px 0 #111111" }}>
                                {([
                                    { mode: "table" as const, Icon: Table2 },
                                    { mode: "cards" as const, Icon: LayoutGrid },
                                ]).map(({ mode, Icon }) => (
                                    <motion.button key={mode}
                                        onClick={() => setViewMode(mode)}
                                        className="w-[36px] h-[36px] flex items-center justify-center border-r last:border-r-0 border-[#111111] transition-colors"
                                        style={{ backgroundColor: viewMode === mode ? "#111111" : "#FFFFFF" }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <motion.div
                                            animate={viewMode === mode ? { scale: [0.6, 1], rotate: [-15, 0] } : {}}
                                            transition={{ type: "spring" }}
                                        >
                                            <Icon size={17} color={viewMode === mode ? "#FFFFFF" : "#888888"} />
                                        </motion.div>
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Loading progress bar */}
                    {isLoadingMore && (
                        <div className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-[#F2F2F2] overflow-hidden">
                            <motion.div className="h-full bg-[#CC0000]"
                                animate={{ width: `${loadProgress}%` }}
                                transition={{ duration: 0.4, ease: "easeOut" }} />
                        </div>
                    )}
                </motion.div>


                {/* ── SEARCH BAR ────────────────────────────────────── */}
                <div className="mb-4">
                    <div className="flex items-center border-2 border-[#111111] bg-white"
                        style={{ boxShadow: "4px 4px 0 #111111" }}
                        onClick={() => searchRef.current?.focus()}
                    >
                        <div className="flex items-center gap-2 px-4 py-3 flex-1">
                            <Search size={16} color="#CC0000" className="shrink-0" />
                            <input
                                ref={searchRef}
                                type="text"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Buscar movimiento por nombre..."
                                className="flex-1 font-nunito text-[14px] text-[#111111] outline-none placeholder:text-[#AAAAAA] bg-transparent"
                            />
                        </div>
                        {search && (
                            <motion.button
                                initial={{ scale: 0 }} animate={{ scale: 1 }}
                                onClick={() => setSearch("")}
                                className="px-4 py-3 border-l-2 border-[#111111] hover:bg-[#CC0000] hover:text-white transition-colors"
                                aria-label="Limpiar búsqueda"
                            >
                                <X size={16} />
                            </motion.button>
                        )}
                        {/* Retro accent */}
                        <div className="px-3 py-3 border-l-2 border-[#111111] bg-[#111111]">
                            <span className="font-press-start text-[7px] text-white">BUSCAR</span>
                        </div>
                    </div>
                </div>

                {/* ── FILTER BAR ────────────────────────────────────── */}
                <MoveFilterBar
                    typeFilter={typeFilter} onTypeChange={setTypeFilter}
                    classFilter={classFilter} onClassChange={setClassFilter}
                    genFilter={genFilter} onGenChange={setGenFilter}
                    minPow={parseInt(minPow)} maxPow={parseInt(maxPow)}
                    onPowerChange={([mn, mx]) => { setMinPow(String(mn)); setMaxPow(String(mx)) }}
                    sortField={sortField} onSortChange={setSortField}
                    sortOrder={sortOrder} onOrderChange={setSortOrder}
                    onClearAll={clearAllFilters}
                >
                    {/* Table header inside filter bar */}
                    {viewMode === "table" && !isLoading && currentMoves.length > 0 && (
                        <div className="mt-1">
                            <div className="grid font-press-start text-[10px] text-white bg-[#111111] px-3 h-12 items-center"
                                style={{ gridTemplateColumns: "60px 1fr 110px 95px 80px 70px 55px 60px" }}>
                                <div>ID</div>
                                <div>NOMBRE / DESCRIPCIÓN</div>
                                <div>TIPO</div>
                                <div>CLASE</div>
                                <div className="text-center">POT.</div>
                                <div className="text-center">PREC.</div>
                                <div className="text-center">PP</div>
                                <div className="text-center">GEN</div>
                            </div>
                            <motion.div className="h-[2px] bg-[#CC0000]"
                                style={{ transformOrigin: "left" }}
                                initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                                transition={{ duration: 0.4 }} />
                        </div>
                    )}
                </MoveFilterBar>



                {/* ── CONTENT ───────────────────────────────────────── */}
                <AnimatePresence mode="wait">
                    {isLoading ? (
                        <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <div className="border-2 border-[#E0E0E0]">
                                <div className="h-10 bg-[#111111]" />
                                {Array.from({ length: 12 }).map((_, i) => (
                                    <div key={i} className="h-[58px] border-b border-[#E0E0E0] px-4 flex items-center gap-4 animate-pulse"
                                        style={{ backgroundColor: i % 2 === 0 ? "#FFFFFF" : "#FAFAFA" }}>
                                        <div className="w-8 h-3 bg-[#E0E0E0]" />
                                        <div className="flex-1 h-4 bg-[#E0E0E0]" />
                                        <div className="w-28 h-4 bg-[#E0E0E0]" />
                                        <div className="w-20 h-4 bg-[#E0E0E0]" />
                                        <div className="w-14 h-3 bg-[#E0E0E0]" />
                                        <div className="w-10 h-3 bg-[#E0E0E0]" />
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ) : currentMoves.length === 0 ? (
                        <motion.div key="empty" className="flex flex-col items-center justify-center py-28 gap-4"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <motion.div animate={{ rotate: [0, -20, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                                <GiPunchBlast size={64} color="#E0E0E0" />
                            </motion.div>
                            <motion.p className="font-press-start text-[10px] text-[#AAAAAA]"
                                animate={{ opacity: [0, 1, 1, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                                ¡Fallo!
                            </motion.p>
                            <h2 className="font-press-start text-[12px] text-[#888888]">Ningún movimiento encontrado</h2>
                            <p className="font-nunito text-[14px] text-[#AAAAAA]">Prueba con otros filtros o búsqueda</p>
                            <motion.button onClick={clearAllFilters}
                                className="mt-2 px-5 py-2 bg-[#CC0000] text-white font-nunito text-[13px] font-black border-2 border-[#111111]"
                                style={{ boxShadow: "3px 3px 0 #111111" }}
                                whileHover={{ x: -1, y: -1, boxShadow: "4px 4px 0 #111111" }}
                                whileTap={{ x: 0, y: 0, boxShadow: "1px 1px 0 #111111" }}>
                                Limpiar todo
                            </motion.button>
                        </motion.div>
                    ) : viewMode === "table" ? (
                        <motion.div key="table" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                            <div className="flex flex-col border-2 border-t-0 border-[#E0E0E0]">
                                {currentMoves.map((move, idx) => (
                                    <MoveRow key={move.id} move={move} index={idx} isFirst={idx < 20} sequentialNumber={idx + 1} />
                                ))}
                            </div>
                            {isLoadingMore && (
                                <div className="py-6 flex items-center justify-center gap-3 border-2 border-t-0 border-[#E0E0E0]">
                                    <motion.div className="w-2 h-2 bg-[#CC0000]"
                                        animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 0.6, repeat: Infinity }} />
                                    <span className="font-nunito text-[13px] text-[#888888]">Cargando más movimientos...</span>
                                </div>
                            )}
                        </motion.div>
                    ) : (
                        <motion.div key="cards" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-1"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                            {currentMoves.map((move, i) => (
                                <MoveCard key={move.id} move={move} index={i} />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.main>
        </>
    )
}

export default function MovesPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-white animate-pulse" />}>
            <MovesContent />
        </Suspense>
    )
}
