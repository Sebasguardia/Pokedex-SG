"use client";

import { motion } from "framer-motion";
import { Plus, Upload, BookOpen } from "lucide-react";
import { useTeamBuilderStore } from "@/lib/stores/teamBuilderStore";

interface TeamEmptyStateProps {
    onImportClick?: () => void;
}

export function TeamEmptyState({ onImportClick }: TeamEmptyStateProps) {
    const { openSearch } = useTeamBuilderStore();

    const tips = [
        { icon: "⚔️", text: "Tener al menos un sweeper físico y uno especial" },
        { icon: "🛡️", text: "Incluir un muro para absorber golpes" },
        { icon: "🌊", text: "Cubrir las debilidades con cobertura de tipos" },
        { icon: "⚡", text: "Balancear velocidades para controlar el turno" },
    ];

    return (
        <motion.div
            className="flex flex-col items-center gap-8 py-16 text-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
        >
            {/* 6 slots en miniatura animados */}
            <div className="flex gap-3 flex-wrap justify-center">
                {Array.from({ length: 6 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="border-2 border-dashed border-[#DDDDDD] flex items-center justify-center bg-[#FAFAFA]"
                        style={{ width: 64, height: 80 }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                            type: "spring", stiffness: 300, damping: 20, delay: i * 0.07,
                        }}
                    >
                        <span className="font-press-start text-[14px] text-[#DDDDDD]">{i + 1}</span>
                    </motion.div>
                ))}
            </div>

            {/* Título */}
            <div className="relative">
                <h3 className="font-press-start text-[20px] text-[#111111] mb-3">
                    TU EQUIPO ESTÁ VACÍO
                </h3>
                <div className="absolute left-1/2 -translate-x-1/2 bottom-0 h-1 w-12 bg-[#CC0000]" />
                <p className="font-nunito text-[16px] text-[#666666] max-w-[420px] mt-4 leading-relaxed">
                    Añade hasta 6 Pokémon para analizar la cobertura de tipos, detectar debilidades y obtener recomendaciones personalizadas.
                </p>
            </div>

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <motion.button
                    onClick={() => openSearch(0)}
                    className="flex items-center gap-2 border-2 border-[#111111] px-8 py-4 font-press-start text-[11px] text-white bg-[#CC0000]"
                    style={{ boxShadow: "4px 4px 0 #111111" }}
                    whileHover={{ x: 4, y: 4, boxShadow: "0px 0px 0 transparent" }}
                >
                    <Plus size={16} /> AÑADIR POKÉMON
                </motion.button>

                {onImportClick && (
                    <motion.button
                        onClick={onImportClick}
                        className="flex items-center gap-2 border-2 border-[#111111] px-8 py-4 font-press-start text-[11px] text-[#111111] bg-white"
                        style={{ boxShadow: "4px 4px 0 #E0E0E0" }}
                        whileHover={{ x: 4, y: 4, boxShadow: "0px 0px 0 transparent" }}
                    >
                        <Upload size={16} /> IMPORTAR EQUIPO
                    </motion.button>
                )}
            </div>

            {/* Tips */}
            <div
                className="border-l-4 border-[#CC0000] bg-[#FAFAFA] p-6 text-left w-full max-w-[500px] mt-4"
                style={{ boxShadow: "2px 2px 0 #EEEEEE" }}
            >
                <div className="flex items-center gap-3 mb-4">
                    <BookOpen size={16} className="text-[#888888]" />
                    <p className="font-press-start text-[10px] text-[#555555] uppercase">Consejos para un buen equipo</p>
                </div>
                <div className="space-y-3">
                    {tips.map(({ icon, text }) => (
                        <div key={text} className="flex items-start gap-3">
                            <span className="text-[16px]">{icon}</span>
                            <p className="font-nunito text-[15px] text-[#444444]">{text}</p>
                        </div>
                    ))}
                </div>
            </div>

            <p className="font-nunito text-[13px] text-[#AAAAAA] italic mt-2">
                El análisis se actualizará en tiempo real conforme añadas Pokémon.
            </p>
        </motion.div>
    );
}