"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Plus, CheckCircle, ExternalLink, Loader2, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { PokemonRecommendation } from "@/types/api/team-builder.types";
import {
    TYPE_COLORS, PIXEL_URL, TYPE_NAMES_ES,
} from "@/lib/constants/team-builder.constants";
import { TypeBadgeTeam } from "./type-badge-team";
import { useTeamBuilderStore } from "@/lib/stores/teamBuilderStore";
import { usePokemonForTeam } from "@/lib/hooks/useTeamBuilder";

interface RecommendationCardProps {
    rec: PokemonRecommendation;
    index: number;
    slot: number;
    compact?: boolean;
}

function AddToTeamButton({ rec, slot }: { rec: PokemonRecommendation; slot: number }) {
    const { addMember, activeTeam } = useTeamBuilderStore();
    const [triggered, setTriggered] = useState(false);
    const { refetch, isLoading } = usePokemonForTeam(rec.pokemonId, false);

    const alreadyIn = activeTeam.members.some((m) => m.pokemonId === rec.pokemonId);
    const teamFull = activeTeam.members.length >= 6;

    if (alreadyIn) return (
        <div className="flex items-center justify-center gap-2 w-full py-3.5 border-t-2 border-[#111111] bg-[#10B981] text-white">
            <CheckCircle size={14} />
            <span className="font-press-start text-[10px]">EN EQUIPO</span>
        </div>
    );

    if (teamFull) return null;

    const primaryColor = TYPE_COLORS[rec.types[0]] ?? "#111";

    const handleAdd = async () => {
        if (triggered) return;
        setTriggered(true);
        const result = await refetch();
        if (result.data) {
            const { slot: _discardSlot, ...memberData } = result.data;
            addMember(memberData, slot);
        }
        setTriggered(false);
    };

    return (
        <motion.button
            onClick={handleAdd}
            disabled={isLoading || triggered}
            className="w-full flex items-center justify-between px-5 py-3.5 border-t-2 border-[#111111] font-press-start text-[9px] text-white disabled:opacity-70 transition-colors relative overflow-hidden group/btn mt-auto"
            style={{ backgroundColor: primaryColor }}
        >
            <div className="absolute inset-0 bg-black/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
            <div className="relative z-10 flex items-center gap-2">
                {isLoading ? <Loader2 size={13} className="animate-spin" /> : <Plus size={13} />}
                <span>{isLoading ? "CARGANDO..." : `AÑADIR AL SLOT ${slot + 1}`}</span>
            </div>
            {!isLoading && (
                <div className="relative z-10 opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 -translate-x-2 transition-all">
                    <ArrowRight size={13} />
                </div>
            )}
        </motion.button>
    );
}

