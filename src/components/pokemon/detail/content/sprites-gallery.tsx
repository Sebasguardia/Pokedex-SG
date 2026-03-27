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
        <div className="space-y-6 mb-8">
            <h3 className="font-['Press_Start_2P'] text-[12px] text-[#111111] mb-6 flex items-center gap-3">
                <span className="w-3 h-3 bg-[#111111]" />
                GALERÍA DE SPRITES
                <span className="flex-1 h-[2px] bg-[#E0E0E0]" />
            </h3>

            <Accordion.Root type="multiple" defaultValue={["Actual"]} className="space-y-3">
                {genSprites.map(({ gen, entries }) => (
                    <Accordion.Item key={gen} value={gen} className="bg-white border-[3px] border-[#111111] shadow-[4px_4px_0_#111111] overflow-hidden">
                        <Accordion.Trigger className="flex w-full items-center justify-between px-5 py-4 font-['Press_Start_2P'] text-[10px] text-[#111111] hover:bg-[#F9F9F9] transition-all group">
                            {gen.toUpperCase()}
                            <motion.div 
                                animate={{ rotate: 0 }} 
                                className="p-1 border-2 border-[#111111] group-hover:bg-[#111111] group-hover:text-white"
                            >
                                <ChevronDown size={14} strokeWidth={3} />
                            </motion.div>
                        </Accordion.Trigger>
                        <Accordion.Content className="px-5 pb-5 overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up border-t-2 border-[#F0F0F0]">
                            <div className="flex flex-wrap gap-4 pt-4">
                                {entries.map(({ label, url }) => (
                                    url && (
                                        <motion.button
                                            key={label}
                                            onClick={() => setLightbox({ url, label })}
                                            className="flex flex-col items-center gap-2 cursor-zoom-in group"
                                            whileHover={{ scale: 1.1, translateY: -2 }}
                                        >
                                            <div
                                                className="bg-white flex items-center justify-center p-2 border-2 border-[#111111] shadow-[3px_3px_0_rgba(0,0,0,0.1)] group-hover:shadow-[4px_4px_0_#111111] transition-all"
                                                style={{ width: 72, height: 72 }}
                                            >
                                                <Image
                                                    src={url}
                                                    alt={label}
                                                    width={64}
                                                    height={64}
                                                    style={{ imageRendering: "pixelated" }}
                                                />
                                            </div>
                                            <span className="font-['Press_Start_2P'] text-[6px] text-[#888888] text-center max-w-[72px] leading-tight group-hover:text-[#111111] transition-colors">{label}</span>
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
                    <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white p-10 flex flex-col items-center gap-6" style={{ border: "4px solid #111111", boxShadow: "12px 12px 0 #111111", borderRadius: "0" }}>
                        <Dialog.Close asChild>
                            <button className="absolute top-4 right-4 p-2 border-2 border-[#111111] hover:bg-[#111111] hover:text-white transition-all shadow-[2px_2px_0_#111111]">
                                <X size={20} strokeWidth={3} />
                            </button>
                        </Dialog.Close>
                        {lightbox && (
                            <>
                                <div className="p-8 bg-[#F9F9F9] border-2 border-[#111111] shadow-inner">
                                    <Image
                                        src={lightbox.url}
                                        alt={lightbox.label}
                                        width={256}
                                        height={256}
                                        style={{ imageRendering: "pixelated" }}
                                        className="drop-shadow-[4px_4px_0_rgba(0,0,0,0.1)]"
                                    />
                                </div>
                                <p className="font-['Press_Start_2P'] text-[10px] text-[#111111] uppercase border-b-2 border-[#CC0000] pb-2">{lightbox.label}</p>
                            </>
                        )}
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    )
}
