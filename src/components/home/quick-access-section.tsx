"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Database, Shield, Zap, Flame, Package, Leaf, Activity } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useFilterStore } from "@/lib/store/filter.store";

const FEATURES = [
    { id: "01", name: "POKÉDEX", desc: "ENCICLOPEDIA DIGITAL COMPLETA", stat: "1025+", icon: Database, href: "/pokemon", color: "#CC0000", tag: "CORE" },
    { id: "02", name: "TIPOS", desc: "MATRIZ DE AFINIDAD ELEMENTAL", stat: "18", icon: Shield, href: "/types", color: "#3B82F6", tag: "SYSTEM" },
    { id: "03", name: "MOVIMIENTOS", desc: "BASE DE DATOS DE ATAQUES", stat: "900+", icon: Zap, href: "/moves", color: "#EAB308", tag: "COMBAT" },
    { id: "04", name: "HABILIDADES", desc: "REGISTRO DE PASIVAS ÚNICAS", stat: "300+", icon: Flame, href: "/abilities", color: "#F97316", tag: "TRAITS" },
    { id: "05", name: "OBJETOS", desc: "INVENTARIO GLOBAL DE ITEMS", stat: "800+", icon: Package, href: "/items", color: "#8B5CF6", tag: "ITEMS" },
    { id: "06", name: "BAYAS", desc: "BOTÁNICA Y CONSUMIBLES", stat: "64", icon: Leaf, href: "/berries", color: "#22C55E", tag: "NATURE" },
];

function FeatureCard({ feature, index }: { feature: typeof FEATURES[0], index: number }) {
    const Icon = feature.icon;
    const { pokedexFilters } = useFilterStore();
    const href = feature.href === "/pokemon" && pokedexFilters
        ? `/pokemon?${pokedexFilters}`
        : feature.href;

    return (
        <Link href={href} className="block outline-none group" aria-label={`Acceder a ${feature.name}`}>
            <motion.div
                variants={{
                    hidden: { opacity: 0, scale: 0.9, y: 30 },
                    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 20, delay: index * 0.1 } },
                    hover: { y: -10, x: -5, boxShadow: `16px 16px 0 #111111` }
                }}
                whileHover="hover"
                whileTap={{ scale: 0.97 }}
                className="relative bg-white border-[5px] border-[#111111] p-0 flex flex-col h-full overflow-hidden"
                style={{ boxShadow: "10px 10px 0 #111111" }}
            >
                <div className="p-8 flex flex-col flex-1 relative">
                    {/* Background Tech Watermark */}
                    <div className="absolute top-4 right-6 font-mono text-[60px] font-black text-[#111111]/[0.03] leading-none pointer-events-none group-hover:text-white/10 group-hover:scale-110 transition-all duration-500">
                        {feature.id}
                    </div>

                    {/* Icon Container with glowing background on hover */}
                    <div className="flex items-start justify-between mb-10 relative z-10">
                        <div className="relative">
                            <motion.div 
                                animate={{ rotate: [0, 90, 180, 270, 360] }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                className="absolute -inset-4 border border-dashed border-[#111111]/20 rounded-full group-hover:border-[#CC0000]/50"
                            />
                            <div 
                                className="relative w-20 h-20 border-[4px] border-[#111111] flex items-center justify-center bg-[#111111] group-hover:scale-110 transition-transform duration-300"
                                style={{ boxShadow: `6px 6px 0 ${feature.color}` }}
                            >
                                <Icon className="w-10 h-10 text-white" strokeWidth={2.5} />
                            </div>
                        </div>
                    </div>

                    {/* Main Info */}
                    <div className="flex-1 relative z-10">
                        <div className="inline-block bg-[#111111] text-white px-3 py-1 mb-4 group-hover:bg-[#CC0000] transition-colors duration-300">
                            <h3 className="font-['Press_Start_2P'] text-[14px] leading-none uppercase">
                                {feature.name}
                            </h3>
                        </div>
                        <p className="font-mono text-[12px] text-[#555555] font-black leading-tight uppercase max-w-[80%]">
                            {feature.desc}
                        </p>
                    </div>

                    {/* Stats Section */}
                    <div className="mt-12 pt-8 border-t-[4px] border-[#111111] relative z-10">
                        <div className="flex items-end justify-between">
                            <div className="flex flex-col">
                                <span className="font-['Press_Start_2P'] text-[24px] text-[#111111] group-hover:text-[#CC0000] transition-colors duration-300">{feature.stat}</span>
                            </div>
                            
                            <div className="w-14 h-14 bg-[#111111] flex items-center justify-center group-hover:bg-[#CC0000] transition-all duration-300 shadow-[4px_4px_0_#EEEEEE] group-hover:shadow-[0px_0px_0_#000]">
                                <ArrowRight className="w-8 h-8 text-white group-hover:translate-x-1 transition-transform" strokeWidth={3} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scanline Effect on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.05] pointer-events-none transition-opacity duration-300" 
                     style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 4px)" }} />
                
                {/* Accent Color Band on Hover */}
                <motion.div 
                    className="absolute bottom-0 left-0 h-1 w-full bg-[#111111]"
                    variants={{ hover: { backgroundColor: feature.color, height: "8px" } }}
                />
            </motion.div>
        </Link>
    );
}

export function QuickAccessSection() {
    return (
        <section className="bg-white py-40 px-6 relative overflow-hidden border-y-[6px] border-[#111111]">
            {/* Massive Background Patterns */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: "radial-gradient(#000 3px, transparent 0)", backgroundSize: "40px 40px" }} />
            
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.02] pointer-events-none font-mono text-[300px] font-black text-[#111111] leading-none overflow-hidden select-none">
                SYSTEM_v4
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Enhanced Header */}
                <div className="mb-28 flex flex-col md:flex-row md:items-end justify-between gap-12">
                    <div className="flex flex-col">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-[#111111] flex items-center justify-center text-white font-['Press_Start_2P'] text-[18px]">!</div>
                            <div className="flex flex-col">
                                <span className="font-mono text-[10px] font-black text-[#CC0000] uppercase tracking-[0.4em]">ADVERTENCIA_SISTEMA</span>
                                <h2 className="font-['Press_Start_2P'] text-[12px] text-[#111111] uppercase tracking-tighter">NÚCLEO_DE_DATOS_ACCESIBLE</h2>
                            </div>
                        </div>
                        
                        <h3 className="font-['Press_Start_2P'] text-[32px] md:text-[52px] text-[#111111] uppercase leading-[0.9] tracking-tighter">
                            SISTEMA DE <br />
                            <span className="text-[#CC0000] relative">
                                RECURSOS
                                <motion.span 
                                    className="absolute -bottom-2 left-0 w-full h-3 bg-[#CC0000]/20"
                                    initial={{ width: 0 }} whileInView={{ width: "100%" }} transition={{ delay: 0.5, duration: 0.8 }}
                                />
                            </span>
                        </h3>
                    </div>

                    <div className="flex flex-col items-start md:items-end max-w-sm">
                        <p className="font-mono text-[14px] font-black text-[#555555] uppercase leading-relaxed md:text-right mb-6">
                            ACCESO PRIORITARIO A MÓDULOS DE CONSULTA Y ANÁLISIS DE LA RED POKÉDEX GLOBAL.
                        </p>
                        <div className="flex gap-2">
                            {[1,2,3,4,5].map(i => (
                                <div key={i} className="w-8 h-2 bg-[#111111]" style={{ opacity: i * 0.2 }} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Dense Grid */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12"
                >
                    {FEATURES.map((feat, i) => (
                        <FeatureCard key={feat.id} feature={feat} index={i} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
