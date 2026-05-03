"use client";

import { Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useGenerationsList } from "@/lib/hooks/generations/useGenerations";
import {
    GENERATION_ORDER,
    GENERATION_COLORS,
    GENERATION_ROMAN,
    GENERATION_YEARS,
    GENERATION_NAMES_ES,
} from "@/lib/constants/generations/generations.constants";
import { GenerationCard } from "@/components/generations/generation-card";
import { PageTransitionGenerations } from "@/components/shared/page-transitions/generations/page-transition-generations";
import { GenerationsTimeline } from "@/components/home/generations-timeline";
import { Layers, Home } from "lucide-react";

// ── Skeleton ──────────────────────────────────────────────────────
function GenerationsSkeletonGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
                <div
                    key={i}
                    className="h-[260px] border-[4px] border-[#E0E0E0] animate-pulse bg-[#F8F8F8] overflow-hidden"
                    style={{ boxShadow: "8px 8px 0 #E0E0E0" }}
                >
                    <div className="flex h-full">
                        <div className="w-[14px] bg-[#E0E0E0]" />
                        <div className="flex-1 p-6 flex flex-col gap-4">
                            <div className="h-3 w-24 bg-[#E0E0E0]" />
                            <div className="h-6 w-40 bg-[#E0E0E0]" />
                            <div className="h-3 w-32 bg-[#E0E0E0]" />
                            <div className="flex gap-2 mt-auto">
                                <div className="h-8 w-20 bg-[#E0E0E0]" />
                                <div className="h-8 w-20 bg-[#E0E0E0]" />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

