"use client"

import { useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Crown, Sparkles, Heart, Mars, Venus } from "lucide-react"
import { TypeIcon } from "@/components/shared/type-icon"
import { TYPE_CONSTANTS } from "@/lib/constants/types.constants"
import { LEGENDARY_IDS, MYTHICAL_IDS, BABY_IDS } from "@/lib/constants/special-pokemon.constants"
import { formatPokemonId } from "@/lib/utils/pokemon.utils"

interface Props {
    pokemon?: any
    species?: any
    typeColor?: string
}

const GEN_LABELS: Record<string, string> = {
    "generation-i": "Gen I", "generation-ii": "Gen II", "generation-iii": "Gen III",
    "generation-iv": "Gen IV", "generation-v": "Gen V", "generation-vi": "Gen VI",
    "generation-vii": "Gen VII", "generation-viii": "Gen VIII", "generation-ix": "Gen IX",
}

function LetterName({ name }: { name: string }) {
    const letters = name.toUpperCase().split("")
    const indices = useMemo(() => {
        const arr = Array.from({ length: letters.length }, (_, i) => i)
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
                ;[arr[i], arr[j]] = [arr[j], arr[i]]
        }
        return arr
    }, [name])

    return (
        <h1 className="font-['Press_Start_2P'] text-[15px] sm:text-[18px] md:text-[22px] text-[#111111] leading-[1.4] sm:leading-tight my-2 pb-4 flex flex-wrap">
            {letters.map((letter, realIdx) => {
                const animOrder = indices.indexOf(realIdx)
                return (
                    <motion.span
                        key={realIdx}
                        initial={{ y: -30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                            delay: (animOrder / letters.length) * 0.5,
                            type: "spring",
                            stiffness: 400,
                            damping: 20
                        }}
                    >
                        {letter === " " ? "\u00A0" : letter}
                    </motion.span>
                )
            })}
        </h1>
    )
}

function GenderBar({ genderRate }: { genderRate: number }) {
    if (genderRate === -1) {
        return <span className="font-['Nunito'] text-[13px] text-[#888888]">— Sin género</span>
    }
    const femalePercent = (genderRate / 8) * 100
    const malePercent = 100 - femalePercent
    return (
        <div className="flex items-center gap-3 mt-1">
            {malePercent > 0 && (
                <div className="flex items-center gap-1">
                    <Mars size={14} className="text-[#3B82F6]" />
                    <span className="font-['Nunito'] text-[12px] text-[#888888]">{malePercent.toFixed(0)}%</span>
                </div>
            )}
            <div className="flex-1 h-[6px] overflow-hidden" style={{ borderRadius: 2 }}>
                <motion.div
                    className="h-full flex"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    style={{ transformOrigin: "left" }}
                    transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                    {malePercent > 0 && <div style={{ width: `${malePercent}%`, backgroundColor: "#3B82F6" }} />}
                    {femalePercent > 0 && <div style={{ width: `${femalePercent}%`, backgroundColor: "#EC4899" }} />}
                </motion.div>
            </div>
            {femalePercent > 0 && (
                <div className="flex items-center gap-1">
                    <Venus size={14} className="text-[#EC4899]" />
                    <span className="font-['Nunito'] text-[12px] text-[#888888]">{femalePercent.toFixed(0)}%</span>
                </div>
            )}
        </div>
    )
}

export function PokemonIdentity({ pokemon, species, typeColor }: Props) {
    if (!pokemon) return null

    const id = pokemon.id
    const isLegendary = LEGENDARY_IDS.includes(id)
    const isMythical = MYTHICAL_IDS.includes(id)
    const isBaby = BABY_IDS.includes(id)
    const genLabel = species?.generation?.name ? GEN_LABELS[species.generation.name] : null

    const badges = [
        genLabel && { label: genLabel, bg: "#F2F2F2", border: "#E0E0E0", color: "#444444", icon: null },
        isLegendary && { label: "Legendario", bg: "#EFF6FF", border: "#93C5FD", color: "#1D4ED8", icon: Crown },
        isMythical && { label: "Mítico", bg: "#FDF4FF", border: "#D8B4FE", color: "#7E22CE", icon: Sparkles },
        isBaby && { label: "Baby", bg: "#FFF1F2", border: "#FECACA", color: "#BE123C", icon: Heart },
    ].filter(Boolean) as { label: string, bg: string, border: string, color: string, icon: any }[]

    return (
        <div className="mb-4">
            {/* ID + Badges */}
            <div className="flex items-center gap-2 flex-wrap">
                <span className="font-['JetBrains_Mono'] text-[12px] text-[#888888]">{formatPokemonId(id)}</span>
                {badges.map((badge, i) => (
                    <motion.span
                        key={badge.label}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.06, type: "spring", bounce: 0.5 }}
                        className="flex items-center gap-1 font-['Press_Start_2P'] text-[7px] px-2 py-[3px]"
                        style={{ backgroundColor: badge.bg, border: `1px solid ${badge.border}`, color: badge.color }}
                    >
                        {badge.icon && <badge.icon size={8} />}
                        {badge.label}
                    </motion.span>
                ))}
            </div>

            {/* Name with staggered letters */}
            <LetterName name={pokemon.name.replace(/-/g, " ")} />

            {/* Japanese name */}
            {species?.names && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="font-['Nunito'] text-[13px] text-[#AAAAAA] mb-2"
                >
                    {species.names.find((n: any) => n.language.name === "ja-Hrkt")?.name ?? ""}
                </motion.p>
            )}

            {/* Type badges */}
            <div className="flex gap-2 mt-2 flex-wrap">
                {pokemon.types?.map((t: any, i: number) => {
                    const typeData = TYPE_CONSTANTS[t.type.name]
                    return (
                        <motion.div
                            key={t.type.name}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.1 + i * 0.1, type: "spring", bounce: 0.5 }}
                            whileHover={{ scale: 1.05, boxShadow: "3px 3px 0 #111111" }}
                            className="flex items-center gap-2 px-3 py-[6px] border-2 border-[#111111] cursor-pointer"
                            style={{
                                backgroundColor: typeData?.color ?? "#A8A878",
                                boxShadow: "2px 2px 0 #111111"
                            }}
                        >
                            <Image
                                src={`/icons/${t.type.name}.svg`}
                                alt={t.type.name}
                                width={12}
                                height={12}
                                style={{ filter: "brightness(0) invert(1)" }}
                            />
                            <span className="font-['Nunito'] text-[12px] font-bold text-white uppercase">
                                {typeData?.name ?? t.type.name}
                            </span>
                        </motion.div>
                    )
                })}
            </div>

            {/* Gender ratio */}
            {species?.gender_rate !== undefined && (
                <div className="mt-3">
                    <GenderBar genderRate={species.gender_rate} />
                </div>
            )}
        </div>
    )
}
