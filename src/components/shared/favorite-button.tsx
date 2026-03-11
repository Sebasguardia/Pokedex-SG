"use client";

import { Heart } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useFavorites } from "@/lib/hooks/useFavorites";

interface FavoriteButtonProps {
    pokemonId: number;
    className?: string;
}

export function FavoriteButton({ pokemonId, className }: FavoriteButtonProps) {
    const { isFavorite, toggleFavorite } = useFavorites();
    const fav = isFavorite(pokemonId);

    return (
        <button
            onClick={() => toggleFavorite(pokemonId)}
            aria-label={fav ? "Quitar de favoritos" : "Añadir a favoritos"}
            className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-200",
                fav
                    ? "border-poke-red bg-poke-red/10 text-poke-red hover:bg-poke-red/20"
                    : "border-poke-border bg-transparent text-muted-foreground hover:border-poke-red hover:text-poke-red",
                className
            )}
        >
            <Heart className={cn("h-4 w-4", fav && "fill-poke-red")} />
        </button>
    );
}
