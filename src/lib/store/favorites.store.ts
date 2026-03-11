import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface FavoritesStore {
    favorites: number[];
    addFavorite: (id: number) => void;
    removeFavorite: (id: number) => void;
    toggleFavorite: (id: number) => void;
    isFavorite: (id: number) => boolean;
    clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesStore>()(
    persist(
        (set, get) => ({
            favorites: [],
            addFavorite: (id) => set((state) => ({ favorites: [...state.favorites, id] })),
            removeFavorite: (id) =>
                set((state) => ({ favorites: state.favorites.filter((fav) => fav !== id) })),
            toggleFavorite: (id) => {
                const isFav = get().isFavorite(id);
                if (isFav) {
                    get().removeFavorite(id);
                } else {
                    get().addFavorite(id);
                }
            },
            isFavorite: (id) => get().favorites.includes(id),
            clearFavorites: () => set({ favorites: [] }),
        }),
        {
            name: "poke-favorites",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
