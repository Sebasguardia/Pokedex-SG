"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Pin, CheckSquare, Square } from "lucide-react";
import { FavoritePokemon } from "@/types/api/favorites.types";
import { TYPE_COLORS } from "@/lib/constants/favorites.constants";
import { useFavoritesStore } from "@/lib/store/favorites.store";
import { PokemonSprite } from "@/components/shared/pokemon-sprite";

interface FavoriteCardAlbumProps {
    pokemon: FavoritePokemon;
}

export function FavoriteCardAlbum({ pokemon }: FavoriteCardAlbumProps) {
    const { isSelectionMode, selectedIds, toggleSelect } = useFavoritesStore();
    const isSelected = selectedIds.includes(pokemon.id);
    const primaryColor = TYPE_COLORS[pokemon.types?.[0] ?? "normal"] ?? "#888888";

    return (
        <motion.div
            onClick={isSelectionMode ? () => toggleSelect(pokemon.id) : undefined}
            className="relative flex flex-col items-center bg-white border-2 border-[#111111] p-2 overflow-hidden"
            style={{
                boxShadow:   isSelected ? "3px 3px 0 #CC0000" : "3px 3px 0 #111111",
                borderColor: isSelected ? "#CC0000" : "#111111",
                cursor:      isSelectionMode ? "pointer" : "default",
            }}
            whileHover={!isSelectionMode ? { y: -2, boxShadow: "3px 6px 0 #111111" } : {}}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
        >
            {/* Pin */}
            {pokemon.isHighlighted && (
                <Pin size={10} className="absolute top-1.5 left-1.5 text-[#CC0000]" fill="#CC0000" />
            )}

            {/* Selection */}
            {isSelectionMode && (
                <div className="absolute top-1.5 right-1.5">
                    {isSelected
                        ? <CheckSquare size={12} className="text-[#CC0000]" />
                        : <Square size={12} className="text-[#CCCCCC]" />
                    }
                </div>
            )}

            {/* Artwork */}
            <Link href={`/pokemon/${pokemon.name}`} tabIndex={isSelectionMode ? -1 : 0}>
                <div className="relative w-[88px] h-[88px] flex items-center justify-center">
                    <div
                        className="absolute inset-0 opacity-15 blur-xl"
                        style={{ backgroundColor: primaryColor }}
                    />
                    <PokemonSprite
                        id={pokemon.id}
                        name={pokemon.nameEs}
                        size={80}
                        className="relative z-10"
                    />
                </div>
            </Link>

            {/* Name */}
            <p className="font-press-start text-[10px] text-[#111111] uppercase mt-2 text-center truncate max-w-full leading-tight">
                {pokemon.nameEs}
            </p>

            {/* Type dot + rating */}
            <div className="flex items-center gap-1.5 mt-0.5">
                {pokemon.types?.map((t) => (
                    <span
                        key={t}
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: TYPE_COLORS[t] }}
                    />
                ))}
                {pokemon.rating > 0 && (
                    <span className="font-nunito text-[14px] text-[#F59E0B]">
                        {"★".repeat(pokemon.rating)}
                    </span>
                )}
            </div>
        </motion.div>
    );
}
