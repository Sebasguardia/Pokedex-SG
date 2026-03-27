"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LucideIcon, Heart, Star, Trophy, Zap, Flame, Leaf, Snowflake, Mountain, Waves, Sword, Shield, Crown, Gem, Package, BookOpen, Globe, X } from "lucide-react";
import { useFavoritesStore } from "@/lib/store/favorites.store";
import { COLLECTION_COLORS, COLLECTION_ICONS, MAX_COLLECTIONS } from "@/lib/constants/favorites.constants";
import { FavoriteCollection } from "@/types/api/favorites.types";

const ICON_MAP: Record<string, LucideIcon> = {
    Star, Heart, Trophy, Zap, Flame, Leaf, Snowflake, Mountain,
    Waves, Sword, Shield, Crown, Gem, Package, BookOpen, Globe,
};

interface CollectionCreateModalProps {
    isOpen:         boolean;
    onClose:        () => void;
    editCollection?: FavoriteCollection | null;
}

export function CollectionCreateModal({ isOpen, onClose, editCollection }: CollectionCreateModalProps) {
    const { createCollection, updateCollection, collections } = useFavoritesStore();

    const [name, setName]   = useState(editCollection?.name        ?? "");
    const [desc, setDesc]   = useState(editCollection?.description ?? "");
    const [color, setColor] = useState(editCollection?.color       ?? "#CC0000");
    const [icon, setIcon]   = useState(editCollection?.icon        ?? "Star");
    const [error, setError] = useState("");

    const handleSubmit = () => {
        const trimmed = name.trim();
        if (!trimmed) { setError("El nombre es obligatorio"); return; }
        if (trimmed.length > 50) { setError("Máximo 50 caracteres"); return; }

        const duplicate = collections.some(
            (c) => !c.isDefault && c.name.toLowerCase() === trimmed.toLowerCase() && c.id !== editCollection?.id
        );
        if (duplicate) { setError("Ya existe una colección con ese nombre"); return; }

        if (!editCollection) {
            if (collections.filter((c) => !c.isDefault).length >= MAX_COLLECTIONS) {
                setError(`Máximo ${MAX_COLLECTIONS} colecciones`);
                return;
            }
            createCollection(trimmed, desc, color, icon);
        } else {
            updateCollection(editCollection.id, { name: trimmed, description: desc, color, icon });
        }
        onClose();
    };

    const PreviewIcon = ICON_MAP[icon] ?? Star;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 bg-black/50 z-50"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white border-2 border-[#111111] w-full max-w-md pointer-events-auto"
                            style={{ boxShadow: "6px 6px 0 #111111" }}
                            initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between px-5 py-3.5 border-b-2 border-[#111111] bg-[#111111]">
                                <span className="font-press-start text-[10px] text-white">
                                    {editCollection ? "EDITAR COLECCIÓN" : "NUEVA COLECCIÓN"}
                                </span>
                                <button onClick={onClose} className="text-[#888888] hover:text-white">
                                    <X size={14} />
                                </button>
                            </div>

                            <div className="p-5 space-y-5">
                                {/* Preview */}
                                <div className="flex items-center gap-3 p-3 border-2 border-dashed border-[#DDDDDD]">
                                    <div className="w-10 h-10 flex items-center justify-center"
                                        style={{ backgroundColor: `${color}22`, border: `2px solid ${color}` }}>
                                        <PreviewIcon size={18} color={color} />
                                    </div>
                                    <div>
                                        <p className="font-press-start text-[9px] text-[#111111]">
                                            {name || "Nombre de la colección"}
                                        </p>
                                        <p className="font-nunito text-[11px] text-[#AAAAAA]">
                                            {desc || "Sin descripción"}
                                        </p>
                                    </div>
                                </div>

                                {/* Name */}
                                <div>
                                    <label className="font-press-start text-[8px] text-[#888888] block mb-1.5">NOMBRE *</label>
                                    <input
                                        value={name}
                                        onChange={(e) => { setName(e.target.value); setError(""); }}
                                        maxLength={50}
                                        placeholder="Mi equipo favorito..."
                                        className="w-full font-nunito text-[13px] px-3 py-2 border-2 border-[#DDDDDD] focus:border-[#CC0000] outline-none"
                                    />
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="font-press-start text-[8px] text-[#888888] block mb-1.5">DESCRIPCIÓN</label>
                                    <textarea
                                        value={desc}
                                        onChange={(e) => setDesc(e.target.value.slice(0, 200))}
                                        placeholder="Descripción opcional..."
                                        rows={2}
                                        className="w-full font-nunito text-[13px] px-3 py-2 border-2 border-[#DDDDDD] focus:border-[#CC0000] outline-none resize-none"
                                    />
                                </div>

                                {/* Color */}
                                <div>
                                    <label className="font-press-start text-[8px] text-[#888888] block mb-1.5">COLOR</label>
                                    <div className="flex flex-wrap gap-2">
                                        {COLLECTION_COLORS.map((c) => (
                                            <button
                                                key={c}
                                                onClick={() => setColor(c)}
                                                className="w-7 h-7 border-2 transition-all"
                                                style={{
                                                    backgroundColor: c,
                                                    borderColor: color === c ? "#111111" : "transparent",
                                                    transform: color === c ? "scale(1.2)" : "scale(1)",
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Icon */}
                                <div>
                                    <label className="font-press-start text-[8px] text-[#888888] block mb-1.5">ÍCONO</label>
                                    <div className="flex flex-wrap gap-2">
                                        {COLLECTION_ICONS.map((ic) => {
                                            const Ic = ICON_MAP[ic];
                                            return (
                                                <button
                                                    key={ic}
                                                    onClick={() => setIcon(ic)}
                                                    className="w-9 h-9 border-2 flex items-center justify-center transition-all"
                                                    style={{
                                                        borderColor: icon === ic ? color : "#DDDDDD",
                                                        backgroundColor: icon === ic ? `${color}22` : "white",
                                                    }}
                                                >
                                                    <Ic size={15} color={icon === ic ? color : "#888888"} />
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Error */}
                                {error && <p className="font-nunito text-[12px] text-[#CC0000]">{error}</p>}

                                {/* Actions */}
                                <div className="flex justify-end gap-3 pt-1">
                                    <button onClick={onClose}
                                        className="font-press-start text-[8px] px-4 py-2 border-2 border-[#DDDDDD] text-[#888888] hover:border-[#111111] hover:text-[#111111]">
                                        Cancelar
                                    </button>
                                    <motion.button
                                        onClick={handleSubmit}
                                        className="font-press-start text-[8px] px-4 py-2 bg-[#CC0000] text-white border-2 border-[#CC0000]"
                                        style={{ boxShadow: "3px 3px 0 #111111" }}
                                        whileHover={{ x: 1, y: 1, boxShadow: "2px 2px 0 #111111" }}
                                    >
                                        {editCollection ? "Guardar" : "Crear"}
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
