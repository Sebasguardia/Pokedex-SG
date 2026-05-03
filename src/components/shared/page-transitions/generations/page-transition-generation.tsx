"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PageTransitionGenerationProps {
    genColor: string;
    roman: string;
}

export function PageTransitionGeneration({ genColor, roman }: PageTransitionGenerationProps) {
    const [phase, setPhase] = useState<"loading" | "exit-content" | "exit-bg" | "done">("loading");

    useEffect(() => {
        // Step 1: Text disappears
        const t1 = setTimeout(() => setPhase("exit-content"), 1200);
        // Step 2: The solid background splits/moves away
        const t2 = setTimeout(() => setPhase("exit-bg"), 1600);
        // Step 3: Done
        const t3 = setTimeout(() => setPhase("done"), 2400);
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }, []);

    return (
        <AnimatePresence>
            {phase !== "done" && (
                <div className="fixed inset-0 z-[200] pointer-events-none flex overflow-hidden">
                    
                    {/* Puerta Izquierda */}
                    <motion.div 
                        className="flex-1 h-full relative"
                        style={{ backgroundColor: genColor }}
                        initial={{ x: "0%" }}
                        animate={phase === "exit-bg" ? { x: "-100%" } : { x: "0%" }}
                        transition={{ duration: 0.7, ease: [0.82, 0, 0.36, 1] }}
                    >
                        {/* Patrón interior izquierdo */}
                        <div 
                            className="absolute inset-0 opacity-10"
                            style={{ backgroundImage: "linear-gradient(#ffffff 2px, transparent 2px), linear-gradient(90deg, #ffffff 2px, transparent 2px)", backgroundSize: "32px 32px" }}
                        />
                        <div className="absolute top-0 right-0 h-full w-[4px] bg-[#111111]" />
                    </motion.div>

                    {/* Puerta Derecha */}
                    <motion.div 
                        className="flex-1 h-full relative"
                        style={{ backgroundColor: genColor }}
                        initial={{ x: "0%" }}
                        animate={phase === "exit-bg" ? { x: "100%" } : { x: "0%" }}
                        transition={{ duration: 0.7, ease: [0.82, 0, 0.36, 1] }}
                    >
                        {/* Patrón interior derecho (alineado) */}
                        <div 
                            className="absolute inset-0 opacity-10"
                            style={{ backgroundImage: "linear-gradient(#ffffff 2px, transparent 2px), linear-gradient(90deg, #ffffff 2px, transparent 2px)", backgroundSize: "32px 32px", backgroundPosition: "16px 0" }}
                        />
                        <div className="absolute top-0 left-0 h-full w-[4px] bg-[#111111]" />
                    </motion.div>

                    {/* Superposición central */}
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
                        {/* Numeral central gigante estilo medalla */}
                        <motion.div 
                            initial={{ scale: 0, rotate: -45 }}
                            animate={(phase === "exit-content" || phase === "exit-bg") ? { scale: 0, opacity: 0 } : { scale: 1, rotate: 0, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
                            className="bg-white px-8 py-6 border-[8px] border-[#111111] shadow-[12px_12px_0_#111111] z-20 flex items-center justify-center min-w-[160px] min-h-[160px]"
                        >
                            <span 
                                className="font-['Press_Start_2P'] text-[60px] md:text-[80px]" 
                                style={{ color: genColor, textShadow: "4px 4px 0 #111111" }}
                            >
                                {roman}
                            </span>
                        </motion.div>

                        <motion.h2 
                            className="font-['Press_Start_2P'] text-center mt-6 text-[#111111] bg-white border-[6px] border-[#111111] px-4 py-2 shadow-[6px_6px_0_#111111] text-sm sm:text-base z-20"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={(phase === "exit-content" || phase === "exit-bg") ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.4 }}
                        >
                            CARGANDO ARCHIVOS
                        </motion.h2>
                    </div>
                </div>
            )}
        </AnimatePresence>
    );
}