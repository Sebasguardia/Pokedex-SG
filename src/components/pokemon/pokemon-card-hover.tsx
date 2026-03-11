"use client";

import { PokemonSprite } from "@/components/shared/pokemon-sprite";
import { PokemonCard } from "./pokemon-card";

// Pokemon hover card - shows on hovering a pokemon card in the grid
interface PokemonCardHoverProps {
    id: number;
    name: string;
}

export function PokemonCardHover({ id, name }: PokemonCardHoverProps) {
    return (
        <div className="bg-poke-surface border border-poke-border rounded-xl p-3 shadow-xl w-48">
            <PokemonSprite id={id} name={name} size={80} className="mx-auto mb-2" />
            <p className="text-center text-xs font-medium text-white capitalize">{name}</p>
        </div>
    );
}
