"use client";

import { useBerries } from "@/lib/hooks/useBerries";
import { BerryGrid } from "@/components/berries/berry-grid";
import { SectionHeader } from "@/components/ui/section-header";

export default function BerriesPage() {
    const { data, isLoading } = useBerries(64);

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <SectionHeader title="Bayas" subtitle="Las 64 bayas disponibles y su información" />
            <div className="mt-8">
                <BerryGrid berries={data?.results ?? []} isLoading={isLoading} />
            </div>
        </div>
    );
}
