"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export function PageCurtain() {
    const prefersReduced = useReducedMotion();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (prefersReduced || !mounted) return null;

    return (
        <motion.div
            initial={{ y: 0 }}
            animate={{ y: "-100vh" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            onAnimationComplete={() => {
                // We could theoretically unmount it here or let React keep it visually hidden
            }}
            className="fixed inset-0 bg-[#111111] z-[999] pointer-events-none flex items-center justify-center"
        >
            {/* Optional: could put a static logo here during the 0.1s delay before it slides up */}
        </motion.div>
    );
}
