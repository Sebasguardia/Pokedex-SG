"use client";

import { useState, useMemo, Suspense } from "react";
import { motion } from "framer-motion";
import Fuse from "fuse.js";

import { usePopularTMMoves, useMoveList } from "@/lib/hooks/moves/useMachines";
import { TYPE_COLORS }                    from "@/lib/constants/machines/machines.constants";
import { MachineMoveCard }                from "@/components/machines/machine-move-card";
import { MachineFilterBar }               from "@/components/machines/machine-filter-bar";
import { MachineMoveList }                from "@/components/machines/machine-move-list";
import {
  MachinesPageHeader, MachineViewToggle,
} from "@/components/machines/machine-list-components";
import { PageTransitionMachines } from "@/components/shared/page-transitions/machines/page-transition-machines";

function MachinesContent() {
  const { data: popularMoves, isLoading } = usePopularTMMoves();
  const { data: moveList }                = useMoveList();

  const [view,        setView]        = useState<"list" | "grid">("list");
  const [typeFilter,  setTypeFilter]  = useState<string | null>(null);
  const [classFilter, setClassFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Fuse.js sobre la lista ligera completa (para búsqueda)
  const fuse = useMemo(() => {
    if (!moveList) return null;
    return new Fuse(moveList.results, { keys: ["name"], threshold: 0.3 });
  }, [moveList]);

  // IDs de resultados de búsqueda
  const searchResultNames = useMemo(() => {
    if (!searchQuery.trim() || !fuse) return null;
    return new Set(fuse.search(searchQuery).map((r) => r.item.name));
  }, [searchQuery, fuse]);

  // Filtrar sobre los moves populares cargados
  const filtered = useMemo(() => {
    if (!popularMoves) return [];
    let list = popularMoves;

    if (typeFilter)
      list = list.filter((m) => m.type.name === typeFilter);
    if (classFilter)
      list = list.filter((m) => m.damage_class.name === classFilter);
    if (searchResultNames)
      list = list.filter((m) => searchResultNames.has(m.name));

    return list;
  }, [popularMoves, typeFilter, classFilter, searchResultNames]);

  const clearFilters = () => {
    setTypeFilter(null);
    setClassFilter(null);
    setSearchQuery("");
  };

  return (
    <>
      <PageTransitionMachines />

      {/* Dot grid BG */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.02]"
        style={{ backgroundImage: "radial-gradient(#111111 1px, transparent 1px)", backgroundSize: "32px 32px" }}
      />

      <motion.main
        className="relative min-h-screen bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.32 }}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10 relative z-10">
          {/* Breadcrumb */}
          <p className="font-nunito text-[13px] text-[#888888] mb-8">Inicio / TMs y Máquinas</p>

          {/* Header */}
          <MachinesPageHeader />

          {/* Controles */}
          <div className="mt-10 mb-6 flex flex-col gap-5">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <MachineViewToggle view={view} onViewChange={setView} />
              <motion.p
                className="font-nunito text-[13px] text-[#888888]"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              >
                Mostrando los más buscados · busca para ver más
              </motion.p>
            </div>

            <MachineFilterBar
              typeFilter={typeFilter}
              damageClassFilter={classFilter}
              searchQuery={searchQuery}
              onTypeFilter={setTypeFilter}
              onDamageClassFilter={setClassFilter}
              onSearch={setSearchQuery}
              totalShown={filtered.length}
              totalAll={popularMoves?.length ?? 60}
            />
          </div>

          {/* Contenido */}
          <MachineMoveList
            filtered={filtered}
            view={view}
            isLoading={isLoading}
            onClear={clearFilters}
          />

        </div>
      </motion.main>
    </>
  );
}

export default function MachinesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="border-2 border-[#111111] px-6 py-4" style={{ boxShadow: "4px 4px 0 #CC0000" }}>
            <span className="font-press-start text-[11px] text-[#111111]">CARGANDO...</span>
          </div>
        </div>
      }
    >
      <MachinesContent />
    </Suspense>
  );
}