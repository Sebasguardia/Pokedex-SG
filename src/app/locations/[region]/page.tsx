"use client";

import { notFound } from "next/navigation";
import { useRegion } from "@/lib/hooks/useLocations";
import { Spinner } from "@/components/ui/spinner";
import { SectionHeader } from "@/components/ui/section-header";
import { formatPokemonName } from "@/lib/utils/pokemon.utils";
import { MapPin } from "lucide-react";
import Link from "next/link";

export default function RegionDetailPage({ params }: { params: { region: string } }) {
    const { data, isLoading, isError } = useRegion(params.region);

    if (isLoading) return <div className="flex min-h-[60vh] items-center justify-center"><Spinner size="lg" /></div>;
    if (isError || !data) return notFound();

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="mb-8">
                <h1 className="text-2xl font-pixel text-white capitalize">{formatPokemonName(data.name)}</h1>
                <p className="text-sm text-muted-foreground mt-1">{data.locations.length} ubicaciones</p>
            </div>

            <SectionHeader title="Ubicaciones" />
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {data.locations.slice(0, 40).map((loc: any) => (
                    <div key={loc.name} className="flex items-center gap-3 p-3 rounded-lg border border-poke-border bg-poke-surface">
                        <MapPin className="h-4 w-4 text-orange-400 shrink-0" />
                        <span className="text-sm text-white capitalize">{formatPokemonName(loc.name)}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
