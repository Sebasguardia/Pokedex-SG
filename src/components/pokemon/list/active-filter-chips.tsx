"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Crown, Baby } from "lucide-react"
import { TYPE_COLORS } from "@/lib/constants/colors"

interface ActiveFilterChipsProps {
    typeFilter: string | null;
    genFilter: string | null;
    legendaryFilter?: string | null;
    mythicalFilter?: string | null;
    babyFilter?: string | null;
    onRemove: (key: string, value: string) => void;
    onClearAll: () => void;
}

export function ActiveFilterChips({
    typeFilter, genFilter,
    legendaryFilter, mythicalFilter, babyFilter,
    onRemove, onClearAll
}: ActiveFilterChipsProps) {

    const types = typeFilter ? typeFilter.split(",") : []

    const chips: any[] = []

    types.forEach(t => chips.push({
        id: `type-${t}`, type: 'type',
        label: `${t.toUpperCase()} ×`, key: 'type', val: t,
        color: TYPE_COLORS[t as keyof typeof TYPE_COLORS] || '#111111'
    }))

    if (genFilter) chips.push({
        id: `gen-${genFilter}`, type: 'gen',
        label: `Gen ${genFilter} ×`, key: 'gen', val: genFilter
    })

    if (legendaryFilter === "true") chips.push({
        id: 'leg', type: 'special', label: '✓ Legendarios ×', icon: Crown, key: 'legendary', val: "true"
    })
    if (mythicalFilter === "true") chips.push({
        id: 'myth', type: 'special', label: '✓ Míticos ×', icon: Crown, key: 'mythical', val: "true"
    })
    if (babyFilter === "true") chips.push({
        id: 'baby', type: 'special', label: '✓ Baby ×', icon: Baby, key: 'baby', val: "true"
    })

    if (chips.length === 0) return null

    return (
        <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="flex flex-wrap items-center gap-2 py-3 overflow-hidden border-b border-[#F2F2F2] mb-4"
        >
            <AnimatePresence>
                {chips.map(chip => {
                    if (chip.type === 'type') {
                        return (
                            <motion.button
                                key={chip.id}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0, x: -20, opacity: 0 }}
                                transition={{ type: "spring", bounce: 0.4 }}
                                onClick={() => onRemove(chip.key, chip.val)}
                                className="group outline-none border-2 border-[#111111] px-3 py-1 text-white font-nunito text-[11px] font-bold flex items-center gap-1"
                                style={{ backgroundColor: chip.color }}
                            >
                                {chip.val.toUpperCase()}
                                <motion.span
                                    className="inline-block ml-1"
                                    whileHover={{ rotate: 90 }}
                                >×</motion.span>
                            </motion.button>
                        )
                    }

                    if (chip.type === 'gen') {
                        return (
                            <motion.button
                                key={chip.id}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0, x: -20, opacity: 0 }}
                                transition={{ type: "spring", bounce: 0.4 }}
                                onClick={() => onRemove(chip.key, chip.val)}
                                className="group outline-none bg-[#111111] text-white font-nunito text-[11px] font-bold px-3 py-1 flex items-center gap-1"
                            >
                                Gen {chip.val}
                                <motion.span
                                    className="inline-block ml-1 text-white transition-colors group-hover:text-[#CC0000]"
                                    whileHover={{ rotate: 90 }}
                                >×</motion.span>
                            </motion.button>
                        )
                    }

                    if (chip.type === 'special') {
                        const Icon = chip.icon
                        return (
                            <motion.button
                                key={chip.id}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0, x: -20, opacity: 0 }}
                                transition={{ type: "spring", bounce: 0.4 }}
                                onClick={() => onRemove(chip.key, chip.val)}
                                className="group outline-none bg-[#CC0000] text-white font-nunito text-[11px] font-bold px-3 py-1 flex items-center gap-[6px]"
                            >
                                <Icon size={12} className="text-white" />
                                {chip.label.replace(' ×', '')}
                                <motion.span
                                    className="inline-block ml-[2px]"
                                    whileHover={{ rotate: 90 }}
                                >×</motion.span>
                            </motion.button>
                        )
                    }

                    return null
                })}
            </AnimatePresence>

            <motion.button
                onClick={onClearAll}
                className="ml-2 font-nunito text-[12px] text-[#888888] hover:text-[#CC0000] hover:underline outline-none px-2"
                whileHover={{ scale: 1.05 }}
            >
                Limpiar todo
            </motion.button>
        </motion.div>
    )
}
