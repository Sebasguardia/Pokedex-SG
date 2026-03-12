"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import * as Accordion from "@radix-ui/react-accordion"
import * as Dialog from "@radix-ui/react-dialog"
import { ChevronDown, X } from "lucide-react"
import Image from "next/image"

interface Props {
    sprites?: any
    pokemonId?: number
}

interface SpriteEntry {
    label: string
    url: string | null
}

interface GenSprites {
    gen: string
    entries: SpriteEntry[]
}

function extractGenSprites(sprites: any): GenSprites[] {
    if (!sprites) return []
    const versions = sprites.versions ?? {}
    const result: GenSprites[] = []

    const genMap: Record<string, Record<string, string[]>> = {
        "Gen I": { "generation-i": ["red-blue", "yellow"] },
        "Gen II": { "generation-ii": ["crystal", "gold", "silver"] },
        "Gen III": { "generation-iii": ["ruby-sapphire", "emerald", "firered-leafgreen"] },
        "Gen IV": { "generation-iv": ["diamond-pearl", "platinum", "heartgold-soulsilver"] },
        "Gen V": { "generation-v": ["black-white"] },
        "Gen VI+": { "generation-vi": ["omegaruby-alphasapphire", "x-y"] },
    }

    for (const [genLabel, genData] of Object.entries(genMap)) {
        const entries: SpriteEntry[] = []
        for (const [genKey, games] of Object.entries(genData)) {
            for (const game of games) {
                const game_sprites = versions[genKey]?.[game]
                if (!game_sprites) continue
                const gameLabel = game.replace(/-/g, "/").split("/").map((w: string) => w[0]?.toUpperCase() + w.slice(1)).join("/")
                const variants: [string, string | null][] = [
                    [`${gameLabel} Front`, game_sprites.front_default ?? null],
                    [`${gameLabel} Back`, game_sprites.back_default ?? null],
                    [`${gameLabel} Shiny`, game_sprites.front_shiny ?? null],
                    [`${gameLabel} Shiny Back`, game_sprites.back_shiny ?? null],
                ]
                for (const [label, url] of variants) {
                    if (url) entries.push({ label, url })
                }
            }
        }
        if (entries.length > 0) {
            result.push({ gen: genLabel, entries })
        }
    }

    // Current gen sprites from root
    const currentEntries: SpriteEntry[] = [
        { label: "Frontal", url: sprites.front_default },
        { label: "Espalda", url: sprites.back_default },
        { label: "Shiny", url: sprites.front_shiny },
        { label: "Shiny Espalda", url: sprites.back_shiny },
    ].filter(e => e.url)

    if (currentEntries.length > 0) {
        result.unshift({ gen: "Actual", entries: currentEntries })
    }

    return result
}

export function SpritesGallery({ sprites, pokemonId }: Props) {
    const [lightbox, setLightbox] = useState<{ url: string; label: string } | null>(null)
    const genSprites = extractGenSprites(sprites)

    if (genSprites.length === 0) return null

    return (
        <div className="mb-6">
            <h3 className="font-['Press_Start_2P'] text-[9px] text-[#888888] mb-3 tracking-wide">GALERÍA DE SPRITES</h3>

            <Accordion.Root type="multiple" defaultValue={["Actual"]}>
                {genSprites.map(({ gen, entries }) => (
                    <Accordion.Item key={gen} value={gen} className="border border-[#E0E0E0] mb-2">
                        <Accordion.Trigger className="flex w-full items-center justify-between px-4 py-3 font-['Nunito'] text-[13px] font-bold text-[#111111] hover:bg-[#F8F8F8] transition-colors">
                            {gen}
                            <ChevronDown size={14} className="text-[#888888]" />
                        </Accordion.Trigger>
                        <Accordion.Content className="px-4 pb-4">
                            <div className="flex flex-wrap gap-3">
                                {entries.map(({ label, url }) => (
                                    url && (
                                        <motion.button
                                            key={label}
                                            onClick={() => setLightbox({ url, label })}
                                            className="flex flex-col items-center gap-1 cursor-zoom-in"
                                            whileHover={{ scale: 1.08 }}
                                        >
                                            <div
                                                className="bg-[#F8F8F8] flex items-center justify-center"
                                                style={{ width: 64, height: 64, border: "1px solid #E0E0E0" }}
                                            >
                                                <Image
                                                    src={url}
                                                    alt={label}
                                                    width={56}
                                                    height={56}
                                                    style={{ imageRendering: "pixelated" }}
                                                />
                                            </div>
                                            <span className="font-['Nunito'] text-[9px] text-[#888888] text-center max-w-[64px]">{label}</span>
                                        </motion.button>
                                    )
                                ))}
                            </div>
                        </Accordion.Content>
                    </Accordion.Item>
                ))}
            </Accordion.Root>

            {/* Lightbox Dialog */}
            <Dialog.Root open={!!lightbox} onOpenChange={() => setLightbox(null)}>
                <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-black/60 z-50" />
                    <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white p-8 flex flex-col items-center gap-4" style={{ border: "2px solid #111111", boxShadow: "8px 8px 0 #111111" }}>
                        <Dialog.Close asChild>
                            <button className="absolute top-3 right-3 text-[#888888] hover:text-[#CC0000]">
                                <X size={18} />
                            </button>
                        </Dialog.Close>
                        {lightbox && (
                            <>
                                <Image
                                    src={lightbox.url}
                                    alt={lightbox.label}
                                    width={192}
                                    height={192}
                                    style={{ imageRendering: "pixelated" }}
                                />
                                <p className="font-['Nunito'] text-[13px] text-[#888888]">{lightbox.label}</p>
                            </>
                        )}
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    )
}
