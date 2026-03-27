"use client"

import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { History, ChevronDown, ChevronUp } from "lucide-react"

interface Props {
    ability: any
    typeColor?: string
}

export function AbilityVersionHistory({ ability, typeColor = "#CC0000" }: Props) {
    const [isExpanded, setIsExpanded] = useState(false)

    // Process and deduplicate flavor texts
    const versionHistory = useMemo(() => {
        if (!ability?.flavor_text_entries) return []

        // 1. Filter for Spanish (and English as fallback)
        const entries = ability.flavor_text_entries.filter(
            (e: any) => e.language.name === "es" || e.language.name === "en"
        )

        // 2. Group by text to avoid identical rows for multiple games
        const uniqueTexts = new Map<string, {
            text: string
            versions: string[]
            language: string
        }>()

        entries.forEach((entry: any) => {
            // Clean up the text (remove newlines usually found in PokeAPI)
            const cleanText = entry.flavor_text.replace(/\f|\n|\r/g, " ").trim()
            const versionName = entry.version_group.name.replace("-", " / ")

            if (uniqueTexts.has(cleanText)) {
                uniqueTexts.get(cleanText)!.versions.push(versionName)
            } else {
                uniqueTexts.set(cleanText, {
                    text: cleanText,
                    versions: [versionName],
                    language: entry.language.name
                })
            }
        })

        // 3. Convert map to array and sort (Spanish prioritized if they describe the exact same versions, though usually they differ)
        return Array.from(uniqueTexts.values())
            .sort((a, b) => {
                // Prioritize Spanish over English if we have mixed languages
                if (a.language === "es" && b.language !== "es") return -1
                if (a.language !== "es" && b.language === "es") return 1
                return 0
            })
    }, [ability])

    if (versionHistory.length === 0) return null

    // Show only the 3 most recent changes if not expanded, or all if expanded
    const displayedHistory = isExpanded ? versionHistory : versionHistory.slice(0, 3)
    const hasMore = versionHistory.length > 3

    return (
        <section className="py-12">
            <div className="flex items-center gap-3 mb-8">
                <h2 className="font-press-start text-[14px] text-[#111111] uppercase tracking-tighter">
                    HISTORIAL DE DESCRIPCIÓN
                </h2>
                <div className="h-px bg-[#E0E0E0] flex-1" />
            </div>

            <div className="bg-white border-4 border-[#111111] p-1" style={{ boxShadow: "8px 8px 0 #111111" }}>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                        <thead>
                            <tr className="bg-[#111111] text-white font-press-start text-[10px] uppercase">
                                <th className="p-4 w-[30%]">Juegos</th>
                                <th className="p-4 w-[70%]">Descripción en el juego</th>
                            </tr>
                        </thead>
                        <tbody>
                            <AnimatePresence>
                                {displayedHistory.map((item, index) => (
                                    <motion.tr
                                        key={index}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="border-t-2 border-[#E0E0E0] hover:bg-[#F8F8F8] transition-colors group"
                                    >
                                        <td className="p-4 align-top">
                                            <div className="flex flex-wrap gap-2">
                                                {item.versions.map((ver, i) => (
                                                    <span 
                                                        key={i} 
                                                        className="font-press-start text-[8px] sm:text-[9px] bg-[#E0E0E0] text-[#111111] px-2 py-1 uppercase group-hover:bg-[#111111] group-hover:text-white transition-colors"
                                                    >
                                                        {ver}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="p-4 align-top font-nunito text-[14px] text-[#555555] italic leading-relaxed group-hover:text-[#111111]">
                                            "{item.text}"
                                            {item.language === "en" && (
                                                <span className="ml-2 inline-block font-press-start text-[7px] bg-[#CC0000] text-white px-1.5 py-0.5 rounded-sm not-italic opacity-80">
                                                    EN
                                                </span>
                                            )}
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>

                {hasMore && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="w-full bg-[#FAFAFA] hover:bg-[#E0E0E0] border-t-2 border-[#111111] p-3 flex justify-center items-center gap-2 font-press-start text-[10px] text-[#111111] transition-colors uppercase"
                    >
                        {isExpanded ? (
                            <>Ver menos <ChevronUp size={14} /></>
                        ) : (
                            <>Ver historial completo ({versionHistory.length} registros) <ChevronDown size={14} /></>
                        )}
                    </button>
                )}
            </div>
        </section>
    )
}
