import { useQuery } from "@tanstack/react-query";
import { getTypeList, getTypeByIdOrName } from "@/lib/api/types";
import { typeKeys } from "@/lib/constants/api/query-keys";

export function useTypes() {
    return useQuery({
        queryKey: typeKeys.lists(),
        queryFn: () => getTypeList(),
    });
}

export function useType(idOrName: string | number) {
    return useQuery({
        queryKey: typeKeys.detail(idOrName),
        queryFn: () => getTypeByIdOrName(idOrName),
        enabled: !!idOrName,
    });
}
