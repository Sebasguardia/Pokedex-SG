"use client"

import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { useEffect, useState } from "react"

export function PageTransitionItems() {
    const [isVisible, setIsVisible] = useState(true)
    const prefersRM = useReducedMotion()

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(false), 800)
        return () => clearTimeout(timer)
    }, [])

    if (prefersRM) {
        return (
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        className="fixed inset-0 z-[100] bg-[#111111]"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    />
                )}
            </AnimatePresence>
        )
    }

    const items = [
        { color: "#EF4444", delay: 0, x: -15, y: -60 },
        { color: "#CA8A04", delay: 0.05, x: 10, y: -80 },
        { color: "#16A34A", delay: 0.1, x: -25, y: -50 },
        { color: "#2563EB", delay: 0.15, x: 20, y: -70 },
        { color: "#7C3AED", delay: 0.2, x: 0, y: -90 },
    ]

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-[#111111] overflow-hidden"
                    initial={{ opacity: 1 }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1], delay: 0.4 }}
                >
                    <div className="relative">
                        {/* Flying Items */}
                        {items.map((item, i) => (
                            <motion.div
                                key={i}
                                className="absolute left-1/2 top-1/2 w-3 h-3 rounded-sm"
                                style={{ backgroundColor: item.color, marginLeft: -6, marginTop: -6 }}
                                initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                                animate={{
                                    scale: [0, 1, 0.5],
                                    opacity: [0, 1, 0],
                                    x: item.x,
                                    y: item.y
                                }}
                                transition={{
                                    duration: 0.5,
                                    delay: 0.2 + item.delay,
                                    ease: "easeOut"
                                }}
                            />
                        ))}

                        {/* Backpack SVG */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="relative"
                        >
                            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 8V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8" stroke="white" strokeWidth="2" strokeLinecap="round" />
                                <motion.path
                                    d="M4 8L12 3L20 8H4Z"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinejoin="round"
                                    initial={{ rotateX: 0 }}
                                    animate={{ rotateX: -70 }}
                                    transition={{ duration: 0.3, delay: 0.2 }}
                                    style={{ transformOrigin: "top" }}
                                />
                                <rect x="9" y="13" width="6" height="4" rx="1" stroke="white" strokeWidth="2" />
                            </svg>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
