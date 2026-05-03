"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, HeartPulse, Shield, Zap, Droplets, Moon, Sun, Snowflake, Flame, Heart, Layers, BookOpen, Swords, Leaf } from "lucide-react"
import { ItemFlavorCarousel } from "../item-flavor-carousel"
import { ItemHeldPokemon } from "../item-held-pokemon"
import { RelatedItemsCarousel } from "../related-items-carousel"
import { POCKET_META } from "@/lib/constants/items/items.constants"

interface Props {
    item: any
    heldPokemon: any[]
    pocket: string
}

const STATUS_CONDITIONS = [
    { key: "veneno", label: "Veneno", icon: Droplets, color: "#A855F7" },
    { key: "paralisis", label: "Parálisis", color: "#F59E0B", icon: Zap },
    { key: "sueño", label: "Sueño", color: "#60A5FA", icon: Moon },
    { key: "quemadura", label: "Quemadura", color: "#F97316", icon: Flame },
    { key: "congelado", label: "Congelado", color: "#06B6D4", icon: Snowflake },
    { key: "confusion", label: "Confusión", color: "#EC4899", icon: Sun },
]

function extractHealAmount(effectText: string): { hp: number | null; pp: number | null } {
    let hp: number | null = null
    let pp: number | null = null

    const hpFull = /todos? (?:los |sus )?PS/i.test(effectText)
    if (hpFull) hp = 100

    const hpMatch = effectText.match(/restaura (\d+) PS/i) || effectText.match(/Restores (\d+) HP/i)
    if (hpMatch && !hpFull) hp = parseInt(hpMatch[1]) > 200 ? 100 : parseInt(hpMatch[1])

    const ppFull = /todos? (?:los )?PP/i.test(effectText)
    if (ppFull) pp = 100

    const ppMatch = effectText.match(/restaura (\d+) PP/i) || effectText.match(/Restores (\d+) PP/i)
    if (ppMatch && !ppFull) pp = parseInt(ppMatch[1])

    return { hp, pp }
}

function detectCuredStatuses(effectText: string): string[] {
    const cured: string[] = []
    const lower = effectText.toLowerCase()
    if (lower.includes("veneno") || lower.includes("poison")) cured.push("veneno")
    if (lower.includes("parálisis") || lower.includes("paralysis") || lower.includes("para")) cured.push("paralisis")
    if (lower.includes("sueño") || lower.includes("sleep")) cured.push("sueño")
    if (lower.includes("quemadura") || lower.includes("burn")) cured.push("quemadura")
    if (lower.includes("congelado") || lower.includes("freeze")) cured.push("congelado")
    if (lower.includes("confusión") || lower.includes("confusion")) cured.push("confusion")
    return cured
}

