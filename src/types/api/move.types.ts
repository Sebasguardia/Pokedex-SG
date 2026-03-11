import { NamedAPIResource, Name, FlavorText, VerboseEffect } from "./common.types";

export interface Move {
    id: number;
    name: string;
    accuracy: number | null;
    effect_chance: number | null;
    pp: number;
    priority: number;
    power: number | null;
    contest_combos: ContestComboSets | null;
    contest_type: NamedAPIResource | null;
    contest_effect: APIResource | null;
    damage_class: NamedAPIResource;
    effect_entries: VerboseEffect[];
    effect_changes: AbilityEffectChange[];
    flavor_text_entries: MoveFlavorText[];
    generation: NamedAPIResource;
    learned_by_pokemon: NamedAPIResource[];
    machines: MachineVersionDetail[];
    meta: MoveMetaData | null;
    names: Name[];
    past_values: PastMoveStatValues[];
    stat_changes: MoveStatChange[];
    super_contest_effect: APIResource | null;
    target: NamedAPIResource;
    type: NamedAPIResource;
}

export interface APIResource {
    url: string;
}

export interface AbilityEffectChange {
    effect_entries: Effect[];
    version_group: NamedAPIResource;
}

export interface Effect {
    effect: string;
    language: NamedAPIResource;
}

export interface ContestComboSets {
    normal: ContestComboDetail;
    super: ContestComboDetail;
}

export interface ContestComboDetail {
    use_before: NamedAPIResource[] | null;
    use_after: NamedAPIResource[] | null;
}

export interface MoveFlavorText {
    flavor_text: string;
    language: NamedAPIResource;
    version_group: NamedAPIResource;
}

export interface MachineVersionDetail {
    machine: APIResource;
    version_group: NamedAPIResource;
}

export interface MoveMetaData {
    ailment: NamedAPIResource;
    category: NamedAPIResource;
    min_hits: number | null;
    max_hits: number | null;
    min_turns: number | null;
    max_turns: number | null;
    drain: number;
    healing: number;
    crit_rate: number;
    ailment_chance: number;
    flinch_chance: number;
    stat_chance: number;
}

export interface PastMoveStatValues {
    accuracy: number | null;
    effect_chance: number | null;
    power: number | null;
    pp: number | null;
    effect_entries: VerboseEffect[];
    type: NamedAPIResource | null;
    version_group: NamedAPIResource;
}

export interface MoveStatChange {
    change: number;
    stat: NamedAPIResource;
}