// ── Contenido ─────────────────────────────────────────────────────
function GenerationsContent() {
    const { data: generations, isLoading } = useGenerationsList();

    const sorted = generations
        ? GENERATION_ORDER.map((name) => generations.find((g) => g.name === name)).filter(Boolean)
        : [];

    return (
        <>
            <PageTransitionGenerations />

            {/* Dot grid BG */}
            <div
                className="fixed inset-0 z-0 pointer-events-none opacity-[0.025]"
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
                    <div className="pb-12">
                        {/* Breadcrumb */}
                        <div className="flex items-center gap-2 mb-6">
                            <Link href="/" className="flex items-center gap-1 font-['Nunito'] font-bold text-[12px] text-[#888888] hover:text-[#111111] transition-colors uppercase tracking-widest">
                                <Home size={12} />
                                Inicio
                            </Link>
                            <span className="text-[#CCCCCC] font-bold">/</span>
                            <span className="font-['Nunito'] font-bold text-[12px] text-[#111111] uppercase tracking-widest">Generaciones</span>
                        </div>

                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-8">
                            {/* Left */}
                            <div className="flex flex-col gap-5">
                                {/* Fila de puntos de color */}
                                <div className="flex gap-2 items-center">
                                    {GENERATION_ORDER.map((name, i) => (
                                        <motion.div
                                            key={name}
                                            className="w-[12px] h-[12px] border-[2px] border-[#111111]"
                                            style={{ backgroundColor: GENERATION_COLORS[name] }}
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{
                                                type: "spring", stiffness: 400, damping: 15, delay: 0.4 + i * 0.06,
                                            }}
                                        />
                                    ))}
                                    <span className="font-['JetBrains_Mono'] font-bold text-[10px] text-[#888888] ml-2">
                                        9 GENERACIONES · 1996–2022
                                    </span>
                                </div>

                                <div className="flex items-center gap-5">
                                    {/* Icono dossier */}
                                    <motion.div
                                        className="w-16 h-16 bg-[#111111] flex items-center justify-center border-[4px] border-[#111111]"
                                        style={{ boxShadow: "6px 6px 0 #CC0000" }}
                                        initial={{ scale: 0, rotate: -20 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.3 }}
                                    >
                                        <Layers size={28} className="text-white" />
                                    </motion.div>

                                    <div>
                                        <motion.h1
                                            className="font-['Press_Start_2P'] text-[28px] sm:text-[36px] text-[#111111] uppercase leading-tight"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.5, delay: 0.4 }}
                                        >
                                            GENERA<br className="sm:hidden" />CIONES
                                        </motion.h1>
                                        <motion.p
                                            className="font-['Nunito'] font-black text-[15px] text-[#888888] mt-1"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.6 }}
                                        >
                                            La evolución del mundo Pokémon desde 1996
                                        </motion.p>
                                    </div>
                                </div>
                            </div>

                            {/* Right — chips romanos clicables */}
                            <motion.div
                                className="flex gap-2 flex-wrap max-w-sm"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                {GENERATION_ORDER.map((name, i) => (
                                    <Link href={`/generations/${name}`} key={name}>
                                        <motion.div
                                            className="font-['Press_Start_2P'] text-[9px] px-3 py-2 border-[3px] cursor-pointer flex flex-col items-center gap-0.5"
                                            style={{
                                                color: GENERATION_COLORS[name],
                                                backgroundColor: `${GENERATION_COLORS[name]}12`,
                                                borderColor: GENERATION_COLORS[name],
                                                boxShadow: `2px 2px 0 ${GENERATION_COLORS[name]}66`,
                                            }}
                                            initial={{ opacity: 0, y: -8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.5 + i * 0.04 }}
                                            whileHover={{
                                                backgroundColor: GENERATION_COLORS[name],
                                                color: "#ffffff",
                                                y: -3,
                                                boxShadow: `4px 4px 0 ${GENERATION_COLORS[name]}`,
                                            }}
                                        >
                                            <span>{GENERATION_ROMAN[name]}</span>
                                            <span className="font-['JetBrains_Mono'] text-[7px] opacity-60">{GENERATION_YEARS[name]}</span>
                                        </motion.div>
                                    </Link>
                                ))}
                            </motion.div>
                        </div>

                        {/* Separador doble */}
                        <div className="relative h-[8px]">
                            <motion.div
                                className="absolute top-0 left-0 w-full h-[5px] bg-[#111111] origin-left"
                                initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.5, delay: 0.4 }}
                            />
                            <motion.div
                                className="absolute bottom-0 right-0 w-full h-[3px] bg-[#CC0000] origin-right"
                                initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.4, delay: 0.55 }}
                            />
                        </div>
                    </div>

                    {/* ── TIMELINE ───────────────────────────────────────── */}
                    <div className="mb-16 -mx-4 sm:-mx-6 border-y-[4px] border-[#111111]">
                        <GenerationsTimeline />
                    </div>

                    {/* ── GRID DE CARDS ──────────────────────────────────── */}
                    <div className="flex items-center gap-3 mb-10">
                        <span className="w-4 h-4 bg-[#CC0000] border-[3px] border-[#111111] shrink-0" />
                        <h2 className="font-['Press_Start_2P'] text-[14px] sm:text-[16px] uppercase tracking-tighter text-[#111111] whitespace-nowrap">
                            Todas las Generaciones
                        </h2>
                        <div className="h-[4px] bg-[#111111] flex-1" />
                        <span className="font-['JetBrains_Mono'] text-[10px] font-bold text-[#AAAAAA] shrink-0">
                            {sorted.length} / 9
                        </span>
                    </div>

                    <AnimatePresence mode="wait">
                        {isLoading ? (
                            <motion.div key="skeleton" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <GenerationsSkeletonGrid />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="content"
                                className="grid grid-cols-1 md:grid-cols-2 gap-8"
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
                    <motion.div
                        className="border-[4px] border-[#111111] px-8 py-6 flex items-center gap-4"
                        style={{ boxShadow: "8px 8px 0 #CC0000" }}
                        animate={{ rotate: [0, 1, -1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.5 }}
                    >
                        <Layers size={24} />
                        <span className="font-['Press_Start_2P'] text-[12px] text-[#111111]">CARGANDO...</span>
                    </motion.div>
                </div>
            }
        >
            <GenerationsContent />
        </Suspense>
    );
}