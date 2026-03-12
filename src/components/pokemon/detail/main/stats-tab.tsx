"use client";

import { StatBar } from "@/components/pokemon/shared/stat-bar";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from "recharts";
import { PokemonStat } from "@/types/api/pokemon.types";
import { getStatLabel } from "@/lib/utils/stat.utils";

interface StatsTabProps {
    stats: PokemonStat[];
}

export function StatsTab({ stats }: StatsTabProps) {
    const radarData = stats.map((s) => ({
        stat: getStatLabel(s.stat.name),
        value: s.base_stat,
        fullMark: 255,
    }));

    const total = stats.reduce((sum, s) => sum + s.base_stat, 0);

    return (
        <div className="flex flex-col gap-6">
            {/* Animated bars */}
            <div className="flex flex-col gap-3">
                {stats.map((stat, i) => (
                    <StatBar key={stat.stat.name} statName={stat.stat.name} value={stat.base_stat} index={i} />
                ))}
                <div className="flex items-center gap-3 pt-2 border-t border-poke-border">
                    <span className="w-16 text-right text-xs text-muted-foreground font-mono">Total</span>
                    <span className="w-8 text-xs font-bold text-poke-yellow text-right">{total}</span>
                </div>
            </div>

            {/* Radar chart */}
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="80%">
                        <PolarGrid stroke="#0f3460" />
                        <PolarAngleAxis dataKey="stat" tick={{ fill: "#9ca3af", fontSize: 11 }} />
                        <Radar name="Stats" dataKey="value" stroke="#CC0000" fill="#CC0000" fillOpacity={0.3} />
                        <Tooltip contentStyle={{ background: "#1a1a2e", border: "1px solid #0f3460", borderRadius: 8 }} />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
