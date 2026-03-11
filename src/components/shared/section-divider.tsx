"use client";

import { motion } from "framer-motion";

interface SectionDividerProps {
    variant: "dark-to-light" | "light-to-dark" | "dark-to-dark" | "light-to-light" | "dark-to-red" | "red-to-dark" | "featured-to-types";
}

export function SectionDivider({ variant }: SectionDividerProps) {
    // Config based on variant
    const isRightOrigin = variant === "dark-to-light" || variant === "dark-to-dark";
    const originX = isRightOrigin ? "right" : "left";

    const showBlackLine = variant !== "dark-to-red" && variant !== "light-to-light" && variant !== "featured-to-types";
    const showRedLine = variant !== "light-to-light" && variant !== "featured-to-types";

    if (variant === "light-to-light") {
        // Only a subtle 1px gray line when moving between identical backgrounds
        return (
            <div className="w-full h-px bg-gray-200" />
        );
    }

    return (
        <div className="w-full flex flex-col">
            {/* Black line (if applicable) */}
            {showBlackLine && (
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{ transformOrigin: originX }}
                    className={`w-full ${variant === "red-to-dark" ? "h-[3px] bg-[#111111]" : "h-[3px] bg-[#111111]"}`}
                // If red-to-dark, the black line is the bottom one inside the footer start, actually user spec says:
                // "Línea 1: 2px sólida blanca (al fondo del banner rojo) / Línea 2: 3px sólida #111111 (inicio del footer negro)"
                />
            )}

            {/* Red/White line */}
            {showRedLine && (
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    // Red line animates right after black line
                    transition={{ duration: 0.8, ease: "easeOut", delay: showBlackLine ? 0.08 : 0 }}
                    style={{ transformOrigin: originX }}
                    className={`w-full ${variant === "red-to-dark" ? "h-[2px] bg-white order-first" : "h-[2px] bg-poke-red"}`}
                />
            )}
        </div>
    );
}
