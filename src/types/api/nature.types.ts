import { NamedAPIResource, Name } from "./common.types";

export interface Nature {
    id: number;
    name: string;
    decreased_stat: NamedAPIResource | null;
    increased_stat: NamedAPIResource | null;
    hates_flavor: NamedAPIResource | null;
    likes_flavor: NamedAPIResource | null;
    pokeathlon_stat_changes: {
        max_change: number;
        pokeathlon_stat: NamedAPIResource;
    }[];
    move_battle_style_preferences: {
        low_hp_preference: number;
        high_hp_preference: number;
        move_battle_style: NamedAPIResource;
    }[];
    names: Name[];
}