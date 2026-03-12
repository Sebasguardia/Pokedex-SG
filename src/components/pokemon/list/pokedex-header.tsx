"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Sparkles, LayoutGrid, List } from "lucide-react"
import * as Switch from "@radix-ui/react-switch"
import { useUIStore } from "@/lib/store/ui.store"
import { cn } from "@/lib/utils/cn"

interface PokedexHeaderProps {
    count: number;
}

export function PokedexHeader({ count }: PokedexHeaderProps) {
    const { viewMode, setViewMode, shinyMode, toggleShinyMode } = useUIStore()

    return (
        <motion.div
            className="pb-6 border-b-2 border-[#111111] relative mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.35, ease: "easeOut" }}
        >
            {/* Línea roja decorativa underneath the border-b */}
            <motion.div
                className="absolute bottom-[-2px] left-0 h-[2px] bg-[#CC0000] w-full origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.05, duration: 0.35, ease: "easeOut" }}
            />

            {/* Breadcrumb */}
            <div className="font-nunito text-[12px] text-[#888888] mb-4">
                <Link href="/" className="hover:text-[#CC0000] hover:underline">
                    Inicio
                </Link>
                <span className="text-[#CCCCCC] mx-[6px]">/</span>
                <span className="text-[#111111]">Pokédex</span>
            </div>

            {/* FILA PRINCIPAL */}
            <div className="flex justify-between items-end flex-wrap gap-4">
                {/* LADO IZQUIERDO */}
                <div className="flex items-center gap-4">
                    {/* Decoración vertical */}
                    <motion.div
                        className="w-[4px] h-[32px] bg-[#CC0000] origin-top"
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15, duration: 0.3, ease: "easeOut" }}
                    />

                    <div className="flex items-center gap-3">
                        <h1 className="font-pixel text-[14px] md:text-[20px] text-[#111111] leading-none m-0">
                            POKÉDEX
                        </h1>

                        {/* COUNT BADGE */}
                        <motion.div
                            key={`badge-${count}`}
                            className="bg-[#CC0000] text-white font-pixel text-[8px] px-[12px] py-[5px] border-2 border-[#111111] flex items-center h-[24px]"
                            style={{ boxShadow: "2px 2px 0 #111111" }}
                            initial={{ scale: 1, backgroundColor: "#CC0000" }}
                            animate={{
                                scale: [1, 1.25, 1],
                                backgroundColor: ["#CC0000", "#990000", "#CC0000"]
                            }}
                            transition={{
                                scale: { duration: 0.3, ease: "easeInOut" },
                                backgroundColor: { duration: 0.2 }
                            }}
                        >
                            <motion.div
                                key={`text-${count}`}
                                initial={{ y: -12, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                            >
                                {count}
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

                {/* LADO DERECHO */}
                <div className="flex items-center gap-4">
                    {/* SHINY TOGGLE */}
                    <div className="flex items-center gap-2 mr-2">
                        <div className="relative flex items-center">
                            <motion.div
                                animate={{
                                    scale: shinyMode ? [1, 1.3, 1] : 1,
                                    color: shinyMode ? "#F59E0B" : "#888888"
                                }}
                                transition={{ duration: 0.3 }}
                                className="mr-[2px]"
                            >
                                <Sparkles size={14} className="relative z-10" />
                            </motion.div>

                            {/* Partículas shiny */}
                            {shinyMode && (
                                <>
                                    {[...Array(4)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className="absolute top-1/2 left-1/2 w-[3px] h-[3px] bg-[#F59E0B] rounded-full z-0"
                                            initial={{ opacity: 1, x: "-50%", y: "-50%" }}
                                            animate={{
                                                opacity: 0,
                                                x: `calc(-50% + ${(Math.random() - 0.5) * 30}px)`,
                                                y: `calc(-50% + ${(Math.random() - 0.5) * 30}px)`
                                            }}
                                            transition={{ duration: 0.5, ease: "easeOut" }}
                                        />
                                    ))}
                                </>
                            )}
                        </div>

                        <Switch.Root
                            checked={shinyMode}
                            onCheckedChange={toggleShinyMode}
                            className="w-[32px] h-[18px] bg-[#E0E0E0] rounded-full relative data-[state=checked]:bg-[#CC0000] outline-none cursor-pointer border-2 border-transparent transition-colors focus:border-[#111111]"
                        >
                            <Switch.Thumb className="block w-[14px] h-[14px] bg-white rounded-full transition-transform duration-100 translate-x-[2px] will-change-transform data-[state=checked]:translate-x-[16px]" />
                        </Switch.Root>
                        <span className="font-nunito text-[12px] text-[#888888] select-none cursor-pointer" onClick={toggleShinyMode}>
                            Shiny
                        </span>
                    </div>

                    {/* VIEW TOGGLE (desktop) */}
                    <div className="hidden md:flex border-2 border-[#111111]">
                        <button
                            onClick={() => setViewMode("grid")}
                            className={cn(
                                "w-[36px] h-[36px] flex items-center justify-center transition-colors focus:outline-none",
                                viewMode === "grid" ? "bg-[#111111] text-white" : "bg-white text-[#888888] hover:bg-[#F2F2F2]"
                            )}
                        >
                            <motion.div
                                animate={viewMode === "grid" ? { scale: [0.6, 1], rotate: [-15, 0] } : {}}
                                transition={{ type: "spring" }}
                            >
                                <LayoutGrid size={18} />
                            </motion.div>
                        </button>
                        <div className="w-[2px] bg-[#111111]" />
                        <button
                            onClick={() => setViewMode("list")}
                            className={cn(
                                "w-[36px] h-[36px] flex items-center justify-center transition-colors focus:outline-none",
                                viewMode === "list" ? "bg-[#111111] text-white" : "bg-white text-[#888888] hover:bg-[#F2F2F2]"
                            )}
                        >
                            <motion.div
                                animate={viewMode === "list" ? { scale: [0.6, 1], rotate: [-15, 0] } : {}}
                                transition={{ type: "spring" }}
                            >
                                <List size={18} />
                            </motion.div>
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
