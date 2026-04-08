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
                    <div className="p-10 bg-white border-t-4 border-[#111111] flex flex-col items-center justify-center gap-4 text-[#888888]">
                        <Loader size={24} className="animate-spin text-[#111111]" />
                        <span className="font-['Press_Start_2P'] text-[10px]">CARGANDO DATOS...</span>
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
                    <div className="p-6 bg-white border-t-4 border-[#111111] relative">
                        <button 
                            onClick={onClose} 
                            className="absolute top-4 right-4 p-2 border-2 border-[#111111] hover:bg-[#111111] hover:text-white transition-all shadow-[2px_2px_0_#111111] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                            aria-label="Cerrar detalle"
                        >
                            <X size={16} strokeWidth={3} />
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                            {/* Left: Effect */}
                            <div className="space-y-4">
                                {mainText && (
                                    <div className="relative p-6 bg-[#F9F9F9] border-2 border-[#111111] shadow-inner mt-4">
                                        <span className="absolute -top-[12px] left-4 px-3 py-[4px] bg-white border-2 border-[#111111] font-['Press_Start_2P'] text-[8px] text-[#111111] shadow-[2px_2px_0_#111111]">EFECTO</span>
                                        <p className="font-['Nunito'] text-[15px] text-[#111111] leading-[1.6] font-black">
                                            {mainText}
                                            {mainIsFallback && (
                                                <span className="ml-2 font-['Press_Start_2P'] text-[6px] px-1 py-[2px] bg-[#111111] text-white">EN</span>
                                            )}
                                        </p>
                                    </div>
                                )}
                                {shortText && !esFlavorEntry && (
                                    <div className="relative p-6 border-l-4 border-[#111111] bg-white border-y border-r border-[#E0E0E0] mt-8">
                                        <span className="absolute -top-[12px] left-4 px-3 py-[4px] bg-white border-2 border-[#111111] font-['Press_Start_2P'] text-[8px] text-[#888888] shadow-[2px_2px_0_#E0E0E0]">RESUMEN</span>
                                        <p className="font-['Nunito'] text-[13px] italic font-bold text-[#444444]">{shortText}</p>
                                    </div>
                                )}
                            </div>

                            {/* Right: Technical metadata */}
                            <div className="grid grid-cols-1 gap-y-3">
                                {[
                                    { label: "OBJETIVO", value: targetEs, color: "#111111" },
                                    { label: "PRIORIDAD", value: priority !== 0 ? (priority > 0 ? `+${priority}` : priority) : null, color: priority > 0 ? "#16A34A" : "#DC2626" },
                                    { label: move.meta?.ailment_chance > 0 ? `${move.meta.ailment_chance}% ${ailmentEs.toUpperCase()}` : "EFECTO", value: ailmentName !== "none" ? ailmentEs : null, color: "#111111" },
                                    { label: "GOLPES", value: minHits && maxHits ? `${minHits}–${maxHits}` : null, icon: <Repeat size={12} />, color: "#111111" },
                                    { label: "DRENAR", value: drain !== 0 ? (drain > 0 ? `Absorbe ${drain}%` : `Gasta ${Math.abs(drain)}% PS`) : null, icon: <Heart size={12} />, color: drain > 0 ? "#16A34A" : "#DC2626" },
                                    { label: "RETROCESO", value: flinchChance > 0 ? `${flinchChance}%` : null, color: "#111111" },
                                    { label: "CRÍTICO", value: critRate > 0 ? `+${critRate}` : null, icon: <Zap size={12} />, color: "#D97706" },
                                    { label: "CONCURSO", value: move.contest_type ? (CONTEST_TYPE_ES[move.contest_type.name] ?? move.contest_type.name) : null, color: "#111111" }
                                ].filter(item => item.value).map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between py-2 border-b border-[#F0F0F0] font-['Press_Start_2P']">
                                        <span className="text-[8px] text-[#888888] tracking-tighter">{item.label}</span>
                                        <div className="flex items-center gap-2">
                                            {item.icon && <span style={{ color: item.color }}>{item.icon}</span>}
                                            <span className="text-[10px] uppercase" style={{ color: item.color }}>{item.value}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Pokémon that learn this move */}
                        {pokemonList.length > 0 && (
                            <div className="mt-8 pt-5 border-t-2 border-[#111111]">
                                <p className="font-['Press_Start_2P'] text-[8px] text-[#111111] mb-4">
                                    APRENDEDORES DESTACADOS ({move.learned_by_pokemon?.length}):
                                </p>
                                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                                    {pokemonList.map((p: any) => {
                                        const parts = p.url.split("/").filter(Boolean)
                                        const id = parseInt(parts[parts.length - 1])
                                        if (id > 1010) return null
                                        return (
                                            <Link key={p.name} href={`/pokemon/${id}`} className="flex-shrink-0 group">
                                                <motion.div 
                                                    whileHover={{ scale: 1.15, rotate: 2 }}
                                                    className="p-1 border-2 border-[#111111] bg-white shadow-[3px_3px_0_rgba(17,17,17,0.1)] group-hover:shadow-[3px_3px_0_#111111] transition-all"
                                                >
                                                    <Image
                                                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                                                        alt={p.name}
                                                        width={36}
                                                        height={36}
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
                className="cursor-pointer border-b-[2px] border-[#F2F2F2] transition-colors"
                style={{ backgroundColor: isExpanded ? "#FFF5F5" : "transparent" }}
                whileHover={{ backgroundColor: isExpanded ? "#FFF5F5" : "#F8F8F8" }}
                onClick={onToggle}
            >
                {/* Level / MT number */}
                <td className="py-4 pl-4 pr-2 font-['JetBrains_Mono'] text-[13px] font-black text-[#CC0000]">
                    {method === "level-up"
                        ? (basicMove.level || "—").toString().padStart(2, "0")
                        : method === "machine" ? "MT" : "—"
                    }
                </td>
                {/* Name */}
                <td className="py-4 pr-2">
                    <span className={`font-['Nunito'] font-black text-[15px] ${isExpanded ? "text-[#CC0000]" : "text-[#111111]"}`}>
                        {formattedName.toUpperCase()}
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
        <div className="space-y-6">
            <h3 className="font-['Press_Start_2P'] text-[12px] text-[#111111] mb-6 flex items-center gap-3">
                <span className="w-3 h-3 bg-[#111111]" />
                MOVIMIENTOS
                <span className="flex-1 h-[2px] bg-[#E0E0E0]" />
            </h3>

            {/* Method pills */}
            <div className="flex gap-3 mb-6 flex-wrap">
                {availableMethods.map(method => (
                    <button
                        key={method}
                        onClick={() => { setActiveMethod(method); onExpandMove(null) }}
                        className="px-5 py-2.5 font-['Press_Start_2P'] text-[8px] transition-all relative"
                        style={{
                            backgroundColor: activeMethod === method ? "#111111" : "#FFFFFF",
                            color: activeMethod === method ? "#FFFFFF" : "#888888",
                            border: "2px solid #111111",
                            boxShadow: activeMethod === method ? "none" : "3px 3px 0 #111111",
                            transform: activeMethod === method ? "translate(2px, 2px)" : "none"
                        }}
                    >
                        {METHOD_LABELS[method].toUpperCase()}
                    </button>
                ))}
            </div>

            <div className="bg-white border-[3px] border-[#111111] shadow-[6px_6px_0_rgba(17,17,17,1)] rounded-lg overflow-hidden">
                <ScrollArea.Root className="w-full">
                    <ScrollArea.Viewport className="w-full">
                        <AnimatePresence mode="wait">
                            <motion.table
                                key={activeMethod}
                                className="w-full min-w-[620px]"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                <thead>
                                    <tr className="bg-[#111111] border-b-2 border-[#111111]">
                                        {["NV.", "NOMBRE DEL MOVIMIENTO", "TIPO", "CLASE", "POT", "PRE", "PP", ""].map((h, i) => (
                                            <th key={i} className="py-4 px-4 font-['Press_Start_2P'] text-[8px] text-white text-left whitespace-nowrap tracking-tighter">
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
        </div>
    )
}
