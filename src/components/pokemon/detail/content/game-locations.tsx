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
    const activeVersion = selectedVersion || versions[versions.length - 1] || ""
    const locations = byVersion[activeVersion] ?? []

    if (isLoading) return (
        <div className="mb-10">
            <h3 className="font-['Press_Start_2P'] text-[12px] text-[#111111] mb-6 flex items-center gap-3">
                <span className="w-3 h-3 bg-[#111111]" />
                UBICACIONES
                <span className="flex-1 h-[2px] bg-[#E0E0E0]" />
            </h3>
            <div className="grid grid-cols-1 gap-4">
                {[1, 2, 3].map(i => (
                    <div key={i} className="h-20 bg-white border-[3px] border-[#111111] shadow-[6px_6px_0_rgba(17,17,17,0.1)] animate-pulse" />
                ))}
            </div>
        </div>
    )

    return (
        <div className="mb-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
                <h3 className="font-['Press_Start_2P'] text-[10px] sm:text-[12px] text-[#111111] flex items-center gap-3">
                    <span className="w-3 h-3 bg-[#111111]" />
                    UBICACIONES EN JUEGOS
                </h3>

                {versions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {versions.map(ver => (
                            <button
                                key={ver}
                                onClick={() => setSelectedVersion(ver)}
                                className="font-['Press_Start_2P'] text-[7px] sm:text-[8px] px-2 sm:px-3 py-1.5 sm:py-2 transition-all relative"
                                style={{
                                    backgroundColor: activeVersion === ver ? "#CC0000" : "#FFFFFF",
                                    color: activeVersion === ver ? "white" : "#111111",
                                    border: "2px solid #111111",
                                    boxShadow: activeVersion === ver ? "none" : "3px 3px 0 #111111",
                                    transform: activeVersion === ver ? "translate(2px, 2px)" : "none"
                                }}
                            >
                                {VERSION_NAMES_ES[ver]?.toUpperCase() ?? ver.toUpperCase()}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {versions.length === 0 ? (
                <div className="p-10 bg-[#F9F9F9] border-2 border-dashed border-[#E0E0E0] text-center">
                    <p className="font-['Nunito'] text-[14px] italic text-[#888888]">No disponible en ninguna versión conocida</p>
                </div>
            ) : locations.length === 0 ? (
                <div className="p-10 bg-[#F9F9F9] border-2 border-dashed border-[#E0E0E0] text-center">
                    <p className="font-['Nunito'] text-[14px] italic text-[#888888]">Este Pokémon no aparece en la naturaleza en esta versión</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-5">
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
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="group flex flex-col sm:flex-row sm:items-center gap-4 py-4 px-6 bg-white border-[3px] border-[#111111] shadow-[6px_6px_0_#111111] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0_#111111] transition-all"
                            >
                                <div className="flex items-center gap-4 flex-1">
                                    <div className="w-10 h-10 bg-[#F9F9F9] border-2 border-[#111111] flex items-center justify-center shadow-[3px_3px_0_#111111] group-hover:bg-[#CC0000] group-hover:text-white transition-colors">
                                        <MapPin size={18} strokeWidth={3} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-['Nunito'] text-[16px] font-black text-[#111111] capitalize">
                                            {formatLocationName(loc.areaName)}
                                        </span>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <span className="font-['Press_Start_2P'] text-[7px] text-[#888888] uppercase tracking-tighter">
                                                {methodName}
                                            </span>
                                            <span className="w-1 h-1 bg-[#E0E0E0] rounded-full" />
                                            <span className="font-['JetBrains_Mono'] text-[11px] font-bold text-[#CC0000]">
                                                Nv. {loc.minLevel}–{loc.maxLevel}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col items-end gap-1.5 sm:border-l-2 sm:border-[#F2F2F2] sm:pl-6 min-w-[140px]">
                                    <div className="flex items-center justify-between w-full mb-1">
                                        <span className="font-['Press_Start_2P'] text-[7px] text-[#888888]">PROBAB.</span>
                                        <span className="font-['JetBrains_Mono'] text-[13px] font-black text-[#111111]">{loc.maxChance}%</span>
                                    </div>
                                    <div className="w-full h-3 bg-[#F2F2F2] border-[2px] border-[#111111] relative overflow-hidden">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${loc.maxChance}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1, ease: "easeOut" }}
                                            className="h-full bg-[#CC0000]"
                                        >
                                            <div 
                                                className="absolute inset-0 opacity-20 pointer-events-none" 
                                                style={{ 
                                                    backgroundImage: "linear-gradient(transparent 50%, rgba(255,255,255,0.4) 50%)", 
                                                    backgroundSize: "100% 4px" 
                                                }} 
                                            />
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
