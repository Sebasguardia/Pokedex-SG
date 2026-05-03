"use client";

import { notFound, useParams } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";

import { useGeneration } from "@/lib/hooks/generations/useGenerations";
import { getGenMeta } from "@/lib/constants/generations/generations.constants";
import { useFilterStore } from "@/lib/store/filter.store";

import { GenerationDetailHero } from "@/components/generations/generation-detail-hero";
import { GenerationGeneralDescription } from "@/components/generations/generation-general-description";
import { GenerationGamesSection } from "@/components/generations/generation-games-section";
import { GenerationMechanicsSection } from "@/components/generations/generation-mechanics-section";
import { GenerationMovesRedirect } from "@/components/generations/generation-moves-redirect";
import { GenerationEvolutionsSection } from "@/components/generations/generation-evolutions-section";
import { GenerationPokemonSection } from "@/components/generations/generation-pokemon-section";
import { GenerationRegionSection } from "@/components/generations/generation-region-section";
import { GenerationNavStrip } from "@/components/generations/generation-nav-strip";
import { PageTransitionGeneration } from "@/components/shared/page-transitions/generations/page-transition-generation";
import { ScrollProgressBar } from "@/components/shared/ui/scroll-progress-bar";

// ── Loading skeleton ───────────────────────────────────────────
function LoadingSkeleton() {
    return (
        <div className="w-full min-h-screen bg-white">
            <div className="bg-[#111111] h-[260px] animate-pulse relative overflow-hidden">
                <div
                    className="absolute inset-0 opacity-[0.035]"
                    style={{
                        backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                    }}
                />
            </div>
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
    const { 
        color: genColor, roman, nameEs, year, games, mascot, 
        description, mechanics, gamesArtwork, evolutions, starters, legendaries 
    } = meta;

    // Info estática (region)
    const regionName = generation.main_region?.name ?? "";

    return (
        <>
            {/* Transición de entrada ("Split Door" brutalista) */}
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
                {/* HERO ────────────────────────────────────────── */}
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

                <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12 space-y-16 relative z-10">

                    {/* 1. Descripción General */}
                    <GenerationGeneralDescription description={description} genColor={genColor} />

                    {/* 2. Videojuegos Principales */}
                    <GenerationGamesSection gamesArtwork={gamesArtwork} genColor={genColor} />

                    {/* 3. Novedades y Mecánicas */}
                    {mechanics && mechanics.length > 0 && (
                        <GenerationMechanicsSection mechanics={mechanics} genColor={genColor} />
                    )}

                    {/* 4. Movimientos (Enrutamiento con filtro) */}
                    <GenerationMovesRedirect generationName={generation.name} genColor={genColor} />

                    {/* 5. Formas de Evolución (GIFs) */}
                    {evolutions && evolutions.length > 0 && (
                        <GenerationEvolutionsSection evolutions={evolutions} genColor={genColor} />
                    )}

                    {/* 6. Pokémon Introducidos (Pokédex Button, Iniciales, Legendarios) */}
                    <GenerationPokemonSection 
                        generationName={generation.name} 
                        genColor={genColor} 
                        starters={starters} 
                        legendaries={legendaries} 
                        totalCount={generation.pokemon_species.length}
                    />

                    {/* 7. Región (Liga Pokémon) */}
                    <GenerationRegionSection regionName={regionName} genColor={genColor} />

                    {/* 8. Navegación (Prev/Next) */}
                    <GenerationNavStrip currentGeneration={generation.name} genColor={genColor} />

                </div>
            </motion.main>
        </>
    );
}