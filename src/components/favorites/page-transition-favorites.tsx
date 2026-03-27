"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface PageTransitionFavoritesProps {
    children: React.ReactNode;
}

export function PageTransitionFavorites({ children }: PageTransitionFavoritesProps) {
    const [phase, setPhase] = useState<"in" | "done">("in");

    useEffect(() => {
        const timer = setTimeout(() => setPhase("done"), 1400);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {children}
            <AnimatePresence>
                {phase === "in" && (
                    <motion.div
                        className="fixed inset-0 z-[9999] bg-[#111111] flex items-center justify-center"
                        initial={{ y: 0 }}
                        exit={{ y: "-100%" }}
                        transition={{ duration: 0.5, delay: 0.9, ease: [0.76, 0, 0.24, 1] }}
                    >
                        {/* Dot grid */}
                        <div
                            className="absolute inset-0 opacity-20"
                            style={{
                                backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
                                backgroundSize: "28px 28px",
                            }}
                        />

                        {/* Heart icon */}
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: [0, 1.2, 1, 1.15, 1], opacity: 1 }}
                            transition={{ duration: 0.8, times: [0, 0.3, 0.5, 0.7, 1], ease: "easeOut" }}
                        >
                            <svg width="80" height="80" viewBox="0 0 24 24" fill="#CC0000">
                                <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402
                                  0-3.791 3.068-5.191 5.281-5.191
                                  1.312 0 4.151.501 5.719 4.457
                                  1.59-3.968 4.464-4.447 5.726-4.447
                                  2.54 0 5.274 1.621 5.274 5.181
                                  0 4.069-5.136 8.625-11 14.402z"/>
                            </svg>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
