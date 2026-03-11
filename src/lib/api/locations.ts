import { apiClient } from "./client";
import { Location, LocationArea, Region } from "@/types/api/location.types";
import { NamedAPIResourceList } from "@/types/api/common.types";

export async function getRegionList() {
    const { data } = await apiClient.get<NamedAPIResourceList>("/region");
    return data;
}

export async function getRegionByIdOrName(idOrName: string | number) {
    const { data } = await apiClient.get<Region>(`/region/${idOrName}`);
    return data;
}

export async function getLocationByIdOrName(idOrName: string | number) {
    const { data } = await apiClient.get<Location>(`/location/${idOrName}`);
    return data;
}

export async function getLocationAreaByIdOrName(idOrName: string | number) {
    const { data } = await apiClient.get<LocationArea>(`/location-area/${idOrName}`);
    return data;
}
