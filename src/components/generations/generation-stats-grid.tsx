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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 260, damping: 22, delay }}
        >
            <motion.div
                className="relative bg-white border-4 border-[#111111] p-5 pt-8 flex flex-col items-center gap-3 h-full"
                style={{ boxShadow: `6px 6px 0 ${genColor}` }}
                whileHover={{
                    x: 3,
                    y: 3,
                    boxShadow: `3px 3px 0 ${genColor}`,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
                {/* Etiqueta flotante brutalista */}
                <div className="absolute top-[-16px] left-4 bg-[#111111] px-3 py-1.5 z-20">
                    <span className="font-['Press_Start_2P'] text-[8px] text-white uppercase tracking-widest whitespace-nowrap leading-none block">
                        {label}
                    </span>
                </div>

                {/* Watermark decorativo */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                    {decorIcon && (
                        <div
                            className="absolute right-[-6px] bottom-[-6px] opacity-[0.05] scale-[2.5] origin-bottom-right"
                            style={{ color: genColor }}
                        >
                            {decorIcon}
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center gap-3 w-full">
                    {/* Ícono en caja brutalista */}
                    <div
                        className="w-11 h-11 border-[3px] border-[#111111] flex items-center justify-center bg-white transition-all group-hover:translate-x-[1px] group-hover:translate-y-[1px]"
                        style={{
                            backgroundColor: `${genColor}15`,
                            boxShadow: `3px 3px 0 #111111`,
                        }}
                    >
                        <span style={{ color: genColor }}>{icon}</span>
                    </div>

                    {value !== null ? (
                        <NumberFlow
                            value={value}
                            className="font-['Press_Start_2P'] text-[22px] text-[#111111] tracking-tighter"
                        />
                    ) : (
                        <span className="font-['Press_Start_2P'] text-[22px] text-[#888888]">---</span>
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
                        <div className="h-full">{card}</div>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                        <Tooltip.Content
                            className="bg-[#111111] text-white font-['Nunito'] font-bold text-[11px] px-3 py-2 max-w-[220px] text-center z-50 border-2 border-[#CC0000]"
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
            {/* Section header con cuadradito rojo */}
            <div className="flex items-center gap-3 mb-7">
                <span className="w-3 h-3 bg-[#CC0000] shrink-0" />
                <h2 className="font-['Press_Start_2P'] text-[13px] uppercase tracking-tighter text-[#111111] whitespace-nowrap">
                    Resumen
                </h2>
                <div className="h-[3px] bg-[#111111] flex-1" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-5">
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