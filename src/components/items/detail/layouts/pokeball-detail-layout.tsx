"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Circle, Target, Zap, Shield, Layers, BookOpen, Moon, BarChart, Star } from "lucide-react"
import { ItemFlavorCarousel } from "../item-flavor-carousel"
import { RelatedItemsCarousel } from "../related-items-carousel"
import { POCKET_META } from "@/lib/constants/items.constants"

interface Props {
    item: any
    heldPokemon: any[]
    pocket: string
}

const BALL_CATCH_RATES: Record<string, { multiplier: number; color: string; context: string }> = {
    "poke-ball": { multiplier: 1, color: "#EF4444", context: "Captura básica sin condición especial" },
    "great-ball": { multiplier: 1.5, color: "#3B82F6", context: "Mejor tasa que la Poké Ball estándar" },
    "ultra-ball": { multiplier: 2, color: "#F59E0B", context: "Alta efectividad en la mayoría de situaciones" },
    "master-ball": { multiplier: 999, color: "#A855F7", context: "Captura garantizada — ¡Única en el juego!" },
    "net-ball": { multiplier: 3.5, color: "#06B6D4", context: "Ultra-efectiva contra tipo Agua y Bicho" },
    "dive-ball": { multiplier: 3.5, color: "#0EA5E9", context: "Muy efectiva en surf o buceo" },
    "dusk-ball": { multiplier: 3.5, color: "#6B7280", context: "Efectiva de noche o en cuevas" },
    "heal-ball": { multiplier: 1, color: "#F9A8D4", context: "Cura al Pokémon capturado automáticamente" },
    "luxury-ball": { multiplier: 1, color: "#F97316", context: "Aumenta la felicidad del Pokémon capturado" },
    "timer-ball": { multiplier: 4, color: "#84CC16", context: "Mejora con cada turno de combate transcurrido" },
    "quick-ball": { multiplier: 4, color: "#FACC15", context: "Máxima eficacia en el primer turno de combate" },
    "repeat-ball": { multiplier: 3.5, color: "#F472B6", context: "Muy efectiva contra Pokémon ya capturados" },
}

function getCatchRateData(itemName: string) {
    if (BALL_CATCH_RATES[itemName]) return BALL_CATCH_RATES[itemName]
    if (itemName.includes("ball")) return { multiplier: 1, color: "#CA8A04", context: "Bola de captura con propiedades especiales" }
    return null
}

