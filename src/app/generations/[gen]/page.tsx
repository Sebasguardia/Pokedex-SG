"use client";

import { notFound, useParams } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";

import { useGeneration } from "@/lib/hooks/useGenerations";
import { getGenMeta } from "@/lib/constants/generations.constants";
import { useFilterStore } from "@/lib/store/filter.store";

import { GenerationDetailHero } from "@/components/generations/generation-detail-hero";
import { GenerationStatsGrid } from "@/components/generations/generation-stats-grid";
import { GenerationPokemonGrid } from "@/components/generations/generation-pokemon-grid";
import { GenerationTypesIntroduced } from "@/components/generations/generation-types-introduced";
import { GenerationGamesSection } from "@/components/generations/generation-games-section";
import { GenerationAbilitiesSection } from "@/components/generations/generation-abilities-section";
import { GenerationNavStrip } from "@/components/generations/generation-nav-strip";
import { PageTransitionGeneration } from "@/components/shared/page-transition-generation";
import { ScrollProgressBar } from "@/components/shared/scroll-progress-bar";

// ── Loading skeleton ───────────────────────────────────────────
function LoadingSkeleton() {
    return (
        <div className="w-full min-h-screen bg-white">
            {/* Hero placeholder */}
            <div className="bg-[#111111] h-[260px] animate-pulse relative overflow-hidden">
                <div
                    className="absolute inset-0 opacity-[0.035]"
                    style={{
                        backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                    }}
                />
            </div>
            {/* Body placeholder */}
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12 space-y-12">
                {[200, 140, 320].map((h, i) => (
                    <div key={i} className={`h-[${h}px] border-2 border-[#E0E0E0] bg-[#F8F8F8] animate-pulse`} />
                ))}
            </div>
        </div>
    );
}

// ── Page ───────────────────────────────────────────────────────
export default function GenerationDetailPage() {
    const { gen } = useParams<{ gen: string }>();
    const { setLastGeneration } = useFilterStore();

    const { data: generation, isLoading, isError } = useGeneration(gen);

    // Recordar la gen visitada (para volver desde Pokédex)
    useEffect(() => {
        if (gen) setLastGeneration(gen);
    }, [gen, setLastGeneration]);

    if (isLoading) return <LoadingSkeleton />;
    if (isError || !generation) return notFound();

    const meta = getGenMeta(generation.name);
    const { color: genColor, roman, nameEs, year, games, mascot, types, typeNote } = meta;

    // Info estática (region)
    const regionName = generation.main_region?.name ?? "";

    return (
        <>
            {/* Transición de entrada */}
            <PageTransitionGeneration genColor={genColor} roman={roman} />

            {/* Scrollbar del color de generación */}
            <style jsx global>{`
        ::-webkit-scrollbar-thumb { background-color: ${genColor}; }
      `}</style>

            {/* Tinte radial esquina superior izquierda */}
            <div
                className="fixed inset-0 pointer-events-none z-0 hidden md:block"
                style={{
                    background: `radial-gradient(circle at 0% 0%, ${genColor}07, transparent 55%)`,
                }}
            />

            {/* Scroll progress bar del color de la generación */}
            <ScrollProgressBar color={genColor} />

            <motion.main
                className="relative z-10 bg-white overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.65 }}
            >
                {/* 1 ── HERO ──────────────────────────────────── */}
                <GenerationDetailHero
                    generation={generation}
                    genColor={genColor}
                    roman={roman}
                    nameEs={nameEs}
                    mascot={mascot}
                    year={year}
                    games={games}
                    region={regionName}
                />

                {/* 2 ── BODY ──────────────────────────────────── */}
                <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12 space-y-16 relative z-10">

                    {/* Stats: 4 métricas */}
                    <GenerationStatsGrid
                        generation={generation}
                        genColor={genColor}
                        mascot={mascot}
                    />

                    {/* Grid de Pokémon introducidos */}
                    <GenerationPokemonGrid
                        pokemonList={generation.pokemon_species}
                        genColor={genColor}
                        totalCount={generation.pokemon_species.length}
                    />

                    {/* Tipos introducidos (solo si hay) */}
                    {types.length > 0 && (
                        <GenerationTypesIntroduced
                            types={generation.types}
                            typesHardcoded={types}
                            genColor={genColor}
                            typeNote={typeNote}
                        />
                    )}

                    {/* Versiones y juegos */}
                    <GenerationGamesSection
                        versionGroups={generation.version_groups}
                        genColor={genColor}
                    />

                    {/* Habilidades (con aviso informativo en Gen I-II) */}
                    <GenerationAbilitiesSection
                        abilities={generation.abilities}
                        genColor={genColor}
                        generationId={generation.id}
                    />

                    {/* Strip de navegación — las 9 generaciones */}
                    <GenerationNavStrip currentGeneration={generation.name} />

                </div>
            </motion.main>
        </>
    );
}