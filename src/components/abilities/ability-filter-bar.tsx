"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Search, X } from "lucide-react"

interface Props {
    search: string | null
    onSearchChange: (val: string | null) => void
    onClearAll: () => void
}

export function AbilityFilterBar({ search, onSearchChange, onClearAll }: Props) {
    return (
        <div className="space-y-4">
            <div className="flex flex-wrap gap-3 items-center">
                {/* SEARCH */}
                <div className="flex-1 w-full relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#888888] group-focus-within:text-[#CC0000] transition-colors" />
                    <input
                        type="text"
                        value={search || ""}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Buscar habilidad por nombre o efecto..."
                        className="w-full bg-white border-4 border-[#111111] pl-12 pr-12 py-3 font-press-start text-[14px] sm:text-[16px] outline-none focus:border-[#CC0000] focus:shadow-[6px_6px_0_#111111] transition-all"
                    />
                    <AnimatePresence>
                        {search && (
                            <motion.button
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                onClick={() => onClearAll()}
                                className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#111111] p-1 text-white hover:bg-[#CC0000] transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>
            </div>
            
            {search && (
                <div className="font-nunito text-[14px] text-[#888888] italic">
                    Resultados para: <span className="font-bold text-[#111111]">"{search}"</span>
                </div>
            )}
        </div>
    )
}
