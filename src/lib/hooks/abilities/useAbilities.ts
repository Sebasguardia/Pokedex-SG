import { useQuery } from "@tanstack/react-query";
import { getAbilityList, getAbilityByIdOrName } from "@/lib/api/abilities";

export function useAbilities(limit = 20, offset = 0) {
    return useQuery({
        queryKey: ["abilities", "list", { limit, offset }],
        queryFn: () => getAbilityList(limit, offset),
    });
}

export function useAbility(idOrName: string | number) {
    return useQuery({
        queryKey: ["abilities", "detail", idOrName],
        queryFn: () => getAbilityByIdOrName(idOrName),
        enabled: !!idOrName,
    });
}
