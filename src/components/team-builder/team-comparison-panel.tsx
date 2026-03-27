"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Minus, TrendingUp, TrendingDown, Swords, Info, CheckCircle2, AlertTriangle, Shield, Zap, Target, Heart } from "lucide-react";
import { useTeamBuilderStore } from "@/lib/stores/teamBuilderStore";
import { buildFullAnalysis } from "@/lib/utils/team-scoring";
import { TeamMiniPreview } from "./team-mini-preview";
import { getScoreMeta } from "@/lib/constants/team-builder.constants";

// ── COMPONENTE TOOLTIP PERSONALIZADO ──
function CustomTooltip({ children, content, side = "top" }: { children: React.ReactNode; content: React.ReactNode; side?: "top" | "left" | "right" }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="relative inline-block" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
            {children}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: side === "top" ? 5 : 0, x: side === "left" ? 5 : side === "right" ? -5 : 0 }}
                        animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className={`absolute z-[100] p-3 border-2 border-[#111111] bg-white text-[#111111] shadow-[4px_4px_0_#111111] rounded-none pointer-events-none whitespace-normal min-w-[220px]
                            ${side === "top" ? "bottom-full left-1/2 -translate-x-1/2 mb-2" : ""}
                            ${side === "left" ? "right-full top-1/2 -translate-y-1/2 mr-3" : ""}
                            ${side === "right" ? "left-full top-1/2 -translate-y-1/2 ml-3" : ""}
                        `}
                    >
                        {content}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export function TeamComparisonPanel() {
    const { activeTeam, savedTeams, compareTeamId, setCompareTeamId } = useTeamBuilderStore();

    const compareTeam = savedTeams.find((t) => t.id === compareTeamId);

    const analysisA = useMemo(
        () => activeTeam.members.length > 0 ? buildFullAnalysis(activeTeam.members) : null,
        [activeTeam.members.map((m) => m.pokemonId).join(",")]
    );
    const analysisB = useMemo(
        () => compareTeam && compareTeam.members.length > 0 ? buildFullAnalysis(compareTeam.members) : null,
        [compareTeam?.members.map((m) => m.pokemonId).join(",")]
    );

    const metrics = [
        { label: "Puntuación Total", icon: <Trophy size={14} />, keyA: analysisA?.overallScore, keyB: analysisB?.overallScore, higherIsBetter: true },
        { label: "Poder Ofensivo", icon: <Zap size={14} />, keyA: analysisA?.offensiveScore, keyB: analysisB?.offensiveScore, higherIsBetter: true },
        { label: "Capacidad Defensiva", icon: <Shield size={14} />, keyA: analysisA?.defensiveScore, keyB: analysisB?.defensiveScore, higherIsBetter: true },
        { label: "Diversidad de Tipos", icon: <Target size={14} />, keyA: analysisA?.diversityScore, keyB: analysisB?.diversityScore, higherIsBetter: true },
        { label: "Inmunidades", icon: <Heart size={14} />, keyA: analysisA?.immunityScore, keyB: analysisB?.immunityScore, higherIsBetter: true },
        { label: "Debilidades x4", icon: <AlertTriangle size={14} />, keyA: analysisA?.criticalWeaknesses.length, keyB: analysisB?.criticalWeaknesses.length, higherIsBetter: false },
        { label: "Tipos no cubiertos", icon: <Minus size={14} />, keyA: analysisA?.uncoveredTypes.length, keyB: analysisB?.uncoveredTypes.length, higherIsBetter: false },
        { label: "Sinergias", icon: <CheckCircle2 size={14} />, keyA: analysisA?.synergies.length, keyB: analysisB?.synergies.length, higherIsBetter: true },
    ];

    if (activeTeam.members.length === 0) return null;

    return (
        <section className="flex flex-col gap-6">
            <div className="flex items-center justify-between border-b-2 border-[#111111] pb-4">
                <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-[#111111] text-white flex items-center justify-center border-2 border-[#111111] shadow-[3px_3px_0_#CC0000]">
                        <Swords size={22} />
                    </div>
                    <div>
                        <h3 className="font-press-start text-[14px] text-[#111111] uppercase leading-tight">Analizador Comparativo</h3>
                        <p className="font-nunito text-[14px] text-[#888888] font-black">Tu Equipo vs Reservas Guardadas</p>
                    </div>
                </div>

                <CustomTooltip 
                    side="left"
                    content={
                        <div className="space-y-3 w-[260px]">
                            <p className="font-press-start text-[9px] text-[#CC0000] uppercase mb-2 underline decoration-2">¿Cómo comparar?</p>
                            <div className="space-y-2 font-nunito text-[13px] leading-snug">
                                <p>Selecciona uno de tus equipos guardados para ver una comparativa detallada de métricas clave.</p>
                                <p>El sistema resaltará en **verde** al ganador de cada categoría.</p>
                                <div className="h-px bg-slate-100 my-2" />
                                <p className="italic text-[#888888]">Usa esta herramienta para decidir qué equipo es más equilibrado según el metajuego actual.</p>
                            </div>
                        </div>
                    }
                >
                    <button className="w-8 h-8 rounded-full border-2 border-[#111111] flex items-center justify-center bg-[#FAFAFA] hover:bg-white transition-colors shadow-[2px_2px_0_#111111]">
                        <Info size={16} className="text-[#111111]" />
                    </button>
                </CustomTooltip>
            </div>

            {/* Selector de equipos (Thumbnails Pro) */}
            <div className="space-y-3">
                <p className="font-press-start text-[9px] text-[#888888] uppercase tracking-widest pl-1">Seleccionar Oponente:</p>
                {savedTeams.length === 0 ? (
                    <div className="p-6 border-2 border-dashed border-[#E0E0E0] text-center">
                        <p className="font-nunito text-[14px] text-[#AAAAAA] italic">No tienes otros equipos guardados para comparar.</p>
                    </div>
                ) : (
                    <div className="flex flex-wrap gap-3">
                        {savedTeams.map((team) => (
                            <button
                                key={team.id}
                                onClick={() => setCompareTeamId(compareTeamId === team.id ? null : team.id)}
                                className={`group relative flex items-center gap-2 border-2 p-2.5 transition-all active:scale-95 ${
                                    compareTeamId === team.id
                                        ? "border-[#CC0000] bg-[#FFF5F5] shadow-[3px_3px_0_#CC0000] -translate-y-0.5"
                                        : "border-[#11111115] bg-white hover:border-[#111111] hover:shadow-[3px_3px_0_#111111]"
                                }`}
                            >
                                <TeamMiniPreview team={team} size="xs" showScore={false} showName />
                                {compareTeamId === team.id && (
                                    <div className="absolute -top-2 -right-2 bg-[#CC0000] text-white rounded-full p-0.5 border-2 border-white">
                                        <CheckCircle2 size={10} />
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <AnimatePresence mode="wait">
                {compareTeam ? (
                    <motion.div
                        key={compareTeam.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        className="flex flex-col gap-6"
                    >
                        {/* ── ESCENARIO VS ── */}
                        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-stretch">
                            {/* Team A Card */}
                            <div className="relative border-2 border-[#CC0000] bg-[#FFF5F5] p-5 shadow-[4px_4px_0_#CC0000]">
                                <div className="absolute top-[-12px] left-4 px-2 py-0.5 bg-[#CC0000] text-white border-2 border-[#111111]">
                                    <span className="font-press-start text-[8px]">TU EQUIPO</span>
                                </div>
                                <h4 className="font-press-start text-[14px] text-[#111111] mb-4 truncate">{activeTeam.name.toUpperCase()}</h4>
                                <TeamMiniPreview team={activeTeam} size="sm" showScore />
                            </div>

                            {/* VS Badge Central */}
                            <div className="flex flex-row md:flex-col items-center justify-center gap-4">
                                <div className="h-px md:w-px bg-[#E0E0E0] flex-1" />
                                <div className="w-14 h-14 rounded-full bg-[#111111] border-4 border-white flex items-center justify-center text-white shadow-xl rotate-12 group-hover:rotate-0 transition-transform">
                                    <span className="font-press-start text-[14px]">VS</span>
                                </div>
                                <div className="h-px md:w-px bg-[#E0E0E0] flex-1" />
                            </div>

                            {/* Team B Card */}
                            <div className="relative border-2 border-[#111111] bg-white p-5 shadow-[4px_4px_0_#111111]">
                                <div className="absolute top-[-12px] right-4 px-2 py-0.5 bg-[#111111] text-white border-2 border-[#111111]">
                                    <span className="font-press-start text-[8px]">COMPARADO</span>
                                </div>
                                <h4 className="font-press-start text-[14px] text-[#111111] mb-4 truncate text-right">{compareTeam.name.toUpperCase()}</h4>
                                <div className="flex justify-end">
                                    <TeamMiniPreview team={compareTeam} size="sm" showScore />
                                </div>
                            </div>
                        </div>

                        {/* ── TABLA DE MÉTRICAS PRO ── */}
                        <div className="border-2 border-[#111111] bg-white overflow-hidden shadow-[4px_4px_0_#111111]">
                            <div className="bg-[#111111] p-3 border-b-2 border-[#111111]">
                                <p className="font-press-start text-[9px] text-white/60 tracking-widest text-center uppercase">Desglose de Rendimiento</p>
                            </div>
                            
                            <div className="divide-y divide-slate-100">
                                {metrics.map((m, idx) => {
                                    if (m.keyA === undefined || m.keyB === undefined) return null;
                                    const aWins = m.higherIsBetter ? m.keyA > m.keyB : m.keyA < m.keyB;
                                    const bWins = m.higherIsBetter ? m.keyB > m.keyA : m.keyB < m.keyA;
                                    const tie = m.keyA === m.keyB;

                                    return (
                                        <div key={m.label} className="grid grid-cols-[1fr_auto_1fr] items-center group hover:bg-[#F8FAFC] transition-colors">
                                            {/* Valor A */}
                                            <div className={`py-4 px-6 text-right transition-all ${aWins ? "bg-emerald-50/40" : ""}`}>
                                                <span className={`font-jetbrains text-[20px] font-bold ${aWins ? "text-emerald-600" : bWins ? "text-red-400 opacity-60" : "text-slate-400"}`}>
                                                    {m.keyA}
                                                </span>
                                            </div>

                                            {/* Etiqueta Central */}
                                            <div className="w-[180px] sm:w-[240px] px-2 py-4 flex flex-col items-center justify-center border-x border-slate-100 relative bg-white group-hover:bg-[#F8FAFC]">
                                                <div className="flex items-center gap-2 text-[#64748B] mb-0.5">
                                                    {m.icon}
                                                    <span className="font-nunito text-[12px] font-black uppercase tracking-tight">{m.label}</span>
                                                </div>
                                                {tie && <div className="font-press-start text-[7px] text-slate-300">TABLAS</div>}
                                                {!tie && (
                                                    <div className={`absolute bottom-1 w-12 h-0.5 rounded-full ${aWins ? "bg-emerald-500 -translate-x-full left-1/2" : "bg-emerald-500 translate-x-0 ml-1 left-1/2"}`} />
                                                )}
                                            </div>

                                            {/* Valor B */}
                                            <div className={`py-4 px-6 transition-all ${bWins ? "bg-emerald-50/40" : ""}`}>
                                                <span className={`font-jetbrains text-[20px] font-bold ${bWins ? "text-emerald-600" : aWins ? "text-red-400 opacity-60" : "text-slate-400"}`}>
                                                    {m.keyB}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* ── BANER DE GANADOR CELEBRATORIO ── */}
                        {analysisA && analysisB && (
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className={`relative p-6 border-2 border-[#111111] overflow-hidden shadow-[6px_6px_0_#111111] ${
                                    analysisA.overallScore >= analysisB.overallScore ? "bg-[#ECFDF5]" : "bg-[#FFFBEB]"
                                }`}
                            >
                                {/* Patrón de fondo animado */}
                                <div className="absolute inset-0 opacity-10 bg-[url('/pattern-diagonal.png')] animate-[pulse_2s_infinite]" />
                                
                                <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-5 text-center sm:text-left">
                                    <div className={`w-16 h-16 rounded-full flex items-center justify-center border-2 border-[#111111] shadow-[3px_3px_0_#111111] ${
                                        analysisA.overallScore >= analysisB.overallScore ? "bg-[#10B981] text-white" : "bg-[#F59E0B] text-white"
                                    }`}>
                                        <Trophy size={32} />
                                    </div>
                                    
                                    <div>
                                        <p className="font-press-start text-[14px] text-[#111111] mb-2 uppercase">
                                            {analysisA.overallScore > analysisB.overallScore
                                                ? "🏆 ¡Tu Equipo es Superior!"
                                                : analysisA.overallScore < analysisB.overallScore
                                                    ? `🤔 ${compareTeam.name.toUpperCase()} es mejor`
                                                    : "⚔️ Empate Técnico"}
                                        </p>
                                        <p className="font-nunito text-[16px] text-[#444444] font-medium leading-tight">
                                            La victoria se decide por <span className="font-bold underline">{(Math.abs(analysisA.overallScore - analysisB.overallScore))} puntos</span> de diferencia.
                                        </p>
                                    </div>

                                    <div className="flex-1 flex justify-end">
                                        <div className="bg-white border-2 border-[#111111] px-4 py-2 shadow-[3px_3px_0_#111111]">
                                            <span className="font-jetbrains text-[18px] font-bold text-[#111111]">
                                                {analysisA.overallScore} <span className="text-[12px] opacity-40">VS</span> {analysisB.overallScore}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                ) : (
                    <div className="p-12 border-2 border-dashed border-[#E0E0E0] bg-[#FAFAFA] flex flex-col items-center justify-center text-center opacity-70">
                        <Swords size={48} className="text-[#CCCCCC] mb-4" />
                        <h4 className="font-press-start text-[12px] text-[#AAAAAA] mb-2 uppercase">Selecciona un Equipo</h4>
                        <p className="font-nunito text-[15px] text-[#AAAAAA]">Haz clic en uno de tus equipos guardados para iniciar el análisis comparativo.</p>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}