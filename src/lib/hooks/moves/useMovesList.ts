import { useQuery, useQueries } from "@tanstack/react-query"
import { apiClient } from "@/lib/api/client"
import { Move } from "@/types/api/move.types"
import { NamedAPIResource } from "@/types/api/common.types"
import { useMemo } from "react"
import { GEN_ROMAN } from "@/lib/constants/moves/moves.constants"

export interface MoveFilters {
    type?: string | null
    damageClass?: string | null
    generation?: string | null
    minPower?: number
    maxPower?: number
    sort?: string | null
    order?: string | null
    page?: number
    limit?: number
    search?: string | null
}

interface MoveListItem {
    name: string
    url: string
    id: number
}

// Fetches the full list of all move names (lightweight — 1 API call)
async function fetchAllMoveNames(): Promise<MoveListItem[]> {
    const { data } = await apiClient.get<{ count: number; results: NamedAPIResource[] }>("/move", {
        params: { limit: 2000, offset: 0 }
    })
    return data.results.map(m => ({
        name: m.name,
        url: m.url,
        id: parseInt(m.url.split("/").filter(Boolean).pop() || "0")
    }))
}

// Fetch a batch of move details in parallel
async function fetchMovesBatch(names: string[]): Promise<Move[]> {
    const results = await Promise.allSettled(
        names.map(name => apiClient.get<Move>(`/move/${name}`).then(r => r.data))
    )
    return results
        .filter((r): r is PromiseFulfilledResult<Move> => r.status === "fulfilled")
        .map(r => r.value)
}

export function useAllMoveNames() {
    return useQuery({
        queryKey: ["moves", "all-names"],
        queryFn: fetchAllMoveNames,
        staleTime: 1000 * 60 * 60, // 1 hour
    })
}

export function useMoveDetails(names: string[], enabled: boolean = true) {
    return useQuery({
        queryKey: ["moves", "batch", names.join(",")],
        queryFn: () => fetchMovesBatch(names),
        enabled: enabled && names.length > 0,
        staleTime: 1000 * 60 * 30, // 30 minutes
    })
}

// ────────────────────────────────────────────────────────────────────────────
// Full moves hook — loads ALL moves progressively using parallel batch queries
// Supports search + filters client-side after data is loaded
// ────────────────────────────────────────────────────────────────────────────
const BATCH_SIZE = 100

export function useMovesFull(filters: MoveFilters) {
    // Step 1: Fetch all names (1 lightweight API call)
    const namesQuery = useAllMoveNames()
    const allNames = namesQuery.data ?? []

    // Step 2: Split into batches
    const batches = useMemo(() => {
        const result: string[][] = []
        for (let i = 0; i < allNames.length; i += BATCH_SIZE) {
            result.push(allNames.slice(i, i + BATCH_SIZE).map(m => m.name))
        }
        return result
    }, [allNames])

    // Step 3: Parallel batch queries (React Query fires them concurrently)
    const batchResults = useQueries({
        queries: batches.map(batch => ({
            queryKey: ["moves", "batch", batch.join(",")],
            queryFn: () => fetchMovesBatch(batch),
            enabled: namesQuery.isSuccess && batches.length > 0,
            staleTime: 1000 * 60 * 30,
        }))
    })

    // Combine all loaded moves
    const allMoves = useMemo(
        () => batchResults.flatMap(r => r.data ?? []),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [batchResults.map(r => r.dataUpdatedAt).join(",")]
    )

    const loadedCount = allMoves.length
    const totalCount = allNames.length
    const isLoading = namesQuery.isLoading
    const isLoadingMore = batchResults.some(r => r.isLoading || r.isFetching)
    const loadProgress = totalCount > 0 ? Math.round((loadedCount / totalCount) * 100) : 0

    // Step 4: Apply filters + sort client-side
    const filtered = useMemo(() => {
        const moves = allMoves
        if (!moves.length) return { results: [], count: 0, hasFilters: false }

        const hasType = !!(filters.type && filters.type !== "all")
        const hasClass = !!(filters.damageClass && filters.damageClass !== "all")
        const hasGen = !!(filters.generation && filters.generation !== "all")
        const hasPower = (filters.minPower ?? 0) > 0 || (filters.maxPower ?? 250) < 250
        const hasSearch = !!(filters.search && filters.search.trim())
        const hasFilters = hasType || hasClass || hasGen || hasPower || hasSearch

        let result = moves.filter(m => {
            if (hasType && m.type?.name !== filters.type) return false
            if (hasClass && m.damage_class?.name !== filters.damageClass) return false
            if (hasGen) {
                const genKey = m.generation?.name
                const genRoman = GEN_ROMAN[genKey ?? ""] ?? ""
                if (genRoman !== filters.generation) return false
            }
            if (hasPower) {
                const pow = m.power ?? 0
                if (pow < (filters.minPower ?? 0)) return false
                if (pow > (filters.maxPower ?? 250)) return false
            }
            if (hasSearch) {
                const q = filters.search!.toLowerCase().trim()
                const nameES = m.names?.find(n => n.language.name === "es")?.name ?? m.name
                if (!nameES.toLowerCase().includes(q) && !m.name.toLowerCase().includes(q)) return false
            }
            return true
        })

        // Sort
        const sortField = filters.sort ?? "id"
        const sortOrder = filters.order ?? "asc"
        result = [...result].sort((a, b) => {
            let va: number | string = a.id
            let vb: number | string = b.id
            if (sortField === "name") {
                va = a.names?.find(n => n.language.name === "es")?.name ?? a.name
                vb = b.names?.find(n => n.language.name === "es")?.name ?? b.name
            } else if (sortField === "power") {
                va = a.power ?? -1
                vb = b.power ?? -1
            } else if (sortField === "accuracy") {
                va = a.accuracy ?? 101
                vb = b.accuracy ?? 101
            } else if (sortField === "pp") {
                va = a.pp ?? 0
                vb = b.pp ?? 0
            }
            if (va < vb) return sortOrder === "asc" ? -1 : 1
            if (va > vb) return sortOrder === "asc" ? 1 : -1
            return 0
        })

        return { results: result, count: result.length, hasFilters }
    }, [allMoves, filters])

    return {
        data: filtered,
        totalCount,
        loadedCount,
        isLoading,
        isLoadingMore,
        loadProgress,
    }
}

