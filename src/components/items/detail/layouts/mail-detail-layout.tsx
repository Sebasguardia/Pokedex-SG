"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Mail, Stamp, BookOpen, Star } from "lucide-react"
import { ItemFlavorCarousel } from "../item-flavor-carousel"
import { RelatedItemsCarousel } from "../related-items-carousel"
import { POCKET_META } from "@/lib/constants/items/items.constants"

interface Props {
    item: any
    heldPokemon: any[]
    pocket: string
}

const ACCENT = "#7C3AED"

export function MailDetailLayout({ item, heldPokemon, pocket }: Props) {
    const config = POCKET_META[pocket] || POCKET_META.mail
    const esName = item.names?.find((n: any) => n.language.name === "es")?.name || item.name.replace(/-/g, " ")
    const esEffect = item.effect_entries?.find((e: any) => e.language.name === "es")?.effect
    const enEffect = item.effect_entries?.find((e: any) => e.language.name === "en")?.effect
    const effectText = esEffect || enEffect || ""
    const esFlavor = item.flavor_text_entries?.find((f: any) => f.language.name === "es")?.text || ""
    const enFlavor = item.flavor_text_entries?.find((f: any) => f.language.name === "en")?.text || ""
    const shortFlavor = esFlavor || enFlavor || "Sin descripción disponible."

    // Collect unique game versions that featured this mail
    const versions: string[] = []
    item.flavor_text_entries?.forEach((f: any) => {
        if (f.version_group?.name && !versions.includes(f.version_group.name)) {
            versions.push(f.version_group.name)
        }
    })

    return (
        <div className="min-h-screen bg-[#FFFFFF] pb-32">
            {/* HERO — Vintage letter aesthetic */}
            <section
                className="relative pt-12 pb-20 overflow-hidden border-b-2 border-[#111111]"
                style={{ background: "linear-gradient(135deg, #F5F0FF 0%, #EDE9FE 50%, #DDD6FE 100%)" }}
            >
                {/* Parchment texture lines */}
                <div className="absolute inset-0 pointer-events-none"
                    style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 28px, rgba(124,58,237,0.06) 28px, rgba(124,58,237,0.06) 29px)" }} />

                {/* Corner stamps */}
                {["top-4 left-4", "top-4 right-4", "bottom-8 left-4", "bottom-8 right-4"].map((pos, i) => (
                    <motion.div key={i} className={`absolute ${pos} opacity-20`}
                        initial={{ scale: 0, rotate: i % 2 === 0 ? -15 : 15 }} animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.3 + i * 0.1, type: "spring" }}>
                        <Stamp size={28} className="text-[#7C3AED]" />
                    </motion.div>
                ))}

                <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6">
                    <div className="font-nunito text-[12px] text-[#7C3AED]/70 mb-10 flex items-center gap-2">
                        <Link href={`/items?pocket=${pocket}`} className="hover:text-[#7C3AED] hover:underline flex items-center gap-1 transition-colors">
                            <ChevronLeft size={10} /> Mochila
                        </Link>
                        <span>/</span>
                        <span className="text-[#7C3AED] font-bold">{config?.label || "Correo"}</span>
                        <span>/</span>
                        <span className="text-[#111111] font-bold capitalize">{esName}</span>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-4 flex justify-center">
                            {/* Animated envelope */}
                            <div className="relative">
                                <motion.div
                                    className="w-52 h-40 border-2 border-[#7C3AED] bg-white flex items-center justify-center"
                                    style={{ boxShadow: "6px 6px 0 #7C3AED" }}
                                    initial={{ rotateY: -20 }} animate={{ rotateY: 0 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                >
                                    {/* Envelope flap */}
                                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                                        <svg viewBox="0 0 208 160" className="absolute inset-0 w-full h-full">
                                            <path d="M 0 0 L 104 70 L 208 0 Z" fill={`${ACCENT}20`} stroke={ACCENT} strokeWidth="1.5" />
                                        </svg>
                                    </div>
                                    {item.sprites?.default ? (
                                        <Image src={item.sprites.default} alt={esName} width={64} height={64} style={{ imageRendering: "pixelated" }} className="mt-8" />
                                    ) : (
                                        <Mail size={52} className="text-[#7C3AED] mt-8" />
                                    )}
                                </motion.div>

                                {/* Wax seal */}
                                <motion.div
                                    className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#7C3AED] border-2 border-[#111111] flex items-center justify-center shadow-[2px_2px_0_#111111]"
                                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                                    transition={{ delay: 0.6, type: "spring", bounce: 0.5 }}
                                >
                                    <Star size={16} className="text-white" fill="white" />
                                </motion.div>
                            </div>
                        </div>

                        <div className="lg:col-span-8">
                            <div className="flex flex-wrap gap-2 mb-5">
                                <div className="flex items-center gap-2 px-3 py-1.5 border-2 border-[#111111] shadow-[2px_2px_0_#111111] bg-[#EDE9FE]">
                                    <Mail size={14} className="text-[#7C3AED]" />
                                    <span className="font-nunito font-bold text-[11px] uppercase tracking-wider text-[#7C3AED]">CORREO</span>
                                </div>
                                {item.id > 1000 && (
                                    <div className="px-3 py-1.5 bg-[#111111] flex items-center gap-2 shadow-[2px_2px_0_#7C3AED]">
                                        <span className="font-press-start text-[7px] text-[#7C3AED]">COLECCIONABLE</span>
                                    </div>
                                )}
                            </div>

                            <h1 className="font-press-start text-3xl sm:text-4xl text-[#111111] mb-3 capitalize">{esName}</h1>
                            <p className="font-nunito text-[16px] text-[#444444] leading-relaxed italic mb-8 max-w-xl">"{shortFlavor.replace(/\n/g, " ")}"</p>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-[-2.5px] left-0 w-full h-[5px]">
                    <div className="absolute top-0 left-0 w-full h-[3px] bg-[#111111]" />
                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#7C3AED]" />
                </div>
            </section>

            <main className="max-w-[1280px] mx-auto px-4 sm:px-6 mt-16">
                <div className="grid lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-8 space-y-16">

                        {/* Stylized letter preview */}
                        <section className="space-y-6">
                            <div className="flex items-center gap-2">
                                <BookOpen size={16} className="text-[#7C3AED]" />
                                <h3 className="font-press-start text-[10px] text-[#111111] uppercase tracking-wider">NOTA AL RECEPTOR</h3>
                            </div>
                            <div className="p-8 border-2 border-[#7C3AED] bg-[#FEFCFF] shadow-[6px_6px_0_#7C3AED]"
                                style={{ backgroundImage: "repeating-linear-gradient(transparent, transparent 31px, rgba(124,58,237,0.08) 31px, rgba(124,58,237,0.08) 32px)" }}>
                                <div className="font-nunito text-[13px] text-[#7C3AED] mb-4 font-bold">Estimado Entrenador:</div>
                                <p className="font-nunito text-[15px] text-[#444444] leading-[2] italic">
                                    {effectText || shortFlavor || "Este correo especial fue diseñado para enviar un mensaje personal a otro entrenador."}
                                </p>
                                <div className="mt-6 text-right font-nunito text-[12px] text-[#7C3AED]">— Sistema de Correo Pokémon</div>
                            </div>
                        </section>

                        {/* Game versions */}
                        {versions.length > 0 && (
                            <section className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <Stamp size={16} className="text-[#7C3AED]" />
                                    <h3 className="font-press-start text-[10px] text-[#111111] uppercase tracking-wider">APARECE EN</h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {versions.slice(0, 12).map(v => (
                                        <span key={v} className="px-3 py-1.5 border-2 border-[#7C3AED] bg-[#EDE9FE] font-press-start text-[7px] text-[#7C3AED] shadow-[2px_2px_0_#111111]">
                                            {v.replace(/-/g, " ").toUpperCase()}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    <div className="lg:col-span-4 space-y-12">
                        <ItemFlavorCarousel flavors={item.flavor_text_entries} pocket="mail" />
                        <RelatedItemsCarousel pocket="mail" currentItemName={item.name} />
                    </div>
                </div>
            </main>
        </div>
    )
}
