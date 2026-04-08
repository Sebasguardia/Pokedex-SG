"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit2, Check, X } from "lucide-react";
import { useFavoritesStore } from "@/lib/store/favorites.store";
import { MAX_NOTE_LENGTH } from "@/lib/constants/favorites.constants";

interface FavoriteNoteEditorProps {
    pokemonId: number;
    note:      string;
}

export function FavoriteNoteEditor({ pokemonId, note }: FavoriteNoteEditorProps) {
    const { updateNote } = useFavoritesStore();
    const [isEditing, setIsEditing] = useState(false);
    const [draft, setDraft] = useState(note);
    const [saved, setSaved] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const autoSaveTimer = useRef<ReturnType<typeof setTimeout>>();

    useEffect(() => {
        if (isEditing && textareaRef.current) {
            textareaRef.current.focus();
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [isEditing]);

    const handleChange = (v: string) => {
        setDraft(v.slice(0, MAX_NOTE_LENGTH));
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
        clearTimeout(autoSaveTimer.current);
        autoSaveTimer.current = setTimeout(() => {
            updateNote(pokemonId, v);
            setSaved(true);
            setTimeout(() => setSaved(false), 1500);
        }, 2000);
    };

    const handleSave = () => {
        clearTimeout(autoSaveTimer.current);
        updateNote(pokemonId, draft);
        setIsEditing(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 1500);
    };

    const handleCancel = () => {
        setDraft(note);
        setIsEditing(false);
        clearTimeout(autoSaveTimer.current);
    };

    return (
        <div className="w-full">
            {!isEditing ? (
                <div
                    className="group flex items-start gap-1 cursor-pointer"
                    onClick={() => setIsEditing(true)}
                >
                    {note ? (
                        <p className="font-nunito text-[12px] text-[#888888] italic line-clamp-2 flex-1">
                            "{note}"
                        </p>
                    ) : (
                        <p className="font-nunito text-[11px] text-[#CCCCCC] italic flex-1">
                            Añadir una nota...
                        </p>
                    )}
                    <Edit2 size={10} className="text-[#CCCCCC] opacity-0 group-hover:opacity-100 mt-0.5 shrink-0 transition-opacity" />
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-1.5"
                >
                    <textarea
                        ref={textareaRef}
                        value={draft}
                        onChange={(e) => handleChange(e.target.value)}
                        placeholder="Escribe tu nota..."
                        maxLength={MAX_NOTE_LENGTH}
                        className="w-full font-nunito text-[12px] px-2 py-1.5 border-2 border-[#111111] focus:border-[#CC0000] outline-none resize-none min-h-[56px] bg-white"
                    />
                    <div className="flex items-center justify-between">
                        <span className="font-nunito text-[10px] text-[#BBBBBB]">
                            {draft.length}/{MAX_NOTE_LENGTH}
                        </span>
                        <div className="flex items-center gap-1">
                            <button title="Botón" aria-label="Botón" onClick={handleCancel} className="font-press-start text-[7px] px-2 py-1 border border-[#DDDDDD] text-[#888888] hover:text-[#CC0000]">
                                <X size={9} />
                            </button>
                            <button title="Botón" aria-label="Botón" onClick={handleSave} className="font-press-start text-[7px] px-2 py-1 bg-[#CC0000] text-white border border-[#CC0000]">
                                <Check size={9} />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
            <AnimatePresence>
                {saved && (
                    <motion.p
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="font-nunito text-[10px] text-green-500"
                    >
                        Nota guardada ✓
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
}
