"use client";

import { Suspense, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQueryState } from "nuqs";
import { Users, Upload, FolderOpen, ChevronRight } from "lucide-react";

import { useTeamBuilderStore } from "@/lib/stores/teamBuilderStore";
import { useTeamAnalysis, useTeamRecommendations } from "@/lib/hooks/useTeamAnalysis";
import { encodeTeam, decodeTeamFromUrl } from "@/lib/utils/team-sharing";
import { ScrollProgressBar } from "@/components/shared/scroll-progress-bar";

import { PageTransitionTeamBuilder } from "@/components/shared/page-transition-team-builder";
import { TeamHeader } from "@/components/team-builder/team-header";
import { TeamSlotsRow } from "@/components/team-builder/team-slots-row";
import { PokemonSearchModal } from "@/components/team-builder/pokemon-search-modal";
import { TeamShareModal } from "@/components/team-builder/team-share-modal";
import { TeamImportModal } from "@/components/team-builder/team-import-modal";
import { TeamEmptyState } from "@/components/team-builder/team-empty-state";
import { TeamScoreCard } from "@/components/team-builder/team-score-card";
import { TypeCoverageMatrix } from "@/components/team-builder/type-coverage-matrix";
import { DefensiveWeaknessesChart } from "@/components/team-builder/defensive-weaknesses-chart";
import { OffensiveCoverageChart } from "@/components/team-builder/offensive-coverage-chart";
import { TeamStatsAndSpeedPanel } from "@/components/team-builder/team-stats-and-speed-panel";
import { TeamRolesPanel } from "@/components/team-builder/team-roles-panel";
import { TeamSynergyPanel } from "@/components/team-builder/team-synergy-panel";
import { RecommendationCard } from "@/components/team-builder/recommendation-card";
import { WeaknessCoverageFinder } from "@/components/team-builder/weakness-coverage-finder";
import { TeamComparisonPanel } from "@/components/team-builder/team-comparison-panel";
import { TeamPokemonPool } from "@/components/team-builder/team-pokemon-pool";
import { TeamSavePanel } from "@/components/team-builder/team-save-panel";
import {
    AnalysisSection, SectionDivider, InfoPanel,
} from "@/components/team-builder/team-builder-layout";

