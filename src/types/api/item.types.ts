import { NamedAPIResource, FlavorText, Name, VerboseEffect } from "./common.types";

export interface Item {
    id: number;
    name: string;
    cost: number;
    fling_power: number | null;
    fling_effect: NamedAPIResource | null;
    attributes: NamedAPIResource[];
    category: NamedAPIResource;
    effect_entries: VerboseEffect[];
    flavor_text_entries: ItemFlavorText[];
    game_indices: GenerationGameIndex[];
    names: Name[];
    sprites: ItemSprites;
    held_by_pokemon: ItemHolderPokemon[];
    baby_trigger_for: APIResource | null;
    machines: MachineVersionDetail[];
}

export interface APIResource {
    url: string;
}

export interface ItemFlavorText {
    text: string;
    language: NamedAPIResource;
    version_group: NamedAPIResource;
}

export interface GenerationGameIndex {
    game_index: number;
    generation: NamedAPIResource;
}

export interface ItemSprites {
    default: string | null;
}

export interface ItemHolderPokemon {
    pokemon: NamedAPIResource;
    version_details: ItemHolderPokemonVersionDetail[];
}

export interface ItemHolderPokemonVersionDetail {
    rarity: number;
    version: NamedAPIResource;
}

export interface MachineVersionDetail {
    machine: APIResource;
    version_group: NamedAPIResource;
}

export interface ItemPocket {
    id: number;
    name: string;
    categories: NamedAPIResource[];
    names: Name[];
}
