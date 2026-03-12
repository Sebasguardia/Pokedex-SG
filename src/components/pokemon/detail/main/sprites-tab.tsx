"use client";

import Image from "next/image";
import { PokemonSprites } from "@/types/api/pokemon.types";

interface SpritesTabProps {
    sprites: PokemonSprites;
    name: string;
}

export function SpritesTab({ sprites, name }: SpritesTabProps) {
    const spriteList = [
        { label: "Normal (frente)", src: sprites.front_default },
        { label: "Normal (dorso)", src: sprites.back_default },
        { label: "Shiny (frente)", src: sprites.front_shiny },
        { label: "Shiny (dorso)", src: sprites.back_shiny },
        { label: "Hembra (frente)", src: sprites.front_female },
        { label: "Hembra shiny", src: sprites.front_shiny_female },
        { label: "Artwork Oficial", src: sprites.other?.["official-artwork"]?.front_default },
        { label: "Artwork Shiny", src: sprites.other?.["official-artwork"]?.front_shiny },
    ].filter((s) => s.src);

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {spriteList.map((s) => (
                <div key={s.label} className="flex flex-col items-center gap-2 p-3 rounded-xl border border-poke-border bg-poke-darker">
                    <Image src={s.src!} alt={`${name} - ${s.label}`} width={80} height={80} className="object-contain" />
                    <span className="text-[10px] text-muted-foreground text-center">{s.label}</span>
                </div>
            ))}
        </div>
    );
}
