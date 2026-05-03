"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Link2, Copy, X, Check } from "lucide-react";
import { useFavoritesStore } from "@/lib/store/favorites.store";
import { encodeCollectionToUrl } from "@/lib/constants/favorites/favorites.constants";

interface FavoritesExportModalProps {
    isOpen:  boolean;
    onClose: () => void;
}

export function FavoritesExportModal({ isOpen, onClose }: FavoritesExportModalProps) {
    const { exportToJSON, favorites, collections } = useFavoritesStore();
    const [copied, setCopied] = useState(false);

    const json = exportToJSON();
    const sizeKb = (new Blob([json]).size / 1024).toFixed(1);

    const handleDownload = () => {
        const blob = new Blob([json], { type: "application/json" });
        const url  = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `pokedex-favoritos-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleCopyClipboard = async () => {
        await navigator.clipboard.writeText(json);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleShareUrl = () => {
        const ids = favorites.slice(0, 100).map((f) => f.id);
        const encoded = encodeCollectionToUrl(ids);
        const url = `${window.location.origin}/favorites?import=${encoded}`;
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div className="fixed inset-0 bg-black/50 z-50"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={onClose} />
                    <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <motion.div
                            className="bg-white border-2 border-[#111111] w-full max-w-sm pointer-events-auto"
                            style={{ boxShadow: "6px 6px 0 #111111" }}
                            initial={{ scale: 0.95, y: 12 }} animate={{ scale: 1, y: 0 }}
                        >
                            <div className="flex items-center justify-between px-5 py-3.5 border-b-2 border-[#111111] bg-[#111111]">
                                <span className="font-press-start text-[10px] text-white">EXPORTAR</span>
                                <button title="Botón" aria-label="Botón" onClick={onClose} className="text-[#888888] hover:text-white"><X size={14} /></button>
                            </div>

                            <div className="p-5 space-y-4">
                                {/* Stats */}
                                <div className="bg-[#F9F9F9] border border-[#F0F0F0] p-3 text-center">
                                    <p className="font-nunito text-[13px] text-[#555555]">
                                        Se exportarán <strong>{favorites.length}</strong> favoritos en <strong>{collections.filter(c => !c.isDefault).length}</strong> colecciones
                                    </p>
                                    <p className="font-nunito text-[11px] text-[#AAAAAA] mt-0.5">Tamaño estimado: ~{sizeKb} KB</p>
                                </div>

                                {/* Options */}
                                {[
                                    { Icon: Download, label: "Descargar JSON",        desc: "Archivo .json descargable",    handler: handleDownload },
                                    { Icon: Link2,    label: "Compartir URL",          desc: `Primeros ${Math.min(favorites.length, 100)} Pokémon (límite de URL)`, handler: handleShareUrl },
                                    { Icon: copied ? Check : Copy, label: copied ? "¡Copiado!" : "Copiar JSON", desc: "JSON en el portapapeles", handler: handleCopyClipboard },
                                ].map(({ Icon, label, desc, handler }) => (
                                    <motion.button
                                        key={label}
                                        onClick={handler}
                                        className="w-full flex items-center gap-3 px-4 py-3 border-2 border-[#DDDDDD] bg-white hover:border-[#111111] text-left transition-colors"
                                        style={{ boxShadow: "2px 2px 0 #EEEEEE" }}
                                        whileHover={{ x: 1, y: 1, boxShadow: "1px 1px 0 #EEEEEE" }}
                                    >
                                        <Icon size={18} className="text-[#CC0000] shrink-0" />
                                        <div>
                                            <p className="font-press-start text-[8px] text-[#111111]">{label}</p>
                                            <p className="font-nunito text-[11px] text-[#AAAAAA]">{desc}</p>
                                        </div>
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
