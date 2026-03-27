"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react"

interface FlavorEntry {
    flavor_text: string
    language: { name: string }
    version: { name: string }
}

interface Props {
    flavors?: FlavorEntry[]
}

const GAME_LABELS: Record<string, string> = {
    "red": "Rojo", "blue": "Azul", "yellow": "Amarillo",
    "gold": "Oro", "silver": "Plata", "crystal": "Cristal",
    "ruby": "Rubí", "sapphire": "Zafiro", "emerald": "Esmeralda",
    "firered": "Rojo Fuego", "leafgreen": "Verde Hoja",
    "diamond": "Diamante", "pearl": "Perla", "platinum": "Platino",
    "heartgold": "Oro HeartGold", "soulsilver": "Plata SoulSilver",
    "black": "Negro", "white": "Blanco", "black-2": "Negro 2", "white-2": "Blanco 2",
    "x": "X", "y": "Y", "omega-ruby": "Rubí Omega", "alpha-sapphire": "Zafiro Alfa",
    "sun": "Sol", "moon": "Luna", "ultra-sun": "Ultrasol", "ultra-moon": "Ultraluna",
    "sword": "Espada", "shield": "Escudo", "scarlet": "Escarlata", "violet": "Violeta",
    "legends-arceus": "Leyendas Arceus", "brilliant-diamond": "Diamante Brillante", "shining-pearl": "Perla Reluciente",
    "lets-go-pikachu": "Let's Go Pikachu", "lets-go-eevee": "Let's Go Eevee"
}

function TypewriterText({ text, prefersRM }: { text: string; prefersRM: boolean | null }) {
    const [displayed, setDisplayed] = useState(prefersRM ? text : "")
    const [done, setDone] = useState(prefersRM ?? false)

    useEffect(() => {
        if (prefersRM) { setDisplayed(text); setDone(true); return }
        setDisplayed("")
        setDone(false)
        let i = 0
        const interval = setInterval(() => {
            i++
            setDisplayed(text.slice(0, i))
            if (i >= text.length) { clearInterval(interval); setDone(true) }
        }, 16)
        return () => clearInterval(interval)
    }, [text, prefersRM])

    return (
        <span className="relative">
            <span className="font-['Press_Start_2P'] text-[11px] leading-[2.2] text-[#111111] uppercase break-words font-black">
                {displayed}
                {!done && (
                    <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="inline-block w-[8px] h-[12px] bg-[#CC0000] ml-[4px] align-baseline"
                    />
                )}
            </span>
        </span>
    )
}

export function FlavorTextCarousel({ flavors }: Props) {
    const prefersRM = useReducedMotion()
    const [index, setIndex] = useState(0)
    const [dir, setDir] = useState(1)

    const entries = useMemo(() => {
        if (!flavors) return []

        const esEntries = flavors.filter(f => f.language.name.startsWith("es"))
        const enEntries = flavors.filter(f => f.language.name === "en")

        const source = esEntries.length > 0 ? esEntries : enEntries

        const seen = new Set<string>()
        return source
            .filter(f => {
                const key = f.flavor_text.replace(/\s+/g, " ").trim()
                if (seen.has(key)) return false
                seen.add(key)
                return true
            })
            .slice(0, 12)
    }, [flavors])

    if (entries.length === 0) return null

    const current = entries[index]
    const cleanText = current.flavor_text.replace(/\f/g, " ").replace(/\n/g, " ").replace(/\s+/g, " ").trim()

    const go = (newDir: number) => {
        setDir(newDir)
        setIndex(i => Math.max(0, Math.min(entries.length - 1, i + newDir)))
    }

    return (
        <div className="mb-10">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-['Press_Start_2P'] text-[12px] text-[#111111] flex items-center gap-3">
                    <span className="w-3 h-3 bg-[#111111]" />
                    ENTRADA POKÉDEX
                </h3>
                <div className="relative group">
                    <select
                        value={index}
                        onChange={(e) => {
                            const newIdx = Number(e.target.value)
                            setDir(newIdx > index ? 1 : -1)
                            setIndex(newIdx)
                        }}
                        className="font-['Press_Start_2P'] text-[8px] text-[#111111] bg-[#FFFFFF] border-2 border-[#111111] px-4 py-2 outline-none cursor-pointer shadow-[3px_3px_0_#111111] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0_#111111] transition-all appearance-none pr-10"
                    >
                        {entries.map((entry, i) => (
                            <option key={i} value={i}>
                                {GAME_LABELS[entry.version.name]?.toUpperCase() ?? entry.version.name.toUpperCase()}
                            </option>
                        ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <ChevronDown size={14} strokeWidth={3} />
                    </div>
                </div>
            </div>

            <div className="border-[3px] border-[#111111] bg-white p-8 relative overflow-hidden shadow-[6px_6px_0_#111111]">
                {/* Decorative dots in corners */}
                <div className="absolute top-2 left-2 w-1.5 h-1.5 bg-[#111111] rounded-full opacity-20" />
                <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#111111] rounded-full opacity-20" />
                <div className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-[#111111] rounded-full opacity-20" />
                <div className="absolute bottom-2 right-2 w-1.5 h-1.5 bg-[#111111] rounded-full opacity-20" />
                <AnimatePresence mode="wait" custom={dir}>
                    <motion.div
                        key={index}
                        custom={dir}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.15 }}
                        className="min-h-[85px]"
                    >
                        <TypewriterText text={cleanText} prefersRM={prefersRM} />
                    </motion.div>
                </AnimatePresence>
                
                {/* LCD Scanline effect overlay */}
                <div 
                    className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-20" 
                    style={{ 
                        backgroundImage: "linear-gradient(rgba(0,0,0,0) 50%, rgba(0,0,0,0.25) 50%)", 
                        backgroundSize: "100% 4px" 
                    }} 
                />
            </div>
        </div>
    )
}
