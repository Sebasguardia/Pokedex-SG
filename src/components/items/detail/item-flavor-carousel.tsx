"use client"

import { motion } from "framer-motion"
import * as Accordion from "@radix-ui/react-accordion"
import { ChevronDown, BookOpen, AlertCircle, UserCircle } from "lucide-react"
import { POCKET_COLORS } from "@/lib/constants/items.constants"
import { cn } from "@/lib/utils/cn"

interface Props {
    flavors: any[]
    pocket: string
}

export function ItemFlavorCarousel({ flavors, pocket }: Props) {
    if (!flavors || flavors.length === 0) return null

    const config = POCKET_COLORS[pocket as keyof typeof POCKET_COLORS] || POCKET_COLORS.misc

    // Group flavors by text to deduplicate versions
    const groupedFlavors = flavors.reduce((acc: any, curr: any) => {
        if (curr.language.name !== "es" && curr.language.name !== "en") return acc

        const existing = acc.find((f: any) => f.text === curr.text && f.language === curr.language.name)
        if (existing) {
            existing.versions.push(curr.version_group.name)
        } else {
            acc.push({
                text: curr.text,
                language: curr.language.name,
                versions: [curr.version_group.name]
            })
        }
        return acc
    }, [])

    // Prioritize Spanish, then English
    const displayFlavors = groupedFlavors.sort((a: any, b: any) => {
        if (a.language === "es") return -1
        if (b.language === "es") return 1
        return 0
    })

    return (
        <section className="space-y-6">
            <div className="flex items-center gap-2">
                <BookOpen size={16} style={{ color: config.acento }} />
                <h3 className="font-press-start text-[10px] text-[#111111] uppercase tracking-wider">
                    DESCRIPCIÓN EN JUEGO
                </h3>
            </div>

            <Accordion.Root type="single" collapsible defaultValue="item-0" className="space-y-3">
                {displayFlavors.slice(0, 10).map((flavor: any, i: number) => (
                    <Accordion.Item
                        key={i}
                        value={`item-${i}`}
                        className="border-2 border-[#111111] bg-white shadow-[4px_4px_0_#111111] overflow-hidden"
                        style={{ borderLeftWidth: "4px", borderLeftColor: config.acento }}
                    >
                        <Accordion.Header>
                            <Accordion.Trigger className="w-full flex items-center justify-between p-4 group text-left">
                                <div className="flex flex-wrap gap-2 pr-4">
                                    {flavor.versions.map((v: any) => (
                                        <span key={v} className="font-press-start text-[5px] px-1 py-0.5 bg-[#F2F2F2] text-[#888888] uppercase">
                                            {v.replace(/-/g, " ")}
                                        </span>
                                    ))}
                                    <span className="font-nunito font-bold text-[9px] text-[#CC0000] uppercase">
                                        {flavor.language === "es" ? "Español" : "English"}
                                    </span>
                                </div>
                                <ChevronDown className="w-4 h-4 text-[#888888] group-data-[state=open]:rotate-180 transition-transform" />
                            </Accordion.Trigger>
                        </Accordion.Header>
                        <Accordion.Content className="px-4 pb-4 overflow-hidden data-[state=closed]:animate-slide-up data-[state=open]:animate-slide-down">
                            <p className="font-nunito text-[14px] text-[#444444] leading-relaxed">
                                {flavor.text.replace(/\n/g, " ")}
                            </p>
                        </Accordion.Content>
                    </Accordion.Item>
                ))}
            </Accordion.Root>
        </section>
    )
}
