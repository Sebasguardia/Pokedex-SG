"use client";

import { motion } from "framer-motion";
import { Dna, Repeat } from "lucide-react";
import Image from "next/image";

interface GenerationEvolutionsSectionProps {
    evolutions: { method: string, desc: string, beforeId: number, afterId: number }[];
    genColor: string;
}

function PkmnGif({ id }: { id: number }) {
    // Usamos los sprites animados de la sección Pokedex (Showdown)
    const src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${id}.gif`;
    const staticSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

    return (
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center pointer-events-none">
            <Image 
                src={src} 
                alt={`Pokemon ${id}`} 
                fill
                className="object-contain drop-shadow-[4px_4px_0_rgba(17,17,17,0.15)]" 
                unoptimized
                onError={(e) => {
                    e.currentTarget.src = staticSrc;
                }}
            />
        </div>
    );
}

export function GenerationEvolutionsSection({ evolutions, genColor }: GenerationEvolutionsSectionProps) {
    if (!evolutions || evolutions.length === 0) return null;

    return (
        <section className="mt-16">
            <div className="flex items-center gap-3 mb-12">
                <Dna size={20} className="text-[#111111]" />
                <h2 className="font-['Press_Start_2P'] text-[14px] uppercase tracking-tighter text-[#111111] whitespace-nowrap">
                    Mutaciones Biológicas
                </h2>
                <div className="h-[4px] bg-[#111111] flex-1" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {evolutions.map((evo, i) => (
                    <motion.div
                        key={i}
                        className="relative border-[4px] border-[#111111] bg-[#F9F9F9] flex flex-col group overflow-hidden"
                        style={{ boxShadow: "6px 6px 0 #111111" }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        whileHover={{ y: -4, boxShadow: `8px 8px 0 ${genColor}`, borderColor: genColor }}
                    >
                        {/* Cabecera del Título del Método */}
                        <div className="bg-[#111111] text-white p-4 border-b-[4px] border-[#111111] flex flex-col transition-colors group-hover:bg-current" style={{ color: genColor }}>
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-['Press_Start_2P'] text-[8px] text-white/70 uppercase tracking-widest leading-none">
                                    Método Evo
                                </span>
                                <span className="font-['Press_Start_2P'] text-[8px] text-white/40">
                                    N°{String(i+1).padStart(2, '0')}
                                </span>
                            </div>
                            <h3 className="font-['Nunito'] font-black text-[18px] sm:text-[20px] leading-tight text-white group-hover:text-[#111111] drop-shadow-sm">
                                {evo.method}
                            </h3>
                        </div>

                        {/* Cuerpo Explicativo y Visual */}
                        <div className="flex flex-col flex-1 p-5">
                            
                            {/* Descripción del método */}
                            <p className="font-['Nunito'] font-bold text-[14px] text-[#444444] leading-relaxed mb-6 flex-1 min-h-[60px]">
                                {evo.desc}
                            </p>

                            {/* Separador Visual EJEMPLO */}
                            <div className="relative mb-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t-2 border-dashed border-[#CCCCCC]"></div>
                                </div>
                                <div className="relative flex justify-center">
                                    <span className="bg-[#F9F9F9] px-3 font-['Press_Start_2P'] text-[8px] text-[#888888]">
                                        EJEMPLO DE LA GEN
                                    </span>
                                </div>
                            </div>

                            {/* Área de los Sprites */}
                            <div className="flex items-center justify-between w-full gap-2">
                                {/* Pokemon Base */}
                                <div className="w-[80px] h-[80px] bg-white border-[3px] border-[#111111] flex items-center justify-center relative shadow-[2px_2px_0_#111111] z-10 transition-transform group-hover:-translate-y-1">
                                    <PkmnGif id={evo.beforeId} />
                                </div>

                                {/* Conector Animado Brutalista */}
                                <div className="flex-1 flex justify-center relative h-[30px] mx-1">
                                    {/* Línea Principal */}
                                    <div className="absolute top-1/2 -translate-y-1/2 w-full h-[4px] bg-[#111111]" />
                                    
                                    {/* Componente central rotatorio */}
                                    <motion.div
                                        className="relative z-10 w-8 h-8 bg-white border-[3px] border-[#111111] rounded-full flex items-center justify-center shadow-[2px_2px_0_#111111]"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                    >
                                        <Repeat size={14} className="text-[#111111]" />
                                    </motion.div>

                                    {/* Spark Animado de Transferencia */}
                                    <motion.div
                                        className="absolute top-1/2 -translate-y-1/2 w-6 h-[6px] z-0 drop-shadow-md"
                                        style={{ backgroundColor: genColor }}
                                        animate={{ left: ["0%", "100%"], opacity: [0, 1, 0] }}
                                        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                                    />
                                </div>

                                {/* Pokemon Evolucionado */}
                                <div className="w-[80px] h-[80px] bg-white border-[3px] border-[#111111] flex items-center justify-center relative shadow-[4px_4px_0_#111111] z-10 transition-transform group-hover:scale-105" style={{ borderColor: genColor }}>
                                    {/* Patrón fondo evolución */}
                                    <div 
                                        className="absolute inset-0 opacity-[0.08] pointer-events-none"
                                        style={{ backgroundImage: "repeating-linear-gradient(45deg, #111 0, #111 2px, transparent 2px, transparent 8px)" }}
                                    />
                                    <PkmnGif id={evo.afterId} />
                                </div>
                            </div>

                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
