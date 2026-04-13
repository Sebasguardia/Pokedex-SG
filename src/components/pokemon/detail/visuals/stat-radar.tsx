"use client"

import {
    RadarChart, Radar, PolarGrid, PolarAngleAxis,
    PolarRadiusAxis, ResponsiveContainer, Tooltip as RechartsTooltip
} from "recharts"

interface Stat {
    stat: { name: string }
    base_stat: number
}

interface Props {
    stats?: Stat[]
    typeColor?: string
}

const STAT_LABELS: Record<string, string> = {
    hp: "HP", attack: "ATK", defense: "DEF",
    "special-attack": "Sp.A", "special-defense": "Sp.D", speed: "SPE"
}

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload?.length) {
        const data = payload[0].payload
        return (
            <div style={{ backgroundColor: "#FFFFFF", border: `2px solid #111111`, boxShadow: `2px 2px 0 #111111` }} className="px-3 py-2">
                <span className="font-['Press_Start_2P'] text-[9px] block mb-1" style={{ color: "#888888" }}>{data.subject}</span>
                <span className="font-['Press_Start_2P'] text-[12px]" style={{ color: "#111111" }}>{data.value}</span>
            </div>
        )
    }
    return null
}

export function StatRadar({ stats, typeColor = "#CC0000" }: Props) {
    if (!stats) return null

    const data = stats.map(s => ({
        subject: STAT_LABELS[s.stat.name] ?? s.stat.name.toUpperCase().slice(0, 3),
        value: s.base_stat,
        fullMark: 255
    }))

    return (
        <div
            className="mt-6 p-5 sm:p-6 bg-[#FFFFFF] border-[2px] border-[#111111] shadow-[4px_4px_0_rgba(17,17,17,0.15)] rounded-lg"
        >
            <h3 className="font-['Press_Start_2P'] text-[10px] sm:text-[12px] mb-4 tracking-wide text-center text-[#111111] border-b-2 border-[#E0E0E0] pb-2">RADAR DE STATS</h3>
            <div className="relative z-10 w-full mt-4">
                <ResponsiveContainer width="100%" height={260}>
                    <RadarChart data={data} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
                        <PolarGrid gridType="polygon" stroke="#E0E0E0" strokeWidth={2} />
                        <PolarAngleAxis
                            dataKey="subject"
                            tick={{
                                fontFamily: "'Press Start 2P'",
                                fontSize: 9,
                                fill: "#111111"
                            }}
                        />
                        <PolarRadiusAxis domain={[0, 255]} tick={false} axisLine={false} />
                        <Radar
                            name="Stats"
                            dataKey="value"
                            stroke={typeColor}
                            fill={typeColor}
                            fillOpacity={0.3}
                            strokeWidth={3}
                            dot={{ fill: typeColor, r: 4, strokeWidth: 0 }}
                            isAnimationActive={true}
                            animationBegin={100}
                            animationDuration={900}
                            animationEasing="ease-out"
                        />
                        <RechartsTooltip content={<CustomTooltip />} />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
