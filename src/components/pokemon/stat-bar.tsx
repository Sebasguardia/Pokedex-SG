"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { getStatLabel, getStatShortLabel, getStatDisplayColor, getStatPercentage } from "@/lib/utils/stat.utils";

interface StatBarProps {
    statName: string;
    value: number;
    index?: number;
}

export function StatBar({ statName, value, index = 0 }: StatBarProps) {
    const color = getStatDisplayColor(value);
    const pct = getStatPercentage(value);
    const label = getStatShortLabel(statName);

    return (
        <div className="flex items-center gap-3">
            <span className="w-16 text-right text-xs text-muted-foreground font-mono">{label}</span>
            <span className="w-8 text-xs font-bold text-white text-right">{value}</span>
            <div className="flex-1 h-2.5 bg-poke-darker rounded-full overflow-hidden">
                <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
                />
            </div>
            <span className="w-8 text-xs text-muted-foreground">/{255}</span>
        </div>
    );
}
