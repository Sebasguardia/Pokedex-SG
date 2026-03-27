"use client";
// ─────────────────────────────────────────────────────────────────────────────
// ZUSTAND STORE — Team Builder
// ─────────────────────────────────────────────────────────────────────────────

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
    PokemonTeam, TeamMember, TeamSearchFilters,
} from "@/types/api/team-builder.types";
import { generateId, ARTWORK_URL, SPRITE_URL } from "@/lib/constants/team-builder.constants";
import { createEmptyTeam } from "@/lib/utils/team-sharing";

const DEFAULT_FILTERS: TeamSearchFilters = {
    query: "",
    typeFilter: null,
    genFilter: null,
    regionFilter: null,
    roleFilter: null,
    statSort: null,
    sortDirection: "desc",
    legendaryFilter: "all",
    bstMin: 0,
    bstMax: 780,
};

interface TeamBuilderState {
    // Equipo activo
    activeTeam: PokemonTeam;
    // Equipos guardados
    savedTeams: PokemonTeam[];
    // UI
    selectedSlot: number | null;
    isSearchOpen: boolean;
    searchFilters: TeamSearchFilters;
    compareTeamId: string | null;

    // Acciones del equipo activo
    addMember: (member: Omit<TeamMember, "slot">, targetSlot?: number) => void;
    removeMember: (slot: number) => void;
    moveMember: (fromSlot: number, toSlot: number) => void;
    setAbility: (slot: number, ability: TeamMember["ability"]) => void;
    clearTeam: () => void;
    renameTeam: (name: string) => void;
    loadTeamData: (team: PokemonTeam) => void;

    // Acciones de guardado
    saveCurrentTeam: () => void;
    loadSavedTeam: (teamId: string) => void;
    deleteSavedTeam: (teamId: string) => void;
    duplicateTeam: (teamId: string) => void;

    // UI
    openSearch: (slot: number) => void;
    closeSearch: () => void;
    setFilters: (filters: Partial<TeamSearchFilters>) => void;
    clearFilters: () => void;
    setCompareTeamId: (id: string | null) => void;
}

export const useTeamBuilderStore = create<TeamBuilderState>()(
    persist(
        (set, get) => ({
            activeTeam: createEmptyTeam(),
            savedTeams: [],
            selectedSlot: null,
            isSearchOpen: false,
            searchFilters: DEFAULT_FILTERS,
            compareTeamId: null,

            addMember: (memberData, targetSlot) => {
                let slot = targetSlot ?? get().selectedSlot ?? -1;
                
                // Si no hay slot explícito, buscar el primero disponible
                if (slot === -1) {
                    const members = get().activeTeam.members;
                    for (let i = 0; i < 6; i++) {
                        if (!members.some((m) => m.slot === i)) {
                            slot = i;
                            break;
                        }
                    }
                }

                if (slot < 0 || slot > 5) return;

                const member: TeamMember = { ...memberData, slot };
                set((state) => {
                    const members = [...state.activeTeam.members];
                    // Reemplazar si ya hay alguien en ese slot, sino insertar
                    const existing = members.findIndex((m) => m.slot === slot);
                    if (existing >= 0) members[existing] = member;
                    else members.push(member);
                    return {
                        activeTeam: { ...state.activeTeam, members, updatedAt: Date.now() },
                        isSearchOpen: false,
                        selectedSlot: null,
                    };
                });
            },

            removeMember: (slot) => {
                set((state) => ({
                    activeTeam: {
                        ...state.activeTeam,
                        members: state.activeTeam.members.filter((m) => m.slot !== slot),
                        updatedAt: Date.now(),
                    },
                }));
            },

            moveMember: (fromSlot, toSlot) => {
                set((state) => {
                    const members = state.activeTeam.members.map((m) => {
                        if (m.slot === fromSlot) return { ...m, slot: toSlot };
                        if (m.slot === toSlot) return { ...m, slot: fromSlot };
                        return m;
                    });
                    return { activeTeam: { ...state.activeTeam, members, updatedAt: Date.now() } };
                });
            },

            setAbility: (slot, ability) => {
                set((state) => ({
                    activeTeam: {
                        ...state.activeTeam,
                        members: state.activeTeam.members.map((m) =>
                            m.slot === slot ? { ...m, ability } : m
                        ),
                        updatedAt: Date.now(),
                    },
                }));
            },

            clearTeam: () => {
                set({ activeTeam: { ...createEmptyTeam(), name: get().activeTeam.name } });
            },

            renameTeam: (name) => {
                set((state) => ({
                    activeTeam: { ...state.activeTeam, name, updatedAt: Date.now() },
                }));
            },

            loadTeamData: (team) => {
                set({ activeTeam: team });
            },

            saveCurrentTeam: () => {
                const team = get().activeTeam;
                if (team.members.length === 0) return;
                set((state) => {
                    const existing = state.savedTeams.findIndex((t) => t.id === team.id);
                    const updated = { ...team, updatedAt: Date.now() };
                    if (existing >= 0) {
                        const teams = [...state.savedTeams];
                        teams[existing] = updated;
                        return { savedTeams: teams };
                    }
                    const teams = [updated, ...state.savedTeams].slice(0, 10);
                    return { savedTeams: teams };
                });
            },

            loadSavedTeam: (teamId) => {
                const team = get().savedTeams.find((t) => t.id === teamId);
                if (team) set({ activeTeam: { ...team } });
            },

            deleteSavedTeam: (teamId) => {
                set((state) => ({
                    savedTeams: state.savedTeams.filter((t) => t.id !== teamId),
                }));
            },

            duplicateTeam: (teamId) => {
                const team = get().savedTeams.find((t) => t.id === teamId);
                if (!team) return;
                const copy: PokemonTeam = {
                    ...team,
                    id: generateId(),
                    name: `${team.name} (copia)`,
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                };
                set((state) => ({ savedTeams: [copy, ...state.savedTeams].slice(0, 10) }));
            },

            openSearch: (slot) => {
                set({ selectedSlot: slot, isSearchOpen: true });
            },

            closeSearch: () => {
                set({ isSearchOpen: false, selectedSlot: null });
            },

            setFilters: (filters) => {
                set((state) => ({
                    searchFilters: { ...state.searchFilters, ...filters },
                }));
            },

            clearFilters: () => {
                set({ searchFilters: DEFAULT_FILTERS });
            },

            setCompareTeamId: (compareTeamId) => {
                set({ compareTeamId });
            },
        }),
        {
            name: "pokedex-team-builder",
            partialize: (state) => ({
                savedTeams: state.savedTeams,
                activeTeam: state.activeTeam,
                compareTeamId: state.compareTeamId,
            }),
        }
    )
);