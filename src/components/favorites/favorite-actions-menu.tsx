"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoreVertical, FileText, Star, Tag, FolderPlus, Pin, ExternalLink, Trash2 } from "lucide-react";
import Link from "next/link";
import { FavoritePokemon } from "@/types/api/favorites.types";
import { useFavoritesStore } from "@/lib/store/favorites.store";
import { FavoriteNoteEditor } from "./favorite-note-editor";
import { FavoriteRating } from "./favorite-rating";
import { FavoriteTagEditor } from "./favorite-tag-editor";

interface FavoriteActionsMenuProps {
    pokemon: FavoritePokemon;
    onCreateCollection?: () => void;
}

export function FavoriteActionsMenu({ pokemon, onCreateCollection }: FavoriteActionsMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [editNotes, setEditNotes] = useState(false);
    const [editTags, setEditTags] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const { removeFavorite, toggleHighlight, updateRating } = useFavoritesStore();

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setIsOpen(false);
                setEditNotes(false);
                setEditTags(false);
            }
        };
        if (isOpen) document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [isOpen]);

    const handleDelete = () => {
        if (confirm(`¿Eliminar ${pokemon.nameEs} de favoritos?`)) {
            removeFavorite(pokemon.id);
        }
        setIsOpen(false);
    };

    return (
        <div ref={menuRef} className="relative">
            <button
                onClick={(e) => { e.stopPropagation(); setIsOpen((p) => !p); }}
                className="w-6 h-6 flex items-center justify-center text-[#CCCCCC] hover:text-[#111111] transition-colors"
                aria-label="Menú de acciones"
                aria-expanded={isOpen ? "true" : "false"}
            >
                <MoreVertical size={13} aria-hidden="true" />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -4 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -4 }}
                        transition={{ duration: 0.12 }}
                        className="absolute right-0 top-full mt-1 z-50 bg-white border-2 border-[#111111] w-52 shadow-[4px_4px_0_#111111]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Note editor inline */}
                        {editNotes ? (
                            <div className="p-3">
                                <p className="font-press-start text-[7px] text-[#888888] mb-2">NOTA</p>
                                <FavoriteNoteEditor pokemonId={pokemon.id} note={pokemon.note} />
                                <button onClick={() => setEditNotes(false)}
                                    className="mt-1 font-press-start text-[7px] text-[#CC0000]">Cerrar</button>
                            </div>
                        ) : editTags ? (
                            <div className="p-3">
                                <p className="font-press-start text-[7px] text-[#888888] mb-2">TAGS</p>
                                <FavoriteTagEditor pokemonId={pokemon.id} tags={pokemon.tags} />
                                <button onClick={() => setEditTags(false)}
                                    className="mt-1 font-press-start text-[7px] text-[#CC0000]">Cerrar</button>
                            </div>
                        ) : (
                            <div className="py-1">
                                <MenuItem Icon={FileText} label="Editar nota" onClick={() => setEditNotes(true)} />
                                <div className="px-3 py-2 border-b border-[#F5F5F5]">
                                    <p className="font-press-start text-[7px] text-[#888888] mb-1.5">RATING</p>
                                    <FavoriteRating rating={pokemon.rating}
                                        onRate={(r) => { updateRating(pokemon.id, r); }} size="sm" />
                                </div>
                                <MenuItem Icon={Tag} label="Gestionar tags" onClick={() => setEditTags(true)} />

                                <div className="border-t border-[#F5F5F5] my-1" />

                                <MenuItem
                                    Icon={Pin}
                                    label={pokemon.isHighlighted ? "Quitar destaque" : "Destacar"}
                                    onClick={() => { toggleHighlight(pokemon.id); setIsOpen(false); }}
                                />
                                <Link href={`/pokemon/${pokemon.name}`} onClick={() => setIsOpen(false)}>
                                    <MenuItem Icon={ExternalLink} label="Ver en Pokédex" onClick={() => {}} />
                                </Link>
                                <Link href={`/compare?p1=${pokemon.name}`} onClick={() => setIsOpen(false)}>
                                    <MenuItem Icon={ExternalLink} label="Comparar" onClick={() => {}} />
                                </Link>

                                <div className="border-t border-[#F5F5F5] my-1" />

                                <MenuItem Icon={Trash2} label="Eliminar" onClick={handleDelete} danger />
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function MenuItem({
    Icon, label, onClick, danger = false,
}: {
    Icon: React.ComponentType<{ size?: number | string; className?: string }>;
    label: string; onClick: () => void; danger?: boolean;
}) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-2.5 px-3 py-2 font-nunito text-[12px] transition-colors ${
                danger ? "text-[#CC0000] hover:bg-[#CC000008]" : "text-[#333333] hover:bg-[#F5F5F5]"
            }`}
        >
            <Icon size={12} className={danger ? "text-[#CC0000]" : "text-[#888888]"} />
            {label}
        </button>
    );
}
