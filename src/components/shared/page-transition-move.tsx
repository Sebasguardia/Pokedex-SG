"use client"

import { motion, useReducedMotion } from "framer-motion"
import { TYPE_ICON } from "@/lib/constants/types.constants"

interface Props {
    typeColor: string
    typeName: string
    moveClass: "physical" | "special" | "status"
}

export function PageTransitionMove({ typeColor, typeName, moveClass }: Props) {
    const prefersRM = useReducedMotion()
    const Icon = TYPE_ICON[typeName as keyof typeof TYPE_ICON]

    if (prefersRM) {
        return (
            <motion.div
                className="fixed inset-0 z-[999] pointer-events-none"
                style={{ backgroundColor: typeColor }}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
            />
        )
    }

    // Direction based on move class
    const slideProps =
        moveClass === "physical" ? { initial: { x: "0%", y: "0%" }, animate: { x: "100%", y: "0%" } } :
            moveClass === "special" ? { initial: { x: "0%", y: "0%" }, animate: { x: "0%", y: "-100%" } } :
                { initial: { opacity: 0.7, scale: 1 }, animate: { opacity: 0, scale: 1.03 } }

    return (
        <motion.div
            className="fixed inset-0 z-[999] pointer-events-none flex items-center justify-center"
            style={{ backgroundColor: typeColor }}
            {...slideProps}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
        >
            {/* Star burst impact icon */}
            {moveClass !== "status" && (
                <motion.div
                    className="absolute text-white"
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 2.5, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                >
                    {Icon && <Icon size={80} />}
                </motion.div>
            )}
            {Icon && (
                <motion.div
                    className="text-white/80"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.05, opacity: { delay: 0.4, duration: 0.2 } }}
                >
                    <Icon size={100} />
                </motion.div>
            )}
        </motion.div>
    )
}