function TeamBuilderContent() {
    const { activeTeam, loadTeamData } = useTeamBuilderStore();
    const analysis = useTeamAnalysis();
    const recommendations = useTeamRecommendations();
    const members = activeTeam.members;

    const [teamParam, setTeamParam] = useQueryState("team");
    const [shareOpen, setShareOpen] = useState(false);
    const [importOpen, setImportOpen] = useState(false);
    const [saveOpen, setSaveOpen] = useState(false);

    useEffect(() => {
        if (!teamParam) return;
        const decoded = decodeTeamFromUrl(teamParam);
        if (decoded && decoded.memberData.length > 0 && activeTeam.members.length === 0) {
            loadTeamData({
                id: Date.now().toString(36), name: decoded.name, members: [],
                createdAt: Date.now(), updatedAt: Date.now(),
            });
        }
    }, []); // eslint-disable-line

    useEffect(() => {
        if (members.length === 0) { setTeamParam(null); return; }
        setTeamParam(encodeTeam(activeTeam));
    }, [members.map((m) => m.pokemonId).join(",")]); // eslint-disable-line

    const hasMembers = members.length > 0;
    
    // Encontrar el slot libre más bajo
    let nextSlot = -1;
    if (members.length < 6) {
        for (let i = 0; i < 6; i++) {
            if (!members.some((m) => m.slot === i)) {
                nextSlot = i;
                break;
            }
        }
    }

    // Quick stats for sidebar
    const avgBST = members.length > 0
        ? Math.round(members.reduce((s, m) =>
            s + Object.values(m.baseStats).reduce((a, b) => a + b, 0), 0) / members.length)
        : null;
    const fastestSpeed = members.length > 0
        ? Math.max(...members.map((m) => m.baseStats.speed))
        : null;

    return (
        <>
            <PageTransitionTeamBuilder />
            <ScrollProgressBar color="#CC0000" />
            <PokemonSearchModal />
            <TeamShareModal isOpen={shareOpen} onClose={() => setShareOpen(false)} />
            <TeamImportModal isOpen={importOpen} onClose={() => setImportOpen(false)} />

            {/* dot grid bg */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.02]"
                style={{ backgroundImage: "radial-gradient(#111111 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

            <motion.div className="relative min-h-screen bg-white"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.32 }}>

                {/* ── HERO ──────────────────────────────────────────────────────── */}
                <div className="relative bg-[#111111] overflow-hidden">
                    {/* dot grid oscuro */}
                    <div className="absolute inset-0 pointer-events-none"
                        style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
                    {/* scanline roja */}
                    <motion.div
                        className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#CC0000]"
                        initial={{ scaleX: 0, originX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    />

                    <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 py-8 sm:py-10">
                        <p className="font-nunito text-[13px] text-[#888888] mb-4">
                            Inicio <ChevronRight size={10} className="inline" /> Constructor de Equipos
                        </p>
                        <div className="flex flex-col sm:flex-row sm:items-end gap-4 justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <h1 className="font-press-start text-[20px] sm:text-[24px] text-white leading-tight">
                                        CONSTRUCTOR
                                    </h1>
                                    <motion.div
                                        className="bg-[#CC0000] text-white px-2.5 py-1 border-2 border-white/20 self-start mt-0.5"
                                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                                        transition={{ type: "spring", bounce: 0.6, delay: 0.7 }}>
                                        <span className="font-press-start text-[9px]">BETA</span>
                                    </motion.div>
                                </div>
                                <p className="font-nunito text-[15px] text-[#AAAAAA]">
                                    Analiza tu equipo · detecta debilidades · recibe recomendaciones
                                </p>
                            </div>
                            {/* Badges de info */}
                            <div className="flex gap-3 flex-wrap">
                                {[
                                    { label: "Pokémon en el equipo", value: `${members.length}/6`, color: members.length === 6 ? "#22C55E" : "#CC0000" },
                                    ...(avgBST !== null ? [{ label: "BST promedio", value: String(avgBST), color: "#F59E0B" }] : []),
                                    ...(fastestSpeed !== null ? [{ label: "Vel. máxima", value: String(fastestSpeed), color: "#60A5FA" }] : []),
                                ].map(({ label, value, color }) => (
                                    <div key={label} className="border border-white/10 bg-white/5 px-4 py-2 text-center">
                                        <p className="font-jetbrains text-[20px] font-bold" style={{ color }}>{value}</p>
                                        <p className="font-nunito text-[11px] text-[#666666]">{label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 py-8">

                    <div className="flex flex-col xl:flex-row gap-8 xl:gap-10 items-start">

                        {/* ── ZONA A: CONSTRUCTOR (sticky) ─────────────────────── */}
                        <div className="w-full xl:w-[480px] xl:sticky xl:top-6 shrink-0 space-y-4">
                            <InfoPanel label="Mi Equipo" labelColor="#CC0000" shadowColor="#CC0000">
                                <div className="space-y-5">
                                    <TeamHeader
                                        onShareOpen={() => setShareOpen(true)}
                                        onSaveOpen={() => setSaveOpen((o) => !o)}
                                    />
                                    <TeamSlotsRow weaknesses={analysis?.defensiveWeaknesses} />
                                </div>
                            </InfoPanel>

                            {/* Botones secundarios */}
                            <div className="grid grid-cols-2 gap-3">
                                <motion.button
                                    onClick={() => setImportOpen(true)}
                                    className="flex items-center justify-center gap-2 border-2 border-[#111111] px-4 py-3 font-press-start text-[9px] text-[#111111] bg-white"
                                    style={{ boxShadow: "3px 3px 0 #E0E0E0" }}
                                    whileHover={{ x: 3, y: 3, boxShadow: "0px 0px 0 transparent" }}
                                >
                                    <Upload size={13} /> IMPORTAR
                                </motion.button>
                                <motion.button
                                    onClick={() => setSaveOpen((o) => !o)}
                                    className="flex items-center justify-center gap-2 border-2 border-[#111111] px-4 py-3 font-press-start text-[9px] bg-[#111111] text-white"
                                    style={{ boxShadow: "3px 3px 0 #CC0000" }}
                                    whileHover={{ x: 3, y: 3, boxShadow: "0px 0px 0 transparent" }}
                                >
                                    <FolderOpen size={13} />
                                    {saveOpen ? "OCULTAR" : "GUARDADOS"}
                                </motion.button>
                            </div>

                            <AnimatePresence>
                                {saveOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <TeamSavePanel />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* ── ZONA B: ANÁLISIS (scrollable) ────────────────────── */}
                        <div className="flex-1 min-w-0 space-y-5">
                            {!hasMembers ? (
                                <TeamEmptyState onImportClick={() => setImportOpen(true)} />
                            ) : (
                                <>
                                    <SectionDivider label="Análisis del Equipo" />

                                    {analysis && (
                                        <>
                                            <AnalysisSection 
                                                title="Puntuación Global" 
                                                defaultOpen 
                                                accent="#CC0000"
                                                infoTitle="Puntuación del Equipo"
                                                infoText={<>Calificación general basada en la sinergia, cobertura y estadísticas de tus Pokémon. Intenta equilibrar todos los aspectos para maximizar tu puntuación.</>}
                                            >
                                                <TeamScoreCard analysis={analysis} />
                                            </AnalysisSection>

                                            <AnalysisSection 
                                                title="Matriz de Tipos" 
                                                defaultOpen 
                                                accent="#3B82F6"
                                                infoTitle="Resistencias y Debilidades"
                                                infoText={<>Tabla cruzada que muestra cómo defiende tu equipo ante cada tipo de ataque. Busca cubrir las debilidades comunes con resistencias o inmunidades.</>}
                                            >
                                                <TypeCoverageMatrix analysis={analysis} members={members} />
                                            </AnalysisSection>

                                            <AnalysisSection 
                                                title="Balance Defensivo por Tipo" 
                                                accent="#8B5CF6"
                                                infoTitle="Analizador de Balance"
                                                infoText={<>Este panel muestra el equilibrio entre debilidades y resistencias para cada tipo.<br/><br/>Busca que la balanza se incline hacia la derecha (Verde/Azul) o que esté equilibrada. Evita tener tipos con muchos puntos rojos sin compensación.</>}
                                            >
                                                <DefensiveWeaknessesChart analysis={analysis} totalMembers={members.length} />
                                            </AnalysisSection>

                                            <AnalysisSection 
                                                title="Balance Ofensivo (Cobertura STAB)" 
                                                accent="#F59E0B"
                                                infoTitle="Poder de Ataque"
                                                infoText={<>Analiza qué tan bien puede tu equipo atacar de forma Súper Efectiva a los diferentes tipos.<br/><br/>Tener cobertura STAB (Same Type Attack Bonus) para los 18 tipos asegura que siempre tendrás una respuesta ofensiva contundente contra cualquier enemigo.</>}
                                            >
                                                <OffensiveCoverageChart analysis={analysis} />
                                            </AnalysisSection>

                                            <AnalysisSection 
                                                title="Análisis de Estadísticas y Velocidad" 
                                                accent="#F59E0B"
                                                infoTitle="Stats y Velocidad"
                                                infoText={<>Comparativa del promedio de las estadísticas de equipo contra la media global.<br/><br/>Además, incluye un análisis de las Tiers de Velocidad para determinar el ritmo de tus turnos en el metajuego.</>}
                                            >
                                                <TeamStatsAndSpeedPanel members={members} />
                                            </AnalysisSection>

                                            <AnalysisSection 
                                                title="Roles del Equipo" 
                                                defaultOpen 
                                                accent="#8B5CF6"
                                                infoTitle="Composición"
                                                infoText={<>Basado en las estadísticas base, nuestro sistema algorítmico infiere el rol más probable y óptimo para cada Pokémon en combate.<br/><br/>Observa el diagnóstico inferior para encontrar huecos funcionales en la sinergia de tu alineación.</>}
                                            >
                                                <TeamRolesPanel members={members} />
                                            </AnalysisSection>

                                            <AnalysisSection 
                                                title="Sinergias Detectadas" 
                                                defaultOpen 
                                                accent="#14B8A6"
                                                badge={analysis.synergies.length > 0 ? <span className="font-press-start text-[8px] text-[#111111] bg-white border border-[#E0E0E0] px-2 py-1 shrink-0">{analysis.synergies.length} {analysis.synergies.length === 1 ? "SINERGIA" : "SINERGIAS"}</span> : undefined}
                                                infoTitle="Sinergias y Combos"
                                                infoText={<>Analizamos la interacción entre los miembros de tu equipo. <br/><br/>Los equipos más fuertes no son solo la suma de sus partes, sino cómo operan juntos (ej. Núcleos defensivos, Controladores de clima o Redes de Pivotes).</>}
                                            >
                                                <TeamSynergyPanel analysis={analysis} />
                                            </AnalysisSection>
                                        </>
                                    )}

                                    <SectionDivider label="Herramientas y Recomendaciones" />

                                    {nextSlot >= 0 && (
                                        <AnalysisSection
                                            title="Recomendaciones para tu Equipo"
                                            defaultOpen 
                                            accent="#CC0000"
                                            badge={recommendations.length > 0
                                                ? <span className="font-press-start text-[8px] px-2 py-0.5 bg-[#CC0000] text-white">{recommendations.length}</span>
                                                : null}
                                            infoTitle="Sugerencias del Sistema"
                                            infoText={<>Te sugerimos tipos de Pokémon que podrían cubrir agujeros en tu composición actual o mejorar la sinergia general del equipo.</>}
                                        >
                                            {recommendations.length === 0 ? (
                                                <p className="font-nunito text-[14px] text-[#AAAAAA] italic py-6 text-center">
                                                    Añade más Pokémon para recibir recomendaciones personalizadas.
                                                </p>
                                            ) : (
                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                                    {recommendations.map((rec, i) => (
                                                        <RecommendationCard key={rec.pokemonId} rec={rec} index={i} slot={nextSlot} />
                                                    ))}
                                                </div>
                                            )}
                                        </AnalysisSection>
                                    )}

                                    <AnalysisSection 
                                        title="Cobertura por Debilidad" 
                                        accent="#60A5FA"
                                        infoTitle="Diagnóstico Crítico"
                                        infoText={<>Este panel identifica los tipos contra los cuales tu equipo es especialmente vulnerable (recibes daño x2 o x4).<br/><br/>Si ves muchos Pokémon en una fila roja, significa que ese tipo enemigo puede derrotar a gran parte de tu equipo fácilmente.</>}
                                    >
                                        <WeaknessCoverageFinder />
                                    </AnalysisSection>

                                    <AnalysisSection 
                                        title="Comparar Equipos" 
                                        accent="#F59E0B"
                                        infoTitle="Duelo de Estrategias"
                                        infoText={<>Este panel te permite enfrentar tu equipo actual contra las versiones almacenadas en tu PC.<br/><br/>Compara métricas como puntuación total, sinergias y debilidades para decidir qué variante es la más sólida para combatir.</>}
                                    >
                                        <TeamComparisonPanel />
                                    </AnalysisSection>

                                    <SectionDivider label="Explorador de Pokémon" />

                                    <AnalysisSection 
                                        title="Explorador" 
                                        defaultOpen={false} 
                                        accent="#888888"
                                        infoTitle="Biblioteca Nacional Pokémon"
                                        infoText={<>Utiliza este potente buscador para filtrar entre las 1025+ especies registradas hasta Gen IX.<br/><br/>Puedes buscar por nombre, tipo o generación. El sistema resaltará con una estrella ★ a los candidatos ideales para mejorar el balance actual de tu equipo.</>}
                                    >
                                        <TeamPokemonPool />
                                    </AnalysisSection>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    );
}

export default function TeamBuilderPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#111111] flex items-center justify-center">
                <div className="border-2 border-white/20 px-8 py-5" style={{ boxShadow: "4px 4px 0 #CC0000" }}>
                    <span className="font-press-start text-[11px] text-white">CARGANDO...</span>
                </div>
            </div>
        }>
            <TeamBuilderContent />
        </Suspense>
    );
}
