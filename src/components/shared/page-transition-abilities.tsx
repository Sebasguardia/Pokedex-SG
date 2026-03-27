"use client"

import { motion, useReducedMotion } from "framer-motion"

export function PageTransitionAbilities() {
    const prefersRM = useReducedMotion()

    if (prefersRM) {
        return (
            <motion.div
                className="fixed inset-0 bg-[#111111] z-[999] pointer-events-none"
                initial={{ opacity: 0.2 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
            />
        )
    }

    const sparkles = [
        { id: 0, top: "25%", left: "15%", delay: 0 },
        { id: 1, top: "70%", left: "80%", delay: 0.04 },
        { id: 2, top: "40%", left: "60%", delay: 0.08 },
        { id: 3, top: "85%", left: "30%", delay: 0.12 },
        { id: 4, top: "15%", left: "75%", delay: 0.16 },
        { id: 5, top: "60%", left: "20%", delay: 0.20 }
    ]

    return (
        <motion.div
            className="fixed inset-0 z-[999] pointer-events-none overflow-hidden"
            initial={{ y: "100%" }}
            animate={["slideUp", "slideOut"]}
            variants={{
                slideUp: {
                    y: "0%",
                    transition: { duration: 0.3, ease: [0.76, 0, 0.24, 1] }
                },
                slideOut: {
                    y: "-100%",
                    transition: { delay: 0.35, duration: 0.3, ease: [0.76, 0, 0.24, 1] }
                }
            }}
        >
            <div className="absolute inset-0 bg-[#111111]">
                {sparkles.map((s) => (
                    <motion.div
                        key={s.id}
                        className="absolute w-1 h-1 bg-white rounded-full shadow-[0_0_8px_white]"
                        style={{ top: s.top, left: s.left }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: [0, 1, 0], opacity: [0, 0.6, 0] }}
                        transition={{
                            duration: 0.3,
                            delay: s.delay,
                            repeat: 0
                        }}
                    />
                ))}
            </div>
        </motion.div>
    )
}
