"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Zap } from "lucide-react";
import { MoveDetail } from "@/types/api/machine.types";
import {
  TYPE_COLORS, TYPE_NAMES_ES, DAMAGE_CLASS_META,
  VERSION_GROUP_META, GEN_COLORS, getMachineLabel,
  formatMoveName,
} from "@/lib/constants/machines/machines.constants";
import { MachineTypeBadge } from "./machine-type-badge";

interface MachineMoveCardProps {
  move:  MoveDetail;
  index: number;
}

export function MachineMoveCard({ move, index }: MachineMoveCardProps) {
  const typeColor    = TYPE_COLORS[move.type.name]  ?? "#A8A878";
  const damageClass  = DAMAGE_CLASS_META[move.damage_class.name];

  // Nombre en español
  const nameEs = move.names.find((n) => n.language.name === "es")?.name
    ?? formatMoveName(move.name);

  // Efecto corto en español
  const effectEs = move.effect_entries.find((e) => e.language.name === "es")?.short_effect
    ?? move.effect_entries.find((e) => e.language.name === "en")?.short_effect
    ?? "";

  // Flavor text más reciente en ES
  const flavorEs = [...move.flavor_text_entries]
    .reverse()
    .find((f) => f.language.name === "es")?.flavor_text ?? "";

  // TMs: ordenar por generación más reciente
  const sortedMachines = [...move.machines].sort((a, b) => {
    const gA = VERSION_GROUP_META[a.version_group.name]?.gen ?? 0;
    const gB = VERSION_GROUP_META[b.version_group.name]?.gen ?? 0;
    return gB - gA;
  });

  // Chips de TM — máx 3 + resto
  const tmChips = sortedMachines.slice(0, 3);
  const tmExtra = sortedMachines.length - 3;

  // Pokémon compatibles (id <= 1025 para excluir formas alternativas)
  const compatibleCount = move.learned_by_pokemon.filter((p) => {
    const id = parseInt(p.url.match(/\/(\d+)\/?$/)?.[1] ?? "0");
    return id > 0 && id <= 1025;
  }).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: (index % 12) * 0.04 }}
    >
      <Link href={`/machines/${move.name}`} className="block outline-none group">
        <motion.div
          className="relative border-2 border-[#111111] bg-white overflow-hidden"
          style={{ boxShadow: "4px 4px 0 #111111" }}
          whileHover={{ x: 4, y: 4, boxShadow: "0px 0px 0 transparent" }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          {/* Franja top del tipo */}
          <div className="h-[4px]" style={{ backgroundColor: typeColor }} />

          {/* Watermark nombre */}
          <div
            className="absolute bottom-1 right-2 font-press-start leading-none select-none pointer-events-none"
            style={{ fontSize: "50px", color: typeColor, opacity: 0.04 }}
          >
            {nameEs.toUpperCase().slice(0, 6)}
          </div>

          <div className="p-5">
            <div className="flex flex-col sm:flex-row gap-5">
              {/* ── LEFT ── */}
              <div className="flex-1 min-w-0">
                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-3">
                  <MachineTypeBadge type={move.type.name} size="sm" />
                  {damageClass && (
                    <span
                      className="font-press-start text-[7px] px-2 py-1 border"
                      style={{
                        color:           damageClass.color,
                        borderColor:     damageClass.color,
                        backgroundColor: `${damageClass.color}18`,
                      }}
                    >
                      {damageClass.label.toUpperCase()}
                    </span>
                  )}
                  {/* TM badge más reciente */}
                  {sortedMachines[0] && (
                    <span
                      className="font-press-start text-[7px] px-2 py-1 border-2 border-[#111111]"
                      style={{ backgroundColor: typeColor, color: "#ffffff" }}
                    >
                      {sortedMachines[0].machine.name
                        ? getMachineLabel(sortedMachines[0].machine.name)
                        : "TM"}
                    </span>
                  )}
                </div>

                {/* Nombre */}
                <h3 className="font-press-start text-[15px] text-[#111111] mb-1 leading-tight">
                  {nameEs.toUpperCase()}
                </h3>
                <p className="font-nunito text-[13px] text-[#888888] mb-3 capitalize">{move.name}</p>

                {/* Efecto corto */}
                {flavorEs && (
                  <p className="font-nunito text-[13px] text-[#555555] leading-relaxed line-clamp-2 mb-3 italic">
                    {flavorEs}
                  </p>
                )}

                {/* TM chips por versión */}
                {tmChips.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {tmChips.map((m) => {
                      const gen   = VERSION_GROUP_META[m.version_group.name]?.gen ?? 0;
                      const color = GEN_COLORS[gen] ?? "#888888";
                      const label = m.machine.name ? getMachineLabel(m.machine.name) : "TM";
                      const game  = VERSION_GROUP_META[m.version_group.name]?.label ?? m.version_group.name;
                      return (
                        <span
                          key={m.version_group.name}
                          className="font-press-start text-[7px] px-2 py-1 border"
                          style={{ color, borderColor: color, backgroundColor: `${color}14` }}
                          title={game}
                        >
                          {label}
                        </span>
                      );
                    })}
                    {tmExtra > 0 && (
                      <span className="font-press-start text-[7px] px-2 py-1 border border-[#DDDDDD] text-[#888888]">
                        +{tmExtra}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* ── RIGHT: stats ── */}
              <div className="flex flex-col gap-2 shrink-0">
                {[
                  { label: "PODER",    value: move.power     !== null ? String(move.power)    : "—" },
                  { label: "PRECIS.",  value: move.accuracy  !== null ? `${move.accuracy}%`   : "—" },
                  { label: "PP",       value: move.pp        !== null ? String(move.pp)        : "—" },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center border border-[#E0E0E0] bg-[#FAFAFA] px-4 py-2 min-w-[64px]"
                  >
                    <span
                      className="font-jetbrains text-[17px] font-bold"
                      style={{ color: value === "—" ? "#CCCCCC" : "#111111" }}
                    >
                      {value}
                    </span>
                    <span className="font-nunito text-[10px] text-[#AAAAAA] uppercase">{label}</span>
                  </div>
                ))}

                {/* Compatibles */}
                <div className="flex items-center gap-1.5 justify-center border border-[#E0E0E0] bg-[#FAFAFA] px-3 py-2">
                  <Zap size={11} style={{ color: typeColor }} />
                  <span className="font-jetbrains text-[13px] font-bold text-[#111111]">{compatibleCount}</span>
                  <span className="font-nunito text-[10px] text-[#888888]">Pkm</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end mt-4 pt-3 border-t border-[#F0F0F0]">
              <span
                className="font-nunito font-bold text-[13px] flex items-center gap-1 group-hover:gap-2 transition-all"
                style={{ color: typeColor }}
              >
                Ver compatibles <ChevronRight size={13} />
              </span>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}