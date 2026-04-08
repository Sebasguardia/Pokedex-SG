"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Star, FolderPlus } from "lucide-react";
import { useFavoritesStore } from "@/lib/store/favorites.store";
import { useState } from "react";

export function FavoritesBulkActionsBar() {
    const {
        selectedIds, isSelectionMode, clearSelection, setSelectionMode,
        bulkRemove, bulkSetRating, bulkAddToCollection, collections,
    } = useFavoritesStore();

    const [showRating, setShowRating] = useState(false);
    const [showCols,   setShowCols]   = useState(false);

    const userCols = collections.filter((c) => !c.isDefault);

    const handleDelete = () => {
        if (confirm(`¿Eliminar ${selectedIds.length} Pokémon de favoritos?`)) {
            bulkRemove();
        }
    };

    return (
        <AnimatePresence>
            {isSelectionMode && selectedIds.length > 0 && (
                <motion.div
                    initial={{ y: 80, opacity: 0 }}
                    animate={{ y: 0,  opacity: 1 }}
                    exit={{   y: 80, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 320, damping: 30 }}
                    className="fixed bottom-0 left-0 right-0 z-50 bg-[#111111] border-t-2 border-[#CC0000] px-6 py-3"
                >
                    <div className="max-w-5xl mx-auto flex items-center gap-4">
                        {/* Count */}
                        <span className="font-press-start text-[9px] text-white flex-1">
                            {selectedIds.length} seleccionados
                        </span>

                        {/* Add to Collection */}
                        <div className="relative">
                            <button
                                onClick={() => { setShowCols(!showCols); setShowRating(false); }}
                                className="font-press-start text-[8px] px-3 py-2 border border-[#888888] text-white flex items-center gap-1.5 hover:border-white transition-colors"
                            >
                                <FolderPlus size={11} /> Colección
                            </button>
                            <AnimatePresence>
                                {showCols && userCols.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 4 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 4 }}
                                        className="absolute bottom-full mb-2 left-0 bg-white border-2 border-[#111111] min-w-[160px] shadow-[4px_-4px_0_#CC0000]"
                                    >
                                        {userCols.map((col) => (
                                            <button key={col.id}
                                                onClick={() => { bulkAddToCollection(col.id); setShowCols(false); }}
                                                className="w-full text-left flex items-center gap-2 px-3 py-2 font-nunito text-[12px] text-[#333333] hover:bg-[#F5F5F5]"
                                            >
                                                <span className="w-2 h-2 rounded-full bg-[var(--col-color)]" style={{ "--col-color": col.color } as React.CSSProperties} />
                                                {col.name}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Set Rating */}
                        <div className="relative">
                            <button
                                onClick={() => { setShowRating(!showRating); setShowCols(false); }}
                                className="font-press-start text-[8px] px-3 py-2 border border-[#888888] text-white flex items-center gap-1.5 hover:border-white transition-colors"
                            >
                                <Star size={11} /> Rating
                            </button>
                            <AnimatePresence>
                                {showRating && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 4 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 4 }}
                                        className="absolute bottom-full mb-2 left-0 bg-white border-2 border-[#111111] p-2 flex gap-1 shadow-[4px_-4px_0_#CC0000]"
                                    >
                                        {[1,2,3,4,5].map((r) => (
                                            <button key={r}
                                                onClick={() => { bulkSetRating(r); setShowRating(false); }}
                                                className="font-nunito text-[18px] hover:scale-125 transition-transform text-[#F59E0B]"
                                            >★</button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Delete */}
                        <button
                            onClick={handleDelete}
                            className="font-press-start text-[8px] px-3 py-2 bg-[#CC0000] text-white border border-[#CC0000] flex items-center gap-1.5 hover:bg-[#AA0000] transition-colors"
                        >
                            <Trash2 size={11} /> Eliminar
                        </button>

                        {/* Close */}
                        <button
                            onClick={() => { clearSelection(); setSelectionMode(false); }}
                            className="text-[#888888] hover:text-white ml-2 transition-colors"
                            aria-label="Cerrar barra de acciones"
                        >
                            <X size={16} aria-hidden="true" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
