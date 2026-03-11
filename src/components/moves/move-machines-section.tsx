"use client"

import { motion } from "framer-motion"

interface MachineData {
    id: number
    item: { name: string; url: string }
    move: { name: string; url: string }
    version_group: { name: string; url: string }
}

interface Props {
    machines: (MachineData & { version_group: { name: string; url: string } })[]
    moveClass: string
}

export function MoveMachinesSection({ machines, moveClass }: Props) {
    if (!machines?.length) return null

    const classBg =
        moveClass === "physical" ? "#FED7AA" :
            moveClass === "special" ? "#BFDBFE" :
                "#F3F4F6"

    return (
        <motion.section
            className="py-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
        >
            <div className="mb-5">
                <span className="font-press-start text-[10px] text-[#111111]">TMs Y CTs</span>
                <p className="font-nunito text-[12px] text-[#888888] mt-1">Objetos que enseñan este movimiento</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {machines.map((machine, i) => {
                    const machineName = machine.item?.name?.toUpperCase() ?? "TM??"
                    const versionName = machine.version_group?.name?.replace(/-/g, " / ") ?? ""

                    return (
                        <motion.div
                            key={i}
                            className="flex items-center gap-3 px-4 py-3 border border-[#E0E0E0] bg-[#F8F8F8] hover:border-[#111111] transition-colors"
                            initial={{ opacity: 0, x: -12 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.06, type: "spring", stiffness: 300, damping: 28 }}
                            whileHover={{ boxShadow: "2px 2px 0 #111111" }}
                        >
                            <span
                                className="font-press-start text-[9px] px-2 py-1.5 border border-[#111111] flex-shrink-0"
                                style={{ backgroundColor: classBg }}
                            >
                                {machineName}
                            </span>
                            <div className="h-6 w-px bg-[#E0E0E0]" />
                            <span className="font-nunito text-[12px] text-[#888888] capitalize">{versionName}</span>
                        </motion.div>
                    )
                })}
            </div>
        </motion.section>
    )
}
