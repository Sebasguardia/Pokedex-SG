import { apiClient } from "./client";
import { NamedAPIResourceList } from "@/types/api/common.types";

export interface Machine {
    id: number;
    item: { name: string; url: string };
    move: { name: string; url: string };
    version_group: { name: string; url: string };
}

export async function getMachineList(limit = 100, offset = 0) {
    const { data } = await apiClient.get<NamedAPIResourceList>("/machine", { params: { limit, offset } });
    return data;
}

export async function getMachineById(id: number) {
    const { data } = await apiClient.get<Machine>(`/machine/${id}`);
    return data;
}
