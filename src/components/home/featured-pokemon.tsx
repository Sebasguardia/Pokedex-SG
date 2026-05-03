"use client";

import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { apiClient } from "@/lib/api/client";
import { TYPE_COLORS } from "@/lib/constants/ui/colors";
import { cn } from "@/lib/utils/cn";
import { useFilterStore } from "@/lib/store/filter.store";

const CLASSIC_IDS = [25, 1, 4, 7, 94, 143, 149, 150, 248, 448];

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
    const formattedId = String(id).padStart(3, '0');
    const name = pokemon?.name ? pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) : "???";
    
    // Showdown Animated Sprite
    const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${id}.gif`;

    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 25 } },
                hover: { y: -12, boxShadow: `10px 10px 0 ${typeColor}` }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            whileHover="hover"
            className="shrink-0 w-[220px] md:w-[260px] bg-white border-[4px] border-[#111111] flex flex-col relative snap-start group"
            style={{ boxShadow: "6px 6px 0 #111111" }}
        >
            <Link href={`/pokemon/${id}`} className="flex flex-col h-full">
                {/* Header info */}
                <div className="p-4 flex items-center justify-between border-b-[3px] border-[#111111] bg-[#F8F8F8]">
                    <div className="flex flex-col">
                        <span className="font-['Press_Start_2P'] text-[7px] text-[#888888] leading-none mb-2">NO.</span>
                        <span className="font-['Press_Start_2P'] text-[11px] md:text-[13px] text-[#111111] leading-none">{formattedId}</span>
                    </div>
                    <div className="flex gap-2">
                        {pokemon?.types.map((t: any) => (
                            <div
                                key={t.type.name}
                                data-type={t.type.name}
                                className="w-6 h-6 border-2 border-[#111111] shadow-[2px_2px_0_#111111] flex items-center justify-center p-0.5 bg-[var(--type-color)]"
                                title={t.type.name}
                            >
                                <img 
                                    src={`/icons/${t.type.name}.svg`} 
                                    alt={t.type.name}
                                    className="w-full h-full object-contain brightness-[100] drop-shadow-[1px_1px_0_rgba(0,0,0,0.5)]"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sprite Container */}
                <div 
                    className="flex-1 flex flex-col items-center justify-center p-8 relative overflow-hidden bg-white min-h-[180px] md:min-h-[220px]"
                    style={{ "--type-color": typeColor } as any}
                >
                    {/* Decorative Background */}
                    <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-type-grid" />
                    
                    <div className="absolute top-2 right-4 opacity-10 pointer-events-none uppercase font-black text-[50px] leading-none tracking-tighter text-[var(--type-color)]">
                        {typeName.slice(0, 3)}
                    </div>
                    
                    <div className="relative w-full h-full flex items-center justify-center z-10">
                        {isLoading ? (
                            <div className="w-16 h-16 bg-[#F2F2F2] border-4 border-dashed border-[#E0E0E0] animate-pulse" />
                        ) : (
                            <motion.div 
                                className="relative flex items-center justify-center"
                                animate={{ y: [0, -6, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: (index % 10) * 0.2 }}
                            >
                                <img
                                    src={spriteUrl}
                                    alt={name}
                                    className="scale-[2] md:scale-[2.5] object-contain pixelated pointer-events-none group-hover:scale-[2.8] md:group-hover:scale-[3.2] transition-transform duration-500 origin-center"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = pokemon?.sprites?.other?.["official-artwork"]?.front_default || "";
                                        (e.target as HTMLImageElement).className = "w-32 h-32 object-contain group-hover:scale-110 transition-transform duration-500";
                                    }}
                                />
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 text-center border-t-[3px] border-[#111111] z-10 bg-white">
                    <span className="font-['Press_Start_2P'] text-[11px] md:text-[12px] text-[#111111] uppercase block mb-2 truncate font-bold tracking-tight">{name}</span>
                    <div className="flex items-center gap-2">
                         <div className="h-[6px] flex-1 bg-[#EEEEEE] border border-[#111111] overflow-hidden">
                            <motion.div 
                                initial={{ width: 0 }}
                                whileInView={{ width: "100%" }}
                                className="h-full" 
                                style={{ backgroundColor: typeColor }} 
                            />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

export function FeaturedPokemon() {
    const { pokedexFilters } = useFilterStore();
    const [featuredIds, setFeaturedIds] = useState(CLASSIC_IDS);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const pokedexHref = pokedexFilters ? `/pokemon?${pokedexFilters}` : "/pokemon";

    const containerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(true);
    const [canScrollRight, setCanScrollRight] = useState(true);

    // Triple the items to create a seamless loop
    const loopedIds = [...featuredIds, ...featuredIds, ...featuredIds];

    const randomizePokemon = () => {
        setIsRefreshing(true);
        const newIds: number[] = [];
        while (newIds.length < 10) {
            const rand = Math.floor(Math.random() * 800) + 1;
            if (!newIds.includes(rand)) newIds.push(rand);
        }
        
        setTimeout(() => {
            setFeaturedIds(newIds);
            setIsRefreshing(false);
            // After changing IDs, reset scroll to middle
            if (containerRef.current) {
                const { scrollWidth } = containerRef.current;
                containerRef.current.scrollLeft = scrollWidth / 3;
            }
        }, 500);
    };

    const handleInfiniteScroll = () => {
        if (!containerRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
        const segmentWidth = scrollWidth / 3;
        
        // Use a small buffer to trigger the jump before hitting the absolute edge
        const threshold = 10; 

        if (scrollLeft < threshold) {
            // Jump from start of first segment to start of second segment
            containerRef.current.scrollTo({
                left: segmentWidth + scrollLeft,
                behavior: 'instant' as any
            });
        } else if (scrollLeft + clientWidth > (segmentWidth * 2) + (segmentWidth - threshold)) {
            // Jump from end of third segment back to end of second segment
            containerRef.current.scrollTo({
                left: scrollLeft - segmentWidth,
                behavior: 'instant' as any
            });
        }
    };

    useEffect(() => {
        // Initial scroll to the start of the middle segment
        if (containerRef.current) {
            const { scrollWidth } = containerRef.current;
            containerRef.current.scrollTo({
                left: scrollWidth / 3,
                behavior: 'instant' as any
            });
        }
        
        window.addEventListener("resize", handleInfiniteScroll);
        return () => window.removeEventListener("resize", handleInfiniteScroll);
    }, [featuredIds]);

    const scrollBy = (offset: number) => {
        containerRef.current?.scrollBy({ left: offset, behavior: "smooth" });
    };

    return (
        <section className="bg-white py-28 overflow-hidden relative border-y-4 border-[#111111]">
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-section-grid" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-20 gap-8">
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <div className="w-3 h-12 bg-[#CC0000] border-2 border-[#111111]" />
                            <div className="w-3 h-5 bg-[#111111] border-2 border-[#111111] mt-1" />
                            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#111111]" />
                        </div>
                        <div>
                            <h2 className="font-['Press_Start_2P'] text-[16px] md:text-[24px] text-[#111111] uppercase leading-none tracking-tight mb-4">
                                POKÉMON <span className="text-[#CC0000]">Destacados</span>
                            </h2>
                            <div className="flex items-center gap-4">
                                <span className="w-12 h-[3px] bg-[#CC0000]" />
                                <p className="font-['Press_Start_2P'] text-[8px] md:text-[10px] text-[#111111] uppercase tracking-wider">Inspiración Infinita</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <motion.button
                            onClick={randomizePokemon}
                            disabled={isRefreshing}
                            className="flex items-center gap-3 bg-[#CC0000] text-white font-['Press_Start_2P'] text-[10px] px-6 py-4 border-[3px] border-[#111111] transition-all group relative"
                            style={{ boxShadow: "5px 5px 0 #111111" }}
                            whileTap={{ scale: 0.95, boxShadow: "0px 0px 0 #111111", x: 3, y: 3 }}
                        >
                            <RotateCcw size={18} className={cn("transition-transform duration-700", isRefreshing ? "animate-spin" : "group-hover:rotate-180")} />
                            <span className="hidden sm:inline">RANDOMIZAR</span>
                        </motion.button>

                        <div className="flex border-[3px] border-[#111111] bg-white overflow-hidden shadow-[5px_5px_0_#111111]">
                            <button
                                onClick={() => scrollBy(-520)}
                                aria-label="Anterior"
                                className="p-3 transition-colors border-r-[3px] border-[#111111] hover:bg-[#111111] hover:text-white"
                            >
                                <ChevronLeft size={24} strokeWidth={3} />
                            </button>
                            <button
                                onClick={() => scrollBy(520)}
                                aria-label="Siguiente"
                                className="p-3 transition-colors hover:bg-[#111111] hover:text-white"
                            >
                                <ChevronRight size={24} strokeWidth={3} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative max-w-[1440px] mx-auto z-10">
                <motion.div
                    ref={containerRef}
                    className="flex gap-10 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-16 pt-4 px-6 md:px-[max(1.5rem,calc((100vw-80rem)/2))]"
                    onScroll={handleInfiniteScroll}
                >
                    {loopedIds.map((id, index) => (
                        <PokemonCard key={`${id}-${index}`} id={id} index={index} />
                    ))}
                </motion.div>
            </div>

            <div className="flex justify-center mt-12">
                <Link href={pokedexHref}>
                    <motion.div
                        whileHover="hover"
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center justify-center bg-white text-[#111111] font-['Press_Start_2P'] text-[12px] px-12 py-6 border-[4px] border-[#111111] cursor-pointer group"
                        style={{ boxShadow: "10px 10px 0 #CC0000" }}
                        variants={{ hover: { x: 5, y: 5, boxShadow: "0px 0px 0 #CC0000" } }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                        EXPLORAR TODA LA POKÉDEX
                        <motion.span variants={{ hover: { x: 12 } }} className="ml-5 block">
                            <ArrowRight size={24} strokeWidth={3} />
                        </motion.span>
                    </motion.div>
                </Link>
            </div>

            <style jsx global>{`
                .hide-scrollbar::-webkit-scrollbar { display: none; }
                .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                .pixelated { image-rendering: pixelated; }
                .bg-type-grid {
                    background-image: radial-gradient(var(--type-color) 2px, transparent 0);
                    background-size: 16px 16px;
                }
                .bg-section-grid {
                    background-image: linear-gradient(#111111 1px, transparent 1px), linear-gradient(90deg, #111111 1px, transparent 1px);
                    background-size: 40px 40px;
                }
            `}</style>
        </section>
    );
}
