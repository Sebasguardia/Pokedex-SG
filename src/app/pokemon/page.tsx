"use client"

import { useState, useMemo, Suspense, useEffect, useCallback } from "react"
import { useQueryState } from "nuqs"
import { AnimatePresence, motion } from "framer-motion"
import { PokedexHeader } from "@/components/pokemon/list/pokedex-header"
import { SearchBar } from "@/components/pokemon/list/search-bar"
import { FilterSidebar } from "@/components/pokemon/list/filter-sidebar"
import { MobileFilterDrawer, MobileFilterButton } from "@/components/pokemon/list/mobile-filter-drawer"
import { ActiveFilterChips } from "@/components/pokemon/list/active-filter-chips"
import { PokemonGrid } from "@/components/pokemon/list/pokemon-grid"
import { PokemonTable } from "@/components/pokemon/list/pokemon-table"
import { Pagination } from "@/components/shared/ui/pagination"
import { PageTransitionPokemons } from "@/components/shared/page-transitions/pokemon/page-transition-pokemons"
import { usePokemonIndex } from "@/lib/hooks/pokemon/usePokemonIndex"
import { getPokemonByIdOrName } from "@/lib/api/pokemon"
import { useUIStore } from "@/lib/store/ui.store"
import { useRouter, useSearchParams } from "next/navigation"
import { useFilterStore } from "@/lib/store/filter.store"
import Fuse from "fuse.js"

import { LEGENDARY_IDS, MYTHICAL_IDS, BABY_IDS } from "@/lib/constants/pokemon/special-pokemon.constants"

// Pre-compute Sets once at module level for O(1) lookups — much faster than Array.includes in filter loops
const LEGENDARY_SET = new Set(LEGENDARY_IDS)
const MYTHICAL_SET = new Set(MYTHICAL_IDS)
const BABY_SET = new Set(BABY_IDS)

