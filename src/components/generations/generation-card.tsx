"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import NumberFlow from "@number-flow/react";
import { Swords, Zap, Sparkles, MapPin, CalendarDays, ChevronRight } from "lucide-react";
import { Generation } from "@/types/api/generation.types";
import {
    GENERATION_COLORS,
    GENERATION_ROMAN,
    GENERATION_NAMES_ES,
    GENERATION_YEARS,
    GENERATION_GAMES_ES,
    GENERATION_MASCOTS,
    GENERATIONS,
} from "@/lib/constants/generations.constants";

interface GenerationCardProps {
    generation: Generation;
    index: number;
}

export function GenerationCard({ generation, index }: GenerationCardProps) {
    const genColor = GENERATION_COLORS[generation.name] ?? "#CC0000";
    const roman = GENERATION_ROMAN[generation.name] ?? "?";
    const nameEs = GENERATION_NAMES_ES[generation.name] ?? generation.name;
    const year = GENERATION_YEARS[generation.name] ?? "????";
    const games = GENERATION_GAMES_ES[generation.name] ?? [];
    const mascot = GENERATION_MASCOTS[generation.name] ?? { name: "Pikachu", id: 25 };
    const genStatic = GENERATIONS.find((g) => g.name === generation.name);
    const region = genStatic?.region ?? "";

    const artworkUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${mascot.id}.png`;

    // 3 stats del card
    const stats = [
        { label: "Pokémon", value: generation.pokemon_species.length, Icon: Sparkles },
        { label: "Moves", value: generation.moves.length, Icon: Zap },
        { label: "Habilidades", value: generation.abilities.length, Icon: Swords },
    ];

    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
                visible: {
                    opacity: 1, clipPath: "inset(0 0% 0 0)",
                    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: (index % 9) * 0.07 }
                },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
        >
            <Link href={`/generations/${generation.name}`} className="block outline-none group">
                <motion.div
                    className="relative border-2 border-[#111111] bg-white overflow-hidden cursor-pointer"
                    style={{ boxShadow: `4px 4px 0 ${genColor}` }}
                    whileHover={{ x: 4, y: 4, boxShadow: "0px 0px 0 transparent" }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                    {/* Franja lateral izquierda del color de generación */}
                    <div
                        className="absolute left-0 top-0 bottom-0 w-[5px]"
                        style={{ backgroundColor: genColor }}
                    />

                    {/* Número romano watermark */}
                    <div
                        className="absolute -bottom-4 -right-3 font-press-start text-[90px] leading-none select-none pointer-events-none"
                        style={{ color: "#111111", opacity: 0.035 }}
                    >
                        {roman}
                    </div>

                    <div className="pl-5 pr-4 pt-4 pb-4">
                        {/* ── TOP ROW: año + región ── */}
                        <div className="flex items-center gap-2 mb-3">
                            <div
                                className="flex items-center gap-1 px-2 py-0.5 border"
                                style={{ borderColor: genColor, backgroundColor: `${genColor}14` }}
                            >
                                <CalendarDays size={10} style={{ color: genColor }} />
                                <span className="font-jetbrains text-[10.5px] font-bold" style={{ color: genColor }}>{year}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: genColor }} />
                                <span className="font-nunito font-bold text-[12.5px] text-[#888888] uppercase tracking-wide">{region}</span>
                            </div>
                            <MapPin size={10} className="text-[#888888]" />
                        </div>

                        {/* ── NOMBRE + MASCOT ── */}
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                                <p
                                    className="font-press-start text-[10.5px] mb-1.5"
                                    style={{ color: genColor }}
                                >
                                    {nameEs.toUpperCase()}
                                </p>
                                <h2 className="font-press-start text-[15.5px] text-[#111111] leading-tight">
                                    {region.toUpperCase()}
                                </h2>
                            </div>

                            {/* Mascot sprite */}
                            <motion.div
                                className="relative w-[72px] h-[72px] shrink-0"
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 3 + index * 0.2, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <Image
                                    src={artworkUrl}
                                    alt={mascot.name}
                                    fill
                                    className="object-contain drop-shadow-sm"
                                    style={{ filter: `drop-shadow(0 4px 8px ${genColor}55)` }}
                                />
                            </motion.div>
                        </div>

                        {/* ── SEPARADOR DOBLE ── */}
                        <div className="my-3 relative h-[5px]">
                            <motion.div
                                className="absolute top-0 left-0 w-full h-[3px] bg-[#111111] origin-left"
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                            />
                            <motion.div
                                className="absolute bottom-0 right-0 w-full h-[2px] origin-right"
                                style={{ backgroundColor: genColor }}
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.35, delay: 0.18 + index * 0.05 }}
                            />
                        </div>

                        {/* ── STATS 3 BOXES ── */}
                        <div className="grid grid-cols-3 gap-2 mb-3">
                            {stats.map(({ label, value, Icon }) => (
                                <div
                                    key={label}
                                    className="border border-[#E0E0E0] px-2 py-2 flex flex-col items-center gap-1 bg-[#FAFAFA]"
                                >
                                    <Icon size={12} className="text-[#888888]" />
                                    <NumberFlow
                                        value={value}
                                        className="font-press-start text-[15.5px] text-[#111111]"
                                    />
                                    <span className="font-nunito text-[10.5px] font-bold text-[#888888] uppercase tracking-wide">{label}</span>
                                </div>
                            ))}
                        </div>

                        {/* ── JUEGOS CHIPS ── */}
                        <div className="flex flex-wrap gap-1.5 items-center justify-between">
                            <div className="flex flex-wrap gap-1">
                                {games.slice(0, 3).map((g) => (
                                    <span
                                        key={g}
                                        className="font-press-start text-[8.5px] px-2.5 py-1.5 border border-[#E0E0E0] bg-[#F2F2F2] group-hover:border-[#111111] transition-colors"
                                    >
                                        {g}
                                    </span>
                                ))}
                                {games.length > 3 && (
                                    <span
                                        className="font-press-start text-[8.5px] px-2 py-1 border border-[#E0E0E0]"
                                        style={{ color: genColor }}
                                    >
                                        +{games.length - 3}
                                    </span>
                                )}
                            </div>
                            <span
                                className="font-nunito font-bold text-[12.5px] flex items-center gap-0.5 transition-colors"
                                style={{ color: genColor }}
                            >
                                Ver gen <ChevronRight size={13} />
                            </span>
                        </div>
                    </div>
                </motion.div>
            </Link>
        </motion.div>
    );
}