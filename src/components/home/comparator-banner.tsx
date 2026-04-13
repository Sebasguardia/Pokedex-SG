"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Plus, ArrowRight, Zap, Target, Shield, BarChart3, Binary } from "lucide-react";

// Technical Feature Chips (Floating around)
function FeatureChip({ icon: Icon, text, delay, position }: { icon: any, text: string, delay: number, position: { top?: string, left?: string, right?: string, bottom?: string } }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            animate={{ y: [0, -10, 0] }}
            transition={{
                delay,
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                scale: { type: "spring", stiffness: 300 }
            }}
            className="absolute z-20 hidden lg:flex items-center gap-2 px-3 py-1.5 border-2 border-[#111111] bg-white shadow-[4px_4px_0_#111111] font-['JetBrains_Mono'] font-bold text-[10px] text-[#111111] uppercase tracking-tighter cursor-default pointer-events-none"
            style={position}
        >
            <Icon size={12} strokeWidth={3} className="text-[#CC0000]" />
            {text}
        </motion.div>
    );
}

function BgPattern() {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-[0.15]">
            {/* Moving Stripes */}
            <motion.div
                animate={{ x: [-100, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-x-[-100%] inset-y-0"
                style={{
                    backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 40px, white 40px, white 41px)",
                    backgroundSize: "80px 80px"
                }}
            />
            {/* Technical Grid */}
            <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(white 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
        </div>
    );
}

function Slot({ index }: { index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + (index * 0.1), type: "spring" }}
            className="group relative"
        >
            <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="w-20 h-20 sm:w-28 sm:h-28 border-[4px] border-[#111111] bg-white shadow-[6px_6px_0_#111111] flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors group-hover:bg-[#f8f8f8]"
            >
                <div className="relative">
                    <Plus className="w-8 h-8 sm:w-10 sm:h-10 text-[#CC0000]" />
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border-2 border-dashed border-[#CC0000]/30 rounded-full scale-[1.8]"
                    />
                </div>
            </motion.div>
            <span className="absolute -bottom-6 left-0 right-0 text-center font-['JetBrains_Mono'] text-[9px] font-black text-white uppercase tracking-widest opacity-60">Slot {index + 1}</span>
        </motion.div>
    );
}

export function ComparatorBanner() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <section className="relative bg-[#CC0000] py-24 md:py-32 overflow-hidden flex flex-col items-center justify-center border-y-[10px] border-[#111111]">

            <BgPattern />

            {/* Massive Tech Watermarks */}
            <div className="absolute top-10 left-10 font-['Press_Start_2P'] text-[60px] md:text-[80px] text-white opacity-[0.05] whitespace-nowrap select-none pointer-events-none uppercase -rotate-6">
                COMPARATOR_X.PRO
            </div>
            <div className="absolute bottom-10 right-10 font-['Press_Start_2P'] text-[60px] md:text-[80px] text-white opacity-[0.05] whitespace-nowrap select-none pointer-events-none uppercase -rotate-6">
                BATTLE_ANALYTICS
            </div>

            {/* Feature Chips */}
            <FeatureChip icon={BarChart3} text="Base Stats Analysis" delay={0.2} position={{ top: "20%", left: "15%" }} />
            <FeatureChip icon={Target} text="Type Matchups" delay={0.4} position={{ top: "45%", left: "10%" }} />
            <FeatureChip icon={Target} text="Move Accuracy" delay={0.6} position={{ top: "25%", right: "15%" }} />
            <FeatureChip icon={Shield} text="Resistances" delay={0.8} position={{ bottom: "25%", right: "12%" }} />
            <FeatureChip icon={Binary} text="Evolution Chains" delay={1} position={{ bottom: "20%", left: "18%" }} />

            <div className="relative z-10 w-full max-w-7xl px-6 flex flex-col items-center">

                {/* ── HEADING SECTION ── */}
                <div className="text-center mb-16 px-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-3 bg-white px-4 py-2 border-[3px] border-[#111111] shadow-[6px_6px_0_#111111] mb-8"
                    >
                        <Zap size={16} fill="#CC0000" className="text-[#CC0000] animate-pulse" />
                        <span className="font-['JetBrains_Mono'] font-black text-[10px] sm:text-[12px] text-[#111111] tracking-[0.2em] uppercase">
                            Módulo de Simulación Avanzada
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="font-['Press_Start_2P'] text-[22px] sm:text-[32px] md:text-[42px] text-white leading-tight mb-8 drop-shadow-[4px_4px_0_#111111]"
                    >
                        ¿BUSCAS AL <span className="underline decoration-white underline-offset-8">PODER</span> ABSOLUTO?
                    </motion.h2>

                    <p className="font-['Nunito'] font-extrabold text-[16px] md:text-[20px] text-white/90 max-w-2xl mx-auto leading-relaxed">
                        Enfréntalos. Analiza cada estadística, debilidad y movimiento. Nuestro motor de comparación 1v1v1 te revela la verdad competitiva.
                    </p>
                </div>

                {/* ── VS BATTLE CLASH ── */}
                <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 mb-20 relative">

                    {/* Left Challenger (Silhouette) */}
                    <motion.div
                        animate={{ x: [0, 5, 0], scale: [1, 1.02, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="relative w-40 h-40 md:w-56 md:h-56 filter drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]"
                    >
                        <Image
                            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png"
                            alt="Challenger Left"
                            fill
                            className="object-contain brightness-0 invert opacity-60"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent mix-blend-overlay" />
                    </motion.div>

                    {/* Central VS Node */}
                    <div className="flex flex-col items-center gap-6">
                        <motion.div
                            animate={{ rotate: [0, 90, 180, 270, 360] }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="w-24 h-24 sm:w-32 sm:h-32 border-[6px] border-[#111111] bg-white rounded-full flex items-center justify-center shadow-[10px_10px_0_#111111] relative z-20"
                        >
                            <span className="font-['Press_Start_2P'] text-[24px] sm:text-[32px] text-[#111111]">VS</span>
                            {/* Technical Rings */}
                            <div className="absolute inset-[-12px] border-2 border-white/40 rounded-full border-dashed animate-spin-slow" />
                            <div className="absolute inset-[-24px] border-2 border-white/20 rounded-full border-dotted animate-reverse-spin" />
                        </motion.div>

                        <div className="flex gap-4">
                            {[0, 1, 2, 3].map(i => <Slot key={i} index={i} />)}
                        </div>
                    </div>

                    {/* Right Challenger (Silhouette) */}
                    <motion.div
                        animate={{ x: [0, -5, 0], scale: [1, 1.02, 1] }}
                        transition={{ duration: 2.2, repeat: Infinity }}
                        className="relative w-40 h-40 md:w-56 md:h-56 filter drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]"
                    >
                        <Image
                            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png"
                            alt="Challenger Right"
                            fill
                            className="object-contain brightness-0 invert opacity-60"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent mix-blend-overlay" />
                    </motion.div>
                </div>

                {/* ── CTA BUTTON ── */}
                <Link href="/compare" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                    <motion.div
                        className="relative group p-1"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div className="absolute inset-0 bg-[#111111] translate-x-3 translate-y-3 transition-transform group-hover:translate-x-4 group-hover:translate-y-4" />
                        <div className="relative bg-white border-[5px] border-[#111111] px-12 py-5 flex items-center gap-4 overflow-hidden">
                            {/* Gloss effect overlay */}
                            <motion.div
                                animate={isHovered ? { left: ["-100%", "200%"] } : {}}
                                transition={{ duration: 0.8 }}
                                className="absolute top-0 bottom-0 w-20 bg-gradient-to-r from-transparent via-white/80 to-transparent skew-x-[-20deg] z-10"
                                style={{ left: "-100%" }}
                            />

                            <span className="font-['Press_Start_2P'] text-[14px] sm:text-[18px] text-[#111111]">
                                CARGAR SIMULADOR
                            </span>
                            <div className="w-10 h-10 bg-[#CC0000] flex items-center justify-center text-white border-4 border-[#111111] group-hover:rotate-45 transition-transform duration-300">
                                <ArrowRight strokeWidth={4} />
                            </div>
                        </div>
                    </motion.div>
                </Link>

                <div className="mt-12 font-['JetBrains_Mono'] text-[10px] text-white/50 tracking-[0.4em] uppercase font-black">
                    Encryption: Level_4 // Algorithm: PKMN_DNA_V1
                </div>
            </div>

            <style jsx>{`
                .animate-spin-slow {
                    animation: spin 30s linear infinite;
                }
                .animate-reverse-spin {
                    animation: reverse-spin 20s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes reverse-spin {
                    from { transform: rotate(360deg); }
                    to { transform: rotate(0deg); }
                }
            `}</style>
        </section>
    );
}
