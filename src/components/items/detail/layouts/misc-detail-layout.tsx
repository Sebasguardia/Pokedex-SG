"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Box, Tag, BookOpen, Gem, Bone, Settings, Wrench, Coins, Sparkles, Package } from "lucide-react"
import { ItemFlavorCarousel } from "../item-flavor-carousel"
import { ItemHeldPokemon } from "../item-held-pokemon"
import { RelatedItemsCarousel } from "../related-items-carousel"
import { POCKET_META } from "@/lib/constants/items.constants"

interface Props {
    item: any
    heldPokemon: any[]
    pocket: string
}

const ACCENT = "#6B7280"

function inferSubcategory(item: any): { label: string; icon: React.ReactNode; color: string } {
    const cat = item.category?.name || ""
    if (cat.includes("fossil")) return { label: "Fósil", icon: <Bone size={14} className="text-[#92400E]" />, color: "#92400E" }
    if (cat.includes("gem")) return { label: "Gema", icon: <Gem size={14} className="text-[#7C3AED]" />, color: "#7C3AED" }
    if (cat.includes("held")) return { label: "Objeto Equipable", icon: <Settings size={14} className="text-[#0EA5E9]" />, color: "#0EA5E9" }
    if (cat.includes("shard") || cat.includes("scrap")) return { label: "Material de Canje", icon: <Wrench size={14} className="text-[#F59E0B]" />, color: "#F59E0B" }
    if (cat.includes("valuable")) return { label: "Objeto de Valor", icon: <Coins size={14} className="text-[#CA8A04]" />, color: "#CA8A04" }
    if (cat.includes("plates") || cat.includes("type-enhancement")) return { label: "Potenciador de Tipo", icon: <Sparkles size={14} className="text-[#8B5CF6]" />, color: "#8B5CF6" }
    if (cat.includes("all-mail") || cat.includes("loot")) return { label: "Botín", icon: <Package size={14} className="text-[#6B7280]" />, color: "#6B7280" }
    return { label: "Objeto Especial", icon: <Package size={14} className="text-[#6B7280]" />, color: "#6B7280" }
}

