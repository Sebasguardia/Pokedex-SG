"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useQuery } from "@tanstack/react-query"
import { VERSION_NAMES_ES, ENCOUNTER_METHODS_ES } from "@/lib/utils/locale.utils"
import { MapPin } from "lucide-react"

interface Props {
    pokemonId?: number
}

function useGameLocations(id: number) {
    return useQuery({
        queryKey: ["locations", id],
        queryFn: async () => {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/encounters`)
            return res.json()
        },
        enabled: !!id,
        staleTime: 1000 * 60 * 5,
    })
}

export function GameLocations({ pokemonId }: Props) {
    const [selectedVersion, setSelectedVersion] = useState<string>("")

    const { data: encounters, isLoading } = useGameLocations(pokemonId ?? 0)

    if (!pokemonId) return null

    // Group by version
    const byVersion: Record<string, any[]> = {}
    if (encounters) {
        for (const encounter of encounters) {
            for (const vd of encounter.version_details) {
                const ver = vd.version?.name
                if (!ver) continue
                if (!byVersion[ver]) byVersion[ver] = []
                byVersion[ver].push({
                    areaName: encounter.location_area?.name ?? "",
                    method: vd.encounter_details?.[0]?.method?.name ?? "",
                    maxChance: vd.max_chance ?? 0,
                    minLevel: vd.encounter_details?.[0]?.min_level ?? "?",
                    maxLevel: vd.encounter_details?.[0]?.max_level ?? "?",
                })
            }
        }
    }

    const versions = Object.keys(byVersion)
    if (!selectedVersion && versions.length > 0) {
        // default to last
    }
    const activeVersion = selectedVersion || versions[versions.length - 1] || ""
    const locations = byVersion[activeVersion] ?? []

    if (isLoading) return (
        <div className="mb-6">
            <h3 className="font-['Press_Start_2P'] text-[9px] text-[#888888] mb-3 tracking-wide">UBICACIONES</h3>
            <div className="space-y-2">{[1, 2, 3].map(i => <div key={i} className="h-8 bg-[#F2F2F2] animate-pulse" />)}</div>
        </div>
    )

    return (
        <div className="mb-6">
            <h3 className="font-['Press_Start_2P'] text-[9px] text-[#888888] mb-3 tracking-wide">UBICACIONES EN JUEGOS</h3>

            {versions.length === 0 ? (
                <p className="font-['Nunito'] text-[13px] italic text-[#888888]">No disponible en ninguna versión</p>
            ) : (
                <>
                    {/* Version selector */}
                    <div className="flex flex-wrap gap-1 mb-4">
                        {versions.map(ver => (
                            <button
                                key={ver}
                                onClick={() => setSelectedVersion(ver)}
                                className="font-['Nunito'] text-[11px] font-bold px-2 py-1 transition-colors"
                                style={{
                                    backgroundColor: activeVersion === ver ? "#CC0000" : "#F2F2F2",
                                    color: activeVersion === ver ? "white" : "#888888",
                                    border: "1px solid #E0E0E0"
                                }}
                            >
                                {VERSION_NAMES_ES[ver] ?? ver}
                            </button>
                        ))}
                    </div>

                    {locations.length === 0 ? (
                        <p className="font-['Nunito'] text-[13px] italic text-[#888888]">No disponible en esta versión</p>
                    ) : (
                        <div className="space-y-2">
                            {locations.map((loc, i) => {
                                const formatLocationName = (name: string) => {
                                    return name
                                        .replace(/-/g, " ")
                                        .replace(/\broute\b/ig, "Ruta")
                                        .replace(/\barea\b/ig, "Área")
                                        .replace(/\bcity\b/ig, "Ciudad")
                                        .replace(/\btown\b/ig, "Pueblo")
                                        .replace(/\bforest\b/ig, "Bosque")
                                        .replace(/\bcave\b/ig, "Cueva")
                                        .replace(/\bmt\b/ig, "Monte")
                                        .replace(/\bmountain\b/ig, "Montaña")
                                        .replace(/\bsea\b/ig, "Mar")
                                        .replace(/\bocean\b/ig, "Océano")
                                        .replace(/\bisland\b/ig, "Isla")
                                        .replace(/\bpark\b/ig, "Parque")
                                        .replace(/\bruins\b/ig, "Ruinas")
                                        .replace(/\blake\b/ig, "Lago")
                                        .replace(/\btower\b/ig, "Torre")
                                        .replace(/\bpath\b/ig, "Senda")
                                        .replace(/\bwoods\b/ig, "Bosque")
                                        .replace(/\bvalley\b/ig, "Valle")
                                        .replace(/\bcamp\b/ig, "Campamento")
                                        .replace(/\bdesert\b/ig, "Desierto")
                                }

                                const methodName = loc.method === "island-scan" ? "Escaneo Insular" : (ENCOUNTER_METHODS_ES[loc.method] ?? loc.method)

                                return (
                                    <motion.div
                                        key={`${loc.areaName}-${i}`}
                                        initial={{ opacity: 0, x: -8 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.04 }}
                                        className="flex items-center gap-3 py-2 px-3"
                                        style={{ backgroundColor: "#F8F8F8", border: "1px solid #E0E0E0" }}
                                    >
                                        <MapPin size={12} className="text-[#CC0000] flex-shrink-0" />
                                        <div className="flex-1">
                                            <span className="font-['Nunito'] text-[13px] font-bold text-[#111111] capitalize block">
                                                {formatLocationName(loc.areaName)}
                                            </span>
                                            <span className="font-['Nunito'] text-[11px] text-[#888888]">
                                                {methodName} · Nv. {loc.minLevel}–{loc.maxLevel}
                                            </span>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <div className="flex items-center gap-1">
                                                <div className="h-[6px] bg-[#F2F2F2] border border-[#E0E0E0]" style={{ width: 60 }}>
                                                    <div className="h-full bg-[#CC0000]" style={{ width: `${loc.maxChance}%` }} />
                                                </div>
                                                <span className="font-['JetBrains_Mono'] text-[10px] text-[#CC0000]">{loc.maxChance}%</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </div>
                    )}
                </>
            )}
        </div>
    )
}
