"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, Gamepad2, Sparkles, ChevronRight } from "lucide-react";
import { Generation } from "@/types/api/generation.types";

interface GenerationDetailHeroProps {
    generation: Generation;
    genColor: string;
    roman: string;
    nameEs: string;
    mascot: { name: string; id: number };
    year: string;
    games: string[];
    region: string;
}

export function GenerationDetailHero({
    generation, genColor, roman, nameEs, mascot, year, games, region,
}: GenerationDetailHeroProps) {
    const artworkUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${mascot.id}.png`;

    const chips = [
        { Icon: CalendarDays, text: year },
        { Icon: MapPin, text: region, accent: true },
        { Icon: Gamepad2, text: games.slice(0, 2).join(" · ") },
        { Icon: Sparkles, text: `${generation.pokemon_species.length} Pokémon` },
    ];

    return (
        <div className="relative bg-[#111111] overflow-hidden">
            {/* Dot grid */}
            <div
                className="absolute inset-0 opacity-[0.035] pointer-events-none"
                style={{
                    backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                }}
            />

            {/* Scanline del color de generación */}
            <motion.div
                className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none"
                style={{ backgroundColor: genColor }}
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 7, ease: "easeInOut" }}
            />

            {/* Número romano watermark GIGANTE */}
            <motion.div
                className="absolute right-[-20px] top-1/2 -translate-y-1/2 font-press-start leading-none select-none pointer-events-none text-white"
                style={{ fontSize: "180px", opacity: 0 }}
                animate={{ opacity: 0.03, scale: 1 }}
                initial={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                {roman}
            </motion.div>

            <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 py-10">
                {/* Breadcrumb */}
                <motion.div
                    className="flex items-center gap-1.5 mb-6"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <Link href="/generations" className="font-nunito text-[12.5px] text-[#888888] hover:text-white transition-colors">
                        Generaciones
                    </Link>
                    <ChevronRight size={12} className="text-[#555555]" />
                    <span className="font-nunito text-[12.5px] text-white">{nameEs}</span>
                </motion.div>

                <div className="flex flex-col md:flex-row gap-8 items-start">
                    {/* ── LEFT ── */}
                    <div className="flex-1 min-w-0">
                        {/* Chips de metadata */}
                        <motion.div
                            className="flex flex-wrap gap-2 mb-5"
                            initial="hidden"
                            animate="visible"
                            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
                        >
                            {chips.map(({ Icon, text, accent }) => (
                                <motion.div
                                    key={text}
                                    variants={{
                                        hidden: { opacity: 0, y: -8 },
                                        visible: { opacity: 1, y: 0 },
                                    }}
                                    className="flex items-center gap-1.5 px-3 py-1.5 border"
                                    style={{
                                        borderColor: accent ? genColor : "rgba(255,255,255,0.15)",
                                        backgroundColor: "rgba(255,255,255,0.05)",
                                        color: accent ? genColor : "rgba(255,255,255,0.85)",
                                    }}
                                >
                                    <Icon size={12} />
                                    <span className="font-nunito font-bold text-[12.5px]">{text}</span>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Título por palabras */}
                        <div className="overflow-hidden mb-2">
                            <motion.p
                                className="font-press-start text-[11px] mb-2"
                                style={{ color: genColor }}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                            >
                                {roman}
                            </motion.p>
                            <div className="flex flex-wrap gap-x-3">
                                {nameEs.split(" ").map((word, i) => (
                                    <motion.span
                                        key={i}
                                        className="font-press-start text-[26px] md:text-[36px] text-white leading-tight"
                                        initial={{ y: -30, opacity: 0, rotate: i % 2 === 0 ? -6 : 6 }}
                                        animate={{ y: 0, opacity: 1, rotate: 0 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20, delay: i * 0.1 }}
                                    >
                                        {word}
                                    </motion.span>
                                ))}
                            </div>
                        </div>

                        {/* Juegos chips */}
                        <motion.div
                            className="flex flex-wrap gap-1.5 mt-5"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            {games.map((g) => (
                                <span
                                    key={g}
                                    className="font-press-start text-[8.5px] px-3 py-1.5 border"
                                    style={{ borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)" }}
                                >
                                    {g}
                                </span>
                            ))}
                        </motion.div>
                    </div>

                    {/* ── RIGHT: mascot sprite ── */}
                    <motion.div
                        className="relative shrink-0 self-center"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <motion.div
                            className="relative w-[170px] h-[170px] md:w-[200px] md:h-[200px]"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <Image
                                src={artworkUrl}
                                alt={mascot.name}
                                fill
                                className="object-contain"
                                style={{ filter: `drop-shadow(0 8px 24px ${genColor}88)` }}
                                priority
                            />
                        </motion.div>
                        <p
                            className="text-center font-jetbrains text-[10px] mt-1 opacity-50"
                            style={{ color: genColor }}
                        >
                            {mascot.name.toUpperCase()}
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Separador doble INVERTIDO (rojo encima, negro abajo) */}
            <div className="relative h-[5px]">
                <motion.div
                    className="absolute top-0 left-0 w-full h-[2px] origin-left"
                    style={{ backgroundColor: genColor }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                />
                <motion.div
                    className="absolute bottom-0 right-0 w-full h-[3px] bg-[#111111] origin-right"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                />
            </div>
        </div>
    );
}