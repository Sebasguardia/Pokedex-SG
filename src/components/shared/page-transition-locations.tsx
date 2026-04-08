"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass } from "lucide-react";

export function PageTransitionLocations() {
    const [phase, setPhase] = useState<"loading" | "exit-content" | "exit-bg" | "done">("loading");

    useEffect(() => {
        // Step 1: Hide the inner text and compass
        const t1 = setTimeout(() => setPhase("exit-content"), 1400);
        // Step 2: Open the yellow columns after the text is gone
        const t2 = setTimeout(() => setPhase("exit-bg"), 1700);
        // Step 3: Unmount everything
        const t3 = setTimeout(() => setPhase("done"), 2400);
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }, []);

    const columns = [0, 1, 2, 3, 4];

    return (
        <AnimatePresence>
            {phase !== "done" && (
                <div className="fixed inset-0 z-[200] pointer-events-none flex overflow-hidden">
                    
                    {/* 5 Map Pillars sliding down */}
                    {columns.map((i) => (
                        <motion.div 
                            key={i}
                            className="flex-1 h-full bg-[#ffdd00] border-r-8 border-[#111111] relative overflow-hidden"
                            initial={{ y: "-100%" }}
                            animate={(phase === "exit-bg" || phase === "exit-content") ? (phase === "exit-bg" ? { y: "100%" } : { y: "0%" }) : { y: "0%" }}
                            transition={{ 
                                duration: 0.6, 
                                delay: (phase === "exit-content" || phase === "exit-bg") ? i * 0.1 : i * 0.1, 
                                ease: [0.82, 0, 0.36, 1] 
                            }}
                        >
                            {/* Topological mini-grid inside the column, scaled to absolute screen width so it seamlessly matches with other columns */}
                            <div 
                                className="absolute top-0 bottom-0 opacity-20"
                                style={{ 
                                    left: `-${i * 20}vw`, 
                                    width: "100vw",
                                    backgroundImage: "radial-gradient(#111111 4px, transparent 4px)", 
                                    backgroundSize: "48px 48px" 
                                }}
                            />
                        </motion.div>
                    ))}

                    {/* Centered Overlay */}
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
                        
                        {/* Giant Compass */}
                        <motion.div 
                            initial={{ scale: 0, rotate: -180 }}
                            animate={(phase === "exit-content" || phase === "exit-bg") ? { scale: 0, opacity: 0 } : { scale: 1, rotate: 0, opacity: 1 }}
                            transition={{ 
                                type: "spring", 
                                stiffness: 200, 
                                damping: 20, 
                                delay: (phase === "exit-content" || phase === "exit-bg") ? 0 : 0.6 
                            }}
                            className="bg-white p-6 rounded-full border-[12px] border-[#111111] shadow-[12px_12px_0_#111111] z-20"
                        >
                            <Compass size={80} className="text-[#111111] sm:w-[100px] sm:h-[100px]" strokeWidth={2.5} />
                        </motion.div>

                        {/* Text Label */}
                        <motion.h2 
                            className="font-['Press_Start_2P'] text-center mt-8 text-[#111111] bg-white border-8 border-[#111111] p-4 shadow-[8px_8px_0_#111111] text-lg sm:text-xl z-20"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={(phase === "exit-content" || phase === "exit-bg") ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.8 }}
                        >
                            MAPAMUNDI
                        </motion.h2>
                    </div>
                </div>
            )}
        </AnimatePresence>
    );
}