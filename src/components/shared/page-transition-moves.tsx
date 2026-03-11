"use client"

import { motion, useReducedMotion } from "framer-motion"

export function PageTransitionMoves() {
    const prefersRM = useReducedMotion()

    if (prefersRM) {
        return (
            <motion.div
                className="fixed inset-0 bg-[#111111] z-[999] pointer-events-none"
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
            />
        )
    }

    // 5 "impact lines" at 72° intervals from center
    const rays = [0, 72, 144, 216, 288]

    return (
        <>
            {/* Black panel — scale from center */}
            <motion.div
                className="fixed inset-0 z-[999] pointer-events-none flex items-center justify-center"
                style={{ backgroundColor: "#111111", transformOrigin: "center" }}
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1, 1, 0] }}
                transition={{ duration: 0.7, times: [0, 0.3, 0.55, 1], ease: "easeInOut" }}
            >
                {/* 5 impact rays in pentagon */}
                <div className="relative flex items-center justify-center">
                    {rays.map((deg, i) => (
                        <motion.div
                            key={i}
                            className="absolute"
                            style={{
                                width: "2px",
                                height: "80px",
                                backgroundColor: "#CC0000",
                                transformOrigin: "bottom center",
                                rotate: deg,
                                bottom: 0,
                            }}
                            initial={{ scaleY: 0, opacity: 0 }}
                            animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
                            transition={{
                                duration: 0.35,
                                delay: 0.1 + i * 0.04,
                                ease: "easeOut"
                            }}
                        />
                    ))}
                </div>
            </motion.div>
        </>
    )
}
