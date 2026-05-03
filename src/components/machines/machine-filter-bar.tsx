"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Search, X, SlidersHorizontal, Swords, Sparkles, Shield } from "lucide-react";
import {
  TYPE_COLORS, TYPE_NAMES_ES, DAMAGE_CLASS_META,
} from "@/lib/constants/machines/machines.constants";

const ALL_TYPES = [
  "fire","water","electric","grass","ice","fighting","poison","ground",
  "flying","psychic","bug","rock","ghost","dragon","dark","steel","fairy","normal",
];

const DAMAGE_ICONS = { physical: Swords, special: Sparkles, status: Shield };

interface MachineFilterBarProps {
  typeFilter:        string | null;
  damageClassFilter: string | null;
  searchQuery:       string;
  onTypeFilter:        (v: string | null) => void;
  onDamageClassFilter: (v: string | null) => void;
  onSearch:            (v: string) => void;
  totalShown:          number;
  totalAll:            number;
}

export function MachineFilterBar({
  typeFilter, damageClassFilter, searchQuery,
  onTypeFilter, onDamageClassFilter, onSearch,
  totalShown, totalAll,
}: MachineFilterBarProps) {
  const typeScrollRef = useRef<HTMLDivElement>(null);
  const hasFilter = typeFilter || damageClassFilter || searchQuery.trim();

  return (
    <div className="flex flex-col gap-4">
      {/* Searchbar */}
      <div className="flex items-center gap-2 border-2 border-[#111111] px-4 py-2.5 bg-white focus-within:border-[#CC0000] transition-colors">
        <Search size={15} className="text-[#888888] shrink-0" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Buscar movimiento (ej: Terremoto, earthquake, Thunderbolt...)"
          className="flex-1 font-nunito text-[14px] text-[#111111] placeholder:text-[#BBBBBB] outline-none bg-transparent"
        />
        {searchQuery && (
          <button onClick={() => onSearch("")} className="text-[#888888] hover:text-[#CC0000] transition-colors">
            <X size={15} />
          </button>
        )}
      </div>

      {/* Panel de filtros */}
      <div
        className="relative border-2 border-[#E0E0E0] bg-[#FAFAFA] p-5 pt-6"
        style={{ boxShadow: "3px 3px 0 #E0E0E0" }}
      >
        <div className="absolute top-[-13px] left-4 bg-[#111111] px-3 py-1 flex items-center gap-1.5">
          <SlidersHorizontal size={10} className="text-white" />
          <span className="font-nunito font-bold text-[11px] text-white uppercase">Filtros</span>
        </div>

        <div className="flex flex-col gap-5">
          {/* Tipo */}
          <div>
            <p className="font-press-start text-[9px] text-[#888888] mb-3 uppercase tracking-wider">Tipo</p>
            <div className="flex gap-1.5 overflow-x-auto pb-1" ref={typeScrollRef}>
              <button
                onClick={() => onTypeFilter(null)}
                className="font-nunito font-bold text-[13px] px-3 py-1.5 border-2 shrink-0 transition-all"
                style={
                  !typeFilter
                    ? { backgroundColor: "#111111", borderColor: "#111111", color: "#ffffff" }
                    : { backgroundColor: "#ffffff", borderColor: "#E0E0E0", color: "#888888" }
                }
              >
                Todos
              </button>
              {ALL_TYPES.map((type) => {
                const color  = TYPE_COLORS[type] ?? "#888888";
                const active = typeFilter === type;
                return (
                  <motion.button
                    key={type}
                    onClick={() => onTypeFilter(active ? null : type)}
                    className="font-press-start text-[7px] px-2.5 py-1.5 border-2 shrink-0 transition-all"
                    style={
                      active
                        ? { backgroundColor: color, borderColor: "#111111", color: "#ffffff", boxShadow: "2px 2px 0 #111111" }
                        : { backgroundColor: `${color}18`, borderColor: color, color }
                    }
                    whileTap={{ scale: 0.92 }}
                  >
                    {TYPE_NAMES_ES[type]?.toUpperCase() ?? type.toUpperCase()}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Clase de daño */}
          <div>
            <p className="font-press-start text-[9px] text-[#888888] mb-3 uppercase tracking-wider">Categoría</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => onDamageClassFilter(null)}
                className="font-nunito font-bold text-[13px] px-4 py-2 border-2 transition-all"
                style={
                  !damageClassFilter
                    ? { backgroundColor: "#111111", borderColor: "#111111", color: "#ffffff" }
                    : { backgroundColor: "#ffffff", borderColor: "#E0E0E0", color: "#888888" }
                }
              >
                Todas
              </button>
              {Object.entries(DAMAGE_CLASS_META).map(([key, meta]) => {
                const active = damageClassFilter === key;
                const Icon   = DAMAGE_ICONS[key as keyof typeof DAMAGE_ICONS];
                return (
                  <motion.button
                    key={key}
                    onClick={() => onDamageClassFilter(active ? null : key)}
                    className="flex items-center gap-2 font-nunito font-bold text-[13px] px-4 py-2 border-2 transition-all"
                    style={
                      active
                        ? { backgroundColor: meta.color, borderColor: "#111111", color: "#ffffff", boxShadow: "2px 2px 0 #111111" }
                        : { backgroundColor: `${meta.color}15`, borderColor: meta.color, color: meta.color }
                    }
                    whileTap={{ scale: 0.94 }}
                  >
                    {Icon && <Icon size={14} />}
                    {meta.label}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Contador + limpiar */}
      <div className="flex items-center justify-between">
        <p className="font-nunito text-[13px] text-[#888888]">
          <span className="font-bold text-[#111111]">{totalShown}</span> movimientos mostrados
        </p>
        {hasFilter && (
          <motion.button
            onClick={() => { onTypeFilter(null); onDamageClassFilter(null); onSearch(""); }}
            className="flex items-center gap-1.5 font-nunito font-bold text-[13px] text-[#CC0000] hover:underline"
            initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }}
          >
            <X size={13} /> Limpiar filtros
          </motion.button>
        )}
      </div>
    </div>
  );
}