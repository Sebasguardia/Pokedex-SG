"use client"

import { useState, useMemo, Suspense, useEffect, useCallback } from "react"
import { useQueryState } from "nuqs"
import { AnimatePresence, motion } from "framer-motion"
import { PokedexHeader } from "@/components/pokemon/pokedex-header"
import { SearchBar } from "@/components/pokemon/search-bar"
import { FilterSidebar } from "@/components/pokemon/filter-sidebar"
import { MobileFilterDrawer, MobileFilterButton } from "@/components/pokemon/mobile-filter-drawer"
import { ActiveFilterChips } from "@/components/pokemon/active-filter-chips"
import { PokemonGrid } from "@/components/pokemon/pokemon-grid"
import { PokemonTable } from "@/components/pokemon/pokemon-table"
import { Pagination } from "@/components/shared/pagination"
import { PageTransition } from "@/components/shared/page-transition"
import { usePokemonList } from "@/lib/hooks/usePokemonList"
import { useTypesData } from "@/lib/hooks/useTypesData"
import { getPokemonByIdOrName } from "@/lib/api/pokemon"
import { useUIStore } from "@/lib/store/ui.store"
import { useRouter, useSearchParams } from "next/navigation"
import { useFilterStore } from "@/lib/store/filter.store"
import Fuse from "fuse.js"
import { useQueryClient } from "@tanstack/react-query"
import { pokemonKeys } from "@/lib/constants/query-keys"
import { LEGENDARY_IDS, MYTHICAL_IDS, BABY_IDS } from "@/lib/constants/special-pokemon.constants"

