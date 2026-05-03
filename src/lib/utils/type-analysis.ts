// ─────────────────────────────────────────────────────────────────────────────
// MOTOR DE ANÁLISIS DE TIPOS
// ─────────────────────────────────────────────────────────────────────────────

import {
    TeamMember, DefensiveWeaknessEntry, OffensiveCoverageEntry,
} from "@/types/api/team-builder.types";
import {
    TYPE_CHART, ALL_TYPES, ABILITY_TYPE_OVERRIDES,
} from "@/lib/constants/team-builder/team-builder.constants";

// ── Helper base ───────────────────────────────────────────────────────────────

/**
 * Calcular multiplicador de un tipo atacante contra un(os) tipo(s) defensor(es)
 */
export function getEffectiveness(attackType: string, defTypes: string[]): number {
    return defTypes.reduce((mult, defType) => {
        return mult * (TYPE_CHART[attackType]?.[defType] ?? 1);
    }, 1);
}

/**
 * Calcular multiplicador efectivo de un ataque contra un miembro,
 * teniendo en cuenta su habilidad.
 */
export function getEffectivenessForMember(
    attackType: string,
    member: TeamMember,
): number {
    let mult = getEffectiveness(attackType, member.types);

    if (member.ability) {
        const overrides = ABILITY_TYPE_OVERRIDES[member.ability.name];
        if (overrides) {
            if (overrides.immunities?.includes(attackType)) return 0;
            if (overrides.halfDamage?.includes(attackType)) mult *= 0.5;
        }
    }

    return mult;
}

// ── Análisis defensivo ────────────────────────────────────────────────────────

export function analyzeDefensiveWeaknesses(members: TeamMember[]): DefensiveWeaknessEntry[] {
    return ALL_TYPES.map((attackType) => {
        const vulnerable: TeamMember[] = [];
        const resistant: TeamMember[] = [];
        const immune: TeamMember[] = [];
        let maxMult = 0;

        members.forEach((member) => {
            const mult = getEffectivenessForMember(attackType, member);
            if (mult === 0) immune.push(member);
            else if (mult < 1) resistant.push(member);
            else if (mult > 1) vulnerable.push(member);
            if (mult > maxMult) maxMult = mult;
        });

        return {
            type: attackType,
            multiplier: maxMult,
            vulnerable,
            resistant,
            immune,
            netVulnerable: vulnerable.length - resistant.length - (immune.length * 2),
        };
    });
}

// ── Análisis ofensivo ─────────────────────────────────────────────────────────

/**
 * Para cada tipo defensor: qué miembros del equipo pueden golpearlo
 * super efectivo usando sus tipos STAB.
 */
export function analyzeOffensiveCoverage(members: TeamMember[]): OffensiveCoverageEntry[] {
    return ALL_TYPES.map((defType) => {
        const superEffective: TeamMember[] = [];
        const neutral: TeamMember[] = [];
        const notVeryEffective: TeamMember[] = [];
        const immune: TeamMember[] = [];

        members.forEach((member) => {
            const bestMult = Math.max(
                ...member.types.map((atkType) =>
                    getEffectiveness(atkType, [defType])
                )
            );

            if (bestMult === 0) immune.push(member);
            else if (bestMult > 1) superEffective.push(member);
            else if (bestMult === 1) neutral.push(member);
            else notVeryEffective.push(member);
        });

        return {
            type: defType,
            superEffective,
            neutral,
            notVeryEffective,
            immune,
            bestAttacker: superEffective[0] ?? null,
            isCovered: superEffective.length > 0,
        };
    });
}