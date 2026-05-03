"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── TRANSICIÓN LISTA /machines ─────────────────────────────────────────────

export function PageTransitionMachines() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 1050);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] bg-[#111111] flex items-center justify-center pointer-events-none overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.65 }}
        >
          {/* Dot grid */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "28px 28px" }}
          />

          {/* Disco TM girando */}
          <motion.div
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <svg viewBox="0 0 100 100" width="90" height="90">
              <circle cx="50" cy="50" r="48" fill="#CC0000" stroke="#ffffff" strokeWidth="2" strokeOpacity="0.3"/>
              <circle cx="50" cy="50" r="26" fill="#111111"/>
              <circle cx="50" cy="50" r="18" fill="#222222"/>
              <circle cx="50" cy="50" r="6"  fill="#888888"/>
              {/* Líneas radiales */}
              {[0,45,90,135].map((deg) => (
                <line
                  key={deg}
                  x1="50" y1="28" x2="50" y2="72"
                  stroke="rgba(255,255,255,0.1)" strokeWidth="1"
                  transform={`rotate(${deg} 50 50)`}
                />
              ))}
              <text x="50" y="55" textAnchor="middle" fontSize="10" fill="white" fontFamily="monospace" fontWeight="bold">
                TM
              </text>
            </svg>
          </motion.div>

          {/* Label */}
          <motion.p
            className="absolute bottom-[13%] font-press-start text-[11px] text-white/50 tracking-widest"
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          >
            TMs Y MÁQUINAS
          </motion.p>

          {/* Panel que sube al exit */}
          <motion.div
            className="absolute inset-0 bg-[#111111] z-10"
            exit={{ y: "-100%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}