// src/lib/hooks/useBerriesList.ts

import { useInfiniteQuery } from "@tanstack/react-query";
import { getBerryList, getBerryByIdOrName } from "../api/berries";
import { getDominantFlavor } from "../utils/berry.utils";
import { getItemByIdOrName } from "../api/items";

interface BerriesFilters {
    flavor?: string | null;
    firmness?: string | null;
    effect?: string | null;
    sort?: string | null;
}

export function useBerriesList(filters: BerriesFilters) {
    const { flavor, firmness, effect, sort = "id" } = filters;

    return useInfiniteQuery({
        queryKey: ["berries-list", { flavor, firmness, effect, sort }],
        initialPageParam: 0,
        queryFn: async ({ pageParam = 0 }) => {
            const list = await getBerryList(64, 0); // Only 64 berries exist in normal dex
            
            const detailPromises = list.results.map((b: any) => getBerryByIdOrName(b.name));
            let detailedBerries = await Promise.all(detailPromises);
            
            // Filter
            if (flavor) {
                detailedBerries = detailedBerries.filter(b => {
                    const dom = getDominantFlavor(b.flavors);
                    return dom?.flavor.name === flavor;
                });
            }
            if (firmness) {
                detailedBerries = detailedBerries.filter(b => b.firmness.name === firmness);
            }
            
            // Sort
            detailedBerries.sort((a, b) => {
                if (sort === "name") return a.name.localeCompare(b.name);
                if (sort === "growth") return a.growth_time - b.growth_time;
                if (sort === "smoothness") return b.smoothness - a.smoothness;
                return a.id - b.id; // default ID asc
            });

            // Paginate
            const limit = 36;
            const start = pageParam * limit;
            const end = start + limit;
            const pageData = detailedBerries.slice(start, end);

            // Fetch Items for the paginated slice to get sprites and full info
            const fullItemsPromises = pageData.map(async (b: any) => {
                try {
                    const item = await getItemByIdOrName(b.item.name);
                    return { ...b, item };
                } catch {
                    return b;
                }
            });
            const paginatedWithItems = await Promise.all(fullItemsPromises);
            
            return {
                results: paginatedWithItems,
                count: detailedBerries.length,
                nextCursor: end < detailedBerries.length ? pageParam + 1 : undefined
            };
        },
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        staleTime: 1000 * 60 * 60,
    });
}
