"use client";

import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { FavoritePokemon } from "@/types/api/favorites.types";
import { FavoriteCard } from "./favorite-card";
import { FavoritesNoResults } from "./favorites-no-results";

interface FavoritesGridProps {
    items: FavoritePokemon[];
    onClearFilters: () => void;
}

export function FavoritesGrid({ items, onClearFilters }: FavoritesGridProps) {
    const parentRef = useRef<HTMLDivElement>(null);
    const COLS = 3; // will be responsive via CSS grid

    if (items.length === 0) return <FavoritesNoResults onClear={onClearFilters} />;

    return (
        <div className="grid gap-4" style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        }}>
            {items.filter(poke => poke && poke.id).map((poke) => (
                <FavoriteCard key={poke.id} pokemon={poke} />
            ))}
        </div>
    );
}