export function MedicineDetailLayout({ item, heldPokemon, pocket }: Props) {
    const config = POCKET_META[pocket] || POCKET_META.medicine
    const esName = item.names?.find((n: any) => n.language.name === "es")?.name || item.name.replace(/-/g, " ")
    const esEffect = item.effect_entries?.find((e: any) => e.language.name === "es")?.effect
    const enEffect = item.effect_entries?.find((e: any) => e.language.name === "en")?.effect
    const effectText = esEffect || enEffect || ""

    const esFlavor = item.flavor_text_entries?.find((f: any) => f.language.name === "es")?.text || ""
    const enFlavor = item.flavor_text_entries?.find((f: any) => f.language.name === "en")?.text || ""
    const shortFlavor = esFlavor || enFlavor || "Sin descripción disponible."

    const { hp, pp } = extractHealAmount(effectText)
    const curedStatuses = detectCuredStatuses(effectText)
    const isFullRestore = hp === 100

    return (
        <div className="min-h-screen bg-[#FFFFFF] pb-32">
            {/* HERO — Red medical cross theme */}
            <section className="relative bg-white pt-12 pb-20 overflow-hidden border-b-2 border-[#111111]">
                {/* Animated cross pattern background */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {[...Array(8)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute opacity-[0.04] text-[#EF4444]"
                            style={{ left: `${(i % 4) * 28 + 5}%`, top: `${Math.floor(i / 4) * 60 + 10}%`, fontSize: 80 }}
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 6 + i, repeat: Infinity, delay: i * 0.5 }}
                        >
                            ✚
                        </motion.div>
                    ))}
                </div>

                <div className="absolute right-0 bottom-0 pointer-events-none select-none opacity-[0.04]">
                    <span className="font-jetbrains text-[180px] font-bold leading-none"># {String(item.id).padStart(4, "0")}</span>
                </div>

                <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6">
                    <div className="font-nunito text-[12px] text-[#888888] mb-10 flex items-center gap-2">
                        <Link href={`/items?pocket=${pocket}`} className="hover:text-[#EF4444] hover:underline flex items-center gap-1 transition-colors">
                            <ChevronLeft size={10} /> Mochila
                        </Link>
                        <span>/</span>
                        <span className="text-[#EF4444] font-bold">{config.label}</span>
                        <span>/</span>
                        <span className="text-[#111111] font-bold capitalize">{esName}</span>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-12 items-center">
                        {/* Sprite in circular medical glow */}
                        <div className="lg:col-span-4 flex justify-center">
                            <div className="relative">
                                <motion.div
                                    className="w-48 h-48 rounded-full border-4 border-[#EF4444] flex items-center justify-center"
                                    style={{ background: "radial-gradient(circle, #FEE2E2 0%, #FFFFFF 70%)", boxShadow: "0 0 60px rgba(239,68,68,0.3)" }}
                                    animate={{ boxShadow: ["0 0 40px rgba(239,68,68,0.2)", "0 0 80px rgba(239,68,68,0.5)", "0 0 40px rgba(239,68,68,0.2)"] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    {item.sprites?.default ? (
                                        <Image src={item.sprites.default} alt={esName} width={96} height={96} style={{ imageRendering: "pixelated" }} />
                                    ) : (
                                        <HeartPulse size={64} className="text-[#EF4444]" />
                                    )}
                                </motion.div>
                                {/* Healing cross badge */}
                                <motion.div
                                    className="absolute -top-4 -right-4 w-12 h-12 bg-[#EF4444] border-2 border-[#111111] flex items-center justify-center shadow-[3px_3px_0_#111111]"
                                    initial={{ scale: 0, rotate: -15 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ type: "spring", bounce: 0.6, delay: 0.5 }}
                                >
                                    <HeartPulse size={20} className="text-white" />
                                </motion.div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="lg:col-span-8">
                            <div className="flex flex-wrap gap-2 mb-5">
                                <div className="flex items-center gap-2 px-3 py-1.5 border-2 border-[#111111] shadow-[2px_2px_0_#111111] bg-[#FEE2E2]">
                                    <HeartPulse size={14} className="text-[#EF4444]" />
                                    <span className="font-nunito font-bold text-[11px] uppercase tracking-wider text-[#EF4444]">MEDICINA</span>
                                </div>
                                <div className="px-3 py-1.5 bg-white border-2 border-[#111111] flex items-center gap-2 shadow-[2px_2px_0_#111111]">
                                    <Layers size={14} className="text-[#888888]" />
                                    <span className="font-nunito font-bold text-[11px] text-[#111111] uppercase tracking-wider">{item.category?.name?.replace(/-/g, " ")}</span>
                                </div>
                                {isFullRestore && (
                                    <div className="px-3 py-1.5 bg-[#111111] border-2 border-[#111111] flex items-center gap-2 shadow-[2px_2px_0_#EF4444]">
                                        <span className="font-press-start text-[7px] text-[#EF4444]">RESTAURACIÓN TOTAL</span>
                                    </div>
                                )}
                            </div>

                            <h1 className="font-press-start text-3xl sm:text-4xl text-[#111111] mb-3 leading-tight capitalize">{esName}</h1>
                            <p className="font-nunito text-[16px] text-[#444444] leading-relaxed italic mb-8 max-w-xl">"{shortFlavor.replace(/\n/g, " ")}"</p>

                            {/* Quick stat pills */}
                            <div className="flex flex-wrap gap-3">
                                {hp !== null && (
                                    <div className="flex items-center gap-2 px-4 py-2 bg-[#FEE2E2] border-2 border-[#EF4444] shadow-[3px_3px_0_#111111]">
                                        <Heart size={14} className="text-[#EF4444]" />
                                        <span className="font-press-start text-[8px] text-[#EF4444]">
                                            {hp === 100 ? "TODO PS" : `+${hp} PS`}
                                        </span>
                                    </div>
                                )}
                                {curedStatuses.length > 0 && (
                                    <div className="flex items-center gap-2 px-4 py-2 bg-[#F0FDF4] border-2 border-[#16A34A] shadow-[3px_3px_0_#111111]">
                                        <Shield size={14} className="text-[#16A34A]" />
                                        <span className="font-press-start text-[8px] text-[#16A34A]">CURA ESTADOS</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-[-2.5px] left-0 w-full h-[5px]">
                    <div className="absolute top-0 left-0 w-full h-[3px] bg-[#111111]" />
                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#EF4444]" />
                </div>
            </section>

            {/* MAIN CONTENT */}
            <main className="max-w-[1280px] mx-auto px-4 sm:px-6 mt-16">
                <div className="grid lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-8 space-y-16">

                        {/* HP Recovery Bar */}
                        {hp !== null && (
                            <section className="space-y-6">
                                <div className="flex items-center gap-2">
                                    <Heart size={16} className="text-[#EF4444]" />
                                    <h3 className="font-press-start text-[10px] text-[#111111] uppercase tracking-wider">RECUPERACIÓN DE PS</h3>
                                </div>
                                <div className="p-6 border-2 border-[#111111] bg-white shadow-[4px_4px_0_#111111]">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="font-nunito font-bold text-[14px] text-[#111111]">Puntos de Salud restaurados</span>
                                        <span className="font-press-start text-[10px] text-[#EF4444]">{hp === 100 ? "100%" : `+${hp} PS`}</span>
                                    </div>
                                    <div className="h-6 bg-[#F2F2F2] border-2 border-[#111111] overflow-hidden">
                                        <motion.div
                                            className="h-full"
                                            style={{ background: "linear-gradient(90deg, #EF4444, #22C55E)" }}
                                            initial={{ width: 0 }}
                                            whileInView={{ width: hp === 100 ? "100%" : `${Math.min(hp / 250 * 100, 100)}%` }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                        />
                                    </div>
                                    <div className="flex justify-between mt-2">
                                        <span className="font-nunito text-[11px] text-[#888888]">0 PS</span>
                                        <span className="font-nunito text-[11px] text-[#888888]">PS Máximo</span>
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* Status Cure Grid */}
                        {curedStatuses.length > 0 && (
                            <section className="space-y-6">
                                <div className="flex items-center gap-2">
                                    <Shield size={16} className="text-[#16A34A]" />
                                    <h3 className="font-press-start text-[10px] text-[#111111] uppercase tracking-wider">ESTADOS CURADOS</h3>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {STATUS_CONDITIONS.map((condition, i) => {
                                        const Icon = condition.icon
                                        const isCured = curedStatuses.includes(condition.key)
                                        return (
                                            <motion.div
                                                key={condition.key}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: i * 0.06 }}
                                                className="flex items-center gap-3 p-3 border-2 border-[#111111]"
                                                style={{
                                                    backgroundColor: isCured ? `${condition.color}15` : "#F8F8F8",
                                                    borderColor: isCured ? condition.color : "#E0E0E0",
                                                    boxShadow: isCured ? `3px 3px 0 ${condition.color}` : "none",
                                                    opacity: isCured ? 1 : 0.4
                                                }}
                                            >
                                                <Icon size={18} style={{ color: condition.color }} />
                                                <span className="font-nunito font-bold text-[12px]" style={{ color: isCured ? condition.color : "#888888" }}>
                                                    {condition.label}
                                                </span>
                                                {isCured && (
                                                    <span className="ml-auto font-press-start text-[6px] px-1.5 py-0.5 text-white" style={{ backgroundColor: condition.color }}>✓</span>
                                                )}
                                            </motion.div>
                                        )
                                    })}
                                </div>
                            </section>
                        )}

                        {/* Full Effect */}
                        <section className="space-y-4">
                            <div className="flex items-center gap-2">
                                <BookOpen size={16} className="text-[#EF4444]" />
                                <h3 className="font-press-start text-[10px] text-[#111111] uppercase tracking-wider">EFECTO COMPLETO</h3>
                            </div>
                            <div className="p-6 border-l-4 border-2 border-transparent bg-white shadow-[4px_4px_0_#111111]" style={{ borderLeftColor: "#EF4444", backgroundColor: "#FFF5F5" }}>
                                <p className="font-nunito text-[15px] text-[#444444] leading-relaxed">{effectText || "Sin información de efecto."}</p>
                            </div>
                        </section>

                        {/* Usage Context */}
                        <section className="space-y-4">
                            <div className="flex items-center gap-2">
                                <Zap size={16} className="text-[#F59E0B]" />
                                <h3 className="font-press-start text-[10px] text-[#111111] uppercase tracking-wider">CUÁNDO USARLO</h3>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="p-5 border-2 border-[#111111] bg-white shadow-[3px_3px_0_#111111]">
                                    <div className="flex items-center gap-1.5 text-[#EF4444] mb-3">
                                        <Swords size={12} />
                                        <span className="font-press-start text-[7px]">EN COMBATE</span>
                                    </div>
                                    <p className="font-nunito text-[13px] text-[#444444] leading-relaxed">
                                        Úsalo cuando tu Pokémon esté a punto de debilitarse. Los objetos se usan al final del turno.
                                    </p>
                                </div>
                                <div className="p-5 border-2 border-[#111111] bg-white shadow-[3px_3px_0_#111111]">
                                    <div className="flex items-center gap-1.5 text-[#16A34A] mb-3">
                                        <Leaf size={12} />
                                        <span className="font-press-start text-[7px]">FUERA DE BATALLA</span>
                                    </div>
                                    <p className="font-nunito text-[13px] text-[#444444] leading-relaxed">
                                        Ideal para recuperar el equipo antes de llegar a un Centro Pokémon o en medio de una mazmorra.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <ItemHeldPokemon pokemon={heldPokemon} pocketAccent="#EF4444" />
                    </div>

                    <div className="lg:col-span-4 space-y-12">
                        <ItemFlavorCarousel flavors={item.flavor_text_entries} pocket="medicine" />
                        <RelatedItemsCarousel pocket="medicine" currentItemName={item.name} />
                    </div>
                </div>
            </main>
        </div>
    )
}
