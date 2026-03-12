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
            <div className="bg-[#111111] text-white font-['Nunito'] text-[12px] px-3 py-2">
                <span className="font-bold">{data.subject}:</span> {data.value}
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
            className="mt-6 p-5"
            style={{
                border: "2px solid #111111",
                boxShadow: "4px 4px 0 #111111",
                backgroundColor: "#F8F8F8",
                maxWidth: 360,
                margin: "24px auto 0"
            }}
        >
            <h3 className="font-['Press_Start_2P'] text-[8px] text-[#888888] mb-4 tracking-wide text-center">RADAR DE STATS</h3>
            <ResponsiveContainer width="100%" height={280}>
                <RadarChart data={data} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
                    <PolarGrid gridType="polygon" stroke="#E0E0E0" strokeWidth={1} />
                    <PolarAngleAxis
                        dataKey="subject"
                        tick={{
                            fontFamily: "'Press Start 2P'",
                            fontSize: 7,
                            fill: "#888888"
                        }}
                    />
                    <PolarRadiusAxis domain={[0, 255]} tick={false} axisLine={false} />
                    <Radar
                        name="Stats"
                        dataKey="value"
                        stroke={typeColor}
                        fill={typeColor}
                        fillOpacity={0.15}
                        strokeWidth={2}
                        dot={{ fill: typeColor, r: 4 }}
                        isAnimationActive={true}
                        animationBegin={300}
                        animationDuration={900}
                        animationEasing="ease-out"
                    />
                    <RechartsTooltip content={<CustomTooltip />} />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    )
}
