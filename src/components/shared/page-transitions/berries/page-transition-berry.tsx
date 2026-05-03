"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface PageTransitionBerryProps {
  spriteSrc: string;
  flavorColor: string;
}

export function PageTransitionBerry({ spriteSrc, flavorColor }: PageTransitionBerryProps) {
  const [phase, setPhase] = useState<"in" | "out" | "done">("in");

  useEffect(() => {
    // Phase 1 (in): circle grows + sprite "eaten" — 0→700ms
    // Phase 2 (out): circle shrinks away — 700→1300ms
    const t1 = setTimeout(() => setPhase("out"), 700);
    const t2 = setTimeout(() => setPhase("done"), 1300);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="berry-detail-transition"
          className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Expanding circle from center */}
          <motion.div
            className="absolute rounded-full"
            style={{ backgroundColor: flavorColor }}
            initial={{ width: 0, height: 0 }}
            animate={
              phase === "in"
                ? { width: "250vmax", height: "250vmax" }
                : { width: 0, height: 0 }
            }
            transition={
              phase === "in"
                ? { duration: 0.55, ease: [0.76, 0, 0.24, 1] }
                : { duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: 0.05 }
            }
          />

          {/* Sprite — "eaten" while circle is full */}
          {spriteSrc && (
            <motion.div className="relative z-10 flex items-center justify-center">
              <motion.img
                src={spriteSrc}
                alt=""
                className="w-[72px] h-[72px]"
                style={{ imageRendering: "pixelated" }}
                initial={{ scale: 1, opacity: 0, filter: "blur(0px)" }}
                animate={
                  phase === "in"
                    ? { scale: [0, 1.1, 1], opacity: [0, 1, 1], filter: "blur(0px)" }
                    : { scale: [1, 1.4, 0], opacity: [1, 1, 0], filter: ["blur(0px)", "blur(0px)", "blur(8px)"] }
                }
                transition={{
                  duration: phase === "in" ? 0.5 : 0.45,
                  ease: "easeInOut",
                }}
              />

              {/* Bite particles */}
              {phase === "out" &&
                Array.from({ length: 6 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full"
                    style={{ backgroundColor: flavorColor, border: "2px solid #fff" }}
                    initial={{ scale: 0, x: 0, y: 0 }}
                    animate={{
                      scale: [0, 1, 0],
                      x: Math.cos((i / 6) * Math.PI * 2) * 40,
                      y: Math.sin((i / 6) * Math.PI * 2) * 40,
                      opacity: [0, 1, 0],
                    }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                  />
                ))}
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}