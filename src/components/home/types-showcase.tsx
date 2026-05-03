"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Binary } from "lucide-react";
import { 
    TYPE_COLORS, 
    TYPE_NAMES_ES,
    ALL_TYPES 
} from "@/lib/constants/team-builder/team-builder.constants";

// ── BACKGROUND DECORATION ──
function MatrixBackground() {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            {/* Technical Grid */}
            <div className="absolute inset-0 opacity-[0.05]" 
                style={{ backgroundImage: "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)", backgroundSize: "50px 50px" }} 
            />
            
            {/* Scanlines */}
            <div className="absolute inset-0 opacity-[0.02]" 
                style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 4px)" }} 
            />

            {/* Parallax Watermarks */}
            <motion.div 
                className="absolute top-20 -left-20 font-['Press_Start_2P'] text-[150px] text-black/[0.03] -rotate-90 whitespace-nowrap uppercase"
            >
                ELEMENTAL_MATRIX
            </motion.div>
            <motion.div 
                className="absolute bottom-20 -right-20 font-['Press_Start_2P'] text-[150px] text-black/[0.03] -rotate-90 whitespace-nowrap uppercase"
            >
                CORE_STREAMS
            </motion.div>
        </div>
    );
}

// ── INDIVIDUAL TYPE DOSSIER CARD ──
function TypeCard({ type, index }: { type: string, index: number }) {
    const color = TYPE_COLORS[type] || "#A8A77A";
    const [isHovered, setIsHovered] = useState(false);
    const iconPath = `/icons/${type}.svg`;

    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, scale: 0.8, y: 20 },
                visible: { 
                    opacity: 1, 
                    scale: 1, 
                    y: 0,
                    transition: { type: "spring", stiffness: 260, damping: 20, delay: index * 0.05 }
                }
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative perspective-[1000px] h-32 md:h-44"
        >
            <Link href={`/types/${type}`} className="block w-full h-full group outline-none">
                <motion.div
                    animate={{ 
                        rotateY: isHovered ? (index % 2 === 0 ? 12 : -12) : 0,
                        rotateX: isHovered ? 8 : 0,
                        scale: isHovered ? 1.05 : 1,
                        boxShadow: isHovered ? `15px 15px 0 #111111` : `6px 6px 0 #111111`,
                        borderColor: isHovered ? color : "#111111"
                    }}
                    className="relative w-full h-full bg-white border-[4px] border-[#111111] overflow-hidden flex flex-col transition-all transform-gpu"
                >
                    {/* Top Type Band */}
                    <div className="h-2 w-full transition-all duration-300" style={{ backgroundColor: color }} />

                    {/* background tech numbers */}
                    <div className="absolute top-4 right-4 font-['JetBrains_Mono'] text-[10px] text-[#111111]/10 font-black">
                        {String(index + 1).padStart(2, "0")}
                    </div>

                    {/* ELEMENTAL BURST BACKGROUND */}
                    <AnimatePresence>
                        {isHovered && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 0.2, scale: 2.5 }}
                                exit={{ opacity: 0, scale: 0 }}
                                className="absolute inset-0 z-0 flex items-center justify-center"
                            >
                                <div 
                                    className="w-32 h-32 rounded-full blur-3xl transition-colors duration-500" 
                                    style={{ backgroundColor: color }} 
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Content */}
                    <div className="p-3 flex flex-col items-center justify-center flex-1 relative z-10">
                        {/* Icon Container - Now using the type color as background to make white icons visible */}
                        <motion.div 
                            animate={{ 
                                scale: isHovered ? 1.4 : 1,
                                rotate: isHovered ? [0, -5, 5, 0] : 0,
                                y: isHovered ? -10 : 0
                            }}
                            className="p-3 border-2 border-[#111111] shadow-[4px_4px_0_#111111] mb-4 transition-transform relative"
                            style={{ backgroundColor: color }}
                        >
                            <div className="relative w-8 h-8 sm:w-10 sm:h-10">
                                <Image 
                                    src={iconPath} 
                                    alt={type} 
                                    fill 
                                    className="object-contain"
                                    unoptimized
                                />
                            </div>
                            
                            {/* Technical Corners */}
                            <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-[#111111]" />
                            <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-[#111111]" />
                        </motion.div>

                        <motion.span 
                            animate={{ 
                                y: isHovered ? -5 : 0,
                                color: isHovered ? color : "#111111"
                            }}
                            className="font-['Press_Start_2P'] text-[9px] md:text-[10px] uppercase select-none text-center px-2"
                        >
                            {TYPE_NAMES_ES[type]?.toUpperCase() || type.toUpperCase()}
                        </motion.span>
                    </div>

                    {/* Footer decoration */}
                    <div className="absolute bottom-2 left-0 right-0 flex justify-center opacity-20">
                        <div className="w-12 h-[2px] bg-[#111111]" />
                    </div>
                </motion.div>
            </Link>
        </motion.div>
    );
}

