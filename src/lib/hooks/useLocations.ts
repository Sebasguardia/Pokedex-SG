import { useQuery } from "@tanstack/react-query";
import { getRegionList, getRegionByIdOrName, getLocationByIdOrName, getLocationAreaByIdOrName } from "../api/locations";

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
    });
}

export function useLocation(idOrName: string | number) {
    return useQuery({
        queryKey: ["locations", "detail", idOrName],
        queryFn: () => getLocationByIdOrName(idOrName),
        enabled: !!idOrName,
    });
}

export function useLocationArea(idOrName: string | number) {
    return useQuery({
        queryKey: ["location-areas", "detail", idOrName],
        queryFn: () => getLocationAreaByIdOrName(idOrName),
        enabled: !!idOrName,
    });
}
