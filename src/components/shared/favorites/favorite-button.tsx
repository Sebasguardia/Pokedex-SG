"use client";

import { useState } from "react";
import { Heart, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useFavorites } from "@/lib/hooks/favorites/useFavorites";
import { FavoritePokemonInput } from "@/lib/store/favorites.store";

interface FavoriteButtonProps {
    pokemonId: number;
    className?: string;
}

export function FavoriteButton({ pokemonId, className }: FavoriteButtonProps) {
    const { isFavorite, removeFavorite, addFavorite } = useFavorites();
    const [isLoading, setIsLoading] = useState(false);
    const fav = isFavorite(pokemonId);

    const handleToggle = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (fav) {
            removeFavorite(pokemonId);
            return;
        }

        if (isLoading) return;

        setIsLoading(true);
        try {
            const pokeRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`).then((r) => {
                if (!r.ok) throw new Error("Pokemon not found");
                return r.json();
            });
            const speciesRes = await fetch(pokeRes.species.url).then((r) => {
                if (!r.ok) throw new Error("Species not found");
                return r.json();
            });

            const newFav: FavoritePokemonInput = {
                id: pokeRes.id,
                name: pokeRes.name,
                nameEs: speciesRes.names.find((n: any) => n.language.name === "es")?.name || pokeRes.name,
                sprite: pokeRes.sprites.front_default || "",
                artwork: pokeRes.sprites.other["official-artwork"].front_default || pokeRes.sprites.front_default || "",
                types: pokeRes.types.map((t: any) => t.type.name),
                baseStats: {
                    hp: pokeRes.stats[0].base_stat,
                    attack: pokeRes.stats[1].base_stat,
                    defense: pokeRes.stats[2].base_stat,
                    specialAttack: pokeRes.stats[3].base_stat,
                    specialDefense: pokeRes.stats[4].base_stat,
                    speed: pokeRes.stats[5].base_stat,
                },
                bst: pokeRes.stats.reduce((acc: number, s: any) => acc + s.base_stat, 0),
                generation: parseInt(speciesRes.generation.url.split("/").filter(Boolean).pop() || "1"),
                isLegendary: speciesRes.is_legendary,
                isMythical: speciesRes.is_mythical,
            };

            addFavorite(newFav);
        } catch (error) {
            console.error("Error fetching pokemon to favorite", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleToggle}
            disabled={isLoading}
            aria-label={fav ? "Quitar de favoritos" : "Añadir a favoritos"}
            className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-200",
                fav
                    ? "border-poke-red bg-poke-red/10 text-poke-red hover:bg-poke-red/20"
                    : "border-poke-border bg-transparent text-muted-foreground hover:border-poke-red hover:text-poke-red",
                isLoading && "opacity-50 cursor-wait",
                className
            )}
        >
            {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin text-poke-red" />
            ) : (
                <Heart className={cn("h-4 w-4", fav && "fill-poke-red")} />
            )}
        </button>
    );
}
