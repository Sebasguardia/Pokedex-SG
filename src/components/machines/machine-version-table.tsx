"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { useMachineById } from "@/lib/hooks/useMachines";
import {
  VERSION_GROUP_META, GEN_COLORS, GEN_LABELS,
  getMachineLabel, TR_VERSION_GROUPS,
} from "@/lib/constants/machines.constants";
import { NamedAPIResource } from "@/types/api/common.types";

interface MachineVersionTableProps {
  machines:  { machine: NamedAPIResource; version_group: NamedAPIResource }[];
  typeColor: string;
}

// Fila individual — hace fetch lazy del número de TM
function MachineRow({
  machine, versionGroup, typeColor,
}: {
  machine:      NamedAPIResource;
  versionGroup: NamedAPIResource;
  typeColor:    string;
}) {
  const machineId = parseInt(machine.url.match(/\/(\d+)\/?$/)?.[1] ?? "0");
  const { data }  = useMachineById(machineId, machineId > 0);

  const tmLabel   = data?.item?.name ? getMachineLabel(data.item.name) : null;
  const isTR      = data?.item?.name?.startsWith("tr") ?? false;
  const isHM      = data?.item?.name?.startsWith("hm") ?? false;
  const gameMeta  = VERSION_GROUP_META[versionGroup.name];
  const gameLabel = gameMeta?.label ?? versionGroup.name.replace(/-/g, " ");

  const badgeColor = isTR ? "#555555" : isHM ? "#1565C0" : typeColor;

  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-[#F5F5F5] last:border-b-0 hover:bg-[#FAFAFA] transition-colors">
      <span className="font-nunito font-bold text-[14px] text-[#111111] capitalize">{gameLabel}</span>
      <div className="flex items-center gap-2">
        {isTR && (
          <span className="font-press-start text-[7px] px-2 py-1 bg-[#555555] text-white">
            UN USO
          </span>
        )}
        {isHM && (
          <span className="font-press-start text-[7px] px-2 py-1 bg-[#1565C0] text-white">
            MO
          </span>
        )}
        {tmLabel ? (
          <span
            className="font-press-start text-[9px] px-3 py-1.5 border-2 border-[#111111]"
            style={{ backgroundColor: badgeColor, color: "#ffffff" }}
          >
            {tmLabel}
          </span>
        ) : (
          <div className="w-[56px] h-[28px] bg-[#F0F0F0] animate-pulse" />
        )}
      </div>
    </div>
  );
}

export function MachineVersionTable({ machines, typeColor }: MachineVersionTableProps) {
  // Agrupar por generación
  const grouped = useMemo(() => {
    const map = new Map<number, typeof machines>();
    machines.forEach((m: { machine: NamedAPIResource; version_group: NamedAPIResource }) => {
      const gen = VERSION_GROUP_META[m.version_group.name]?.gen ?? 0;
      if (!map.has(gen)) map.set(gen, []);
      map.get(gen)!.push(m);
    });
    // Ordenar por gen
    return Array.from(map.entries()).sort(([a], [b]) => a - b);
  }, [machines]);

  if (machines.length === 0) {
    return (
      <section>
        <div className="flex items-center gap-4 mb-6">
          <h2 className="font-press-start text-[14px] uppercase tracking-tighter text-[#111111] whitespace-nowrap">
            Disponible En
          </h2>
          <div className="h-px bg-[#E0E0E0] flex-1" />
        </div>
        <div className="border-2 border-[#E0E0E0] p-8 text-center">
          <p className="font-nunito text-[14px] text-[#AAAAAA]">
            No hay datos de disponibilidad por versión para este movimiento.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="flex items-center gap-4 mb-6">
        <h2 className="font-press-start text-[14px] uppercase tracking-tighter text-[#111111] whitespace-nowrap">
          Disponible En
        </h2>
        <div className="h-px bg-[#E0E0E0] flex-1" />
        <span
          className="font-press-start text-[8px] px-3 py-1.5 border-2 border-[#111111] shrink-0"
          style={{ color: typeColor }}
        >
          {machines.length} versiones
        </span>
      </div>

      <div className="flex flex-col gap-4">
        {grouped.map(([gen, entries], gi) => {
          const genColor = GEN_COLORS[gen] ?? "#888888";
          const genLabel = GEN_LABELS[gen] ?? `Gen ${gen}`;
          return (
            <motion.div
              key={gen}
              className="border-2 border-[#111111] overflow-hidden"
              style={{ boxShadow: `4px 4px 0 ${genColor}` }}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: gi * 0.06 }}
            >
              {/* Header de generación */}
              <div className="px-4 py-3 flex items-center gap-2" style={{ backgroundColor: genColor }}>
                <span className="font-press-start text-[9px] text-white">{genLabel.toUpperCase()}</span>
              </div>

              {/* Filas */}
              <div className="bg-white">
                {entries.map((m) => (
                  <MachineRow
                    key={m.version_group.name}
                    machine={m.machine}
                    versionGroup={m.version_group}
                    typeColor={typeColor}
                  />
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Nota */}
      <motion.div
        className="mt-5 border-l-4 bg-[#111111] px-5 py-3"
        style={{ borderColor: typeColor }}
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
      >
        <p className="font-nunito text-[13px] text-white/60">
          El número de TM puede cambiar entre generaciones. Los MO (HM) siguen siendo
          válidos en los juegos donde aparecen. Los TRs de Galar son de un solo uso.
        </p>
      </motion.div>
    </section>
  );
}