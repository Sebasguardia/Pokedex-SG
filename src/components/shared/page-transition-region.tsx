"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PageTransitionRegionProps {
    regionColor: string;
    nameEs: string;  // "Kanto", "Johto", etc.
}

export function PageTransitionRegion({ regionColor, nameEs }: PageTransitionRegionProps) {
    const [phase, setPhase] = useState<"letters" | "exit" | "done">("letters");

    useEffect(() => {
        const t1 = setTimeout(() => setPhase("exit"), 600);
        const t2 = setTimeout(() => setPhase("done"), 950);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, []);

    const letters = nameEs.toUpperCase().split("");

    return (
        <AnimatePresence>
            {phase !== "done" && (
                <motion.div
                    className="fixed inset-0 z-[200] bg-[#111111] flex items-center justify-center overflow-hidden pointer-events-none"
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                    {/* Dot grid en el panel negro */}
                    <div
                        className="absolute inset-0 opacity-[0.04]"
                        style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "28px 28px" }}
                    />

                    {/* Línea de color que cruza horizontalmente */}
                    <motion.div
                        className="absolute left-0 right-0 h-[2px] top-1/2"
                        style={{ backgroundColor: regionColor }}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    />

                    {/* Letras cayendo desde arriba */}
                    <div className="relative flex items-center gap-1 flex-wrap justify-center px-8">
                        {letters.map((char, i) => (
                            <motion.span
                                key={i}
                                className="font-press-start"
                                style={{
                                    fontSize: `clamp(28px, ${Math.max(5, 10 - letters.length * 0.4)}vw, 60px)`,
                                    color: char === " " ? "transparent" : regionColor,
                                    textShadow: `0 0 30px ${regionColor}66`,
                                }}
                                initial={{ y: -60, opacity: 0, rotate: (i % 2 === 0 ? -1 : 1) * 8 }}
                                animate={{ y: 0, opacity: 1, rotate: 0 }}
                                exit={{ y: 60, opacity: 0 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 22,
                                    delay: i * 0.04,
                                }}
                            >
                                {char === " " ? "\u00A0" : char}
                            </motion.span>
                        ))}
                    </div>

                    {/* Subtítulo */}
                    <motion.p
                        className="absolute bottom-[14%] left-1/2 -translate-x-1/2 font-nunito text-[12px] tracking-[4px] uppercase whitespace-nowrap"
                        style={{ color: "rgba(255,255,255,0.35)" }}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        Región Pokémon
                    </motion.p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}