"use client"

import { motion, useReducedMotion } from "framer-motion"
import { TYPE_ORDER, TYPE_COLORS } from "@/lib/constants/types.constants"

export function PageTransitionTypes() {
    const prefersRM = useReducedMotion()

    if (prefersRM) {
        return (
            <motion.div
                className="fixed inset-0 bg-[#111111] z-[999] pointer-events-none"
                initial={{ opacity: 0.3 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
            />
        )
    }

    return (
        <div className="fixed inset-0 z-[999] pointer-events-none flex">
            {TYPE_ORDER.map((typeName, i) => (
                <motion.div
                    key={typeName}
                    className="h-full flex-1"
                    style={{ backgroundColor: TYPE_COLORS[typeName], transformOrigin: "top" }}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: [0, 1, 1, 0] }}
                    transition={{
                        duration: 0.8,
                        times: [0, 0.4, 0.6, 1],
                        ease: "easeInOut",
                        delay: i * 0.025
                    }}
                />
            ))}
        </div>
    )
}
