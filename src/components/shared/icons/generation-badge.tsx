"use client";

import { cn } from "@/lib/utils/cn";
import { GENERATIONS } from "@/lib/constants/generations/generations.constants";

interface GenerationBadgeProps {
    generation: string; // e.g. "generation-i"
    className?: string;
}

export function GenerationBadge({ generation, className }: GenerationBadgeProps) {
    const gen = GENERATIONS.find((g) => g.name === generation);
    const label = gen?.label ?? generation.toUpperCase().replace("GENERATION-", "GEN ");

    return (
        <span className={cn(
            "inline-flex items-center rounded-full bg-poke-darker border border-poke-border px-2 py-0.5 text-[10px] font-pixel text-poke-yellow",
            className
        )}>
            {label}
        </span>
    );
}
