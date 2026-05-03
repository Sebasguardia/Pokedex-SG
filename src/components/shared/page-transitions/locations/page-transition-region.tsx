"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PageTransitionRegionProps {
    regionColor: string;
    nameEs: string;
}

export function PageTransitionRegion({ regionColor, nameEs }: PageTransitionRegionProps) {
    const [phase, setPhase] = useState<"loading" | "exit-content" | "exit-bg" | "done">("loading");

    useEffect(() => {
        const t1 = setTimeout(() => setPhase("exit-content"), 1400);
        const t2 = setTimeout(() => setPhase("exit-bg"), 1800);
        const t3 = setTimeout(() => setPhase("done"), 2600);
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }, []);

    // 3 layers of slices covering the screen
    const layers = ["#111111", "#ffffff", regionColor];

    return (
        <AnimatePresence>
            {phase !== "done" && (
                <div className="fixed inset-0 z-[200] pointer-events-none flex flex-col justify-center items-center overflow-hidden">
                    
                    {/* LAYERED SWIPES */}
                    {layers.map((hex, i) => (
                        <motion.div
                            key={i}
                            className="absolute inset-0"
                            style={{ backgroundColor: hex, zIndex: 10 + i }}
                            initial={{ x: "-100%", skewX: -20 }}
                            animate={(phase === "exit-bg" || phase === "exit-content") ? (phase === "exit-bg" ? { x: "100%", skewX: -20 } : { x: "0%", skewX: 0 }) : { x: "0%", skewX: 0 }}
                            transition={{ 
                                duration: 0.7, 
                                delay: (phase === "exit-content" || phase === "exit-bg") ? i * 0.1 : i * 0.15, 
                                ease: [0.82, 0, 0.36, 1] 
                            }}
                        />
                    ))}

                    {/* CONTENT THAT APPEARS OVER THE FINAL LAYER */}
                    <div className="absolute inset-0 z-[30] flex flex-col items-center justify-center">
                        <motion.div
                            initial={{ y: -500, rotate: -180, scale: 0.5 }}
                            animate={(phase === "exit-content" || phase === "exit-bg") ? { y: 500, rotate: 180, opacity: 0 } : { y: 0, rotate: 0, scale: 1 }}
                            transition={{ 
                                type: "spring", 
                                stiffness: 200, 
                                damping: 15,
                                delay: (phase === "exit-content" || phase === "exit-bg") ? 0 : 0.6 
                            }}
                            className="w-48 h-48 sm:w-56 sm:h-56 bg-white rounded-full border-[16px] border-[#111111] shadow-[16px_16px_0_#111111] relative overflow-hidden flex items-center justify-center bg-[linear-gradient(to_bottom,#ee1515_50%,#ffffff_50%)]"
                        >
                            {/* Pokeball line */}
                            <div className="absolute w-full h-[16px] bg-[#111111] top-1/2 -translate-y-1/2" />
                            {/* Pokeball center button */}
                            <div className="w-16 h-16 bg-white border-[12px] border-[#111111] rounded-full z-10" />
                        </motion.div>

                        <motion.h1 
                            className="mt-8 font-['Press_Start_2P'] text-[10vw] sm:text-7xl text-white tracking-widest text-center"
                            style={{ textShadow: "8px 8px 0 #111111, -3px -3px 0 #111111, 3px -3px 0 #111111, -3px 3px 0 #111111, 3px 3px 0 #111111" }}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={(phase === "exit-content" || phase === "exit-bg") ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.9 }}
                        >
                            {nameEs.toUpperCase()}
                        </motion.h1>
                    </div>
                </div>
            )}
        </AnimatePresence>
    );
}