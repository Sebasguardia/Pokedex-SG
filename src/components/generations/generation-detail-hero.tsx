"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, Gamepad2, Sparkles, ChevronRight, ArrowLeft } from "lucide-react";
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
        { Icon: CalendarDays, text: year, accent: false },
        { Icon: MapPin, text: region.toUpperCase(), accent: true },
        { Icon: Gamepad2, text: games.slice(0, 2).join(" / "), accent: false },
        { Icon: Sparkles, text: `${generation.pokemon_species.length}`, accent: false },
    ];

    return (
        <div className="relative bg-[#0a0a0a] overflow-hidden border-b-[8px] border-[#111111]">
            {/* Grid base neo-brutalist (Cruces en lugar de puntos para más estilo retro) */}
            <div
                className="absolute inset-0 opacity-[0.1] pointer-events-none"
                style={{
                    backgroundImage: "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            />

            {/* Scanline gorda animada */}
            <motion.div
                className="absolute top-0 left-0 right-0 h-[6px] pointer-events-none mix-blend-screen opacity-50 z-20"
                style={{ backgroundColor: genColor }}
                animate={{ y: ["0vh", "100vh", "0vh"] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />

            {/* Numero romano GIGANTE outline */}
            <motion.div
                className="absolute right-[-5%] top-1/2 -translate-y-1/2 font-['Press_Start_2P'] leading-none select-none pointer-events-none"
                style={{ 
                    fontSize: "250px", 
                    color: "transparent",
                    WebkitTextStroke: "4px rgba(255,255,255,0.03)",
                }}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                {roman}
            </motion.div>

            <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 py-12 md:py-16">
                
                {/* Botón Volver */}
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <Link
                        href="/generations"
                        className="inline-flex items-center gap-2 bg-[#111111] hover:bg-white text-white hover:text-[#111111] px-4 py-2 border-2 border-[#111111] transition-colors group shadow-[4px_4px_0_#111111] hover:shadow-[2px_2px_0_#111111] hover:translate-y-[2px] hover:translate-x-[2px]"
                        style={{ borderLeftColor: genColor, borderLeftWidth: "6px" }}
                    >
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" strokeWidth={3} />
                        <span className="font-['Press_Start_2P'] text-[10px] tracking-widest mt-0.5 pt-0.5">VOLVER</span>
                    </Link>
                </motion.div>

                <div className="flex flex-col md:flex-row gap-12 items-start justify-between">
                    
                    {/* ── LEFT: Info ── */}
                    <div className="flex-1 w-full md:w-auto relative">
                        {/* Decoración esquina */}
                        <div className="absolute -top-6 -left-6 w-4 h-4 border-t-2 border-l-2 border-white/20" />

                        {/* Título Masivo con Sombra Sólida */}
                        <div className="mb-8 relative">
                            <motion.h1
                                className="font-['Press_Start_2P'] text-[32px] sm:text-[48px] md:text-[56px] text-white uppercase leading-[1.2] relative z-10"
                                style={{ 
                                    textShadow: `6px 6px 0 ${genColor}`,
                                    WebkitTextStroke: "2px #111111"
                                }}
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                                {nameEs}
                            </motion.h1>
                            {/* Subtítulo número romano */}
                            <motion.div 
                                className="absolute -top-4 -left-3 font-['Press_Start_2P'] text-[24px] z-0 opacity-40"
                                style={{ color: genColor }}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.2 }}
                            >
                                {roman}
                            </motion.div>
                        </div>

                        {/* Chips de metadata rediseñados (Más punch) */}
                        <motion.div
                            className="flex flex-wrap gap-3 mb-8"
                            initial="hidden"
                            animate="visible"
                            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                        >
                            {chips.map(({ Icon, text, accent }) => (
                                <motion.div
                                    key={text}
                                    variants={{
                                        hidden: { opacity: 0, scale: 0.8 },
                                        visible: { opacity: 1, scale: 1 },
                                    }}
                                    className="flex items-center gap-2 px-3 py-2 border-2 relative overflow-hidden group/chip"
                                    style={{
                                        borderColor: accent ? genColor : "#333333",
                                        backgroundColor: accent ? `${genColor}20` : "#111111",
                                    }}
                                >
                                    <div className="absolute inset-0 bg-white scale-x-0 origin-left transition-transform duration-300 group-hover/chip:scale-x-100 mix-blend-difference" />
                                    <Icon size={14} style={{ color: accent ? genColor : "#888888" }} className="relative z-10" />
                                    <span className="font-['JetBrains_Mono'] font-bold text-[11px] text-white tracking-wider relative z-10">{text}</span>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Juegos "Stickers" */}
                        <motion.div
                            className="flex flex-wrap gap-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            {games.map((g) => (
                                <span
                                    key={g}
                                    className="font-['Press_Start_2P'] text-[9px] px-3 py-2 bg-white text-[#111111] uppercase border-[3px] border-[#111111]"
                                    style={{
                                        boxShadow: `3px 3px 0 ${genColor}`,
                                    }}
                                >
                                    {g}
                                </span>
                            ))}
                        </motion.div>
                    </div>

                    {/* ── RIGHT: Mascot Brutal ── */}
                    <motion.div
                        className="relative shrink-0 self-center md:self-end mt-8 md:mt-0 w-full md:w-auto flex justify-center"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 20 }}
                    >
                        {/* El marco */}
                        <div className="relative group">
                            {/* Backdrop shadow masiva */}
                            <div 
                                className="absolute top-4 left-4 w-full h-full border-4 border-[#111111] transition-transform duration-300 group-hover:translate-x-2 group-hover:translate-y-2"
                                style={{ backgroundColor: genColor }}
                            />
                            
                            <div className="relative w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] border-4 border-[#111111] bg-[#1a1a1a] flex items-center justify-center overflow-visible z-10">
                                {/* Grid interior */}
                                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
                                
                                {/* Esquinas rojas/genColor mas gruesas */}
                                <div className="absolute top-0 left-0 w-6 h-6 border-b-4 border-r-4 border-[#111111]" style={{ backgroundColor: genColor }} />
                                <div className="absolute bottom-0 right-0 w-6 h-6 border-t-4 border-l-4 border-[#111111]" style={{ backgroundColor: genColor }} />
                                
                                <motion.div 
                                    className="relative w-full h-full z-20"
                                    animate={{ y: [-8, 8, -8] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    {/* El pokemon sobresale del div gracias al overflow-visible del parent si lo permitieramos, pero usaremos scale */}
                                    <Image
                                        src={artworkUrl}
                                        alt={mascot.name}
                                        fill
                                        className="object-contain p-2 drop-shadow-[0_10px_15px_rgba(0,0,0,0.8)] scale-110"
                                        priority
                                    />
                                </motion.div>

                                {/* Cinta superpuesta */}
                                <div className="absolute -bottom-5 w-auto px-4 py-2 border-4 border-[#111111] z-30" style={{ backgroundColor: genColor }}>
                                    <p className="text-center font-['Press_Start_2P'] text-[10px] text-white uppercase tracking-widest drop-shadow-[2px_2px_0_#111111]">
                                        {mascot.name}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Separador inferior gordo */}
            <div className="absolute bottom-0 left-0 w-full flex">
                <div className="h-[8px] flex-1" style={{ backgroundColor: genColor }} />
                <div className="h-[8px] w-1/3 bg-white" />
            </div>
        </div>
    );
}