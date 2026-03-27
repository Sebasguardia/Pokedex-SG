"use client";

import { motion } from "framer-motion";
import { Heart, Download, Upload, Plus, Layers } from "lucide-react";
import Link from "next/link";
import { useFavoritesStats } from "@/lib/hooks/useFavorites";
import { useFavoritesStore } from "@/lib/store/favorites.store";
import { ALL_TYPES } from "@/lib/constants/favorites.constants";

interface FavoritesPageHeaderProps {
    onExport:          () => void;
    onImport:          () => void;
    onCreateCollection: () => void;
}

function StatChip({ value, label }: { value: string | number; label: string }) {
    return (
        <div
            className="border-2 border-[#111111] bg-white px-4 py-3 flex flex-col items-center min-w-[90px]"
            style={{ boxShadow: "3px 3px 0 #111111" }}
        >
            <span className="font-press-start text-[20px] text-[#111111] leading-none">{value}</span>
            <span className="font-nunito text-[13px] text-[#888888] mt-1.5 whitespace-nowrap">{label}</span>
        </div>
    );
}

export function FavoritesPageHeader({ onExport, onImport, onCreateCollection }: FavoritesPageHeaderProps) {
    const stats = useFavoritesStats();
    const totalFavs = useFavoritesStore((s) => s.favorites.length);

    const coveredTypes = ALL_TYPES.filter((t) => (stats.byType[t] ?? 0) > 0).length;
    const avgRating = Object.entries(stats.byRating).reduce((sum, [r, c]) => sum + Number(r)*c, 0) /
        (Object.values(stats.byRating).reduce((a, b) => a + b, 0) || 1);

    return (
        <div className="w-full">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-4">
                <Link href="/" className="font-nunito text-[14px] text-[#888888] hover:text-[#CC0000] transition-colors">
                    Inicio
                </Link>
                <span className="font-nunito text-[14px] text-[#CCCCCC]">/</span>
                <span className="font-nunito text-[14px] text-[#111111] font-bold">Favoritos</span>
            </div>

            {/* Hero row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5">
                {/* Title */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#CC0000] flex items-center justify-center border-2 border-[#111111]"
                        style={{ boxShadow: "3px 3px 0 #111111" }}>
                        <Heart size={20} fill="white" className="text-white" />
                    </div>
                    <div>
                        <h1 className="font-press-start text-[24px] text-[#111111] uppercase leading-none">
                            Favoritos
                        </h1>
                        <p className="font-nunito text-[15px] text-[#888888] mt-2">
                            Tu Pokédex personal
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-wrap">
                    <motion.button
                        onClick={onImport}
                        className="font-press-start text-[10px] px-3 py-2 border-2 border-[#111111] bg-white text-[#111111] flex items-center gap-2"
                        style={{ boxShadow: "3px 3px 0 #111111" }}
                        whileHover={{ x: 1, y: 1, boxShadow: "2px 2px 0 #111111" }}
                    >
                        <Upload size={13} /> Importar
                    </motion.button>
                    <motion.button
                        onClick={onExport}
                        className="font-press-start text-[10px] px-3 py-2 border-2 border-[#111111] bg-white text-[#111111] flex items-center gap-2"
                        style={{ boxShadow: "3px 3px 0 #111111" }}
                        whileHover={{ x: 1, y: 1, boxShadow: "2px 2px 0 #111111" }}
                    >
                        <Download size={13} /> Exportar
                    </motion.button>
                    <motion.button
                        onClick={onCreateCollection}
                        className="font-press-start text-[10px] px-3 py-2 border-2 border-[#111111] bg-[#CC0000] text-white flex items-center gap-2"
                        style={{ boxShadow: "3px 3px 0 #111111" }}
                        whileHover={{ x: 1, y: 1, boxShadow: "2px 2px 0 #111111" }}
                    >
                        <Plus size={13} /> Colección
                    </motion.button>
                </div>
            </div>

            {/* Stat chips */}
            {totalFavs > 0 && (
                <div className="flex flex-wrap gap-3 mb-6">
                    <StatChip value={stats.totalCount}   label="Pokémon" />
                    <StatChip value={stats.collectionCount} label="Colecciones" />
                    <StatChip
                        value={avgRating > 0 ? `★ ${avgRating.toFixed(1)}` : "—"}
                        label="Rating avg"
                    />
                    <StatChip value={stats.averageBST} label="BST promedio" />
                    <StatChip value={`${coveredTypes}/18`} label="Tipos" />
                </div>
            )}

            {/* Separator */}
            <div className="h-[3px] bg-[#111111] w-full" />
            <div className="h-[2px] bg-[#CC0000] w-full mb-6" />
        </div>
    );
}
