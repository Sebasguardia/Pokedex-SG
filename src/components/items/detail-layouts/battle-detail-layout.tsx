"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Swords, TrendingUp, Shield, Zap, Layers, BookOpen, ArrowUp, Leaf } from "lucide-react"
import { ItemFlavorCarousel } from "../item-flavor-carousel"
import { ItemHeldPokemon } from "../item-held-pokemon"
import { RelatedItemsCarousel } from "../related-items-carousel"
import { POCKET_META } from "@/lib/constants/items.constants"

interface Props {
    item: any
    heldPokemon: any[]
    pocket: string
}

const STATS = [
    { key: "ataque", label: "ATK", color: "#EF4444" },
    { key: "defensa", label: "DEF", color: "#3B82F6" },
    { key: "ataque especial", label: "S.ATK", color: "#A855F7" },
    { key: "defensa especial", label: "S.DEF", color: "#0EA5E9" },
    { key: "velocidad", label: "VEL", color: "#F97316" },
    { key: "evasión", label: "EVA", color: "#16A34A" },
    { key: "precisión", label: "PRE", color: "#F59E0B" },
]

function detectBoostedStats(effectText: string): string[] {
    const lower = effectText.toLowerCase()
    const boosted: string[] = []
    if (lower.includes("ataque")) boosted.push("ataque")
    if (lower.includes("defensa")) boosted.push("defensa")
    if (lower.includes("ataque especial") || lower.includes("sp. atk")) boosted.push("ataque especial")
    if (lower.includes("defensa especial") || lower.includes("sp. def")) boosted.push("defensa especial")
    if (lower.includes("velocidad") || lower.includes("speed")) boosted.push("velocidad")
    if (lower.includes("evasión") || lower.includes("evasion")) boosted.push("evasión")
    if (lower.includes("precisión") || lower.includes("accuracy")) boosted.push("precisión")
    return boosted
}

const ACCENT = "#D97706"

