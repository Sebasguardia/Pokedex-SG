"use client";

import Link from "next/link";
import { formatPokemonName } from "@/lib/utils/pokemon.utils";

interface BerryCardProps {
    name: string;
    firmness?: string;
    growthTime?: number;
}

export function BerryCard({ name, firmness, growthTime }: BerryCardProps) {
    return (
        <Link href={`/berries/${name}`} className="flex flex-col items-center p-3 rounded-xl border border-poke-border bg-poke-surface hover:border-poke-red/60 transition-all gap-2">
            <div className="text-3xl">🍓</div>
            <span className="text-xs font-medium text-white text-center capitalize">{formatPokemonName(name)}</span>
            {firmness && <span className="text-[10px] text-muted-foreground capitalize">{firmness}</span>}
        </Link>
    );
}
