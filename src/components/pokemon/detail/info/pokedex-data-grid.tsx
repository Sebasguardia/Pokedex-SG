"use client"

import { motion } from "framer-motion"
import NumberFlow from "@number-flow/react"
import * as Tooltip from "@radix-ui/react-tooltip"
import { Scale, Ruler, Crosshair, Heart, MapPin, Info, Palette, CalendarDays } from "lucide-react"
import { HABITAT_ES, COLOR_ES } from "@/lib/utils/locale.utils"
import { getSpanish } from "@/lib/utils/locale.utils"

interface Props {
    pokemon?: any
    species?: any
}

const GEN_MAP: Record<string, string> = {
    "generation-i": "Primera (1996)", "generation-ii": "Segunda (1999)", "generation-iii": "Tercera (2002)",
    "generation-iv": "Cuarta (2006)", "generation-v": "Quinta (2010)", "generation-vi": "Sexta (2013)",
    "generation-vii": "Séptima (2016)", "generation-viii": "Octava (2019)", "generation-ix": "Novena (2022)",
}

const COLOR_DOTS: Record<string, string> = {
    black: "#1F2937", blue: "#3B82F6", brown: "#92400E", gray: "#6B7280",
    green: "#22C55E", pink: "#EC4899", purple: "#A855F7", red: "#EF4444",
    white: "#D1D5DB", yellow: "#EAB308",
}

interface Cell {
    icon: React.ElementType
    label: string
    value: React.ReactNode
    tooltip?: string
}

function DataCell({ cell, index }: { cell: Cell; index: number }) {
    const Icon = cell.icon
    return (
        <Tooltip.Provider>
            <Tooltip.Root>
                <Tooltip.Trigger asChild>
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.04, type: "spring", stiffness: 300, damping: 25 }}
                        whileHover={{ borderColor: "#111111", boxShadow: "2px 2px 0 #111111" }}
                        className="flex flex-col gap-[6px] p-[14px] cursor-default"
                        style={{ background: "#F8F8F8", border: "1px solid #E0E0E0" }}
                    >
                        <Icon size={14} className="text-[#CC0000]" />
                        <span className="font-['Nunito'] text-[10px] text-[#888888] uppercase tracking-[0.05em]">
                            {cell.label}
                        </span>
                        <div className="font-['Nunito'] text-[14px] font-bold text-[#111111]">
                            {cell.value}
                        </div>
                    </motion.div>
                </Tooltip.Trigger>
                {cell.tooltip && (
                    <Tooltip.Portal>
                        <Tooltip.Content
                            className="bg-[#111111] text-white font-['Nunito'] text-[11px] px-2 py-1 z-50 max-w-[200px]"
                            sideOffset={5}
                        >
                            {cell.tooltip}
                            <Tooltip.Arrow className="fill-[#111111]" />
                        </Tooltip.Content>
                    </Tooltip.Portal>
                )}
            </Tooltip.Root>
        </Tooltip.Provider>
    )
}

export function PokedexDataGrid({ pokemon, species }: Props) {
    if (!pokemon) return null

    const catchRate = species?.capture_rate ?? 0
    const catchPct = pokemon ? Math.round(((1 / 3) * (catchRate / 255)) * 100) : 0

    const genus = getSpanish(species?.genera, "genus")
    const colorName = species?.color?.name ?? ""
    const colorES = COLOR_ES[colorName] ?? colorName
    const habitatName = species?.habitat?.name ?? ""
    const habitatES = HABITAT_ES[habitatName] ?? habitatName
    const genKey = species?.generation?.name ?? ""
    const genES = GEN_MAP[genKey] ?? genKey

    const cells: Cell[] = [
        {
            icon: Scale, label: "Peso",
            value: <NumberFlow value={pokemon.weight / 10} suffix=" kg" format={{ minimumFractionDigits: 1 }} className="font-['Nunito'] text-[14px] font-bold" />,
        },
        {
            icon: Ruler, label: "Altura",
            value: <NumberFlow value={pokemon.height / 10} suffix=" m" format={{ minimumFractionDigits: 1 }} className="font-['Nunito'] text-[14px] font-bold" />,
        },
        {
            icon: Info, label: "Especie",
            value: genus.text || "—",
        },
        {
            icon: MapPin, label: "Hábitat",
            value: <span className="capitalize">{habitatES || "—"}</span>,
        },
        {
            icon: Crosshair, label: "Captura",
            value: `${catchRate} / 255`,
            tooltip: `≈${catchPct}% con Pokéball en PS completo`,
        },
        {
            icon: Heart, label: "Amistad",
            value: `${species?.base_happiness ?? "—"} / 255`,
            tooltip: "Valor de amistad base al capturar",
        },
        {
            icon: CalendarDays, label: "Generación",
            value: <span className="capitalize">{genES || "—"}</span>,
        },
        {
            icon: Palette, label: "Color",
            value: (
                <span className="flex items-center gap-2">
                    <span
                        className="inline-block w-3 h-3 border border-[#E0E0E0]"
                        style={{ backgroundColor: COLOR_DOTS[colorName] ?? "#AAAAAA" }}
                    />
                    {colorES || "—"}
                </span>
            ),
        },
    ]

    return (
        <div className="mt-6 mb-6">
            <h3 className="font-['Press_Start_2P'] text-[9px] text-[#888888] mb-3 tracking-wide">DATOS POKÉDEX</h3>
            <div className="grid grid-cols-2 gap-2">
                {cells.map((cell, i) => (
                    <DataCell key={cell.label} cell={cell} index={i} />
                ))}
            </div>
        </div>
    )
}
