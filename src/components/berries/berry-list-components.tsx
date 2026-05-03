"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Leaf } from "lucide-react";
import { useRouter } from "next/navigation";

import { FLAVOR_COLORS, FLAVOR_META, FIRMNESS_COLORS } from "@/lib/constants/berries/berries.constants";
import { getDominantFlavor } from "@/lib/utils/berry.utils";

const FLAVOR_KEYS = ["spicy", "dry", "sweet", "bitter", "sour"] as const;

// ─────────────────────────────────────────────────────────────
// PAGE HEADER
// ─────────────────────────────────────────────────────────────
export function BerriesPageHeader({ count }: { count: number }) {
  const prefersRM = useReducedMotion();

  return (
    <div className="pb-8">
      <p className="font-nunito text-[12px] text-[#888888] mb-6">Inicio / Bayas</p>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-6">
        <div className="flex flex-col gap-3">
          {/* 5 flavor dots — pulse in staggered sequence */}
          <div className="flex gap-1.5">
            {FLAVOR_KEYS.map((k, i) => (
              <motion.div
                key={k}
                className="w-[10px] h-[10px] rounded-full"
                style={{ backgroundColor: FLAVOR_COLORS[k] }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 20, delay: i * 0.06 }}
              >
                <motion.div
                  className="w-full h-full rounded-full"
                  style={{ backgroundColor: FLAVOR_COLORS[k] }}
                  animate={prefersRM ? {} : { scale: [1, 1.4, 1] }}
                  transition={{ duration: 1.5, delay: i * 0.4, repeat: Infinity, repeatDelay: 1.5 }}
                />
              </motion.div>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <h1 className="font-press-start text-[20px] text-[#111111]">BAYAS</h1>
            <motion.div
              initial={{ scale: 0, rotate: 8 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", bounce: 0.55, delay: 0.3 }}
              className="bg-[#16A34A] text-white border-2 border-[#111111] px-2 py-1"
              style={{ boxShadow: "2px 2px 0 #111111" }}
            >
              <span className="font-press-start text-[8px]">{count}</span>
            </motion.div>
          </div>
        </div>

        <div className="flex flex-col items-start md:items-end gap-2">
          <p className="font-nunito text-[13px] text-[#888888] italic">
            Frutos cultivables con propiedades únicas
          </p>
          <div className="flex gap-1.5 flex-wrap">
            {FLAVOR_KEYS.map((k, i) => {
              const Icon = FLAVOR_META[k].icon;
              return (
                <motion.div
                  key={k}
                  className="px-2 py-0.5 border flex items-center gap-1"
                  style={{ backgroundColor: `${FLAVOR_COLORS[k]}1E`, borderColor: FLAVOR_COLORS[k] }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5, delay: 0.4 + i * 0.05 }}
                >
                  <span className="text-[11px] flex items-center" style={{ color: FLAVOR_COLORS[k] }}>
                    <Icon size={12} />
                  </span>
                  <span className="font-press-start text-[6px]" style={{ color: FLAVOR_COLORS[k] }}>
                    {FLAVOR_META[k].nameEs.toUpperCase()}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Double separator — black→green + red */}
      <div className="relative h-[5px]">
        <motion.div
          className="absolute top-0 left-0 w-full h-[3px] origin-left"
          style={{ background: "linear-gradient(to right, #111111, #16A34A)" }}
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.5 }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-full h-[2px] bg-[#CC0000] origin-right"
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.4, delay: 0.1 }}
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// VIEW TOGGLE
// ─────────────────────────────────────────────────────────────
const VIEWS = [
  { id: "cards", label: "Cards" },
  { id: "table", label: "Tabla" },
  { id: "flavor", label: "Por sabor" },
] as const;

export type BerryView = typeof VIEWS[number]["id"];

export function BerryViewToggle({ activeView, onViewChange }: {
  activeView: BerryView; onViewChange: (v: BerryView) => void;
}) {
  return (
    <div className="flex bg-[#F2F2F2] p-1 border-2 border-[#111111] w-fit">
      {VIEWS.map((v) => {
        const active = activeView === v.id;
        return (
          <button
            key={v.id}
            onClick={() => onViewChange(v.id)}
            className={[
              "px-4 py-2 font-press-start text-[8px] uppercase tracking-tighter transition-all",
              active ? "bg-[#111111] text-white" : "text-[#888888] hover:text-[#111111]",
            ].join(" ")}
          >
            {v.label}
          </button>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// FLAVOR GROUP VIEW
// ─────────────────────────────────────────────────────────────
export function BerryFlavorGroupView({ berries }: { berries: any[] }) {
  const router = useRouter();

  return (
    <div className="flex flex-col md:flex-row gap-3 w-full mt-6">
      {FLAVOR_KEYS.map((fKey, index) => {
        const grouped = berries.filter((b) => getDominantFlavor(b.flavors)?.flavor.name === fKey);
        if (grouped.length === 0) return null;
        const color = FLAVOR_COLORS[fKey];
        const Icon = FLAVOR_META[fKey].icon;
        return (
          <motion.div
            key={fKey}
            className="flex-1 flex flex-col border-2 border-[#111111] min-w-0 overflow-hidden"
            initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", delay: index * 0.08 }}
          >
            {/* Column header */}
            <div className="flex items-center gap-2 px-3 py-2.5 shrink-0" style={{ backgroundColor: color }}>
              <span className="text-white">
                <Icon size={16} />
              </span>
              <span className="font-press-start text-[7px] text-white flex-1 truncate uppercase">
                {FLAVOR_META[fKey].nameEs}
              </span>
              <div className="bg-[#111111] border border-white/40 px-1.5 py-0.5 shrink-0">
                <span className="font-press-start text-[7px] text-white">{grouped.length}</span>
              </div>
            </div>

            {/* Rows */}
            <div className="flex flex-col overflow-y-auto max-h-[400px] bg-white">
              {grouped.map((b) => (
                <div
                  key={b.id}
                  onClick={() => router.push(`/berries/${b.name}`)}
                  className="flex items-center gap-2.5 px-3 py-2 border-b border-[#F2F2F2] cursor-pointer hover:bg-[#F8F8F8] transition-colors group"
                >
                  {b.item?.sprites?.default && (
                    <img src={b.item.sprites.default} alt={b.name} className="w-8 h-8 group-hover:scale-110 transition-transform" style={{ imageRendering: "pixelated" }} />
                  )}
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="font-nunito font-bold text-[11px] text-[#111111] group-hover:text-[#CC0000] transition-colors truncate capitalize">
                      Baya {b.name}
                    </span>
                    <span className="font-jetbrains text-[9px] text-[#888888]">
                      #{String(b.id).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// TABLE VIEW
// ─────────────────────────────────────────────────────────────
export function BerryTableView({ berries }: { berries: any[] }) {
  const router = useRouter();

  return (
    <div className="w-full overflow-x-auto border-t-2 border-[#111111] mt-6">
      <table className="w-full text-left border-collapse min-w-[800px]">
        <thead>
          <tr className="bg-[#111111] text-white font-press-start text-[8px] tracking-tighter">
            {["#", "Sprite", "Nombre", "Sabor", "Firmeza", "Crec.", "Smooth.", "N.Gift"].map((h) => (
              <th key={h} className="py-3 px-4">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {berries.map((b) => {
            const dom = getDominantFlavor(b.flavors);
            const domColor = dom ? (FLAVOR_COLORS[dom.flavor.name] ?? "#111") : "#111";
            return (
              <tr
                key={b.id}
                onClick={() => router.push(`/berries/${b.name}`)}
                className="border-b border-[#F2F2F2] hover:bg-[#F8F8F8] cursor-pointer transition-colors group"
                style={{ borderLeft: `4px solid ${domColor}` }}
              >
                <td className="py-2 px-4 font-jetbrains text-[11px] text-[#888888]">
                  #{String(b.id).padStart(2, "0")}
                </td>
                <td className="py-2 px-4">
                  {b.item?.sprites?.default && (
                    <img src={b.item.sprites.default} alt={b.name} className="w-8 h-8" style={{ imageRendering: "pixelated" }} />
                  )}
                </td>
                <td className="py-2 px-4 font-nunito font-bold text-[13px] capitalize group-hover:text-[#CC0000] transition-colors">
                  Baya {b.name}
                </td>
                <td className="py-2 px-4">
                  <span className="font-nunito font-bold text-[11px] px-2 py-0.5 uppercase tracking-wider"
                    style={{ color: domColor, backgroundColor: `${domColor}18` }}>
                    {dom ? FLAVOR_META[dom.flavor.name]?.nameEs : "—"}
                  </span>
                </td>
                <td className="py-2 px-4 font-nunito text-[12px] capitalize text-[#444444]">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: FIRMNESS_COLORS[b.firmness.name] ?? "#111" }} />
                    {b.firmness.name.replace(/-/g, " ")}
                  </div>
                </td>
                <td className="py-2 px-4 font-jetbrains text-[11px] text-[#444444]">{b.growth_time}h</td>
                <td className="py-2 px-4">
                  <div className="w-12 h-2 bg-[#F2F2F2] overflow-hidden border border-[#E0E0E0]">
                    <div className="h-full bg-gradient-to-r from-green-400 to-green-700" style={{ width: `${(b.smoothness / 40) * 100}%` }} />
                  </div>
                </td>
                <td className="py-2 px-4 font-jetbrains text-[11px] text-orange-500">
                  {b.natural_gift_power || "—"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// EMPTY STATE
// ─────────────────────────────────────────────────────────────
export function BerryEmptyState({ onClear }: { onClear: () => void }) {
  const prefersRM = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center py-20 gap-4"
    >
      <motion.div
        animate={prefersRM ? {} : { rotate: [-10, 10, -10] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Leaf size={52} className="text-[#16A34A]" />
      </motion.div>
      <h3 className="font-press-start text-[11px] text-[#888888] tracking-tighter">SIN RESULTADOS</h3>
      <p className="font-nunito text-[14px] text-[#888888] italic">Prueba otro sabor o elimina los filtros</p>
      <button
        onClick={onClear}
        className="mt-2 border-2 border-[#CC0000] text-[#CC0000] px-4 py-2 font-press-start text-[9px] hover:bg-[#CC0000] hover:text-white transition-colors"
      >
        LIMPIAR FILTROS
      </button>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// LOAD MORE
// ─────────────────────────────────────────────────────────────
export function BerryLoadMore({ onLoad, isLoading }: { onLoad: () => void; isLoading?: boolean }) {
  return (
    <div className="flex justify-center mt-10 mb-6">
      <button
        onClick={onLoad} disabled={isLoading}
        className="px-6 py-3 border-2 border-[#111111] bg-white font-press-start text-[9px] uppercase tracking-tighter hover:bg-[#111111] hover:text-white transition-colors disabled:opacity-50"
        style={{ boxShadow: "3px 3px 0 #16A34A" }}
      >
        {isLoading ? "CARGANDO..." : "VER MÁS"}
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ALL LOADED
// ─────────────────────────────────────────────────────────────
export function BerryAllLoadedMessage({ count }: { count: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex items-center justify-center gap-4 mt-10 mb-6"
    >
      <div className="h-px bg-[#E0E0E0] flex-1" />
      <span className="font-press-start text-[9px] text-[#888888] tracking-tighter">
        {count} BAYAS CARGADAS
      </span>
      <div className="h-px bg-[#E0E0E0] flex-1" />
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// SKELETON
// ─────────────────────────────────────────────────────────────
export function BerrySkeletonGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-6">
      {Array.from({ length: 18 }).map((_, i) => (
        <div key={i} className="border-2 border-[#E0E0E0] overflow-hidden">
          <div className="h-[3px] bg-[#E0E0E0]" />
          <div className="h-[88px] bg-[#F8F8F8] animate-pulse" />
          <div className="p-3 flex flex-col gap-2">
            <div className="h-3 bg-[#F2F2F2] animate-pulse w-3/4" />
            <div className="h-px bg-[#E0E0E0]" />
            <div className="h-[5px] bg-[#F2F2F2] animate-pulse" />
            <div className="h-px bg-[#E0E0E0]" />
            <div className="h-3 bg-[#F2F2F2] animate-pulse w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}