"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { FLAVOR_COLORS } from "@/lib/constants/berries/berries.constants";

const SPROUT_COLORS = Object.values(FLAVOR_COLORS);

// A single sprout at the bottom edge
function Sprout({ x, color, delay }: { x: number; color: string; delay: number }) {
  return (
    <motion.div
      className="absolute bottom-0 flex flex-col items-center"
      style={{ left: `${x}%` }}
      initial={{ y: 0, opacity: 1 }}
      animate={{ y: [-0, -60, -80, 20], opacity: [0, 1, 1, 0] }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Stem */}
      <motion.div
        className="w-[2px] origin-bottom"
        style={{ backgroundColor: "#16A34A", height: 32 }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: [0, 1, 1, 0] }}
        transition={{ duration: 0.9, delay, ease: "easeOut" }}
      />
      {/* Bud */}
      <motion.div
        className="w-3 h-3 rounded-full -mt-1"
        style={{ backgroundColor: color }}
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1, 0] }}
        transition={{ duration: 0.8, delay: delay + 0.15 }}
      />
    </motion.div>
  );
}

export function PageTransitionBerries() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 1400);
    return () => clearTimeout(t);
  }, []);

  const sprouts = Array.from({ length: 8 }, (_, i) => ({
    x: 8 + i * 11.5,
    color: SPROUT_COLORS[i % SPROUT_COLORS.length],
    delay: 0.25 + i * 0.07,
  }));

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="berry-list-transition"
          className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, delay: 1.1 }}
        >
          {/* Earth panel rising from bottom */}
          <motion.div
            className="absolute bottom-0 left-0 w-full border-t-4 border-[#111111]"
            style={{ backgroundColor: "#78350F" }}
            initial={{ height: "100%" }}
            animate={{ height: "0%" }}
            transition={{ duration: 0.7, delay: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Soil texture dots */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: "radial-gradient(circle, #92400E 1px, transparent 1px)",
                backgroundSize: "18px 18px",
              }}
            />
          </motion.div>

          {/* Sprouts emerging from bottom edge */}
          <div className="absolute bottom-0 left-0 w-full h-[100px] overflow-hidden">
            {sprouts.map((s, i) => (
              <Sprout key={i} {...s} />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}