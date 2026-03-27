"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Save, Trash2, Edit3, Check, Copy, CheckCheck } from "lucide-react";
import { useTeamBuilderStore } from "@/lib/stores/teamBuilderStore";
import { encodeTeam } from "@/lib/utils/team-sharing";

interface TeamHeaderProps {
    onShareOpen: () => void;
    onSaveOpen: () => void;
}

export function TeamHeader({ onShareOpen, onSaveOpen }: TeamHeaderProps) {
    const { activeTeam, renameTeam, clearTeam, saveCurrentTeam } = useTeamBuilderStore();
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState(activeTeam.name);
    const [copiedLink, setCopiedLink] = useState(false);
    const [saved, setSaved] = useState(false);

    const handleRename = () => {
        if (editName.trim()) renameTeam(editName.trim());
        setIsEditing(false);
    };

    const handleCopyLink = async () => {
        const code = encodeTeam(activeTeam);
        const url = `${window.location.origin}/team-builder?team=${code}`;
        await navigator.clipboard.writeText(url);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2200);
    };

    const handleSave = () => {
        saveCurrentTeam();
        onSaveOpen();
        setSaved(true);
        setTimeout(() => setSaved(false), 2200);
    };

    const memberCount = activeTeam.members.length;

    const countColor =
        memberCount === 6 ? "#22C55E" :
        memberCount === 0 ? "#BBBBBB" : "#F59E0B";

    return (
        <div className="space-y-5">
            {/* Fila 1: nombre + badge */}
            <div className="flex items-center gap-3 justify-between min-h-[42px]">
                <div className="flex-1 min-w-0 flex items-center h-full">
                    {isEditing ? (
                        <div className="flex items-center gap-2 w-full">
                            <input
                                autoFocus
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") handleRename();
                                    if (e.key === "Escape") setIsEditing(false);
                                }}
                                className="font-press-start text-[13px] text-[#111111] border-b-2 border-[#CC0000] outline-none bg-transparent flex-1 py-1"
                            />
                            <button
                                onClick={handleRename}
                                className="w-8 h-8 bg-[#22C55E] flex items-center justify-center shrink-0 border-2 border-[#111111]"
                            >
                                <Check size={16} className="text-white" />
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => { setEditName(activeTeam.name); setIsEditing(true); }}
                            className="flex items-center gap-2 group min-w-0 text-left"
                        >
                            <h2 className="font-press-start text-[14px] sm:text-[16px] text-[#111111] truncate py-1">
                                {activeTeam.name}
                            </h2>
                            <Edit3 size={16} className="text-[#CCCCCC] group-hover:text-[#CC0000] transition-colors shrink-0" />
                        </button>
                    )}
                </div>

                {/* Badge count */}
                <div
                    className="border-2 border-[#111111] px-3 h-[42px] shrink-0 text-center flex items-center justify-center min-w-[60px]"
                    style={{ backgroundColor: countColor }}
                >
                    <span className="font-press-start text-[11px] text-white">
                        {memberCount}/6
                    </span>
                </div>
            </div>

            {/* Fila 2: acciones */}
            <div className="grid grid-cols-3 gap-2">
                {/* Compartir */}
                <motion.button
                    onClick={handleCopyLink}
                    disabled={memberCount === 0}
                    className="flex flex-col items-center gap-1 border-2 border-[#111111] py-2.5 px-2 font-nunito font-bold text-[11px] disabled:opacity-40 disabled:cursor-not-allowed bg-white"
                    style={{ boxShadow: "2px 2px 0 #111111" }}
                    whileHover={memberCount > 0 ? { x: 2, y: 2, boxShadow: "0px 0px 0 transparent" } : {}}
                >
                    {copiedLink ? <CheckCheck size={15} className="text-[#22C55E]" /> : <Copy size={15} />}
                    <span>{copiedLink ? "¡Copiado!" : "Compartir"}</span>
                </motion.button>

                {/* Guardar */}
                <motion.button
                    onClick={handleSave}
                    disabled={memberCount === 0}
                    className="flex flex-col items-center gap-1 border-2 border-[#111111] py-2.5 px-2 font-nunito font-bold text-[11px] bg-[#CC0000] text-white disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ boxShadow: "2px 2px 0 #111111" }}
                    whileHover={memberCount > 0 ? { x: 2, y: 2, boxShadow: "0px 0px 0 transparent" } : {}}
                >
                    {saved ? <Check size={15} /> : <Save size={15} />}
                    <span>{saved ? "¡Guardado!" : "Guardar"}</span>
                </motion.button>

                {/* Limpiar */}
                <motion.button
                    onClick={() => { if (confirm("¿Limpiar el equipo actual?")) clearTeam(); }}
                    disabled={memberCount === 0}
                    className="flex flex-col items-center gap-1 border-2 border-[#CC0000] py-2.5 px-2 font-nunito font-bold text-[11px] text-[#CC0000] bg-white disabled:opacity-30 disabled:cursor-not-allowed"
                    whileHover={memberCount > 0 ? { backgroundColor: "#CC0000", color: "#ffffff" } : {}}
                    transition={{ duration: 0.15 }}
                >
                    <Trash2 size={15} />
                    <span>Limpiar</span>
                </motion.button>
            </div>
        </div>
    );
}