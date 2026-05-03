"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Zap } from "lucide-react";
import { Nature } from "@/types/api/nature.types";
import {
    NatureMeta, STAT_COLORS, STAT_NAMES_ES,
    STAT_COMPETITIVE_TIPS, NATURE_ICONIC_POKEMON,
    NATURES_DATA, getNaturesWithSameStat,
} from "@/lib/constants/natures/natures.constants";

interface NatureCompetitiveTipsProps {
    nature: Nature;
    meta: NatureMeta;
    primaryColor: string;
}

export function NatureCompetitiveTips({ nature, meta, primaryColor }: NatureCompetitiveTipsProps) {
    const iconicPokemon = NATURE_ICONIC_POKEMON[nature.name] ?? [];
    const relatedNatures = getNaturesWithSameStat(nature.name);

    return (
        <section>
            <div className="flex items-center gap-4 mb-6">
                <h2 className="font-press-start text-[14px] uppercase tracking-tighter text-[#111111] whitespace-nowrap">
                    Uso Competitivo
                </h2>
                <div className="h-px bg-[#E0E0E0] flex-1" />
            </div>

            <div className="flex flex-col gap-5">
                {/* ── POR QUÉ ELEGIRLA ── */}
                <motion.div
                    className="relative border-2 border-[#111111] bg-white p-5"
                    style={{ boxShadow: `4px 4px 0 ${primaryColor}` }}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="absolute top-[-14px] left-4 bg-[#111111] px-3 py-1">
                        <div className="flex items-center gap-1.5">
                            <Zap size={11} className="text-[#CC0000]" />
                            <span className="font-nunito font-bold text-[11px] text-white uppercase">¿Por qué elegirla?</span>
                        </div>
                    </div>

                    {/* Watermark */}
                    <div
                        className="absolute right-2 bottom-1 font-press-start leading-none select-none pointer-events-none uppercase"
                        style={{ fontSize: "56px", color: primaryColor, opacity: 0.04 }}
                    >
                        {meta.nameEs}
                    </div>

                    <div className="mt-1">
                        {meta.isNeutral ? (
                            <div className="flex flex-col gap-2">
                                <p className="font-nunito text-[14px] text-[#444444] leading-relaxed">
                                    Las naturalezas neutras son elegidas cuando un Pokémon necesita todos sus stats sin sacrificar ninguno.
                                </p>
                                <p className="font-nunito text-[13px] text-[#888888] leading-relaxed">
                                    También son útiles en Pokémon con stats muy balanceados, o cuando se usan Mints para cambiar el efecto visual sin alterar el criado.
                                </p>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3">
                                <p className="font-nunito text-[14px] text-[#444444] leading-relaxed">
                                    <span className="font-bold" style={{ color: primaryColor }}>{meta.nameEs}</span> es una naturaleza
                                    {" "}{meta.increased === "speed" ? "muy popular en sweepers rápidos" : meta.increased === "attack" ? "muy usada en atacantes físicos" : meta.increased === "special-attack" ? "fundamental para atacantes especiales" : meta.increased === "defense" ? "clave en tanques físicos" : "ideal para roles defensivos especiales"}.
                                </p>
                                <p className="font-nunito text-[13px] text-[#888888] leading-relaxed">
                                    {meta.increased && STAT_COMPETITIVE_TIPS[meta.increased]}
                                </p>
                                {meta.decreased && (
                                    <div
                                        className="border-l-4 px-4 py-3 bg-[#FAFAFA]"
                                        style={{ borderColor: primaryColor }}
                                    >
                                        <p className="font-nunito text-[13px] text-[#555555] leading-relaxed">
                                            La penalización en <span className="font-bold">{meta.decreased && STAT_NAMES_ES[meta.decreased]}</span> raramente
                                            importa si el Pokémon está especializado en el rol correcto.
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* ── POKÉMON ICÓNICOS ── */}
                {iconicPokemon.length > 0 && (
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <h3 className="font-press-start text-[11px] text-[#111111] whitespace-nowrap">
                                Pokémon que la usan
                            </h3>
                            <div className="h-px bg-[#E0E0E0] flex-1" />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {iconicPokemon.map(({ name, id, reason }, i) => (
                                <motion.div
                                    key={name}
                                    initial={{ opacity: 0, scale: 0.92 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.07 }}
                                >
                                    <Link href={`/pokemon/${id}`}>
                                        <motion.div
                                            className="border-2 border-[#E0E0E0] bg-white p-4 flex items-center gap-3 cursor-pointer"
                                            whileHover={{ borderColor: "#111111", boxShadow: `3px 3px 0 ${primaryColor}` }}
                                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                        >
                                            <Image
                                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
                                                alt={name}
                                                width={56} height={56}
                                                className="object-contain shrink-0"
                                            />
                                            <div className="min-w-0">
                                                <p className="font-nunito font-bold text-[14px] text-[#111111] capitalize">{name}</p>
                                                <p className="font-nunito text-[12px] text-[#888888] leading-snug">{reason}</p>
                                            </div>
                                            <ChevronRight size={14} className="text-[#CCCCCC] shrink-0 ml-auto" />
                                        </motion.div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ── NATURALEZAS RELACIONADAS ── */}
                {relatedNatures.length > 0 && meta.increased && (
                    <motion.div
                        className="border-2 border-[#E0E0E0] p-5"
                        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                    >
                        <p className="font-press-start text-[10px] text-[#888888] mb-4 uppercase">
                            Otras naturalezas que también suben {STAT_NAMES_ES[meta.increased]}:
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {relatedNatures.map((n) => {
                                const downColor = n.decreased ? STAT_COLORS[n.decreased] : "#888888";
                                return (
                                    <Link key={n.name} href={`/natures/${n.name}`}>
                                        <motion.div
                                            className="flex flex-col items-center border-2 border-[#E0E0E0] px-4 py-2.5 bg-white cursor-pointer"
                                            whileHover={{ borderColor: primaryColor, boxShadow: `2px 2px 0 ${primaryColor}` }}
                                        >
                                            <span className="font-press-start text-[10px] text-[#111111]">{n.nameEs}</span>
                                            <div className="flex gap-1 mt-1">
                                                <span className="font-jetbrains text-[9px]" style={{ color: primaryColor }}>
                                                    +{meta.increased?.slice(0, 3).toUpperCase()}
                                                </span>
                                                <span className="font-jetbrains text-[9px]" style={{ color: downColor }}>
                                                    -{n.decreased?.slice(0, 3).toUpperCase()}
                                                </span>
                                            </div>
                                        </motion.div>
                                    </Link>
                                );
                            })}
                        </div>
                    </motion.div>
                )}

                {/* ── NOTA MINTS ── */}
                <motion.div
                    className="border-l-4 bg-[#111111] px-5 py-4"
                    style={{ borderColor: primaryColor }}
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                >
                    <p className="font-press-start text-[9px] text-white/70 mb-2 uppercase">Nota competitiva</p>
                    <p className="font-nunito text-[13px] text-white/60 leading-relaxed">
                        Desde Sword & Shield, los <span className="text-white font-bold">Mints de naturaleza</span> permiten
                        cambiar el efecto competitivo de la naturaleza de un Pokémon sin modificarla formalmente.
                        El Pokémon actúa como si tuviera la naturaleza del Mint pero conserva la original.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}