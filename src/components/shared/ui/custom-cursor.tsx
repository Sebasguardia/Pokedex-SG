"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils/cn";

export function CustomCursor() {
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);
    const [isHovering, setIsHovering] = useState(false);
    const [isFinePointer, setIsFinePointer] = useState(false);
    const prefersReduced = useReducedMotion();

    useEffect(() => {
        if (window.matchMedia("(pointer: fine)").matches) {
            setIsFinePointer(true);
        }

        const onMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);

            const target = e.target as HTMLElement;
            // Check if we are hovering something clickable or interactive
            const isInteractive = target.closest('a, button, [role="button"], input, [data-cursor="hover"]');
            setIsHovering(!!isInteractive);
        };

        window.addEventListener("mousemove", onMouseMove);
        return () => window.removeEventListener("mousemove", onMouseMove);
    }, [mouseX, mouseY]);

    const springX = useSpring(mouseX, { stiffness: 500, damping: 28 });
    const springY = useSpring(mouseY, { stiffness: 500, damping: 28 });

    if (!isFinePointer || prefersReduced) return null;

    return (
        <motion.div
            className={cn(
                "fixed top-0 left-0 pointer-events-none z-[9999] w-5 h-5 rounded-full border-2 border-gray-900 bg-white flex items-center justify-center -ml-2.5 -mt-2.5 transition-colors duration-200",
                isHovering ? "bg-poke-red border-poke-red" : ""
            )}
            style={{ x: springX, y: springY }}
            animate={{ scale: isHovering ? 1.8 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            {/* Inner dot of the pokeball cursor */}
            <div className="w-1.5 h-1.5 rounded-full bg-white border border-gray-900" />
        </motion.div>
    );
}
