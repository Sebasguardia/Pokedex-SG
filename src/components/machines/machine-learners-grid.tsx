"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Search, X, LayoutGrid, List, ChevronDown } from "lucide-react";
import Fuse from "fuse.js";
import { NamedAPIResource } from "@/types/api/common.types";
import { extractPokemonId, formatMoveName } from "@/lib/constants/machines.constants";

interface MachineLearnerGridProps {
  learnedByPokemon: NamedAPIResource[];
  typeColor:        string;
  moveName:         string;
}

const PAGE_SIZE = 48;

export function MachineLearnerGrid({ learnedByPokemon, typeColor, moveName }: MachineLearnerGridProps) {
  // Filtrar formas alternativas (id > 10000)
  const basePokemon = useMemo(
    () => learnedByPokemon.filter((p) => {
      const id = extractPokemonId(p.url);
      return id > 0 && id <= 1025;
    }),
    [learnedByPokemon]
  );

  const [query,   setQuery]   = useState("");
  const [view,    setView]    = useState<"grid" | "list">("grid");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const fuse = useMemo(
    () => new Fuse(basePokemon, { keys: ["name"], threshold: 0.3 }),
    [basePokemon]
  );

  const filtered = useMemo(() => {
    if (!query.trim()) return basePokemon;
    return fuse.search(query).map((r) => r.item);
  }, [query, fuse, basePokemon]);

  const shown = filtered.slice(0, visible);

  return (
    <section>
      <div className="flex items-center gap-4 mb-6">
        <h2 className="font-press-start text-[14px] uppercase tracking-tighter text-[#111111] whitespace-nowrap">
          Pokémon Compatibles
        </h2>
        <div className="h-px bg-[#E0E0E0] flex-1" />
        <span
          className="font-press-start text-[8px] px-3 py-1.5 border-2 border-[#111111] shrink-0"
          style={{ color: typeColor }}
        >
          {basePokemon.length} Pokémon
        </span>
      </div>

      {/* Panel */}
      <div
        className="relative border-2 border-[#111111]"
        style={{ boxShadow: `4px 4px 0 ${typeColor}` }}
      >
        {/* Etiqueta flotante */}
        <div
          className="absolute top-[-14px] left-4 px-3 py-1 z-10"
          style={{ backgroundColor: typeColor }}
        >
          <span className="font-nunito font-bold text-[11px] text-white uppercase">
            Aprenden {moveName}
          </span>
        </div>

        <div className="p-5 pt-7">
          {/* Controles */}
          <div className="flex gap-3 mb-5 flex-wrap">
            {/* Search */}
            <div className="flex-1 flex items-center gap-2 border-2 border-[#111111] px-3 py-2.5 bg-white focus-within:border-[#CC0000] transition-colors min-w-[200px]">
              <Search size={14} className="text-[#888888] shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setVisible(PAGE_SIZE); }}
                placeholder="Buscar Pokémon..."
                className="flex-1 font-nunito text-[14px] text-[#111111] placeholder:text-[#BBBBBB] outline-none bg-transparent"
              />
              {query && (
                <button onClick={() => setQuery("")} className="text-[#888888] hover:text-[#111111]">
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Vista toggle */}
            <div className="flex border-2 border-[#111111] overflow-hidden">
              {([["grid", LayoutGrid], ["list", List]] as const).map(([v, Icon]) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className="px-3 py-2.5 flex items-center transition-colors"
                  style={
                    view === v
                      ? { backgroundColor: "#111111", color: "#ffffff" }
                      : { backgroundColor: "#ffffff", color: "#888888" }
                  }
                >
                  <Icon size={14} />
                </button>
              ))}
            </div>
          </div>

          {/* Empty */}
          {shown.length === 0 ? (
            <div className="py-12 flex flex-col items-center gap-2 text-[#888888]">
              <Search size={24} />
              <p className="font-press-start text-[9px]">SIN RESULTADOS</p>
              <button onClick={() => setQuery("")} className="font-nunito text-[13px] text-[#CC0000] hover:underline">
                Limpiar búsqueda
              </button>
            </div>
          ) : view === "grid" ? (
            /* GRID */
            <AnimatePresence mode="wait">
              <motion.div
                key="grid"
                className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2"
              >
                {shown.map((pkm, i) => {
                  const id     = extractPokemonId(pkm.url);
                  const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
                  const name   = formatMoveName(pkm.name);
                  return (
                    <motion.div
                      key={pkm.name}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.15, delay: Math.min(i, 24) * 0.01 }}
                    >
                      <Link href={`/pokemon/${id}`}>
                        <motion.div
                          className="border-2 border-[#E0E0E0] bg-[#FAFAFA] p-1.5 flex flex-col items-center cursor-pointer"
                          whileHover={{ y: -3, borderColor: "#111111", boxShadow: `3px 3px 0 ${typeColor}` }}
                          transition={{ type: "spring", stiffness: 400, damping: 22 }}
                        >
                          <Image
                            src={sprite} alt={name}
                            width={48} height={48}
                            className="object-contain" loading="lazy"
                          />
                          <p className="font-nunito font-bold text-[10px] text-[#111111] capitalize text-center truncate w-full mt-0.5">
                            {name}
                          </p>
                          <span className="font-jetbrains text-[8px] text-[#AAAAAA]">
                            #{String(id).padStart(4, "0")}
                          </span>
                        </motion.div>
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          ) : (
            /* LISTA */
            <div className="border-2 border-[#E0E0E0] overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-[50px_40px_1fr_60px] items-center gap-2 px-3 py-2 bg-[#111111]">
                <span className="font-press-start text-[7px] text-white">ID</span>
                <span />
                <span className="font-press-start text-[7px] text-white">NOMBRE</span>
                <span className="font-press-start text-[7px] text-white text-right">NAC.</span>
              </div>
              {shown.map((pkm, i) => {
                const id     = extractPokemonId(pkm.url);
                const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
                const name   = formatMoveName(pkm.name);
                return (
                  <Link key={pkm.name} href={`/pokemon/${id}`}>
                    <motion.div
                      className="grid grid-cols-[50px_40px_1fr_60px] items-center gap-2 px-3 py-2 border-b border-[#F0F0F0] last:border-b-0 transition-colors"
                      style={{ backgroundColor: i % 2 === 0 ? "#ffffff" : "#FAFAFA" }}
                      whileHover={{ backgroundColor: `${typeColor}0A` }}
                    >
                      <span className="font-jetbrains text-[10px] text-[#888888]">
                        #{String(id).padStart(3, "0")}
                      </span>
                      <Image src={sprite} alt={name} width={32} height={32} className="object-contain" loading="lazy" />
                      <span className="font-nunito font-bold text-[13px] text-[#111111] capitalize truncate">{name}</span>
                      <span className="font-jetbrains text-[10px] text-[#AAAAAA] text-right">
                        #{String(id).padStart(4, "0")}
                      </span>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          )}

          {/* Load more */}
          {!query && visible < filtered.length && (
            <div className="mt-5 flex justify-center">
              <motion.button
                onClick={() => setVisible((v) => v + PAGE_SIZE)}
                className="flex items-center gap-2 border-2 border-[#111111] px-6 py-3 font-press-start text-[9px] bg-white hover:bg-[#111111] hover:text-white transition-colors"
                style={{ boxShadow: `3px 3px 0 ${typeColor}` }}
                whileHover={{ x: 3, y: 3, boxShadow: "0px 0px 0 transparent" }}
              >
                <ChevronDown size={13} />
                CARGAR MÁS ({filtered.length - visible} restantes)
              </motion.button>
            </div>
          )}

          {/* Nota al pie */}
          <p className="font-nunito text-[12px] text-[#AAAAAA] mt-4 text-right italic">
            Incluye Pokémon de todas las generaciones y métodos de aprendizaje
          </p>
        </div>
      </div>
    </section>
  );
}