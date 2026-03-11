"use client";

import { notFound } from "next/navigation";
import { useBerry } from "@/lib/hooks/useBerries";
import { Spinner } from "@/components/ui/spinner";
import { BerryFlavorChart } from "@/components/berries/berry-flavor-chart";
import { formatPokemonName } from "@/lib/utils/pokemon.utils";

export default function BerryDetailPage({ params }: { params: { name: string } }) {
    const { data, isLoading, isError } = useBerry(params.name);

    if (isLoading) return <div className="flex min-h-[60vh] items-center justify-center"><Spinner size="lg" /></div>;
    if (isError || !data) return notFound();

    const flavors = data.flavors.map((f: any) => ({
        flavor: f.flavor.name,
        potency: f.potency,
    }));

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <div className="flex items-center gap-3 mb-8">
                <span className="text-5xl">🍓</span>
                <div>
                    <h1 className="text-2xl font-pixel text-white">{formatPokemonName(data.name)} Berry</h1>
                    <p className="text-sm text-muted-foreground capitalize">Firmeza: {data.firmness?.name}</p>
                </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                {[
                    { label: "Tiempo crecimiento", value: `${data.growth_time}h` },
                    { label: "Cosecha máx.", value: data.max_harvest },
                    { label: "Suavidad", value: data.smoothness },
                    { label: "Tamaño", value: `${data.size}mm` },
                ].map((s) => (
                    <div key={s.label} className="text-center p-3 rounded-xl border border-poke-border bg-poke-surface">
                        <p className="text-lg font-bold text-white">{s.value}</p>
                        <p className="text-[10px] text-muted-foreground mt-1">{s.label}</p>
                    </div>
                ))}
            </div>

            <div className="p-4 rounded-xl border border-poke-border bg-poke-surface">
                <p className="text-sm font-semibold text-white mb-4">Sabores</p>
                <BerryFlavorChart flavors={flavors} />
            </div>
        </div>
    );
}
