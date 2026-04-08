"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Search, LayoutGrid, List, GalleryHorizontal, MousePointer, X, ChevronUp, ChevronDown } from "lucide-react";
import { useFavoritesStore } from "@/lib/store/favorites.store";
import { SORT_OPTIONS } from "@/lib/constants/favorites.constants";
import { useFilteredFavorites } from "@/lib/hooks/useFavorites";

export function FavoritesToolbar() {
    const {
        viewMode, setViewMode,
        sortBy, sortDirection, setSortBy,
        filterState, setFilter,
        isSelectionMode, setSelectionMode,
        selectedIds,
    } = useFavoritesStore();

    const filtered = useFilteredFavorites();

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter({ searchQuery: e.target.value });
    };

    const views = [
        { id: "grid", Icon: LayoutGrid, label: "Cuadrícula" },
        { id: "list", Icon: List,        label: "Lista" },
        { id: "album", Icon: GalleryHorizontal, label: "Álbum" },
    ] as const;

    return (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-4">
            {/* Search */}
            <div className="relative flex-1">
                <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#AAAAAA]" />
                <input
                    type="text"
                    placeholder="Buscar por nombre o tag..."
                    value={filterState.searchQuery}
                    onChange={handleSearch}
                    className={ `w-full font-nunito text-[15px] pl-8 pr-8 py-2.5 border-2 border-[#DDDDDD] focus:border-[#CC0000] outline-none bg-white ${filterState.searchQuery ? "shadow-[inset_2px_2px_0_#CC000010]" : ""}` }
                />
                {filterState.searchQuery && (
                    <button
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#AAAAAA] hover:text-[#CC0000]"
                        onClick={() => setFilter({ searchQuery: "" })}
                        aria-label="Limpiar búsqueda"
                    >
                        <X size={12} aria-hidden="true" />
                    </button>
                )}
            </div>

            {/* Sort */}
            <div className="relative">
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                    className="font-press-start text-[10px] pl-3 pr-8 py-2.5 border-2 border-[#111111] bg-white cursor-pointer appearance-none shadow-[3px_3px_0_#111111]"
                    aria-label="Ordenar favoritos"
                >
                    {SORT_OPTIONS.map((opt) => (
                        <option key={opt.key} value={opt.key}>{opt.label}</option>
                    ))}
                </select>
                <button
                    onClick={() => setSortBy(sortBy)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#888888] hover:text-[#111111]"
                    aria-label="Invertir ordenamiento"
                >
                    {sortDirection === "asc" ? <ChevronUp size={12} aria-hidden="true" /> : <ChevronDown size={12} aria-hidden="true" />}
                </button>
            </div>

            {/* View toggle */}
            <div className="flex items-center border-2 border-[#111111] shadow-[3px_3px_0_#111111]">
                {views.map(({ id, Icon, label }) => (
                    <motion.button
                        key={id}
                        title={label}
                        onClick={() => setViewMode(id)}
                        className={`w-9 h-9 flex items-center justify-center transition-colors ${
                            viewMode === id ? "bg-[#111111] text-white" : "bg-white text-[#888888] hover:text-[#111111]"
                        }`}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Icon size={14} />
                    </motion.button>
                ))}
            </div>

            {/* Selection mode */}
            <motion.button
                onClick={() => setSelectionMode(!isSelectionMode)}
                className={`font-press-start text-[10px] px-3 py-2.5 border-2 border-[#111111] flex items-center gap-1.5 transition-colors shadow-[3px_3px_0_#111111] ${
                    isSelectionMode ? "bg-[#CC0000] text-white" : "bg-white text-[#111111]"
                }`}
                whileHover={{ x: 1, y: 1, boxShadow: "2px 2px 0 #111111" }}
            >
                <MousePointer size={11} />
                {isSelectionMode ? `${selectedIds.length} sel.` : "Selec."}
            </motion.button>

            {/* Results count */}
            {filterState.searchQuery && (
                <span className="font-nunito text-[14px] text-[#888888] whitespace-nowrap">
                    {filtered.length} resultado{filtered.length !== 1 ? "s" : ""}
                </span>
            )}
        </div>
    );
}