export function RecommendationCard({ rec, index, slot, compact = false }: RecommendationCardProps) {
    const primaryColor = TYPE_COLORS[rec.types[0]] ?? "#111111";

    return (
        <motion.div
            className="relative bg-white border-2 border-[#111111] flex flex-col h-full overflow-hidden transition-colors"
            style={{ boxShadow: `4px 4px 0 ${primaryColor}` }}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10px" }}
            transition={{ delay: (index % 6) * 0.05, duration: 0.3 }}
            whileHover={{ y: -3, boxShadow: `6px 6px 0 ${primaryColor}` }}
        >
            {/* Cabecera / Puntuación */}
            <div className="flex items-center justify-between border-b-2 border-[#111111] bg-[#FAFAFA] pr-3 relative overflow-hidden">
                {/* Patrón fondo cabecera */}
                <div className="absolute inset-0 opacity-[0.03] bg-[url('/pattern-diagonal.png')]" />
                
                {/* Score Tag Top-Left */}
                <div 
                    className="flex flex-col items-center justify-center px-4 py-3 border-r-2 border-[#111111] text-white relative z-10"
                    style={{ backgroundColor: primaryColor }}
                >
                    <span className="font-jetbrains text-[20px] font-black leading-none">{rec.score}</span>
                    <span className="font-press-start text-[6px] tracking-widest mt-1 opacity-80 decoration-0">PTS</span>
                </div>

                <div className="flex-1 flex justify-end gap-1.5 p-2 relative z-10">
                    {rec.types.map((t) => (
                        <TypeBadgeTeam key={t} type={t} variant="solid" size="sm" />
                    ))}
                </div>
            </div>

            <div className={`flex flex-col flex-1 relative ${compact ? "p-4" : "p-5"}`}>
                {/* Artwork + Nombre centrado */}
                <div className="flex flex-col items-center mb-5 relative">
                    <div className="absolute inset-0 rounded-full bg-black/5 blur-2xl scale-75" />
                    <Link href={`/pokemon/${rec.pokemonId}`} className="relative z-10 group block mb-3">
                        <div className="relative transition-transform duration-300 group-hover:scale-110 flex items-center justify-center min-h-[100px]">
                            <Image
                                src={PIXEL_URL(rec.pokemonId)} alt={rec.nameEs}
                                width={compact ? 80 : 100} height={compact ? 80 : 100}
                                unoptimized
                                className="object-contain"
                                style={{ filter: `drop-shadow(0 4px 12px ${primaryColor}70)` }}
                            />
                        </div>
                    </Link>
                    
                    <Link href={`/pokemon/${rec.pokemonId}`} className="group flex items-center gap-1.5 bg-white px-3 py-1 border-2 border-transparent group-hover:border-[#111111] transition-colors rounded-sm -mt-2 z-20">
                        <p className="font-press-start text-[12px] text-[#111111] leading-tight group-hover:text-[#CC0000] transition-colors uppercase tracking-tight">
                            {rec.nameEs}
                        </p>
                        <ExternalLink size={12} className="text-[#CCCCCC] group-hover:text-[#CC0000] shrink-0" />
                    </Link>
                </div>

                {/* Explicación de la recomendación */}
                <div className="bg-[#F0F0F0] border-l-2 p-3 mb-5 relative" style={{ borderColor: primaryColor }}>
                    <p className="font-nunito text-[13px] text-[#444444] leading-snug italic relative z-10">
                        "{rec.reason}"
                    </p>
                </div>

                {/* Badges de soporte (Cobertura / Resistencias) */}
                <div className="flex flex-col gap-3 mb-4 flex-1">
                    {rec.coversTypes.length > 0 && (
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Zap size={11} className="text-[#F59E0B]" />
                                <p className="font-press-start text-[8px] text-[#888888] uppercase tracking-wide">Añade Cobertura Ofensiva</p>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                                {rec.coversTypes.map((t) => (
                                    <div key={t} className="flex items-center gap-1 px-1.5 py-0.5 border border-[#E0E0E0] bg-[#FAFAFA]">
                                        <div className="w-2.5 h-2.5 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: TYPE_COLORS[t] }}>
                                            <img src={`/icons/${t}.svg`} alt="" className="w-1.5 h-1.5 filter brightness-0 invert" />
                                        </div>
                                        <span className="font-press-start text-[7px]" style={{ color: TYPE_COLORS[t] }}>
                                            {TYPE_NAMES_ES[t]?.toUpperCase() ?? t}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {rec.fixesWeaknesses.length > 0 && (
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <ShieldCheck size={11} className="text-[#3B82F6]" />
                                <p className="font-press-start text-[8px] text-[#888888] uppercase tracking-wide">Resuelve Puntos Débiles a</p>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                                {rec.fixesWeaknesses.map((t) => (
                                    <div key={t} className="flex items-center gap-1 px-1.5 py-0.5 border border-[#E0E0E0] bg-[#FAFAFA]">
                                        <div className="w-2.5 h-2.5 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: TYPE_COLORS[t] }}>
                                            <img src={`/icons/${t}.svg`} alt="" className="w-1.5 h-1.5 filter brightness-0 invert" />
                                        </div>
                                        <span className="font-press-start text-[7px]" style={{ color: TYPE_COLORS[t] }}>
                                            {TYPE_NAMES_ES[t]?.toUpperCase() ?? t}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* CTA Final */}
            <AddToTeamButton rec={rec} slot={slot} />
        </motion.div>
    );
}