"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Plus, Check } from "lucide-react";
import { PoolPokemon } from "@/types/api/team-builder.types";
import {
    TYPE_COLORS, PIXEL_URL,
} from "@/lib/constants/team-builder/team-builder.constants";
import { TypeBadgeTeam } from "./type-badge-team";
import { PokemonSprite } from "@/components/shared/pokemon/pokemon-sprite";

type CardLayout = "grid" | "list";

interface PokemonPoolCardProps {
    pokemon: PoolPokemon;
    layout: CardLayout;
    isInTeam: boolean;
    isRecommended: boolean;   // verde dot = útil para el equipo
    onAdd: () => void;
}

export function PokemonPoolCard({
    pokemon, layout, isInTeam, isRecommended, onAdd,
}: PokemonPoolCardProps) {
    const primaryColor = TYPE_COLORS[pokemon.types[0]] ?? "#888888";

    if (layout === "list") {
        return (
            <motion.div
                onClick={!isInTeam ? onAdd : undefined}
                className="w-full flex items-center gap-3 px-4 py-2.5 border-b border-[#F0F0F0] transition-colors"
                style={{
                    backgroundColor: isInTeam ? "#F8F8F8" : "white",
                    cursor: isInTeam ? "not-allowed" : "pointer",
                    opacity: isInTeam ? 0.5 : 1,
                }}
                whileHover={!isInTeam ? { backgroundColor: `${primaryColor}0A` } : {}}
            >
                {/* Recomendado dot */}
                {isRecommended && !isInTeam && (
                    <div className="w-2 h-2 rounded-full bg-[#22C55E] shrink-0" title="Recomendado para tu equipo" />
                )}

                <PokemonSprite
                    id={pokemon.id}
                    name={pokemon.nameEs}
                    size={32}
                    className="shrink-0"
                />

                {/* ID */}
                <span className="font-jetbrains text-[10px] text-[#AAAAAA] shrink-0 w-[36px]">
                    #{String(pokemon.id).padStart(3, "0")}
                </span>

                <span className="font-nunito font-bold text-[13px] text-[#111111] flex-1 truncate capitalize">
                    {pokemon.nameEs}
                </span>

                {/* Tipos */}
                <div className="flex gap-1 shrink-0">
                    {pokemon.types.map((t) => (
                        <TypeBadgeTeam key={t} type={t} variant="solid" size="xs" />
                    ))}
                </div>

                {/* BST */}
                <span className="font-jetbrains text-[11px] text-[#888888] shrink-0 w-[52px] text-right">
                    {pokemon.bst}
                </span>

                {/* Add / In team */}
                <div className="shrink-0 w-7 flex items-center justify-center">
                    {isInTeam ? (
                        <Check size={14} className="text-[#22C55E]" />
                    ) : (
                        <Plus size={14} className="text-[#888888]" />
                    )}
                </div>
            </motion.div>
        );
    }

    // ── GRID CARD ─────────────────────────────────────────────────────────────
    return (
        <motion.div
            onClick={!isInTeam ? onAdd : undefined}
            className="relative border flex flex-col items-center p-2 overflow-hidden transition-all"
            style={{
                borderColor: isInTeam ? "#E0E0E0" : isRecommended ? primaryColor : "#E0E0E0",
                borderWidth: isRecommended && !isInTeam ? 2 : 1,
                backgroundColor: isInTeam ? "#F5F5F5" : "white",
                cursor: isInTeam ? "not-allowed" : "pointer",
                opacity: isInTeam ? 0.55 : 1,
            }}
            whileHover={!isInTeam ? {
                borderColor: "#111111",
                borderWidth: 2,
                boxShadow: `2px 2px 0 ${primaryColor}`,
                y: -2,
            } : {}}
            whileTap={!isInTeam ? { scale: 0.97 } : {}}
        >
            {/* Recomendado dot */}
            {isRecommended && !isInTeam && (
                <div
                    className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: "#22C55E" }}
                    title="Útil para tu equipo"
                />
            )}

            {/* En equipo overlay */}
            {isInTeam && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/60 z-10">
                    <Check size={18} className="text-[#888888]" />
                </div>
            )}

            {/* Sprite */}
            <PokemonSprite
                id={pokemon.id}
                name={pokemon.nameEs}
                size={48}
            />

            {/* Nombre */}
            <p className="font-nunito font-bold text-[10px] text-[#111111] text-center truncate w-full leading-tight mt-0.5 px-0.5">
                {pokemon.nameEs}
            </p>

            {/* Tipo dots */}
            <div className="flex gap-1 mt-0.5">
                {pokemon.types.map((t) => (
                    <div key={t} className="w-2 h-2 rounded-full" style={{ backgroundColor: TYPE_COLORS[t] }} />
                ))}
            </div>

            {/* ID + BST */}
            <div className="flex items-center justify-between w-full mt-1 px-0.5">
                <span className="font-jetbrains text-[8px] text-[#AAAAAA]">
                    #{String(pokemon.id).padStart(3, "0")}
                </span>
                <span className="font-jetbrains text-[8px] text-[#AAAAAA]">{pokemon.bst}</span>
            </div>
        </motion.div>
    );
}