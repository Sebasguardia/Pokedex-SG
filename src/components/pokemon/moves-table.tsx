"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import * as ScrollArea from "@radix-ui/react-scroll-area"
import { useQuery } from "@tanstack/react-query"
import { getSpanish, DAMAGE_CLASS_ES, MOVE_TARGET_ES, AILMENT_ES, CONTEST_TYPE_ES } from "@/lib/utils/locale.utils"
import { TYPE_CONSTANTS } from "@/lib/constants/types.constants"
import { ChevronDown, X, Repeat, Heart, Zap, Loader } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Props {
    moves?: any[]
    expandedMove: string | null
    onExpandMove: (name: string | null) => void
}

type MoveMethod = "level-up" | "machine" | "egg" | "tutor"

const METHOD_LABELS: Record<MoveMethod, string> = {
    "level-up": "Por nivel",
    "machine": "MT/MO",
    "egg": "Huevo",
    "tutor": "Tutor",
}

function getPowerColor(power: number | null | undefined) {
    if (!power) return "#888888"
    if (power < 60) return "#6B7280"
    if (power < 100) return "#111111"
    return "#CC0000"
}

function getAccuracyColor(acc: number | null | undefined) {
    if (!acc) return "#888888"
    if (acc < 70) return "#EF4444"
    if (acc === 100) return "#22C55E"
    return "#111111"
}

// Fetch full move detail from API
function useMoveDetail(name: string, enabled = true) {
    return useQuery({
        queryKey: ["move-detail", name],
        queryFn: async () => {
            const res = await fetch(`https://pokeapi.co/api/v2/move/${name}`)
            if (!res.ok) throw new Error("Failed to fetch move")
            return res.json()
        },
        enabled: !!name && enabled,
        staleTime: 1000 * 60 * 60, // 1 hour - moves don't change
    })
}

function TypeBadge({ typeName }: { typeName: string }) {
    const typeData = TYPE_CONSTANTS[typeName]
    if (!typeName || typeName === "unknown") return <span className="text-[#888888] font-['Nunito'] text-[11px]">—</span>
    return (
        <div
            className="flex items-center gap-1 px-2 py-[2px] w-fit"
            style={{ backgroundColor: typeData?.color ?? "#A8A878", border: "1px solid #111111" }}
        >
            <Image
                src={`/icons/${typeName}.svg`}
                alt={typeName}
                width={10}
                height={10}
                style={{ filter: "brightness(0) invert(1)" }}
                onError={() => { }}
            />
            <span className="font-['Nunito'] text-[9px] font-bold text-white uppercase">
                {typeData?.name ?? typeName}
            </span>
        </div>
    )
}

function DamageClassBadge({ cls }: { cls: string }) {
    const colors: Record<string, { bg: string; color: string }> = {
        physical: { bg: "#FEF3C7", color: "#92400E" },
        special: { bg: "#EFF6FF", color: "#1E40AF" },
        status: { bg: "#F3F4F6", color: "#374151" },
    }
    const c = colors[cls] ?? colors.status
    return (
        <span
            className="font-['Nunito'] text-[10px] font-bold px-[6px] py-[2px] whitespace-nowrap"
            style={{ backgroundColor: c.bg, color: c.color, border: `1px solid ${c.color}33` }}
        >
            {DAMAGE_CLASS_ES[cls] ?? cls}
        </span>
    )
}

