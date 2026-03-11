import { apiClient } from "./client";
import { Ability } from "@/types/api/ability.types";
import { NamedAPIResourceList } from "@/types/api/common.types";

export async function getAbilityList(limit = 20, offset = 0) {
    const { data } = await apiClient.get<NamedAPIResourceList>("/ability", { params: { limit, offset } });
    return data;
}

export async function getAbilityByIdOrName(idOrName: string | number) {
    const { data } = await apiClient.get<Ability>(`/ability/${idOrName}`);
    return data;
}
