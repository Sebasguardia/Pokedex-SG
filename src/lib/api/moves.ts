import { apiClient } from "./client";
import { Move } from "@/types/api/move.types";
import { NamedAPIResourceList } from "@/types/api/common.types";

export async function getMoveList(limit = 20, offset = 0) {
    const { data } = await apiClient.get<NamedAPIResourceList>("/move", { params: { limit, offset } });
    return data;
}

export async function getMoveByIdOrName(idOrName: string | number) {
    const { data } = await apiClient.get<Move>(`/move/${idOrName}`);
    return data;
}
