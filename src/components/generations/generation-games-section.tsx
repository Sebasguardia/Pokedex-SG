"use client";

import { motion } from "framer-motion";
import { Gamepad2, Image as ImageIcon, Disc } from "lucide-react";
import Image from "next/image";

interface GenerationGamesSectionProps {
    gamesArtwork: { name: string, coverUrl: string, platform?: string }[];
    genColor: string;
}

export function GenerationGamesSection({ gamesArtwork, genColor }: GenerationGamesSectionProps) {
    if (!gamesArtwork || gamesArtwork.length === 0) return null;

    return (
        <section>
            <div className="flex items-center gap-3 mb-7">
                <span className="w-3 h-3 bg-[#CC0000] shrink-0" />
                <h2 className="font-['Press_Start_2P'] text-[13px] uppercase tracking-tighter text-[#111111] whitespace-nowrap">
                    Catálogo de Videojuegos
                </h2>
                <div className="h-[3px] bg-[#111111] flex-1" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6">
                {gamesArtwork.map((game, i) => (
                    <motion.div
                        key={game.name + i}
                        className="relative border-[3px] border-[#111111] bg-white flex flex-col h-full overflow-hidden group"
                        style={{ boxShadow: "4px 4px 0 #111111" }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 300, damping: 25, delay: i * 0.05 }}
                        whileHover={{
                            y: -4,
                            boxShadow: `6px 8px 0 ${genColor}`,
                            borderColor: genColor
                        }}
                    >
                        {/* Area de la carátula o Placeholder */}
                        <div className="w-full aspect-[3/4] bg-[#F5F5F5] border-b-[3px] border-[#111111] flex items-center justify-center relative overflow-hidden group-hover:border-b-transparent transition-colors">
                            {/* Dot Grid Background */}
                            <div 
                                className="absolute inset-0 opacity-20 pointer-events-none"
                                style={{ backgroundImage: "radial-gradient(#111111 2px, transparent 2px)", backgroundSize: "12px 12px" }}
                            />

                            {game.coverUrl ? (
                                <Image 
                                    src={game.coverUrl} 
                                    alt={`Carátula de ${game.name}`} 
                                    fill 
                                    className="object-cover transition-transform duration-700 group-hover:scale-110" 
                                    unoptimized 
                                />
                            ) : (
                                <div className="flex flex-col items-center justify-center p-3 gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
                                    <div className="w-10 h-10 border-2 border-dashed border-[#111111] flex items-center justify-center rounded-sm bg-white" style={{ borderColor: genColor }}>
                                        <ImageIcon size={20} style={{ color: genColor }} />
                                    </div>
                                    <span className="font-['Press_Start_2P'] text-[6px] text-center text-[#111111] leading-[1.6]">
                                        [LINK IMAGEN VACÍO]
                                    </span>
                                </div>
                            )}

                            {/* Badge Pestaña "Cinta" */}
                            <div className="absolute top-2 -right-6 bg-[#111111] text-white font-['Press_Start_2P'] text-[6px] px-6 py-1 rotate-45 shadow-md border border-white/20">
                                GAME
                            </div>
                        </div>

                        {/* Pie de foto */}
                        <div className="p-3 bg-white relative z-10 flex flex-col justify-between flex-1 gap-2">
                            <h3 className="font-['Press_Start_2P'] text-[9px] text-[#111111] leading-relaxed drop-shadow-sm line-clamp-2">
                                {game.name}
                            </h3>
                            
                            <div className="flex items-center gap-1.5 mt-auto pt-2 border-t-[1.5px] border-dotted border-[#CCCCCC]">
                                <Disc size={10} className="text-[#888888]" />
                                <span className="font-['Nunito'] font-black text-[10px] text-[#888888] uppercase tracking-wider">
                                    {game.platform || "Consola"}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}