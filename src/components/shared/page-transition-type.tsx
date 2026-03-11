"use client"

import { motion, useReducedMotion } from "framer-motion"
import { TYPE_ICON } from "@/lib/constants/types.constants"

interface Props {
    typeColor: string;
    typeName: string;
}

export function PageTransitionType({ typeColor, typeName }: Props) {
    const prefersRM = useReducedMotion()
    const Icon = TYPE_ICON[typeName as keyof typeof TYPE_ICON]

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
            {Icon && (
                <motion.div
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: [0, 1.2, 1], opacity: [1, 1, 0] }}
                    transition={{
                        duration: 0.6,
                        times: [0, 0.5, 1],
                        delay: 0.1
                    }}
                >
                    <Icon size={100} className="text-white opacity-90" />
                </motion.div>
            )}
        </motion.div>
    )
}
