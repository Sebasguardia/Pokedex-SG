import { apiClient } from "./client";
import { Generation } from "@/types/api/generation.types";
import { NamedAPIResourceList } from "@/types/api/common.types";

export async function getGenerationList() {
    const { data } = await apiClient.get<NamedAPIResourceList>("/generation");
    return data;
}

export async function getGenerationByIdOrName(idOrName: string | number) {
    const { data } = await apiClient.get<Generation>(`/generation/${idOrName}`);
    return data;
}
