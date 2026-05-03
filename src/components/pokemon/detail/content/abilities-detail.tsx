"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import * as Accordion from "@radix-ui/react-accordion"
import { useAbility } from "@/lib/hooks/abilities/useAbilities"
import { getSpanish, getSpanishText } from "@/lib/utils/locale.utils"
import { EyeOff, HelpCircle, ChevronDown, Footprints } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { getPokemonSpriteUrl, getIdFromUrl } from "@/lib/utils/pokemon.utils"

interface PokemonAbility {
    ability: { name: string; url: string }
    is_hidden: boolean
    slot: number
}

interface Props {
    abilities?: PokemonAbility[]
    pokemonId?: number
}

function AbilityCard({ abilitySlot, pokemonId, index }: { abilitySlot: PokemonAbility; pokemonId?: number; index: number }) {
    const { data: ability, isLoading } = useAbility(abilitySlot.ability.name)
    const [open, setOpen] = useState<string>("")

    const nameEntry = getSpanish(ability?.names as any[], "name")
    const displayName = nameEntry.text || abilitySlot.ability.name.split("-").map((w: string) => w[0].toUpperCase() + w.slice(1)).join(" ")

    const effectEntry = getSpanish(ability?.effect_entries as any[], "effect")
    const shortEffectEntry = getSpanish(ability?.effect_entries as any[], "short_effect")

    // Best Spanish description: prefer Spanish effect_entries, then Spanish flavor text, then EN effect
    const esFlavorText = ability?.flavor_text_entries
        ?.filter((f: any) => f.language?.name.startsWith("es"))
        ?.sort((a: any, b: any) => (b.version_group?.name ?? "").localeCompare(a.version_group?.name ?? ""))[0]

    // Main text: Spanish effect > Spanish flavor > EN effect
    const mainText = (!effectEntry.isFallback && effectEntry.text)
        ? effectEntry.text
        : esFlavorText?.flavor_text?.replace(/\n/g, " ").replace(/\f/g, " ")
        ?? effectEntry.text
    const mainIsFallback = effectEntry.isFallback && !esFlavorText

    // Short effect: show only if not redundant with mainText
    const showShortEffect = !esFlavorText && shortEffectEntry.text && shortEffectEntry.text !== mainText

    const flavorEntries = ability?.flavor_text_entries ?? []
    // Get unique versions in Spanish first, fallback to en
    const uniqueVersions: Map<string, { text: string; version: string }> = new Map()
    for (const f of flavorEntries) {
        const lang = f.language?.name
        const ver = f.version_group?.name
        if ((lang === "es" || lang === "en") && ver && !uniqueVersions.has(ver)) {
            uniqueVersions.set(ver, { text: f.flavor_text?.replace(/\n/g, " ").replace(/\f/g, " "), version: ver })
        }
    }
    const flavorByVersion = Array.from(uniqueVersions.entries()).reverse().slice(0, 5)

    const pokemonWithAbility = (ability?.pokemon ?? []).slice(0, 20)

    const slotLabel = abilitySlot.is_hidden
        ? "Habilidad Oculta"
        : abilitySlot.slot === 1 ? "Habilidad 1" : "Habilidad 2"

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="mb-6 bg-white overflow-hidden"
            style={{ 
                border: "3px solid #111111", 
                boxShadow: "6px 6px 0 rgba(17,17,17,1)",
                borderRadius: "8px"
            }}
        >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 gap-3 border-b-2 border-[#111111]">
                <div className="flex items-center gap-3">
                    <span className="font-['Press_Start_2P'] text-[12px] text-[#111111] uppercase tracking-tighter">
                        {displayName}
                    </span>
                </div>
                {abilitySlot.is_hidden ? (
                    <div
                        className="flex items-center gap-1.5 font-['Press_Start_2P'] text-[8px] px-3 py-1.5 text-white w-fit"
                        style={{ backgroundColor: "#111111", boxShadow: "4px 4px 0 #CC0000" }}
                    >
                        <EyeOff size={10} strokeWidth={3} />
                        HABILIDAD OCULTA
                    </div>
                ) : (
                    <span
                        className="font-['Press_Start_2P'] text-[8px] px-3 py-1.5 w-fit border-2 border-[#111111] shadow-[2px_2px_0_#111111]"
                        style={{ backgroundColor: "#FFFFFF", color: "#111111" }}
                    >
                        {slotLabel.toUpperCase()}
                    </span>
                )}
            </div>

            {/* Divider Accent (Removed redundant ones) */}

            {isLoading ? (
                <div className="p-4 sm:p-6">
                    <div className="h-5 bg-[#F8F8F8] border border-[#E0E0E0] animate-pulse mb-3" />
                    <div className="h-5 bg-[#F8F8F8] border border-[#E0E0E0] animate-pulse w-3/4" />
                </div>
            ) : (
                <div className="p-4 sm:p-6 space-y-6">
                    {/* Main Effect */}
                    {mainText && (
                        <div className="relative p-4 sm:p-5 bg-[#F9F9F9] border-2 border-[#111111] shadow-inner mt-4">
                            <span className="absolute -top-[12px] left-4 px-3 py-[4px] bg-white border-2 border-[#111111] font-['Press_Start_2P'] text-[8px] text-[#111111] shadow-[2px_2px_0_#111111]">EFECTO</span>
                            <p className="font-['Nunito'] text-[15px] font-black text-[#111111] leading-[1.6]">
                                {mainText}
                            </p>
                            {mainIsFallback && (
                                <span className="absolute bottom-2 right-2 font-['Press_Start_2P'] text-[6px] px-1 py-[2px] bg-[#111111] text-white">EN</span>
                            )}
                        </div>
                    )}

                    {/* Short effect */}
                    {showShortEffect && (
                        <div className="relative p-4 sm:p-5 border-l-4 border-[#CC0000] bg-[#FFF5F5] border-y border-r border-[#111111] shadow-[2px_2px_0_rgba(204,0,0,0.1)] mt-8">
                            <span className="absolute -top-[12px] left-4 px-3 py-[4px] bg-white border-2 border-[#CC0000] font-['Press_Start_2P'] text-[8px] text-[#CC0000] shadow-[2px_2px_0_rgba(204,0,0,0.1)]">RESUMEN</span>
                            <p className="font-['Nunito'] text-[14px] font-bold italic text-[#333333]">{shortEffectEntry.text}</p>
                        </div>
                    )}

                    {/* Accordions */}
                    <Accordion.Root type="single" collapsible value={open} onValueChange={setOpen}>

                        {/* Flavor texts */}
                        {flavorByVersion.length > 0 && (
                            <Accordion.Item value="flavor" className="border-t-2 border-[#111111]">
                                <Accordion.Trigger className="flex w-full items-center justify-between py-4 font-['Press_Start_2P'] text-[9px] text-[#111111] hover:text-[#CC0000] transition-colors group">
                                    APARICIÓN EN JUEGOS
                                    <motion.div 
                                        animate={{ rotate: open === "flavor" ? 180 : 0 }} 
                                        transition={{ duration: 0.2 }}
                                        className="p-1 border border-[#111111] group-hover:bg-[#111111] group-hover:text-white"
                                    >
                                        <ChevronDown size={12} />
                                    </motion.div>
                                </Accordion.Trigger>
                                <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                                    <div className="pb-4 space-y-3">
                                        {flavorByVersion.map(([ver, data]) => (
                                            <div key={ver} className="flex gap-4 items-start p-3 bg-white border border-[#E0E0E0] shadow-[2px_2px_0_#E0E0E0]">
                                                <span className="font-['Press_Start_2P'] text-[7px] px-2 py-1 bg-[#111111] text-white whitespace-nowrap capitalize">
                                                    {ver.replace(/-/g, " ")}
                                                </span>
                                                <p className="font-['Nunito'] text-[13px] text-[#333333] font-bold italic leading-relaxed">{data.text}</p>
                                            </div>
                                        ))}
                                    </div>
                                </Accordion.Content>
                            </Accordion.Item>
                        )}

                        {/* Pokemon list */}
                        {pokemonWithAbility.length > 0 && (
                            <Accordion.Item value="pokemon" className="border-t-2 border-[#111111]">
                                <Accordion.Trigger className="flex w-full items-center justify-between py-4 font-['Press_Start_2P'] text-[9px] text-[#111111] hover:text-[#CC0000] transition-colors group">
                                    POKÉMON CON ESTA HABILIDAD ({ability?.pokemon?.length ?? 0})
                                    <motion.div 
                                        animate={{ rotate: open === "pokemon" ? 180 : 0 }} 
                                        transition={{ duration: 0.2 }}
                                        className="p-1 border border-[#111111] group-hover:bg-[#111111] group-hover:text-white"
                                    >
                                        <ChevronDown size={12} />
                                    </motion.div>
                                </Accordion.Trigger>
                                <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                                    <div className="pb-4 flex flex-wrap gap-3">
                                        {pokemonWithAbility.map((p: any) => {
                                            const id = getIdFromUrl(p.pokemon.url)
                                            const isCurrentPokemon = id === pokemonId
                                            return (
                                                <Link
                                                    key={p.pokemon.name}
                                                    href={`/pokemon/${id}`}
                                                    className="flex flex-col items-center gap-1.5 group"
                                                >
                                                    <motion.div
                                                        className="relative bg-white"
                                                        style={{
                                                            border: isCurrentPokemon ? "3px solid #CC0000" : "2px solid #111111",
                                                            padding: 2,
                                                            boxShadow: isCurrentPokemon ? "3px 3px 0 rgba(204,0,0,0.2)" : "3px 3px 0 rgba(0,0,0,0.1)"
                                                        }}
                                                        whileHover={{ scale: 1.1, translateY: -2, boxShadow: "4px 4px 0 #111111" }}
                                                    >
                                                        <Image
                                                            src={getPokemonSpriteUrl(id)}
                                                            alt={p.pokemon.name}
                                                            width={48}
                                                            height={48}
                                                            style={{ imageRendering: "pixelated" }}
                                                        />
                                                    </motion.div>
                                                    <span className="font-['Press_Start_2P'] text-[7px] text-[#888888] capitalize group-hover:text-[#111111] transition-colors text-center max-w-[56px] truncate">
                                                        {p.pokemon.name.replace(/-/g, " ")}
                                                    </span>
                                                </Link>
                                            )
                                        })}
                                        {(ability?.pokemon?.length ?? 0) > 20 && (
                                            <div className="flex items-center justify-center text-[#888888] font-['Press_Start_2P'] text-[7px] italic border-2 border-dashed border-[#E0E0E0] px-3 py-2">
                                                +{(ability!.pokemon!.length) - 20}
                                            </div>
                                        )}
                                    </div>
                                </Accordion.Content>
                            </Accordion.Item>
                        )}
                    </Accordion.Root>
                </div>
            )}
        </motion.div>
    )
}

export function AbilitiesDetail({ abilities, pokemonId }: Props) {
    if (!abilities || abilities.length === 0) {
        return (
            <div className="flex flex-col items-center gap-3 py-12">
                <HelpCircle size={40} className="text-[#E0E0E0]" />
                <p className="font-['Nunito'] text-[14px] text-[#888888]">Sin información de habilidades disponible</p>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            <h3 className="font-['Press_Start_2P'] text-[10px] sm:text-[12px] text-[#111111] mb-6 flex items-center gap-3">
                <span className="w-3 h-3 bg-[#111111]" />
                HABILIDADES
                <span className="flex-1 h-[2px] bg-[#E0E0E0]" />
            </h3>
            <div className="grid grid-cols-1 gap-4">
                {abilities.map((a, i) => (
                    <AbilityCard key={a.ability.name} abilitySlot={a} pokemonId={pokemonId} index={i} />
                ))}
            </div>
        </div>
    )
}
