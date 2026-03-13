"use client";

import { useMemo, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";

import { useNaturesList } from "@/lib/hooks/useNatures";
import { NATURES_DATA } from "@/lib/constants/natures.constants";
import { NatureMasterTable } from "@/components/natures/nature-master-table";
import { NatureCard } from "@/components/natures/nature-card";
import { NatureFilterBar } from "@/components/natures/nature-filter-bar";
import {
    NaturesPageHeader, NatureViewToggle,
    NatureSkeletonTable, NatureEmptyState,
} from "@/components/natures/nature-list-components";
import { PageTransitionNatures } from "@/components/shared/page-transition-natures";
import { useFilterStore } from "@/lib/store/filter.store";

function NaturesContent() {
    const { data: natures, isLoading } = useNaturesList();
    const router = useRouter();

    // Filtros globales persistentes
    const { naturesFilters, setNaturesFilters } = useFilterStore();
    const { view, stat: statFilter, flavor: flavorFilter, neutral: neutralFilter, search: searchQuery } = naturesFilters;

    // Handlers para actualizar el store
    const setView = (v: "table" | "grid") => setNaturesFilters({ view: v });
    const setStatFilter = (s: string | null) => setNaturesFilters({ stat: s });
    const setFlavorFilter = (f: string | null) => setNaturesFilters({ flavor: f });
    const setNeutralFilter = (n: "all" | "neutral" | "modified") => setNaturesFilters({ neutral: n });
    const setSearchQuery = (q: string) => setNaturesFilters({ search: q });

    // Fuse.js sobre nombres ES + EN
    const fuse = useMemo(
        () => new Fuse(NATURES_DATA, { keys: ["name", "nameEs"], threshold: 0.32 }),
        []
    );

    // Lista filtrada
    const filteredMeta = useMemo(() => {
        let list = searchQuery.trim()
            ? fuse.search(searchQuery).map((r) => r.item)
            : NATURES_DATA;
        if (statFilter) list = list.filter((n) => n.increased === statFilter);
        if (flavorFilter) list = list.filter((n) => n.likesFlavor === flavorFilter);
        if (neutralFilter === "neutral") list = list.filter((n) => n.isNeutral);
        if (neutralFilter === "modified") list = list.filter((n) => !n.isNeutral);
        return list;
    }, [searchQuery, statFilter, flavorFilter, neutralFilter, fuse]);

    // Para el grid: cruzar meta con datos de API
    const filteredNatures = useMemo(() => {
        if (!natures) return [];
        return filteredMeta
            .map((meta) => natures.find((n) => n.name === meta.name))
            .filter(Boolean);
    }, [filteredMeta, natures]);

    const handleNatureClick = (name: string) => router.push(`/natures/${name}`);
    const clearFilters = () => {
        setNaturesFilters({
            stat: null,
            flavor: null,
            neutral: "all",
            search: "",
        });
    };

    return (
        <>
            <PageTransitionNatures />

            {/* Dot grid background */}
            <div
                className="fixed inset-0 z-0 pointer-events-none opacity-[0.02]"
                style={{ backgroundImage: "radial-gradient(#111111 1px, transparent 1px)", backgroundSize: "32px 32px" }}
            />

            <motion.main
                className="relative min-h-screen bg-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.32 }}
            >
                <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10 relative z-10">
                    {/* Breadcrumb */}
                    <p className="font-nunito text-[13px] text-[#888888] mb-8">Inicio / Naturalezas</p>

                    {/* Header */}
                    <NaturesPageHeader />

                    {/* Vista toggle */}
                    <div className="mt-10 mb-6 flex items-center justify-between gap-4 flex-wrap">
                        <NatureViewToggle view={view} onViewChange={setView} />
                        {view === "table" && (
                            <motion.p
                                className="font-nunito text-[13px] text-[#888888]"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            >
                                Haz clic en cualquier celda para ver el detalle de la naturaleza
                            </motion.p>
                        )}
                    </div>

                    {/* Filtros (solo en grid) */}
                    <AnimatePresence>
                        {view === "grid" && (
                            <motion.div
                                key="filters"
                                className="mb-8"
                                initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <NatureFilterBar
                                    statFilter={statFilter}
                                    flavorFilter={flavorFilter}
                                    neutralFilter={neutralFilter}
                                    searchQuery={searchQuery}
                                    onStatFilter={setStatFilter}
                                    onFlavorFilter={setFlavorFilter}
                                    onNeutralFilter={setNeutralFilter}
                                    onSearch={setSearchQuery}
                                    totalShown={filteredMeta.length}
                                    totalAll={25}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* En tabla, el stat filter resalta celdas */}
                    <AnimatePresence>
                        {view === "table" && (
                            <motion.div
                                key="table-filters"
                                className="mb-6 flex flex-wrap gap-2 items-center"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            >
                                <span className="font-press-start text-[9px] text-[#888888]">RESALTAR:</span>
                                {[null, "attack", "defense", "special-attack", "special-defense", "speed"].map((stat) => {
                                    const { STAT_COLORS: SC, STAT_ABBR: SA } = require("@/lib/constants/natures.constants");
                                    const active = statFilter === stat;
                                    const color = stat ? SC[stat] : "#111111";
                                    return (
                                        <button
                                            key={stat ?? "none"}
                                            onClick={() => setStatFilter(active ? null : stat)}
                                            className="font-press-start text-[9px] px-3 py-1.5 border-2 transition-all"
                                            style={
                                                active
                                                    ? { backgroundColor: color, borderColor: "#111111", color: "#ffffff", boxShadow: "2px 2px 0 #111111" }
                                                    : stat
                                                        ? { backgroundColor: `${color}14`, borderColor: color, color }
                                                        : { backgroundColor: active ? "#111111" : "#F5F5F5", borderColor: "#CCCCCC", color: "#888888" }
                                            }
                                        >
                                            {stat ? `+${SA[stat]}` : "Todos"}
                                        </button>
                                    );
                                })}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Contenido principal */}
                    <AnimatePresence mode="wait">
                        {isLoading ? (
                            <motion.div
                                key="skeleton"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            >
                                <NatureSkeletonTable />
                            </motion.div>
                        ) : view === "table" ? (
                            <motion.div
                                key="table"
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div
                                    className="relative border-2 border-[#111111]"
                                    style={{ boxShadow: "4px 4px 0 #CC0000" }}
                                >
                                    {/* Etiqueta flotante */}
                                    <div className="absolute top-[-14px] left-4 bg-[#111111] px-3 py-1 z-10">
                                        <span className="font-nunito font-bold text-[12px] text-white uppercase">
                                            Tabla de Referencia · 25 Naturalezas
                                        </span>
                                    </div>
                                    <div className="p-5 pt-7">
                                        <NatureMasterTable
                                            natures={natures ?? []}
                                            highlightedStat={statFilter}
                                            onNatureClick={handleNatureClick}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        ) : filteredNatures.length === 0 ? (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            >
                                <NatureEmptyState onClear={clearFilters} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="grid"
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {filteredNatures.map((nature: any, i: number) => {
                                    const meta = NATURES_DATA.find((m) => m.name === nature.name);
                                    if (!meta) return null;
                                    return <NatureCard key={nature.name} nature={nature} meta={meta} index={i} />;
                                })}
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>
            </motion.main>
        </>
    );
}

export default function NaturesPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen bg-white flex items-center justify-center">
                    <div className="border-2 border-[#111111] px-6 py-4" style={{ boxShadow: "4px 4px 0 #CC0000" }}>
                        <span className="font-press-start text-[11px] text-[#111111]">CARGANDO...</span>
                    </div>
                </div>
            }
        >
            <NaturesContent />
        </Suspense>
    );
}