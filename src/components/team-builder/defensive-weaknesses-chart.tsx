"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Shield, AlertCircle, Info, CheckCircle2 } from "lucide-react";
import { TeamAnalysis, TeamMember } from "@/types/api/team-builder.types";
import {
    TYPE_COLORS, TYPE_NAMES_ES, PIXEL_URL, ALL_TYPES,
} from "@/lib/constants/team-builder.constants";

interface DefensiveWeaknessesChartProps {
    analysis: TeamAnalysis;
    totalMembers: number;
}

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
                        className={`absolute z-[100] p-3 border-2 border-[#111111] bg-white text-[#111111] shadow-[4px_4px_0_#111111] rounded-none pointer-events-none whitespace-normal min-w-[200px]
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

export function DefensiveWeaknessesChart({ analysis, totalMembers }: DefensiveWeaknessesChartProps) {
    const sortedTypes = [...ALL_TYPES].sort((a, b) => {
        const entryA = analysis.defensiveWeaknesses.find(w => w.type === a);
        const entryB = analysis.defensiveWeaknesses.find(w => w.type === b);
        const scoreA = (entryA?.netVulnerable ?? 0);
        const scoreB = (entryB?.netVulnerable ?? 0);
        return scoreB - scoreA;
    });

    return (
        <section className="flex flex-col gap-6">
            {/* ── HEADER DE SECCIÓN ── */}
            <div className="flex items-center justify-between border-b-2 border-[#111111] pb-4 mb-2">
                <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-[#1e3a8a] text-white flex items-center justify-center border-2 border-[#111111] shadow-[3px_3px_0_#111111]">
                        <Shield size={22} />
                    </div>
                    <div>
                        <h3 className="font-press-start text-[14px] text-[#111111] uppercase leading-tight">Analizador de Balance</h3>
                        <p className="font-nunito text-[14px] text-[#888888] font-black">Debilidades vs Resistencias por Tipo</p>
                    </div>
                </div>

                <CustomTooltip 
                    side="left"
                    content={
                        <div className="space-y-3 w-[280px]">
                            <p className="font-press-start text-[9px] text-[#1e3a8a] uppercase mb-2 underline decoration-2">Guía de Lectura</p>
                            <div className="space-y-2 font-nunito text-[13px] leading-snug">
                                <p><strong className="text-red-500">Puntos Rojos (-):</strong> Debilidades críticas o fuertes.</p>
                                <p><strong className="text-emerald-500">Puntos Verdes (+):</strong> Resistencias sólidas.</p>
                                <p><strong className="text-blue-500">Puntos Azules (★):</strong> Inmunidades completas.</p>
                                <div className="h-px bg-slate-100 my-2" />
                                <p className="italic text-[#888888]">El objetivo es que los círculos a la derecha (resistencias) compensen a los de la izquierda (debilidades).</p>
                            </div>
                        </div>
                    }
                >
                    <button className="w-8 h-8 rounded-full border-2 border-[#111111] flex items-center justify-center bg-[#FAFAFA] hover:bg-white transition-colors shadow-[2px_2px_0_#111111] active:translate-y-0.5 active:shadow-none">
                        <Info size={16} className="text-[#111111]" />
                    </button>
                </CustomTooltip>
            </div>

            {/* ── LISTA DE BALANCE ── */}
            <div className="grid gap-2">
                {sortedTypes.map((type, idx) => {
                    const entry = analysis.defensiveWeaknesses.find(w => w.type === type);
                    if (!entry) return null;

                    const isVulnerable = entry.netVulnerable > 0;
                    const isSafe = entry.netVulnerable < 0;
                    const isCritical = entry.vulnerable.some((m: any) => entry.multiplier >= 4);

                    return (
                        <BalanceRow 
                            key={type} 
                            type={type} 
                            entry={entry} 
                            index={idx} 
                            isCritical={isCritical}
                            isVulnerable={isVulnerable}
                            isSafe={isSafe}
                        />
                    );
                })}
            </div>

            {/* ── LEYENDA INFERIOR ── */}
            <div className="flex flex-wrap items-center gap-6 mt-4 p-4 bg-[#FAFAFA] border-2 border-dashed border-[#E0E0E0]">
                <div className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 bg-red-500 rounded-full" />
                    <span className="font-press-start text-[10px] text-[#888888]">Debilidad</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 bg-[#10B981] rounded-full" />
                    <span className="font-press-start text-[10px] text-[#888888]">Resistencia</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 bg-[#3B82F6] rounded-full" />
                    <span className="font-press-start text-[10px] text-[#888888]">Inmunidad</span>
                </div>
                <div className="flex items-center gap-2 ml-auto">
                    <AlertCircle size={14} className="text-red-500" />
                    <span className="font-press-start text-[10px] text-red-500">Peligro x4</span>
                </div>
            </div>
        </section>
    );
}

function BalanceRow({ type, entry, index, isCritical, isVulnerable, isSafe }: {
    type: string;
    entry: any; 
    index: number;
    isCritical: boolean;
    isVulnerable: boolean;
    isSafe: boolean;
}) {
    const typeColor = TYPE_COLORS[type] ?? "#888888";
    
    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.03 }}
            className={`group relative flex items-center gap-3 p-1.5 border-l-4 transition-colors ${
                isCritical ? "bg-[#FFF1F2]" : "bg-white hover:bg-[#FAFAFA]"
            }`}
            style={{ borderLeftColor: typeColor }}
        >
            {/* Tipo Label */}
            <div className="w-[120px] sm:w-[150px] shrink-0 flex items-center gap-3 pl-1">
                <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 shadow-sm" style={{ backgroundColor: typeColor }}>
                    <img src={`/icons/${type}.svg`} alt="" className="w-3.5 h-3.5 filter brightness-0 invert" />
                </div>
                <span className="font-press-start text-[11px] truncate text-[#444444] group-hover:text-[#111111] tracking-tighter">
                    {TYPE_NAMES_ES[type]?.toUpperCase()}
                </span>
            </div>

            {/* BARRA DE BALANCE (Tug-of-War) */}
            <div className="flex-1 flex items-center h-8 relative">
                {/* Línea base central */}
                <div className="absolute inset-x-0 h-1 bg-[#F1F5F9] rounded-full" />
                <div className="absolute left-1/2 -translate-x-1/2 w-0.5 h-4 bg-[#E2E8F0] z-0" />

                {/* Lado Izquierdo: DEBILIDADES */}
                <div className="flex-1 flex justify-end gap-1 pr-4 relative z-10">
                    {entry.vulnerable.map((m: any) => (
                        <PKMMarker key={m.slot} pokemon={m} color={isCritical ? "#DC2626" : "#EF4444"} />
                    ))}
                </div>

                {/* Lado Derecho: RESISTENCIAS / INMUNIDADES */}
                <div className="flex-1 flex justify-start gap-1 pl-4 relative z-10">
                    {entry.resistant.map((m: any) => (
                        <PKMMarker key={m.slot} pokemon={m} color="#10B981" />
                    ))}
                    {entry.immune.map((m: any) => (
                        <PKMMarker key={m.slot} pokemon={m} color="#3B82F6" isImmune />
                    ))}
                </div>
            </div>

            {/* Status & Alerts */}
            <div className="w-[60px] sm:w-[90px] shrink-0 flex items-center justify-end px-2">
                {isCritical ? (
                    <div className="flex items-center gap-1.5 animate-pulse">
                        <AlertCircle size={16} className="text-red-500" />
                        <span className="font-press-start text-[11px] text-red-500">x4</span>
                    </div>
                ) : isVulnerable ? (
                    <span className="font-press-start text-[11px] text-red-500">-{entry.netVulnerable}</span>
                ) : isSafe ? (
                    <div className="flex items-center gap-1 text-emerald-600">
                        <CheckCircle2 size={14} />
                        <span className="font-press-start text-[11px]">+{Math.abs(entry.netVulnerable)}</span>
                    </div>
                ) : (
                    <span className="font-press-start text-[11px] text-slate-300">0</span>
                )}
            </div>
        </motion.div>
    );
}

function PKMMarker({ pokemon, color, isImmune = false }: {
    pokemon: any;
    color: string;
    isImmune?: boolean;
}) {
    return (
        <CustomTooltip 
            content={
                <div className="flex flex-col items-center gap-1">
                    <span className="font-press-start text-[11px] text-[#111111]">{pokemon.nameEs.toUpperCase()}</span>
                    <span className="font-nunito text-[13px] text-[#888888] italic">Click para ver detalles</span>
                </div>
            }
        >
            <div 
                className="w-10 h-10 rounded-sm border-2 bg-white flex items-center justify-center shrink-0 cursor-help hover:scale-110 transition-transform relative"
                style={{ borderColor: color, boxShadow: `0 3px 6px ${color}22` }}
            >
                <Image 
                    src={PIXEL_URL(pokemon.pokemonId)} 
                    alt={pokemon.nameEs} 
                    width={32} height={32} 
                    unoptimized
                    className="object-contain" 
                />
                {isImmune && (
                    <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#3B82F6] rounded-full border border-white flex items-center justify-center text-[8px] text-white font-bold leading-none shadow-sm">
                        ★
                    </div>
                )}
            </div>
        </CustomTooltip>
    );
}