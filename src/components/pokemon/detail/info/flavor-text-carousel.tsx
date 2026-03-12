"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

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
            <span className="font-['Nunito'] text-[15px] leading-[1.8] text-[#444444] italic">
                {displayed}
                {!done && (
                    <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="inline-block w-[1px] h-[1em] bg-[#CC0000] ml-[1px] align-text-bottom"
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
        <div className="mb-8">
            <div className="border-l-[4px] border-[#CC0000] bg-[#F8F8F8] p-5 relative overflow-hidden">
                <AnimatePresence mode="wait" custom={dir}>
                    <motion.div
                        key={index}
                        custom={dir}
                        initial={{ opacity: 0, x: dir * 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: dir * -20 }}
                        transition={{ duration: 0.2 }}
                        className="min-h-[72px]"
                    >
                        <TypewriterText text={cleanText} prefersRM={prefersRM} />
                    </motion.div>
                </AnimatePresence>
                <div className="mt-3 flex justify-end">
                    <span className="font-['Nunito'] text-[11px] text-[#888888]">
                        Pokémon {GAME_LABELS[current.version.name] ?? current.version.name}
                    </span>
                </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-3 px-1">
                <button
                    onClick={() => go(-1)}
                    disabled={index === 0}
                    className="w-7 h-7 flex items-center justify-center border border-[#E0E0E0] disabled:opacity-30 hover:border-[#111111] transition-colors"
                >
                    <ChevronLeft size={14} />
                </button>

                {/* Dots */}
                <div className="flex items-center gap-[6px]">
                    {entries.map((_, i) => (
                        <motion.button
                            key={i}
                            onClick={() => { setDir(i > index ? 1 : -1); setIndex(i) }}
                            animate={{ width: i === index ? 16 : 6, backgroundColor: i === index ? "#CC0000" : "#E0E0E0" }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            className="h-[6px] rounded-full"
                            layoutId={`dot-${i}`}
                        />
                    ))}
                </div>

                <button
                    onClick={() => go(1)}
                    disabled={index === entries.length - 1}
                    className="w-7 h-7 flex items-center justify-center border border-[#E0E0E0] disabled:opacity-30 hover:border-[#111111] transition-colors"
                >
                    <ChevronRight size={14} />
                </button>
            </div>
        </div>
    )
}
