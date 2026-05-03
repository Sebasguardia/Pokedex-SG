"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import * as Tabs from "@radix-ui/react-tabs"
import { TYPE_COLORS } from "@/lib/constants/types/types.constants"
import Link from "next/link"
import { ArrowRight, ChevronRight, User } from "lucide-react"

interface Props {
    organizedPokemon: {
        slot1: any[]
        slot2: any[]
        hidden: any[]
    }
}

export function AbilityPokemonTabs({ organizedPokemon }: Props) {
    const tabs = [
        { id: "slot1", label: "Slot 1", count: organizedPokemon.slot1.length, color: "#111111" },
        { id: "slot2", label: "Slot 2", count: organizedPokemon.slot2.length, color: "#444444" },
        { id: "hidden", label: "Oculta", count: organizedPokemon.hidden.length, color: "#CC0000" }
    ]

    const [activeTab, setActiveTab] = useState("slot1")

    return (
        <section className="py-12">
            <div className="flex items-center gap-3 mb-8">
                <h2 className="font-press-start text-[14px] text-[#111111] uppercase tracking-tighter">POKÉMON RELACIONADOS</h2>
                <div className="h-px bg-[#E0E0E0] flex-1" />
            </div>

            <Tabs.Root value={activeTab} onValueChange={setActiveTab} className="w-full">
                {/* SPECIAL BACKGROUND TRAVELING TABS */}
                <Tabs.List className="relative flex bg-[#F2F2F2] p-1 border-2 border-[#111111] mb-8">
                    {/* The Background Indicator */}
                    <motion.div
                        className="absolute top-1 bottom-1 z-0"
                        layoutId="activeTabBg"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        initial={false}
                        style={{
                            width: `calc(${100 / tabs.length}% - 4px)`,
                            left: `calc(${(tabs.findIndex(t => t.id === activeTab) * (100 / tabs.length))}% + 2px)`,
                            backgroundColor: tabs.find(t => t.id === activeTab)?.color
                        }}
                    />

                    {tabs.map((tab) => (
                        <Tabs.Trigger
                            key={tab.id}
                            value={tab.id}
                            disabled={tab.count === 0}
                            className={`flex-1 relative z-10 py-3 font-press-start text-[8px] sm:text-[10px] uppercase transition-colors duration-300 ${activeTab === tab.id ? 'text-white' : tab.count === 0 ? 'text-[#CCCCCC] cursor-not-allowed' : 'text-[#888888] hover:text-[#111111]'}`}
                        >
                            <div className="flex flex-col items-center gap-1">
                                {tab.label}
                                <span className={`text-[8px] font-nunito ${activeTab === tab.id ? 'opacity-100' : 'opacity-60'}`}>
                                    {tab.count} Pokémon
                                </span>
                            </div>
                        </Tabs.Trigger>
                    ))}
                </Tabs.List>

                <AnimatePresence mode="wait">
                    <Tabs.Content key={activeTab} value={activeTab} className="outline-none" forceMount>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3"
                        >
                            {/* @ts-ignore */}
                            {organizedPokemon[activeTab].map((p: any, i: number) => {
                                const idMatches = p.url.match(/\/pokemon\/(\d+)\//)
                                const id = idMatches ? idMatches[1] : ""
                                return (
                                    <Link key={p.name} href={`/pokemon/${p.name}`}>
                                        <motion.div
                                            className="bg-[#FAFAFA] border-2 border-[#111111] p-3 text-center group cursor-pointer"
                                            whileHover={{ y: -4, boxShadow: "4px 4px 0 #111111" }}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: i * 0.02 }}
                                        >
                                            <div className="relative mb-2 bg-white rounded-full p-2 border border-[#E0E0E0]">
                                                <img
                                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                                                    alt={p.name}
                                                    className="w-full h-auto object-contain pixelated"
                                                />
                                            </div>
                                            <span className="font-nunito font-bold text-[11px] capitalize text-[#111111] truncate block">{p.name.replace("-", " ")}</span>
                                            <span className="font-jetbrains text-[10px] text-[#888888]">#{id.padStart(4, "0")}</span>
                                        </motion.div>
                                    </Link>
                                )
                            })}
                        </motion.div>
                    </Tabs.Content>
                </AnimatePresence>
            </Tabs.Root>
        </section>
    )
}
