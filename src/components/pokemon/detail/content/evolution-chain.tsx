"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Star, Gem, RefreshCw, Heart, Sun, Moon, Zap } from "lucide-react"
import { formatPokemonName, formatPokemonId, getIdFromUrl } from "@/lib/utils/pokemon.utils"
import type { ChainLink, EvolutionDetail } from "@/types/api/evolution.types"

interface Props {
    chain?: ChainLink
    currentPokemonId?: number
    typeColor?: string
}

import { ITEMS_ES } from "@/lib/utils/locale.utils"

function getConditionLabel(detail: EvolutionDetail): { label: string; icon?: any; itemImage?: string } | null {
    if (!detail) return null
    const { trigger, min_level, item, min_happiness, time_of_day, known_move } = detail

    if (trigger.name === "level-up" && min_level) return { label: `Nv. ${min_level}`, icon: Star }
    if (trigger.name === "level-up" && min_happiness) {
        const t = time_of_day === "day" ? " (Día)" : time_of_day === "night" ? " (Noche)" : ""
        return { label: `Amistad${t}`, icon: Heart }
    }
    if (trigger.name === "level-up" && time_of_day === "day") return { label: "De día", icon: Sun }
    if (trigger.name === "level-up" && time_of_day === "night") return { label: "De noche", icon: Moon }
    if (trigger.name === "level-up" && known_move) return { label: `Sabe ${known_move.name}`, icon: Zap }
    if (trigger.name === "use-item" && item) {
        const translatedName = ITEMS_ES[item.name] || item.name.split("-").map((w: string) => w[0].toUpperCase() + w.slice(1)).join(" ")
        return {
            label: translatedName,
            itemImage: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${item.name}.png`
        }
    }
    if (trigger.name === "trade") return { label: "Intercambio", icon: RefreshCw }
    if (trigger.name === "level-up") return { label: "Subir nivel", icon: Star }
    return { label: trigger.name.split("-").map((w: string) => w[0].toUpperCase() + w.slice(1)).join(" "), icon: Star }
}

function PokemonCard({ node, currentPokemonId, index }: { node: ChainLink; currentPokemonId?: number; index: number }) {
    const id = getIdFromUrl(node.species.url)
    const isCurrent = id === currentPokemonId

    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 280, damping: 22 }}
            className="flex flex-col items-center gap-1"
        >
            <Link href={`/pokemon/${id}`} className="flex flex-col items-center gap-1 group">
                <motion.div
                    className="flex items-center justify-center bg-[#F8F8F8] relative"
                    style={{
                        width: 80, height: 80,
                        border: isCurrent ? "2px solid #CC0000" : "1px solid #E0E0E0",
                        boxShadow: isCurrent ? "0 0 0 3px #CC000033" : undefined,
                    }}
                    whileHover={{ scale: 1.08, borderColor: "#111111", boxShadow: "3px 3px 0 #111111" }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                    <Image
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                        alt={node.species.name}
                        width={64}
                        height={64}
                        style={{ imageRendering: "pixelated" }}
                    />
                    {isCurrent && (
                        <div className="absolute -top-[6px] -right-[6px] w-3 h-3 rounded-full bg-[#CC0000] border-2 border-white" />
                    )}
                </motion.div>
                <span className="font-['Nunito'] text-[12px] font-bold text-[#111111] capitalize group-hover:text-[#CC0000] transition-colors text-center">
                    {formatPokemonName(node.species.name)}
                </span>
                <span className="font-['JetBrains_Mono'] text-[10px] text-[#888888]">
                    {formatPokemonId(id)}
                </span>
            </Link>
        </motion.div>
    )
}

function EvolutionArrow({ details }: { details: EvolutionDetail[] }) {
    const badge = details?.[0] ? getConditionLabel(details[0]) : null
    const Icon = badge?.icon ?? ArrowRight

    return (
        <div className="flex flex-col items-center gap-2 px-4 flex-shrink-0 min-w-[80px]">
            <ArrowRight size={20} className="text-[#CCCCCC]" />
            {badge && (
                <div
                    className="flex items-center gap-1 px-2 py-[3px] text-center"
                    style={{ backgroundColor: "#F2F2F2", border: "1px solid #E0E0E0" }}
                >
                    {badge.itemImage ? (
                        <Image src={badge.itemImage} alt={badge.label} width={20} height={20} style={{ imageRendering: "pixelated" }} />
                    ) : (
                        <Icon size={9} className="text-[#888888] flex-shrink-0" />
                    )}
                    <span className="font-['Nunito'] text-[9px] text-[#444444] whitespace-nowrap">{badge.label}</span>
                </div>
            )}
        </div>
    )
}
/** Renders a linear chain: A → B → C */
function LinearChain({ nodes, currentPokemonId }: { nodes: Array<{ node: ChainLink; details: EvolutionDetail[] }>; currentPokemonId?: number }) {
    return (
        <div className="flex items-center flex-nowrap overflow-x-auto gap-0 pb-2">
            {nodes.map(({ node, details }, i) => (
                <div key={node.species.name} className="flex items-center">
                    {i > 0 && <EvolutionArrow details={details} />}
                    <PokemonCard node={node} currentPokemonId={currentPokemonId} index={i} />
                </div>
            ))}
        </div>
    )
}

/** Flatten chain into rows for branching. Returns an array of rows, where each row
 *  is [{ node, details }] from the parent to that branch. */
function flattenChain(
    node: ChainLink,
    parentDetails: EvolutionDetail[] = [],
): Array<Array<{ node: ChainLink; details: EvolutionDetail[] }>> {
    if (node.evolves_to.length === 0) {
        return [[{ node, details: parentDetails }]]
    }

    const rows: Array<Array<{ node: ChainLink; details: EvolutionDetail[] }>> = []

    for (const child of node.evolves_to) {
        const childRows = flattenChain(child, child.evolution_details)
        for (const row of childRows) {
            rows.push([{ node, details: parentDetails }, ...row])
        }
    }

    return rows
}

export function EvolutionChain({ chain, currentPokemonId, typeColor }: Props) {
    if (!chain) return (
        <div className="py-8 text-center font-['Nunito'] text-[13px] text-[#888888] italic">
            Cargando cadena de evolución...
        </div>
    )

    const hasSingleNode = chain.evolves_to.length === 0

    if (hasSingleNode) {
        return (
            <div>
                <h3 className="font-['Press_Start_2P'] text-[9px] text-[#888888] mb-6 tracking-wide">CADENA DE EVOLUCIÓN</h3>
                <div className="flex flex-col items-center gap-4 py-6" style={{ background: "#F8F8F8", border: "1px solid #E0E0E0" }}>
                    <PokemonCard node={chain} currentPokemonId={currentPokemonId} index={0} />
                    <p className="font-['Nunito'] text-[13px] text-[#888888] italic">Este Pokémon no evoluciona</p>
                </div>
            </div>
        )
    }

    // Flatten into linear rows — each row is one complete evolution path
    const rows = flattenChain(chain)

    // Check if all rows share the same start nodes (most branching cases)
    const isSimpleLinear = rows.length === 1

    return (
        <div>
            <h3 className="font-['Press_Start_2P'] text-[9px] text-[#888888] mb-6 tracking-wide">CADENA DE EVOLUCIÓN</h3>

            {isSimpleLinear ? (
                <div style={{ background: "#F8F8F8", border: "1px solid #E0E0E0", padding: "20px 24px" }}>
                    <LinearChain nodes={rows[0]} currentPokemonId={currentPokemonId} />
                </div>
            ) : (
                // Multiple evolution paths (Eevee, Slowpoke, etc.)
                <div className="space-y-3">
                    {rows.map((row, i) => (
                        <div
                            key={i}
                            style={{ background: "#F8F8F8", border: "1px solid #E0E0E0", padding: "16px 24px" }}
                        >
                            <LinearChain nodes={row} currentPokemonId={currentPokemonId} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
