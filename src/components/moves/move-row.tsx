"use client"

import { forwardRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import * as HoverCard from "@radix-ui/react-hover-card"
import * as Tooltip from "@radix-ui/react-tooltip"
import { Move } from "@/types/api/move.types"
import { TYPE_COLORS, TYPE_ICON } from "@/lib/constants/types.constants"
import { GEN_ROMAN, getPowerColor } from "@/lib/constants/moves.constants"
import { MoveClassBadge } from "./move-class-badge"
import { MovePowerDisplay } from "./move-power-display"

interface MoveRowProps {
    move: Move
    index: number
    isFirst: boolean
    style?: React.CSSProperties
}

export const MoveRow = forwardRef<HTMLDivElement, MoveRowProps>(
    ({ move, index, isFirst, style }, ref) => {
        const router = useRouter()
        const [hovered, setHovered] = useState(false)
        const typeColor = TYPE_COLORS[move.type?.name ?? ""] ?? "#888888"
        const TypeIcon = TYPE_ICON[move.type?.name as keyof typeof TYPE_ICON]

        const nameES = move.names?.find(n => n.language.name === "es")?.name ?? move.name
        const genRoman = GEN_ROMAN[move.generation?.name ?? ""] ?? "?"
        const accColor =
            move.accuracy === null ? "#AAAAAA" :
                move.accuracy === 100 ? "#22C55E" :
                    move.accuracy < 70 ? "#F97316" : "#444444"

        // PP dots
        const ppDots = move.pp <= 8 ? Array.from({ length: 8 }).map((_, i) => i < move.pp) : null

        const rowBg = index % 2 === 0 ? "#FFFFFF" : "#FAFAFA"

        return (
            <HoverCard.Root openDelay={700} closeDelay={100}>
                <HoverCard.Trigger asChild>
                    <motion.div
                        ref={ref}
                        style={{ ...style, backgroundColor: rowBg }}
                        className="relative flex items-center h-[52px] border-b border-[#E0E0E0] cursor-pointer"
                        initial={isFirst ? { opacity: 0, x: -8 } : { opacity: 1 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: isFirst ? index * 0.025 : 0, type: "spring", stiffness: 400, damping: 35 }}
                        onHoverStart={() => setHovered(true)}
                        onHoverEnd={() => setHovered(false)}
                        onClick={() => router.push(`/moves/${move.name}`)}
                    >
                        {/* Hover overlay with type color */}
                        <AnimatePresence>
                            {hovered && (
                                <motion.div
                                    className="absolute inset-0 pointer-events-none z-0"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.12 }}
                                    style={{ backgroundColor: `${typeColor}06` }}
                                />
                            )}
                        </AnimatePresence>

                        {/* Border left — type color on hover */}
                        <motion.div
                            className="absolute left-0 top-0 w-[4px] h-full pointer-events-none z-10"
                            style={{ backgroundColor: typeColor }}
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: hovered ? 1 : 0 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />

                        {/* NOMBRE */}
                        <div className="flex-1 min-w-[140px] flex items-center gap-2 px-3 z-10">
                            <AnimatePresence>
                                {hovered && TypeIcon && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -8 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -8 }}
                                        transition={{ duration: 0.15 }}
                                        style={{ color: typeColor }}
                                    >
                                        <TypeIcon size={12} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <Link
                                href={`/moves/${move.name}`}
                                className="font-nunito font-bold text-[13px] truncate transition-colors max-w-[120px]"
                                style={{ color: hovered ? typeColor : "#111111" }}
                                onClick={e => e.stopPropagation()}
                            >
                                {nameES}
                            </Link>
                        </div>

                        {/* TIPO */}
                        <div className="w-[100px] flex justify-start px-2 z-10">
                            <Link
                                href={`/types/${move.type?.name}`}
                                onClick={e => e.stopPropagation()}
                                className="inline-flex items-center gap-1 px-2 py-0.5 border-[1.5px] border-[#111111] font-nunito text-[10px] font-bold text-white uppercase transition-transform hover:scale-105"
                                style={{ backgroundColor: typeColor }}
                            >
                                {TypeIcon && <TypeIcon size={10} />}
                                {move.type?.name}
                            </Link>
                        </div>

                        {/* CLASE */}
                        <div className="w-[90px] flex justify-center z-10">
                            <MoveClassBadge damageClass={move.damage_class?.name ?? "status"} size="sm" />
                        </div>

                        {/* POW */}
                        <div className="w-[70px] flex justify-center z-10">
                            <MovePowerDisplay power={move.power} showBar={true} index={index} />
                        </div>

                        {/* ACC */}
                        <div className="w-[70px] flex justify-center items-center gap-1 z-10">
                            {move.accuracy === null ? (
                                <Tooltip.Provider delayDuration={300}>
                                    <Tooltip.Root>
                                        <Tooltip.Trigger asChild>
                                            <span className="font-jetbrains text-[12px] text-[#AAAAAA]">—</span>
                                        </Tooltip.Trigger>
                                        <Tooltip.Portal>
                                            <Tooltip.Content className="bg-[#111111] text-white text-[11px] font-nunito px-2 py-1 z-50" sideOffset={4}>
                                                Este move nunca falla
                                                <Tooltip.Arrow className="fill-[#111111]" />
                                            </Tooltip.Content>
                                        </Tooltip.Portal>
                                    </Tooltip.Root>
                                </Tooltip.Provider>
                            ) : (
                                <>
                                    <span className="font-jetbrains text-[12px] font-bold" style={{ color: accColor }}>
                                        {move.accuracy}
                                    </span>
                                    <span className="font-jetbrains text-[10px]" style={{ color: accColor }}>%</span>
                                    {move.accuracy === 100 && (
                                        <motion.span
                                            className="text-[#22C55E] text-[10px]"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", bounce: 0.5 }}
                                        >✓</motion.span>
                                    )}
                                </>
                            )}
                        </div>

                        {/* PP */}
                        <div className="w-[54px] flex flex-col items-center gap-0.5 z-10">
                            <span className="font-jetbrains text-[12px] text-[#888888]">{move.pp}</span>
                            {ppDots && (
                                <div className="flex gap-[2px]">
                                    {ppDots.map((filled, i) => (
                                        <motion.div
                                            key={i}
                                            className="w-[4px] h-[4px] rounded-full"
                                            style={{ backgroundColor: filled ? "#CC0000" : "#E0E0E0" }}
                                            initial={{ scale: 0 }}
                                            whileInView={{ scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.04, type: "spring", bounce: 0.4 }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* GEN */}
                        <div className="w-[54px] text-center z-10">
                            <span className="font-press-start text-[8px] text-[#888888]">{genRoman}</span>
                        </div>
                    </motion.div>
                </HoverCard.Trigger>

                <HoverCard.Portal>
                    <HoverCard.Content
                        className="z-50"
                        sideOffset={8}
                        align="start"
                    >
                        <motion.div
                            className="bg-white border-2 border-[#111111] p-4 w-[260px]"
                            style={{ boxShadow: `6px 6px 0 ${typeColor}` }}
                            initial={{ scale: 0.92, opacity: 0, x: -10 }}
                            animate={{ scale: 1, opacity: 1, x: 0 }}
                            transition={{ type: "spring", stiffness: 450, damping: 30 }}
                        >
                            {/* Header */}
                            <div className="flex items-center gap-2 mb-2">
                                <Link href={`/types/${move.type?.name}`} className="inline-flex items-center gap-1 px-2 py-0.5 border-[1.5px] border-[#111111] font-nunito text-[10px] font-bold text-white uppercase" style={{ backgroundColor: typeColor }}>
                                    {TypeIcon && <TypeIcon size={10} />}
                                    {move.type?.name}
                                </Link>
                                <MoveClassBadge damageClass={move.damage_class?.name ?? "status"} size="sm" />
                            </div>

                            <div className="font-press-start text-[11px] text-[#111111] my-2">{nameES}</div>

                            {/* Type color bar */}
                            <motion.div
                                className="h-[3px] w-full mb-3"
                                style={{ backgroundColor: typeColor, transformOrigin: "left" }}
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 0.1, duration: 0.3, ease: "easeOut" }}
                            />

                            {/* Mini stats grid */}
                            <div className="grid grid-cols-3 gap-1 mb-3">
                                {[
                                    { label: "POW", value: move.power ?? "—", color: getPowerColor(move.power) },
                                    { label: "ACC", value: move.accuracy !== null ? `${move.accuracy}%` : "—", color: accColor },
                                    { label: "PP", value: move.pp, color: "#888888" },
                                    { label: "PRIO", value: move.priority > 0 ? `+${move.priority}` : move.priority, color: move.priority > 0 ? "#22C55E" : "#888888" },
                                    { label: "EFT%", value: move.effect_chance ? `${move.effect_chance}%` : "—", color: "#888888" },
                                    { label: "GEN", value: genRoman, color: "#888888" },
                                ].map(stat => (
                                    <div key={stat.label} className="flex flex-col items-center">
                                        <span className="font-press-start text-[6px] text-[#AAAAAA] mb-0.5">{stat.label}</span>
                                        <span className="font-jetbrains text-[12px] font-bold" style={{ color: stat.color }}>{stat.value}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Short effect */}
                            {move.effect_entries?.[0] && (
                                <p className="font-nunito text-[11px] text-[#888888] italic border-t border-[#F2F2F2] pt-2 line-clamp-2">
                                    {(move.effect_entries.find(e => e.language.name === "es")?.short_effect ??
                                        move.effect_entries.find(e => e.language.name === "en")?.short_effect ?? "")
                                        .replace(/\$effect_chance/g, `${move.effect_chance ?? 0}`)}
                                </p>
                            )}
                            <p className="font-nunito text-[10px] text-[#AAAAAA] text-center mt-2">Click para más detalles →</p>
                        </motion.div>
                        <HoverCard.Arrow className="fill-[#111111]" />
                    </HoverCard.Content>
                </HoverCard.Portal>
            </HoverCard.Root>
        )
    }
)

MoveRow.displayName = "MoveRow"
