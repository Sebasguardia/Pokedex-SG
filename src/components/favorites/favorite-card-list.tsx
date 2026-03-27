"use client";

import Image from "next/image";
import Link from "next/link";
import { Pin, CheckSquare, Square } from "lucide-react";
import { FavoritePokemon } from "@/types/api/favorites.types";
import { TYPE_COLORS, GEN_LABELS } from "@/lib/constants/favorites.constants";
import { useFavoritesStore } from "@/lib/store/favorites.store";
import { FavoriteActionsMenu } from "./favorite-actions-menu";

interface FavoriteCardListProps {
    pokemon: FavoritePokemon;
    isEven: boolean;
}

export function FavoriteCardList({ pokemon, isEven }: FavoriteCardListProps) {
    const { isSelectionMode, selectedIds, toggleSelect } = useFavoritesStore();
    const isSelected = selectedIds.includes(pokemon.id);
    const primaryColor = TYPE_COLORS[pokemon.types?.[0] ?? "normal"] ?? "#888888";

    return (
        <div
            className={`flex items-center gap-3 px-3 py-2 border-b border-[#F5F5F5] group transition-colors ${
                isEven ? "bg-white" : "bg-[#FAFAFA]"
            } ${isSelected ? "bg-[#CC000008]" : ""}`}
            style={isSelected ? { outline: "2px solid #CC000060", outlineOffset: "-2px" } : undefined}
            onClick={isSelectionMode ? () => toggleSelect(pokemon.id) : undefined}
        >
            {/* Checkbox */}
            {isSelectionMode && (
                <button className="shrink-0">
                    {isSelected
                        ? <CheckSquare size={14} className="text-[#CC0000]" />
                        : <Square size={14} className="text-[#CCCCCC]" />
                    }
                </button>
            )}

            {/* Sprite */}
            <div className="w-8 h-8 flex items-center justify-center shrink-0">
                <Image src={pokemon.sprite} alt={pokemon.nameEs} width={32} height={32} unoptimized className="object-contain" />
            </div>

            {/* ID */}
            <span className="font-jetbrains text-[13px] text-[#AAAAAA] italic w-12 shrink-0">
                #{String(pokemon.id).padStart(3, "0")}
            </span>

            {/* Name + Types */}
            <div className="flex-1 min-w-0">
                <Link href={`/pokemon/${pokemon.name}`} className="font-press-start text-[12px] text-[#111111] truncate hover:text-[#CC0000] transition-colors leading-relaxed">
                    {pokemon.nameEs}
                </Link>
                <div className="flex items-center gap-1 mt-0.5">
                    {pokemon.types?.map((t) => (
                        <span key={t}
                            className="inline-block w-2 h-2 rounded-full"
                            style={{ backgroundColor: TYPE_COLORS[t] }}
                            title={t}
                        />
                    ))}
                    <span className="font-nunito text-[13px] text-[#BBBBBB] ml-1">{GEN_LABELS[pokemon.generation || 1]}</span>
                </div>
            </div>

            {/* Rating */}
            <div className="w-20 text-right shrink-0">
                <span className="font-nunito text-[16px] font-bold" style={{ color: pokemon.rating > 0 ? "#F59E0B" : "#DDDDDD" }}>
                    {pokemon.rating > 0 ? `${pokemon.rating}.0★` : "—"}
                </span>
            </div>

            {/* BST */}
            <div className="w-16 text-right shrink-0">
                <span className="font-press-start text-[10px]" style={{ color: primaryColor }}>{pokemon.bst}</span>
            </div>

            {/* Pin */}
            {pokemon.isHighlighted && <Pin size={10} className="text-[#CC0000] shrink-0" fill="#CC0000" />}

            {/* Actions */}
            {!isSelectionMode && (
                <div className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                    <FavoriteActionsMenu pokemon={pokemon} />
                </div>
            )}
        </div>
    );
}
