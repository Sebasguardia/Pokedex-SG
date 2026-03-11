"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Search, X, Layers } from "lucide-react"
import { GiEyeTarget } from "react-icons/gi"
import * as Select from "@radix-ui/react-select"
import { GENERATIONS } from "@/lib/constants/generations.constants"

interface Props {
    search: string | null
    onSearchChange: (val: string | null) => void
    genFilter: string | null
    onGenChange: (val: string | null) => void
    typeFilter: "hidden" | "main" | null
    onTypeChange: (val: "hidden" | "main" | null) => void
    onClearAll: () => void
}

export function AbilityFilterBar({
    search, onSearchChange,
    genFilter, onGenChange,
    typeFilter, onTypeChange,
    onClearAll
}: Props) {

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap gap-3 items-center">
                {/* SEARCH */}
                <div className="flex-1 min-w-[300px] relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888] group-focus-within:text-[#CC0000] transition-colors" />
                    <input
                        type="text"
                        value={search || ""}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Buscar por nombre o efecto..."
                        className="w-full bg-white border-2 border-[#111111] pl-10 pr-10 py-2.5 font-nunito text-[14px] outline-none focus:border-[#CC0000] focus:shadow-[4px_4px_0_#111111] transition-all"
                    />
                    <AnimatePresence>
                        {search && (
                            <motion.button
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                onClick={() => onSearchChange(null)}
                                className="absolute right-3 top-1/2 -translate-y-1/2"
                            >
                                <X className="w-4 h-4 text-[#888888] hover:text-[#CC0000]" />
                            </motion.button>
                        )}
                    </AnimatePresence>
                    {search && (
                        <div className="mt-1 font-nunito text-[11px] text-[#888888] italic">
                            Buscando en nombres y efectos
                        </div>
                    )}
                </div>

                {/* GENERATION SELECT - Simplified for now */}
                {/* ... (Implementation using Select) */}

                {/* TOGGLE PILLS */}
                <div className="flex bg-[#F2F2F2] p-1 border-2 border-[#111111] h-[46px]">
                    <button
                        onClick={() => onTypeChange(null)}
                        className={`px-4 text-[12px] font-nunito font-bold transition-all ${!typeFilter ? 'bg-[#111111] text-white' : 'text-[#888888] hover:text-[#111111]'}`}
                    >
                        TODAS
                    </button>
                    <button
                        onClick={() => onTypeChange("hidden")}
                        className={`px-4 flex items-center gap-2 text-[8px] font-press-start transition-all relative overflow-hidden ${typeFilter === 'hidden' ? 'bg-[#111111] text-white' : 'text-[#888888] hover:text-[#CC0000]'}`}
                        style={{ boxShadow: typeFilter === 'hidden' ? '0 0 8px rgba(204,0,0,0.5)' : 'none' }}
                    >
                        <motion.div
                            animate={typeFilter === 'hidden' ? { rotate: [0, -180, 0] } : {}}
                            transition={{ duration: 0.5 }}
                        >
                            <GiEyeTarget size={12} className={typeFilter === 'hidden' ? 'text-[#CC0000]' : ''} />
                        </motion.div>
                        OCULTAS
                    </button>
                </div>
            </div>
        </div>
    )
}
