"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Zap, HelpCircle, Activity, Timer, TrendingUp, TrendingDown } from "lucide-react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { TeamMember } from "@/types/api/team-builder.types";
import { PIXEL_URL, TYPE_COLORS } from "@/lib/constants/team-builder.constants";

interface Props {
    members: TeamMember[];
}

// ── CONSTANTES ──────────────────────────────────────────────────────────────
const STAT_LABELS: Record<string, string> = {
    hp: "PS", attack: "ATK", defense: "DEF", specialAttack: "SpA", specialDefense: "SpD", speed: "VEL",
};
const STAT_KEYS = ["hp", "attack", "defense", "specialAttack", "specialDefense", "speed"] as const;
const AVG_REFERENCE = { hp: 69, attack: 79, defense: 73, specialAttack: 72, specialDefense: 71, speed: 68 };

const SPEED_REFERENCES = [
    { label: "Máxima (Regieleki)", speed: 200 },
    { label: "Legendarios Ágiles", speed: 130 },
    { label: "Sweepers Estándar", speed: 100 },
    { label: "Mínimo Competitivo", speed: 80 },
    { label: "Lentos / Trick Room", speed: 50 },
];
const MAX_SPEED = 200;

export function TeamStatsAndSpeedPanel({ members }: Props) {
    if (members.length === 0) return null;

    // ── CÁLCULOS RADAR ──
    const teamAvg = STAT_KEYS.reduce((acc, key) => {
        acc[key] = Math.round(members.reduce((s, m) => s + m.baseStats[key], 0) / members.length);
        return acc;
    }, {} as Record<string, number>);

    const radarData = STAT_KEYS.map((key) => ({
        stat: STAT_LABELS[key], team: teamAvg[key], ref: AVG_REFERENCE[key],
    }));

    const highestStat = STAT_KEYS.reduce((a, b) => teamAvg[a] > teamAvg[b] ? a : b);
    const lowestStat = STAT_KEYS.reduce((a, b) => teamAvg[a] < teamAvg[b] ? a : b);

    const highestMember = members.reduce((best, m) =>
        m.baseStats[highestStat] > (best?.baseStats[highestStat] ?? 0) ? m : best, members[0]);
    const lowestMember = members.reduce((worst, m) =>
        m.baseStats[lowestStat] < (worst?.baseStats[lowestStat] ?? Infinity) ? m : worst, members[0]);

    // ── CÁLCULOS VELOCIDAD ──
    const sortedSpeed = [...members].sort((a, b) => b.baseStats.speed - a.baseStats.speed);
    const fastest = sortedSpeed[0];
    const slowest = sortedSpeed[sortedSpeed.length - 1];
    const speedRange = fastest?.baseStats.speed - (slowest?.baseStats.speed ?? 0);
    const trickRoomViable = members.filter((m) => m.baseStats.speed <= 55).length >= 3;

    return (
        <section className="relative border-2 border-[#111111] bg-white overflow-hidden shadow-[4px_4px_0_#111111] flex flex-col divide-y-2 divide-dashed divide-[#E0E0E0]">
            
            {/* ── COLUMNA IZQUIERDA: RADAR DE STATS ── */}
            <div className="flex-1 p-5 sm:p-6 flex flex-col min-w-0 bg-[#FAFAFA] relative">
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: "radial-gradient(#111 1px, transparent 1px)", backgroundSize: "8px 8px" }} />
                
                <div className="flex items-center gap-4 mb-6 relative z-10">
                    <div className="bg-[#111111] text-white px-3 py-1.5 flex items-center gap-2 border-2 border-[#111111] shadow-[3px_3px_0_#CC0000]">
                        <Activity size={14} className="text-[#CC0000]" />
                        <h2 className="font-press-start text-[11px] uppercase tracking-wider">
                            Perfil de Estadísticas
                        </h2>
                    </div>
                </div>

                <div className="mt-2 mb-auto flex flex-col xl:flex-row gap-6 items-center w-full relative z-10">
                    {/* Gráfico Radar */}
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

                    {/* Stats Breakdown */}
                    <div className="flex-1 w-full flex flex-col gap-2.5">
                        {STAT_KEYS.map((key) => (
                            <div key={key} className="flex items-center gap-3">
                                <span className="font-press-start text-[9px] text-[#888888] w-[24px] shrink-0 text-right">{STAT_LABELS[key]}</span>
                                <div className="flex-1 h-[14px] bg-[#EAEAEA] border border-[#DDDDDD] relative overflow-hidden">
                                    <motion.div
                                        className="h-full absolute left-0 top-0 bottom-0"
                                        style={{ backgroundColor: "#CC0000" }}
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${Math.min(100, (teamAvg[key] / 150) * 100)}%` }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                                    />
                                    <div className="absolute inset-0 opacity-20 bg-[url('/pattern-diagonal.png')]" />
                                </div>
                                <span className="font-jetbrains text-[14px] font-bold text-[#111111] w-[30px] text-right">{teamAvg[key]}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Highlights */}
                <div className="flex gap-4 flex-wrap mt-auto pt-6 relative z-10">
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

            {/* ── COLUMNA DERECHA: TIER DE VELOCIDAD ── */}
            <div className="flex-1 p-5 sm:p-6 flex flex-col min-w-0 bg-white relative">
                <div className="flex items-center gap-4 mb-6 relative z-10">
                    <div className="bg-[#111111] text-white px-3 py-1.5 flex items-center gap-2 border-2 border-[#111111] shadow-[3px_3px_0_#F59E0B]">
                        <Timer size={14} className="text-[#F59E0B]" />
                        <h2 className="font-press-start text-[11px] uppercase tracking-wider">
                            Control de Velocidad
                        </h2>
                    </div>
                    {trickRoomViable && (
                        <div className="ml-auto flex items-center gap-1.5 px-3 py-1 bg-[#A78BFA] border-2 border-[#111111] shrink-0" style={{ boxShadow: "2px 2px 0 #111111" }}>
                            <Zap size={10} className="text-white" />
                            <span className="font-press-start text-[8px] text-white">TRICK ROOM</span>
                        </div>
                    )}
                </div>

                <div className="space-y-4 mb-8 relative z-10">
                    {/* Miembros del equipo */}
                    {sortedSpeed.map((m, i) => {
                        const pct = (m.baseStats.speed / MAX_SPEED) * 100;
                        const isFastest = i === 0;
                        const isSlowest = i === sortedSpeed.length - 1;
                        const barColor = isFastest ? "#22C55E" : isSlowest ? "#F59E0B" : "#111111";

                        return (
                            <div key={m.slot} className="flex items-center gap-3">
                                {/* Pokémon */}
                                <div className="flex items-center gap-2 w-[140px] shrink-0 group">
                                    <div className="relative w-8 h-8 group-hover:scale-110 transition-transform duration-200 cursor-help" title={m.nameEs.toUpperCase()}>
                                        <Image
                                            src={PIXEL_URL(m.pokemonId)} alt={m.nameEs} fill
                                            unoptimized
                                            className="object-contain drop-shadow-sm"
                                        />
                                    </div>
                                    <span className="font-nunito font-bold text-[13px] text-[#222222] truncate">{m.nameEs}</span>
                                </div>

                                {/* Barra */}
                                <div className="flex-1 relative h-6 bg-[#F5F5F5] border border-[#EEEEEE] overflow-visible">
                                    <motion.div
                                        className="h-full absolute top-0 left-0"
                                        style={{ backgroundColor: barColor, opacity: 0.9 }}
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${pct}%` }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: i * 0.05, ease: "easeOut" }}
                                    >
                                        <div className="absolute inset-0 opacity-20 bg-[url('/pattern-diagonal.png')]" />
                                    </motion.div>
                                    
                                    {/* Chips Superpuestos */}
                                    {isFastest && (
                                        <div className="absolute top-1/2 -translate-y-1/2 right-2 z-20">
                                            <span className="font-press-start text-[6px] text-white bg-black/30 px-1 py-0.5 rounded-sm">RÁPIDO</span>
                                        </div>
                                    )}
                                    {isSlowest && (
                                        <div className="absolute top-1/2 -translate-y-1/2 right-2 z-20">
                                            <span className="font-press-start text-[6px] text-white bg-black/30 px-1 py-0.5 rounded-sm">LENTO</span>
                                        </div>
                                    )}
                                </div>

                                {/* Valor */}
                                <div className="w-[36px] flex items-center justify-end shrink-0">
                                    <span className="font-jetbrains text-[15px] font-bold" style={{ color: barColor }}>
                                        {m.baseStats.speed}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Referencias del Metajuego */}
                <div className="border-t-2 border-dashed border-[#E0E0E0] pt-6 mb-6 relative z-10">
                    <p className="font-press-start text-[9px] text-[#AAAAAA] uppercase tracking-wide mb-4">Métricas del Metajuego</p>

                    <div className="space-y-4">
                        {SPEED_REFERENCES.map((ref) => {
                            const pct = (ref.speed / MAX_SPEED) * 100;
                            const youBeat = members.filter((m) => m.baseStats.speed > ref.speed).length;
                            return (
                                <div key={ref.label} className="flex flex-col gap-1.5">
                                    <div className="flex justify-between items-end">
                                        <span className="font-nunito font-bold text-[11px] text-[#666666]">{ref.label}</span>
                                        <div className="flex items-center gap-2">
                                            {youBeat > 0 && (
                                                <span className="font-press-start text-[7px] px-1.5 py-0.5 bg-[#22C55E] text-white shadow-sm">
                                                    +{youBeat} SUPERA
                                                </span>
                                            )}
                                            <span className="font-jetbrains text-[12px] font-bold text-[#AAAAAA]">{ref.speed}</span>
                                        </div>
                                    </div>
                                    <div className="h-[4px] w-full bg-[#EEEEEE] relative overflow-visible">
                                        {/* Marca de la referencia */}
                                        <div className="absolute top-0 bottom-0 bg-[#CCCCCC]" style={{ width: `${pct}%`, left: 0 }} />
                                        <div className="absolute top-[-2px] bottom-[-2px] w-[2px] bg-[#888888] z-10" style={{ left: `${pct}%` }} />
                                        
                                        {/* Distribución de tu equipo */}
                                        {members.map((m) => (
                                            <div
                                                key={m.slot}
                                                className="absolute top-[-3px] w-[4px] h-[10px] bg-[#111111] z-20"
                                                style={{ left: `${(m.baseStats.speed / MAX_SPEED) * 100}%` }}
                                                title={`${m.nameEs}: ${m.baseStats.speed}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Resumen Final */}
                <div className="mt-auto grid grid-cols-3 gap-0 border-2 border-[#111111] relative z-10">
                    <div className="bg-[#FAFAFA] px-3 py-2 flex flex-col items-center justify-center border-r-2 border-[#111111]">
                        <p className="font-press-start text-[7px] text-[#888888] uppercase mb-1">Rango</p>
                        <p className="font-jetbrains text-[12px] font-bold text-[#111111]">
                            {slowest?.baseStats.speed ?? 0}-{fastest?.baseStats.speed ?? 0}
                        </p>
                    </div>
                    <div className="bg-[#FAFAFA] px-3 py-2 flex flex-col items-center justify-center border-r-2 border-[#111111]">
                        <p className="font-press-start text-[7px] text-[#888888] uppercase mb-1">Spread</p>
                        <p className="font-jetbrains text-[12px] font-bold text-[#111111]">{speedRange}</p>
                    </div>
                    <div className="bg-[#FAFAFA] px-3 py-2 flex flex-col items-center justify-center">
                        <p className="font-press-start text-[7px] text-[#888888] uppercase mb-1">Promedio</p>
                        <p className="font-jetbrains text-[12px] font-bold text-[#111111]">
                            {members.length > 0 ? Math.round(members.reduce((s, m) => s + m.baseStats.speed, 0) / members.length) : 0}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
