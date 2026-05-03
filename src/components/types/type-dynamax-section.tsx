"use client"

import { motion } from "framer-motion"
import { Maximize2, Sparkles, Info } from "lucide-react"
import { TypeSvgIcon } from "@/components/shared/icons/type-svg-icon"

const TYPE_NAMES_ES: Record<string, string> = {
    normal: "Normal", fighting: "Lucha", flying: "Volador", poison: "Veneno",
    ground: "Tierra", rock: "Roca", bug: "Bicho", ghost: "Fantasma",
    steel: "Acero", fire: "Fuego", water: "Agua", grass: "Planta",
    electric: "Eléctrico", psychic: "Psíquico", ice: "Hielo", dragon: "Dragón",
    dark: "Siniestro", fairy: "Hada"
}

// Max Moves by type (introduced in Sword/Shield)
const MAX_MOVES: Record<string, { name: string; effect: string }> = {
    normal: { name: "Maxiataque", effect: "Reduce la Velocidad del equipo rival" },
    fire: { name: "Maxiflora", effect: "Activa el clima Día Soleado (Sunny Day)" },
    water: { name: "Maxichorro", effect: "Activa el clima Lluvia (Rain Dance)" },
    grass: { name: "Maxiflora", effect: "Activa el Campo de Hierba (Grassy Terrain)" },
    electric: { name: "Maxitormenta", effect: "Activa el Campo Eléctrico (Electric Terrain)" },
    ice: { name: "Maxihelada", effect: "Activa el clima Granizo (Hail)" },
    fighting: { name: "Maxipuño", effect: "Sube el Ataque de tu equipo" },
    poison: { name: "Maxibarrizal", effect: "Sube el Ataque Especial de tu equipo" },
    ground: { name: "Maxitemblor", effect: "Sube la Defensa Especial de tu equipo" },
    flying: { name: "Maxiciclón", effect: "Sube la Velocidad de tu equipo" },
    psychic: { name: "Maxionda", effect: "Activa el Campo Psíquico (Psychic Terrain)" },
    bug: { name: "Maxinsecto", effect: "Baja el Ataque Especial de los oponentes" },
    rock: { name: "Maxilito", effect: "Activa el clima Tormenta Arena (Sandstorm)" },
    ghost: { name: "Maxiespectro", effect: "Baja la Defensa de los oponentes" },
    dragon: { name: "Maxidraco", effect: "Baja el Ataque de los oponentes" },
    dark: { name: "Maxisombra", effect: "Baja la Defensa Especial de los oponentes" },
    steel: { name: "Maximetal", effect: "Sube la Defensa de tu equipo" },
    fairy: { name: "Maxihalo", effect: "Activa el Campo de Niebla (Misty Terrain)" },
}

