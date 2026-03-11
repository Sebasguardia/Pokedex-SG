"use client";

import { EmptyState } from "@/components/ui/empty-state";
import { MapPin } from "lucide-react";

interface LocationsTabProps {
    encounters: any[];
}

export function LocationsTab({ encounters }: LocationsTabProps) {
    if (!encounters || encounters.length === 0) {
        return (
            <EmptyState
                title="Sin encuentros"
                description="Este Pokémon no aparece en la naturaleza en esta versión."
                icon={<MapPin className="h-12 w-12" />}
            />
        );
    }

    return (
        <div className="flex flex-col gap-3">
            {encounters.slice(0, 20).map((enc: any, i: number) => (
                <div key={i} className="p-3 rounded-lg border border-poke-border bg-poke-darker">
                    <p className="text-sm font-medium text-white capitalize">{enc.location_area?.name?.replace(/-/g, " ") ?? "Área desconocida"}</p>
                    {enc.version_details?.map((vd: any, j: number) => (
                        <p key={j} className="text-xs text-muted-foreground mt-1">
                            {vd.version.name} — Nivel {vd.encounter_details?.[0]?.min_level}–{vd.encounter_details?.[0]?.max_level}
                        </p>
                    ))}
                </div>
            ))}
        </div>
    );
}
