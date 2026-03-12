"use client";

import { formatPokemonName } from "@/lib/utils/pokemon.utils";
import { PokemonAbility } from "@/types/api/pokemon.types";

interface AbilitiesTabProps {
    abilities: PokemonAbility[];
}

export function AbilitiesTab({ abilities }: AbilitiesTabProps) {
    return (
        <div className="flex flex-col gap-3">
            {abilities.map((a) => (
                <div key={a.ability.name} className="flex items-start gap-3 p-3 rounded-lg bg-poke-surface border border-poke-border">
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-foreground capitalize">{formatPokemonName(a.ability.name)}</span>
                            {a.is_hidden && (
                                <span className="text-[9px] font-pixel text-poke-yellow border border-poke-yellow/60 rounded-full px-2 py-0.5">OCULTA</span>
                            )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Slot {a.slot}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
