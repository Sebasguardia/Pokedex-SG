"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Pin, Star, MoreVertical, CheckSquare, Square } from "lucide-react";
import { FavoritePokemon } from "@/types/api/favorites.types";
import { TYPE_COLORS, TYPE_NAMES_ES, GEN_LABELS, timeAgo } from "@/lib/constants/favorites.constants";
import { useFavoritesStore } from "@/lib/store/favorites.store";
import { FavoriteActionsMenu } from "./favorite-actions-menu";
import { PokemonSprite } from "@/components/shared/pokemon-sprite";

interface FavoriteCardProps {
    pokemon: FavoritePokemon;
}

function StarRating({ rating }: { rating: number }) {
    if (rating === 0) return null;
    return (
        <div className="flex items-center gap-0.5">
            {[1,2,3,4,5].map((i) => (
                <span key={i} style={{ color: i <= rating ? "#F59E0B" : "#DDDDDD", fontSize: 16 }}>★</span>
            ))}
        </div>
    );
}

export function FavoriteCard({ pokemon }: FavoriteCardProps) {
    const { isSelectionMode, selectedIds, toggleSelect } = useFavoritesStore();
    const isSelected = selectedIds.includes(pokemon.id);
    const primaryType = pokemon.types?.[0] ?? "normal";
    const primaryColor = TYPE_COLORS[primaryType] ?? "#888888";
    const bstPercent = Math.min(100, ((pokemon.bst || 0) / 780) * 100);

    const handleClick = () => {
        if (isSelectionMode) {
            toggleSelect(pokemon.id);
        }
    };

    return (
        <motion.div
            onClick={handleClick}
            className="relative bg-white border-2 overflow-hidden flex flex-col"
            style={{
                borderColor:  isSelected ? "#CC0000" : "#111111",
                boxShadow:    isSelected ? "4px 4px 0 #CC0000" : "4px 4px 0 #111111",
                cursor:       isSelectionMode ? "pointer" : "default",
            }}
            whileHover={!isSelectionMode ? { x: 2, y: 2, boxShadow: "2px 2px 0 #111111" } : {}}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
        >
            {/* Top color stripe */}
            <div className="h-[4px] w-full shrink-0" style={{ backgroundColor: primaryColor }} />

            {/* Selection overlay */}
            <AnimatePresence>
                {isSelected && (
                    <motion.div
                        className="absolute inset-0 pointer-events-none z-10"
                        style={{ backgroundColor: "#CC000010" }}
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    />
                )}
            </AnimatePresence>

            {/* Header */}
            <div className="px-3 pt-2 pb-0 flex items-start justify-between gap-1">
                {/* Highlight + Selection */}
                <div className="flex items-center gap-1">
                    {isSelectionMode ? (
                        <motion.div animate={{ scale: isSelected ? [0, 1.2, 1] : 1 }} transition={{ duration: 0.2 }}>
                            {isSelected
                                ? <CheckSquare size={14} className="text-[#CC0000]" />
                                : <Square size={14} className="text-[#CCCCCC]" />
                            }
                        </motion.div>
                    ) : pokemon.isHighlighted ? (
                        <Pin size={12} className="text-[#CC0000]" fill="#CC0000" />
                    ) : null}
                </div>

                {/* Actions Menu */}
                {!isSelectionMode && <FavoriteActionsMenu pokemon={pokemon} />}
            </div>

            {/* Artwork */}
            <Link href={`/pokemon/${pokemon.name}`} className="block relative" tabIndex={isSelectionMode ? -1 : 0}>
                <div className="relative h-[100px] flex items-center justify-center mt-1">
                    <div
                        className="absolute inset-0 opacity-10 blur-2xl"
                        style={{ backgroundColor: primaryColor }}
                    />
                    <PokemonSprite
                        id={pokemon.id}
                        name={pokemon.nameEs}
                        size={88}
                        className="relative z-10"
                    />
                </div>
            </Link>

            {/* Rating */}
            <div className="px-3 pt-1 flex items-center justify-between">
                <StarRating rating={pokemon.rating} />
                {(pokemon.isLegendary || pokemon.isMythical) && (
                    <span className="font-press-start text-[9px] px-2 py-1 bg-[#F59E0B] text-white">
                        {pokemon.isMythical ? "MÍTICO" : "LEGEND"}
                    </span>
                )}
            </div>

            {/* Name + ID */}
            <div className="px-3 pt-1">
                <Link href={`/pokemon/${pokemon.name}`} tabIndex={isSelectionMode ? -1 : 0}>
                    <p className="font-press-start text-[13px] text-[#111111] uppercase tracking-tight truncate hover:text-[#CC0000] transition-colors leading-tight">
                        {pokemon.nameEs}
                    </p>
                </Link>
                <p className="font-jetbrains text-[13px] text-[#BBBBBB] italic mt-0.5">
                    #{String(pokemon.id).padStart(3, "0")} · {GEN_LABELS[pokemon.generation]}
                </p>
            </div>

            {/* Types */}
            <div className="px-3 pt-1.5 flex gap-1">
                {pokemon.types?.map((t) => (
                    <span
                        key={t}
                        className="font-press-start text-[9px] px-2 py-0.5 text-white"
                        style={{ backgroundColor: TYPE_COLORS[t] }}
                    >
                        {TYPE_NAMES_ES[t]}
                    </span>
                ))}
            </div>

            {/* BST bar */}
            <div className="px-3 pt-2">
                <div className="flex items-center justify-between mb-1 mt-1">
                    <span className="font-jetbrains text-[12px] text-[#888888]">BST</span>
                    <span className="font-press-start text-[10px] text-[#111111]">{pokemon.bst}</span>
                </div>
                <div className="h-[3px] bg-[#F5F5F5] w-full">
                    <div className="h-full" style={{ width: `${bstPercent}%`, backgroundColor: primaryColor }} />
                </div>
            </div>

            {/* Tags */}
            {pokemon.tags && pokemon.tags.length > 0 && (
                <div className="px-3 pt-3 flex flex-wrap gap-1">
                    {pokemon.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="font-nunito text-[12px] text-[#555555] bg-[#F5F5F5] px-2 py-0.5">
                            {tag}
                        </span>
                    ))}
                    {pokemon.tags.length > 3 && (
                        <span className="font-nunito text-[12px] text-[#AAAAAA]">+{pokemon.tags.length - 3}</span>
                    )}
                </div>
            )}

            {/* Note preview */}
            {pokemon.note && (
                <div className="px-3 pt-1.5 pb-0">
                    <p className="font-nunito text-[14px] text-[#888888] italic line-clamp-2 leading-snug">
                        &ldquo;{pokemon.note}&rdquo;
                    </p>
                </div>
            )}

            {/* Footer */}
            <div className="px-3 pt-1 pb-2 mt-auto">
                <p className="font-nunito text-[12px] text-[#CCCCCC]">
                    {timeAgo(pokemon.addedAt)}
                </p>
            </div>
        </motion.div>
    );
}
