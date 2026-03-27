"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface FavoriteRatingProps {
    rating:   number;
    onRate?:  (rating: number) => void;
    size?:    "sm" | "md";
    readOnly?: boolean;
}

const LABELS = ["", "Una estrella", "Bueno", "Genial", "Increíble", "Legendario!"];

export function FavoriteRating({ rating, onRate, size = "md", readOnly = false }: FavoriteRatingProps) {
    const [hover, setHover] = useState(0);
    const starSize = size === "sm" ? "text-[12px]" : "text-[18px]";

    const handleClick = (i: number) => {
        if (readOnly || !onRate) return;
        onRate(rating === i ? 0 : i); // click en la misma estrella = limpiar rating
    };

    return (
        <div
            className="flex items-center gap-0.5"
            onMouseLeave={() => setHover(0)}
            title={LABELS[hover] || LABELS[rating] || "Sin rating"}
        >
            {[1,2,3,4,5].map((i) => {
                const filled = (hover || rating) >= i;
                return (
                    <motion.button
                        key={i}
                        type="button"
                        disabled={readOnly}
                        onClick={() => handleClick(i)}
                        onMouseEnter={() => !readOnly && setHover(i)}
                        className={`${starSize} leading-none ${readOnly ? "cursor-default" : "cursor-pointer"}`}
                        style={{ color: filled ? "#F59E0B" : "#DDDDDD" }}
                        whileTap={!readOnly ? { scale: 1.3 } : {}}
                        transition={{ duration: 0.15 }}
                    >
                        ★
                    </motion.button>
                );
            })}
        </div>
    );
}