function PokedexPageContent() {
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
    const [baseStageFilter, setBaseStageFilter] = useQueryState("base")
    const [levelEvoFilter, setLevelEvoFilter] = useQueryState("levelEvo")
    const [itemEvoFilter, setItemEvoFilter] = useQueryState("itemEvo")

    const [weightClass, setWeightClass] = useQueryState("weightClass")
    const [heightClass, setHeightClass] = useQueryState("heightClass")
    
    const [searchQuery, setSearchQuery] = useQueryState("search", { defaultValue: "" })
    const [page, setPage] = useQueryState("page", { defaultValue: "1" })

    // STATS FILTERS
    const [minHp, setMinHp] = useQueryState("minHp")
    const [minAtk, setMinAtk] = useQueryState("minAtk")
    const [minDef, setMinDef] = useQueryState("minDef")
    const [minSpa, setMinSpa] = useQueryState("minSpa")
    const [minSpd, setMinSpd] = useQueryState("minSpd")
    const [minSpe, setMinSpe] = useQueryState("minSpe")
    
    // ORDENAR
    const [sortField, setSortField] = useQueryState("sort", { defaultValue: "id" })
    const [sortOrder, setSortOrder] = useQueryState("order", { defaultValue: "asc" })

    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

    const { data: globalPokemon, isLoading: isAllLoading } = usePokemonIndex()

    const activeTypes = useMemo(() => typeFilter ? typeFilter.split(",") : [], [typeFilter])

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

    const allItems = globalPokemon || []

    // Build Fuse index once when allItems changes — NOT inside filteredAndSortedItems
    // This is the key perf fix: creating a Fuse index on 1025 items each filter change was causing lag
    const fuseIndex = useMemo(() => {
        if (allItems.length === 0) return null
        return new Fuse(allItems, { keys: ['name'], threshold: 0.3, includeScore: false })
    }, [allItems])

    const filteredAndSortedItems = useMemo(() => {
        // Avoid spreading if no filters active
        let results = allItems
        let needsMutation = false

        // A. Type Filter
        if (activeTypes.length > 0) {
            results = results.filter(p => activeTypes.every(t => p.types.includes(t)))
            needsMutation = true
        }

        // B. Search filter — reuses the stable fuseIndex instead of creating a new Fuse each time
        if (searchQuery && fuseIndex) {
            results = fuseIndex.search(searchQuery).map(r => r.item)
            needsMutation = true
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
                results = results.filter(p => p.id >= range[0] && p.id <= range[1])
            }
        }

        // D. Special Filters — uses Set for O(1) lookup instead of Array.includes
        if (legendaryFilter === "true" || mythicalFilter === "true" || babyFilter === "true" || formsFilter === "true" || baseStageFilter === "true" || levelEvoFilter === "true" || itemEvoFilter === "true") {
            results = results.filter(p => {
                if (legendaryFilter === "true" && LEGENDARY_SET.has(p.id)) return true
                if (mythicalFilter === "true" && MYTHICAL_SET.has(p.id)) return true
                if (babyFilter === "true" && BABY_SET.has(p.id)) return true
                if (baseStageFilter === "true" && p.evolution_method === "base") return true
                if (levelEvoFilter === "true" && p.evolution_method === "level") return true
                if (itemEvoFilter === "true" && p.evolution_method === "item") return true
                return false
            })
            needsMutation = true
        }

        // D.2. Physical Filters
        if (weightClass || heightClass) {
            results = results.filter(p => {
                let matchesWeight = true
                let matchesHeight = true
                
                if (weightClass === "feather") matchesWeight = p.weight < 200
                else if (weightClass === "heavy") matchesWeight = p.weight >= 2000

                if (heightClass === "small") matchesHeight = p.height < 10
                else if (heightClass === "giant") matchesHeight = p.height >= 30

                return matchesWeight && matchesHeight
            })
            needsMutation = true
        }

        // E. Stats Filters
        const minHpN = minHp ? parseInt(minHp) : 0
        const minAtkN = minAtk ? parseInt(minAtk) : 0
        const minDefN = minDef ? parseInt(minDef) : 0
        const minSpaN = minSpa ? parseInt(minSpa) : 0
        const minSpdN = minSpd ? parseInt(minSpd) : 0
        const minSpeN = minSpe ? parseInt(minSpe) : 0
        const hasStatsFilter = minHpN > 0 || minAtkN > 0 || minDefN > 0 || minSpaN > 0 || minSpdN > 0 || minSpeN > 0
        if (hasStatsFilter) {
            results = results.filter(p => {
                if (minHpN > 0 && p.stats.hp < minHpN) return false
                if (minAtkN > 0 && p.stats.attack < minAtkN) return false
                if (minDefN > 0 && p.stats.defense < minDefN) return false
                if (minSpaN > 0 && p.stats.specialAttack < minSpaN) return false
                if (minSpdN > 0 && p.stats.specialDefense < minSpdN) return false
                if (minSpeN > 0 && p.stats.speed < minSpeN) return false
                return true
            })
            needsMutation = true
        }

        // F. Global Sort — skip sort entirely for default ID ASC (data already comes ordered from API)
        const isDefaultSort = sortField === 'id' && sortOrder === 'asc'
        if (!isDefaultSort) {
            // Only clone array when we need to sort and haven't mutated it yet
            if (!needsMutation) results = [...results]
            results.sort((a, b) => {
                let valA: string | number = a.id
                let valB: string | number = b.id

                switch(sortField) {
                    case 'name': valA = a.name; valB = b.name; break;
                    case 'hp': valA = a.stats.hp; valB = b.stats.hp; break;
                    case 'attack': valA = a.stats.attack; valB = b.stats.attack; break;
                    case 'defense': valA = a.stats.defense; valB = b.stats.defense; break;
                    case 'weight': valA = a.weight; valB = b.weight; break;
                    case 'height': valA = a.height; valB = b.height; break;
                    case 'id': valA = a.id; valB = b.id; break;
                }

                if (valA < valB) return sortOrder === 'desc' ? 1 : -1
                if (valA > valB) return sortOrder === 'desc' ? -1 : 1
                return 0
            })
        }

        // Map to {name, url, indexTypes} — types piggyback for free avoiding 60 per-card fetches
        return results.map(p => ({
            name: p.name,
            url: `https://pokeapi.co/api/v2/pokemon/${p.id}/`,
            indexTypes: p.types,
        }))
    }, [allItems, fuseIndex, searchQuery, genFilter, activeTypes, legendaryFilter, mythicalFilter, babyFilter, formsFilter, baseStageFilter, levelEvoFilter, itemEvoFilter, weightClass, heightClass, minHp, minAtk, minDef, minSpa, minSpd, minSpe, sortField, sortOrder])

    const activeFiltersCount = useMemo(() => [
        typeFilter ? typeFilter.split(",").length : 0,
        genFilter ? 1 : 0,
        legendaryFilter ? 1 : 0,
        mythicalFilter ? 1 : 0,
        babyFilter ? 1 : 0,
        formsFilter ? 1 : 0,
        baseStageFilter ? 1 : 0,
        levelEvoFilter ? 1 : 0,
        itemEvoFilter ? 1 : 0,
        weightClass ? 1 : 0,
        heightClass ? 1 : 0,
        minHp ? 1 : 0,
        minAtk ? 1 : 0,
        minDef ? 1 : 0,
        minSpa ? 1 : 0,
        minSpd ? 1 : 0,
        minSpe ? 1 : 0,
    ].reduce((a, b) => a + Number(b), 0), [typeFilter, genFilter, legendaryFilter, mythicalFilter, babyFilter, formsFilter, baseStageFilter, levelEvoFilter, itemEvoFilter, weightClass, heightClass, minHp, minAtk, minDef, minSpa, minSpd, minSpe])

    const clearAllFilters = useCallback(() => {
        setTypeFilter(null)
        setGenFilter(null)
        setLegendaryFilter(null)
        setMythicalFilter(null)
        setBabyFilter(null)
        setFormsFilter(null)
        setBaseStageFilter(null)
        setLevelEvoFilter(null)
        setItemEvoFilter(null)
        setWeightClass(null)
        setHeightClass(null)
        setPage("1")
        setSearchQuery("")
        // Clear Stats also
        setMinHp(null)
        setMinAtk(null)
        setMinDef(null)
        setMinSpa(null)
        setMinSpd(null)
        setMinSpe(null)
    }, [setTypeFilter, setGenFilter, setLegendaryFilter, setMythicalFilter, setBabyFilter, setFormsFilter, setBaseStageFilter, setLevelEvoFilter, setItemEvoFilter, setWeightClass, setHeightClass, setPage, setSearchQuery, setMinHp, setMinAtk, setMinDef, setMinSpa, setMinSpd, setMinSpe])

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
        if (key === 'base') setBaseStageFilter(null)
        if (key === 'levelEvo') setLevelEvoFilter(null)
        if (key === 'itemEvo') setItemEvoFilter(null)
        if (key === 'weightClass') setWeightClass(null)
        if (key === 'heightClass') setHeightClass(null)
        if (key === 'sort') {
            setSortField(null)
            setSortOrder(null)
        }
    }, [typeFilter, setTypeFilter, setGenFilter, setLegendaryFilter, setMythicalFilter, setBabyFilter, setFormsFilter, setBaseStageFilter, setLevelEvoFilter, setItemEvoFilter, setWeightClass, setHeightClass, setSortField, setSortOrder])

    const handleSearchChange = useCallback((val: string) => {
        setSearchQuery(val)
        if (val !== searchQuery) {
            setPage("1")
        }
    }, [searchQuery, setSearchQuery, setPage])

    const handlePageChange = (p: number) => {
        setPage(p.toString())
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    const isLoadingOverall = isAllLoading

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
    }, [typeFilter, genFilter, legendaryFilter, mythicalFilter, babyFilter, formsFilter, baseStageFilter, levelEvoFilter, itemEvoFilter, weightClass, heightClass, searchQuery, minHp, minAtk, minDef, minSpa, minSpd, minSpe])

    const displayItems = useMemo(() => {
       const paginatedItems = filteredAndSortedItems.slice(offset, offset + limit)
       return paginatedItems
    }, [filteredAndSortedItems, offset, limit])

    return (
        <>
            <PageTransitionPokemons isDataLoading={isLoadingOverall} />
            <motion.div 
                className="min-h-screen bg-white text-[#111111] overflow-x-hidden selection:bg-[#CC0000] selection:text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
            >
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
                <MobileFilterDrawer
                    open={isMobileFilterOpen}
                    onClose={() => setIsMobileFilterOpen(false)}
                    activeFiltersCount={activeFiltersCount}
                    onClearAll={clearAllFilters}
                />

                {/* MAIN CONTENT AREA */}
                <div className="flex-1 w-full min-w-0 z-0 relative">
                    <PokedexHeader count={filteredAndSortedItems.length} />

                    <div className="flex gap-3 lg:block my-[20px] w-full items-center">
                        <div className="flex-1">
                            <SearchBar
                                value={searchQuery}
                                onChange={handleSearchChange}
                                totalCount={filteredAndSortedItems.length}
                            />
                        </div>
                        <MobileFilterButton
                            count={activeFiltersCount}
                            onClick={() => setIsMobileFilterOpen(true)}
                        />
                    </div>

                    <ActiveFilterChips
                        typeFilter={typeFilter}
                        genFilter={genFilter}
                        legendaryFilter={legendaryFilter}
                        mythicalFilter={mythicalFilter}
                        babyFilter={babyFilter}
                        baseStageFilter={baseStageFilter}
                        levelEvoFilter={levelEvoFilter}
                        itemEvoFilter={itemEvoFilter}
                        weightClass={weightClass}
                        heightClass={heightClass}
                        sortField={sortField}
                        sortOrder={sortOrder}
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
                        totalItems={filteredAndSortedItems.length}
                        itemsPerPage={limit}
                        onPageChange={handlePageChange}
                    />
                </div>
            </main>
        </motion.div>
        </>
    )
}

export default function PokemonPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-white" />}>
            <PokedexPageContent />
        </Suspense>
    )
}

