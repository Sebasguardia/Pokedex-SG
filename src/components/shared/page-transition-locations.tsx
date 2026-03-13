"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { REGION_ORDER, REGION_COLORS, REGION_MAP_POSITIONS } from "@/lib/constants/locations.constants";

export function PageTransitionLocations() {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const t = setTimeout(() => setVisible(false), 1000);
        return () => clearTimeout(t);
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    className="fixed inset-0 z-[200] bg-[#111111] pointer-events-none overflow-hidden"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, delay: 0.6 }}
                >
                    {/* Puntos en disposición de mapa */}
                    {REGION_ORDER.map((name, i) => {
                        const pos = REGION_MAP_POSITIONS[name];
                        const color = REGION_COLORS[name];
                        return (
                            <motion.div
                                key={name}
                                className="absolute rounded-full"
                                style={{
                                    left: `${pos.x}%`,
                                    top: `${pos.y}%`,
                                    width: 16,
                                    height: 16,
                                    backgroundColor: color,
                                    translateX: "-50%",
                                    translateY: "-50%",
                                }}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: [0, 1.4, 1], opacity: 1 }}
                                exit={{ scale: 0, opacity: 0, transition: { duration: 0.2, delay: (8 - i) * 0.03 } }}
                                transition={{ duration: 0.35, delay: i * 0.07, ease: "backOut" }}
                            />
                        );
                    })}

                    {/* Líneas de conexión entre puntos adyacentes (SVG) */}
                    <motion.svg
                        className="absolute inset-0 w-full h-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.25 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: 0.5, duration: 0.2 }}
                    >
                        {REGION_ORDER.slice(0, -1).map((name, i) => {
                            const from = REGION_MAP_POSITIONS[name];
                            const to = REGION_MAP_POSITIONS[REGION_ORDER[i + 1]];
                            return (
                                <line
                                    key={name}
                                    x1={`${from.x}%`} y1={`${from.y}%`}
                                    x2={`${to.x}%`} y2={`${to.y}%`}
                                    stroke="#ffffff" strokeWidth="1" strokeDasharray="4 4"
                                />
                            );
                        })}
                    </motion.svg>

                    {/* Label */}
                    <motion.p
                        className="absolute bottom-[12%] left-1/2 -translate-x-1/2 font-press-start text-[10px] text-white opacity-50 tracking-widest whitespace-nowrap"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 0.5, y: 0 }}
                        transition={{ delay: 0.45 }}
                    >
                        LOCACIONES
                    </motion.p>

                    {/* Panel negro que sube al exit */}
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