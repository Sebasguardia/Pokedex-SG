"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Grid } from "lucide-react";
import {
    GENERATION_ORDER,
    GENERATION_ROMAN,
} from "@/lib/constants/generations/generations.constants";

interface GenerationNavStripProps {
    currentGeneration: string;
    genColor: string;
}

export function GenerationNavStrip({ currentGeneration, genColor }: GenerationNavStripProps) {
    const currentIndex = GENERATION_ORDER.indexOf(currentGeneration as any);
    const prevGen = currentIndex > 0 ? GENERATION_ORDER[currentIndex - 1] : null;
    const nextGen = currentIndex < GENERATION_ORDER.length - 1 ? GENERATION_ORDER[currentIndex + 1] : null;

    return (
        <section className="pt-8 border-t-[4px] border-[#111111] mt-12">
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
                
                {/* Prev Button */}
                <div className="flex-1">
                    {prevGen ? (
                        <Link href={`/generations/${prevGen}`} className="block w-full group">
                            <div className="flex items-center gap-3 border-[3px] border-[#111111] bg-white p-4 transition-all group-hover:-translate-x-2 shadow-[4px_4px_0_#111111] group-hover:shadow-[6px_4px_0_#111111]">
                                <div className="w-8 h-8 border-2 border-[#111111] bg-[#111111] text-white flex items-center justify-center shrink-0">
                                    <ChevronLeft size={20} />
                                </div>
                                <div className="flex-1 text-left min-w-0">
                                    <p className="font-['Press_Start_2P'] text-[9px] text-[#888888] mb-1">ANTERIOR</p>
                                    <p className="font-['Press_Start_2P'] text-[12px] sm:text-[14px] text-[#111111] truncate">GEN {GENERATION_ROMAN[prevGen]}</p>
                                </div>
                            </div>
                        </Link>
                    ) : (
                        <div className="flex items-center gap-3 border-[3px] border-[#E0E0E0] bg-[#FAFAFA] p-4 opacity-50 cursor-not-allowed">
                            <div className="w-8 h-8 border-2 border-[#E0E0E0] bg-[#E0E0E0] text-white flex items-center justify-center shrink-0">
                                <ChevronLeft size={20} />
                            </div>
                            <div className="flex-1 text-left min-w-0">
                                <p className="font-['Press_Start_2P'] text-[9px] text-[#888888] mb-1">INICIO</p>
                                <p className="font-['Press_Start_2P'] text-[12px] sm:text-[14px] text-[#AAAAAA] truncate">---</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Back to list */}
                <div className="flex justify-center sm:shrink-0">
                    <Link href="/generations" className="group">
                        <div className="flex flex-col items-center justify-center p-3 border-[3px] border-[#111111] bg-[#111111] text-white shadow-[4px_4px_0_#CC0000] group-hover:shadow-[0px_0px_0_#111111] group-hover:translate-y-[4px] transition-all">
                            <Grid size={24} />
                            <span className="font-['Press_Start_2P'] text-[8px] mt-2 tracking-widest hidden sm:block">TODAS</span>
                        </div>
                    </Link>
                </div>

                {/* Next Button */}
                <div className="flex-1">
                    {nextGen ? (
                        <Link href={`/generations/${nextGen}`} className="block w-full group">
                            <div className="flex items-center gap-3 border-[3px] border-[#111111] bg-white p-4 transition-all group-hover:translate-x-2 shadow-[4px_4px_0_#111111] group-hover:shadow-[2px_4px_0_#111111]">
                                <div className="flex-1 text-right min-w-0">
                                    <p className="font-['Press_Start_2P'] text-[9px] text-[#888888] mb-1">SIGUIENTE</p>
                                    <p className="font-['Press_Start_2P'] text-[12px] sm:text-[14px] text-[#111111] truncate">GEN {GENERATION_ROMAN[nextGen]}</p>
                                </div>
                                <div className="w-8 h-8 border-2 border-[#111111] bg-[#111111] text-white flex items-center justify-center shrink-0">
                                    <ChevronRight size={20} />
                                </div>
                            </div>
                        </Link>
                    ) : (
                        <div className="flex items-center gap-3 border-[3px] border-[#E0E0E0] bg-[#FAFAFA] p-4 opacity-50 cursor-not-allowed">
                            <div className="flex-1 text-right min-w-0">
                                <p className="font-['Press_Start_2P'] text-[9px] text-[#888888] mb-1">FINAL</p>
                                <p className="font-['Press_Start_2P'] text-[12px] sm:text-[14px] text-[#AAAAAA] truncate">---</p>
                            </div>
                            <div className="w-8 h-8 border-2 border-[#E0E0E0] bg-[#E0E0E0] text-white flex items-center justify-center shrink-0">
                                <ChevronRight size={20} />
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </section>
    );
}