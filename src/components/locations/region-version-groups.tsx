"use client";

import { motion } from "framer-motion";
import { Gamepad2, RefreshCw, Calendar, Disc3, Info, Star, Flame, Skull } from "lucide-react";
import { NamedAPIResource } from "@/types/api/common.types";
import { REMAKE_VERSION_GROUPS, GENERATION_ROMAN } from "@/lib/constants/generations.constants";
import { REGION_YEARS, REGION_GENERATION } from "@/lib/constants/locations.constants";

interface RegionVersionGroupsProps {
    versionGroups: NamedAPIResource[];
    regionColor: string;
    games: string[];
    regionName: string;
}

// ── Super Extended Game Lore Dictionary ─────────────────────────────────────
const VERSION_EXTENDED_INFO: Record<string, { 
    platform: string, year: string, features: string[], 
    legendary: string, enemy: string, lore: string 
}> = {
    "red-blue": { 
        platform: "Game Boy", year: "1996", features: ["151 Pokémon Originales", "Cables Link de Intercambio"],
        legendary: "Mewtwo / Pájaros Leg.", enemy: "Team Rocket", 
        lore: "El inicio de la leyenda. Te enfrentas a Giovanni y persigues el título del Alto Mando." 
    },
    "yellow": { 
        platform: "Game Boy", year: "1998", features: ["Pikachu Compañero", "Líderes estilo Anime"],
        legendary: "Pikachu & Las Aves", enemy: "Team Rocket (Jessie & James)", 
        lore: "Edición especial que emula la aventura televisiva de Ash Ketchum con su inseparable Pikachu." 
    },
    "gold-silver": { 
        platform: "Game Boy Color", year: "1999", features: ["Ciclo de Día/Noche en tiempo real", "Región de Kanto Post-Game"],
        legendary: "Lugia / Ho-Oh", enemy: "Nuevo Team Rocket", 
        lore: "Tres años después de Kanto, una nueva aventura en la tradicional región de Johto con 100 nuevas especies." 
    },
    "crystal": { 
        platform: "Game Boy Color", year: "2000", features: ["Sprites Animados", "Torre Batalla Integrada"],
        legendary: "Suicune", enemy: "Nuevo Team Rocket", 
        lore: "Enfocada en el misterio de los Perros Legendarios y la inclusión de eventos narrativos de Suicune." 
    },
    "ruby-sapphire": { 
        platform: "Game Boy Advance", year: "2002", features: ["Combates Dobles Estándar", "Habilidades y Naturalezas"],
        legendary: "Groudon / Kyogre", enemy: "Team Magma / Aqua", 
        lore: "La ecología de Hoenn está bajo amenaza por organizaciones que desean alterar el nivel del mar y la corteza terrestre." 
    },
    "emerald": { 
        platform: "Game Boy Advance", year: "2004", features: ["Frente Batalla Titánico", "Animación al entrar a combate"],
        legendary: "Rayquaza", enemy: "Magma & Aqua simultáneamente", 
        lore: "El dragón del cielo desciende para detener el choque cataclísmico entre la tierra y los océanos." 
    },
    "firered-leafgreen": { 
        platform: "Game Boy Advance", year: "2004", features: ["Buscapelea Introducido", "Islas Sete Exclusivas"],
        legendary: "Mewtwo (Post-Game)", enemy: "Team Rocket", 
        lore: "El renacimiento de la aventura original en Kanto con gráficos modernos de 32-bits y un nuevo archipiélago a explorar." 
    },
    "diamond-pearl": { 
        platform: "Nintendo DS", year: "2006", features: ["Pantalla Táctil (Pokétch)", "Soporte Wi-Fi Global"],
        legendary: "Dialga / Palkia", enemy: "Equipo Galaxia", 
        lore: "La mitología del tiempo y el espacio se desarrolla en las montañas de Sinnoh frente a la megalomanía de Helio." 
    },
    "platinum": { 
        platform: "Nintendo DS", year: "2008", features: ["Mundo Distorsión", "Frente Batalla Sinnoh"],
        legendary: "Giratina", enemy: "Equipo Galaxia", 
        lore: "La realidad se fractura abriendo un portal hacia una dimensión antimateria donde manda un ser aterrador." 
    },
    "heartgold-soulsilver": { 
        platform: "Nintendo DS", year: "2009", features: ["Pokéwalker Integrado", "El Pokémon te sigue siempre"],
        legendary: "Lugia / Ho-Oh (Modernizado)", enemy: "Team Rocket Remanente", 
        lore: "Considerados de los mejores juegos de la franquicia, traen Johto y Kanto unidos en una experiencia inmensa y pulida." 
    },
    "black-white": { 
        platform: "Nintendo DS", year: "2010", features: ["Sprites siempre animados", "Historia madura lineal"],
        legendary: "Reshiram / Zekrom", enemy: "Team Plasma (N)", 
        lore: "¿Es correcto atrapar Pokémon? La región de Unova cuestiona los cimientos morales del mundo Pokémon a través del misterioso N." 
    },
    "black-2-white-2": { 
        platform: "Nintendo DS", year: "2012", features: ["Pokémon World Tournament", "Fusión Kyurem"],
        legendary: "Kyurem Negro / Blanco", enemy: "Neo Team Plasma", 
        lore: "Secuelas directas situadas años después. El Team Plasma de Ghechis retorna congelando parte de Unova en hielo perpetuo." 
    },
    "x-y": { 
        platform: "Nintendo 3DS", year: "2013", features: ["Megaevoluciones", "Modelos 3D Totales (Cel Shading)"],
        legendary: "Xerneas / Yveltal", enemy: "Team Flare", 
        lore: "Descubre el secreto de las Megapiedras en Kalos, un paraíso estético amenazado por el renacimiento de un arma milenaria." 
    },
    "omega-ruby-alpha-sapphire": { 
        platform: "Nintendo 3DS", year: "2014", features: ["Regresión Primigenia", "Vuelo de Latios/Latias libre"],
        legendary: "Groudon / Kyogre (Primigenios)", enemy: "Team Magma / Aqua", 
        lore: "El regreso al trópico de Hoenn pero empujando el poder de la mitología al extremo de los tiempos primigenios." 
    },
    "sun-moon": { 
        platform: "Nintendo 3DS", year: "2016", features: ["Movimientos Z Definitivos", "Recorrido Insular (Sin Gimnasios)"],
        legendary: "Solgaleo / Lunala", enemy: "Team Skull / Fund. Aether", 
        lore: "Un archipiélago donde humanos y Pokémon coexisten cercanamente, asediado por seres caídos de dimensiones desconocidas (Ultraentes)." 
    },
    "ultra-sun-ultra-moon": { 
        platform: "Nintendo 3DS", year: "2017", features: ["Viaje por Ultraumbral", "Surfeo Mantine"],
        legendary: "Necrozma (Melena / Alas)", enemy: "Team Rainbow Rocket", 
        lore: "Una reimaginación drástica donde el dios que roba la luz domina la narrativa y reúne a los peores villanos del multiverso." 
    },
    "sword-shield": { 
        platform: "Nintendo Switch", year: "2019", features: ["El Área Silvestre libre", "Dinamax / Gigamax Masivo"],
        legendary: "Zacian / Zamazenta", enemy: "Macro Cosmos / Team Yell", 
        lore: "El deporte rey es el combate Pokémon; lucha en estadios gigantes frente a multitudes y descubre los héroes espada y escudo." 
    },
    "brilliant-diamond-shining-pearl": { 
        platform: "Nintendo Switch", year: "2021", features: ["Grutas del Subsuelo", "Gráficos Chibi/Diorama"],
        legendary: "Dialga / Palkia", enemy: "Equipo Galaxia", 
        lore: "Fieles recreaciones de la región de Sinnoh que devuelven la magia de la exploración minera y mitológica." 
    },
    "legends-arceus": { 
        platform: "Nintendo Switch", year: "2022", features: ["Mundo Semi-Abierto", "Captura Libre dinámica sin combates"],
        legendary: "Arceus / Formas Origen", enemy: "Distorsiones Espaciotemporales", 
        lore: "Viaja al pasado lejano, a la ancestral Hisui, donde humanos y Pokémon apenas empezaban a convivir bajo el terror de lo desconocido." 
    },
    "scarlet-violet": { 
        platform: "Nintendo Switch", year: "2022", features: ["Mundo Abierto Absoluto 360", "Teracristalización (cambio de tipo)"],
        legendary: "Koraidon / Miraidon", enemy: "Team Star / Profesores", 
        lore: "Explora la península de Paldea en la dirección que quieras y descubre qué se oculta en lo profundo del foso de la enigmática Área Cero." 
    },
};

