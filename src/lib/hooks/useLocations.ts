import { useQuery } from "@tanstack/react-query";
import {
    getRegionList, getRegionByIdOrName,
    getLocationByIdOrName, getLocationAreaByIdOrName,
    getRegionsList, getRegionalPokedex,
} from "../api/locations";

// ── Ya existían (sin cambios en firma) ───────────────────────────

export function useLocations() {
    return useQuery({
        queryKey: ["regions", "list"],
        queryFn: () => getRegionList(),
    });
}

export function useRegion(idOrName: string | number) {
    return useQuery({
        queryKey: ["regions", "detail", idOrName],
        queryFn: () => getRegionByIdOrName(idOrName),
        enabled: !!idOrName,
        staleTime: Infinity,
    });
}

/**
 * Carga una locación individual.
 * `enabled` es false por defecto — se activa on-demand al expandir el acordeón.
 */
export function useLocation(idOrName: string | number, enabled = false) {
    return useQuery({
        queryKey: ["locations", "detail", idOrName],
        queryFn: () => getLocationByIdOrName(idOrName),
        enabled: !!idOrName && enabled,
        staleTime: 5 * 60 * 1000,
    });
}

/**
 * Carga un área de locación con sus encuentros de Pokémon.
 * `enabled` es false por defecto — lazy load solo al expandir.
 */
export function useLocationArea(idOrName: string | number, enabled = false) {
    return useQuery({
        queryKey: ["location-areas", "detail", idOrName],
        queryFn: () => getLocationAreaByIdOrName(idOrName),
        enabled: !!idOrName && enabled,
        staleTime: 5 * 60 * 1000,
    });
}

// ── NUEVOS ────────────────────────────────────────────────────────

/**
 * Carga las 9 regiones completas de una sola vez.
 * staleTime: Infinity — datos estáticos, nunca revalidar.
 */
export function useRegionsList() {
    return useQuery({
        queryKey: ["regions", "all"],
        queryFn: getRegionsList,
        staleTime: Infinity,
        gcTime: Infinity,
    });
}

/**
 * Pokédex regional.
 * name: "kanto" | "original-johto" | "hoenn" | ...
 */
export function useRegionalPokedex(name: string, enabled = true) {
    return useQuery({
        queryKey: ["regional-pokedex", name],
        queryFn: () => getRegionalPokedex(name),
        enabled: !!name && enabled,
        staleTime: Infinity,
    });
}