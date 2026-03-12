"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Key, Compass, BookOpen, MapPin } from "lucide-react"
import { ItemFlavorCarousel } from "../item-flavor-carousel"
import { RelatedItemsCarousel } from "../related-items-carousel"
import { POCKET_META } from "@/lib/constants/items.constants"

interface Props {
    item: any
    heldPokemon: any[]
    pocket: string
}

const ACCENT = "#EA580C"

export function KeyItemDetailLayout({ item, heldPokemon, pocket }: Props) {
    const config = POCKET_META[pocket] || POCKET_META.key
    const esName = item.names?.find((n: any) => n.language.name === "es")?.name || item.name.replace(/-/g, " ")
    const esEffect = item.effect_entries?.find((e: any) => e.language.name === "es")?.effect
    const enEffect = item.effect_entries?.find((e: any) => e.language.name === "en")?.effect
    const effectText = esEffect || enEffect || ""
    const esFlavor = item.flavor_text_entries?.find((f: any) => f.language.name === "es")?.text || ""
    const enFlavor = item.flavor_text_entries?.find((f: any) => f.language.name === "en")?.text || ""
    const shortFlavor = esFlavor || enFlavor || "Sin descripción disponible."

    const versions: string[] = []
    item.flavor_text_entries?.forEach((f: any) => {
        if (f.version_group?.name && !versions.includes(f.version_group.name)) versions.push(f.version_group.name)
    })

    return (
        <div className="min-h-screen bg-[#FFFFFF] pb-32">
            {/* HERO — Adventure journal, aged paper with orange flame */}
            <section
                className="relative pt-12 pb-20 overflow-hidden border-b-2 border-[#111111]"
                style={{ background: "linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 60%, #FED7AA 100%)" }}
            >
                {/* Map grid dot pattern */}
                <div className="absolute inset-0 pointer-events-none"
                    style={{ backgroundImage: "radial-gradient(rgba(234,88,12,0.12) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />

                {/* "OBJETO ÚNICO" stamp watermark */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.08] -rotate-12">
                    <span className="font-press-start text-[60px] text-[#EA580C] whitespace-nowrap">ÚNICO</span>
                </div>

                <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6">
                    <div className="font-nunito text-[12px] text-[#888888] mb-10 flex items-center gap-2">
                        <Link href={`/items?pocket=${pocket}`} className="hover:text-[#EA580C] hover:underline flex items-center gap-1 transition-colors">
                            <ChevronLeft size={10} /> Mochila
                        </Link>
                        <span>/</span>
                        <span className="text-[#EA580C] font-bold">{config?.label || "Objetos Clave"}</span>
                        <span>/</span>
                        <span className="text-[#111111] font-bold capitalize">{esName}</span>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-4 flex justify-center">
                            <div className="relative">
                                <motion.div
                                    className="w-48 h-48 border-4 border-[#EA580C] flex items-center justify-center bg-[#FFF7ED]"
                                    style={{ boxShadow: "8px 8px 0 #111111" }}
                                    animate={{ boxShadow: ["8px 8px 0 #111111", "8px 8px 0 #EA580C", "8px 8px 0 #111111"] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                >
                                    {item.sprites?.default ? (
                                        <Image src={item.sprites.default} alt={esName} width={100} height={100} style={{ imageRendering: "pixelated" }} />
                                    ) : (
                                        <Key size={64} className="text-[#EA580C]" />
                                    )}
                                </motion.div>

                                {/* Crown badge */}
                                <motion.div
                                    className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#EA580C] border-2 border-[#111111] px-3 py-1 shadow-[3px_3px_0_#111111]"
                                    initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.4, type: "spring" }}
                                >
                                    <span className="font-press-start text-[7px] text-white">★ OBJETO ÚNICO</span>
                                </motion.div>
                            </div>
                        </div>

                        <div className="lg:col-span-8">
                            <div className="flex flex-wrap gap-2 mb-5">
                                <div className="flex items-center gap-2 px-3 py-1.5 border-2 border-[#111111] shadow-[2px_2px_0_#111111] bg-[#FFEDD5]">
                                    <Key size={14} className="text-[#EA580C]" />
                                    <span className="font-nunito font-bold text-[11px] uppercase tracking-wider text-[#EA580C]">OBJETO CLAVE</span>
                                </div>
                                <div className="px-3 py-1.5 bg-[#111111] border-2 border-[#111111] flex items-center gap-2 shadow-[2px_2px_0_#EA580C]">
                                    <span className="font-press-start text-[7px] text-[#EA580C]">NO VENDIBLE</span>
                                </div>
                            </div>

                            <h1 className="font-press-start text-3xl sm:text-4xl text-[#111111] mb-3 capitalize">{esName}</h1>
                            <p className="font-nunito text-[16px] text-[#444444] leading-relaxed italic mb-8 max-w-xl">"{shortFlavor.replace(/\n/g, " ")}"</p>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-[-2.5px] left-0 w-full h-[5px]">
                    <div className="absolute top-0 left-0 w-full h-[3px] bg-[#111111]" />
                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#EA580C]" />
                </div>
            </section>

            <main className="max-w-[1280px] mx-auto px-4 sm:px-6 mt-16">
                <div className="grid lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-8 space-y-16">

                        {/* Journey role */}
                        <section className="space-y-6">
                            <div className="flex items-center gap-2">
                                <Compass size={16} className="text-[#EA580C]" />
                                <h3 className="font-press-start text-[10px] text-[#111111] uppercase tracking-wider">ROL EN LA AVENTURA</h3>
                            </div>
                            <div className="p-6 border-2 border-[#111111] bg-[#FFF7ED] shadow-[6px_6px_0_#EA580C]"
                                style={{ borderLeftWidth: 6, borderLeftColor: "#EA580C" }}>
                                <p className="font-nunito text-[16px] text-[#7C2D12] leading-relaxed font-medium">
                                    {effectText || "Objeto indispensable para avanzar en tu viaje como Entrenador Pokémon."}
                                </p>
                            </div>
                        </section>

                        {/* Milestone info */}
                        <section className="space-y-4">
                            <div className="flex items-center gap-2">
                                <MapPin size={16} className="text-[#EA580C]" />
                                <h3 className="font-press-start text-[10px] text-[#111111] uppercase tracking-wider">INFORMACIÓN EN JUEGO</h3>
                            </div>
                            <div className="grid sm:grid-cols-3 gap-4">
                                {[
                                    { label: "TIPO", value: item.category?.name?.replace(/-/g, " ") || "Objeto Clave", color: "#EA580C" },
                                    { label: "PRECIO VENTA", value: "No vendible", color: "#888888" },
                                    { label: "ATRIBUTOS", value: item.attributes?.length ? `${item.attributes.length} atributos` : "Ninguno", color: "#EA580C" },
                                ].map((info, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.08 }}
                                        className="p-4 border-2 border-[#111111] bg-white shadow-[3px_3px_0_#111111]"
                                    >
                                        <div className="font-press-start text-[7px] text-[#888888] mb-2">{info.label}</div>
                                        <div className="font-nunito font-bold text-[14px] capitalize" style={{ color: info.color }}>{info.value}</div>
                                    </motion.div>
                                ))}
                            </div>
                        </section>

                        {/* Version list */}
                        {versions.length > 0 && (
                            <section className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <BookOpen size={16} className="text-[#EA580C]" />
                                    <h3 className="font-press-start text-[10px] text-[#111111] uppercase tracking-wider">APARECE EN</h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {versions.slice(0, 12).map(v => (
                                        <span key={v} className="px-3 py-1.5 border-2 border-[#EA580C] bg-[#FFEDD5] font-press-start text-[7px] text-[#9A3412] shadow-[2px_2px_0_#111111]">
                                            {v.replace(/-/g, " ").toUpperCase()}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    <div className="lg:col-span-4 space-y-12">
                        <ItemFlavorCarousel flavors={item.flavor_text_entries} pocket="key" />
                        <RelatedItemsCarousel pocket="key" currentItemName={item.name} />
                    </div>
                </div>
            </main>
        </div>
    )
}
