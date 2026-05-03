"use client"

import { motion, useReducedMotion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

// ── SUB-COMPONENTS: PRO PIXEL ANIMATIONS ──

// 1. PHYSICAL: BRUTAL STRIKE
const BrutalStrike = ({ color }: { color: string }) => {
    // Generar ángulos aleatorios para las partículas de impacto seco
    const particles = [...Array(24)].map((_, i) => {
        const angle = (i / 24) * Math.PI * 2
        return {
            x: Math.cos(angle) * (150 + Math.random() * 100),
            y: Math.sin(angle) * (150 + Math.random() * 100),
        }
    })

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {/* Barrage de Golpes (Diagonales rápidas) */}
            {[...Array(10)].map((_, i) => (
                <motion.div
                    key={`strike-${i}`}
                    initial={{ scale: 0, x: i % 2 === 0 ? -600 : 600, y: i % 3 === 0 ? -400 : 400, opacity: 0 }}
                    animate={{ scale: 2, x: 0, y: 0, opacity: [0, 1, 0] }}
                    transition={{ duration: 0.15, delay: i * 0.05, ease: "circIn" }}
                    className="absolute w-[200px] h-[2px] bg-white"
                    style={{ rotate: `${45 + (i * 15)}deg`, boxShadow: `0 0 10px ${color}` }}
                />
            ))}

            {/* Impacto Final - Frame Freeze & Partículas */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 3, 3, 2.5], opacity: [0, 1, 1, 0] }}
                transition={{ 
                    duration: 0.6, 
                    delay: 0.6, 
                    times: [0, 0.1, 0.4, 1], // Crea el efecto "Frame Freeze"
                    ease: "easeOut" 
                }}
                className="relative z-30"
            >
                {/* SVG Pixel-Art: Puño */}
                <svg width="64" height="64" viewBox="0 0 32 32" fill="none" shapeRendering="crispEdges">
                    <rect x="12" y="8" width="12" height="16" fill="white" />
                    <rect x="8" y="12" width="4" height="12" fill="white" />
                    <rect x="24" y="12" width="4" height="8" fill="white" />
                    {/* Nudillos */}
                    <rect x="12" y="8" width="4" height="4" fill={color} />
                    <rect x="16" y="8" width="4" height="4" fill="black" />
                    <rect x="20" y="10" width="4" height="4" fill={color} />
                </svg>

                {/* Partículas de impacto seco (saltan radialmente) */}
                {particles.map((pos, i) => (
                    <motion.div
                        key={`particle-${i}`}
                        initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                        animate={{ x: pos.x, y: pos.y, scale: 0, opacity: 0 }}
                        transition={{ duration: 0.4, delay: 0.7, ease: "circOut" }}
                        className="absolute top-1/2 left-1/2 w-2 h-2 bg-white"
                        style={{ marginLeft: '-4px', marginTop: '-4px' }}
                    />
                ))}
            </motion.div>
        </div>
    )
}

// 2. SPECIAL: ARCANE SURGE
const ArcaneSurge = ({ color }: { color: string }) => (
    <div className="relative w-full h-full flex items-center justify-center">
        {/* Pre-carga: Orbes convergiendo */}
        {[...Array(15)].map((_, i) => (
            <motion.div
                key={`orb-${i}`}
                initial={{ 
                    x: (Math.random() - 0.5) * 800, 
                    y: (Math.random() - 0.5) * 800, 
                    scale: 0, 
                    opacity: 0 
                }}
                animate={{ x: 0, y: 0, scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 0.6, delay: Math.random() * 0.4, ease: "circIn" }}
                className="absolute w-3 h-3 rounded-full"
                style={{ backgroundColor: color, filter: "blur(2px)", boxShadow: `0 0 10px ${color}` }}
            />
        ))}

        {/* Core Flare & Resplandor Cromático */}
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.1 }}
            className="relative z-20 flex justify-center items-center"
        >
            {/* SVG Pixel-Art: Estrella Mágica/Ojo */}
            <motion.svg 
                animate={{ rotate: 180, scale: [1, 1.2, 1] }} 
                transition={{ duration: 0.5, delay: 0.6, repeat: 2 }}
                width="80" height="80" viewBox="0 0 32 32" fill="none" shapeRendering="crispEdges"
                style={{ filter: `drop-shadow(0px 0px 15px ${color})` }}
            >
                <rect x="14" y="2" width="4" height="28" fill="white" />
                <rect x="2" y="14" width="28" height="4" fill="white" />
                <rect x="10" y="10" width="12" height="12" fill={color} />
                <rect x="12" y="12" width="8" height="8" fill="white" />
            </motion.svg>

            {/* Explosión Final: Múltiples anillos de energía */}
            {[...Array(4)].map((_, i) => (
                <motion.div
                    key={`ring-${i}`}
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 10 + (i * 5), opacity: 0 }}
                    transition={{ delay: 0.7 + (i * 0.1), duration: 0.8, ease: "easeOut" }}
                    className="absolute inset-0 rounded-full border-[4px]"
                    style={{ borderColor: i % 2 === 0 ? "white" : color, filter: "blur(4px)" }}
                />
            ))}
        </motion.div>
    </div>
)

