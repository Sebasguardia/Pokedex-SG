"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import NumberFlow from "@number-flow/react";
import { Info } from "lucide-react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { MoveDetail } from "@/types/api/machine.types";
import {
  getPowerCategory, getPriorityLabel, DAMAGE_CLASS_META,
  TYPE_NAMES_ES,
} from "@/lib/constants/machines/machines.constants";

interface MachineMoveStatsProps {
  move:      MoveDetail;
  typeColor: string;
}

function StatCard({
  label, value, subValue, children, typeColor, delay = 0,
}: {
  label:     string;
  value:     React.ReactNode;
  subValue?: string;
  children?: React.ReactNode;
  typeColor: string;
  delay?:    number;
}) {
  return (
    <motion.div
      className="relative border-2 border-[#111111] bg-white overflow-hidden p-5"
      style={{ boxShadow: `4px 4px 0 ${typeColor}` }}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
    >
      <div className="mb-3">
        <span className="font-nunito font-bold text-[11px] text-[#111111] uppercase">{label}</span>
      </div>
      <div className="mt-1">
        <div className="font-jetbrains text-[28px] font-bold text-[#111111] mb-1">{value}</div>
        {subValue && <p className="font-nunito text-[12px] text-[#888888]">{subValue}</p>}
        {children}
      </div>
    </motion.div>
  );
}

export function MachineMoveStats({ move, typeColor }: MachineMoveStatsProps) {
  const powerCat    = getPowerCategory(move.power);
  const priorityMeta = getPriorityLabel(move.priority);
  const damageClass  = DAMAGE_CLASS_META[move.damage_class.name];
  const maxPP        = move.pp ? Math.floor(move.pp * 1.6) : null;

  // Efecto en español
  const effectEs = move.effect_entries.find((e) => e.language.name === "es")?.effect
    ?? move.effect_entries.find((e) => e.language.name === "en")?.effect
    ?? "";

  // Flavor text más reciente en ES
  const flavorText = [...move.flavor_text_entries]
    .reverse()
    .find((f) => f.language.name === "es")?.flavor_text
    ?? [...move.flavor_text_entries]
    .reverse()
    .find((f) => f.language.name === "en")?.flavor_text
    ?? "";

  return (
    <section>
      <div className="flex items-center gap-4 mb-6">
        <h2 className="font-press-start text-[14px] uppercase tracking-tighter text-[#111111] whitespace-nowrap">
          Estadísticas del Movimiento
        </h2>
        <div className="h-px bg-[#E0E0E0] flex-1" />
      </div>

      {/* Grid de stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 pt-3 mb-8">
        {/* Poder */}
        <StatCard label="Poder" value={
          move.power !== null
            ? <NumberFlow value={move.power} />
            : <span className="text-[#CCCCCC]">—</span>
        } typeColor={typeColor} delay={0}>
          {move.power !== null && (
            <div className="mt-3">
              <div className="h-[6px] bg-[#F0F0F0] overflow-hidden mb-1.5">
                <motion.div
                  className="h-full"
                  style={{ backgroundColor: powerCat.color }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${Math.min(100, (move.power / 250) * 100)}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              </div>
              <span
                className="font-press-start text-[7px] px-2 py-0.5"
                style={{ backgroundColor: `${powerCat.color}20`, color: powerCat.color }}
              >
                {powerCat.label.toUpperCase()}
              </span>
            </div>
          )}
          {move.power === null && (
            <p className="font-nunito text-[12px] text-[#888888] mt-2">Daño indirecto o estado</p>
          )}
        </StatCard>

        {/* Precisión */}
        <StatCard label="Precisión" value={
          move.accuracy !== null
            ? <><NumberFlow value={move.accuracy} /><span className="text-[18px]">%</span></>
            : <span className="text-[#CCCCCC]">—</span>
        } typeColor={typeColor} delay={0.08}>
          {move.accuracy !== null && (
            <div className="mt-3">
              <div className="h-[6px] bg-[#F0F0F0] overflow-hidden">
                <motion.div
                  className="h-full bg-[#F59E0B]"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${move.accuracy}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              </div>
            </div>
          )}
          {move.accuracy === null && (
            <p className="font-nunito text-[12px] text-[#888888] mt-2">Nunca falla</p>
          )}
        </StatCard>

        {/* PP */}
        <StatCard
          label="PP"
          value={move.pp !== null ? <NumberFlow value={move.pp} /> : <span className="text-[#CCCCCC]">—</span>}
          subValue={maxPP ? `Máx con PP Máx: ${maxPP}` : undefined}
          typeColor={typeColor}
          delay={0.16}
        >
          {move.pp !== null && (
            <div className="mt-3">
              <div className="h-[6px] bg-[#F0F0F0] overflow-hidden">
                <motion.div
                  className="h-full bg-[#10B981]"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${Math.min(100, (move.pp / 40) * 100)}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                />
              </div>
            </div>
          )}
        </StatCard>

        {/* Prioridad */}
        <StatCard
          label="Prioridad"
          value={
            <span style={{ color: move.priority !== 0 ? "#A855F7" : "#111111" }}>
              {move.priority > 0 ? `+${move.priority}` : String(move.priority)}
            </span>
          }
          subValue={priorityMeta.label}
          typeColor={typeColor}
          delay={0.24}
        />
      </div>

      {/* Metadata adicional */}
      <div className="flex flex-wrap gap-3 mb-8">
        {/* Categoría */}
        {damageClass && (
          <div
            className="flex items-center gap-2 px-4 py-2.5 border-2 border-[#111111]"
            style={{ backgroundColor: `${damageClass.color}15` }}
          >
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: damageClass.color }} />
            <span className="font-nunito font-bold text-[13px]" style={{ color: damageClass.color }}>
              {damageClass.label}
            </span>
          </div>
        )}
        {/* Tipo */}
        <div
          className="flex items-center gap-2 px-4 py-2.5 border-2 border-[#111111]"
          style={{ backgroundColor: `${typeColor}15` }}
        >
          <span className="font-nunito font-bold text-[13px]" style={{ color: typeColor }}>
            Tipo {TYPE_NAMES_ES[move.type.name] ?? move.type.name}
          </span>
        </div>
        {/* Target */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-2 border-[#E0E0E0] bg-[#FAFAFA]">
          <span className="font-nunito text-[13px] text-[#555555] capitalize">
            Objetivo: {move.target.name.replace(/-/g, " ")}
          </span>
        </div>
      </div>

      {/* Efecto completo */}
      {effectEs && (
        <motion.div
          className="border-l-4 bg-[#111111] px-5 py-5 mb-5"
          style={{ borderColor: typeColor }}
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Info size={13} style={{ color: typeColor }} />
            <span className="font-press-start text-[9px] text-white/60 uppercase">Efecto</span>
          </div>
          <p className="font-nunito text-[14px] text-white/75 leading-relaxed">
            {effectEs.replace(/\$effect_chance%?/g, `${move.pp ?? "?"}%`)}
          </p>
        </motion.div>
      )}

      {/* Flavor text */}
      {flavorText && (
        <motion.div
          className="border-2 px-5 py-4 bg-[#FAFAFA]"
          style={{ borderColor: `${typeColor}50` }}
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        >
          <p className="font-nunito text-[13px] text-[#555555] leading-relaxed italic">
            "{flavorText}"
          </p>
        </motion.div>
      )}
    </section>
  );
}