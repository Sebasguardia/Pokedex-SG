"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Layers, ArrowRight } from "lucide-react";
import { GENERATION_NAMES_ES, GENERATION_YEARS } from "@/lib/constants/generations/generations.constants";

interface RegionGenerationLinkProps {
    generation: string;   // "generation-i"
    regionColor: string;
    roman: string;   // "I"
    genColor: string;
}

export function RegionGenerationLink({ generation, regionColor, roman, genColor }: RegionGenerationLinkProps) {
    const nameEs = GENERATION_NAMES_ES[generation] ?? generation;
    const year = GENERATION_YEARS[generation] ?? "????";

    return (
        <section>
            <div className="flex items-center gap-3 mb-8">
                <div className="w-3 h-3 bg-[#CC0000]" />
                <h2 className="font-['Press_Start_2P'] text-[13px] uppercase text-[#111111] whitespace-nowrap">
                    GENERACIÓN VINCULADA
                </h2>
                <div className="h-[3px] bg-[#111111] flex-1" />
            </div>

            <Link href={`/generations/${generation}`}>
                <motion.div
                    className="group border-[4px] border-[#111111] bg-white flex flex-col md:flex-row relative cursor-pointer overflow-hidden"
                    style={{ boxShadow: `6px 6px 0 #111111` }}
                    whileHover={{ x: -2, y: -2, boxShadow: `8px 8px 0 ${genColor}` }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                    {/* Left Icon / Solid Color Block */}
                    <div 
                        className="w-full md:w-[250px] shrink-0 border-b-[4px] md:border-b-0 md:border-r-[4px] border-[#111] p-6 lg:p-8 flex flex-col justify-center items-center relative overflow-hidden" 
                        style={{ backgroundColor: "#151515" }}
                    >
                        {/* Background Giant Roman Numeral */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none select-none">
                            <span className="font-['Press_Start_2P'] text-[140px] text-white">
                                {roman}
                            </span>
                        </div>
                        
                        <div className="relative z-10 bg-white border-[3px] border-[#111] p-4 shadow-[4px_4px_0_#CC0000]">
                            <Layers size={36} style={{ color: genColor }} />
                        </div>
                    </div>

                    {/* Right Info Section */}
                    <div className="flex-1 p-6 lg:p-8 flex flex-col justify-center bg-[#FAFAFA] relative">
                        {/* Connecting Line Aesthetic */}
                        <div className="absolute right-6 top-6 flex gap-2">
                            <div className="w-1.5 h-1.5 bg-[#CC0000]" />
                            <div className="w-1.5 h-1.5 bg-[#111]" />
                            <div className="w-1.5 h-1.5" style={{ backgroundColor: genColor }} />
                        </div>

                        <p className="font-['Press_Start_2P'] text-[9px] sm:text-[10px] text-[#CC0000] tracking-widest mb-3 uppercase">
                            REGISTRO TEMPORAL
                        </p>
                        
                        <h3 className="font-['Press_Start_2P'] text-[16px] sm:text-[22px] text-[#111111] leading-tight mb-2 uppercase">
                            {nameEs}
                        </h3>
                        
                        <div className="flex flex-wrap items-center gap-3 mt-4 mb-2">
                            <span className="font-['Nunito'] font-black italic text-[14px] bg-[#111] text-white px-3 py-1 uppercase tracking-widest">
                                LANZAMIENTO: {year}
                            </span>
                            
                            <div className="flex items-center gap-2 border-[2px] border-[#111] px-3 py-1.5 bg-white">
                                <span className="font-['Press_Start_2P'] text-[9px]" style={{ color: genColor }}>NÚCLEO</span>
                                <span className="font-['Press_Start_2P'] text-[11px] text-[#111]">GEN {roman}</span>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <div
                                className="inline-flex items-center gap-2 px-5 py-3 border-[3px] border-[#111111] font-['Press_Start_2P'] text-[10px] bg-white group-hover:bg-[#111111] group-hover:text-white transition-colors"
                                style={{ boxShadow: `4px 4px 0 ${regionColor}` }}
                            >
                                <span className="pt-px">EXPLORAR GENERACIÓN</span>
                                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </Link>
        </section>
    );
}