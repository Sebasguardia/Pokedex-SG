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
    const config = TYPE_CONSTANTS[typeKey] || TYPE_CONSTANTS.normal

    return (
        <div
            className={cn(
                "flex items-center justify-center rounded-full border border-[#111111] shadow-[1px_1px_0_#111111] overflow-hidden p-[2px]",
                className
            )}
            style={{
                backgroundColor: config.color,
                width: size + 6,
                height: size + 6
            }}
            title={type.toUpperCase()}
        >
            <div className="relative w-full h-full flex items-center justify-center">
                <Image
                    src={`/icons/${typeKey}.svg`}
                    alt={type}
                    width={size}
                    height={size}
                    style={{
                        filter: "brightness(0) invert(1)",
                        width: "80%",
                        height: "80%",
                        objectFit: "contain"
                    }}
                />
            </div>
        </div>
    )
}
