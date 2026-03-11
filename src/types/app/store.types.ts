export interface FavoritesStoreState {
    favorites: number[];
}

export interface CompareStoreState {
    pokemonIds: (number | null)[];
    canAdd: boolean;
}

export interface UIStoreState {
    viewMode: "grid" | "list";
    sidebarOpen: boolean;
    shinyMode: boolean;
}
