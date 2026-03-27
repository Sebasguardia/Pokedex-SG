// ─────────────────────────────────────────────────────────────────────────────
// PUNTUACIÓN DEL EQUIPO + ROLES + SINERGIAS
// ─────────────────────────────────────────────────────────────────────────────

import {
    TeamMember, PokemonRole, TeamSynergy, TeamAnalysis,
} from "@/types/api/team-builder.types";
import { getScoreMeta } from "@/lib/constants/team-builder.constants";
import {
    analyzeDefensiveWeaknesses, analyzeOffensiveCoverage,
} from "./type-analysis";

// ── Puntuación ────────────────────────────────────────────────────────────────

export function calculateTeamScore(members: TeamMember[]): {
    overall: number; offense: number; defense: number; diversity: number; immunity: number;
} {
    if (members.length === 0) return { overall: 0, offense: 0, defense: 0, diversity: 0, immunity: 0 };

    const def = analyzeDefensiveWeaknesses(members);
    const off = analyzeOffensiveCoverage(members);

    // Cobertura ofensiva
    const coveredTypes = off.filter((o) => o.isCovered).length;
    const offense = Math.round((coveredTypes / 18) * 100);

    // Debilidades defensivas
    const criticalWeaks = def.filter((d) => d.multiplier >= 4 && d.vulnerable.length >= 2).length;
    const normalWeaks = def.filter((d) => d.multiplier >= 2 && d.vulnerable.length >= 3).length;
    const defense = Math.max(0, Math.round(100 - criticalWeaks * 20 - normalWeaks * 8));

    // Diversidad de tipos
    const typeCounts = new Map<string, number>();
    members.forEach((m) => m.types.forEach((t) =>
        typeCounts.set(t, (typeCounts.get(t) ?? 0) + 1)
    ));
    const maxDup = members.length > 0 ? Math.max(...Array.from(typeCounts.values()), 0) : 0;
    const diversity = Math.max(0, Math.round(100 - (maxDup - 1) * 20));

    // Inmunidades
    const immunities = def.filter((d) => d.immune.length >= 1).length;
    const immunity = Math.min(100, Math.round(immunities * 14));

    const overall = Math.round(
        offense * 0.35 + defense * 0.35 + diversity * 0.2 + immunity * 0.1
    );

    return { overall, offense, defense, diversity, immunity };
}

// ── Detección de roles ────────────────────────────────────────────────────────

export function detectRole(member: TeamMember): PokemonRole {
    const s = member.baseStats;
    const speed = s.speed;
    const atk = s.attack;
    const spa = s.specialAttack;
    const hp = s.hp;
    const def = s.defense;
    const spd = s.specialDefense;

    const totalOff = atk + spa;
    const totalDef = def + spd + hp;

    if (speed >= 100 && atk > 110) return "physicalSweeper";
    if (speed >= 100 && spa > 110) return "specialSweeper";
    if (speed < 50 && atk > 110) return "trickRoomSetter";
    if (hp >= 90 && def >= 90 && speed < 70) return "physicalWall";
    if (hp >= 90 && spd >= 90 && speed < 70) return "specialWall";
    if (speed >= 70 && totalDef > 230 && totalOff < 180) return "support";
    if (speed >= 90 && totalOff > 160) return "lead";
    if (speed >= 80 && atk > 80 && spa > 80) return "mixedAttacker";
    return "pivot";
}

export function detectRoles(members: TeamMember[]): Partial<Record<PokemonRole, TeamMember>> {
    const result: Partial<Record<PokemonRole, TeamMember>> = {};
    members.forEach((m) => {
        const role = detectRole(m);
        if (!result[role]) result[role] = m;
    });
    return result;
}

// ── Detección de sinergias ────────────────────────────────────────────────────

type SynergyDetector = {
    id: string;
    check: (members: TeamMember[]) => TeamMember[] | false;
    build: (matched: TeamMember[]) => TeamSynergy;
};

