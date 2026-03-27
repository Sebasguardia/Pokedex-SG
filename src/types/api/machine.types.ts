import { NamedAPIResource, Name } from "./common.types";

export interface Machine {
  id:            number;
  item:          NamedAPIResource;
  move:          NamedAPIResource;
  version_group: NamedAPIResource;
}

export interface MoveDetail {
  id:           number;
  name:         string;
  accuracy:     number | null;
  pp:           number | null;
  priority:     number;
  power:        number | null;
  damage_class: NamedAPIResource;
  type:         NamedAPIResource;
  effect_entries: MoveEffect[];
  flavor_text_entries: MoveFlavorText[];
  learned_by_pokemon: NamedAPIResource[];
  machines: {
    machine:       NamedAPIResource;
    version_group: NamedAPIResource;
  }[];
  contest_type: NamedAPIResource | null;
  target:       NamedAPIResource;
  generation:   NamedAPIResource;
  names:        Name[];
}

export interface MoveEffect {
  effect:       string;
  short_effect: string;
  language:     NamedAPIResource;
}

export interface MoveFlavorText {
  flavor_text:   string;
  language:      NamedAPIResource;
  version_group: NamedAPIResource;
}

export interface MachineItem {
  id:      number;
  name:    string;
  sprites: { default: string | null };
}