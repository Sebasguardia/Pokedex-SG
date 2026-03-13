import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FilterStore {
    pokedexFilters: string;
    itemsPocket: string;
    lastGeneration: string;
    // Natures filters
    naturesFilters: {
        stat: string | null;
        flavor: string | null;
        neutral: "all" | "neutral" | "modified";
        search: string;
        view: "table" | "grid";
    };
    setPokedexFilters: (qs: string) => void;
    setItemsPocket: (pocket: string) => void;
    setLastGeneration: (gen: string) => void;
    setNaturesFilters: (filters: Partial<FilterStore["naturesFilters"]>) => void;
}

export const useFilterStore = create<FilterStore>()(
    persist(
        (set) => ({
            pokedexFilters: "",
            itemsPocket: "medicine",
            lastGeneration: "",
            naturesFilters: {
                stat: null,
                flavor: null,
                neutral: "all",
                search: "",
                view: "table",
            },
            setPokedexFilters: (qs) => set({ pokedexFilters: qs }),
            setItemsPocket: (pocket) => set({ itemsPocket: pocket }),
            setLastGeneration: (gen) => set({ lastGeneration: gen }),
            setNaturesFilters: (filters) =>
                set((state) => ({
                    naturesFilters: { ...state.naturesFilters, ...filters },
                })),
        }),
        {
            name: "pokedex-filters",
        }
    )
);
