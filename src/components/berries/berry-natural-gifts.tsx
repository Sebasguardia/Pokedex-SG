"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Zap } from "lucide-react";

const TYPE_COLORS: Record<string, string> = {
    normal: "#A8A878", fire: "#F08030", water: "#6890F0", electric: "#F8D030",
    grass: "#78C850", ice: "#98D8D8", fighting: "#C03028", poison: "#A040A0",
    ground: "#E0C068", flying: "#A890F0", psychic: "#F85888", bug: "#A8B820",
    rock: "#B8A038", ghost: "#705898", dragon: "#7038F8", dark: "#705848",
    steel: "#B8B8D0", fairy: "#EE99AC",
};

interface BerryNaturalGiftsProps {
    berry: any;
}

export function BerryNaturalGifts({ berry }: BerryNaturalGiftsProps) {
    const typeName: string = berry.natural_gift_type?.name ?? "normal";
    const typeColor: string = TYPE_COLORS[typeName] ?? "#A8A878";
    const power: number = berry.natural_gift_power ?? 0;

    if (power === 0) return null;

    return (
        <section>
            <div className="flex items-center gap-3 mb-8">
                <h2 className="font-press-start text-[14px] text-[#111111] uppercase tracking-tighter">FRUTO NATURAL</h2>
                <div className="h-px bg-[#E0E0E0] flex-1" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

                {/* LEFT: description */}
                <div className="md:col-span-8">
                    <div className="border-2 border-[#111111] bg-white p-6 relative h-full" style={{ boxShadow: "4px 4px 0 #111111" }}>
                        <div
                            className="absolute top-[-14px] left-4 px-3 py-1 flex items-center gap-2 text-white font-nunito font-bold text-[12px] uppercase"
                            style={{ backgroundColor: typeColor }}
                        >
                            <Zap size={13} />
                            TIPO {typeName.toUpperCase()}
                        </div>

                        <p className="mt-4 font-nunito text-[14px] text-[#444444] leading-relaxed mb-6">
                            El movimiento <strong>Fruto Natural</strong> consume esta baya para realizar un
                            ataque de tipo <strong style={{ color: typeColor }}>{typeName}</strong> con
                            potencia <strong>{power}</strong>. La baya se consume al usarlo.
                        </p>

                        {/* Power bar */}
                        <div className="mb-6">
                            <div className="flex justify-between mb-2">
                                <span className="font-press-start text-[9px] text-[#888888] uppercase tracking-tighter">POTENCIA BASE</span>
                                <span className="font-jetbrains text-[13px]" style={{ color: typeColor }}>{power}</span>
                            </div>
                            <div className="w-full h-3 bg-[#F2F2F2] overflow-hidden border border-[#E0E0E0]">
                                <motion.div
                                    className="h-full"
                                    style={{ backgroundColor: typeColor }}
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${(power / 100) * 100}%` }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                                />
                            </div>
                        </div>

                        <Link
                            href="/moves/natural-gift"
                            className="inline-flex items-center gap-2 font-nunito font-bold text-[13px] border-b-2 pb-0.5 transition-all hover:gap-3"
                            style={{ color: typeColor, borderColor: typeColor }}
                        >
                            Ver el move Fruto Natural
                            <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
                                →
                            </motion.span>
                        </Link>
                    </div>
                </div>

                {/* RIGHT: dark specs */}
                <div className="md:col-span-4">
                    <div className="border-2 border-[#111111] bg-[#111111] p-6 text-white h-full relative overflow-hidden group" style={{ boxShadow: "4px 4px 0 #111111" }}>
                        <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:scale-110 transition-transform">
                            <Zap size={72} />
                        </div>
                        <h4 className="font-press-start text-[10px] uppercase mb-4 text-[#CC0000]">ESPECIFICACIONES</h4>
                        <div className="space-y-3">
                            <div className="flex justify-between border-b border-white/10 pb-2">
                                <span className="text-white/40 text-[11px] font-nunito">Tipo</span>
                                <span className="font-nunito font-bold text-[12px] capitalize" style={{ color: typeColor }}>{typeName}</span>
                            </div>
                            <div className="flex justify-between border-b border-white/10 pb-2">
                                <span className="text-white/40 text-[11px] font-nunito">Potencia</span>
                                <span className="font-jetbrains text-[14px]" style={{ color: typeColor }}>{power}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-white/40 text-[11px] font-nunito">Consume baya</span>
                                <span className="font-nunito font-bold text-[12px] text-[#CC0000]">SÍ</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}