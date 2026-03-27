"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { AlertCircle, CheckCircle2, Info, ShieldAlert } from "lucide-react";
import { useTeamBuilderStore } from "@/lib/stores/teamBuilderStore";
import { useTeamAnalysis } from "@/lib/hooks/useTeamAnalysis";
import {
    TYPE_COLORS, TYPE_NAMES_ES, PIXEL_URL,
} from "@/lib/constants/team-builder.constants";

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

export function WeaknessCoverageFinder() {
    const { activeTeam } = useTeamBuilderStore();
    const analysis = useTeamAnalysis();
    const members = activeTeam.members;

    if (members.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-10 px-4 border-2 border-dashed border-[#E0E0E0] bg-[#FAFAFA]">
                <ShieldAlert size={32} className="text-[#AAAAAA] mb-2" />
                <p className="font-press-start text-[9px] text-[#A0A0A0] text-center leading-relaxed">
                    Añade Pokémon para identificar<br/>puntos vulnerables.
                </p>
            </div>
        );
    }

    if (!analysis) return null;

    // Ordenar tipos por nivel de exposición (más vulnerables primero)
    // Filtramos los que tienen al menos una debilidad (multiplier >= 2)
    const sorted = [...analysis.defensiveWeaknesses]
        .filter((d) => d.multiplier >= 2)
        .sort((a, b) => b.multiplier - a.multiplier || b.vulnerable.length - a.vulnerable.length);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between mb-2">
                <p className="font-press-start text-[9px] text-[#888888] uppercase tracking-wider">
                    Análisis de Puntos Débiles (x2 o más)
                </p>
                <div className="h-px bg-[#E0E0E0] flex-1 mx-4" />
            </div>

            <div className="flex flex-col gap-3">
                {sorted.length > 0 ? (
                    sorted.map((entry, i) => (
                        <WeaknessRow key={entry.type} entry={entry} index={i} membersCount={members.length} />
                    ))
                ) : (
                    <div className="p-6 border-2 border-[#10B981] bg-[#ECFDF5] flex flex-col items-center gap-2">
                        <CheckCircle2 size={24} className="text-[#10B981]" />
                        <p className="font-press-start text-[9px] text-[#10B981] uppercase">Sin debilidades críticas</p>
                        <p className="font-nunito text-[14px] text-[#047857] font-bold">¡Tu equipo está bien balanceado!</p>
                    </div>
                )}
            </div>
        </div>
    );
}

function WeaknessRow({ entry, index, membersCount }: { entry: any; index: number; membersCount: number }) {
    const color = TYPE_COLORS[entry.type] ?? "#888888";
    const name = TYPE_NAMES_ES[entry.type] ?? entry.type;
    const isCritical = entry.multiplier >= 4;
    
    // Calculamos el % de la barra basado en cuántos miembros son débiles vs cuántos resisten
    const vulnerabilityWeight = entry.vulnerable.length / membersCount;
    const barPct = Math.max(15, Math.min(100, vulnerabilityWeight * 100));

    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className={`flex items-center gap-4 p-3 border-2 ${
                isCritical ? "bg-[#FFF1F2] border-red-500 shadow-[2px_2px_0_#EF4444]" : "bg-white border-[#11111115] hover:border-[#111111] transition-all shadow-sm"
            } relative group`}
        >
            {isCritical && (
                <div className="absolute inset-0 opacity-5 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#EF4444_10px,#EF4444_20px)]" />
            )}

            {/* Tipo Label Pro */}
            <div 
                className="w-20 shrink-0 font-press-start text-[9px] text-white py-1.5 px-2 text-center border-2 border-[#111111] shadow-[2px_2px_0_#111111] relative z-10"
                style={{ backgroundColor: color }}
            >
                {name.toUpperCase()}
            </div>

            {/* Barra de Peligro */}
            <div className="flex-1 h-3 bg-[#F1F5F9] border-2 border-[#111111] relative overflow-hidden shrink-0 hidden sm:block">
                <motion.div
                    className="h-full relative"
                    style={{ backgroundColor: isCritical ? "#EF4444" : "#F59E0B" }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${barPct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:10px_10px]" />
                </motion.div>
            </div>

            {/* Pokémon Débiles */}
            <div className="flex -space-x-3 items-center group-hover:space-x-1 transition-all">
                {entry.vulnerable.map((m: any) => (
                    <CustomTooltip 
                        key={m.slot}
                        content={
                            <div className="flex flex-col items-center gap-1 text-[#111111]">
                                <span className="font-press-start text-[10px]">{m.nameEs.toUpperCase()}</span>
                                <span className="font-nunito text-[12px] font-bold text-red-600">Recibe x{entry.multiplier} de daño</span>
                            </div>
                        }
                    >
                        <div className="w-10 h-10 rounded-full border-2 border-white bg-white shadow-md hover:z-20 hover:scale-125 transition-all cursor-help relative overflow-hidden flex items-center justify-center">
                            <Image
                                src={PIXEL_URL(m.pokemonId)}
                                alt={m.nameEs}
                                width={36} height={36}
                                unoptimized
                                className="object-contain"
                            />
                        </div>
                    </CustomTooltip>
                ))}
            </div>

            {/* Multiplicador Badge */}
            <div className={`w-12 shrink-0 flex items-center justify-center font-press-start text-[11px] ${isCritical ? "text-red-600" : "text-[#F59E0B]"}`}>
                {isCritical && <AlertCircle size={14} className="mr-1 animate-pulse" />}
                x{entry.multiplier}
            </div>
        </motion.div>
    );
}