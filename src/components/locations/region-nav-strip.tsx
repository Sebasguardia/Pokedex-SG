"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import * as Tooltip from "@radix-ui/react-tooltip";
import {
    REGION_ORDER, REGION_COLORS, REGION_NAMES_ES, REGION_YEARS,
} from "@/lib/constants/locations.constants";

interface RegionNavStripProps {
    currentRegion: string;  // "kanto"
}

export function RegionNavStrip({ currentRegion }: RegionNavStripProps) {
    return (
        <section>
            <div className="flex items-center gap-4 mb-4">
                <h2 className="font-press-start text-[14px] uppercase tracking-tighter text-[#111111] whitespace-nowrap">
                    Otras Regiones
                </h2>
                <div className="h-px bg-[#E0E0E0] flex-1" />
            </div>

            {/* Separador doble */}
            <div className="relative h-[5px] mb-6">
                <motion.div
                    className="absolute top-0 left-0 w-full h-[3px] bg-[#111111] origin-left"
                    initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                />
                <motion.div
                    className="absolute bottom-0 right-0 w-full h-[2px] bg-[#CC0000] origin-right"
                    initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                />
            </div>

            <Tooltip.Provider delayDuration={150}>
                <div className="flex flex-wrap gap-2 justify-center">
                    {REGION_ORDER.map((name, i) => {
                        const isCurrent = name === currentRegion;
                        const color = REGION_COLORS[name] ?? "#CC0000";
                        const nameEs = REGION_NAMES_ES[name] ?? name;
                        const year = REGION_YEARS[name] ?? "????";

                        return (
                            <Tooltip.Root key={name}>
                                <Tooltip.Trigger asChild>
                                    <Link href={`/locations/${name}`}>
                                        <motion.div
                                            className="px-4 py-2 font-nunito font-bold text-[11px] border-2 transition-all cursor-pointer"
                                            style={
                                                isCurrent
                                                    ? { backgroundColor: color, borderColor: color, color: "#ffffff", boxShadow: `3px 3px 0 #111111` }
                                                    : { backgroundColor: `${color}18`, borderColor: color, color }
                                            }
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.05 }}
                                            whileHover={
                                                isCurrent ? {} : {
                                                    backgroundColor: color, color: "#ffffff", scale: 1.06,
                                                    transition: { duration: 0.15 },
                                                }
                                            }
                                        >
                                            {nameEs}
                                        </motion.div>
                                    </Link>
                                </Tooltip.Trigger>
                                <Tooltip.Portal>
                                    <Tooltip.Content
                                        className="bg-[#111111] text-white font-nunito text-[11px] px-3 py-2 z-50 text-center"
                                        sideOffset={6}
                                    >
                                        <p className="font-bold">{nameEs}</p>
                                        <p className="text-[#AAAAAA] text-[10px]">Desde {year}</p>
                                        <Tooltip.Arrow className="fill-[#111111]" />
                                    </Tooltip.Content>
                                </Tooltip.Portal>
                            </Tooltip.Root>
                        );
                    })}
                </div>
            </Tooltip.Provider>
        </section>
    );
}