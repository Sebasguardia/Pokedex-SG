"use client";

import { motion } from "framer-motion";
import { BookOpen, HelpCircle } from "lucide-react";

interface GenerationGeneralDescriptionProps {
    description: string;
    genColor: string;
}

export function GenerationGeneralDescription({ description, genColor }: GenerationGeneralDescriptionProps) {
    if (!description) return null;

    return (
        <section>
            <div className="flex items-center gap-0 mb-6">
                <div className="bg-[#111111] px-4 py-2 flex items-center gap-3">
                    <span className="w-3 h-3 bg-[#CC0000] shrink-0 border border-[#CC0000]" style={{ backgroundColor: genColor, borderColor: genColor }} />
                    <h2 className="font-['Press_Start_2P'] text-[12px] sm:text-[13px] uppercase tracking-tighter text-white whitespace-nowrap">
                        Orígenes y Contexto
                    </h2>
                </div>
                <div className="h-[4px] bg-[#111111] flex-1" />
            </div>

            <motion.div
                className="relative bg-white"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                {/* Sombra brutalista trasera */}
                <div className="absolute top-3 left-3 w-full h-full border-4 border-[#111111] bg-[#111111]" style={{ backgroundColor: genColor }} />
                
                {/* Contenedor principal */}
                <div className="relative border-4 border-[#111111] bg-white p-6 sm:p-8 md:p-10 z-10 flex gap-6 lg:gap-10">
                    
                    {/* Elemento gráfico izquierdo */}
                    <div className="hidden sm:flex flex-col items-center shrink-0">
                        <div className="w-14 h-14 border-[3px] border-[#111111] flex items-center justify-center shadow-[4px_4px_0_#111111]" style={{ backgroundColor: `${genColor}15` }}>
                            <BookOpen size={28} className="text-[#111111]" style={{ color: genColor }} />
                        </div>
                        {/* Linea vertical punteada conectora */}
                        <div className="w-[3px] flex-1 border-l-[3px] border-dotted border-[#111111] mt-4 opacity-30" />
                    </div>

                    {/* Texto descriptivo */}
                    <div className="flex-1 relative">
                        {/* Icono de cita / info flotante */}
                        <HelpCircle size={80} className="absolute -top-4 -left-4 text-[#111111] opacity-[0.04] pointer-events-none" />
                        
                        <p className="font-['Nunito'] font-black text-[16px] sm:text-[18px] md:text-[20px] text-[#222222] leading-relaxed relative z-10 text-pretty">
                            {description}
                        </p>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
