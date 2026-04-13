"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Map, ArrowRight } from "lucide-react";
import { RegionLeagueSection } from "@/components/locations/region-league-section";

interface GenerationRegionSectionProps {
    regionName: string;
    genColor: string;
}

export function GenerationRegionSection({ regionName, genColor }: GenerationRegionSectionProps) {
    if (!regionName) return null;

    return (
        <section className="space-y-10">
            {/* Cabecera / Botón para la Región */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <Link href={`/locations/${regionName}`} className="block w-full outline-none group focus-visible:ring-4 focus-visible:ring-[#111111]">
                    <div className="border-[4px] border-[#111111] bg-white flex flex-col md:flex-row items-center justify-between p-6 overflow-hidden relative" style={{ boxShadow: `6px 6px 0 ${genColor}` }}>
                        
                        <div className="flex items-center gap-5 w-full md:w-auto mb-4 md:mb-0 relative z-10">
                            <div className="w-16 h-16 border-2 border-[#111111] flex items-center justify-center shrink-0" style={{ backgroundColor: `${genColor}20` }}>
                                <Map size={32} style={{ color: genColor }} />
                            </div>
                            <div>
                                <h3 className="font-['Press_Start_2P'] text-[15px] sm:text-[18px] text-[#111111] uppercase leading-tight mb-2">
                                    REGIÓN {regionName}
                                </h3>
                                <p className="font-['Nunito'] font-bold text-[13px] text-[#555555]">
                                    Explora las locaciones y rutas del mundo.
                                </p>
                            </div>
                        </div>

                        <div className="relative z-10 flex shrink-0 md:ml-auto w-full md:w-auto">
                            <div 
                                className="w-full md:w-auto px-6 py-4 border-2 border-[#111111] flex justify-center items-center gap-3 transition-colors"
                                style={{ backgroundColor: genColor, color: "#fff" }}
                            >
                                <span className="font-['Press_Start_2P'] text-[10px]">VER MAPA</span>
                                <ArrowRight size={18} strokeWidth={3} />
                            </div>
                        </div>
                    </div>
                </Link>
            </motion.div>

            {/* Componente idéntico de Locations para Gym / Elite Four */}
            <div className="pt-6 border-t-4 border-dashed border-[#E0E0E0]">
                <RegionLeagueSection regionName={regionName} regionColor={genColor} />
            </div>
        </section>
    );
}
