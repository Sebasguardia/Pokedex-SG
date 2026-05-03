"use client";

import { motion } from "framer-motion";
import { Heart, Star, Trophy, Zap, Flame, Leaf, Snowflake, Mountain, Waves, Sword, Shield, Crown, Gem, Package, BookOpen, Globe, Plus, Trash2, Edit2, X, LucideIcon } from "lucide-react";
import { useFavoritesStore } from "@/lib/store/favorites.store";
import { DEFAULT_COLLECTION_ID } from "@/lib/constants/favorites/favorites.constants";
import type { FavoriteCollection } from "@/types/api/favorites.types";

const ICON_MAP: Record<string, LucideIcon> = {
    Star, Heart, Trophy, Zap, Flame, Leaf, Snowflake, Mountain,
    Waves, Sword, Shield, Crown, Gem, Package, BookOpen, Globe,
};

interface FavoritesSidebarProps {
    onCreateCollection: () => void;
    onEditCollection:   (col: FavoriteCollection) => void;
}

function CollectionItem({
    col,
    isActive,
    onClick,
    onEdit,
    onDelete,
}: {
    col: FavoriteCollection;
    isActive: boolean;
    onClick: () => void;
    onEdit: () => void;
    onDelete: () => void;
}) {
    const { favorites } = useFavoritesStore();
    const count = col.isDefault
        ? favorites.length
        : favorites.filter((f) => f.collectionIds.includes(col.id)).length;

    const Icon = ICON_MAP[col.icon] ?? Heart;

    return (
        <motion.div
            className={`relative flex items-center gap-2.5 px-3 py-2.5 cursor-pointer group ${
                isActive ? "bg-[#111111]/5" : "hover:bg-[#111111]/[0.03]"
            }`}
            style={isActive ? { borderLeft: `3px solid ${col.color}` } : { borderLeft: "3px solid transparent" }}
            onClick={onClick}
            whileHover={{ x: 2 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
            {/* Icon */}
            <div
                className="w-7 h-7 flex items-center justify-center shrink-0 border-[1.5px] border-[var(--icon-border)] bg-[var(--icon-bg)]"
                style={{
                    "--icon-bg": `color-mix(in srgb, ${col.color} 15%, transparent)`,
                    "--icon-border": `color-mix(in srgb, ${col.color} 30%, transparent)`,
                } as React.CSSProperties}
            >
                <Icon size={14} style={{ color: col.color }} aria-hidden="true" />
            </div>

            {/* Name + Count */}
            <div className="flex-1 min-w-0">
                <p className="font-press-start text-[11px] text-[#111111] truncate leading-tight">{col.name}</p>
                <p className="font-nunito text-[13px] text-[#AAAAAA] mt-0.5">{count} Pokémon</p>
            </div>

            {/* Action buttons (hover) */}
            {!col.isDefault && (
                <div className="opacity-0 group-hover:opacity-100 flex items-center gap-0.5 transition-opacity">
                    <button
                        onClick={(e) => { e.stopPropagation(); onEdit(); }}
                        className="w-5 h-5 flex items-center justify-center hover:text-[#CC0000]"
                        aria-label="Editar colección"
                    >
                        <Edit2 size={10} aria-hidden="true" />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onDelete(); }}
                        className="w-5 h-5 flex items-center justify-center hover:text-[#CC0000]"
                        aria-label="Eliminar colección"
                    >
                        <Trash2 size={10} aria-hidden="true" />
                    </button>
                </div>
            )}
        </motion.div>
    );
}

export function FavoritesSidebar({ onCreateCollection, onEditCollection }: FavoritesSidebarProps) {
    const { collections, activeCollectionId, setActiveCollection, deleteCollection, filterState, setFilter } =
        useFavoritesStore();

    // Active filters chips
    const activeFilters: { label: string; onRemove: () => void }[] = [];
    if (filterState.typeFilter.length > 0) {
        filterState.typeFilter.forEach((t) =>
            activeFilters.push({ label: `Tipo: ${t}`, onRemove: () =>
                setFilter({ typeFilter: filterState.typeFilter.filter((x) => x !== t) }) })
        );
    }
    if (filterState.onlyHighlighted) {
        activeFilters.push({ label: "Destacados", onRemove: () => setFilter({ onlyHighlighted: false }) });
    }
    if (filterState.onlyLegendary) {
        activeFilters.push({ label: "Legendarios", onRemove: () => setFilter({ onlyLegendary: false }) });
    }

    return (
        <aside className="w-56 shrink-0 sticky top-4 self-start max-h-[calc(100vh-8rem)] overflow-y-auto">
            {/* Collections */}
            <div
                className="border-2 border-[#111111] bg-white shadow-[4px_4px_0_#111111]"
            >
                {/* Header */}
                <div className="px-3 py-2.5 border-b-2 border-[#111111] flex items-center justify-between">
                    <span className="font-press-start text-[11px] text-[#111111]">COLECCIONES</span>
                    <button
                        onClick={onCreateCollection}
                        className="w-5 h-5 bg-[#CC0000] flex items-center justify-center"
                        aria-label="Añadir colección"
                    >
                        <Plus size={10} className="text-white" aria-hidden="true" />
                    </button>
                </div>

                {/* Collection list */}
                <div className="divide-y divide-[#F5F5F5]">
                    {/* All favorites */}
                    <CollectionItem
                        col={collections.find((c) => c.isDefault)!}
                        isActive={activeCollectionId === null}
                        onClick={() => setActiveCollection(null)}
                        onEdit={() => {}}
                        onDelete={() => {}}
                    />
                    {/* User collections */}
                    {collections
                        .filter((c) => !c.isDefault)
                        .map((col) => (
                            <CollectionItem
                                key={col.id}
                                col={col}
                                isActive={activeCollectionId === col.id}
                                onClick={() => setActiveCollection(col.id)}
                                onEdit={() => onEditCollection(col)}
                                onDelete={() => deleteCollection(col.id)}
                            />
                        ))}
                </div>

                {/* Create button */}
                <div className="p-2 border-t border-[#F5F5F5]">
                    <button
                        onClick={onCreateCollection}
                        className="w-full py-2 font-press-start text-[10px] text-[#888888] hover:text-[#CC0000] flex items-center justify-center gap-1.5 transition-colors"
                    >
                        <Plus size={11} /> Nueva colección
                    </button>
                </div>
            </div>

            {/* Active filters */}
            {activeFilters.length > 0 && (
                <div
                    className="mt-3 border-2 border-[#111111] bg-white p-3 shadow-[4px_4px_0_#111111]"
                >
                    <p className="font-press-start text-[10px] text-[#888888] mb-3">FILTROS ACTIVOS</p>
                    <div className="flex flex-col gap-1.5">
                        {activeFilters.map((f, i) => (
                            <div key={i} className="flex items-center justify-between bg-[#F5F5F5] px-2 py-1.5">
                                <span className="font-nunito text-[14px] text-[#555555]">{f.label}</span>
                                <button title="Quitar filtro" aria-label="Quitar filtro" onClick={f.onRemove} className="text-[#CC0000]">
                                    <X size={10} aria-hidden="true" />
                                </button>
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={() => { /* clearFilters not available directly here but actions are accessed */ }}
                        className="mt-3 font-press-start text-[9px] text-[#CC0000] hover:underline"
                    >
                        Limpiar todos
                    </button>
                </div>
            )}
        </aside>
    );
}
