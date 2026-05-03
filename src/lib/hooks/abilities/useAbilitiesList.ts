import { useQuery } from "@tanstack/react-query"
import { getAbilityList, getAbilityByIdOrName } from "@/lib/api/abilities"
import Fuse from "fuse.js"
import { useMemo, useState, useEffect } from "react"
import { inferAbilityCategory } from "@/lib/utils/ability.utils"

interface AbilitiesFilters {
    search?: string | null
    sort?: string
    category?: string | null // "all" | "offensive" | "defensive" | "support"
}

const LIMIT = 24

export function useAbilitiesList(filters: AbilitiesFilters) {
    const {
        search = "",
        sort = "name",
        category = "all",
    } = filters

    // 1. Fetch the raw list of 360 abilities
    const { data: rawData, isLoading: isListLoading } = useQuery({
        queryKey: ["abilities", "list", "all"],
        queryFn: () => getAbilityList(360, 0),
        staleTime: Infinity 
    })

    // 2. Fetch all details for all abilities to unlock rich filtering and stats!
    const { data: allDetails, isLoading: isDetailsLoading } = useQuery({
        queryKey: ["abilities", "details", "all"],
        enabled: !!rawData?.results,
        queryFn: async () => {
            if (!rawData?.results) return []
            // Batch all 360 requests. PokeAPI handles this well.
            const promises = rawData.results.map(r => getAbilityByIdOrName(r.name))
            const results = await Promise.all(promises)
            
            // Pre-calculate category for each to make filtering instantly fast
            return results.map(ability => {
                const esEffect = ability.effect_entries?.find((e: any) => e.language.name === "es")?.short_effect
                const enEffect = ability.effect_entries?.find((e: any) => e.language.name === "en")?.short_effect
                const esFlavor = ability.flavor_text_entries?.find((e: any) => e.language.name === "es")?.flavor_text
                const enFlavor = ability.flavor_text_entries?.find((e: any) => e.language.name === "en")?.flavor_text
                
                const fullEffect = esEffect || enEffect || esFlavor || enFlavor || ""
                const cat = inferAbilityCategory(fullEffect)
                
                return { ...ability, _calculatedCategory: cat }
            })
        },
        staleTime: Infinity
    })

    // 3. Filter and Sort locally
    const filteredItems = useMemo(() => {
        if (!allDetails) return []
        let items = [...allDetails]

        if (category && category !== "all") {
            items = items.filter(item => item._calculatedCategory === category)
        }

        if (search) {
            const fuse = new Fuse(items, {
                keys: [
                    "name", 
                    "names.name", 
                    "effect_entries.short_effect",
                    "flavor_text_entries.flavor_text"
                ],
                threshold: 0.3
            })
            items = fuse.search(search).map(r => r.item)
        }

        items.sort((a, b) => {
            if (sort === "name") return a.name.localeCompare(b.name)
            return 0
        })

        return items
    }, [allDetails, search, sort, category])

    const totalCount = filteredItems.length

    // Calculate Distribution Stats
    const stats = useMemo(() => {
        if (!allDetails) return { offensive: 0, defensive: 0, support: 0, passive: 0, overworld: 0, total: 0 }
        let offensive = 0, defensive = 0, support = 0, passive = 0, overworld = 0
        allDetails.forEach(item => {
            if (item._calculatedCategory === "offensive") offensive++
            if (item._calculatedCategory === "defensive") defensive++
            if (item._calculatedCategory === "support") support++
            if (item._calculatedCategory === "passive") passive++
            if (item._calculatedCategory === "overworld") overworld++
        })
        return { offensive, defensive, support, passive, overworld, total: allDetails.length }
    }, [allDetails])

    // 4. Local Pagination (Simplified)
    const [displayLimit, setDisplayLimit] = useState(LIMIT)

    // Reset pagination when search or category changes
    useEffect(() => {
        setDisplayLimit(LIMIT)
    }, [search, category])

    const paginatedResults = useMemo(() => {
        return filteredItems.slice(0, displayLimit)
    }, [filteredItems, displayLimit])

    const hasNextPage = displayLimit < totalCount
    const fetchNextPage = () => {
        setDisplayLimit(prev => Math.min(prev + LIMIT, totalCount))
    }

    // Maintain compatibility with current UI expected structure
    const data = useMemo(() => ({
        pages: [{ results: paginatedResults }]
    }), [paginatedResults])

    return {
        data,
        totalCount,
        stats,
        allDetails,
        isLoading: isListLoading || isDetailsLoading,
        isFetchingNextPage: false, // Local is instant
        hasNextPage,
        fetchNextPage
    }
}
