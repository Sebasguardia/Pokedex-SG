"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import * as Tooltip from "@radix-ui/react-tooltip";
import {
    NATURES_DATA, TABLE_STATS, STAT_COLORS, STAT_NAMES_ES, STAT_ABBR,
} from "@/lib/constants/natures.constants";

interface NatureNavStripProps {
    currentNature: string;
}

const NEUTRAL_NATURES = NATURES_DATA.filter((n) => n.isNeutral);

export function NatureNavStrip({ currentNature }: NatureNavStripProps) {
    return (
        <section>
            <div className="flex items-center gap-4 mb-4">
                <h2 className="font-press-start text-[14px] uppercase tracking-tighter text-[#111111] whitespace-nowrap">
                    Todas las Naturalezas
                </h2>
                <div className="h-px bg-[#E0E0E0] flex-1" />
            </div>

            {/* Separador doble */}
            <div className="relative h-[5px] mb-6">
                <motion.div className="absolute top-0 left-0 w-full h-[3px] bg-[#111111] origin-left"
                    initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} />
                <motion.div className="absolute bottom-0 right-0 w-full h-[2px] bg-[#CC0000] origin-right"
                    initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.1 }} />
            </div>

            <Tooltip.Provider delayDuration={120}>
                <div className="flex flex-col gap-4">
                    {/* Grupos por stat subido */}
                    {TABLE_STATS.map((stat) => {
                        const color = STAT_COLORS[stat];
                        const natures = NATURES_DATA.filter((n) => n.increased === stat);
                        return (
                            <div key={stat} className="flex items-center gap-3 flex-wrap">
                                {/* Label del grupo */}
                                <div className="flex items-center gap-1.5 shrink-0 w-[100px]">
                                    <div className="w-3 h-3 border border-[#111111]" style={{ backgroundColor: color }} />
                                    <span className="font-press-start text-[8px]" style={{ color }}>
                                        +{STAT_ABBR[stat]}
                                    </span>
                                </div>

                                {/* Chips */}
                                <div className="flex gap-1.5 flex-wrap">
                                    {natures.map((n, i) => {
                                        const isCurrent = n.name === currentNature;
                                        const downColor = n.decreased ? STAT_COLORS[n.decreased] : "#888888";
                                        return (
                                            <Tooltip.Root key={n.name}>
                                                <Tooltip.Trigger asChild>
                                                    <Link href={`/natures/${n.name}`}>
                                                        <motion.div
                                                            className="px-3 py-1.5 border-2 font-press-start text-[8px] cursor-pointer transition-all"
                                                            style={
                                                                isCurrent
                                                                    ? { backgroundColor: color, borderColor: "#111111", color: "#ffffff", boxShadow: `2px 2px 0 #111111` }
                                                                    : { backgroundColor: `${color}14`, borderColor: color, color }
                                                            }
                                                            initial={{ opacity: 0, y: 8 }}
                                                            whileInView={{ opacity: 1, y: 0 }}
                                                            viewport={{ once: true }}
                                                            transition={{ delay: i * 0.05 }}
                                                            whileHover={
                                                                isCurrent ? {} : {
                                                                    backgroundColor: color, color: "#ffffff", scale: 1.05,
                                                                    transition: { duration: 0.12 },
                                                                }
                                                            }
                                                        >
                                                            {n.nameEs}
                                                        </motion.div>
                                                    </Link>
                                                </Tooltip.Trigger>
                                                <Tooltip.Portal>
                                                    <Tooltip.Content className="bg-[#111111] text-white font-nunito text-[12px] px-3 py-2 z-50 text-center" sideOffset={6}>
                                                        <p className="font-bold">{n.nameEs}</p>
                                                        <p className="text-[10px] mt-0.5" style={{ color }}>+{STAT_NAMES_ES[stat]}</p>
                                                        {n.decreased && (
                                                            <p className="text-[10px]" style={{ color: downColor }}>-{STAT_NAMES_ES[n.decreased]}</p>
                                                        )}
                                                        <Tooltip.Arrow className="fill-[#111111]" />
                                                    </Tooltip.Content>
                                                </Tooltip.Portal>
                                            </Tooltip.Root>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}

                    {/* Grupo neutras */}
                    <div className="flex items-center gap-3 flex-wrap">
                        <div className="flex items-center gap-1.5 shrink-0 w-[100px]">
                            <div className="w-3 h-3 border border-[#111111] bg-[#E0E0E0]" />
                            <span className="font-press-start text-[8px] text-[#888888]">NEUTRA</span>
                        </div>
                        <div className="flex gap-1.5 flex-wrap">
                            {NEUTRAL_NATURES.map((n, i) => {
                                const isCurrent = n.name === currentNature;
                                return (
                                    <Link key={n.name} href={`/natures/${n.name}`}>
                                        <motion.div
                                            className="px-3 py-1.5 border-2 font-press-start text-[8px] cursor-pointer"
                                            style={
                                                isCurrent
                                                    ? { backgroundColor: "#111111", borderColor: "#111111", color: "#ffffff", boxShadow: "2px 2px 0 #888888" }
                                                    : { backgroundColor: "#F5F5F5", borderColor: "#CCCCCC", color: "#888888" }
                                            }
                                            initial={{ opacity: 0, y: 8 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.05 }}
                                            whileHover={isCurrent ? {} : { backgroundColor: "#E0E0E0", borderColor: "#888888", color: "#333333" }}
                                        >
                                            {n.nameEs}
                                        </motion.div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </Tooltip.Provider>
        </section>
    );
}