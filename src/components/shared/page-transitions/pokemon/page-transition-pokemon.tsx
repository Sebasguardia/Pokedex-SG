"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { PokeBallSVG } from "../../icons/pokeball-svg";

interface PageTransitionPokemonProps {
  spriteSrc?: string;
  typeColor?: string;
  isLoading?: boolean;
}

export function PageTransitionPokemon({ spriteSrc, typeColor, isLoading = false }: PageTransitionPokemonProps) {
  const [phase, setPhase] = useState<"in" | "out" | "done">("in");
  const [minTimePassed, setMinTimePassed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMinTimePassed(true), 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (minTimePassed && !isLoading && phase === "in") {
      setPhase("out");
      const t = setTimeout(() => setPhase("done"), 600);
      return () => clearTimeout(t);
    }
  }, [minTimePassed, isLoading, phase]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="pokemon-detail-transition"
          className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Background circular reveal */}
          <motion.div
            className="absolute rounded-full"
            style={{ backgroundColor: typeColor || "#CC0000" }}
            initial={{ width: 0, height: 0 }}
            animate={
              phase === "in"
                ? { width: "250vmax", height: "250vmax" }
                : { width: 0, height: 0 }
            }
            transition={{
              duration: 0.65,
              ease: [0.76, 0, 0.24, 1],
              delay: phase === "out" ? 0.05 : 0
            }}
          />

          {/* Central Logo / Sprite Context */}
          <div className="relative z-10 flex flex-col items-center gap-6">
              {/* Spinning Pokeball Background */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: phase === "in" ? 1 : 0, rotate: 0 }}
                transition={{ duration: 0.5, ease: "backOut" }}
                className="absolute inset-0 flex items-center justify-center opacity-10"
              >
                 <PokeBallSVG size={300} />
              </motion.div>

              {/* Pokemon Sprite */}
              {spriteSrc && (
                <motion.div className="relative">
                  <motion.img
                    src={spriteSrc}
                    alt=""
                    className="w-[120px] h-[120px] relative z-20"
                    style={{ imageRendering: "pixelated" }}
                    initial={{ scale: 0, y: 40, opacity: 0 }}
                    animate={
                      phase === "in"
                        ? { scale: 1, y: 0, opacity: 1 }
                        : { scale: 1.5, y: -40, opacity: 0, filter: "blur(10px)" }
                    }
                    transition={{
                      duration: 0.5,
                      ease: [0.34, 1.56, 0.64, 1],
                    }}
                  />
                  
                  {/* Digital Ring */}
                  {phase === "in" && (
                    <motion.div 
                        className="absolute -inset-4 border-2 border-white/40 rounded-full"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    />
                  )}
                </motion.div>
              )}

              {/* Scanning Text */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={phase === "in" ? { opacity: 1, y: 0 } : { opacity: 0 }}
                className="bg-black/20 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full"
              >
                <span className="font-press-start text-[10px] text-white flex items-center gap-2">
                  <motion.span 
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-red-500"
                  />
                  DATA SCANNING...
                </span>
              </motion.div>
          </div>

          {/* Top/Bottom Horizontal Shutter (Quick flash) */}
          <motion.div 
            className="absolute top-0 left-0 w-full bg-[#111111] z-50 pointer-events-none"
            initial={{ height: "0%" }}
            animate={phase === "in" ? { height: ["0%", "50%", "0%"] } : { height: "0%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-0 left-0 w-full bg-[#111111] z-50 pointer-events-none"
            initial={{ height: "0%" }}
            animate={phase === "in" ? { height: ["0%", "50%", "0%"] } : { height: "0%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />

        </motion.div>
      )}
    </AnimatePresence>
  );
}
