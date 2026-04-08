"use client";

import { motion } from "framer-motion";
import NumberFlow from "@number-flow/react";
import { Map, Sparkles, BookOpen, Layers } from "lucide-react";
import { Region } from "@/types/api/location.types";

interface RegionStatsRowProps {
    region: Region;
    regionColor: string;
    pokedexCount?: number;
}

interface StatCardProps {
    label: string;
    value: number | null;
    Icon: React.ElementType;
    regionColor: string;
    delay: number;
}

function StatCard({ label, value, Icon, regionColor, delay }: StatCardProps) {
    return (
        <motion.div
            className="flex flex-col items-center justify-center p-6 border-4 border-[#111111] bg-white relative group"
            style={{ boxShadow: "8px 8px 0 #111111" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ transform: "translate(-2px, -2px)", boxShadow: `10px 10px 0 ${regionColor}` }}
        >
            {/* Etiqueta superior */}
            <div 
                className="absolute -top-4 bg-[#111111] text-white px-4 py-2 border-2 border-[#111111] flex items-center gap-2"
                style={{ boxShadow: "3px 3px 0 rgba(0,0,0,0.5)" }}
            >
                <div className="w-2 h-2" style={{ backgroundColor: regionColor }} />
                <span className="font-['Press_Start_2P'] text-[9px] uppercase tracking-wider">{label}</span>
            </div>

            {/* Ícono gigante watermark */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none opacity-[0.03] group-hover:opacity-[0.08] group-hover:scale-110 transition-all duration-300">
                <Icon size={120} />
            </div>

            {/* Ícono decorativo tipo "caja" */}
            <div 
                className="w-16 h-16 border-4 border-[#111111] bg-white flex items-center justify-center mb-6 mt-4 relative group-hover:-rotate-3 transition-transform duration-300"
                style={{ boxShadow: `4px 4px 0 ${regionColor}` }}
            >
                <Icon size={28} className="text-[#111111]" />
                <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-[#111111]" />
            </div>

            {/* Número */}
            <div className="relative z-10 w-full text-center">
                {value !== null ? (
                    <NumberFlow 
                        value={value} 
                        className="font-['Press_Start_2P'] text-[24px] lg:text-[28px] text-[#111111]" 
                    />
                ) : (
                    <span className="font-['Press_Start_2P'] text-[24px] lg:text-[28px] text-[#E0E0E0]">—</span>
                )}
            </div>

            {/* Barra inferior gruesa */}
            <div className="absolute bottom-0 left-0 w-full h-2">
                <motion.div 
                    className="h-full border-t-2 border-[#111111]" 
                    style={{ backgroundColor: regionColor }}
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ delay: delay + 0.3, duration: 0.8 }}
                />
            </div>
        </motion.div>
    );
}

export function RegionStatsRow({ region, regionColor, pokedexCount }: RegionStatsRowProps) {
    const cards = [
        { label: "Locaciones", value: region.locations.length, Icon: Map, delay: 0 },
        { label: "Pokémon", value: pokedexCount ?? null, Icon: Sparkles, delay: 0.08 },
        { label: "Pokédex", value: region.pokedexes.length, Icon: BookOpen, delay: 0.16 },
        { label: "Versiones", value: region.version_groups.length, Icon: Layers, delay: 0.24 },
    ];

    return (
        <section className="py-2">
            <div className="flex items-center gap-3 mb-10">
                <div className="w-3 h-3 bg-[#CC0000]" />
                <h2 className="font-['Press_Start_2P'] text-[13px] uppercase text-[#111111] whitespace-nowrap">
                    RESUMEN
                </h2>
                <div className="h-[3px] bg-[#111111] flex-1" />
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-6 pt-6 mb-12">
                {cards.map((c) => <StatCard key={c.label} {...c} regionColor={regionColor} />)}
            </div>
        </section>
    );
}