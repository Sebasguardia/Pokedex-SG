"use client";

import { formatPokemonName } from "@/lib/utils/pokemon.utils";
import { Skeleton } from "@/components/ui/skeleton";
import { NamedAPIResource } from "@/types/api/common.types";

interface MoveTableProps {
    moves: NamedAPIResource[];
    isLoading?: boolean;
}

export function MoveTable({ moves, isLoading }: MoveTableProps) {
    if (isLoading) {
        return (
            <div className="flex flex-col gap-2">
                {Array.from({ length: 10 }).map((_, i) => <Skeleton key={i} className="h-12 rounded-lg" />)}
            </div>
        );
    }

    return (
        <div className="overflow-auto rounded-lg border border-poke-border">
            <table className="w-full text-sm">
                <thead className="bg-poke-darker">
                    <tr>
                        <th className="px-4 py-3 text-left text-xs text-muted-foreground">Movimiento</th>
                    </tr>
                </thead>
                <tbody>
                    {moves.map((m) => (
                        <tr key={m.name} className="border-t border-poke-border hover:bg-poke-surface/50 transition-colors">
                            <td className="px-4 py-3 font-medium text-white capitalize">{formatPokemonName(m.name)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