function PokedexPageContent() {
    const queryClient = useQueryClient()
    const { viewMode } = useUIStore()
    const searchParams = useSearchParams()
    const { setPokedexFilters } = useFilterStore()

    // Sync URL with Filter Store
    useEffect(() => {
        const query = searchParams.toString()
        setPokedexFilters(query)
    }, [searchParams, setPokedexFilters])

    // URL STATE via nuqs
    const [typeFilter, setTypeFilter] = useQueryState("type")
    const [genFilter, setGenFilter] = useQueryState("gen")
    const [legendaryFilter, setLegendaryFilter] = useQueryState("legendary")
    const [mythicalFilter, setMythicalFilter] = useQueryState("mythical")
    const [babyFilter, setBabyFilter] = useQueryState("baby")
    const [formsFilter, setFormsFilter] = useQueryState("forms")
    const [searchQuery, setSearchQuery] = useQueryState("search", { defaultValue: "" })
    const [page, setPage] = useQueryState("page", { defaultValue: "1" })

    // STATS FILTERS
    const [minHp] = useQueryState("minHp")
    const [minAtk] = useQueryState("minAtk")
    const [minDef] = useQueryState("minDef")
    const [minSpa] = useQueryState("minSpa")
    const [minSpd] = useQueryState("minSpd")
    const [minSpe] = useQueryState("minSpe")

    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

    // 1. Fetch ALL pokemon (for search index)
    const { data: allPokemonData, isLoading: isAllLoading } = usePokemonList(10000, 0)

    // 2. Fetch Category data if filters active
    const activeTypes = useMemo(() => typeFilter ? typeFilter.split(",") : [], [typeFilter])
    const typeQueries = useTypesData(activeTypes)
    const isTypesLoading = typeQueries.some(q => q.isLoading)

    const typePokemonNames = useMemo(() => {
        if (activeTypes.length === 0) return null

        let intersected: string[] = []
        let hasData = false

        typeQueries.forEach((q, idx) => {
            if (!q.data) return
            hasData = true
            const names = q.data.pokemon.map(p => p.pokemon.name)
            if (idx === 0) {
                intersected = names
            } else {
                intersected = intersected.filter(n => names.includes(n))
            }
        })

        return hasData ? intersected : []
    }, [typeQueries, activeTypes])

    // We'll simplify: get the full list and filter locally. 
    // For Type and Gen, we'd ideally need those relations. 
    // Since PokeAPI's /pokemon list doesn't have types, we have a challenge.

    // IMPROVED LOGIC: 
    // To make filters work WITHOUT fetching 1000 details (slow), 
    // we'll primarily use the Search and pagination.
    // However, the user wants FILTERS to work.

    // LET'S IMPLEMENT A WORKING SEARCH + GRID LIMIT FIX
    const limit = 60
    const currentPage = parseInt(page || "1")
    const offset = (currentPage - 1) * limit

    const allItems = allPokemonData?.results || []

    const filteredItems = useMemo(() => {
        let results = [...allItems]

        // A. Type Filter
        if (typePokemonNames !== null) {
            results = results.filter(p => typePokemonNames.includes(p.name))
        }

        // B. Search filter
        if (searchQuery) {
            const fuse = new Fuse(results, {
                keys: ['name'],
                threshold: 0.3
            })
            results = fuse.search(searchQuery).map(r => r.item)
        }

        // C. Gen filter
        if (genFilter) {
            const gen = parseInt(genFilter)
            const ranges: Record<number, [number, number]> = {
                1: [1, 151], 2: [152, 251], 3: [252, 386], 4: [387, 493], 5: [494, 649],
                6: [650, 721], 7: [722, 809], 8: [810, 905], 9: [906, 1025]
            }
            const range = ranges[gen]
            if (range) {
                results = results.filter(p => {
                    const id = parseInt(p.url.split("/").filter(Boolean).pop() || "0")
                    return id >= range[0] && id <= range[1]
                })
            }
        }

        // D. Special Filters
        if (legendaryFilter === "true" || mythicalFilter === "true" || babyFilter === "true") {
            results = results.filter(p => {
                const id = parseInt(p.url.split("/").filter(Boolean).pop() || "0")
                if (legendaryFilter === "true" && LEGENDARY_IDS.includes(id)) return true
                if (mythicalFilter === "true" && MYTHICAL_IDS.includes(id)) return true
                if (babyFilter === "true" && BABY_IDS.includes(id)) return true
                return false
            })
        }

        // E. Stats Filters
        const hasStatsFilter = minHp || minAtk || minDef || minSpa || minSpd || minSpe
        if (hasStatsFilter) {
            results = results.filter(p => {
                const id = parseInt(p.url.split("/").filter(Boolean).pop() || "0")
                const details = queryClient.getQueryData(pokemonKeys.detail(id)) as any
                if (!details) return true // If no data yet, don't filter it out (optimistic)

                if (minHp && (details.stats[0].base_stat < parseInt(minHp))) return false
                if (minAtk && (details.stats[1].base_stat < parseInt(minAtk))) return false
                if (minDef && (details.stats[2].base_stat < parseInt(minDef))) return false
                if (minSpa && (details.stats[3].base_stat < parseInt(minSpa))) return false
                if (minSpd && (details.stats[4].base_stat < parseInt(minSpd))) return false
                if (minSpe && (details.stats[5].base_stat < parseInt(minSpe))) return false

                return true
            })
        }

        return results
    }, [allItems, searchQuery, genFilter, typePokemonNames, legendaryFilter, mythicalFilter, babyFilter, minHp, minAtk, minDef, minSpa, minSpd, minSpe])

    const activeFiltersCount = useMemo(() => [
        typeFilter ? typeFilter.split(",").length : 0,
        genFilter ? 1 : 0,
        legendaryFilter ? 1 : 0,
        mythicalFilter ? 1 : 0,
        babyFilter ? 1 : 0,
        formsFilter ? 1 : 0,
        minHp ? 1 : 0,
        minAtk ? 1 : 0,
        minDef ? 1 : 0,
        minSpa ? 1 : 0,
        minSpd ? 1 : 0,
        minSpe ? 1 : 0,
    ].reduce((a, b) => a + Number(b), 0), [typeFilter, genFilter, legendaryFilter, mythicalFilter, babyFilter, formsFilter, minHp, minAtk, minDef, minSpa, minSpd, minSpe])

    const clearAllFilters = useCallback(() => {
        setTypeFilter(null)
        setGenFilter(null)
        setLegendaryFilter(null)
        setMythicalFilter(null)
        setBabyFilter(null)
        setFormsFilter(null)
        setPage("1")
        setSearchQuery("")
        // Clear Stats also - nuqs will handle batch if we use query state
    }, [setTypeFilter, setGenFilter, setLegendaryFilter, setMythicalFilter, setBabyFilter, setFormsFilter, setPage, setSearchQuery])

    const handleRemoveFilter = useCallback((key: string, val: string) => {
        if (key === 'type' && typeFilter) {
            const newT = typeFilter.split(",").filter(t => t !== val)
            setTypeFilter(newT.length ? newT.join(",") : null)
        }
        if (key === 'gen') setGenFilter(null)
        if (key === 'legendary') setLegendaryFilter(null)
        if (key === 'mythical') setMythicalFilter(null)
        if (key === 'baby') setBabyFilter(null)
        if (key === 'forms') setFormsFilter(null)
    }, [typeFilter, setTypeFilter, setGenFilter, setLegendaryFilter, setMythicalFilter, setBabyFilter, setFormsFilter])

    const handleSearchChange = useCallback((val: string) => {
        setSearchQuery(val)
        if (val !== searchQuery) {
            setPage("1")
        }
    }, [searchQuery, setSearchQuery, setPage])

    const [sortField, setSortField] = useQueryState("sort", { defaultValue: "id" })
    const [sortOrder, setSortOrder] = useQueryState("order", { defaultValue: "asc" })

    const handlePageChange = (p: number) => {
        setPage(p.toString())
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    const isLoadingOverall = isAllLoading || isTypesLoading

    // RESET PAGE ON FILTER CHANGE
    // When any filter changes, we should return to page 1 to avoid empty views
    useEffect(() => {
        // We only reset if we are NOT on page 1 already
        // This prevents redundant URL updates
        if (page !== "1") {
            setPage("1")
        }
        // We specifically EXCLUDE 'page' from dependencies to only trigger on filter changes
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [typeFilter, genFilter, legendaryFilter, mythicalFilter, babyFilter, formsFilter, searchQuery, minHp, minAtk, minDef, minSpa, minSpd, minSpe])

    // F. Background Detail Fetcher (for Advanced Filters/Sorting)
    // Only fetch for filtered results to avoid 1000+ parallel requests
    const first100Filtered = useMemo(() => filteredItems.slice(0, 100), [filteredItems])

    // We use a simple effect to trigger detail fetches for the first 100 results
    // This makes sure sort by Weight/Stats has data for at least the top items.
    useEffect(() => {
        if (first100Filtered.length > 0) {
            first100Filtered.forEach(p => {
                const id = parseInt(p.url.split("/").filter(Boolean).pop() || "0")
                if (!queryClient.getQueryData(pokemonKeys.detail(id))) {
                    queryClient.prefetchQuery({
                        queryKey: pokemonKeys.detail(id),
                        queryFn: () => getPokemonByIdOrName(id),
                        staleTime: 1000 * 60 * 60 // 1 hour
                    })
                }
            })
        }
    }, [first100Filtered, queryClient])

    const sortedItems = useMemo(() => {
        let results = [...filteredItems]

        results.sort((a, b) => {
            const getVal = (item: any) => {
                const id = parseInt(item.url.split("/").filter(Boolean).pop() || "0")
                // Search in QueryClient cache
                const details = queryClient.getQueryData(pokemonKeys.detail(id)) as any

                if (sortField === "weight") return details?.weight || 0
                if (sortField === "height") return details?.height || 0
                if (sortField === "hp") return details?.stats?.find((s: any) => s.stat.name === "hp")?.base_stat || 0
                if (sortField === "attack") return details?.stats?.find((s: any) => s.stat.name === "attack")?.base_stat || 0
                if (sortField === "defense") return details?.stats?.find((s: any) => s.stat.name === "defense")?.base_stat || 0

                if (sortField === "name") return item.name
                return id // default is id
            }

            const valA = getVal(a)
            const valB = getVal(b)

            if (typeof valA === "string" && typeof valB === "string") {
                return sortOrder === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA)
            }

            const nA = Number(valA)
            const nB = Number(valB)
            return sortOrder === "asc" ? nA - nB : nB - nA
        })

        return results
    }, [filteredItems, sortField, sortOrder])

    const displayItems = useMemo(() => {
        return sortedItems.slice(offset, offset + limit)
    }, [sortedItems, offset, limit])

    return (
        <div className="min-h-screen bg-white text-[#111111] overflow-x-hidden selection:bg-[#CC0000] selection:text-white">
            <main className="max-w-[1440px] mx-auto px-4 md:px-8 py-6 md:py-10 flex flex-col lg:flex-row gap-8 relative">

                {/* DESKTOP SIDEBAR */}
                <aside className="hidden lg:block w-[260px] flex-shrink-0 relative">
                    <div className="sticky top-[80px]">
                        <FilterSidebar
                            activeFiltersCount={activeFiltersCount}
                            onClearAll={clearAllFilters}
                        />
                    </div>
                </aside>

                {/* MOBILE DRAWER */}
                <MobileFilterButton
                    count={activeFiltersCount}
                    onClick={() => setIsMobileFilterOpen(true)}
                />
                <MobileFilterDrawer
                    open={isMobileFilterOpen}
                    onClose={() => setIsMobileFilterOpen(false)}
                    activeFiltersCount={activeFiltersCount}
                    onClearAll={clearAllFilters}
                />

                {/* MAIN CONTENT AREA */}
                <div className="flex-1 w-full min-w-0 z-0 relative">
                    <PokedexHeader count={filteredItems.length} />

                    <SearchBar
                        value={searchQuery}
                        onChange={handleSearchChange}
                        totalCount={filteredItems.length}
                    />

                    <ActiveFilterChips
                        typeFilter={typeFilter}
                        genFilter={genFilter}
                        legendaryFilter={legendaryFilter}
                        mythicalFilter={mythicalFilter}
                        babyFilter={babyFilter}
                        onRemove={handleRemoveFilter}
                        onClearAll={clearAllFilters}
                    />

                    <motion.div
                        layout
                        className="w-full relative mt-4 min-h-[50vh]"
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <AnimatePresence mode="wait">
                            {viewMode === "grid" ? (
                                <motion.div
                                    key="grid-view"
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                    className="w-full"
                                >
                                    <PokemonGrid pokemon={displayItems} isLoading={isLoadingOverall} />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="list-view"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                    className="w-full"
                                >
                                    <PokemonTable pokemon={displayItems} isLoading={isLoadingOverall} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    <Pagination
                        currentPage={currentPage}
                        totalItems={filteredItems.length}
                        itemsPerPage={limit}
                        onPageChange={handlePageChange}
                    />
                </div>
            </main>
        </div>
    )
}

export default function PokemonPage() {
    return (
        <>
            <PageTransition />
            <Suspense fallback={<div className="min-h-screen bg-white" />}>
                <PokedexPageContent />
            </Suspense>
        </>
    )
}

