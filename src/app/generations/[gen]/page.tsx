"use client";

import { notFound } from "next/navigation";
import { useGeneration } from "@/lib/hooks/useGenerations";
import { Spinner } from "@/components/ui/spinner";
import { PokemonGrid } from "@/components/pokemon/pokemon-grid";
import { SectionHeader } from "@/components/ui/section-header";
import { formatPokemonName } from "@/lib/utils/pokemon.utils";
import { GENERATIONS } from "@/lib/constants/generations.constants";
import { useQueryState, parseAsInteger } from "nuqs";
import { Pagination } from "@/components/shared/pagination";
import { useFilterStore } from "@/lib/store/filter.store";
import { useEffect } from "react";

export default function GenerationDetailPage({ params }: { params: { gen: string } }) {
    const { data, isLoading, isError } = useGeneration(params.gen);
    const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
    const { setLastGeneration } = useFilterStore();

    useEffect(() => {
        if (params.gen) setLastGeneration(params.gen);
    }, [params.gen, setLastGeneration]);

    if (isLoading) return <div className="flex min-h-[60vh] items-center justify-center"><Spinner size="lg" /></div>;
    if (isError || !data) return notFound();

    const genInfo = GENERATIONS.find((g) => g.name === params.gen);
    const limit = 60;

    const totalItems = data.pokemon_species.length;
    const startIndex = (page - 1) * limit;
    const paginatedPokemon = data.pokemon_species.slice(startIndex, startIndex + limit);

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="mb-8">
                <p className="text-xs font-pixel text-poke-red mb-1">{genInfo?.label}</p>
                <h1 className="text-2xl font-pixel text-white">{genInfo?.region ?? formatPokemonName(data.name)}</h1>
                <p className="text-sm text-muted-foreground mt-1">{genInfo?.games.join(" · ")}</p>
            </div>

            <SectionHeader title={`${totalItems} Pokémon`} />
            <div className="mt-6">
                <PokemonGrid
                    pokemon={paginatedPokemon.map((p: any) => ({ ...p, url: p.url.replace("pokemon-species", "pokemon") }))}
                    isLoading={false}
                />
            </div>

            {totalItems > limit && (
                <Pagination
                    currentPage={page}
                    totalItems={totalItems}
                    itemsPerPage={limit}
                    onPageChange={(p) => {
                        setPage(p);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                />
            )}
        </div>
    );
}