function CatchRateRing({ multiplier, color }: { multiplier: number; color: string }) {
    const maxMultiplier = 4
    const pct = Math.min(multiplier / maxMultiplier, 1)
    const r = 54
    const circ = 2 * Math.PI * r
    const dashOffset = circ * (1 - pct)

    return (
        <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 128 128">
                <circle cx="64" cy="64" r={r} fill="none" stroke="#F2F2F2" strokeWidth="10" />
                <motion.circle
                    cx="64" cy="64" r={r}
                    fill="none"
                    stroke={color}
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={circ}
                    initial={{ strokeDashoffset: circ }}
                    whileInView={{ strokeDashoffset: dashOffset }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                />
            </svg>
            <div className="text-center">
                <div className="font-press-start text-[14px]" style={{ color }}>{multiplier === 999 ? "∞" : `${multiplier}×`}</div>
                <div className="font-nunito text-[9px] text-[#888888] mt-0.5">CAPTURA</div>
            </div>
        </div>
    )
}

export function PokeballDetailLayout({ item, heldPokemon, pocket }: Props) {
    const esName = item.names?.find((n: any) => n.language.name === "es")?.name || item.name.replace(/-/g, " ")
    const esEffect = item.effect_entries?.find((e: any) => e.language.name === "es")?.effect
    const enEffect = item.effect_entries?.find((e: any) => e.language.name === "en")?.effect
    const effectText = esEffect || enEffect || ""
    const esFlavor = item.flavor_text_entries?.find((f: any) => f.language.name === "es")?.text || ""
    const enFlavor = item.flavor_text_entries?.find((f: any) => f.language.name === "en")?.text || ""
    const shortFlavor = esFlavor || enFlavor || "Sin descripción disponible."
    const catchData = getCatchRateData(item.name)
    const accentColor = catchData?.color || "#CA8A04"

    return (
        <div className="min-h-screen bg-[#FFFFFF] pb-32">
            {/* HERO */}
            <section className="relative bg-white pt-12 pb-20 overflow-hidden border-b-2 border-[#111111]">
                {/* Concentric circles bg */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.04]">
                    {[300, 240, 180, 120, 60].map(size => (
                        <div key={size} className="absolute rounded-full border-4" style={{ width: size, height: size, borderColor: accentColor }} />
                    ))}
                </div>

                <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6">
                    <div className="font-nunito text-[12px] text-[#888888] mb-10 flex items-center gap-2">
                        <Link href={`/items?pocket=${pocket}`} className="hover:underline flex items-center gap-1 transition-colors" style={{ color: accentColor }}>
                            <ChevronLeft size={10} /> Mochila
                        </Link>
                        <span>/</span>
                        <span style={{ color: accentColor }} className="font-bold">{POCKET_META[pocket]?.label || "Poké Balls"}</span>
                        <span>/</span>
                        <span className="text-[#111111] font-bold capitalize">{esName}</span>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-4 flex justify-center">
                            <div className="relative">
                                <motion.div
                                    className="w-48 h-48 rounded-full border-4 flex items-center justify-center"
                                    style={{ backgroundColor: `${accentColor}10`, borderColor: accentColor, boxShadow: `0 0 60px ${accentColor}40` }}
                                    animate={{ rotate: [0, 5, -5, 0] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                >
                                    {item.sprites?.default ? (
                                        <Image src={item.sprites.default} alt={esName} width={100} height={100} style={{ imageRendering: "pixelated" }} />
                                    ) : (
                                        <Circle size={64} style={{ color: accentColor }} />
                                    )}
                                </motion.div>
                                {/* Catch ring overlay */}
                                <motion.div
                                    className="absolute -bottom-4 -right-4"
                                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                                    transition={{ type: "spring", bounce: 0.5, delay: 0.5 }}
                                >
                                    {catchData && <CatchRateRing multiplier={catchData.multiplier} color={accentColor} />}
                                </motion.div>
                            </div>
                        </div>

                        <div className="lg:col-span-8">
                            <div className="flex flex-wrap gap-2 mb-5">
                                <div className="flex items-center gap-2 px-3 py-1.5 border-2 border-[#111111] shadow-[2px_2px_0_#111111]" style={{ backgroundColor: `${accentColor}20` }}>
                                    <Circle size={14} style={{ color: accentColor }} />
                                    <span className="font-nunito font-bold text-[11px] uppercase tracking-wider" style={{ color: accentColor }}>POKÉ BALL</span>
                                </div>
                                <div className="px-3 py-1.5 bg-white border-2 border-[#111111] flex items-center gap-2 shadow-[2px_2px_0_#111111]">
                                    <Layers size={14} className="text-[#888888]" />
                                    <span className="font-nunito font-bold text-[11px] text-[#111111] uppercase tracking-wider">{item.category?.name?.replace(/-/g, " ")}</span>
                                </div>
                                {catchData && catchData.multiplier === 999 && (
                                    <div className="px-3 py-1.5 bg-[#111111] flex items-center gap-2 shadow-[2px_2px_0_#A855F7]">
                                        <span className="font-press-start text-[7px] text-[#A855F7]">★ LEGENDARIA</span>
                                    </div>
                                )}
                            </div>

                            <h1 className="font-press-start text-3xl sm:text-4xl text-[#111111] mb-3 capitalize">{esName}</h1>
                            <p className="font-nunito text-[16px] text-[#444444] leading-relaxed italic mb-8 max-w-xl">"{shortFlavor.replace(/\n/g, " ")}"</p>

                            {catchData && (
                                <div className="inline-flex items-center gap-3 px-5 py-3 border-2 border-[#111111] shadow-[4px_4px_0_#111111]" style={{ backgroundColor: `${accentColor}10` }}>
                                    <Target size={18} style={{ color: accentColor }} />
                                    <div>
                                        <div className="font-press-start text-[7px] text-[#888888] mb-0.5">MULTIPLICADOR DE CAPTURA</div>
                                        <div className="font-press-start text-[14px]" style={{ color: accentColor }}>
                                            {catchData.multiplier === 999 ? "CAPTURA GARANTIZADA" : `×${catchData.multiplier}`}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-[-2.5px] left-0 w-full h-[5px]">
                    <div className="absolute top-0 left-0 w-full h-[3px] bg-[#111111]" />
                    <div className="absolute bottom-0 left-0 w-full h-[2px]" style={{ backgroundColor: accentColor }} />
                </div>
            </section>

            <main className="max-w-[1280px] mx-auto px-4 sm:px-6 mt-16">
                <div className="grid lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-8 space-y-16">

                        {/* optimal use context */}
                        {catchData && (
                            <section className="space-y-6">
                                <div className="flex items-center gap-2">
                                    <Target size={16} style={{ color: accentColor }} />
                                    <h3 className="font-press-start text-[10px] text-[#111111] uppercase tracking-wider">CONDICIÓN ÓPTIMA</h3>
                                </div>
                                <div className="p-6 border-l-4 border-2 border-transparent bg-white shadow-[4px_4px_0_#111111]" style={{ borderLeftColor: accentColor, backgroundColor: `${accentColor}08` }}>
                                    <p className="font-nunito text-[16px] text-[#444444] leading-relaxed">{catchData.context}</p>
                                </div>
                            </section>
                        )}

                        {/* Capture tips */}
                        <section className="space-y-4">
                            <div className="flex items-center gap-2">
                                <Shield size={16} className="text-[#16A34A]" />
                                <h3 className="font-press-start text-[10px] text-[#111111] uppercase tracking-wider">CONSEJOS DE CAPTURA</h3>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[
                                    { tip: "Reduce los PS del Pokémon al mínimo posible antes de lanzar la Ball.", icon: <Target size={20} className="text-[#EF4444]" /> },
                                    { tip: "Aplica efectos de estado como Sueño o Parálisis para triplicar las posibilidades.", icon: <Moon size={20} className="text-[#3B82F6]" /> },
                                    { tip: "Los Pokémon de nivel más bajo que tú tienen mayor tasa de captura base.", icon: <BarChart size={20} className="text-[#16A34A]" /> },
                                    { tip: "Guarda tu Master Ball para Pokémon Legendarios o Míticos.", icon: <Star size={20} className="text-[#A855F7]" /> },
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.08 }}
                                        className="flex items-start gap-3 p-4 border-2 border-[#E0E0E0] hover:border-[#111111] bg-white transition-colors"
                                    >
                                        <div className="flex-shrink-0 mt-1">{item.icon}</div>
                                        <p className="font-nunito text-[13px] text-[#444444] leading-relaxed">{item.tip}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </section>

                        {/* Full effect */}
                        {effectText && (
                            <section className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <BookOpen size={16} style={{ color: accentColor }} />
                                    <h3 className="font-press-start text-[10px] text-[#111111] uppercase tracking-wider">EFECTO COMPLETO</h3>
                                </div>
                                <div className="p-6 border-2 border-[#111111] bg-white shadow-[4px_4px_0_#111111]" style={{ borderLeftWidth: 4, borderLeftColor: accentColor }}>
                                    <p className="font-nunito text-[15px] text-[#444444] leading-relaxed">{effectText}</p>
                                </div>
                            </section>
                        )}
                    </div>

                    <div className="lg:col-span-4 space-y-12">
                        <ItemFlavorCarousel flavors={item.flavor_text_entries} pocket="pokeballs" />
                        <RelatedItemsCarousel pocket="pokeballs" currentItemName={item.name} />
                    </div>
                </div>
            </main>
        </div>
    )
}
