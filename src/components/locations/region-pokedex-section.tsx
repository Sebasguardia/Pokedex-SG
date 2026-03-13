"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Search, X, LayoutGrid, List, ChevronDown } from "lucide-react";
import Fuse from "fuse.js";
import { useRegionalPokedex } from "@/lib/hooks/useLocations";
import { RegionalPokedexEntry } from "@/types/api/location.types";

interface RegionPokedexSectionProps {
    pokedexName: string;
    regionColor: string;
    regionNameEs: string;
}

const PAGE_SIZE = 48;

function extractNationalId(url: string): number {
    return parseInt(url.match(/\/(\d+)\/?$/)?.[1] ?? "0");
}

function capitalize(s: string) {
    return s.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

export function RegionPokedexSection({ pokedexName, regionColor, regionNameEs }: RegionPokedexSectionProps) {
    const { data: pokedex, isLoading } = useRegionalPokedex(pokedexName, true);

    const [query, setQuery] = useState("");
    const [view, setView] = useState<"grid" | "list">("grid");
    const [visible, setVisible] = useState(PAGE_SIZE);

    const fuse = useMemo(
        () => new Fuse(pokedex?.pokemon_entries ?? [], {
            keys: ["pokemon_species.name"], threshold: 0.3,
        }),
        [pokedex]
    );

    const filtered = useMemo(() => {
        if (!pokedex) return [];
        const sorted = [...pokedex.pokemon_entries].sort((a, b) => a.entry_number - b.entry_number);
        if (!query.trim()) return sorted;
        return fuse.search(query).map((r) => r.item);
    }, [query, fuse, pokedex]);

    const shown = filtered.slice(0, visible);

    return (
        <section>
            {/* Section header */}
            <div className="flex items-center gap-4 mb-6">
                <h2 className="font-press-start text-[15px] uppercase tracking-tighter text-[#111111] whitespace-nowrap">
                    Pokédex Regional
                </h2>
                <div className="h-px bg-[#E0E0E0] flex-1" />
                {pokedex && (
                    <span
                        className="font-press-start text-[9px] px-3 py-1.5 border-2 border-[#111111] shrink-0"
                        style={{ color: regionColor }}
                    >
                        {pokedex.pokemon_entries.length} Pokémon
                    </span>
                )}
            </div>

            {/* Panel */}
            <div
                className="relative border-2 border-[#111111]"
                style={{ boxShadow: `4px 4px 0 ${regionColor}` }}
            >
                {/* Etiqueta flotante */}
                <div
                    className="absolute top-[-14px] left-4 px-3 py-1 z-10"
                    style={{ backgroundColor: regionColor }}
                >
                    <span className="font-nunito font-bold text-[12px] text-white uppercase">
                        {regionNameEs.toUpperCase()} DEX
                    </span>
                </div>

                <div className="p-5 pt-7">
                    {isLoading ? (
                        /* Skeleton */
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                            {Array.from({ length: 24 }).map((_, i) => (
                                <div key={i} className="h-[90px] border-2 border-[#E0E0E0] bg-[#F8F8F8] animate-pulse" />
                            ))}
                        </div>
                    ) : !pokedex ? (
                        <div className="py-10 text-center">
                            <p className="font-nunito text-[13px] text-[#888888] italic">
                                Pokédex regional no disponible para esta región.
                            </p>
                        </div>
                    ) : (
                        <>
                            {/* Controles: búsqueda + toggle de vista */}
                            <div className="flex gap-3 mb-4 flex-wrap">
                                <div className="flex-1 flex items-center gap-2 border-2 border-[#111111] px-3 py-2 bg-white focus-within:border-[#CC0000] transition-colors min-w-[200px]">
                                    <Search size={14} className="text-[#888888] shrink-0" />
                                    <input
                                        type="text"
                                        value={query}
                                        onChange={(e) => { setQuery(e.target.value); setVisible(PAGE_SIZE); }}
                                        placeholder="Buscar Pokémon..."
                                        className="flex-1 font-nunito text-[14px] text-[#111111] placeholder:text-[#BBBBBB] outline-none bg-transparent"
                                    />
                                    {query && (
                                        <button onClick={() => setQuery("")} className="text-[#888888] hover:text-[#111111]">
                                            <X size={14} />
                                        </button>
                                    )}
                                </div>

                                {/* Toggle vista */}
                                <div className="flex border-2 border-[#111111] overflow-hidden">
                                    {([["grid", LayoutGrid], ["list", List]] as const).map(([v, Icon]) => (
                                        <button
                                            key={v}
                                            onClick={() => setView(v)}
                                            className="px-3 py-2 flex items-center transition-colors"
                                            style={
                                                view === v
                                                    ? { backgroundColor: "#111111", color: "#ffffff" }
                                                    : { backgroundColor: "#ffffff", color: "#888888" }
                                            }
                                        >
                                            <Icon size={14} />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Empty state */}
                            {shown.length === 0 ? (
                                <div className="py-12 flex flex-col items-center gap-2 text-[#888888]">
                                    <Search size={24} />
                                    <p className="font-press-start text-[9px]">SIN RESULTADOS</p>
                                </div>
                            ) : view === "grid" ? (
                                /* ── GRID ── */
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key="grid"
                                        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2"
                                    >
                                        {shown.map((entry, i) => {
                                            const nationalId = extractNationalId(entry.pokemon_species.url);
                                            const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${nationalId}.png`;
                                            return (
                                                <motion.div
                                                    key={entry.pokemon_species.name}
                                                    initial={{ opacity: 0, scale: 0.85 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ duration: 0.18, delay: Math.min(i, 24) * 0.012 }}
                                                >
                                                    <Link href={`/pokemon/${nationalId}`}>
                                                        <motion.div
                                                            className="border-2 border-[#E0E0E0] bg-[#FAFAFA] p-1.5 flex flex-col items-center cursor-pointer"
                                                            whileHover={{ y: -3, borderColor: "#111111", boxShadow: `3px 3px 0 ${regionColor}` }}
                                                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                                        >
                                                            {/* Número regional */}
                                                            <span
                                                                className="font-jetbrains text-[7px] self-start"
                                                                style={{ color: regionColor }}
                                                            >
                                                                #{String(entry.entry_number).padStart(3, "0")}
                                                            </span>
                                                            <Image
                                                                src={sprite} alt={entry.pokemon_species.name}
                                                                width={48} height={48} className="object-contain" loading="lazy"
                                                            />
                                                            <p className="font-nunito font-bold text-[9px] text-[#111111] capitalize text-center truncate w-full mt-0.5">
                                                                {capitalize(entry.pokemon_species.name)}
                                                            </p>
                                                            {/* Número nacional */}
                                                            <span className="font-jetbrains text-[7px] text-[#AAAAAA]">
                                                                #{String(nationalId).padStart(4, "0")}
                                                            </span>
                                                        </motion.div>
                                                    </Link>
                                                </motion.div>
                                            );
                                        })}
                                    </motion.div>
                                </AnimatePresence>
                            ) : (
                                /* ── LISTA ── */
                                <div className="border-2 border-[#E0E0E0] overflow-hidden">
                                    {/* Header de tabla */}
                                    <div className="grid grid-cols-[48px_40px_1fr_80px] items-center gap-2 px-3 py-2 bg-[#111111]">
                                        <span className="font-press-start text-[7px] text-white">DEX</span>
                                        <span />
                                        <span className="font-press-start text-[7px] text-white">NOMBRE</span>
                                        <span className="font-press-start text-[7px] text-white text-right">NAC.</span>
                                    </div>
                                    {shown.map((entry, i) => {
                                        const nationalId = extractNationalId(entry.pokemon_species.url);
                                        const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${nationalId}.png`;
                                        return (
                                            <Link key={entry.pokemon_species.name} href={`/pokemon/${nationalId}`}>
                                                <motion.div
                                                    className="grid grid-cols-[48px_40px_1fr_80px] items-center gap-2 px-3 py-2 border-b border-[#F0F0F0] last:border-b-0 transition-colors"
                                                    style={{ backgroundColor: i % 2 === 0 ? "#ffffff" : "#FAFAFA" }}
                                                    whileHover={{ backgroundColor: `${regionColor}0A` }}
                                                >
                                                    <span className="font-jetbrains text-[9px]" style={{ color: regionColor }}>
                                                        #{String(entry.entry_number).padStart(3, "0")}
                                                    </span>
                                                    <Image src={sprite} alt={entry.pokemon_species.name} width={32} height={32} className="object-contain" loading="lazy" />
                                                    <span className="font-nunito font-bold text-[12px] text-[#111111] capitalize truncate">
                                                        {capitalize(entry.pokemon_species.name)}
                                                    </span>
                                                    <span className="font-jetbrains text-[9px] text-[#AAAAAA] text-right">
                                                        #{String(nationalId).padStart(4, "0")}
                                                    </span>
                                                </motion.div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            )}

                            {/* Load more */}
                            {!query && visible < filtered.length && (
                                <div className="mt-5 flex justify-center">
                                    <motion.button
                                        onClick={() => setVisible((v) => v + PAGE_SIZE)}
                                        className="flex items-center gap-2 border-2 border-[#111111] px-6 py-3 font-press-start text-[9px] bg-white hover:bg-[#111111] hover:text-white transition-colors"
                                        style={{ boxShadow: `3px 3px 0 ${regionColor}` }}
                                        whileHover={{ x: 3, y: 3, boxShadow: "0px 0px 0 transparent" }}
                                    >
                                        <ChevronDown size={13} />
                                        CARGAR MÁS ({filtered.length - visible} restantes)
                                    </motion.button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}