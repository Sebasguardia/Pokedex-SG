"use client";

import { motion } from "framer-motion";
import NumberFlow from "@number-flow/react";
import { TeamAnalysis } from "@/types/api/team-builder.types";
import { AlertTriangle, CheckCircle, Info } from "lucide-react";
import { TYPE_NAMES_ES } from "@/lib/constants/team-builder/team-builder.constants";

interface TeamScoreCardProps {
    analysis: TeamAnalysis;
}

function ScoreCircle({ score, color }: { score: number; color: string }) {
    const radius = 56;
    const circumference = 2 * Math.PI * radius;
    const dash = (score / 100) * circumference;

    return (
        <div className="relative w-[150px] h-[150px] flex items-center justify-center shrink-0">
            <svg viewBox="0 0 130 130" width="130" height="130" className="absolute inset-0 m-auto">
                {/* Track */}
                <circle cx="65" cy="65" r={radius} fill="none" stroke="#F0F0F0" strokeWidth="10" />
                {/* Progress */}
                <motion.circle
                    cx="65" cy="65" r={radius}
                    fill="none"
                    stroke={color}
                    strokeWidth="10"
                    strokeLinecap="square"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference}
                    animate={{ strokeDashoffset: circumference - dash }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                    style={{ transform: "rotate(-90deg)", transformOrigin: "65px 65px" }}
                />
            </svg>
            <div className="text-center z-10">
                <NumberFlow value={score} className="font-press-start text-[26px]" style={{ color }} />
                <p className="font-nunito text-[10px] text-[#888888] mt-1">/100</p>
            </div>
        </div>
    );
}

export function TeamScoreCard({ analysis }: TeamScoreCardProps) {
    const breakdown = [
        { label: "Cobertura Ofensiva", value: analysis.offensiveScore, weight: "35%", color: "#3B82F6" },
        { label: "Defensa", value: analysis.defensiveScore, weight: "35%", color: "#10B981" },
        { label: "Diversidad", value: analysis.diversityScore, weight: "20%", color: "#F59E0B" },
        { label: "Inmunidades", value: analysis.immunityScore, weight: "10%", color: "#8B5CF6" },
    ];

    const warnings = analysis.criticalWeaknesses.map((t) => ({
        type: "warning",
        text: `Debilidad crítica a ${TYPE_NAMES_ES[t] ?? t}`,
    }));
    const goods = analysis.synergies.filter((s) => s.quality !== "partial").map((s) => ({
        type: "good",
        text: s.label,
    }));

    return (
        <section>
            <motion.div
                className="relative border-2 border-[#111111] p-6 bg-white overflow-hidden"
                style={{ boxShadow: `4px 4px 0 ${analysis.scoreColor}` }}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                {/* Watermark score */}
                <div
                    className="absolute right-4 bottom-2 font-press-start leading-none select-none pointer-events-none"
                    style={{ fontSize: "110px", color: analysis.scoreColor, opacity: 0.04 }}
                >
                    {analysis.overallScore}
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-start md:items-center mt-2">
                    {/* Score circular */}
                    <div className="flex flex-col items-center gap-3 w-full md:w-auto mt-2 shrink-0">
                        <ScoreCircle score={analysis.overallScore} color={analysis.scoreColor} />
                        <div
                            className="px-4 py-2 border-2 border-[#111111] text-center w-full max-w-[150px]"
                            style={{ backgroundColor: analysis.scoreColor }}
                        >
                            <span className="font-press-start text-[9px] text-white">
                                {analysis.scoreLabel.toUpperCase()}
                            </span>
                        </div>
                    </div>

                    {/* Breakdown */}
                    <div className="flex-1 flex flex-col gap-4 w-full">
                        {breakdown.map(({ label, value, weight, color }) => (
                            <div key={label}>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-nunito font-bold text-[14px] text-[#222222]">{label}</span>
                                    <div className="flex items-center gap-2">
                                        <span className="font-press-start text-[8px] bg-[#F5F5F5] text-[#888888] px-2 py-1 border border-[#EEEEEE]">
                                            PESO {weight}
                                        </span>
                                        <span className="font-jetbrains text-[16px] font-bold" style={{ color }}>
                                            {value}
                                        </span>
                                    </div>
                                </div>
                                <div className="h-[10px] bg-[#F0F0F0] overflow-hidden">
                                    <motion.div
                                        className="h-full"
                                        style={{ backgroundColor: color }}
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${value}%` }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, ease: "easeOut" }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Badges de aviso */}
                {(warnings.length > 0 || goods.length > 0) && (
                    <div className="flex flex-wrap gap-2.5 mt-8 pt-5 border-t border-[#F0F0F0]">
                        {warnings.map((w, i) => (
                            <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-[#FEF3C7] border border-[#F59E0B]">
                                <AlertTriangle size={13} className="text-[#D97706]" />
                                <span className="font-nunito text-[13px] text-[#D97706]">{w.text}</span>
                            </div>
                        ))}
                        {goods.map((g, i) => (
                            <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-[#DCFCE7] border border-[#16A34A]">
                                <CheckCircle size={13} className="text-[#16A34A]" />
                                <span className="font-nunito text-[13px] text-[#16A34A]">{g.text}</span>
                            </div>
                        ))}
                    </div>
                )}

            </motion.div>

            <p className="font-nunito text-[11px] text-[#AAAAAA] mt-3 italic text-right">
                Puntuación estimada basada en cobertura de tipos. No reemplaza el análisis competitivo.
            </p>
        </section>
    );
}