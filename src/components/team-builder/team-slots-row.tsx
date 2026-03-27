"use client";

import { useTeamBuilderStore } from "@/lib/stores/teamBuilderStore";
import { DefensiveWeaknessEntry } from "@/types/api/team-builder.types";
import { TeamSlot } from "./team-slot";

interface TeamSlotsRowProps {
    weaknesses?: DefensiveWeaknessEntry[];
    /** Si es true los slots son de solo lectura (vista compartida). Por defecto false */
    readOnly?: boolean;
}

export function TeamSlotsRow({ weaknesses, readOnly = false }: TeamSlotsRowProps) {
    const { activeTeam, selectedSlot, openSearch, removeMember, moveMember } =
        useTeamBuilderStore();

    const members = activeTeam.members;

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {Array.from({ length: 6 }, (_, i) => {
                const member = members.find((m) => m.slot === i) ?? null;
                return (
                    <TeamSlot
                        key={i}
                        slot={i}
                        member={member}
                        isActive={selectedSlot === i}
                        onClick={() => !readOnly && openSearch(i)}
                        onRemove={(slot) => !readOnly && removeMember(slot)}
                        onDrop={(from, to) => !readOnly && moveMember(from, to)}
                        weaknesses={weaknesses}
                    />
                );
            })}
        </div>
    );
}
