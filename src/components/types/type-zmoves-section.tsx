"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { Zap, Info } from "lucide-react"
import { TypeSvgIcon } from "@/components/shared/icons/type-svg-icon"

const TYPE_NAMES_ES: Record<string, string> = {
    normal: "Normal", fighting: "Lucha", flying: "Volador", poison: "Veneno",
    ground: "Tierra", rock: "Roca", bug: "Bicho", ghost: "Fantasma",
    steel: "Acero", fire: "Fuego", water: "Agua", grass: "Planta",
    electric: "Eléctrico", psychic: "Psíquico", ice: "Hielo", dragon: "Dragón",
    dark: "Siniestro", fairy: "Hada"
}

const Z_MOVE_DATA: Record<string, { nameES: string, crystalES: string }> = {
    normal: { nameES: "Carrera Arrolladora", crystalES: "Normastal Z" },
    fighting: { nameES: "Ráfaga Demoledora", crystalES: "Lizastal Z" },
    flying: { nameES: "Picado Supersónico", crystalES: "Aerostal Z" },
    poison: { nameES: "Diluvio Corrosivo", crystalES: "Toxistal Z" },
    ground: { nameES: "Barrena Telúrica", crystalES: "Geostal Z" },
    rock: { nameES: "Aplastamiento Gigalítico", crystalES: "Litostal Z" },
    bug: { nameES: "Guadaña Sedosa", crystalES: "Insectostal Z" },
    ghost: { nameES: "Presa Espectral", crystalES: "Espectrostal Z" },
    steel: { nameES: "Hélice Trepanadora", crystalES: "Metalostal Z" },
    fire: { nameES: "Hecatombe Pírica", crystalES: "Pirostal Z" },
    water: { nameES: "Hidrovórtice Abisal", crystalES: "Hidrostal Z" },
    grass: { nameES: "Megaguadaña Floral", crystalES: "Fitostal Z" },
    electric: { nameES: "Gigavoltio Destructor", crystalES: "Electrostal Z" },
    psychic: { nameES: "Destrucción Psicológica", crystalES: "Psicostal Z" },
    ice: { nameES: "Crioaliento Despiadado", crystalES: "Criostal Z" },
    dragon: { nameES: "Dracoaliento Devastador", crystalES: "Dracostal Z" },
    dark: { nameES: "Agujero Negro Pulverizador", crystalES: "Nictostal Z" },
    fairy: { nameES: "Arrumaco Letal", crystalES: "Feeristal Z" },
}

interface Props {
    typeName: string
    typeColor: string
}

