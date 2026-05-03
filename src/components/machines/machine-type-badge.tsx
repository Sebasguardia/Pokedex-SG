"use client";

import { TYPE_COLORS, TYPE_NAMES_ES } from "@/lib/constants/machines/machines.constants";

interface MachineTypeBadgeProps {
  type: string;
  size?: "sm" | "md" | "lg";
}

const SIZE_CLASSES = {
  sm: "font-press-start text-[7px] px-2 py-1",
  md: "font-press-start text-[8px] px-2.5 py-1.5",
  lg: "font-press-start text-[10px] px-3 py-2",
};

export function MachineTypeBadge({ type, size = "md" }: MachineTypeBadgeProps) {
  const color   = TYPE_COLORS[type] ?? "#A8A878";
  const labelEs = TYPE_NAMES_ES[type] ?? type;

  return (
    <span
      className={`${SIZE_CLASSES[size]} text-white inline-block leading-none`}
      style={{ backgroundColor: color }}
    >
      {labelEs.toUpperCase()}
    </span>
  );
}