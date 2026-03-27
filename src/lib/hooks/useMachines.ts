import { useQuery } from "@tanstack/react-query";
import {
  getMoveList, getMoveDetail, getMachineItem,
  getMachineById, getMovesDetail,
} from "../api/machines";
import { POPULAR_TM_MOVES_UNIQUE } from "@/lib/constants/machines.constants";

/** Lista ligera de todos los movimientos — para la searchbar Fuse.js */
export function useMoveList() {
  return useQuery({
    queryKey:  ["moves", "list"],
    queryFn:   getMoveList,
    staleTime: Infinity,
    gcTime:    Infinity,
  });
}

/** Movimientos populares precargados para la lista inicial */
export function usePopularTMMoves() {
  return useQuery({
    queryKey:  ["moves", "popular-tms"],
    queryFn:   () => getMovesDetail(POPULAR_TM_MOVES_UNIQUE),
    staleTime: Infinity,
    gcTime:    Infinity,
  });
}

/** Detalle de un movimiento individual */
export function useMoveDetail(nameOrId: string | number, enabled = true) {
  return useQuery({
    queryKey:  ["move", nameOrId],
    queryFn:   () => getMoveDetail(nameOrId),
    enabled:   !!nameOrId && enabled,
    staleTime: Infinity,
  });
}

/** Ítem TM/HM/TR — para el sprite del disco */
export function useMachineItem(itemName: string, enabled = true) {
  return useQuery({
    queryKey:  ["machine-item", itemName],
    queryFn:   () => getMachineItem(itemName),
    enabled:   !!itemName && enabled,
    staleTime: Infinity,
  });
}

/** Máquina individual — para obtener el número de TM (lazy) */
export function useMachineById(id: number, enabled = true) {
  return useQuery({
    queryKey:  ["machine", id],
    queryFn:   () => getMachineById(id),
    enabled:   id > 0 && enabled,
    staleTime: Infinity,
  });
}

/** Lista de máquinas a partir de las referencias de un movimiento */
export function useMachines(machinesRefs?: { machine: { url: string }, version_group: { name: string, url: string } }[]) {
  return useQuery({
    queryKey: ["move-machines", machinesRefs?.map(m => m.machine.url).join(",")],
    queryFn: async () => {
      if (!machinesRefs || machinesRefs.length === 0) return [];
      
      const promises = machinesRefs.map(async (m) => {
        const res = await fetch(m.machine.url);
        if (!res.ok) throw new Error(`Failed to fetch machine data: ${res.status}`);
        const data = await res.json();
        return {
          ...data,
          version_group: m.version_group
        };
      });
      
      return Promise.all(promises);
    },
    enabled: !!machinesRefs && machinesRefs.length > 0,
    staleTime: Infinity,
  });
}