"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Link from "next/link";

interface FavoritesEmptyStateProps {
    pokedexHref?: string;
}

export function FavoritesEmptyState({ pokedexHref = "/pokemon" }: FavoritesEmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
            {/* Animated heart */}
            <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
            >
                <div className="w-28 h-28 bg-[#111111] flex items-center justify-center"
                    style={{ boxShadow: "6px 6px 0 #CC0000" }}>
                    <Heart size={52} className="text-[#CC0000]" fill="#CC0000" />
                </div>
            </motion.div>

            {/* Text */}
            <div className="text-center space-y-3">
                <h2 className="font-press-start text-[16px] text-[#111111] uppercase">
                    Sin favoritos
                </h2>
                <p className="font-nunito text-[15px] text-[#888888] max-w-xs">
                    Explora la Pokédex y marca tus Pokémon favoritos con el botón de corazón ♥
                </p>
            </div>

            {/* CTA */}
            <Link href={pokedexHref}>
                <motion.button
                    className="font-press-start text-[10px] px-6 py-3 bg-[#CC0000] text-white border-2 border-[#111111]"
                    style={{ boxShadow: "4px 4px 0 #111111" }}
                    whileHover={{ x: 2, y: 2, boxShadow: "2px 2px 0 #111111" }}
                    whileTap={{ scale: 0.97 }}
                >
                    Ir a la Pokédex
                </motion.button>
            </Link>
        </div>
    );
}
