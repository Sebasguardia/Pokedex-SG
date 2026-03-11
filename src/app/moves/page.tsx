"use client"

import { useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { LayoutGrid, Table2, GripVertical } from "lucide-react"
import { GiPunchBlast } from "react-icons/gi"
import { useMovesStore } from "@/lib/store/useMovesStore"
import Link from "next/link"
import { useMovesList } from "@/lib/hooks/useMovesList"
import { MoveRow } from "@/components/moves/move-row"
import { MoveCard } from "@/components/moves/move-card"
import { MoveFilterBar } from "@/components/moves/move-filter-bar"
import { PageTransitionMoves } from "@/components/shared/page-transition-moves"
import { DAMAGE_CLASS_COLORS, DAMAGE_CLASS_LABELS } from "@/lib/constants/moves.constants"
import { GiStarShuriken } from "react-icons/gi"
import { Circle } from "lucide-react"

const ITEMS_PER_PAGE = 60

export default function MovesPage() {
    const prefersRM = useReducedMotion()
    const {
        viewMode, setViewMode,
        typeFilter, setTypeFilter,
        classFilter, setClassFilter,
        genFilter, setGenFilter,
        minPow, setMinPow,
        maxPow, setMaxPow,
        sortField, setSortField,
        sortOrder, setSortOrder,
        page, setPage,
        clearAllFilters
    } = useMovesStore()

    const { data, isLoading, isFetching } = useMovesList({
        type: typeFilter,
        damageClass: classFilter,
        generation: genFilter,
        minPower: parseInt(minPow),
        maxPower: parseInt(maxPow),
        sort: sortField,
        order: sortOrder,
        page: parseInt(page),
        limit: ITEMS_PER_PAGE,
    })

    const currentMoves = data?.results ?? []
    const totalCount = data?.count ?? 0
    const totalPages = Math.max(1, Math.ceil(totalCount / ITEMS_PER_PAGE))
    const currentPage = parseInt(page)

    const classes = [
        { key: "physical", label: "Físico", Icon: GiPunchBlast },
        { key: "special", label: "Especial", Icon: GiStarShuriken },
        { key: "status", label: "Estado", Icon: Circle },
    ] as const

    return (
        <>
            <PageTransitionMoves />

            <motion.main
                className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.4 }}
            >
                {/* ── PAGE HEADER ─────────────────────────────────── */}
                <div className="pb-7">
                    {/* Breadcrumb */}
                    <p className="font-nunito text-[12px] text-[#888888] mb-5">
                        <Link href="/" className="hover:underline hover:text-[#111111]">Inicio</Link>
                        <span className="mx-2">/</span>
                        <span className="text-[#111111] font-bold">Movimientos</span>
                    </p>

                    <div className="flex items-end justify-between">
                        {/* Left: decoration + title */}
                        <div className="flex items-end gap-3">
                            {/* Power bars decoration */}
                            <div className="flex items-end gap-[3px]">
                                {[
                                    { h: "36px", color: "#CC0000" },
                                    { h: "26px", color: "#444444" },
                                    { h: "16px", color: "#888888" },
                                ].map((bar, i) => (
                                    <motion.div
                                        key={i}
                                        className="w-[4px]"
                                        style={{ backgroundColor: bar.color, transformOrigin: "bottom", height: bar.h }}
                                        initial={{ scaleY: 0 }}
                                        animate={{ scaleY: 1 }}
                                        transition={{ delay: i * 0.05, type: "spring", stiffness: 350, damping: 22 }}
                                    />
                                ))}
                            </div>

                            <h1 className="font-press-start text-[18px] text-[#111111]">MOVIMIENTOS</h1>

                            <motion.div
                                className="bg-[#CC0000] text-white font-press-start text-[8px] px-2 py-1 border-2 border-[#111111] mb-0.5"
                                style={{ boxShadow: "2px 2px 0 #111111" }}
                                initial={{ scale: 0, rotate: 5 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: "spring", bounce: 0.6 }}
                            >
                                {totalCount}+ moves
                            </motion.div>
                        </div>

                        {/* Right: class shortcut badges */}
                        <div className="hidden sm:flex items-center gap-2">
                            {classes.map(({ key, label, Icon }, i) => {
                                const colors = DAMAGE_CLASS_COLORS[key]
                                return (
                                    <motion.button
                                        key={key}
                                        onClick={() => setClassFilter(classFilter === key ? null : key)}
                                        className="flex items-center gap-1.5 px-2.5 py-1 font-nunito text-[10px] font-bold border-2"
                                        style={{
                                            backgroundColor: classFilter === key ? colors.bg : "#F2F2F2",
                                            borderColor: classFilter === key ? colors.border : "#E0E0E0",
                                            color: classFilter === key ? colors.text : "#888888",
                                        }}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.1 + i * 0.06, type: "spring", bounce: 0.5 }}
                                        whileHover={{ scale: 1.1 }}
                                    >
                                        <Icon size={12} />
                                        <span className="hidden lg:inline">{label}</span>
                                    </motion.button>
                                )
                            })}
                        </div>
                    </div>

                    {/* Double separator */}
                    <div className="mt-6">
                        <motion.div className="h-[3px] bg-[#111111]" style={{ transformOrigin: "left" }} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.5, ease: "easeOut" }} />
                        <motion.div className="h-[2px] bg-[#CC0000]" style={{ transformOrigin: "right" }} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }} />
                    </div>
                </div>

                {/* ── FILTER BAR ──────────────────────────────────── */}
                <MoveFilterBar
                    typeFilter={typeFilter} onTypeChange={v => { setTypeFilter(v); setPage("1"); window.scrollTo({ top: 0, behavior: "smooth" }) }}
                    classFilter={classFilter} onClassChange={v => { setClassFilter(v); setPage("1"); window.scrollTo({ top: 0, behavior: "smooth" }) }}
                    genFilter={genFilter} onGenChange={v => { setGenFilter(v); setPage("1"); window.scrollTo({ top: 0, behavior: "smooth" }) }}
                    minPow={parseInt(minPow)} maxPow={parseInt(maxPow)}
                    onPowerChange={([mn, mx]) => { setMinPow(String(mn)); setMaxPow(String(mx)); setPage("1"); window.scrollTo({ top: 0, behavior: "smooth" }) }}
                    sortField={sortField} onSortChange={setSortField}
                    sortOrder={sortOrder} onOrderChange={setSortOrder}
                    onClearAll={clearAllFilters}
                >
                    {/* The table header is now rendered as part of the sticky filter bar */}
                    {viewMode === "table" && !isLoading && currentMoves.length > 0 && (
                        <div className="flex flex-col mt-1">
                            <div className="flex items-center h-10 px-3 font-press-start text-[7px] text-white bg-[#111111] -mx-4 sm:mx-0">
                                <div className="flex-1 min-w-[140px]">NOMBRE</div>
                                <div className="w-[100px] text-left">TIPO</div>
                                <div className="w-[90px] text-center">CLASE</div>
                                <div className="w-[70px] text-center">POT.</div>
                                <div className="w-[70px] text-center">PREC.</div>
                                <div className="w-[54px] text-center">PP</div>
                                <div className="w-[54px] text-center">GEN</div>
                            </div>
                            <motion.div className="h-[2px] bg-[#CC0000] z-20 -mx-4 sm:mx-0" style={{ transformOrigin: "left" }} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.5 }} />
                        </div>
                    )}
                </MoveFilterBar>

                {/* ── RESULTS BAR ─────────────────────────────────── */}
                <div className="flex items-center justify-between py-3">
                    <p className="font-nunito text-[13px] text-[#888888]">
                        <span className="font-bold text-[#111111]">{currentMoves.length}</span>
                        {totalCount > currentMoves.length && <span> de {totalCount}</span>} movimientos
                        {isFetching && <span className="ml-2 text-[#CC0000]">...</span>}
                    </p>

                    {/* View toggle */}
                    <div className="flex gap-1">
                        {[
                            { mode: "table" as const, Icon: Table2 },
                            { mode: "cards" as const, Icon: LayoutGrid },
                        ].map(({ mode, Icon }) => (
                            <motion.button
                                key={mode}
                                onClick={() => setViewMode(mode)}
                                className="p-1.5 border border-[#E0E0E0] transition-colors"
                                style={{ backgroundColor: viewMode === mode ? "#111111" : "#F2F2F2" }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Icon size={16} color={viewMode === mode ? "#FFFFFF" : "#888888"} />
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* ── TABLE / CARDS ───────────────────────────────── */}
                <AnimatePresence mode="wait">
                    {isLoading ? (
                        <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            {/* Skeleton rows */}
                            {viewMode === "table" ? (
                                <div className="border border-[#E0E0E0]">
                                    <div className="h-10 bg-[#111111]" />
                                    {Array.from({ length: 10 }).map((_, i) => (
                                        <div key={i} className="h-[52px] border-b border-[#E0E0E0] px-4 flex items-center gap-4 animate-pulse" style={{ backgroundColor: i % 2 === 0 ? "#FFFFFF" : "#FAFAFA" }}>
                                            <div className="flex-1 h-2.5 bg-[#E0E0E0] rounded" />
                                            <div className="w-16 h-4 bg-[#E0E0E0] rounded" />
                                            <div className="w-14 h-4 bg-[#E0E0E0] rounded" />
                                            <div className="w-10 h-2.5 bg-[#E0E0E0] rounded" />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {Array.from({ length: 9 }).map((_, i) => (
                                        <div key={i} className="h-[180px] bg-[#F2F2F2] border-2 border-[#E0E0E0] animate-pulse" />
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    ) : currentMoves.length === 0 ? (
                        <motion.div key="empty" className="flex flex-col items-center justify-center py-24 gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <motion.div animate={{ rotate: [0, -20, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                                <GiPunchBlast size={56} color="#E0E0E0" />
                            </motion.div>
                            <motion.p className="font-press-start text-[10px] text-[#AAAAAA]"
                                animate={{ opacity: [0, 1, 1, 0], y: [10, 0, 0, -10] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >¡Fallo!</motion.p>
                            <h2 className="font-press-start text-[12px] text-[#888888]">Ningún movimiento encontrado</h2>
                            <p className="font-nunito text-[14px] text-[#AAAAAA]">Prueba con otros filtros</p>
                            <button onClick={clearAllFilters} className="mt-2 px-4 py-2 bg-[#CC0000] text-white font-nunito text-[13px] font-bold hover:bg-[#990000] transition-colors">
                                Limpiar filtros
                            </button>
                        </motion.div>
                    ) : viewMode === "table" ? (
                        <motion.div key="table" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                            <div className="flex flex-col">
                                {currentMoves.map((move, idx) => (
                                    <MoveRow
                                        key={move.id}
                                        move={move}
                                        index={idx}
                                        isFirst={idx < 15}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div key="cards" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                            {currentMoves.map((move, i) => (
                                <MoveCard key={move.id} move={move} index={i} />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ── PAGINATION ──────────────────────────────────── */}
                {!isLoading && totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-10 pt-6 border-t border-[#E0E0E0]">
                        <button
                            onClick={() => setPage(String(Math.max(1, currentPage - 1)))}
                            disabled={currentPage === 1}
                            className="px-3 py-1.5 border-2 border-[#E0E0E0] font-nunito text-[12px] text-[#888888] disabled:opacity-30 hover:border-[#111111] hover:text-[#111111] transition-colors"
                        >
                            ← Anterior
                        </button>
                        <div className="flex gap-1">
                            {Array.from({ length: Math.min(totalPages, 7) }).map((_, i) => {
                                const p = i + 1
                                return (
                                    <motion.button
                                        key={p}
                                        onClick={() => setPage(String(p))}
                                        className="w-8 h-8 font-press-start text-[8px] border-2 transition-colors"
                                        style={{
                                            backgroundColor: currentPage === p ? "#CC0000" : "#FFFFFF",
                                            borderColor: currentPage === p ? "#CC0000" : "#E0E0E0",
                                            color: currentPage === p ? "#FFFFFF" : "#888888",
                                            boxShadow: currentPage === p ? "2px 2px 0 #111111" : "none"
                                        }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        {p}
                                    </motion.button>
                                )
                            })}
                        </div>
                        <button
                            onClick={() => setPage(String(Math.min(totalPages, currentPage + 1)))}
                            disabled={currentPage >= totalPages}
                            className="px-3 py-1.5 border-2 border-[#E0E0E0] font-nunito text-[12px] text-[#888888] disabled:opacity-30 hover:border-[#111111] hover:text-[#111111] transition-colors"
                        >
                            Siguiente →
                        </button>
                    </div>
                )}
            </motion.main>
        </>
    )
}
