"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useState } from "react";
import { usePokemonCry } from "@/lib/hooks/pokemon/usePokemonCry";
import { cn } from "@/lib/utils/cn";

interface CryButtonProps {
    cryUrl: string;
    className?: string;
}

export function CryButton({ cryUrl, className }: CryButtonProps) {
    const { playCry, stopCry } = usePokemonCry();
    const [playing, setPlaying] = useState(false);

    const handleClick = () => {
        if (playing) {
            stopCry();
            setPlaying(false);
        } else {
            playCry(cryUrl);
            setPlaying(true);
            setTimeout(() => setPlaying(false), 3000);
        }
    };

    return (
        <button
            onClick={handleClick}
            aria-label="Reproducir sonido del Pokémon"
            className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-200",
                playing
                    ? "border-poke-yellow bg-poke-yellow/10 text-poke-yellow"
                    : "border-poke-border bg-transparent text-muted-foreground hover:border-poke-yellow hover:text-poke-yellow",
                className
            )}
        >
            {playing ? <Volume2 className="h-4 w-4 animate-pulse" /> : <VolumeX className="h-4 w-4" />}
        </button>
    );
}
