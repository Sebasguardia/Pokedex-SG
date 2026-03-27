"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Filter, X } from "lucide-react";
import { useFavoritesStore } from "@/lib/store/favorites.store";
import { TYPE_COLORS, TYPE_NAMES_ES, ALL_TYPES, GEN_COLORS, GEN_LABELS } from "@/lib/constants/favorites.constants";
import { useFilteredFavorites, useAllTags, useFavorites } from "@/lib/hooks/useFavorites";

const GEN_LIST = [1,2,3,4,5,6,7,8,9] as const;

export function FavoritesFilterPanel() {
    const [isOpen, setIsOpen] = useState(false);
    const { filterState, setFilter, clearFilters } = useFavoritesStore();
    const filtered = useFilteredFavorites();
    const allTags  = useAllTags();
    const { favorites } = useFavorites();

    const hasActiveFilters =
        filterState.typeFilter.length > 0 ||
        filterState.generationFilter.length > 0 ||
        filterState.ratingFilter.length > 0 ||
        filterState.tagFilter.length > 0 ||
        filterState.onlyHighlighted ||
        filterState.onlyLegendary ||
        filterState.bstRange[0] > 0 ||
        filterState.bstRange[1] < 780;

    const toggleType = (t: string) => {
        const next = filterState.typeFilter.includes(t)
            ? filterState.typeFilter.filter((x) => x !== t)
            : [...filterState.typeFilter, t];
        setFilter({ typeFilter: next });
    };

    const toggleGen = (g: number) => {
        const next = filterState.generationFilter.includes(g)
            ? filterState.generationFilter.filter((x) => x !== g)
            : [...filterState.generationFilter, g];
        setFilter({ generationFilter: next });
    };

    const toggleRating = (r: number) => {
        const next = filterState.ratingFilter.includes(r)
            ? filterState.ratingFilter.filter((x) => x !== r)
            : [...filterState.ratingFilter, r];
        setFilter({ ratingFilter: next });
    };

    const toggleTag = (tag: string) => {
        const next = filterState.tagFilter.includes(tag)
            ? filterState.tagFilter.filter((x) => x !== tag)
            : [...filterState.tagFilter, tag];
        setFilter({ tagFilter: next });
    };

    return (
        <div className="mb-4">
            {/* Toggle button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex items-center justify-between px-4 py-2.5 border-2 border-[#111111] bg-white ${
                    hasActiveFilters ? "border-[#CC0000]" : ""
                }`}
                style={{ boxShadow: "3px 3px 0 #111111" }}
            >
                <div className="flex items-center gap-2">
                    <Filter size={15} className={hasActiveFilters ? "text-[#CC0000]" : "text-[#888888]"} />
                    <span className="font-press-start text-[11px] text-[#111111]">
                        FILTROS
                        {hasActiveFilters && " •"}
                    </span>
                </div>
                <ChevronDown
                    size={14} className="text-[#888888] transition-transform"
                    style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                />
            </button>

            {/* Filter Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <div className="border-2 border-t-0 border-[#111111] bg-white p-4 space-y-5"
                            style={{ boxShadow: "3px 3px 0 #111111" }}>

                            {/* Types */}
                            <div>
                                <p className="font-press-start text-[10px] text-[#888888] mb-3">TIPO</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {ALL_TYPES.map((t) => {
                                        const active = filterState.typeFilter.includes(t);
                                        return (
                                            <button key={t} onClick={() => toggleType(t)}
                                                className="font-press-start text-[9px] px-2.5 py-1.5 border transition-all"
                                                style={{
                                                    backgroundColor: active ? TYPE_COLORS[t] : "white",
                                                    borderColor:     TYPE_COLORS[t],
                                                    color:           active ? "white" : TYPE_COLORS[t],
                                                }}
                                            >
                                                {TYPE_NAMES_ES[t]}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Generation */}
                            <div>
                                <p className="font-press-start text-[10px] text-[#888888] mb-3">GENERACIÓN</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {GEN_LIST.map((g) => {
                                        const active = filterState.generationFilter.includes(g);
                                        return (
                                            <button key={g} onClick={() => toggleGen(g)}
                                                className="font-press-start text-[9px] px-3.5 py-1.5 border-2 transition-all"
                                                style={{
                                                    backgroundColor: active ? GEN_COLORS[g] : "white",
                                                    borderColor:     GEN_COLORS[g],
                                                    color:           active ? "white" : GEN_COLORS[g],
                                                }}
                                            >
                                                {GEN_LABELS[g]}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Rating */}
                            <div>
                                <p className="font-press-start text-[10px] text-[#888888] mb-3">RATING</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {[5,4,3,2,1].map((r) => {
                                        const active = filterState.ratingFilter.includes(r);
                                        return (
                                            <button key={r} onClick={() => toggleRating(r)}
                                                className="font-nunito text-[15px] px-3 py-1 border-2 transition-all"
                                                style={{
                                                    backgroundColor: active ? "#F59E0B" : "white",
                                                    borderColor:     "#F59E0B",
                                                    color:           active ? "white" : "#F59E0B",
                                                }}
                                            >
                                                {"★".repeat(r)}{"☆".repeat(5-r)}
                                            </button>
                                        );
                                    })}
                                    <button onClick={() => setFilter({ ratingFilter: filterState.ratingFilter.includes(0)
                                        ? filterState.ratingFilter.filter(r => r !== 0)
                                        : [...filterState.ratingFilter, 0] })}
                                        className={`font-press-start text-[9px] px-3 py-1 border-2 transition-all ${
                                            filterState.ratingFilter.includes(0) ? "bg-[#888888] text-white" : "bg-white text-[#888888]"
                                        } border-[#888888]`}
                                    >
                                        Sin rating
                                    </button>
                                </div>
                            </div>

                            {/* Tags */}
                            {allTags.length > 0 && (
                                <div>
                                    <p className="font-press-start text-[10px] text-[#888888] mb-3">TAGS</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {allTags.map((tag) => {
                                            const active = filterState.tagFilter.includes(tag);
                                            return (
                                                <button key={tag} onClick={() => toggleTag(tag)}
                                                    className={`font-nunito text-[14px] px-3 py-1 border-2 border-[#DDDDDD] transition-colors ${
                                                        active ? "bg-[#111111] text-white border-[#111111]" : "bg-white text-[#555555]"
                                                    }`}
                                                >
                                                    {tag}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* BST Range */}
                            <div>
                                <p className="font-press-start text-[10px] text-[#888888] mb-3">
                                    BST: {filterState.bstRange[0]} — {filterState.bstRange[1]}
                                </p>
                                <div className="flex gap-4 items-center">
                                    <input type="range" min={0} max={780} step={10}
                                        value={filterState.bstRange[0]}
                                        onChange={(e) => setFilter({ bstRange: [+e.target.value, filterState.bstRange[1]] })}
                                        className="flex-1 accent-[#CC0000]"
                                    />
                                    <input type="range" min={0} max={780} step={10}
                                        value={filterState.bstRange[1]}
                                        onChange={(e) => setFilter({ bstRange: [filterState.bstRange[0], +e.target.value] })}
                                        className="flex-1 accent-[#CC0000]"
                                    />
                                </div>
                            </div>

                            {/* Options */}
                            <div className="flex flex-wrap gap-4">
                                {[
                                    { key: "onlyHighlighted", label: "Solo destacados" },
                                    { key: "onlyLegendary",   label: "Solo legendarios" },
                                ].map(({ key, label }) => (
                                    <label key={key} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={filterState[key as keyof typeof filterState] as boolean}
                                            onChange={(e) => setFilter({ [key]: e.target.checked } as Partial<typeof filterState>)}
                                            className="accent-[#CC0000] w-5 h-5"
                                        />
                                        <span className="font-nunito text-[15px] text-[#555555]">{label}</span>
                                    </label>
                                ))}
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between pt-3 border-t border-[#F5F5F5]">
                                <span className="font-nunito text-[15px] text-[#888888]">
                                    {filtered.length} de {favorites.length} Pokémon
                                </span>
                                {hasActiveFilters && (
                                    <button onClick={clearFilters} className="font-press-start text-[9px] text-[#CC0000] flex items-center gap-1.5">
                                        <X size={11} /> Limpiar
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
