"use client"

import { motion } from "framer-motion"
import { useQuery } from "@tanstack/react-query"
import { ExternalLink } from "lucide-react"
import Link from "next/link"

// Curated abilities related to each type
const TYPE_ABILITIES: Record<string, string[]> = {
    fire: ["blaze", "flame-body", "flash-fire", "drought", "solar-power", "thick-fat", "dry-skin"],
    water: ["torrent", "swift-swim", "rain-dish", "water-absorb", "drizzle", "hydration", "storm-drain"],
    grass: ["overgrow", "chlorophyll", "leaf-guard", "flower-gift", "sap-sipper", "grassy-surge"],
    electric: ["static", "volt-absorb", "motor-drive", "plus", "minus", "electric-surge", "galvanize"],
    ice: ["thick-fat", "ice-body", "snow-cloak", "snow-warning", "moody", "slush-rush"],
    fighting: ["guts", "iron-fist", "sheer-force", "steadfast", "no-guard", "vital-spirit"],
    poison: ["poison-point", "liquid-ooze", "corrosion", "merciless", "poison-touch", "neutralizing-gas"],
    ground: ["sand-veil", "sand-rush", "sand-force", "arena-trap", "earth-eater"],
    flying: ["big-pecks", "defiant", "gale-wings", "keen-eye", "tangled-feet", "wind-rider"],
    psychic: ["synchronize", "trace", "magic-bounce", "telepathy", "magic-guard", "psychic-surge"],
    bug: ["compound-eyes", "swarm", "tinted-lens", "shield-dust", "honey-gather", "no-guard"],
    rock: ["rock-head", "sturdy", "sand-stream", "solid-rock", "filter", "power-spot"],
    ghost: ["cursed-body", "frisk", "phantasma", "levitate", "perish-body"],
    dragon: ["multiscale", "rough-skin", "marvel-scale", "cloud-nine", "gooey", "tangling-hair"],
    dark: ["pickpocket", "prankster", "moxie", "intimidate", "rattled", "soul-heart"],
    steel: ["clear-body", "full-metal-body", "heavy-metal", "light-metal", "steelworker", "steely-spirit"],
    fairy: ["cute-charm", "pixilate", "fairy-aura", "misty-surge", "magician", "unnerve"],
    normal: ["huge-power", "pure-power", "skill-link", "scrappy", "normalize", "adaptability"],
}

async function fetchAbility(name: string) {
    const res = await fetch(`https://pokeapi.co/api/v2/ability/${name}`)
    if (!res.ok) return null
    return res.json()
}

interface Props {
    typeName: string
    typeColor: string
}

function AbilityCard({ abilityName, typeColor, index }: { abilityName: string; typeColor: string; index: number }) {
    const { data, isLoading } = useQuery({
        queryKey: ["ability-detail", abilityName],
        queryFn: () => fetchAbility(abilityName),
        staleTime: Infinity,
        gcTime: Infinity,
    })

    if (isLoading) {
        return (
            <div className="border-2 border-[#E0E0E0] h-[90px] animate-pulse bg-[#F8F8F8]" />
        )
    }

    if (!data) return null

    const nameES = data.names?.find((n: any) => n.language.name === "es")?.name || data.name
    const descES = data.flavor_text_entries?.find((e: any) => e.language.name === "es")?.flavor_text
        || data.flavor_text_entries?.find((e: any) => e.language.name === "en")?.flavor_text
        || "Sin descripción disponible."

    const isHidden = data.is_main_series

    return (
        <motion.div
            className="border-2 border-[#111111] bg-white p-4 group cursor-pointer relative overflow-hidden"
            style={{ boxShadow: "3px 3px 0 #111111" }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, type: "spring", stiffness: 300, damping: 22 }}
            whileHover={{ x: -2, y: -2, boxShadow: `5px 5px 0 ${typeColor}`, borderColor: typeColor }}
        >
            {/* Left color accent */}
            <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: typeColor }} />

            <div className="pl-3">
                <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-['Press_Start_2P'] text-[9px] text-[#111111] leading-relaxed">{nameES.toUpperCase()}</h3>
                    <Link href={`/abilities/${abilityName}`} className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ExternalLink size={12} className="text-[#888888]" />
                    </Link>
                </div>
                <p className="font-['Nunito'] text-[12px] text-[#444444] leading-relaxed line-clamp-2">{descES}</p>
            </div>
        </motion.div>
    )
}

export function TypeAbilitiesSection({ typeName, typeColor }: Props) {
    const abilities = TYPE_ABILITIES[typeName] || []

    return (
        <section className="py-10">
            <div className="flex items-center gap-3 mb-4">
                <span className="w-3 h-3 block shrink-0" style={{ backgroundColor: typeColor }} />
                <h2 className="font-['Press_Start_2P'] text-[11px] text-[#111111]">HABILIDADES RELACIONADAS</h2>
                <div
                    className="px-2 py-0.5 text-white font-['JetBrains_Mono'] text-[10px] border-2 border-[#111111] shrink-0"
                    style={{ backgroundColor: typeColor, boxShadow: "2px 2px 0 #111111" }}
                >
                    {abilities.length}
                </div>
            </div>
            <div className="h-[3px] bg-[#111111] w-full mb-6" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {abilities.map((name, i) => (
                    <AbilityCard key={name} abilityName={name} typeColor={typeColor} index={i} />
                ))}
            </div>
        </section>
    )
}
