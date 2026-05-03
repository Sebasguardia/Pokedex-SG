import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import {
    getPokemonList, getPokemonForTeam, getLightPokemonPool,
} from "@/lib/api/team-builder";
import { apiClient } from "@/lib/api/client";
import { useTeamBuilderStore } from "@/lib/stores/teamBuilderStore";
import { buildFullAnalysis } from "@/lib/utils/team-scoring";
import { generateRecommendations } from "@/lib/utils/team-recommendations";

// ── Lista ligera de Pokémon (para el buscador) ────────────────────────────────
export function usePokemonList() {
    return useQuery({
        queryKey: ["pokemon", "list-full"],
        queryFn: getPokemonList,
        staleTime: Infinity,
        gcTime: Infinity,
    });
}

// ── Mapa de Tipos de todos los Pokémon ────────────────────────────────────────
export function useAllPokemonTypesMap() {
    return useQuery({
        queryKey: ["all-pokemon-types-map"],
        queryFn: async () => {
            const typesList = ["normal", "fire", "water", "electric", "grass", "ice", "fighting", "poison", "ground", "flying", "psychic", "bug", "rock", "ghost", "dragon", "dark", "steel", "fairy"];
            const promises = typesList.map(t => apiClient.get(`/type/${t}`).then(res => res.data));
            const results = await Promise.all(promises);
            
            const map = new Map<string, string[]>();
            results.forEach((typeData: any) => {
                const t = typeData.name;
                typeData.pokemon.forEach((p: any) => {
                    const name = p.pokemon.name;
                    if (!map.has(name)) map.set(name, []);
                    map.get(name)!.push(t);
                });
            });
            return map;
        },
        staleTime: Infinity,
        gcTime: Infinity,
    });
}// ── Detalle de un Pokémon para el equipo (carga al añadir) ───────────────────
export function usePokemonForTeam(idOrName: string | number, enabled = true) {
    return useQuery({
        queryKey: ["pokemon-team-data", idOrName],
        queryFn: () => getPokemonForTeam(idOrName),
        enabled: !!idOrName && enabled,
        staleTime: Infinity,
    });
}

// ── Pool ligero para recomendaciones ─────────────────────────────────────────
export function useLightPokemonPool(limit = 151) {
    return useQuery({
        queryKey: ["pokemon-pool-light", limit],
        queryFn: () => getLightPokemonPool(limit),
        staleTime: Infinity,
        gcTime: Infinity,
    });
}

// ── Análisis del equipo activo ────────────────────────────────────────────────
export function useTeamAnalysis() {
    const members = useTeamBuilderStore((s) => s.activeTeam.members);

    return useMemo(() => {
        if (members.length === 0) return null;
        return buildFullAnalysis(members);
    }, [
        // Dependencia precisa: solo recalcular si cambian IDs o habilidades
        members.map((m) => `${m.pokemonId}-${m.ability?.name ?? ""}`).join(","),
    ]);
}

// ── Recomendaciones ───────────────────────────────────────────────────────────
export function useTeamRecommendations() {
    const members = useTeamBuilderStore((s) => s.activeTeam.members);
    const analysis = useTeamAnalysis();
    const { data: pool } = useLightPokemonPool(300);

    return useMemo(() => {
        if (!pool || !analysis || members.length === 0 || members.length >= 6) return [];
        return generateRecommendations(members, pool, analysis);
    }, [members.length, analysis?.overallScore, pool?.length]);
}