function ExpandedMovePanel({ moveName, onClose }: { moveName: string; onClose: () => void }) {
    const { data: move, isLoading } = useMoveDetail(moveName, true)

    if (isLoading) {
        return (
            <tr>
                <td colSpan={8}>
                    <div className="p-6 bg-[#F8F8F8] border-t border-[#E0E0E0] flex items-center gap-2 text-[#888888]">
                        <Loader size={14} className="animate-spin" />
                        <span className="font-['Nunito'] text-[13px]">Cargando información...</span>
                    </div>
                </td>
            </tr>
        )
    }

    if (!move) return null

    const effectEntry = getSpanish(move.effect_entries, "effect")
    const shortEffectEntry = getSpanish(move.effect_entries, "short_effect")

    // Try Spanish flavor text as better description when no Spanish effect
    const esFlavorEntry = move.flavor_text_entries?.find((f: any) => f.language?.name === "es")
    const mainText = esFlavorEntry
        ? esFlavorEntry.flavor_text?.replace(/\n/g, " ").replace(/\f/g, " ")
        : effectEntry.text.replace(/\$effect_chance/g, move.effect_chance?.toString() ?? "—")
    const mainIsFallback = !esFlavorEntry && effectEntry.isFallback

    const shortText = shortEffectEntry.text.replace(/\$effect_chance/g, move.effect_chance?.toString() ?? "—")

    const ailmentName = move.meta?.ailment?.name ?? "none"
    const ailmentEs = AILMENT_ES[ailmentName] ?? ailmentName
    const flinchChance = move.meta?.flinch_chance ?? 0
    const critRate = move.meta?.crit_rate ?? 0
    const drain = move.meta?.drain ?? 0
    const minHits = move.meta?.min_hits
    const maxHits = move.meta?.max_hits
    const priority = move.priority ?? 0
    const targetEs = MOVE_TARGET_ES[move.target?.name] ?? move.target?.name?.replace(/-/g, " ")

    const typeBorderColor = TYPE_CONSTANTS[move.type?.name]?.color ?? "#CC0000"

    const pokemonList = (move.learned_by_pokemon ?? []).slice(0, 12)

    return (
        <tr>
            <td colSpan={8}>
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="overflow-hidden"
                >
                    <div className="p-4 bg-[#F8F8F8] border-t border-[#E0E0E0] relative">
                        <button onClick={onClose} className="absolute top-3 right-3 hover:text-[#CC0000] transition-colors">
                            <X size={14} className="text-[#888888]" />
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-6">
                            {/* Left: Effect */}
                            <div className="space-y-3">
                                {mainText && (
                                    <div>
                                        <p className="font-['Nunito'] text-[10px] font-bold uppercase text-[#888888] mb-1">Efecto</p>
                                        <p
                                            className="font-['Nunito'] text-[13px] text-[#444444] leading-[1.7] pl-3"
                                            style={{ borderLeft: `3px solid ${typeBorderColor}` }}
                                        >
                                            {mainText}
                                            {mainIsFallback && (
                                                <span className="ml-1 text-[8px] px-1 bg-[#F2F2F2] border border-[#E0E0E0] text-[#888888]">EN</span>
                                            )}
                                        </p>
                                    </div>
                                )}
                                {shortText && !esFlavorEntry && (
                                    <div>
                                        <p className="font-['Nunito'] text-[10px] font-bold uppercase text-[#888888] mb-1">Resumen</p>
                                        <p className="font-['Nunito'] text-[12px] italic text-[#666666]">{shortText}</p>
                                    </div>
                                )}
                            </div>

                            {/* Right: Technical metadata */}
                            <div className="space-y-2">
                                {targetEs && (
                                    <div className="flex gap-2 text-[12px] font-['Nunito']">
                                        <span className="text-[#888888] w-[110px] flex-shrink-0">Objetivo</span>
                                        <span className="text-[#111111] font-bold capitalize">{targetEs}</span>
                                    </div>
                                )}
                                {priority !== 0 && (
                                    <div className="flex gap-2 text-[12px] font-['Nunito'] items-center">
                                        <span className="text-[#888888] w-[110px] flex-shrink-0">Prioridad</span>
                                        <span className={`font-bold font-['JetBrains_Mono'] ${priority > 0 ? "text-green-600" : "text-red-600"}`}>
                                            {priority > 0 ? "+" : ""}{priority}
                                        </span>
                                    </div>
                                )}
                                {ailmentName !== "none" && (
                                    <div className="flex gap-2 text-[12px] font-['Nunito']">
                                        <span className="text-[#888888] w-[110px] flex-shrink-0">
                                            {move.meta?.ailment_chance > 0 ? `${move.meta.ailment_chance}% de` : "Efecto"}
                                        </span>
                                        <span className="text-[#111111] font-bold">{ailmentEs}</span>
                                    </div>
                                )}
                                {minHits && maxHits && (
                                    <div className="flex gap-2 text-[12px] font-['Nunito'] items-center">
                                        <span className="text-[#888888] w-[110px] flex-shrink-0">Golpes</span>
                                        <span className="font-['JetBrains_Mono'] text-[#111111] font-bold flex items-center gap-1">
                                            <Repeat size={10} /> {minHits}–{maxHits}
                                        </span>
                                    </div>
                                )}
                                {drain !== 0 && (
                                    <div className="flex gap-2 text-[12px] font-['Nunito'] items-center">
                                        <span className="text-[#888888] w-[110px] flex-shrink-0">Drenar</span>
                                        <span className={`font-['JetBrains_Mono'] font-bold flex items-center gap-1 ${drain > 0 ? "text-green-600" : "text-red-600"}`}>
                                            <Heart size={10} />
                                            {drain > 0 ? `Absorbe ${drain}%` : `Gasta ${Math.abs(drain)}% PS`}
                                        </span>
                                    </div>
                                )}
                                {flinchChance > 0 && (
                                    <div className="flex gap-2 text-[12px] font-['Nunito']">
                                        <span className="text-[#888888] w-[110px] flex-shrink-0">Retroceso</span>
                                        <span className="font-['JetBrains_Mono'] text-[#111111] font-bold">{flinchChance}%</span>
                                    </div>
                                )}
                                {critRate > 0 && (
                                    <div className="flex gap-2 text-[12px] font-['Nunito'] items-center">
                                        <span className="text-[#888888] w-[110px] flex-shrink-0">Tasa crítico</span>
                                        <span className="font-['JetBrains_Mono'] text-yellow-600 font-bold flex items-center gap-1">
                                            <Zap size={10} /> +{critRate}
                                        </span>
                                    </div>
                                )}
                                {move.contest_type && (
                                    <div className="flex gap-2 text-[12px] font-['Nunito'] pt-2 border-t border-[#E0E0E0]">
                                        <span className="text-[#888888] w-[110px] flex-shrink-0">Concurso</span>
                                        <span className="font-bold text-[#111111]">
                                            {CONTEST_TYPE_ES[move.contest_type.name] ?? move.contest_type.name}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Pokémon that learn this move */}
                        {pokemonList.length > 0 && (
                            <div className="mt-4 pt-3 border-t border-[#E0E0E0]">
                                <p className="font-['Nunito'] text-[11px] text-[#888888] mb-2">
                                    También aprenden este movimiento ({move.learned_by_pokemon?.length}):
                                </p>
                                <div className="flex gap-2 overflow-x-auto pb-1">
                                    {pokemonList.map((p: any) => {
                                        const parts = p.url.split("/").filter(Boolean)
                                        const id = parseInt(parts[parts.length - 1])
                                        if (id > 1010) return null
                                        return (
                                            <Link key={p.name} href={`/pokemon/${id}`} className="flex-shrink-0">
                                                <motion.div whileHover={{ scale: 1.1 }}>
                                                    <Image
                                                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                                                        alt={p.name}
                                                        width={32}
                                                        height={32}
                                                        style={{ imageRendering: "pixelated" }}
                                                        title={p.name}
                                                    />
                                                </motion.div>
                                            </Link>
                                        )
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </td>
        </tr>
    )
}

// Each move row fetches its own detail for correct type/power/acc/pp
function MoveRow({
    basicMove,
    isExpanded,
    onToggle,
    method,
}: {
    basicMove: { name: string; url: string; level: number }
    isExpanded: boolean
    onToggle: () => void
    method: MoveMethod
}) {
    const { data: move, isLoading } = useMoveDetail(basicMove.name)

    const typeName = move?.type?.name ?? ""
    const formattedName = (() => {
        // Try Spanish name from move data
        const esName = move?.names?.find((n: any) => n.language?.name === "es")?.name
        if (esName) return esName
        // Fallback: format the API slug
        return basicMove.name.split("-").map((w: string) => w[0]?.toUpperCase() + w.slice(1)).join(" ")
    })()

    return (
        <>
            <motion.tr
                className="cursor-pointer border-b border-[#F2F2F2]"
                style={{ backgroundColor: isExpanded ? "#FFF5F5" : "transparent" }}
                whileHover={{ backgroundColor: isExpanded ? "#FFF5F5" : "#FAFAFA" }}
                onClick={onToggle}
            >
                {/* Level / MT number */}
                <td className="py-3 pl-3 pr-2 font-['JetBrains_Mono'] text-[11px] text-[#CC0000]">
                    {method === "level-up"
                        ? basicMove.level || "—"
                        : method === "machine" ? "MT" : "—"
                    }
                </td>
                {/* Name */}
                <td className="py-3 pr-2">
                    <span className={`font-['Nunito'] font-bold text-[13px] ${isExpanded ? "text-[#CC0000]" : "text-[#111111]"}`}>
                        {formattedName}
                    </span>
                </td>
                {/* Type */}
                <td className="py-3 pr-2">
                    {isLoading
                        ? <div className="h-4 w-16 bg-[#F2F2F2] animate-pulse" />
                        : <TypeBadge typeName={typeName} />
                    }
                </td>
                {/* Damage class */}
                <td className="py-3 pr-2">
                    {isLoading
                        ? <div className="h-4 w-12 bg-[#F2F2F2] animate-pulse" />
                        : <DamageClassBadge cls={move?.damage_class?.name ?? "status"} />
                    }
                </td>
                {/* Power */}
                <td className="py-3 pr-2 font-['JetBrains_Mono'] text-[12px]"
                    style={{ color: !isLoading ? getPowerColor(move?.power) : "#E0E0E0" }}>
                    {isLoading ? "—" : (move?.power ?? "—")}
                </td>
                {/* Accuracy */}
                <td className="py-3 pr-2 font-['JetBrains_Mono'] text-[12px]"
                    style={{ color: !isLoading ? getAccuracyColor(move?.accuracy) : "#E0E0E0" }}>
                    {isLoading ? "—" : (move?.accuracy ?? "—")}
                </td>
                {/* PP */}
                <td className="py-3 pr-2 font-['JetBrains_Mono'] text-[12px] text-[#111111]">
                    {isLoading ? "—" : (move?.pp ?? "—")}
                </td>
                {/* Chevron */}
                <td className="py-3 pr-3">
                    <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                        <ChevronDown size={14} className="text-[#888888]" />
                    </motion.div>
                </td>
            </motion.tr>
            <AnimatePresence>
                {isExpanded && (
                    <ExpandedMovePanel
                        key={`expanded-${basicMove.name}`}
                        moveName={basicMove.name}
                        onClose={onToggle}
                    />
                )}
            </AnimatePresence>
        </>
    )
}

export function MovesTable({ moves, expandedMove, onExpandMove }: Props) {
    const [activeMethod, setActiveMethod] = useState<MoveMethod>("level-up")

    if (!moves || moves.length === 0) {
        return <div className="text-center py-8 text-[#888888] font-['Nunito'] text-[13px]">No hay movimientos disponibles</div>
    }

    // Group by method, deduplicate — store minimal data (name + level)
    type BasicMove = { name: string; url: string; level: number }
    const byMethod: Record<MoveMethod, Map<string, BasicMove>> = {
        "level-up": new Map(), "machine": new Map(), "egg": new Map(), "tutor": new Map(),
    }

    for (const moveEntry of moves) {
        const details = moveEntry.version_group_details ?? []
        // Prefer "scarlet-violet" or latest method entry
        const grouped: Record<string, { level: number; method: MoveMethod }> = {}
        for (const vgd of details) {
            const m = vgd.move_learn_method?.name as MoveMethod
            if (!byMethod[m]) continue
            const key = m
            if (!grouped[key] || vgd.level_learned_at < grouped[key].level || grouped[key].level === 0) {
                grouped[key] = { level: vgd.level_learned_at, method: m }
            }
        }
        for (const [method, info] of Object.entries(grouped)) {
            const m = method as MoveMethod
            if (!byMethod[m].has(moveEntry.move.name)) {
                byMethod[m].set(moveEntry.move.name, {
                    name: moveEntry.move.name,
                    url: moveEntry.move.url,
                    level: info.level,
                })
            }
        }
    }

    const availableMethods = (Object.keys(byMethod) as MoveMethod[]).filter(m => byMethod[m].size > 0)

    let currentMoves = Array.from(byMethod[activeMethod].values())
    if (activeMethod === "level-up") {
        currentMoves = currentMoves.sort((a, b) => a.level - b.level)
    }

    const handleToggle = (moveName: string) => {
        onExpandMove(expandedMove === moveName ? null : moveName)
    }

    return (
        <div>
            {/* Method pills */}
            <div className="flex gap-2 mb-5 flex-wrap">
                {availableMethods.map(method => (
                    <button
                        key={method}
                        onClick={() => { setActiveMethod(method); onExpandMove(null) }}
                        className="px-4 py-[6px] font-['Nunito'] text-[12px] font-bold transition-colors"
                        style={{
                            backgroundColor: activeMethod === method ? "#111111" : "#F2F2F2",
                            color: activeMethod === method ? "white" : "#888888",
                            border: "1px solid #E0E0E0"
                        }}
                    >
                        {METHOD_LABELS[method]}
                    </button>
                ))}
            </div>

            <ScrollArea.Root className="w-full overflow-hidden">
                <ScrollArea.Viewport className="w-full overflow-x-auto">
                    <AnimatePresence mode="wait">
                        <motion.table
                            key={activeMethod}
                            className="w-full min-w-[560px]"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                        >
                            <thead>
                                <tr style={{ backgroundColor: "#111111" }}>
                                    {["Nv.", "Nombre", "Tipo", "Clase", "POT", "PRE", "PP", ""].map((h, i) => (
                                        <th key={i} className="py-2 pl-3 pr-2 font-['Press_Start_2P'] text-[7px] text-white text-left whitespace-nowrap">
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {currentMoves.map((basicMove) => (
                                    <MoveRow
                                        key={basicMove.name}
                                        basicMove={basicMove}
                                        isExpanded={expandedMove === basicMove.name}
                                        onToggle={() => handleToggle(basicMove.name)}
                                        method={activeMethod}
                                    />
                                ))}
                            </tbody>
                        </motion.table>
                    </AnimatePresence>
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar orientation="horizontal" className="h-[4px] bg-[#F2F2F2]">
                    <ScrollArea.Thumb className="bg-[#CC0000]" />
                </ScrollArea.Scrollbar>
            </ScrollArea.Root>
        </div>
    )
}
