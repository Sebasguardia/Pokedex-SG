"use client"

import { DAMAGE_CLASS_COLORS, DAMAGE_CLASS_LABELS } from "@/lib/constants/moves.constants"
import { GiPunchBlast, GiStarShuriken } from "react-icons/gi"
import { Circle } from "lucide-react"

interface Props {
    damageClass: string
    size?: "sm" | "md" | "lg"
    className?: string
}

export function MoveClassBadge({ damageClass, size = "md", className = "" }: Props) {
    const colors = DAMAGE_CLASS_COLORS[damageClass as keyof typeof DAMAGE_CLASS_COLORS] ?? DAMAGE_CLASS_COLORS.status
    const label = DAMAGE_CLASS_LABELS[damageClass] ?? damageClass

    const Icon =
        damageClass === "physical" ? GiPunchBlast :
            damageClass === "special" ? GiStarShuriken :
                Circle

    const sizeClasses =
        size === "sm" ? "px-2 py-0.5 text-[9px] gap-1" :
            size === "lg" ? "px-4 py-2 text-[13px] gap-2" :
                "px-2.5 py-1 text-[10px] gap-1.5"

    const iconSize = size === "sm" ? 10 : size === "lg" ? 16 : 12

    return (
        <span
            className={`inline-flex items-center font-nunito font-bold uppercase ${sizeClasses} ${className}`}
            style={{
                backgroundColor: colors.bg,
                color: colors.text,
                border: `1.5px solid transparent`,
            }}
        >
            <Icon size={iconSize} />
            {label}
        </span>
    )
}
