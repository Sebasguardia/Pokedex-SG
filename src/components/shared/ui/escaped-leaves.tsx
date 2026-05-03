"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

interface EscapedLeavesProps {
  flavorColor: string;
}

interface Leaf {
  id: number;
  x: number;   // vw %
  startY: number;   // vh % — start position (near hero bottom)
  endY: number;   // vh % — end position (below fold)
  rotate: number;
  scale: number;
  duration: number;
  delay: number;
  drift: number;   // horizontal drift in px
}

export function EscapedLeaves({ flavorColor }: EscapedLeavesProps) {
  const leaves: Leaf[] = useMemo(
    () =>
      Array.from({ length: 3 }, (_, i) => ({
        id: i,
        x: 10 + i * 35,
        startY: 15,
        endY: 110,
        rotate: (i % 2 === 0 ? 1 : -1) * (15 + i * 8),
        scale: 0.8 + i * 0.15,
        duration: 12 + i * 4,
        delay: i * 2.5,
        drift: (i % 2 === 0 ? 1 : -1) * (20 + i * 10),
      })),
    []
  );

  return (
    <>
      {leaves.map((leaf) => (
        <motion.div
          key={leaf.id}
          className="fixed z-0 pointer-events-none select-none text-[22px]"
          style={{
            left: `${leaf.x}vw`,
            top: `${leaf.startY}vh`,
            opacity: 0.04,
            scale: leaf.scale,
            color: flavorColor,
          }}
          animate={{
            y: [`${leaf.startY}vh`, `${leaf.endY}vh`],
            x: [0, leaf.drift, 0],
            rotate: [0, leaf.rotate, 0],
            opacity: [0, 0.04, 0.03, 0],
          }}
          transition={{
            duration: leaf.duration,
            delay: leaf.delay,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        >
          🍃
        </motion.div>
      ))}
    </>
  );
}