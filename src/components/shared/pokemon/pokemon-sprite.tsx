"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import {
    getPokemonArtworkUrl,
    getPokemonShinyArtworkUrl,
    getPokemonShowdownSpriteUrl,
    getPokemonSpriteUrl,
} from "@/lib/utils/pokemon.utils";

interface PokemonSpriteProps {
    id: number;
    name: string;
    shiny?: boolean;
    back?: boolean;
    size?: number;
    className?: string;
    style?: React.CSSProperties;
    /** Force artwork mode (skip animated/pixel sprites). Useful for large hero images. */
    useArtwork?: boolean;
}

/**
 * Renders a Pokemon image with a 3-step quality fallback:
 *   1. Animated showdown GIF (pixelated)
 *   2. Static pixel sprite PNG
 *   3. Official artwork (smooth)
 */
export function PokemonSprite({ id, name, shiny = false, back = false, size = 96, className, style, useArtwork = false }: PokemonSpriteProps) {
    // Step 0 = animated GIF, 1 = static pixel PNG, 2 = official artwork
    const [fallbackStep, setFallbackStep] = useState(0);

    const getSrc = () => {
        if (useArtwork) {
            return shiny ? getPokemonShinyArtworkUrl(id) : getPokemonArtworkUrl(id);
        }
        if (fallbackStep === 0) return getPokemonShowdownSpriteUrl(id, shiny, back);
        if (fallbackStep === 1) return getPokemonSpriteUrl(id, shiny, back);
        return shiny ? getPokemonShinyArtworkUrl(id) : getPokemonArtworkUrl(id);
    };

    const src = getSrc();
    const isPixelated = !useArtwork && fallbackStep < 2;

    return (
        <div 
            className={cn("relative flex items-center justify-center w-[var(--sprite-size)] h-[var(--sprite-size)]", className)} 
            style={{ 
                "--sprite-size": `${size}px`,
                ...style 
            } as React.CSSProperties}
        >
            <Image
                src={src}
                alt={`Imagen de ${name}${shiny ? " variocolor" : ""}${back ? " (espalda)" : ""}`}
                width={size}
                height={size}
                unoptimized
                className={cn(
                    "object-contain drop-shadow-[0_0_8px_rgba(204,0,0,0.15)]",
                    isPixelated ? "[image-rendering:pixelated]" : "auto"
                )}
                onError={() => setFallbackStep((prev) => Math.min(prev + 1, 2))}
            />
        </div>
    );
}
