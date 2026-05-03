"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import NumberFlow from "@number-flow/react";
import { MapPin, CalendarDays, ChevronRight, Map, BookOpen, Layers } from "lucide-react";
import { Region } from "@/types/api/location.types";
import {
    REGION_COLORS, REGION_NAMES_ES, REGION_DESCRIPTIONS,
    REGION_INSPIRATION, REGION_YEARS, REGION_GAMES,
} from "@/lib/constants/locations/locations.constants";

interface RegionCardProps {
    region: Region;
    index: number;
}

export function RegionCard({ region, index }: RegionCardProps) {
    const color = REGION_COLORS[region.name] ?? "#CC0000";
    const nameEs = REGION_NAMES_ES[region.name] ?? region.name;
    const description = REGION_DESCRIPTIONS[region.name] ?? "";
    const inspiration = REGION_INSPIRATION[region.name] ?? "";
    const year = REGION_YEARS[region.name] ?? "????";
    const games = REGION_GAMES[region.name] ?? [];

    const stats = [
        { label: "Locaciones", value: region.locations.length, Icon: Map },
        { label: "Pokédex", value: region.pokedexes.length, Icon: BookOpen },
        { label: "Versiones", value: region.version_groups.length, Icon: Layers },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
            style={{ "--region-color": color } as React.CSSProperties}
            className="h-full"
        >
            <Link 
                href={`/locations/${region.name}`} 
                className="block outline-none group h-full focus-visible:ring-4 focus-visible:ring-[#111111] focus-visible:ring-offset-4 transition-all"
                aria-label={`Ver detalles de la región de ${nameEs}`}
            >
                <motion.div
                    className="relative border-[4px] border-[#111111] bg-white overflow-hidden flex flex-col h-full shadow-[8px_8px_0_#111111]"
                    whileHover={{ x: -4, y: -4, boxShadow: "12px 12px 0 var(--region-color)" }}
                    transition={{ type: "spring", stiffness: 350, damping: 20 }}
                >
                    {/* ── TOP DOSSIER BAND ── */}
                    <div className="h-8 w-full bg-[var(--region-color)] flex items-center justify-between px-4 border-b-[4px] border-[#111111]">
                        <span className="font-['JetBrains_Mono'] font-bold text-[11px] text-white tracking-[0.2em] shadow-sm uppercase"> {/* Added uppercase just in case */}
                            {year}
                        </span>
                        <div className="flex gap-1">
                            <div className="w-2 h-2 rounded-full bg-white opacity-40" />
                            <div className="w-2 h-2 rounded-full bg-white opacity-70" />
                        </div>
                    </div>

                    <div className="p-6 md:p-8 flex flex-col flex-1 relative bg-[radial-gradient(#e5e5e5_1px,transparent_1px)] [background-size:16px_16px]">
                        
                        {/* ── GIANT WATERMARK ── */}
                        <div className="absolute top-12 right-0 md:-right-4 font-['Press_Start_2P'] text-[100px] md:text-[140px] leading-none opacity-[0.03] text-[#111111] select-none pointer-events-none z-0 overflow-hidden">
                            {nameEs.substring(0, 3)}
                        </div>

                        {/* ── HEADER ── */}
                        <div className="flex justify-between items-start mb-6 relative z-10 w-full">
                            <div className="inline-flex items-center gap-2 border-[3px] border-[#111111] px-4 py-2 bg-[#ffffff] shadow-[4px_4px_0_#111111]">
                                <MapPin size={16} className="text-[var(--region-color)]" />
                                <span className="font-['JetBrains_Mono'] font-extrabold text-[10px] md:text-[12px] text-[#111111] uppercase tracking-wider">{inspiration}</span>
                            </div>
                            {/* Decorative Brutalist Square */}
                            <div className="shrink-0 w-10 h-10 border-[4px] border-[#111111] bg-white relative overflow-hidden group-hover:bg-[var(--region-color)] transition-colors duration-300">
                                <div className="absolute inset-0 m-1.5 bg-[#111111] group-hover:bg-white transition-colors duration-300" />
                            </div>
                        </div>

                        {/* ── TITLE & DESCRIPTION ── */}
                        <div className="mb-8 relative z-10">
                            <h2 className="font-['Press_Start_2P'] text-[24px] md:text-[32px] text-[#111111] mb-4 leading-tight group-hover:text-[var(--region-color)] transition-colors duration-300">
                                {nameEs.toUpperCase()}
                            </h2>
                            <p className="font-['Nunito'] font-semibold text-[14px] md:text-[15px] text-[#444444] leading-relaxed line-clamp-3 md:line-clamp-2 pr-4 bg-white/60 p-2 border-l-4 border-transparent group-hover:border-[var(--region-color)] transition-all">
                                {description}
                            </p>
                        </div>

                        {/* ── SEPARATOR STRIP ── */}
                        <div className="w-full h-[6px] bg-[#111111] mb-8 relative overflow-hidden">
                            <motion.div 
                                className="absolute top-0 right-0 h-full w-1/3 bg-[var(--region-color)] origin-right"
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                            />
                        </div>

                        {/* ── STATS NODES ── */}
                        <div className="grid grid-cols-3 gap-3 md:gap-5 mb-8 mt-auto relative z-10">
                            {stats.map(({ label, value, Icon }, idx) => (
                                <motion.div 
                                    key={label} 
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + (idx * 0.1) }}
                                    className="border-[3px] border-[#111111] bg-white p-3 flex flex-col items-center justify-center gap-2 transition-transform group-hover:-translate-y-2 hover:!scale-105"
                                    style={{ boxShadow: "4px 4px 0 #111111" }}
                                >
                                    <div className="p-2 border-[2px] border-[#111111] rounded-full bg-[#f4f4f4] text-[#111111] group-hover:bg-[var(--region-color)] group-hover:text-white transition-colors">
                                        <Icon size={18} strokeWidth={2.5} />
                                    </div>
                                    <NumberFlow value={value} className="font-['Press_Start_2P'] text-[14px] md:text-[18px] text-[#111111] mt-1" />
                                    <span className="font-['JetBrains_Mono'] text-[9px] md:text-[10px] font-black text-[#555555] tracking-widest uppercase text-center mt-auto">
                                        {label}
                                    </span>
                                </motion.div>
                            ))}
                        </div>

                        {/* ── FOOTER GAMES & NAV ── */}
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pt-6 border-t-4 border-dotted border-[#cccccc] relative z-10">
                            <div className="flex flex-wrap gap-2">
                                {games.slice(0, 3).map((g) => (
                                    <span key={g} className="font-['Press_Start_2P'] text-[8px] md:text-[10px] px-3 py-2 border-[3px] border-[#111111] bg-white text-[#111111] shadow-[2px_2px_0_#111111] group-hover:bg-[#111111] group-hover:text-white transition-colors">
                                        {g}
                                    </span>
                                ))}
                                {games.length > 3 && (
                                    <span className="font-['Press_Start_2P'] text-[8px] md:text-[10px] px-3 py-2 border-[3px] border-[#111111] bg-[var(--region-color)] text-white shadow-[2px_2px_0_#111111]">
                                        +{games.length - 3}
                                    </span>
                                )}
                            </div>
                            
                            <div className="flex items-center gap-3 font-['Press_Start_2P'] text-[14px] text-[#111111] group-hover:text-[var(--region-color)] transition-colors self-end sm:self-auto shrink-0">
                                <span className="mt-1">ENTRAR</span>
                                <div className="w-10 h-10 border-[4px] border-[#111111] rounded-full flex items-center justify-center bg-[var(--region-color)] text-white shadow-[3px_3px_0_#111111] group-hover:scale-110 transition-transform">
                                    <ChevronRight size={20} strokeWidth={4} />
                                </div>
                            </div>
                        </div>

                    </div>
                </motion.div>
            </Link>
        </motion.div>
    );
}