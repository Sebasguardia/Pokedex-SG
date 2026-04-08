"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Plus, CheckCircle, Shield } from "lucide-react";
import {
    PokemonRecommendation, TeamMember,
} from "@/types/api/team-builder.types";
import {
    TYPE_COLORS, TYPE_NAMES_ES, PIXEL_URL,
} from "@/lib/constants/team-builder.constants";
import { useTeamBuilderStore } from "@/lib/stores/teamBuilderStore";
import { usePokemonForTeam } from "@/lib/hooks/useTeamBuilder";
import { useTeamRecommendations } from "@/lib/hooks/useTeamBuilder";
import { useTeamAnalysis } from "@/lib/hooks/useTeamBuilder";

// ── Card individual ───────────────────────────────────────────────────────────

interface RecommendationCardProps {
    rec: PokemonRecommendation;
    index: number;
    slot: number; // slot destino sugerido
}

function RecommendationCard({ rec, index, slot }: RecommendationCardProps) {
    const { addMember, activeTeam, openSearch } = useTeamBuilderStore();
    const primaryColor = TYPE_COLORS[rec.types[0]] ?? "#888888";

    const handleAdd = async () => {
        // Abrir search con el Pokémon pre-seleccionado — reutilizamos el flow del store
        // Fetch del Pokémon al momento de añadir
        openSearch(slot);
    };

    return (
        <motion.div
            className="relative border-2 border-[#111111] bg-white overflow-hidden"
            style={{ boxShadow: `3px 3px 0 ${primaryColor}` }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ x: 3, y: 3, boxShadow: "0px 0px 0 transparent" }}
        >
            {/* Franja color tipo */}
            <div className="h-[3px]" style={{ backgroundColor: primaryColor }} />

            {/* Score badge */}
            <div
                className="absolute top-3 right-3 w-8 h-8 border-2 border-[#111111] flex items-center justify-center"
                style={{ backgroundColor: primaryColor }}
            >
                <span className="font-press-start text-[8px] text-white">{rec.score}</span>
            </div>

            <div className="p-4">
                {/* Artwork + nombre */}
                <div className="flex items-start gap-3 mb-3">
                    <Image
                        src={PIXEL_URL(rec.pokemonId)}
                        alt={rec.nameEs}
                        width={64} height={64}
                        unoptimized
                        className="object-contain shrink-0"
                        style={{ filter: `drop-shadow(0 2px 8px ${primaryColor}66)` }}
                    />
                    <div className="min-w-0 flex-1 pr-8">
                        <p className="font-press-start text-[10px] text-[#111111] leading-tight mb-1.5">
                            {rec.nameEs.toUpperCase()}
                        </p>
                        <div className="flex gap-1 flex-wrap">
                            {rec.types.map((t) => (
                                <span
                                    key={t}
                                    className="font-press-start text-[7px] px-1.5 py-0.5 text-white"
                                    style={{ backgroundColor: TYPE_COLORS[t] ?? "#888888" }}
                                >
                                    {TYPE_NAMES_ES[t]?.slice(0, 5).toUpperCase() ?? t.toUpperCase()}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Razón */}
                <p className="font-nunito text-[13px] text-[#555555] leading-relaxed mb-3 italic">
                    {rec.reason}
                </p>

                {/* Tipos que cubre */}
                {rec.coversTypes.length > 0 && (
                    <div className="mb-2">
                        <p className="font-press-start text-[8px] text-[#888888] mb-1.5">COBERTURA QUE AÑADE:</p>
                        <div className="flex flex-wrap gap-1">
                            {rec.coversTypes.map((t) => (
                                <span
                                    key={t}
                                    className="font-press-start text-[7px] px-2 py-1 border"
                                    style={{
                                        color: TYPE_COLORS[t] ?? "#888888",
                                        borderColor: TYPE_COLORS[t] ?? "#888888",
                                        backgroundColor: `${TYPE_COLORS[t] ?? "#888888"}15`,
                                    }}
                                >
                                    {TYPE_NAMES_ES[t]?.toUpperCase() ?? t.toUpperCase()} ×2
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Debilidades que resuelve */}
                {rec.fixesWeaknesses.length > 0 && (
                    <div className="mb-3">
                        <p className="font-press-start text-[8px] text-[#888888] mb-1.5">RESUELVE DEBILIDADES:</p>
                        <div className="flex flex-wrap gap-1">
                            {rec.fixesWeaknesses.map((t) => (
                                <div key={t} className="flex items-center gap-1 border border-[#22C55E] bg-[#DCFCE7] px-2 py-0.5">
                                    <CheckCircle size={9} className="text-[#16A34A]" />
                                    <span className="font-press-start text-[7px] text-[#16A34A]">
                                        {TYPE_NAMES_ES[t]?.toUpperCase() ?? t.toUpperCase()}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Botón añadir */}
                <AddButton rec={rec} />
            </div>
        </motion.div>
    );
}

function AddButton({ rec }: { rec: PokemonRecommendation }) {
    const { activeTeam, openSearch, addMember } = useTeamBuilderStore();
    const { refetch, isLoading } = usePokemonForTeam(rec.pokemonId, false);
    const nextSlot = activeTeam.members.length < 6 ? activeTeam.members.length : -1;
    const primaryColor = TYPE_COLORS[rec.types[0]] ?? "#888888";

    if (nextSlot < 0) return null;

    const handleAdd = async () => {
        const result = await refetch();
        if (result.data) {
            const { slot: _slot, ...memberData } = result.data;
            addMember(memberData);
        }
    };

    return (
        <motion.button
            onClick={handleAdd}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 border-2 border-[#111111] py-2 font-press-start text-[9px] text-white disabled:opacity-50 transition-colors"
            style={{
                backgroundColor: primaryColor,
                boxShadow: "2px 2px 0 #111111",
            }}
            whileHover={{ x: 2, y: 2, boxShadow: "0px 0px 0 transparent" }}
        >
            <Plus size={12} />
            {isLoading ? "CARGANDO..." : `AÑADIR AL SLOT ${nextSlot + 1}`}
        </motion.button>
    );
}

// ── Grid de recomendaciones ───────────────────────────────────────────────────

export function TeamRecommendations() {
    const analysis = useTeamAnalysis();
    const recommendations = useTeamRecommendations();
    const { activeTeam } = useTeamBuilderStore();

    const memberCount = activeTeam.members.length;

    if (memberCount === 0) return null;
    if (memberCount >= 6) return (
        <section>
            <div className="flex items-center gap-4 mb-6">
                <h2 className="font-press-start text-[14px] uppercase tracking-tighter text-[#111111] whitespace-nowrap">
                    Recomendaciones
                </h2>
                <div className="h-px bg-[#E0E0E0] flex-1" />
            </div>
            <div className="border-2 border-[#E0E0E0] p-8 text-center bg-[#FAFAFA]">
                <CheckCircle size={28} className="text-[#22C55E] mx-auto mb-3" />
                <p className="font-press-start text-[10px] text-[#22C55E] mb-2">EQUIPO COMPLETO</p>
                <p className="font-nunito text-[14px] text-[#888888]">Tu equipo tiene 6 miembros. ¡Listo para la batalla!</p>
            </div>
        </section>
    );

    const nextSlot = memberCount;

    return (
        <section>
            <div className="flex items-center gap-4 mb-4">
                <h2 className="font-press-start text-[14px] uppercase tracking-tighter text-[#111111] whitespace-nowrap">
                    Recomendaciones
                </h2>
                <div className="h-px bg-[#E0E0E0] flex-1" />
                {recommendations.length > 0 && (
                    <span className="font-press-start text-[8px] text-[#CC0000] shrink-0">
                        {recommendations.length} sugerencias
                    </span>
                )}
            </div>

            {analysis && (
                <p className="font-nunito text-[13px] text-[#888888] mb-5 italic">
                    Basado en tus debilidades a{" "}
                    <span className="font-bold text-[#111111]">
                        {analysis.criticalWeaknesses.slice(0, 3).map((t) => TYPE_NAMES_ES[t] ?? t).join(", ")}
                    </span>
                    {analysis.uncoveredTypes.length > 0 && ` y la falta de cobertura a ${analysis.uncoveredTypes.slice(0, 2).map((t) => TYPE_NAMES_ES[t] ?? t).join(", ")}`}.
                </p>
            )}

            {recommendations.length === 0 ? (
                <div className="border-2 border-[#E0E0E0] p-8 text-center bg-[#FAFAFA]">
                    <p className="font-nunito text-[14px] text-[#888888]">
                        Añade más Pokémon para ver recomendaciones personalizadas.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {recommendations.map((rec, i) => (
                        <RecommendationCard key={rec.pokemonId} rec={rec} index={i} slot={nextSlot} />
                    ))}
                </div>
            )}
        </section>
    );
}