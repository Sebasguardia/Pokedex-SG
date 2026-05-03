"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Leaf, Heart, Zap, Shield, Moon, BookOpen, Clover, Sprout } from "lucide-react"
import { ItemFlavorCarousel } from "../item-flavor-carousel"
import { RelatedItemsCarousel } from "../related-items-carousel"
import { POCKET_META } from "@/lib/constants/items/items.constants"

interface Props {
    item: any
    heldPokemon: any[]
    pocket: string
}

const ACCENT = "#16A34A"

const FLAVOR_LABELS: Record<string, { label: string; color: string }> = {
    spicy: { label: "Picante", color: "#EF4444" },
    dry: { label: "Seco", color: "#3B82F6" },
    sweet: { label: "Dulce", color: "#EC4899" },
    bitter: { label: "Amargo", color: "#16A34A" },
    sour: { label: "Ácido", color: "#F59E0B" },
}

function BerryFlavorPentagon({ flavors }: { flavors: Record<string, number> }) {
    const keys = Object.keys(FLAVOR_LABELS)
    const size = 120
    const cx = size / 2, cy = size / 2, r = 45
    const angles = keys.map((_, i) => ((i * 360) / keys.length - 90) * (Math.PI / 180))
    const maxVal = Math.max(...Object.values(flavors), 1)

    const outerPoints = angles.map(a => `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`).join(" ")

    const flavorPoints = angles.map((a, i) => {
        const key = keys[i]
        const val = (flavors[key] || 0) / maxVal
        return `${cx + r * val * Math.cos(a)},${cy + r * val * Math.sin(a)}`
    }).join(" ")

    return (
        <div className="flex flex-col items-center gap-6">
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                {/* Grid lines */}
                {[0.25, 0.5, 0.75, 1].map(frac => {
                    const pts = angles.map(a => `${cx + r * frac * Math.cos(a)},${cy + r * frac * Math.sin(a)}`).join(" ")
                    return <polygon key={frac} points={pts} fill="none" stroke="#E0E0E0" strokeWidth="1" />
                })}
                {/* Axis lines */}
                {angles.map((a, i) => (
                    <line key={i} x1={cx} y1={cy} x2={cx + r * Math.cos(a)} y2={cy + r * Math.sin(a)} stroke="#E0E0E0" strokeWidth="1" />
                ))}
                {/* Flavor area */}
                <motion.polygon
                    points={flavorPoints}
                    fill={`${ACCENT}30`}
                    stroke={ACCENT}
                    strokeWidth="2"
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}
                />
                {/* Labels */}
                {angles.map((a, i) => {
                    const key = keys[i]
                    const lx = cx + (r + 14) * Math.cos(a)
                    const ly = cy + (r + 14) * Math.sin(a)
                    return (
                        <text key={key} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle"
                            fill={FLAVOR_LABELS[key].color} fontSize="7" fontFamily="sans-serif" fontWeight="bold">
                            {FLAVOR_LABELS[key].label.toUpperCase()}
                        </text>
                    )
                })}
            </svg>
        </div>
    )
}

