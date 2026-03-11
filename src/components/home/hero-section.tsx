"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useFilterStore } from "@/lib/store/filter.store";

// The decorative background PokeBall
function GiantBgPokeball() {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 120]);
    const prefersReduced = useReducedMotion();

    return (
        <motion.div
            className="absolute right-[-150px] top-1/2 -translate-y-1/2 opacity-[0.04] z-0 pointer-events-none hidden md:block"
            style={{ y: prefersReduced ? 0 : y, width: 600, height: 600 }}
            animate={prefersReduced ? {} : { rotate: 360 }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        >
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-black">
                <path d="M50 5C25.147 5 5 25.147 5 50H40C40 44.477 44.477 40 50 40C55.523 40 60 44.477 60 50H95C95 25.147 74.853 5 50 5Z" fill="currentColor" />
                <path d="M50 95C74.853 95 95 74.853 95 50H60C60 55.523 55.523 60 50 60C44.477 60 40 55.523 40 50H5C5 74.853 25.147 95 50 95Z" fill="currentColor" />
                <path fillRule="evenodd" clipRule="evenodd" d="M95 50C95 52.761 92.761 55 90 55H63.1C61.467 62.067 56.533 67 50 67C43.467 67 38.533 62.067 36.9 55H10C7.239 55 5 52.761 5 50C5 47.239 7.239 45 10 45H36.9C38.533 37.933 43.467 33 50 33C56.533 33 61.467 37.933 63.1 45H90C92.761 45 95 47.239 95 50ZM50 60C55.523 60 60 55.523 60 50C60 44.477 55.523 40 50 40C44.477 40 40 44.477 40 50C40 55.523 44.477 60 50 60Z" fill="currentColor" />
            </svg>
        </motion.div>
    );
}

// 12 Random drifting particles
function FloatingParticle({ index }: { index: number }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const settings = useMemo(() => {
        if (!mounted) return null;
        const seed = Math.random();
        const isRed = seed > 0.5;
        const size = Math.floor(seed * 8) + 8; // 8 to 16px
        const duration = Math.floor(seed * 4) + 4; // 4 to 8s
        const initialTop = `${Math.floor(seed * 90) + 5}%`;
        const initialLeft = `${Math.floor((index / 12) * 100) + (seed * 10 - 5)}%`;

        return { seed, isRed, size, duration, initialTop, initialLeft };
    }, [mounted, index]);

    if (!mounted || !settings) return null;

    return (
        <motion.div
            className="absolute rounded-full pointer-events-none z-0"
            style={{
                width: settings.size, height: settings.size,
                top: settings.initialTop, left: settings.initialLeft,
                backgroundColor: settings.isRed ? "#CC0000" : "#111111",
                opacity: settings.isRed ? 0.15 : 0.08
            }}
            animate={{
                y: [0, -20, 0],
                x: [0, settings.seed > 0.5 ? 8 : -8, 0],
                rotate: [0, settings.seed > 0.5 ? 15 : -15, 0]
            }}
            transition={{ duration: settings.duration, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }}
        />
    );
}

// 4 Classic silhouettes in corners
const SILHOUETTES = [
    { id: 1, pos: "bottom-left" }, // Bulbasaur
    { id: 4, pos: "top-right" },   // Charmander
    { id: 7, pos: "bottom-right" },// Squirtle
    { id: 25, pos: "top-left" }     // Pikachu
];

function Silhouette({ id, pos, index }: { id: number, pos: string, index: number }) {
    const isTop = pos.includes("top");
    const isLeft = pos.includes("left");

    return (
        <motion.div
            className="absolute opacity-10 pointer-events-none z-0 mix-blend-multiply"
            style={{
                width: 120, height: 120,
                top: isTop ? "8%" : "auto", bottom: !isTop ? "8%" : "auto",
                left: isLeft ? "8%" : "auto", right: !isLeft ? "8%" : "auto",
            }}
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6 + index, repeat: Infinity, ease: "easeInOut" }}
        >
            <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                className="object-contain filter grayscale contrast-200 brightness-0 opacity-30"
                fill alt=""
            />
        </motion.div>
    );
}

