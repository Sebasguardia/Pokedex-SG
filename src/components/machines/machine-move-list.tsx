"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MachineMoveCard } from "@/components/machines/machine-move-card";
import {
  MachineSkeleton, MachineEmptyState,
} from "@/components/machines/machine-list-components";

interface MachineMoveListProps {
  filtered: any[];
  view: "list" | "grid";
  isLoading: boolean;
  onClear: () => void;
}

export function MachineMoveList({ filtered, view, isLoading, onClear }: MachineMoveListProps) {
  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div key="skeleton" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <MachineSkeleton view={view} />
        </motion.div>
      ) : filtered.length === 0 ? (
        <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <MachineEmptyState onClear={onClear} />
        </motion.div>
      ) : view === "list" ? (
        <motion.div
          key="list"
          className="flex flex-col gap-4"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {filtered.map((move, i) => (
            <MachineMoveCard key={move.name} move={move} index={i} />
          ))}
        </motion.div>
      ) : (
        <motion.div
          key="grid"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {filtered.map((move, i) => (
            <MachineMoveCard key={move.name} move={move} index={i} />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
