import { apiClient } from "./client";
import { MoveDetail, MachineItem, Machine } from "@/types/api/machine.types";
import { NamedAPIResourceList }             from "@/types/api/common.types";

/** Lista ligera de todos los movimientos (name + url) — para la searchbar */
export async function getMoveList(): Promise<NamedAPIResourceList> {
  const { data } = await apiClient.get<NamedAPIResourceList>("/move?limit=2000");
  return data;
}

/** Detalle completo de un movimiento (incluye machines[] y learned_by_pokemon[]) */
export async function getMoveDetail(nameOrId: string | number): Promise<MoveDetail> {
  const { data } = await apiClient.get<MoveDetail>(`/move/${nameOrId}`);
  return data;
}

/** Ítem TM/HM/TR para su sprite */
export async function getMachineItem(nameOrId: string | number): Promise<MachineItem> {
  const { data } = await apiClient.get<MachineItem>(`/item/${nameOrId}`);
  return data;
}

/** Detalle de una máquina individual (para obtener item.name con el número de TM) */
export async function getMachineById(id: number): Promise<Machine> {
  const { data } = await apiClient.get<Machine>(`/machine/${id}`);
  return data;
}

/** Carga múltiples movimientos en paralelo */
export async function getMovesDetail(names: string[]): Promise<MoveDetail[]> {
  const results = await Promise.allSettled(names.map((n) => getMoveDetail(n)));
  return results
    .filter((r): r is PromiseFulfilledResult<MoveDetail> => r.status === "fulfilled")
    .map((r) => r.value);
}