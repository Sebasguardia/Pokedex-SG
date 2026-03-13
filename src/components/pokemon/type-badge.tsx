"use client";

import { cn } from "@/lib/utils/cn";
import { getTypeColor, getTypeLabel } from "@/lib/utils/type.utils";

interface TypeBadgeProps {
    type?: string;
    typeName?: string;
    className?: string;
    size?: "sm" | "md" | "lg";
}

export function TypeBadge({ type, typeName, className, size = "md" }: TypeBadgeProps) {
    const finalTypeName = type || typeName || "normal";
    const color = getTypeColor(finalTypeName);
    const label = getTypeLabel(finalTypeName);

    const sizeClasses = {
        sm: "px-2 py-0.5 text-[9px]",
        md: "px-3 py-1 text-xs",
        lg: "px-4 py-1.5 text-sm font-bold uppercase font-press-start text-[10px]",
    };

    return (
        <span
            className={cn(
                "inline-flex items-center justify-center border-2 border-[#111111] shadow-[2px_2px_0_#111111] text-white",
                sizeClasses[size],
                className
            )}
            style={{ backgroundColor: color }}
        >
            {label}
        </span>
    );
}
