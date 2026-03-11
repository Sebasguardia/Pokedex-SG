"use client"

import { motion, useReducedMotion } from "framer-motion"
import { useEffect, useState } from "react"

export function PageTransition() {
    const prefersRM = useReducedMotion()
    const [isTransitioning, setIsTransitioning] = useState(true)

    useEffect(() => {
        setIsTransitioning(true)
    }, [])

    if (prefersRM) return null
    if (!isTransitioning) return null

    return (
        <motion.div
            className="fixed inset-0 pointer-events-none z-[999]"
            initial={{ top: "-2px" }}
            animate={{ top: "100vh" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onAnimationComplete={() => setIsTransitioning(false)}
        >
            <div className="w-full h-[2px] bg-[#CC0000]" />
        </motion.div>
    )
}
