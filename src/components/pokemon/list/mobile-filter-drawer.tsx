"use client"

import { motion, AnimatePresence } from "framer-motion"
import * as Dialog from "@radix-ui/react-dialog"
import { SlidersHorizontal, X } from "lucide-react"
import { FilterContent } from "./filter-sidebar"

interface MobileFilterDrawerProps {
    open: boolean;
    onClose: () => void;
    activeFiltersCount: number;
    onClearAll: () => void;
}

export function MobileFilterButton({ count, onClick }: { count: number, onClick: () => void }) {
    return (
        <motion.button
            onClick={onClick}
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.5 }}
            whileHover={{ scale: 1.02, backgroundColor: "#CC0000", color: "#FFFFFF", boxShadow: "4px 4px 0 #111111" }}
            whileTap={{ scale: 0.96 }}
            className="fixed lg:hidden bottom-[24px] left-1/2 -translate-x-1/2 z-40 bg-[#111111] text-white font-nunito text-[13px] font-bold uppercase tracking-[0.05em] px-6 py-3 border-2 border-[#111111] flex items-center gap-2 shadow-[4px_4px_0_#CC0000] outline-none"
        >
            <SlidersHorizontal size={16} />
            FILTROS
            <AnimatePresence>
                {count > 0 && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ type: "spring", bounce: 0.5 }}
                        className="absolute -top-[8px] -right-[8px] bg-[#CC0000] text-white font-pixel text-[7px] w-[20px] h-[20px] rounded-full flex items-center justify-center pt-[1px] border border-white"
                    >
                        {count}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
    )
}

export function MobileFilterDrawer({ open, onClose, activeFiltersCount, onClearAll }: MobileFilterDrawerProps) {
    return (
        <Dialog.Root open={open} onOpenChange={(val) => !val && onClose()}>
            <AnimatePresence>
                {open && (
                    <Dialog.Portal forceMount>
                        <Dialog.Overlay asChild>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="fixed inset-0 z-50 bg-[#111111]/60 backdrop-blur-[4px]"
                            />
                        </Dialog.Overlay>
                        <Dialog.Content asChild>
                            <motion.div
                                initial={{ y: "100%" }}
                                animate={{ y: "0%" }}
                                exit={{ y: "100%" }}
                                transition={open ? { type: "spring", stiffness: 350, damping: 35, mass: 0.9 } : { duration: 0.25, ease: "easeIn" }}
                                className="fixed bottom-0 left-0 right-0 z-50 h-[85vh] bg-white border-t-[3px] border-t-[#CC0000] outline-none flex flex-col"
                            >
                                {/* Doble stripe (la roja ya está en el border-t) */}
                                <div className="w-full h-[2px] bg-[#111111] absolute top-[-5px]" />

                                {/* Pill handle para arrastrar visual */}
                                <div className="absolute top-[12px] left-1/2 -translate-x-1/2 w-[40px] h-[4px] bg-[#E0E0E0] rounded-[2px]" />

                                {/* HEADER */}
                                <div className="px-5 pt-8 pb-4 border-b border-[#F2F2F2] flex justify-between items-center bg-white flex-shrink-0">
                                    <div className="flex items-center gap-2">
                                        <h2 className="font-pixel text-[9px] text-[#111111] m-0">FILTROS</h2>
                                        {activeFiltersCount > 0 && (
                                            <div className="bg-[#CC0000] text-white font-pixel text-[7px] w-[18px] h-[18px] rounded-full flex items-center justify-center pt-[1px]">
                                                {activeFiltersCount}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <button onClick={onClearAll} className="font-nunito text-[12px] text-[#CC0000] outline-none">Limpiar</button>
                                        <Dialog.Close asChild>
                                            <button className="text-[#111111] outline-none p-1 rounded-full hover:bg-[#F2F2F2]"><X size={20} /></button>
                                        </Dialog.Close>
                                    </div>
                                </div>

                                {/* BODY */}
                                <div className="flex-1 overflow-y-auto">
                                    <FilterContent />
                                </div>

                                {/* FOOTER */}
                                <div className="p-4 border-t border-[#E0E0E0] bg-white flex-shrink-0">
                                    <button
                                        onClick={onClose}
                                        className="w-full bg-[#CC0000] text-white font-nunito text-[14px] font-bold uppercase py-3 outline-none border-2 border-[#111111] hover:translate-x-[4px] hover:translate-y-[4px] transition-transform shadow-[4px_4px_0_#111111] hover:shadow-none"
                                    >
                                        APIICAR {activeFiltersCount > 0 ? `(${activeFiltersCount} FILTROS)` : ""}
                                    </button>
                                </div>
                            </motion.div>
                        </Dialog.Content>
                    </Dialog.Portal>
                )}
            </AnimatePresence>
        </Dialog.Root>
    )
}
