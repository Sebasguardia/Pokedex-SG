"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import NumberFlow from "@number-flow/react";
import { Nature } from "@/types/api/nature.types";
import {
    NatureMeta, STAT_COLORS, STAT_NAMES_ES,
    FLAVOR_COLORS, FLAVOR_NAMES_ES,
} from "@/lib/constants/natures.constants";

interface NatureDetailHeroProps {
    nature: Nature;
    meta: NatureMeta;
    primaryColor: string;
}

export function NatureDetailHero({ nature, meta, primaryColor }: NatureDetailHeroProps) {
    const upColor = meta.increased ? STAT_COLORS[meta.increased] : null;
    const downColor = meta.decreased ? STAT_COLORS[meta.decreased] : null;
    const likeColor = meta.likesFlavor ? FLAVOR_COLORS[meta.likesFlavor] : null;
    const hateColor = meta.hatesFlavor ? FLAVOR_COLORS[meta.hatesFlavor] : null;

    const letters = meta.nameEs.toUpperCase().split("");

    return (
        <div className="relative bg-[#111111] overflow-hidden">
            {/* Dot grid */}
            <div
                className="absolute inset-0 opacity-[0.035] pointer-events-none"
                style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "28px 28px" }}
            />

            {/* Scanline animada */}
            <motion.div
                className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none"
                style={{ backgroundColor: primaryColor }}
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 9, ease: "easeInOut" }}
            />

            {/* Nombre watermark */}
            <motion.div
                className="absolute right-[-8px] top-1/2 -translate-y-1/2 font-press-start leading-none select-none pointer-events-none text-white uppercase"
                style={{ fontSize: "clamp(70px, 13vw, 130px)", opacity: 0 }}
                animate={{ opacity: 0.03 }}
                transition={{ duration: 0.8 }}
            >
                {meta.nameEs}
            </motion.div>

            <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 py-10">
                {/* Breadcrumb */}
                <motion.div
                    className="flex items-center gap-1.5 mb-6"
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}
                >
                    <Link href="/natures" className="font-nunito text-[13px] text-[#888888] hover:text-white transition-colors">
                        Naturalezas
                    </Link>
                    <ChevronRight size={11} className="text-[#555555]" />
                    <span className="font-nunito text-[13px] text-white">{meta.nameEs}</span>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-10 items-start">
                    {/* ── IZQUIERDA ── */}
                    <div className="flex-1 min-w-0">
                        {/* Chips de metadata */}
                        <motion.div
                            className="flex flex-wrap gap-2 mb-5"
                            initial="hidden" animate="visible"
                            variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
                        >
                            <motion.div
                                variants={{ hidden: { opacity: 0, y: -8 }, visible: { opacity: 1, y: 0 } }}
                                className="px-3 py-1.5 border"
                                style={{ borderColor: "rgba(255,255,255,0.2)", backgroundColor: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)" }}
                            >
                                <span className="font-press-start text-[9px]">NATURALEZA</span>
                            </motion.div>

                            {!meta.isNeutral && upColor && (
                                <motion.div
                                    variants={{ hidden: { opacity: 0, y: -8 }, visible: { opacity: 1, y: 0 } }}
                                    className="px-3 py-1.5 border-2"
                                    style={{ borderColor: upColor, backgroundColor: `${upColor}20`, color: upColor }}
                                >
                                    <span className="font-press-start text-[9px]">+{STAT_NAMES_ES[meta.increased!].toUpperCase()}</span>
                                </motion.div>
                            )}

                            {!meta.isNeutral && downColor && (
                                <motion.div
                                    variants={{ hidden: { opacity: 0, y: -8 }, visible: { opacity: 1, y: 0 } }}
                                    className="px-3 py-1.5 border"
                                    style={{ borderColor: "rgba(255,255,255,0.15)", backgroundColor: "rgba(255,255,255,0.05)", color: downColor }}
                                >
                                    <span className="font-press-start text-[9px]">-{STAT_NAMES_ES[meta.decreased!].toUpperCase()}</span>
                                </motion.div>
                            )}

                            {meta.isNeutral && (
                                <motion.div
                                    variants={{ hidden: { opacity: 0, y: -8 }, visible: { opacity: 1, y: 0 } }}
                                    className="px-3 py-1.5 border"
                                    style={{ borderColor: "rgba(255,255,255,0.15)", backgroundColor: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)" }}
                                >
                                    <span className="font-press-start text-[9px]">NEUTRA — SIN CAMBIOS</span>
                                </motion.div>
                            )}

                            <motion.div
                                variants={{ hidden: { opacity: 0, y: -8 }, visible: { opacity: 1, y: 0 } }}
                                className="px-3 py-1.5 border"
                                style={{ borderColor: "rgba(255,255,255,0.12)", backgroundColor: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.5)" }}
                            >
                                <span className="font-jetbrains text-[11px]">#{String(nature.id).padStart(2, "0")}</span>
                            </motion.div>
                        </motion.div>

                        {/* Nombre — letras caen con spring */}
                        <div className="overflow-hidden mb-3">
                            <div className="flex flex-wrap gap-x-2">
                                {letters.map((char, i) => (
                                    <motion.span
                                        key={i}
                                        className="font-press-start text-white leading-tight"
                                        style={{ fontSize: "clamp(28px, 5.5vw, 44px)" }}
                                        initial={{ y: -30, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 22, delay: i * 0.05 }}
                                    >
                                        {char === " " ? "\u00A0" : char}
                                    </motion.span>
                                ))}
                            </div>
                        </div>

                        {/* Nombre en inglés */}
                        <motion.p
                            className="font-nunito text-[14px] mb-6 capitalize"
                            style={{ color: "rgba(255,255,255,0.4)" }}
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                        >
                            {nature.name}
                        </motion.p>

                        {/* Chips de sabor */}
                        {!meta.isNeutral && (
                            <motion.div
                                className="flex flex-wrap gap-2"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
                            >
                                {likeColor && (
                                    <div className="flex items-center gap-2 px-3 py-2 border" style={{ borderColor: likeColor, backgroundColor: `${likeColor}18` }}>
                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: likeColor }} />
                                        <span className="font-nunito font-bold text-[13px]" style={{ color: likeColor }}>
                                            Le gusta: {FLAVOR_NAMES_ES[meta.likesFlavor!]}
                                        </span>
                                    </div>
                                )}
                                {hateColor && (
                                    <div className="flex items-center gap-2 px-3 py-2 border" style={{ borderColor: "rgba(255,255,255,0.15)", backgroundColor: "rgba(255,255,255,0.05)" }}>
                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: hateColor }} />
                                        <span className="font-nunito font-bold text-[13px]" style={{ color: hateColor }}>
                                            Detesta: {FLAVOR_NAMES_ES[meta.hatesFlavor!]}
                                        </span>
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {meta.isNeutral && (
                            <motion.p
                                className="font-nunito text-[14px] leading-relaxed max-w-[440px]"
                                style={{ color: "rgba(255,255,255,0.5)" }}
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
                            >
                                Esta naturaleza no modifica ningún stat ni tiene preferencias de sabor. Todos los stats permanecen al 100%.
                            </motion.p>
                        )}
                    </div>

                    {/* ── DERECHA: paneles de stats ── */}
                    <motion.div
                        className="flex flex-col gap-3 w-full lg:w-[260px] shrink-0"
                        initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
                    >
                        {meta.isNeutral ? (
                            <div
                                className="flex items-center justify-center gap-2 px-5 py-8 border"
                                style={{ borderColor: "rgba(255,255,255,0.12)", backgroundColor: "rgba(255,255,255,0.04)" }}
                            >
                                <span className="font-nunito text-[14px]" style={{ color: "rgba(255,255,255,0.4)" }}>
                                    Sin modificadores
                                </span>
                            </div>
                        ) : (
                            <>
                                {/* Panel stat que SUBE */}
                                {upColor && (
                                    <div
                                        className="border p-4"
                                        style={{ borderColor: `${upColor}40`, backgroundColor: `${upColor}10` }}
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-2">
                                                <span className="font-press-start text-[11px]" style={{ color: upColor }}>▲</span>
                                                <span className="font-nunito font-bold text-[14px]" style={{ color: upColor }}>
                                                    {STAT_NAMES_ES[meta.increased!]}
                                                </span>
                                            </div>
                                            <span className="font-jetbrains text-[13px] text-white font-bold">+10%</span>
                                        </div>
                                        {/* Barra */}
                                        <div className="relative h-[8px] bg-white/10 overflow-visible">
                                            <motion.div
                                                className="h-full"
                                                style={{ backgroundColor: upColor }}
                                                initial={{ width: 0 }}
                                                animate={{ width: "100%" }}
                                                transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                                            />
                                            {/* Indicador 100% */}
                                            <div className="absolute top-[-4px] left-[90.9%] w-[2px] h-[16px] border-l-2 border-dashed border-white/30" />
                                        </div>
                                        <p className="font-nunito text-[11px] mt-1.5" style={{ color: `${upColor}AA` }}>110% del valor base</p>
                                    </div>
                                )}

                                {/* Panel stat que BAJA */}
                                {downColor && (
                                    <div
                                        className="border p-4"
                                        style={{ borderColor: `${downColor}30`, backgroundColor: `${downColor}08` }}
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-2">
                                                <span className="font-press-start text-[11px]" style={{ color: downColor }}>▼</span>
                                                <span className="font-nunito font-bold text-[14px]" style={{ color: downColor }}>
                                                    {STAT_NAMES_ES[meta.decreased!]}
                                                </span>
                                            </div>
                                            <span className="font-jetbrains text-[13px] text-white/60 font-bold">-10%</span>
                                        </div>
                                        <div className="relative h-[8px] bg-white/10 overflow-hidden">
                                            <motion.div
                                                className="h-full"
                                                style={{ backgroundColor: downColor, opacity: 0.65 }}
                                                initial={{ width: 0 }}
                                                animate={{ width: "81.8%" }}
                                                transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                                            />
                                        </div>
                                        <p className="font-nunito text-[11px] mt-1.5" style={{ color: `${downColor}88` }}>90% del valor base</p>
                                    </div>
                                )}
                            </>
                        )}
                    </motion.div>
                </div>
            </div>

            {/* Separador doble invertido */}
            <div className="relative h-[5px]">
                <motion.div
                    className="absolute top-0 left-0 w-full h-[2px] origin-left"
                    style={{ backgroundColor: primaryColor }}
                    initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.5, delay: 0.4 }}
                />
                <motion.div
                    className="absolute bottom-0 right-0 w-full h-[3px] bg-[#111111] origin-right"
                    initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.4, delay: 0.5 }}
                />
            </div>
        </div>
    );
}