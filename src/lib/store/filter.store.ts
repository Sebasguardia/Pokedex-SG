import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FilterStore {
    pokedexFilters: string;
    itemsPocket: string;
    lastGeneration: string;
    setPokedexFilters: (qs: string) => void;
    setItemsPocket: (pocket: string) => void;
    setLastGeneration: (gen: string) => void;
}

export const useFilterStore = create<FilterStore>()(
    persist(
        (set) => ({
            pokedexFilters: "",
            itemsPocket: "medicine",
            lastGeneration: "",
            setPokedexFilters: (qs) => set({ pokedexFilters: qs }),
            setItemsPocket: (pocket) => set({ itemsPocket: pocket }),
            setLastGeneration: (gen) => set({ lastGeneration: gen }),
        }),
        {
            name: "pokedex-filters",
        }
    )
);
