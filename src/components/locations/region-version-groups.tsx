"use client";

import { motion } from "framer-motion";
import { Gamepad2, RefreshCw } from "lucide-react";
import { NamedAPIResource } from "@/types/api/common.types";
import { REMAKE_VERSION_GROUPS } from "@/lib/constants/generations.constants";

interface RegionVersionGroupsProps {
    versionGroups: NamedAPIResource[];
    regionColor: string;
    games: string[];  // nombres en español de los juegos
}

export function RegionVersionGroups({ versionGroups, regionColor, games }: RegionVersionGroupsProps) {
    const hasRemakes = versionGroups.some((vg) => REMAKE_VERSION_GROUPS.has(vg.name));

    return (
        <section>
            <div className="flex items-center gap-4 mb-6">
                <h2 className="font-press-start text-[15.5px] uppercase tracking-tighter text-[#111111] whitespace-nowrap">
                    Disponible En
                </h2>
                <div className="h-px bg-[#E0E0E0] flex-1" />
                {hasRemakes && (
                    <div
                        className="flex items-center gap-1 px-2.5 py-1 shrink-0"
                        style={{ backgroundColor: "#111111" }}
                    >
                        <RefreshCw size={9} className="text-white" />
                        <span className="font-press-start text-[7px] text-white">CON REMAKES</span>
                    </div>
                )}
            </div>

            <div className="flex flex-wrap gap-3">
                {games.map((game, i) => (
                    <motion.div
                        key={game}
                        className="relative flex items-center gap-2 border-2 border-[#E0E0E0] bg-white px-4 py-3 overflow-hidden"
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                        whileHover={{ borderColor: regionColor, boxShadow: `2px 2px 0 ${regionColor}` }}
                    >
                        {/* Franja izquierda de 2px */}
                        <div className="absolute left-0 top-0 bottom-0 w-[2px]" style={{ backgroundColor: regionColor }} />

                        <Gamepad2 size={15} style={{ color: regionColor }} />
                        <span className="font-press-start text-[10.5px] text-[#111111]">{game}</span>

                        {/* Badge remake */}
                        {versionGroups[i] && REMAKE_VERSION_GROUPS.has(versionGroups[i]?.name ?? "") && (
                            <span
                                className="font-press-start text-[6px] px-1.5 py-0.5 ml-1"
                                style={{ backgroundColor: regionColor, color: "#ffffff" }}
                            >
                                REMAKE
                            </span>
                        )}
                    </motion.div>
                ))}
            </div>
        </section>
    );
}