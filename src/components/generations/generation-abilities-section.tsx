"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Eye, ArrowRight, Info } from "lucide-react";
import { NamedAPIResource } from "@/types/api/common.types";

interface GenerationAbilitiesSectionProps {
    abilities: NamedAPIResource[];
    genColor: string;
    generationId: number;
}

function capitalize(s: string) {
    return s.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

export function GenerationAbilitiesSection({
    abilities, genColor, generationId,
}: GenerationAbilitiesSectionProps) {
    const showAbilities = generationId >= 3;
    const shown = abilities.slice(0, 12);

    return (
        <section>
            {/* Section header con cuadradito rojo */}
            <div className="flex items-center gap-3 mb-7">
                <span className="w-3 h-3 bg-[#CC0000] shrink-0" />
                <h2 className="font-['Press_Start_2P'] text-[13px] uppercase tracking-tighter text-[#111111] whitespace-nowrap">
                    Habilidades Introducidas
                </h2>
                <div className="h-[3px] bg-[#111111] flex-1" />
                {showAbilities && (
                    <span
                        className="font-['Press_Start_2P'] text-[8px] px-3 py-2 border-[3px] border-[#111111] shrink-0"
                        style={{ color: genColor, boxShadow: `3px 3px 0 ${genColor}` }}
                    >
                        {abilities.length} nuevas
                    </span>
                )}
            </div>

            {/* Gen I-II banner informativo */}
            {!showAbilities && (
                <motion.div
                    className="flex items-start gap-4 p-5 border-l-[5px] border-4 border-[#111111] bg-[#F8F8F8]"
                    style={{ borderLeftColor: genColor, boxShadow: `4px 4px 0 ${genColor}` }}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <div
                        className="p-2 border-[3px] border-[#111111] shrink-0"
                        style={{ backgroundColor: `${genColor}20` }}
                    >
                        <Info size={16} style={{ color: genColor }} />
                    </div>
                    <p className="font-['Nunito'] font-bold text-[13px] text-[#555555] italic leading-relaxed">
                        Las habilidades se introducen en la{" "}
                        <Link href="/generations/generation-iii" className="underline underline-offset-2 font-black" style={{ color: genColor }}>
                            Generación III
                        </Link>{" "}
                        (Rubí / Zafiro, 2002).
                    </p>
                </motion.div>
            )}

            {showAbilities && (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                        {shown.map((ability, i) => (
                            <motion.div
                                key={ability.name}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ type: "spring", stiffness: 280, damping: 22, delay: i * 0.04 }}
                                style={{ boxShadow: "4px 4px 0 #111111" }}
                                whileHover={{
                                    x: -2,
                                    y: -2,
                                    boxShadow: `6px 6px 0 ${genColor}`,
                                    transition: { type: "spring", stiffness: 400, damping: 20 },
                                }}
                            >
                                <Link href={`/abilities/${ability.name}`}>
                                    <div className="border-[3px] border-[#111111] hover:border-[#111111] bg-white p-3 flex items-center gap-3 group">
                                        {/* Barra lateral */}
                                        <div className="w-[4px] self-stretch shrink-0" style={{ backgroundColor: genColor }} />

                                        <div className="flex-1 min-w-0">
                                            <p className="font-['Nunito'] font-black text-[13px] text-[#111111] capitalize truncate">
                                                {capitalize(ability.name)}
                                            </p>
                                        </div>

                                        <div
                                            className="p-1 border-[2px] border-[#E0E0E0] group-hover:border-[#111111] transition-colors"
                                            style={{ color: genColor }}
                                        >
                                            <Eye size={13} />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Ver todas */}
                    <div className="flex justify-start">
                        <Link href="/abilities">
                            <motion.div
                                className="flex items-center gap-2 border-4 border-[#111111] px-6 py-3 font-['Press_Start_2P'] text-[9px] bg-white hover:bg-[#111111] hover:text-white transition-colors"
                                style={{ boxShadow: `4px 4px 0 ${genColor}` }}
                                whileHover={{ x: 4, y: 4, boxShadow: "0px 0px 0 transparent" }}
                            >
                                <ArrowRight size={12} />
                                VER TODAS ({abilities.length})
                            </motion.div>
                        </Link>
                    </div>
                </>
            )}
        </section>
    );
}