"use client"

import { motion } from "framer-motion"
import { Move } from "@/types/api/move.types"
import { TYPE_COLORS } from "@/lib/constants/types.constants"
import { AILMENT_COLORS, AILMENT_LABELS, STAT_LABELS_ES } from "@/lib/constants/moves.constants"
import * as Accordion from "@radix-ui/react-accordion"
import * as Tooltip from "@radix-ui/react-tooltip"
import { ChevronDown } from "lucide-react"
import Link from "next/link"

interface Props {
    move: Move
    typeColor: string
}

// Parser for [text]{type:name} Pokémon API effect references
function parseEffect(text: string, move: Move, typeColor: string): React.ReactNode[] {
    const cleanText = text.replace(/\$effect_chance/g, `${move.effect_chance ?? 0}`)

    const regex = /\[([^\]]+)\]\{(mechanic|move|type|item|pokemon):([^}]+)\}/g
    const parts: React.ReactNode[] = []
    let lastIndex = 0
    let match: RegExpExecArray | null

    while ((match = regex.exec(cleanText)) !== null) {
        // Add text before match
        if (match.index > lastIndex) {
            parts.push(cleanText.slice(lastIndex, match.index))
        }

        const [, displayText, refType, refName] = match

        if (refType === "mechanic") {
            parts.push(
                <Tooltip.Provider key={match.index} delayDuration={300}>
                    <Tooltip.Root>
                        <Tooltip.Trigger asChild>
                            <span
                                className="border-b-2 border-dashed cursor-help font-bold"
                                style={{ borderColor: typeColor, color: typeColor }}
                            >
                                {displayText}
                            </span>
                        </Tooltip.Trigger>
                        <Tooltip.Portal>
                            <Tooltip.Content className="bg-[#111111] text-white font-nunito text-[12px] px-3 py-2 max-w-[240px] z-50" sideOffset={4}>
                                <span className="font-press-start text-[9px] block mb-1">{refName.replace(/-/g, " ").toUpperCase()}</span>
                                Mecánica de batalla Pokémon: {refName.replace(/-/g, " ")}
                                <Tooltip.Arrow className="fill-[#111111]" />
                            </Tooltip.Content>
                        </Tooltip.Portal>
                    </Tooltip.Root>
                </Tooltip.Provider>
            )
        } else if (refType === "move") {
            parts.push(
                <Link key={match.index} href={`/moves/${refName}`} className="font-bold underline hover:opacity-70 transition-opacity" style={{ color: typeColor }}>
                    {displayText}
                </Link>
            )
        } else if (refType === "type") {
            const tColor = TYPE_COLORS[refName] ?? typeColor
            parts.push(
                <Link key={match.index} href={`/types/${refName}`} className="inline-flex items-center gap-1 px-1.5 py-0 font-nunito text-[11px] font-bold text-white border border-[#111111] mx-0.5" style={{ backgroundColor: tColor }}>
                    {displayText}
                </Link>
            )
        } else {
            parts.push(<span key={match.index} className="font-bold">{displayText}</span>)
        }

        lastIndex = regex.lastIndex
    }

    if (lastIndex < cleanText.length) {
        parts.push(cleanText.slice(lastIndex))
    }

    return parts
}

