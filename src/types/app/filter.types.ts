export interface PokemonFilters {
    type?: string;
    generation?: string;
    habitat?: string;
    eggGroup?: string;
    color?: string;
    isLegendary?: boolean;
    isMythical?: boolean;
    isBaby?: boolean;
    hasAlternateForms?: boolean;
    sortBy?: "id" | "name" | "height" | "weight";
    sortOrder?: "asc" | "desc";
    minStats?: Partial<Record<StatName, number>>;
}

export type StatName = "hp" | "attack" | "defense" | "special-attack" | "special-defense" | "speed";

export interface MoveFilters {
    type?: string;
    damageClass?: string;
    generation?: string;
    ailment?: string;
}

export interface AbilityFilters {
    generation?: string;
    isHidden?: boolean;
}

export interface ItemFilters {
    category?: string;
    attribute?: string;
    pocket?: string;
    generation?: string;
}
