"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ItemSpriteStage } from "./item-sprite-stage"
import { POCKET_COLORS, POCKET_META } from "@/lib/constants/items.constants"
import { Heart, Share2, ChevronLeft, Layers, Sparkles, Key } from "lucide-react"
import { cn } from "@/lib/utils/cn"

interface Props {
    item: any
    pocket: string
}

export function ItemDetailHero({ item, pocket }: Props) {
    const config = POCKET_META[pocket] || POCKET_META.misc

    // Names and effects logic
    const esName = item.names?.find((n: any) => n.language.name === "es")?.name || item.name.replace(/-/g, " ")
    const enName = item.names?.find((n: any) => n.language.name === "en")?.name

    const esFlavor = item.flavor_text_entries?.find((f: any) => f.language.name === "es")?.text || ""
    const enFlavor = item.flavor_text_entries?.find((f: any) => f.language.name === "en")?.text || ""
    const shortEffect = esFlavor || enFlavor || "Sin descripción disponible."

    const nameWords = esName.split(" ")

    return (
        <section className="relative bg-white pt-12 pb-20 overflow-hidden border-b-2 border-[#111111]">
            {/* BACKGROUND PATTERN: POCKET SPECIFIC */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `radial-gradient(${config.acento} 2px, transparent 2px)`,
                        backgroundSize: pocket === "machines" ? "30px 30px" : "40px 40px",
                        backgroundPosition: "0 0"
                    }}
                />
            </div>

            {/* ID WATERMARK */}
            <div className="absolute right-0 bottom-0 pointer-events-none select-none opacity-[0.04]">
                <span className="font-jetbrains text-[180px] font-bold leading-none tracking-tighter">
                    #{String(item.id).padStart(4, "0")}
                </span>
            </div>

            {/* CONTENT GRID */}
            <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6">
                {/* Breakcrumb */}
                <div className="font-nunito text-[12px] text-[#888888] mb-10 flex items-center gap-2">
                    <Link href={`/items?pocket=${pocket}`} className="hover:text-[#CC0000] hover:underline flex items-center gap-1 transition-colors">
                        <ChevronLeft size={10} />
                        Mochila
                    </Link>
                    <span>/</span>
                    <span className="capitalize">{config.label}</span>
                    <span>/</span>
                    <span className="text-[#111111] font-bold capitalize">{esName}</span>
                </div>

                <div className="grid lg:grid-cols-12 gap-12 items-center">
                    {/* LEFT: Sprite Stage */}
                    <div className="lg:col-span-5 flex justify-center lg:justify-start">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        >
                            <ItemSpriteStage item={item} pocket={pocket} size={80} />
                        </motion.div>
                    </div>

                    {/* RIGHT: Content Container */}
                    <div className="lg:col-span-7">
                        <div className="flex flex-wrap gap-2.5 mb-6">
                            {/* Pocket Badge */}
                            <div
                                className="flex items-center gap-2 px-3 py-1.5 border-2 border-[#111111] shadow-[2px_2px_0_#111111]"
                                style={{ backgroundColor: config.fondo }}
                            >
                                <config.icon size={14} style={{ color: config.acento }} />
                                <span className="font-nunito font-bold text-[11px] uppercase tracking-wider" style={{ color: config.acento }}>
                                    BOLSILLO: {config.label}
                                </span>
                            </div>

                            {/* Category Badge */}
                            <div className="px-3 py-1.5 bg-white border-2 border-[#111111] flex items-center gap-2 shadow-[2px_2px_0_#111111]">
                                <Layers size={14} className="text-[#888888]" />
                                <span className="font-nunito font-bold text-[11px] text-[#111111] uppercase tracking-wider">
                                    {item.category?.name.replace(/-/g, " ")}
                                </span>
                            </div>

                            {/* Rare Item Badge */}
                            {(pocket === "key-items" || item.id > 1000) && (
                                <div className="px-3 py-1.5 bg-[#111111] flex items-center gap-2 shadow-[2px_2px_0_#EA580C]">
                                    <Key size={14} className="text-[#EA580C]" />
                                    <span className="font-press-start text-[7px] text-[#EA580C]">OBJETO ÚNICO</span>
                                </div>
                            )}
                        </div>

                        <div className="mb-4">
                            <h1 className="font-press-start text-3xl sm:text-4xl text-[#111111] leading-tight flex flex-wrap gap-x-4">
                                {nameWords.map((word: string, i: number) => (
                                    <motion.span
                                        key={i}
                                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        transition={{
                                            delay: 0.2 + (i * 0.1),
                                            duration: 0.4,
                                            type: "spring",
                                            stiffness: 400
                                        }}
                                        className="capitalize"
                                    >
                                        {word}
                                    </motion.span>
                                ))}
                            </h1>
                            {enName && enName.toLowerCase() !== esName.toLowerCase() && (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                    className="font-nunito text-[#888888] italic text-sm mt-2"
                                >
                                    ({enName})
                                </motion.p>
                            )}
                        </div>

                        {/* Short Effect Rendering */}
                        <div className="max-w-[600px] mb-10">
                            <p className="font-nunito text-[16px] text-[#444444] leading-relaxed italic">
                                "{shortEffect.replace(/\n/g, " ")}"
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap gap-4">
                            <button className="flex items-center gap-3 bg-white border-2 border-[#111111] px-6 py-3 font-press-start text-[9px] hover:bg-[#F2F2F2] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none shadow-[4px_4px_0_#111111]">
                                <Heart size={14} />
                                AGREGAR A FAVORITOS
                            </button>
                            <button className="flex items-center gap-3 bg-[#111111] text-white border-2 border-[#111111] px-6 py-3 font-press-start text-[9px] hover:bg-[#333333] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none shadow-[4px_4px_0_#CC0000]">
                                <Share2 size={14} className="text-[#CC0000]" />
                                COMPARTIR
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* DOUBLE SEPARATOR AT BOTTOM */}
            <div className="absolute bottom-[-2.5px] left-0 w-full h-[5px]">
                <div className="absolute top-0 left-0 w-full h-[3px] bg-[#111111]" />
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#CC0000]" />
            </div>
        </section>
    )
}
