"use client"

import { motion } from "framer-motion"
import * as Accordion from "@radix-ui/react-accordion"
import { Move, PastMoveStatValues } from "@/types/api/move.types"
import { TYPE_COLORS } from "@/lib/constants/types.constants"
import { ChevronDown, History } from "lucide-react"

interface Props {
    move: Move
    pastValues: PastMoveStatValues[]
}

export function MoveVersionHistory({ move, pastValues }: Props) {
    if (!pastValues?.length) return null

    return (
        <motion.section
            className="py-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
        >
            <Accordion.Root type="single" collapsible>
                <Accordion.Item value="history" className="border-t-2 border-[#111111]">
                    <Accordion.Trigger className="flex items-center gap-3 w-full py-4 hover:text-[#CC0000] transition-colors group">
                        <History size={16} />
                        <span className="font-press-start text-[9px]">CAMBIOS ENTRE VERSIONES</span>
                        <span className="bg-[#CC0000] text-white font-press-start text-[7px] px-1.5 py-0.5">{pastValues.length}</span>
                        <ChevronDown size={14} className="ml-auto transition-transform group-data-[state=open]:rotate-180" />
                    </Accordion.Trigger>

                    <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                        <div className="pb-6">
                            <p className="font-nunito text-[13px] text-[#888888] italic mb-4">
                                Este move tuvo diferentes estadísticas en versiones anteriores.
                            </p>

                            {pastValues.map((pv, idx) => {
                                const changes: { label: string; old: React.ReactNode; current: React.ReactNode }[] = []

                                if (pv.power !== null && pv.power !== move.power) {
                                    changes.push({ label: "Potencia", old: pv.power ?? "—", current: move.power ?? "—" })
                                }
                                if (pv.accuracy !== null && pv.accuracy !== move.accuracy) {
                                    changes.push({ label: "Precisión", old: `${pv.accuracy}%`, current: `${move.accuracy ?? "—"}%` })
                                }
                                if (pv.pp !== null && pv.pp !== move.pp) {
                                    changes.push({ label: "PP", old: pv.pp, current: move.pp })
                                }
                                if (pv.type !== null && pv.type?.name !== move.type?.name) {
                                    const oldColor = TYPE_COLORS[pv.type!.name] ?? "#888888"
                                    const newColor = TYPE_COLORS[move.type?.name ?? ""] ?? "#888888"
                                    changes.push({
                                        label: "Tipo",
                                        old: <span className="px-2 py-0.5 text-white font-nunito text-[10px] font-bold" style={{ backgroundColor: oldColor }}>{pv.type!.name}</span>,
                                        current: <span className="px-2 py-0.5 text-white font-nunito text-[10px] font-bold" style={{ backgroundColor: newColor }}>{move.type?.name}</span>
                                    })
                                }

                                if (!changes.length) return null

                                return (
                                    <div key={idx} className="border-t border-[#E0E0E0] pt-4 mb-4">
                                        {/* Version badge */}
                                        <div className="flex flex-wrap gap-1 mb-3">
                                            <span className="bg-[#111111] text-white font-nunito text-[10px] px-2 py-0.5">
                                                {pv.version_group.name.replace(/-/g, " /")}
                                            </span>
                                        </div>

                                        {/* Changes table */}
                                        <div className="flex flex-col gap-1">
                                            {changes.map((ch, ci) => (
                                                <motion.div
                                                    key={ci}
                                                    className="flex items-center gap-4 px-3 py-2"
                                                    initial={{ opacity: 0, x: -8 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: ci * 0.05 }}
                                                >
                                                    <span className="font-press-start text-[8px] text-[#AAAAAA] w-20">{ch.label}</span>
                                                    <span className="font-jetbrains text-[12px] line-through px-2 py-0.5 bg-[#FEF9C3] text-[#888888]">
                                                        {ch.old}
                                                    </span>
                                                    <span className="text-[#888888]">→</span>
                                                    <span className="font-jetbrains text-[12px] font-bold text-[#444444]">
                                                        {ch.current}
                                                    </span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion.Root>
        </motion.section>
    )
}
