"use client";

import { motion } from "framer-motion";
import { Gamepad2, RefreshCw } from "lucide-react";
import { NamedAPIResource } from "@/types/api/common.types";
import { REMAKE_VERSION_GROUPS } from "@/lib/constants/generations.constants";

interface GenerationGamesSectionProps {
    versionGroups: NamedAPIResource[];
    genColor: string;
}

function formatVersionName(name: string): string {
    return name
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
}

export function GenerationGamesSection({ versionGroups, genColor }: GenerationGamesSectionProps) {
    return (
        <section>
            {/* Section header */}
            <div className="flex items-center gap-4 mb-6">
                <h2 className="font-press-start text-[14px] uppercase tracking-tighter text-[#111111] whitespace-nowrap">
                    Versiones y Juegos
                </h2>
                <div className="h-px bg-[#E0E0E0] flex-1" />
            </div>

            <div className="flex flex-wrap gap-4">
                {versionGroups.map((vg, i) => {
                    const isRemake = REMAKE_VERSION_GROUPS.has(vg.name);
                    const displayName = formatVersionName(vg.name);

                    return (
                        <motion.div
                            key={vg.name}
                            className="relative border-2 border-[#E0E0E0] bg-white p-4 min-w-[160px] flex-1 overflow-hidden"
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.35, delay: i * 0.06 }}
                            whileHover={{
                                borderColor: "#111111",
                                boxShadow: `3px 3px 0 ${genColor}`,
                                transition: { duration: 0.15 },
                            }}
                        >
                            {/* Franja top del color de generación */}
                            <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ backgroundColor: genColor }} />

                            <div className="flex items-start justify-between gap-2 pt-1">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-1.5 mb-2">
                                        <Gamepad2 size={13} className="text-[#888888]" />
                                        <p className="font-press-start text-[10px] text-[#111111] leading-tight">
                                            {displayName}
                                        </p>
                                    </div>

                                    {/* Chips de versiones individuales */}
                                    <div className="flex flex-wrap gap-1 mt-2">
                                        {vg.name.split("-").map((part) => (
                                            <span
                                                key={part}
                                                className="font-nunito text-[11.5px] font-bold px-2 py-0.5 border border-[#E0E0E0] capitalize"
                                            >
                                                {part}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Badge de remake */}
                                {isRemake && (
                                    <div
                                        className="flex items-center gap-1 px-2 py-1 shrink-0"
                                        style={{ backgroundColor: genColor }}
                                    >
                                        <RefreshCw size={10} className="text-white" />
                                        <span className="font-press-start text-[7.5px] text-white">REMAKE</span>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}