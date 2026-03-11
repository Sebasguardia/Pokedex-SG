"use client"

import { motion } from "framer-motion"
import * as Accordion from "@radix-ui/react-accordion"
import { Clock, ChevronDown, AlertTriangle } from "lucide-react"
import { TypeRelations, TypeRelationsPast } from "@/types/api/type.types"
import { TYPE_COLORS } from "@/lib/constants/types.constants"

interface Props {
    pastRelations: TypeRelationsPast[]
    currentRelations: TypeRelations
}

export function TypeHistoryAccordion({ pastRelations, currentRelations }: Props) {
    if (!pastRelations || pastRelations.length === 0) return null

    return (
        <section className="py-8">
            <Accordion.Root type="single" collapsible className="w-full">
                <Accordion.Item value="history" className="border-2 border-[#111111] bg-white overflow-hidden">
                    <Accordion.Header className="flex">
                        <Accordion.Trigger className="group flex-1 flex items-center justify-between px-6 py-4 outline-none hover:bg-[#FAFAFA] transition-colors">
                            <div className="flex items-center gap-3">
                                <Clock size={16} className="text-[#111111]" />
                                <span className="font-press-start text-[10px] text-[#111111] pt-1">CAMBIOS HISTÓRICOS</span>
                            </div>
                            <ChevronDown size={16} className="text-[#888888] transition-transform duration-300 group-data-[state=open]:rotate-180" />
                        </Accordion.Trigger>
                    </Accordion.Header>

                    <Accordion.Content className="overflow-hidden data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown">
                        <div className="p-6 pt-0 border-t border-[#E0E0E0]">
                            <div className="mb-6 font-nunito text-[13px] text-[#888888]">
                                Este tipo tuvo efectividades diferentes en generaciones anteriores.
                            </div>

                            {pastRelations.map((past, i) => {
                                const genLabel = past.generation.name.split("-")[1]?.toUpperCase() || "I"
                                return (
                                    <div key={i} className="mb-8 last:mb-0">
                                        <div className="inline-flex items-center gap-2 mb-4">
                                            <span className="bg-[#111111] text-white font-press-start text-[8px] px-2 py-1">Gen {genLabel}</span>
                                            <span className="font-nunito text-[12px] font-bold text-[#444444]">Efectividad previa a Generación {genLabel}</span>
                                        </div>

                                        <div className="w-full border-2 border-[#111111] bg-white overflow-x-auto">
                                            <table className="w-full text-left font-nunito text-[12px]">
                                                <thead>
                                                    <tr className="bg-[#FAFAFA] border-b border-[#111111]">
                                                        <th className="p-3 font-bold text-[#111111]">Ataca a</th>
                                                        <th className="p-3 font-bold text-[#888888]">Antes (Gen {genLabel})</th>
                                                        <th className="p-3"></th>
                                                        <th className="p-3 font-bold text-[#111111]">Ahora</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className="border-b border-[#E0E0E0] last:border-0 hover:bg-[#FAFAFA]">
                                                        <td className="p-3 font-bold uppercase" style={{ color: TYPE_COLORS["bug"] }}>BICHO</td>
                                                        <td className="p-3 bg-[#FEF9C3] font-jetbrains font-bold text-[#B45309]">×2</td>
                                                        <td className="p-3 text-[#E0E0E0]">→</td>
                                                        <td className="p-3 font-jetbrains font-bold" style={{ color: TYPE_COLORS["bug"] }}>×1</td>
                                                    </tr>
                                                    <tr className="border-b border-[#E0E0E0] last:border-0 hover:bg-[#FAFAFA]">
                                                        <td className="p-3 font-bold uppercase" style={{ color: TYPE_COLORS["psychic"] }}>PSÍQUICO</td>
                                                        <td className="p-3 bg-[#FEF9C3] font-jetbrains font-bold text-[#B45309]">×0</td>
                                                        <td className="p-3 text-[#E0E0E0]">→</td>
                                                        <td className="p-3 font-jetbrains font-bold" style={{ color: TYPE_COLORS["psychic"] }}>×2</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )
                            })}

                            <div className="mt-8 flex items-start gap-3 bg-[#FEF9C3] border-l-4 border-l-[#F59E0B] p-4">
                                <AlertTriangle size={18} className="text-[#F59E0B] mt-0.5 shrink-0" />
                                <p className="font-nunito text-[12px] text-[#92400E] leading-relaxed">
                                    <strong>Nota histórica:</strong> Los datos de Generación I pueden tener discrepancias debido a los bugs en el código original.
                                </p>
                            </div>
                        </div>
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion.Root>
        </section>
    )
}
