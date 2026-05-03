"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { POCKET_COLORS, POCKET_META } from "@/lib/constants/items/items.constants"
import { Target } from "lucide-react"
import { cn } from "@/lib/utils/cn"

interface Props {
    item: any
    index: number
}

export function PokeballCard({ item, index }: Props) {
    const config = POCKET_META.pokeballs

    const esName = item.names?.find((n: any) => n.language.name === "es")?.name || item.name.replace(/-/g, " ")

    // Poké API check for catch rate or specific attributes is usually in 'attributes'
    // but for simplicity we'll show a generic target icon
    const hasBonus = item.name.includes("ultra") || item.name.includes("great")

    return (
        <Link href={`/items/${item.name}?from=pokeballs`}>
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: (index % 20) * 0.03 }}
                whileHover={{ y: -4, rotateY: 10 }}
                className="group relative bg-white border-2 border-[#111111] p-4 flex flex-col items-center gap-4 aspect-square justify-between shadow-[4px_4px_0_#111111] hover:shadow-[6px_6px_0_#EF4444] transition-all"
            >
                {/* ID Corner */}
                <span className="absolute top-2 left-2 font-jetbrains text-[8px] text-[#888888]">
                    #{String(item.id).padStart(3, "0")}
                </span>

                {/* Catch Rate Dot */}
                <div className="absolute top-2 right-2">
                    <div
                        className={cn(
                            "w-2 h-2 rounded-full",
                            hasBonus ? "bg-green-500 animate-pulse" : "bg-[#888888]"
                        )}
                    />
                </div>

                {/* Spinning Pokeball */}
                <div className="relative flex-1 flex items-center justify-center w-full">
                    <motion.div
                        className="relative z-10"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                    >
                        <Image
                            src={item.sprites?.default || "/placeholder-item.png"}
                            alt={item.name}
                            width={64}
                            height={64}
                            style={{ imageRendering: "pixelated" }}
                        />
                    </motion.div>

                    {/* Shadow underneath */}
                    <div className="absolute bottom-2 w-12 h-2 bg-black/5 rounded-full blur-[2px]" />
                </div>

                {/* Name & Badge */}
                <div className="w-full text-center space-y-1">
                    <h3 className="font-press-start text-[8px] text-[#111111] capitalize line-clamp-1 group-hover:text-[#EF4444] transition-colors">
                        {esName}
                    </h3>
                    <div className="flex items-center justify-center gap-1 text-[#888888]">
                        <span className="font-jetbrains text-[10px]">{item.cost}₽</span>
                    </div>
                </div>

                {/* Hover Reveal Catch Icon */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="absolute -bottom-2 -right-2 bg-[#EF4444] text-white p-1.5 border-2 border-[#111111]"
                >
                    <Target size={14} />
                </motion.div>
            </motion.div>
        </Link>
    )
}
