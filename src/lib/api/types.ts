import { apiClient } from "./client";
import { PokemonType } from "@/types/api/type.types";
import { NamedAPIResourceList, NamedAPIResource } from "@/types/api/common.types";

export async function getTypeList() {
    const { data } = await apiClient.get<NamedAPIResourceList>("/type");
    return data;
}

export async function getTypeByIdOrName(idOrName: string | number) {
    const { data } = await apiClient.get<PokemonType>(`/type/${idOrName}`);
    return data;
}
