import { apiClient } from "./client";
import { EvolutionChain } from "@/types/api/evolution.types";

export async function getEvolutionChainById(id: number) {
    const { data } = await apiClient.get<EvolutionChain>(`/evolution-chain/${id}`);
    return data;
}

export async function getEvolutionChainByUrl(url: string) {
    const { data } = await apiClient.get<EvolutionChain>(url);
    return data;
}
