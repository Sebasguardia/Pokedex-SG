"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Layers, ArrowRight } from "lucide-react";
import { GENERATION_NAMES_ES, GENERATION_YEARS } from "@/lib/constants/generations.constants";

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
            <div className="flex items-center gap-4 mb-6">
                <h2 className="font-press-start text-[14px] uppercase tracking-tighter text-[#111111] whitespace-nowrap">
                    Generación Vinculada
                </h2>
                <div className="h-px bg-[#E0E0E0] flex-1" />
            </div>

            <Link href={`/generations/${generation}`}>
                <motion.div
                    className="border-2 border-[#111111] bg-[#FAFAFA] p-5 flex items-center gap-5 cursor-pointer"
                    style={{ boxShadow: "4px 4px 0 #111111" }}
                    whileHover={{ x: 4, y: 4, boxShadow: "0px 0px 0 transparent" }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                    {/* Ícono con el color de la generación */}
                    <div
                        className="w-12 h-12 border-2 border-[#111111] flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${genColor}18` }}
                    >
                        <Layers size={20} style={{ color: genColor }} />
                    </div>

                    <div className="flex-1 min-w-0">
                        <p className="font-nunito text-[11px] text-[#888888] uppercase tracking-wide mb-1">
                            Esta región pertenece a
                        </p>
                        <p className="font-press-start text-[13px] text-[#111111]">{nameEs.toUpperCase()}</p>
                        <p className="font-nunito text-[12px] text-[#888888] mt-1">{year}</p>
                    </div>

                    {/* Chip romano + link */}
                    <div className="flex items-center gap-2 shrink-0">
                        <span
                            className="font-press-start text-[12px] px-3 py-2 border-2"
                            style={{ color: genColor, borderColor: genColor, backgroundColor: `${genColor}12` }}
                        >
                            {roman}
                        </span>
                        <div
                            className="flex items-center gap-1 px-3 py-2 border-2 border-[#111111] font-press-start text-[8px] bg-white hover:bg-[#111111] hover:text-white transition-colors"
                            style={{ boxShadow: `2px 2px 0 ${regionColor}` }}
                        >
                            Ver Gen <ArrowRight size={10} className="ml-1" />
                        </div>
                    </div>
                </motion.div>
            </Link>
        </section>
    );
}