"use client";

import { motion, AnimatePresence } from "framer-motion";
import * as Select from "@radix-ui/react-select";
import { ChevronDown, Check, X } from "lucide-react";
import { FLAVOR_COLORS, FLAVOR_META, FIRMNESS_COLORS, BERRY_CATEGORIES } from "@/lib/constants/berries/berries.constants";

const FIRMNESS_OPTIONS = [
  { value: "very-soft", label: "Muy blanda", rank: 1 },
  { value: "soft", label: "Blanda", rank: 2 },
  { value: "hard", label: "Dura", rank: 3 },
  { value: "very-hard", label: "Muy dura", rank: 4 },
  { value: "super-hard", label: "Super dura", rank: 5 },
];

const SORT_OPTIONS = [
  { value: "id", label: "Número" },
  { value: "name", label: "Nombre (A-Z)" },
  { value: "growth", label: "Crecimiento" },
  { value: "smoothness", label: "Smoothness" },
];

interface BerryFilterBarProps {
  flavor: string | null;
  firmness: string | null;
  effect: string | null;
  sort: string | null;
  onFlavorChange: (v: string | null) => void;
  onFirmnessChange: (v: string | null) => void;
  onEffectChange: (v: string | null) => void;
  onSortChange: (v: string | null) => void;
  onClearAll: () => void;
}

