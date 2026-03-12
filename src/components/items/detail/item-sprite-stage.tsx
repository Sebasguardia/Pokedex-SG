"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { getSpriteAnimationByPocket } from "@/lib/utils/item.utils"
import { POCKET_COLORS } from "@/lib/constants/items.constants"
import { cn } from "@/lib/utils/cn"

interface Props {
    item: any
    pocket: string
    size?: number
}

export function ItemSpriteStage({ item, pocket, size = 96 }: Props) {
    const animation = getSpriteAnimationByPocket(pocket)
    const colorConfig = POCKET_COLORS[pocket as keyof typeof POCKET_COLORS] || POCKET_COLORS.misc
    const isKeyItem = pocket === "key-items" || item.category?.name?.includes("event-items")

    const getAnimationProps = () => {
        switch (animation) {
            case "float":
                return {
                    animate: { y: [0, -8, 0] },
                    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" as const }
                }
            case "rock":
                return {
                    animate: { rotate: [-5, 5, -5] },
                    transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" as const }
                }
            case "pulse":
                return {
                    animate: { scale: [1, 1.08, 1] },
                    transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" as const }
                }
            case "rotate":
                return {
                    animate: { rotate: 360 },
                    transition: { duration: 10, repeat: Infinity, ease: "linear" as const }
                }
            default:
                return {}
        }
    }

    return (
        <div className="flex flex-col items-center">
            <div
                className="relative w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] flex items-center justify-center border-2 border-[#111111] shadow-[6px_6px_0_#111111] bg-[#FFFFFF] overflow-hidden"
            >
                {/* Background Pattern / Tint */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{ backgroundColor: colorConfig.fondo }}
                />

                {/* Rare Aura */}
                {isKeyItem && (
                    <motion.div
                        className="absolute w-24 h-24 rounded-full blur-xl pointer-events-none"
                        style={{ backgroundColor: colorConfig.acento }}
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.1, 0.3, 0.1]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                )}

                {/* Sprite with Pocket Animation */}
                <motion.div
                    className="relative z-10"
                    {...getAnimationProps()}
                >
                    <Image
                        src={item.sprites?.default || "/placeholder-item.png"}
                        alt={item.name}
                        width={size}
                        height={size}
                        style={{ imageRendering: "pixelated" }}
                        className="scale-[1.8] sm:scale-[2.2]"
                    />

                    {/* Shimmer Effect for Key Items */}
                    {isKeyItem && (
                        <motion.div
                            className="absolute inset-0 z-20 pointer-events-none overflow-hidden"
                            style={{
                                background: "linear-gradient(45deg, transparent, white, transparent)",
                                opacity: 0.4
                            }}
                            animate={{ x: ["-100%", "200%"] }}
                            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
                        />
                    )}
                </motion.div>
            </div>

            {/* Price Badge underneath */}
            <div className="mt-6 flex flex-col items-center gap-1">
                <span className="font-press-start text-[7px] text-[#888888]">PRECIO SUGERIDO</span>
                <div className="font-jetbrains text-lg font-bold text-[#111111]">
                    {item.cost > 0 ? `${item.cost}₽` : "NO VENDIBLE"}
                </div>
            </div>
        </div>
    )
}
