"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import NumberFlow from "@number-flow/react";
import { MapPin, CalendarDays, ChevronRight, Map, BookOpen, Layers } from "lucide-react";
import { Region } from "@/types/api/location.types";
import {
    REGION_COLORS, REGION_NAMES_ES, REGION_DESCRIPTIONS,
    REGION_INSPIRATION, REGION_YEARS, REGION_GAMES,
} from "@/lib/constants/locations.constants";

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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: index * 0.07 }}
        >
            <Link href={`/locations/${region.name}`} className="block outline-none group">
                <motion.div
                    className="relative border-2 border-[#111111] bg-white overflow-hidden cursor-pointer"
                    style={{ boxShadow: "4px 4px 0 #111111" }}
                    whileHover={{ x: 4, y: 4, boxShadow: "0px 0px 0 transparent" }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                    {/* Franja top del color de región */}
                    <div className="h-[4px]" style={{ backgroundColor: color }} />

                    {/* Nombre watermark ENORME */}
                    <div
                        className="absolute bottom-1 right-2 font-press-start leading-none select-none pointer-events-none uppercase"
                        style={{ fontSize: "70px", color: color, opacity: 0.04 }}
                    >
                        {nameEs}
                    </div>

                    <div className="p-5">
                        {/* ── TOP ROW ── */}
                        <div className="flex items-center gap-2 mb-3 flex-wrap">
                            <div
                                className="flex items-center gap-1 px-2 py-0.5 border"
                                style={{ borderColor: color, backgroundColor: `${color}14` }}
                            >
                                <CalendarDays size={9} style={{ color }} />
                                <span className="font-jetbrains text-[9px]" style={{ color }}>{year}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <MapPin size={10} className="text-[#888888]" />
                                <span className="font-nunito text-[11px] text-[#888888]">{inspiration}</span>
                            </div>
                        </div>

                        {/* ── NOMBRE ── */}
                        <div className="flex items-start justify-between gap-4 mb-3">
                            <div>
                                <h2 className="font-press-start text-[18px] text-[#111111] leading-tight mb-2">
                                    {nameEs.toUpperCase()}
                                </h2>
                                <p className="font-nunito text-[12px] text-[#888888] leading-relaxed line-clamp-2 max-w-[280px]">
                                    {description}
                                </p>
                            </div>
                            {/* Dot de color */}
                            <div
                                className="shrink-0 w-8 h-8 border-2 border-[#111111] flex items-center justify-center mt-1"
                                style={{ backgroundColor: `${color}20` }}
                            >
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                            </div>
                        </div>

                        {/* ── SEPARADOR DOBLE ── */}
                        <div className="relative h-[5px] my-4">
                            <motion.div
                                className="absolute top-0 left-0 w-full h-[3px] bg-[#111111] origin-left"
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.1 + index * 0.04 }}
                            />
                            <motion.div
                                className="absolute bottom-0 right-0 w-full h-[2px] origin-right"
                                style={{ backgroundColor: color }}
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.35, delay: 0.18 + index * 0.04 }}
                            />
                        </div>

                        {/* ── STATS 3 BOXES ── */}
                        <div className="grid grid-cols-3 gap-2 mb-4">
                            {stats.map(({ label, value, Icon }) => (
                                <div
                                    key={label}
                                    className="border border-[#E0E0E0] px-2 py-2 flex flex-col items-center gap-1 bg-[#FAFAFA]"
                                >
                                    <Icon size={10} className="text-[#888888]" />
                                    <NumberFlow
                                        value={value}
                                        className="font-press-start text-[12px] text-[#111111]"
                                    />
                                    <span className="font-nunito text-[9px] text-[#888888] uppercase tracking-wide">{label}</span>
                                </div>
                            ))}
                        </div>

                        {/* ── FOOTER: juegos + link ── */}
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                            <div className="flex flex-wrap gap-1">
                                {games.slice(0, 3).map((g) => (
                                    <span
                                        key={g}
                                        className="font-press-start text-[7px] px-2 py-1 border border-[#E0E0E0] bg-[#F2F2F2] group-hover:border-[#111111] transition-colors"
                                    >
                                        {g}
                                    </span>
                                ))}
                                {games.length > 3 && (
                                    <span className="font-press-start text-[7px] px-2 py-1 border border-[#E0E0E0]" style={{ color }}>
                                        +{games.length - 3}
                                    </span>
                                )}
                            </div>
                            <span className="font-nunito font-bold text-[11px] flex items-center gap-0.5" style={{ color }}>
                                Explorar <ChevronRight size={11} />
                            </span>
                        </div>
                    </div>
                </motion.div>
            </Link>
        </motion.div>
    );
}