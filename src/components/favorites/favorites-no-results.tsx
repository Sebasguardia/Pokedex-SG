"use client";

import { motion } from "framer-motion";
import { SearchX } from "lucide-react";

export function FavoritesNoResults({ onClear }: { onClear: () => void }) {
    return (
        <div className="flex flex-col items-center justify-center py-16 gap-5">
            <motion.div
                animate={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
                <SearchX size={48} className="text-[#DDDDDD]" />
            </motion.div>
            <div className="text-center space-y-2">
                <p className="font-press-start text-[12px] text-[#111111]">Sin resultados</p>
                <p className="font-nunito text-[14px] text-[#888888]">Los filtros actuales no coinciden con ningún favorito</p>
            </div>
            <button
                onClick={onClear}
                className="font-press-start text-[8px] px-4 py-2 border-2 border-[#CC0000] text-[#CC0000] hover:bg-[#CC0000] hover:text-white transition-colors"
            >
                Limpiar filtros
            </button>
        </div>
    );
}