export function TypeZMovesSection({ typeName, typeColor }: Props) {
    const data = Z_MOVE_DATA[typeName]
    const typeNameES = TYPE_NAMES_ES[typeName] || typeName.toUpperCase()

    if (!data) return null; // Fallback for unknown or stellar types

    return (
        <section className="py-10">
            {/* Encabezado */}
            <div className="flex items-center gap-3 mb-4">
                <span className="w-3 h-3 bg-[#111111] block shrink-0" style={{ backgroundColor: typeColor }} />
                <h2 className="font-['Press_Start_2P'] text-[12px] text-[#111111] uppercase">MOVIMIENTO Z DE TIPO {typeNameES}</h2>
            </div>
            <div className="h-[3px] bg-[#111111] w-full mb-8" />

            {/* Ficha Principal del Z-Move */}
            <div className="space-y-6">
                <motion.div
                    className="flex flex-col md:flex-row border-2 border-[#111111] bg-white relative overflow-hidden group"
                    style={{ boxShadow: "4px 4px 0 #111111" }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    {/* Barra de color izquierda lateral */}
                    <div className="w-full md:w-3" style={{ backgroundColor: typeColor }} />
                    
                    <div className="p-6 md:p-8 flex-1 flex flex-col md:flex-row gap-6 items-center md:items-start justify-between">
                        {/* Area de Nombre e Ícono */}
                        <div className="flex items-center gap-5">
                            <motion.div 
                                className="w-16 h-16 rounded-full border-4 border-[#111111] flex flex-col items-center justify-center shrink-0"
                                style={{ backgroundColor: typeColor, boxShadow: "2px 2px 0 #111111" }}
                                whileHover={{ rotate: 180, scale: 1.1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                            >
                                <TypeSvgIcon type={typeName} size={28} style={{ filter: "brightness(0) invert(1)" }} />
                            </motion.div>
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <div
                                        className="flex items-center gap-1 px-1.5 py-0.5 border-2 border-[#111111]"
                                        style={{ backgroundColor: `${typeColor}20` }}
                                    >
                                        <Zap size={12} style={{ color: typeColor, fill: typeColor }} />
                                        <span className="font-['Press_Start_2P'] text-[8px] text-[#111111]">Z-MOVE</span>
                                    </div>
                                    <span className="font-['JetBrains_Mono'] text-[10px] text-[#888888] font-bold">EXCLUSIVO</span>
                                </div>
                                <h3 className="font-['Nunito'] text-[24px] font-black text-[#111111] uppercase tracking-tight leading-none mb-1 group-hover:text-[#CC0000] transition-colors">
                                    {data.nameES}
                                </h3>
                            </div>
                        </div>

                        {/* Requisitos y Potencia */}
                        <div className="flex flex-col sm:flex-row gap-3 md:gap-6 mt-4 md:mt-0 items-stretch">
                            <div className="flex-1 flex flex-col justify-center px-4 py-3 border-2 border-[#111111] bg-[#F9F9F9]">
                                <span className="font-['Press_Start_2P'] text-[7px] text-[#888888] mb-2 uppercase">REQUISITO: CRISTAL Z</span>
                                <span className="font-['JetBrains_Mono'] text-[13px] font-extrabold text-[#111111]">
                                    {data.crystalES}
                                </span>
                            </div>
                            <div className="flex-1 flex flex-col justify-center px-4 py-3 border-2 border-[#111111] bg-[#F9F9F9]">
                                <span className="font-['Press_Start_2P'] text-[7px] text-[#888888] mb-2 uppercase">ATAQUE BASE IDEAL</span>
                                <span className="font-['JetBrains_Mono'] text-[13px] font-extrabold flex items-center gap-2 text-[#111111]">
                                    Cualquiera Tipo <span className="uppercase p-1 text-[10px] text-white" style={{ backgroundColor: typeColor }}>{typeNameES}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Explicación Detallada (Guía de cómo funciona para todos) */}
                <motion.div 
                    className="border-2 border-[#111111] bg-white p-6 relative"
                    style={{ boxShadow: "4px 4px 0 #111111" }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                >
                    <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                        <Info size={100} />
                    </div>
                    
                    <h4 className="font-['Press_Start_2P'] text-[10px] text-[#CC0000] mb-4 flex items-center gap-2">
                        <Info size={14} />
                        ¿CÓMO FUNCIONAN ESTOS MOVIMIENTOS Z?
                    </h4>
                    
                    <div className="space-y-4 font-['Nunito'] text-[14px] text-[#333333] font-bold leading-relaxed relative z-10">
                        <p>
                            Los Movimientos Z son un ataque definitivo de una sola vez por combate introducidos en la región de <strong>Alola</strong>. A diferencia de un ataque normal, este no tiene una potencia fija preestablecida, sino que <span className="text-[#CC0000]">depende e intensifica la potencia del ataque base que lo origina</span>.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div className="border border-dashed border-[#888888] p-4 bg-[#F2F2F2]">
                                <h5 className="font-['JetBrains_Mono'] text-[12px] font-extrabold text-[#111111] mb-2">1. Si usas ataques de Daño:</h5>
                                <p className="text-[12px] font-normal">
                                    El ataque normal se transformará en <strong>{data.nameES}</strong>. Su potencia oscilará entre <strong className="font-black text-[#111111]">100 y 200 puntos</strong> de daño basándose en la fuerza del ataque original. (Ej. Un arañazo de poder 40 generará un Movimiento Z de poder 100, pero un hiperrayo de poder 150 generará el poder máximo de 200).
                                </p>
                            </div>
                            <div className="border border-dashed border-[#888888] p-4 bg-[#F2F2F2]">
                                <h5 className="font-['JetBrains_Mono'] text-[12px] font-extrabold text-[#111111] mb-2">2. Si usas ataques de Estado:</h5>
                                <p className="text-[12px] font-normal">
                                    Los movimientos como "Danza Espada" o "Tóxico" se convierten en <strong>Movimientos Z de Estado</strong>. Estos ejecutarán su efecto original de forma normal, pero además le darán a tu Pokémon una bonificación permanente extra formidable (como subir su Defensa al máximo o curar toda su salud).
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
