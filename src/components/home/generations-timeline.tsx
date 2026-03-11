"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

const GENERATIONS = [
    { id: "GEN I", year: "1996", region: "Kanto", games: "Rojo · Azul", path: "/generations/1" },
    { id: "GEN II", year: "1999", region: "Johto", games: "Oro · Plata", path: "/generations/2" },
    { id: "GEN III", year: "2002", region: "Hoenn", games: "Rubí · Zafiro", path: "/generations/3" },
    { id: "GEN IV", year: "2006", region: "Sinnoh", games: "Diamante · Perla", path: "/generations/4" },
    { id: "GEN V", year: "2010", region: "Unova", games: "Negro · Blanco", path: "/generations/5" },
    { id: "GEN VI", year: "2013", region: "Kalos", games: "X · Y", path: "/generations/6" },
    { id: "GEN VII", year: "2016", region: "Alola", games: "Sol · Luna", path: "/generations/7" },
    { id: "GEN VIII", year: "2019", region: "Galar", games: "Espada · Escudo", path: "/generations/8" },
    { id: "GEN IX", year: "2022", region: "Paldea", games: "Escarlata · Violeta", path: "/generations/9" },
];

function GenerationPill({ gen, index }: { gen: typeof GENERATIONS[0], index: number }) {
    const isTop = index % 2 === 0;

    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: isTop ? -30 : 30 },
                visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 25 } }
            }}
            className={`relative shrink-0 flex flex-col items-center ${isTop ? "mb-[60px]" : "mt-[60px]"}`}
        >
            <Link href={gen.path} className="group outline-none" data-cursor="hover">
                {/* The Dot on the line */}
                <motion.div
                    className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-poke-red border-2 border-poke-red rounded-full z-10 
                       transition-all duration-300 group-hover:bg-white group-hover:scale-150 ${isTop ? "-bottom-[6px]" : "-top-[6px]"}`}
                />

                {/* The Card */}
                <motion.div
                    whileHover={{ scale: 1.04, backgroundColor: "#222222", borderColor: "#CC0000" }}
                    className={`bg-[#1A1A1A] border border-[#333] p-4 min-w-[130px] flex flex-col relative z-20 
                      ${isTop ? "border-t-2 border-t-poke-red group-hover:border-t-poke-red" : "border-b-2 border-b-poke-red group-hover:border-b-poke-red"}`}
                >
                    <span className="font-pixel text-[9px] text-poke-red mb-1">{gen.id}</span>
                    <span className="font-mono text-[11px] text-[#888] mb-2">{gen.year}</span>
                    <span className="font-nunito text-[12px] text-white font-bold">{gen.region}</span>
                    <span className="font-nunito text-[10px] text-[#666] transition-colors group-hover:text-white">{gen.games}</span>
                </motion.div>
            </Link>
        </motion.div>
    );
}

export function GenerationsTimeline() {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <section className="bg-[#111111] py-16 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="flex flex-col items-center justify-center text-center mb-4">
                    <h2 className="font-pixel text-[16px] md:text-[20px] text-white mb-4">GENERACIONES</h2>
                    <p className="font-nunito text-[15px] text-[#888888]">25 años de historia Pokémon</p>
                </div>
            </div>

            {/* Timeline Strip */}
            <div className="relative w-full mt-8">
                {/* Central Red Line */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    style={{ transformOrigin: "left" }}
                    className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-[2px] bg-poke-red pointer-events-none z-0"
                />

                {/* Pills Container */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
                    className="flex items-center gap-0 overflow-x-auto snap-x snap-mandatory hide-scrollbar py-10 px-4 md:px-[max(1rem,calc((100vw-80rem)/2))] min-h-[300px] relative z-10"
                >
                    {/* We add an empty spacer so elements don't get stuck to the left edge of timeline */}
                    <div className="shrink-0 w-8" />
                    {GENERATIONS.map((gen, i) => (
                        <div key={gen.id} className="snap-start relative flex justify-center w-[160px] shrink-0">
                            <GenerationPill gen={gen} index={i} />
                        </div>
                    ))}
                    <div className="shrink-0 w-8" />
                </motion.div>
            </div>

            <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
        </section>
    );
}