export function MiscDetailLayout({ item, heldPokemon, pocket }: Props) {
    const config = POCKET_META[pocket] || POCKET_META.misc
    const esName = item.names?.find((n: any) => n.language.name === "es")?.name || item.name.replace(/-/g, " ")
    const esEffect = item.effect_entries?.find((e: any) => e.language.name === "es")?.effect
    const enEffect = item.effect_entries?.find((e: any) => e.language.name === "en")?.effect
    const effectText = esEffect || enEffect || ""
    const esFlavor = item.flavor_text_entries?.find((f: any) => f.language.name === "es")?.text || ""
    const enFlavor = item.flavor_text_entries?.find((f: any) => f.language.name === "en")?.text || ""
    const shortFlavor = esFlavor || enFlavor || "Sin descripción disponible."

    const subcategory = inferSubcategory(item)
    const sellPrice = item.cost ? Math.floor(item.cost / 2) : null
    const isHoldable = item.attributes?.some((a: any) => a.name === "holdable")

    return (
        <div className="min-h-screen bg-[#FFFFFF] pb-32">
            {/* HERO — Clean catalog card */}
            <section className="relative bg-white pt-12 pb-20 overflow-hidden border-b-2 border-[#111111]">
                <div className="absolute inset-0 pointer-events-none"
                    style={{ backgroundImage: "radial-gradient(rgba(107,114,128,0.06) 1.5px, transparent 1.5px)", backgroundSize: "28px 28px" }} />

                <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6">
                    <div className="font-nunito text-[12px] text-[#888888] mb-10 flex items-center gap-2">
                        <Link href={`/items?pocket=${pocket}`} className="hover:text-[#6B7280] hover:underline flex items-center gap-1 transition-colors">
                            <ChevronLeft size={10} /> Mochila
                        </Link>
                        <span>/</span>
                        <span className="text-[#6B7280] font-bold">{config?.label || "Otros"}</span>
                        <span>/</span>
                        <span className="text-[#111111] font-bold capitalize">{esName}</span>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-4 flex justify-center">
                            <div className="relative">
                                <motion.div
                                    className="w-48 h-48 border-2 border-[#111111] flex items-center justify-center bg-[#F8F9FA]"
                                    style={{ boxShadow: "8px 8px 0 #111111" }}
                                >
                                    {item.sprites?.default ? (
                                        <Image src={item.sprites.default} alt={esName} width={96} height={96} style={{ imageRendering: "pixelated" }} />
                                    ) : (
                                        <Box size={64} className="text-[#6B7280]" />
                                    )}
                                </motion.div>

                                {/* Price tag */}
                                {sellPrice !== null && (
                                    <motion.div
                                        className="absolute -top-4 -right-4 bg-[#111111] border-2 border-[#111111] px-3 py-2 shadow-[3px_3px_0_#6B7280]"
                                        initial={{ scale: 0, rotate: 10 }} animate={{ scale: 1, rotate: 0 }}
                                        transition={{ type: "spring", delay: 0.5 }}
                                    >
                                        <div className="font-press-start text-[6px] text-[#888888] mb-0.5">VENTA</div>
                                        <div className="font-press-start text-[10px] text-[#F59E0B]">₽ {sellPrice.toLocaleString()}</div>
                                    </motion.div>
                                )}
                            </div>
                        </div>

                        <div className="lg:col-span-8">
                            <div className="flex flex-wrap gap-2 mb-5">
                                <div className="flex items-center gap-2 px-3 py-1.5 border-2 border-[#111111] shadow-[2px_2px_0_#111111] bg-[#F3F4F6]">
                                    <span>{subcategory.icon}</span>
                                    <span className="font-nunito font-bold text-[11px] uppercase tracking-wider text-[#6B7280]">{subcategory.label}</span>
                                </div>
                                {isHoldable && (
                                    <div className="px-3 py-1.5 border-2 border-[#0EA5E9] bg-[#E0F2FE] flex items-center gap-2">
                                        <span className="font-press-start text-[7px] text-[#0369A1]">EQUIPABLE</span>
                                    </div>
                                )}
                            </div>

                            <h1 className="font-press-start text-3xl sm:text-4xl text-[#111111] mb-3 capitalize">{esName}</h1>
                            <p className="font-nunito text-[16px] text-[#444444] leading-relaxed italic mb-8 max-w-xl">"{shortFlavor.replace(/\n/g, " ")}"</p>

                            {/* Price highlight */}
                            {sellPrice !== null && (
                                <div className="inline-flex items-center gap-3 px-5 py-3 border-2 border-[#111111] shadow-[4px_4px_0_#111111] bg-[#F8F9FA]">
                                    <Tag size={18} className="text-[#F59E0B]" />
                                    <div>
                                        <div className="font-press-start text-[7px] text-[#888888] mb-0.5">PRECIO DE VENTA EN TIENDA</div>
                                        <div className="font-press-start text-[14px] text-[#F59E0B]">₽ {sellPrice.toLocaleString()}</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-[-2.5px] left-0 w-full h-[5px]">
                    <div className="absolute top-0 left-0 w-full h-[3px] bg-[#111111]" />
                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#6B7280]" />
                </div>
            </section>

            <main className="max-w-[1280px] mx-auto px-4 sm:px-6 mt-16">
                <div className="grid lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-8 space-y-16">

                        {/* Category details */}
                        <section className="space-y-4">
                            <div className="flex items-center gap-2">
                                <Box size={16} className="text-[#6B7280]" />
                                <h3 className="font-press-start text-[10px] text-[#111111] uppercase tracking-wider">INFORMACIÓN DEL OBJETO</h3>
                            </div>
                            <div className="grid sm:grid-cols-3 gap-4">
                                {[
                                    { label: "CATEGORÍA", value: item.category?.name?.replace(/-/g, " ") || "Sin categoría" },
                                    { label: "PRECIO COMPRA", value: item.cost ? `₽ ${item.cost.toLocaleString()}` : "No disponible" },
                                    { label: "PRECIO VENTA", value: sellPrice !== null ? `₽ ${sellPrice.toLocaleString()}` : "No vendible" },
                                ].map((info, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.08 }}
                                        className="p-4 border-2 border-[#111111] bg-white shadow-[3px_3px_0_#111111]"
                                    >
                                        <div className="font-press-start text-[7px] text-[#888888] mb-2">{info.label}</div>
                                        <div className="font-nunito font-bold text-[14px] text-[#111111] capitalize">{info.value}</div>
                                    </motion.div>
                                ))}
                            </div>
                        </section>

                        {/* Effect */}
                        {effectText && (
                            <section className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <BookOpen size={16} className="text-[#6B7280]" />
                                    <h3 className="font-press-start text-[10px] text-[#111111] uppercase tracking-wider">EFECTO COMPLETO</h3>
                                </div>
                                <div className="p-6 border-l-4 border-2 border-transparent bg-white shadow-[4px_4px_0_#111111]" style={{ borderLeftColor: subcategory.color }}>
                                    <p className="font-nunito text-[15px] text-[#444444] leading-relaxed">{effectText}</p>
                                </div>
                            </section>
                        )}

                        <ItemHeldPokemon pokemon={heldPokemon} pocketAccent={ACCENT} />
                    </div>

                    <div className="lg:col-span-4 space-y-12">
                        <ItemFlavorCarousel flavors={item.flavor_text_entries} pocket="misc" />
                        <RelatedItemsCarousel pocket="misc" currentItemName={item.name} />
                    </div>
                </div>
            </main>
        </div>
    )
}
