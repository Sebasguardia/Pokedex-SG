import React, { memo } from "react";
import { cn } from "@/lib/utils/cn";

export const PokeBallSVG = memo(({ className }: { className?: string }) => {
    return (
        <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("w-full h-full", className)}
        >
            <path d="M50 5C25.147 5 5 25.147 5 50H40C40 44.477 44.477 40 50 40C55.523 40 60 44.477 60 50H95C95 25.147 74.853 5 50 5Z" fill="currentColor" />
            <path d="M50 95C74.853 95 95 74.853 95 50H60C60 55.523 55.523 60 50 60C44.477 60 40 55.523 40 50H5C5 74.853 25.147 95 50 95Z" fill="currentColor" />
            <path fillRule="evenodd" clipRule="evenodd" d="M95 50C95 52.761 92.761 55 90 55H63.1C61.467 62.067 56.533 67 50 67C43.467 67 38.533 62.067 36.9 55H10C7.239 55 5 52.761 5 50C5 47.239 7.239 45 10 45H36.9C38.533 37.933 43.467 33 50 33C56.533 33 61.467 37.933 63.1 45H90C92.761 45 95 47.239 95 50ZM50 60C55.523 60 60 55.523 60 50C60 44.477 55.523 40 50 40C44.477 40 40 44.477 40 50C40 55.523 44.477 60 50 60Z" fill="currentColor" />
        </svg>
    );
});

PokeBallSVG.displayName = "PokeBallSVG";
