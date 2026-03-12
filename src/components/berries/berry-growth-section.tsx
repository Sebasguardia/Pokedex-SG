"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Clock, Leaf, Gem, Droplets, Sparkles, Ruler, Sprout } from "lucide-react";
import NumberFlow from "@number-flow/react";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { GiFlowerPot, GiStrawberry } from "react-icons/gi";
import { FIRMNESS_COLORS } from "@/lib/constants/berries.constants";

const FIRMNESS_RANK: Record<string, number> = {
    "very-soft": 1, "soft": 2, "hard": 3, "very-hard": 4, "super-hard": 5,
};

interface BerryGrowthSectionProps {
    berry: any;
    flavorColor: string;
}

// Card — green hover accent (not black like rest of app)
const CARD_CLS =
    "bg-white border-2 border-[#E0E0E0] p-5 pt-7 relative " +
    "transition-all duration-200 hover:border-[#16A34A] hover:shadow-[4px_4px_0_#16A34A]";

export function BerryGrowthSection({ berry, flavorColor }: BerryGrowthSectionProps) {
    const prefersRM = useReducedMotion();
    const totalGrowth = berry.growth_time * 4;
    const firmnessRank = FIRMNESS_RANK[berry.firmness.name] ?? 3;
    const firmnessColor = FIRMNESS_COLORS[berry.firmness.name] ?? "#111";

    return (
        <section>
            {/* Section header */}
            <div className="flex items-center gap-3 mb-8">
                <h2 className="font-press-start text-[14px] text-[#111111] uppercase tracking-tighter">CULTIVO</h2>
                <div className="h-px bg-[#E0E0E0] flex-1" />
            </div>

            {/* 6-card grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">

                {/* 1 – Growth time */}
                <div className={CARD_CLS}>
                    <div className="absolute top-[-13px] left-4 bg-[#16A34A] px-3 py-1 flex items-center gap-2 text-white font-nunito font-bold text-[10px] uppercase z-10 border-2 border-[#16A34A]">
                        <Clock size={11} /> FASES
                    </div>
                    <div className="mt-3">
                        <div className="font-press-start text-[18px] text-[#111111] flex items-baseline gap-1">
                            <NumberFlow value={berry.growth_time} transformTiming={{ duration: prefersRM ? 0 : 600 }} />
                            <span className="font-nunito text-[11px] text-[#888888]">h/fase</span>
                        </div>
                        <p className="font-nunito text-[11px] text-[#888888] mt-1 opacity-80">Total: {totalGrowth}h hasta madurar</p>
                        <div className="flex justify-between items-end mt-4 h-9">
                            {[
                                { Icon: Sprout, size: 14, color: "#16A34A" },
                                { Icon: Leaf, size: 18, color: "#16A34A" },
                                { Icon: GiFlowerPot, size: 22, color: "#16A34A" },
                                { Icon: GiStrawberry, size: 26, color: "#CC0000" }
                            ].map((item, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ scale: 0, y: 8 }}
                                    whileInView={{ scale: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ type: "spring", delay: prefersRM ? 0 : 0.2 + i * 0.1 }}
                                >
                                    <item.Icon size={item.size} style={{ color: item.color }} />
                                </motion.span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 2 – Max harvest */}
                <div className={CARD_CLS}>
                    <div className="absolute top-[-13px] left-4 bg-[#16A34A] px-3 py-1 flex items-center gap-2 text-white font-nunito font-bold text-[10px] uppercase z-10 border-2 border-[#16A34A]">
                        <Leaf size={11} /> COSECHA
                    </div>
                    <div className="mt-3">
                        <div className="font-press-start text-[18px] text-[#111111] flex items-baseline gap-1">
                            <NumberFlow value={berry.max_harvest} transformTiming={{ duration: prefersRM ? 0 : 600 }} />
                            <span className="font-nunito text-[11px] text-[#888888]">bayas</span>
                        </div>
                        <p className="font-nunito text-[11px] text-[#888888] mt-1 opacity-80">Cantidad máxima obtenible</p>
                        <div className="flex flex-wrap gap-1.5 mt-4 min-h-[24px]">
                            {Array.from({ length: Math.min(berry.max_harvest, 8) }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ type: "spring", bounce: 0.65, delay: prefersRM ? 0 : 0.2 + i * 0.05 }}
                                    className="w-2.5 h-2.5 rounded-full"
                                    style={{ backgroundColor: flavorColor }}
                                />
                            ))}
                            {berry.max_harvest > 8 && (
                                <span className="font-jetbrains text-[9px] text-[#888888]">+{berry.max_harvest - 8}</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* 3 – Firmness */}
                <div className={CARD_CLS}>
                    <div
                        className="absolute top-[-13px] left-4 px-3 py-1 flex items-center gap-2 text-white font-nunito font-bold text-[10px] uppercase z-10 border-2"
                        style={{ backgroundColor: firmnessColor, borderColor: firmnessColor }}
                    >
                        <Gem size={11} /> FIRMEZA
                    </div>
                    <div className="mt-3">
                        <div className="font-press-start text-[13px] capitalize" style={{ color: firmnessColor }}>
                            {berry.firmness.name.replace(/-/g, " ")}
                        </div>
                        <p className="font-nunito text-[11px] text-[#888888] mt-1 opacity-80">Influye en calidad de Poffins</p>
                        <div className="flex gap-[3px] mt-4">
                            {Array.from({ length: 5 }).map((_, i) => {
                                const filled = i < firmnessRank;
                                return (
                                    <motion.div
                                        key={i}
                                        initial={filled ? { scaleY: 0 } : {}}
                                        whileInView={filled ? { scaleY: 1 } : {}}
                                        viewport={{ once: true }}
                                        transition={{ delay: prefersRM ? 0 : 0.3 + i * 0.08 }}
                                        className="h-2.5 flex-1 origin-bottom"
                                        style={{ backgroundColor: filled ? firmnessColor : "#E0E0E0" }}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* 4 – Soil dryness */}
                <div className={CARD_CLS}>
                    <div className="absolute top-[-13px] left-4 bg-[#2563EB] px-3 py-1 flex items-center gap-2 text-white font-nunito font-bold text-[10px] uppercase z-10 border-2 border-[#2563EB]">
                        <Droplets size={11} /> SOIL DRYNESS
                    </div>
                    <div className="mt-3">
                        <div className="font-press-start text-[18px] text-[#111111] flex items-baseline gap-1">
                            {berry.soil_dryness}
                            <span className="font-nunito text-[11px] text-[#888888]">/ hora</span>
                        </div>
                        <p className="font-nunito text-[11px] text-[#888888] mt-1 opacity-80">Velocidad a la que seca la tierra</p>
                        <div className="flex gap-1.5 mt-4 flex-wrap">
                            {Array.from({ length: Math.min(berry.soil_dryness, 6) }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ type: "spring", delay: prefersRM ? 0 : 0.2 + i * 0.06 }}
                                >
                                    <Droplets size={14} className="text-blue-400" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 5 – Smoothness */}
                <div className={CARD_CLS}>
                    <div className="absolute top-[-13px] left-4 bg-purple-600 px-3 py-1 flex items-center gap-2 text-white font-nunito font-bold text-[10px] uppercase z-10 border-2 border-purple-600">
                        <Sparkles size={11} /> SMOOTHNESS
                    </div>
                    <div className="mt-3">
                        <div className="font-press-start text-[18px] text-purple-700">
                            <NumberFlow value={berry.smoothness} transformTiming={{ duration: prefersRM ? 0 : 600 }} />
                        </div>
                        <p className="font-nunito text-[11px] text-[#888888] mt-1 opacity-80">Calidad del Poffin resultante</p>
                        <div className="w-full h-2 bg-[#F2F2F2] overflow-hidden mt-4">
                            <motion.div
                                className="h-full bg-gradient-to-r from-purple-400 to-purple-700"
                                initial={{ width: 0 }}
                                whileInView={{ width: `${(berry.smoothness / 40) * 100}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: prefersRM ? 0 : 0.7, delay: 0.3 }}
                            />
                        </div>
                    </div>
                </div>

                {/* 6 – Size */}
                <div className={CARD_CLS}>
                    <div className="absolute top-[-13px] left-4 bg-orange-500 px-3 py-1 flex items-center gap-2 text-white font-nunito font-bold text-[10px] uppercase z-10 border-2 border-orange-500">
                        <Ruler size={11} /> TAMAÑO
                    </div>
                    <div className="mt-3">
                        <div className="font-press-start text-[18px] text-[#111111] flex items-baseline gap-1">
                            <NumberFlow value={berry.size} transformTiming={{ duration: prefersRM ? 0 : 600 }} />
                            <span className="font-nunito text-[11px] text-[#888888]">mm</span>
                        </div>
                        <p className="font-nunito text-[11px] text-[#888888] mt-1 opacity-80">Tamaño físico promedio</p>
                        <div className="flex items-end gap-3 mt-4">
                            <div className="flex flex-col items-center gap-1">
                                <div className="rounded-full bg-[#E0E0E0] border border-[#888888]" style={{ width: 16, height: 16 }} />
                                <span className="font-jetbrains text-[7px] text-[#888888]">20mm</span>
                            </div>
                            <div className="flex flex-col items-center gap-1">
                                <motion.div
                                    className="rounded-full border border-black/10"
                                    style={{
                                        width: Math.min(Math.max((berry.size / 20) * 16, 8), 40),
                                        height: Math.min(Math.max((berry.size / 20) * 16, 8), 40),
                                        backgroundColor: flavorColor,
                                    }}
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ type: "spring", delay: prefersRM ? 0 : 0.3 }}
                                />
                                <span className="font-jetbrains text-[7px] text-[#888888]">{berry.size}mm</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Growing guide accordion */}
            <Accordion.Root type="single" collapsible>
                <Accordion.Item value="guide" className="border-2 border-[#111111] overflow-hidden">
                    <Accordion.Header>
                        <Accordion.Trigger className="w-full flex items-center justify-between p-4 bg-[#F2F2F2] hover:bg-[#E8E8E8] transition-colors font-press-start text-[9px] text-[#111111] uppercase tracking-tighter group">
                            ¿CÓMO CULTIVAR ESTA BAYA?
                            <ChevronDown size={14} className="transition-transform duration-200 group-data-[state=open]:rotate-180 text-[#888888]" />
                        </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up bg-white">
                        <div className="p-5 flex flex-col gap-3">
                            {[
                                "Planta la semilla en tierra especial apta para bayas.",
                                `Cuídala y riégala cada ${berry.growth_time}h durante las 4 fases de crecimiento.`,
                                `Cosecha tras ${totalGrowth}h para obtener entre 2 y ${berry.max_harvest} bayas según tus cuidados.`,
                            ].map((step, i) => (
                                <div key={i} className="flex items-start gap-3 font-nunito text-[13px] text-[#444444]">
                                    <span className="bg-[#CC0000] text-white px-2 py-0.5 font-press-start text-[8px] shrink-0 mt-0.5">
                                        {i + 1}
                                    </span>
                                    {step}
                                </div>
                            ))}
                        </div>
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion.Root>
        </section>
    );
}