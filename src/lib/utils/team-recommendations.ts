// ─────────────────────────────────────────────────────────────────────────────
// MOTOR DE RECOMENDACIONES
// ─────────────────────────────────────────────────────────────────────────────

import {
    TeamMember, PoolPokemon, PokemonRecommendation, TeamAnalysis,
} from "@/types/api/team-builder.types";
import { getEffectiveness, getEffectivenessForMember } from "./type-analysis";
import { TYPE_NAMES_ES } from "@/lib/constants/team-builder.constants";

function buildReason(coversTypes: string[], fixesWeaknesses: string[], utilityInfo?: string, roleInfo?: string): string {
    const parts: string[] = [];
    
    if (roleInfo) {
        parts.push(roleInfo);
    }
    
    if (fixesWeaknesses.length > 0) {
        const names = fixesWeaknesses.slice(0, 2).map((t) => TYPE_NAMES_ES[t] ?? t).join(" y ");
        parts.push(`Resuelve tu debilidad a ${names}`);
    }
    
    if (coversTypes.length > 0) {
        const names = coversTypes.slice(0, 2).map((t) => TYPE_NAMES_ES[t] ?? t).join(" y ");
        parts.push(`añade cobertura contra ${names}`);
    }

    if (utilityInfo && parts.length < 2) {
        parts.push(utilityInfo);
    }

    if (parts.length === 0) return "Aporta equilibrio y diversidad al equipo";
    return parts.slice(0, 2).join(" y ");
}

export function generateRecommendations(
    team: TeamMember[],
    pool: PoolPokemon[],
    analysis: TeamAnalysis,
    maxResults = 12,
): PokemonRecommendation[] {
    if (team.length >= 6) return [];

    const teamIds = new Set(team.map((m) => m.pokemonId));
    const criticalWeaks = analysis.criticalWeaknesses;
    const uncoveredOff = analysis.uncoveredTypes;
    const teamRoles = analysis.rolesMap;

    // Detectar necesidades de roles
    const needsPhysicalWall = !teamRoles.physicalWall;
    const needsSpecialWall = !teamRoles.specialWall;
    const needsSweeper = !teamRoles.physicalSweeper && !teamRoles.specialSweeper;

    // Detectar necesidades de utilidades (Flying, Steel, Water)
    const hasFlying = team.some(m => m.types.includes("flying"));
    const hasSteel = team.some(m => m.types.includes("steel"));
    const hasWater = team.some(m => m.types.includes("water"));

    // Detectar núcleos (WFG)
    const hasWaterType = team.some(m => m.types.includes("water"));
    const hasFireType = team.some(m => m.types.includes("fire"));
    const hasGrassType = team.some(m => m.types.includes("grass"));

    return pool
        .filter((p) => !teamIds.has(p.id) && p.id > 0 && p.id <= 1025)
        .map((p) => {
            let score = 0;
            let utilityInfo = "";
            let roleInfo = "";
            const coversTypes: string[] = [];
            const fixesWeaknesses: string[] = [];

            const stats = p.baseStats;
            const bst = p.bst || (stats.hp + stats.attack + stats.defense + stats.specialAttack + stats.specialDefense + stats.speed);

            // 1. Cobertura Ofensiva (+15)
            p.types.forEach((atkType) => {
                uncoveredOff.forEach((defType) => {
                    if (getEffectiveness(atkType, [defType]) > 1) {
                        score += 15;
                        if (!coversTypes.includes(defType)) coversTypes.push(defType);
                    }
                });
            });

            // 2. Debilidades Críticas (+25)
            criticalWeaks.forEach((attackType) => {
                const mult = getEffectiveness(attackType, p.types);
                if (mult < 1) {
                    score += mult === 0 ? 35 : 25;
                    if (!fixesWeaknesses.includes(attackType)) fixesWeaknesses.push(attackType);
                }
            });

            // 3. Roles de Brecha (Gap Analysis)
            const isPhysWall = stats.hp >= 90 && stats.defense >= 90;
            const isSpecWall = stats.hp >= 90 && stats.specialDefense >= 90;
            const isSweeper = stats.speed >= 100 && (stats.attack >= 100 || stats.specialAttack >= 100);

            if (needsPhysicalWall && isPhysWall) {
                score += 30;
                roleInfo = "Excelente defensa física";
            }
            if (needsSpecialWall && isSpecWall) {
                score += 30;
                roleInfo = "Excelente defensa especial";
            }
            if (needsSweeper && isSweeper) {
                score += 25;
                roleInfo = "Gran potencial ofensivo";
            }

            // 4. Utilidades Clave
            if (!hasFlying && p.types.includes("flying")) {
                score += 25;
                utilityInfo = "Aporta inmunidad a Tierra y movilidad";
            }
            if (!hasSteel && p.types.includes("steel")) {
                score += 20;
                utilityInfo = "Gran resistencia defensiva (Acero)";
            }
            if (!hasWater && p.types.includes("water")) {
                score += 15;
                utilityInfo = "Base sólida de tipo Agua";
            }

            // 5. Sinergia de Núcleos (WFG)
            if (hasWaterType && hasFireType && !hasGrassType && p.types.includes("grass")) {
                score += 35;
                roleInfo = "Completa el núcleo Fuego/Agua/Planta";
            }
            if (hasWaterType && hasGrassType && !hasFireType && p.types.includes("fire")) {
                score += 35;
                roleInfo = "Completa el núcleo Fuego/Agua/Planta";
            }
            if (hasFireType && hasGrassType && !hasWaterType && p.types.includes("water")) {
                score += 35;
                roleInfo = "Completa el núcleo Fuego/Agua/Planta";
            }

            // 6. Peso por BST (Poder base)
            score += Math.floor(bst / 20); // Bonus suave por stats totales

            // 7. Factor de Variedad (Aleatoriedad controlada +/- 15%)
            const variation = 0.85 + Math.random() * 0.3;
            score = score * (variation || 1); // Fallback to 1 if variation is weird

            return {
                pokemonId: p.id,
                name: p.name,
                nameEs: p.nameEs,
                sprite: p.sprite,
                types: p.types,
                score,
                coversTypes,
                fixesWeaknesses,
                reason: buildReason(coversTypes, fixesWeaknesses, utilityInfo, roleInfo),
            };
        })
        .filter((p) => p.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, maxResults);
}