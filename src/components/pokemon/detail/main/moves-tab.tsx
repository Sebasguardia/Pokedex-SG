"use client";

import { useState } from "react";
import { TypeBadge } from "@/components/pokemon/shared/type-badge";
import { formatPokemonName } from "@/lib/utils/pokemon.utils";

interface PokemonMove {
    move: { name: string; url: string };
    version_group_details: {
        level_learned_at: number;
        move_learn_method: { name: string };
        version_group: { name: string };
    }[];
}

interface MovesTabProps {
    moves: PokemonMove[];
}

export function MovesTab({ moves }: MovesTabProps) {
    const [method, setMethod] = useState<string>("level-up");

    const methods = ["level-up", "machine", "egg", "tutor"];
    const filtered = moves.filter((m) =>
        m.version_group_details.some((d) => d.move_learn_method.name === method)
    );

    return (
        <div className="flex flex-col gap-4">
            {/* Method filter */}
            <div className="flex flex-wrap gap-2">
                {methods.map((m) => (
                    <button
                        key={m}
                        onClick={() => setMethod(m)}
                        className={`px-3 py-1 rounded-full text-xs border transition-all ${method === m ? "border-poke-red bg-poke-red/10 text-poke-red" : "border-poke-border text-muted-foreground hover:border-poke-red/40"}`}
                    >
                        {m === "level-up" ? "Nivel" : m === "machine" ? "MT/MO" : m === "egg" ? "Huevo" : "Tutor"}
                    </button>
                ))}
            </div>

            {/* Moves table */}
            <div className="overflow-auto rounded-lg border border-poke-border">
                <table className="w-full text-sm">
                    <thead className="bg-poke-darker">
                        <tr>
                            <th className="px-3 py-2 text-left text-xs text-muted-foreground">Nivel</th>
                            <th className="px-3 py-2 text-left text-xs text-muted-foreground">Movimiento</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.slice(0, 30).map((m) => {
                            const detail = m.version_group_details.find((d) => d.move_learn_method.name === method);
                            return (
                                <tr key={m.move.name} className="border-t border-poke-border hover:bg-poke-surface/50">
                                    <td className="px-3 py-2 font-mono text-xs text-muted-foreground">
                                        {detail?.level_learned_at ?? "—"}
                                    </td>
                                    <td className="px-3 py-2 capitalize font-medium text-white">
                                        {formatPokemonName(m.move.name)}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
