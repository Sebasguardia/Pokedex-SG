import { useFavoritesStore } from "@/lib/store/favorites.store";

export function useFavorites() {
    return useFavoritesStore();
}