export function BattleDetailLayout({ item, heldPokemon, pocket }: Props) {
    const config = POCKET_META[pocket] || POCKET_META.battle
    const esName = item.names?.find((n: any) => n.language.name === "es")?.name || item.name.replace(/-/g, " ")
    const esEffect = item.effect_entries?.find((e: any) => e.language.name === "es")?.effect
    const enEffect = item.effect_entries?.find((e: any) => e.language.name === "en")?.effect
    const effectText = esEffect || enEffect || ""
    const esFlavor = item.flavor_text_entries?.find((f: any) => f.language.name === "es")?.text || ""
    const enFlavor = item.flavor_text_entries?.find((f: any) => f.language.name === "en")?.text || ""
    const shortFlavor = esFlavor || enFlavor || "Sin descripción disponible."
    const boosted = detectBoostedStats(effectText)
    const isConsumable = item.attributes?.some((a: any) => a.name === "consumable")
    const isHoldable = item.attributes?.some((a: any) => a.name === "holdable")

    return (
        <div className="min-h-screen bg-[#FFFFFF] pb-32">
            {/* HERO — Combat HUD theme, dark amber */}
            <section className="relative bg-[#111111] pt-12 pb-20 overflow-hidden border-b-2 border-[#111111]">
                {/* Hexagon pattern bg */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
                    {[...Array(12)].map((_, i) => (
                        <div key={i} className="absolute border-2 border-[#D97706]"
                            style={{
                                width: 80, height: 80,
                                left: `${(i % 6) * 18 + 2}%`,
                                top: `${Math.floor(i / 6) * 50 + 5}%`,
                                transform: "rotate(30deg)"
                            }}
                        />
                    ))}
                </div>

                <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6">
                    <div className="font-nunito text-[12px] text-[#888888] mb-10 flex items-center gap-2">
                        <Link href={`/items?pocket=${pocket}`} className="hover:text-[#D97706] hover:underline flex items-center gap-1 transition-colors">
                            <ChevronLeft size={10} /> Mochila
                        </Link>
                        <span>/</span>
                        <span className="text-[#D97706] font-bold">{config?.label || "Batalla"}</span>
                        <span>/</span>
                        <span className="text-white font-bold capitalize">{esName}</span>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-4 flex justify-center">
                            <div className="relative">
                                {/* Hexagon frame */}
                                <motion.div
                                    className="w-48 h-48 flex items-center justify-center border-4 border-[#D97706]"
                                    style={{ clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)", backgroundColor: "#1A1A1A", boxShadow: `0 0 60px ${ACCENT}60` }}
                                    animate={{ boxShadow: [`0 0 40px ${ACCENT}40`, `0 0 80px ${ACCENT}80`, `0 0 40px ${ACCENT}40`] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    {item.sprites?.default ? (
                                        <Image src={item.sprites.default} alt={esName} width={80} height={80} style={{ imageRendering: "pixelated" }} />
                                    ) : (
                                        <Swords size={60} className="text-[#D97706]" />
                                    )}
                                </motion.div>

                                <motion.div
                                    className="absolute -top-3 -right-3 bg-[#D97706] border-2 border-[#111111] px-2 py-1"
                                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                                    transition={{ type: "spring", bounce: 0.6, delay: 0.5 }}
                                >
                                    <span className="font-press-start text-[7px] text-black">COMBATE</span>
                                </motion.div>
                            </div>
                        </div>

                        <div className="lg:col-span-8">
                            <div className="flex flex-wrap gap-2 mb-5">
                                <div className="flex items-center gap-2 px-3 py-1.5 border-2 border-[#D97706] shadow-[2px_2px_0_#D97706]" style={{ backgroundColor: "#1A1A1A" }}>
                                    <Swords size={14} className="text-[#D97706]" />
                                    <span className="font-nunito font-bold text-[11px] uppercase tracking-wider text-[#D97706]">OBJETO DE BATALLA</span>
                                </div>
                                {isConsumable && (
                                    <div className="px-3 py-1.5 border-2 border-[#EF4444] flex items-center gap-2" style={{ backgroundColor: "#1A1A1A" }}>
                                        <span className="font-press-start text-[7px] text-[#EF4444]">USO ÚNICO</span>
                                    </div>
                                )}
                                {isHoldable && (
                                    <div className="px-3 py-1.5 border-2 border-[#3B82F6] flex items-center gap-2" style={{ backgroundColor: "#1A1A1A" }}>
                                        <span className="font-press-start text-[7px] text-[#3B82F6]">EQUIPABLE</span>
                                    </div>
                                )}
                            </div>

                            <h1 className="font-press-start text-3xl sm:text-4xl text-white mb-3 capitalize">{esName}</h1>
                            <p className="font-nunito text-[16px] text-[#AAAAAA] leading-relaxed italic mb-8 max-w-xl">"{shortFlavor.replace(/\n/g, " ")}"</p>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-[-2.5px] left-0 w-full h-[5px]">
                    <div className="absolute top-0 left-0 w-full h-[3px] bg-[#D97706]" />
                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#111111]" />
                </div>
            </section>

            <main className="max-w-[1280px] mx-auto px-4 sm:px-6 mt-16">
                <div className="grid lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-8 space-y-16">

                        {/* Stat boost grid */}
                        {STATS.length > 0 && (
                            <section className="space-y-6">
                                <div className="flex items-center gap-2">
                                    <TrendingUp size={16} className="text-[#D97706]" />
                                    <h3 className="font-press-start text-[10px] text-[#111111] uppercase tracking-wider">ESTADÍSTICAS AFECTADAS</h3>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                    {STATS.map((stat, i) => {
                                        const isBoosted = boosted.includes(stat.key)
                                        return (
                                            <motion.div
                                                key={stat.key}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: i * 0.06 }}
                                                className="flex flex-col items-center gap-2 p-4 border-2"
                                                style={{
                                                    borderColor: isBoosted ? stat.color : "#E0E0E0",
                                                    backgroundColor: isBoosted ? `${stat.color}12` : "#F8F8F8",
                                                    boxShadow: isBoosted ? `3px 3px 0 ${stat.color}` : "none",
                                                    opacity: isBoosted ? 1 : 0.35
                                                }}
                                            >
                                                {isBoosted && (
                                                    <motion.div
                                                        initial={{ y: 4 }} animate={{ y: -4 }}
                                                        transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
                                                    >
                                                        <ArrowUp size={16} style={{ color: stat.color }} />
                                                    </motion.div>
                                                )}
                                                <span className="font-press-start text-[9px]" style={{ color: isBoosted ? stat.color : "#888888" }}>
                                                    {stat.label}
                                                </span>
                                            </motion.div>
                                        )
                                    })}
                                </div>
                                {boosted.length === 0 && (
                                    <p className="font-nunito text-[13px] text-[#888888] italic">Lee el efecto completo para conocer el impacto en combate.</p>
                                )}
                            </section>
                        )}

                        {/* Battle vs out-of-battle */}
                        <section className="space-y-4">
                            <div className="flex items-center gap-2">
                                <Swords size={16} className="text-[#D97706]" />
                                <h3 className="font-press-start text-[10px] text-[#111111] uppercase tracking-wider">CONTEXTO DE USO</h3>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="p-5 border-2 border-[#111111] bg-[#111111] shadow-[3px_3px_0_#D97706]">
                                    <div className="flex items-center gap-1.5 text-[#D97706] mb-3">
                                        <Swords size={12} />
                                        <span className="font-press-start text-[7px]">EN COMBATE</span>
                                    </div>
                                    <p className="font-nunito text-[13px] text-[#AAAAAA] leading-relaxed">
                                        {isConsumable ? "Se consume al usarse. El efecto dura hasta el fin del combate salvo condición especial." : "Úsalo estratégicamente para cambiar el rumbo del combate."}
                                    </p>
                                </div>
                                <div className="p-5 border-2 border-[#111111] bg-white shadow-[3px_3px_0_#111111]">
                                    <div className="flex items-center gap-1.5 text-[#888888] mb-3">
                                        <Leaf size={12} />
                                        <span className="font-press-start text-[7px]">FUERA DE BATALLA</span>
                                    </div>
                                    <p className="font-nunito text-[13px] text-[#444444] leading-relaxed">
                                        {isHoldable ? "Puede equiparse a un Pokémon para activación automática en ciertos momentos." : "Algunos efectos persisten fuera de batalla. Revisa el efecto completo."}
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Effect */}
                        <section className="space-y-4">
                            <div className="flex items-center gap-2">
                                <BookOpen size={16} className="text-[#D97706]" />
                                <h3 className="font-press-start text-[10px] text-[#111111] uppercase tracking-wider">EFECTO COMPLETO</h3>
                            </div>
                            <div className="p-6 border-l-4 border-2 border-transparent bg-white shadow-[4px_4px_0_#111111]" style={{ borderLeftColor: ACCENT }}>
                                <p className="font-nunito text-[15px] text-[#444444] leading-relaxed">{effectText || "Sin datos de efecto disponibles."}</p>
                            </div>
                        </section>

                        <ItemHeldPokemon pokemon={heldPokemon} pocketAccent={ACCENT} />
                    </div>

                    <div className="lg:col-span-4 space-y-12">
                        <ItemFlavorCarousel flavors={item.flavor_text_entries} pocket="battle" />
                        <RelatedItemsCarousel pocket="battle" currentItemName={item.name} />
                    </div>
                </div>
            </main>
        </div>
    )
}
