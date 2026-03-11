"use client"

import { motion } from "framer-motion"
import * as Tabs from "@radix-ui/react-tabs"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Pagination } from "@/components/shared/pagination"

interface Props {
    pokemon: any[]
    typeName: string
    typeColor: string
    activeTab: string
    onTabChange: (tab: string) => void
    page: number
    limit: number
    onPageChange: (page: number) => void
    total: number
}

export function TypePokemonGrid({ pokemon, typeName, typeColor, activeTab, onTabChange, page, limit, onPageChange, total }: Props) {
    const typeNameES = typeName.toUpperCase()

    return (
        <section className="py-8">
            <div className="flex items-center gap-3 mb-4">
                <h2 className="font-press-start text-[13px] text-[#111111]">POKÉMON DE TIPO {typeNameES}</h2>
                <div className="px-2 py-0.5 text-white font-jetbrains text-[10px] rounded-full" style={{ backgroundColor: typeColor }}>
                    {total}
                </div>
            </div>
            <div className="h-px bg-[#E0E0E0] w-full mb-6" />

            <Tabs.Root value={activeTab} onValueChange={onTabChange} className="w-full">
                <Tabs.List className="flex border-b border-[#E0E0E0] mb-6 overflow-x-auto no-scrollbar">
                    {[
                        { id: "all", label: "Todos" },
                        { id: "primary", label: `Primario` },
                        { id: "secondary", label: `Secundario` }
                    ].map((tab) => {
                        const isActive = activeTab === tab.id
                        return (
                            <Tabs.Trigger
                                key={tab.id}
                                value={tab.id}
                                className="relative px-4 py-3 font-nunito text-[13px] font-bold uppercase whitespace-nowrap outline-none transition-colors"
                                style={{ color: isActive ? typeColor : "#888888" }}
                            >
                                {tab.label}
                                {isActive && (
                                    <motion.div
                                        layoutId="typePokemonTabIndicator"
                                        className="absolute bottom-0 left-0 w-full h-[3px]"
                                        style={{ backgroundColor: typeColor }}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </Tabs.Trigger>
                        )
                    })}
                </Tabs.List>

                <Tabs.Content value={activeTab} className="outline-none" forceMount>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                        {pokemon.map((p, i) => {
                            const idMatches = p.url.match(/\/pokemon\/(\d+)\//)
                            const id = idMatches ? idMatches[1] : ""
                            return (
                                <Link key={`${p.name}-${i}`} href={`/pokemon/${p.name}`}>
                                    <motion.div
                                        className="flex flex-col items-center justify-center p-2 bg-[#F8F8F8] border border-[#E0E0E0] cursor-pointer group transition-all"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true, margin: "-20px" }}
                                        transition={{ delay: (i % 24) * 0.02, type: "spring", bounce: 0.5 }}
                                        whileHover={{
                                            borderColor: typeColor,
                                            borderWidth: "2px",
                                            boxShadow: "2px 2px 0px #111111",
                                            y: -2
                                        }}
                                    >
                                        <div className="w-14 h-14 relative mb-2">
                                            <motion.img
                                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                                                alt={p.name}
                                                className="w-full h-full object-contain"
                                                style={{ imageRendering: "pixelated" }}
                                            />
                                        </div>
                                        <span className="font-nunito text-[10px] font-bold text-[#111111] capitalize text-center truncate w-full">
                                            {p.name.replace("-", " ")}
                                        </span>
                                        <span className="font-jetbrains text-[9px] text-[#888888]">
                                            #{id.padStart(4, "0")}
                                        </span>
                                    </motion.div>
                                </Link>
                            )
                        })}
                    </div>

                    <div className="mt-8 flex flex-col items-center justify-center gap-4">
                        {total > limit && (
                            <Pagination
                                currentPage={page}
                                totalItems={total}
                                itemsPerPage={limit}
                                onPageChange={(p) => {
                                    onPageChange(p);
                                    // Smooth scroll to top of this section or something similar
                                    // A very crude window.scroll could be jarring here since it's inside a complex page, but let's do a basic one
                                    window.scrollTo({ top: 300, behavior: "smooth" });
                                }}
                            />
                        )}

                        <Link href={`/pokemon?type=${typeName}`}>
                            <motion.div
                                className="flex items-center gap-2 font-nunito text-[13px] font-bold text-[#111111] group mt-4 hover:underline"
                            >
                                VER TODOS EN LA POKÉDEX
                                <motion.div variants={{ default: { x: 0 }, hover: { x: 4 } }} initial="default" whileHover="hover">
                                    <ArrowRight size={16} color={typeColor} />
                                </motion.div>
                            </motion.div>
                        </Link>

                        <div className="mt-6 w-full max-w-[400px] border border-[#E0E0E0] p-4 bg-[#FAFAFA] flex flex-col gap-2">
                            <div className="font-nunito text-[11px] text-[#444444] text-center">
                                El tipo <strong style={{ color: typeColor }} className="uppercase">{typeNameES}</strong> está presente en {total} Pokémon.
                            </div>
                            <div className="h-2 w-full bg-[#E0E0E0] overflow-hidden">
                                <motion.div
                                    className="h-full"
                                    style={{ backgroundColor: typeColor }}
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${Math.min(100, (total / 1025) * 100)}%` }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                />
                            </div>
                        </div>
                    </div>
                </Tabs.Content>
            </Tabs.Root>
        </section>
    )
}
