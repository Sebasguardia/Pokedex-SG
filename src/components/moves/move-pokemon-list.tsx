"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Move } from "@/types/api/move.types"

interface Props {
    move: Move
    typeColor: string
}

export function MovePokemonList({ move, typeColor }: Props) {
    const learned = move.learned_by_pokemon ?? []

    if (!learned.length) return null

    return (
        <motion.section
            className="py-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <div className="flex items-center gap-3 mb-6">
                <span className="font-press-start text-[10px] text-[#111111]">
                    POKÉMON QUE APRENDEN {move.names?.find(n => n.language.name === "es")?.name?.toUpperCase() ?? move.name.toUpperCase()}
                </span>
                <span
                    className="font-press-start text-[7px] text-white px-2 py-1 border border-[#111111]"
                    style={{ backgroundColor: typeColor }}
                >
                    {learned.length}
                </span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                {learned.slice(0, 48).map((pokemon, i) => {
                    const pokemonId = parseInt(
                        pokemon.url.split("/").filter(Boolean).pop() ?? "0"
                    )
                    const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`
                    const nameDisplay = pokemon.name.replace(/-/g, " ")

                    return (
                        <motion.div
                            key={pokemon.name}
                            initial={{ scale: 0, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.025, type: "spring", stiffness: 400, damping: 30 }}
                        >
                            <Link href={`/pokemon/${pokemonId}`} className="flex flex-col items-center group">
                                <div
                                    className="relative w-[64px] h-[64px] border border-[#E0E0E0] group-hover:border-[#111111] transition-all overflow-hidden"
                                    style={{ transition: "border-color 0.15s, box-shadow 0.15s" }}
                                    onMouseEnter={e => {
                                        const el = e.currentTarget as HTMLDivElement
                                        el.style.borderColor = typeColor
                                        el.style.boxShadow = `2px 2px 0 ${typeColor}`
                                    }}
                                    onMouseLeave={e => {
                                        const el = e.currentTarget as HTMLDivElement
                                        el.style.borderColor = "#E0E0E0"
                                        el.style.boxShadow = "none"
                                    }}
                                >
                                    <Image
                                        src={spriteUrl}
                                        alt={nameDisplay}
                                        width={64}
                                        height={64}
                                        className="pixelated group-hover:scale-110 transition-transform duration-150"
                                        style={{ imageRendering: "pixelated" }}
                                    />
                                </div>
                                <p className="font-nunito text-[9px] text-[#888888] text-center mt-1 max-w-[68px] truncate capitalize">
                                    {nameDisplay}
                                </p>
                                <p className="font-jetbrains text-[8px] text-[#AAAAAA] text-center">
                                    #{String(pokemonId).padStart(3, "0")}
                                </p>
                            </Link>
                        </motion.div>
                    )
                })}
            </div>

            {learned.length > 48 && (
                <p className="font-nunito text-[12px] text-[#888888] text-center mt-4">
                    + {learned.length - 48} Pokémon más aprenden este move
                </p>
            )}
        </motion.section>
    )
}
