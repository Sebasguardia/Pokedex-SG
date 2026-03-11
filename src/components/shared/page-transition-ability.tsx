"use client"

import { motion, useReducedMotion } from "framer-motion"

export function PageTransitionAbility() {
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

    const rays = Array.from({ length: 8 }).map((_, i) => ({
        id: i,
        angle: i * 45
    }))

    return (
        <motion.div className="fixed inset-0 z-[999] pointer-events-none flex items-center justify-center overflow-hidden">
            {/* Dark Expanding Panel */}
            <motion.div
                className="absolute bg-[#111111] w-[100px] h-[100px]"
                initial={{ scale: 0, borderRadius: "50%" }}
                animate={["expand", "retract"]}
                variants={{
                    expand: {
                        scale: 25,
                        borderRadius: "0%",
                        transition: { duration: 0.3, ease: [0.76, 0, 0.24, 1] }
                    },
                    retract: {
                        scale: 0,
                        borderRadius: "50%",
                        transition: { delay: 0.45, duration: 0.35, ease: [0.76, 0, 0.24, 1] }
                    }
                }}
            />

            {/* Radial Rays */}
            {rays.map((ray) => (
                <motion.div
                    key={ray.id}
                    className="absolute h-[2px] bg-[#CC0000] origin-left"
                    style={{
                        rotate: `${ray.angle}deg`,
                        width: "60px",
                        left: "50%",
                        top: "50%"
                    }}
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: [0, 1.5, 0], opacity: [0, 0.8, 0], x: [0, 20, 40] }}
                    transition={{
                        duration: 0.25,
                        delay: 0.1 + ray.id * 0.02,
                        times: [0, 0.5, 1]
                    }}
                />
            ))}
        </motion.div>
    )
}
