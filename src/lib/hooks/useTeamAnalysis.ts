// ─────────────────────────────────────────────────────────────────────────────
// useTeamAnalysis — Hook dedicado para el análisis completo del equipo
// Separado de useTeamBuilder para seguir el principio de responsabilidad única
// ─────────────────────────────────────────────────────────────────────────────

import { useMemo } from "react";
import { useTeamBuilderStore } from "@/lib/stores/teamBuilderStore";
import { buildFullAnalysis } from "@/lib/utils/team-scoring";
import { generateRecommendations } from "@/lib/utils/team-recommendations";
import { TeamAnalysis, PokemonRecommendation } from "@/types/api/team-builder.types";
import { useLightPokemonPool } from "./useTeamBuilder";

/**
 * Hook principal de análisis.
 * Recalcula SOLO cuando cambian los IDs o habilidades del equipo.
 * @returns TeamAnalysis | null (null si el equipo está vacío)
 */
export function useTeamAnalysis(): TeamAnalysis | null {
    const members = useTeamBuilderStore((s) => s.activeTeam.members);

    // Clave de dependencia precisa — evitar recálculos innecesarios
    const cacheKey = members
        .map((m) => `${m.pokemonId}:${m.ability?.name ?? ""}`)
        .join("|");

    return useMemo(() => {
        if (members.length === 0) return null;
        return buildFullAnalysis(members);
    }, [cacheKey]); // eslint-disable-line react-hooks/exhaustive-deps
}

/**
 * Hook de recomendaciones.
 * Depende del análisis y del pool de Pokémon.
 * @returns PokemonRecommendation[] — vacío si el equipo está lleno o sin datos
 */
export function useTeamRecommendations(): PokemonRecommendation[] {
    const members = useTeamBuilderStore((s) => s.activeTeam.members);
    const analysis = useTeamAnalysis();
    const { data: pool } = useLightPokemonPool(400);

    const cacheKey = members.map((m) => m.pokemonId).join(",");

    return useMemo(() => {
        if (!pool || !analysis || members.length === 0 || members.length >= 6) return [];
        return generateRecommendations(members, pool, analysis, 12);
    }, [cacheKey, analysis?.overallScore, pool?.length]); // eslint-disable-line
}

/**
 * Hook de debilidades críticas.
 * Retorna solo los tipos donde el equipo es vulnerable en ≥2 miembros.
 */
export function useCriticalWeaknesses(): string[] {
    const analysis = useTeamAnalysis();
    return useMemo(
        () => analysis?.criticalWeaknesses ?? [],
        [analysis?.criticalWeaknesses?.join(",")]
    );
}

/**
 * Hook de cobertura ofensiva.
 * Retorna los tipos que el equipo NO puede golpear super efectivo.
 */
export function useUncoveredTypes(): string[] {
    const analysis = useTeamAnalysis();
    return useMemo(
        () => analysis?.uncoveredTypes ?? [],
        [analysis?.uncoveredTypes?.join(",")]
    );
}

/**
 * Hook del score del equipo.
 * Útil para mostrar el badge de score en la navbar o en el slot header.
 */
export function useTeamScore(): { score: number; label: string; color: string } {
    const analysis = useTeamAnalysis();
    return useMemo(() => ({
        score: analysis?.overallScore ?? 0,
        label: analysis?.scoreLabel ?? "—",
        color: analysis?.scoreColor ?? "#888888",
    }), [analysis?.overallScore]);
}