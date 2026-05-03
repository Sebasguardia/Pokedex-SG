"use client"

import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { useEffect, useState } from "react"
import Image from "next/image"

interface Props {
    spriteSrc?: string | null
    pocketAccent: string
}

export function PageTransitionItem({ spriteSrc, pocketAccent }: Props) {
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
                        className="fixed inset-0 z-[100]"
                        style={{ backgroundColor: `${pocketAccent}10` }} // Very faint tint
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    />
                )}
            </AnimatePresence>
        )
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                >
                    <div className="relative flex items-center justify-center">
                        {/* Circular Shockwave */}
                        <motion.div
                            className="absolute rounded-full border-4"
                            style={{ borderColor: pocketAccent }}
                            initial={{ width: 0, height: 0, opacity: 0.8 }}
                            animate={{ width: 600, height: 600, opacity: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        />

                        {/* Sprite Expand & Blur */}
                        {spriteSrc && (
                            <motion.div
                                initial={{ scale: 0, opacity: 0, filter: "blur(0px)" }}
                                animate={{
                                    scale: [0, 1.5, 0],
                                    opacity: [0, 1, 0],
                                    filter: ["blur(0px)", "blur(0px)", "blur(8px)"]
                                }}
                                transition={{
                                    duration: 0.5,
                                    times: [0, 0.4, 1],
                                    ease: "easeInOut"
                                }}
                            >
                                <Image
                                    src={spriteSrc}
                                    alt="Item Transition"
                                    width={96}
                                    height={96}
                                    style={{ imageRendering: "pixelated" }}
                                />
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
