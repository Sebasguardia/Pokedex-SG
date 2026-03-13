"use client";

import { motion } from "framer-motion";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { NamedAPIResource } from "@/types/api/common.types";

interface NaturePokeathlonPanelProps {
    changes: { max_change: number; pokeathlon_stat: NamedAPIResource }[];
    primaryColor: string;
}

function capitalize(s: string) {
    return s.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

export function NaturePokeathlonPanel({ changes, primaryColor }: NaturePokeathlonPanelProps) {
    return (
        <section>
            <div className="flex items-center gap-4 mb-4">
                <h2 className="font-press-start text-[14px] uppercase tracking-tighter text-[#111111] whitespace-nowrap">
                    Pokéatlón
                </h2>
                <div className="h-px bg-[#E0E0E0] flex-1" />
                <span className="font-nunito text-[12px] text-[#888888] shrink-0">HGSS</span>
            </div>

            <Accordion.Root type="single" collapsible>
                <Accordion.Item value="pokeathlon">
                    <Accordion.Trigger className="w-full">
                        <div className="flex items-center justify-between gap-3 border-2 border-[#E0E0E0] bg-[#FAFAFA] px-5 py-4 hover:border-[#111111] transition-colors group">
                            <div className="text-left">
                                <p className="font-press-start text-[10px] text-[#888888] group-hover:text-[#111111] transition-colors">
                                    ESTADÍSTICAS DE POKÉATLÓN
                                </p>
                                <p className="font-nunito text-[13px] text-[#AAAAAA] mt-1">
                                    Cambios en mini-juegos (HeartGold / SoulSilver)
                                </p>
                            </div>
                            <ChevronDown size={16} className="text-[#888888] transition-transform duration-200 group-data-[state=open]:rotate-180 shrink-0" />
                        </div>
                    </Accordion.Trigger>

                    <Accordion.Content className="overflow-hidden data-[state=open]:animate-none data-[state=closed]:animate-none">
                        <motion.div
                            className="border-2 border-t-0 border-[#E0E0E0] p-5"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        >
                            <div className="flex flex-col gap-3">
                                {changes.map(({ max_change, pokeathlon_stat }) => {
                                    const isPositive = max_change > 0;
                                    const isNeutral = max_change === 0;
                                    const color = isNeutral ? "#888888" : isPositive ? "#22C55E" : "#EF4444";
                                    return (
                                        <div key={pokeathlon_stat.name} className="flex items-center justify-between gap-3 border border-[#F0F0F0] px-4 py-2.5 bg-white">
                                            <span className="font-nunito font-bold text-[14px] text-[#444444] capitalize">
                                                {capitalize(pokeathlon_stat.name)}
                                            </span>
                                            <div className="flex items-center gap-2">
                                                <span className="font-press-start text-[10px]" style={{ color }}>
                                                    {isPositive ? "+" : ""}{max_change}
                                                </span>
                                                <div
                                                    className="w-7 h-7 flex items-center justify-center border"
                                                    style={{ borderColor: color, backgroundColor: `${color}18` }}
                                                >
                                                    <span className="font-press-start text-[10px]" style={{ color }}>
                                                        {isNeutral ? "=" : isPositive ? "↑" : "↓"}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <p className="font-nunito text-[12px] text-[#BBBBBB] mt-4 italic">
                                Los stats de Pokéatlón son exclusivos de los juegos HeartGold y SoulSilver.
                            </p>
                        </motion.div>
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion.Root>
        </section>
    );
}