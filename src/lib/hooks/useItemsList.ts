import { useQuery } from "@tanstack/react-query"
import { getItemPocketByName, getItemCategoryByName, getItemByIdOrName } from "../api/items"
import Fuse from "fuse.js"
import { useState, useEffect } from "react"

interface ItemsFilters {
    pocket: string
    search?: string | null
    sort?: string
    page?: number
    limit?: number
}

export function useItemsList(filters: ItemsFilters) {
    const {
        pocket = "medicine",
        search = "",
        sort = "name",
        page = 1,
        limit = 60
    } = filters

    // 1. Fetch the items for the current pocket
    // PokéAPI has item-pocket -> categories -> items
    const { data: pocketItems, isLoading: isListLoading } = useQuery({
        queryKey: ["items-pocket", pocket],
        queryFn: async () => {
            // First get the pocket to see which categories it has
            const pocketData = await getItemPocketByName(pocket)

            // Then get all items from all categories in this pocket
            const categoryPromises = pocketData.categories.map((cat: any) => getItemCategoryByName(cat.name))
            const categoriesContent = await Promise.all(categoryPromises)

            // Flatten all items from all categories
            const allPocketItems = categoriesContent.flatMap((cat: any) => cat.items)

            // Remove duplicates just in case
            const uniqueItems = Array.from(new Map(allPocketItems.map((item: any) => [item.name, item])).values())

            return uniqueItems
        },
        staleTime: 1000 * 60 * 60 * 24 // 24 hours
    })

    const [filteredItems, setFilteredItems] = useState<any[]>([])
    const [totalCount, setTotalCount] = useState(0)

    // 2. Fetch full details for the paginated slice
    const { data: fullDetails, isLoading: isDetailsLoading, isFetching } = useQuery({
        queryKey: ["items-details", { pocket, search, sort, page, limit }],
        enabled: !!pocketItems,
        queryFn: async () => {
            if (!pocketItems) return []

            let items = [...pocketItems]

            // 1. Search filter
            if (search) {
                const fuse = new Fuse(items, {
                    keys: ["name"],
                    threshold: 0.3
                })
                items = fuse.search(search).map(r => r.item)
            }

            // 2. Sorting
            items.sort((a, b) => {
                if (sort === "name") return a.name.localeCompare(b.name)
                return 0
            })

            setTotalCount(items.length)

            // 3. Paginate
            const start = (page - 1) * limit
            const end = start + limit
            const pageItems = items.slice(start, end)

            // 4. Fetch full details for this slice
            const detailPromises = pageItems.map(item => {
                // Extract ID from url (e.g., "https://pokeapi.co/api/v2/item/2034/") to avoid fetching by problematic names
                const urlParts = item.url?.split("/").filter(Boolean) || []
                const id = urlParts.pop()
                return getItemByIdOrName(id || item.name)
            })
            return await Promise.all(detailPromises)
        },
        staleTime: 1000 * 60 * 60
    })

    return {
        data: {
            results: fullDetails || [],
            count: totalCount
        },
        isLoading: isListLoading || isDetailsLoading,
        isFetching,
        hasNextPage: totalCount > page * limit,
        fetchNextPage: () => { } // Handled by incrementing page in component
    }
}
