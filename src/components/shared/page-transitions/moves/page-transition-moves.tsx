"use client"

import { motion, useReducedMotion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

// ── PIXEL-ART SWORD COMPONENT (High Fidelity 64x64 Style) ──
const ElitePixelSword = ({ color, side }: { color: string, side: 'left' | 'right' }) => (
    <svg 
        width="500" height="500" viewBox="0 0 64 64" 
        fill="none" shapeRendering="crispEdges"
        className={side === 'right' ? "-scale-x-100" : ""}
    >
        {/* Blade Core */}
        <rect x="28" y="4" width="8" height="40" fill="white" opacity="0.9" />
        <rect x="30" y="2" width="4" height="2" fill="white" />
        {/* Edge / Detail */}
        <rect x="28" y="4" width="2" height="40" fill={color} />
        <rect x="34" y="4" width="2" height="40" fill={color} />
        {/* Guard (Técnica) */}
        <rect x="20" y="44" width="24" height="4" fill="black" />
        <rect x="18" y="44" width="2" height="4" fill={color} />
        <rect x="44" y="44" width="2" height="4" fill={color} />
        <rect x="22" y="42" width="20" height="2" fill="white" opacity="0.3" />
        {/* Handle */}
        <rect x="28" y="48" width="8" height="10" fill="black" />
        <rect x="30" y="48" width="4" height="10" fill={color} opacity="0.5" />
        {/* Pommel */}
        <rect x="26" y="58" width="12" height="4" fill="black" />
        <rect x="30" y="58" width="4" height="4" fill={color} />
    </svg>
)

export function PageTransitionMoves() {
    const prefersRM = useReducedMotion()
    const [phase, setPhase] = useState(0) // 0: Idle, 1: Clash, 2: Settled

    useEffect(() => {
        const timers = [
            setTimeout(() => setPhase(1), 500), // El momento exacto del choque
            setTimeout(() => setPhase(2), 700),
        ]
        return () => timers.forEach(t => clearTimeout(t))
    }, [])

    // Generar chispas aleatorias para el impacto
    const sparks = [...Array(12)].map((_, i) => ({
        id: i,
        angle: (i / 12) * Math.PI * 2 + (Math.random() * 0.5),
        distance: 200 + Math.random() * 150
    }))

    if (prefersRM) {
        return (
            <motion.div
                className="fixed inset-0 bg-[#FF003C] z-[999]"
                initial={{ opacity: 1 }} animate={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            />
        )
    }

    return (
        <motion.div
            className="fixed inset-0 z-[1000] flex items-center justify-center overflow-hidden bg-[#050505] pointer-events-none"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ delay: 2.2, duration: 0.4, ease: "easeIn" }}
        >
            {/* ── BACKGROUND: TECHNICAL GRID & FLASH ── */}
            <motion.div 
                className="absolute inset-0 z-0 opacity-20"
                animate={phase === 1 ? { opacity: [0.2, 0.5, 0.2] } : {}}
                style={{ 
                    backgroundImage: `linear-gradient(#FF003C 1px, transparent 1px), linear-gradient(90deg, #FF003C 1px, transparent 1px)`,
                    backgroundSize: "60px 60px",
                    mixBlendMode: "overlay"
                }}
            />

            {/* Flash de Impacto Rojo */}
            <motion.div 
                animate={phase === 1 ? { opacity: [0, 0.4, 0] } : { opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 z-10 bg-[#FF003C]"
            />

            {/* ── COMBAT COREOGRAPHY ── */}
            <motion.div
                animate={phase === 1 ? { 
                    x: [-15, 15, -10, 10, 0], 
                    y: [10, -10, 5, -5, 0],
                    scale: [1, 1.05, 1]
                } : {}}
                transition={{ duration: 0.3 }}
                className="relative w-full h-full flex items-center justify-center"
            >
                {/* Espada 1: Crimson (Left) */}
                <motion.div
                    initial={{ x: "-120vw", y: "100vh", rotate: -45 }}
                    animate={phase >= 1 ? { x: "5%", y: "-5%", rotate: -45 } : {}}
                    transition={{ type: "spring", stiffness: 100, damping: 12, mass: 1 }}
                    className="absolute z-20"
                >
                    <ElitePixelSword color="#FF003C" side="left" />
                </motion.div>

                {/* Espada 2: White (Right) */}
                <motion.div
                    initial={{ x: "120vw", y: "100vh", rotate: 45 }}
                    animate={phase >= 1 ? { x: "-5%", y: "-5%", rotate: 45 } : {}}
                    transition={{ type: "spring", stiffness: 100, damping: 12, mass: 1, delay: 0.05 }}
                    className="absolute z-20"
                >
                    <ElitePixelSword color="white" side="right" />
                </motion.div>

                {/* Chispas de Colisión */}
                {phase === 1 && sparks.map((spark) => (
                    <motion.div
                        key={spark.id}
                        initial={{ x: 0, y: 0, scale: 2 }}
                        animate={{ 
                            x: Math.cos(spark.angle) * spark.distance, 
                            y: Math.sin(spark.angle) * spark.distance,
                            scale: 0,
                            rotate: 360
                        }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="absolute w-4 h-4 bg-white z-30"
                        style={{ boxShadow: `0 0 10px #FF003C` }}
                    />
                ))}

                {/* ── TEXTO 'MOVES' CON ABERRACIÓN CROMÁTICA ── */}
                <AnimatePresence>
                    {phase >= 1 && (
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: [0.5, 1.3, 1], opacity: 1 }}
                            transition={{ duration: 0.4, ease: "backOut", delay: 0.1 }}
                            className="relative z-40"
                        >
                            <div className="relative inline-block select-none">
                                <h1 className="font-['Press_Start_2P'] text-[60px] sm:text-[100px] md:text-[140px] text-transparent leading-none">
                                    MOVES
                                </h1>
                                {/* Capa Roja (Desplazada) */}
                                <h1 className="absolute inset-0 font-['Press_Start_2P'] text-[60px] sm:text-[100px] md:text-[140px] text-[#FF003C] leading-none mix-blend-screen translate-x-[6px] translate-y-[3px] opacity-90">
                                    MOVES
                                </h1>
                                {/* Capa Cian (Desplazada) */}
                                <h1 className="absolute inset-0 font-['Press_Start_2P'] text-[60px] sm:text-[100px] md:text-[140px] text-[#00FFFF] leading-none mix-blend-screen -translate-x-[6px] -translate-y-[3px] opacity-90">
                                    MOVES
                                </h1>
                                {/* Capa Blanca con Neon Glow */}
                                <h1 className="absolute inset-0 font-['Press_Start_2P'] text-[60px] sm:text-[100px] md:text-[140px] text-white leading-none drop-shadow-[0_0_25px_rgba(255,255,255,0.8)]">
                                    MOVES
                                </h1>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* ── SCANLINES DINÁMICOS CON DISTORSIÓN ── */}
            <motion.div 
                animate={phase === 1 ? { opacity: [0.2, 0.5, 0.2], scaleY: [1, 1.02, 1] } : {}}
                className="absolute inset-0 pointer-events-none z-[100]" 
                style={{ 
                    backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 4px)",
                    backgroundSize: "100% 4px"
                }} 
            />

            {/* Barrido final de salida */}
            <motion.div 
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ delay: 2.1, duration: 0.4, ease: "easeInOut" }}
                className="absolute inset-0 z-[110] bg-white opacity-10"
            />
        </motion.div>
    )
}