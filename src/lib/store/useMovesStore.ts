import { create } from "zustand"
import { persist } from "zustand/middleware"

interface MovesStore {
    viewMode: "table" | "cards"
    setViewMode: (mode: "table" | "cards") => void
    typeFilter: string | null
    setTypeFilter: (type: string | null) => void
    classFilter: string | null
    setClassFilter: (damageClass: string | null) => void
    genFilter: string | null
    setGenFilter: (gen: string | null) => void
    minPow: string
    setMinPow: (pow: string) => void
    maxPow: string
    setMaxPow: (pow: string) => void
    sortField: string
    setSortField: (sort: string) => void
    sortOrder: string
    setSortOrder: (order: string) => void
    page: string
    setPage: (page: string) => void
    clearAllFilters: () => void
}

export const useMovesStore = create<MovesStore>()(
    persist(
        (set) => ({
            viewMode: "table",
            setViewMode: (viewMode) => set({ viewMode }),
            typeFilter: null,
            setTypeFilter: (typeFilter) => set({ typeFilter, page: "1" }),
            classFilter: null,
            setClassFilter: (classFilter) => set({ classFilter, page: "1" }),
            genFilter: null,
            setGenFilter: (genFilter) => set({ genFilter, page: "1" }),
            minPow: "0",
            setMinPow: (minPow) => set({ minPow, page: "1" }),
            maxPow: "250",
            setMaxPow: (maxPow) => set({ maxPow, page: "1" }),
            sortField: "id",
            setSortField: (sortField) => set({ sortField }),
            sortOrder: "asc",
            setSortOrder: (sortOrder) => set({ sortOrder }),
            page: "1",
            setPage: (page) => set({ page }),
            clearAllFilters: () => set({
                typeFilter: null,
                classFilter: null,
                genFilter: null,
                minPow: "0",
                maxPow: "250",
                page: "1"
            })
        }),
        {
            name: "moves-storage",
        }
    )
)
