"use client";

import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";

import { useNature } from "@/lib/hooks/useNatures";
import { NATURES_DATA, STAT_COLORS } from "@/lib/constants/natures.constants";
import { NatureDetailHero } from "@/components/natures/nature-detail-hero";
import { NatureStatDisplay } from "@/components/natures/nature-stat-display";
import { NatureFlavorPanel } from "@/components/natures/nature-flavor-panel";
import { NatureCompetitiveTips } from "@/components/natures/nature-competitive-tips";
import { NaturePokeathlonPanel } from "@/components/natures/nature-pokeathlon-panel";
import { NatureNavStrip } from "@/components/natures/nature-nav-strip";
import { PageTransitionNature } from "@/components/shared/page-transition-nature";
import { ScrollProgressBar } from "@/components/shared/scroll-progress-bar";

// ── Skeleton de carga ─────────────────────────────────────────────────────────
function LoadingSkeleton() {
    return (
        <div className="w-full min-h-screen bg-white">
            <div className="bg-[#111111] h-[260px] animate-pulse relative overflow-hidden">
                <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "28px 28px" }}
                />
            </div>
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12 space-y-12">
                {[140, 240, 200, 220, 160].map((h, i) => (
                    <div key={i} className="border-2 border-[#E0E0E0] bg-[#F8F8F8] animate-pulse" style={{ height: h }} />
                ))}
            </div>
        </div>
    );
}

// ── Página principal ──────────────────────────────────────────────────────────
export default function NatureDetailPage() {
    const { nameOrId } = useParams<{ nameOrId: string }>();

    const { data: nature, isLoading, isError } = useNature(nameOrId);

    // Meta hardcodeada (nombres ES, stats, sabores)
    const meta = NATURES_DATA.find(
        (n) => n.name === nameOrId || String(n.name) === String(nameOrId)
    );

    // Color primario: stat subido (o gris si neutral o no encontrado)
    const primaryColor = meta?.increased
        ? (STAT_COLORS[meta.increased] ?? "#888888")
        : "#888888";

    if (isLoading) return <LoadingSkeleton />;
    if (isError || !nature || !meta) return notFound();

    return (
        <>
            {/* Transición de entrada */}
            <PageTransitionNature primaryColor={primaryColor} nameEs={meta.nameEs} />

            {/* Scrollbar del color del stat */}
            <style jsx global>{`
        ::-webkit-scrollbar-thumb { background-color: ${primaryColor}; }
      `}</style>

            {/* Tinte radial del color del stat */}
            <div
                className="fixed inset-0 pointer-events-none z-0 hidden md:block"
                style={{ background: `radial-gradient(circle at 0% 0%, ${primaryColor}07, transparent 50%)` }}
            />

            <ScrollProgressBar color={primaryColor} />

            <motion.main
                className="relative z-10 bg-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.62 }}
            >
                {/* 1 — HERO */}
                <NatureDetailHero nature={nature} meta={meta} primaryColor={primaryColor} />

                {/* 2 — BODY */}
                <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12 space-y-16 relative z-10">

                    {/* Modificadores de stat + mini calculadora */}
                    <NatureStatDisplay nature={nature} meta={meta} />

                    {/* Sabores y bayas */}
                    <NatureFlavorPanel nature={nature} meta={meta} />

                    {/* Uso competitivo + Pokémon icónicos */}
                    <NatureCompetitiveTips nature={nature} meta={meta} primaryColor={primaryColor} />

                    {/* Pokéatlón (colapsado) */}
                    {nature.pokeathlon_stat_changes.length > 0 && (
                        <NaturePokeathlonPanel
                            changes={nature.pokeathlon_stat_changes}
                            primaryColor={primaryColor}
                        />
                    )}

                    {/* Navegación entre las 25 naturalezas */}
                    <NatureNavStrip currentNature={nature.name} />

                </div>
            </motion.main>
        </>
    );
}