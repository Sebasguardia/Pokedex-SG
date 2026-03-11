"use client"

import { motion } from "framer-motion"
import { Swords, MapPin, Zap, Info } from "lucide-react"
import * as Tooltip from "@radix-ui/react-tooltip"

interface Props {
    ability: any
    typeColor: string
}

export function AbilityEffectPanel({ ability, typeColor }: Props) {
    const esEffect = ability.effect_entries?.find((e: any) => e.language.name === "es")?.effect
    const enEffect = ability.effect_entries?.find((e: any) => e.language.name === "en")?.effect
    const esFlavor = ability.flavor_text_entries?.find((e: any) => e.language.name === "es")?.flavor_text
    const enFlavor = ability.flavor_text_entries?.find((e: any) => e.language.name === "en")?.flavor_text

    // For demonstration, we'll split or mock the Adventure effect if not present
    const combatEffect = esEffect || enEffect || esFlavor || enFlavor || "No hay descripción detallada disponible."
    const adventureEffect = "Esta habilidad no tiene efectos conocidos fuera del combate o en el mapa."

    return (
        <section className="py-12">
            <div className="flex items-center gap-3 mb-8">
                <h2 className="font-press-start text-[14px] text-[#111111] uppercase tracking-tighter">PERFIL DINÁMICO</h2>
                <div className="h-px bg-[#E0E0E0] flex-1" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* COMBAT EFFECT */}
                <div className="md:col-span-8">
                    <div className="border-2 border-[#111111] bg-white p-6 relative h-full">
                        <div className="absolute top-[-14px] left-4 bg-[#111111] px-3 py-1 flex items-center gap-2 text-white font-nunito font-bold text-[12px] uppercase">
                            <Swords size={14} />
                            EFECTO EN COMBATE
                        </div>

                        <div className="mt-4 font-nunito text-[14px] text-[#444444] leading-relaxed">
                            {/* In a real implementation, we would parse the text for mechanics and add Tooltips */}
                            {combatEffect}
                        </div>

                        <div className="mt-8 flex items-center gap-2 p-3 bg-[#F8F8F8] border border-[#E0E0E0] rounded-sm italic font-nunito text-[12px] text-[#888888]">
                            <Info size={14} className="text-[#CC0000]" />
                            <span>Los efectos pueden variar ligeramente según la versión del juego.</span>
                        </div>
                    </div>
                </div>

                {/* ADVENTURE / META INFO */}
                <div className="md:col-span-4 flex flex-col gap-6">
                    <div className="border-2 border-[#111111] bg-white p-6 relative">
                        <div className="absolute top-[-14px] left-4 bg-[#111111] px-3 py-1 flex items-center gap-2 text-white font-nunito font-bold text-[12px] uppercase">
                            <MapPin size={14} />
                            MAPA / AVENTURA
                        </div>
                        <p className="mt-4 font-nunito text-[13px] text-[#666666] leading-relaxed">
                            {adventureEffect}
                        </p>
                    </div>

                    <div className="border-2 border-[#111111] bg-[#111111] p-6 text-white overflow-hidden relative group">
                        <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:scale-110 transition-transform">
                            <Zap size={64} />
                        </div>
                        <h4 className="font-press-start text-[10px] uppercase mb-4 text-[#CC0000]">ESPECIFICACIONES</h4>
                        <div className="space-y-3">
                            <div className="flex justify-between border-b border-white/10 pb-2">
                                <span className="text-white/40 text-[11px] font-nunito">Índice</span>
                                <span className="font-jetbrains text-[12px]">#{ability.id}</span>
                            </div>
                            <div className="flex justify-between border-b border-white/10 pb-2">
                                <span className="text-white/40 text-[11px] font-nunito">Generación</span>
                                <span className="font-nunito font-bold text-[12px] capitalize">{ability.generation?.name.replace("-", " ")}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-white/40 text-[11px] font-nunito">Modificable</span>
                                <span className="font-nunito font-bold text-[12px] text-green-400">SI</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
