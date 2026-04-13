"use client";

import { motion } from "framer-motion";
import { Info } from "lucide-react";
import { NamedAPIResource } from "@/types/api/common.types";
import { TypeBadge } from "@/components/pokemon/type-badge";

interface GenerationTypesIntroducedProps {
    types: NamedAPIResource[];
    typesHardcoded: string[];
    genColor: string;
    typeNote: string;
}

export function GenerationTypesIntroduced({
    types, typesHardcoded, genColor, typeNote,
}: GenerationTypesIntroducedProps) {
    const typeNames = typesHardcoded.length > 0
        ? typesHardcoded
        : types.map((t) => t.name);

    if (typeNames.length === 0) return null;

    return (
        <section>
            {/* Section header con cuadradito rojo */}
            <div className="flex items-center gap-3 mb-7">
                <span className="w-3 h-3 bg-[#CC0000] shrink-0" />
                <h2 className="font-['Press_Start_2P'] text-[13px] uppercase tracking-tighter text-[#111111] whitespace-nowrap">
                    Tipos Introducidos
                </h2>
                <div className="h-[3px] bg-[#111111] flex-1" />
                <span
                    className="font-['Press_Start_2P'] text-[8px] px-3 py-2 border-[3px] border-[#111111] shrink-0"
                    style={{ color: genColor, boxShadow: `3px 3px 0 ${genColor}` }}
                >
                    {typeNames.length} tipos
                </span>
            </div>

            {/* Panel brutalista */}
            <div
                className="relative border-4 border-[#111111] p-6 pt-9 bg-white"
                style={{ boxShadow: `8px 8px 0 ${genColor}` }}
            >
                {/* Etiqueta flotante del color gen */}
                <div
                    className="absolute top-[-16px] left-5 px-4 py-1.5"
                    style={{ backgroundColor: genColor }}
                >
                    <span className="font-['Press_Start_2P'] text-[8px] text-white uppercase tracking-widest whitespace-nowrap">
                        NUEVOS EN ESTA GENERACIÓN
                    </span>
                </div>

                {/* Type badges con spring más dramático */}
                <div className="flex flex-wrap gap-3 mb-5">
                    {typeNames.map((typeName, i) => (
                        <motion.div
                            key={typeName}
                            initial={{ opacity: 0, scale: 0.6, y: 10 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 300, damping: 18, delay: i * 0.07 }}
                            whileHover={{ scale: 1.1, y: -2 }}
                        >
                            <TypeBadge type={typeName} size="lg" />
                        </motion.div>
                    ))}
                </div>

                {/* Nota contextual */}
                {typeNote && (
                    <motion.div
                        className="flex gap-3 items-start p-4 border-l-4 border-4 border-[#111111]"
                        style={{ borderLeftColor: genColor, backgroundColor: "#111111" }}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <Info size={15} style={{ color: genColor }} className="shrink-0 mt-0.5" />
                        <p className="font-['Nunito'] font-bold text-[13px] text-white italic leading-relaxed">{typeNote}</p>
                    </motion.div>
                )}
            </div>
        </section>
    );
}