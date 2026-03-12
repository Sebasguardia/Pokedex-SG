"use client";

import { useFavorites } from "@/lib/hooks/useFavorites";
import { SectionHeader } from "@/components/ui/section-header";
import { EmptyState } from "@/components/ui/empty-state";
import { PokemonGrid } from "@/components/pokemon/list/pokemon-grid";
import { Button } from "@/components/ui/button";
import { Heart, Trash2 } from "lucide-react";
import Link from "next/link";
import { useFilterStore } from "@/lib/store/filter.store";

export default function FavoritesPage() {
    const { favorites, clearFavorites } = useFavorites();
    const { pokedexFilters } = useFilterStore();
    const pokedexHref = pokedexFilters ? `/pokemon?${pokedexFilters}` : "/pokemon";

    // Build fake NamedAPIResource list from IDs (grid uses URLs to derive ID)
    const fakePokemon = favorites.map((id) => ({
        name: `pokemon-${id}`,
        url: `https://pokeapi.co/api/v2/pokemon/${id}/`,
    }));

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="flex items-center justify-between mb-2">
                <SectionHeader title="Favoritos" subtitle={`${favorites.length} Pokémon guardados`} />
                {favorites.length > 0 && (
                    <Button variant="outline" size="sm" onClick={clearFavorites} className="text-poke-red border-poke-red/40 hover:bg-poke-red/10">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Limpiar
                    </Button>
                )}
            </div>

            {favorites.length === 0 ? (
                <EmptyState
                    title="Sin favoritos aún"
                    description="Explora la Pokédex y marca tus Pokémon favoritos con el botón de corazón."
                    icon={<Heart className="h-12 w-12" />}
                    action={<Link href={pokedexHref}><Button>Ir a la Pokédex</Button></Link>}
                />
            ) : (
                <PokemonGrid pokemon={fakePokemon} isLoading={false} />
            )}
        </div>
    );
}
