"use client"

import { motion } from "framer-motion"
import * as Accordion from "@radix-ui/react-accordion"
import { Clock, ChevronDown, AlertTriangle, ArrowRight } from "lucide-react"
import { TypeRelations, TypeRelationsPast } from "@/types/api/type.types"
import { EffectivenessChip } from "./effectiveness-chip"

interface Props {
    pastRelations: TypeRelationsPast[]
    currentRelations: TypeRelations
    typeColor: string
}

export function TypeHistoryAccordion({ pastRelations, currentRelations, typeColor }: Props) {
    if (!pastRelations || pastRelations.length === 0) return null

    return (
        <section className="py-10">
            <Accordion.Root type="single" collapsible className="w-full">
                <Accordion.Item value="history" className="border-2 border-[#111111] bg-white overflow-hidden" style={{ boxShadow: "4px 4px 0 #111111" }}>
                    <Accordion.Header className="flex">
                        <Accordion.Trigger className="group flex-1 flex items-center justify-between px-6 py-4 outline-none hover:bg-[#FAFAFA] transition-colors">
                            <div className="flex items-center gap-3">
                                <span className="w-2.5 h-2.5 bg-[#CC0000] block shrink-0" />
                                <Clock size={16} className="text-[#111111]" />
                                <span className="font-['Press_Start_2P'] text-[10px] text-[#111111] pt-1 tracking-wider">CAMBIOS HISTÓRICOS DE EFECTIVIDAD</span>
                            </div>
                            <ChevronDown size={16} className="text-[#111111] transition-transform duration-300 group-data-[state=open]:rotate-180" />
                        </Accordion.Trigger>
                    </Accordion.Header>

                    <Accordion.Content className="overflow-hidden data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown">
                        <div className="p-6 pt-0 border-t border-[#E0E0E0]">
                            <div className="mb-8 mt-4 font-['Nunito'] text-[13px] text-[#444444]">
                                Las debilidades y resistencias de este tipo han cambiado a lo largo de las generaciones.
                            </div>

                            {pastRelations.map((past, i) => {
                                const genLabel = past.generation.name.split("-")[1]?.toUpperCase() || "I"

                                // Extracción de viejas y nuevas efectividades
                                const oldDoubleFrom = past.damage_relations.double_damage_from
                                const oldHalfFrom = past.damage_relations.half_damage_from
                                const oldNoFrom = past.damage_relations.no_damage_from

                                return (
                                    <div key={i} className="mb-10 last:mb-0">
                                        <div className="inline-flex items-center gap-3 mb-4">
                                            <span
                                                className="bg-[#111111] text-white font-['JetBrains_Mono'] text-[12px] font-bold px-3 py-1.5 border-l-4"
                                                style={{ borderColor: typeColor }}
                                            >
                                                Gen {genLabel}
                                            </span>
                                            <span className="font-['Nunito'] text-[12px] font-bold text-[#888888]">Efectividad previa a Generación {genLabel}</span>
                                        </div>

                                        <div className="w-full border-2 border-[#111111] bg-white overflow-x-auto" style={{ boxShadow: "2px 2px 0 #111111" }}>
                                            <table className="w-full text-left font-['Nunito'] text-[12px] min-w-[600px]">
                                                <thead>
                                                    <tr className="bg-[#111111] border-b-2 border-[#111111] text-white">
                                                        <th className="p-3 font-bold">Relación Defensiva</th>
                                                        <th className="p-3 font-bold text-center">Antes (Gen {genLabel})</th>
                                                        <th className="p-3 text-center"></th>
                                                        <th className="p-3 font-bold text-center">Ahora</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {/* Row: Vulnerable */}
                                                    {oldDoubleFrom.length > 0 && (
                                                        <tr className="border-b border-[#E0E0E0] hover:bg-[#FAFAFA]">
                                                            <td className="p-4 font-bold uppercase text-[10px] text-[#DC2626]">Vulnerable a (×2)</td>
                                                            <td className="p-4 text-center">
                                                                <div className="flex flex-wrap justify-center gap-1">
                                                                    {oldDoubleFrom.map((t: any) => (
                                                                        <EffectivenessChip key={t.name} typeName={t.name} multiplier={2} baseTypeColor={typeColor} context="defense" index={0} />
                                                                    ))}
                                                                </div>
                                                            </td>
                                                            <td className="p-4 text-center text-[#888888]"><ArrowRight size={14} className="inline-block" /></td>
                                                            <td className="p-4 text-center">
                                                                <div className="flex flex-wrap justify-center gap-1">
                                                                    {currentRelations.double_damage_from.map((t: any) => (
                                                                        <EffectivenessChip key={t.name} typeName={t.name} multiplier={2} baseTypeColor={typeColor} context="defense" index={0} />
                                                                    ))}
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )}

                                                    {/* Row: Resist */}
                                                    {oldHalfFrom.length > 0 && (
                                                        <tr className="border-b border-[#E0E0E0] hover:bg-[#FAFAFA]">
                                                            <td className="p-4 font-bold uppercase text-[10px] text-[#16A34A]">Resiste a (×0.5)</td>
                                                            <td className="p-4 text-center">
                                                                <div className="flex flex-wrap justify-center gap-1">
                                                                    {oldHalfFrom.map((t: any) => (
                                                                        <EffectivenessChip key={t.name} typeName={t.name} multiplier={0.5} baseTypeColor={typeColor} context="defense" index={0} />
                                                                    ))}
                                                                </div>
                                                            </td>
                                                            <td className="p-4 text-center text-[#888888]"><ArrowRight size={14} className="inline-block" /></td>
                                                            <td className="p-4 text-center">
                                                                <div className="flex flex-wrap justify-center gap-1">
                                                                    {currentRelations.half_damage_from.map((t: any) => (
                                                                        <EffectivenessChip key={t.name} typeName={t.name} multiplier={0.5} baseTypeColor={typeColor} context="defense" index={0} />
                                                                    ))}
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )}

                                                    {/* Row: Immune */}
                                                    {(oldNoFrom.length > 0 || currentRelations.no_damage_from.length > oldNoFrom.length) && (
                                                        <tr className="border-b border-[#E0E0E0] hover:bg-[#FAFAFA]">
                                                            <td className="p-4 font-bold uppercase text-[10px] text-[#111111]">Inmune a (×0)</td>
                                                            <td className="p-4 text-center">
                                                                <div className="flex flex-wrap justify-center gap-1">
                                                                    {oldNoFrom.map((t: any) => (
                                                                        <EffectivenessChip key={t.name} typeName={t.name} multiplier={0} baseTypeColor={typeColor} context="defense" index={0} />
                                                                    ))}
                                                                    {oldNoFrom.length === 0 && <span className="text-[#888888] italic">Ninguno</span>}
                                                                </div>
                                                            </td>
                                                            <td className="p-4 text-center text-[#888888]"><ArrowRight size={14} className="inline-block" /></td>
                                                            <td className="p-4 text-center">
                                                                <div className="flex flex-wrap justify-center gap-1">
                                                                    {currentRelations.no_damage_from.map((t: any) => (
                                                                        <EffectivenessChip key={t.name} typeName={t.name} multiplier={0} baseTypeColor={typeColor} context="defense" index={0} />
                                                                    ))}
                                                                    {currentRelations.no_damage_from.length === 0 && <span className="text-[#888888] italic">Ninguno</span>}
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )
                            })}

                            <div className="mt-8 flex items-start gap-4 border-2 border-[#111111] bg-[#FFFBEB] p-5 shadow-[4px_4px_0_#F59E0B]">
                                <AlertTriangle size={24} className="text-[#D97706] mt-0.5 shrink-0" />
                                <div className="space-y-1">
                                    <h4 className="font-['Press_Start_2P'] text-[9px] text-[#D97706] leading-relaxed tracking-wider">DISCREPANCIAS DE GEN 1</h4>
                                    <p className="font-['Nunito'] text-[12px] text-[#92400E] leading-relaxed">
                                        Debido a los históricos bugs en el código de Pokémon Rojo y Azul, algunas de estas dinámicas fallaban frecuentemente. Las efectividades fueron reescritas y normalizadas a partir de la Generación II.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion.Root>
        </section>
    )
}
