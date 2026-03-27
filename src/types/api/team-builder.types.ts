// ─────────────────────────────────────────────────────────────────────────────
// TEAM BUILDER — Tipos TypeScript completos
// ─────────────────────────────────────────────────────────────────────────────

export interface TeamMemberBaseStats {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
}

export interface TeamMemberAbility {
    name: string;
    nameEs: string;
    slot: number; // 1 | 2 | 3 (hidden)
}

export interface TeamMember {
    pokemonId: number;
    name: string;         // slug inglés
    nameEs: string;         // nombre español
    types: string[];       // ["water", "flying"]
    sprite: string;         // URL sprite normal
    artwork: string;         // URL official artwork
    baseStats: TeamMemberBaseStats;
    ability?: TeamMemberAbility;
    slot: number;         // 0–5
    // Habilidades disponibles para este Pokémon
    availableAbilities?: TeamMemberAbility[];
}

export interface PokemonTeam {
    id: string;          // UUID local
    name: string;
    members: TeamMember[];    // max 6
    createdAt: number;
    updatedAt: number;
}

// ── Análisis ──────────────────────────────────────────────────────────────────

export interface DefensiveWeaknessEntry {
    type: string;
    multiplier: number;      // máximo multiplicador que recibe algún miembro
    vulnerable: TeamMember[];
    resistant: TeamMember[];
    immune: TeamMember[];
    netVulnerable: number;      // vulnerable.length - resistant.length - immune.length * 2
}

export interface OffensiveCoverageEntry {
    type: string;
    superEffective: TeamMember[];
    neutral: TeamMember[];
    notVeryEffective: TeamMember[];
    immune: TeamMember[];
    bestAttacker: TeamMember | null;
    isCovered: boolean;
}

export type PokemonRole =
    | "physicalSweeper"
    | "specialSweeper"
    | "physicalWall"
    | "specialWall"
    | "support"
    | "lead"
    | "mixedAttacker"
    | "pivot"
    | "weatherSetter"
    | "trickRoomSetter";

export interface TeamSynergy {
    id: string;
    type: "weather" | "trick-room" | "type-core" | "pivot-chain" | "hazards" | "custom";
    label: string;
    description: string;
    members: TeamMember[];
    quality: "excellent" | "good" | "partial";
}

export interface PokemonRecommendation {
    pokemonId: number;
    name: string;
    nameEs: string;
    sprite: string;
    types: string[];
    reason: string;
    coversTypes: string[];
    fixesWeaknesses: string[];
    score: number;
}

export interface TeamAnalysis {
    defensiveWeaknesses: DefensiveWeaknessEntry[];
    offensiveCoverage: OffensiveCoverageEntry[];
    uncoveredTypes: string[];
    criticalWeaknesses: string[];
    overallScore: number;
    scoreLabel: string;
    scoreColor: string;
    offensiveScore: number;
    defensiveScore: number;
    diversityScore: number;
    immunityScore: number;
    rolesMap: Partial<Record<PokemonRole, TeamMember>>;
    synergies: TeamSynergy[];
}

// ── Search / Filters ──────────────────────────────────────────────────────────

export interface TeamSearchFilters {
    query: string;
    typeFilter: string | null;
    genFilter: number | null;
    regionFilter: string | null;
    roleFilter: PokemonRole | null;
    statSort: keyof TeamMemberBaseStats | "total" | null;
    sortDirection: "asc" | "desc";
    legendaryFilter: "all" | "no-legendary" | "only-legendary";
    bstMin: number;
    bstMax: number;
}

// ── Pool Pokémon (datos ligeros para el explorador) ───────────────────────────

export interface PoolPokemon {
    id: number;
    name: string;
    nameEs: string;
    types: string[];
    sprite: string;
    artwork: string;
    bst: number;
    baseStats: TeamMemberBaseStats;
    generation: number;
    isLegendary: boolean;
}