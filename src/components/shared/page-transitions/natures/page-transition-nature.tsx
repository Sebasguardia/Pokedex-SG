"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PageTransitionNatureProps {
    primaryColor: string;
    nameEs: string;
}

export function PageTransitionNature({ primaryColor, nameEs }: PageTransitionNatureProps) {
    const [phase, setPhase] = useState<"in" | "exit" | "done">("in");

    useEffect(() => {
        const t1 = setTimeout(() => setPhase("exit"), 620);
        const t2 = setTimeout(() => setPhase("done"), 980);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, []);

    if (phase === "done") return null;

    const letters = nameEs.toUpperCase().split("");

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-[200] bg-[#111111] flex flex-col items-center justify-center overflow-hidden pointer-events-none"
                exit={{ y: "-100%" }}
                transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
            >
                {/* Dot grid */}
                <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "28px 28px" }}
                />

                {/* Barra horizontal que crece */}
                <motion.div
                    className="absolute top-1/2 left-0 h-[3px]"
                    style={{ backgroundColor: primaryColor }}
                    initial={{ width: 0, translateY: "-50%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                />

                {/* Letras cayendo */}
                <div className="relative flex flex-wrap justify-center gap-x-2 px-8 z-10">
                    {letters.map((char, i) => (
                        <motion.span
                            key={i}
                            className="font-press-start"
                            style={{
                                fontSize: `clamp(26px, ${Math.max(4.5, 9 - letters.length * 0.3)}vw, 56px)`,
                                color: char === " " ? "transparent" : primaryColor,
                                textShadow: `0 0 28px ${primaryColor}55`,
                            }}
                            initial={{ y: -55, opacity: 0, rotate: (i % 2 === 0 ? -3 : 3) }}
                            animate={{ y: 0, opacity: 1, rotate: 0 }}
                            exit={{ y: 55, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 280, damping: 22, delay: i * 0.05 }}
                        >
                            {char === " " ? "\u00A0" : char}
                        </motion.span>
                    ))}
                </div>

                {/* Subtítulo */}
                <motion.p
                    className="absolute bottom-[13%] font-nunito text-[13px] tracking-[4px] uppercase"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32 }}
                >
                    Naturaleza Pokémon
                </motion.p>
            </motion.div>
        </AnimatePresence>
    );
}