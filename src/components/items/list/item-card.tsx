"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import * as HoverCard from "@radix-ui/react-hover-card"
import { POCKET_COLORS, POCKET_META } from "@/lib/constants/items.constants"
import { Coins, Package } from "lucide-react"
import { cn } from "@/lib/utils/cn"

interface Props {
    item: any
    index: number
    pocket: string
}

export function ItemCard({ item, index, pocket }: Props) {
    const config = POCKET_META[pocket] || POCKET_META.misc

    // Find Spanish name, or use name with capitalized dashes replaced.
    const esName = item.names?.find((n: any) => n.language.name === "es")?.name || item.name.replace(/-/g, " ")

    // Find Spanish effect/flavor, fallback to English.
    const esEffect = item.effect_entries?.find((e: any) => e.language.name === "es")?.short_effect
    const enEffect = item.effect_entries?.find((e: any) => e.language.name === "en")?.short_effect
    const esFlavor = item.flavor_text_entries?.find((f: any) => f.language.name === "es")?.text
    const enFlavor = item.flavor_text_entries?.find((f: any) => f.language.name === "en")?.text

    const shortEffect = esEffect || enEffect || esFlavor || enFlavor || "Sin descripción disponible."

    const isKeyItem = pocket === "key-items" || item.category?.name?.includes("event-items")

    return (
        <HoverCard.Root openDelay={400}>
            <HoverCard.Trigger asChild>
                <Link href={`/items/${item.name}?from=${pocket}`}>
                    <motion.div
                        initial={{ y: -24, opacity: 0, scale: 0.9 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 350,
                            damping: 22,
                            delay: (index % 20) * 0.03
                        }}
                        whileHover={{ x: 3, y: 3, boxShadow: "0px 0px 0 #111111" }}
                        className="group relative bg-white border-2 border-[#111111] overflow-hidden flex flex-col h-full"
                        style={{ boxShadow: "3px 3px 0 #111111" }}
                    >
                        {/* Sprite Area */}
                        <div
                            className="relative h-[80px] flex items-center justify-center transition-colors group-hover:brightness-105"
                            style={{ backgroundColor: config.fondo }}
                        >
                            {/* Rare Item Aura/Glow */}
                            {isKeyItem && (
                                <motion.div
                                    className="absolute w-12 h-12 rounded-full bg-white/40 blur-md pointer-events-none"
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        opacity: [0.3, 0.6, 0.3]
                                    }}
                                    transition={{ duration: 2.5, repeat: Infinity }}
                                />
                            )}

                            <motion.div
                                className="relative z-10"
                                whileHover={{ scale: 1.2 }}
                                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            >
                                <Image
                                    src={item.sprites?.default || "/placeholder-item.png"}
                                    alt={item.name}
                                    width={48}
                                    height={48}
                                    style={{ imageRendering: "pixelated" }}
                                />
                            </motion.div>

                            {isKeyItem && (
                                <div className="absolute top-1.5 left-1.5 bg-[#111111] text-white font-press-start text-[5px] px-1 py-0.5 border border-[#EA580C]">
                                    CLAVE
                                </div>
                            )}
                        </div>

                        {/* Mid Divider */}
                        <div className="h-[2px] bg-[#111111]" />

                        {/* Info Area */}
                        <div className="p-3 flex flex-col gap-1.5 flex-1 min-h-[84px]">
                            <h3 className="font-nunito font-bold text-[12px] text-[#111111] capitalize group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
                                {esName}
                            </h3>

                            <div className="mt-auto flex items-center justify-between">
                                <div className="flex items-center gap-1 text-[#888888]">
                                    <Coins size={10} />
                                    <span className="font-jetbrains text-[10px]">
                                        {item.cost > 0 ? `${item.cost}₽` : "—"}
                                    </span>
                                </div>

                                <div
                                    className="px-1.5 py-0.5 rounded-sm font-nunito font-bold text-[9px] uppercase tracking-tighter"
                                    style={{ backgroundColor: config.fondo, color: config.acento }}
                                >
                                    {item.category?.name.replace(/-/g, " ")}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </Link>
            </HoverCard.Trigger>

            <HoverCard.Portal>
                <HoverCard.Content
                    className="w-[220px] bg-white border-2 border-[#111111] p-4 z-50 animate-in fade-in zoom-in-95 duration-200"
                    style={{ boxShadow: `4px 4px 0 ${config.acento}` }}
                    sideOffset={5}
                >
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                            <Image
                                src={item.sprites?.default || "/placeholder-item.png"}
                                alt={item.name}
                                width={32}
                                height={32}
                                style={{ imageRendering: "pixelated" }}
                            />
                            <div>
                                <h4 className="font-nunito font-bold text-[14px] leading-tight capitalize">{esName}</h4>
                                <p className="font-nunito text-[11px] text-[#888888]">ID: #{String(item.id).padStart(4, "0")}</p>
                            </div>
                        </div>

                        <div className="h-px bg-[#E0E0E0] w-full" />

                        <p className="font-nunito text-[12px] text-[#444444] italic line-clamp-3 leading-relaxed">
                            {shortEffect}
                        </p>

                        <div className="flex items-center gap-2 text-[#888888] font-nunito text-[10px]">
                            <Package size={10} />
                            <span>Click para más detalles →</span>
                        </div>
                    </div>
                </HoverCard.Content>
            </HoverCard.Portal>
        </HoverCard.Root>
    )
}
