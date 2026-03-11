"use client";

import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { apiClient } from "@/lib/api/client";
import { TYPE_COLORS } from "@/lib/constants/colors";
import { cn } from "@/lib/utils/cn";
import { useFilterStore } from "@/lib/store/filter.store";

const CLASSIC_IDS = [25, 1, 4, 7, 94, 143]; // Pikachu, Bulba, Charm, Squirtle, Gengar, Snorlax

function fetchPokemonDetails(id: number) {
    return apiClient.get(`/pokemon/${id}`).then(res => res.data);
}

function PokemonCard({ id, index }: { id: number, index: number }) {
    const { data: pokemon, isLoading } = useQuery({
        queryKey: ["pokemon", id],
        queryFn: () => fetchPokemonDetails(id),
        staleTime: Infinity
    });

    const typeName = pokemon?.types[0]?.type?.name || "normal";
    const typeColor = TYPE_COLORS[typeName as keyof typeof TYPE_COLORS] || TYPE_COLORS.normal;

    // Format ID to 3 digits
    const formattedId = `#${String(id).padStart(3, '0')}`;
    const name = pokemon?.name ? pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) : "???";

    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, x: 60 },
                visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 200, damping: 25 } },
                hover: { y: -10, boxShadow: "6px 6px 0 #CC0000" }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            whileHover="hover"
            className="shrink-0 w-[150px] md:w-[180px] bg-white border-2 border-gray-900 flex flex-col relative snap-start"
            style={{ boxShadow: "4px 4px 0 #111111" }}
            data-cursor="hover"
        >
            {/* Float animation wrapper */}
            <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
                className="flex flex-col h-full pointer-events-none"
            >
                <div className="p-3 flex items-center justify-between z-10">
                    <span className="font-mono text-[10px] text-gray-400">{formattedId}</span>
                    <div className="flex gap-1">
                        {pokemon?.types.map((t: any) => (
                            <div
                                key={t.type.name}
                                className="w-2.5 h-2.5 rounded-full"
                                style={{ backgroundColor: TYPE_COLORS[t.type.name as keyof typeof TYPE_COLORS] || TYPE_COLORS.normal }}
                                title={t.type.name}
                            />
                        ))}
                    </div>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center p-4 relative pt-0">
                    <div
                        className="absolute inset-0 opacity-5"
                        style={{ backgroundColor: typeColor }}
                    />
                    <div className="relative w-24 h-24 md:w-28 md:h-28 flex items-center justify-center z-10 filter drop-shadow-md">
                        {isLoading ? (
                            <motion.div
                                animate={{ opacity: [0.4, 0.8, 0.4] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                                className="w-16 h-16 bg-gray-200 rounded-md"
                            />
                        ) : (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full h-full relative" variants={{ hover: { scale: 1.12, transition: { type: "spring" } } }}>
                                <Image
                                    src={pokemon?.sprites?.other?.["official-artwork"]?.front_default || pokemon?.sprites?.front_default || "/placeholder.png"}
                                    alt={name}
                                    fill
                                    sizes="(max-width: 768px) 96px, 112px"
                                    priority={index < 3}
                                    className="object-contain"
                                />
                            </motion.div>
                        )}
                    </div>
                </div>

                <div className="p-3 text-center border-t border-gray-100 z-10 bg-white">
                    <span className="font-nunito font-bold text-[13px] text-gray-900">{name}</span>
                </div>

                {/* Bottom Color Bar */}
                <div className="h-[3px] w-full" style={{ backgroundColor: typeColor }} />
            </motion.div>
        </motion.div>
    );
}

