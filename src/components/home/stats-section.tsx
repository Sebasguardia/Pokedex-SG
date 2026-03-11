"use client";

import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import NumberFlow from "@number-flow/react";
import { Zap, Swords, Sparkles, Package, Leaf, Shield } from "lucide-react";
import { apiClient } from "@/lib/api/client";

// Define the fetcher for simple counts
const fetchCount = (endpoint: string) =>
    apiClient.get(`/${endpoint}?limit=1`).then((r) => r.data.count as number);

// Custom StatCard component
function StatCard({ label, endpoint, icon: Icon, defaultCount }: { label: string, endpoint: string | null, icon: React.ElementType, defaultCount?: number }) {
    // If endpoint is provided, fetch dynamic count, otherwise fallback to defaultCount
    const { data } = useQuery({
        queryKey: ["count", endpoint],
        queryFn: () => endpoint ? fetchCount(endpoint) : Promise.resolve(defaultCount),
        enabled: !!endpoint || defaultCount !== undefined,
        staleTime: Infinity,
    });

    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 40, scale: 0.9 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 200, damping: 20 } }
            }}
            whileHover="hover"
            className="bg-[#1A1A1A] border border-[#2A2A2A] border-t-2 border-t-poke-red p-7 flex flex-col items-center justify-center text-center transition-colors group"
            data-cursor="hover"
        >
            <Icon className="w-[14px] h-[14px] text-poke-red mb-4 opacity-80" />

            <motion.div
                variants={{ hover: { y: -3 } }}
                className="font-pixel text-[20px] md:text-[28px] text-poke-red mb-3 tabular-nums"
            >
                <NumberFlow
                    value={data ?? 0}
                    format={{ notation: "standard" }}
                    willChange
                    transformTiming={{ duration: 800, easing: "ease-out" }}
                />
            </motion.div>

            <span className="font-nunito text-[11px] text-[#888888] uppercase tracking-widest">{label}</span>
        </motion.div>
    );
}

export function StatsSection() {
    return (
        <section className="relative bg-[#111111] py-16 px-4 overflow-hidden">
            {/* Background Pokeball pattern */}
            <div
                className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 5C25.147 5 5 25.147 5 50H40C40 44.477 44.477 40 50 40C55.523 40 60 44.477 60 50H95C95 25.147 74.853 5 50 5Z' stroke='white' stroke-width='2'/%3E%3Cpath d='M50 95C74.853 95 95 74.853 95 50H60C60 55.523 55.523 60 50 60C44.477 60 40 55.523 40 50H5C5 74.853 25.147 95 50 95Z' stroke='white' stroke-width='2'/%3E%3Ccircle cx='50' cy='50' r='10' stroke='white' stroke-width='2'/%3E%3C/svg%3E")`,
                    backgroundSize: "80px 80px"
                }}
            />

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-center gap-4 mb-12">
                    <motion.div
                        initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, margin: "-80px" }}
                        className="w-16 h-0.5 bg-poke-red origin-right"
                    />
                    <h2 className="font-pixel text-[9px] md:text-[11px] text-white tracking-[0.15em] shrink-0">EL UNIVERSO EN NÚMEROS</h2>
                    <motion.div
                        initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, margin: "-80px" }}
                        className="w-16 h-0.5 bg-poke-red origin-left"
                    />
                </div>

                {/* Stats Grid */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-[1px] bg-[#111]"
                >
                    <StatCard label="Pokémon" endpoint="pokemon" icon={Zap} />
                    <StatCard label="Movimientos" endpoint="move" icon={Swords} />
                    <StatCard label="Habilidades" endpoint="ability" icon={Sparkles} />
                    <StatCard label="Objetos" endpoint="item" icon={Package} />
                    <StatCard label="Bayas" endpoint="berry" icon={Leaf} />
                    <StatCard label="Tipos" endpoint={null} defaultCount={18} icon={Shield} />
                </motion.div>
            </div>
        </section>
    );
}
