"use client";

import { useCallback, useRef } from "react";
import { Howl } from "howler";

export function usePokemonCry() {
    const soundRef = useRef<Howl | null>(null);

    const playCry = useCallback((cryUrl: string) => {
        if (soundRef.current) {
            soundRef.current.stop();
        }
        soundRef.current = new Howl({
            src: [cryUrl],
            volume: 0.6,
            onloaderror: (_id, error) => {
                console.warn("Could not load Pokemon cry:", error);
            },
        });
        soundRef.current.play();
    }, []);

    const stopCry = useCallback(() => {
        soundRef.current?.stop();
    }, []);

    return { playCry, stopCry };
}
