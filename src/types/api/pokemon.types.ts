import { NamedAPIResource } from "./common.types";

export interface Pokemon {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    is_default: boolean;
    order: number;
    weight: number;
    abilities: PokemonAbility[];
    forms: NamedAPIResource[];
    species: NamedAPIResource;
    stats: PokemonStat[];
    types: PokemonType[];
    sprites: PokemonSprites;
    cries: PokemonCries;
    moves: PokemonMove[];
    game_indices?: { game_index: number; version: NamedAPIResource }[];
    held_items?: { item: NamedAPIResource; version_details: any[] }[];
    past_types?: any[];
    past_abilities?: any[];
}

export interface PokemonMove {
    move: NamedAPIResource;
    version_group_details: {
        level_learned_at: number;
        move_learn_method: NamedAPIResource;
        version_group: NamedAPIResource;
    }[];
}

export interface PokemonAbility {
    is_hidden: boolean;
    slot: number;
    ability: NamedAPIResource;
}

export interface PokemonType {
    slot: number;
    type: NamedAPIResource;
}

export interface PokemonStat {
    stat: NamedAPIResource;
    effort: number;
    base_stat: number;
}

export interface PokemonSprites {
    front_default: string | null;
    front_shiny: string | null;
    front_female: string | null;
    front_shiny_female: string | null;
    back_default: string | null;
    back_shiny: string | null;
    back_female: string | null;
    back_shiny_female: string | null;
    other?: {
        "official-artwork"?: {
            front_default: string | null;
            front_shiny: string | null;
        };
        home?: {
            front_default: string | null;
            front_shiny: string | null;
        };
        showdown?: {
            front_default: string | null;
            front_shiny: string | null;
        }
    };
}

export interface PokemonCries {
    latest: string;
    legacy: string;
}
