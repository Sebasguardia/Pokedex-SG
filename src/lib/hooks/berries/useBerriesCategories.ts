// src/lib/hooks/useBerriesCategories.ts

import { BERRY_CATEGORIES } from "@/lib/constants/berries/berries.constants";

export function useBerriesCategories() {
    // Return static categories as defined by the user
    return { data: BERRY_CATEGORIES };
}