// 3. STATUS: STRATEGIC OVERLAY
const StrategicOverlay = ({ color }: { color: string }) => {
    // Generar bits que suben y bajan
    const bits = [...Array(40)].map((_, i) => ({
        left: `${Math.random() * 100}%`,
        direction: Math.random() > 0.5 ? 1 : -1,
        delay: Math.random() * 1.5
    }))

    return (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            {/* Rejilla de datos tácticos en 3D */}
            <motion.div 
                className="absolute inset-0 grid grid-cols-8 gap-4 opacity-30"
                style={{ perspective: "1000px" }}
            >
                {[...Array(64)].map((_, i) => (
                    <motion.div
                        key={`hex-${i}`}
                        initial={{ opacity: 0, rotateY: 90 }}
                        animate={{ opacity: 1, rotateY: [0, 180, 360] }}
                        transition={{ duration: 3, delay: Math.random() * 0.5, repeat: Infinity, ease: "linear" }}
                        className="w-full h-12 border flex items-center justify-center font-mono text-[10px]"
                        style={{ 
                            borderColor: color, 
                            color: color, 
                            clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)" 
                        }}
                    >
                        {Math.random().toString(16).substring(2, 4).toUpperCase()}
                    </motion.div>
                ))}
            </motion.div>

            {/* Flujo de Bits (2x2 píxeles) */}
            {bits.map((bit, i) => (
                <motion.div
                    key={`bit-${i}`}
                    initial={{ y: bit.direction === 1 ? "100vh" : "-100vh", x: 0, opacity: 0 }}
                    animate={{ y: bit.direction === 1 ? "-100vh" : "100vh", opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, delay: bit.delay, repeat: Infinity, ease: "linear" }}
                    className="absolute w-[4px] h-[4px] bg-white z-10"
                    style={{ left: bit.left }}
                />
            ))}

            {/* Marcador Central con Glitch Periódico */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1.2 }}
                transition={{ duration: 0.4, type: "spring" }}
                className="relative z-20 flex flex-col items-center"
            >
                <motion.div
                    animate={{ 
                        x: [0, -4, 4, -2, 2, 0, 0, 0, 0], // Efecto Glitch
                        filter: ["hue-rotate(0deg)", "hue-rotate(90deg)", "hue-rotate(-90deg)", "hue-rotate(0deg)"]
                    }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1.5 }}
                    className="relative"
                >
                    {/* SVG Pixel-Art: Escudo Táctico */}
                    <svg width="96" height="96" viewBox="0 0 32 32" fill="none" shapeRendering="crispEdges">
                        <rect x="6" y="4" width="20" height="4" fill="white" />
                        <rect x="4" y="8" width="24" height="12" fill="white" />
                        <rect x="8" y="20" width="16" height="4" fill="white" />
                        <rect x="12" y="24" width="8" height="4" fill="white" />
                        {/* Detalles internos */}
                        <rect x="10" y="8" width="12" height="8" fill="black" />
                        <rect x="14" y="10" width="4" height="4" fill={color} />
                    </svg>
                </motion.div>
            </motion.div>
        </div>
    )
}

interface Props {
    typeColor: string
    typeName: string
    moveName: string
    moveClass: "physical" | "special" | "status"
}

