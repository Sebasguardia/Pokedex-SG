"use client";

import { motion } from "framer-motion";
import { Search, X, SlidersHorizontal, ArrowUp, ArrowDown } from "lucide-react";
import {
    TYPE_COLORS, TYPE_NAMES_ES, GEN_COLORS,
} from "@/lib/constants/team-builder.constants";

const ALL_TYPES_LIST = [
    "fire", "water", "electric", "grass", "ice", "fighting", "poison", "ground",
    "flying", "psychic", "bug", "rock", "ghost", "dragon", "dark", "steel", "fairy", "normal",
];

export interface PoolFilterState {
    query: string;
    type: string | null;
    gen: number | null;
    sortBy: "id" | "bst" | "speed" | "attack" | "defense";
    direction: "asc" | "desc";
}

interface TeamFilterPanelProps {
    filters: PoolFilterState;
    onChange: (f: Partial<PoolFilterState>) => void;
    onClear: () => void;
    count: number;
    totalAll: number;
}

export function TeamFilterPanel({ filters, onChange, onClear, count, totalAll }: TeamFilterPanelProps) {
    const hasFilter = !!(filters.type || filters.gen !== null || filters.query.trim());

    const toggleSort = (key: PoolFilterState["sortBy"]) => {
        if (filters.sortBy === key) {
            onChange({ direction: filters.direction === "desc" ? "asc" : "desc" });
        } else {
            onChange({ sortBy: key, direction: "desc" });
        }
    };

    return (
        <div
            className="relative border-2 border-[#E0E0E0] bg-[#FAFAFA] p-5 pt-6"
            style={{ boxShadow: "3px 3px 0 #E0E0E0" }}
        >
            {/* Etiqueta flotante */}
            <div className="absolute top-[-13px] left-4 bg-[#111111] px-3 py-1 flex items-center gap-1.5">
                <SlidersHorizontal size={10} className="text-white" />
                <span className="font-nunito font-bold text-[11px] text-white uppercase">Filtros del Pool</span>
            </div>

            <div className="flex flex-col gap-4">
                {/* Búsqueda */}
                <div className="flex items-center gap-2 border-2 border-[#111111] px-3 py-2.5 bg-white focus-within:border-[#CC0000] transition-colors">
                    <Search size={14} className="text-[#888888] shrink-0" />
                    <input
                        type="text"
                        value={filters.query}
                        onChange={(e) => onChange({ query: e.target.value })}
                        placeholder="Buscar por nombre..."
                        className="flex-1 font-nunito text-[14px] outline-none bg-transparent text-[#111111] placeholder:text-[#BBBBBB]"
                    />
                    {filters.query && (
                        <button onClick={() => onChange({ query: "" })} className="text-[#888888] hover:text-[#CC0000]">
                            <X size={13} />
                        </button>
                    )}
                </div>

                {/* Tipo */}
                <div>
                    <p className="font-press-start text-[8px] text-[#888888] mb-2 uppercase">Tipo</p>
                    <div className="flex flex-wrap gap-1.5">
                        <button
                            onClick={() => onChange({ type: null })}
                            className="font-nunito font-bold text-[12px] px-3 py-1.5 border-2 transition-all"
                            style={
                                !filters.type
                                    ? { backgroundColor: "#111111", borderColor: "#111111", color: "#ffffff" }
                                    : { backgroundColor: "#ffffff", borderColor: "#E0E0E0", color: "#888888" }
                            }
                        >
                            Todos
                        </button>
                        {ALL_TYPES_LIST.map((t) => {
                            const color = TYPE_COLORS[t] ?? "#888888";
                            const active = filters.type === t;
                            return (
                                <motion.button
                                    key={t}
                                    onClick={() => onChange({ type: active ? null : t })}
                                    className="font-press-start text-[7px] px-2 py-1.5 border-2 transition-all"
                                    style={
                                        active
                                            ? { backgroundColor: color, borderColor: "#111111", color: "#ffffff", boxShadow: "2px 2px 0 #111111" }
                                            : { backgroundColor: `${color}15`, borderColor: color, color }
                                    }
                                    whileTap={{ scale: 0.92 }}
                                >
                                    {TYPE_NAMES_ES[t]?.slice(0, 5).toUpperCase()}
                                </motion.button>
                            );
                        })}
                    </div>
                </div>

                {/* Generación */}
                <div>
                    <p className="font-press-start text-[8px] text-[#888888] mb-2 uppercase">Generación</p>
                    <div className="flex flex-wrap gap-1.5">
                        <button
                            onClick={() => onChange({ gen: null })}
                            className="font-nunito font-bold text-[12px] px-3 py-1.5 border-2 transition-all"
                            style={
                                filters.gen === null
                                    ? { backgroundColor: "#111111", borderColor: "#111111", color: "#ffffff" }
                                    : { backgroundColor: "#ffffff", borderColor: "#E0E0E0", color: "#888888" }
                            }
                        >
                            Todas
                        </button>
                        {([1, 2, 3, 4, 5, 6, 7, 8, 9] as const).map((g) => {
                            const color = GEN_COLORS[g] ?? "#888888";
                            const active = filters.gen === g;
                            return (
                                <button
                                    key={g}
                                    onClick={() => onChange({ gen: active ? null : g })}
                                    className="font-press-start text-[7px] px-2.5 py-1.5 border-2 transition-all"
                                    style={
                                        active
                                            ? { backgroundColor: color, borderColor: "#111111", color: "#ffffff", boxShadow: "2px 2px 0 #111111" }
                                            : { backgroundColor: `${color}18`, borderColor: color, color }
                                    }
                                >
                                    {`Gen ${["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"][g - 1]}`}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Ordenar */}
                <div>
                    <p className="font-press-start text-[8px] text-[#888888] mb-2 uppercase">Ordenar por</p>
                    <div className="flex flex-wrap gap-1.5">
                        {(["id", "bst", "speed", "attack", "defense"] as const).map((key) => {
                            const labels = { id: "Número", bst: "BST", speed: "Velocidad", attack: "Ataque", defense: "Defensa" };
                            const active = filters.sortBy === key;
                            return (
                                <button
                                    key={key}
                                    onClick={() => toggleSort(key)}
                                    className="flex items-center gap-1.5 font-press-start text-[8px] px-2.5 py-1.5 border-2 transition-all"
                                    style={
                                        active
                                            ? { backgroundColor: "#111111", borderColor: "#111111", color: "#ffffff" }
                                            : { backgroundColor: "#ffffff", borderColor: "#E0E0E0", color: "#888888" }
                                    }
                                >
                                    {labels[key]}
                                    {active && (filters.direction === "desc" ? <ArrowDown size={9} /> : <ArrowUp size={9} />)}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#E0E0E0]">
                <p className="font-nunito text-[12px] text-[#888888]">
                    <span className="font-bold text-[#111111]">{count}</span> de {totalAll} Pokémon
                </p>
                {hasFilter && (
                    <button
                        onClick={onClear}
                        className="flex items-center gap-1.5 font-nunito font-bold text-[12px] text-[#CC0000] hover:underline"
                    >
                        <X size={12} /> Limpiar
                    </button>
                )}
            </div>
        </div>
    );
}