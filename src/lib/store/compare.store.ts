import { create } from "zustand";

interface CompareStore {
    pokemonIds: (number | null)[];
    addPokemon: (id: number) => void;
    removePokemon: (id: number) => void;
    clearCompare: () => void;
    canAdd: boolean;
}

export const useCompareStore = create<CompareStore>((set, get) => ({
    pokemonIds: [],
    addPokemon: (id) => {
        const currentList = get().pokemonIds;
        if (currentList.length < 3 && !currentList.includes(id)) {
            set({ pokemonIds: [...currentList, id], canAdd: currentList.length + 1 < 3 });
        }
    },
    removePokemon: (id) => {
        const newList = get().pokemonIds.filter((p) => p !== id);
        set({ pokemonIds: newList, canAdd: newList.length < 3 });
    },
    clearCompare: () => set({ pokemonIds: [], canAdd: true }),
    canAdd: true,
}));
