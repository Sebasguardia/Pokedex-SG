"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Disc, Zap, BookOpen } from "lucide-react"
import { ItemFlavorCarousel } from "../item-flavor-carousel"
import { RelatedItemsCarousel } from "../related-items-carousel"
import { ItemMachinesSection } from "../item-machines-section"
import { POCKET_META } from "@/lib/constants/items.constants"

interface Props {
    item: any
    heldPokemon: any[]
    pocket: string
}

const ACCENT = "#2563EB"

export function MachineDetailLayout({ item, heldPokemon, pocket }: Props) {
    const config = POCKET_META[pocket] || POCKET_META.machines
    const esName = item.names?.find((n: any) => n.language.name === "es")?.name || item.name.replace(/-/g, " ")
    const esEffect = item.effect_entries?.find((e: any) => e.language.name === "es")?.effect
    const enEffect = item.effect_entries?.find((e: any) => e.language.name === "en")?.effect
    const effectText = esEffect || enEffect || ""
    const esFlavor = item.flavor_text_entries?.find((f: any) => f.language.name === "es")?.text || ""
    const enFlavor = item.flavor_text_entries?.find((f: any) => f.language.name === "en")?.text || ""
    const shortFlavor = esFlavor || enFlavor || "Sin descripción disponible."
    const isTM = item.name?.toLowerCase().startsWith("tm") || item.name?.toLowerCase().startsWith("hm") || (item.machines?.length > 0)

    // Extract TM number if available from name
    const tmNumberMatch = item.name?.match(/\d+/)
    const tmNumber = tmNumberMatch ? tmNumberMatch[0].padStart(2, "0") : null

    const versions: string[] = []
    item.flavor_text_entries?.forEach((f: any) => {
        if (f.version_group?.name && !versions.includes(f.version_group.name)) versions.push(f.version_group.name)
    })

    return (
        <div className="min-h-screen bg-[#F8FAFF] pb-32">
            {/* HERO — Tech holographic blue */}
            <section className="relative bg-[#0A0F1E] pt-12 pb-20 overflow-hidden border-b-2 border-[#2563EB]">
                {/* Circuit board lines */}
                <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.08 }}>
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="circuit" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                                <path d="M 0 30 H 20 M 40 30 H 60 M 30 0 V 20 M 30 40 V 60 M 20 30 h 20 v -10 h 10 M 30 30 v 10 h -10" stroke="#2563EB" strokeWidth="1" fill="none" />
                                <circle cx="30" cy="30" r="3" fill="#2563EB" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#circuit)" />
                    </svg>
                </div>

                <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6">
                    <div className="font-nunito text-[12px] text-[#2563EB]/70 mb-10 flex items-center gap-2">
                        <Link href={`/items?pocket=${pocket}`} className="hover:text-[#2563EB] hover:underline flex items-center gap-1 transition-colors">
                            <ChevronLeft size={10} /> Mochila
                        </Link>
                        <span>/</span>
                        <span className="text-[#2563EB] font-bold">{config?.label || "TMs & CTs"}</span>
                        <span>/</span>
                        <span className="text-white font-bold capitalize">{esName}</span>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-4 flex justify-center">
                            <div className="relative flex items-center justify-center">
                                {/* Rotating holographic ring */}
                                <motion.div
                                    className="absolute w-52 h-52 rounded-full border-2 border-[#2563EB]/40"
                                    animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                    style={{ boxShadow: "0 0 30px rgba(37,99,235,0.4)" }}
                                />
                                <motion.div
                                    className="absolute w-40 h-40 rounded-full border border-[#60A5FA]/30"
                                    animate={{ rotate: -360 }} transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                                />
                                <motion.div
                                    className="w-36 h-36 rounded-full bg-[#1E293B] border-4 border-[#2563EB] flex flex-col items-center justify-center"
                                    style={{ boxShadow: "0 0 60px rgba(37,99,235,0.6)" }}
                                >
                                    {tmNumber && <div className="font-press-start text-[8px] text-[#60A5FA] mb-2">MT {tmNumber}</div>}
                                    {item.sprites?.default ? (
                                        <Image src={item.sprites.default} alt={esName} width={56} height={56} style={{ imageRendering: "pixelated" }} />
                                    ) : (
                                        <Disc size={48} className="text-[#2563EB]" />
                                    )}
                                </motion.div>
                            </div>
                        </div>

                        <div className="lg:col-span-8">
                            <div className="flex flex-wrap gap-2 mb-5">
                                <div className="flex items-center gap-2 px-3 py-1.5 border-2 border-[#2563EB] shadow-[2px_2px_0_#2563EB] bg-[#1E293B]">
                                    <Disc size={14} className="text-[#2563EB]" />
                                    <span className="font-nunito font-bold text-[11px] uppercase tracking-wider text-[#2563EB]">
                                        {isTM ? (item.name?.toLowerCase().startsWith("hm") ? "CT (HM)" : "MT (TM)") : "MÁQUINA"}
                                    </span>
                                </div>
                                {tmNumber && (
                                    <div className="px-3 py-1.5 bg-[#2563EB] border-2 border-[#2563EB] flex items-center gap-2 shadow-[2px_2px_0_#60A5FA]">
                                        <span className="font-press-start text-[8px] text-white"># {tmNumber}</span>
                                    </div>
                                )}
                            </div>

                            <h1 className="font-press-start text-3xl sm:text-4xl text-white mb-3 capitalize">{esName}</h1>
                            <p className="font-nunito text-[16px] text-[#94A3B8] leading-relaxed italic mb-8 max-w-xl">"{shortFlavor.replace(/\n/g, " ")}"</p>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-[3px]" style={{ background: "linear-gradient(90deg, #2563EB, #60A5FA, #2563EB)" }} />
            </section>

            <main className="max-w-[1280px] mx-auto px-4 sm:px-6 mt-16">
                <div className="grid lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-8 space-y-16">

                        {/* Move showcase */}
                        <section className="space-y-6">
                            <div className="flex items-center gap-2">
                                <Zap size={16} className="text-[#2563EB]" />
                                <h3 className="font-press-start text-[10px] text-[#111111] uppercase tracking-wider">MOVIMIENTO QUE ENSEÑA</h3>
                            </div>
                            <ItemMachinesSection item={item} />
                        </section>

                        {/* Compatibility note */}
                        <section className="space-y-4">
                            <div className="flex items-center gap-2">
                                <BookOpen size={16} className="text-[#2563EB]" />
                                <h3 className="font-press-start text-[10px] text-[#111111] uppercase tracking-wider">COMPATIBILIDAD</h3>
                            </div>
                            <div className="p-6 border-2 border-[#111111] bg-[#F0F5FF] shadow-[4px_4px_0_#2563EB]">
                                <p className="font-nunito text-[15px] text-[#444444] leading-relaxed">
                                    Esta máquina puede ser usada en Pokémon que tengan compatibilidad con el movimiento según su especie. Consulta la Pokédex para ver qué Pokémon pueden aprenderlo.
                                </p>
                            </div>
                        </section>

                        {/* Version list */}
                        {versions.length > 0 && (
                            <section className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <Disc size={16} className="text-[#2563EB]" />
                                    <h3 className="font-press-start text-[10px] text-[#111111] uppercase tracking-wider">DISPONIBLE EN</h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {versions.slice(0, 12).map(v => (
                                        <span key={v} className="px-3 py-1.5 border-2 border-[#2563EB] bg-[#DBEAFE] font-press-start text-[7px] text-[#1D4ED8] shadow-[2px_2px_0_#111111]">
                                            {v.replace(/-/g, " ").toUpperCase()}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    <div className="lg:col-span-4 space-y-12">
                        <ItemFlavorCarousel flavors={item.flavor_text_entries} pocket="machines" />
                        <RelatedItemsCarousel pocket="machines" currentItemName={item.name} />
                    </div>
                </div>
            </main>
        </div>
    )
}
