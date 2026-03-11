import { apiClient } from "./client";
import { Berry } from "@/types/api/berry.types";
import { NamedAPIResourceList } from "@/types/api/common.types";

export async function getBerryList(limit = 64, offset = 0) {
    const { data } = await apiClient.get<NamedAPIResourceList>("/berry", { params: { limit, offset } });
    return data;
}

export async function getBerryByIdOrName(idOrName: string | number) {
    const { data } = await apiClient.get<Berry>(`/berry/${idOrName}`);
    return data;
}

export async function getBerryFirmnesses() {
    const { data } = await apiClient.get<NamedAPIResourceList>("/berry-firmness");
    return data;
}

export async function getBerryFlavors() {
    const { data } = await apiClient.get<NamedAPIResourceList>("/berry-flavor");
    return data;
}
