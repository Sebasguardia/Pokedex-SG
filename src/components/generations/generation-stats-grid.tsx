"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import NumberFlow from "@number-flow/react";
import { Sparkles, Zap, Eye, Gamepad2 } from "lucide-react";
import { Generation } from "@/types/api/generation.types";
import * as Tooltip from "@radix-ui/react-tooltip";

interface GenerationStatsGridProps {
    generation: Generation;
    genColor: string;
    mascot: { name: string; id: number };
}

interface StatCardProps {
    label: string;
    value: number | null;
    icon: React.ReactNode;
    genColor: string;
    delay?: number;
    tooltip?: string;
    decorIcon?: React.ReactNode;
}

function StatCard({ label, value, icon, genColor, delay = 0, tooltip, decorIcon }: StatCardProps) {
    const card = (
        <motion.div
            className="group relative h-full"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay }}
        >
            {/* The actual card */}
            <motion.div
                className="relative bg-white border-2 border-[#111111] p-5 pt-7 flex flex-col items-center gap-3 h-full"
                style={{ boxShadow: `4px 4px 0 ${genColor}` }}
                whileHover={{ 
                    x: 2, 
                    y: 2, 
                    boxShadow: `2px 2px 0 ${genColor}` 
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
                {/* Etiqueta flotante */}
                <div className="absolute top-[-14px] left-4 bg-[#111111] px-3 py-1 z-20">
                    <span className="font-press-start text-[8.5px] text-white uppercase tracking-widest whitespace-nowrap leading-none py-0.5 block">
                        {label}
                    </span>
                </div>

                {/* Sub-container for clipped watermark */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 rounded-[inherit]">
                    {decorIcon && (
                        <div 
                            className="absolute right-[-8px] bottom-[-8px] opacity-[0.04] scale-[2.5] origin-bottom-right"
                            style={{ color: genColor }}
                        >
                            {decorIcon}
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center gap-3 w-full">
                    {/* Ícono principal con fondo sutil */}
                    <div
                        className="w-10 h-10 border-2 border-[#111111] flex items-center justify-center bg-white shadow-[2px_2px_0_#111111] group-hover:shadow-[1px_1px_0_#111111] group-hover:translate-x-[0.5px] group-hover:translate-y-[0.5px] transition-all"
                        style={{ backgroundColor: `${genColor}10` }}
                    >
                        <span style={{ color: genColor }}>{icon}</span>
                    </div>

                    {value !== null ? (
                        <NumberFlow
                            value={value}
                            className="font-press-start text-[23px] text-[#111111] tracking-tighter"
                        />
                    ) : (
                        <span className="font-press-start text-[23px] text-[#888888]">---</span>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );

    if (tooltip) {
        return (
            <Tooltip.Provider delayDuration={200}>
                <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                        <div className="h-full">
                            {card}
                        </div>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                        <Tooltip.Content
                            className="bg-[#111111] text-white font-nunito text-[11px] px-3 py-2 max-w-[220px] text-center z-50 animate-in fade-in zoom-in-95 duration-150"
                            sideOffset={6}
                        >
                            {tooltip}
                            <Tooltip.Arrow className="fill-[#111111]" />
                        </Tooltip.Content>
                    </Tooltip.Portal>
                </Tooltip.Root>
            </Tooltip.Provider>
        );
    }

    return card;
}

export function GenerationStatsGrid({ generation, genColor, mascot }: GenerationStatsGridProps) {
    const showAbilities = generation.id >= 3;
    const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${mascot.id}.png`;

    return (
        <section>
            {/* Section header */}
            <div className="flex items-center gap-4 mb-6">
                <h2 className="font-press-start text-[14px] uppercase tracking-tighter text-[#111111] whitespace-nowrap">
                    Resumen
                </h2>
                <div className="h-px bg-[#E0E0E0] flex-1" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 pt-3">
                {/* Pokémon */}
                <StatCard
                    label="Pokémon"
                    value={generation.pokemon_species.length}
                    genColor={genColor}
                    delay={0}
                    decorIcon={<Sparkles size={20} />}
                    icon={
                        <Image src={spriteUrl} alt={mascot.name} width={28} height={28} className="object-contain" />
                    }
                />

                {/* Movimientos */}
                <StatCard
                    label="Movimientos"
                    value={generation.moves.length}
                    genColor={genColor}
                    delay={0.08}
                    decorIcon={<Zap size={20} />}
                    icon={<Zap size={18} />}
                />

                {/* Habilidades */}
                <StatCard
                    label="Habilidades"
                    value={showAbilities ? generation.abilities.length : null}
                    genColor={genColor}
                    delay={0.16}
                    decorIcon={<Eye size={20} />}
                    icon={<Eye size={18} />}
                    tooltip={
                        !showAbilities
                            ? "Las habilidades se introducen en la Generación III (Rubí / Zafiro)."
                            : undefined
                    }
                />

                {/* Versiones */}
                <StatCard
                    label="Versiones"
                    value={generation.version_groups.length}
                    genColor={genColor}
                    delay={0.24}
                    decorIcon={<Gamepad2 size={20} />}
                    icon={<Gamepad2 size={18} />}
                />
            </div>
        </section>
    );
}