export function MoveEffectSection({ move, typeColor }: Props) {
    const effectEN = move.effect_entries?.find(e => e.language.name === "en")
    const shortEffect = move.effect_entries?.find(e => e.language.name === "en")?.short_effect ?? ""
    const fullEffect = effectEN?.effect ?? ""

    const showShort = fullEffect.length > shortEffect.length * 1.3

    const meta = move.meta

    const drainLabel = meta?.drain && meta.drain !== 0
        ? meta.drain > 0 ? `Recupera ${meta.drain}% del daño` : `Recibe ${Math.abs(meta.drain)}% de retroceso`
        : null

    const healLabel = meta?.healing && meta.healing !== 0
        ? `Restaura ${meta.healing}% del HP máximo`
        : null

    const ailmentName = meta?.ailment?.name
    const ailmentColor = AILMENT_COLORS[ailmentName ?? ""] ?? "#888888"
    const ailmentLabel = ailmentName && ailmentName !== "none" && ailmentName !== "unknown"
        ? AILMENT_LABELS[ailmentName] ?? ailmentName
        : null

    const technicalData: { label: string; value: React.ReactNode }[] = []
    if (ailmentLabel) technicalData.push({ label: "Causa", value: <span className="px-2 py-0.5 font-nunito text-[11px] font-bold text-white" style={{ backgroundColor: ailmentColor }}>{ailmentLabel}</span> })
    if (meta?.min_hits !== null && meta?.max_hits !== null && meta?.min_hits !== undefined) {
        const hitsLabel = meta.min_hits === meta.max_hits ? `${meta.min_hits} golpe(s)` : `${meta.min_hits}–${meta.max_hits} golpes`
        technicalData.push({ label: "Golpes", value: hitsLabel })
    }
    if (meta?.min_turns !== null && meta?.max_turns !== null && meta?.min_turns !== undefined) {
        const turnsLabel = meta.min_turns === meta.max_turns ? `${meta.min_turns} turno(s)` : `${meta.min_turns}–${meta.max_turns} turnos`
        technicalData.push({ label: "Turnos", value: turnsLabel })
    }
    if (drainLabel) technicalData.push({ label: "Drenaje", value: <span style={{ color: meta!.drain > 0 ? "#22C55E" : "#CC0000" }}>{drainLabel}</span> })
    if (healLabel) technicalData.push({ label: "Curación", value: <span className="text-[#22C55E]">{healLabel}</span> })
    if (move.stat_changes?.length) {
        move.stat_changes.forEach(sc => {
            const statName = STAT_LABELS_ES[sc.stat.name] ?? sc.stat.name
            technicalData.push({
                label: statName,
                value: <span style={{ color: sc.change > 0 ? "#22C55E" : "#CC0000" }} className="font-bold">{sc.change > 0 ? `+${sc.change}` : sc.change} etapa(s)</span>
            })
        })
    }
    if (meta?.flinch_chance) technicalData.push({ label: "Flinch", value: `${meta.flinch_chance}% de chance` })
    if (meta?.crit_rate && meta.crit_rate > 0) technicalData.push({ label: "Crítico", value: `+${meta.crit_rate} etapa(s) de tasa crítica` })

    return (
        <section className="py-6">
            <div className="mb-5">
                <div className="flex items-center gap-3 mb-1">
                    <span className="font-press-start text-[10px] text-[#111111]">DESCRIPCIÓN DEL EFECTO</span>
                </div>
                <motion.div className="flex gap-[2px]" style={{ transformOrigin: "left" }} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                    <div className="flex-1 h-[3px] bg-[#111111]" />
                    <div className="flex-1 h-[2px] bg-[#CC0000] mt-0.5" />
                </motion.div>
            </div>

            {/* Short effect summary */}
            {showShort && shortEffect && (
                <div className="bg-[#F8F8F8] px-5 py-3 mb-3 border-l-4 italic font-nunito text-[13px] text-[#888888]" style={{ borderLeftColor: typeColor }}>
                    {parseEffect(shortEffect, move, typeColor)}
                </div>
            )}

            {/* Full effect */}
            {fullEffect && (
                <div className="bg-[#F8F8F8] px-5 py-4 mb-4 border-l-4" style={{ borderLeftColor: typeColor }}>
                    <p className="font-nunito text-[15px] text-[#444444] leading-[1.85]">
                        {parseEffect(fullEffect, move, typeColor)}
                    </p>
                </div>
            )}

            {/* Technical data accordion */}
            {technicalData.length > 0 && (
                <Accordion.Root type="single" collapsible>
                    <Accordion.Item value="tech">
                        <Accordion.Trigger className="flex items-center gap-2 w-full font-press-start text-[9px] text-[#888888] py-3 border-t border-[#E0E0E0] hover:text-[#111111] transition-colors group">
                            DATOS TÉCNICOS DEL EFECTO
                            <ChevronDown size={14} className="transition-transform group-data-[state=open]:rotate-180" />
                        </Accordion.Trigger>
                        <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 pb-4">
                                {technicalData.map((item, i) => (
                                    <motion.div
                                        key={i}
                                        className="flex items-center justify-between px-3 py-2 hover:bg-[#FAFAFA]"
                                        initial={{ opacity: 0, x: -8 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.04 }}
                                    >
                                        <span className="font-press-start text-[8px] text-[#AAAAAA]">{item.label}</span>
                                        <span className="font-nunito text-[13px]">{item.value}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </Accordion.Content>
                    </Accordion.Item>
                </Accordion.Root>
            )}
        </section>
    )
}
