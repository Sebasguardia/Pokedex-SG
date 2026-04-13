"use client";

import { motion } from "framer-motion";
import { FolderGit2, Hash, ArrowRightSquare } from "lucide-react";

interface GenerationMechanicsSectionProps {
    mechanics: { title: string, desc: string }[];
    genColor: string;
}

export function GenerationMechanicsSection({ mechanics, genColor }: GenerationMechanicsSectionProps) {
    if (!mechanics || mechanics.length === 0) return null;

    return (
        <section className="mt-8">
            <div className="flex items-center gap-4 mb-10">
                <div 
                    className="w-12 h-12 border-[4px] border-[#111111] flex items-center justify-center shrink-0 shadow-[4px_4px_0_#111111]"
                    style={{ backgroundColor: genColor }}
                >
                    <FolderGit2 size={24} className="text-white" />
                </div>
                <div className="flex-1">
                    <h2 className="font-['Press_Start_2P'] text-[15px] sm:text-[18px] uppercase tracking-tighter text-[#111111]">
                        Registro de Innovaciones
                    </h2>
                    <p className="font-['JetBrains_Mono'] text-[12px] text-[#555555] mt-1 font-bold">
                        &gt; Novedades_y_Mecánicas.log
                    </p>
                </div>
            </div>

            {/* Layout tipo Timeline / Changelog Estructurado */}
            <div className="relative ml-4 sm:ml-[28px] pl-6 sm:pl-10 border-l-[6px] border-[#111111] pb-4">
                
                {/* Decoración tope línea */}
                <div className="absolute top-0 -left-[14px] w-6 h-6 bg-white border-[6px] border-[#111111]" />

                <div className="space-y-12 pt-6">
                    {mechanics.map((mech, i) => {
                        const numString = String(i + 1).padStart(2, "0");

                        return (
                            <motion.div
                                key={mech.title}
                                className="relative group"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ type: "spring", stiffness: 280, damping: 25, delay: i * 0.15 }}
                            >
                                {/* Nodo Conector a la Línea */}
                                <div className="absolute top-4 -left-[45px] sm:-left-[61px] w-8 h-8 rounded-full border-[5px] border-[#111111] bg-white group-hover:bg-current transition-colors duration-300 z-10 flex items-center justify-center" style={{ color: genColor }}>
                                    <div className="w-2 h-2 bg-[#111111] rounded-full group-hover:bg-white" />
                                </div>

                                {/* Línea horizontal conector */}
                                <div className="absolute top-7 -left-[14px] w-[14px] sm:-left-[30px] sm:w-[30px] h-[5px] bg-[#111111] z-0" />

                                {/* Contenedor de la Mecánica */}
                                <div 
                                    className="relative bg-white border-[4px] border-[#111111] flex flex-col sm:flex-row transition-transform duration-300 group-hover:-translate-y-2 group-hover:translate-x-2 shadow-[8px_8px_0_#111111]"
                                    style={{ borderTopColor: genColor }}
                                >
                                    {/* Sidebar Izquierdo de Índice */}
                                    <div className="bg-[#111111] text-white p-3 sm:p-5 flex flex-row sm:flex-col items-center justify-between sm:justify-center border-b-[4px] sm:border-b-0 sm:border-r-[4px] border-[#111111] shrink-0 min-w-[70px]">
                                        <Hash size={14} className="text-[#666666] hidden sm:block mb-2" />
                                        <span className="font-['Press_Start_2P'] text-[18px] sm:text-[24px]" style={{ color: genColor }}>
                                            {numString}
                                        </span>
                                        <Hash size={14} className="text-[#666666] hidden sm:block mt-2" />
                                    </div>

                                    {/* Cuerpo del Contenido */}
                                    <div className="p-5 sm:p-7 flex-1 relative overflow-hidden">
                                        
                                        {/* Marca de agua de terminal en el fondo */}
                                        <div className="absolute -bottom-4 right-4 opacity-[0.04] pointer-events-none font-['JetBrains_Mono'] text-[60px] font-black">
                                            v1.{numString}
                                        </div>

                                        <div className="flex items-start gap-4 mb-3">
                                            <ArrowRightSquare size={20} className="mt-0.5 shrink-0" style={{ color: genColor }} />
                                            <h3 className="font-['Press_Start_2P'] text-[12px] sm:text-[14px] text-[#111111] leading-[1.6]">
                                                {mech.title}
                                            </h3>
                                        </div>

                                        <p className="font-['Nunito'] font-black text-[15px] sm:text-[16px] text-[#444444] leading-relaxed ml-0 sm:ml-9 mt-4 sm:mt-2 text-pretty border-l-[3px] border-dotted border-[#CCCCCC] pl-4">
                                            {mech.desc}
                                        </p>
                                        
                                        {/* "Badge" decorativo invisible que colorea un poco la tarjeta en hover */}
                                        <div className="absolute top-0 right-0 w-16 h-16 bg-[#111111] opacity-0 group-hover:opacity-5 transition-opacity" style={{ backgroundColor: genColor, clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }} />
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Decoración fondo línea */}
                <div className="absolute -bottom-2 -left-[14px] w-6 h-6 border-[6px] border-[#111111] bg-[#111111] rounded-full" />
            </div>
        </section>
    );
}
