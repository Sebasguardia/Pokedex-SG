"use client";

import { PokemonSprite } from "@/components/shared/pokemon-sprite";
import { TypeBadge } from "@/components/pokemon/shared/type-badge";
import { formatPokemonId, formatPokemonName, getIdFromUrl } from "@/lib/utils/pokemon.utils";

interface FormsTabProps {
    forms: { name: string; url: string }[];
}

export function FormsTab({ forms }: FormsTabProps) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {forms.map((form) => {
                const id = getIdFromUrl(form.url);
                return (
                    <div key={form.name} className="flex flex-col items-center gap-2 p-3 rounded-xl border border-poke-border bg-poke-darker">
                        <PokemonSprite id={id} name={form.name} size={80} />
                        <span className="text-xs text-white capitalize text-center">{formatPokemonName(form.name)}</span>
                        <span className="text-[10px] text-muted-foreground">{formatPokemonId(id)}</span>
                    </div>
                );
            })}
        </div>
    );
}
