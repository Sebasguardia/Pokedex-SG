"use client"

import { motion } from "framer-motion"
import Image from "next/image"

// Curated items related to each type
const TYPE_ITEMS: Record<string, { name: string; displayName: string; desc: string; category: string }[]> = {
    fire: [
        { name: "fire-stone", displayName: "Piedra Fuego", desc: "Hace evolucionar a Vulpix, Growlithe, Eevee y otros Pokémon de tipo Fuego.", category: "Evolución" },
        { name: "charcoal", displayName: "Carboncillo", desc: "Incrementa el poder de los movimientos de tipo Fuego en un 20%.", category: "Potenciador" },
        { name: "flame-orb", displayName: "Orbe Llama", desc: "Quema al Pokémon portador al final de cada turno, activando Guts o Facade.", category: "Estratégico" },
        { name: "heat-rock", displayName: "Roca Caliente", desc: "Extiende el clima Soltar de 5 a 8 turnos cuando se usa Día Soleado.", category: "Clima" },
        { name: "figy-berry", displayName: "Baya Figy", desc: "Restaura 1/3 del HP máximo cuando el HP baje mucho. Confunde si no le gusta el sabor picante.", category: "Baya" },
        { name: "magma-stone", displayName: "Piedra Magna", desc: "Ítems relacionados con Pokémon de tipo Fuego legendarios como Heatran.", category: "Especial" },
    ],
    water: [
        { name: "water-stone", displayName: "Piedra Agua", desc: "Hace evolucionar a Poliwag, Shellder, Staryu, Eevee y otros.", category: "Evolución" },
        { name: "mystic-water", displayName: "Agua Mística", desc: "Incrementa el poder de los movimientos de tipo Agua en un 20%.", category: "Potenciador" },
        { name: "damp-rock", displayName: "Roca Húmeda", desc: "Extiende el clima Lluvia de 5 a 8 turnos.", category: "Clima" },
        { name: "wave-incense", displayName: "Incienso Ola", desc: "Incrementa el poder de los movimientos de tipo Agua en un 20%.", category: "Potenciador" },
    ],
    grass: [
        { name: "leaf-stone", displayName: "Piedra Hoja", desc: "Hace evolucionar a Gloom, Weepinbell, Exeggcute y otros.", category: "Evolución" },
        { name: "miracle-seed", displayName: "Semilla Milagro", desc: "Incrementa el poder de los movimientos de tipo Planta en un 20%.", category: "Potenciador" },
        { name: "grassy-seed", displayName: "Semilla Hierba", desc: "Sube la Defensa en Grassy Terrain. Item de un solo uso.", category: "Terreno" },
        { name: "rose-incense", displayName: "Incienso Rosa", desc: "Incrementa el poder de los movimientos de tipo Planta en un 20%.", category: "Potenciador" },
    ],
    electric: [
        { name: "thunderstone", displayName: "Piedra Trueno", desc: "Hace evolucionar a Pikachu, Eevee y otros Pokémon.", category: "Evolución" },
        { name: "magnet", displayName: "Imán", desc: "Incrementa el poder de los movimientos de tipo Eléctrico en un 20%.", category: "Potenciador" },
        { name: "electric-seed", displayName: "Semilla Eléctrica", desc: "Sube la Defensa Especial en Electric Terrain. Item de un solo uso.", category: "Terreno" },
        { name: "cell-battery", displayName: "Batería Célula", desc: "Sube el Ataque cuando el portador es golpeado por un movimiento eléctrico.", category: "Reactivo" },
    ],
    ice: [
        { name: "never-melt-ice", displayName: "Hielo Eterno", desc: "Incrementa el poder de los movimientos de tipo Hielo en un 20%.", category: "Potenciador" },
        { name: "icy-rock", displayName: "Roca Glacial", desc: "Extiende el clima Granizo de 5 a 8 turnos.", category: "Clima" },
    ],
    psychic: [
        { name: "twisted-spoon", displayName: "Cuchara Torcida", desc: "Incrementa el poder de los movimientos de tipo Psíquico en un 20%.", category: "Potenciador" },
        { name: "psychic-seed", displayName: "Semilla Psíquica", desc: "Sube la Defensa Especial en Psychic Terrain. Item de un solo uso.", category: "Terreno" },
        { name: "link-cable", displayName: "Cable Link", desc: "Hace evolucionar a Pokémon que normalmente evolucionan por intercambio como Alakazam.", category: "Evolución" },
    ],
    fighting: [
        { name: "black-belt", displayName: "Cinturón Negro", desc: "Incrementa el poder de los movimientos de tipo Lucha en un 20%.", category: "Potenciador" },
        { name: "punching-glove", displayName: "Guante Boxeo", desc: "Aumenta 10% el poder de movimientos de puño e impide contacto.", category: "Potenciador" },
    ],
    dragon: [
        { name: "dragon-scale", displayName: "Escama Dragón", desc: "Hace evolucionar a Seadra a Kingdra cuando se intercambia.", category: "Evolución" },
        { name: "dragon-fang", displayName: "Colmillo Dragón", desc: "Incrementa el poder de los movimientos de tipo Dragón en un 20%.", category: "Potenciador" },
    ],
    dark: [
        { name: "black-glasses", displayName: "Gafas Negras", desc: "Incrementa el poder de los movimientos de tipo Siniestro en un 20%.", category: "Potenciador" },
        { name: "dusk-stone", displayName: "Piedra Noche", desc: "Hace evolucionar a Misdreavus, Murkrow, Doublade y otros.", category: "Evolución" },
    ],
    steel: [
        { name: "metal-coat", displayName: "Revestimiento Férreo", desc: "Incrementa el poder de movimientos de tipo Acero en 20% / evoluciona a Scyther y Onix.", category: "Evolución/Potenciador" },
        { name: "iron-ball", displayName: "Bola Hierro", desc: "Pisa el campo y reduce la velocidad. Vulnerable a movimientos de Tierra.", category: "Estratégico" },
    ],
    ghost: [
        { name: "spell-tag", displayName: "Sello Espectral", desc: "Incrementa el poder de los movimientos de tipo Fantasma en un 20%.", category: "Potenciador" },
        { name: "dusk-stone", displayName: "Piedra Noche", desc: "Hace evolucionar a Misdreavus, Murkrow y otros Pokémon fantasma.", category: "Evolución" },
    ],
    rock: [
        { name: "hard-stone", displayName: "Piedra Dura", desc: "Incrementa el poder de los movimientos de tipo Roca en un 20%.", category: "Potenciador" },
        { name: "smooth-rock", displayName: "Roca Lisa", desc: "Extiende el clima Tormenta de Arena de 5 a 8 turnos.", category: "Clima" },
        { name: "rocky-helmet", displayName: "Casco Rocoso", desc: "El atacante recibe daño si usa contacto directo contra el portador.", category: "Reactivo" },
    ],
    poison: [
        { name: "poison-barb", displayName: "Espina Venenosa", desc: "Incrementa el poder de los movimientos de tipo Veneno en un 20%.", category: "Potenciador" },
    ],
    ground: [
        { name: "soft-sand", displayName: "Arena Blanda", desc: "Incrementa el poder de los movimientos de tipo Tierra en un 20%.", category: "Potenciador" },
    ],
    flying: [
        { name: "sharp-beak", displayName: "Pico Afilado", desc: "Incrementa el poder de los movimientos de tipo Volador en un 20%.", category: "Potenciador" },
    ],
    bug: [
        { name: "silver-powder", displayName: "Polvo Plata", desc: "Incrementa el poder de los movimientos de tipo Bicho en un 20%.", category: "Potenciador" },
        { name: "insect-plate", displayName: "Placa Insecto", desc: "Convierte Juicio en tipo Bicho e incrementa su poder un 20%.", category: "Potenciador" },
    ],
    fairy: [
        { name: "moon-stone", displayName: "Piedra Lunar", desc: "Hace evolucionar a Clefairy, Jigglypuff y otros Pokémon de tipo Hada.", category: "Evolución" },
        { name: "fairy-feather", displayName: "Pluma Hada", desc: "Incrementa el poder de los movimientos de tipo Hada en un 20%.", category: "Potenciador" },
        { name: "misty-seed", displayName: "Semilla Bruma", desc: "Sube la Defensa Especial en Misty Terrain. Item de un solo uso.", category: "Terreno" },
    ],
    normal: [
        { name: "silk-scarf", displayName: "Pañuelo Seda", desc: "Incrementa el poder de los movimientos de tipo Normal en un 20%.", category: "Potenciador" },
        { name: "normalium-z", displayName: "Normalio Z", desc: "Cristal Z que convierte movimientos normales en Devastación, el Z-Move de tipo Normal.", category: "Z-Crystal" },
    ],
}

