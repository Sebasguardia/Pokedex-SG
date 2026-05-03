"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CalendarDays, MapPin, Layers, ChevronRight, Sparkles, BookOpen, Map } from "lucide-react";
import NumberFlow from "@number-flow/react";
import { Region } from "@/types/api/location.types";
import { GENERATION_ROMAN } from "@/lib/constants/generations/generations.constants";

interface RegionDetailHeroProps {
    region: Region;
    regionColor: string;
    nameEs: string;
    description: string;
    inspiration: string;
    year: string;
    games: string[];
    generation: string;
    pokedexCount?: number;
}

export function RegionDetailHero({
    region, regionColor, nameEs, description, inspiration,
    year, games, generation, pokedexCount,
}: RegionDetailHeroProps) {
    const roman = GENERATION_ROMAN[generation] ?? "?";

    const heroStats = [
        { label: "Locaciones", value: region.locations.length, Icon: Map },
        { label: "Pokémon", value: pokedexCount ?? null, Icon: Sparkles },
        { label: "Pokédex", value: region.pokedexes.length, Icon: BookOpen },
        { label: "Versiones", value: region.version_groups.length, Icon: Layers },
    ];

    return (
        <div className="relative overflow-hidden border-b-4 border-[#111111]" style={{ backgroundColor: regionColor }}>
            {/* Pattern de puntos oscuros */}
            <div
                className="absolute inset-0 opacity-[0.1]"
                style={{ backgroundImage: "radial-gradient(#111111 2px, transparent 2px)", backgroundSize: "32px 32px" }}
            />

            {/* Nombre watermark GIGANTE oscurecido */}
            <motion.div
                className="absolute right-[-20px] top-1/2 -translate-y-1/2 font-['Press_Start_2P'] leading-none select-none pointer-events-none text-[#111111] uppercase whitespace-nowrap"
                style={{ fontSize: "clamp(80px, 14vw, 150px)", opacity: 0 }}
                animate={{ opacity: 0.15 }}
                initial={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
            >
                {nameEs}
            </motion.div>

            <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 py-10">
                {/* Breadcrumb */}
                <motion.div
                    className="flex items-center gap-2 mb-8"
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}
                >
                    <Link href="/locations" className="font-['Press_Start_2P'] text-[9px] text-[#111111] bg-white px-3 py-1.5 border-2 border-[#111111] hover:bg-[#111111] hover:text-white transition-colors" style={{ boxShadow: "3px 3px 0 rgba(0,0,0,0.5)" }}>
                        LOCACIONES
                    </Link>
                    <ChevronRight size={14} className="text-[#111111]" />
                    <span className="font-['Press_Start_2P'] text-[9px] text-white bg-[#111111] px-3 py-1.5 border-2 border-[#111111] shadow-[3px_3px_0_rgba(255,255,255,0.3)]">{nameEs.toUpperCase()}</span>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    {/* ── IZQUIERDA ── */}
                    <div className="flex-1 min-w-0">
                        {/* Chips de metadata */}
                        <motion.div
                            className="flex flex-wrap gap-3 mb-6"
                            initial="hidden" animate="visible"
                            variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
                        >
                            {[
                                { Icon: CalendarDays, text: year, accent: false },
                                { Icon: MapPin, text: inspiration, accent: false },
                                { Icon: Layers, text: `GEN ${roman}`, href: `/generations/${generation}`, accent: true },
                            ].map(({ Icon, text, accent, href }) => {
                                const cls = "flex items-center gap-2 px-3 py-2 border-2 border-[#111111]";
                                const style = {
                                    backgroundColor: accent ? "#111111" : "#ffffff",
                                    color: accent ? "#ffffff" : "#111111",
                                    boxShadow: "3px 3px 0 rgba(0,0,0,0.4)"
                                };
                                const inner = (
                                    <motion.div
                                        key={text}
                                        variants={{ hidden: { opacity: 0, y: -8 }, visible: { opacity: 1, y: 0 } }}
                                        className={cls} style={style}
                                    >
                                        <Icon size={13} />
                                        <span className="font-['Press_Start_2P'] text-[8px] uppercase">{text}</span>
                                    </motion.div>
                                );
                                return href ? <Link key={text} href={href}>{inner}</Link> : inner;
                            })}
                        </motion.div>

                        {/* Título — letras caen con spring */}
                        <div className="overflow-hidden mb-6">
                            <div className="flex flex-wrap gap-x-2">
                                {nameEs.toUpperCase().split("").map((char, i) => (
                                    <motion.span
                                        key={i}
                                        className="font-['Press_Start_2P'] text-white"
                                        style={{ fontSize: "clamp(32px, 6vw, 56px)", textShadow: "4px 4px 0 #111111" }}
                                        initial={{ y: -40, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ type: "spring", stiffness: 320, damping: 15, delay: i * 0.05 }}
                                    >
                                        {char === " " ? "\u00A0" : char}
                                    </motion.span>
                                ))}
                            </div>
                        </div>

                        {/* Descripción */}
                        <motion.p
                            className="font-['Nunito'] font-black text-[15px] leading-relaxed max-w-[500px] mb-6 p-4 border-2 border-[#111111] bg-white text-[#111111]"
                            style={{ boxShadow: "5px 5px 0 #111111" }}
                            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}
                        >
                            {description}
                        </motion.p>

                        {/* Chips de juegos */}
                        <motion.div
                            className="flex flex-wrap gap-2"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                        >
                            {games.map((g) => (
                                <span
                                    key={g}
                                    className="font-['Press_Start_2P'] text-[8px] px-3 py-2 border-2 border-[#111111] bg-[#111111] text-white"
                                    style={{ boxShadow: "3px 3px 0 rgba(255,255,255,0.3)" }}
                                >
                                    {g}
                                </span>
                            ))}
                        </motion.div>
                    </div>

                    {/* ── DERECHA: stats verticales ── */}
                    <motion.div
                        className="flex flex-row lg:flex-col gap-3 flex-wrap"
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
                    >
                        {heroStats.map(({ label, value, Icon }, i) => (
                            <motion.div
                                key={label}
                                className="flex items-center gap-4 px-4 py-3 border-2 border-[#111111] min-w-[180px] bg-white text-[#111111]"
                                style={{ boxShadow: "4px 4px 0 #111111" }}
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.35 + i * 0.07 }}
                            >
                                <div className="w-10 h-10 flex items-center justify-center shrink-0 border-2 border-[#111111]"
                                    style={{ backgroundColor: regionColor }}>
                                    <Icon size={18} className="text-[#111111]" />
                                </div>
                                <div className="flex flex-col">
                                    {value !== null ? (
                                        <NumberFlow
                                            value={value as number}
                                            className="font-['Press_Start_2P'] text-[16px] text-[#111111] block mb-1"
                                        />
                                    ) : (
                                        <span className="font-['Press_Start_2P'] text-[16px] text-[#888888] block mb-1">—</span>
                                    )}
                                    <span className="font-['Press_Start_2P'] text-[7px] text-[#888888]">{label.toUpperCase()}</span>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}