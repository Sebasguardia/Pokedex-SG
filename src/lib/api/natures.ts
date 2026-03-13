import { apiClient } from "./client";
import { Nature } from "@/types/api/nature.types";
import { NamedAPIResourceList } from "@/types/api/common.types";

/** Todas las naturalezas completas de una sola vez — solo 25, estáticas */
export async function getNaturesList(): Promise<Nature[]> {
    const { data } = await apiClient.get<NamedAPIResourceList>("/nature?limit=30");
    const details = await Promise.all(
        data.results.map((n) => {
            const path = n.url.replace("https://pokeapi.co/api/v2", "");
            return apiClient.get<Nature>(path).then((r) => r.data);
        })
    );
    return details;
}

/** Una naturaleza individual por nombre o ID */
export async function getNatureByIdOrName(idOrName: string | number): Promise<Nature> {
    const { data } = await apiClient.get<Nature>(`/nature/${idOrName}`);
    return data;
}