export const STAT_CONSTANTS: Record<string, { label: string; shortLabel: string; color: string }> = {
    hp: { label: "HP", shortLabel: "HP", color: "#FF5959" },
    attack: { label: "Ataque", shortLabel: "ATK", color: "#F5AC78" },
    defense: { label: "Defensa", shortLabel: "DEF", color: "#FAE078" },
    "special-attack": { label: "Ataque Especial", shortLabel: "SpAtk", color: "#9DB7F5" },
    "special-defense": { label: "Defensa Especial", shortLabel: "SpDef", color: "#A7DB8D" },
    speed: { label: "Velocidad", shortLabel: "SPD", color: "#FA92B2" },
};

export function getStatColor(value: number): string {
    if (value < 50) return "#ff5959";
    if (value < 80) return "#FFD700";
    return "#78C850";
}
