"use client";

import { Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGenerationsList } from "@/lib/hooks/useGenerations";
import {
    GENERATION_ORDER,
    GENERATION_COLORS,
    GENERATION_ROMAN,
} from "@/lib/constants/generations.constants";
import { GenerationCard } from "@/components/generations/generation-card";
import { PageTransitionGenerations } from "@/components/shared/page-transition-generations";
import { GenerationsTimeline } from "@/components/home/generations-timeline";

// ── Skeleton ──────────────────────────────────────────────────────
function GenerationsSkeletonGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {Array.from({ length: 9 }).map((_, i) => (
                <div
                    key={i}
                    className="h-[220px] border-2 border-[#E0E0E0] animate-pulse bg-[#F8F8F8] overflow-hidden"
                >
                    <div className="h-[3px] bg-[#E0E0E0]" />
                </div>
            ))}
        </div>
    );
}

// ── Contenido ─────────────────────────────────────────────────────
function GenerationsContent() {
    const { data: generations, isLoading } = useGenerationsList();

    // Ordenar por orden canónico
    const sorted = generations
        ? GENERATION_ORDER.map((name) => generations.find((g) => g.name === name)).filter(Boolean)
        : [];

    return (
        <>
            <PageTransitionGenerations />

            {/* Dot grid BG */}
            <div
                className="fixed inset-0 z-0 pointer-events-none opacity-[0.02]"
                style={{
                    backgroundImage: "radial-gradient(#111111 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                }}
            />

            <motion.main
                className="relative min-h-screen bg-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
            >
                <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10 relative z-10">

                    {/* ── HEADER ─────────────────────────────────────────── */}
                    <div className="pb-10">
                        {/* Breadcrumb */}
                        <p className="font-nunito text-[12px] text-[#888888] mb-6">Inicio / Generaciones</p>

                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-5">
                            {/* Left */}
                            <div className="flex flex-col gap-3">
                                {/* 9 puntos de colores pulsantes */}
                                <div className="flex gap-1.5">
                                    {GENERATION_ORDER.map((name, i) => (
                                        <motion.div
                                            key={name}
                                            className="w-[10px] h-[10px] rounded-full"
                                            style={{ backgroundColor: GENERATION_COLORS[name] }}
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{
                                                type: "spring", stiffness: 400, damping: 15, delay: 0.5 + i * 0.06,
                                            }}
                                        />
                                    ))}
                                </div>

                                <div className="flex items-center gap-3">
                                    <h1 className="font-press-start text-[20px] text-[#111111]">GENERACIONES</h1>
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
                                    La evolución del mundo Pokémon desde 1996
                                </p>
                            </div>

                            {/* Right — chips romanos */}
                            <div className="flex gap-1.5 flex-wrap">
                                {GENERATION_ORDER.map((name, i) => (
                                    <motion.span
                                        key={name}
                                        className="font-press-start text-[9px] px-2 py-1"
                                        style={{
                                            color: GENERATION_COLORS[name],
                                            backgroundColor: `${GENERATION_COLORS[name]}18`,
                                            border: `1px solid ${GENERATION_COLORS[name]}`,
                                        }}
                                        initial={{ opacity: 0, y: -8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 + i * 0.04 }}
                                    >
                                        {GENERATION_ROMAN[name]}
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

                    {/* ── TIMELINE ───────────────────────────────────────── */}
                    {/* GenerationsTimeline ya existe en home/ — se reutiliza como decorativo */}
                    <div className="mb-12 -mx-4 sm:-mx-6">
                        <GenerationsTimeline />
                    </div>

                    {/* ── GRID DE CARDS ──────────────────────────────────── */}
                    <div className="flex items-center gap-4 mb-6">
                        <h2 className="font-press-start text-[14px] uppercase tracking-tighter text-[#111111] whitespace-nowrap">
                            Todas las Generaciones
                        </h2>
                        <div className="h-px bg-[#E0E0E0] flex-1" />
                    </div>

                    <AnimatePresence mode="wait">
                        {isLoading ? (
                            <motion.div key="skeleton" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <GenerationsSkeletonGrid />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="content"
                                className="grid grid-cols-1 md:grid-cols-2 gap-5"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {sorted.map((gen: any, i: number) => (
                                    <GenerationCard key={gen.name} generation={gen} index={i} />
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>
            </motion.main>
        </>
    );
}

// ── Export ────────────────────────────────────────────────────────
export default function GenerationsPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen bg-white flex items-center justify-center">
                    <div
                        className="border-2 border-[#111111] px-6 py-4"
                        style={{ boxShadow: "4px 4px 0 #CC0000" }}
                    >
                        <span className="font-press-start text-[10px] text-[#111111]">CARGANDO...</span>
                    </div>
                </div>
            }
        >
            <GenerationsContent />
        </Suspense>
    );
}