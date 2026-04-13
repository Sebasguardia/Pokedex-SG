"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import NumberFlow from "@number-flow/react";
import {
    GENERATION_COLORS,
    GENERATION_ROMAN,
    GENERATIONS,
    GENERATION_YEARS,
    GENERATION_NAMES_ES,
    GENERATION_MASCOTS,
    GENERATION_STARTERS,
    GENERATION_MECHANICS,
    GENERATION_GAMES_ARTWORK,
} from "@/lib/constants/generations.constants";

const TIMELINE_DATA = GENERATIONS.map((g) => ({
    id: GENERATION_ROMAN[g.name] ? `GEN ${GENERATION_ROMAN[g.name]}` : g.label,
    roman: GENERATION_ROMAN[g.name] ?? "?",
    year: GENERATION_YEARS[g.name] ?? "????",
    region: g.region,
    nameEs: GENERATION_NAMES_ES[g.name] ?? g.name,
    games: g.games.slice(0, 2).join(" · "),
    path: `/generations/${g.name}`,
    color: GENERATION_COLORS[g.name] ?? "#CC0000",
    mascotId: GENERATION_MASCOTS[g.name]?.id ?? 25,
    mascotName: GENERATION_MASCOTS[g.name]?.name ?? "Pikachu",
    starters: GENERATION_STARTERS[g.name] ?? [],
    mechanics: GENERATION_MECHANICS[g.name] ?? [],
    covers: GENERATION_GAMES_ARTWORK[g.name] ?? [],
}));

