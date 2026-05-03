"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { PokemonTeam } from "@/types/api/team-builder.types";
import {
    TYPE_COLORS, PIXEL_URL, getScoreMeta,
} from "@/lib/constants/team-builder/team-builder.constants";
import { calculateTeamScore } from "@/lib/utils/team-scoring";

type PreviewSize = "xs" | "sm" | "md";

interface TeamMiniPreviewProps {
    team: PokemonTeam;
    size?: PreviewSize;
    showScore?: boolean;
    showName?: boolean;
    showTypes?: boolean;
    animated?: boolean;
    highlightSlot?: number;   // resaltar un slot específico
}

const SPRITE_SIZES: Record<PreviewSize, number> = { xs: 24, sm: 32, md: 40 };
const GAP_CLASSES: Record<PreviewSize, string> = { xs: "gap-0.5", sm: "gap-1", md: "gap-1.5" };

export function TeamMiniPreview({
    team,
    size = "sm",
    showScore = true,
    showName = false,
    showTypes = false,
    animated = false,
    highlightSlot,
}: TeamMiniPreviewProps) {
    const spriteSize = SPRITE_SIZES[size];
    const scores = calculateTeamScore(team.members);
    const scoreMeta = getScoreMeta(scores.overall);

    // Ordenar por slot
    const sorted = [...team.members].sort((a, b) => a.slot - b.slot);
    const empty = 6 - sorted.length;

    return (
        <div className="flex flex-col gap-1.5">
            {/* Nombre del equipo */}
            {showName && (
                <p className="font-press-start text-[9px] text-[#111111] truncate">{team.name}</p>
            )}

            {/* Sprites de los Pokémon */}
            <div className={`flex items-center flex-wrap ${GAP_CLASSES[size]}`}>
                {sorted.map((m, i) => {
                    const primaryColor = TYPE_COLORS[m.types[0]] ?? "#888888";
                    const isHighlighted = highlightSlot === m.slot;

                    return (
                        <motion.div
                            key={m.slot}
                            className="relative"
                            initial={animated ? { scale: 0, opacity: 0 } : false}
                            animate={animated ? { scale: 1, opacity: 1 } : false}
                            transition={{ delay: i * 0.06, type: "spring", stiffness: 300, damping: 20 }}
                        >
                            <div
                                className="flex flex-col items-center"
                                style={{
                                    filter: isHighlighted ? `drop-shadow(0 0 4px ${primaryColor})` : undefined,
                                }}
                            >
                                <Image
                                    src={PIXEL_URL(m.pokemonId)} alt={m.nameEs}
                                    width={spriteSize} height={spriteSize}
                                    unoptimized
                                    className="object-contain" loading="lazy"
                                />
                                {/* Puntos de tipo */}
                                {showTypes && (
                                    <div className="flex gap-0.5 mt-0.5">
                                        {m.types.map((t) => (
                                            <div
                                                key={t}
                                                className="rounded-full"
                                                style={{
                                                    width: size === "xs" ? 4 : 5,
                                                    height: size === "xs" ? 4 : 5,
                                                    backgroundColor: TYPE_COLORS[t],
                                                }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    );
                })}

                {/* Slots vacíos */}
                {Array.from({ length: empty }).map((_, i) => (
                    <div
                        key={`empty-${i}`}
                        className="border border-dashed border-[#DDDDDD]"
                        style={{ width: spriteSize, height: spriteSize }}
                    />
                ))}
            </div>

            {/* Score badge */}
            {showScore && team.members.length > 0 && (
                <div className="flex items-center gap-1.5">
                    <div
                        className="px-1.5 py-0.5"
                        style={{ backgroundColor: scoreMeta.color }}
                    >
                        <span className="font-press-start text-[7px] text-white">{scores.overall}</span>
                    </div>
                    <span className="font-nunito text-[10px] text-[#888888]">{scoreMeta.label}</span>
                </div>
            )}
        </div>
    );
}

// ── Variante horizontal compacta para la navbar ───────────────────────────────
export function TeamNavPreview({ team }: { team: PokemonTeam }) {
    const sorted = [...team.members].sort((a, b) => a.slot - b.slot);
    if (sorted.length === 0) return null;

    return (
        <div className="flex items-center gap-1">
            {sorted.slice(0, 3).map((m) => (
                <Image
                    key={m.slot}
                    src={PIXEL_URL(m.pokemonId)} alt={m.nameEs}
                    width={24} height={24}
                    unoptimized
                    className="object-contain" loading="lazy"
                />
            ))}
            {sorted.length > 3 && (
                <span className="font-press-start text-[7px] text-[#888888]">+{sorted.length - 3}</span>
            )}
        </div>
    );
}