"use client";

import { TYPE_COLORS, TYPE_NAMES_ES } from "@/lib/constants/team-builder.constants";

interface TypeBadgeTeamProps {
    type: string;
    variant?: "solid" | "soft" | "outline";
    size?: "xs" | "sm" | "md";
}

const SIZE_CLASS = {
    xs: "text-[9px] px-2 py-1",
    sm: "text-[11px] px-2.5 py-1.5",
    md: "text-[13px] px-3 py-2",
};

export function TypeBadgeTeam({ type, variant = "solid", size = "sm" }: TypeBadgeTeamProps) {
    const color = TYPE_COLORS[type] ?? "#888888";
    const label = (TYPE_NAMES_ES[type] ?? type).toUpperCase();
    const sizeClass = SIZE_CLASS[size];

    if (variant === "solid") {
        return (
            <span
                className={`font-press-start ${sizeClass} text-white inline-flex items-center gap-1.5`}
                style={{ backgroundColor: color }}
            >
                <img src={`/icons/${type}.svg`} alt="" width={size === "xs" ? 10 : 12} height={size === "xs" ? 10 : 12} className="filter brightness-0 invert object-contain shrink-0" />
                <span className="truncate">{label}</span>
            </span>
        );
    }

    if (variant === "soft") {
        return (
            <span
                className={`font-press-start ${sizeClass} inline-flex items-center gap-1.5 border`}
                style={{
                    color,
                    borderColor: color,
                    backgroundColor: `${color}18`,
                }}
            >
                <div 
                    className="flex items-center justify-center rounded-full shrink-0" 
                    style={{ backgroundColor: color, width: size === "xs" ? 14 : 16, height: size === "xs" ? 14 : 16 }}
                >
                    <img src={`/icons/${type}.svg`} alt="" width={size === "xs" ? 9 : 10} height={size === "xs" ? 9 : 10} className="filter brightness-0 invert object-contain" />
                </div>
                <span className="truncate">{label}</span>
            </span>
        );
    }

    // outline
    return (
        <span
            className={`font-press-start ${sizeClass} inline-flex items-center gap-1.5 border`}
            style={{ color, borderColor: color }}
        >
            <div 
                className="flex items-center justify-center rounded-full shrink-0" 
                style={{ backgroundColor: color, width: size === "xs" ? 14 : 16, height: size === "xs" ? 14 : 16 }}
            >
                <img src={`/icons/${type}.svg`} alt="" width={size === "xs" ? 9 : 10} height={size === "xs" ? 9 : 10} className="filter brightness-0 invert object-contain" />
            </div>
            <span className="truncate">{label}</span>
        </span>
    );
}

// ── EffectivenessBadge ────────────────────────────────────────────────────────

interface EffectivenessBadgeProps {
    multiplier: number;
}

export function EffectivenessBadge({ multiplier }: EffectivenessBadgeProps) {
    let bg = "#F9FAFB";
    let text = "#9CA3AF";
    let label = "×1";

    if (multiplier >= 4) { bg = "#FEE2E2"; text = "#DC2626"; label = "×4"; }
    else if (multiplier >= 2) { bg = "#FEF3C7"; text = "#D97706"; label = "×2"; }
    else if (multiplier === 0) { bg = "#DBEAFE"; text = "#2563EB"; label = "×0"; }
    else if (multiplier <= 0.25) { bg = "#BBF7D0"; text = "#15803D"; label = "×¼"; }
    else if (multiplier <= 0.5) { bg = "#DCFCE7"; text = "#16A34A"; label = "×½"; }

    return (
        <span
            className="font-press-start text-[10px] px-1.5 py-0.5 inline-block"
            style={{ backgroundColor: bg, color: text }}
        >
            {label}
        </span>
    );
}