"use client";

import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

interface ScrollProgressBarProps {
    /** Color de la barra. Default: #CC0000 (rojo Pokémon) */
    color?: string;
}

export function ScrollProgressBar({ color = "#CC0000" }: ScrollProgressBarProps) {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });
    const prefersReduced = useReducedMotion();

    if (prefersReduced) return null;

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-[3px] z-[100] origin-left pointer-events-none"
            style={{ scaleX, backgroundColor: color }}
        />
    );
}