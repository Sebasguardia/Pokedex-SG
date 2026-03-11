"use client"

import { motion } from "framer-motion"
import { TYPE_COLORS, TYPE_ICON } from "@/lib/constants/types.constants"
import * as Tooltip from "@radix-ui/react-tooltip"

interface EffectivenessChipProps {
    typeName: string;
    multiplier: number;
    baseTypeColor: string;
    context: "attack" | "defense";
    index: number;
}

export function EffectivenessChip({ typeName, multiplier, baseTypeColor, context, index }: EffectivenessChipProps) {
    const Icon = TYPE_ICON[typeName as keyof typeof TYPE_ICON]
    const color = TYPE_COLORS[typeName] || "#111111"
    const multiStr = multiplier === 0.5 ? "0.5" : multiplier === 2 ? "2" : "0"

    // Custom states
    const isVulnerable = context === "defense" && multiplier === 2;
    const isResistant = context === "defense" && multiplier === 0.5;
    const isImmune = context === "defense" && multiplier === 0;

    const isNotVeryEffective = context === "attack" && multiplier === 0.5;
    const isNoEffect = context === "attack" && multiplier === 0;

    return (
        <Tooltip.Provider delayDuration={200}>
            <Tooltip.Root>
                <Tooltip.Trigger asChild>
                    <motion.div
                        className="relative inline-flex cursor-default my-2 mx-1 select-none"
                        initial={{ opacity: 0, x: -15 }}
                        whileInView={{ opacity: isNoEffect ? 0.4 : isNotVeryEffective ? 0.7 : 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.04, type: "spring", bounce: 0.4 }}
                        whileHover={{ scale: 1.05, boxShadow: "2px 2px 0px #111111" }}
                        style={{ filter: isNoEffect ? "grayscale(100%)" : "none" }}
                    >
                        {/* The main chip */}
                        <div
                            className="flex items-center gap-1.5 px-2.5 py-1.5 border-2 border-[#111111]"
                            style={{ backgroundColor: color }}
                        >
                            {Icon && <Icon size={12} className="text-white" />}
                            <span className="font-nunito text-[11px] font-bold text-white uppercase">{typeName}</span>
                        </div>

                        {/* The multiplier badge */}
                        <div className="absolute -top-2 -right-2 bg-black text-white font-jetbrains text-[9px] px-1 border border-white z-10">
                            ×{multiStr}
                        </div>

                        {/* Special Effects Overlays */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
                            {/* "Not very effective" diagonal strikethrough using SVG for containment */}
                            {isNotVeryEffective && (
                                <svg className="w-full h-full">
                                    <motion.line
                                        x1="0" y1="100%" x2="100%" y2="0"
                                        stroke="rgba(0,0,0,0.6)"
                                        strokeWidth="2"
                                        initial={{ pathLength: 0 }}
                                        whileInView={{ pathLength: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.04 + 0.2, duration: 0.3, ease: "easeOut" }}
                                    />
                                </svg>
                            )}

                            {/* "No effect" cross centered */}
                            {isNoEffect && (
                                <motion.div
                                    className="absolute inset-0 flex items-center justify-center font-bold text-black text-[16px] bg-black/10"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.04 + 0.2, type: "spring", bounce: 0.6 }}
                                >
                                    ✕
                                </motion.div>
                            )}
                        </div>

                        {/* Defensive indicators */}
                        {isVulnerable && (
                            <motion.div
                                className="absolute -inset-1 z-0 pointer-events-none"
                                animate={{ boxShadow: [`0 0 0 2px ${color}`, `0 0 0 6px ${color}00`, `0 0 0 2px ${color}`] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            />
                        )}

                        {isResistant && (
                            <motion.div
                                className="absolute -top-1 -left-1 z-20 bg-green-500 text-white rounded-full p-[1px]"
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 + 0.2, type: "spring" }}
                            >
                                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>
                            </motion.div>
                        )}

                        {isImmune && (
                            <motion.div
                                className="absolute inset-0 border-2 border-black bg-black/80 z-20 flex items-center justify-center p-1"
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 + 0.1, type: "spring", bounce: 0.6 }}
                            >
                                <svg width="14" height="14" className="text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                            </motion.div>
                        )}
                    </motion.div>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                    <Tooltip.Content
                        className="bg-[#111111] text-white px-3 py-2 text-[12px] font-nunito leading-relaxed z-[1000] border border-white/10 shadow-xl"
                        sideOffset={5}
                    >
                        <div className="font-bold mb-1">Efectividad ×{multiStr}</div>
                        <div className="text-white/70">
                            {context === "attack" ? `Este tipo de ataques hacen daño ×${multiStr} a los Pokémon Tipo ${typeName}.` : `Los ataques Tipo ${typeName} le hacen daño ×${multiStr} a este Pokémon.`}
                        </div>
                        <Tooltip.Arrow className="fill-[#111111]" />
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip.Root>
        </Tooltip.Provider>
    );
}
