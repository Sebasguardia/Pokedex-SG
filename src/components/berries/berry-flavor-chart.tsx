"use client";

import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from "recharts";

interface FlavorData {
    flavor: string;
    potency: number;
}

interface BerryFlavorChartProps {
    flavors: FlavorData[];
}

export function BerryFlavorChart({ flavors }: BerryFlavorChartProps) {
    const FLAVORS: Record<string, string> = { spicy: "Picante", dry: "Seco", sweet: "Dulce", bitter: "Amargo", sour: "Agrio" };

    const data = flavors.map((f) => ({
        flavor: FLAVORS[f.flavor] ?? f.flavor,
        potency: f.potency,
    }));

    return (
        <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={data}>
                    <PolarGrid stroke="#0f3460" />
                    <PolarAngleAxis dataKey="flavor" tick={{ fill: "#9ca3af", fontSize: 11 }} />
                    <Radar name="Potencia" dataKey="potency" stroke="#FFD700" fill="#FFD700" fillOpacity={0.3} />
                    <Tooltip contentStyle={{ background: "#1a1a2e", border: "1px solid #0f3460", borderRadius: 8 }} />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}