export function HeroSection() {
    const [glitch, setGlitch] = useState(false);
    const { pokedexFilters } = useFilterStore();
    const pokedexHref = pokedexFilters ? `/pokemon?${pokedexFilters}` : "/pokemon";

    useEffect(() => {
        const t = setTimeout(() => setGlitch(true), 2400); // 2s after mount anim roughly
        return () => clearTimeout(t);
    }, []);

    useEffect(() => {
        if (glitch) {
            const t = setTimeout(() => setGlitch(false), 80);
            return () => clearTimeout(t);
        }
    }, [glitch]);

    const TITLE = "POKÉDEX".split("");

    return (
        <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-white text-center pt-16">

            {/* ── BACKGROUND LAYERS ── */}
            {/* 1. Dot Grid */}
            <div
                className="absolute inset-0 z-0 pointer-events-none opacity-80"
                style={{
                    backgroundImage: "radial-gradient(circle, #E8E8E8 1px, transparent 1px)",
                    backgroundSize: "32px 32px"
                }}
            />

            {/* 2. Red lines */}
            {[20, 35, 50, 65, 80].map((top) => (
                <div key={top} className="absolute w-full h-px bg-poke-red opacity-5 z-0 pointer-events-none" style={{ top: `${top}%` }} />
            ))}

            {/* 3. Giant Pokeball */}
            <GiantBgPokeball />

            {/* 4. Particles */}
            {Array(12).fill(null).map((_, i) => <FloatingParticle key={i} index={i} />)}

            {/* 5. Silhouettes */}
            {SILHOUETTES.map((s, i) => <Silhouette key={s.id} {...s} index={i} />)}

            {/* ── FOREGROUND CONTENT ── */}
            <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.12 } }
                }}
                className="relative z-10 flex flex-col items-center max-w-4xl mx-auto px-4"
            >
                {/* Eyebrow */}
                <motion.div
                    variants={{ hidden: { opacity: 0, y: -10 }, visible: { opacity: 1, y: 0 } }}
                    className="flex items-center gap-3 mb-8"
                >
                    <motion.div variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { delay: 0.3 } } }} className="w-10 h-px bg-poke-red origin-right" />
                    <h2 className="font-nunito text-[13px] text-gray-400 uppercase tracking-[0.2em]">Bienvenido a la enciclopedia Pokémon</h2>
                    <motion.div variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { delay: 0.3 } } }} className="w-10 h-px bg-poke-red origin-left" />
                </motion.div>

                {/* 3D Title */}
                <div style={{ perspective: "800px" }} className="mb-6 z-20">
                    <div className="flex gap-1 sm:gap-2">
                        {TITLE.map((letter, i) => {
                            const isRed = i >= 4;
                            return (
                                <motion.span
                                    key={i}
                                    variants={{
                                        hidden: { opacity: 0, y: 60, rotateX: -90 },
                                        visible: {
                                            opacity: 1, y: 0, rotateX: 0,
                                            transition: { type: "spring", stiffness: 200, damping: 20 }
                                        }
                                    }}
                                    style={{ display: "inline-block", transformStyle: "preserve-3d" }}
                                    className={`font-pixel text-[42px] sm:text-[64px] md:text-[88px] ${isRed ? "text-poke-red" : "text-gray-900"}`}
                                    animate={isRed && glitch ? { x: [3, -3, 0], color: "#990000" } : {}}
                                >
                                    {letter}
                                </motion.span>
                            );
                        })}
                    </div>
                </div>

                {/* Interactive Pokeball */}
                <motion.div
                    variants={{
                        hidden: { scale: 0, opacity: 0 },
                        visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 20 } }
                    }}
                    className="relative mb-6 cursor-pointer group z-30"
                    whileHover="hover"
                    whileTap="tap"
                    data-cursor="hover"
                >
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        variants={{
                            hover: { scale: 1.15, transition: { type: "spring" } },
                            tap: { scale: 0.9 }
                        }}
                        className="w-16 h-16"
                    >
                        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
                            <path d="M50 5C25.147 5 5 25.147 5 50H40C40 44.477 44.477 40 50 40C55.523 40 60 44.477 60 50H95C95 25.147 74.853 5 50 5Z" fill="#CC0000" />
                            <path d="M50 95C74.853 95 95 74.853 95 50H60C60 55.523 55.523 60 50 60C44.477 60 40 55.523 40 50H5C5 74.853 25.147 95 50 95Z" fill="white" />
                            <circle cx="50" cy="50" r="45" fill="none" stroke="#111" strokeWidth="6" />
                            <line x1="5" y1="50" x2="95" y2="50" stroke="#111" strokeWidth="6" />
                            <circle cx="50" cy="50" r="16" fill="white" stroke="#111" strokeWidth="6" />
                            <motion.circle
                                cx="50" cy="50" r="8" fill="white"
                                variants={{ hover: { fill: "#CC0000", scale: [1, 1.5, 1], transition: { repeat: Infinity, duration: 1 } } }}
                            />
                        </svg>
                    </motion.div>
                </motion.div>

                {/* Subtitle */}
                <motion.p
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                    className="font-nunito text-lg text-gray-700 max-w-[520px] mb-10 leading-[1.7]"
                >
                    Explora más de 1000 Pokémon, movimientos, tipos y mucho más en la base de datos definitiva.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                    className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-md mx-auto"
                >
                    {/* Primary CTA */}
                    <Link href={pokedexHref} className="w-full sm:w-auto">
                        <motion.button
                            whileHover={{ x: 4, y: 4, boxShadow: "0px 0px 0 #111111" }}
                            whileTap={{ scale: 0.97 }}
                            className="flex items-center justify-center gap-3 bg-poke-red text-white font-nunito font-bold text-sm tracking-[0.08em] uppercase px-8 py-4 border-2 border-poke-red w-full sm:w-auto"
                            style={{ boxShadow: "4px 4px 0 #111111" }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            data-cursor="hover"
                        >
                            <motion.svg
                                viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none"
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                            >
                                <circle cx="12" cy="12" r="11" stroke="white" strokeWidth="2" />
                                <path d="M12 1A11 11 0 0 0 1 12h10.5c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5H23A11 11 0 0 0 12 1z" fill="white" fillOpacity=".3" />
                                <line x1="1" y1="12" x2="23" y2="12" stroke="white" strokeWidth="2" />
                                <circle cx="12" cy="12" r="3" fill="white" />
                            </motion.svg>
                            Explorar Pokédex
                        </motion.button>
                    </Link>

                    {/* Secondary CTA */}
                    <Link href="/types" className="w-full sm:w-auto">
                        <motion.button
                            whileHover={{ x: 4, y: 4, boxShadow: "0px 0px 0 #888888" }}
                            whileTap={{ scale: 0.97 }}
                            className="flex items-center justify-center bg-transparent text-gray-900 font-nunito font-bold text-sm px-8 py-4 border-2 border-gray-900 w-full sm:w-auto"
                            style={{ boxShadow: "4px 4px 0 #888888" }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            data-cursor="hover"
                        >
                            Ver Tipos <ArrowRight className="ml-2 w-4 h-4" />
                        </motion.button>
                    </Link>
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="font-pixel text-[7px] text-gray-400" style={{ writingMode: "vertical-rl" }}>SCROLL</span>
                <motion.div
                    className="w-px h-10 bg-gray-900 origin-top"
                    animate={{ scaleY: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-gray-900"
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
            </motion.div>
        </section>
    );
}
