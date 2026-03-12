"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { PokeBallSVG } from "./pokeball-svg";

export function PageTransitionPokemons() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="pokedex-list-transition"
          className="fixed inset-0 z-[9999] pointer-events-none flex flex-col"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.8 }}
        >
          {/* Top Panel (Red Pokedex Cover) */}
          <motion.div
            className="flex-1 bg-[#CC0000] relative border-b-4 border-[#111111] overflow-hidden"
            initial={{ y: 0 }}
            animate={{ y: "-100%" }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
             {/* Tech Grid Texture */}
             <div className="absolute inset-0 opacity-10" style={{ 
               backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", 
               backgroundSize: "40px 40px" 
             }} />
          </motion.div>

          {/* Bottom Panel (White Pokeball Bottom) */}
          <motion.div
            className="flex-1 bg-white relative border-t-4 border-[#111111] overflow-hidden"
            initial={{ y: 0 }}
            animate={{ y: "100%" }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
             {/* Tech Grid Texture (Darker for visibility on white) */}
             <div className="absolute inset-0 opacity-[0.05]" style={{ 
               backgroundImage: "linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)", 
               backgroundSize: "40px 40px" 
             }} />
          </motion.div>

          {/* Center Circular Scanner / Pokeball */}
          <div className="absolute inset-0 flex items-center justify-center">
             <motion.div
               className="w-40 h-40 bg-[#111111] rounded-full border-8 border-white flex items-center justify-center relative z-20 shadow-2xl"
               initial={{ scale: 1, rotate: 0 }}
               animate={{ scale: [1, 1.2, 0], rotate: 180 }}
               transition={{ duration: 0.8, delay: 0.4, ease: "backIn" }}
             >
                <div className="text-white opacity-20">
                   <PokeBallSVG size={80} />
                </div>
                {/* Scanner Lens Effect */}
                <motion.div 
                  className="absolute inset-2 rounded-full border-2 border-blue-400/30"
                  animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.9, 1.1, 0.9] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
             </motion.div>
          </div>

          {/* Side Scanlines */}
          <motion.div 
            className="absolute left-0 w-1 bg-blue-400 shadow-[0_0_15px_blue] z-30"
            initial={{ height: 0, top: "50%" }}
            animate={{ height: "100%", top: "0%" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
          <motion.div 
            className="absolute right-0 w-1 bg-blue-400 shadow-[0_0_15px_blue] z-30"
            initial={{ height: 0, top: "50%" }}
            animate={{ height: "100%", top: "0%" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          />

        </motion.div>
      )}
    </AnimatePresence>
  );
}