export function TypesShowcase() {
    return (
        <section className="relative bg-[#f0f0f0] py-24 md:py-32 overflow-hidden border-y-[10px] border-[#111111]">
            <MatrixBackground />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* ── TECHNICAL HEADER ── */}
                <div className="flex flex-col items-center mb-20 text-center">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="inline-flex items-center gap-3 bg-[#111111] px-4 py-2 shadow-[6px_6px_0_#CC0000] mb-8"
                    >
                        <Binary size={16} className="text-white animate-pulse" />
                        <span className="font-['JetBrains_Mono'] font-black text-[10px] sm:text-[12px] text-white tracking-[0.2em] uppercase">
                            Core Module: Elemental Matrix
                        </span>
                    </motion.div>
                    
                    <motion.h2 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="font-['Press_Start_2P'] text-[24px] sm:text-[36px] md:text-[48px] text-[#111111] leading-tight tracking-tighter"
                    >
                        EL <span className="text-[#CC0000]">PODER</span> ELEMENTAL
                    </motion.h2>
                    
                    <div className="flex items-center gap-3 mt-6">
                        <div className="w-8 md:w-12 h-[3px] bg-[#CC0000]" />
                        <p className="font-['Nunito'] font-black text-[12px] sm:text-[18px] text-[#666] uppercase tracking-[0.2em]">
                            18 Canales Activos // Encriptación DNA
                        </p>
                        <div className="w-8 md:w-12 h-[3px] bg-[#CC0000]" />
                    </div>
                </div>

                {/* ── THE GRID ── */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-9 gap-4 md:gap-8"
                >
                    {ALL_TYPES.map((type, i) => (
                        <TypeCard key={type} type={type} index={i} />
                    ))}
                </motion.div>

                {/* ── FOOTER ACTION ── */}
                <div className="flex flex-col items-center mt-24">
                    <Link href="/types" className="group">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative cursor-pointer"
                        >
                            <div className="absolute inset-0 bg-[#CC0000] translate-x-2 translate-y-2 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform" />
                            <div className="relative bg-[#111111] border-[4px] border-[#111111] px-10 py-5 flex items-center gap-6 overflow-hidden">
                                {/* Light flash overlay */}
                                <div className="absolute top-0 bottom-0 w-16 bg-white/10 skew-x-[-20deg] animate-light-scan" />
                                
                                <div className="flex flex-col items-start leading-none">
                                    <span className="font-['JetBrains_Mono'] text-[10px] text-[#CC0000] font-black uppercase tracking-widest mb-1">Ver Reporte Completo</span>
                                    <span className="font-['Press_Start_2P'] text-[12px] sm:text-[14px] text-white">TABLA DE TIPOS</span>
                                </div>
                                <ArrowRight className="text-white group-hover:translate-x-2 transition-transform h-6 w-6" />
                            </div>
                        </motion.div>
                    </Link>
                </div>
            </div>

            <style jsx>{`
                @keyframes light-scan {
                    0% { transform: translateX(-200%) skewX(-20deg); }
                    100% { transform: translateX(400%) skewX(-20deg); }
                }
                .animate-light-scan {
                    animation: light-scan 3s infinite linear;
                }
            `}</style>
        </section>
    );
}
