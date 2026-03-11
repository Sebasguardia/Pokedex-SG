import { ChainLink, EvolutionDetail } from "@/types/api/evolution.types";

export interface FlatEvolution {
    speciesName: string;
    speciesUrl: string;
    evolutionDetails: EvolutionDetail[];
    evolvesTo: FlatEvolution[];
}

/** Recursively parse a ChainLink into a flat tree structure */
export function parseEvolutionChain(chain: ChainLink): FlatEvolution {
    return {
        speciesName: chain.species.name,
        speciesUrl: chain.species.url,
        evolutionDetails: chain.evolution_details,
        evolvesTo: chain.evolves_to.map(parseEvolutionChain),
    };
}

/** Flatten a ChainLink into an ordered array for simple linear chains */
export function flattenEvolutionChain(chain: ChainLink): string[] {
    const names: string[] = [chain.species.name];
    let current = chain;
    while (current.evolves_to.length > 0) {
        current = current.evolves_to[0];
        names.push(current.species.name);
    }
    return names;
}
