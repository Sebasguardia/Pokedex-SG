"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Plus, Check } from "lucide-react";
import { useFavoritesStore } from "@/lib/store/favorites.store";

interface FavoriteCollectionPickerProps {
    pokemonId: number;
    collectionIds: string[];
    onCreateCollection?: () => void;
}

export function FavoriteCollectionPicker({
    pokemonId, collectionIds, onCreateCollection
}: FavoriteCollectionPickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { collections, addToCollection, removeFromCollection } = useFavoritesStore();
    const userCollections = collections.filter((c) => !c.isDefault);

    const toggle = (colId: string) => {
        if (collectionIds.includes(colId)) {
            removeFromCollection(pokemonId, colId);
        } else {
            addToCollection(pokemonId, colId);
        }
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="font-press-start text-[7px] px-2 py-1 border-2 border-[#111111] bg-white flex items-center gap-1 hover:bg-[#F5F5F5]"
            >
                Colecciones <ChevronDown size={8} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                        <motion.div
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            className="absolute left-0 top-full mt-1 z-50 bg-white border-2 border-[#111111] min-w-[180px]"
                            style={{ boxShadow: "4px 4px 0 #111111" }}
                        >
                            {userCollections.length === 0 ? (
                                <p className="font-nunito text-[12px] text-[#AAAAAA] px-3 py-2">Sin colecciones</p>
                            ) : (
                                userCollections.map((col) => {
                                    const inCol = collectionIds.includes(col.id);
                                    return (
                                        <button
                                            key={col.id}
                                            onClick={() => toggle(col.id)}
                                            className="w-full text-left flex items-center justify-between px-3 py-2 hover:bg-[#F5F5F5] border-b border-[#F5F5F5]"
                                        >
                                            <div className="flex items-center gap-2">
                                                <span
                                                    className="w-2.5 h-2.5 rounded-sm"
                                                    style={{ backgroundColor: col.color }}
                                                />
                                                <span className="font-nunito text-[12px] text-[#333333]">{col.name}</span>
                                            </div>
                                            {inCol && <Check size={11} className="text-[#CC0000]" />}
                                        </button>
                                    );
                                })
                            )}
                            {onCreateCollection && (
                                <button
                                    onClick={() => { setIsOpen(false); onCreateCollection(); }}
                                    className="w-full flex items-center gap-1.5 px-3 py-2 font-press-start text-[7px] text-[#888888] hover:text-[#CC0000] hover:bg-[#F5F5F5]"
                                >
                                    <Plus size={9} /> Nueva colección
                                </button>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
