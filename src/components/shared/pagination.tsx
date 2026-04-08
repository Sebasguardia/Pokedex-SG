"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"

interface PaginationProps {
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalItems, itemsPerPage, onPageChange }: PaginationProps) {
    const [jumpTo, setJumpTo] = useState("")
    const [shake, setShake] = useState(false)
    const totalPages = Math.ceil(totalItems / itemsPerPage)

    if (totalPages <= 1) return null

    const calculateItemsRange = () => {
        const start = (currentPage - 1) * itemsPerPage + 1
        const end = Math.min(currentPage * itemsPerPage, totalItems)
        return `${start}–${end}`
    }

    const handleJump = () => {
        const p = parseInt(jumpTo)
        if (!isNaN(p) && p >= 1 && p <= totalPages) {
            onPageChange(p)
            setJumpTo("")
        } else {
            setShake(true)
            setTimeout(() => setShake(false), 300)
        }
    }

    const getPageNumbers = () => {
        const pages = []
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) pages.push(i)
        } else {
            if (currentPage <= 3) {
                pages.push(1, 2, 3, 4, '...', totalPages)
            } else if (currentPage >= totalPages - 2) {
                pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
            } else {
                pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages)
            }
        }
        return pages
    }

    return (
        <div className="flex flex-col items-center mt-12 mb-20">
            {/* INFO */}
            <div className="font-nunito text-[13px] text-[#888888] mb-6 flex space-x-1">
                <span>Mostrando</span>
                <div className="relative overflow-hidden w-[60px] h-[20px] inline-block text-center mx-1">
                    <AnimatePresence mode="popLayout" initial={false}>
                        <motion.span
                            key={currentPage}
                            initial={{ y: -15, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 15, opacity: 0 }}
                            className="absolute left-0 right-0 font-bold text-[#444444]"
                        >
                            {calculateItemsRange()}
                        </motion.span>
                    </AnimatePresence>
                </div>
                <span>de {totalItems} Pokémon</span>
            </div>

            {/* ROW DE BOTONES */}
            <nav className="flex flex-wrap justify-center items-center gap-[4px] md:gap-[8px]" aria-label="Paginación de Pokémon">
                {/* PREV */}
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`flex items-center gap-[6px] bg-[#111111] text-white font-nunito text-[12px] font-bold border-2 border-[#111111] px-4 py-2 hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all disabled:opacity-30 disabled:pointer-events-none ${
                        currentPage === 1 ? "shadow-none" : "shadow-[3px_3px_0_#CC0000]"
                    }`}
                    aria-label="Página anterior"
                >
                    <ChevronLeft size={14} aria-hidden="true" />
                    ANTERIOR
                </button>

                {/* PÁGINAS */}
                <div className="flex gap-[4px] mx-2">
                    {getPageNumbers().map((page, index) => {
                        if (page === '...') {
                            return (
                                <div key={`ellipsis-${index}`} className="w-[36px] h-[36px] flex items-center justify-center font-nunito text-[13px] text-[#888888]" aria-hidden="true">
                                    ...
                                </div>
                            )
                        }

                        const pNum = page as number;
                        const isActive = pNum === currentPage;

                        return (
                            <motion.button
                                key={pNum}
                                onClick={() => onPageChange(pNum)}
                                whileTap={{ scale: 0.95 }}
                                animate={isActive ? { scale: [1, 1.2, 1] } : {}}
                                transition={{ duration: 0.2 }}
                                className={`w-[36px] h-[36px] border-2 flex items-center justify-center transition-all ${isActive
                                    ? "bg-[#CC0000] text-white border-[#CC0000] font-pixel text-[10px] shadow-[3px_3px_0_#111111]"
                                    : "bg-white text-[#111111] border-[#E0E0E0] font-nunito text-[13px] font-bold hover:border-[#111111] hover:bg-[#F2F2F2] shadow-none"
                                    }`}
                                aria-label={`Ir a la página ${pNum}`}
                                aria-current={isActive ? "page" : undefined}
                            >
                                {pNum}
                            </motion.button>
                        )
                    })}
                </div>

                {/* NEXT */}
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`flex items-center gap-[6px] bg-[#111111] text-white font-nunito text-[12px] font-bold border-2 border-[#111111] px-4 py-2 hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all disabled:opacity-30 disabled:pointer-events-none ${
                        currentPage === totalPages ? "shadow-none" : "shadow-[3px_3px_0_#CC0000]"
                    }`}
                    aria-label="Siguiente página"
                >
                    SIGUIENTE
                    <ChevronRight size={14} aria-hidden="true" />
                </button>
            </nav>

            {/* QUICK JUMP */}
            <div className="hidden md:flex mt-8 items-center gap-3">
                <label htmlFor="jump-to-page" className="font-nunito text-[12px] text-[#888888]">Ir a página:</label>
                <div className="flex relative">
                    <motion.input
                        id="jump-to-page"
                        type="text"
                        value={jumpTo}
                        onChange={(e) => setJumpTo(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleJump()}
                        className="w-[48px] h-[32px] border-2 border-[#111111] text-center font-mono text-[13px] outline-none placeholder-[#CCCCCC]"
                        placeholder="1"
                        animate={shake ? { x: [-4, 4, -2, 2, 0] } : {}}
                        transition={{ duration: 0.3 }}
                        aria-label="Número de página para saltar"
                    />
                    <button
                        onClick={handleJump}
                        className="bg-[#CC0000] text-white w-[32px] h-[32px] flex items-center justify-center hover:bg-[#990000] transition-colors outline-none"
                        aria-label="Saltar a la página"
                    >
                        <ArrowRight size={14} aria-hidden="true" />
                    </button>
                </div>
            </div>
        </div>
    )
}
