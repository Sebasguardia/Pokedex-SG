"use client";

import { PokemonSprite } from "@/components/shared/pokemon/pokemon-sprite";
import { useCompare } from "@/lib/hooks/compare/useCompare";
import { formatPokemonName } from "@/lib/utils/pokemon.utils";
import { X } from "lucide-react";

export function ComparePanel() {
    const { pokemonIds, removePokemon } = useCompare();
    const slots = [0, 1, 2];

    return (
        <div className="grid grid-cols-3 gap-4">
            {slots.map((slot) => {
                const id = pokemonIds[slot];
                return (
                    <div key={slot} className="flex flex-col items-center gap-3 p-4 rounded-xl border border-poke-border bg-poke-surface min-h-[160px] justify-center">
                        {id ? (
                            <>
                                <div className="relative">
                                    <PokemonSprite id={id} name={`pokemon-${id}`} size={96} />
                                    <button
                                        onClick={() => removePokemon(id)}
                                        className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-poke-red text-white flex items-center justify-center"
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                </div>
                                <span className="text-xs text-muted-foreground">#{String(id).padStart(3, "0")}</span>
                            </>
                        ) : (
                            <span className="text-sm text-muted-foreground">Slot {slot + 1}</span>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
