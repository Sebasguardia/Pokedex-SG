"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sword } from "lucide-react";

interface GenerationMovesRedirectProps {
    generationName: string;
    genColor: string;
}

export function GenerationMovesRedirect({ generationName, genColor }: GenerationMovesRedirectProps) {
    return (
        <section>
            <div className="flex items-center gap-3 mb-6">
                <span className="w-3 h-3 bg-[#CC0000] shrink-0" />
                <h2 className="font-['Press_Start_2P'] text-[13px] uppercase tracking-tighter text-[#111111] whitespace-nowrap">
                    Movimientos Introducidos
                </h2>
                <div className="h-[3px] bg-[#111111] flex-1" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <Link href={`/moves?gen=${generationName}`} className="block w-full outline-none group focus-visible:ring-4 focus-visible:ring-[#111111]">
                    <div 
                        className="relative w-full border-[4px] border-[#111111] bg-[#111111] overflow-hidden flex items-center justify-between p-6 sm:p-8"
                        style={{ boxShadow: `6px 6px 0 ${genColor}` }}
                    >
                        {/* Background pattern */}
                        <div 
                            className="absolute inset-0 opacity-[0.1] pointer-events-none"
                            style={{ backgroundImage: `radial-gradient(${genColor} 2px, transparent 2px)`, backgroundSize: "20px 20px" }}
                        />

                        {/* Moving banner / watermark */}
                        <motion.div 
                            className="absolute left-[-20%] right-[-20%] whitespace-nowrap opacity-[0.05] pointer-events-none font-['Press_Start_2P'] text-[60px]"
                            style={{ color: "#ffffff" }}
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        >
                            MOVIMIENTOS MOVES ATAQUES MOVES MOVIMIENTOS ATAQUES
                        </motion.div>

                        <div className="relative z-10 flex items-center gap-4">
                            <div className="w-12 h-12 border-2 border-white flex items-center justify-center bg-[#CC0000] shadow-[3px_3px_0_#ffffff]">
                                <Sword size={24} className="text-white" />
                            </div>
                            <div>
                                <h3 className="font-['Press_Start_2P'] text-[12px] sm:text-[14px] text-white">
                                    Catálogo de Movimientos
                                </h3>
                                <p className="font-['Nunito'] font-bold text-[13px] text-[#AAAAAA] mt-1">
                                    Explora la lista completa filtrada por esta generación.
                                </p>
                            </div>
                        </div>

                        <div className="relative z-10 hidden sm:flex items-center gap-2">
                            <span className="font-['Press_Start_2P'] text-[10px] text-white group-hover:text-[#CC0000] transition-colors">ACCEDER</span>
                            <div className="w-10 h-10 border-2 border-white bg-white group-hover:bg-[#CC0000] group-hover:border-[#CC0000] transition-colors flex items-center justify-center shadow-[3px_3px_0_#CC0000] group-hover:shadow-[3px_3px_0_#ffffff]">
                                <ArrowRight size={20} className="text-[#111111] group-hover:text-white" strokeWidth={3} />
                            </div>
                        </div>
                    </div>
                </Link>
            </motion.div>
        </section>
    );
}
