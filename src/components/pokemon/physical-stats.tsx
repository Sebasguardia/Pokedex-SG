"use client"

import { motion } from "framer-motion"
import * as Tooltip from "@radix-ui/react-tooltip"
import NumberFlow from "@number-flow/react"
import { Scale, Ruler, Crosshair, Heart } from "lucide-react"

interface Props {
    pokemon?: any
    species?: any
}

function StatCard({ icon: Icon, label, value, sub, tooltip }: {
    icon: any, label: string, value: string, sub?: string, tooltip?: string
}) {
    const card = (
        <motion.div
            className="bg-[#F8F8F8] border border-[#E0E0E0] p-3 text-center flex flex-col items-center gap-1 cursor-default"
            whileHover={{ borderColor: "#111111", boxShadow: "2px 2px 0 #111111" }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
            <Icon size={16} className="text-[#888888]" />
            <span className="font-['Press_Start_2P'] text-[11px] text-[#CC0000]">{value}</span>
            {sub && <span className="font-['Nunito'] text-[9px] text-[#888888]">{sub}</span>}
            <span className="font-['Nunito'] text-[10px] text-[#888888] uppercase tracking-wide">{label}</span>
        </motion.div>
    )

    if (tooltip) {
        return (
            <Tooltip.Provider delayDuration={300}>
                <Tooltip.Root>
                    <Tooltip.Trigger asChild>{card}</Tooltip.Trigger>
                    <Tooltip.Portal>
                        <Tooltip.Content
                            className="bg-[#111111] text-white font-['Nunito'] text-[11px] px-3 py-2 max-w-[200px] text-center z-50"
                            sideOffset={5}
                        >
                            {tooltip}
                            <Tooltip.Arrow className="fill-[#111111]" />
                        </Tooltip.Content>
                    </Tooltip.Portal>
                </Tooltip.Root>
            </Tooltip.Provider>
        )
    }

    return card
}

export function PhysicalStats({ pokemon, species }: Props) {
    if (!pokemon) return null

    const weight = pokemon.weight ? (pokemon.weight / 10).toFixed(1) : "?"
    const height = pokemon.height ? (pokemon.height / 10).toFixed(1) : "?"
    const captureRate = species?.capture_rate ?? "?"
    const capturePercent = species?.capture_rate
        ? Math.round((species.capture_rate / 255) * 100)
        : null
    const friendship = species?.base_happiness ?? "?"

    return (
        <div className="grid grid-cols-2 gap-2 mb-4">
            <StatCard icon={Scale} label="Peso" value={`${weight} kg`} />
            <StatCard icon={Ruler} label="Altura" value={`${height} m`} />
            <StatCard
                icon={Crosshair}
                label="Tasa Captura"
                value={`${captureRate}`}
                sub={capturePercent !== null ? `~${capturePercent}%` : undefined}
                tooltip={capturePercent !== null ? `~${capturePercent}% con Pokéball a vida completa` : undefined}
            />
            <StatCard icon={Heart} label="Amistad" value={`${friendship}`} sub="/ 255" />
        </div>
    )
}
