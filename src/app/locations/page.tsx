"use client";

import { Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";
import { useRegionsList } from "@/lib/hooks/useLocations";
import { REGION_ORDER, REGION_COLORS, REGION_NAMES_ES } from "@/lib/constants/locations.constants";
import { RegionCard } from "@/components/locations/region-card";
import { PageTransitionLocations } from "@/components/shared/page-transition-locations";

function LocationsContent() {
    const { data: regions, isLoading } = useRegionsList();

    // Orden canónico garantizado
    const sorted = regions
        ? REGION_ORDER.map((name) => regions.find((r) => r.name === name)).filter(Boolean)
        : [];

    return (
        <>
            <PageTransitionLocations />

            {/* Dot grid BG */}
            <div
                className="fixed inset-0 z-0 pointer-events-none opacity-[0.02]"
                style={{ backgroundImage: "radial-gradient(#111111 1px, transparent 1px)", backgroundSize: "32px 32px" }}
            />

            <motion.main
                className="relative min-h-screen bg-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.35 }}
            >
                <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10 relative z-10">

                    {/* ── HEADER ── */}
                    <div className="pb-10">
                        <p className="font-nunito text-[12px] text-[#888888] mb-6">Inicio / Locaciones</p>

                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-5">
                            {/* Left */}
                            <div className="flex flex-col gap-3">
                                {/* 9 puntos de colores de regiones */}
                                <div className="flex gap-1.5">
                                    {REGION_ORDER.map((name, i) => (
                                        <motion.div
                                            key={name}
                                            className="w-[10px] h-[10px] rounded-full"
                                            style={{ backgroundColor: REGION_COLORS[name] }}
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.5 + i * 0.06 }}
                                        />
                                    ))}
                                </div>

                                <div className="flex items-center gap-3">
                                    <MapPin size={18} className="text-[#CC0000]" />
                                    <h1 className="font-press-start text-[20px] text-[#111111]">LOCACIONES</h1>
                                    <motion.div
                                        className="bg-[#111111] text-white px-2 py-1"
                                        style={{ boxShadow: "2px 2px 0 #CC0000" }}
                                        initial={{ scale: 0, rotate: 8 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        transition={{ type: "spring", bounce: 0.55, delay: 0.7 }}
                                    >
                                        <span className="font-press-start text-[8px]">9</span>
                                    </motion.div>
                                </div>

                                <p className="font-nunito text-[13px] text-[#888888] italic">
                                    9 regiones · cientos de locaciones · miles de encuentros Pokémon
                                </p>
                            </div>

                            {/* Right — chips de nombres en español */}
                            <div className="flex gap-1.5 flex-wrap">
                                {REGION_ORDER.map((name, i) => (
                                    <motion.span
                                        key={name}
                                        className="font-nunito font-bold text-[11px] px-2 py-1"
                                        style={{
                                            color: REGION_COLORS[name],
                                            backgroundColor: `${REGION_COLORS[name]}18`,
                                            border: `1px solid ${REGION_COLORS[name]}`,
                                        }}
                                        initial={{ opacity: 0, y: -8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 + i * 0.04 }}
                                    >
                                        {REGION_NAMES_ES[name]}
                                    </motion.span>
                                ))}
                            </div>
                        </div>

                        {/* Separador doble */}
                        <div className="relative h-[5px]">
                            <motion.div
                                className="absolute top-0 left-0 w-full h-[3px] bg-[#111111] origin-left"
                                initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.5, delay: 0.4 }}
                            />
                            <motion.div
                                className="absolute bottom-0 right-0 w-full h-[2px] bg-[#CC0000] origin-right"
                                initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.4, delay: 0.5 }}
                            />
                        </div>
                    </div>

                    {/* ── GRID DE CARDS ── */}
                    <div className="flex items-center gap-4 mb-6">
                        <h2 className="font-press-start text-[14px] uppercase tracking-tighter text-[#111111] whitespace-nowrap">
                            Todas las Regiones
                        </h2>
                        <div className="h-px bg-[#E0E0E0] flex-1" />
                    </div>

                    <AnimatePresence mode="wait">
                        {isLoading ? (
                            <motion.div
                                key="skeleton"
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            >
                                {Array.from({ length: 9 }).map((_, i) => (
                                    <div key={i} className="border-2 border-[#E0E0E0] bg-[#F8F8F8] animate-pulse overflow-hidden" style={{ height: 240 }}>
                                        <div className="h-[4px] bg-[#E0E0E0]" />
                                    </div>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="content"
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {sorted.map((region: any, i: number) => (
                                    <RegionCard key={region.name} region={region} index={i} />
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>
            </motion.main>
        </>
    );
}

export default function LocationsPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen bg-white flex items-center justify-center">
                    <div className="border-2 border-[#111111] px-6 py-4" style={{ boxShadow: "4px 4px 0 #CC0000" }}>
                        <span className="font-press-start text-[10px] text-[#111111]">CARGANDO...</span>
                    </div>
                </div>
            }
        >
            <LocationsContent />
        </Suspense>
    );
}