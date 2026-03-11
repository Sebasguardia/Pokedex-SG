"use client";

import { useLocations } from "@/lib/hooks/useLocations";
import { SectionHeader } from "@/components/ui/section-header";
import { Spinner } from "@/components/ui/spinner";
import { Map } from "lucide-react";
import Link from "next/link";
import { formatPokemonName } from "@/lib/utils/pokemon.utils";

export default function LocationsPage() {
    const { data, isLoading } = useLocations();

    if (isLoading) return <div className="flex min-h-[60vh] items-center justify-center"><Spinner size="lg" /></div>;

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <SectionHeader title="Regiones" subtitle="Todas las regiones del mundo Pokémon" />
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(data?.results ?? []).map((region) => (
                    <Link
                        key={region.name}
                        href={`/locations/${region.name}`}
                        className="flex items-center gap-4 p-4 rounded-xl border border-poke-border bg-poke-surface hover:border-poke-red/50 transition-all"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-poke-darker">
                            <Map className="h-5 w-5 text-orange-400" />
                        </div>
                        <span className="font-semibold text-white capitalize">{formatPokemonName(region.name)}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
