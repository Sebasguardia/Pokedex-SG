"use client"

import { motion, useReducedMotion } from "framer-motion"
import { TypeSvgIcon } from "./type-svg-icon"

interface Props {
    typeColor: string;
    typeName: string;
}

export function PageTransitionType({ typeColor, typeName }: Props) {
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
        <motion.div
            className="fixed inset-0 z-[999] pointer-events-none flex items-center justify-center"
            style={{ backgroundColor: typeColor }}
            initial={{ x: "0%" }}
            animate={{ x: "100%" }}
            transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.5
            }}
        >
            <motion.div
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: [0, 1.2, 1], opacity: [1, 1, 0] }}
                transition={{
                    duration: 0.6,
                    times: [0, 0.5, 1],
                    delay: 0.1
                }}
            >
                <TypeSvgIcon
                    type={typeName}
                    size={120}
                    className="opacity-90"
                    style={{ filter: "brightness(0) invert(1)" }}
                />
            </motion.div>
        </motion.div>
    )
}
