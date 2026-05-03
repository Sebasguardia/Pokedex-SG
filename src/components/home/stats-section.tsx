"use client";

import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import NumberFlow from "@number-flow/react";
import { Zap, Swords, Sparkles, Package, Leaf, Shield, Activity } from "lucide-react";
import { apiClient } from "@/lib/api/client";

// Define the fetcher for simple counts
const fetchCount = (endpoint: string) =>
    apiClient.get(`/${endpoint}?limit=1`).then((r) => r.data.count as number);

// Custom StatCard component
function StatCard({ label, endpoint, icon: Icon, defaultCount, index }: { label: string, endpoint: string | null, icon: React.ElementType, defaultCount?: number, index: number }) {
    const { data } = useQuery({
        queryKey: ["count", endpoint],
        queryFn: () => endpoint ? fetchCount(endpoint) : Promise.resolve(defaultCount),
        enabled: !!endpoint || defaultCount !== undefined,
        staleTime: Infinity,
    });

    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 20, delay: index * 0.05 } },
                hover: { y: -10, x: -5, boxShadow: "14px 14px 0 #CC0000" }
            }}
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
            className="bg-white border-[4px] border-[#111111] p-8 flex flex-col items-center justify-center text-center relative group"
            style={{ boxShadow: "10px 10px 0 #111111" }}
        >
            {/* Technical Corner Brackets */}
            <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#111111]/20 group-hover:border-[#CC0000]/50" />
            <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#111111]/20 group-hover:border-[#CC0000]/50" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#111111]/20 group-hover:border-[#CC0000]/50" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#111111]/20 group-hover:border-[#CC0000]/50" />

            <div className="mb-6 p-4 bg-[#111111] border-[3px] border-[#111111] group-hover:bg-[#CC0000] transition-colors duration-300">
                <Icon className="w-8 h-8 text-white" strokeWidth={2.5} />
            </div>

            <div className="flex flex-col items-center mb-1">
                <span className="font-mono text-[9px] font-black text-[#AAAAAA] uppercase tracking-widest mb-1">DATA_STREAM</span>
                <motion.div
                    className="font-['Press_Start_2P'] text-[24px] md:text-[28px] text-[#111111] group-hover:text-[#CC0000] transition-colors duration-300 tabular-nums"
                >
                    <NumberFlow
                        value={data ?? 0}
                        format={{ notation: "standard" }}
                        willChange
                        transformTiming={{ duration: 800, easing: "ease-out" }}
                    />
                </motion.div>
            </div>

            <div className="mt-4 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#22C55E] group-hover:animate-ping" />
                <span className="font-['Press_Start_2P'] text-[10px] text-[#111111] uppercase tracking-tighter leading-none">{label}</span>
            </div>

            {/* Scanline pattern */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] pointer-events-none bg-scanline" />
        </motion.div>
    );
}

export function StatsSection() {
    return (
        <section className="relative bg-[#F8F8F8] py-32 px-6 overflow-hidden border-y-[6px] border-[#111111]">
            {/* Background Tech Grid */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
                 style={{ 
                    backgroundImage: "linear-gradient(#111111 1px, transparent 1px), linear-gradient(90deg, #111111 1px, transparent 1px)",
                    backgroundSize: "40px 40px" 
                 }} 
            />

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col items-center mb-24 text-center">
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-4 bg-[#111111] px-6 py-2 mb-8 shadow-[6px_6px_0_#CC0000]"
                    >
                        <Activity size={16} className="text-white animate-pulse" />
                        <span className="font-['Press_Start_2P'] text-[10px] text-white uppercase tracking-widest">NETWORK_STATUS: ACTIVE</span>
                    </motion.div>
                    
                    <h2 className="font-['Press_Start_2P'] text-[24px] md:text-[40px] text-[#111111] leading-tight uppercase max-w-4xl tracking-tighter">
                        NÚCLEO DE <span className="text-[#CC0000]">DATOS</span> <br className="hidden md:block" /> EN TIEMPO REAL
                    </h2>
                    
                    <div className="mt-8 flex items-center gap-3">
                        <div className="w-12 h-1 bg-[#111111]" />
                        <span className="font-mono text-[14px] font-black text-[#666666] uppercase tracking-[0.3em]">Global Database Indexing</span>
                        <div className="w-12 h-1 bg-[#111111]" />
                    </div>
                </div>

                {/* Stats Grid */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8"
                >
                    <StatCard label="Pokémon" endpoint="pokemon" icon={Zap} index={0} />
                    <StatCard label="Movimientos" endpoint="move" icon={Swords} index={1} />
                    <StatCard label="Habilidades" endpoint="ability" icon={Sparkles} index={2} />
                    <StatCard label="Objetos" endpoint="item" icon={Package} index={3} />
                    <StatCard label="Bayas" endpoint="berry" icon={Leaf} index={4} />
                    <StatCard label="Tipos" endpoint={null} defaultCount={18} icon={Shield} index={5} />
                </motion.div>
            </div>

            <style jsx global>{`
                .bg-scanline {
                    background-image: repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 4px);
                }
            `}</style>
        </section>
    );
}
