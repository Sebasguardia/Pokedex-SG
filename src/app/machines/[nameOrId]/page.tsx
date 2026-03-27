"use client";

import { useParams } from "next/navigation";
import { notFound }  from "next/navigation";
import { motion }    from "framer-motion";

import { useMoveDetail }               from "@/lib/hooks/useMachines";
import {
  TYPE_COLORS, getLatestTMLabel, formatMoveName,
} from "@/lib/constants/machines.constants";
import { MachineDetailHero }    from "@/components/machines/machine-detail-hero";
import { MachineMoveStats }     from "@/components/machines/machine-move-stats";
import { MachineVersionTable }  from "@/components/machines/machine-version-table";
import { MachineLearnerGrid }   from "@/components/machines/machine-learners-grid";
import { PageTransitionMachine } from "@/components/shared/page-transition-machine";
import { ScrollProgressBar }    from "@/components/shared/scroll-progress-bar";

// ── Loading skeleton ──────────────────────────────────────────────────────────
function LoadingSkeleton() {
  return (
    <div className="w-full min-h-screen bg-white">
      <div className="bg-[#111111] h-[300px] animate-pulse relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        />
      </div>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12 space-y-12">
        {[180, 260, 200, 360].map((h, i) => (
          <div key={i} className="border-2 border-[#E0E0E0] bg-[#F8F8F8] animate-pulse" style={{ height: h }} />
        ))}
      </div>
    </div>
  );
}

// ── Página ────────────────────────────────────────────────────────────────────
export default function MachineDetailPage() {
  // La ruta usa el NOMBRE del movimiento: /machines/earthquake
  const { nameOrId } = useParams<{ nameOrId: string }>();

  const { data: move, isLoading, isError } = useMoveDetail(nameOrId);

  // Color del tipo
  const typeColor = move ? (TYPE_COLORS[move.type.name] ?? "#888888") : "#888888";

  // Nombre en español
  const moveNameEs = move
    ? (move.names.find((n) => n.language.name === "es")?.name ?? formatMoveName(move.name))
    : formatMoveName(nameOrId as string ?? "");

  // Label TM más reciente
  const latestTM = move ? getLatestTMLabel(move.machines as any) : "TM??";

  if (isLoading) return <LoadingSkeleton />;
  if (isError || !move) return notFound();

  return (
    <>
      <PageTransitionMachine typeColor={typeColor} moveNameEs={moveNameEs} tmLabel={latestTM} />

      {/* Scrollbar del tipo */}
      <style jsx global>{`
        ::-webkit-scrollbar-thumb { background-color: ${typeColor}; }
      `}</style>

      {/* Tinte radial */}
      <div
        className="fixed inset-0 pointer-events-none z-0 hidden md:block"
        style={{ background: `radial-gradient(circle at 0% 0%, ${typeColor}07, transparent 50%)` }}
      />

      <ScrollProgressBar color={typeColor} />

      <motion.main
        className="relative z-10 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.62 }}
      >
        {/* 1 — HERO */}
        <MachineDetailHero
          move={move}
          typeColor={typeColor}
          moveNameEs={moveNameEs}
          latestTM={latestTM}
        />

        {/* 2 — BODY */}
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12 space-y-16 relative z-10">

          {/* Stats del movimiento + efecto */}
          <MachineMoveStats move={move} typeColor={typeColor} />

          {/* En qué versiones y con qué número de TM */}
          <MachineVersionTable machines={move.machines} typeColor={typeColor} />

          {/* Pokémon compatibles */}
          <MachineLearnerGrid
            learnedByPokemon={move.learned_by_pokemon}
            typeColor={typeColor}
            moveName={moveNameEs}
          />

        </div>
      </motion.main>
    </>
  );
}