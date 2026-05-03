"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";
import { FLAVOR_META } from "@/lib/constants/berries/berries.constants";

const CONTEST_MAP: Record<string, { type: string; color: string }> = {
    spicy: { type: "Cool", color: "#EF4444" },
    dry: { type: "Beauty", color: "#3B82F6" },
    sweet: { type: "Cute", color: "#EC4899" },
    bitter: { type: "Smart", color: "#22C55E" },
    sour: { type: "Tough", color: "#EAB308" },
};

function Hearts({ count, delay = 0 }: { count: number; delay?: number }) {
    const prefersRM = useReducedMotion();
    return (
        <div className="flex gap-1">
            {Array.from({ length: Math.min(count, 8) }).map((_, i) => (
                <motion.span key={i} className="text-[#CC0000]"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", bounce: 0.6, delay: prefersRM ? 0 : delay + i * 0.05 }}
                >
                    <Heart size={12} fill="currentColor" />
                </motion.span>
            ))}
            {count > 8 && <span className="font-jetbrains text-[9px] text-[#888888] self-center">+{count - 8}</span>}
        </div>
    );
}

interface BerryContestSectionProps {
    berry: any;
    dominantFlavor: any;
}

export function BerryContestSection({ berry, dominantFlavor }: BerryContestSectionProps) {
    if (!dominantFlavor || dominantFlavor.potency === 0) return null;

    const flavorName: string = dominantFlavor.flavor.name;
    const contest = CONTEST_MAP[flavorName] ?? CONTEST_MAP.spicy;
    const appeal: number = Math.ceil(dominantFlavor.potency / 10);
    const jam: number = Math.max(1, Math.floor(dominantFlavor.potency / 15));
    const Icon = FLAVOR_META[flavorName]?.icon;

    return (
        <section>
            <div className="flex items-center gap-3 mb-8">
                <h2 className="font-press-start text-[14px] text-[#111111] uppercase tracking-tighter">CONCURSOS</h2>
                <div className="h-px bg-[#E0E0E0] flex-1" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

                {/* LEFT: Description */}
                <div className="md:col-span-8">
                    <div className="border-2 border-[#111111] bg-white p-6 relative h-full" style={{ boxShadow: "4px 4px 0 #111111" }}>
                        <div
                            className="absolute top-[-13px] left-4 px-3 py-1 flex items-center gap-2 text-white font-nunito font-bold text-[11px] uppercase z-10 border-2"
                            style={{ backgroundColor: contest.color, borderColor: contest.color }}
                        >
                            {Icon && <Icon size={14} />} {contest.type.toUpperCase()}
                        </div>

                        <p className="mt-4 font-nunito text-[14px] text-[#444444] leading-relaxed mb-6">
                            Esta baya es óptima para elaborar <strong>Poffins</strong> orientados a la condición{" "}
                            <strong style={{ color: contest.color }}>{contest.type}</strong>. El sabor{" "}
                            <strong>{FLAVOR_META[flavorName]?.nameEs}</strong> contribuye directamente a destacar
                            en las Super Contest Shows de Sinnoh.
                        </p>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <span className="font-press-start text-[9px] text-[#888888] uppercase tracking-tighter block mb-2">APPEAL</span>
                                <Hearts count={appeal} delay={0.1} />
                                <span className="font-jetbrains text-[11px] mt-1 block" style={{ color: contest.color }}>{appeal} ❤</span>
                            </div>
                            <div>
                                <span className="font-press-start text-[9px] text-[#888888] uppercase tracking-tighter block mb-2">JAM</span>
                                <Hearts count={jam} delay={0.3} />
                                <span className="font-jetbrains text-[11px] text-[#888888] mt-1 block">{jam} ❤</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT: Smoothness dark box */}
                <div className="md:col-span-4">
                    <div className="border-2 border-[#111111] bg-[#111111] p-6 text-white h-full relative overflow-hidden group" style={{ boxShadow: "4px 4px 0 #111111" }}>
                        <div className="absolute top-[-15px] right-[-15px] opacity-10 group-hover:scale-110 transition-transform duration-500 text-white">
                            <Sparkles size={100} />
                        </div>
                        <h4 className="font-press-start text-[10px] uppercase mb-4 text-[#CC0000]">SMOOTHNESS</h4>
                        <div className="space-y-3">
                            <div className="flex justify-between border-b border-white/10 pb-2">
                                <span className="text-white/40 text-[11px] font-nunito">Base</span>
                                <span className="font-jetbrains text-[14px]" style={{ color: contest.color }}>{berry.smoothness}</span>
                            </div>
                            <div className="flex justify-between border-b border-white/10 pb-2">
                                <span className="text-white/40 text-[11px] font-nunito">Condición</span>
                                <span className="font-nunito font-bold text-[12px]" style={{ color: contest.color }}>{contest.type}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-white/40 text-[11px] font-nunito">Sabor</span>
                                <span className="font-nunito font-bold text-[12px] text-white">{FLAVOR_META[flavorName]?.nameEs}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}