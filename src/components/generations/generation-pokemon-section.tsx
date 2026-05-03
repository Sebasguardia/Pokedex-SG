"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Book, Star, Crown, ChevronRight } from "lucide-react";
import { TypeBadge } from "@/components/pokemon/type-badge";
import { GENERATION_LEGENDARIES_LORE } from "@/lib/constants/generations/generations.constants";

interface GenerationPokemonSectionProps {
    generationName: string;
    genColor: string;
    starters: number[];
    legendaries: number[];
    totalCount: number;
}

// ── Helpers ── //
const getShowdownGif = (id: number) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${id}.gif`;
const getStaticSprite = (id: number) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

// ── Carta Detallada para Legendarios con Lore ── //
function LegendaryCard({ id, genColor }: { id: number, genColor: string }) {
    const [data, setData] = useState<any>(null);
    const loreMeta = GENERATION_LEGENDARIES_LORE[id];

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(res => res.json())
            .then(json => setData(json))
            .catch(console.error);
    }, [id]);

    const isSingular = loreMeta?.category === "Singular";

    return (
        <div
            className="border-[4px] border-[#111111] bg-white flex flex-col group relative overflow-hidden"
            style={{ boxShadow: "6px 6px 0 #111111", transition: "box-shadow 0.2s, border-color 0.2s" }}
            onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = `8px 10px 0 ${genColor}`;
                (e.currentTarget as HTMLDivElement).style.borderColor = genColor;
            }}
            onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = "6px 6px 0 #111111";
                (e.currentTarget as HTMLDivElement).style.borderColor = "#111111";
            }}
        >
            {/* Badge de categoría */}
            <div 
                className="absolute top-3 left-3 z-30 px-2 py-1 border-[2px] border-[#111111] text-white font-['Press_Start_2P'] text-[8px] shadow-[2px_2px_0_#111]"
                style={{ backgroundColor: isSingular ? "#7C3AED" : genColor }}
            >
                {isSingular ? "SINGULAR" : "LEGENDARIO"}
            </div>

            {/* Número */}
            <div className="absolute top-3 right-3 z-30 font-['JetBrains_Mono'] text-[11px] font-bold text-[#999] bg-white/80 px-1">
                #{String(id).padStart(3, "0")}
            </div>

            {/* ── Zona visual del sprite (con overlay de lore al hover) ── */}
            <div
                className="relative flex-shrink-0 h-48 flex items-center justify-center overflow-hidden border-b-[4px] border-[#111]"
                style={{ background: `linear-gradient(135deg, ${genColor}18, ${genColor}05)` }}
            >
                {/* Fondo de puntos */}
                <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(#111 1.5px, transparent 1.5px)", backgroundSize: "12px 12px" }} />

                {/* Sombra suelo */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-2/3 h-4 bg-[#111111]/15 rounded-[100%] blur-[6px]" />

                {/* GIF animado */}
                <Link href={`/pokemon/${id}`} className="relative w-28 h-28 sm:w-36 sm:h-36 z-10 transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-2 pointer-events-auto">
                    <Image
                        src={getShowdownGif(id)}
                        alt={data?.name || `Pokemon ${id}`}
                        fill
                        className="object-contain drop-shadow-[6px_6px_0_rgba(0,0,0,0.12)]"
                        unoptimized
                        onError={(e) => { e.currentTarget.src = getStaticSprite(id); }}
                    />
                </Link>

                {/* ── OVERLAY DE LORE (aparece al hover sobre la imagen) ── */}
                {loreMeta && (
                    <div
                        className="absolute inset-0 z-20 flex items-end justify-start p-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                        style={{ background: `linear-gradient(to top, ${genColor}F0 0%, ${genColor}CC 50%, transparent 100%)` }}
                    >
                        <p className="font-['Nunito'] font-black text-[12px] sm:text-[13px] text-white leading-snug line-clamp-5 drop-shadow-[1px_1px_2px_rgba(0,0,0,0.5)]">
                            {loreMeta.lore}
                        </p>
                    </div>
                )}
            </div>

            {/* ── Panel inferior FIJO – nunca cambia de tamaño ── */}
            <div className="flex flex-col p-4 h-[100px] flex-shrink-0">
                {/* Nombre */}
                <Link href={`/pokemon/${id}`}>
                    <h4 className="font-['Press_Start_2P'] text-[11px] sm:text-[13px] text-[#111111] capitalize mb-1 truncate group-hover:underline underline-offset-4 decoration-2" style={{ textDecorationColor: genColor }}>
                        {data ? data.name : "..."}
                    </h4>
                </Link>

                {/* Título lore */}
                {loreMeta && (
                    <p className="font-['JetBrains_Mono'] text-[9px] font-bold mb-2 truncate" style={{ color: genColor }}>
                        {loreMeta.title}
                    </p>
                )}

                {/* Tipos */}
                <div className="flex gap-1.5 flex-wrap mt-auto">
                    {data?.types.map((t: any) => (
                        <TypeBadge key={t.type.name} type={t.type.name} size="md" />
                    )) ?? <div className="w-16 h-5 bg-[#E0E0E0] animate-pulse" />}
                </div>
            </div>
        </div>
    );
}



// ── Componente Interactivo de Iniciales Horizontal (Paisaje 3D) ── //
function StartersInteractiveShowcase({ starters, genColor }: { starters: number[], genColor: string }) {
    const [selectedId, setSelectedId] = useState<number>(starters[0]);
    const [starterData, setStarterData] = useState<any>(null);

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${selectedId}`)
            .then(res => res.json())
            .then(json => setStarterData(json))
            .catch(console.error);
    }, [selectedId]);

    const evolutionaryLine = [selectedId, selectedId + 1, selectedId + 2];

    return (
        <div className="border-[4px] border-[#111111] bg-white flex flex-col shadow-[8px_8px_0_#111111] overflow-hidden group perspective-[1000px]">
            
            {/* ESCENARIO / PAISAJE (Horizonte Interactivo 3D) */}
            <div className="relative h-72 sm:h-96 w-full overflow-hidden border-b-[4px] border-[#111111] bg-sky-200 flex flex-col justify-end items-center pb-12 sm:pb-16" style={{
                backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")'
            }}>
                
                {/* Elementos del paisaje brutalista */}
                <div className="absolute top-4 pl-4 z-20 w-full text-center">
                    <span className="font-['Press_Start_2P'] text-[10px] text-[#111] bg-white border-2 border-[#111] px-3 py-1 shadow-[2px_2px_0_#111]">
                        ELIGE TU COMPAÑERO
                    </span>
                </div>

                <div className="absolute bottom-0 w-full h-[45%] bg-[#A8D08D] border-t-[4px] border-[#111111] shadow-[inset_0_20px_20px_rgba(0,0,0,0.05)]" />
                <div className="absolute bottom-[45%] w-full h-[4px] bg-[#111111] z-0" />

                {/* Contenedor de los 3 Pokémons - Centrado absoluto para evitar que se amontonen */}
                <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 flex items-end justify-center w-full max-w-4xl h-32 sm:h-48 z-10">
                    {starters.map((id) => {
                        const isSelected = selectedId === id;
                        
                        // Lógica de separación estricta: 
                        // El seleccionado = Centro (0)
                        // De los otros dos, el de ID menor = Izquierda (-200), el de ID mayor = Derecha (+200)
                        const unselectedIds = starters.filter(s => s !== selectedId);
                        const leftId = Math.min(...unselectedIds);
                        const rightId = Math.max(...unselectedIds);

                        let targetX = 0;
                        if (!isSelected) {
                            if (id === leftId) targetX = -200; // Va fijo a la izquierda
                            if (id === rightId) targetX = 200; // Va fijo a la derecha
                            
                            // Ajuste para pantallas móviles
                            if (window?.innerWidth < 640) {
                                targetX = targetX > 0 ? 100 : -100;
                            }
                        }

                        return (
                            <motion.button
                                key={id}
                                onClick={() => setSelectedId(id)}
                                className="absolute outline-none flex flex-col items-center justify-end group transform-style-preserve-3d"
                                animate={{
                                    x: targetX,
                                    scale: isSelected ? 1.6 : 0.9,
                                    zIndex: isSelected ? 30 : 10,
                                }}
                                transition={{ type: "spring", stiffness: 180, damping: 20 }}
                                style={{ transformOrigin: "bottom center" }}
                            >
                                {/* Sombra en el suelo */}
                                <div className={`absolute bottom-[-15px] w-[80px] h-[20px] bg-[#111111]/20 rounded-[100%] blur-[3px] transition-all duration-300 ${isSelected ? 'scale-150' : 'scale-100 group-hover:scale-110'}`} />
                                
                                <motion.div 
                                    className="relative w-32 h-32 sm:w-40 sm:h-40 pointer-events-none"
                                    animate={isSelected ? { rotateY: [180, 360] } : { rotateY: 0 }}
                                    transition={{ duration: 0.6, ease: "easeOut" }}
                                    style={{ transformPerspective: 1000 }}
                                >
                                    <Image 
                                        src={getShowdownGif(id)} 
                                        alt={`Starter ${id}`} 
                                        fill 
                                        className={`object-contain transition-all duration-300 ${isSelected ? 'drop-shadow-[0_15px_15px_rgba(0,0,0,0.4)]' : 'drop-shadow-[0_4px_4px_rgba(0,0,0,0.3)] grayscale-[40%] opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:-translate-y-3 group-hover:drop-shadow-[0_10px_10px_rgba(0,0,0,0.3)]'}`}
                                        unoptimized
                                    />
                                </motion.div>

                                {/* Indicador flotante 3D */}
                                {!isSelected && (
                                    <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-white border-2 border-[#111] px-2 py-1 text-[9px] font-['Press_Start_2P'] drop-shadow-[2px_2px_0_#111]">
                                        ELEGIR
                                    </div>
                                )}
                            </motion.button>
                        );
                    })}
                </div>
            </div>

            {/* TABLA DE INFORMACIÓN (Aparece Abajo) */}
            <div className="bg-white p-6 sm:p-10 relative">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedId}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col"
                    >
                        {/* Cabecera Info Base */}
                        <div className="flex flex-col md:flex-row gap-6 mb-10 items-center justify-between border-b-[3px] border-dashed border-[#DDD] pb-6">
                            <div className="text-center md:text-left">
                                <span className="font-['JetBrains_Mono'] font-bold text-[16px] text-[#A0A0A0] block mb-2">
                                    N° {String(selectedId).padStart(3, '0')}
                                </span>
                                <h4 className="font-['Press_Start_2P'] text-[24px] sm:text-[32px] text-[#111111] capitalize mb-4 md:mb-0">
                                    {starterData ? starterData.name : "Cargando..."}
                                </h4>
                            </div>
                            
                            <div className="flex gap-2">
                                {starterData?.types.map((t: any) => (
                                    <TypeBadge key={t.type.name} type={t.type.name} size="lg" />
                                ))}
                            </div>
                        </div>

                        {/* LINEA EVOLUTIVA (USANDO GIFS DE SHOWDOWN) */}
                        <div className="w-full">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="h-[3px] bg-[#111] flex-1" />
                                <span className="font-['Press_Start_2P'] text-[10px] sm:text-[12px] text-[#111]">
                                    LÍNEA EVOLUTIVA COMPLETA
                                </span>
                                <div className="h-[3px] bg-[#111] flex-1" />
                            </div>

                            <div className="flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-12 w-full max-w-4xl mx-auto">
                                {evolutionaryLine.map((id, index) => (
                                    <div key={id} className="flex flex-col md:flex-row items-center gap-6 sm:gap-12 w-full sm:w-auto">
                                        
                                        {/* Tarjeta de Fase Evolutiva */}
                                        <Link href={`/pokemon/${id}`} className="group flex flex-col items-center">
                                            <div className="relative w-24 h-24 sm:w-32 sm:h-32 bg-[#F9F9F9] border-[4px] border-[#111] shadow-[6px_6px_0_#111] flex items-center justify-center group-hover:-translate-y-2 group-hover:shadow-[6px_10px_0_currentColor] transition-all duration-300" style={{ color: genColor }}>
                                                <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(#111 2px, transparent 2px)", backgroundSize: "10px 10px" }} />
                                                
                                                {/* Etiqueta de Fase */}
                                                <div className="absolute -top-[14px] bg-white px-3 py-1 border-[3px] border-[#111] font-['Press_Start_2P'] text-[9px] text-[#111] shadow-[2px_2px_0_#111]">
                                                    FASE {index + 1}
                                                </div>

                                                <div className="relative w-20 h-20 sm:w-28 sm:h-28 max-w-full max-h-full transition-transform duration-[400ms] group-hover:scale-110 pointer-events-none">
                                                    <Image 
                                                        src={getShowdownGif(id)} 
                                                        alt={`Evolution stage ${index + 1}`} 
                                                        fill 
                                                        className="object-contain drop-shadow-[4px_4px_0_rgba(0,0,0,0.15)]"
                                                        unoptimized
                                                    />
                                                </div>
                                            </div>
                                        </Link>
                                        
                                        {/* Flechas Separadoras */}
                                        {index < 2 && (
                                            <div className="flex flex-col justify-center items-center h-8 md:h-auto w-auto md:w-8 rotate-90 md:rotate-0 flex-shrink-0">
                                                <div className="relative flex items-center justify-center">
                                                    <div className="absolute w-[30px] h-[6px] bg-[#111]" />
                                                    <ChevronRight size={40} strokeWidth={4} className="text-[#111] translate-x-4" />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}

export function GenerationPokemonSection({ generationName, genColor, starters, legendaries, totalCount }: GenerationPokemonSectionProps) {
    return (
        <section className="space-y-16 mt-16 pb-8">
            
            {/* 1. Botón Principal a la Pokédex */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Link href={`/pokedex?gen=${generationName}`} className="block w-full outline-none group">
                    <div className="border-[4px] border-[#111111] bg-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative" style={{ boxShadow: `8px 8px 0 ${genColor}` }}>
                        <div className="absolute -right-16 -top-16 w-64 h-64 bg-black/5 rounded-full pointer-events-none group-hover:scale-[1.5] transition-transform duration-700" style={{ backgroundColor: genColor, opacity: 0.1 }} />

                        <div className="flex items-center gap-5 relative z-10 w-full md:w-auto">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 border-[3px] border-[#111111] flex items-center justify-center bg-[#F9F9F9] shadow-[4px_4px_0_#111111] shrink-0 group-hover:bg-[#111111] transition-colors duration-300">
                                <Book size={32} className="text-[#111111] group-hover:text-white transition-colors" />
                            </div>
                            <div>
                                <h3 className="font-['Press_Start_2P'] text-[15px] sm:text-[18px] text-[#111111] mb-2 leading-tight">
                                    Explorar Pokédex
                                </h3>
                                <p className="font-['Nunito'] font-black text-[15px] sm:text-[16px] text-[#555]">
                                    Directorio con <span style={{ color: genColor }}>{totalCount}</span> nuevas especies.
                                </p>
                            </div>
                        </div>

                        <div className="relative z-10 w-full md:w-auto flex justify-end">
                            <div className="px-6 py-4 border-[3px] border-[#111111] flex items-center gap-3 bg-[#111111] text-white shadow-[6px_6px_0_#111111] group-hover:-translate-y-1 group-hover:-translate-x-1 group-hover:bg-white group-hover:text-[#111111] transition-all">
                                <span className="font-['Press_Start_2P'] text-[12px] pt-1">ESCANEAR</span>
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </div>
                </Link>
            </motion.div>

            {/* 2. Subsección: Iniciales (Paisaje Horizontal Interactivo 3D) */}
            {starters && starters.length > 0 && (
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <Star size={24} style={{ color: genColor }} className="fill-current" />
                        <h3 className="font-['Press_Start_2P'] text-[16px] uppercase tracking-tighter text-[#111111]">Selector de Iniciales</h3>
                        <div className="h-[4px] bg-[#111111] flex-1" />
                    </div>
                    
                    <div className="mb-8 relative">
                        <StartersInteractiveShowcase starters={starters} genColor={genColor} />
                    </div>
                </div>
            )}

            {/* 3. Subsección: Legendarios y Singulares */}
            {legendaries && legendaries.length > 0 && (
                <div>
                    <div className="flex items-center gap-3 mb-8">
                        <Crown size={24} style={{ color: genColor }} className="fill-current" />
                        <h3 className="font-['Press_Start_2P'] text-[16px] uppercase tracking-tighter text-[#111111]">Mitos y Leyendas</h3>
                        <div className="h-[4px] bg-[#111111] flex-1" />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {legendaries.map((id, i) => (
                            <motion.div 
                                key={id} 
                                initial={{ opacity: 0, y: 20 }} 
                                whileInView={{ opacity: 1, y: 0 }} 
                                viewport={{ once: true }} 
                                transition={{ delay: i * 0.06, type: "spring", stiffness: 200, damping: 20 }}
                            >
                                <LegendaryCard id={id} genColor={genColor} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
}