export function BerryFilterBar({
  flavor, onFlavorChange,
  firmness, onFirmnessChange,
  effect, onEffectChange,
  sort, onSortChange,
  onClearAll,
}: BerryFilterBarProps) {
  const hasFilters = !!(flavor || firmness || effect);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 items-center">

        {/* Flavor pills */}
        <div className="flex gap-2 flex-wrap">
          {Object.keys(FLAVOR_META).map((fKey) => {
            const isActive = flavor === fKey;
            const color = FLAVOR_COLORS[fKey];
            const Icon = FLAVOR_META[fKey].icon;
            return (
              <motion.button
                key={fKey}
                onClick={() => onFlavorChange(isActive ? null : fKey)}
                className="flex items-center gap-1.5 px-3.5 py-2 font-nunito font-bold text-[12px] uppercase tracking-wider border-2 transition-all outline-none"
                style={{
                  backgroundColor: isActive ? color : `${color}1A`,
                  borderColor: isActive ? "#111111" : "transparent",
                  boxShadow: isActive ? "3px 3px 0 #111111" : "none",
                  color: isActive ? "#FFFFFF" : color,
                }}
                whileHover={!isActive ? { scale: 1.03 } : {}}
                whileTap={{ scale: 0.96 }}
              >
                <motion.span
                  animate={isActive ? { rotate: [0, -20, 15, -8, 0] } : { rotate: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon size={16} />
                </motion.span>
                <span className="hidden sm:block">{FLAVOR_META[fKey].nameEs}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Firmness select */}
        <Select.Root value={firmness ?? "all"} onValueChange={(v) => onFirmnessChange(v === "all" ? null : v)}>
          <Select.Trigger
            className="flex items-center justify-between gap-2 px-3 h-[42px] bg-white border-2 border-[#111111] font-nunito font-bold text-[13px] min-w-[170px] outline-none focus:border-[#CC0000] transition-colors"
            aria-label="Firmeza"
          >
            <Select.Value placeholder="Todas las firmezas" />
            <Select.Icon><ChevronDown size={14} className="text-[#888888]" /></Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className="overflow-hidden bg-white border-2 border-[#111111] z-[100]" style={{ boxShadow: "4px 4px 0 #111111" }}>
              <Select.Viewport className="p-1">
                <SelectItem value="all">Todas las firmezas</SelectItem>
                {FIRMNESS_OPTIONS.map((opt) => (
                  <Select.Item
                    key={opt.value} value={opt.value}
                    className="relative flex items-center justify-between px-6 py-2 outline-none cursor-default font-nunito text-[13px] hover:bg-[#F2F2F2] data-[highlighted]:bg-[#F2F2F2]"
                  >
                    <Select.ItemText>{opt.label}</Select.ItemText>
                    <div className="flex gap-[2px]">
                      {Array.from({ length: 5 }).map((_, si) => (
                        <div key={si} className="w-3 h-2"
                          style={{ backgroundColor: si < opt.rank ? (FIRMNESS_COLORS[opt.value] ?? "#111") : "#E0E0E0" }}
                        />
                      ))}
                    </div>
                    <Select.ItemIndicator className="absolute left-1.5"><Check size={12} /></Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>

        {/* Effect select */}
        <Select.Root value={effect ?? "all"} onValueChange={(v) => onEffectChange(v === "all" ? null : v)}>
          <Select.Trigger
            className="flex items-center justify-between gap-2 px-3 h-[42px] bg-white border-2 border-[#111111] font-nunito font-bold text-[13px] min-w-[170px] outline-none focus:border-[#CC0000] transition-colors"
            aria-label="Efecto"
          >
            <Select.Value placeholder="Todos los efectos" />
            <Select.Icon><ChevronDown size={14} className="text-[#888888]" /></Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className="overflow-hidden bg-white border-2 border-[#111111] z-[100]" style={{ boxShadow: "4px 4px 0 #111111" }}>
              <Select.Viewport className="p-1">
                <SelectItem value="all">Todos los efectos</SelectItem>
                {BERRY_CATEGORIES.map((cat) => <SelectItem key={cat.id} value={cat.id}>{cat.label}</SelectItem>)}
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>

        {/* Sort select */}
        <Select.Root value={sort ?? "id"} onValueChange={(v) => onSortChange(v)}>
          <Select.Trigger
            className="flex items-center justify-between gap-2 px-3 h-[42px] bg-white border-2 border-[#111111] font-nunito font-bold text-[13px] min-w-[150px] outline-none focus:border-[#CC0000] transition-colors ml-auto"
            aria-label="Ordenar"
          >
            <Select.Value placeholder="Ordenar" />
            <Select.Icon><ChevronDown size={14} className="text-[#888888]" /></Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className="overflow-hidden bg-white border-2 border-[#111111] z-[100]" style={{ boxShadow: "4px 4px 0 #111111" }}>
              <Select.Viewport className="p-1">
                {SORT_OPTIONS.map((opt) => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>

      <AnimatePresence>
        {hasFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="flex flex-wrap gap-2 items-center overflow-hidden"
          >
            <span className="font-jetbrains text-[9px] text-[#888888] uppercase tracking-wider">Filtros:</span>

            {flavor && (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                className="flex items-center gap-1.5 px-2 py-1 border-2 font-nunito font-bold text-[11px]"
                style={{ color: FLAVOR_COLORS[flavor], borderColor: FLAVOR_COLORS[flavor], backgroundColor: `${FLAVOR_COLORS[flavor]}1A` }}
              >
                {(() => {
                  const Icon = FLAVOR_META[flavor].icon;
                  return <Icon size={12} />;
                })()} {FLAVOR_META[flavor]?.nameEs}
                <button onClick={() => onFlavorChange(null)} className="hover:rotate-90 transition-transform duration-200">
                  <X size={11} />
                </button>
              </motion.div>
            )}

            {firmness && (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                className="flex items-center gap-1.5 px-2 py-1 border-2 border-[#111111] bg-white font-nunito font-bold text-[11px]"
              >
                {FIRMNESS_OPTIONS.find((o) => o.value === firmness)?.label}
                <button onClick={() => onFirmnessChange(null)} className="hover:rotate-90 transition-transform duration-200">
                  <X size={11} />
                </button>
              </motion.div>
            )}

            {effect && (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                className="flex items-center gap-1.5 px-2 py-1 border-2 border-[#111111] bg-white font-nunito font-bold text-[11px]"
              >
                {BERRY_CATEGORIES.find((c) => c.id === effect)?.label}
                <button onClick={() => onEffectChange(null)} className="hover:rotate-90 transition-transform duration-200">
                  <X size={11} />
                </button>
              </motion.div>
            )}

            <button onClick={onClearAll} className="font-nunito text-[11px] text-[#CC0000] hover:underline ml-1">
              Limpiar todo
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SelectItem({ value, children }: { value: string; children: React.ReactNode }) {
  return (
    <Select.Item value={value}
      className="relative flex items-center px-6 py-2 outline-none cursor-default font-nunito text-[13px] hover:bg-[#F2F2F2] data-[highlighted]:bg-[#F2F2F2]"
    >
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator className="absolute left-1.5"><Check size={12} /></Select.ItemIndicator>
    </Select.Item>
  );
}