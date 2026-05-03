"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer, Cell } from "recharts";
import { STAT_CONSTANTS } from "@/lib/constants/pokemon/stats.constants";

interface PokemonStatsData {
    id: number;
    name: string;
    stats: { stat: { name: string }; base_stat: number }[];
}

interface CompareStatsProps {
    pokemonList: PokemonStatsData[];
}

export function CompareStats({ pokemonList }: CompareStatsProps) {
    const colors = ["#CC0000", "#0075BE", "#FFD700"];
    const statNames = Object.keys(STAT_CONSTANTS);

    const data = statNames.map((statName) => {
        const entry: Record<string, any> = { stat: STAT_CONSTANTS[statName]?.shortLabel ?? statName };
        pokemonList.forEach((p, i) => {
            const found = p.stats.find((s) => s.stat.name === statName);
            entry[p.name] = found?.base_stat ?? 0;
        });
        return entry;
    });

    return (
        <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#0f3460" />
                    <XAxis dataKey="stat" tick={{ fill: "#9ca3af", fontSize: 11 }} />
                    <YAxis tick={{ fill: "#9ca3af", fontSize: 11 }} domain={[0, 255]} />
                    <Tooltip contentStyle={{ background: "#1a1a2e", border: "1px solid #0f3460", borderRadius: 8 }} />
                    <Legend />
                    {pokemonList.map((p, i) => (
                        <Bar key={p.name} dataKey={p.name} fill={colors[i]} radius={[4, 4, 0, 0]} />
                    ))}
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
