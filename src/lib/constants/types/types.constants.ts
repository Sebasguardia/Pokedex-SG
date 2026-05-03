export interface TypeConstant {
    name: string;
    color: string;
    gradient: string;
}

export const TYPE_CONSTANTS: Record<string, TypeConstant> = {
    normal: { name: "Normal", color: "#A8A878", gradient: "from-[#A8A878] to-[#6D6D4E]" },
    fire: { name: "Fuego", color: "#F08030", gradient: "from-[#F08030] to-[#9C531F]" },
    water: { name: "Agua", color: "#6890F0", gradient: "from-[#6890F0] to-[#445E9C]" },
    electric: { name: "Eléctrico", color: "#F8D030", gradient: "from-[#F8D030] to-[#A1871F]" },
    grass: { name: "Planta", color: "#78C850", gradient: "from-[#78C850] to-[#4E8234]" },
    ice: { name: "Hielo", color: "#98D8D8", gradient: "from-[#98D8D8] to-[#638D8D]" },
    fighting: { name: "Lucha", color: "#C03028", gradient: "from-[#C03028] to-[#7D1F1A]" },
    poison: { name: "Veneno", color: "#A040A0", gradient: "from-[#A040A0] to-[#682A68]" },
    ground: { name: "Tierra", color: "#E0C068", gradient: "from-[#E0C068] to-[#927D44]" },
    flying: { name: "Volador", color: "#A890F0", gradient: "from-[#A890F0] to-[#6D5E9C]" },
    psychic: { name: "Psíquico", color: "#F85888", gradient: "from-[#F85888] to-[#A13959]" },
    bug: { name: "Bicho", color: "#A8B820", gradient: "from-[#A8B820] to-[#6D7815]" },
    rock: { name: "Roca", color: "#B8A038", gradient: "from-[#B8A038] to-[#786824]" },
    ghost: { name: "Fantasma", color: "#705898", gradient: "from-[#705898] to-[#493963]" },
    dragon: { name: "Dragón", color: "#7038F8", gradient: "from-[#7038F8] to-[#4924A1]" },
    dark: { name: "Siniestro", color: "#705848", gradient: "from-[#705848] to-[#49392F]" },
    steel: { name: "Acero", color: "#B8B8D0", gradient: "from-[#B8B8D0] to-[#787887]" },
    fairy: { name: "Hada", color: "#EE99AC", gradient: "from-[#EE99AC] to-[#9B6470]" },
};

export const TYPE_ORDER = [
    "normal", "fire", "water", "electric", "grass", "ice",
    "fighting", "poison", "ground", "flying", "psychic", "bug",
    "rock", "ghost", "dragon", "dark", "steel", "fairy"
];

export const TYPE_COLORS = Object.fromEntries(
    Object.entries(TYPE_CONSTANTS).map(([key, val]) => [key, val.color])
) as Record<string, string>;

import {
    GiCircle, GiFlame, GiWaterDrop, GiPowerLightning, GiSolidLeaf,
    GiSnowflake1, GiPunchBlast, GiBubbles, GiEarthCrack, GiFeather,
    GiPsychicWaves, GiSpottedBug, GiStonePile, GiGhost, GiDragonHead,
    GiNightSky, GiMetalPlate, GiSparklingSabre
} from "react-icons/gi";

export const TYPE_ICON = {
    normal: GiCircle,
    fire: GiFlame,
    water: GiWaterDrop,
    electric: GiPowerLightning,
    grass: GiSolidLeaf,
    ice: GiSnowflake1,
    fighting: GiPunchBlast,
    poison: GiBubbles,
    ground: GiEarthCrack,
    flying: GiFeather,
    psychic: GiPsychicWaves,
    bug: GiSpottedBug,
    rock: GiStonePile,
    ghost: GiGhost,
    dragon: GiDragonHead,
    dark: GiNightSky,
    steel: GiMetalPlate,
    fairy: GiSparklingSabre
};
