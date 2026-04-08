"use client"

import Image from "next/image"
import { cn } from "@/lib/utils/cn"
import { TYPE_CONSTANTS } from "@/lib/constants/types.constants"

interface TypeIconProps {
    type: string;
    size?: number;
    className?: string;
}

export function TypeIcon({ type, size = 18, className }: TypeIconProps) {
    const typeKey = type.toLowerCase()

    // Pre-mapped sizes → Tailwind classes (avoids inline style for size)
    const sizeMap: Record<number, string> = {
        10: "w-[16px] h-[16px]", 12: "w-[18px] h-[18px]",
        14: "w-[20px] h-[20px]", 16: "w-[22px] h-[22px]",
        18: "w-[24px] h-[24px]", 20: "w-[26px] h-[26px]",
        22: "w-[28px] h-[28px]", 24: "w-[30px] h-[30px]",
        28: "w-[34px] h-[34px]", 32: "w-[38px] h-[38px]",
    }
    const sizeClass = sizeMap[size] ?? "w-[24px] h-[24px]"

    return (
        <div
            data-type={typeKey}
            className={cn(
                "flex items-center justify-center rounded-full border border-[#111111] shadow-[1px_1px_0_#111111] overflow-hidden p-[2px] bg-[color:var(--type-color)]",
                sizeClass,
                className
            )}
            aria-label={`Tipo ${type.toUpperCase()}`}
            role="img"
        >
            <div className="relative w-full h-full flex items-center justify-center">
                <Image
                    src={`/icons/${typeKey}.svg`}
                    alt=""
                    width={size}
                    height={size}
                    className="w-[80%] h-[80%] object-contain brightness-0 invert"
                    aria-hidden="true"
                />
            </div>
        </div>
    )
}
