"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Disc } from "lucide-react";
import { MoveDetail } from "@/types/api/machine.types";
import {
  DAMAGE_CLASS_META, TYPE_NAMES_ES,
} from "@/lib/constants/machines/machines.constants";
import { MachineTypeBadge } from "./machine-type-badge";
import { useMachineItem } from "@/lib/hooks/moves/useMachines";

interface MachineDetailHeroProps {
  move:        MoveDetail;
  typeColor:   string;
  moveNameEs:  string;
  latestTM:    string;
}

function TMSprite({ latestTM, typeColor }: { latestTM: string; typeColor: string }) {
  // Extraer nombre del ítem desde el latestTM label (ej: "TM26" → "tm26")
  const itemName = latestTM.toLowerCase().replace(/\s+/, "");
  const { data: item } = useMachineItem(itemName, !!itemName && !itemName.includes("?"));

  if (item?.sprites?.default) {
    return (
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.4 }}
      >
        <motion.div
          animate={{ rotate: [0, 3, -3, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
        >
          <Image
            src={item.sprites.default}
            alt={latestTM}
            width={112} height={112}
            className="object-contain"
            style={{ filter: `drop-shadow(0 0 20px ${typeColor}88)` }}
          />
        </motion.div>
      </motion.div>
    );
  }

  // Fallback disc
  return (
    <motion.div
      className="w-[110px] h-[110px] border-2 flex flex-col items-center justify-center"
      style={{ borderColor: typeColor, backgroundColor: `${typeColor}18` }}
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.4 }}
    >
      <Disc size={32} style={{ color: typeColor }} />
      <span className="font-press-start text-[11px] mt-2" style={{ color: typeColor }}>{latestTM}</span>
    </motion.div>
  );
}

