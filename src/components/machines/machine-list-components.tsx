"use client";

import { motion } from "framer-motion";
import { List, LayoutGrid, X, Search, Disc } from "lucide-react";
import {
  TYPE_COLORS, TYPE_NAMES_ES, DAMAGE_CLASS_META,
} from "@/lib/constants/machines.constants";

// ── PAGE HEADER ───────────────────────────────────────────────────────────────
export function MachinesPageHeader() {
  const statChips = [
    { label: "Físico",   color: DAMAGE_CLASS_META.physical.color },
    { label: "Especial", color: DAMAGE_CLASS_META.special.color  },
    { label: "Estado",   color: DAMAGE_CLASS_META.status.color   },
  ];

  return (
    <div>
      {/* Ícono + título */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-5">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <motion.div
              className="w-9 h-9 bg-[#CC0000] border-2 border-[#111111] flex items-center justify-center"
              style={{ boxShadow: "2px 2px 0 #111111" }}
              initial={{ scale: 0, rotate: -15 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", bounce: 0.5, delay: 0.3 }}
            >
              <Disc size={18} className="text-white" />
            </motion.div>
            <h1 className="font-press-start text-[20px] text-[#111111]">TMs Y MÁQUINAS</h1>
            <motion.div
              className="bg-[#111111] text-white px-2 py-1"
              style={{ boxShadow: "2px 2px 0 #CC0000" }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.6, delay: 0.65 }}
            >
              <span className="font-press-start text-[9px]">MTs</span>
            </motion.div>
          </div>
          <p className="font-nunito text-[14px] text-[#888888] italic">
            Descubre qué Pokémon pueden aprender cada movimiento por TM
          </p>
        </div>

        {/* Chips de categoría */}
        <div className="flex gap-2">
          {statChips.map(({ label, color }, i) => (
            <motion.div
              key={label}
              className="px-3 py-1.5 border font-press-start text-[8px]"
              style={{ color, borderColor: color, backgroundColor: `${color}15` }}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 + i * 0.06 }}
            >
              {label.toUpperCase()}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Separador doble */}
      <div className="relative h-[5px]">
        <motion.div
          className="absolute top-0 left-0 w-full h-[3px] bg-[#111111] origin-left"
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.5, delay: 0.35 }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-full h-[2px] bg-[#CC0000] origin-right"
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.4, delay: 0.45 }}
        />
      </div>
    </div>
  );
}

// ── VIEW TOGGLE ───────────────────────────────────────────────────────────────
interface MachineViewToggleProps {
  view:         "list" | "grid";
  onViewChange: (v: "list" | "grid") => void;
}

export function MachineViewToggle({ view, onViewChange }: MachineViewToggleProps) {
  return (
    <div className="flex border-2 border-[#111111] overflow-hidden" style={{ boxShadow: "3px 3px 0 #CC0000" }}>
      {([["list", List, "Lista"], ["grid", LayoutGrid, "Grid"]] as const).map(([v, Icon, label]) => (
        <button
          key={v}
          onClick={() => onViewChange(v)}
          className="flex items-center gap-2 px-5 py-3 font-press-start text-[9px] transition-colors"
          style={
            view === v
              ? { backgroundColor: "#111111", color: "#ffffff" }
              : { backgroundColor: "#ffffff", color: "#888888" }
          }
        >
          <Icon size={14} />
          {label}
        </button>
      ))}
    </div>
  );
}

// ── SKELETON ──────────────────────────────────────────────────────────────────
export function MachineSkeleton({ view }: { view: "list" | "grid" }) {
  const count = view === "list" ? 6 : 9;
  const height = view === "list" ? 160 : 200;

  return (
    <div className={view === "list" ? "flex flex-col gap-4" : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="border-2 border-[#E0E0E0] bg-[#F8F8F8] animate-pulse overflow-hidden"
          style={{ height, animationDelay: `${i * 0.05}s` }}
        >
          <div className="h-[4px] bg-[#E0E0E0]" />
        </div>
      ))}
    </div>
  );
}

// ── EMPTY STATE ───────────────────────────────────────────────────────────────
interface MachineEmptyStateProps {
  onClear: () => void;
}

export function MachineEmptyState({ onClear }: MachineEmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-5 py-20 text-center">
      <div
        className="w-16 h-16 border-2 border-[#111111] flex items-center justify-center"
        style={{ boxShadow: "3px 3px 0 #CC0000" }}
      >
        <Disc size={26} className="text-[#CCCCCC]" />
      </div>
      <div>
        <p className="font-press-start text-[12px] text-[#888888] mb-2">SIN MOVIMIENTOS</p>
        <p className="font-nunito text-[14px] text-[#AAAAAA]">
          No se encontraron movimientos con esos filtros.
        </p>
        <p className="font-nunito text-[13px] text-[#BBBBBB] mt-1">
          Intenta buscar por nombre o cambia el tipo.
        </p>
      </div>
      <button
        onClick={onClear}
        className="flex items-center gap-2 border-2 border-[#111111] px-5 py-2.5 font-nunito font-bold text-[14px] bg-white hover:bg-[#111111] hover:text-white transition-colors"
        style={{ boxShadow: "3px 3px 0 #CC0000" }}
      >
        <X size={14} /> Limpiar filtros
      </button>
    </div>
  );
}