export function GenerationsTimeline() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollXProgress } = useScroll({ container: containerRef });

    // Parallax transformations for background watermarks
    const bgX = useTransform(scrollXProgress, [0, 1], ["0%", "-50%"]);
    const bgRomanX = useTransform(scrollXProgress, [0, 1], ["20%", "-80%"]);

    return (
        <section className="bg-[#0a0a0a] border-y-[8px] border-[#111111] overflow-hidden w-full relative min-h-[600px] flex flex-col">
            {/* ── BACKGROUND LAYERS ── */}
            {/* 1. Technical Grid */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" 
                style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} 
            />
            
            {/* 2. Parallax Watermark Name */}
            <motion.div 
                style={{ x: bgX }}
                className="absolute top-1/2 -translate-y-1/2 left-0 font-['Press_Start_2P'] text-[25vw] sm:text-[20vw] text-white/[0.02] whitespace-nowrap select-none pointer-events-none z-0 uppercase tracking-tighter"
            >
                POKEMON_ARCHIVE_SYSTEM_V3.0_GEN_DATA_STREAM
            </motion.div>

            {/* 3. Parallax Watermark Roman */}
            <motion.div 
                style={{ x: bgRomanX }}
                className="absolute bottom-10 left-0 font-['Press_Start_2P'] text-[40vw] text-white/[0.01] whitespace-nowrap select-none pointer-events-none z-0 uppercase"
            >
                I II III IV V VI VII VIII IX
            </motion.div>

            {/* 4. Scanlines effect */}
            <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.05]" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 1px, #fff 1px, #fff 2px)" }} />

            {/* ── HEADER CONTENT ── */}
            <div className="px-6 md:px-16 pt-16 pb-4 relative z-20 flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mt-12 mb-8">
                <div className="max-w-2xl">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="inline-flex items-center gap-3 px-4 py-2 bg-[#CC0000] border-2 border-[#111111] shadow-[4px_4px_0_#000] mb-6"
                    >
                        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                        <span className="font-['JetBrains_Mono'] font-black text-[10px] text-white tracking-[0.2em] uppercase">
                            Archivo Histórico / v.2024
                        </span>
                    </motion.div>
                    
                    <h2 className="font-['Press_Start_2P'] text-[24px] sm:text-[36px] md:text-[48px] text-white leading-tight tracking-tight">
                        30 AÑOS DE <span className="text-[#CC0000]">EVOLUCIÓN</span>
                    </h2>
                    
                    <div className="flex items-start gap-4 mt-6 border-l-4 border-[#CC0000] pl-6 py-2">
                        <p className="font-['Nunito'] font-bold text-[16px] md:text-[18px] text-[#888] leading-relaxed max-w-lg">
                            Explora la trayectoria completa de la franquicia desde Kanto hasta Paldea. Desliza para navegar por el ecosistema.
                        </p>
                    </div>
                </div>

                {/* Scrubber / Progress indicator */}
                <div className="w-full md:w-[300px] flex flex-col gap-4">
                    <div className="flex justify-between items-end font-['JetBrains_Mono'] text-[10px] text-[#666] uppercase font-bold tracking-widest">
                        <span>Inicio</span>
                        <div className="flex gap-2 text-white">
                            <span>GEN</span>
                            <NumberFlow value={Math.round(scrollXProgress.get() * 8) + 1} />
                        </div>
                        <span>Fin</span>
                    </div>
                    <div className="relative h-[12px] bg-[#111111] border-2 border-[#333] shadow-[inner_0_2px_4px_rgba(0,0,0,0.5)] overflow-hidden">
                        <motion.div
                            className="absolute top-0 left-0 h-full bg-[#CC0000] origin-left shadow-[0_0_15px_rgba(204,0,0,0.5)]"
                            style={{ scaleX: scrollXProgress }}
                        />
                    </div>
                </div>
            </div>

            {/* ── TIMELINE CONTAINER ── */}
            <div className="relative w-full flex-1 flex flex-col justify-center min-h-[450px]">
                {/* Central line */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: [0.85, 0, 0.15, 1] }}
                    style={{ transformOrigin: "left" }}
                    className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-[6px] bg-[#111111] border-y-2 border-white/10 pointer-events-none z-0"
                />

                {/* Scrollable region */}
                <div
                    ref={containerRef}
                    className="flex items-center gap-0 overflow-x-auto snap-x snap-mandatory py-24 md:py-32 px-[10vw] relative z-20 no-scrollbar"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {TIMELINE_DATA.map((gen, i) => (
                        <TimelinePill key={gen.id} gen={gen} index={i} />
                    ))}
                    
                    {/* Final Spacer */}
                    <div className="shrink-0 w-[20vw]" />
                </div>
            </div>

            <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .snap-x { scroll-behavior: smooth; }
            `}</style>
        </section>
    );
}

function TimelinePill({ gen, index }: { gen: typeof TIMELINE_DATA[0]; index: number }) {
    const isTop = index % 2 === 0;
    const showdownGif = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${gen.mascotId}.gif`;
    const staticSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${gen.mascotId}.png`;

    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: isTop ? -60 : 60 },
                visible: {
                    opacity: 1, y: 0,
                    transition: { type: "spring", stiffness: 150, damping: 25, delay: index * 0.1 }
                },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className={`relative shrink-0 flex flex-col items-center snap-center px-4 ${isTop ? "mb-[140px]" : "mt-[140px]"}`}
            style={{ width: 280 }}
        >
            <Link href={gen.path} className="group outline-none w-full perspective-[1000px]">
                {/* ── VERTICAL CONNECTOR ── */}
                <div
                    className={`absolute left-1/2 -translate-x-1/2 w-[4px] z-0 shadow-[0_0_10px_var(--gen-color)] blur-[1px]
                        ${isTop ? "top-full" : "bottom-full"}
                    `}
                    style={{
                        height: 70,
                        background: `linear-gradient(${isTop ? "to bottom" : "to top"}, ${gen.color}, transparent)`,
                        "--gen-color": gen.color,
                    } as React.CSSProperties}
                />

                {/* ── CARD ANCHOR POINT ── */}
                <motion.div
                    className={`absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full border-[4px] z-30 transition-transform duration-300 group-hover:scale-150
                        ${isTop ? "-bottom-[100px]" : "-top-[100px]"}
                    `}
                    style={{ backgroundColor: gen.color, borderColor: "#111111", boxShadow: `0 0 20px ${gen.color}` }}
                />

                {/* ── MAIN DOSSIER CARD ── */}
                <motion.div
                    className="relative border-[6px] border-[#111111] bg-white overflow-hidden flex flex-col transition-all duration-500 transform-gpu"
                    style={{
                        "--gen-color": gen.color,
                        boxShadow: `10px 10px 0 #111111`,
                    } as React.CSSProperties}
                    whileHover={{ 
                        rotateY: index % 2 === 0 ? 5 : -5, 
                        rotateX: isTop ? -5 : 5,
                        y: isTop ? -10 : 10,
                        boxShadow: `15px 15px 0 var(--gen-color)`
                    }}
                >
                    {/* Top Branding Strip */}
                    <div className="h-4 w-full flex border-b-2 border-[#111111] overflow-hidden">
                        {[...Array(20)].map((_, i) => (
                            <div key={i} className="w-6 h-full border-r border-[#111111]" style={{ backgroundColor: i % 2 === 0 ? gen.color : "transparent" }} />
                        ))}
                    </div>

                    {/* Gen Identifier Large */}
                    <div className="absolute top-6 right-2 font-['Press_Start_2P'] text-[40px] opacity-[0.05] text-[#111111] select-none pointer-events-none -rotate-12 z-0">
                        {gen.roman}
                    </div>

                    {/* HEADER INFO */}
                    <div className="p-4 bg-[#f8f8f8] border-b-[4px] border-[#111111] relative z-10 flex flex-col gap-1">
                        <div className="flex justify-between items-center">
                            <span className="font-['Press_Start_2P'] text-[10px]" style={{ color: gen.color }}>
                                {gen.id}
                            </span>
                            <span className="font-['JetBrains_Mono'] font-black text-[10px] bg-[#111111] text-white px-2 py-0.5">
                                {gen.year}
                            </span>
                        </div>
                        <h3 className="font-['Press_Start_2P'] text-[16px] text-[#111111] mt-1 truncate">
                            {gen.region.toUpperCase()}
                        </h3>
                    </div>

                    {/* MASCOT AREA */}
                    <div
                        className="relative h-[160px] flex items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_center,var(--gen-color)_0%,transparent_70%)] opacity-[0.8]"
                    >
                        {/* Box Art Background (Slightly visible) */}
                        {gen.covers[0] && (
                            <div className="absolute inset-0 opacity-[0.15] grayscale group-hover:grayscale-0 transition-all duration-700 blur-[2px] scale-110 group-hover:scale-100">
                                <Image src={gen.covers[0].coverUrl} alt="Cover" fill className="object-cover" />
                            </div>
                        )}

                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-[12px] bg-black/30 rounded-full blur-md" />
                        <div className="relative w-[110px] h-[130px] group-hover:scale-110 group-hover:-translate-y-2 transition-transform duration-500 drop-shadow-[0_10px_10px_rgba(0,0,0,0.4)]">
                            <Image
                                src={showdownGif}
                                alt={gen.mascotName}
                                fill
                                className="object-contain object-bottom"
                                unoptimized
                                onError={(e) => { e.currentTarget.src = staticSrc; }}
                            />
                        </div>

                        {/* Starter Floating Sprites */}
                        <div className="absolute top-2 left-2 flex flex-col gap-1">
                            {gen.starters.slice(0, 3).map((sId, i) => (
                                <motion.div 
                                    key={sId}
                                    initial={{ x: -20, opacity: 0 }}
                                    whileHover={{ x: 5, opacity: 1 }}
                                    className="w-10 h-10 border-2 border-[#111111] bg-white rounded-full p-1 shadow-[2px_2px_0_#111111] z-20"
                                >
                                    <Image 
                                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${sId}.png`} 
                                        alt="Starter" 
                                        width={40} 
                                        height={40} 
                                        className="object-contain"
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* MECHANICS & CHIPS */}
                    <div className="p-4 bg-white flex flex-col gap-3 relative z-10">
                        {/* Mechanic sticker */}
                        {gen.mechanics[0] && (
                            <div className="flex flex-col gap-1">
                                <span className="font-['JetBrains_Mono'] text-[8px] text-[#888] font-bold uppercase tracking-widest">Core Mechanic</span>
                                <div className="border-2 border-[#111111] px-2 py-1 bg-[#fffbe6] text-[#111111] font-['Press_Start_2P'] text-[7px] inline-block shadow-[2px_2px_0_#111111] self-start uppercase">
                                    {gen.mechanics[0].title}
                                </div>
                            </div>
                        )}

                        <div className="h-[2px] bg-[#111111]/10 w-full" />

                        {/* Games list */}
                        <div className="flex flex-wrap gap-1">
                            {gen.covers.slice(0, 2).map((c) => (
                                <span key={c.name} className="px-2 py-0.5 bg-[#f0f0f0] border border-[#111111] font-['JetBrains_Mono'] text-[8px] font-black text-[#555] uppercase">
                                    {c.name}
                                </span>
                            ))}
                        </div>

                        {/* ENTER BUTTON */}
                        <div className="mt-2 flex items-center justify-between group/btn">
                            <span className="font-['Press_Start_2P'] text-[9px] text-[#111111] opacity-0 group-hover:opacity-100 transition-opacity">EXPLORAR</span>
                            <div className="w-8 h-8 rounded-full bg-[#111111] flex items-center justify-center text-white transition-all group-hover:bg-[var(--gen-color)] group-hover:scale-110">
                                <ChevronRight size={16} strokeWidth={3} />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </Link>
        </motion.div>
    );
}