"use client"

import { useQuery } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { apiClient } from "@/lib/api/client"
import { Disc, Zap } from "lucide-react"
import { MoveCard } from "../moves/move-card"

interface Props {
    item: any
}

export function ItemMachinesSection({ item }: Props) {
    // A TM item has a 'machines' property which is an array of machine version details.
    // Each machine points to a machine resource, which then points to a move.

    const machineUrl = item.machines?.[0]?.machine?.url

    const { data: moveData, isLoading } = useQuery({
        queryKey: ["machine-move", machineUrl],
        enabled: !!machineUrl,
        queryFn: async () => {
            // 1. Get machine detail
            const { data: machine } = await apiClient.get<any>(machineUrl)
            // 2. Get move detail
            const { data: move } = await apiClient.get<any>(machine.move.url)
            return move
        },
        staleTime: 1000 * 60 * 60 * 24
    })

    if (!machineUrl) return null

    return (
        <section className="space-y-6">
            <div className="flex items-center gap-2">
                <Disc size={16} className="text-[#3B82F6]" />
                <h3 className="font-press-start text-[10px] text-[#111111] uppercase tracking-wider">
                    MOVIMIENTO CONSOLIDADOR
                </h3>
            </div>

            <div className="relative">
                {isLoading ? (
                    <div className="h-[200px] border-2 border-[#111111] shadow-[4px_4px_0_#3B82F6] bg-white animate-pulse" />
                ) : moveData ? (
                    <div className="max-w-[400px]">
                        <p className="font-nunito text-[13px] text-[#888888] mb-4">
                            Esta Máquina Técnica (MT) enseña de forma instantánea el siguiente movimiento:
                        </p>
                        <MoveCard move={moveData} index={0} />
                    </div>
                ) : (
                    <div className="p-8 border-2 border-[#111111] bg-[#F2F2F2] flex flex-col items-center">
                        <Zap className="text-[#888888] mb-2" />
                        <span className="font-press-start text-[7px] text-[#888888]">NO SE ENCONTRÓ EL MOVIMIENTO</span>
                    </div>
                )}
            </div>
        </section>
    )
}
