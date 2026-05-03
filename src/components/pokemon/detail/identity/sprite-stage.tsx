"use client"

import { forwardRef, useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import * as Tooltip from "@radix-ui/react-tooltip"
import { Sparkles, RefreshCw, Volume2 } from "lucide-react"
import { PokemonSprite } from "@/components/shared/pokemon/pokemon-sprite"

interface Props {
    sprite?: string | null
    typeColor?: string
    primaryType?: string
    isShiny?: boolean
    spriteMode?: "front" | "back"
    isCrying?: boolean
    pokemonId?: number
    pokemonName?: string
    onShinyToggle?: () => void
    onSpriteModeToggle?: () => void
    onCry?: () => void
}

const POKEBALL_SVG = `
<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <circle cx="60" cy="60" r="58" stroke="currentColor" stroke-width="4" fill="none"/>
  <path d="M2 60 Q2 2 60 2 Q118 2 118 60" stroke="currentColor" stroke-width="4" fill="none"/>
  <path d="M2 60 Q2 118 60 118 Q118 118 118 60" stroke="currentColor" stroke-width="4" fill="none"/>
  <line x1="2" y1="60" x2="42" y2="60" stroke="currentColor" stroke-width="4"/>
  <line x1="78" y1="60" x2="118" y2="60" stroke="currentColor" stroke-width="4"/>
  <circle cx="60" cy="60" r="18" stroke="currentColor" stroke-width="4" fill="none"/>
  <circle cx="60" cy="60" r="9" fill="currentColor" opacity="0.5"/>
</svg>
`

function SoundRing({ delay }: { delay: number }) {
    return (
        <motion.div
            className="absolute inset-0 m-auto rounded-full border-2 pointer-events-none"
            style={{ borderColor: "currentColor" }}
            initial={{ scale: 0.3, opacity: 0.8 }}
            animate={{ scale: 2.5, opacity: 0 }}
            transition={{ delay, duration: 0.8, ease: "easeOut" }}
        />
    )
}

const BOUNCE_Y = [0, -8, 0]

export const SpriteStage = forwardRef<HTMLDivElement, Props>(({
    sprite,
    typeColor = "#CC0000",
    primaryType = "normal",
    isShiny = false,
    spriteMode = "front",
    isCrying = false,
    pokemonId,
    pokemonName = "Pokémon",
    onShinyToggle,
    onSpriteModeToggle,
    onCry,
}, ref) => {
    const prefersRM = useReducedMotion()
    const [showShimmer, setShowShimmer] = useState(false)
    const [shinyParticles, setShinyParticles] = useState(false)
    const [imgError, setImgError] = useState(false)

    const handleShiny = () => {
        if (!isShiny) {
            setShowShimmer(true)
            setShinyParticles(true)
            setTimeout(() => setShowShimmer(false), 600)
            setTimeout(() => setShinyParticles(false), 800)
        }
        onShinyToggle?.()
    }

    return (
        <div className="mb-4">
            {/* Stage */}
            <motion.div
                ref={ref}
                className="relative overflow-hidden group"
                style={{
                    aspectRatio: "1/1",
                    border: "2px solid #111111",
                    boxShadow: "6px 6px 0 #111111",
                    backgroundColor: `${typeColor}14`
                }}
                role="img"
                aria-label={`Sprite de ${pokemonName}`}
            >
                {/* Layer 1: Type-tinted background — already set on container */}

                {/* Layer 2: Radial light circle */}
                <div className="absolute inset-0 pointer-events-none transition-transform duration-500 group-hover:scale-[1.15]">
                    <motion.div
                        className="w-full h-full"
                        style={{
                            background: `radial-gradient(circle at center, white 0%, ${typeColor}0A 70%, transparent 100%)`
                        }}
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />
                </div>

                {/* Layer 3: Grid pattern */}
                <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-500 opacity-[0.06] group-hover:opacity-10"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h24v1H0zm0 23h24v1H0zM0 0v24h1V0zm23 0v24h1V0z' fill='${encodeURIComponent(typeColor)}' fill-opacity='1'%3E%3C/path%3E%3C/svg%3E")`,
                    }}
                />

                {/* Layer 4: Pokéball watermark */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-end pointer-events-none transition-opacity duration-500 group-hover:opacity-10"
                    style={{ color: typeColor, opacity: 0.05, transform: "translateY(10%)", fontSize: "70%" }}
                    animate={{ rotate: prefersRM ? 0 : [0, 360] }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                >
                    <div
                        style={{ width: "70%", height: "70%", marginRight: "-5%", color: typeColor }}
                        dangerouslySetInnerHTML={{ __html: POKEBALL_SVG }}
                    />
                </motion.div>

                {/* Shiny shimmer overlay */}
                <AnimatePresence>
                    {showShimmer && (
                        <motion.div
                            className="absolute inset-0 pointer-events-none z-20"
                            style={{ background: "linear-gradient(45deg, transparent, rgba(255,215,0,0.5), transparent)" }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 0.6, 0] }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        />
                    )}
                </AnimatePresence>

                {/* Layer 5: Sprite */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`${isShiny}-${spriteMode}`}
                            initial={{ scale: 0, rotate: 15, opacity: 0 }}
                            animate={{
                                scale: 1, rotate: 0, opacity: 1
                            }}
                            exit={{ scale: 0, rotate: -15, opacity: 0 }}
                            transition={{
                                scale: { type: "spring", stiffness: 350, damping: 25 },
                                rotate: { type: "spring", stiffness: 350, damping: 25 },
                                opacity: { duration: 0.2 }
                            }}
                            className="w-full h-full absolute inset-0 flex justify-center items-center"
                        >
                            <div className="w-full h-full flex justify-center items-center transition-transform duration-300 group-hover:scale-[1.08]">
                                <style>{`
                                    @keyframes float-sprite {
                                        0%, 100% { transform: translateY(0); }
                                        50% { transform: translateY(-8px); }
                                    }
                                    .animate-float-sprite {
                                        animation: float-sprite 3s ease-in-out infinite;
                                    }
                                `}</style>
                                <div className={`relative flex justify-center items-center ${prefersRM ? "" : "animate-float-sprite"}`}>
                            {/* Sound rings when crying */}
                            {isCrying && !prefersRM && (
                                <div className="absolute inset-0 pointer-events-none" style={{ color: typeColor }}>
                                    <SoundRing delay={0} />
                                    <SoundRing delay={0.25} />
                                    <SoundRing delay={0.5} />
                                </div>
                            )}
                            {pokemonId ? (
                                <PokemonSprite
                                    id={pokemonId}
                                    name={pokemonName}
                                    size={160}
                                    shiny={isShiny}
                                    back={spriteMode === "back"}
                                    className="!w-[160px] !h-[160px] relative z-10"
                                    style={{
                                        filter: `drop-shadow(0 2px 6px ${typeColor}55)`,
                                    }}
                                />
                            ) : (
                                <div className="w-[130px] h-[130px] bg-[#F2F2F2] flex flex-col items-center justify-center gap-2" style={{ border: "1px solid #E0E0E0", borderRadius: "8px" }}>
                                    <span className="font-['Nunito'] text-[12px] font-bold text-[#888888] text-center px-4 leading-tight">Sin información de imagen</span>
                                    <span className="font-['Nunito'] text-[10px] text-[#AAAAAA] text-center px-4">No es un error, el Pokémon actual no posee imagen.</span>
                                </div>
                            )}
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Layer 6: Scanline */}
                {!prefersRM && (
                    <motion.div
                        className="absolute left-0 right-0 h-[1px] pointer-events-none z-20"
                        style={{
                            background: `linear-gradient(90deg, transparent, ${typeColor}66, transparent)`
                        }}
                        animate={{ y: ["-100%", "300%"] }}
                        transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 4, ease: "linear" }}
                    />
                )}
            </motion.div>

            {/* Controls */}
            <div className="flex justify-center gap-2 mt-3">
                <Tooltip.Provider delayDuration={400}>
                    {/* Shiny Toggle */}
                    <Tooltip.Root>
                        <Tooltip.Trigger asChild>
                            <motion.button
                                onClick={handleShiny}
                                className="relative flex items-center gap-2 px-3 py-[6px] border-2 border-[#111111] font-['Nunito'] text-[12px] font-bold overflow-visible"
                                style={{
                                    backgroundColor: isShiny ? "#F59E0B" : "#F2F2F2",
                                    color: isShiny ? "white" : "#888888"
                                }}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                <motion.div
                                    animate={isShiny ? { rotate: 360, scale: [1, 1.4, 1] } : {}}
                                    transition={{ duration: 0.4, ease: "backOut" }}
                                >
                                    <Sparkles size={14} />
                                </motion.div>
                                Shiny
                            </motion.button>
                        </Tooltip.Trigger>
                        <Tooltip.Portal>
                            <Tooltip.Content className="bg-[#111111] text-white font-['Nunito'] text-[11px] px-2 py-1 z-50" sideOffset={5}>
                                Ver versión shiny
                            </Tooltip.Content>
                        </Tooltip.Portal>
                    </Tooltip.Root>

                    {/* Back Toggle */}
                    <Tooltip.Root>
                        <Tooltip.Trigger asChild>
                            <motion.button
                                onClick={onSpriteModeToggle}
                                className="flex items-center gap-2 px-3 py-[6px] border-2 border-[#111111] font-['Nunito'] text-[12px] font-bold"
                                style={{
                                    backgroundColor: spriteMode === "back" ? "#111111" : "#F2F2F2",
                                    color: spriteMode === "back" ? "white" : "#888888"
                                }}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                <motion.div
                                    animate={{ rotate: spriteMode === "back" ? 360 : 0 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                                >
                                    <RefreshCw size={14} />
                                </motion.div>
                            </motion.button>
                        </Tooltip.Trigger>
                        <Tooltip.Portal>
                            <Tooltip.Content className="bg-[#111111] text-white font-['Nunito'] text-[11px] px-2 py-1 z-50" sideOffset={5}>
                                Ver sprite trasero
                            </Tooltip.Content>
                        </Tooltip.Portal>
                    </Tooltip.Root>

                    {/* Cry Button */}
                    <Tooltip.Root>
                        <Tooltip.Trigger asChild>
                            <motion.button
                                onClick={onCry}
                                className="flex items-center gap-2 px-3 py-[6px] border-2 border-[#111111] font-['Nunito'] text-[12px] font-bold"
                                style={{
                                    backgroundColor: isCrying ? "#990000" : "#CC0000",
                                    color: "white",
                                    boxShadow: "3px 3px 0 #111111"
                                }}
                                whileHover={{ x: 3, y: 3, boxShadow: "0 0 0 #111111" }}
                                animate={isCrying ? { backgroundColor: ["#CC0000", "#990000", "#CC0000"] } : {}}
                                transition={isCrying ? { duration: 0.6, repeat: Infinity } : { type: "spring" }}
                            >
                                <Volume2 size={14} />
                                {isCrying && (
                                    <>
                                        <motion.span
                                            className="w-[4px] h-[8px] bg-white rounded-full"
                                            animate={{ scaleY: [1, 1.5, 1], opacity: [0.7, 0.3, 0.7] }}
                                            transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
                                        />
                                        <motion.span
                                            className="w-[4px] h-[12px] bg-white rounded-full"
                                            animate={{ scaleY: [1, 1.5, 1], opacity: [0.5, 0.1, 0.5] }}
                                            transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
                                        />
                                    </>
                                )}
                            </motion.button>
                        </Tooltip.Trigger>
                        <Tooltip.Portal>
                            <Tooltip.Content className="bg-[#111111] text-white font-['Nunito'] text-[11px] px-2 py-1 z-50" sideOffset={5}>
                                Escuchar el grito de {pokemonName}
                            </Tooltip.Content>
                        </Tooltip.Portal>
                    </Tooltip.Root>
                </Tooltip.Provider>
            </div>
        </div>
    )
})

SpriteStage.displayName = "SpriteStage"
