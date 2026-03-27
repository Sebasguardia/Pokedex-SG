"use client"

import { motion } from "framer-motion"
import NumberFlow from "@number-flow/react"
import * as Tooltip from "@radix-ui/react-tooltip"
import { Scale, Ruler, Crosshair, Heart, MapPin, Info, Palette, CalendarDays, Trophy, Gem } from "lucide-react"
import { HABITAT_ES, COLOR_ES } from "@/lib/utils/locale.utils"
import { getSpanish } from "@/lib/utils/locale.utils"

interface Props {
    pokemon?: any
    species?: any
}

import { MEGA_STONES } from "@/lib/constants/mega-stones"

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
                        initial={{ scale: 0.95, opacity: 0, y: 10 }}
                        whileInView={{ scale: 1, opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.04, type: "spring", stiffness: 300, damping: 25 }}
                        whileHover={{ scale: 1.05, translateY: -4, boxShadow: "8px 8px 0 #111111" }}
                        className="flex flex-col gap-3 p-5 cursor-default relative overflow-hidden group transition-all duration-200"
                        style={{ backgroundColor: "#FFFFFF", border: "3px solid #111111", boxShadow: "4px 4px 0 #111111" }}
                    >
                        <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Icon size={48} />
                        </div>
                        <div className="flex items-center gap-2">
                            <Icon size={18} className="text-[#CC0000]" strokeWidth={3} />
                            <span className="font-['Press_Start_2P'] text-[7px] text-[#888888] font-black uppercase tracking-widest group-hover:text-[#111111] transition-colors leading-none">
                                {cell.label}
                            </span>
                        </div>
                        <div className="font-['Nunito'] text-[15px] font-black text-[#111111] mt-1 z-10 leading-tight">
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

    const bst = pokemon.stats?.reduce((sum: number, s: any) => sum + s.base_stat, 0) || 0
    const isLegendary = species?.is_legendary || false
    const isMythical = species?.is_mythical || false
    
    const getApproximateTier = (bst: number, leg: boolean, myth: boolean) => {
        if (bst >= 670) return "Uber"
        if ((leg || myth) && bst >= 600) return "OU / Uber"
        if (bst >= 600) return "OU"
        if (bst >= 500) return "UU"
        if (bst >= 430) return "RU"
        if (bst >= 350) return "NU"
        return "LC / PU"
    }

    const tier = getApproximateTier(bst, isLegendary, isMythical)

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
        {
            icon: Trophy, label: "Tier (Aprox.)",
            value: <span className="font-['Press_Start_2P'] text-[10px] text-[#CC0000]">{tier}</span>,
            tooltip: `Basado en el BST (${bst}) y rareza. No es exacto.`,
        },
    ]

    const megaStone = MEGA_STONES[pokemon.name]
    if (megaStone) {
        cells.push({
            icon: Gem, 
            label: pokemon.name.includes("primal") ? "Orbe" : "Megapiedra",
            value: (
                <div className="flex items-center gap-2">
                    <img src={`https://play.pokemonshowdown.com/sprites/itemicons/${megaStone}.png`} alt={megaStone} className="w-6 h-6" style={{ imageRendering: "pixelated" }} />
                    <span className="capitalize text-[13px]">{megaStone.replace("-", " ")}</span>
                </div>
            ),
            tooltip: "Objeto necesario para la regresión primigenia o megaevolución"
        })
    }

    // Rayquaza-mega uses Dragon Ascent
    if (pokemon.name === "rayquaza-mega") {
        cells.push({
            icon: Gem,
            label: "Requisito",
            value: <span className="text-[13px] uppercase tracking-wider">Ascenso Draco</span>,
            tooltip: "Movimiento necesario para megaevolucionar"
        })
    }

    return (
        <div className="mt-8 mb-12">
            <div className="flex items-center gap-3 mb-8">
                <h3 className="font-['Press_Start_2P'] text-[12px] text-[#111111] tracking-wide m-0 flex items-center gap-3">
                    <span className="w-3 h-3 bg-[#CC0000]" />
                    DATOS POKÉDEX
                </h3>
                <div className="flex-1 h-[2px] bg-[#E0E0E0]" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cells.map((cell, i) => (
                    <DataCell key={cell.label} cell={cell} index={i} />
                ))}
            </div>
        </div>
    )
}
