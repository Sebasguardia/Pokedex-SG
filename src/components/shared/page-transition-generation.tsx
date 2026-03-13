"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PageTransitionGenerationProps {
    genColor: string;
    roman: string;
}

export function PageTransitionGeneration({ genColor, roman }: PageTransitionGenerationProps) {
    const [phase, setPhase] = useState<"enter" | "expand" | "exit" | "done">("enter");

    useEffect(() => {
        const t1 = setTimeout(() => setPhase("expand"), 250);
        const t2 = setTimeout(() => setPhase("exit"), 600);
        const t3 = setTimeout(() => setPhase("done"), 950);
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }, []);

    if (phase === "done") return null;

    return (
        <AnimatePresence>
            <motion.div
                    className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden pointer-events-none"
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Círculo de color que expande */}
                    <motion.div
                        className="absolute rounded-full"
                        style={{ backgroundColor: genColor }}
                        initial={{ width: 0, height: 0 }}
                        animate={
                            phase === "expand" || phase === "exit"
                                ? { width: "300vmax", height: "300vmax" }
                                : {}
                        }
                        exit={{ width: 0, height: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    />

                    {/* Número romano gigante */}
                    <motion.div
                        className="relative z-10 font-press-start select-none"
                        style={{
                            fontSize: "clamp(80px, 20vw, 160px)",
                            color: phase === "expand" || phase === "exit" ? "#ffffff" : genColor,
                            textShadow: phase === "expand" || phase === "exit"
                                ? "none"
                                : `0 0 40px ${genColor}88`,
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.6, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 350, damping: 22 }}
                    >
                        {roman}
                    </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}