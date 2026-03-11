"use client";

import { BerryCard } from "./berry-card";
import { Skeleton } from "@/components/ui/skeleton";
import { NamedAPIResource } from "@/types/api/common.types";

interface BerryGridProps {
    berries: NamedAPIResource[];
    isLoading?: boolean;
}

export function BerryGrid({ berries, isLoading }: BerryGridProps) {
    if (isLoading) {
        return (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {Array.from({ length: 18 }).map((_, i) => <Skeleton key={i} className="h-28 rounded-xl" />)}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {berries.map((b) => <BerryCard key={b.name} name={b.name} />)}
        </div>
    );
}
