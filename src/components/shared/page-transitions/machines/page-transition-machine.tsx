"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PageTransitionMachineProps {
  typeColor:  string;
  moveNameEs: string;
  tmLabel:    string;  // "TM26"
}

export function PageTransitionMachine({ typeColor, moveNameEs, tmLabel }: PageTransitionMachineProps) {
  const [phase, setPhase] = useState<"in" | "exit" | "done">("in");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("exit"), 640);
    const t2 = setTimeout(() => setPhase("done"), 1000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (phase === "done") return null;

  const letters = moveNameEs.toUpperCase().split("");

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[200] bg-[#111111] flex flex-col items-center justify-center overflow-hidden pointer-events-none"
        exit={{ y: "-100%" }}
        transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        />

        {/* Badge TM cae desde arriba */}
        <motion.div
          className="mb-6 px-6 py-3 border-2 border-[#111111]"
          style={{ backgroundColor: typeColor, boxShadow: "3px 3px 0 rgba(255,255,255,0.2)" }}
          initial={{ y: -60, opacity: 0, scale: 0.8 }}
          animate={{ y: 0,   opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
        >
          <span className="font-press-start text-[18px] text-white">{tmLabel}</span>
        </motion.div>

        {/* Nombre del movimiento letra por letra */}
        <div className="flex flex-wrap justify-center gap-x-2 px-8 z-10">
          {letters.map((char, i) => (
            <motion.span
              key={i}
              className="font-press-start"
              style={{
                fontSize:   `clamp(20px, ${Math.max(3.5, 7 - letters.length * 0.2)}vw, 44px)`,
                color:      char === " " ? "transparent" : "#ffffff",
                textShadow: `0 0 24px ${typeColor}66`,
              }}
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0,   opacity: 1 }}
              transition={{ type: "spring", stiffness: 280, damping: 22, delay: 0.1 + i * 0.04 }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </div>

        {/* Barra horizontal del typeColor que crece */}
        <motion.div
          className="absolute bottom-[30%] left-0 h-[2px]"
          style={{ backgroundColor: typeColor }}
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
        />

        {/* Label TMs */}
        <motion.p
          className="absolute bottom-[13%] font-nunito text-[13px] tracking-[4px] uppercase"
          style={{ color: "rgba(255,255,255,0.3)" }}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        >
          Movimiento por TM
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
}