const CATEGORY_COLORS: Record<string, string> = {
    "Evolución": "#CC0000",
    "Potenciador": "#2563EB",
    "Clima": "#0891B2",
    "Terreno": "#059669",
    "Estratégico": "#7C3AED",
    "Reactivo": "#D97706",
    "Especial": "#DB2777",
    "Baya": "#65A30D",
    "Z-Crystal": "#6C3483",
    "Evolución/Potenciador": "#CC0000",
}

interface Props {
    typeName: string
    typeColor: string
}

export function TypeItemsSection({ typeName, typeColor }: Props) {
    const items = TYPE_ITEMS[typeName] || []

    return (
        <section className="py-10">
            <div className="flex items-center gap-3 mb-4">
                <span className="w-3 h-3 block shrink-0" style={{ backgroundColor: typeColor }} />
                <h2 className="font-['Press_Start_2P'] text-[11px] text-[#111111]">OBJETOS RELACIONADOS</h2>
                <div
                    className="px-2 py-0.5 text-white font-['JetBrains_Mono'] text-[10px] border-2 border-[#111111] shrink-0"
                    style={{ backgroundColor: typeColor, boxShadow: "2px 2px 0 #111111" }}
                >
                    {items.length}
                </div>
            </div>
            <div className="h-[3px] bg-[#111111] w-full mb-6" />

            {items.length === 0 ? (
                <div className="border-2 border-[#E0E0E0] p-6 bg-white text-center">
                    <p className="font-['Nunito'] text-[13px] text-[#888888]">No hay objetos curados para este tipo aún.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {items.map((item, i) => {
                        const catColor = CATEGORY_COLORS[item.category] || "#888888"
                        return (
                            <motion.div
                                key={item.name}
                                className="border-2 border-[#111111] bg-white flex items-start gap-4 p-4 relative overflow-hidden"
                                style={{ boxShadow: "3px 3px 0 #111111" }}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05, type: "spring", stiffness: 300, damping: 22 }}
                                whileHover={{ x: -2, y: -2, boxShadow: `5px 5px 0 ${typeColor}`, borderColor: typeColor }}
                            >
                                {/* Item sprite */}
                                <div
                                    className="shrink-0 w-12 h-12 flex items-center justify-center border-2 border-[#111111] bg-[#F8F8F8]"
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${item.name}.png`}
                                        alt={item.displayName}
                                        width={32}
                                        height={32}
                                        style={{ imageRendering: "pixelated" }}
                                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }}
                                    />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-1 mb-1">
                                        <h3 className="font-['Press_Start_2P'] text-[8px] text-[#111111] leading-relaxed">{item.displayName}</h3>
                                        <span
                                            className="shrink-0 font-['Nunito'] text-[9px] font-bold text-white px-1.5 py-0.5 border border-current"
                                            style={{ backgroundColor: catColor, borderColor: catColor }}
                                        >
                                            {item.category}
                                        </span>
                                    </div>
                                    <p className="font-['Nunito'] text-[11px] text-[#444444] leading-relaxed">{item.desc}</p>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            )}
        </section>
    )
}
