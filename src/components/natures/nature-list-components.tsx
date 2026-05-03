"use client";

import { motion } from "framer-motion";
import { LayoutGrid, Table2, X, Search } from "lucide-react";
import { TABLE_STATS, STAT_COLORS, STAT_ABBR } from "@/lib/constants/natures/natures.constants";

// ── PAGE HEADER ──────────────────────────────────────────────────────────────

export function NaturesPageHeader() {
    return (
        <div>
            {/* 5 puntos de colores de stats */}
            <div className="flex gap-2 mb-5">
                {TABLE_STATS.map((stat, i) => (
                    <motion.div
                        key={stat}
                        className="w-[12px] h-[12px]"
                        style={{ backgroundColor: STAT_COLORS[stat] }}
                        initial={{ scale: 0, rotate: 45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.4 + i * 0.07 }}
                    />
                ))}
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-5">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="font-press-start text-[22px] text-[#111111]">NATURALEZAS</h1>
                        <motion.div
                            className="bg-[#111111] text-white px-2 py-1"
                            style={{ boxShadow: "2px 2px 0 #CC0000" }}
                            initial={{ scale: 0, rotate: 12 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", bounce: 0.6, delay: 0.65 }}
                        >
                            <span className="font-press-start text-[9px]">25</span>
                        </motion.div>
                    </div>
                    <p className="font-nunito text-[14px] text-[#888888] italic">
                        25 personalidades · 5 stats · infinitas estrategias
                    </p>
                </div>

                {/* Chips de stats */}
                <div className="flex flex-wrap gap-1.5">
                    {TABLE_STATS.map((stat, i) => (
                        <motion.div
                            key={stat}
                            className="px-2.5 py-1.5 border font-press-start text-[8px]"
                            style={{ color: STAT_COLORS[stat], borderColor: STAT_COLORS[stat], backgroundColor: `${STAT_COLORS[stat]}14` }}
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.45 + i * 0.04 }}
                        >
                            {STAT_ABBR[stat]}
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Separador doble */}
            <div className="relative h-[5px]">
                <motion.div
                    className="absolute top-0 left-0 w-full h-[3px] bg-[#111111] origin-left"
                    initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.5, delay: 0.35 }}
                />
                <motion.div
                    className="absolute bottom-0 right-0 w-full h-[2px] bg-[#CC0000] origin-right"
                    initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.4, delay: 0.45 }}
                />
            </div>
        </div>
    );
}

// ── VIEW TOGGLE ───────────────────────────────────────────────────────────────

interface NatureViewToggleProps {
    view: "table" | "grid";
    onViewChange: (v: "table" | "grid") => void;
}

export function NatureViewToggle({ view, onViewChange }: NatureViewToggleProps) {
    return (
        <div className="flex border-2 border-[#111111] overflow-hidden" style={{ boxShadow: "3px 3px 0 #CC0000" }}>
            {([["table", Table2, "Tabla 5×5"], ["grid", LayoutGrid, "Vista Grid"]] as const).map(([v, Icon, label]) => (
                <button
                    key={v}
                    onClick={() => onViewChange(v)}
                    className="flex items-center gap-2 px-5 py-3 font-press-start text-[9px] transition-colors"
                    style={
                        view === v
                            ? { backgroundColor: "#111111", color: "#ffffff" }
                            : { backgroundColor: "#ffffff", color: "#888888" }
                    }
                >
                    <Icon size={14} />
                    {label}
                </button>
            ))}
        </div>
    );
}

// ── SKELETON TABLE ────────────────────────────────────────────────────────────

export function NatureSkeletonTable() {
    return (
        <div className="overflow-x-auto">
            <div className="min-w-[700px]">
                <div className="grid grid-cols-6 gap-1">
                    {Array.from({ length: 36 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-[86px] border border-[#E0E0E0] bg-[#F8F8F8] animate-pulse"
                            style={{ animationDelay: `${i * 0.02}s` }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

// ── EMPTY STATE ───────────────────────────────────────────────────────────────

interface NatureEmptyStateProps {
    onClear: () => void;
}

export function NatureEmptyState({ onClear }: NatureEmptyStateProps) {
    return (
        <div className="flex flex-col items-center gap-4 py-20 text-center">
            <div
                className="w-16 h-16 border-2 border-[#111111] flex items-center justify-center"
                style={{ boxShadow: "3px 3px 0 #CC0000" }}
            >
                <Search size={24} className="text-[#CCCCCC]" />
            </div>
            <div>
                <p className="font-press-start text-[12px] text-[#888888] mb-2">SIN NATURALEZAS</p>
                <p className="font-nunito text-[14px] text-[#AAAAAA]">
                    No hay naturalezas que coincidan con los filtros seleccionados.
                </p>
            </div>
            <button
                onClick={onClear}
                className="flex items-center gap-2 border-2 border-[#111111] px-5 py-2.5 font-nunito font-bold text-[14px] bg-white hover:bg-[#111111] hover:text-white transition-colors"
                style={{ boxShadow: "3px 3px 0 #CC0000" }}
            >
                <X size={14} /> Limpiar filtros
            </button>
        </div>
    );
}