// Legacy paginated hook (kept for compatibility)
export function useMovesList(filters: MoveFilters) {
    const PAGE_SIZE = filters.limit ?? 30
    const page = filters.page ?? 1
    const offset = (page - 1) * PAGE_SIZE

    const simpleQuery = useQuery({
        queryKey: ["moves", "list", "simple", { offset, limit: 200 }],
        queryFn: async () => {
            const { data } = await apiClient.get<{ count: number; results: NamedAPIResource[] }>("/move", {
                params: { limit: 200, offset }
            })
            return data
        },
        staleTime: 1000 * 60 * 30,
    })

    const moveNames = useMemo(
        () => (simpleQuery.data?.results ?? []).map(r => r.name),
        [simpleQuery.data]
    )

    const detailsQuery = useMoveDetails(moveNames, !!simpleQuery.data)

    const filtered = useMemo(() => {
        const moves = detailsQuery.data ?? []
        if (!moves.length) return { results: [], count: simpleQuery.data?.count ?? 0, hasFilters: false }

        const hasType = !!(filters.type && filters.type !== "all")
        const hasClass = !!(filters.damageClass && filters.damageClass !== "all")
        const hasGen = !!(filters.generation && filters.generation !== "all")
        const hasPower = (filters.minPower ?? 0) > 0 || (filters.maxPower ?? 250) < 250
        const hasSearch = !!(filters.search && filters.search.trim())
        const hasFilters = hasType || hasClass || hasGen || hasPower || hasSearch

        let result = moves.filter(m => {
            if (hasType && m.type?.name !== filters.type) return false
            if (hasClass && m.damage_class?.name !== filters.damageClass) return false
            if (hasGen) {
                const genKey = m.generation?.name
                const genRoman = GEN_ROMAN[genKey ?? ""] ?? ""
                if (genRoman !== filters.generation) return false
            }
            if (hasPower) {
                const pow = m.power ?? 0
                if (pow < (filters.minPower ?? 0)) return false
                if (pow > (filters.maxPower ?? 250)) return false
            }
            if (hasSearch) {
                const q = filters.search!.toLowerCase().trim()
                const nameES = m.names?.find(n => n.language.name === "es")?.name ?? m.name
                if (!nameES.toLowerCase().includes(q) && !m.name.toLowerCase().includes(q)) return false
            }
            return true
        })

        const sortField = filters.sort ?? "id"
        const sortOrder = filters.order ?? "asc"
        result = [...result].sort((a, b) => {
            let va: number | string = a.id
            let vb: number | string = b.id
            if (sortField === "name") {
                va = a.names?.find(n => n.language.name === "es")?.name ?? a.name
                vb = b.names?.find(n => n.language.name === "es")?.name ?? b.name
            } else if (sortField === "power") {
                va = a.power ?? -1; vb = b.power ?? -1
            } else if (sortField === "accuracy") {
                va = a.accuracy ?? 101; vb = b.accuracy ?? 101
            } else if (sortField === "pp") {
                va = a.pp ?? 0; vb = b.pp ?? 0
            }
            if (va < vb) return sortOrder === "asc" ? -1 : 1
            if (va > vb) return sortOrder === "asc" ? 1 : -1
            return 0
        })

        const pageStart = (page - 1) * PAGE_SIZE
        const pagedResult = result.slice(pageStart, pageStart + PAGE_SIZE)

        return { results: pagedResult, count: result.length, hasFilters }
    }, [detailsQuery.data, filters, simpleQuery.data, page, PAGE_SIZE])

    return {
        data: { results: filtered.results, count: filtered.count, hasFilters: filtered.hasFilters },
        isLoading: simpleQuery.isLoading || detailsQuery.isLoading,
        isFetching: simpleQuery.isFetching || detailsQuery.isFetching,
    }
}
