"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Trash2, Copy, Upload, Save, Clock } from "lucide-react";
import { useTeamBuilderStore } from "@/lib/stores/teamBuilderStore";
import { PIXEL_URL } from "@/lib/constants/team-builder/team-builder.constants";
import { calculateTeamScore } from "@/lib/utils/team-scoring";
import { getScoreMeta } from "@/lib/constants/team-builder/team-builder.constants";

function TeamSaveCard({ team, isActive, onLoad, onDelete, onDuplicate }: {
    team: import("@/types/api/team-builder.types").PokemonTeam;
    isActive: boolean;
    onLoad: () => void;
    onDelete: () => void;
    onDuplicate: () => void;
}) {
    const scores = calculateTeamScore(team.members);
    const scoreMeta = getScoreMeta(scores.overall);
    const timeDiff = Date.now() - team.updatedAt;
    const timeLabel = timeDiff < 3_600_000
        ? `hace ${Math.floor(timeDiff / 60_000)} min`
        : timeDiff < 86_400_000
            ? `hace ${Math.floor(timeDiff / 3_600_000)}h`
            : `hace ${Math.floor(timeDiff / 86_400_000)}d`;

    return (
        <motion.div
            className="relative border-2 bg-white overflow-hidden"
            style={{
                borderColor: isActive ? "#CC0000" : "#E0E0E0",
                boxShadow: isActive ? "4px 4px 0 #CC0000" : "2px 2px 0 #E0E0E0",
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            layout
        >
            {isActive && (
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#CC0000]" />
            )}

            <div className="p-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="min-w-0">
                        <p className="font-press-start text-[10px] text-[#111111] truncate">{team.name}</p>
                        <div className="flex items-center gap-1.5 mt-1">
                            <Clock size={10} className="text-[#AAAAAA]" />
                            <span className="font-nunito text-[11px] text-[#AAAAAA]">{timeLabel}</span>
                        </div>
                    </div>
                    <div
                        className="px-2 py-1 border border-[#111111] shrink-0"
                        style={{ backgroundColor: scoreMeta.color }}
                    >
                        <span className="font-press-start text-[8px] text-white">{scores.overall}</span>
                    </div>
                </div>

                {/* Sprites */}
                <div className="flex gap-1 flex-wrap mb-3">
                    {team.members.map((m) => (
                        <Image key={m.slot} src={PIXEL_URL(m.pokemonId)} alt={m.nameEs} width={32} height={32} unoptimized className="object-contain" />
                    ))}
                    {Array.from({ length: 6 - team.members.length }).map((_, i) => (
                        <div key={i} className="w-8 h-8 border border-dashed border-[#DDDDDD]" />
                    ))}
                </div>

                {/* Acciones */}
                <div className="flex gap-2">
                    <motion.button
                        onClick={onLoad}
                        className="flex-1 flex items-center justify-center gap-1.5 border-2 border-[#111111] py-2 font-press-start text-[8px] bg-white hover:bg-[#111111] hover:text-white transition-colors"
                        style={isActive ? { backgroundColor: "#111111", color: "#ffffff" } : {}}
                        whileHover={!isActive ? { backgroundColor: "#111111", color: "#ffffff" } : {}}
                    >
                        <Upload size={11} />
                        {isActive ? "ACTIVO" : "CARGAR"}
                    </motion.button>
                    <button
                        onClick={onDuplicate}
                        className="border-2 border-[#E0E0E0] px-2.5 py-2 hover:border-[#111111] transition-colors"
                        title="Duplicar"
                    >
                        <Copy size={13} className="text-[#888888]" />
                    </button>
                    <button
                        onClick={() => { if (confirm(`¿Eliminar "${team.name}"?`)) onDelete(); }}
                        className="border-2 border-[#E0E0E0] px-2.5 py-2 hover:border-[#CC0000] transition-colors"
                        title="Eliminar"
                    >
                        <Trash2 size={13} className="text-[#888888]" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

export function TeamSavePanel() {
    const {
        savedTeams, activeTeam,
        saveCurrentTeam, loadSavedTeam, deleteSavedTeam, duplicateTeam,
    } = useTeamBuilderStore();

    const memberCount = activeTeam.members.length;

    return (
        <section>
            <div className="flex items-center gap-4 mb-6">
                <h2 className="font-press-start text-[14px] uppercase tracking-tighter text-[#111111] whitespace-nowrap">
                    Mis Equipos
                </h2>
                <div className="h-px bg-[#E0E0E0] flex-1" />
                <span className="font-nunito text-[12px] text-[#888888] shrink-0">
                    {savedTeams.length}/10
                </span>
            </div>

            {/* Guardar equipo actual */}
            <motion.button
                onClick={saveCurrentTeam}
                disabled={memberCount === 0 || savedTeams.length >= 10}
                className="w-full flex items-center justify-center gap-2 border-2 border-[#111111] py-3 mb-5 font-press-start text-[10px] bg-white hover:bg-[#111111] hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ boxShadow: "3px 3px 0 #CC0000" }}
                whileHover={memberCount > 0 ? { x: 3, y: 3, boxShadow: "0px 0px 0 transparent" } : {}}
            >
                <Save size={14} />
                GUARDAR EQUIPO ACTUAL
            </motion.button>

            {savedTeams.length === 0 ? (
                <div className="border-2 border-dashed border-[#DDDDDD] p-8 text-center">
                    <p className="font-press-start text-[10px] text-[#AAAAAA] mb-2">SIN EQUIPOS GUARDADOS</p>
                    <p className="font-nunito text-[13px] text-[#AAAAAA]">
                        Guarda tu equipo actual para acceder a él más tarde.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <AnimatePresence>
                        {savedTeams.map((team) => (
                            <TeamSaveCard
                                key={team.id}
                                team={team}
                                isActive={team.id === activeTeam.id}
                                onLoad={() => loadSavedTeam(team.id)}
                                onDelete={() => deleteSavedTeam(team.id)}
                                onDuplicate={() => duplicateTeam(team.id)}
                            />
                        ))}
                    </AnimatePresence>
                </div>
            )}

            <p className="font-nunito text-[11px] text-[#AAAAAA] mt-3 italic text-right">
                Los equipos se guardan localmente en tu navegador. Máximo 10.
            </p>
        </section>
    );
}