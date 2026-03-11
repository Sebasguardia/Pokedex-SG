"use client";

import { useCompare } from "@/lib/hooks/useCompare";
import { usePokemon } from "@/lib/hooks/usePokemon";
import { ComparePanel } from "@/components/compare/compare-panel";
import { CompareStats } from "@/components/compare/compare-stats";
import { SectionHeader } from "@/components/ui/section-header";
import { EmptyState } from "@/components/ui/empty-state";
import { Scale } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useFilterStore } from "@/lib/store/filter.store";

export default function ComparePage() {
    const { pokemonIds } = useCompare();
    const selected = pokemonIds.filter(Boolean) as number[];
    const { pokedexFilters } = useFilterStore();
    const pokedexHref = pokedexFilters ? `/pokemon?${pokedexFilters}` : "/pokemon";

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <SectionHeader title="Comparador" subtitle="Compara hasta 3 Pokémon lado a lado" />

            <div className="mt-8">
                <ComparePanel />
            </div>

            {selected.length === 0 ? (
                <div className="mt-12">
                    <EmptyState
                        title="Nada que comparar"
                        description='Añade Pokémon al comparador pulsando el botón "Comparar" en la ficha de cada Pokémon.'
                        icon={<Scale className="h-12 w-12" />}
                        action={<Link href={pokedexHref}><Button>Explorar Pokédex</Button></Link>}
                    />
                </div>
            ) : (
                <div className="mt-10">
                    <SectionHeader title="Comparativa de Estadísticas" />
                    <CompareStatsWrapper ids={selected} />
                </div>
            )}
        </div>
    );
}

function CompareStatsWrapper({ ids }: { ids: number[] }) {
    // Fetch each selected pokemon
    const p1 = usePokemon(ids[0]);
    const p2 = usePokemon(ids[1] ?? 0);
    const p3 = usePokemon(ids[2] ?? 0);

    const pokemonList = [p1, p2, p3]
        .filter((q, i) => !!ids[i] && q.data)
        .map((q) => q.data!);

    if (pokemonList.length === 0) return null;

    return (
        <div className="mt-4">
            <CompareStats pokemonList={pokemonList.map((p) => ({
                id: p.id,
                name: p.name,
                stats: p.stats,
            }))} />
        </div>
    );
}
