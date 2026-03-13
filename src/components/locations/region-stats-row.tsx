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
            className="relative bg-white border-2 border-[#111111] p-6 pt-10 flex flex-col items-center transition-all duration-300 group"
            style={{ 
                boxShadow: `6px 6px 0px 0px #111111`,
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ 
                transform: "translate(2px, 2px)",
                boxShadow: `4px 4px 0px 0px #111111`,
            }}
        >
            {/* Fondo decorativo con líneas sutiles */}
            <div 
                className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                style={{ backgroundImage: `repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 10%)`, backgroundSize: '10px 10px' }}
            />
            
            {/* Banner flotante superior */}
            <div 
                className="absolute -top-[12px] left-4 bg-[#111111] px-4 py-1.5 flex items-center gap-2 z-10"
                style={{ clipPath: "polygon(0 0, 100% 0, 92% 100%, 0 100%)" }}
            >
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: regionColor }} />
                <span className="font-press-start text-[8.5px] text-white uppercase tracking-wider">{label}</span>
            </div>

            {/* Ícono Watermark - más sutil y posicionado */}
            <div className="absolute right-2 bottom-2 opacity-[0.04] pointer-events-none group-hover:scale-110 group-hover:opacity-[0.08] transition-all duration-500">
                <Icon size={64} />
            </div>

            {/* Contenedor del ícono principal */}
            <div className="relative mb-5">
                <div 
                    className="w-14 h-14 flex items-center justify-center border-2 border-[#111111] transform -rotate-3 group-hover:rotate-0 transition-transform duration-300 shadow-[4px_4px_0_0_#11111120]"
                    style={{ backgroundColor: `${regionColor}15` }}
                >
                    <Icon size={24} style={{ color: regionColor }} />
                </div>
                {/* Detalle decorativo de esquina */}
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border border-[#111111] bg-white" />
            </div>

            {/* Valor */}
            <div className="relative z-10">
                {value !== null ? (
                    <div className="flex items-center justify-center">
                        <NumberFlow 
                            value={value} 
                            className="font-press-start text-[26px] text-[#111111] tracking-tighter" 
                        />
                    </div>
                ) : (
                    <span className="font-press-start text-[26px] text-[#E0E0E0]">---</span>
                )}
            </div>

            {/* Barra indicadora inferior decorativa */}
            <div className="mt-4 w-full h-[3px] bg-[#F0F0F0] overflow-hidden">
                <motion.div 
                    className="h-full" 
                    style={{ backgroundColor: regionColor }}
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
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
            <div className="flex items-center gap-4 mb-10 overflow-hidden">
                <div className="w-1.5 h-6 shrink-0" style={{ backgroundColor: regionColor }} />
                <h2 className="font-press-start text-[14px] uppercase tracking-tighter text-[#111111] whitespace-nowrap">
                    Resumen <span className="text-[#888888] ml-2 text-[9px] opacity-70">Region Stats</span>
                </h2>
                <div className="h-[1px] bg-gradient-to-r from-[#E0E0E0] via-[#E0E0E0] to-transparent flex-1" />
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-6 pt-4">
                {cards.map((c) => <StatCard key={c.label} {...c} regionColor={regionColor} />)}
            </div>
        </section>
    );
}