const G_MAX_EXAMPLES: Record<string, { name: string; pokemon: string; displayLabel: string; effect: string }[]> = {
    normal: [
        { name: "Gigaternura", pokemon: "eevee-gmax", displayLabel: "Eevee Gigamax", effect: "Enamora a todos los rivales del género opuesto." },
        { name: "Gigarreciclaje", pokemon: "snorlax-gmax", displayLabel: "Snorlax Gigamax", effect: "Restaura las bayas consumidas por los aliados." }
    ],
    fire: [
        { name: "Gigallamarada", pokemon: "charizard-gmax", displayLabel: "Charizard Gigamax", effect: "Inflige daño durante 4 turnos a todos los Pokémon que no sean de tipo Fuego." },
        { name: "Gigaesfera Ígnea", pokemon: "cinderace-gmax", displayLabel: "Cinderace Gigamax", effect: "Ignora el habilidad del objetivo al hacer daño." },
    ],
    water: [
        { name: "Gigatrampa Rocas", pokemon: "drednaw-gmax", displayLabel: "Drednaw Gigamax", effect: "Esparce Trampa Rocas ocultas en el campo rival." },
        { name: "Gigacañonazo", pokemon: "blastoise-gmax", displayLabel: "Blastoise Gigamax", effect: "Daña a los rivales que no sean de tipo Agua por 4 turnos." },
        { name: "Gigafrancotirador", pokemon: "inteleon-gmax", displayLabel: "Inteleon Gigamax", effect: "Ignora la habilidad defensiva del objetivo." },
    ],
    grass: [
        { name: "Gigalátigo", pokemon: "venusaur-gmax", displayLabel: "Venusaur Gigamax", effect: "Daña a rivales que no sean tipo Planta por 4 turnos." },
        { name: "Gigazumo", pokemon: "flapple-gmax", displayLabel: "Flapple Gigamax", effect: "Reduce drásticamente la Evasión del objetivo." },
    ],
    electric: [
        { name: "Gigatronada", pokemon: "pikachu-gmax", displayLabel: "Pikachu Gigamax", effect: "Paraliza automáticamente a todos los Pokémon del oponente." },
        { name: "Gigadescarga", pokemon: "toxtricity-gmax", displayLabel: "Toxtricity Gigamax", effect: "Envenena o Paraliza aleatoriamente a todos los rivales." }
    ],
    psychic: [
        { name: "Gigagravidez", pokemon: "orbeetle-gmax", displayLabel: "Orbeetle Gigamax", effect: "Intensifica la gravedad del campo de batalla durante 5 turnos." },
    ],
    dragon: [
        { name: "Gigadesgaste", pokemon: "duraludon-gmax", displayLabel: "Duraludon Gigamax", effect: "Reduce en 2 los PP del último movimiento usado por el objetivo." },
    ],
    fighting: [
        { name: "Gigapuición", pokemon: "machamp-gmax", displayLabel: "Machamp Gigamax", effect: "Aumenta la probabilidad de asestar golpes críticos del equipo." }
    ],
    flying: [
        { name: "Gigahuracán", pokemon: "corviknight-gmax", displayLabel: "Corviknight Gigamax", effect: "Elimina los efectos de los Terrenos y barreras protectoras (Reflejo/Pantalla Luz)." }
    ],
    poison: [
        { name: "Gigapestilencia", pokemon: "garbodor-gmax", displayLabel: "Garbodor Gigamax", effect: "Envenena severamente a todos los rivales." }
    ],
    ground: [
        { name: "Gigatrampa Arena", pokemon: "sandaconda-gmax", displayLabel: "Sandaconda Gigamax", effect: "Atrapa a los rivales en un Bucle Arena, impidiendo su huida." }
    ],
    rock: [
        { name: "Gigarroca Ígnea", pokemon: "coalossal-gmax", displayLabel: "Coalossal Gigamax", effect: "Daña continuamente a los Pokémon que no sean de tipo Roca por 4 turnos." }
    ],
    bug: [
        { name: "Gigamotin", pokemon: "butterfree-gmax", displayLabel: "Butterfree Gigamax", effect: "Causa Veneno, Parálisis o Somnífero al rival aleatoriamente." }
    ],
    ghost: [
        { name: "Gigaaparición", pokemon: "gengar-gmax", displayLabel: "Gengar Gigamax", effect: "Evita permanentemente que los rivales puedan ser cambiados o huyan." }
    ],
    steel: [
        { name: "Gigafundido", pokemon: "melmetal-gmax", displayLabel: "Melmetal Gigamax", effect: "Atormenta a los rivales, impidiéndoles usar el mismo movimiento 2 veces." },
        { name: "Gigacero", pokemon: "copperajah-gmax", displayLabel: "Copperajah Gigamax", effect: "Esparce afiladas púas de acero por el campo rival." }
    ],
    dark: [
        { name: "Gigasopor", pokemon: "grimmsnarl-gmax", displayLabel: "Grimmsnarl Gigamax", effect: "Tiene un 50% de probabilidad de dormir profunda y permanentemente a los rivales." },
        { name: "Gigagolpe Brusco", pokemon: "urshifu-gmax", displayLabel: "Urshifu Gigamax", effect: "Su daño atraviesa cualquier estado de protección (como Protección o Max Barrera)." }
    ],
    ice: [
        { name: "Gigamelodía", pokemon: "lapras-gmax", displayLabel: "Lapras Gigamax", effect: "Despliega un Velo Aurora brillante que reduce el daño que recibe tu equipo a la mitad." }
    ],
    fairy: [
        { name: "Gigacastigo", pokemon: "hatterene-gmax", displayLabel: "Hatterene Gigamax", effect: "Envuelve de energía feérica el campo, confundiendo irremediablemente a los oponentes." },
        { name: "Gigaterror", pokemon: "alcremie-gmax", displayLabel: "Alcremie Gigamax", effect: "Restaura la sexta parte de la salud máxima total de todos tus aliados en batalla." }
    ]
}