export function MachineDetailHero({ move, typeColor, moveNameEs, latestTM }: MachineDetailHeroProps) {
  const damageClass = DAMAGE_CLASS_META[move.damage_class.name];
  const letters     = moveNameEs.toUpperCase().split("");

  const heroStats = [
    { label: "Poder",     value: move.power    !== null ? String(move.power)    : "—" },
    { label: "Precisión", value: move.accuracy !== null ? `${move.accuracy}%`   : "—" },
    { label: "PP",        value: move.pp       !== null ? String(move.pp)        : "—" },
    { label: "Prioridad", value: move.priority > 0 ? `+${move.priority}` : String(move.priority) },
  ];

  return (
    <div className="relative bg-[#111111] overflow-hidden">
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "28px 28px" }}
      />

      {/* Scanline animada */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none"
        style={{ backgroundColor: typeColor }}
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 9, ease: "easeInOut" }}
      />

      {/* Watermark */}
      <motion.div
        className="absolute right-[-8px] top-1/2 -translate-y-1/2 font-press-start leading-none select-none pointer-events-none text-white uppercase"
        style={{ fontSize: "clamp(60px, 11vw, 120px)", opacity: 0 }}
        animate={{ opacity: 0.03 }}
        transition={{ duration: 0.8 }}
      >
        {moveNameEs}
      </motion.div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 py-10">
        {/* Breadcrumb */}
        <motion.div
          className="flex items-center gap-1.5 mb-6"
          initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
        >
          <Link href="/machines" className="font-nunito text-[13px] text-[#888888] hover:text-white transition-colors">
            TMs y Máquinas
          </Link>
          <ChevronRight size={11} className="text-[#555555]" />
          <span className="font-nunito text-[13px] text-white">{moveNameEs}</span>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* ── LEFT ── */}
          <div className="flex-1 min-w-0">
            {/* Chips de metadata */}
            <motion.div
              className="flex flex-wrap gap-2 mb-5"
              initial="hidden" animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
            >
              {/* TM Badge */}
              <motion.div
                variants={{ hidden: { opacity: 0, scale: 0, rotate: -12 }, visible: { opacity: 1, scale: 1, rotate: 0 } }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="px-4 py-2 border-2 border-[#111111]"
                style={{ backgroundColor: typeColor }}
              >
                <span className="font-press-start text-[11px] text-white">{latestTM}</span>
              </motion.div>

              {/* Tipo */}
              <motion.div variants={{ hidden: { opacity: 0, y: -8 }, visible: { opacity: 1, y: 0 } }}>
                <MachineTypeBadge type={move.type.name} size="md" />
              </motion.div>

              {/* Clase de daño */}
              {damageClass && (
                <motion.div
                  variants={{ hidden: { opacity: 0, y: -8 }, visible: { opacity: 1, y: 0 } }}
                  className="px-3 py-1.5 border"
                  style={{ borderColor: damageClass.color, backgroundColor: `${damageClass.color}18`, color: damageClass.color }}
                >
                  <span className="font-press-start text-[8px]">{damageClass.label.toUpperCase()}</span>
                </motion.div>
              )}

              {/* Generación */}
              <motion.div
                variants={{ hidden: { opacity: 0, y: -8 }, visible: { opacity: 1, y: 0 } }}
                className="px-3 py-1.5 border"
                style={{ borderColor: "rgba(255,255,255,0.15)", backgroundColor: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)" }}
              >
                <span className="font-nunito text-[12px] capitalize">{move.generation.name.replace("-", " ")}</span>
              </motion.div>
            </motion.div>

            {/* Nombre — letras caen */}
            <div className="overflow-hidden mb-3">
              <div className="flex flex-wrap gap-x-2">
                {letters.map((char, i) => (
                  <motion.span
                    key={i}
                    className="font-press-start text-white leading-tight"
                    style={{ fontSize: "clamp(24px, 5vw, 40px)" }}
                    initial={{ y: -32, opacity: 0 }}
                    animate={{ y: 0,   opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22, delay: i * 0.04 }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Nombre inglés */}
            <motion.p
              className="font-nunito text-[14px] mb-5 capitalize"
              style={{ color: "rgba(255,255,255,0.35)" }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            >
              {move.name}
            </motion.p>

            {/* Flavor text */}
            {move.flavor_text_entries.length > 0 && (() => {
              const ft = [...move.flavor_text_entries].reverse().find((f) => f.language.name === "es")?.flavor_text
                ?? [...move.flavor_text_entries].reverse().find((f) => f.language.name === "en")?.flavor_text;
              return ft ? (
                <motion.p
                  className="font-nunito text-[14px] leading-relaxed italic max-w-[460px]"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                >
                  "{ft}"
                </motion.p>
              ) : null;
            })()}
          </div>

          {/* ── RIGHT ── */}
          <motion.div
            className="flex flex-col gap-4 items-center lg:items-end"
            initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
          >
            {/* Sprite TM */}
            <TMSprite latestTM={latestTM} typeColor={typeColor} />

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-2 w-full max-w-[220px]">
              {heroStats.map(({ label, value }, i) => (
                <motion.div
                  key={label}
                  className="flex flex-col items-center px-3 py-2.5 border"
                  style={{ borderColor: "rgba(255,255,255,0.12)", backgroundColor: "rgba(255,255,255,0.04)" }}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.07 }}
                >
                  <span
                    className="font-jetbrains text-[18px] font-bold"
                    style={{ color: value === "—" ? "rgba(255,255,255,0.2)" : "#ffffff" }}
                  >
                    {value}
                  </span>
                  <span className="font-nunito text-[10px] text-white/40 uppercase">{label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Separador doble */}
      <div className="relative h-[5px]">
        <motion.div
          className="absolute top-0 left-0 w-full h-[2px] origin-left"
          style={{ backgroundColor: typeColor }}
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.5, delay: 0.4 }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-full h-[3px] bg-[#111111] origin-right"
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.4, delay: 0.5 }}
        />
      </div>
    </div>
  );
}