"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import NumberFlow from "@number-flow/react";
import { Swords, Zap, Sparkles, MapPin, ChevronRight } from "lucide-react";
import { Generation } from "@/types/api/generation.types";
import {
    GENERATION_COLORS,
    GENERATION_ROMAN,
    GENERATION_NAMES_ES,
    GENERATION_YEARS,
    GENERATION_GAMES_ES,
    GENERATION_MASCOTS,
    GENERATIONS,
} from "@/lib/constants/generations/generations.constants";

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
    const showdownGif = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${mascot.id}.gif`;

    const stats = [
        { label: "Pokémon", value: generation.pokemon_species.length, Icon: Sparkles },
        { label: "Movimientos", value: generation.moves.length, Icon: Zap },
        { label: "Habilidades", value: generation.abilities.length, Icon: Swords },
    ];

    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                    opacity: 1, y: 0,
                    transition: { type: "spring", stiffness: 200, damping: 22, delay: (index % 9) * 0.07 }
                },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            style={{ "--gen-color": genColor } as React.CSSProperties}
            className="h-full"
        >
            <Link
                href={`/generations/${generation.name}`}
                className="block outline-none group h-full focus-visible:ring-4 focus-visible:ring-[#111111] focus-visible:ring-offset-4"
                aria-label={`Ver detalles de la ${nameEs}`}
            >
                <motion.div
                    className="relative border-[4px] border-[#111111] bg-white overflow-hidden flex h-full"
                    style={{ boxShadow: "8px 8px 0 #111111" }}
                    whileHover={{ x: -4, y: -4, boxShadow: `12px 12px 0 ${genColor}` }}
                    transition={{ type: "spring", stiffness: 350, damping: 22 }}
                >
                    {/* ── FRANJA IZQUIERDA del color de la gen ── */}
                    <div
                        className="w-[14px] flex-shrink-0 flex flex-col items-center justify-between py-4 border-r-[4px] border-[#111111] relative overflow-hidden"
                        style={{ backgroundColor: genColor }}
                    >
                        {/* Número romano vertical */}
                        <span
                            className="font-['Press_Start_2P'] text-[8px] text-white opacity-80 writing-mode-vertical"
                            style={{ writingMode: "vertical-rl", textOrientation: "mixed", letterSpacing: "0.15em" }}
                        >
                            {roman}
                        </span>
                        {/* Año vertical */}
                        <span
                            className="font-['JetBrains_Mono'] text-[7px] text-white/60 font-bold"
                            style={{ writingMode: "vertical-rl" }}
                        >
                            {year}
                        </span>
                    </div>

                    {/* ── CUERPO PRINCIPAL ── */}
                    <div className="flex flex-col flex-1 relative">

                        {/* Marca de agua romana gigante */}
                        <div
                            className="absolute bottom-[-16px] right-[-8px] font-['Press_Start_2P'] text-[120px] leading-none select-none pointer-events-none z-0 transition-opacity duration-300 group-hover:opacity-[0.06]"
                            style={{ color: genColor, opacity: 0.035 }}
                        >
                            {roman}
                        </div>

                        {/* ── ZONA SUPERIOR: Mascota + Info ── */}
                        <div
                            className="flex items-stretch min-h-[160px] border-b-[4px] border-[#111111] relative z-10"
                            style={{ background: `linear-gradient(135deg, ${genColor}14 0%, white 60%)` }}
                        >
                            {/* Mascota */}
                            <div className="relative w-[140px] sm:w-[170px] flex-shrink-0 flex items-end justify-center border-r-[4px] border-dashed border-[#DDDDDD] pb-0 overflow-hidden">
                                {/* Sombra suelo */}
                                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[80%] h-[12px] bg-black/10 rounded-full blur-[5px]" />
                                
                                <motion.div
                                    className="relative w-[100px] h-[115px] sm:w-[120px] sm:h-[130px] z-10"
                                    animate={{ y: [0, -8, 0] }}
                                    transition={{ duration: 3 + index * 0.2, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <Image
                                        src={showdownGif}
                                        alt={mascot.name}
                                        fill
                                        className="object-contain object-bottom drop-shadow-[0_8px_12px_rgba(0,0,0,0.18)] group-hover:scale-105 transition-transform duration-500"
                                        unoptimized
                                        onError={(e) => { e.currentTarget.src = artworkUrl; }}
                                    />
                                </motion.div>

                                {/* Chip del nombre de mascota */}
                                <div
                                    className="absolute top-3 left-3 px-1.5 py-0.5 border-[2px] border-[#111111] text-white font-['Press_Start_2P'] text-[7px] z-20 shadow-[2px_2px_0_#111]"
                                    style={{ backgroundColor: genColor }}
                                >
                                    #{String(mascot.id).padStart(3, "0")}
                                </div>
                            </div>

                            {/* Info principal */}
                            <div className="flex flex-col justify-between p-4 sm:p-5 flex-1 min-w-0">
                                {/* Roman + región */}
                                <div className="flex items-center gap-2 mb-2">
                                    <div
                                        className="px-2.5 py-1 border-[3px] border-[#111111] bg-white font-['Press_Start_2P'] text-[10px] leading-none shadow-[2px_2px_0_#111]"
                                        style={{ color: genColor }}
                                    >
                                        GEN {roman}
                                    </div>
                                    <div className="flex items-center gap-1 text-[#888]">
                                        <MapPin size={11} />
                                        <span className="font-['Nunito'] font-black text-[11px] uppercase tracking-widest truncate">{region}</span>
                                    </div>
                                </div>

                                {/* Nombre región */}
                                <h2 className="font-['Press_Start_2P'] text-[15px] sm:text-[18px] text-[#111111] leading-tight uppercase group-hover:text-current transition-colors duration-300 mb-1" style={{ color: "inherit" }}>
                                    <span className="group-hover:text-[var(--gen-color)] transition-colors duration-300">
                                        {nameEs.toUpperCase()}
                                    </span>
                                </h2>
                                <p className="font-['JetBrains_Mono'] font-bold text-[11px] text-[#AAAAAA] mb-3">{year}</p>

                                {/* Juegos */}
                                <div className="flex flex-wrap gap-1.5 mt-auto">
                                    {games.slice(0, 3).map((g) => (
                                        <span
                                            key={g}
                                            className="font-['Press_Start_2P'] text-[7px] px-2 py-1.5 border-[2px] border-[#111111] bg-white text-[#111111] group-hover:bg-[#111111] group-hover:text-white transition-all"
                                            style={{ boxShadow: "2px 2px 0 #111111" }}
                                        >
                                            {g}
                                        </span>
                                    ))}
                                    {games.length > 3 && (
                                        <span
                                            className="font-['Press_Start_2P'] text-[7px] px-2 py-1.5 border-[2px] border-[#111111] text-white"
                                            style={{ backgroundColor: genColor, boxShadow: "2px 2px 0 #111111" }}
                                        >
                                            +{games.length - 3}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* ── STATS GRID ── */}
                        <div className="grid grid-cols-3 divide-x-[4px] divide-[#111111] relative z-10">
                            {stats.map(({ label, value, Icon }, idx) => (
                                <div
                                    key={label}
                                    className="flex flex-col items-center justify-center py-4 px-2 gap-1 group-hover:bg-[#F9F9F9] transition-colors border-b-[4px] border-[#111111]"
                                    style={{ borderColor: "#111111" }}
                                >
                                    <Icon size={14} style={{ color: genColor }} />
                                    <NumberFlow
                                        value={value}
                                        className="font-['Press_Start_2P'] text-[13px] sm:text-[15px] text-[#111111]"
                                    />
                                    <span className="font-['JetBrains_Mono'] font-bold text-[8px] text-[#999999] uppercase tracking-widest text-center">
                                        {label}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* ── FOOTER CTA ── */}
                        <div className="flex items-center justify-between px-5 py-3 relative z-10">
                            <span className="font-['JetBrains_Mono'] text-[10px] font-bold text-[#AAAAAA] uppercase tracking-widest">
                                /generations/{roman.toLowerCase()}
                            </span>
                            <div className="flex items-center gap-2 font-['Press_Start_2P'] text-[10px] text-[#111111] group-hover:text-[var(--gen-color)] transition-colors">
                                <span className="hidden sm:inline">VER</span>
                                <motion.div
                                    className="w-9 h-9 border-[3px] border-[#111111] flex items-center justify-center text-white shrink-0"
                                    style={{ backgroundColor: genColor, boxShadow: "3px 3px 0 #111111" }}
                                    whileHover={{ scale: 1.15 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                                >
                                    <ChevronRight size={18} strokeWidth={3} />
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </Link>
        </motion.div>
    );
}