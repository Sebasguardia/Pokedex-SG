"use client"

import { motion, AnimatePresence } from "framer-motion"
import { COMPARE_COLORS } from "@/lib/constants/compare.constants"

export function PageTransitionCompare() {
    const rects = COMPARE_COLORS.map((color, i) => ({ color, delay: i * 0.09 }))

    return (
        <motion.div
            className="fixed inset-0 z-[999] pointer-events-none overflow-hidden flex items-center justify-center bg-[#111111]"
            initial={{ y: "0%" }}
            animate={{ y: "-100%" }}
            transition={{ delay: 0.75, duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
        >
            <div className="flex gap-3 items-center">
                {rects.map((r, i) => (
                    <motion.div
                        key={i}
                        className="w-[60px] h-[76px] border-2 border-dashed"
                        style={{ borderColor: r.color }}
                        initial={{ scale: 0, y: -20 }}
                        animate={{ scale: 1, y: 0 }}
                        transition={{ delay: r.delay, type: "spring", stiffness: 400, damping: 20 }}
                    />
                ))}
            </div>
            <motion.p
                className="absolute font-press-start text-[12px] text-white tracking-widest"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.2 }}
            >
                COMPARADOR
            </motion.p>
        </motion.div>
    )
}
