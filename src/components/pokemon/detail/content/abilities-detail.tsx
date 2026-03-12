"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import * as Accordion from "@radix-ui/react-accordion"
import { useAbility } from "@/lib/hooks/useAbilities"
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
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, type: "spring", stiffness: 200, damping: 25 }}
            className="mb-4"
            style={{ border: "2px solid #111111", boxShadow: "4px 4px 0 #111111" }}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-5 pb-3">
                <span className="font-['Press_Start_2P'] text-[11px] text-[#111111]">{displayName}</span>
                {abilitySlot.is_hidden ? (
                    <div
                        className="flex items-center gap-1 font-['Press_Start_2P'] text-[7px] px-2 py-[3px] text-white cursor-help"
                        style={{ backgroundColor: "#111111", boxShadow: "2px 2px 0 #CC0000" }}
                        title="Las habilidades ocultas solo se obtienen por métodos especiales como la Poké Radar o transferencias"
                    >
                        <EyeOff size={8} />
                        Habilidad Oculta
                    </div>
                ) : (
                    <span
                        className="font-['Press_Start_2P'] text-[7px] px-2 py-[3px]"
                        style={{ backgroundColor: "#F2F2F2", border: "1px solid #E0E0E0", color: "#444444" }}
                    >
                        {slotLabel}
                    </span>
                )}
            </div>

            {/* Divider */}
            <motion.div
                className="mx-5 mb-3"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                style={{ transformOrigin: "left", height: 3, backgroundColor: "#111111" }}
                transition={{ delay: index * 0.15 + 0.1, duration: 0.3 }}
            />
            <div
                className="mx-5 mb-3"
                style={{ height: 2, backgroundColor: "#CC0000" }}
            />

            {isLoading ? (
                <div className="px-5 pb-5">
                    <div className="h-4 bg-[#F2F2F2] animate-pulse mb-2" />
                    <div className="h-4 bg-[#F2F2F2] animate-pulse w-3/4" />
                </div>
            ) : (
                <div className="px-5 pb-5 space-y-4">
                    {/* Main Effect — Spanish preferred */}
                    {mainText && (
                        <div>
                            <p className="font-['Nunito'] text-[14px] text-[#444444] leading-[1.8]">
                                {mainText}
                            </p>
                            {mainIsFallback && (
                                <span className="inline-block mt-1 font-['Nunito'] text-[8px] px-1 py-[1px] bg-[#F2F2F2] border border-[#E0E0E0] text-[#888888]">EN</span>
                            )}
                        </div>
                    )}

                    {/* Short effect (only when no Spanish flavor text available) */}
                    {showShortEffect && (
                        <div className="border-l-[3px] border-[#CC0000] pl-3 py-1 bg-[#F8F8F8]">
                            <p className="font-['Nunito'] text-[10px] font-bold uppercase text-[#888888] mb-1">Resumen</p>
                            <p className="font-['Nunito'] text-[13px] italic text-[#555555]">{shortEffectEntry.text}</p>
                        </div>
                    )}

                    {/* Accordions */}
                    <Accordion.Root type="single" collapsible value={open} onValueChange={setOpen}>

                        {/* Flavor texts */}
                        {flavorByVersion.length > 0 && (
                            <Accordion.Item value="flavor" className="border-t border-[#F2F2F2]">
                                <Accordion.Trigger className="flex w-full items-center justify-between py-2 font-['Nunito'] text-[12px] text-[#888888] hover:text-[#111111] transition-colors">
                                    Descripción por juego
                                    <motion.div animate={{ rotate: open === "flavor" ? 180 : 0 }} transition={{ duration: 0.2 }}>
                                        <ChevronDown size={14} />
                                    </motion.div>
                                </Accordion.Trigger>
                                <Accordion.Content>
                                    <div className="pb-3 space-y-2">
                                        {flavorByVersion.map(([ver, data]) => (
                                            <div key={ver} className="flex gap-3 items-start">
                                                <span className="font-['Press_Start_2P'] text-[7px] px-2 py-1 bg-[#F2F2F2] border border-[#E0E0E0] text-[#888888] whitespace-nowrap capitalize">
                                                    {ver.replace(/-/g, " ")}
                                                </span>
                                                <p className="font-['Nunito'] text-[12px] text-[#444444] italic">{data.text}</p>
                                            </div>
                                        ))}
                                    </div>
                                </Accordion.Content>
                            </Accordion.Item>
                        )}

                        {/* Pokemon list */}
                        {pokemonWithAbility.length > 0 && (
                            <Accordion.Item value="pokemon" className="border-t border-[#F2F2F2]">
                                <Accordion.Trigger className="flex w-full items-center justify-between py-2 font-['Nunito'] text-[12px] text-[#888888] hover:text-[#111111] transition-colors">
                                    Pokémon con esta habilidad ({ability?.pokemon?.length ?? 0})
                                    <motion.div animate={{ rotate: open === "pokemon" ? 180 : 0 }} transition={{ duration: 0.2 }}>
                                        <ChevronDown size={14} />
                                    </motion.div>
                                </Accordion.Trigger>
                                <Accordion.Content>
                                    <div className="pb-3 flex flex-wrap gap-2">
                                        {pokemonWithAbility.map((p: any) => {
                                            const id = getIdFromUrl(p.pokemon.url)
                                            const isCurrentPokemon = id === pokemonId
                                            return (
                                                <Link
                                                    key={p.pokemon.name}
                                                    href={`/pokemon/${id}`}
                                                    className="flex flex-col items-center gap-1 group"
                                                >
                                                    <motion.div
                                                        className="relative"
                                                        style={{
                                                            border: isCurrentPokemon ? "2px solid #CC0000" : "1px solid #E0E0E0",
                                                            padding: 4,
                                                            backgroundColor: "#F8F8F8"
                                                        }}
                                                        whileHover={{ scale: 1.08, borderColor: "#111111" }}
                                                    >
                                                        <Image
                                                            src={getPokemonSpriteUrl(id)}
                                                            alt={p.pokemon.name}
                                                            width={40}
                                                            height={40}
                                                            style={{ imageRendering: "pixelated" }}
                                                        />
                                                    </motion.div>
                                                    <span className="font-['Nunito'] text-[9px] text-[#888888] capitalize group-hover:text-[#111111] transition-colors text-center max-w-[48px] truncate">
                                                        {p.pokemon.name}
                                                    </span>
                                                </Link>
                                            )
                                        })}
                                        {(ability?.pokemon?.length ?? 0) > 20 && (
                                            <div className="flex items-center justify-center text-[#888888] font-['Nunito'] text-[11px] italic">
                                                y {(ability!.pokemon!.length) - 20} más...
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
        <div>
            <h3 className="font-['Press_Start_2P'] text-[9px] text-[#888888] mb-5 tracking-wide">HABILIDADES</h3>
            {abilities.map((a, i) => (
                <AbilityCard key={a.ability.name} abilitySlot={a} pokemonId={pokemonId} index={i} />
            ))}
        </div>
    )
}
