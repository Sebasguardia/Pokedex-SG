import { apiClient } from "./client";
import { Generation } from "@/types/api/generation.types";
import { NamedAPIResourceList } from "@/types/api/common.types";

// Lista básica (ya existía)
export async function getGenerationList() {
    const { data } = await apiClient.get<NamedAPIResourceList>("/generation");
    return data;
}

// Individual (ya existía)
export async function getGenerationByIdOrName(idOrName: string | number) {
    const { data } = await apiClient.get<Generation>(`/generation/${idOrName}`);
    return data;
}

// NUEVO: carga las 9 generaciones completas de una vez (son solo 9 — caben todas)
export async function getGenerationsList(): Promise<Generation[]> {
    const listRes = await apiClient.get<NamedAPIResourceList>("/generation?limit=20");
    const results = listRes.data.results;
    const details = await Promise.all(
        results.map((g) => {
            const path = g.url.replace("https://pokeapi.co/api/v2", "");
            return apiClient.get<Generation>(path).then((r) => r.data);
        })
    );
    return details;
}