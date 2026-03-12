"use client";

import { cn } from "@/lib/utils/cn";
import { getTypeColor, getTypeLabel } from "@/lib/utils/type.utils";

interface TypeBadgeProps {
    typeName: string;
    className?: string;
    size?: "sm" | "md";
}

export function TypeBadge({ typeName, className, size = "md" }: TypeBadgeProps) {
    const color = getTypeColor(typeName);
    const label = getTypeLabel(typeName);

    return (
        <span
            className={cn(
                "inline-flex items-center justify-center rounded-full font-semibold uppercase tracking-wider text-white",
                size === "sm" ? "px-2 py-0.5 text-[9px]" : "px-3 py-1 text-xs",
                className
            )}
            style={{ backgroundColor: color }}
        >
            {label}
        </span>
    );
}
