"use client"

import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from "recharts"
import { ComparedPokemon } from "@/types/api/compare.types"
import { COMPARE_COLORS, STAT_ABBR_ES, STAT_MAX, STAT_KEYS } from "@/lib/constants/compare/compare.constants"

interface CompareRadarChartProps {
    pokemon: (ComparedPokemon | null)[]
}

export function CompareRadarChart({ pokemon }: CompareRadarChartProps) {
    const active = pokemon.filter(Boolean)
    if (active.length < 2) return null

    // Build radar data: one entry per stat
    const data = STAT_KEYS.map(key => {
        const entry: Record<string, number | string> = { stat: STAT_ABBR_ES[key] }
        pokemon.forEach((p, i) => {
            if (p) {
                // Normalize to 0–100 against the absolute max
                entry[`p${i}`] = Math.round((p.stats[key] / STAT_MAX[key]) * 100)
            }
        })
        return entry
    })

    return (
        <div className="relative border-2 border-[#111111] bg-[#111111]" style={{ boxShadow: "4px 4px 0 #111111" }}>
            <span className="absolute top-[-15px] left-4  bg-white text-[#111111] font-press-start text-[10px] px-3 py-1 z-10 border-x-2 border-2 border-[#111111]">
                RADAR DE EQUILIBRIO
            </span>

            <div className="h-[350px] md:h-[420px] w-full flex items-center justify-center p-4">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={data} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
                        <PolarGrid stroke="#333333" />
                        <PolarAngleAxis
                            dataKey="stat"
                            tick={{ fill: '#888888', fontSize: 13, fontFamily: 'Press Start 2P' }}
                        />
                        <PolarRadiusAxis
                            angle={30}
                            domain={[0, 100]}
                            tick={false}
                            axisLine={false}
                        />
                        {pokemon.map((p, i) => {
                            if (!p) return null
                            const color = COMPARE_COLORS[i]
                            return (
                                <Radar
                                    key={i}
                                    name={p.nameEs}
                                    dataKey={`p${i}`}
                                    stroke={color}
                                    fill={color}
                                    fillOpacity={0.15}
                                    strokeWidth={2}
                                />
                            )
                        })}
                        <Legend
                            formatter={(value) => (
                                <span style={{ fontFamily: "monospace", fontSize: 10 }}>{value}</span>
                            )}
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
            <p className="font-nunito text-[12px] text-gray-400 text-center mt-2 mb-4 px-4 bg-[#111111]">
                Stats normalizados respecto al máximo histórico de cada categoría
            </p>
        </div>
    )
}
