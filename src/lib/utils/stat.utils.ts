import { STAT_CONSTANTS, getStatColor } from "@/lib/constants/pokemon/stats.constants";

export function getStatLabel(statName: string): string {
    return STAT_CONSTANTS[statName]?.label ?? statName;
}

export function getStatShortLabel(statName: string): string {
    return STAT_CONSTANTS[statName]?.shortLabel ?? statName;
}

export function getStatDisplayColor(value: number): string {
    return getStatColor(value);
}

export function getStatPercentage(value: number, max = 255): number {
    return Math.min((value / max) * 100, 100);
}
