"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CalendarDays, MapPin, Layers, ChevronRight, Sparkles, BookOpen, Map } from "lucide-react";
import NumberFlow from "@number-flow/react";
import { Region } from "@/types/api/location.types";
import { GENERATION_ROMAN } from "@/lib/constants/generations.constants";

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
        <div className="relative bg-[#111111] overflow-hidden">
            {/* Dot grid */}
            <div
                className="absolute inset-0 opacity-[0.035] pointer-events-none"
                style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "28px 28px" }}
            />

            {/* Scanline animada */}
            <motion.div
                className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none"
                style={{ backgroundColor: regionColor }}
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 8, ease: "easeInOut" }}
            />

            {/* Nombre watermark GIGANTE */}
            <motion.div
                className="absolute right-[-10px] top-1/2 -translate-y-1/2 font-press-start leading-none select-none pointer-events-none text-white uppercase whitespace-nowrap"
                style={{ fontSize: "clamp(80px, 14vw, 150px)", opacity: 0 }}
                animate={{ opacity: 0.03 }}
                initial={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
            >
                {nameEs}
            </motion.div>

            <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 py-10">
                {/* Breadcrumb */}
                <motion.div
                    className="flex items-center gap-1.5 mb-6"
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}
                >
                    <Link href="/locations" className="font-nunito text-[11px] text-[#888888] hover:text-white transition-colors">
                        Locaciones
                    </Link>
                    <ChevronRight size={10} className="text-[#555555]" />
                    <span className="font-nunito text-[11px] text-white">{nameEs}</span>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    {/* ── IZQUIERDA ── */}
                    <div className="flex-1 min-w-0">
                        {/* Chips de metadata */}
                        <motion.div
                            className="flex flex-wrap gap-2 mb-5"
                            initial="hidden" animate="visible"
                            variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
                        >
                            {[
                                { Icon: CalendarDays, text: year },
                                { Icon: MapPin, text: inspiration, accent: true },
                                { Icon: Layers, text: `Gen ${roman}`, href: `/generations/${generation}` },
                            ].map(({ Icon, text, accent, href }) => {
                                const cls = "flex items-center gap-1.5 px-3 py-1.5 border";
                                const style = {
                                    borderColor: accent ? regionColor : "rgba(255,255,255,0.15)",
                                    backgroundColor: "rgba(255,255,255,0.05)",
                                    color: accent ? regionColor : "rgba(255,255,255,0.85)",
                                };
                                const inner = (
                                    <motion.div
                                        key={text}
                                        variants={{ hidden: { opacity: 0, y: -8 }, visible: { opacity: 1, y: 0 } }}
                                        className={cls} style={style}
                                    >
                                        <Icon size={11} />
                                        <span className="font-nunito font-bold text-[11px]">{text}</span>
                                    </motion.div>
                                );
                                return href ? <Link key={text} href={href}>{inner}</Link> : inner;
                            })}
                        </motion.div>

                        {/* Título — letras caen con spring */}
                        <div className="overflow-hidden mb-4">
                            <div className="flex flex-wrap gap-x-3">
                                {nameEs.toUpperCase().split("").map((char, i) => (
                                    <motion.span
                                        key={i}
                                        className="font-press-start text-white leading-tight"
                                        style={{ fontSize: "clamp(24px, 5vw, 38px)" }}
                                        initial={{ y: -30, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ type: "spring", stiffness: 320, damping: 20, delay: i * 0.045 }}
                                    >
                                        {char === " " ? "\u00A0" : char}
                                    </motion.span>
                                ))}
                            </div>
                        </div>

                        {/* Descripción */}
                        <motion.p
                            className="font-nunito text-[13px] leading-relaxed max-w-[480px] mb-5"
                            style={{ color: "rgba(255,255,255,0.6)" }}
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                        >
                            {description}
                        </motion.p>

                        {/* Chips de juegos */}
                        <motion.div
                            className="flex flex-wrap gap-1.5"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                        >
                            {games.map((g) => (
                                <span
                                    key={g}
                                    className="font-press-start text-[7px] px-2.5 py-1.5 border"
                                    style={{ borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.65)" }}
                                >
                                    {g}
                                </span>
                            ))}
                        </motion.div>
                    </div>

                    {/* ── DERECHA: stats verticales ── */}
                    <motion.div
                        className="flex flex-row lg:flex-col gap-2 flex-wrap"
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
                    >
                        {heroStats.map(({ label, value, Icon }, i) => (
                            <motion.div
                                key={label}
                                className="flex items-center gap-3 px-4 py-3 border min-w-[150px]"
                                style={{ borderColor: "rgba(255,255,255,0.12)", backgroundColor: "rgba(255,255,255,0.04)" }}
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.35 + i * 0.07 }}
                            >
                                <div className="w-7 h-7 flex items-center justify-center shrink-0"
                                    style={{ backgroundColor: `${regionColor}22` }}>
                                    <Icon size={14} style={{ color: regionColor }} />
                                </div>
                                <div>
                                    {value !== null ? (
                                        <NumberFlow
                                            value={value as number}
                                            className="font-press-start text-[14px] text-white block"
                                        />
                                    ) : (
                                        <span className="font-press-start text-[14px] text-[#555555] block">—</span>
                                    )}
                                    <span className="font-nunito text-[10px] text-[#888888] uppercase tracking-wide">{label}</span>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Separador doble invertido */}
            <div className="relative h-[5px]">
                <motion.div
                    className="absolute top-0 left-0 w-full h-[2px] origin-left"
                    style={{ backgroundColor: regionColor }}
                    initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.5, delay: 0.4 }}
                />
                <motion.div
                    className="absolute bottom-0 right-0 w-full h-[3px] bg-[#111111] origin-right"
                    initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.4, delay: 0.5 }}
                />
            </div>
        </div>
    );
}