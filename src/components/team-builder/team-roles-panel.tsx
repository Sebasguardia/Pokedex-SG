"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
    Swords, Sparkles, Shield, Heart, Star, Zap,
    RefreshCw, Cloud, Clock, HelpCircle,
    CheckCircle2, AlertTriangle, Info
} from "lucide-react";
import { TeamMember } from "@/types/api/team-builder.types";
import { ROLE_META, PIXEL_URL, TYPE_COLORS } from "@/lib/constants/team-builder.constants";
import { detectRole as detectRoleFn } from "@/lib/utils/team-scoring";

const ROLE_ICONS = {
    physicalSweeper: Swords,
    specialSweeper: Sparkles,
    physicalWall: Shield,
    specialWall: Shield,
    support: Heart,
    lead: Star,
    mixedAttacker: Zap,
    pivot: RefreshCw,
    weatherSetter: Cloud,
    trickRoomSetter: Clock,
};

const ROLE_DESCRIPTIONS: Record<string, string> = {
    physicalSweeper: "Atacante físico. Ejerce presión usando movimientos de Daño Físico de alta potencia.",
    specialSweeper: "Atacante especial. Ejerce presión barriendo al equipo rival con Daño Especial.",
    physicalWall: "Muro físico. Absorbe daño físico gracias a su alta Defensa y protege a aliados.",
    specialWall: "Muro especial. Absorbe daño especial gracias a su alta Defensa Especial.",
    support: "Soporte. Provee utilidad, estados alterados al rival o curación al equipo.",
    lead: "Líder. Ideal para abrir el combate estableciendo hazards o ventajas iniciales.",
    mixedAttacker: "Atacante mixto. Amenaza impredecible que ataca fuerte por ambos frentes.",
    pivot: "Pivote. Controla el momentum del combate entrando y saliendo con ventaja.",
    weatherSetter: "Invocador. Establece un clima beneficioso para la estrategia del equipo.",
    trickRoomSetter: "Control de Campo. Altera el orden de turnos a tu favor usando Espacio Raro.",
};

