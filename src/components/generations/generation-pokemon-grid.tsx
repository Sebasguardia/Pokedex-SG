"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Search, X, ChevronDown } from "lucide-react";
import Fuse from "fuse.js";
import { NamedAPIResource } from "@/types/api/common.types";

interface GenerationPokemonGridProps {
    pokemonList: NamedAPIResource[];
    genColor: string;
    totalCount: number;
}

const PAGE_SIZE = 48;

function extractId(url: string): number {
    return parseInt(url.match(/\/(\d+)\/?$/)?.[1] ?? "0");
}

function capitalize(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

export function GenerationPokemonGrid({ pokemonList, genColor, totalCount }: GenerationPokemonGridProps) {
    const [query, setQuery] = useState("");
    const [visible, setVisible] = useState(PAGE_SIZE);

    const sortedList = useMemo(() => {
        return [...pokemonList].sort((a, b) => extractId(a.url) - extractId(b.url));
    }, [pokemonList]);

    const fuse = useMemo(
        () => new Fuse(sortedList, { keys: ["name"], threshold: 0.3 }),
        [sortedList]
    );

    const filtered = useMemo(() => {
        if (!query.trim()) return sortedList;
        return fuse.search(query).map((r) => r.item);
    }, [query, fuse, sortedList]);

    const shown = filtered.slice(0, visible);

    return (
        <section>
            {/* Section header con cuadradito rojo */}
            <div className="flex items-center gap-3 mb-7">
                <span className="w-3 h-3 bg-[#CC0000] shrink-0" />
                <h2 className="font-['Press_Start_2P'] text-[13px] uppercase tracking-tighter text-[#111111] whitespace-nowrap">
                    Pokémon Introducidos
                </h2>
                <div className="h-[3px] bg-[#111111] flex-1" />
                <span
                    className="font-['Press_Start_2P'] text-[8px] px-3 py-2 border-[3px] border-[#111111] shrink-0"
                    style={{ color: genColor, boxShadow: `3px 3px 0 ${genColor}` }}
                >
                    {totalCount} especies
                </span>
            </div>

            {/* Panel principal brutalista */}
            <div
                className="relative border-4 border-[#111111] p-6 pt-9 bg-white"
                style={{ boxShadow: `8px 8px 0 ${genColor}` }}
            >
                {/* Etiqueta flotante */}
                <div className="absolute top-[-16px] left-5 bg-[#111111] px-4 py-1.5">
                    <span className="font-['Press_Start_2P'] text-[8px] text-white uppercase tracking-widest whitespace-nowrap">
                        {totalCount} NUEVOS POKÉMON
                    </span>
                </div>

                {/* Searchbar */}
                <div
                    className="flex items-center gap-2 border-[3px] border-[#111111] px-4 py-2.5 mb-6 bg-white focus-within:border-[#CC0000] transition-colors"
                    style={{ boxShadow: "3px 3px 0 #111111" }}
                >
                    <Search size={15} className="text-[#888888] shrink-0" />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => { setQuery(e.target.value); setVisible(PAGE_SIZE); }}
                        placeholder="Buscar Pokémon de esta generación..."
                        className="flex-1 font-['Nunito'] font-bold text-[13px] text-[#111111] placeholder:text-[#BBBBBB] outline-none bg-transparent"
                        aria-label="Buscar Pokémon"
                    />
                    {query && (
                        <button
                            title="Limpiar búsqueda"
                            aria-label="Limpiar búsqueda"
                            onClick={() => setQuery("")}
                            className="text-[#888888] hover:text-[#111111] transition-colors"
                        >
                            <X size={14} />
                        </button>
                    )}
                </div>

                {/* Grid */}
                <AnimatePresence mode="wait">
                    {shown.length === 0 ? (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="py-16 flex flex-col items-center gap-4 text-[#888888]"
                        >
                            <div
                                className="w-16 h-16 border-4 border-[#E0E0E0] flex items-center justify-center"
                                style={{ boxShadow: "4px 4px 0 #E0E0E0" }}
                            >
                                <Search size={28} />
                            </div>
                            <p className="font-['Press_Start_2P'] text-[10px]">SIN RESULTADOS</p>
                            <p className="font-['Nunito'] font-bold text-[13px]">Intenta con otro nombre</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="grid"
                            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2"
                        >
                            {shown.map((pokemon, i) => {
                                const id = extractId(pokemon.url);
                                const src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

                                return (
                                    <motion.div
                                        key={pokemon.name}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.18, delay: Math.min(i, 24) * 0.012 }}
                                    >
                                        <Link href={`/pokemon/${id}`}>
                                            <motion.div
                                                className="border-[2px] border-[#E0E0E0] bg-[#FAFAFA] p-2 flex flex-col items-center cursor-pointer"
                                                whileHover={{
                                                    y: -4,
                                                    borderColor: "#111111",
                                                    boxShadow: `4px 4px 0 ${genColor}`,
                                                    backgroundColor: "#ffffff",
                                                }}
                                                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                            >
                                                <Image
                                                    src={src}
                                                    alt={pokemon.name}
                                                    width={52}
                                                    height={52}
                                                    className="object-contain"
                                                    loading="lazy"
                                                />
                                                <p className="font-['Nunito'] font-black text-[10px] text-[#111111] capitalize text-center leading-tight mt-1 truncate w-full">
                                                    {capitalize(pokemon.name)}
                                                </p>
                                                <p className="font-['JetBrains_Mono'] font-bold text-[9px] text-[#AAAAAA] mt-0.5 tracking-tight">
                                                    #{String(id).padStart(4, "0")}
                                                </p>
                                            </motion.div>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Load more */}
                {!query && visible < filtered.length && (
                    <motion.div className="mt-7 flex justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <motion.button
                            onClick={() => setVisible((v) => v + PAGE_SIZE)}
                            className="flex items-center gap-2 border-4 border-[#111111] px-7 py-3 font-['Press_Start_2P'] text-[9px] bg-white hover:bg-[#111111] hover:text-white transition-colors"
                            style={{ boxShadow: `4px 4px 0 ${genColor}` }}
                            whileHover={{ x: 4, y: 4, boxShadow: "0px 0px 0 transparent" }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <ChevronDown size={14} />
                            CARGAR MÁS ({filtered.length - visible} restantes)
                        </motion.button>
                    </motion.div>
                )}
            </div>
        </section>
    );
}