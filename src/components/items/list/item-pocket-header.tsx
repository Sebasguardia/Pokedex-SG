"use client"

import { motion } from "framer-motion"
import NumberFlow from "@number-flow/react"
import { POCKET_META } from "@/lib/constants/items/items.constants"
import { cn } from "@/lib/utils/cn"

interface Props {
    pocket: string
    count: number
}

export function ItemPocketHeader({ pocket, count }: Props) {
    const config = POCKET_META[pocket] || POCKET_META.misc

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-8 mb-6"
        >
            <div className="flex items-center gap-4">
                {/* Pocket Icon Large */}
                <div
                    className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center border-2 border-[#111111] shadow-[3px_3px_0_#111111]"
                    style={{ backgroundColor: config.fondo }}
                >
                    <config.icon className="w-6 h-6 sm:w-7 sm:h-7" style={{ color: config.acento }} />
                </div>

                <div>
                    <h1 className="font-press-start text-sm sm:text-lg text-[#111111] uppercase tracking-tight">
                        {config.label}
                    </h1>
                    <p className="font-nunito text-[13px] text-[#888888] leading-tight">
                        {config.shortDesc}
                    </p>
                </div>
            </div>

            {/* Count Badge */}
            <motion.div
                key={count}
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.15, 1] }}
                className="self-start sm:self-center flex items-center gap-2 border-2 border-[#111111] px-3 py-1.5 shadow-[3px_3px_0_#111111]"
                style={{ backgroundColor: config.acento }}
            >
                <span className="font-press-start text-[7px] text-white">OBJETOS:</span>
                <div className="font-press-start text-[8px] text-white">
                    <NumberFlow value={count} />
                </div>
            </motion.div>
        </motion.div>
    )
}
