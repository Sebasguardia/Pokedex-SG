"use client";

import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, Cell } from "recharts";
import { TypeRelations } from "@/types/api/type.types";
import { getTypeColor, getTypeLabel } from "@/lib/utils/type.utils";

interface TypeChartProps {
    damageRelations: TypeRelations;
}

export function TypeChart({ damageRelations }: TypeChartProps) {
    const { double_damage_to, half_damage_to, no_damage_to, double_damage_from, half_damage_from, no_damage_from } = damageRelations;

    const sections = [
        { label: "Ataca ×2 a", types: double_damage_to, multiplier: "×2", color: "#78C850" },
        { label: "Ataca ×0.5 a", types: half_damage_to, multiplier: "×0.5", color: "#F08030" },
        { label: "No afecta a", types: no_damage_to, multiplier: "×0", color: "#705898" },
        { label: "Recibe ×2 de", types: double_damage_from, multiplier: "×2", color: "#F85888" },
        { label: "Resiste a", types: half_damage_from, multiplier: "×0.5", color: "#6890F0" },
        { label: "Inmune a", types: no_damage_from, multiplier: "×0", color: "#A8A878" },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {sections.map((s) => (
                s.types.length > 0 && (
                    <div key={s.label} className="p-3 rounded-xl border border-poke-border bg-poke-darker">
                        <div className="flex items-center justify-between mb-3">
                            <p className="text-xs text-muted-foreground">{s.label}</p>
                            <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: s.color }}>{s.multiplier}</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                            {s.types.map((t) => (
                                <span key={t.name} className="px-2 py-0.5 text-xs text-white rounded-full" style={{ backgroundColor: getTypeColor(t.name) }}>
                                    {getTypeLabel(t.name)}
                                </span>
                            ))}
                        </div>
                    </div>
                )
            ))}
        </div>
    );
}
