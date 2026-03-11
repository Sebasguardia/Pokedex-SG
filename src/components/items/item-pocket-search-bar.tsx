"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Search, ChevronDown, ArrowUpDown } from "lucide-react"
import * as Select from "@radix-ui/react-select"
import { POCKET_META } from "@/lib/constants/items.constants"
import { cn } from "@/lib/utils/cn"

interface Props {
    pocket: string
    value: string | null
    onChange: (val: string | null) => void
    sort: string | null
    onSortChange: (val: string | null) => void
}

export function ItemPocketSearchBar({ pocket, value, onChange, sort, onSortChange }: Props) {
    const config = POCKET_META[pocket] || POCKET_META.misc

    return (
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
            {/* Search Input */}
            <div className="relative flex-1 group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#888888] z-10 group-focus-within:text-[#111111] transition-colors">
                    <Search size={18} />
                </div>

                <input
                    type="text"
                    value={value || ""}
                    onChange={(e) => onChange(e.target.value || null)}
                    placeholder={`Buscar en ${config.label.toLowerCase()}...`}
                    className="w-full bg-white border-2 border-[#111111] pl-12 pr-4 py-3 font-nunito text-[14px] outline-none transition-all focus:shadow-[4px_4px_0_#111111]"
                    style={{
                        // The accent border logic
                        borderImage: `linear-gradient(to right, ${config.acento}, ${config.acento}) 1`
                    }}
                />

                {/* Draw border effect on focus could be complex with input, 
                    simplified to a shadow + accent focus state in typical CSS focus hooks */}
                <style jsx>{`
                    input:focus {
                        border-color: ${config.acento} !important;
                    }
                `}</style>
            </div>

            {/* Sort Select */}
            <Select.Root value={sort || "name"} onValueChange={onSortChange}>
                <Select.Trigger
                    className="flex h-[48px] items-center justify-between gap-2 bg-white border-2 border-[#111111] px-4 font-press-start text-[8px] outline-none hover:bg-[#F2F2F2] transition-colors min-w-[140px]"
                >
                    <div className="flex items-center gap-2 uppercase tracking-tight">
                        <ArrowUpDown size={12} />
                        <Select.Value />
                    </div>
                    <Select.Icon>
                        <ChevronDown size={14} />
                    </Select.Icon>
                </Select.Trigger>

                <Select.Portal>
                    <Select.Content
                        className="bg-white border-2 border-[#111111] z-[100] shadow-[4px_4px_0_#111111] overflow-hidden"
                    >
                        <Select.Viewport className="p-1">
                            {[
                                { value: "name", label: "Nombre (A-Z)" },
                                { value: "id", label: "Nº ID" },
                                { value: "cost", label: "Precio" }
                            ].map((opt) => (
                                <Select.Item
                                    key={opt.value}
                                    value={opt.value}
                                    className="px-6 py-3 font-nunito text-[13px] outline-none cursor-pointer data-[highlighted]:bg-[#F2F2F2] data-[highlighted]:text-[#CC0000] data-[state=checked]:bg-[#111111] data-[state=checked]:text-white transition-colors"
                                >
                                    <Select.ItemText>{opt.label}</Select.ItemText>
                                </Select.Item>
                            ))}
                        </Select.Viewport>
                    </Select.Content>
                </Select.Portal>
            </Select.Root>
        </div>
    )
}
