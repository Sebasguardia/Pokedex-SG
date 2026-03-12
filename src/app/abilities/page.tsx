"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useQueryState } from "nuqs"
import NumberFlow from "@number-flow/react"
import { GiEyeTarget } from "react-icons/gi"
import { Suspense } from "react"

import { useAbilitiesList } from "@/lib/hooks/useAbilitiesList"
import { AbilityCard } from "@/components/abilities/ability-card"
import { AbilityFilterBar } from "@/components/abilities/ability-filter-bar"
import { PageTransitionAbilities } from "@/components/shared/page-transition-abilities"
import { AbilityCategoryBadge } from "@/components/abilities/ability-category-badge"

function AbilitiesContent() {
    const [search, setSearch] = useQueryState("q")
    const [gen, setGen] = useQueryState("gen")
    const [type, setType] = useQueryState("type") // "hidden" | "main" | null
    const [page, setPage] = useQueryState("page", { defaultValue: "1" })

    const { data, isLoading } = useAbilitiesList({
        search,
        gen,
        hiddenOnly: type === "hidden",
        page: parseInt(page),
        limit: 24
    })

    const clearAll = () => {
        setSearch(null)
        setGen(null)
        setType(null)
        setPage("1")
    }

    return (
        <>
            <PageTransitionAbilities />

            <motion.main
                className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45, duration: 0.4 }}
            >
                {/* HEADER */}
                <header className="mb-10">
                    <div className="text-[12px] font-nunito text-[#888888] mb-4">
                        Inicio / Habilidades
                    </div>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: "spring", stiffness: 200, damping: 18 }}
                                className="text-[#CC0000]"
                            >
                                <motion.div
                                    animate={{ scale: [1, 1.06, 1] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <GiEyeTarget size={40} />
                                </motion.div>
                            </motion.div>

                            <div>
                                <h1 className="font-press-start text-2xl text-[#111111] mb-2 uppercase tracking-tight">
                                    HABILIDADES
                                </h1>
                                <motion.div
                                    className="inline-flex items-center bg-[#111111] text-white px-3 py-1.5 border-2 border-[#CC0000] shadow-[2px_2px_0_#CC0000]"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", bounce: 0.5 }}
                                >
                                    <NumberFlow
                                        value={data?.count || 0}
                                        className="font-press-start text-[10px]"
                                        format={{ useGrouping: false }}
                                        suffix=" habilidades"
                                    />
                                </motion.div>
                            </div>
                        </div>

                        <div className="flex flex-col items-end gap-3">
                            <p className="font-nunito text-[13px] text-[#888888] italic text-right max-w-[250px]">
                                Los poderes pasivos que definen la estrategia en combate.
                            </p>
                            <div className="flex gap-2">
                                <AbilityCategoryBadge category="offensive" size="sm" />
                                <AbilityCategoryBadge category="defensive" size="sm" />
                                <AbilityCategoryBadge category="support" size="sm" />
                            </div>
                        </div>
                    </div>

                    {/* SEPARADOR FIRMA */}
                    <div className="relative h-[5px] mt-8">
                        <motion.div className="absolute top-0 left-0 w-full h-[3px] bg-[#111111] origin-left" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }} />
                        <motion.div className="absolute bottom-0 right-0 w-full h-[2px] bg-[#CC0000] origin-right" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} />
                    </div>
                </header>

                <AbilityFilterBar
                    search={search}
                    onSearchChange={setSearch}
                    genFilter={gen}
                    onGenChange={setGen}
                    typeFilter={type as any}
                    onTypeChange={setType as any}
                    onClearAll={clearAll}
                />

                <div className="mt-8">
                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {Array.from({ length: 9 }).map((_, i) => (
                                <div key={i} className="h-48 bg-[#F2F2F2] animate-pulse border-2 border-[#E0E0E0]" />
                            ))}
                        </div>
                    ) : (
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`${search}-${type}-${page}`}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                            >
                                {data?.results.map((ability, i) => (
                                    <AbilityCard key={ability.name} ability={ability} index={i} />
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    )}

                    {!isLoading && data?.results.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                className="text-[#E0E0E0] mb-6"
                            >
                                <GiEyeTarget size={64} />
                            </motion.div>
                            <h3 className="font-press-start text-[14px] text-[#888888] mb-2 uppercase">
                                Ninguna habilidad encontrada
                            </h3>
                            <p className="font-nunito text-[14px] text-[#888888] mb-8">
                                Ajusta la búsqueda o limpia los filtros.
                            </p>
                            <button
                                onClick={clearAll}
                                className="bg-[#111111] text-white px-8 py-3 border-2 border-[#CC0000] shadow-[4px_4px_0_#CC0000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all font-nunito font-bold uppercase"
                            >
                                Limpiar Filtros
                            </button>
                        </div>
                    )}
                </div>
            </motion.main>
        </>
    )
}

export default function AbilitiesPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#111111] animate-pulse" />}>
            <AbilitiesContent />
        </Suspense>
    )
}
