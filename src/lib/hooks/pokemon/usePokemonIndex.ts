import { useQuery } from '@tanstack/react-query';

export interface PokemonIndexItem {
    id: number;
    name: string;
    weight: number;
    height: number;
    types: string[];
    stats: {
        hp: number;
        attack: number;
        defense: number;
        specialAttack: number;
        specialDefense: number;
        speed: number;
    };
    evolves_from_species_id: number | null;
    evolution_method?: 'level' | 'item' | 'trade' | 'other' | 'base';
}

const GRAPHQL_ENDPOINT = 'https://beta.pokeapi.co/graphql/v1beta';

const QUERY = `
query GetGlobalPokedex {
  pokemon_v2_pokemon(order_by: {id: asc}) {
    id
    name
    weight
    height
    pokemon_v2_pokemonstats {
      base_stat
      stat_id
    }
    pokemon_v2_pokemontypes {
      pokemon_v2_type {
        name
      }
    }
    pokemon_v2_pokemonspecy {
      evolves_from_species_id
      pokemon_v2_pokemonevolutions(limit: 1) {
        min_level
        pokemon_v2_item {
          name
        }
        pokemon_v2_evolutiontrigger {
          name
        }
      }
    }
  }
}
`;

async function fetchPokemonIndex(): Promise<PokemonIndexItem[]> {
    const res = await fetch(GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Accept-Encoding': 'gzip, deflate, br',
        },
        body: JSON.stringify({ query: QUERY })
    });

    if (!res.ok) {
        throw new Error('Failed to fetch global pokemon index');
    }

    const json = await res.json();
    
    return json.data.pokemon_v2_pokemon.map((p: any) => {
        // Map stats based on stat_id: 1=hp, 2=atk, 3=def, 4=spa, 5=spd, 6=spe
        const stats = p.pokemon_v2_pokemonstats;
        const getStat = (id: number) => stats.find((s: any) => s.stat_id === id)?.base_stat || 0;

        let evoMethod: 'base' | 'level' | 'item' | 'trade' | 'other' = 'base';
        
        const species = p.pokemon_v2_pokemonspecy;
        if (species?.evolves_from_species_id) {
            const evos = species.pokemon_v2_pokemonevolutions || [];
            if (evos.length > 0) {
                const trigger = evos[0].pokemon_v2_evolutiontrigger?.name;
                const minLevel = evos[0].min_level;
                const item = evos[0].pokemon_v2_item;
                
                if (trigger === 'trade') evoMethod = 'trade';
                else if (item || trigger === 'use-item') evoMethod = 'item';
                else if (minLevel) evoMethod = 'level';
                else evoMethod = 'other';
            } else {
                evoMethod = 'other';
            }
        }

        return {
            id: p.id,
            name: p.name,
            weight: p.weight,
            height: p.height,
            types: p.pokemon_v2_pokemontypes.map((t: any) => t.pokemon_v2_type.name),
            evolves_from_species_id: species?.evolves_from_species_id || null,
            evolution_method: evoMethod,
            stats: {
                hp: getStat(1),
                attack: getStat(2),
                defense: getStat(3),
                specialAttack: getStat(4),
                specialDefense: getStat(5),
                speed: getStat(6),
            }
        };
    });
}

export function usePokemonIndex() {
    return useQuery({
        queryKey: ['pokemon-global-index', 'v2'],
        queryFn: fetchPokemonIndex,
        staleTime: Infinity, // Data almost never changes
        gcTime: Infinity,    // Keep indefinitely in memory
    });
}
