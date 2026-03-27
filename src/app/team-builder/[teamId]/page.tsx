"use client";

import { Suspense, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

import { useTeamBuilderStore } from "@/lib/stores/teamBuilderStore";
import { decodeTeamFromUrl } from "@/lib/utils/team-sharing";
import { buildFullAnalysis } from "@/lib/utils/team-scoring";
import { ScrollProgressBar } from "@/components/shared/scroll-progress-bar";

import { PageTransitionTeamBuilder } from "@/components/shared/page-transition-team-builder";
import { TeamSlotsRow } from "@/components/team-builder/team-slots-row";
import { TeamMiniPreview } from "@/components/team-builder/team-mini-preview";
import { TeamScoreCard } from "@/components/team-builder/team-score-card";
import { TypeCoverageMatrix } from "@/components/team-builder/type-coverage-matrix";
import { DefensiveWeaknessesChart } from "@/components/team-builder/defensive-weaknesses-chart";
import { OffensiveCoverageChart } from "@/components/team-builder/offensive-coverage-chart";
import { TeamStatRadar } from "@/components/team-builder/team-stat-radar";
import { TeamSpeedTier } from "@/components/team-builder/team-speed-tier";
import { TeamRolesPanel } from "@/components/team-builder/team-roles-panel";
import { TeamSynergyPanel } from "@/components/team-builder/team-synergy-panel";
import {
    AnalysisSection, SectionDivider, InfoPanel,
} from "@/components/team-builder/team-builder-layout";
import { ArrowLeft, Edit3, ExternalLink } from "lucide-react";

function SharedTeamContent() {
    const { teamId } = useParams<{ teamId: string }>();
    const router = useRouter();
    const { loadTeamData, activeTeam } = useTeamBuilderStore();

    const decoded = decodeTeamFromUrl(teamId ?? "");

    const members = activeTeam.members;
    const analysis = members.length > 0 ? buildFullAnalysis(members) : null;

    const handleEdit = () => {
        router.push(`/team-builder?team=${teamId}`);
    };

    if (!decoded) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center px-4">
                <div className="border-2 border-[#111111] p-8 text-center max-w-[400px]" style={{ boxShadow: "4px 4px 0 #CC0000" }}>
                    <p className="font-press-start text-[12px] text-[#CC0000] mb-3">EQUIPO INVÁLIDO</p>
                    <p className="font-nunito text-[14px] text-[#888888] mb-5">
                        El enlace de este equipo está corrupto o ha expirado.
                    </p>
                    <Link href="/team-builder">
                        <motion.button
                            className="border-2 border-[#111111] px-5 py-3 font-press-start text-[9px] bg-white hover:bg-[#111111] hover:text-white transition-colors"
                            style={{ boxShadow: "3px 3px 0 #CC0000" }}
                        >
                            CREAR MI EQUIPO
                        </motion.button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <>
            <PageTransitionTeamBuilder />
            <ScrollProgressBar color="#CC0000" />

            <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.02]"
                style={{ backgroundImage: "radial-gradient(#111111 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

            <motion.main className="relative min-h-screen bg-white"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.32 }}>

                <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 relative z-10">
                    {/* Nav */}
                    <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                        <div className="flex items-center gap-3">
                            <Link href="/team-builder">
                                <button className="flex items-center gap-1.5 font-nunito text-[13px] text-[#888888] hover:text-[#111111] transition-colors">
                                    <ArrowLeft size={14} /> Volver al constructor
                                </button>
                            </Link>
                            <div className="h-4 w-px bg-[#E0E0E0]" />
                            <p className="font-nunito text-[13px] text-[#888888]">Equipo compartido · Solo lectura</p>
                        </div>

                        <motion.button onClick={handleEdit}
                            className="flex items-center gap-2 border-2 border-[#111111] px-4 py-2.5 font-press-start text-[9px] text-white bg-[#CC0000]"
                            style={{ boxShadow: "3px 3px 0 #111111" }}
                            whileHover={{ x: 3, y: 3, boxShadow: "0px 0px 0 transparent" }}>
                            <Edit3 size={12} /> EDITAR ESTE EQUIPO
                        </motion.button>
                    </div>

                    {/* Cabecera del equipo */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="font-press-start text-[16px] text-[#111111]">{decoded.name.toUpperCase()}</h1>
                            <div className="px-2.5 py-1 bg-[#F0F0F0] border border-[#E0E0E0]">
                                <span className="font-press-start text-[8px] text-[#888888]">COMPARTIDO</span>
                            </div>
                        </div>
                        <p className="font-nunito text-[13px] text-[#888888]">
                            {decoded.memberData.length} Pokémon en el equipo
                        </p>
                    </div>

                    {/* Separador */}
                    <div className="relative h-[5px] mb-8">
                        <div className="absolute top-0 left-0 w-full h-[3px] bg-[#111111]" />
                        <div className="absolute bottom-0 right-0 w-full h-[2px] bg-[#CC0000]" />
                    </div>

                    {/* Info si el equipo no se ha cargado */}
                    {members.length === 0 && decoded.memberData.length > 0 && (
                        <InfoPanel label="Equipo compartido" labelColor="#F59E0B" shadowColor="#F59E0B">
                            <p className="font-nunito text-[14px] text-[#D97706] mb-2">
                                Este equipo fue compartido con <strong>{decoded.memberData.length} Pokémon</strong>.
                            </p>
                            <p className="font-nunito text-[13px] text-[#92400E] mb-4">
                                Haz clic en "Editar este equipo" para cargarlo en el constructor y ver el análisis completo.
                            </p>
                            <motion.button onClick={handleEdit}
                                className="flex items-center gap-2 border-2 border-[#111111] px-5 py-2.5 font-press-start text-[9px] text-white bg-[#CC0000]"
                                style={{ boxShadow: "3px 3px 0 #111111" }}
                                whileHover={{ x: 3, y: 3, boxShadow: "0px 0px 0 transparent" }}>
                                <Edit3 size={11} /> CARGAR Y EDITAR
                            </motion.button>
                        </InfoPanel>
                    )}

                    {/* Slots */}
                    {members.length > 0 && (
                        <div className="mb-10">
                            <TeamSlotsRow weaknesses={analysis?.defensiveWeaknesses} />
                        </div>
                    )}

                    {/* Análisis completo */}
                    {analysis && members.length > 0 && (
                        <div className="space-y-5">
                            <SectionDivider label="Análisis del Equipo Compartido" />

                            <AnalysisSection title="Puntuación Global" defaultOpen accent="#CC0000">
                                <TeamScoreCard analysis={analysis} />
                            </AnalysisSection>

                            <AnalysisSection title="Matriz de Tipos" defaultOpen accent="#3B82F6">
                                <TypeCoverageMatrix analysis={analysis} members={members} />
                            </AnalysisSection>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                                <AnalysisSection title="Debilidades Defensivas" accent="#EF4444">
                                    <DefensiveWeaknessesChart analysis={analysis} totalMembers={members.length} />
                                </AnalysisSection>
                                <AnalysisSection title="Cobertura Ofensiva" accent="#22C55E">
                                    <OffensiveCoverageChart analysis={analysis} />
                                </AnalysisSection>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                                <AnalysisSection title="Stats del Equipo" accent="#F59E0B">
                                    <TeamStatRadar members={members} />
                                </AnalysisSection>
                                <AnalysisSection title="Tier de Velocidad" accent="#F472B6">
                                    <TeamSpeedTier members={members} />
                                </AnalysisSection>
                            </div>

                            <AnalysisSection title="Roles del Equipo" defaultOpen accent="#8B5CF6">
                                <TeamRolesPanel members={members} />
                            </AnalysisSection>

                            <AnalysisSection title="Sinergias Detectadas" defaultOpen accent="#14B8A6">
                                <TeamSynergyPanel analysis={analysis} />
                            </AnalysisSection>
                        </div>
                    )}

                    {/* CTA */}
                    <div className="mt-12 border-2 border-[#E0E0E0] p-8 text-center">
                        <p className="font-press-start text-[11px] text-[#888888] mb-3">¿QUIERES CREAR TU PROPIO EQUIPO?</p>
                        <p className="font-nunito text-[14px] text-[#888888] mb-5">
                            Usa el Constructor de Equipos para analizar tus propias estrategias.
                        </p>
                        <Link href="/team-builder">
                            <motion.button
                                className="flex items-center gap-2 border-2 border-[#111111] px-6 py-3 font-press-start text-[10px] text-white bg-[#CC0000] mx-auto"
                                style={{ boxShadow: "4px 4px 0 #111111" }}
                                whileHover={{ x: 4, y: 4, boxShadow: "0px 0px 0 transparent" }}>
                                <ExternalLink size={12} /> ABRIR CONSTRUCTOR
                            </motion.button>
                        </Link>
                    </div>
                </div>
            </motion.main>
        </>
    );
}

export default function SharedTeamPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-white flex items-center justify-center">
                <span className="font-press-start text-[11px] text-[#111111]">CARGANDO EQUIPO...</span>
            </div>
        }>
            <SharedTeamContent />
        </Suspense>
    );
}