const SYNERGY_DETECTORS: SynergyDetector[] = [
    {
        id: "sun-team",
        check: (members) => {
            const setter = members.find((m) => m.ability?.name === "drought");
            const users = members.filter((m) =>
                m.types.includes("fire") || m.types.includes("grass")
            );
            return setter && users.length >= 1 ? [setter, ...users].slice(0, 3) : false;
        },
        build: (matched) => ({
            id: "sun-team", type: "weather", quality: "good",
            label: "Equipo de Sol",
            description: "Tienes un setter de sol (Drought). Los movimientos de Fuego y Planta se potencian en el sol.",
            members: matched,
        }),
    },
    {
        id: "rain-team",
        check: (members) => {
            const setter = members.find((m) => m.ability?.name === "drizzle");
            const users = members.filter((m) =>
                m.types.includes("water") || m.types.includes("electric")
            );
            return setter && users.length >= 1 ? [setter, ...users].slice(0, 3) : false;
        },
        build: (matched) => ({
            id: "rain-team", type: "weather", quality: "good",
            label: "Equipo de Lluvia",
            description: "Tienes un setter de lluvia (Drizzle). Swift Swim y los ataques de Agua se potencian.",
            members: matched,
        }),
    },
    {
        id: "sand-team",
        check: (members) => {
            const setter = members.find((m) => ["sand-stream", "sand-spit"].includes(m.ability?.name ?? ""));
            return setter ? [setter] : false;
        },
        build: (matched) => ({
            id: "sand-team", type: "weather", quality: "partial",
            label: "Equipo de Arena",
            description: "Tienes un setter de arena. Los Pokémon de tipo Roca, Acero y Tierra son inmunes al daño de arena.",
            members: matched,
        }),
    },
    {
        id: "trick-room",
        check: (members) => {
            const slow = members.filter((m) => m.baseStats.speed < 55);
            return slow.length >= 2 ? slow : false;
        },
        build: (matched) => ({
            id: "trick-room", type: "trick-room", quality: "partial",
            label: "Potencial Trick Room",
            description: "Tienes varios Pokémon lentos. Un setter de Trick Room podría potenciar este equipo enormemente.",
            members: matched,
        }),
    },
    {
        id: "wfg-core",
        check: (members) => {
            const water = members.find((m) => m.types.includes("water"));
            const fire = members.find((m) => m.types.includes("fire"));
            const grass = members.find((m) => m.types.includes("grass"));
            return water && fire && grass ? [water, fire, grass] : false;
        },
        build: (matched) => ({
            id: "wfg-core", type: "type-core", quality: "good",
            label: "Núcleo Agua / Fuego / Planta",
            description: "El núcleo clásico. Estos tres tipos se cubren mutuamente las debilidades. Base sólida para cualquier equipo.",
            members: matched,
        }),
    },
    {
        id: "dragon-core",
        check: (members) => {
            const dragons = members.filter((m) => m.types.includes("dragon"));
            return dragons.length >= 2 ? dragons : false;
        },
        build: (matched) => ({
            id: "dragon-core", type: "type-core", quality: "partial",
            label: "Núcleo de Dragones",
            description: "Tienes múltiples Pokémon Dragón. Mucho poder ofensivo, pero comparten debilidad a Hada y Hielo.",
            members: matched,
        }),
    },
    {
        id: "bulky-offense",
        check: (members) => {
            const bulky = members.filter((m) => {
                const { hp, defense, specialDefense } = m.baseStats;
                return hp + defense + specialDefense > 250;
            });
            const fast = members.filter((m) => m.baseStats.speed >= 100);
            return bulky.length >= 2 && fast.length >= 2 ? [...bulky, ...fast].slice(0, 4) : false;
        },
        build: (matched) => ({
            id: "bulky-offense", type: "custom", quality: "excellent",
            label: "Ofensiva Robusta",
            description: "Buena mezcla de Pokémon resistentes y rápidos. Este equipo puede aguantar golpes y contraatacar.",
            members: matched,
        }),
    },
];

export function detectSynergies(members: TeamMember[]): TeamSynergy[] {
    const result: TeamSynergy[] = [];
    for (const detector of SYNERGY_DETECTORS) {
        const matched = detector.check(members);
        if (matched) result.push(detector.build(matched));
    }
    return result;
}

// ── Análisis completo ─────────────────────────────────────────────────────────

export function buildFullAnalysis(members: TeamMember[]): TeamAnalysis {
    const defensive = analyzeDefensiveWeaknesses(members);
    const offensive = analyzeOffensiveCoverage(members);
    const scores = calculateTeamScore(members);
    const { label, color } = getScoreMeta(scores.overall);

    return {
        defensiveWeaknesses: defensive,
        offensiveCoverage: offensive,
        uncoveredTypes: offensive.filter((o) => !o.isCovered).map((o) => o.type),
        criticalWeaknesses: defensive.filter((d) => d.netVulnerable >= 2).map((d) => d.type),
        overallScore: scores.overall,
        scoreLabel: label,
        scoreColor: color,
        offensiveScore: scores.offense,
        defensiveScore: scores.defense,
        diversityScore: scores.diversity,
        immunityScore: scores.immunity,
        rolesMap: detectRoles(members),
        synergies: detectSynergies(members),
    };
}