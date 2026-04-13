"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers } from "lucide-react";
import { GENERATION_ORDER, GENERATION_COLORS, GENERATION_ROMAN } from "@/lib/constants/generations.constants";

export function PageTransitionGenerations() {
    const [phase, setPhase] = useState<"loading" | "exit-content" | "exit-bg" | "done">("loading");

    useEffect(() => {
        // Step 1: Hide inner text
        const t1 = setTimeout(() => setPhase("exit-content"), 1200);
        // Step 2: Open timeline bars
        const t2 = setTimeout(() => setPhase("exit-bg"), 1600);
        // Step 3: Done
        const t3 = setTimeout(() => setPhase("done"), 3200);
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }, []);

    return (
        <AnimatePresence>
            {phase !== "done" && (
                <div className="fixed inset-0 z-[200] pointer-events-none flex overflow-hidden bg-[#111111]">
                    
                    {/* 9 Franjas de colores por generación */}
                    {GENERATION_ORDER.map((name, i) => (
                        <motion.div 
                            key={name}
                            className="flex-1 h-full relative overflow-hidden flex items-end pb-8 justify-center border-r-[2px] border-black/50"
                            style={{ 
                                backgroundColor: GENERATION_COLORS[name] || "#CC0000",
                            }}
                            initial={{ y: "0%" }}
                            animate={(phase === "exit-bg") ? { y: i % 2 === 0 ? "100%" : "-100%" } : { y: "0%" }}
                            transition={{ 
                                duration: 0.85, 
                                delay: phase === "exit-bg" ? i * 0.06 : 0, 
                                ease: [0.76, 0, 0.24, 1] 
                            }}
                        >
                            {/* Número Romano grande como marca de agua */}
                            <div 
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-['Press_Start_2P'] text-[40px] md:text-[80px] text-white opacity-20 pointer-events-none select-none"
                            >
                                {GENERATION_ROMAN[name]}
                            </div>

                            {/* Textito inferior */}
                            <div className="font-['JetBrains_Mono'] text-[10px] sm:text-[14px] text-white font-bold opacity-80" style={{ writingMode: "vertical-rl" }}>
                                GEN {GENERATION_ROMAN[name]}
                            </div>
                        </motion.div>
                    ))}

                    {/* Filtro oscuro para que el texto central destaque contundentemente */}
                    <motion.div 
                        className="absolute inset-0 bg-[#111111]/85"
                        initial={{ opacity: 1 }}
                        animate={(phase === "exit-bg") ? { opacity: 0 } : { opacity: 1 }}
                        transition={{ duration: 0.4 }}
                    />

                    {/* Centered Overlay */}
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
                        
                        {/* Dossier Icon */}
                        <motion.div 
                            initial={{ scale: 0, rotate: 180 }}
                            animate={(phase === "exit-content" || phase === "exit-bg") ? { scale: 0, opacity: 0 } : { scale: 1, rotate: 0, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.4 }}
                            className="bg-white p-6 border-[8px] border-[#111111] shadow-[12px_12px_0_#111111] z-20 transform -translate-y-4"
                        >
                            <Layers size={70} className="text-[#111111]" strokeWidth={3} />
                        </motion.div>

                        {/* Text Label */}
                        <motion.h2 
                            className="font-['Press_Start_2P'] text-center mt-6 text-white bg-[#111111] border-[6px] border-[#111111] px-4 md:px-6 py-4 shadow-[8px_8px_0_#CC0000] text-[12px] md:text-[18px] z-20 uppercase"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={(phase === "exit-content" || phase === "exit-bg") ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.6 }}
                        >
                            Archivos Generacionales
                        </motion.h2>
                    </div>
                </div>
            )}
        </AnimatePresence>
    );
}