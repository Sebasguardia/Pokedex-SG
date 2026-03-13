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
    // Preferir hardcoded si la API devuelve vacío
    const typeNames = typesHardcoded.length > 0
        ? typesHardcoded
        : types.map((t) => t.name);

    if (typeNames.length === 0) return null;

    return (
        <section>
            {/* Section header */}
            <div className="flex items-center gap-4 mb-6">
                <h2 className="font-press-start text-[14px] uppercase tracking-tighter text-[#111111] whitespace-nowrap">
                    Tipos Introducidos
                </h2>
                <div className="h-px bg-[#E0E0E0] flex-1" />
                <span
                    className="font-press-start text-[8px] px-3 py-1.5 border-2 border-[#111111] shrink-0"
                    style={{ color: genColor }}
                >
                    {typeNames.length} tipos
                </span>
            </div>

            {/* Panel con etiqueta flotante */}
            <div
                className="relative border-2 border-[#111111] p-6 pt-7"
                style={{ boxShadow: `4px 4px 0 ${genColor}` }}
            >
                <div
                    className="absolute top-[-14px] left-4 px-3 py-1"
                    style={{ backgroundColor: genColor }}
                >
                    <span className="font-nunito font-bold text-[11px] text-white uppercase">
                        NUEVOS EN ESTA GENERACIÓN
                    </span>
                </div>

                {/* Type badges */}
                <div className="flex flex-wrap gap-3 mb-4">
                    {typeNames.map((typeName, i) => (
                        <motion.div
                            key={typeName}
                            initial={{ opacity: 0, scale: 0.7 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 300, damping: 20, delay: i * 0.06 }}
                            whileHover={{ scale: 1.08 }}
                        >
                            <TypeBadge type={typeName} size="lg" />
                        </motion.div>
                    ))}
                </div>

                {/* Nota contextual */}
                {typeNote && (
                    <motion.div
                        className="flex gap-3 items-start p-4 border-l-4"
                        style={{ borderColor: genColor, backgroundColor: "#111111" }}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <Info size={15} style={{ color: genColor }} className="shrink-0 mt-0.5" />
                        <p className="font-nunito text-[13px] text-white italic leading-relaxed">{typeNote}</p>
                    </motion.div>
                )}
            </div>
        </section>
    );
}