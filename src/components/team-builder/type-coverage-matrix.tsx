"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TeamAnalysis, TeamMember } from "@/types/api/team-builder.types";
import {
    ALL_TYPES, TYPE_COLORS, TYPE_NAMES_ES, getCellMeta,
} from "@/lib/constants/team-builder/team-builder.constants";
import { getEffectivenessForMember, getEffectiveness } from "@/lib/utils/type-analysis";

interface TypeCoverageMatrixProps {
    analysis: TeamAnalysis;
    members: TeamMember[];
}

type MatrixMode = "defensive" | "offensive";

export function TypeCoverageMatrix({ analysis, members }: TypeCoverageMatrixProps) {
    const [mode, setMode] = useState<MatrixMode>("defensive");
    const [hoveredType, setHoveredType] = useState<string | null>(null);
    const [showInfo, setShowInfo] = useState(false);

    if (members.length === 0) return null;

    // Colores específicos para Ofensiva (que es al revés: hacer daño x2 o x4 es BUENO)
    const getOffensiveCellMeta = (mult: number) => {
        if (mult >= 4) return { bg: "#DCFCE7", text: "#16A34A", label: "×4" }; // Extra SE
        if (mult >= 2) return { bg: "#FEF3C7", text: "#D97706", label: "×2" }; // SE
        if (mult === 0) return { bg: "#FEE2E2", text: "#DC2626", label: "×0" }; // Inmune (malo)
        if (mult <= 0.5) return { bg: "#FFE4E6", text: "#E11D48", label: "×½" }; // NVE (malo)
        return { bg: "#F9FAFB", text: "#9CA3AF", label: "×1" };
    };

    return (
        <section>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6 justify-between">
                <div className="flex items-center gap-4 relative">
                    <h2 className="font-press-start text-[14px] uppercase tracking-tighter text-[#111111] whitespace-nowrap">
                        Matriz de Tipos
                    </h2>
                    <div className="relative">
                        <button
                            onMouseEnter={() => setShowInfo(true)}
                            onMouseLeave={() => setShowInfo(false)}
                            className="w-5 h-5 rounded-full border border-[#111111] bg-[#EEEEEE] text-[#555555] flex items-center justify-center font-press-start text-[8px] shrink-0"
                            title="Información"
                            aria-label="Información sobre la matriz de tipos"
                        >
                            ?
                        </button>

                        {/* Tooltip flotante */}
                        {showInfo && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="absolute left-0 sm:left-full sm:ml-4 top-full sm:top-[-20px] mt-2 sm:mt-0 z-50 w-[300px] sm:w-[400px] p-5 border-2 border-[#111111] bg-white text-left"
                                style={{ boxShadow: "4px 4px 0 #111111" }}
                            >
                                <h4 className="font-press-start text-[11px] mb-3 uppercase text-[#2563EB]">¿Cómo leer esta tabla?</h4>
                                <div className="space-y-3">
                                    <p className="font-nunito text-[14px] leading-relaxed text-[#444444]">
                                        <strong className="text-[#111111]">Modo Defensivo:</strong> Muestra cuánto daño reciben tus Pokémon (columnas) al ser golpeados por el tipo indicado en la fila. El <span className="text-red-600 font-bold">Rojo</span> es peligroso (daño x2), mientras el <span className="text-green-600 font-bold">Verde</span> es seguro (resistencia).
                                    </p>
                                    <p className="font-nunito text-[14px] leading-relaxed text-[#444444]">
                                        <strong className="text-[#111111]">Modo Ofensivo:</strong> Muestra si tú puedes atacar Súper Efectivo al tipo defensor (fila), usando movimientos STAB de tus Pokémon. El <span className="text-green-600 font-bold">Verde</span> indica mucha ventaja ofensiva, y el <span className="text-red-600 font-bold">Rojo</span> indica desventaja.
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </div>
                    <div className="hidden sm:block h-px bg-[#E0E0E0] w-12 flex-1" />
                </div>

                {/* Toggle */}
                <div className="flex border-2 border-[#111111] overflow-hidden shrink-0" style={{ boxShadow: "2px 2px 0 #CC0000" }}>
                    {(["defensive", "offensive"] as const).map((m) => (
                        <button
                            key={m}
                            onClick={() => setMode(m)}
                            className="font-press-start text-[10px] px-4 py-2.5 transition-colors"
                            style={
                                mode === m
                                    ? { backgroundColor: "#111111", color: "#ffffff" }
                                    : { backgroundColor: "#ffffff", color: "#888888" }
                            }
                        >
                            {m === "defensive" ? "DEFENSIVO" : "OFENSIVO"}
                        </button>
                    ))}
                </div>
            </div>

            <div
                className="relative border-2 border-[#111111] mt-5"
                style={{ boxShadow: "4px 4px 0 #CC0000" }}
            >
                {/* Etiqueta flotante superior */}
                <div 
                    className="absolute top-[-16px] left-4 px-3 py-1.5 z-10 transition-colors border-2 border-[#111111]" 
                    style={{ backgroundColor: mode === "defensive" ? "#111111" : "#1E3A8A" }}
                >
                    <span className="font-nunito font-bold text-[14px] text-white uppercase tracking-wider">
                        {mode === "defensive"
                            ? "¿Qué debilidades te golpean fuerte?"
                            : "¿A qué tipos puedes destruir?"}
                    </span>
                </div>

                <div className="p-4 pt-8 overflow-x-auto relative z-0 bg-white">
                    <p className="font-nunito text-[13px] text-[#888888] mb-5 italic">
                        {mode === "defensive"
                            ? "Lectura Defensiva: Filas = Tipo del atacante enemigo. ¿Qué miembro de tu equipo sufre?"
                            : "Lectura Ofensiva: Filas = Tipo del defensor enemigo. ¿Tu miembro puede darle un golpe Súper Eficaz (con su tipo principal)?"}
                    </p>

                    <div className="min-w-[700px]">
                        {/* Headers de columnas = miembros */}
                        <div
                            className="grid gap-0.5 mb-1"
                            style={{ gridTemplateColumns: `140px repeat(${members.length}, 1fr) 110px` }}
                        >
                            <div className="border border-[#E0E0E0] bg-[#111111] p-2 flex items-center justify-center transition-colors" style={{ backgroundColor: mode === "defensive" ? "#111111" : "#1E3A8A" }}>
                                <span className="font-press-start text-[11px] text-white text-center">
                                    {mode === "defensive" ? "ATK ENEMIGO ↓" : "DEF ENEMIGO ↓"}
                                </span>
                            </div>
                            {members.map((m) => {
                                const pc = TYPE_COLORS[m.types[0]] ?? "#888888";
                                return (
                                    <div
                                        key={m.slot}
                                        className="border border-[#E0E0E0] p-2 flex flex-col items-center gap-1.5 bg-[#FAFAFA]"
                                        style={{ borderTopColor: pc, borderTopWidth: 4 }}
                                    >
                                        <span className="font-press-start text-[11px] text-[#111111] truncate w-full text-center">
                                            {m.nameEs.slice(0, 9).toUpperCase()}
                                        </span>
                                        <div className="flex gap-1.5 justify-center mt-0.5">
                                            {m.types.map((t) => (
                                                <div key={t} className="flex items-center justify-center w-[20px] h-[20px] rounded-full shadow-sm" style={{ backgroundColor: TYPE_COLORS[t] }} title={TYPE_NAMES_ES[t]}>
                                                    <img src={`/icons/${t}.svg`} alt="" width={12} height={12} className="filter brightness-0 invert object-contain" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                            {/* Columna summary */}
                            <div className="border border-[#E0E0E0] bg-[#F5F5F5] p-2 flex items-center justify-center">
                                <span className="font-press-start text-[11px] text-[#888888]">BALANCE</span>
                            </div>
                        </div>

                        {/* Filas = tipos */}
                        {ALL_TYPES.map((rowType) => {
                            const typeColor = TYPE_COLORS[rowType];
                            const isHovered = hoveredType === rowType;

                            // Calcular multiplicadores para cada miembro
                            const mults = members.map((member) => {
                                if (mode === "defensive") {
                                    // Defensivo: Atacante=rowType, Defensor=member
                                    return getEffectivenessForMember(rowType, member);
                                } else {
                                    // Ofensivo: Defensor=rowType, Atacante=member.types
                                    const stabs = member.types.map((atk) => getEffectiveness(atk, [rowType]));
                                    return Math.max(...stabs);
                                }
                            });

                            let vulnerableCount = 0;
                            let resistantCount = 0;
                            let immuneCount = 0;

                            if (mode === "defensive") {
                                vulnerableCount = mults.filter((m) => m > 1).length;
                                resistantCount = mults.filter((m) => m < 1 && m > 0).length;
                                immuneCount = mults.filter((m) => m === 0).length;
                            } else {
                                // Para ofensivo:
                                // vulnerable = puede matar (mult >= 2)
                                vulnerableCount = mults.filter((m) => m >= 2).length;
                                // resistant = pegas poco (mult < 1)
                                resistantCount = mults.filter((m) => m < 1 && m > 0).length;
                                // immune = no le haces daño en absoluto con STAB
                                immuneCount = mults.filter((m) => m === 0).length;
                            }

                            return (
                                <div
                                    key={rowType}
                                    className="grid gap-0.5 mb-0.5 transition-opacity"
                                    style={{
                                        gridTemplateColumns: `140px repeat(${members.length}, 1fr) 110px`,
                                        opacity: hoveredType && !isHovered ? 0.6 : 1
                                    }}
                                    onMouseEnter={() => setHoveredType(rowType)}
                                    onMouseLeave={() => setHoveredType(null)}
                                >
                                    {/* Label del tipo */}
                                    <div
                                        className="border border-[#E0E0E0] p-2 flex items-center gap-2 transition-colors"
                                        style={{
                                            backgroundColor: isHovered ? `${typeColor}22` : "#FAFAFA",
                                            borderLeftColor: typeColor, borderLeftWidth: 4,
                                        }}
                                    >
                                        <div className="flex items-center justify-center w-5 h-5 shrink-0 rounded-full shadow-sm" style={{ backgroundColor: typeColor }}>
                                            <img src={`/icons/${rowType}.svg`} alt="" width={12} height={12} className="filter brightness-0 invert object-contain" />
                                        </div>
                                        <span className="font-press-start text-[11px] truncate" style={{ color: typeColor }}>
                                            {TYPE_NAMES_ES[rowType]?.toUpperCase() ?? rowType.toUpperCase()}
                                        </span>
                                    </div>

                                    {/* Celdas por miembro */}
                                    {mults.map((mult, i) => {
                                        const cell = mode === "defensive" ? getCellMeta(mult) : getOffensiveCellMeta(mult);
                                        const isBigIssue = mode === "defensive" ? mult >= 4 : mult === 0;

                                        return (
                                            <motion.div
                                                key={i}
                                                className="border border-[#E8E8E8] flex items-center justify-center py-2"
                                                style={{ backgroundColor: cell.bg }}
                                                animate={isBigIssue ? {
                                                    boxShadow: ["inset 0 0 0px transparent", "inset 0 0 6px #DC262666", "inset 0 0 0px transparent"],
                                                } : {}}
                                                transition={isBigIssue ? { duration: 2, repeat: Infinity } : {}}
                                            >
                                                <span className="font-press-start text-[13px]" style={{ color: cell.text }}>
                                                    {cell.label}
                                                </span>
                                            </motion.div>
                                        );
                                    })}

                                    {/* Balance */}
                                    <div className="border border-[#E8E8E8] px-1 py-1 bg-[#F9FAFB] flex flex-col justify-center gap-1.5 items-center">
                                        {mode === "defensive" ? (
                                            <>
                                                {vulnerableCount > 0 && <div className="font-press-start text-[11px] text-[#DC2626]">{vulnerableCount} Débiles</div>}
                                                {resistantCount > 0 && <div className="font-press-start text-[11px] text-[#16A34A]">{resistantCount} Resist</div>}
                                                {immuneCount > 0 && <div className="font-press-start text-[11px] text-[#2563EB]">{immuneCount} Inmunes</div>}
                                                {vulnerableCount === 0 && resistantCount === 0 && <div className="font-press-start text-[11px] text-[#9CA3AF]">—</div>}
                                            </>
                                        ) : (
                                            <>
                                                {vulnerableCount > 0 && <div className="font-press-start text-[11px] text-[#16A34A]">{vulnerableCount} Super Ef.</div>}
                                                {immuneCount === members.length && <div className="font-press-start text-[11px] text-[#DC2626]">Intocable</div>}
                                                {vulnerableCount === 0 && immuneCount < members.length && <div className="font-press-start text-[11px] text-[#9CA3AF]">—</div>}
                                            </>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Leyenda */}
                    <div className="mt-6 border-t border-dashed border-[#DDDDDD] pt-4">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="font-press-start text-[11px] text-[#888888] uppercase tracking-wider">Leyenda de Efectividad ({mode === "defensive" ? "Defensiva" : "Ofensiva"})</span>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            {(mode === "defensive" ? [
                                { label: "×4", bg: "#FEE2E2", text: "#DC2626", desc: "Súper Crítico (Peligro)" },
                                { label: "×2", bg: "#FEF3C7", text: "#D97706", desc: "Débil" },
                                { label: "×1", bg: "#F9FAFB", text: "#9CA3AF", desc: "Normal" },
                                { label: "×½", bg: "#DCFCE7", text: "#16A34A", desc: "Resistente" },
                                { label: "×¼", bg: "#BBF7D0", text: "#15803D", desc: "Doble Resistencia" },
                                { label: "×0", bg: "#DBEAFE", text: "#2563EB", desc: "Inmune" },
                            ] : [
                                { label: "×4", bg: "#DCFCE7", text: "#16A34A", desc: "Daño Excelente" },
                                { label: "×2", bg: "#FEF3C7", text: "#D97706", desc: "Daño Súper Eficaz" },
                                { label: "×1", bg: "#F9FAFB", text: "#9CA3AF", desc: "Daño Normal" },
                                { label: "×½", bg: "#FFE4E6", text: "#E11D48", desc: "Poco Efectivo (Resistido)" },
                                { label: "×0", bg: "#FEE2E2", text: "#DC2626", desc: "Sin efecto (Inmune)" },
                            ]).map(({ label, bg, text, desc }) => (
                                <div key={label} className="flex items-center gap-2">
                                    <div className="w-10 h-8 border-2 border-[#E0E0E0] flex items-center justify-center" style={{ backgroundColor: bg }}>
                                        <span className="font-press-start text-[11px]" style={{ color: text }}>{label}</span>
                                    </div>
                                    <span className="font-nunito font-semibold text-[13px] text-[#666666]">
                                        {desc}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}