interface Props {
    typeName: string
    typeColor: string
}

export function TypeDynamaxSection({ typeName, typeColor }: Props) {
    const maxMove = MAX_MOVES[typeName]
    const gMaxMoves = G_MAX_EXAMPLES[typeName] || []
    const typeNameES = TYPE_NAMES_ES[typeName] || typeName.toUpperCase()

    return (
        <section className="py-10">
            <div className="flex items-center gap-3 mb-4">
                <span className="w-3 h-3 bg-[#CC0000] block shrink-0" />
                <h2 className="font-['Press_Start_2P'] text-[12px] text-[#111111]">DYNAMAX Y GIGAMAX (GEN VIII)</h2>
            </div>
            <div className="h-[3px] bg-[#111111] w-full mb-8" />

            {/* Layout en paralelo para pantallas grandes */}
            <div className="flex flex-col xl:flex-row gap-6 items-stretch">
                
                {/* 1. SECCIÓN DYNAMAX (MAX MOVES) */}
                {maxMove && (
                    <motion.div
                        className="flex-1 border-2 border-[#111111] bg-white relative flex flex-col group"
                        style={{ boxShadow: "4px 4px 0 #111111" }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                            <Maximize2 size={120} />
                        </div>
                        
                        <div className="bg-[#111111] px-5 py-3 flex items-center justify-between">
                            <div className="flex items-center gap-2 text-white">
                                <Maximize2 size={14} />
                                <span className="font-['Press_Start_2P'] text-[9px] uppercase">FENÓMENO DYNAMAX</span>
                            </div>
                        </div>

                        <div className="p-6 flex flex-col flex-1 z-10">
                            <div className="flex items-center gap-5 mb-6">
                                <div 
                                    className="w-16 h-16 bg-[#111111] rounded-full flex items-center justify-center shrink-0 border-4" 
                                    style={{ borderColor: typeColor, boxShadow: `0 0 15px ${typeColor}60` }}
                                >
                                    <TypeSvgIcon type={typeName} size={28} style={{ filter: "brightness(0) invert(1)" }} />
                                </div>
                                <div>
                                    <span className="font-['Press_Start_2P'] text-[8px] text-[#888888] mb-1 block">MOVIMIENTO MAX (TIPO {typeNameES})</span>
                                    <h3 className="font-['Nunito'] text-[24px] font-black text-[#CC0000] uppercase leading-none tracking-tight">
                                        {maxMove.name}
                                    </h3>
                                </div>
                            </div>
                            
                            <div className="border border-dashed border-[#888888] bg-[#F9F9F9] p-5 mt-auto">
                                <h4 className="font-['JetBrains_Mono'] text-[11px] font-extrabold text-[#111111] mb-2 uppercase border-b-2 border-[#111111] pb-1 inline-block">
                                    EFECTO SECUNDARIO SIEMPRE GARANTIZADO:
                                </h4>
                                <p className="font-['Nunito'] text-[14px] text-[#333333] font-bold">
                                    {maxMove.effect}.
                                </p>
                                <p className="font-['Nunito'] text-[12px] text-[#888888] mt-4">
                                    Cualquier Pokémon que entre en estado Dynamax y use un ataque ofensivo de tipo {typeNameES} ejecutará {maxMove.name}. Su poder destructivo se escala en base al ataque original (alcanzando cifras de 130+).
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* 2. SECCIÓN GIGAMAX (G-MAX MOVES ANIMADOS) */}
                <motion.div
                    className="flex-1 flex flex-col"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                >
                    <div className="border-2 border-b-0 border-[#111111] px-5 py-3 flex items-center gap-2" style={{ backgroundColor: "#6C3483" }}>
                        <Sparkles size={14} className="text-white" />
                        <span className="font-['Press_Start_2P'] text-[9px] text-white">ATAQUES EXCLUSIVOS GIGAMAX</span>
                    </div>

                    <div className="border-2 border-[#111111] bg-white p-5 flex-1 relative" style={{ boxShadow: "4px 4px 0 #6C3483" }}>
                        {gMaxMoves.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center opacity-60 px-4 py-8">
                                <Sparkles size={32} className="mb-3 text-[#6C3483]" />
                                <p className="font-['Nunito'] text-[14px] text-[#111111] font-bold uppercase">Sin especies conocidas</p>
                                <p className="font-['Nunito'] text-[12px] text-[#888888]">No se ha descubierto ninguna especie con factor Gigamax de tipo {typeNameES} nativo en la región de Pokémon Espada/Escudo que ostente un ataque único.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-4">
                                {gMaxMoves.map((gm) => (
                                    <div 
                                        key={gm.name}
                                        className="border-2 border-[#111111] flex flex-col sm:flex-row overflow-hidden group hover:border-[#6C3483] transition-colors"
                                    >
                                        {/* Avatar Animado Gigamax de Showdown */}
                                        <div className="w-full sm:w-28 bg-[#F0F0F0] border-b-2 sm:border-b-0 sm:border-r-2 border-[#111111] flex flex-col items-center py-4 shrink-0 relative overflow-hidden hidden sm:flex justify-center">
                                            {/* Efecto decorativo Nubes Gigamax */}
                                            <div className="absolute top-1 rotate-12 bg-[#CC0000] w-12 h-1 opacity-20" />
                                            <div className="absolute top-2 w-8 h-1 bg-[#CC0000] opacity-20" />
                                            
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img 
                                                src={`https://play.pokemonshowdown.com/sprites/ani/${gm.pokemon}.gif`} 
                                                alt={gm.displayLabel}
                                                className="w-16 h-16 object-contain relative z-10"
                                                style={{ filter: "drop-shadow(2px 2px 0 rgba(0,0,0,0.1))" }}
                                            />
                                        </div>

                                        {/* Texto G-Max */}
                                        <div className="p-4 flex-1 flex flex-col justify-center relative">
                                            <div className="flex flex-col lg:flex-row gap-1 lg:gap-3 lg:items-center mb-2">
                                                <h4 className="font-['Press_Start_2P'] text-[10px] text-[#6C3483]">{gm.name}</h4>
                                                <span className="font-['JetBrains_Mono'] text-[9px] font-bold px-2 py-0.5 border border-[#111111] w-fit">
                                                    USADO POR: {gm.displayLabel}
                                                </span>
                                            </div>
                                            <p className="font-['Nunito'] text-[12px] font-bold text-[#333333]">
                                                {gm.effect}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        
                        <div className="mt-5 p-3 bg-[#6C3483] text-white flex items-start gap-3">
                            <Info size={16} className="shrink-0 mt-0.5" />
                            <p className="font-['Nunito'] text-[11px] font-bold">
                                Solo algunas especies selectas capaces de adoptar su extraña forma Gigamax tienen la particularidad de cambiar este Max Move por el suyo exclusivo (G-Max Move).
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
