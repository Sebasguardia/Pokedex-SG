"use client"

import { motion } from "framer-motion"
import { getPowerColor, isPowerDevastating } from "@/lib/constants/moves/moves.constants"

interface Props {
    power: number | null
    showBar?: boolean
    index?: number
}

export function MovePowerDisplay({ power, showBar = true, index = 0 }: Props) {
    const color = getPowerColor(power)
    const devastating = isPowerDevastating(power)

    if (power === null) {
        return (
            <span className="font-jetbrains text-[13px] text-[#AAAAAA] font-bold">—</span>
        )
    }

    const barWidth = Math.min((power / 250) * 44, 44)

    return (
        <div className="flex flex-col items-center gap-0.5">
            {devastating ? (
                <span
                    className="font-jetbrains text-[13px] font-bold"
                    style={{
                        background: "linear-gradient(90deg, #CC0000, #7C3AED)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}
                >
                    {power}
                    <span className="text-[9px] text-[#7C3AED] ml-0.5" style={{ WebkitTextFillColor: "#7C3AED" }}>★</span>
                </span>
            ) : (
                <span className="font-jetbrains text-[13px] font-bold" style={{ color }}>
                    {power}
                </span>
            )}

            {showBar && (
                <motion.div
                    className="h-[2px]"
                    style={{ backgroundColor: color, width: 0 }}
                    whileInView={{ width: barWidth }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.002, duration: 0.4, ease: "easeOut" }}
                />
            )}
        </div>
    )
}
