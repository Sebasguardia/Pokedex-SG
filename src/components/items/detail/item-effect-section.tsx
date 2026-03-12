"use client"

import { motion } from "framer-motion"
import * as Tooltip from "@radix-ui/react-tooltip"
import { Zap, Package, Sparkles, AlertCircle, Info } from "lucide-react"
import { POCKET_COLORS } from "@/lib/constants/items.constants"
import { cn } from "@/lib/utils/cn"

interface Props {
    item: any
    pocket: string
}

export function ItemEffectSection({ item, pocket }: Props) {
    const config = POCKET_COLORS[pocket as keyof typeof POCKET_COLORS] || POCKET_COLORS.misc

    const esEffect = item.effect_entries?.find((e: any) => e.language.name === "es")?.effect
    const enEffect = item.effect_entries?.find((e: any) => e.language.name === "en")?.effect
    const effectText = esEffect || enEffect || "No hay información detallada sobre el efecto de este objeto."

    // Simple inference of tags from the text
    const tags = []
    if (effectText.toLowerCase().includes("cura") || effectText.toLowerCase().includes("restaur")) tags.push({ label: "Cura PS", color: "#22C55E" })
    if (effectText.toLowerCase().includes("estado") || effectText.toLowerCase().includes("veneno")) tags.push({ label: "Cura Estado", color: "#3B82F6" })
    if (item.category?.name?.includes("evolution")) tags.push({ label: "Evolución", color: "#A855F7" })
    if (item.attributes?.some((a: any) => a.name === "consumable")) tags.push({ label: "Uso Único", color: "#888888" })
    if (item.attributes?.some((a: any) => a.name === "holdable")) tags.push({ label: "Equipable", color: "#7C3AED" })

    return (
        <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Main Effect Block */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <Zap size={16} style={{ color: config.acento }} />
                    <h3 className="font-press-start text-[10px] text-[#111111] uppercase tracking-wider">
                        EFECTO PRINCIPAL
                    </h3>
                </div>

                <div
                    className="p-6 border-l-4 border-2 border-transparent border-l-[#111111] shadow-[4px_4px_0_#111111] bg-white transition-all hover:shadow-[6px_6px_0_#111111]"
                    style={{ borderLeftColor: config.acento, backgroundColor: `${config.fondo}20` }}
                >
                    <p className="font-nunito text-[15px] sm:text-[16px] text-[#444444] leading-relaxed whitespace-pre-line">
                        {effectText}
                    </p>

                    {/* After Tags */}
                    {tags.length > 0 && (
                        <div className="mt-6 flex flex-wrap gap-2">
                            {tags.map((tag, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.3 + (i * 0.05) }}
                                    className="px-2 py-0.5 font-press-start text-[6px] text-white border border-[#111111]"
                                    style={{ backgroundColor: tag.color }}
                                >
                                    {tag.label}
                                </motion.span>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Held Effect Block (If applicable) */}
            {item.held_by_pokemon?.length > 0 && (
                <div className="space-y-4 pt-4 border-t border-[#F2F2F2]">
                    <div className="flex items-center gap-2">
                        <Package size={16} className="text-[#7C3AED]" />
                        <h3 className="font-press-start text-[10px] text-[#111111] uppercase tracking-wider">
                            EFECTO AL EQUIPAR
                        </h3>
                    </div>
                    <div className="p-5 border-2 border-[#111111] bg-[#EDE9FE]/20 shadow-[4px_4px_0_#7C3AED]">
                        <p className="font-nunito text-[14px] text-[#444444] leading-relaxed italic">
                            Muchos Pokémon salvajes pueden llevar este objeto equipado. Usar el movimiento <span className="text-[#CC0000] font-bold">Ladrón</span> o <span className="text-[#CC0000] font-bold">Antojo</span> permite obtenerlo.
                        </p>
                    </div>
                </div>
            )}

            {/* Attributes Grid */}
            <div className="space-y-4 pt-4 border-t border-[#F2F2F2]">
                <div className="flex items-center gap-2">
                    <Info size={16} className="text-[#888888]" />
                    <h3 className="font-press-start text-[10px] text-[#111111] uppercase tracking-wider">
                        ATRIBUTOS TÉCNICOS
                    </h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {item.attributes?.map((attr: any, i: number) => (
                        <Tooltip.Provider key={attr.name} delayDuration={300}>
                            <Tooltip.Root>
                                <Tooltip.Trigger asChild>
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.04 }}
                                        className="flex items-center gap-2 px-3 py-2 bg-[#F8F8F8] border border-[#E0E0E0] hover:border-[#111111] transition-colors cursor-help group"
                                    >
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#888888] group-hover:bg-[#CC0000] transition-colors" />
                                        <span className="font-nunito text-[12px] text-[#444444] capitalize">
                                            {attr.name.replace(/-/g, " ")}
                                        </span>
                                    </motion.div>
                                </Tooltip.Trigger>
                                <Tooltip.Portal>
                                    <Tooltip.Content
                                        className="bg-[#111111] text-white px-4 py-2 font-nunito text-[12px] max-w-[200px] z-50 shadow-xl"
                                        sideOffset={5}
                                    >
                                        Atributo técnico de la categoría: {attr.name}
                                        <Tooltip.Arrow className="fill-[#111111]" />
                                    </Tooltip.Content>
                                </Tooltip.Portal>
                            </Tooltip.Root>
                        </Tooltip.Provider>
                    ))}
                    {(!item.attributes || item.attributes.length === 0) && (
                        <span className="font-nunito text-[12px] text-[#888888] italic px-1">Sin atributos adicionales</span>
                    )}
                </div>
            </div>
        </section>
    )
}
