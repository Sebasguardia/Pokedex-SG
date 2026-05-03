"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { getIdFromUrl } from "@/lib/utils/pokemon.utils"
import { TYPE_CONSTANTS } from "@/lib/constants/types/types.constants"
import { PokemonSprite } from "@/components/shared/pokemon/pokemon-sprite"

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
            <div className="mb-8">
                <h3 className="font-['Press_Start_2P'] text-[10px] sm:text-[12px] text-[#111111] mb-6 flex items-center gap-3">
                    <span className="w-3 h-3 bg-[#111111]" />
                    FORMAS ALTERNATIVAS
                    <span className="flex-1 h-[2px] bg-[#E0E0E0]" />
                </h3>
                <p className="font-['Nunito'] text-[14px] italic text-[#888888] bg-[#F8F8F8] p-4 border-2 border-dashed border-[#E0E0E0]">Este Pokémon no tiene formas alternativas</p>
            </div>
        )
    }

    return (
        <div className="mb-8">
            <h3 className="font-['Press_Start_2P'] text-[12px] text-[#111111] mb-6 flex items-center gap-3">
                <span className="w-3 h-3 bg-[#111111]" />
                FORMAS ALTERNATIVAS
                <span className="flex-1 h-[2px] bg-[#E0E0E0]" />
            </h3>
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
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05, duration: 0.3 }}
                        >
                            <Link href={`/pokemon/${id}`} className="flex flex-col items-center gap-3 group">
                                <motion.div
                                    className="relative flex items-center justify-center bg-white"
                                    style={{
                                        width: 100, height: 100,
                                        border: "3px solid #111111",
                                        boxShadow: isCurrent ? `6px 6px 0 ${typeColor}` : "6px 6px 0 rgba(0,0,0,1)",
                                        borderRadius: "8px"
                                    }}
                                    whileHover={{ scale: 1.05, translateY: -4, boxShadow: "10px 10px 0 #111111" }}
                                >
                                    <PokemonSprite
                                        id={id}
                                        name={pokemonName}
                                        size={80}
                                    />
                                </motion.div>
                                <div className="flex flex-col items-center gap-2">
                                    {badge && (
                                        <span
                                            className="font-['Press_Start_2P'] text-[7px] px-2 py-1.5 border-2 border-[#111111] shadow-[2px_2px_0_#111111]"
                                            style={{ 
                                                backgroundColor: badge.style.backgroundColor === "#111111" ? "#111111" : "#FFFFFF",
                                                color: badge.style.backgroundColor === "#111111" ? "#FFFFFF" : "#111111",
                                                borderColor: "#111111"
                                            }}
                                        >
                                            {badge.label.toUpperCase()}
                                        </span>
                                    )}
                                    <span className="font-['Press_Start_2P'] text-[9px] text-[#111111] group-hover:text-[#CC0000] text-center max-w-[100px] capitalize leading-tight transition-colors">
                                        {formattedName.toLowerCase()}
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
