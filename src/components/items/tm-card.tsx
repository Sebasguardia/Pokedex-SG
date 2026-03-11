"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Disc, Zap, Activity } from "lucide-react"
import { TYPE_COLORS, TYPE_ICON } from "@/lib/constants/types.constants"

interface Props {
    item: any
    index: number
}

export function TMCard({ item, index }: Props) {
    // TM items usually have machine IDs in the name like 'tm01'
    const machineCode = item.name.split("-")[0].toUpperCase()
    const esName = item.names?.find((n: any) => n.language.name === "es")?.name || item.name.replace(/-/g, " ")

    // The Move ID is usually the machine detail move
    // For the list view card, we might not have the full Move data loaded 
    // unless the hook fetched it. In our useItemsList, we fetch the full item detail.
    // However, the item detail ONLY has the machine URL, not the move details embedded.

    // To keep the list page fast, we show a 'Cassette' style with the item sprite 
    // and machine code, and only full details in the HoverCard or Detail page.

    return (
        <Link href={`/items/${item.name}?from=machines`}>
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (index % 20) * 0.03 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className="group relative bg-[#111111] border-2 border-[#111111] flex items-center shadow-[4px_4px_0_#3B82F6]"
            >
                {/* Left Side: Disc Symbol */}
                <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center bg-[#3B82F6] border-r-2 border-[#111111]">
                    <div className="relative">
                        <Disc className="text-white w-8 h-8 sm:w-10 sm:h-10 animate-[spin_10s_linear_infinite]" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-[#111111]" />
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 px-4 py-3 bg-white h-full flex flex-col justify-center">
                    <div className="flex items-center justify-between mb-1">
                        <span className="font-press-start text-[8px] text-[#3B82F6]">{machineCode}</span>
                        <div className="w-6 h-1 bg-[#111111] opacity-20" />
                    </div>
                    <h3 className="font-nunito font-bold text-[13px] text-[#111111] capitalize line-clamp-1 group-hover:text-[#3B82F6] transition-colors">
                        {esName}
                    </h3>
                </div>

                {/* Right Accent */}
                <div className="w-2 h-full bg-[#3B82F6] border-l-2 border-[#111111]" />
            </motion.div>
        </Link>
    )
}
