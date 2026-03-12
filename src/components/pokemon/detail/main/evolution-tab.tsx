"use client";

import { EvolutionChain } from "@/components/pokemon/detail/content/evolution-chain";
import { FlatEvolution } from "@/lib/utils/evolution.utils";

interface EvolutionTabProps {
    chain: FlatEvolution;
}

export function EvolutionTab({ chain }: EvolutionTabProps) {
    return (
        <div className="p-2">
            <EvolutionChain chain={chain as any} />
        </div>
    );
}
