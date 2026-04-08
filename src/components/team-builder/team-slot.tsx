"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Plus, X, ArrowLeftRight, Crown } from "lucide-react";
import { TeamMember, DefensiveWeaknessEntry } from "@/types/api/team-builder.types";
import {
    TYPE_COLORS, TYPE_NAMES_ES, getCellMeta, PIXEL_URL,
} from "@/lib/constants/team-builder.constants";

interface TeamSlotProps {
    slot: number;
    member: TeamMember | null;
    isActive: boolean;
    onClick: () => void;
    onRemove: (slot: number) => void;
    onDrop: (fromSlot: number, toSlot: number) => void;
    weaknesses?: DefensiveWeaknessEntry[];
}

export function TeamSlot({
    slot, member, isActive, onClick, onRemove, onDrop, weaknesses,
}: TeamSlotProps) {
    const [isDragOver, setIsDragOver] = useState(false);
    const dragRef = useRef<HTMLDivElement>(null);

    const primaryColor = member ? (TYPE_COLORS[member.types[0]] ?? "#888888") : "#CCCCCC";

    const myWeaknesses = weaknesses
        ? weaknesses
            .filter((w) => w.vulnerable.some((v) => v.slot === slot) && w.multiplier >= 2)
            .sort((a, b) => b.multiplier - a.multiplier)
            .slice(0, 3)
        : [];

    const handleDragStart = (e: React.DragEvent) => {
        e.dataTransfer.setData("fromSlot", String(slot));
    };
    const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragOver(true); };
    const handleDragLeave = () => setIsDragOver(false);
    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        const from = parseInt(e.dataTransfer.getData("fromSlot") ?? "-1");
        if (from >= 0 && from !== slot) onDrop(from, slot);
    };

    return (
        <div
            ref={dragRef}
            draggable={!!member}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className="relative h-full"
        >
            <motion.div
                onClick={!member ? onClick : undefined}
                className="relative border-2 overflow-hidden flex flex-col bg-white"
                style={{
                    borderColor: isDragOver ? "#CC0000" : isActive ? "#CC0000" : member ? "#111111" : "#EEEEEE",
                    borderStyle: member ? "solid" : "dashed",
                    boxShadow: member
                        ? `6px 6px 0 ${isDragOver ? "#CC0000" : "#111111"}`
                        : isActive ? "6px 6px 0 #CC0000" : "none",
                    cursor: member ? "grab" : "pointer",
                    height: "330px", // Aumentamos la altura de nuevo para seguridad de lectura
                }}
                whileHover={!member
                    ? { borderColor: "#CC0000", boxShadow: "6px 6px 0 #CC0000" }
                    : { x: 1, y: 1, boxShadow: "4px 4px 0 #111111" }}
                animate={isDragOver ? { scale: 1.02 } : { scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
                {/* 1. Cabecera (30px) */}
                <div className="h-[30px] w-full relative px-2.5 flex items-center shrink-0 border-b border-[#F5F5F5]">
                    <div className="flex items-center justify-center w-5 h-5 bg-[#111111] text-white">
                        <span className="font-press-start text-[9px]">{slot + 1}</span>
                    </div>
                    {member && (
                        <button
                            className="ml-auto w-6 h-6 bg-[#CC0000] flex items-center justify-center border border-[#111111] shadow-[1px_1px_0_#111111]"
                            onClick={(e) => { e.stopPropagation(); onRemove(slot); }}
                            aria-label="Eliminar Pokémon del equipo"
                        >
                            <X size={10} className="text-white" />
                        </button>
                    )}
                </div>

                {!member && (
                    <div className="flex flex-col items-center justify-center flex-1 gap-1">
                        <Plus size={24} className={isActive ? "text-[#CC0000]" : "text-[#DDD]"} />
                        <p className="font-press-start text-[7px] text-[#DDD]">AÑADIR</p>
                    </div>
                )}

                {member && (
                    <div className="flex flex-col items-center flex-1 overflow-hidden px-2">
                        {/* 2. Área de Imagen RÍGIDA (110px) - No desborda ni se come nada */}
                        <div className="h-[110px] w-full flex items-center justify-center relative shrink-0 overflow-hidden mt-1">
                            <div className="absolute inset-0 bg-current opacity-[0.03] blur-3xl rounded-full scale-100" style={{ color: primaryColor }} />
                            <div className="relative z-10 w-[90px] h-[90px] flex items-center justify-center">
                                <Image
                                    src={PIXEL_URL(member.pokemonId)}
                                    alt={member.nameEs}
                                    fill unoptimized
                                    className="object-contain drop-shadow-md"
                                />
                            </div>
                        </div>

                        {/* 3. Nombre e ID (28px fijos) */}
                        <div className="flex flex-col items-center justify-center w-full shrink-0 h-[28px]">
                            <p className="font-press-start text-[10px] text-[#111111] text-center uppercase tracking-tighter truncate w-full leading-none">
                                {member.nameEs}
                            </p>
                            <p className="font-jetbrains text-[9px] text-[#CCCCCC] font-black italic mt-0.5">
                                #{String(member.pokemonId).padStart(3, "0")}
                            </p>
                        </div>

                        {/* 4. Tipos (24px fijos) - Letras más claras/grandes */}
                        <div className="h-[24px] flex items-center justify-center gap-1.5 w-full mt-1.5 shrink-0">
                            {member.types.map((t) => (
                                <span
                                    key={t}
                                    className="font-press-start text-[8px] px-2 py-1 text-white shadow-sm border border-black/5"
                                    style={{ backgroundColor: TYPE_COLORS[t] ?? "#888888" }}
                                >
                                    {TYPE_NAMES_ES[t]?.toUpperCase()}
                                </span>
                            ))}
                        </div>

                        {/* 5. Debilidades (50px fijos) - Altura suficiente para que no se corten */}
                        <div className="h-[52px] w-full mt-2 flex flex-wrap gap-1 justify-center items-center content-center shrink-0">
                            {myWeaknesses.length > 0 ? (
                                myWeaknesses.map((w) => (
                                    <span
                                        key={w.type}
                                        className="font-press-start text-[8px] px-2 py-1 flex items-center gap-1.5 border border-[#111111]/15 bg-[#FAFAFA]"
                                        style={{ color: TYPE_COLORS[w.type] }}
                                    >
                                        <span className="opacity-70 text-[6px] font-black">x{w.multiplier}</span>
                                        {TYPE_NAMES_ES[w.type]?.slice(0, 3)?.toUpperCase()}
                                    </span>
                                ))
                            ) : (
                                <span className="font-press-start text-[7px] text-[#DDDDDD] opacity-50 uppercase italic tracking-widest">Resistente</span>
                            )}
                        </div>

                        {/* 6. Habilidad (48px fijos) - Pie de página */}
                        <div className="mt-auto h-[48px] w-full border-t border-[#F5F5F5] flex flex-col items-center justify-center bg-[#FAFAFA]/70 shrink-0">
                            <p className="font-nunito text-[16px] font-black text-[#555555] text-center leading-tight truncate px-1">
                                {member.ability?.nameEs || member.ability?.name || "---"}
                            </p>
                        </div>
                    </div>
                )}

                <AnimatePresence>
                    {isDragOver && (
                        <motion.div
                            className="absolute inset-0 flex flex-col items-center justify-center z-40 bg-[rgba(204,0,0,0.1)]"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        >
                            <ArrowLeftRight size={24} className="text-[#CC0000] drop-shadow-md" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}