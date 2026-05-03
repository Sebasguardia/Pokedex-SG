"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Lightbulb } from "lucide-react";

import { getBerryByIdOrName } from "@/lib/api/berries";
import { getItemByIdOrName } from "@/lib/api/items";
import { FLAVOR_COLORS, FLAVOR_META } from "@/lib/constants/berries/berries.constants";
import { getDominantFlavor } from "@/lib/utils/berry.utils";

interface RelatedBerriesCarouselProps {
    currentBerry: any;
    dominantFlavor: any;
    flavorColor: string;
}

export function RelatedBerriesCarousel({ currentBerry, dominantFlavor, flavorColor }: RelatedBerriesCarouselProps) {
    const prefersRM = useReducedMotion();
    const carouselRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);
    const [related, setRelated] = useState<any[]>([]);

    useEffect(() => {
        async function fetch() {
            const domKey: string = dominantFlavor?.flavor.name ?? "spicy";
            const near = Array.from({ length: 10 }, (_, i) => currentBerry.id - 5 + i)
                .filter((id) => id >= 1 && id <= 64 && id !== currentBerry.id);
            const far = [8, 16, 24, 32, 40, 48, 56].filter((id) => id !== currentBerry.id && !near.includes(id));
            const candidates = [...near, ...far];

            const berries = await Promise.all(
                candidates.map(async (id) => {
                    try {
                        const b = await getBerryByIdOrName(id);
                        if (b?.item?.name) { const item = await getItemByIdOrName(b.item.name); (b as any)._sprite = item?.sprites?.default ?? ""; }
                        return b;
                    } catch { return null; }
                })
            );

            const valid = berries.filter(Boolean) as any[];
            const sameFlavor = valid.filter((b) => getDominantFlavor(b.flavors)?.flavor.name === domKey);
            const other = valid.filter((b) => getDominantFlavor(b.flavors)?.flavor.name !== domKey);
            setRelated([...sameFlavor, ...other].slice(0, 10));
        }
        fetch();
    }, [currentBerry.id, dominantFlavor]);

    useEffect(() => {
        if (carouselRef.current && related.length > 0) {
            setTimeout(() => {
                if (carouselRef.current) setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
            }, 100);
        }
    }, [related]);

    if (related.length === 0) return null;

    const domFlavor: string = dominantFlavor?.flavor.name ?? "spicy";
    const subtitle = dominantFlavor?.potency > 0
        ? `Otras bayas ${FLAVOR_META[domFlavor]?.nameEs?.toLowerCase() ?? "similares"}`
        : "Bayas con perfil similar";

    return (
        <section className="py-4 relative overflow-hidden">
            {/* Section header — same as related-abilities-carousel */}
            <div className="mb-8">
                <h2 className="font-press-start text-[14px] text-[#111111] mb-2 uppercase tracking-tighter">
                    BAYAS RELACIONADAS
                </h2>
                <div className="relative h-[5px] mb-3">
                    <motion.div className="absolute top-0 left-0 w-full h-[3px] bg-[#111111] origin-left"
                        initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} />
                    <motion.div className="absolute bottom-0 right-0 w-full h-[2px] bg-[#CC0000] origin-right"
                        initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.1 }} />
                </div>
                <p className="font-nunito text-[13px] text-[#888888] italic">{subtitle}</p>
            </div>

            {/* Draggable carousel */}
            <div className="relative w-full" ref={carouselRef}>
                <div className="absolute top-0 left-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute top-0 right-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                <motion.div
                    className="flex gap-4 py-4 px-6 cursor-grab active:cursor-grabbing"
                    drag={prefersRM ? false : "x"}
                    dragConstraints={{ right: 0, left: -width }}
                    style={{ overflowX: prefersRM ? "auto" : "visible", userSelect: "none" }}
                >
                    {related.map((b, i) => {
                        const dom = getDominantFlavor(b.flavors);
                        const color = dom ? (FLAVOR_COLORS[dom.flavor.name] ?? "#111") : "#111";
                        const bobDuration = 2.3 + (i % 5) * 0.35;
                        const bobDelay = (i % 7) * 0.28;

                        return (
                            <Link href={`/berries/${b.name}`} key={b.id} onClick={(e) => e.stopPropagation()}>
                                <motion.div
                                    className="relative min-w-[110px] h-[140px] flex flex-col justify-between p-3 bg-white border-2 border-[#111111] group"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-20px" }}
                                    transition={{ delay: i * 0.05, type: "spring", bounce: 0.4 }}
                                    whileHover={{ scale: 1.02, boxShadow: "4px 4px 0 #111111", y: -4 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {/* Top accent strip */}
                                    <div className="h-[3px] w-full -mx-3 -mt-3 mb-2" style={{ width: "calc(100% + 24px)", backgroundColor: color }} />

                                    {/* Sprite with independent bob */}
                                    <div
                                        className="flex items-center justify-center flex-1"
                                        style={{ background: `radial-gradient(circle at center, ${color}18 0%, transparent 70%)` }}
                                    >
                                        {b._sprite && (
                                            <motion.img
                                                src={b._sprite} alt={`Baya ${b.name}`} className="w-[40px] h-[40px]"
                                                style={{ imageRendering: "pixelated" }}
                                                animate={prefersRM ? {} : { y: [0, -3, 0], rotate: [-2, 2, -2] }}
                                                transition={{ duration: bobDuration, delay: bobDelay, repeat: Infinity, ease: "easeInOut" }}
                                            />
                                        )}
                                    </div>

                                    <div>
                                        <h3 className="font-nunito font-bold text-[11px] text-[#111111] capitalize group-hover:text-[#CC0000] transition-colors line-clamp-1">
                                            Baya {b.name}
                                        </h3>
                                        <div className="h-px bg-[#E0E0E0] w-full my-1" />
                                        {/* Mini flavor bar */}
                                        <div className="flex gap-[1px] h-[3px]">
                                            {b.flavors.map((fl: any) =>
                                                fl.potency > 0 ? (
                                                    <div key={fl.flavor.name} style={{ flex: fl.potency, backgroundColor: FLAVOR_COLORS[fl.flavor.name] }} />
                                                ) : null
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        );
                    })}
                </motion.div>
            </div>

            {/* Did you know — desktop only */}
            <motion.div
                initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }}
                className="hidden md:flex items-start gap-3 mt-6 p-4 bg-[#F8F8F8] border border-[#E0E0E0]"
                style={{ borderLeft: `4px solid ${flavorColor}` }}
            >
                <Lightbulb size={14} color={flavorColor} className="mt-0.5 shrink-0" />
                <div>
                    <span className="font-press-start text-[7px] text-[#888888] tracking-widest block mb-1">SABÍAS QUÉ</span>
                    <p className="font-nunito text-[13px] text-[#444444] italic leading-relaxed">
                        Las bayas de firmeza <strong>Super dura</strong> tardan más en procesarse para Poffins,
                        pero producen resultados de mayor calidad en concursos. El sabor dominante de cada baya
                        determina qué condición mejoran en la Super Contest Show.
                    </p>
                </div>
            </motion.div>
        </section>
    );
}