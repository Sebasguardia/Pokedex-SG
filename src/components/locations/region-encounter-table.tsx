"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
    Leaf, Fish, Waves, Hammer, Zap, Gift, Mountain, Sparkles,
    Anchor, Radio, CircleDot, MapPin, Triangle, Trees,
} from "lucide-react";
import { LocationArea } from "@/types/api/location.types";
import { ENCOUNTER_METHOD_META } from "@/lib/constants/locations.constants";

// Mapa de íconos lucide-react por nombre de string
const ICON_MAP: Record<string, React.ElementType> = {
    Leaf, Fish, Waves, Hammer, Zap, Gift, Mountain, Sparkles,
    Anchor, Radio, CircleDot, MapPin, Triangle, Trees,
};

interface RegionEncounterTableProps {
    area: LocationArea;
    regionColor: string;
}

function extractId(url: string): number {
    return parseInt(url.match(/\/(\d+)\/?$/)?.[1] ?? "0");
}

function capitalize(s: string) {
    return s.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

export function RegionEncounterTable({ area, regionColor }: RegionEncounterTableProps) {
    // Extraer versiones únicas de todos los encounters
    const allVersions = useMemo(() => {
        const seen = new Set<string>();
        const result: string[] = [];
        area.pokemon_encounters.forEach((pe) => {
            pe.version_details.forEach((vd) => {
                if (!seen.has(vd.version.name)) {
                    seen.add(vd.version.name);
                    result.push(vd.version.name);
                }
            });
        });
        return result;
    }, [area]);

    const [activeVersion, setActiveVersion] = useState(allVersions[0] ?? "");

    // Filtrar encounters por versión activa
    const encountersByMethod = useMemo(() => {
        const map = new Map<string, { pokemon: { name: string; id: number }; minLv: number; maxLv: number; chance: number }[]>();

        area.pokemon_encounters.forEach((pe) => {
            const versionDetail = pe.version_details.find((vd) => vd.version.name === activeVersion);
            if (!versionDetail) return;

            versionDetail.encounter_details.forEach((ed) => {
                const method = ed.method.name;
                if (!map.has(method)) map.set(method, []);
                const id = extractId(pe.pokemon.url);
                const existing = map.get(method)!.find((e) => e.pokemon.name === pe.pokemon.name);
                if (!existing) {
                    map.get(method)!.push({ pokemon: { name: pe.pokemon.name, id }, minLv: ed.min_level, maxLv: ed.max_level, chance: ed.chance });
                }
            });
        });

        // Ordenar por chance desc dentro de cada método
        map.forEach((arr) => arr.sort((a, b) => b.chance - a.chance));
        return map;
    }, [area, activeVersion]);

    const hasEncounters = encountersByMethod.size > 0 && Array.from(encountersByMethod.values()).some((v) => v.length > 0);

    if (allVersions.length === 0 || !hasEncounters) {
        return (
            <div className="py-5 text-center">
                <p className="font-nunito text-[13.5px] text-[#888888] italic">Sin encuentros de Pokémon registrados en esta área.</p>
            </div>
        );
    }

    return (
        <div>
            {/* Version selector */ }
            { allVersions.length > 1 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                    {allVersions.map((v) => (
                        <button
                            key={v}
                            onClick={() => setActiveVersion(v)}
                            className="font-press-start text-[8.5px] px-2.5 py-1.5 border-2 transition-colors"
                            style={
                                activeVersion === v
                                    ? { backgroundColor: "#111111", color: "#ffffff", borderColor: "#111111" }
                                    : { backgroundColor: "#ffffff", color: "#888888", borderColor: "#E0E0E0" }
                            }
                        >
                            {capitalize(v)}
                        </button>
                    ))}
                </div>
            )}

            {/* Por método */ }
            <div className="space-y-4">
                {Array.from(encountersByMethod.entries()).map(([method, encounters]) => {
                    if (encounters.length === 0) return null;
                    const meta = ENCOUNTER_METHOD_META[method] ?? { label: capitalize(method), icon: "MapPin" };
                    const IconComponent = ICON_MAP[meta.icon] ?? MapPin;

                    return (
                        <div key={method}>
                            {/* Method header */ }
                            <div className="flex items-center gap-2 mb-2">
                                <div
                                    className="w-6 h-6 flex items-center justify-center border border-[#E0E0E0]"
                                    style={{ backgroundColor: `${regionColor}15` }}
                                >
                                    <IconComponent size={12} style={{ color: regionColor }} />
                                </div>
                                <span className="font-press-start text-[9.5px] text-[#111111]">{meta.label.toUpperCase()}</span>
                                <div className="h-px bg-[#E0E0E0] flex-1" />
                                <span className="font-jetbrains text-[10.5px] text-[#888888]">{encounters.length} pkm</span>
                            </div>

                            {/* Filas de Pokémon */ }
                            <div className="space-y-1">
                                {encounters.map(({ pokemon, minLv, maxLv, chance }: { pokemon: { name: string; id: number }; minLv: number; maxLv: number; chance: number }, i: number) => (
                                    <motion.div
                                        key={pokemon.name}
                                        className="flex items-center gap-2 bg-[#FAFAFA] border border-[#F0F0F0] px-2 py-1"
                                        initial={{ opacity: 0, x: -8 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.03 }}
                                    >
                                        <Image
                                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                                            alt={pokemon.name}
                                            width={44} height={44}
                                            className="object-contain shrink-0"
                                        />
                                        <span className="font-nunito font-bold text-[14.5px] text-[#111111] capitalize flex-1 truncate">
                                            {capitalize(pokemon.name)}
                                        </span>
                                        <span className="font-jetbrains text-[11.5px] text-[#888888] shrink-0">
                                            Lv.{minLv}{minLv !== maxLv ? `–${maxLv}` : ""}
                                        </span>
                                        {/* Chance bar */}
                                        <div className="w-[60px] flex items-center gap-1 shrink-0">
                                            <div className="flex-1 h-[4px] bg-[#E8E8E8] overflow-hidden">
                                                <motion.div
                                                    className="h-full"
                                                    style={{ backgroundColor: regionColor, opacity: 0.75 }}
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${Math.min(chance, 100)}%` }}
                                                    transition={{ duration: 0.5, delay: i * 0.03 }}
                                                />
                                            </div>
                                            <span className="font-jetbrains text-[10.5px] text-[#888888] shrink-0 w-[26px] text-right">
                                                {chance}%
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}