export function FeaturedPokemon() {
    const { pokedexFilters } = useFilterStore();
    const pokedexHref = pokedexFilters ? `/pokemon?${pokedexFilters}` : "/pokemon";

    const containerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        if (containerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener("resize", checkScroll);
        return () => window.removeEventListener("resize", checkScroll);
    }, []);

    const scrollBy = (offset: number) => {
        containerRef.current?.scrollBy({ left: offset, behavior: "smooth" });
    };

    return (
        <section className="bg-[#F8F8F8] py-20 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
                    <div className="flex items-center gap-4">
                        <motion.div
                            initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true, margin: "-80px" }}
                            className="w-1 h-8 bg-poke-red origin-bottom"
                        />
                        <div>
                            <h2 className="font-pixel text-[14px] md:text-[16px] text-gray-900 uppercase">POKÉMON POPULARES</h2>
                            <p className="font-nunito text-[14px] text-gray-500 mt-2">Algunos de los favoritos de todos</p>
                        </div>
                    </div>

                    <motion.div
                        animate={{ rotate: [-1, 1, -1] }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        className="bg-poke-red text-white font-pixel text-[8px] px-3 py-1.5 border-2 border-gray-900 whitespace-nowrap"
                        title="Se actualizan aleatoriamente en el futuro"
                        data-cursor="hover"
                    >
                        RANDOM
                    </motion.div>
                </div>
            </div>

            {/* Carousel */}
            <div className="relative group/carousel max-w-[1400px] mx-auto">
                <motion.div
                    ref={containerRef}
                    className="flex gap-5 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 pt-2 px-4 md:px-[max(1rem,calc((100vw-80rem)/2))]"
                    onScroll={checkScroll}
                    drag="x"
                    dragConstraints={containerRef}
                    dragElastic={0.1}
                    whileDrag={{ cursor: "grabbing" }}
                    style={{ cursor: "grab" }}
                >
                    {/* Apply stagger manually via index prop directly or let Framer handle if wrapped */}
                    {CLASSIC_IDS.map((id, index) => (
                        <PokemonCard key={id} id={id} index={index} />
                    ))}
                </motion.div>

                {/* Desktop Navigation Arrows */}
                <div className="hidden md:block absolute top-[40%] -translate-y-1/2 left-4 z-20">
                    <motion.button
                        onClick={() => scrollBy(-300)}
                        disabled={!canScrollLeft}
                        className={cn("w-12 h-12 bg-white border-2 border-gray-900 flex items-center justify-center transition-colors", !canScrollLeft ? "opacity-30 pointer-events-none" : "hover:bg-gray-900 hover:text-white")}
                        style={{ boxShadow: "3px 3px 0 #111111" }}
                        whileTap={{ scale: 0.95 }}
                        data-cursor="hover"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </motion.button>
                </div>
                <div className="hidden md:block absolute top-[40%] -translate-y-1/2 right-4 z-20">
                    <motion.button
                        onClick={() => scrollBy(300)}
                        disabled={!canScrollRight}
                        className={cn("w-12 h-12 bg-white border-2 border-gray-900 flex items-center justify-center transition-colors", !canScrollRight ? "opacity-30 pointer-events-none" : "hover:bg-gray-900 hover:text-white")}
                        style={{ boxShadow: "3px 3px 0 #111111" }}
                        whileTap={{ scale: 0.95 }}
                        data-cursor="hover"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </motion.button>
                </div>
            </div>

            <div className="flex justify-center mt-6">
                <Link href={pokedexHref}>
                    <motion.button
                        whileHover="hover"
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center justify-center bg-transparent text-gray-900 font-nunito font-bold text-sm px-6 py-3 border-2 border-gray-900"
                        style={{ boxShadow: "4px 4px 0 #888888" }}
                        variants={{ hover: { x: 4, y: 4, boxShadow: "0px 0px 0 #888888" } }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        data-cursor="hover"
                    >
                        Ver los 1025 Pokémon <motion.span variants={{ hover: { x: 8 } }} className="ml-2 block"><ArrowRight className="w-4 h-4" /></motion.span>
                    </motion.button>
                </Link>
            </div>

            <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
        </section>
    );
}
