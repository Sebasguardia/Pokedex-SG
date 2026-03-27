"use client"

import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import * as HoverCard from "@radix-ui/react-hover-card"
import { PokemonSprite } from "@/components/shared/pokemon-sprite"
import { FavoriteButton } from "@/components/shared/favorite-button"
import { TypeIcon } from "@/components/shared/type-icon"
import { formatPokemonId, formatPokemonName, getIdFromUrl } from "@/lib/utils/pokemon.utils"
import { useUIStore } from "@/lib/store/ui.store"
import { usePokemon } from "@/lib/hooks/usePokemon"
import { TYPE_CONSTANTS } from "@/lib/constants/types.constants"

interface PokemonCardProps {
    name: string;
    url: string;
    index?: number;
}

export function PokemonCard({ name, url, index = 0 }: PokemonCardProps) {
    const id = getIdFromUrl(url)
    const { shinyMode } = useUIStore()
    const { data: details, isLoading } = usePokemon(id)

    // No stagger delay — virtualizer remounts cards on scroll,
    // causing the delay to replay. Hover+CSS transitions handle all feel.

    const primaryType = details?.types?.[0]?.type?.name || "normal"
    const secondaryType = details?.types?.[1]?.type?.name
    const color = TYPE_CONSTANTS[primaryType]?.color || "#A8A878"

    const hpStat = details?.stats?.find((s: any) => s.stat.name === "hp")?.base_stat || 0
    const hpPercentage = Math.min(((hpStat === 0 ? 50 : hpStat) / 255) * 100, 100)
    const formattedId = formatPokemonId(id)
    const formattedName = formatPokemonName(name)

    const CardBody = (
        <Link href={`/pokemon/${id}`} className="block h-full w-full outline-none group cursor-pointer">
            <motion.div
                whileHover="hover"
                className="relative w-full h-[220px] bg-white border-2 border-[#111111] flex flex-col justify-between transition-colors duration-300"
                variants={{
                    hover: {
                        x: -2, y: -2,
                        boxShadow: "6px 6px 0 #CC0000",
                        borderColor: "#CC0000"
                    }
                }}
                style={{ boxShadow: "4px 4px 0 #111111", borderColor: "#111111" }}
            >
                {/* TOP HEADER */}
                <div className="flex justify-between items-start p-3 z-10">
                    <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-[#888888]">{formattedId}</span>
                        <div className="flex gap-[4px]">
                            {details?.types?.map((t: any) => (
                                <TypeIcon
                                    key={t.type.name}
                                    type={t.type.name}
                                    size={14}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* SPRITE AREA */}
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden z-0 mt-3">
                    {/* Background tint */}
                    <div
                        className="absolute inset-0 opacity-[0.07]"
                        style={{ backgroundColor: color }}
                    />
                    <motion.div
                        variants={{ hover: { scale: 1.15, y: -5 } }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                        <PokemonSprite id={id} name={name} shiny={shinyMode} size={90} useArtwork={false} className="drop-shadow-none" />
                    </motion.div>
                </div>

                {/* BOTTOM AREA */}
                <div className="z-10 p-3 pt-0 flex flex-col gap-1 w-full bg-white/60 backdrop-blur-[2px]">
                    <h3 className="font-nunito text-[14px] font-bold text-[#111111] group-hover:text-[#CC0000] truncate transition-colors">
                        {formattedName}
                    </h3>
                    <div className="flex items-center gap-2">
                        <span className="font-pixel text-[6px] text-[#444444] min-w-[14px]">HP</span>
                        <div className="flex-1 h-[4px] bg-[#E0E0E0] rounded-full overflow-hidden">
                            <motion.div
                                className="h-full rounded-full"
                                animate={{ width: `${hpPercentage}%` }}
                                transition={{ duration: 0.6 }}
                                style={{ backgroundColor: hpPercentage < 20 ? "#CC0000" : hpPercentage < 50 ? "#F59E0B" : "#10B981" }}
                            />
                        </div>
                        <span className="font-mono text-[8px] text-[#444444]">{hpStat || "?"}</span>
                    </div>
                </div>

                {/* BOTTOM COLOR BAR */}
                <div className="absolute bottom-0 left-0 w-full h-[6px] border-t border-[#111111]" style={{ backgroundColor: color }} />

                {/* FAVORITE TILE */}
                <div className="absolute top-2 right-2 z-30" onClick={(e) => e.preventDefault()}>
                    <FavoriteButton pokemonId={id} />
                </div>
            </motion.div>
        </Link>
    )

    // STAT BAR Helper directly in card or shared component
    const MiniStat = ({ label, value, max = 255, idx }: { label: string, value: number, max?: number, idx: number }) => (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.03, type: "spring" }}
            className="flex items-center gap-2"
        >
            <span className="font-pixel text-[6px] text-[#888888] w-[24px] text-right">{label}</span>
            <div className="flex-1 h-[4px] bg-[#E0E0E0] rounded-full overflow-hidden border border-[#E0E0E0]">
                <div className="h-full bg-[#111111] rounded-full" style={{ width: `${Math.min((value / max) * 100, 100)}%` }} />
            </div>
            <span className="font-mono text-[8px] text-[#111111] w-[16px]">{value}</span>
        </motion.div>
    )

    return (
        <div className="relative isolate">
            <HoverCard.Root openDelay={400} closeDelay={150}>
                <HoverCard.Trigger asChild>
                    {CardBody}
                </HoverCard.Trigger>
                <HoverCard.Portal>
                    <HoverCard.Content
                        side="right"
                        sideOffset={14}
                        className="z-50 w-[220px] bg-white border-2 border-[#111111] shadow-[6px_6px_0_#111111] outline-none overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 duration-200"
                    >
                        <div className="border-b-[3px] border-[#CC0000] p-3 pb-2 bg-[#FAFAFA]">
                            <h4 className="font-pixel text-[10px] text-[#111111] mb-1">{formattedName}</h4>
                            <p className="font-nunito text-[11px] text-[#888888]">Stats Base</p>
                        </div>

                        <div className="px-3 py-4 space-y-2 flex flex-col gap-1">
                            {details?.stats?.map((s: any, i: number) => {
                                const statMap: Record<string, string> = { 'hp': 'HP', 'attack': 'ATK', 'defense': 'DEF', 'special-attack': 'SPA', 'special-defense': 'SPD', 'speed': 'SPE' }
                                return <MiniStat key={s.stat.name} label={statMap[s.stat.name] || s.stat.name} value={s.base_stat} idx={i} />
                            })}

                            {!details?.stats && isLoading && (
                                <div className="text-center py-4 font-nunito text-[10px] text-[#888888]">Cargando stats...</div>
                            )}
                        </div>

                        <div className="p-3 pt-2 bg-[#F2F2F2] flex justify-between items-center border-t border-[#E0E0E0]">
                            <div className="flex gap-3">
                                <span className="font-nunito text-[9px] text-[#888888]">
                                    <b className="text-[#111111]">P:</b> {details?.weight ? details.weight / 10 : "?"}kg
                                </span>
                                <span className="font-nunito text-[9px] text-[#888888]">
                                    <b className="text-[#111111]">A:</b> {details?.height ? details.height / 10 : "?"}m
                                </span>
                            </div>
                        </div>
                    </HoverCard.Content>
                </HoverCard.Portal>
            </HoverCard.Root>
        </div>
    )
}

// Fallback visual wrapper for mobile where HoverCard isn't ideal
export function PokemonCardMobileWrapper(props: PokemonCardProps) {
    return (
        <>
            <div className="md:hidden">
                {/* Renderizamos solo el card base y evitamos renderizar el portal The Radix HoverCard hidden trick */}
                <PokemonCard {...props} />
                {/* Note: since PokemonCard wraps it in <div className="hidden md:block">, we must expose the CardBody. */}
            </div>
            <PokemonCard {...props} />
        </>
    )
}
