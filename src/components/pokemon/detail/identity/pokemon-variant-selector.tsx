"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Check } from "lucide-react"

interface Props {
    pokemon: any
    species: any
    typeColor?: string
}

export function PokemonVariantSelector({ pokemon, species, typeColor = "#CC0000" }: Props) {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const varieties = species?.varieties ?? []

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    if (varieties.length <= 1) return null

    const activeIndex = varieties.findIndex((v: any) => {
        const parts = v.pokemon.url.split("/").filter(Boolean)
        const id = parseInt(parts[parts.length - 1])
        return id === pokemon.id
    })
    
    const activeVariety = varieties[activeIndex > -1 ? activeIndex : 0]
    
    const formatName = (name: string) => {
        return name.split("-").map((w: string) => w[0]?.toUpperCase() + w.slice(1)).join(" ")
    }

    return (
        <div className="mb-4 relative z-50 w-full" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between px-4 py-3 bg-white border-2 border-[#111111] transition-transform hover:-translate-y-1 active:translate-y-0"
                style={{ 
                    boxShadow: isOpen ? "2px 2px 0 #111111" : "4px 4px 0 #111111",
                }}
            >
                <div className="flex flex-col items-start gap-1">
                    <span className="font-['Press_Start_2P'] text-[8px] text-[#888888] tracking-widest uppercase">
                        Variante Actual
                    </span>
                    <span className="font-['Nunito'] text-[15px] font-black text-[#111111] leading-none flex items-center gap-2">
                        {formatName(activeVariety.pokemon.name)}
                    </span>
                </div>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                    <ChevronDown size={20} className="text-[#111111]" strokeWidth={3} />
                </motion.div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-[#111111] flex flex-col overflow-hidden max-h-[300px] overflow-y-auto"
                        style={{ boxShadow: "6px 6px 0 rgba(0,0,0,1)" }}
                    >
                        {varieties.map((v: any) => {
                            const parts = v.pokemon.url.split("/").filter(Boolean)
                            const id = parseInt(parts[parts.length - 1])
                            const isCurrent = pokemon.id === id
                            const name = formatName(v.pokemon.name)
                            const isMega = v.pokemon.name.includes("mega")
                            const isGmax = v.pokemon.name.includes("gmax")
                            const isAlola = v.pokemon.name.includes("alola")
                            const isGalar = v.pokemon.name.includes("galar")
                            const isHisui = v.pokemon.name.includes("hisui")
                            const isPaldea = v.pokemon.name.includes("paldea")

                            let badge = null
                            if (isMega) badge = { label: "MEGA", bg: "#111111", border: "#CC0000", text: "white" }
                            else if (isGmax) badge = { label: "G-MAX", bg: "#111111", border: "#CC0000", text: "white" }
                            else if (isAlola) badge = { label: "Alola", bg: "#FED7AA", border: "#F97316", text: "#9A3412" }
                            else if (isGalar) badge = { label: "Galar", bg: "#E0E7FF", border: "#818CF8", text: "#312E81" }
                            else if (isHisui) badge = { label: "Hisui", bg: "#DCFCE7", border: "#4ADE80", text: "#14532D" }
                            else if (isPaldea) badge = { label: "Paldea", bg: "#DBEAFE", border: "#60A5FA", text: "#1E3A8A" }

                            return (
                                <Link 
                                    key={id} 
                                    href={`/pokemon/${id}`}
                                    onClick={() => setIsOpen(false)}
                                    className={`flex items-center justify-between px-4 py-3 border-b-2 border-dashed border-[#E0E0E0] last:border-b-0 transition-colors ${isCurrent ? "bg-[#F8F8F8]" : "hover:bg-gray-50"}`}
                                >
                                    <div className="flex flex-col gap-1.5">
                                        <span className={`font-['Nunito'] text-[14px] font-bold ${isCurrent ? "text-[#111111]" : "text-[#555555]"}`}>
                                            {name}
                                        </span>
                                        {badge && (
                                            <span 
                                                className="self-start font-['Press_Start_2P'] text-[6px] px-1.5 py-1 border-2 shadow-[1px_1px_0_#111111]"
                                                style={{ backgroundColor: badge.bg, borderColor: badge.border, color: badge.text }}
                                            >
                                                {badge.label}
                                            </span>
                                        )}
                                    </div>
                                    {isCurrent && (
                                        <div className="w-6 h-6 rounded-full flex items-center justify-center border-2 border-[#111111]" style={{ backgroundColor: typeColor }}>
                                            <Check size={14} className="text-white" strokeWidth={3} />
                                        </div>
                                    )}
                                </Link>
                            )
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
