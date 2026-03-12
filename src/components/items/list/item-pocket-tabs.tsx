"use client"

import { motion, AnimatePresence } from "framer-motion"
import * as Tooltip from "@radix-ui/react-tooltip"
import { POCKET_COLORS, POCKET_META } from "@/lib/constants/items.constants"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils/cn"

interface Props {
    activePocket: string
    onPocketChange: (pocket: string) => void
    pockets?: string[]
}

const ORDERED_POCKETS = [
    "medicine",
    "pokeballs",
    "battle",
    "berries",
    "mail",
    "machines",
    "key",
    "misc"
]

export function ItemPocketTabs({ activePocket, onPocketChange, pockets }: Props) {
    const [isSticky, setIsSticky] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 150)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <Tooltip.Provider delayDuration={200}>
            <div
                className={cn(
                    "sticky top-[64px] z-30 w-full bg-white transition-shadow duration-300",
                    isSticky ? "shadow-[0_4px_12px_rgba(0,0,0,0.06)]" : ""
                )}
            >
                <div className="max-w-[1280px] mx-auto overflow-x-auto no-scrollbar">
                    <nav className="flex min-w-max sm:min-w-0">
                        {ORDERED_POCKETS.map((pocketId) => {
                            const isActive = activePocket === pocketId
                            const config = POCKET_META[pocketId] || POCKET_META.misc

                            return (
                                <Tooltip.Root key={pocketId}>
                                    <Tooltip.Trigger asChild>
                                        <button
                                            onClick={() => onPocketChange(pocketId)}
                                            className={cn(
                                                "relative flex-1 flex flex-col items-center gap-1.5 px-4 py-3 sm:py-4 transition-colors duration-200 min-w-[70px] sm:min-w-[100px]",
                                                isActive ? "text-white" : "hover:bg-black/[0.02]"
                                            )}
                                        >
                                            {/* Icon with Bounce on activation */}
                                            <motion.div
                                                animate={isActive ? {
                                                    scale: [1, 1.4, 0.9, 1.05, 1],
                                                    color: "#FFFFFF"
                                                } : {
                                                    scale: 1,
                                                    color: config.acento
                                                }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                <config.icon size={20} />
                                            </motion.div>

                                            {/* Name (Visible on desktop) */}
                                            <span className={cn(
                                                "hidden sm:block font-press-start text-[7px] uppercase tracking-tighter transition-colors",
                                                isActive ? "text-white" : "text-[#888888]"
                                            )}>
                                                {config.label}
                                            </span>

                                            {/* Background Indicator */}
                                            {isActive && (
                                                <motion.div
                                                    layoutId="pocket-tab-bg"
                                                    className="absolute inset-0 z-[-1]"
                                                    style={{ backgroundColor: config.acento }}
                                                    transition={{ type: "spring", stiffness: 350, damping: 35 }}
                                                />
                                            )}

                                            {/* Bottom Border Indicator (Internal) */}
                                            {isActive && (
                                                <motion.div
                                                    layoutId="pocket-tab-border"
                                                    className="absolute bottom-0 left-0 w-full h-[3px] bg-[#111111]"
                                                />
                                            )}

                                            {/* Particle Effect (Confetti point) */}
                                            {isActive && (
                                                <motion.div
                                                    className="absolute w-1 h-1 rounded-full"
                                                    style={{ backgroundColor: config.acento }}
                                                    initial={{ y: 0, opacity: 1 }}
                                                    animate={{ y: -20, opacity: 0 }}
                                                    transition={{ duration: 0.4 }}
                                                />
                                            )}
                                        </button>
                                    </Tooltip.Trigger>
                                    <Tooltip.Portal>
                                        <Tooltip.Content
                                            className="sm:hidden bg-[#111111] text-white px-3 py-1.5 font-press-start text-[7px] z-50 border border-white/20 shadow-xl"
                                            sideOffset={5}
                                        >
                                            {config.label}
                                            <Tooltip.Arrow className="fill-[#111111]" />
                                        </Tooltip.Content>
                                    </Tooltip.Portal>
                                </Tooltip.Root>
                            )
                        })}
                    </nav>
                </div>
            </div>
        </Tooltip.Provider>
    )
}
