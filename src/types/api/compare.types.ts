export interface PokemonStatMap {
    hp: number
    attack: number
    defense: number
    specialAttack: number
    specialDefense: number
    speed: number
}

export interface PokemonAbilityInfo {
    name: string
    nameEs: string
    isHidden: boolean
    slot: number
}

export interface ComparedPokemon {
    // Identity
    id: number
    name: string
    nameEs: string
    genus: string
    flavorText: string

    // Visuals
    artwork: string
    sprite: string

    // Types
    types: string[]

    // Stats
    stats: PokemonStatMap
    bst: number

    // Abilities
    abilities: PokemonAbilityInfo[]

    // Physical
    height: number
    weight: number
    baseExperience: number | null

    // Breeding (from species)
    captureRate: number
    baseHappiness: number
    genderRate: number
    eggGroups: string[]
    growthRate: string
    isLegendary: boolean
    isMythical: boolean

    // Moves (slugs only)
    moves: string[]
}

export type CompareSlots = [string | null, string | null, string | null, string | null]
export type CompareData = [ComparedPokemon | null, ComparedPokemon | null, ComparedPokemon | null, ComparedPokemon | null]
