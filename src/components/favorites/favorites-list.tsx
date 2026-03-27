"use client";

import { FavoritePokemon } from "@/types/api/favorites.types";
import { FavoriteCardList } from "./favorite-card-list";
import { FavoritesNoResults } from "./favorites-no-results.tsx";

interface FavoritesListProps {
    items: FavoritePokemon[];
    onClearFilters: () => void;
}

export function FavoritesList({ items, onClearFilters }: FavoritesListProps) {
    if (items.length === 0) return <FavoritesNoResults onClear={onClearFilters} />;

    return (
        <div className="border-2 border-[#111111] bg-white" style={{ boxShadow: "4px 4px 0 #111111" }}>
            {/* Header */}
            <div className="flex items-center px-3 py-2 border-b-2 border-[#111111] bg-[#111111]">
                <div className="w-8" />
                <span className="font-press-start text-[7px] text-[#888888] w-10">N°</span>
                <span className="font-press-start text-[7px] text-[#AAAAAA] flex-1">POKÉMON</span>
                <span className="font-press-start text-[7px] text-[#AAAAAA] w-16 text-right">RATING</span>
                <span className="font-press-start text-[7px] text-[#AAAAAA] w-16 text-right">BST</span>
                <div className="w-8" />
            </div>
            {items.filter(poke => poke && poke.id).map((poke, i) => (
                <FavoriteCardList key={poke.id} pokemon={poke} isEven={i % 2 === 0} />
            ))}
        </div>
    );
}
