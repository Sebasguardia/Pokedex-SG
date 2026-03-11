"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Package, SearchX } from "lucide-react"

interface Props {
    pocket: string
    pocketMeta: any
}

export function ItemsEmptyState({ pocket, pocketMeta }: Props) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20 px-4 text-center"
        >
            <motion.div
                animate={{ rotate: [0, -10, 10, -5, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="mb-6 p-6 rounded-full border-2 border-[#111111] shadow-[4px_4px_0_#111111]"
                style={{ backgroundColor: pocketMeta.fondo }}
            >
                <Package size={48} style={{ color: pocketMeta.acento }} />
            </motion.div>

            <h2 className="font-press-start text-[10px] sm:text-[12px] text-[#111111] mb-2 uppercase">
                Sin objetos en este bolsillo
            </h2>
            <p className="font-nunito text-[14px] text-[#888888] max-w-[300px]">
                No pudimos encontrar ningún objeto que coincida con tu búsqueda en {pocketMeta.label.toLowerCase()}.
            </p>

            <motion.div
                className="mt-8 flex items-center gap-2 text-[#888888] font-nunito text-[12px] italic uppercase tracking-wider"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <SearchX size={14} />
                <span>Prueba con otros filtros de búsqueda</span>
            </motion.div>
        </motion.div>
    )
}
