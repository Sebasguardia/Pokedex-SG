"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { getPokemonArtworkUrl, getPokemonShinyArtworkUrl, getPokemonSpriteUrl } from "@/lib/utils/pokemon.utils";

interface PokemonSpriteProps {
    id: number;
    name: string;
    shiny?: boolean;
    size?: number;
    className?: string;
    useArtwork?: boolean;
}

export function PokemonSprite({ id, name, shiny = false, size = 96, className, useArtwork = false }: PokemonSpriteProps) {
    const [imgError, setImgError] = useState(false);

    const src = imgError
        ? getPokemonSpriteUrl(id, false)
        : useArtwork
            ? (shiny ? getPokemonShinyArtworkUrl(id) : getPokemonArtworkUrl(id))
            : getPokemonSpriteUrl(id, shiny);

    return (
        <div className={cn("relative flex items-center justify-center", className)} style={{ width: size, height: size }}>
            <Image
                src={src}
                alt={name}
                width={size}
                height={size}
                className="object-contain drop-shadow-[0_0_8px_rgba(204,0,0,0.3)]"
                onError={() => setImgError(true)}
            />
        </div>
    );
}
