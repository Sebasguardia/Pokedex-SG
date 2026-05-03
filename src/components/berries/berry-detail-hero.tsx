"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Sprout, Gem, Sparkles, Leaf } from "lucide-react";
import Link from "next/link";
import { BerryFlavorChip } from "./berry-flavor-chip";
import { FIRMNESS_COLORS } from "@/lib/constants/berries/berries.constants";

interface BerryDetailHeroProps {
  berry: any;
  dominantFlavor: any;
  flavorColor: string;
  heroGradient: string;
}

function FloatingLeaf({ x, y, size, opacity, duration, delay, rotateDelta }: {
  x: number; y: number; size: number; opacity: number;
  duration: number; delay: number; rotateDelta: number;
}) {
  return (
    <motion.div
      className="absolute pointer-events-none select-none"
      style={{ left: `${x}%`, top: `${y}%`, opacity }}
      animate={{ y: [0, -30, 0], x: [0, rotateDelta > 0 ? 12 : -12, 0], rotate: [0, rotateDelta, 0] }}
      transition={{ duration, delay, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
    >
      <Leaf size={size} className="text-[#16A34A]" />
    </motion.div>
  );
}

export function BerryDetailHero({ berry, dominantFlavor, flavorColor, heroGradient }: BerryDetailHeroProps) {
  const prefersRM = useReducedMotion();
  const spriteSrc: string = berry.item?.sprites?.default ?? "";
  const nameParts: string[] = `BAYA ${berry.name.toUpperCase()}`.split(" ");
  const flavorName: string = dominantFlavor?.flavor.name ?? "spicy";

  const spriteDuration = flavorName === "spicy" ? 2 : flavorName === "dry" ? 5 : flavorName === "sweet" ? 2.5 : 3;

  const leaves = Array.from({ length: 12 }, (_, i) => ({
    x: (i * 37 + 5) % 95,
    y: (i * 53 + 10) % 85,
    size: 10 + (i % 3) * 4,
    opacity: 0.06 + (i % 3) * 0.015,
    duration: 4 + (i % 4),
    delay: (i * 0.4) % 4,
    rotateDelta: i % 2 === 0 ? 20 : -20,
  }));

  return (
    <section className="relative bg-[#111111] pt-16 pb-20 overflow-hidden">
      {/* Double separator at bottom — inverted (red then black) */}
      <div className="absolute bottom-0 left-0 w-full z-20">
        <div className="h-[3px] w-full bg-[#CC0000]" />
        <div className="h-[2px] w-full bg-[#111111]" />
      </div>

      {/* BG: dot grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "32px 32px" }}
      />

      {/* BG: flavor tint scanline */}
      <motion.div
        className="absolute h-[1px] w-full z-10 pointer-events-none"
        style={{ background: `linear-gradient(90deg, transparent, ${flavorColor}66, transparent)` }}
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 5 }}
      />

      {/* BG: giant ID watermark */}
      <div className="absolute -bottom-10 -right-10 text-white opacity-[0.03] pointer-events-none font-jetbrains font-bold text-[200px] leading-none select-none">
        #{String(berry.id).padStart(2, "0")}
      </div>

      {/* BG: floating leaves */}
      {!prefersRM && leaves.map((l, i) => <FloatingLeaf key={i} {...l} />)}

      {/* CONTENT */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <div className="font-nunito text-[12px] text-white/45 mb-8">
          <Link href="/berries" className="hover:text-white hover:underline transition-colors decoration-[#CC0000]">
            Bayas
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white font-bold capitalize">Baya {berry.name}</span>
        </div>

        <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">

          {/* LEFT: Sprite */}
          <div className="flex flex-col items-center gap-4">
            <div
              className="w-[120px] h-[120px] md:w-[150px] md:h-[150px] border-2 border-white/20 flex items-center justify-center relative overflow-hidden"
              style={{ backgroundColor: "rgba(255,255,255,0.07)", backdropFilter: "blur(4px)" }}
            >
              {spriteSrc && (
                <motion.img
                  src={spriteSrc}
                  alt={`Baya ${berry.name}`}
                  className="w-[80px] h-[80px] md:w-[100px] md:h-[100px]"
                  style={{ imageRendering: "pixelated", filter: `drop-shadow(0 4px 12px ${flavorColor}66)` }}
                  animate={prefersRM ? {} : flavorName === "sweet"
                    ? { y: [0, -8, -2, -6, 0], rotate: [-3, 3, -3] }
                    : { y: [0, -4, 0], rotate: [-3, 3, -3] }}
                  transition={{ duration: spriteDuration, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
            </div>
            <span className="font-jetbrains text-[10px] text-white/40">
              #{String(berry.id).padStart(2, "0")} · MAX {berry.max_harvest}
            </span>
          </div>

          {/* RIGHT: Info */}
          <div className="flex flex-col gap-4 flex-1">
            {/* Flavor chips */}
            <div className="flex flex-wrap gap-2">
              {berry.flavors
                .filter((fl: any) => fl.potency > 0)
                .map((fl: any, i: number) => (
                  <BerryFlavorChip key={fl.flavor.name} flavor={fl.flavor.name} value={fl.potency} index={i} dark />
                ))}
            </div>

            {/* Name — each word falls with alternating rotate */}
            <h1 className="font-press-start text-2xl sm:text-4xl text-white tracking-widest flex flex-wrap gap-x-[0.25em]">
              {nameParts.map((part, i) => (
                <motion.span
                  key={i}
                  initial={prefersRM ? { opacity: 0 } : { y: -24, opacity: 0, rotate: i % 2 === 0 ? -10 : 10 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  transition={prefersRM
                    ? { duration: 0.3, delay: i * 0.1 }
                    : { type: "spring", stiffness: 300, damping: 22, delay: 0.1 + i * 0.15 }}
                >
                  {part}
                </motion.span>
              ))}
            </h1>

            {/* Quick stats */}
            <motion.div
              className="flex flex-wrap gap-2"
              initial="hidden" animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.08 } }, hidden: {} }}
            >
              {[
                { icon: Sprout, label: `Crece: ${berry.growth_time}h` },
                { icon: Gem, label: `Firmeza: ${berry.firmness.name.replace(/-/g, " ")}` },
                { icon: Sparkles, label: `Smoothness: ${berry.smoothness}` },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  variants={{ hidden: { y: 8, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/15 font-nunito font-bold text-[11px] text-white capitalize"
                >
                  <stat.icon size={12} className="text-white/60" />
                  {stat.label}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}