"use client";

// ACTUALIZACIÓN: paths ahora usan generation-i, generation-ii, etc.
// (antes usaban /generations/1, /generations/2...)

import { motion } from "framer-motion";
import Link from "next/link";
import {
    GENERATION_ORDER,
    GENERATION_COLORS,
    GENERATION_ROMAN,
    GENERATIONS,
} from "@/lib/constants/generations.constants";

const TIMELINE_DATA = GENERATIONS.map((g) => ({
    id: GENERATION_ROMAN[g.name] ? `GEN ${GENERATION_ROMAN[g.name]}` : g.label,
    year: ["1996", "1999", "2002", "2006", "2010", "2013", "2016", "2019", "2022"][g.id - 1],
    region: g.region,
    games: g.games.slice(0, 2).join(" · "),
    path: `/generations/${g.name}`,
    color: GENERATION_COLORS[g.name] ?? "#CC0000",
}));

function GenerationPill({
    gen, index,
}: {
    gen: typeof TIMELINE_DATA[0];
    index: number;
}) {
    const isTop = index % 2 === 0;

    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: isTop ? -30 : 30 },
                visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 25 } },
            }}
            className={`relative shrink-0 flex flex-col items-center ${isTop ? "mb-[60px]" : "mt-[60px]"}`}
        >
            <Link href={gen.path} className="group outline-none" data-cursor="hover">
                {/* Dot sobre la línea */}
                <motion.div
                    className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 border-2 rounded-full z-10
            transition-all duration-300 group-hover:scale-150
            ${isTop ? "-bottom-[6px]" : "-top-[6px]"}`}
                    style={{ backgroundColor: gen.color, borderColor: gen.color }}
                />

                {/* Card */}
                <motion.div
                    whileHover={{ scale: 1.04, backgroundColor: "#1a1a1a", borderColor: gen.color }}
                    className={`bg-[#1A1A1A] border border-[#333] p-4 min-w-[130px] flex flex-col relative z-20
            ${isTop
                            ? "border-t-2 group-hover:border-t-2"
                            : "border-b-2 group-hover:border-b-2"
                        }`}
                    style={isTop
                        ? { borderTopColor: gen.color }
                        : { borderBottomColor: gen.color }
                    }
                >
                    <span className="font-press-start text-[9px] mb-1" style={{ color: gen.color }}>
                        {gen.id}
                    </span>
                    <span className="font-jetbrains text-[11px] text-[#888] mb-2">{gen.year}</span>
                    <span className="font-nunito text-[12px] text-white font-bold">{gen.region}</span>
                    <span className="font-nunito text-[10px] text-[#666] transition-colors group-hover:text-white">
                        {gen.games}
                    </span>
                </motion.div>
            </Link>
        </motion.div>
    );
}

export function GenerationsTimeline() {
    return (
        <section className="bg-[#111111] py-16 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col items-center justify-center text-center mb-4">
                    <h2 className="font-press-start text-[16px] md:text-[20px] text-white mb-4">
                        GENERACIONES
                    </h2>
                    <p className="font-nunito text-[15px] text-[#888888]">25 años de historia Pokémon</p>
                </div>
            </div>

            {/* Timeline Strip */}
            <div className="relative w-full mt-8">
                {/* Línea central animada */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    style={{ transformOrigin: "left" }}
                    className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-[2px] bg-[#CC0000] pointer-events-none z-0"
                />

                {/* Pills */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
                    className="flex items-center gap-0 overflow-x-auto snap-x snap-mandatory hide-scrollbar
            py-10 px-4 md:px-[max(1rem,calc((100vw-80rem)/2))] min-h-[300px] relative z-10"
                >
                    <div className="shrink-0 w-8" />
                    {TIMELINE_DATA.map((gen, i) => (
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