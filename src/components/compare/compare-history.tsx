"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp, Clock } from "lucide-react"
import Image from "next/image"

interface HistoryEntry {
    slugs:     string[]
    labels:    string[]
    ids?:      number[]
    params:    string
    timestamp: number
}

const STORAGE_KEY = "pokedex-compare-history"

export function CompareHistory({ onRestore }: { onRestore: (params: string) => void }) {
    const [entries, setEntries] = useState<HistoryEntry[]>([])
    const [expanded, setExpanded] = useState(false)

    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY)
            if (saved) setEntries(JSON.parse(saved))
        } catch {}
    }, [])

    if (entries.length === 0) return null

    const timeAgo = (ts: number) => {
        const diff = Date.now() - ts
        if (diff < 60000) return "hace un momento"
        if (diff < 3600000) return `hace ${Math.floor(diff / 60000)}m`
        if (diff < 86400000) return `hace ${Math.floor(diff / 3600000)}h`
        return `hace ${Math.floor(diff / 86400000)}d`
    }

    return (
        <div className="mt-4">
            <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-2 font-press-start text-[8px] text-gray-500 hover:text-[#111111] transition-colors"
            >
                <Clock className="w-3.5 h-3.5" />
                COMPARACIONES RECIENTES
                {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>

            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden mt-2"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {entries.map((entry, i) => (
                                <button
                                    key={i}
                                    onClick={() => onRestore(entry.params)}
                                    className="flex items-center gap-3 border-2 border-[#E0E0E0] bg-[#FAFAFA] p-3 text-left hover:border-[#111111] hover:bg-white transition-all"
                                >
                                    {/* Sprites */}
                                    <div className="flex -space-x-2">
                                        {entry.slugs.slice(0, 3).map((slug, j) => {
                                            const imgId = entry.ids?.[j]
                                            const src = imgId
                                                ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${imgId}.png`
                                                : `https://play.pokemonshowdown.com/sprites/gen5/${slug}.png`
                                                
                                            return (
                                                <Image
                                                    key={j}
                                                    src={src}
                                                    alt={slug}
                                                    width={28}
                                                    height={28}
                                                    className="object-contain"
                                                    unoptimized
                                                />
                                            )
                                        })}
                                    </div>
                                    {/* Label */}
                                    <div className="flex-1 min-w-0">
                                        <p className="font-nunito text-[13px] text-[#111111] truncate">
                                            {entry.labels.join(" vs ")}
                                        </p>
                                        <p className="font-nunito text-[11px] text-gray-400">{timeAgo(entry.timestamp)}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

/** Call this from the main page when ≥2 Pokémon are loaded */
export function saveCompareHistory(slots: (string | null)[], labels: (string | null)[], ids: (number | null)[] = []) {
    if (typeof window === "undefined") return
    try {
        const activeSlots = slots.filter(Boolean) as string[]
        const activeLabels = labels.filter(Boolean) as string[]
        const activeIds = ids.filter(Boolean) as number[]
        if (activeSlots.length < 2) return

        const params = activeSlots.map((s, i) => `p${i + 1}=${s}`).join("&")
        const entry: HistoryEntry = {
            slugs: activeSlots,
            labels: activeLabels,
            ids: activeIds,
            params,
            timestamp: Date.now(),
        }

        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as HistoryEntry[]
        // Avoid duplicate
        const filtered = saved.filter(e => e.params !== params)
        const updated = [entry, ...filtered].slice(0, 5)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    } catch {}
}
