"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import * as Tooltip from "@radix-ui/react-tooltip";
import {
    GENERATION_ORDER,
    GENERATION_COLORS,
    GENERATION_ROMAN,
    GENERATION_NAMES_ES,
    GENERATION_YEARS,
    GENERATIONS,
} from "@/lib/constants/generations.constants";

interface GenerationNavStripProps {
    currentGeneration: string;
}

export function GenerationNavStrip({ currentGeneration }: GenerationNavStripProps) {
    return (
        <section>
            {/* Section header + separador doble */}
            <div className="flex items-center gap-4 mb-4">
                <h2 className="font-press-start text-[14px] uppercase tracking-tighter text-[#111111] whitespace-nowrap">
                    Otras Generaciones
                </h2>
                <div className="h-px bg-[#E0E0E0] flex-1" />
            </div>
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
                    {GENERATION_ORDER.map((name, i) => {
                        const isCurrent = name === currentGeneration;
                        const color = GENERATION_COLORS[name] ?? "#CC0000";
                        const roman = GENERATION_ROMAN[name] ?? "?";
                        const nameEs = GENERATION_NAMES_ES[name] ?? name;
                        const year = GENERATION_YEARS[name] ?? "????";
                        const count = GENERATIONS.find((g) => g.name === name)?.range;
                        const pkCount = count ? count[1] - count[0] + 1 : "?";

                        return (
                            <Tooltip.Root key={name}>
                                <Tooltip.Trigger asChild>
                                    <Link href={`/generations/${name}`}>
                                        <motion.div
                                            className="px-4 py-2 font-press-start text-[10px] border-2 transition-all cursor-pointer"
                                            style={
                                                isCurrent
                                                    ? {
                                                        backgroundColor: color,
                                                        borderColor: color,
                                                        color: "#ffffff",
                                                        boxShadow: `3px 3px 0 #111111`,
                                                    }
                                                    : {
                                                        backgroundColor: `${color}18`,
                                                        borderColor: color,
                                                        color: color,
                                                    }
                                            }
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.05 }}
                                            whileHover={
                                                isCurrent
                                                    ? {}
                                                    : {
                                                        backgroundColor: color,
                                                        color: "#ffffff",
                                                        scale: 1.06,
                                                        transition: { duration: 0.15 },
                                                    }
                                            }
                                        >
                                            {roman}
                                        </motion.div>
                                    </Link>
                                </Tooltip.Trigger>
                                <Tooltip.Portal>
                                    <Tooltip.Content
                                        className="bg-[#111111] text-white font-nunito text-[11px] px-3 py-2 z-50 text-center"
                                        sideOffset={6}
                                    >
                                        <p className="font-bold">{nameEs}</p>
                                        <p className="text-[#AAAAAA] text-[10px]">{pkCount} Pokémon · {year}</p>
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