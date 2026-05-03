"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import {
    TYPE_COLORS, PIXEL_URL,
    GEN_COLORS, getGenerationByPokemonId,
} from "@/lib/constants/team-builder/team-builder.constants";
import { TypeBadgeTeam, EffectivenessBadge } from "./type-badge-team";
import { useTeamAnalysis } from "@/lib/hooks/team-builder/useTeamAnalysis";
import { getEffectiveness } from "@/lib/utils/type-analysis";

interface PokemonSearchResultProps {
    id: number;
    name: string;         // slug inglés
    nameEs: string;
    types: string[];
    isInTeam: boolean;
    isSelected: boolean;
    onSelect: (name: string) => void;
    showAnalysis?: boolean;      // mostrar indicadores de cobertura si hay equipo activo
    compact?: boolean;        // variante compacta para el grid virtualizado
}

export function PokemonSearchResult({
    id, name, nameEs, types, isInTeam, isSelected, onSelect,
    showAnalysis = true, compact = false,
}: PokemonSearchResultProps) {
    const analysis = useTeamAnalysis();
    const primaryColor = TYPE_COLORS[types[0]] ?? "#888888";
    const gen = getGenerationByPokemonId(id);

    // Si hay análisis: calcular si este Pokémon ayuda o perjudica al equipo
    const analysisIndicator = (() => {
        if (!analysis || !showAnalysis || isInTeam) return null;

        // ¿Resuelve alguna debilidad crítica?
        const fixesCount = analysis.criticalWeaknesses.filter((attackType) =>
            getEffectiveness(attackType, types) < 1
        ).length;

        // ¿Añade cobertura ofensiva?
        const coversCount = analysis.uncoveredTypes.filter((defType) =>
            types.some((atkType) => getEffectiveness(atkType, [defType]) > 1)
        ).length;

        const total = fixesCount * 2 + coversCount;
        if (total >= 4) return { label: "Muy útil", color: "#22C55E", dot: "bg-[#22C55E]" };
        if (total >= 2) return { label: "Útil", color: "#84CC16", dot: "bg-[#84CC16]" };
        return null;
    })();

    if (compact) {
        return (
            <motion.button
                onClick={() => !isInTeam && onSelect(name)}
                className="relative border-2 flex flex-col items-center gap-1 p-2 transition-all w-full"
                style={{
                    borderColor: isInTeam ? "#E0E0E0" : isSelected ? "#CC0000" : "#E0E0E0",
                    backgroundColor: isInTeam ? "#F5F5F5" : isSelected ? "#FFF5F5" : "white",
                    cursor: isInTeam ? "not-allowed" : "pointer",
                    opacity: isInTeam ? 0.55 : 1,
                }}
                whileHover={!isInTeam ? {
                    borderColor: "#111111",
                    boxShadow: `2px 2px 0 ${primaryColor}`,
                    y: -1,
                } : {}}
                whileTap={!isInTeam ? { scale: 0.97 } : {}}
            >
                {/* Badge de análisis */}
                {analysisIndicator && (
                    <div
                        className="absolute top-0.5 right-0.5 w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: analysisIndicator.color }}
                        title={analysisIndicator.label}
                    />
                )}

                {/* Ya en equipo overlay */}
                {isInTeam && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10">
                        <CheckCircle2 size={14} className="text-[#888888]" />
                    </div>
                )}

                {/* Sprite */}
                <Image
                    src={PIXEL_URL(id)} alt={nameEs}
                    width={44} height={44}
                    unoptimized
                    className="object-contain" loading="lazy"
                />

                {/* Nombre */}
                <p className="font-nunito font-bold text-[10px] text-[#111111] text-center leading-tight capitalize truncate w-full px-0.5">
                    {nameEs || name.replace(/-/g, " ")}
                </p>

                {/* Dots de tipo */}
                <div className="flex gap-0.5">
                    {types.map((t) => (
                        <div key={t} className="w-2 h-2 rounded-full" style={{ backgroundColor: TYPE_COLORS[t] }} />
                    ))}
                </div>

                {/* ID */}
                <span className="font-jetbrains text-[8px] text-[#AAAAAA]">#{String(id).padStart(3, "0")}</span>
            </motion.button>
        );
    }

    // ── VARIANTE CARD (más grande, para listas no compactas) ──────────────────
    return (
        <motion.button
            onClick={() => !isInTeam && onSelect(name)}
            className="relative border-2 flex flex-row items-center gap-3 p-3 text-left w-full transition-all"
            style={{
                borderColor: isInTeam ? "#E0E0E0" : isSelected ? "#CC0000" : "#E0E0E0",
                borderLeftColor: isSelected ? "#CC0000" : primaryColor,
                borderLeftWidth: 3,
                backgroundColor: isInTeam ? "#F8F8F8" : isSelected ? "#FFF5F5" : "white",
                cursor: isInTeam ? "not-allowed" : "pointer",
                opacity: isInTeam ? 0.5 : 1,
            }}
            whileHover={!isInTeam ? { borderColor: "#111111", backgroundColor: `${primaryColor}08` } : {}}
        >
            {/* Análisis dot */}
            {analysisIndicator && (
                <div
                    className="absolute top-2 right-2 px-1.5 py-0.5 text-white font-press-start text-[6px]"
                    style={{ backgroundColor: analysisIndicator.color }}
                >
                    {analysisIndicator.label.toUpperCase()}
                </div>
            )}

            {/* En equipo */}
            {isInTeam && (
                <div className="absolute top-2 right-2">
                    <CheckCircle2 size={14} className="text-[#888888]" />
                </div>
            )}

            {/* Sprite */}
            <Image
                src={PIXEL_URL(id)} alt={nameEs}
                width={48} height={48}
                unoptimized
                className="object-contain shrink-0" loading="lazy"
            />

            {/* Info */}
            <div className="flex-1 min-w-0">
                <p className="font-nunito font-bold text-[13px] text-[#111111] capitalize truncate">
                    {nameEs || name.replace(/-/g, " ")}
                </p>
                <div className="flex gap-1 mt-1 flex-wrap">
                    {types.map((t) => (
                        <TypeBadgeTeam key={t} type={t} variant="solid" size="xs" />
                    ))}
                    <span
                        className="font-press-start text-[6px] px-1.5 py-0.5 border"
                        style={{ borderColor: GEN_COLORS[gen], color: GEN_COLORS[gen], backgroundColor: `${GEN_COLORS[gen]}15` }}
                    >
                        Gen {gen}
                    </span>
                </div>
            </div>

            {/* ID */}
            <span className="font-jetbrains text-[11px] text-[#AAAAAA] shrink-0">#{String(id).padStart(3, "0")}</span>
        </motion.button>
    );
}