"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useQueryState, parseAsString } from "nuqs"
import NumberFlow from "@number-flow/react"
import { Suspense, useMemo } from "react"
import { Loader2, Search, X, Fingerprint, MapPin, Shield, PlusSquare } from "lucide-react"
import { GiPunchBlast } from "react-icons/gi"

import { useAbilitiesList } from "@/lib/hooks/abilities/useAbilitiesList"
import { AbilityCard } from "@/components/abilities/ability-card"
import { PageTransitionAbilities } from "@/components/shared/page-transitions/abilities/page-transition-abilities"

function AbilitiesContent() {
    const [search, setSearch] = useQueryState("q", parseAsString.withDefault(""))
    const [category, setCategory] = useQueryState("cat", parseAsString.withDefault("all"))

    const { 
        data, 
        totalCount,
        stats, 
        allDetails,
        isLoading, 
        isFetchingNextPage, 
        hasNextPage, 
        fetchNextPage 
    } = useAbilitiesList({
        search,
        category,
    })

    const clearAll = () => {
        setSearch("")
        setCategory("all")
    }

    const allAbilities = useMemo(() => {
        return data?.pages.flatMap(page => page.results) || []
    }, [data])

    const categories = [
        { key: "offensive", label: "Ofensiva", icon: GiPunchBlast, colors: { bg: "#CC0000", border: "#111111", text: "#FFFFFF" } },
        { key: "defensive", label: "Defensiva", icon: Shield, colors: { bg: "#4A90E2", border: "#111111", text: "#FFFFFF" } },
        { key: "support", label: "Soporte", icon: PlusSquare, colors: { bg: "#50C878", border: "#111111", text: "#FFFFFF" } },
        { key: "passive", label: "Pasiva", icon: Fingerprint, colors: { bg: "#6B7280", border: "#111111", text: "#FFFFFF" } },
        { key: "overworld", label: "Campo", icon: MapPin, colors: { bg: "#15803D", border: "#111111", text: "#FFFFFF" } },
    ]

    return (
        <>
            <PageTransitionAbilities />

            <motion.main
                className="min-h-screen bg-[#FFFFFF] pb-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45, duration: 0.4 }}
            >
                <div className="bg-[#111111] h-1" />

                <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
                    {/* ── PAGE HEADER (Exact Moves Style) ── */}
                    <div className="py-8">
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
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

                                <h1 className="font-press-start text-[18px] text-[#111111]">
                                    HABILIDADES
                                </h1>

                                <motion.div
                                    className="bg-[#CC0000] text-white font-press-start text-[8px] px-2 py-1 border-2 border-[#111111] mb-0.5"
                                    style={{ boxShadow: "2px 2px 0 #111111" }}
                                    initial={{ scale: 0, rotate: 5 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ type: "spring", bounce: 0.6 }}
                                >
                                    <NumberFlow
                                        value={totalCount || 0}
                                        className="font-press-start"
                                        format={{ useGrouping: false }}
                                        suffix="+"
                                    />
                                </motion.div>
                            </div>

                            {/* Category Filter Pills (Moves Style) */}
                            <div className="flex items-center gap-2 flex-wrap">
                                {categories.map(({ key, label, icon: Icon, colors }, i) => {
                                    const isActive = category === key
                                    return (
                                        <motion.button
                                            key={key}
                                            onClick={() => setCategory(isActive ? "all" : key)}
                                            className="flex items-center gap-1.5 px-3 py-1.5 font-nunito text-[11px] font-bold border-2 transition-all"
                                            style={{
                                                backgroundColor: isActive ? colors.bg : "#F2F2F2",
                                                borderColor: isActive ? colors.border : "#E0E0E0",
                                                color: isActive ? colors.text : "#888888",
                                                boxShadow: isActive ? `2px 2px 0 ${colors.border}` : "none"
                                            }}
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.1 + i * 0.06, type: "spring", bounce: 0.5 }}
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            <Icon size={14} />
                                            <span>{label}</span>
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

                    {/* ── SEARCH & STATS DASHBOARD ── */}
                    <div className="mb-8 flex flex-col lg:flex-row gap-6">
                        {/* Status / Search Box */}
                        <div className="flex-1 space-y-4">
                            <div className="w-full relative group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#888888] group-focus-within:text-[#CC0000] transition-colors" />
                                <input
                                    type="text"
                                    value={search || ""}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Buscar por nombre o efecto..."
                                    className="w-full bg-[#FAFAFA] border-4 border-[#111111] pl-12 pr-12 py-4 font-press-start text-[12px] sm:text-[14px] outline-none focus:border-[#CC0000] focus:shadow-[6px_6px_0_#111111] transition-all"
                                />
                                <AnimatePresence>
                                    {search && (
                                        <motion.button
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            exit={{ scale: 0 }}
                                            onClick={() => setSearch("")}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#111111] p-1.5 text-white hover:bg-[#CC0000] transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                        </motion.button>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Distribution Dashboard */}
                        {!isLoading && stats.total > 0 && (
                            <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-2 shrink-0">
                                <div className="bg-[#111111] text-white p-3 border-2 border-[#111111] flex flex-col justify-between min-w-[100px]" style={{ boxShadow: "4px 4px 0 #CC0000" }}>
                                    <span className="font-press-start text-[8px] text-[#888888] uppercase mb-2">Ofensivas</span>
                                    <div className="font-press-start text-[14px] text-white">
                                        <NumberFlow value={stats.offensive} />
                                    </div>
                                </div>
                                <div className="bg-[#111111] text-white p-3 border-2 border-[#111111] flex flex-col justify-between min-w-[100px]" style={{ boxShadow: "4px 4px 0 #4A90E2" }}>
                                    <span className="font-press-start text-[8px] text-[#888888] uppercase mb-2">Defensivas</span>
                                    <div className="font-press-start text-[14px] text-white">
                                        <NumberFlow value={stats.defensive} />
                                    </div>
                                </div>
                                <div className="bg-[#111111] text-white p-3 border-2 border-[#111111] flex flex-col justify-between min-w-[100px]" style={{ boxShadow: "4px 4px 0 #50C878" }}>
                                    <span className="font-press-start text-[8px] text-[#888888] uppercase mb-2">Soporte</span>
                                    <div className="font-press-start text-[14px] text-white">
                                        <NumberFlow value={stats.support} />
                                    </div>
                                </div>
                                <div className="bg-[#111111] text-white p-3 border-2 border-[#111111] flex flex-col justify-between min-w-[100px]" style={{ boxShadow: "4px 4px 0 #6B7280" }}>
                                    <span className="font-press-start text-[8px] text-[#888888] uppercase mb-2">Pasivas</span>
                                    <div className="font-press-start text-[14px] text-white">
                                        <NumberFlow value={stats.passive} />
                                    </div>
                                </div>
                                <div className="bg-[#111111] text-white p-3 border-2 border-[#111111] flex flex-col justify-between min-w-[100px]" style={{ boxShadow: "4px 4px 0 #15803D" }}>
                                    <span className="font-press-start text-[8px] text-[#888888] uppercase mb-2">Campo</span>
                                    <div className="font-press-start text-[14px] text-white">
                                        <NumberFlow value={stats.overworld} />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ── MAIN GRID ── */}
                    <div className="mt-8">
                        <div className="flex justify-between items-end mb-6">
                            <h3 className="font-press-start text-[10px] sm:text-[12px] text-[#888888] uppercase tracking-widest">
                                {search ? "Resultados de búsqueda" : category !== "all" ? `Habilidades ${categories.find(c=>c.key === category)?.label}` : "Todas las Habilidades"}
                            </h3>
                            {!isLoading && (
                                <p className="font-nunito text-[12px] text-[#888888]">
                                    Mostrando {allAbilities.length} de {totalCount}
                                </p>
                            )}
                        </div>

                        {isLoading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {Array.from({ length: 9 }).map((_, i) => (
                                    <div key={i} className="h-44 bg-[#FAFAFA] border-4 border-[#111111]" style={{ boxShadow: "6px 6px 0 #E0E0E0" }} />
                                ))}
                            </div>
                        ) : (
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`${search}-${category}`}
                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
                                >
                                    {allAbilities.map((ability, i) => (
                                        <AbilityCard key={`${ability.name}-${i}`} ability={ability} index={i} />
                                    ))}
                                </motion.div>
                            </AnimatePresence>
                        )}

                        {/* Empty state */}
                        {!isLoading && allAbilities.length === 0 && (
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex flex-col items-center justify-center py-20 text-center bg-[#FAFAFA] border-4 border-[#111111] mt-8"
                                style={{ boxShadow: "6px 6px 0 #111111" }}
                            >
                                <h3 className="font-press-start text-[14px] sm:text-[16px] text-[#111111] mb-3 uppercase">
                                    Ninguna habilidad encontrada
                                </h3>
                                <p className="font-nunito text-[16px] text-[#555555] mb-8 font-bold">
                                    No hay resultados con los filtros actuales.
                                </p>
                                <button
                                    onClick={clearAll}
                                    className="bg-[#111111] text-white px-8 py-4 border-2 border-[#111111] shadow-[4px_4px_0_#CC0000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all font-press-start text-[10px] uppercase tracking-widest"
                                >
                                    LIMPIAR FILTROS
                                </button>
                            </motion.div>
                        )}

                        {/* Pagination Button */}
                        {hasNextPage && (
                            <div className="mt-16 flex justify-center pb-8">
                                <button
                                    onClick={() => fetchNextPage()}
                                    disabled={isFetchingNextPage}
                                    className="group relative bg-[#FAFAFA] border-4 border-[#111111] px-10 py-4 font-press-start text-[10px] md:text-[12px] uppercase text-[#111111] hover:bg-[#111111] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    style={{ boxShadow: "6px 6px 0 #CC0000" }}
                                >
                                    {isFetchingNextPage ? (
                                        <span className="flex items-center gap-3">
                                            <Loader2 className="animate-spin w-4 h-4" />
                                            CARGANDO...
                                        </span>
                                    ) : (
                                        "CARGAR MÁS HABILIDADES"
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </motion.main>
        </>
    )
}

export default function AbilitiesPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-white animate-pulse" />}>
            <AbilitiesContent />
        </Suspense>
    )
}
