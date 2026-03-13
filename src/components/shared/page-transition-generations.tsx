"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GENERATION_ORDER, GENERATION_COLORS } from "@/lib/constants/generations.constants";

export function PageTransitionGenerations() {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const t = setTimeout(() => setVisible(false), 900);
        return () => clearTimeout(t);
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    className="fixed inset-0 z-[200] bg-[#111111] flex flex-col items-center justify-center pointer-events-none"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, delay: 0.55 }}
                >
                    {/* 9 círculos de colores */}
                    <div className="flex gap-3 mb-6">
                        {GENERATION_ORDER.map((name, i) => (
                            <motion.div
                                key={name}
                                className="rounded-full"
                                style={{ backgroundColor: GENERATION_COLORS[name], width: 14, height: 14 }}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: [0, 1.3, 1], opacity: [0, 1, 1] }}
                                exit={{ 
                                    scale: 0, 
                                    opacity: 0, 
                                    transition: { duration: 0.2, delay: (8 - i) * 0.03 } 
                                }}
                                transition={{
                                    scale: { duration: 0.35, delay: i * 0.05, ease: "backOut" },
                                    opacity: { duration: 0.2, delay: i * 0.05 },
                                }}
                            />
                        ))}
                    </div>

                    {/* Label */}
                    <motion.p
                        className="font-press-start text-[10px] text-white opacity-60 tracking-widest"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 0.6, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        GENERACIONES
                    </motion.p>

                    {/* Panel negro slide-up al salir */}
                    <motion.div
                        className="absolute inset-0 bg-[#111111]"
                        exit={{ y: "-100%" }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}