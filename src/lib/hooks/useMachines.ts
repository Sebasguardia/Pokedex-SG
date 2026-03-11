import { useQuery } from "@tanstack/react-query"
import { apiClient } from "../api/client"
import { MachineVersionDetail } from "@/types/api/move.types"

interface MachineData {
    id: number
    item: { name: string; url: string }
    move: { name: string; url: string }
    version_group: { name: string; url: string }
}

async function fetchMachineData(url: string): Promise<MachineData> {
    // The URL is a full URL not a path, so call directly
    const { data } = await apiClient.get<MachineData>(url.replace("https://pokeapi.co/api/v2", ""))
    return data
}

export function useMachines(machines: MachineVersionDetail[] | undefined) {
    return useQuery({
        queryKey: ["machines", machines?.map(m => m.machine.url).join(",")],
        queryFn: async () => {
            if (!machines || machines.length === 0) return []
            const results = await Promise.allSettled(
                machines.map(m => fetchMachineData(m.machine.url).then(data => ({
                    ...data,
                    version_group: m.version_group
                })))
            )
            return results
                .filter((r): r is PromiseFulfilledResult<MachineData & { version_group: { name: string; url: string } }> => r.status === "fulfilled")
                .map(r => r.value)
        },
        enabled: !!machines && machines.length > 0,
        staleTime: 1000 * 60 * 60,
    })
}
