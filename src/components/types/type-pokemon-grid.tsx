"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { usePokemonIndex } from "@/lib/hooks/pokemon/usePokemonIndex"
import { TypeSvgIcon } from "@/components/shared/icons/type-svg-icon"
import { TYPE_COLORS } from "@/lib/constants/types/types.constants"

interface RawPokemon {
    name: string
    url: string
    slot?: number
}

interface Props {
    pokemon: RawPokemon[]
    typeName: string
    typeColor: string
    // Received directly from the type detail page; includes slot info
    allPokemonWithSlots?: { pokemon: RawPokemon; slot: number }[]
}

function extractId(url: string): number {
    const parts = url.split("/").filter(Boolean)
    return parseInt(parts[parts.length - 1])
}

const TYPE_NAMES_ES: Record<string, string> = {
    normal: "Normal",
    fighting: "Lucha",
    flying: "Volador",
    poison: "Veneno",
    ground: "Tierra",
    rock: "Roca",
    bug: "Bicho",
    ghost: "Fantasma",
    steel: "Acero",
    fire: "Fuego",
    water: "Agua",
    grass: "Planta",
    electric: "Eléctrico",
    psychic: "Psíquico",
    ice: "Hielo",
    dragon: "Dragón",
    dark: "Siniestro",
    fairy: "Hada",
    stellar: "Estelar",
    unknown: "Desc."
}

function PokemonTypeChip({ type }: { type: string }) {
    const color = TYPE_COLORS[type] || "#888888"
    const typeNameES = TYPE_NAMES_ES[type] || type
    
    return (
        <div
            className="flex items-center gap-1 px-1.5 py-0.5 border border-black/20"
            style={{ backgroundColor: color }}
        >
            <TypeSvgIcon type={type} size={10} style={{ filter: "brightness(0) invert(1)" }} />
            <span className="font-['Nunito'] text-[8px] font-bold text-white uppercase">{typeNameES}</span>
        </div>
    )
}

function PokemonCard({ p, typeColor, index }: { p: { name: string; url: string }; typeColor: string; index: number }) {
    const id = extractId(p.url)
    const { data: globalPokemon } = usePokemonIndex()
    
    // Si no existen datos directos de la variación en GraphQL (problema de sincronización de PokeAPI)
    // Extraemos su forma "base" buscando la primera parte del nombre.
    const pokemonData = useMemo(() => {
        if (!globalPokemon) return undefined;
        let data = globalPokemon.find(gp => gp.id === id);
        if (!data) {
            const baseName = p.name.split('-')[0];
            data = globalPokemon.find(gp => gp.name === baseName);
        }
        return data;
    }, [globalPokemon, id, p.name])

    const fallbackId = pokemonData ? pokemonData.id : id;

    const displayName = p.name
        .split("-")
        .map(w => w[0]?.toUpperCase() + w.slice(1))
        .join(" ")

    return (
        <motion.div
            className="h-full"
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10px" }}
            transition={{ delay: (index % 30) * 0.02, type: "spring", stiffness: 300, damping: 22 }}
        >
            <Link href={`/pokemon/${id}`} className="block h-full">
                <motion.div
                    className="flex flex-col items-center bg-white border-2 border-[#111111] p-3 group cursor-pointer h-full"
                    style={{ boxShadow: "3px 3px 0 #111111" }}
                    whileHover={{ x: -2, y: -2, boxShadow: `5px 5px 0 ${typeColor}`, borderColor: typeColor }}
                    whileTap={{ scale: 0.97 }}
                >
                    <div className="flex-1 w-full flex flex-col items-center mb-2">
                        {/* Sprite with robust fallback */}
                        <div className="relative w-16 h-16 mb-2 shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                                alt={displayName}
                                width={64}
                                height={64}
                                className="w-full h-full object-contain"
                                style={{ imageRendering: "pixelated" }}
                                onError={(e) => {
                                    // Fallback to base form sprite if variant sprite doesn't exist
                                    const target = e.currentTarget;
                                    const fallbackSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${fallbackId}.png`;
                                    if (target.src !== fallbackSrc) {
                                        target.src = fallbackSrc;
                                    } else {
                                        // Final absolute fallback (official artwork of base)
                                        const officialSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${fallbackId}.png`;
                                        if (target.src !== officialSrc) {
                                            target.src = officialSrc;
                                            target.style.imageRendering = "auto"; // Not pixelated for official art
                                        }
                                    }
                                }}
                            />
                        </div>

                        {/* ID */}
                        <span className="font-['JetBrains_Mono'] text-[9px] text-[#888888] mb-1">
                            #{String(id).padStart(4, "0")}
                        </span>

                        {/* Name */}
                        <span 
                            className="font-['Nunito'] text-[11px] font-black text-[#111111] capitalize text-center leading-tight mb-2 transition-colors break-words"
                            style={{ 
                                // We use a CSS variable or group-hover logic logic in style if needed, 
                                // but for simplicity and since it's a small card:
                                color: "#111111" 
                            }}
                        >
                            {displayName}
                        </span>
                    </div>

                    {/* Type chips (pinned to bottom) */}
                    <div className="w-full mt-auto flex gap-1 flex-wrap justify-center shrink-0 min-h-[16px]">
                        {pokemonData?.types ? (
                            pokemonData.types.map((t: string) => (
                                <PokemonTypeChip key={t} type={t} />
                            ))
                        ) : (
                            // Fallback if the global index is loading
                            <div className="w-6 h-1 rounded bg-[#E0E0E0] animate-pulse"></div>
                        )}
                    </div>
                </motion.div>
            </Link>
        </motion.div>
    )
}

