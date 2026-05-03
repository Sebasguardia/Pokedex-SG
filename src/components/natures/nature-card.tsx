"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Nature } from "@/types/api/nature.types";
import {
    NatureMeta, STAT_COLORS, STAT_NAMES_ES,
    FLAVOR_COLORS, FLAVOR_NAMES_ES,
} from "@/lib/constants/natures/natures.constants";

interface NatureCardProps {
    nature: Nature;
    meta: NatureMeta;
    index: number;
}

export function NatureCard({ nature, meta, index }: NatureCardProps) {
    const topColor = meta.increased ? (STAT_COLORS[meta.increased] ?? "#888888") : "#888888";
    const upColor = meta.increased ? STAT_COLORS[meta.increased] : null;
    const downColor = meta.decreased ? STAT_COLORS[meta.decreased] : null;
    const likeColor = meta.likesFlavor ? FLAVOR_COLORS[meta.likesFlavor] : null;
    const hateColor = meta.hatesFlavor ? FLAVOR_COLORS[meta.hatesFlavor] : null;

    return (
        <motion.div
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            whileInView={{ clipPath: "inset(0 0% 0 0)" }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: (index % 12) * 0.04 }}
        >
            <Link href={`/natures/${nature.name}`} className="block outline-none group">
                <motion.div
                    className="relative border-2 border-[#111111] bg-white overflow-hidden"
                    style={{ boxShadow: "4px 4px 0 #111111" }}
                    whileHover={{ x: 4, y: 4, boxShadow: "0px 0px 0 transparent" }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                    {/* Franja top */}
                    <div className="h-[4px]" style={{ backgroundColor: topColor }} />

                    {/* Watermark nombre inglés */}
                    <div
                        className="absolute bottom-1 right-2 font-press-start leading-none select-none pointer-events-none capitalize"
                        style={{ fontSize: "42px", color: topColor, opacity: 0.05 }}
                    >
                        {nature.name}
                    </div>

                    <div className="p-4 pb-5">
                        {/* Header */}
                        <div className="flex items-start justify-between gap-2 mb-4">
                            <div>
                                <h3 className="font-press-start text-[14px] text-[#111111] mb-1 leading-tight">
                                    {meta.nameEs.toUpperCase()}
                                </h3>
                                <p className="font-nunito text-[12px] text-[#888888] capitalize">{nature.name}</p>
                            </div>
                            <div
                                className="px-2 py-1 border-2 border-[#111111] shrink-0"
                                style={{ backgroundColor: meta.isNeutral ? "#F5F5F5" : `${topColor}18` }}
                            >
                                <span
                                    className="font-press-start text-[8px]"
                                    style={{ color: meta.isNeutral ? "#AAAAAA" : topColor }}
                                >
                                    {meta.isNeutral ? "NEUTRA" : `+${meta.increased?.split("-")[0].toUpperCase().slice(0, 3)}`}
                                </span>
                            </div>
                        </div>

                        {/* Separador */}
                        <div className="relative h-[4px] mb-4">
                            <motion.div
                                className="absolute top-0 left-0 w-full h-[3px] bg-[#111111] origin-left"
                                initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
                                transition={{ duration: 0.35, delay: 0.1 + index * 0.02 }}
                            />
                            <motion.div
                                className="absolute bottom-0 left-0 w-full h-[1px] origin-left"
                                style={{ backgroundColor: topColor }}
                                initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: 0.18 + index * 0.02 }}
                            />
                        </div>

                        {/* Stats */}
                        {meta.isNeutral ? (
                            <div className="flex flex-col gap-2 mb-4">
                                <div className="flex items-center gap-2 py-2 px-3 bg-[#F5F5F5] border border-[#E0E0E0]">
                                    <span className="font-nunito text-[13px] text-[#AAAAAA] italic">Sin modificadores de stats</span>
                                </div>
                                <p className="font-nunito text-[12px] text-[#BBBBBB]">Todos los stats al 100%</p>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3 mb-4">
                                {/* Stat que SUBE */}
                                {upColor && (
                                    <div>
                                        <div className="flex items-center justify-between mb-1">
                                            <div className="flex items-center gap-1.5">
                                                <span className="font-press-start text-[10px]" style={{ color: upColor }}>▲</span>
                                                <span className="font-nunito font-bold text-[13px]" style={{ color: upColor }}>
                                                    {STAT_NAMES_ES[meta.increased!]}
                                                </span>
                                            </div>
                                            <span className="font-jetbrains text-[11px]" style={{ color: upColor }}>+10%</span>
                                        </div>
                                        <div className="h-[6px] bg-[#F0F0F0] overflow-hidden">
                                            <motion.div
                                                className="h-full"
                                                style={{ backgroundColor: upColor }}
                                                initial={{ width: 0 }}
                                                whileInView={{ width: "100%" }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.5, delay: 0.2 + index * 0.02 }}
                                            />
                                        </div>
                                    </div>
                                )}
                                {/* Stat que BAJA */}
                                {downColor && (
                                    <div>
                                        <div className="flex items-center justify-between mb-1">
                                            <div className="flex items-center gap-1.5">
                                                <span className="font-press-start text-[10px]" style={{ color: downColor }}>▼</span>
                                                <span className="font-nunito font-bold text-[13px]" style={{ color: downColor }}>
                                                    {STAT_NAMES_ES[meta.decreased!]}
                                                </span>
                                            </div>
                                            <span className="font-jetbrains text-[11px]" style={{ color: downColor }}>-10%</span>
                                        </div>
                                        <div className="h-[6px] bg-[#F0F0F0] overflow-hidden">
                                            <motion.div
                                                className="h-full"
                                                style={{ backgroundColor: downColor, opacity: 0.55 }}
                                                initial={{ width: 0 }}
                                                whileInView={{ width: "70%" }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.5, delay: 0.28 + index * 0.02 }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Sabores */}
                        {!meta.isNeutral && (
                            <div className="flex gap-2 flex-wrap">
                                {likeColor && (
                                    <span
                                        className="font-nunito font-bold text-[12px] px-2.5 py-1 border"
                                        style={{ color: likeColor, borderColor: likeColor, backgroundColor: `${likeColor}18` }}
                                    >
                                        Le gusta: {FLAVOR_NAMES_ES[meta.likesFlavor!]}
                                    </span>
                                )}
                                {hateColor && (
                                    <span className="font-nunito font-bold text-[12px] px-2.5 py-1 border border-[#DDDDDD] text-[#888888] bg-[#F5F5F5]">
                                        Detesta: {FLAVOR_NAMES_ES[meta.hatesFlavor!]}
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                </motion.div>
            </Link>
        </motion.div>
    );
}