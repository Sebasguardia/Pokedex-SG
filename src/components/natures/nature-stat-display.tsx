"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import NumberFlow from "@number-flow/react";
import { Nature } from "@/types/api/nature.types";
import {
    NatureMeta, STAT_COLORS, STAT_NAMES_ES,
    STAT_COMPETITIVE_TIPS,
} from "@/lib/constants/natures.constants";

interface NatureStatDisplayProps {
    nature: Nature;
    meta: NatureMeta;
}

export function NatureStatDisplay({ nature, meta }: NatureStatDisplayProps) {
    const [baseStatInput, setBaseStatInput] = useState("100");
    const baseStat = Math.max(1, Math.min(255, parseInt(baseStatInput) || 0));

    const upColor = meta.increased ? STAT_COLORS[meta.increased] : null;
    const downColor = meta.decreased ? STAT_COLORS[meta.decreased] : null;

    return (
        <section>
            <div className="flex items-center gap-4 mb-6">
                <h2 className="font-press-start text-[14px] uppercase tracking-tighter text-[#111111] whitespace-nowrap">
                    Modificadores de Stat
                </h2>
                <div className="h-px bg-[#E0E0E0] flex-1" />
            </div>

            {meta.isNeutral ? (
                /* ── NEUTRAL ── */
                <div
                    className="relative border-2 border-[#E0E0E0] p-8 text-center"
                    style={{ boxShadow: "4px 4px 0 #E0E0E0" }}
                >
                    <p className="font-press-start text-[11px] text-[#888888] mb-3">SIN MODIFICADORES</p>
                    <p className="font-nunito text-[15px] text-[#888888] mb-2">
                        Esta naturaleza no modifica ningún stat.
                    </p>
                    <p className="font-nunito text-[14px] text-[#AAAAAA]">
                        Todos los stats permanecen al 100% de su valor base.
                    </p>
                    <p className="font-nunito text-[13px] text-[#BBBBBB] mt-3 italic">
                        Recomendada cuando un Pokémon necesita todos sus stats uniformes.
                    </p>
                </div>
            ) : (
                <div className="flex flex-col gap-5">
                    {/* ── STAT QUE SUBE ── */}
                    {upColor && meta.increased && (
                        <motion.div
                            className="relative border-2 border-[#111111] p-5 bg-white"
                            style={{ boxShadow: `4px 4px 0 ${upColor}` }}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4 }}
                        >
                            {/* Etiqueta flotante */}
                            <div className="absolute top-[-14px] left-4" style={{ backgroundColor: upColor }}>
                                <span className="font-nunito font-bold text-[11px] text-white px-3 py-1 block uppercase">
                                    Stat Aumentado +10%
                                </span>
                            </div>

                            {/* Watermark */}
                            <div
                                className="absolute right-3 bottom-2 font-press-start leading-none select-none pointer-events-none uppercase"
                                style={{ fontSize: "52px", color: upColor, opacity: 0.05 }}
                            >
                                +10
                            </div>

                            <div className="flex flex-col gap-4 mt-1">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-10 h-10 border-2 border-[#111111] flex items-center justify-center shrink-0"
                                        style={{ backgroundColor: `${upColor}18` }}
                                    >
                                        <span className="font-press-start text-[12px]" style={{ color: upColor }}>▲</span>
                                    </div>
                                    <div>
                                        <p className="font-press-start text-[13px]" style={{ color: upColor }}>
                                            {STAT_NAMES_ES[meta.increased].toUpperCase()}
                                        </p>
                                        <p className="font-nunito text-[12px] text-[#888888] mt-0.5">+10% del valor base</p>
                                    </div>
                                    <div className="ml-auto">
                                        <span className="font-jetbrains text-[22px] font-bold" style={{ color: upColor }}>×1.1</span>
                                    </div>
                                </div>

                                {/* Barra comparativa */}
                                <div className="relative">
                                    <div className="h-[10px] bg-[#F0F0F0] overflow-hidden relative">
                                        {/* Barra base (referencia 100%) */}
                                        <div className="absolute inset-0 h-full bg-[#E0E0E0]" style={{ width: "90.9%" }} />
                                        {/* Barra modificada (110%) */}
                                        <motion.div
                                            className="absolute top-0 left-0 h-full"
                                            style={{ backgroundColor: upColor, opacity: 0.85 }}
                                            initial={{ width: 0 }}
                                            whileInView={{ width: "100%" }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.6, ease: "easeOut" }}
                                        />
                                        {/* Línea de 100% */}
                                        <div
                                            className="absolute top-0 bottom-0 w-[2px] border-l-2 border-dashed border-[#111111]/40"
                                            style={{ left: "90.9%" }}
                                        />
                                    </div>
                                    <div className="flex justify-between mt-1.5">
                                        <span className="font-jetbrains text-[10px] text-[#888888]">0</span>
                                        <span className="font-jetbrains text-[10px] text-[#888888]" style={{ marginLeft: "82%" }}>Base</span>
                                        <span className="font-jetbrains text-[11px] font-bold" style={{ color: upColor }}>110%</span>
                                    </div>
                                </div>

                                {/* Tip competitivo */}
                                <div
                                    className="border-l-4 px-4 py-3 bg-[#FAFAFA]"
                                    style={{ borderColor: upColor }}
                                >
                                    <p className="font-nunito text-[13px] text-[#555555] leading-relaxed">
                                        {STAT_COMPETITIVE_TIPS[meta.increased]}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* ── STAT QUE BAJA ── */}
                    {downColor && meta.decreased && (
                        <motion.div
                            className="relative border-2 border-[#111111] p-5 bg-white"
                            style={{ boxShadow: "4px 4px 0 #CC0000" }}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                        >
                            {/* Etiqueta flotante */}
                            <div className="absolute top-[-14px] left-4 bg-[#CC0000]">
                                <span className="font-nunito font-bold text-[11px] text-white px-3 py-1 block uppercase">
                                    Stat Reducido -10%
                                </span>
                            </div>

                            {/* Watermark */}
                            <div
                                className="absolute right-3 bottom-2 font-press-start leading-none select-none pointer-events-none uppercase text-[#CC0000]"
                                style={{ fontSize: "52px", opacity: 0.05 }}
                            >
                                -10
                            </div>

                            <div className="flex flex-col gap-4 mt-1">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-10 h-10 border-2 border-[#111111] flex items-center justify-center shrink-0"
                                        style={{ backgroundColor: `${downColor}18` }}
                                    >
                                        <span className="font-press-start text-[12px]" style={{ color: downColor }}>▼</span>
                                    </div>
                                    <div>
                                        <p className="font-press-start text-[13px]" style={{ color: downColor }}>
                                            {STAT_NAMES_ES[meta.decreased].toUpperCase()}
                                        </p>
                                        <p className="font-nunito text-[12px] text-[#888888] mt-0.5">-10% del valor base</p>
                                    </div>
                                    <div className="ml-auto">
                                        <span className="font-jetbrains text-[22px] font-bold" style={{ color: downColor }}>×0.9</span>
                                    </div>
                                </div>

                                {/* Barra comparativa */}
                                <div className="relative">
                                    <div className="h-[10px] bg-[#F0F0F0] overflow-hidden">
                                        <motion.div
                                            className="h-full"
                                            style={{ backgroundColor: downColor, opacity: 0.6 }}
                                            initial={{ width: 0 }}
                                            whileInView={{ width: "90%" }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.6, ease: "easeOut" }}
                                        />
                                    </div>
                                    <div className="flex justify-between mt-1.5">
                                        <span className="font-jetbrains text-[10px] text-[#888888]">0</span>
                                        <span className="font-jetbrains text-[11px] font-bold" style={{ color: downColor }}>90%</span>
                                        <span className="font-jetbrains text-[10px] text-[#888888]">Base 100%</span>
                                    </div>
                                </div>

                                <div className="border-l-4 border-[#CC0000] px-4 py-3 bg-[#FFF5F5]">
                                    <p className="font-nunito text-[13px] text-[#555555] leading-relaxed">
                                        Si el Pokémon no usa movimientos de {STAT_NAMES_ES[meta.decreased].toLowerCase()},
                                        esta penalización no afecta al rendimiento en batalla.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* ── MINI CALCULADORA ── */}
                    <motion.div
                        className="relative border-2 border-[#111111] bg-[#111111] p-6"
                        style={{ boxShadow: `4px 4px 0 ${upColor ?? "#888888"}` }}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                    >
                        <div className="absolute top-[-14px] left-4 bg-[#CC0000]">
                            <span className="font-nunito font-bold text-[11px] text-white px-3 py-1 block uppercase">
                                Calculadora de Stat
                            </span>
                        </div>

                        {/* Dot grid en dark */}
                        <div
                            className="absolute inset-0 opacity-[0.04] pointer-events-none"
                            style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "24px 24px" }}
                        />

                        <div className="relative z-10">
                            <p className="font-nunito text-[14px] text-white/60 mb-4">
                                Ingresa un stat base y ve cómo lo modifica esta naturaleza:
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                                {/* Input */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="font-press-start text-[9px] text-white/50 uppercase">Stat base</label>
                                    <input
                                        type="number"
                                        min={1} max={255}
                                        value={baseStatInput}
                                        onChange={(e) => setBaseStatInput(e.target.value)}
                                        className="w-[100px] border-2 border-white/20 bg-white/10 text-white font-jetbrains text-[16px] px-3 py-2.5 outline-none focus:border-white/50 transition-colors"
                                    />
                                </div>

                                {/* Arrow */}
                                <div className="font-press-start text-[14px] text-white/30 hidden sm:block mt-6">→</div>

                                {/* Resultados */}
                                <div className="flex gap-4 flex-wrap">
                                    {!meta.isNeutral && upColor && meta.increased && (
                                        <div
                                            className="flex flex-col gap-1 border p-3 min-w-[110px]"
                                            style={{ borderColor: `${upColor}40`, backgroundColor: `${upColor}12` }}
                                        >
                                            <span className="font-press-start text-[9px]" style={{ color: upColor }}>▲ +10%</span>
                                            <NumberFlow
                                                value={Math.round(baseStat * 1.1)}
                                                className="font-jetbrains text-[22px] font-bold"
                                                style={{ color: upColor }}
                                            />
                                            <span className="font-nunito text-[11px]" style={{ color: `${upColor}80` }}>
                                                {STAT_NAMES_ES[meta.increased]}
                                            </span>
                                        </div>
                                    )}
                                    <div
                                        className="flex flex-col gap-1 border border-white/15 bg-white/5 p-3 min-w-[110px]"
                                    >
                                        <span className="font-press-start text-[9px] text-white/40">— BASE</span>
                                        <NumberFlow
                                            value={baseStat}
                                            className="font-jetbrains text-[22px] font-bold text-white/70"
                                        />
                                        <span className="font-nunito text-[11px] text-white/30">Sin cambio</span>
                                    </div>
                                    {!meta.isNeutral && downColor && meta.decreased && (
                                        <div
                                            className="flex flex-col gap-1 border p-3 min-w-[110px]"
                                            style={{ borderColor: `${downColor}40`, backgroundColor: `${downColor}10` }}
                                        >
                                            <span className="font-press-start text-[9px]" style={{ color: downColor }}>▼ -10%</span>
                                            <NumberFlow
                                                value={Math.round(baseStat * 0.9)}
                                                className="font-jetbrains text-[22px] font-bold"
                                                style={{ color: downColor }}
                                            />
                                            <span className="font-nunito text-[11px]" style={{ color: `${downColor}80` }}>
                                                {STAT_NAMES_ES[meta.decreased]}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </section>
    );
}