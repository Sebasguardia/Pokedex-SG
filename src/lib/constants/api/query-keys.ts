export const pokemonKeys = {
    all: ["pokemon"] as const,
    lists: () => [...pokemonKeys.all, "list"] as const,
    list: (params: Record<string, any>) => [...pokemonKeys.lists(), params] as const,
    details: () => [...pokemonKeys.all, "detail"] as const,
    detail: (id: string | number) => [...pokemonKeys.details(), id] as const,
    speciesAll: () => [...pokemonKeys.all, "species"] as const,
    species: (id: string | number) => [...pokemonKeys.speciesAll(), id] as const,
    encountersAll: () => [...pokemonKeys.all, "encounters"] as const,
    encounters: (id: string | number) => [...pokemonKeys.encountersAll(), id] as const,
};

export const typeKeys = {
    all: ["types"] as const,
    lists: () => [...typeKeys.all, "list"] as const,
    details: () => [...typeKeys.all, "detail"] as const,
    detail: (id: string | number) => [...typeKeys.details(), id] as const,
};
