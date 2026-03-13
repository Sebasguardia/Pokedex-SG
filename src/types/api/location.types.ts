import { NamedAPIResource, Name } from "./common.types";

// ── Ya existía ────────────────────────────────────────────────────
export interface Location {
    id: number;
    name: string;
    region: NamedAPIResource | null;
    names: Name[];
    game_indices: LocationGameIndex[];
    areas: NamedAPIResource[];
}

export interface LocationGameIndex {
    game_index: number;
    generation: NamedAPIResource;
}

export interface LocationArea {
    id: number;
    name: string;
    game_index: number;
    encounter_method_rates: EncounterMethodRate[];
    location: NamedAPIResource;
    names: Name[];
    pokemon_encounters: PokemonEncounter[];
}

export interface EncounterMethodRate {
    encounter_method: NamedAPIResource;
    version_details: EncounterVersionDetails[];
}

export interface EncounterVersionDetails {
    rate: number;
    version: NamedAPIResource;
}

export interface PokemonEncounter {
    pokemon: NamedAPIResource;
    version_details: VersionEncounterDetail[];
}

export interface VersionEncounterDetail {
    version: NamedAPIResource;
    max_chance: number;
    encounter_details: Encounter[];
}

export interface Encounter {
    min_level: number;
    max_level: number;
    condition_values: NamedAPIResource[];
    chance: number;
    method: NamedAPIResource;
}

export interface Region {
    id: number;
    name: string;
    locations: NamedAPIResource[];
    main_generation: NamedAPIResource | null;
    names: Name[];
    pokedexes: NamedAPIResource[];
    version_groups: NamedAPIResource[];
}

// ── NUEVO ─────────────────────────────────────────────────────────

/** Pokédex regional — GET /pokedex/{name} */
export interface RegionalPokedex {
    id: number;
    name: string;
    is_main_series: boolean;
    descriptions: { description: string; language: NamedAPIResource }[];
    names: Name[];
    region: NamedAPIResource | null;
    pokemon_entries: RegionalPokedexEntry[];
    version_groups: NamedAPIResource[];
}

export interface RegionalPokedexEntry {
    entry_number: number;                // número en el dex REGIONAL (diferente al nacional)
    pokemon_species: NamedAPIResource;   // url contiene el ID nacional
}