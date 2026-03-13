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
            {/* Section header */}
            <div className="flex items-center gap-4 mb-6">
                <h2 className="font-press-start text-[14px] uppercase tracking-tighter text-[#111111] whitespace-nowrap">
                    Habilidades Introducidas
                </h2>
                <div className="h-px bg-[#E0E0E0] flex-1" />
                {showAbilities && (
                    <span
                        className="font-press-start text-[8px] px-3 py-1.5 border-2 border-[#111111] shrink-0"
                        style={{ color: genColor }}
                    >
                        {abilities.length} nuevas
                    </span>
                )}
            </div>

            {/* Gen I-II banner informativo */}
            {!showAbilities && (
                <motion.div
                    className="flex items-start gap-3 p-4 border-l-4 bg-[#F8F8F8] border-2 border-[#E0E0E0]"
                    style={{ borderLeftColor: genColor }}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <Info size={15} style={{ color: genColor }} className="shrink-0 mt-0.5" />
                    <p className="font-nunito text-[13px] text-[#555555] italic leading-relaxed">
                        Las habilidades se introducen en la{" "}
                        <Link href="/generations/generation-iii" className="font-bold underline underline-offset-2">
                            Generación III
                        </Link>{" "}
                        (Rubí / Zafiro, 2002).
                    </p>
                </motion.div>
            )}

            {showAbilities && (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-5">
                        {shown.map((ability, i) => (
                            <motion.div
                                key={ability.name}
                                initial={{ opacity: 0, y: 8 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: i * 0.04 }}
                                style={{ boxShadow: "3px 3px 0 #E0E0E0" }}
                                whileHover={{ x: 3, y: 3, boxShadow: "0px 0px 0 transparent" }}
                            >
                                <Link href={`/abilities/${ability.name}`}>
                                    <div className="border-2 border-[#E0E0E0] hover:border-[#111111] bg-white p-3 flex items-center gap-3 transition-colors group">
                                        {/* Barra lateral del color de generación */}
                                        <div className="w-[3px] self-stretch shrink-0" style={{ backgroundColor: genColor }} />

                                        <div className="flex-1 min-w-0">
                                            <p className="font-nunito font-bold text-[13px] text-[#111111] capitalize truncate">
                                                {capitalize(ability.name)}
                                            </p>
                                        </div>

                                        <Eye
                                            size={13}
                                            className="text-[#BBBBBB] group-hover:text-[#111111] transition-colors shrink-0"
                                        />
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Ver todas */}
                    <div className="flex justify-start">
                        <Link href="/abilities">
                            <motion.div
                                className="flex items-center gap-2 border-2 border-[#111111] px-5 py-3 font-press-start text-[9px] bg-white hover:bg-[#111111] hover:text-white transition-colors"
                                style={{ boxShadow: `3px 3px 0 ${genColor}` }}
                                whileHover={{ x: 3, y: 3, boxShadow: "0px 0px 0 transparent" }}
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