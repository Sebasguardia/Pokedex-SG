"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Activity, TrendingUp, TrendingDown } from "lucide-react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { TeamMember } from "@/types/api/team-builder.types";
import { PIXEL_URL } from "@/lib/constants/team-builder.constants";

interface Props {
    members: TeamMember[];
}

const STAT_LABELS: Record<string, string> = {
    hp: "PS", attack: "ATK", defense: "DEF", specialAttack: "SpA", specialDefense: "SpD", speed: "VEL",
};
const STAT_KEYS = ["hp", "attack", "defense", "specialAttack", "specialDefense", "speed"] as const;
const AVG_REFERENCE = { hp: 69, attack: 79, defense: 73, specialAttack: 72, specialDefense: 71, speed: 68 };

export function TeamStatRadar({ members }: Props) {
    if (members.length === 0) return null;

    const teamAvg = STAT_KEYS.reduce((acc, key) => {
        acc[key] = Math.round(members.reduce((s, m) => s + m.baseStats[key], 0) / members.length);
        return acc;
    }, {} as Record<string, number>);

    const radarData = STAT_KEYS.map((key) => ({
        stat: STAT_LABELS[key],
        team: teamAvg[key],
        ref: AVG_REFERENCE[key],
    }));

    const highestStat = STAT_KEYS.reduce((a, b) => teamAvg[a] > teamAvg[b] ? a : b);
    const lowestStat = STAT_KEYS.reduce((a, b) => teamAvg[a] < teamAvg[b] ? a : b);

    const highestMember = members.reduce((best, m) =>
        m.baseStats[highestStat] > (best?.baseStats[highestStat] ?? 0) ? m : best, members[0]);
    const lowestMember = members.reduce((worst, m) =>
        m.baseStats[lowestStat] < (worst?.baseStats[lowestStat] ?? Infinity) ? m : worst, members[0]);

    return (
        <div className="border-2 border-[#111111] bg-white overflow-hidden shadow-[4px_4px_0_#111111]">
            <div className="flex items-center gap-4 p-5 border-b-2 border-dashed border-[#E0E0E0]">
                <div className="bg-[#111111] text-white px-3 py-1.5 flex items-center gap-2 border-2 border-[#111111] shadow-[3px_3px_0_#CC0000]">
                    <Activity size={14} className="text-[#CC0000]" />
                    <h2 className="font-press-start text-[11px] uppercase tracking-wider">
                        Perfil de Estadísticas
                    </h2>
                </div>
            </div>

            <div className="p-5 flex flex-col xl:flex-row gap-6 items-center">
                <div className="w-full sm:w-[260px] xl:w-[240px] h-[240px] shrink-0 mx-auto bg-white border-2 border-[#111111] rounded-full shadow-[inset_0_0_20px_rgba(0,0,0,0.05)] p-2">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart data={radarData}>
                            <PolarGrid stroke="#E0E0E0" strokeDasharray="3 3" />
                            <PolarAngleAxis dataKey="stat" tick={{ fontSize: 9, fontFamily: "monospace", fill: "#555" }} />
                            <Radar name="Referencia" dataKey="ref" stroke="#AAAAAA" fill="#CCCCCC" fillOpacity={0.2} strokeDasharray="4 4" />
                            <Radar name="Tu equipo" dataKey="team" stroke="#CC0000" fill="#CC0000" fillOpacity={0.3} strokeWidth={2} />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>

                <div className="flex-1 w-full flex flex-col gap-2.5">
                    {STAT_KEYS.map((key) => (
                        <div key={key} className="flex items-center gap-3">
                            <span className="font-press-start text-[9px] text-[#888888] w-[24px] shrink-0 text-right">{STAT_LABELS[key]}</span>
                            <div className="flex-1 h-[14px] bg-[#EAEAEA] border border-[#DDDDDD] relative overflow-hidden">
                                <motion.div
                                    className="h-full absolute left-0 top-0"
                                    style={{ backgroundColor: "#CC0000" }}
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${Math.min(100, (teamAvg[key] / 150) * 100)}%` }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                                />
                            </div>
                            <span className="font-jetbrains text-[14px] font-bold text-[#111111] w-[30px] text-right">{teamAvg[key]}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex gap-4 flex-wrap px-5 pb-5">
                {[
                    { label: "Pico Máximo", stat: STAT_LABELS[highestStat], member: highestMember, val: highestMember?.baseStats[highestStat], color: "#22C55E", icon: TrendingUp },
                    { label: "Punto Débil", stat: STAT_LABELS[lowestStat], member: lowestMember, val: lowestMember?.baseStats[lowestStat], color: "#EF4444", icon: TrendingDown },
                ].map(({ label, stat, member, val, color, icon: Icon }) =>
                    member ? (
                        <div key={label} className="flex-1 min-w-[200px] border-2 border-[#111111] bg-white p-3 flex items-center gap-3 group" style={{ boxShadow: `3px 3px 0 ${color}` }}>
                            <div className="relative w-12 h-12 shrink-0 group-hover:scale-110 transition-transform duration-200 cursor-help" title={member.nameEs.toUpperCase()}>
                                <Image src={PIXEL_URL(member.pokemonId)} alt={member.nameEs} fill unoptimized className="object-contain drop-shadow-sm" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5 mb-1">
                                    <Icon size={12} style={{ color }} />
                                    <p className="font-press-start text-[8px] text-[#888888] uppercase truncate">{label}</p>
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <p className="font-jetbrains text-[16px] font-bold text-[#111111] tracking-tight truncate">{stat}</p>
                                    <p className="font-press-start text-[10px]" style={{ color }}>{val}</p>
                                </div>
                            </div>
                        </div>
                    ) : null
                )}
            </div>
        </div>
    );
}