"use client";

import { useGenerations } from "@/lib/hooks/useGenerations";
import { SectionHeader } from "@/components/ui/section-header";
import { GENERATIONS } from "@/lib/constants/generations.constants";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";

export default function GenerationsPage() {
    const { isLoading } = useGenerations();

    if (isLoading) return <div className="flex min-h-[60vh] items-center justify-center"><Spinner size="lg" /></div>;

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <SectionHeader title="Generaciones" subtitle="9 generaciones, 9 regiones, un mundo por explorar" />
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {GENERATIONS.map((gen) => (
                    <Link
                        key={gen.name}
                        href={`/generations/${gen.name}`}
                        className="p-5 rounded-xl border border-poke-border bg-poke-surface hover:border-poke-red/50 transition-all"
                    >
                        <p className="font-pixel text-poke-red text-sm mb-1">{gen.label}</p>
                        <p className="font-semibold text-white">{gen.region}</p>
                        <p className="text-xs text-muted-foreground mt-1">{gen.games.join(" · ")}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                            #{gen.range[0]}–#{gen.range[1]}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
