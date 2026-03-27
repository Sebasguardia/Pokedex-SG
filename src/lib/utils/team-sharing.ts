// ─────────────────────────────────────────────────────────────────────────────
// TEAM SHARING — Codificar/decodificar equipos en URL
// ─────────────────────────────────────────────────────────────────────────────

import { PokemonTeam, TeamMember } from "@/types/api/team-builder.types";
import { generateId } from "@/lib/constants/team-builder.constants";

interface MinimalTeam {
    n: string;                                // nombre
    m: { i: number; a?: string }[];          // id + ability.name
}

export function encodeTeam(team: PokemonTeam): string {
    try {
        const minimal: MinimalTeam = {
            n: team.name,
            m: team.members.map((m) => ({
                i: m.pokemonId,
                ...(m.ability ? { a: m.ability.name } : {}),
            })),
        };
        return btoa(encodeURIComponent(JSON.stringify(minimal)));
    } catch {
        return "";
    }
}

export function decodeTeamFromUrl(encoded: string): {
    name: string;
    memberData: { pokemonId: number; abilityName?: string }[];
} | null {
    try {
        const data = JSON.parse(decodeURIComponent(atob(encoded))) as MinimalTeam;
        return {
            name: data.n ?? "Equipo importado",
            memberData: (data.m ?? []).map((m) => ({
                pokemonId: m.i,
                abilityName: m.a,
            })),
        };
    } catch {
        return null;
    }
}

export function exportToShowdown(team: PokemonTeam): string {
    return team.members
        .map((m) => {
            const lines = [
                m.nameEs || m.name,
                m.ability ? `Ability: ${m.ability.nameEs || m.ability.name}` : "",
                "",
            ].filter((l) => l !== undefined);
            return lines.join("\n");
        })
        .join("\n\n");
}

export function createEmptyTeam(): PokemonTeam {
    return {
        id: generateId(),
        name: "Mi Equipo",
        members: [],
        createdAt: Date.now(),
        updatedAt: Date.now(),
    };
}