"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { AlertCircle, UserCircle } from "lucide-react"
import { cn } from "@/lib/utils/cn"

interface Props {
    pokemon: any[] // From usePokemonByHeldItem
    pocketAccent: string
}

export function ItemHeldPokemon({ pokemon, pocketAccent }: Props) {
    if (!pokemon || pokemon.length === 0) return null

    // Helper to get formatted ID from URL
    const getPokemonId = (url: string) => {
        const parts = url.split("/")
        return parts[parts.length - 2]
    }

    return (
        <section className="space-y-6">
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                    <UserCircle size={16} style={{ color: pocketAccent }} />
                    <h3 className="font-press-start text-[10px] text-[#111111] uppercase tracking-wider">
                        POKÉMON QUE LO CARGAN
                    </h3>
                </div>
                <p className="font-nunito text-[13px] text-[#888888]">
                    Pokémon que pueden llevar este objeto equipado en estado salvaje.
                </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {pokemon.map((p: any, i: number) => {
                    const id = getPokemonId(p.pokemon.url)
                    // Take the first version rarity for display simplicity
                    const rarity = p.version_details[0]?.rarity || 0

                    const rarityColor = rarity >= 50 ? "#22C55E" : rarity >= 5 ? "#F97316" : "#EF4444"

                    return (
                        <Link key={p.pokemon.name} href={`/pokemon/${p.pokemon.name}`}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: (i % 12) * 0.04 }}
                                whileHover={{ y: -4, borderColor: pocketAccent }}
                                className="group relative bg-white border-2 border-[#111111] flex flex-col items-center p-3 shadow-[3px_3px_0_#111111] transition-colors"
                            >
                                <motion.div
                                    className="absolute top-1.5 right-1.5 px-1.5 py-0.5 font-press-start text-[6px] text-white border border-[#111111] z-10"
                                    style={{ backgroundColor: rarityColor }}
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    transition={{ type: "spring", delay: 0.2 }}
                                >
                                    {rarity}%
                                </motion.div>

                                <div className="relative w-16 h-16 mb-2">
                                    <Image
                                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                                        alt={p.pokemon.name}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <span className="font-nunito font-bold text-[12px] text-[#111111] capitalize text-center leading-tight group-hover:text-[#CC0000] transition-colors">
                                    {p.pokemon.name.replace(/-/g, " ")}
                                </span>
                                <span className="font-jetbrains text-[9px] text-[#888888] mt-1">
                                    #{id.padStart(4, "0")}
                                </span>
                            </motion.div>
                        </Link>
                    )
                })}
            </div>

            {/* Strategic Note */}
            <div
                className="flex items-start gap-4 p-4 border-2 border-[#111111] bg-[#FFF7ED]"
                style={{ borderLeftWidth: "6px", borderLeftColor: "#F97316" }}
            >
                <AlertCircle className="text-[#F97316] shrink-0 mt-0.5" size={18} />
                <div className="space-y-1">
                    <p className="font-nunito font-bold text-[13px] text-[#111111]">CONSEJO ESTRATÉGICO</p>
                    <p className="font-nunito text-[12px] text-[#888888] leading-relaxed">
                        Para obtener este objeto de Pokémon salvajes, usa movimientos como <span className="text-[#F97316] font-bold">Ladrón</span> o <span className="text-[#F97316] font-bold">Antojo</span>. Tener un Pokémon con la habilidad <span className="text-[#F97316] font-bold">Ojo Compuesto</span> al frente del equipo aumentará la probabilidad de encontrar objetos.
                    </p>
                </div>
            </div>
        </section>
    )
}
