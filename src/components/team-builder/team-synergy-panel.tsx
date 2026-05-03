"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Cloud, RefreshCw, Layers, Link2, Shield, Zap, HelpCircle } from "lucide-react";
import { TeamAnalysis } from "@/types/api/team-builder.types";
import { PIXEL_URL } from "@/lib/constants/team-builder/team-builder.constants";

const SYNERGY_ICONS = {
    weather: Cloud,
    "trick-room": RefreshCw,
    "type-core": Layers,
    "pivot-chain": Link2,
    hazards: Shield,
    custom: Zap,
};

const QUALITY_COLORS = {
    excellent: "#22C55E",
    good: "#3B82F6",
    partial: "#F59E0B",
};

const QUALITY_LABELS = {
    excellent: "EXCELENTE",
    good: "BUENA",
    partial: "PARCIAL",
};

interface TeamSynergyPanelProps {
    analysis: TeamAnalysis;
}

export function TeamSynergyPanel({ analysis }: TeamSynergyPanelProps) {
    const synergies = analysis.synergies;

    return (
        <section>
            {synergies.length === 0 ? (
                <div className="border-2 border-[#111111] p-8 text-center bg-[#FAFAFA] relative overflow-hidden" style={{ boxShadow: "4px 4px 0 #111111" }}>
                    <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('/pattern-diagonal.png')]" />
                    <p className="font-press-start text-[10px] text-[#888888] mb-2">SIN SINERGIAS DETECTADAS</p>
                    <p className="font-nunito text-[14px] text-[#AAAAAA] max-w-sm mx-auto">
                        Considera añadir un setter de clima, un núcleo de tipos complementario o tácticas de control de velocidad para mejorar la cohesión general.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {synergies.map((synergy, i) => {
                        const Icon = SYNERGY_ICONS[synergy.type] ?? Zap;
                        const qColor = QUALITY_COLORS[synergy.quality];
                        const qLabel = QUALITY_LABELS[synergy.quality];

                        return (
                            <motion.div
                                key={synergy.id}
                                className="relative border-2 border-[#111111] bg-white overflow-hidden p-5 flex flex-col group"
                                style={{ boxShadow: `4px 4px 0 ${qColor}` }}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.07, duration: 0.3 }}
                            >
                                {/* Fondo decorativo sutil */}
                                <div className="absolute top-0 right-0 w-32 h-32 opacity-5 pointer-events-none translate-x-8 -translate-y-8">
                                    <Icon className="w-full h-full" style={{ color: qColor }} />
                                </div>

                                {/* Franja */}
                                <div className="absolute top-0 left-0 right-0 h-[4px]" style={{ backgroundColor: qColor }} />

                                {/* Header */}
                                <div className="flex items-start justify-between gap-3 mb-4 relative z-10">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-10 h-10 border-2 border-[#111111] flex items-center justify-center shrink-0"
                                            style={{ backgroundColor: `${qColor}15` }}
                                        >
                                            <Icon size={18} style={{ color: qColor }} />
                                        </div>
                                        <div>
                                            <p className="font-press-start text-[10px] text-[#111111] leading-tight mb-1">
                                                {synergy.label.toUpperCase()}
                                            </p>
                                            <div
                                                className="inline-flex px-1.5 py-0.5"
                                                style={{ backgroundColor: qColor, borderLeft: `2px solid #111` }}
                                            >
                                                <span className="font-press-start text-[7px] text-white tracking-wider">{qLabel}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Descripción */}
                                <p className="font-nunito text-[13px] text-[#555555] leading-relaxed flex-1 mb-5 relative z-10">
                                    {synergy.description}
                                </p>

                                {/* Miembros involucrados */}
                                {synergy.members.length > 0 && (
                                    <div className="relative z-10 bg-[#FAFAFA] border border-[#EEEEEE] p-3">
                                        <p className="font-press-start text-[8px] text-[#AAAAAA] mb-2.5 uppercase tracking-wide">Pokémon Involucrados</p>
                                        <div className="flex gap-2.5 flex-wrap">
                                            {synergy.members.map((m) => (
                                                <div 
                                                    key={m.slot} 
                                                    className="flex items-center gap-2 bg-white border border-[#E0E0E0] pr-3 group/chip hover:border-[#111111] transition-colors cursor-help"
                                                    title={m.nameEs.toUpperCase()}
                                                >
                                                    <div className="w-7 h-7 bg-[#F5F5F5] flex items-center justify-center group-hover/chip:bg-[#EEEEEE] transition-colors">
                                                        <div className="group-hover/chip:scale-110 transition-transform">
                                                            <Image src={PIXEL_URL(m.pokemonId)} alt={m.nameEs} width={24} height={24} unoptimized className="object-contain drop-shadow-sm" />
                                                        </div>
                                                    </div>
                                                    <span className="font-jetbrains text-[12px] font-bold text-[#111111]">{m.nameEs}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            )}
        </section>
    );
}