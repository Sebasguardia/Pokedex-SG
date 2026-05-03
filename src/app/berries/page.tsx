"use client";

import { useState, Suspense } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useQueryState } from "nuqs";

import { useBerriesList } from "@/lib/hooks/berries/useBerriesList";
import { PageTransitionBerries } from "@/components/shared/page-transitions/berries/page-transition-berries";
import { BerryCard } from "@/components/berries/berry-card";
import { BerryFilterBar } from "@/components/berries/berry-filter-bar";
import {
  BerriesPageHeader,
  BerryViewToggle,
  BerryFlavorGroupView,
  BerryTableView,
  BerryLoadMore,
  BerryAllLoadedMessage,
  BerryEmptyState,
  BerrySkeletonGrid,
} from "@/components/berries/berry-list-components";

function BerriesContent() {
  const prefersRM = useReducedMotion();
  const [view, setView] = useState<"cards" | "table" | "flavor">("cards");

  const [flavor, setFlavor] = useQueryState("flavor");
  const [firmness, setFirmness] = useQueryState("firmness");
  const [effect, setEffect] = useQueryState("effect");
  const [sort, setSort] = useQueryState("sort", { defaultValue: "id" });

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useBerriesList({
    flavor, firmness, effect, sort,
  });

  const clearAllFilters = () => {
    setFlavor(null);
    setFirmness(null);
    setEffect(null);
    setSort(null);
  };

  const results = data?.pages.flatMap((page) => page.results) ?? [];
  const totalCount = data?.pages[0]?.count ?? 0;

  return (
    <>
      <PageTransitionBerries />

      <motion.main
        className="relative min-h-screen bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Subtle BG grid — same as other sections */}
        <div
          className="fixed inset-0 z-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage: "radial-gradient(#16A34A 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10 relative z-10">
          <motion.div
            initial={prefersRM ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.45, ease: "easeOut" }}
          >
            {/* Header */}
            <BerriesPageHeader count={totalCount} />

            {/* Filters + view toggle */}
            <div className="bg-white border-2 border-[#111111] p-4 mb-8" style={{ boxShadow: "4px 4px 0 #111111" }}>
              <BerryFilterBar
                flavor={flavor} onFlavorChange={setFlavor}
                firmness={firmness} onFirmnessChange={setFirmness}
                effect={effect} onEffectChange={setEffect}
                sort={sort} onSortChange={setSort}
                onClearAll={clearAllFilters}
              />
              <div className="h-px bg-[#E0E0E0] mx-0 my-4" />
              <BerryViewToggle activeView={view} onViewChange={setView} />
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="min-h-[400px]"
                >
                  <BerrySkeletonGrid />
                </motion.div>

              ) : results.length > 0 ? (
                <div key="content">
                  {view === "cards" && (
                    <motion.div
                      key="cards"
                      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                    >
                      {results.map((berry: any, i: number) => (
                        <BerryCard key={berry.name} berry={berry} index={i} />
                      ))}
                    </motion.div>
                  )}

                  {view === "flavor" && (
                    <motion.div
                      key="flavor"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25 }}
                    >
                      <BerryFlavorGroupView berries={results} />
                    </motion.div>
                  )}

                  {view === "table" && (
                    <motion.div
                      key="table"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.25 }}
                    >
                      <BerryTableView berries={results} />
                    </motion.div>
                  )}
                </div>

              ) : (
                <BerryEmptyState key="empty" onClear={clearAllFilters} />
              )}
            </AnimatePresence>

            {/* Load more */}
            {!isLoading && hasNextPage && (
              <BerryLoadMore onLoad={() => fetchNextPage()} isLoading={isFetchingNextPage} />
            )}

            {/* All loaded */}
            {!isLoading && !hasNextPage && results.length > 0 && (
              <BerryAllLoadedMessage count={totalCount} />
            )}
          </motion.div>
        </div>
      </motion.main>
    </>
  );
}

export default function BerriesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="border-2 border-[#111111] px-6 py-4" style={{ boxShadow: "4px 4px 0 #16A34A" }}>
          <span className="font-press-start text-[10px] text-[#111111]">CARGANDO BAYAS...</span>
        </div>
      </div>
    }>
      <BerriesContent />
    </Suspense>
  );
}