function RoleCard({ member, index }: { member: TeamMember; index: number }) {
    const role = detectRoleFn(member);
    const meta = ROLE_META[role];
    const Icon = ROLE_ICONS[role] ?? Zap;
    const stats = member.baseStats;
    const totalBST = Object.values(stats).reduce((a, b) => a + b, 0);

    return (
        <motion.div
            className="relative border-2 border-[#111111] bg-white overflow-hidden p-5 group flex flex-col"
            style={{ boxShadow: `4px 4px 0 ${meta.color}` }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
        >
            {/* Fondo decorativo sutil */}
            <div className="absolute top-0 right-0 w-32 h-32 opacity-5 pointer-events-none translate-x-8 -translate-y-8">
                <Icon className="w-full h-full" style={{ color: meta.color }} />
            </div>

            <div className="absolute top-0 left-0 bottom-0 w-[4px]" style={{ backgroundColor: meta.color }} />

            <div className="flex items-start gap-4 mb-3 relative z-10">
                <div className="relative group-hover:scale-110 transition-transform duration-300 cursor-help shrink-0" title={member.nameEs.toUpperCase()}>
                    <div className="absolute inset-0 opacity-20 blur-md rounded-full" style={{ backgroundColor: meta.color }} />
                    <Image
                        src={PIXEL_URL(member.pokemonId)} alt={member.nameEs}
                        width={56} height={56} unoptimized className="object-contain relative z-10"
                        style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" }}
                    />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="font-jetbrains font-bold text-[14px] text-[#111111] leading-tight mb-2 truncate">
                        {member.nameEs}
                    </p>
                    <div
                        className="inline-flex items-center gap-1.5 px-2.5 py-1"
                        style={{ backgroundColor: `${meta.color}15`, borderLeft: `2px solid ${meta.color}` }}
                    >
                        <Icon size={12} style={{ color: meta.color }} />
                        <span className="font-press-start text-[8px] tracking-wide" style={{ color: meta.color }}>
                            {meta.label.toUpperCase()}
                        </span>
                    </div>
                </div>
            </div>

            <p className="font-nunito text-[12px] text-[#666666] leading-snug mb-4 flex-1 relative z-10">
                {ROLE_DESCRIPTIONS[role] || "Pilar importante del equipo."}
            </p>

            {/* Micro Stats Viewer */}
            <div className="mt-auto bg-[#FAFAFA] border border-[#EEEEEE] p-3 relative z-10">
                <div className="flex flex-col gap-2">
                    {[
                        { label: "ATK", value: stats.attack, max: 150, color: "#EF4444" },
                        { label: "SpA", value: stats.specialAttack, max: 150, color: "#3B82F6" },
                        { label: "VEL", value: stats.speed, max: 150, color: "#F59E0B" },
                    ].map(({ label, value, max, color }) => (
                        <div key={label} className="flex items-center gap-2">
                            <span className="font-press-start text-[7px] text-[#888888] w-[20px]">{label}</span>
                            <div className="flex-1 h-[4px] bg-[#E0E0E0] overflow-hidden">
                                <motion.div 
                                    className="h-full"
                                    style={{ backgroundColor: color }}
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${Math.min(100, (value/max)*100)}%` }}
                                    viewport={{once: true}}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                />
                            </div>
                            <span className="font-jetbrains text-[10px] font-bold text-[#111111] w-[20px] text-right">{value}</span>
                        </div>
                    ))}
                </div>
                <div className="mt-2 text-right">
                    <span className="font-press-start text-[8px] text-[#AAAAAA] mr-2">TOTAL BST:</span>
                    <span className="font-jetbrains text-[13px] font-bold text-[#111111]">{totalBST}</span>
                </div>
            </div>
        </motion.div>
    );
}

interface TeamRolesPanelProps {
    members: TeamMember[];
}

export function TeamRolesPanel({ members }: TeamRolesPanelProps) {
    if (members.length === 0) return null;

    const roles = members.map((m) => detectRoleFn(m));
    
    // Análisis de la estructura
    const hasPhysicalAtk = roles.includes("physicalSweeper") || roles.includes("mixedAttacker");
    const hasSpecialAtk = roles.includes("specialSweeper") || roles.includes("mixedAttacker");
    const hasPhysicalWall = roles.includes("physicalWall");
    const hasSpecialWall = roles.includes("specialWall");
    const hasPivot = roles.includes("pivot");
    const hasSupport = roles.includes("support") || roles.includes("weatherSetter") || roles.includes("trickRoomSetter");

    return (
        <section>
            {/* Tarjetas de Rol */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
                {members.map((m, i) => <RoleCard key={m.slot} member={m} index={i} />)}
            </div>

            {/* Diagnóstico Estructural Avanzado */}
            <div className="border-2 border-[#111111] bg-white relative" style={{ boxShadow: "4px 4px 0 #111111" }}>
                <div className="absolute top-0 left-0 bottom-0 w-[6px] bg-[#111111]" />
                <div className="p-5 pl-7 border-b border-[#E0E0E0] bg-[#FAFAFA]">
                    <div className="flex items-center gap-2">
                        <Info size={16} className="text-[#111111]" />
                        <h3 className="font-press-start text-[11px] uppercase text-[#111111]">Diagnóstico Estructural</h3>
                    </div>
                </div>
                
                <div className="p-5 pl-7 grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-dashed divide-[#E0E0E0]">
                    
                    {/* Frente Ofensivo */}
                    <div className="flex flex-col gap-3 pt-4 md:pt-0">
                        <p className="font-press-start text-[9px] text-[#888888] uppercase mb-1">Frente Ofensivo</p>
                        <div className="flex items-start gap-2">
                            {hasPhysicalAtk ? <CheckCircle2 size={14} className="text-[#22C55E] mt-0.5 shrink-0" /> : <AlertTriangle size={14} className="text-[#F59E0B] mt-0.5 shrink-0" />}
                            <p className="font-nunito text-[13px] text-[#444444] leading-tight">
                                {hasPhysicalAtk ? "Presión de daño físico cubierta." : "Falta un atacante físico dedicado (Physical Sweeper/Mixed)."}
                            </p>
                        </div>
                        <div className="flex items-start gap-2">
                            {hasSpecialAtk ? <CheckCircle2 size={14} className="text-[#22C55E] mt-0.5 shrink-0" /> : <AlertTriangle size={14} className="text-[#F59E0B] mt-0.5 shrink-0" />}
                            <p className="font-nunito text-[13px] text-[#444444] leading-tight">
                                {hasSpecialAtk ? "Presión de daño especial cubierta." : "Falta un atacante especial dedicado (Special Sweeper/Mixed)."}
                            </p>
                        </div>
                    </div>

                    {/* Core Defensivo */}
                    <div className="flex flex-col gap-3 pt-4 md:pt-0 md:pl-6">
                        <p className="font-press-start text-[9px] text-[#888888] uppercase mb-1">Core Defensivo</p>
                        <div className="flex items-start gap-2">
                            {hasPhysicalWall ? <CheckCircle2 size={14} className="text-[#22C55E] mt-0.5 shrink-0" /> : <Info size={14} className="text-[#3B82F6] mt-0.5 shrink-0" />}
                            <p className="font-nunito text-[13px] text-[#444444] leading-tight">
                                {hasPhysicalWall ? "Muro físico sólido detectado." : "Tu equipo podría sufrir ante atacantes físicos pesados."}
                            </p>
                        </div>
                        <div className="flex items-start gap-2">
                            {hasSpecialWall ? <CheckCircle2 size={14} className="text-[#22C55E] mt-0.5 shrink-0" /> : <Info size={14} className="text-[#3B82F6] mt-0.5 shrink-0" />}
                            <p className="font-nunito text-[13px] text-[#444444] leading-tight">
                                {hasSpecialWall ? "Muro especial detectado." : "Tu equipo es vulnerable a ráfagas de daño especial."}
                            </p>
                        </div>
                    </div>

                    {/* Utilidad y Momentum */}
                    <div className="flex flex-col gap-3 pt-4 md:pt-0 md:pl-6">
                        <p className="font-press-start text-[9px] text-[#888888] uppercase mb-1">Utilidad y Ritmo</p>
                        <div className="flex items-start gap-2">
                            {hasPivot ? <CheckCircle2 size={14} className="text-[#22C55E] mt-0.5 shrink-0" /> : <Info size={14} className="text-[#8B5CF6] mt-0.5 shrink-0" />}
                            <p className="font-nunito text-[13px] text-[#444444] leading-tight">
                                {hasPivot ? "Excelente control de momentum (Pivote)." : "Considera añadir un Pokémon que actúe como pivote."}
                            </p>
                        </div>
                        <div className="flex items-start gap-2">
                            {hasSupport ? <CheckCircle2 size={14} className="text-[#22C55E] mt-0.5 shrink-0" /> : <Info size={14} className="text-[#8B5CF6] mt-0.5 shrink-0" />}
                            <p className="font-nunito text-[13px] text-[#444444] leading-tight">
                                {hasSupport ? "Herramientas de soporte cubiertas." : "Podrías necesitar apoyo para limpiar hazards o curar."}
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}