export function PageTransitionMove({ typeColor, typeName, moveName, moveClass }: Props) {
    const prefersRM = useReducedMotion()
    const [phase, setPhase] = useState(0)

    useEffect(() => {
        // Fase 1: Inicia la animación de la clase de movimiento.
        // Fase 2: Impacto/Shake de la pantalla general.
        const timers = [
            setTimeout(() => setPhase(1), 50),
            setTimeout(() => setPhase(2), 600), // Sincronizado con el frame freeze y la explosión
        ]
        return () => timers.forEach(t => clearTimeout(t))
    }, [])

    if (prefersRM) {
        return (
            <motion.div
                className="fixed inset-0 z-[999] pointer-events-none"
                style={{ backgroundColor: typeColor }}
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            />
        )
    }

    return (
        <motion.div
            className="fixed inset-0 z-[1000] pointer-events-none flex items-center justify-center overflow-hidden bg-[#050505]"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            // Salida suave a los 2.2 segundos para no bloquear la navegación
            transition={{ delay: 2.2, duration: 0.4, ease: "easeIn" }}
        >
            {/* ── SCREEN SHAKE MASIVO (Aumentado para el feel pesado) ── */}
            <motion.div 
                animate={
                    phase === 2 && moveClass === "physical" ? { x: [-20, 20, -15, 15, -5, 5, 0], y: [20, -20, 15, -15, 5, -5, 0] } :
                    phase === 2 ? { x: [-5, 5, -5, 5, 0], y: [5, -5, 5, -5, 0] } : {}
                }
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative w-full h-full flex items-center justify-center"
            >
                {/* ── CLASH FLASH CROMÁTICO ── */}
                <motion.div 
                    animate={phase === 2 ? { opacity: [0, 0.8, 0] } : { opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 z-50 mix-blend-overlay"
                    style={{ backgroundColor: typeColor }}
                />

                {/* ── CATEGORY SPECIFIC ANIMATION ── */}
                <div className="absolute inset-0 z-10">
                    {phase >= 1 && (
                        <>
                            {moveClass === "physical" && <BrutalStrike color={typeColor} />}
                            {moveClass === "special" && <ArcaneSurge color={typeColor} />}
                            {moveClass === "status" && <StrategicOverlay color={typeColor} />}
                        </>
                    )}
                </div>

                {/* ── TEXT REVEAL: ABERRACIÓN CROMÁTICA REAL ── */}
                <AnimatePresence>
                    {phase >= 1 && (
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, type: "spring", stiffness: 400, damping: 20 }}
                            className="relative z-40 flex flex-col items-center"
                        >
                            {/* Aberración Cromática (Rojo, Cian, Blanco) */}
                            <div className="relative inline-block select-none">
                                <h1 className="font-['Press_Start_2P'] text-[30px] sm:text-[50px] md:text-[80px] text-transparent text-center leading-none">
                                    {(moveName ?? "Unknown").toUpperCase()}
                                </h1>
                                {/* Capa Roja */}
                                <h1 className="absolute inset-0 font-['Press_Start_2P'] text-[30px] sm:text-[50px] md:text-[80px] text-[#FF003C] text-center leading-none mix-blend-screen translate-x-[4px] translate-y-[2px] opacity-80">
                                    {(moveName ?? "Unknown").toUpperCase()}
                                </h1>
                                {/* Capa Cian */}
                                <h1 className="absolute inset-0 font-['Press_Start_2P'] text-[30px] sm:text-[50px] md:text-[80px] text-[#00FFFF] text-center leading-none mix-blend-screen -translate-x-[4px] -translate-y-[2px] opacity-80">
                                    {(moveName ?? "Unknown").toUpperCase()}
                                </h1>
                                {/* Capa Blanca Principal */}
                                <h1 className="absolute inset-0 font-['Press_Start_2P'] text-[30px] sm:text-[50px] md:text-[80px] text-white text-center leading-none drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                                    {(moveName ?? "Unknown").toUpperCase()}
                                </h1>
                            </div>
                            
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: "120%" }}
                                transition={{ delay: 0.8, duration: 0.3, ease: "easeOut" }}
                                className="h-[4px] mt-8 relative"
                                style={{ backgroundColor: typeColor, boxShadow: `0 0 15px ${typeColor}` }}
                            />

                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1, duration: 0.3 }}
                                className="mt-8 flex items-center gap-6"
                            >
                                <div className="px-8 py-2 bg-[#0a0a0a] border-4 border-white shadow-[6px_6px_0_#000]">
                                    <span className="font-mono text-[16px] font-black tracking-widest" style={{ color: typeColor }}>
                                        {typeName.toUpperCase()}
                                    </span>
                                </div>
                                <div className="px-8 py-2 bg-white text-black font-black font-mono text-[16px] tracking-widest shadow-[6px_6px_0_#000]">
                                    {moveClass.toUpperCase()}
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* ── SCANLINES CRT (Fino y Elegante) ── */}
            <div className="absolute inset-0 pointer-events-none z-[100] opacity-[0.15]" 
                 style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 4px)" }} />
        </motion.div>
    )
}