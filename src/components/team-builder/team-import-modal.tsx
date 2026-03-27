"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, AlertCircle } from "lucide-react";
import { useTeamBuilderStore } from "@/lib/stores/teamBuilderStore";
import { decodeTeamFromUrl } from "@/lib/utils/team-sharing";

interface TeamImportModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function TeamImportModal({ isOpen, onClose }: TeamImportModalProps) {
    const { loadTeamData } = useTeamBuilderStore();
    const [input, setInput] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [preview, setPreview] = useState<{ name: string; count: number } | null>(null);

    // Vista previa en tiempo real mientras el usuario pega
    const handleInputChange = (value: string) => {
        setInput(value);
        setError(null);
        setPreview(null);

        if (!value.trim()) return;

        let code = value.trim();
        const urlMatch = code.match(/[?&]team=([^&\s]+)/);
        if (urlMatch) code = urlMatch[1];

        const decoded = decodeTeamFromUrl(code);
        if (decoded) {
            setPreview({ name: decoded.name, count: decoded.memberData.length });
        } else if (value.trim().length > 10) {
            setError("Código no reconocido. Verifica que sea un enlace o código de equipo válido.");
        }
    };

    const handleImport = () => {
        setError(null);
        if (!preview) { setError("Pega un enlace o código válido primero."); return; }

        let code = input.trim();
        const urlMatch = code.match(/[?&]team=([^&\s]+)/);
        if (urlMatch) code = urlMatch[1];

        const decoded = decodeTeamFromUrl(code);
        if (!decoded) { setError("Error al decodificar el equipo."); return; }

        loadTeamData({
            id: Date.now().toString(36),
            name: decoded.name,
            members: [],
            createdAt: Date.now(),
            updatedAt: Date.now(),
        });

        onClose();
        setInput("");
        setPreview(null);
    };

    const handleClose = () => {
        setInput("");
        setError(null);
        setPreview(null);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-[160] flex items-center justify-center p-4"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60" onClick={handleClose} />

                {/* Modal */}
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
                        <h2 className="font-press-start text-[12px] text-white flex-1">IMPORTAR EQUIPO</h2>
                        <button onClick={handleClose} className="text-white/60 hover:text-white">
                            <X size={18} />
                        </button>
                    </div>

                    <div className="p-6 space-y-4">
                        <p className="font-nunito text-[14px] text-[#555555]">
                            Pega un enlace compartido o el código del equipo para importarlo.
                        </p>

                        {/* Textarea */}
                        <textarea
                            value={input}
                            onChange={(e) => handleInputChange(e.target.value)}
                            placeholder={`https://pokedex.com/team-builder?team=eyJuIjoiTWkg...
\nó el código BASE64 directamente`}
                            className="w-full border-2 border-[#E0E0E0] p-3 font-nunito text-[13px] text-[#111111] placeholder:text-[#BBBBBB] outline-none focus:border-[#CC0000] transition-colors resize-none"
                            rows={4}
                        />

                        {/* Error */}
                        {error && (
                            <div className="flex items-center gap-2 border border-[#FCA5A5] bg-[#FEF2F2] px-3 py-2">
                                <AlertCircle size={13} className="text-[#EF4444] shrink-0" />
                                <p className="font-nunito text-[12px] text-[#EF4444]">{error}</p>
                            </div>
                        )}

                        {/* Preview */}
                        {preview && (
                            <motion.div
                                className="flex items-center gap-3 border-2 border-[#22C55E] bg-[#DCFCE7] px-4 py-3"
                                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                            >
                                <div className="w-3 h-3 rounded-full bg-[#22C55E]" />
                                <div>
                                    <p className="font-nunito font-bold text-[13px] text-[#16A34A]">Equipo detectado: "{preview.name}"</p>
                                    <p className="font-nunito text-[12px] text-[#16A34A]">{preview.count} Pokémon</p>
                                </div>
                            </motion.div>
                        )}

                        {/* Botones */}
                        <div className="flex gap-2 pt-1">
                            <button
                                onClick={handleClose}
                                className="flex-1 border-2 border-[#E0E0E0] py-2.5 font-nunito font-bold text-[13px] text-[#888888] hover:border-[#111111] transition-colors"
                            >
                                Cancelar
                            </button>
                            <motion.button
                                onClick={handleImport}
                                disabled={!preview}
                                className="flex-1 flex items-center justify-center gap-2 border-2 border-[#111111] py-2.5 font-press-start text-[9px] text-white bg-[#CC0000] disabled:opacity-40 disabled:cursor-not-allowed"
                                style={{ boxShadow: "2px 2px 0 #111111" }}
                                whileHover={preview ? { x: 2, y: 2, boxShadow: "0px 0px 0 transparent" } : {}}
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