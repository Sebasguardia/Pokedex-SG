"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function PageTransitionTeamBuilder() {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const t = setTimeout(() => setVisible(false), 1100);
        return () => clearTimeout(t);
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    className="fixed inset-0 z-[200] bg-[#111111] flex items-center justify-center overflow-hidden pointer-events-none"
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, delay: 0.65 }}
                >
                    {/* Dot grid */}
                    <div
                        className="absolute inset-0 opacity-[0.04]"
                        style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "28px 28px" }}
                    />

                    {/* 6 slots vacíos en grid 3×2 */}
                    <div className="relative grid grid-cols-3 gap-3 z-10">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <motion.div
                                key={i}
                                className="w-[60px] h-[76px] border-2 border-dashed flex items-center justify-center"
                                style={{ borderColor: "rgba(255,255,255,0.2)" }}
                                initial={{ scale: 0, opacity: 0, y: -20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 22,
                                    delay: i * 0.09,
                                }}
                            >
                                <span className="font-press-start text-[12px] text-white/20">{i + 1}</span>
                            </motion.div>
                        ))}

                        {/* Flash al final */}
                        <motion.div
                            className="absolute inset-0 border-2 border-[#CC0000]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 0.8, 0] }}
                            transition={{ duration: 0.4, delay: 0.65 }}
                        />
                    </div>

                    {/* Label */}
                    <motion.p
                        className="absolute bottom-[13%] font-press-start text-[10px] text-white/40 tracking-widest whitespace-nowrap"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.45 }}
                    >
                        CONSTRUCTOR DE EQUIPOS
                    </motion.p>

                    {/* Panel sube al exit */}
                    <motion.div
                        className="absolute inset-0 bg-[#111111] z-20"
                        exit={{ y: "-100%" }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}