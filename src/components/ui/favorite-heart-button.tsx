"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Star, Bookmark } from "lucide-react";
import { useFavoritesStore, FavoritePokemonInput } from "@/lib/store/favorites.store";

interface FavoriteHeartButtonProps {
    pokemon: FavoritePokemonInput;
    size?:      "sm" | "md" | "lg";
    variant?:   "heart" | "star" | "bookmark";
    showLabel?: boolean;
    className?: string;
    onToast?:   (msg: string, type: "add" | "remove") => void;
}

const SIZES = {
    sm: { icon: 14, btn: "w-7 h-7",   text: "text-[9px]" },
    md: { icon: 18, btn: "w-9 h-9",   text: "text-[10px]" },
    lg: { icon: 22, btn: "w-11 h-11", text: "text-[11px]" },
};

const ICONS = { heart: Heart, star: Star, bookmark: Bookmark };

const PARTICLE_POSITIONS = [
    { x: -18, y: -18 }, { x: 18, y: -18 },
    { x: -22, y:   4 }, { x: 22, y:   4 },
    { x:   0, y: -24 },
];

export function FavoriteHeartButton({
    pokemon,
    size = "md",
    variant = "heart",
    showLabel = false,
    className = "",
    onToast,
}: FavoriteHeartButtonProps) {
    const { isFavorite, toggleFavorite } = useFavoritesStore();
    const isFav = isFavorite(pokemon.id);
    const [particles, setParticles] = useState(false);
    const [bounce, setBounce] = useState<"add" | "remove" | null>(null);

    const sz = SIZES[size];
    const Icon = ICONS[variant];

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const added = toggleFavorite(pokemon);
        setBounce(added ? "add" : "remove");
        setTimeout(() => setBounce(null), 400);

        if (added) {
            setParticles(true);
            setTimeout(() => setParticles(false), 700);
            onToast?.(`${pokemon.nameEs} añadido a favoritos`, "add");
        } else {
            onToast?.(`${pokemon.nameEs} eliminado de favoritos`, "remove");
        }
    };

    return (
        <div className={`relative inline-flex items-center gap-1 ${className}`}>
            <motion.button
                onClick={handleClick}
                className={`relative ${sz.btn} flex items-center justify-center rounded-none focus:outline-none`}
                animate={
                    bounce === "add"    ? { scale: [1, 1.45, 1] } :
                    bounce === "remove" ? { scale: [1, 0.8, 1]  } :
                    {}
                }
                transition={{ duration: 0.35, ease: "easeOut" }}
                aria-label={isFav ? `Quitar ${pokemon.nameEs} de favoritos` : `Añadir ${pokemon.nameEs} a favoritos`}
            >
                {/* Icon */}
                <Icon
                    size={sz.icon}
                    style={{
                        fill:   isFav ? "#CC0000" : "transparent",
                        stroke: isFav ? "#CC0000" : "#CCCCCC",
                        transition: "fill 0.2s, stroke 0.2s",
                    }}
                />

                {/* Pulse ring cuando es favorito */}
                {isFav && (
                    <motion.span
                        className="absolute inset-0 rounded-none border border-[#CC0000] opacity-0"
                        animate={{ scale: [0.9, 1.3], opacity: [0.4, 0] }}
                        transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 2 }}
                    />
                )}
            </motion.button>

            {/* Label */}
            {showLabel && (
                <span className={`font-press-start ${sz.text} ${isFav ? "text-[#CC0000]" : "text-[#AAAAAA]"}`}>
                    {isFav ? "Favorito" : "Añadir"}
                </span>
            )}

            {/* Partículas de corazón al añadir */}
            <AnimatePresence>
                {particles && PARTICLE_POSITIONS.map((pos, i) => (
                    <motion.span
                        key={i}
                        className="absolute pointer-events-none select-none text-[#CC0000] font-bold"
                        style={{ fontSize: 8 + Math.random() * 6, left: "50%", top: "50%" }}
                        initial={{ opacity: 1, x: 0, y: 0, scale: 0.6 }}
                        animate={{ opacity: 0, x: pos.x, y: pos.y, scale: 1.3 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.55, delay: i * 0.07, ease: "easeOut" }}
                    >
                        ♥
                    </motion.span>
                ))}
            </AnimatePresence>
        </div>
    );
}
