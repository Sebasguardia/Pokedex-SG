"use client";

import { notFound } from "next/navigation";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { useQueryState } from "nuqs";

import { useRegion, useRegionalPokedex } from "@/lib/hooks/useLocations";
import { getRegionMeta } from "@/lib/constants/locations.constants";
import { GENERATION_COLORS, GENERATION_ROMAN } from "@/lib/constants/generations.constants";

import { RegionDetailHero } from "@/components/locations/region-detail-hero";
import { RegionStatsRow } from "@/components/locations/region-stats-row";
import { RegionGenerationLink } from "@/components/locations/region-generation-link";
import { RegionLocationsList } from "@/components/locations/region-locations-list";
import { RegionPokedexSection } from "@/components/locations/region-pokedex-section";
import { RegionVersionGroups } from "@/components/locations/region-version-groups";
import { RegionNavStrip } from "@/components/locations/region-nav-strip";
import { PageTransitionRegion } from "@/components/shared/page-transition-region";
import { ScrollProgressBar } from "@/components/shared/scroll-progress-bar";

// ── Loading skeleton ──────────────────────────────────────────────
function LoadingSkeleton() {
    return (
        <div className="w-full min-h-screen bg-white">
            <div className="bg-[#111111] h-[300px] animate-pulse relative overflow-hidden">
                <div
                    className="absolute inset-0 opacity-[0.035]"
                    style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "28px 28px" }}
                />
            </div>
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12 space-y-12">
                {[160, 80, 500, 400].map((h, i) => (
                    <div key={i} className="border-2 border-[#E0E0E0] bg-[#F8F8F8] animate-pulse" style={{ height: h }} />
                ))}
            </div>
        </div>
    );
}

// ── Page ──────────────────────────────────────────────────────────
export default function RegionDetailPage() {
    // El route param es el nombre de la región en inglés ("kanto", "johto"...)
    const { region: regionParam } = useParams<{ region: string }>();

    // Query param para pre-abrir una locación específica (desde página de Pokémon)
    // Ejemplo: /locations/kanto?location=mt-moon
    const [preOpenLocation] = useQueryState("location");

    const { data: region, isLoading, isError } = useRegion(regionParam);
    const meta = getRegionMeta(regionParam);
    const { color: regionColor, nameEs, description, inspiration, year, games, generation, pokedex } = meta;

    // Pokédex regional en paralelo
    const { data: regionalPokedex } = useRegionalPokedex(pokedex, !!region);

    // Datos de la generación vinculada (cross-link)
    const genColor = GENERATION_COLORS[generation] ?? "#CC0000";
    const genRoman = GENERATION_ROMAN[generation] ?? "?";

    if (isLoading) return <LoadingSkeleton />;
    if (isError || !region) return notFound();

    return (
        <>
            {/* Transición de entrada — letras del nombre cayendo */}
            <PageTransitionRegion regionColor={regionColor} nameEs={nameEs} />

            {/* Scrollbar del color de la región */}
            <style jsx global>{`
        ::-webkit-scrollbar-thumb { background-color: ${regionColor}; }
      `}</style>

            {/* Tinte radial esquina superior izquierda */}
            <div
                className="fixed inset-0 pointer-events-none z-0 hidden md:block"
                style={{ background: `radial-gradient(circle at 0% 0%, ${regionColor}06, transparent 55%)` }}
            />

            <ScrollProgressBar color={regionColor} />

            <motion.main
                className="relative z-10 bg-white overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.65 }}
            >
                {/* 1 ── HERO ──────────────────────────────────────────── */}
                <RegionDetailHero
                    region={region}
                    regionColor={regionColor}
                    nameEs={nameEs}
                    description={description}
                    inspiration={inspiration}
                    year={year}
                    games={games}
                    generation={generation}
                    pokedexCount={regionalPokedex?.pokemon_entries.length}
                />

                {/* 2 ── BODY ──────────────────────────────────────────── */}
                <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12 space-y-16 relative z-10">

                    {/* Stats: 4 métricas */}
                    <RegionStatsRow
                        region={region}
                        regionColor={regionColor}
                        pokedexCount={regionalPokedex?.pokemon_entries.length}
                    />

                    {/* Link cruzado a la generación */}
                    <RegionGenerationLink
                        generation={generation}
                        regionColor={regionColor}
                        roman={genRoman}
                        genColor={genColor}
                    />

                    {/* Lista virtualizada de locaciones — la más importante */}
                    <RegionLocationsList
                        locations={region.locations}
                        regionColor={regionColor}
                        regionName={nameEs}
                        preOpenLocation={preOpenLocation ?? undefined}
                    />

                    {/* Pokédex regional con búsqueda y toggle de vista */}
                    <RegionPokedexSection
                        pokedexName={pokedex}
                        regionColor={regionColor}
                        regionNameEs={nameEs}
                    />

                    {/* Versiones en las que aparece esta región */}
                    <RegionVersionGroups
                        versionGroups={region.version_groups}
                        regionColor={regionColor}
                        games={games}
                    />

                    {/* Strip de navegación entre las 9 regiones */}
                    <RegionNavStrip currentRegion={region.name} />

                </div>
            </motion.main>
        </>
    );
}