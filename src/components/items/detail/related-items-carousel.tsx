"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { useItemsList } from "@/lib/hooks/useItemsList"
import { POCKET_COLORS } from "@/lib/constants/items.constants"
import { ChevronRight, LayoutGrid } from "lucide-react"

interface Props {
    pocket: string
    currentItemName: string
}

export function RelatedItemsCarousel({ pocket, currentItemName }: Props) {
    const { data, isLoading } = useItemsList({
        pocket,
        limit: 12, // Get a small set
        page: 1
    })

    const config = POCKET_COLORS[pocket as keyof typeof POCKET_COLORS] || POCKET_COLORS.misc

    const filteredResults = data.results.filter(item => item.name !== currentItemName).slice(0, 8)

    if (isLoading) return (
        <div className="h-[120px] w-full bg-[#f8f8f8] animate-pulse rounded-lg" />
    )

    if (filteredResults.length === 0) return null

    return (
        <section className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <LayoutGrid size={16} style={{ color: config.acento }} />
                    <h3 className="font-press-start text-[10px] text-[#111111] uppercase tracking-wider">
                        OBJETOS RELACIONADOS
                    </h3>
                </div>
                <Link
                    href={`/items?pocket=${pocket}`}
                    className="font-press-start text-[7px] text-[#888888] hover:text-[#111111] transition-colors flex items-center gap-1"
                >
                    VER TODO <ChevronRight size={10} />
                </Link>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
                {filteredResults.map((item, i) => (
                    <Link
                        key={item.name}
                        href={`/items/${item.name}`}
                        className="shrink-0 group"
                    >
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            whileHover={{ y: -4 }}
                            className="w-[140px] bg-white border-2 border-[#111111] p-3 shadow-[3px_3px_0_#111111] flex flex-col items-center gap-2 transition-all group-hover:shadow-[4px_4px_0_#111111]"
                        >
                            <div
                                className="w-full h-16 flex items-center justify-center rounded"
                                style={{ backgroundColor: `${config.fondo}40` }}
                            >
                                <Image
                                    src={item.sprites?.default || "/placeholder-item.png"}
                                    alt={item.name}
                                    width={40}
                                    height={40}
                                    style={{ imageRendering: "pixelated" }}
                                    className="group-hover:scale-110 transition-transform"
                                />
                            </div>
                            <span className="font-nunito font-bold text-[11px] text-[#111111] capitalize text-center line-clamp-1">
                                {item.names?.find((n: any) => n.language.name === "es")?.name || item.name.replace(/-/g, " ")}
                            </span>
                            <span className="font-nunito text-[9px] text-[#888888] uppercase tracking-tighter">
                                {item.category?.name.replace(/-/g, " ")}
                            </span>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </section>
    )
}
