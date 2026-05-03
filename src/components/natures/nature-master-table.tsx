"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import {
    TABLE_STATS, NATURE_TABLE, STAT_COLORS,
    STAT_NAMES_ES, STAT_ABBR, NATURES_DATA,
} from "@/lib/constants/natures/natures.constants";
import { Nature } from "@/types/api/nature.types";

interface NatureMasterTableProps {
    natures: Nature[];
    highlightedStat?: string | null;
    onNatureClick: (name: string) => void;
}

export function NatureMasterTable({
    natures, highlightedStat, onNatureClick,
}: NatureMasterTableProps) {
    // Map nombre → nature para lookup rápido
    const naturesMap = useMemo(() => {
        const m = new Map<string, Nature>();
        natures.forEach((n) => m.set(n.name, n));
        return m;
    }, [natures]);

    return (
        <div>
            {/* Scroll wrapper para mobile */}
            <div className="overflow-x-auto pb-2">
                <div className="min-w-[700px]">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr>
                                {/* Celda vacía esquina superior izquierda */}
                                <th className="w-[100px]">
                                    <div className="border-2 border-[#111111] bg-[#111111] p-3 text-center">
                                        <span className="font-press-start text-[8px] text-white block leading-relaxed">
                                            ▲ SUBE
                                        </span>
                                        <div className="h-px bg-white/20 my-1" />
                                        <span className="font-press-start text-[8px] text-white/50 block leading-relaxed">
                                            ▼ BAJA
                                        </span>
                                    </div>
                                </th>
                                {/* Headers de columna (stat que BAJA) */}
                                {TABLE_STATS.map((col) => {
                                    const color = STAT_COLORS[col];
                                    const isHighCol = highlightedStat === col;
                                    return (
                                        <th key={col} className="p-0">
                                            <div
                                                className="border-2 border-[#111111] p-3 text-center transition-all duration-200"
                                                style={{
                                                    backgroundColor: isHighCol ? color : `${color}18`,
                                                    borderBottomColor: color,
                                                    borderBottomWidth: "3px",
                                                }}
                                            >
                                                <span
                                                    className="font-press-start text-[9px] block"
                                                    style={{ color: isHighCol ? "#ffffff" : color }}
                                                >
                                                    {STAT_ABBR[col]}
                                                </span>
                                                <span
                                                    className="font-nunito text-[11px] block mt-1"
                                                    style={{ color: isHighCol ? "rgba(255,255,255,0.8)" : "#888888" }}
                                                >
                                                    ▼ {STAT_NAMES_ES[col]}
                                                </span>
                                            </div>
                                        </th>
                                    );
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {TABLE_STATS.map((row, rowIdx) => {
                                const rowColor = STAT_COLORS[row];
                                const isHighRow = highlightedStat === row;
                                return (
                                    <motion.tr
                                        key={row}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.35, delay: rowIdx * 0.07 }}
                                    >
                                        {/* Header de fila (stat que SUBE) */}
                                        <td className="p-0">
                                            <div
                                                className="border-2 border-[#111111] p-3 text-center h-full transition-all duration-200"
                                                style={{
                                                    backgroundColor: isHighRow ? rowColor : `${rowColor}18`,
                                                    borderRightColor: rowColor,
                                                    borderRightWidth: "3px",
                                                }}
                                            >
                                                <span
                                                    className="font-press-start text-[9px] block"
                                                    style={{ color: isHighRow ? "#ffffff" : rowColor }}
                                                >
                                                    {STAT_ABBR[row]}
                                                </span>
                                                <span
                                                    className="font-nunito text-[11px] block mt-1"
                                                    style={{ color: isHighRow ? "rgba(255,255,255,0.8)" : "#888888" }}
                                                >
                                                    ▲ {STAT_NAMES_ES[row]}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Celdas de la tabla */}
                                        {TABLE_STATS.map((col, colIdx) => {
                                            const natureName = NATURE_TABLE[row]?.[col];
                                            const isNeutral = row === col;
                                            const meta = NATURES_DATA.find((n) => n.name === natureName);
                                            const upColor = STAT_COLORS[row];
                                            const downColor = STAT_COLORS[col];

                                            // Lógica de resaltado
                                            const isHighlighted = highlightedStat
                                                ? (highlightedStat === row || highlightedStat === col)
                                                : false;
                                            const isDimmed = highlightedStat
                                                ? !isHighlighted
                                                : false;

                                            return (
                                                <motion.td
                                                    key={col}
                                                    className="p-0"
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ duration: 0.25, delay: rowIdx * 0.07 + colIdx * 0.03 }}
                                                >
                                                    <motion.div
                                                        onClick={() => !isNeutral && natureName && onNatureClick(natureName)}
                                                        className="relative border border-[#E0E0E0] p-3 h-[86px] flex flex-col justify-between transition-colors duration-200 overflow-hidden"
                                                        style={{
                                                            backgroundColor: isNeutral
                                                                ? "#F5F5F5"
                                                                : isHighlighted
                                                                    ? `${upColor}12`
                                                                    : "#FFFFFF",
                                                            cursor: isNeutral ? "default" : "pointer",
                                                            opacity: isDimmed ? 0.3 : 1,
                                                            borderColor: isHighlighted && !isNeutral ? upColor : "#E0E0E0",
                                                            borderWidth: isHighlighted && !isNeutral ? "2px" : "1px",
                                                        }}
                                                        whileHover={
                                                            isNeutral
                                                                ? {}
                                                                : {
                                                                    scale: 1.04,
                                                                    zIndex: 10,
                                                                    boxShadow: `3px 3px 0 ${upColor}`,
                                                                    borderColor: "#111111",
                                                                    borderWidth: "2px",
                                                                }
                                                        }
                                                        whileTap={isNeutral ? {} : { scale: 0.97 }}
                                                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                                    >
                                                        {isNeutral ? (
                                                            /* Celda neutral (diagonal) */
                                                            <div className="flex flex-col items-center justify-center h-full gap-1">
                                                                <span className="font-nunito font-bold text-[13px] text-[#AAAAAA] italic capitalize">
                                                                    {meta?.nameEs ?? natureName}
                                                                </span>
                                                                <span className="font-press-start text-[8px] text-[#BBBBBB]">—</span>
                                                            </div>
                                                        ) : (
                                                            /* Celda con modificadores */
                                                            <>
                                                                <span className="font-nunito font-bold text-[13px] text-[#111111] capitalize leading-tight">
                                                                    {meta?.nameEs ?? natureName}
                                                                </span>
                                                                <div className="flex gap-1 flex-wrap">
                                                                    {/* Chip stat que SUBE */}
                                                                    <span
                                                                        className="font-jetbrains text-[9px] px-1.5 py-0.5 border leading-none"
                                                                        style={{
                                                                            color: upColor,
                                                                            borderColor: upColor,
                                                                            backgroundColor: `${upColor}18`,
                                                                        }}
                                                                    >
                                                                        +{STAT_ABBR[row]}
                                                                    </span>
                                                                    {/* Chip stat que BAJA */}
                                                                    <span className="font-jetbrains text-[9px] px-1.5 py-0.5 border border-[#DDDDDD] bg-[#F5F5F5] text-[#888888] leading-none">
                                                                        -{STAT_ABBR[col]}
                                                                    </span>
                                                                </div>
                                                            </>
                                                        )}
                                                    </motion.div>
                                                </motion.td>
                                            );
                                        })}
                                    </motion.tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Leyenda */}
            <div className="mt-5 flex flex-wrap items-center gap-4 px-1">
                {TABLE_STATS.map((stat) => (
                    <div key={stat} className="flex items-center gap-1.5">
                        <div className="w-3 h-3 border border-[#111111]" style={{ backgroundColor: STAT_COLORS[stat] }} />
                        <span className="font-nunito text-[12px] text-[#555555]">
                            <span className="font-bold" style={{ color: STAT_COLORS[stat] }}>{STAT_ABBR[stat]}</span>
                            {" "}— {STAT_NAMES_ES[stat]}
                        </span>
                    </div>
                ))}
                <div className="flex items-center gap-1.5 ml-auto">
                    <div className="w-3 h-3 bg-[#F5F5F5] border border-[#DDDDDD]" />
                    <span className="font-nunito text-[12px] text-[#AAAAAA] italic">— = Naturaleza neutra</span>
                </div>
            </div>

            {/* Indicador scroll mobile */}
            <p className="mt-3 text-center font-nunito text-[11px] text-[#AAAAAA] sm:hidden">
                ← desliza para ver toda la tabla →
            </p>
        </div>
    );
}