function PokemonSection({
    title,
    count,
    pokemonList,
    typeColor,
    emptyMsg,
    startIndex = 0
}: {
    title: string
    count: number
    pokemonList: RawPokemon[]
    typeColor: string
    emptyMsg: string
    startIndex?: number
}) {
    return (
        <div className="mb-12">
            <div className="flex items-center gap-3 mb-5">
                <div className="w-2 h-6" style={{ backgroundColor: typeColor }} />
                <h3 className="font-['Press_Start_2P'] text-[10px] text-[#111111]">{title}</h3>
                <span
                    className="font-['JetBrains_Mono'] text-[10px] text-white px-2 py-0.5 border-2 border-[#111111]"
                    style={{ backgroundColor: typeColor }}
                >
                    {count}
                </span>
            </div>

            {pokemonList.length === 0 ? (
                <p className="font-['Nunito'] text-[13px] text-[#888888] italic pl-5">{emptyMsg}</p>
            ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                    {pokemonList.map((p, i) => (
                        <PokemonCard
                            key={p.name}
                            p={p}
                            typeColor={typeColor}
                            index={startIndex + i}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export function TypePokemonGrid({ pokemon, typeName, typeColor, allPokemonWithSlots }: Props) {
    const typeNameES = (TYPE_NAMES_ES[typeName] || typeName).toUpperCase()
    const { data: globalPokemon } = usePokemonIndex()

    const categorized = useMemo(() => {
        const pure: RawPokemon[] = []
        const primary: RawPokemon[] = []
        const secondary: RawPokemon[] = []

        if (!allPokemonWithSlots) return { pure: [], primary: pokemon, secondary: [] }

        for (const entry of allPokemonWithSlots) {
            const p = entry.pokemon
            const id = extractId(p.url)
            
            // Si el índice global está disponible, lo usamos para precisión absoluta
            if (globalPokemon) {
                const gp = globalPokemon.find(g => g.id === id)
                if (gp) {
                    if (gp.types.length === 1 && gp.types[0] === typeName) {
                        pure.push(p)
                    } else if (gp.types.length > 1 && gp.types[0] === typeName) {
                        primary.push(p)
                    } else if (gp.types.length > 1 && gp.types[1] === typeName) {
                        secondary.push(p)
                    }
                    continue
                }
            }
            
            // Fallback (solo si no ha cargado globalPokemon)
            if (entry.slot === 1) {
                primary.push(p) 
            } else if (entry.slot === 2) {
                secondary.push(p)
            }
        }
        
        // Si globalPokemon no ha cargado, asumimos "puros" como un array vacío y todos los slot=1 como primarios por ahora para evitar duplicados.
        return { pure, primary, secondary }
    }, [allPokemonWithSlots, globalPokemon, typeName, pokemon])

    const pureType = categorized.pure
    const primaryType = categorized.primary
    const secondaryType = categorized.secondary

    const totalCount = (allPokemonWithSlots?.length || pokemon.length)

    return (
        <section className="py-10">
            {/* Section header */}
            <div className="flex items-center gap-3 mb-4">
                <span className="w-3 h-3 block shrink-0" style={{ backgroundColor: typeColor }} />
                <h2 className="font-['Press_Start_2P'] text-[12px] text-[#111111]">POKÉMON DE TIPO {typeNameES}</h2>
                <div
                    className="px-2 py-0.5 text-white font-['JetBrains_Mono'] text-[10px] border-2 border-[#111111] shrink-0"
                    style={{ backgroundColor: typeColor, boxShadow: "2px 2px 0 #111111" }}
                >
                    {totalCount}
                </div>
            </div>
            <div className="h-[3px] bg-[#111111] w-full mb-8" />

            {allPokemonWithSlots ? (
                <>
                    <PokemonSection
                        title={`TIPO PURO ${typeNameES}`}
                        count={pureType.length}
                        pokemonList={pureType}
                        typeColor={typeColor}
                        emptyMsg={`No hay Pokémon de tipo ${typeNameES} puro.`}
                        startIndex={0}
                    />
                    <PokemonSection
                        title={`${typeNameES} PRIMARIO`}
                        count={primaryType.length}
                        pokemonList={primaryType}
                        typeColor={typeColor}
                        emptyMsg={`No hay Pokémon con ${typeNameES} como tipo primario.`}
                        startIndex={pureType.length}
                    />
                    <PokemonSection
                        title={`${typeNameES} SECUNDARIO`}
                        count={secondaryType.length}
                        pokemonList={secondaryType}
                        typeColor={typeColor}
                        emptyMsg={`No hay Pokémon con ${typeNameES} como tipo secundario.`}
                        startIndex={pureType.length + primaryType.length}
                    />
                </>
            ) : (
                <PokemonSection
                    title={`TODOS`}
                    count={pokemon.length}
                    pokemonList={pokemon}
                    typeColor={typeColor}
                    emptyMsg="No hay Pokémon disponibles."
                />
            )}

            {/* CTA Link */}
            <Link href={`/pokemon?type=${typeName}`}>
                <motion.div
                    className="inline-flex items-center gap-2 mt-6 font-['Nunito'] text-[13px] font-bold text-[#111111] border-b-2 border-transparent pb-0.5 transition-colors"
                    style={{ borderBottomColor: "#111111" }}
                    whileHover={{ x: 4, color: typeColor, borderBottomColor: typeColor }}
                >
                    VER TODOS EN LA POKÉDEX
                    <ArrowRight size={16} />
                </motion.div>
            </Link>
        </section>
    )
}
