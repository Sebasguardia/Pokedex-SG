/** Returns a zero-padded Pokémon ID string e.g. 1 → "#001" */
export function formatPokemonId(id: number): string {
    return `#${String(id).padStart(3, "0")}`;
}

/** Capitalizes first letter of a Pokémon name and removes hyphens */
export function formatPokemonName(name: string): string {
    return name
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
}

/** Extract the ID from a PokéAPI URL */
export function getIdFromUrl(url: string): number {
    const parts = url.split("/").filter(Boolean);
    return parseInt(parts[parts.length - 1], 10);
}

/** Returns the official artwork URL for a given Pokémon ID */
export function getPokemonArtworkUrl(id: number): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

/** Returns the shiny official artwork URL */
export function getPokemonShinyArtworkUrl(id: number): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${id}.png`;
}

/** Returns the simple sprite URL for a given Pokémon ID */
export function getPokemonSpriteUrl(id: number, shiny = false): string {
    return shiny
        ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png`
        : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}
