"use client";

import { motion } from "framer-motion";
import { Search, X, SlidersHorizontal } from "lucide-react";
import {
    TABLE_STATS, STAT_COLORS, STAT_NAMES_ES, STAT_ABBR,
    FLAVOR_COLORS, FLAVOR_NAMES_ES,
} from "@/lib/constants/natures.constants";

interface NatureFilterBarProps {
    statFilter: string | null;
    flavorFilter: string | null;
    neutralFilter: "all" | "neutral" | "modified";
    searchQuery: string;
    onStatFilter: (v: string | null) => void;
    onFlavorFilter: (v: string | null) => void;
    onNeutralFilter: (v: "all" | "neutral" | "modified") => void;
    onSearch: (v: string) => void;
    totalShown: number;
    totalAll: number;
}

const FLAVORS = ["spicy", "dry", "sweet", "bitter", "sour"] as const;

export function NatureFilterBar({
    statFilter, flavorFilter, neutralFilter, searchQuery,
    onStatFilter, onFlavorFilter, onNeutralFilter, onSearch,
    totalShown, totalAll,
}: NatureFilterBarProps) {
    const hasAnyFilter = statFilter || flavorFilter || neutralFilter !== "all" || searchQuery.trim();

    return (
        <div className="flex flex-col gap-4">
            {/* Searchbar */}
            <div className="flex items-center gap-2 border-2 border-[#111111] px-4 py-2.5 bg-white focus-within:border-[#CC0000] transition-colors">
                <Search size={15} className="text-[#888888] shrink-0" />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearch(e.target.value)}
                    placeholder="Buscar naturaleza en español o inglés..."
                    className="flex-1 font-nunito text-[14px] text-[#111111] placeholder:text-[#BBBBBB] outline-none bg-transparent"
                />
                {searchQuery && (
                    <button onClick={() => onSearch("")} className="text-[#888888] hover:text-[#CC0000] transition-colors" aria-label="Limpiar búsqueda">
                        <X size={15} />
                    </button>
                )}
            </div>

            {/* Filtros */}
            <div
                className="relative border-2 border-[#E0E0E0] bg-[#FAFAFA] p-4"
                style={{ boxShadow: "3px 3px 0 #E0E0E0" }}
            >
                <div className="absolute top-[-13px] left-4 bg-[#111111] px-3 py-1">
                    <div className="flex items-center gap-1.5">
                        <SlidersHorizontal size={10} className="text-white" />
                        <span className="font-nunito font-bold text-[11px] text-white uppercase">Filtros</span>
                    </div>
                </div>

                <div className="flex flex-col gap-4 pt-1">
                    {/* Stat subido */}
                    <div>
                        <p className="font-press-start text-[9px] text-[#888888] mb-2 uppercase tracking-wider">
                            Stat que sube
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => onStatFilter(null)}
                                className="font-nunito font-bold text-[13px] px-3 py-1.5 border-2 transition-all"
                                style={
                                    !statFilter
                                        ? { backgroundColor: "#111111", borderColor: "#111111", color: "#ffffff" }
                                        : { backgroundColor: "#ffffff", borderColor: "#E0E0E0", color: "#888888" }
                                }
                            >
                                Todos
                            </button>
                            {TABLE_STATS.map((stat) => {
                                const color = STAT_COLORS[stat];
                                const active = statFilter === stat;
                                return (
                                    <motion.button
                                        key={stat}
                                        onClick={() => onStatFilter(active ? null : stat)}
                                        className="font-press-start text-[9px] px-3 py-1.5 border-2 transition-all flex items-center gap-1.5"
                                        style={
                                            active
                                                ? { backgroundColor: color, borderColor: "#111111", color: "#ffffff", boxShadow: "2px 2px 0 #111111" }
                                                : { backgroundColor: `${color}15`, borderColor: color, color }
                                        }
                                        whileTap={{ scale: 0.94 }}
                                    >
                                        ▲ {STAT_ABBR[stat]}
                                    </motion.button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Sabor preferido */}
                    <div>
                        <p className="font-press-start text-[9px] text-[#888888] mb-2 uppercase tracking-wider">
                            Sabor preferido
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => onFlavorFilter(null)}
                                className="font-nunito font-bold text-[13px] px-3 py-1.5 border-2 transition-all"
                                style={
                                    !flavorFilter
                                        ? { backgroundColor: "#111111", borderColor: "#111111", color: "#ffffff" }
                                        : { backgroundColor: "#ffffff", borderColor: "#E0E0E0", color: "#888888" }
                                }
                            >
                                Todos
                            </button>
                            {FLAVORS.map((flavor) => {
                                const color = FLAVOR_COLORS[flavor];
                                const active = flavorFilter === flavor;
                                return (
                                    <motion.button
                                        key={flavor}
                                        onClick={() => onFlavorFilter(active ? null : flavor)}
                                        className="font-nunito font-bold text-[13px] px-3 py-1.5 border-2 transition-all"
                                        style={
                                            active
                                                ? { backgroundColor: color, borderColor: "#111111", color: "#ffffff", boxShadow: "2px 2px 0 #111111" }
                                                : { backgroundColor: `${color}20`, borderColor: color, color }
                                        }
                                        whileTap={{ scale: 0.94 }}
                                    >
                                        {FLAVOR_NAMES_ES[flavor]}
                                    </motion.button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Tipo */}
                    <div>
                        <p className="font-press-start text-[9px] text-[#888888] mb-2 uppercase tracking-wider">
                            Tipo
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {(["all", "modified", "neutral"] as const).map((opt) => {
                                const labels = { all: "Todas", modified: "Con modificadores", neutral: "Neutras" };
                                const active = neutralFilter === opt;
                                return (
                                    <button
                                        key={opt}
                                        onClick={() => onNeutralFilter(opt)}
                                        className="font-nunito font-bold text-[13px] px-3 py-1.5 border-2 transition-all"
                                        style={
                                            active
                                                ? { backgroundColor: "#111111", borderColor: "#111111", color: "#ffffff" }
                                                : { backgroundColor: "#ffffff", borderColor: "#E0E0E0", color: "#888888" }
                                        }
                                    >
                                        {labels[opt]}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Contador + limpiar */}
            <div className="flex items-center justify-between">
                <p className="font-nunito text-[13px] text-[#888888]">
                    <span className="font-bold text-[#111111]">{totalShown}</span> de{" "}
                    <span className="font-bold">{totalAll}</span> naturalezas
                </p>
                {hasAnyFilter && (
                    <motion.button
                        onClick={() => {
                            onStatFilter(null);
                            onFlavorFilter(null);
                            onNeutralFilter("all");
                            onSearch("");
                        }}
                        className="flex items-center gap-1.5 font-nunito font-bold text-[13px] text-[#CC0000] hover:underline"
                        initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }}
                    >
                        <X size={13} /> Limpiar filtros
                    </motion.button>
                )}
            </div>
        </div>
    );
}