// Se omite DLCs de la constante grande y se extraen datos genéricos por si no existen.
const FALLBACK_LORE = "Entrega clásica u original que revolucionó el viaje dentro de esta región.";
const PLATFORM_COLORS: Record<string, string> = {
    "Game Boy":           "#8B8B8B",
    "Game Boy Color":     "#D9534F",
    "Game Boy Advance":   "#9B59B6",
    "Nintendo DS":        "#3498DB",
    "Nintendo 3DS":       "#E74C3C",
    "Nintendo Switch":    "#CC0000",
};

export function RegionVersionGroups({ versionGroups, regionColor, games, regionName }: RegionVersionGroupsProps) {
    const hasRemakes = versionGroups.some((vg) => REMAKE_VERSION_GROUPS.has(vg.name));
    const year = REGION_YEARS[regionName];
    const generation = REGION_GENERATION[regionName];
    const roman = generation ? GENERATION_ROMAN[generation] : "?";

    return (
        <section>
            {/* Section Header */}
            <div className="flex items-center gap-3 mb-8">
                <div className="w-3 h-3 bg-[#CC0000]" />
                <h2 className="font-['Press_Start_2P'] text-[13px] sm:text-[14px] uppercase text-[#111111] whitespace-nowrap">
                    LIBRERÍA DE ENTREGAS
                </h2>
                <div className="h-[3px] bg-[#111111] flex-1" />
                <div className="flex items-center gap-2 shrink-0">
                    {hasRemakes && (
                        <div className="flex items-center gap-1.5 border-[3px] border-[#111111] px-3 py-1.5" style={{ backgroundColor: "#111111" }}>
                            <RefreshCw size={11} className="text-white" />
                            <span className="font-['Press_Start_2P'] text-[8px] text-white">INCLUYE REMAKES</span>
                        </div>
                    )}
                    {year && (
                        <div className="border-[3px] border-[#111111] px-3 py-1.5 flex items-center gap-1.5 bg-white" style={{ boxShadow: `4px 4px 0 ${regionColor}` }}>
                            <Calendar size={11} style={{ color: regionColor }} />
                            <span className="font-['JetBrains_Mono'] font-black text-[11px]">{year} — GEN {roman}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Listado en Layout de Cartas Expandidas Neo-Brutalistas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
                {games.map((game, i) => {
                    const vg = versionGroups[i];
                    const isRemake = vg && REMAKE_VERSION_GROUPS.has(vg.name);
                    const extendedInfo = vg ? VERSION_EXTENDED_INFO[vg.name] : null;
                    
                    const platform = extendedInfo?.platform ?? "Consola de Nintendo";
                    const gameYear = extendedInfo?.year ?? "Desc.";
                    const features = extendedInfo?.features ?? ["Aventura Clásica", "Conexión Pokémon"];
                    const lore = extendedInfo?.lore ?? FALLBACK_LORE;
                    const legendary = extendedInfo?.legendary ?? "Desconocido";
                    const enemy = extendedInfo?.enemy ?? "Equipo Villano";
                    
                    const platformColor = PLATFORM_COLORS[platform] ?? "#888888";

                    return (
                        <motion.div
                            key={game}
                            className="relative border-[4px] border-[#111111] bg-white overflow-hidden flex flex-col group transition-all"
                            style={{ boxShadow: "8px 8px 0 #111111" }}
                            initial={{ opacity: 0, scale: 0.96, y: 20 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08, duration: 0.4 }}
                            whileHover={{ y: -5, x: -5, boxShadow: `13px 13px 0 ${regionColor}` }}
                        >
                            {/* Cabecera Brutalista de Color */}
                            <div className="px-5 py-4 flex justify-between items-center bg-[#111] border-b-[4px] border-[#111]">
                                <div className="flex items-center gap-3">
                                    <Disc3 size={20} style={{ color: regionColor }} className="animate-[spin_6s_linear_infinite]" />
                                    <h3 className="font-['Press_Start_2P'] text-[10px] sm:text-[11px] text-white uppercase mt-1 tracking-tight">
                                        {game}
                                    </h3>
                                </div>
                                {isRemake ? (
                                    <span className="font-['Press_Start_2P'] text-[6px] text-[#111] bg-white px-2 py-1 uppercase leading-none">
                                        REMAKE
                                    </span>
                                ) : (
                                    <span className="font-['JetBrains_Mono'] font-bold text-[10px] text-[#888]">
                                        ORIGINAL
                                    </span>
                                )}
                            </div>

                            <div className="p-5 sm:p-6 flex flex-col flex-1 relative z-10 bg-white">
                                
                                {/* Info Narrativa (Lore) */}
                                <p className="font-['Nunito'] font-bold text-[14px] text-[#222] mb-5 leading-relaxed text-balance">
                                    "{lore}"
                                </p>
                                
                                {/* 2 Cajas de Datos Curiosos (Villano / Mascota) */}
                                <div className="grid grid-cols-2 gap-3 mb-6">
                                    <div className="bg-[#FAFAFA] border-[2px] border-[#111] p-3 shadow-[2px_2px_0_#111]">
                                        <div className="flex items-center gap-1 mb-1">
                                            <Star size={10} style={{ color: regionColor }} />
                                            <span className="font-['Press_Start_2P'] text-[6px] text-[#666]">MASCOTA / LEYENDA</span>
                                        </div>
                                        <p className="font-['Nunito'] font-black text-[12px] truncate">{legendary}</p>
                                    </div>
                                    <div className="bg-[#FAFAFA] border-[2px] border-[#111] p-3 shadow-[2px_2px_0_#111]">
                                        <div className="flex items-center gap-1 mb-1">
                                            <Skull size={10} className="text-[#CC0000]" />
                                            <span className="font-['Press_Start_2P'] text-[6px] text-[#666]">ANTAGONISTAS</span>
                                        </div>
                                        <p className="font-['Nunito'] font-black text-[12px] truncate">{enemy}</p>
                                    </div>
                                </div>

                                {/* Main Data List (Novedades) */}
                                <div className="mb-6 flex-1">
                                    <span className="font-['Press_Start_2P'] text-[7px] text-[#111] mb-3 block">NOVEDADES INTRODUCIDAS:</span>
                                    <ul className="space-y-2">
                                        {features.map((feature, idx) => (
                                            <li key={idx} className="flex items-center gap-2">
                                                <div className="shrink-0 w-4 h-4 border-[2px] border-[#111] bg-[#111] text-white flex items-center justify-center">
                                                    <Flame size={10} />
                                                </div>
                                                <span className="font-['Nunito'] font-bold text-[13px] text-[#333] leading-tight">
                                                    {feature}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Footer Data: Platform & Generación */}
                                <div className="pt-4 border-t-[3px] border-[#111] border-dashed flex justify-between items-center mt-auto">
                                    <div className="flex items-center gap-2">
                                        <div className="px-2 py-1.5 border-[2px] border-[#111] text-white font-['Press_Start_2P'] text-[6px] sm:text-[7px] shrink-0" style={{ backgroundColor: platformColor }}>
                                            {platform.toUpperCase()}
                                        </div>
                                    </div>
                                    <span className="font-['Press_Start_2P'] text-[7px] sm:text-[8px] text-[#111] px-2 py-1.5 bg-white border-[2px] border-[#111] shadow-[2px_2px_0_#111]">
                                        AÑO {gameYear}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}