export function BerryDetailLayout({ item, heldPokemon, pocket }: Props) {
    const config = POCKET_META[pocket] || POCKET_META.berries
    const esName = item.names?.find((n: any) => n.language.name === "es")?.name || item.name.replace(/-/g, " ")
    const esEffect = item.effect_entries?.find((e: any) => e.language.name === "es")?.effect
    const enEffect = item.effect_entries?.find((e: any) => e.language.name === "en")?.effect
    const effectText = esEffect || enEffect || ""
    const esFlavor = item.flavor_text_entries?.find((f: any) => f.language.name === "es")?.text || ""
    const enFlavor = item.flavor_text_entries?.find((f: any) => f.language.name === "en")?.text || ""
    const shortFlavor = esFlavor || enFlavor || "Sin descripción disponible."

    // Berry-specific data (from berry endpoint — simplified mock from item attributes)
    const berryFlavors: Record<string, number> = {
        spicy: 0, dry: 0, sweet: 0, bitter: 0, sour: 0,
        ...(item.flavors?.reduce((acc: any, f: any) => ({ ...acc, [f.flavor.name]: f.potency }), {}) || {})
    }

    const hasFlavors = Object.values(berryFlavors).some(v => v > 0)
    const hpThresholdMatch = effectText.match(/(\d+)\/(\d+)/)?.[0] || null

    return (
        <div className="min-h-screen bg-[#FFFFFF] pb-32">
            {/* HERO — Nature/garden theme */}
            <section className="relative bg-white pt-12 pb-20 overflow-hidden border-b-2 border-[#111111]">
                {/* Leaf pattern bg */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.06]">
                    {[<Leaf key="leaf" size={48} />, <Clover key="clover" size={48} />, <Sprout key="sprout" size={48} />].map((em, i) => (
                        [...Array(4)].map((_, j) => (
                            <span key={`${i}-${j}`} className="absolute"
                                style={{ left: `${i * 33 + j * 10}%`, top: `${j * 25 + i * 12}%`, transform: `rotate(${i * 30 + j * 15}deg)` }}>
                                {em}
                            </span>
                        ))
                    ))}
                </div>

                <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6">
                    <div className="font-nunito text-[12px] text-[#888888] mb-10 flex items-center gap-2">
                        <Link href={`/items?pocket=${pocket}`} className="hover:text-[#16A34A] hover:underline flex items-center gap-1 transition-colors">
                            <ChevronLeft size={10} /> Mochila
                        </Link>
                        <span>/</span>
                        <span className="text-[#16A34A] font-bold">{config?.label || "Bayas"}</span>
                        <span>/</span>
                        <span className="text-[#111111] font-bold capitalize">{esName}</span>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-4 flex justify-center">
                            <div className="relative">
                                <motion.div
                                    className="w-48 h-48 rounded-[40%] border-4 border-[#16A34A] flex items-center justify-center"
                                    style={{ background: "radial-gradient(circle at 30% 30%, #DCFCE7, #BBFCD9)", boxShadow: "0 0 40px rgba(22,163,74,0.3)" }}
                                    animate={{ scale: [1, 1.03, 1] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                >
                                    {item.sprites?.default ? (
                                        <Image src={item.sprites.default} alt={esName} width={100} height={100} style={{ imageRendering: "pixelated" }} />
                                    ) : (
                                        <Leaf size={64} className="text-[#16A34A]" />
                                    )}
                                </motion.div>
                                <motion.div className="absolute -bottom-3 -right-3 w-10 h-10 bg-[#16A34A] border-2 border-[#111111] flex items-center justify-center shadow-[2px_2px_0_#111111]"
                                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.5 }}>
                                    <Leaf size={18} className="text-white" />
                                </motion.div>
                            </div>
                        </div>

                        <div className="lg:col-span-8">
                            <div className="flex flex-wrap gap-2 mb-5">
                                <div className="flex items-center gap-2 px-3 py-1.5 border-2 border-[#111111] shadow-[2px_2px_0_#111111] bg-[#DCFCE7]">
                                    <Leaf size={14} className="text-[#16A34A]" />
                                    <span className="font-nunito font-bold text-[11px] uppercase tracking-wider text-[#16A34A]">BAYA NATURAL</span>
                                </div>
                            </div>

                            <h1 className="font-press-start text-3xl sm:text-4xl text-[#111111] mb-3 capitalize">{esName}</h1>
                            <p className="font-nunito text-[16px] text-[#444444] leading-relaxed italic mb-8 max-w-xl">"{shortFlavor.replace(/\n/g, " ")}"</p>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-[-2.5px] left-0 w-full h-[5px]">
                    <div className="absolute top-0 left-0 w-full h-[3px] bg-[#111111]" />
                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#16A34A]" />
                </div>
            </section>

            <main className="max-w-[1280px] mx-auto px-4 sm:px-6 mt-16">
                <div className="grid lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-8 space-y-16">

                        {/* Flavor pentagon */}
                        {hasFlavors && (
                            <section className="space-y-6">
                                <div className="flex items-center gap-2">
                                    <Leaf size={16} className="text-[#16A34A]" />
                                    <h3 className="font-press-start text-[10px] text-[#111111] uppercase tracking-wider">PERFIL DE SABORES</h3>
                                </div>
                                <div className="p-6 border-2 border-[#111111] bg-white shadow-[4px_4px_0_#111111]">
                                    <div className="flex flex-col sm:flex-row items-center gap-8">
                                        <BerryFlavorPentagon flavors={berryFlavors} />
                                        <div className="grid grid-cols-2 gap-3 flex-1">
                                            {Object.entries(berryFlavors).map(([key, val]) => (
                                                <div key={key} className="space-y-1">
                                                    <div className="flex justify-between">
                                                        <span className="font-nunito font-bold text-[11px]" style={{ color: FLAVOR_LABELS[key]?.color || "#888" }}>
                                                            {FLAVOR_LABELS[key]?.label || key}
                                                        </span>
                                                        <span className="font-mono text-[10px] text-[#888888]">{val}</span>
                                                    </div>
                                                    <div className="h-2 bg-[#F2F2F2] border border-[#E0E0E0] overflow-hidden">
                                                        <motion.div
                                                            className="h-full"
                                                            style={{ backgroundColor: FLAVOR_LABELS[key]?.color || "#888" }}
                                                            initial={{ width: 0 }}
                                                            whileInView={{ width: `${(val / 40) * 100}%` }}
                                                            transition={{ duration: 1, ease: "easeOut" }}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* Held tip activation */}
                        {hpThresholdMatch && (
                            <section className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <Heart size={16} className="text-[#EF4444]" />
                                    <h3 className="font-press-start text-[10px] text-[#111111] uppercase tracking-wider">ACTIVACIÓN EQUIPADA</h3>
                                </div>
                                <div className="p-6 border-2 border-[#111111] bg-[#DCFCE7] shadow-[4px_4px_0_#16A34A]">
                                    <p className="font-nunito text-[15px] text-[#166534] leading-relaxed">
                                        Esta baya se activa <strong>automáticamente</strong> cuando el Pokémon alcanza <strong>{hpThresholdMatch}</strong> de PS si está equipada.
                                    </p>
                                </div>
                            </section>
                        )}

                        {/* Effect */}
                        <section className="space-y-4">
                            <div className="flex items-center gap-2">
                                <BookOpen size={16} className="text-[#16A34A]" />
                                <h3 className="font-press-start text-[10px] text-[#111111] uppercase tracking-wider">EFECTO COMPLETO</h3>
                            </div>
                            <div className="p-6 border-l-4 border-2 border-transparent bg-white shadow-[4px_4px_0_#111111]" style={{ borderLeftColor: ACCENT }}>
                                <p className="font-nunito text-[15px] text-[#444444] leading-relaxed">{effectText || "Sin datos de efecto."}</p>
                            </div>
                        </section>
                    </div>

                    <div className="lg:col-span-4 space-y-12">
                        <ItemFlavorCarousel flavors={item.flavor_text_entries} pocket="berries" />
                        <RelatedItemsCarousel pocket="berries" currentItemName={item.name} />
                    </div>
                </div>
            </main>
        </div>
    )
}
