export interface NamedAPIResource {
    name: string;
    url: string;
}

export interface APIResource {
    url: string;
}

export interface NamedAPIResourceList<T = NamedAPIResource> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

export interface Name {
    name: string;
    language: NamedAPIResource;
}

export interface FlavorText {
    flavor_text: string;
    language: NamedAPIResource;
    version: NamedAPIResource;
}

export interface Description {
    description: string;
    language: NamedAPIResource;
}

export interface Effect {
    effect: string;
    language: NamedAPIResource;
}

export interface VerboseEffect {
    effect: string;
    short_effect: string;
    language: NamedAPIResource;
}
