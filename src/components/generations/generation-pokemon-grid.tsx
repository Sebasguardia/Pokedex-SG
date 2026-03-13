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

// Extrae el ID numérico de la URL de pokemon-species
function extractId(url: string): number {
    return parseInt(url.match(/\/(\d+)\/?$/)?.[1] ?? "0");
}

function capitalize(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

export function GenerationPokemonGrid({ pokemonList, genColor, totalCount }: GenerationPokemonGridProps) {
    const [query, setQuery] = useState("");
    const [visible, setVisible] = useState(PAGE_SIZE);

    // Ordenar la lista por ID numérico
    const sortedList = useMemo(() => {
        return [...pokemonList].sort((a, b) => extractId(a.url) - extractId(b.url));
    }, [pokemonList]);

    // Fuse.js para búsqueda fuzzy
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
            {/* Section header */}
            <div className="flex items-center gap-4 mb-6">
                <h2 className="font-press-start text-[14px] uppercase tracking-tighter text-[#111111] whitespace-nowrap">
                    Pokémon Introducidos
                </h2>
                <div className="h-px bg-[#E0E0E0] flex-1" />
                <span
                    className="font-press-start text-[8px] px-3 py-1.5 border-2 border-[#111111] shrink-0"
                    style={{ color: genColor }}
                >
                    {totalCount} especies
                </span>
            </div>

            {/* Panel con etiqueta flotante */}
            <div className="relative border-2 border-[#111111] p-6 pt-7" style={{ boxShadow: `4px 4px 0 ${genColor}` }}>
                <div className="absolute top-[-14px] left-4 bg-[#111111] px-3 py-1">
                    <span className="font-nunito font-bold text-[11px] text-white uppercase">
                        {totalCount} NUEVOS POKÉMON
                    </span>
                </div>

                {/* Searchbar */}
                <div
                    className="flex items-center gap-2 border-2 border-[#111111] px-3 py-2 mb-5 focus-within:border-[#CC0000] transition-colors bg-white"
                >
                    <Search size={14} className="text-[#888888] shrink-0" />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => { setQuery(e.target.value); setVisible(PAGE_SIZE); }}
                        placeholder="Buscar Pokémon de esta generación..."
                        className="flex-1 font-nunito text-[13px] text-[#111111] placeholder:text-[#BBBBBB] outline-none bg-transparent"
                    />
                    {query && (
                        <button onClick={() => setQuery("")} className="text-[#888888] hover:text-[#111111]">
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
                            className="py-16 flex flex-col items-center gap-3 text-[#888888]"
                        >
                            <Search size={28} />
                            <p className="font-press-start text-[10px]">SIN RESULTADOS</p>
                            <p className="font-nunito text-[13px]">Intenta con otro nombre</p>
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
                                        initial={{ opacity: 0, scale: 0.85 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.2, delay: Math.min(i, 24) * 0.015 }}
                                    >
                                        <Link href={`/pokemon/${id}`}>
                                            <motion.div
                                                className="border-2 border-[#E0E0E0] bg-[#FAFAFA] p-1.5 flex flex-col items-center cursor-pointer"
                                                whileHover={{ y: -3, borderColor: "#111111", boxShadow: `3px 3px 0 ${genColor}` }}
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
                                                <p className="font-nunito font-bold text-[10.5px] text-[#111111] capitalize text-center leading-tight mt-0.5 truncate w-full text-center">
                                                     {capitalize(pokemon.name)}
                                                 </p>
                                                 <p className="font-press-start text-[9.5px] text-[#AAAAAA] mt-1 tracking-tighter">
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
                    <motion.div className="mt-6 flex justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <motion.button
                            onClick={() => setVisible((v) => v + PAGE_SIZE)}
                            className="flex items-center gap-2 border-2 border-[#111111] px-6 py-3 font-press-start text-[9px] bg-white hover:bg-[#111111] hover:text-white transition-colors"
                            style={{ boxShadow: `3px 3px 0 ${genColor}` }}
                            whileHover={{ x: 3, y: 3, boxShadow: "0px 0px 0 transparent" }}
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