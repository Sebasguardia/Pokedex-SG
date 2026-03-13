"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TABLE_STATS, STAT_COLORS, STAT_ABBR } from "@/lib/constants/natures.constants";

// ── TRANSICIÓN LISTA /natures ────────────────────────────────────────────────

export function PageTransitionNatures() {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const t = setTimeout(() => setVisible(false), 1050);
        return () => clearTimeout(t);
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    className="fixed inset-0 z-[200] bg-[#111111] pointer-events-none overflow-hidden"
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, delay: 0.65 }}
                >
                    {/* Dot grid */}
                    <div
                        className="absolute inset-0 opacity-[0.04]"
                        style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "28px 28px" }}
                    />

                    {/* 5 barras verticales de colores de stats */}
                    <div className="absolute inset-0 flex">
                        {TABLE_STATS.map((stat, i) => (
                            <div key={stat} className="flex-1 flex items-end justify-center pb-0">
                                <motion.div
                                    className="w-full"
                                    style={{ backgroundColor: STAT_COLORS[stat], opacity: 0.85 }}
                                    initial={{ scaleY: 0, originY: 1 }}
                                    animate={{ scaleY: 1 }}
                                    exit={{ scaleY: 0, originY: 0 }}
                                    transition={{ duration: 0.35, delay: i * 0.07, ease: "easeOut" }}
                                >
                                    <div className="h-[55vh] flex items-start justify-center pt-6">
                                        <motion.span
                                            className="font-press-start text-[11px] text-white/80 writing-mode-vertical"
                                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 + i * 0.07 }}
                                        >
                                            {STAT_ABBR[stat]}
                                        </motion.span>
                                    </div>
                                </motion.div>
                            </div>
                        ))}
                    </div>

                    {/* Label central */}
                    <motion.p
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-press-start text-[11px] text-white tracking-widest z-10 whitespace-nowrap"
                        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 0.8, y: 0 }} transition={{ delay: 0.4 }}
                    >
                        NATURALEZAS
                    </motion.p>

                    {/* Panel negro que sube al salir */}
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