import { apiClient } from "./client";
import {
    Location, LocationArea, Region, RegionalPokedex,
} from "@/types/api/location.types";
import { NamedAPIResourceList } from "@/types/api/common.types";

// ── Ya existían ───────────────────────────────────────────────────

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

// ── NUEVAS ────────────────────────────────────────────────────────

/**
 * Carga las 9 regiones completas de una sola vez con Promise.all.
 * Son solo 9 — caben en memoria y nunca cambian → staleTime: Infinity.
 */
export async function getRegionsList(): Promise<Region[]> {
    const { data } = await apiClient.get<NamedAPIResourceList>("/region?limit=20");
    const details = await Promise.all(
        data.results.map((r) => {
            const path = r.url.replace("https://pokeapi.co/api/v2", "");
            return apiClient.get<Region>(path).then((res) => res.data);
        })
    );
    return details;
}

/**
 * Pokédex regional — GET /pokedex/{name}
 * Ejemplos: "kanto", "original-johto", "hoenn", "original-sinnoh"...
 */
export async function getRegionalPokedex(name: string): Promise<RegionalPokedex> {
    const { data } = await apiClient.get<RegionalPokedex>(`/pokedex/${name}`);
    return data;
}