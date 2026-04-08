"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Zap, AlertTriangle, Info, CheckCircle2, ShieldAlert } from "lucide-react";
import { TeamAnalysis } from "@/types/api/team-builder.types";
import {
    TYPE_COLORS, TYPE_NAMES_ES, PIXEL_URL, ALL_TYPES,
} from "@/lib/constants/team-builder.constants";

interface OffensiveCoverageChartProps {
    analysis: TeamAnalysis;
}

// ── COMPONENTE TOOLTIP PERSONALIZADO (Consistente con Defensivo) ──
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

export function OffensiveCoverageChart({ analysis }: OffensiveCoverageChartProps) {
    const covered = analysis.offensiveCoverage.filter((o) => o.isCovered);
    const uncovered = analysis.offensiveCoverage.filter((o) => !o.isCovered);
    const coverPct = Math.round((covered.length / 18) * 100);

    // Ordenar: primero los tipos SIN cobertura para resaltar fallos
    const sortedTypes = [...ALL_TYPES].sort((a, b) => {
        const entryA = analysis.offensiveCoverage.find(o => o.type === a);
        const entryB = analysis.offensiveCoverage.find(o => o.type === b);
        if (entryA?.isCovered && !entryB?.isCovered) return 1;
        if (!entryA?.isCovered && entryB?.isCovered) return -1;
        return 0;
    });

    const coverColor = coverPct >= 80 ? "#10B981" : coverPct >= 50 ? "#F59E0B" : "#EF4444";

    return (
        <section className="flex flex-col gap-6">
            {/* ── HEADER DE SECCIÓN ── */}
            <div className="flex items-center justify-between border-b-2 border-[#111111] pb-4 mb-2">
                <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-[#F59E0B] text-white flex items-center justify-center border-2 border-[#111111] shadow-[3px_3px_0_#111111]">
                        <Zap size={22} fill="currentColor" />
                    </div>
                    <div>
                        <h3 className="font-press-start text-[14px] text-[#111111] uppercase leading-tight">Frente Ofensivo</h3>
                        <p className="font-nunito text-[14px] text-[#888888] font-black">Cobertura STAB vs 18 Tipos</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden sm:flex flex-col items-end">
                        <span className="font-press-start text-[14px]" style={{ color: coverColor }}>{covered.length}/18</span>
                        <span className="font-press-start text-[8px] text-[#888888]">TIPOS CUBIERTOS</span>
                    </div>

                    <CustomTooltip 
                        side="left"
                        content={
                            <div className="space-y-3 w-[280px]">
                                <p className="font-press-start text-[9px] text-[#F59E0B] uppercase mb-2 underline decoration-2">¿Qué es esto?</p>
                                <div className="space-y-2 font-nunito text-[13px] leading-snug">
                                    <p>Muestra si tu equipo tiene movimientos de **su propio tipo (STAB)** que golpeen Súper Efectivo a cada tipo defensor.</p>
                                    <p>Un equipo con **100% de cobertura** puede amenazar ofensivamente a cualquier Pokémon rival.</p>
                                    <div className="h-px bg-slate-100 my-2" />
                                    <p className="italic text-[#888888]">Busca cubrir los "Puntos Ciegos" (Rojos) para no quedarte sin opciones de ataque eficaz.</p>
                                </div>
                            </div>
                        }
                    >
                        <button className="w-8 h-8 rounded-full border-2 border-[#111111] flex items-center justify-center bg-[#FAFAFA] hover:bg-white transition-colors shadow-[2px_2px_0_#111111] active:translate-y-0.5 active:shadow-none" aria-label="Información sobre cobertura ofensiva">
                            <Info size={16} className="text-[#111111]" />
                        </button>
                    </CustomTooltip>
                </div>
            </div>

            {/* ── BARRA DE PROGRESO PRO ── */}
            <div className="relative p-6 border-2 border-[#111111] bg-white overflow-hidden shadow-[4px_4px_0_#111111]">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(#111 2px, transparent 2px)", backgroundSize: "12px 12px" }} />
                
                <div className="relative z-10 space-y-4">
                    <div className="flex justify-between items-end">
                        <span className="font-press-start text-[10px] text-[#111111] uppercase">Potencial Ofensivo Global</span>
                        <span className="font-press-start text-[20px]" style={{ color: coverColor }}>{coverPct}%</span>
                    </div>

                    <div className="h-4 bg-[#F1F5F9] border-2 border-[#111111] relative overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${coverPct}%` }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            className="h-full relative"
                            style={{ backgroundColor: coverColor }}
                        >
                            <div className="absolute inset-0 opacity-30 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:20px_20px]" />
                        </motion.div>
                        
                        {/* Divisores de 18 secciones */}
                        <div className="absolute inset-0 flex">
                            {Array.from({ length: 18 }).map((_, i) => (
                                <div key={i} className="flex-1 border-r border-[#11111122] last:border-0" />
                            ))}
                        </div>
                    </div>

                    {uncovered.length > 0 ? (
                        <div className="flex items-center gap-2 text-red-500">
                            <ShieldAlert size={14} />
                            <p className="font-nunito text-[14px] font-bold">Tienes {uncovered.length} puntos ciegos ofensivos sin cubrir.</p>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 text-emerald-600">
                            <CheckCircle2 size={14} />
                            <p className="font-nunito text-[14px] font-bold">¡Tu equipo tiene respuesta contra todos los tipos!</p>
                        </div>
                    )}
                </div>
            </div>

            {/* ── REJILLA DE TIPOS DETALLADA ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {sortedTypes.map((type, idx) => {
                    const entry = analysis.offensiveCoverage.find(o => o.type === type);
                    if (!entry) return null;

                    return (
                        <CoverageRow 
                            key={type} 
                            type={type} 
                            entry={entry} 
                            index={idx} 
                        />
                    );
                })}
            </div>
        </section>
    );
}

function CoverageRow({ type, entry, index }: {
    type: string;
    entry: any;
    index: number;
}) {
    const typeColor = TYPE_COLORS[type] ?? "#888888";
    const isCovered = entry.isCovered;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.02 }}
            className={`flex items-center gap-3 p-2 border-2 transition-all ${
                isCovered ? "bg-white border-[#E2E8F0] hover:border-[#111111]" : "bg-[#FFF1F2] border-[#FECACA] animate-pulse"
            } shadow-sm group`}
        >
            {/* Icono del Tipo Defensor */}
            <div className="w-9 h-9 shrink-0 flex items-center justify-center border-2 border-[#111111] bg-white relative z-10" style={{ boxShadow: `2px 2px 0 ${typeColor}` }}>
                <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: `${typeColor}22` }}>
                    <img src={`/icons/${type}.svg`} alt="" className="w-5 h-5" style={{ filter: `drop-shadow(0 0 2px ${typeColor})` }} />
                </div>
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                    <span className="font-press-start text-[9px] text-[#111111] truncate">
                        {TYPE_NAMES_ES[type]?.toUpperCase()}
                    </span>
                    {!isCovered && (
                        <AlertTriangle size={12} className="text-red-500" />
                    )}
                </div>

                <div className="flex items-center gap-1.5 h-8 overflow-x-auto scrollbar-none">
                    {isCovered ? (
                        <>
                            {entry.superEffective.map((m: any) => (
                                <CustomTooltip 
                                    key={m.slot}
                                    content={
                                        <div className="flex flex-col items-center gap-1 text-[#111111]">
                                            <span className="font-press-start text-[10px]">{m.nameEs.toUpperCase()}</span>
                                            <span className="font-nunito text-[12px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full">Provee STAB Eficaz</span>
                                        </div>
                                    }
                                >
                                    <div className="relative w-8 h-8 border-2 border-[#10B981] bg-white rounded-sm shrink-0 hover:scale-110 transition-all cursor-help flex items-center justify-center">
                                        <Image 
                                            src={PIXEL_URL(m.pokemonId)} 
                                            alt={m.nameEs} 
                                            width={32} height={32} 
                                            unoptimized
                                            className="object-contain" 
                                        />
                                        <div className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-white rounded-full p-0.5 border border-white">
                                            <CheckCircle2 size={8} />
                                        </div>
                                    </div>
                                </CustomTooltip>
                            ))}
                        </>
                    ) : (
                        <div className="w-full flex items-center gap-2">
                            <span className="font-press-start text-[7px] text-red-400 italic">SIN COBERTURA</span>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}