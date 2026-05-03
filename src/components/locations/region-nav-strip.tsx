"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import * as Tooltip from "@radix-ui/react-tooltip";
import { Compass, Calendar } from "lucide-react";
import {
    REGION_ORDER, REGION_COLORS, REGION_NAMES_ES, REGION_YEARS,
} from "@/lib/constants/locations/locations.constants";

interface RegionNavStripProps {
    currentRegion: string;  // "kanto"
}

export function RegionNavStrip({ currentRegion }: RegionNavStripProps) {
    return (
        <section className="mt-20 print:hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-4 border-b-[4px] border-[#111111]">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 border-[3px] border-[#111111] bg-[#111111] flex items-center justify-center -rotate-6 shadow-[3px_3px_0_#CC0000]">
                        <Compass className="text-white" size={24} />
                    </div>
                    <div>
                        <h2 className="font-['Press_Start_2P'] text-[13px] sm:text-[15px] text-[#111111]">
                            EXPLORAR OTRAS REGIONES
                        </h2>
                        <span className="font-['Nunito'] font-bold text-[12px] text-[#666] tracking-wide mt-1 block">
                            Continúa tu viaje por el mundo Pokémon
                        </span>
                    </div>
                </div>
            </div>

            <Tooltip.Provider delayDuration={150}>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-9 gap-3">
                    {REGION_ORDER.map((name, i) => {
                        const isCurrent = name === currentRegion;
                        const color = REGION_COLORS[name] ?? "#CC0000";
                        const nameEs = REGION_NAMES_ES[name] ?? name;
                        const year = REGION_YEARS[name] ?? "????";

                        if (isCurrent) {
                            return (
                                <div
                                    key={name}
                                    className="px-2 py-3 flex items-center justify-center border-[3px] border-[#111111] bg-[#111111]"
                                    style={{ boxShadow: `4px 4px 0 ${color}` }}
                                >
                                    <span className="font-['Press_Start_2P'] text-[9px] text-white tracking-widest text-center">
                                        ESTÁS EN<br />
                                        <span style={{ color: color }} className="text-[10px]">{nameEs}</span>
                                    </span>
                                </div>
                            );
                        }

                        return (
                            <Tooltip.Root key={name}>
                                <Tooltip.Trigger asChild>
                                    <Link href={`/locations/${name}`} className="block h-full">
                                        <motion.div
                                            className="h-full flex flex-col justify-center px-2 py-3 sm:py-4 border-[3px] border-[#111111] bg-white group cursor-pointer relative overflow-hidden"
                                            style={{ boxShadow: "4px 4px 0 #111111" }}
                                            initial={{ opacity: 0, y: 15 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.05, duration: 0.2 }}
                                            whileHover={{ y: -4, boxShadow: `6px 6px 0 ${color}` }}
                                        >
                                            {/* Pattern bg on hover */}
                                            <div 
                                                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                                                style={{ backgroundColor: color }}
                                            />
                                            
                                            <div 
                                                className="absolute top-0 right-0 w-0 h-0 border-t-[10px] border-l-[10px] border-l-transparent transition-colors duration-300 group-hover:!border-t-current" 
                                                style={{ borderTopColor: "transparent" }} 
                                            />

                                            <span 
                                                className="font-['Press_Start_2P'] text-[9px] text-[#111111] uppercase whitespace-nowrap text-center relative z-10 transition-colors duration-300 group-hover:text-[#111]"
                                            >
                                                {nameEs}
                                            </span>
                                            
                                            <div className="w-full h-[2px] bg-[#EAEAEA] mt-2 mb-1 group-hover:bg-[#111] transition-colors" />
                                            
                                            <span className="font-['JetBrains_Mono'] font-bold text-[8px] text-[#888] text-center w-full block transition-colors group-hover:text-[#333]">
                                                {year}
                                            </span>

                                            {/* Decorativo neo-brutalista interactivo */}
                                            <div 
                                                className="absolute bottom-0 left-0 w-full h-[3px] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"
                                                style={{ backgroundColor: color }}
                                            />
                                        </motion.div>
                                    </Link>
                                </Tooltip.Trigger>
                                <Tooltip.Portal>
                                    <Tooltip.Content
                                        className="border-[2px] border-[#111111] bg-white px-3 py-2 z-50 text-center shadow-[3px_3px_0_#111111] flex items-center gap-2"
                                        sideOffset={8}
                                        style={{ borderColor: color }}
                                    >
                                        <div className="w-2 h-2 shrink-0" style={{ backgroundColor: color }} />
                                        <p className="font-['Press_Start_2P'] text-[8px] text-[#111111]">Viajar a {nameEs}</p>
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