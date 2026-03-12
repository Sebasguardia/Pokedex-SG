// src/lib/hooks/useBerriesCategories.ts

import { BERRY_CATEGORIES } from "../constants/berries.constants";

export function useBerriesCategories() {
    // Return static categories as defined by the user
    return { data: BERRY_CATEGORIES };
}
