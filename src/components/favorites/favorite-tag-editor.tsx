"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus } from "lucide-react";
import { useFavoritesStore } from "@/lib/store/favorites.store";
import { useAllTags } from "@/lib/hooks/favorites/useFavorites";
import { MAX_TAGS_PER_POKEMON } from "@/lib/constants/favorites/favorites.constants";

interface FavoriteTagEditorProps {
    pokemonId: number;
    tags:      string[];
}

const SUGGESTED_TAGS = ["competitivo", "historia", "favorito", "shiny", "raro"];

export function FavoriteTagEditor({ pokemonId, tags }: FavoriteTagEditorProps) {
    const { addTag, removeTag } = useFavoritesStore();
    const allTags = useAllTags();
    const [inputVal, setInputVal] = useState("");
    const [isAdding, setIsAdding] = useState(false);
    const [error, setError] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const suggestions = [...new Set([
        ...SUGGESTED_TAGS,
        ...allTags,
    ])].filter((t) => !tags.includes(t) && t.includes(inputVal.toLowerCase())).slice(0, 5);

    const handleAdd = (val: string) => {
        const trimmed = val.trim().toLowerCase();
        if (!trimmed) return;
        if (tags.includes(trimmed)) {
            setError("Ya existe");
            setTimeout(() => setError(""), 1500);
            return;
        }
        if (tags.length >= MAX_TAGS_PER_POKEMON) {
            setError(`Máximo ${MAX_TAGS_PER_POKEMON} tags`);
            setTimeout(() => setError(""), 1500);
            return;
        }
        addTag(pokemonId, trimmed);
        setInputVal("");
        setIsAdding(false);
    };

    return (
        <div className="flex flex-wrap gap-1.5 items-center">
            {tags.map((tag) => (
                <motion.div
                    key={tag}
                    layout
                    className="flex items-center gap-1 bg-[#F5F5F5] border border-[#DDDDDD] px-1.5 py-0.5"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                >
                    <span className="font-nunito text-[11px] text-[#555555]">{tag}</span>
                    <button title="Botón" aria-label="Botón" onClick={() => removeTag(pokemonId, tag)} className="text-[#AAAAAA] hover:text-[#CC0000] ml-0.5">
                        <X size={8} />
                    </button>
                </motion.div>
            ))}

            {/* Add button / Input */}
            {!isAdding ? (
                tags.length < MAX_TAGS_PER_POKEMON && (
                    <button
                        onClick={() => { setIsAdding(true); setTimeout(() => inputRef.current?.focus(), 50); }}
                        className="flex items-center gap-0.5 font-nunito text-[11px] text-[#AAAAAA] border border-dashed border-[#CCCCCC] px-1.5 py-0.5 hover:border-[#CC0000] hover:text-[#CC0000] transition-colors"
                    >
                        <Plus size={9} /> tag
                    </button>
                )
            ) : (
                <div className="relative">
                    <input
                        ref={inputRef}
                        value={inputVal}
                        onChange={(e) => setInputVal(e.target.value.slice(0, 24))}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleAdd(inputVal);
                            if (e.key === "Escape") { setIsAdding(false); setInputVal(""); }
                        }}
                        onBlur={() => { if (!inputVal) setIsAdding(false); }}
                        placeholder="nuevo tag..."
                        className="font-nunito text-[11px] px-2 py-0.5 border-2 border-[#CC0000] outline-none w-28 bg-white"
                    />
                    {error && (
                        <p className="absolute -bottom-4 left-0 font-nunito text-[9px] text-[#CC0000]">{error}</p>
                    )}
                    {suggestions.length > 0 && inputVal && (
                        <div className="absolute top-full left-0 bg-white border-2 border-[#111111] z-20 w-36">
                            {suggestions.map((s) => (
                                <button key={s} onClick={() => handleAdd(s)}
                                    className="w-full text-left font-nunito text-[11px] px-2 py-1 hover:bg-[#F5F5F5] text-[#555555]">
                                    {s}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
