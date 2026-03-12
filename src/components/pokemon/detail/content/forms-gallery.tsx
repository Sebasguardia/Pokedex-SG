"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { getIdFromUrl } from "@/lib/utils/pokemon.utils"
import { TYPE_CONSTANTS } from "@/lib/constants/types.constants"

interface Props {
    pokemon?: any
    species?: any
    typeColor?: string
}

export function FormsGallery({ pokemon, species, typeColor = "#CC0000" }: Props) {
    if (!pokemon) return null

    const varieties = species?.varieties ?? []
    if (varieties.length <= 1) {
        return (
            <div className="mb-6">
                <h3 className="font-['Press_Start_2P'] text-[9px] text-[#888888] mb-3 tracking-wide">FORMAS ALTERNATIVAS</h3>
                <p className="font-['Nunito'] text-[13px] italic text-[#888888]">Este Pokémon no tiene formas alternativas</p>
            </div>
        )
    }

    return (
        <div className="mb-6">
            <h3 className="font-['Press_Start_2P'] text-[9px] text-[#888888] mb-3 tracking-wide">FORMAS ALTERNATIVAS</h3>
            <div className="flex flex-wrap gap-3">
                {varieties.map((v: any, i: number) => {
                    const isDefault = v.is_default
                    const pokemonName: string = v.pokemon.name
                    const parts = v.pokemon.url.split("/").filter(Boolean)
                    const id = parseInt(parts[parts.length - 1])
                    const isMega = pokemonName.includes("mega")
                    const isGmax = pokemonName.includes("gmax")
                    const isAlola = pokemonName.includes("alola")
                    const isGalar = pokemonName.includes("galar")
                    const isHisui = pokemonName.includes("hisui")
                    const isPaldea = pokemonName.includes("paldea")
                    const isCurrent = pokemon.id === id

                    let badge = null
                    if (isCurrent) badge = { label: "Forma actual", style: { backgroundColor: typeColor + "22", border: `1px solid ${typeColor}`, color: typeColor } }
                    else if (isMega) badge = { label: "MEGA", style: { backgroundColor: "#111111", border: "2px solid #CC0000", color: "white" } }
                    else if (isGmax) badge = { label: "G-MAX", style: { backgroundColor: "#111111", border: "2px solid #CC0000", color: "white" } }
                    else if (isAlola) badge = { label: "Alola", style: { backgroundColor: "#FED7AA", border: "1px solid #F97316", color: "#9A3412" } }
                    else if (isGalar) badge = { label: "Galar", style: { backgroundColor: "#E0E7FF", border: "1px solid #818CF8", color: "#312E81" } }
                    else if (isHisui) badge = { label: "Hisui", style: { backgroundColor: "#DCFCE7", border: "1px solid #4ADE80", color: "#14532D" } }
                    else if (isPaldea) badge = { label: "Paldea", style: { backgroundColor: "#DBEAFE", border: "1px solid #60A5FA", color: "#1E3A8A" } }

                    const formattedName = pokemonName.split("-").map((w: string) => w[0]?.toUpperCase() + w.slice(1)).join(" ")

                    return (
                        <motion.div
                            key={pokemonName}
                            initial={{ scale: 0, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08, type: "spring", stiffness: 300, damping: 22 }}
                        >
                            <Link href={`/pokemon/${id}`} className="flex flex-col items-center gap-2 group">
                                <motion.div
                                    className="relative flex items-center justify-center bg-[#F8F8F8]"
                                    style={{
                                        width: 80, height: 80,
                                        border: isCurrent ? `2px solid ${typeColor}` : "1px solid #E0E0E0",
                                        boxShadow: isCurrent ? `0 0 0 3px ${typeColor}33` : "none"
                                    }}
                                    whileHover={{ scale: 1.08, borderColor: "#111111" }}
                                >
                                    <Image
                                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                                        alt={formattedName}
                                        width={64}
                                        height={64}
                                        style={{ imageRendering: "pixelated" }}
                                    />
                                </motion.div>
                                <div className="flex flex-col items-center gap-1">
                                    {badge && (
                                        <span
                                            className="font-['Press_Start_2P'] text-[6px] px-1 py-[2px]"
                                            style={badge.style}
                                        >
                                            {badge.label}
                                        </span>
                                    )}
                                    <span className="font-['Nunito'] text-[11px] font-bold text-[#444444] group-hover:text-[#111111] text-center max-w-[80px] capitalize">
                                        {formattedName}
                                    </span>
                                </div>
                            </Link>
                        </motion.div>
                    )
                })}
            </div>
        </div>
    )
}
