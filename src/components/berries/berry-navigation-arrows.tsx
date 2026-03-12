"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

import { getBerryByIdOrName } from "@/lib/api/berries";
import { getItemByIdOrName } from "@/lib/api/items";
import { FLAVOR_COLORS } from "@/lib/constants/berries.constants";
import { getDominantFlavor } from "@/lib/utils/berry.utils";

interface BerryNavigationArrowsProps {
    currentId: number;
}

interface BerryNeighbor {
    id: number;
    name: string;
    flavors: any[];
    _sprite?: string;
}

async function loadNeighbor(id: number): Promise<BerryNeighbor | null> {
    try {
        const berry = await getBerryByIdOrName(id);
        if (!berry) return null;
        if (berry?.item?.name) {
            const item = await getItemByIdOrName(berry.item.name);
            (berry as any)._sprite = item?.sprites?.default ?? "";
        }
        return berry;
    } catch { return null; }
}

export function BerryNavigationArrows({ currentId }: BerryNavigationArrowsProps) {
    const [prev, setPrev] = useState<BerryNeighbor | null>(null);
    const [next, setNext] = useState<BerryNeighbor | null>(null);

    useEffect(() => {
        if (currentId > 1) loadNeighbor(currentId - 1).then(setPrev);
        if (currentId < 64) loadNeighbor(currentId + 1).then(setNext);
    }, [currentId]);

    return (
        <div className="flex gap-4 pt-8 mt-8 border-t-2 border-[#E0E0E0]">
            <Arrow berry={prev} isPrev />
            <Arrow berry={next} isPrev={false} />
        </div>
    );
}

function Arrow({ berry, isPrev }: { berry: BerryNeighbor | null; isPrev: boolean }) {
    const prefersRM = useReducedMotion();
    if (!berry) return <div className="flex-1" />;

    const dom = getDominantFlavor(berry.flavors);
    const color = dom ? (FLAVOR_COLORS[dom.flavor.name] ?? "#111") : "#111";

    return (
        <Link href={`/berries/${berry.name}`} className="flex-1 flex min-w-0">
            <motion.div
                className={[
                    "flex flex-1 items-center gap-3 p-4 border-2 border-[#111111] min-w-0 bg-white group",
                    "transition-all duration-200",
                    isPrev ? "flex-row" : "flex-row-reverse",
                ].join(" ")}
                style={{ boxShadow: "4px 4px 0 #111111" }}
                whileHover={prefersRM ? {} : { x: isPrev ? -4 : 4, y: 4, boxShadow: "0px 0px 0 #111111" }}
            >
                {isPrev
                    ? <ChevronLeft size={20} className="shrink-0 text-[#888888] group-hover:text-[#111111] transition-colors" />
                    : <ChevronRight size={20} className="shrink-0 text-[#888888] group-hover:text-[#111111] transition-colors" />
                }

                {/* Sprite — bg is the adjacent berry's flavor color (spoiler!) */}
                {berry._sprite && (
                    <div
                        className="w-10 h-10 border border-[#E0E0E0] flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${color}22` }}
                    >
                        <motion.img
                            src={berry._sprite}
                            alt={berry.name}
                            className="w-8 h-8"
                            style={{ imageRendering: "pixelated" }}
                            animate={prefersRM ? {} : { y: [0, -3, 0], rotate: [-2, 2, -2] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </div>
                )}

                <div className={`flex flex-col min-w-0 ${isPrev ? "items-start" : "items-end"}`}>
                    <span className="font-jetbrains text-[9px] text-[#888888]">
                        #{String(berry.id).padStart(2, "0")}
                    </span>
                    <span
                        className="font-nunito font-bold text-[13px] capitalize truncate max-w-full group-hover:text-[#CC0000] transition-colors"
                    >
                        Baya {berry.name}
                    </span>
                    {/* Flavor accent bar */}
                    <div className="h-[3px] w-full mt-1" style={{ backgroundColor: color }} />
                </div>
            </motion.div>
        </Link>
    );
}