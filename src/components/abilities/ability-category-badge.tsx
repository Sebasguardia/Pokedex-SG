"use client"

import { ABILITY_CATEGORIES } from "@/lib/constants/abilities/abilities.constants"
import { cn } from "@/lib/utils/cn"
import { motion } from "framer-motion"

interface Props {
    category: keyof typeof ABILITY_CATEGORIES
    size?: "sm" | "md" | "lg"
    variant?: "light" | "dark"
    className?: string
}

export function AbilityCategoryBadge({ category, size = "md", variant = "light", className }: Props) {
    const config = ABILITY_CATEGORIES[category] || ABILITY_CATEGORIES.passive
    const Icon = config.icon

    const sizes = {
        sm: "px-1.5 py-0.5 text-[9px] gap-1",
        md: "px-3 py-1 text-[10px] gap-1.5",
        lg: "px-4 py-1.5 text-[12px] gap-2"
    }

    const styles = variant === "light"
        ? { backgroundColor: config.bg, color: config.color, borderColor: "transparent" }
        : {
            backgroundColor: config.darkBg,
            color: config.darkText,
            borderColor: config.color,
            borderWidth: "1px",
            borderStyle: "solid"
        }

    return (
        <motion.div
            className={cn(
                "inline-flex items-center font-nunito font-bold rounded-sm uppercase tracking-wider",
                sizes[size],
                className
            )}
            style={styles}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            <Icon size={size === "sm" ? 10 : size === "md" ? 12 : 14} />
            <span>{config.label}</span>
        </motion.div>
    )
}
