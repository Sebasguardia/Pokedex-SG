"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Copy, Check, Download, Upload } from "lucide-react";
import { useTeamBuilderStore } from "@/lib/stores/teamBuilderStore";
import { encodeTeam, decodeTeamFromUrl, exportToShowdown } from "@/lib/utils/team-sharing";
import { PIXEL_URL } from "@/lib/constants/team-builder/team-builder.constants";
import { PackageOpen } from "lucide-react";

// ── SHARE MODAL ───────────────────────────────────────────────────────────────

interface TeamShareModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function TeamShareModal({ isOpen, onClose }: TeamShareModalProps) {
    const { activeTeam } = useTeamBuilderStore();
    const [copied, setCopied] = useState<"link" | "showdown" | null>(null);

    const teamCode = encodeTeam(activeTeam);
    const shareUrl = typeof window !== "undefined"
        ? `${window.location.origin}/team-builder?team=${teamCode}`
        : "";

    const handleCopy = async (type: "link" | "showdown") => {
        const text = type === "link" ? shareUrl : exportToShowdown(activeTeam);
        await navigator.clipboard.writeText(text);
        setCopied(type);
        setTimeout(() => setCopied(null), 2000);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-[160] flex items-center justify-center p-4"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            >
                <div className="absolute inset-0 bg-black/60" onClick={onClose} />
                <motion.div
                    className="relative w-full max-w-[480px] border-2 border-[#111111] bg-white"
                    style={{ boxShadow: "6px 6px 0 #CC0000" }}
                    initial={{ scale: 0.9, opacity: 0, y: 16 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                >
                    {/* Header */}
                    <div className="flex items-center gap-3 px-5 py-4 border-b-2 border-[#111111] bg-[#111111]">
                        <div className="h-5 w-[3px] bg-[#CC0000]" />
                        <h2 className="font-press-start text-[12px] text-white flex-1">COMPARTIR EQUIPO</h2>
                        <button onClick={onClose} className="text-white/60 hover:text-white" aria-label="Cerrar modal de compartir"><X size={18} /></button>
                    </div>

                    <div className="p-6 space-y-5">
                        {/* Mini preview */}
                        <div>
                            <p className="font-press-start text-[9px] text-[#888888] mb-3 uppercase">Tu equipo</p>
                            <div className="flex gap-2 items-center flex-wrap">
                                {activeTeam.members.map((m) => (
                                    <div key={m.slot} className="flex flex-col items-center">
                                        <Image src={PIXEL_URL(m.pokemonId)} alt={m.nameEs} width={40} height={40} unoptimized className="object-contain" />
                                        <span className="font-nunito text-[9px] text-[#888888] text-center">{m.nameEs.slice(0, 6)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* URL */}
                        <div>
                            <p className="font-press-start text-[9px] text-[#888888] mb-2 uppercase">Enlace para compartir</p>
                            <div className="flex gap-2">
                                <div className="flex-1 border-2 border-[#E0E0E0] px-3 py-2 bg-[#F8F8F8] overflow-hidden">
                                    <p className="font-nunito text-[11px] text-[#888888] truncate">{shareUrl}</p>
                                </div>
                                <motion.button
                                    onClick={() => handleCopy("link")}
                                    className="flex items-center gap-1.5 border-2 border-[#111111] px-3 py-2 font-press-start text-[8px] bg-white shrink-0"
                                    style={{ boxShadow: "2px 2px 0 #111111" }}
                                    whileHover={{ x: 2, y: 2, boxShadow: "0px 0px 0 transparent" }}
                                >
                                    {copied === "link" ? <Check size={12} className="text-[#22C55E]" /> : <Copy size={12} />}
                                    {copied === "link" ? "OK" : "COPIAR"}
                                </motion.button>
                            </div>
                        </div>

                        {/* Showdown export */}
                        <div>
                            <p className="font-press-start text-[9px] text-[#888888] mb-2 uppercase">Exportar (Showdown)</p>
                            <div className="border-2 border-[#E0E0E0] bg-[#F8F8F8] p-3 mb-2 font-jetbrains text-[11px] text-[#555555] whitespace-pre-wrap max-h-[120px] overflow-y-auto">
                                {exportToShowdown(activeTeam)}
                            </div>
                            <button
                                onClick={() => handleCopy("showdown")}
                                className="flex items-center gap-1.5 border-2 border-[#E0E0E0] px-3 py-2 font-nunito font-bold text-[12px] hover:border-[#111111] transition-colors"
                            >
                                {copied === "showdown" ? <Check size={13} className="text-[#22C55E]" /> : <Download size={13} />}
                                {copied === "showdown" ? "¡Copiado!" : "Copiar formato Showdown"}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

// ── IMPORT MODAL ──────────────────────────────────────────────────────────────

interface TeamImportModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function TeamImportModal({ isOpen, onClose }: TeamImportModalProps) {
    const { loadTeamData } = useTeamBuilderStore();
    const [input, setInput] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleImport = () => {
        setError(null);
        let code = input.trim();
        // Si es URL, extraer el param ?team=
        const urlMatch = code.match(/[?&]team=([^&]+)/);
        if (urlMatch) code = urlMatch[1];

        const decoded = decodeTeamFromUrl(code);
        if (!decoded) {
            setError("Código inválido o corrupto. Verifica el enlace.");
            return;
        }
        // Crear un equipo mínimo — los datos de Pokémon se cargan al render
        loadTeamData({
            id: Date.now().toString(36),
            name: decoded.name,
            members: [],
            createdAt: Date.now(),
            updatedAt: Date.now(),
        });
        onClose();
        setInput("");
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-[160] flex items-center justify-center p-4"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            >
                <div className="absolute inset-0 bg-black/60" onClick={onClose} />
                <motion.div
                    className="relative w-full max-w-[440px] border-2 border-[#111111] bg-white"
                    style={{ boxShadow: "6px 6px 0 #CC0000" }}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                >
                    <div className="flex items-center gap-3 px-5 py-4 border-b-2 border-[#111111] bg-[#111111]">
                        <div className="h-5 w-[3px] bg-[#CC0000]" />
                        <h2 className="font-press-start text-[12px] text-white flex-1">IMPORTAR EQUIPO</h2>
                        <button onClick={onClose} className="text-white/60 hover:text-white" aria-label="Cerrar modal de importación"><X size={18} /></button>
                    </div>

                    <div className="p-6 space-y-4">
                        <p className="font-nunito text-[14px] text-[#555555]">
                            Pega un enlace de equipo compartido o el código directamente.
                        </p>
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="https://pokedex.com/team-builder?team=... ó el código BASE64"
                            className="w-full border-2 border-[#E0E0E0] p-3 font-nunito text-[13px] text-[#111111] placeholder:text-[#BBBBBB] outline-none focus:border-[#CC0000] transition-colors resize-none"
                            rows={3}
                        />
                        {error && (
                            <p className="font-nunito text-[12px] text-[#CC0000]">{error}</p>
                        )}
                        <div className="flex gap-2">
                            <button onClick={onClose} className="flex-1 border-2 border-[#E0E0E0] py-2.5 font-nunito font-bold text-[13px] text-[#888888] hover:border-[#111111] transition-colors">
                                Cancelar
                            </button>
                            <motion.button
                                onClick={handleImport}
                                disabled={!input.trim()}
                                className="flex-1 flex items-center justify-center gap-2 border-2 border-[#111111] py-2.5 font-press-start text-[9px] text-white bg-[#CC0000] disabled:opacity-40"
                                style={{ boxShadow: "2px 2px 0 #111111" }}
                                whileHover={{ x: 2, y: 2, boxShadow: "0px 0px 0 transparent" }}
                            >
                                <Upload size={12} /> IMPORTAR
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

// ── EMPTY STATE ───────────────────────────────────────────────────────────────

export function TeamEmptyState() {
    const { openSearch } = useTeamBuilderStore();

    return (
        <motion.div
            className="flex flex-col items-center gap-5 py-16 text-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
        >
            {/* 6 slots vacíos en miniatura */}
            <div className="flex gap-2 flex-wrap justify-center">
                {Array.from({ length: 6 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="w-[48px] h-[60px] border-2 border-dashed border-[#DDDDDD] flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: i * 0.07 }}
                    >
                        <span className="font-press-start text-[10px] text-[#EEEEEE]">{i + 1}</span>
                    </motion.div>
                ))}
            </div>

            <PackageOpen size={28} className="text-[#CCCCCC]" />

            <div>
                <p className="font-press-start text-[13px] text-[#888888] mb-2">
                    TU EQUIPO ESTÁ VACÍO
                </p>
                <p className="font-nunito text-[14px] text-[#AAAAAA] max-w-[320px]">
                    Añade hasta 6 Pokémon para analizar tu equipo, ver debilidades y recibir recomendaciones.
                </p>
            </div>

            <motion.button
                onClick={() => openSearch(0)}
                className="flex items-center gap-2 border-2 border-[#111111] px-6 py-3 font-press-start text-[10px] text-white bg-[#CC0000]"
                style={{ boxShadow: "4px 4px 0 #111111" }}
                whileHover={{ x: 4, y: 4, boxShadow: "0px 0px 0 transparent" }}
            >
                + AÑADIR PRIMER POKÉMON
            </motion.button>

            <p className="font-nunito text-[12px] text-[#BBBBBB] italic">
                También puedes importar un equipo compartido o cargar uno guardado.
            </p>
        </motion.div>
    );
}