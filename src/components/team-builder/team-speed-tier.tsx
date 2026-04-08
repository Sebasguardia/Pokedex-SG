"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Zap, Timer, Activity } from "lucide-react";
import { TeamMember } from "@/types/api/team-builder.types";
import { PIXEL_URL } from "@/lib/constants/team-builder.constants";

interface Props {
    members: TeamMember[];
}

const SPEED_REFERENCES = [
    { label: "Máxima (Regieleki)", speed: 200 },
    { label: "Legendarios Ágiles", speed: 130 },
    { label: "Sweepers Estándar", speed: 100 },
    { label: "Mínimo Competitivo", speed: 80 },
    { label: "Lentos / Trick Room", speed: 50 },
];
const MAX_SPEED = 200;

export function TeamSpeedTier({ members }: Props) {
    if (members.length === 0) return null;

    const sortedSpeed = [...members].sort((a, b) => b.baseStats.speed - a.baseStats.speed);
    const fastest = sortedSpeed[0];
    const slowest = sortedSpeed[sortedSpeed.length - 1];
    const speedRange = fastest?.baseStats.speed - (slowest?.baseStats.speed ?? 0);
    const trickRoomViable = members.filter((m) => m.baseStats.speed <= 55).length >= 3;

    const avgSpeed = members.length > 0
        ? Math.round(members.reduce((s, m) => s + m.baseStats.speed, 0) / members.length)
        : 0;

    return (
        <div className="border-2 border-[#111111] bg-white overflow-hidden shadow-[4px_4px_0_#111111]">
            <div className="flex items-center gap-4 p-5 border-b-2 border-dashed border-[#E0E0E0]">
                <div className="bg-[#111111] text-white px-3 py-1.5 flex items-center gap-2 border-2 border-[#111111] shadow-[3px_3px_0_#F59E0B]">
                    <Timer size={14} className="text-[#F59E0B]" />
                    <h2 className="font-press-start text-[11px] uppercase tracking-wider">
                        Control de Velocidad
                    </h2>
                </div>
                {trickRoomViable && (
                    <div className="ml-auto flex items-center gap-1.5 px-3 py-1 bg-[#A78BFA] border-2 border-[#111111]" style={{ boxShadow: "2px 2px 0 #111111" }}>
                        <Zap size={10} className="text-white" />
                        <span className="font-press-start text-[8px] text-white">TRICK ROOM</span>
                    </div>
                )}
            </div>

            <div className="p-5 space-y-4">
                {sortedSpeed.map((m, i) => {
                    const pct = (m.baseStats.speed / MAX_SPEED) * 100;
                    const isFastest = i === 0;
                    const isSlowest = i === sortedSpeed.length - 1;
                    const barColor = isFastest ? "#22C55E" : isSlowest ? "#F59E0B" : "#111111";

                    return (
                        <div key={m.slot} className="flex items-center gap-3">
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

                            <div className="flex-1 relative h-6 bg-[#F5F5F5] border border-[#EEEEEE] overflow-visible">
                                <motion.div
                                    className="h-full absolute top-0 left-0"
                                    style={{ backgroundColor: barColor, opacity: 0.9 }}
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${pct}%` }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: i * 0.05, ease: "easeOut" }}
                                />
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

                            <div className="w-[36px] flex items-center justify-end shrink-0">
                                <span className="font-jetbrains text-[15px] font-bold" style={{ color: barColor }}>
                                    {m.baseStats.speed}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="border-t-2 border-dashed border-[#E0E0E0] p-5">
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
                                    <div className="absolute top-0 bottom-0 bg-[#CCCCCC]" style={{ width: `${pct}%`, left: 0 }} />
                                    <div className="absolute top-[-2px] bottom-[-2px] w-[2px] bg-[#888888] z-10" style={{ left: `${pct}%` }} />
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

            <div className="grid grid-cols-3 gap-0 border-t-2 border-[#111111]">
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
                    <p className="font-jetbrains text-[12px] font-bold text-[#111111]">{avgSpeed}</p>
                </div>
            </div>
        </div>
    );
}