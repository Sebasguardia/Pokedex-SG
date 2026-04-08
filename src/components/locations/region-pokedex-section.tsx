"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, Loader2 } from "lucide-react";
import { useRegionalPokedex } from "@/lib/hooks/useLocations";
import { usePokemon } from "@/lib/hooks/usePokemon";
import { REGION_POPULAR_POKEMON } from "@/lib/constants/region-lore.constants";
import { TypeBadge } from "@/components/pokemon/type-badge";

interface RegionPokedexSectionProps {
    regionKey: string;
    pokedexName: string;
    regionColor: string;
    regionNameEs: string;
}

function extractNationalId(url: string): number {
    return parseInt(url.match(/\/(\d+)\/?$/)?.[1] ?? "0");
}

function capitalize(s: string) {
    if (!s) return "";
    return s.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

/* ── Mapping regions to generation IDs for the pokedex filter ── */
const REGION_TO_GEN_FILTER: Record<string, number> = {
    kanto: 1,
    johto: 2,
    hoenn: 3,
    sinnoh: 4,
    unova: 5,
    kalos: 6,
    alola: 7,
    galar: 8,
    paldea: 9,
};

/* ── Tarjeta individual de Pokémon Emblemático ── */
function FeaturedPokemonCard({ id, pokedex, regionColor, index }: { id: number, pokedex: any, regionColor: string, index: number }) {
    const [imgError, setImgError] = useState(false);

    // Fetch live pokemon data to get the types
    const { data: pokemonData, isLoading } = usePokemon(id);

    // Obtener info básica de la pokédex regional (ej. número en la región)
    const entry = pokedex?.pokemon_entries?.find(
        (e: any) => extractNationalId(e.pokemon_species.url) === id
    );

    const name = pokemonData?.name || (entry ? entry.pokemon_species.name : `Pokemon #${id}`);
    const regionNum = entry?.entry_number;

    const gifSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${id}.gif`;
    const pngSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

    return (
        <Link href={`/pokemon/${id}`}>
            <motion.div
                className="border-[3px] border-[#111111] bg-white flex flex-col h-full overflow-hidden cursor-pointer group relaitve transition-all"
                style={{ boxShadow: "5px 5px 0 #111111" }}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                whileHover={{ y: -6, boxShadow: `8px 8px 0 ${regionColor}`, borderColor: "#111" }}
            >
                {/* Zona Superior: Imagen Animada */}
                <div
                    className="relative h-[120px] sm:h-[130px] w-full flex items-center justify-center border-b-[3px] border-[#111111] transition-colors duration-300 overflow-hidden"
                    style={{ backgroundColor: `${regionColor}15` }}
                >
                    {/* Fondo decorativo tipo halftone/grid neo-brutalista */}
                    <div
                        className="absolute inset-0 opacity-[0.08]"
                        style={{
                            backgroundImage: "radial-gradient(#111 2px, transparent 2px)",
                            backgroundSize: "12px 12px"
                        }}
                    />

                    {/* Badge Número Nacional */}
                    <div
                        className="absolute top-2 left-2 border-[2px] border-[#111] bg-[#111111] text-white font-['Press_Start_2P'] text-[6px] px-1.5 py-1 z-10 transition-colors group-hover:bg-[#CC0000]"
                    >
                        Nº {String(id).padStart(3, '0')}
                    </div>

                    <Image
                        src={imgError ? pngSrc : gifSrc}
                        alt={`Pokemon Emblemático ${name}`}
                        width={72}
                        height={72}
                        className="object-contain relative z-10 drop-shadow-xl group-hover:scale-125 transition-transform duration-300 ease-out"
                        unoptimized
                        onError={() => setImgError(true)}
                    />
                </div>

                {/* Zona Inferior: Datos y Tipos */}
                <div className="p-3 sm:p-4 bg-white group-hover:bg-[#FAFAFA] transition-colors flex-1 flex flex-col">
                    <p className="font-['Nunito'] font-black text-[16px] sm:text-[18px] text-[#111111] leading-tight mb-2 truncate capitalize">
                        {capitalize(name)}
                    </p>

                    {/* Tipos del Pokemon */}
                    <div className="flex flex-wrap gap-1 mt-1 mb-3 min-h-[22px]">
                        {isLoading ? (
                            <div className="flex items-center gap-1.5">
                                <Loader2 size={10} className="animate-spin text-[#888]" />
                                <span className="font-['Press_Start_2P'] text-[5px] text-[#888]">CARGANDO...</span>
                            </div>
                        ) : pokemonData?.types ? (
                            pokemonData.types.map((t) => (
                                <TypeBadge
                                    key={t.type.name}
                                    type={t.type.name}
                                    size="sm"
                                    className="!border-[1.5px] !shadow-[1.5px_1.5px_0_#111111] !text-[7px]"
                                />
                            ))
                        ) : null}
                    </div>

                    {/* Stats footer (Region number) */}
                    <div className="mt-auto pt-2 border-t-[2px] border-[#EEEEEE] flex justify-between items-center group-hover:border-[#DDDDDD] transition-colors">
                        <span className="font-['Press_Start_2P'] text-[6px] text-[#888888] leading-relaxed">
                            REGISTRO DÉX
                        </span>
                        <span
                            className="font-['Press_Start_2P'] text-[9px] text-right"
                            style={{ color: regionNum ? regionColor : "#AAAAAA" }}
                        >
                            {regionNum ? `#${String(regionNum).padStart(3, '0')}` : "---"}
                        </span>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}

export function RegionPokedexSection({ regionKey, pokedexName, regionColor, regionNameEs }: RegionPokedexSectionProps) {
    const { data: pokedex } = useRegionalPokedex(pokedexName, true);
    const popularIds = REGION_POPULAR_POKEMON[regionKey] || [];
    const generationId = REGION_TO_GEN_FILTER[regionKey] || 1;

    return (
        <section>
            {/* Header Neo-Brutalista */}
            <div className="flex items-center gap-3 mb-8">
                <div className="w-3 h-3 bg-[#CC0000]" />
                <h2 className="font-['Press_Start_2P'] text-[13px] sm:text-[14px] uppercase text-[#111111] whitespace-nowrap">
                    POKÉDEX REGIONAL
                </h2>
                <div className="h-[3px] bg-[#111111] flex-1" />
                {pokedex && (
                    <span
                        className="font-['Press_Start_2P'] text-[8px] sm:text-[9px] px-3 py-2 border-[3px] border-[#111111] shrink-0 bg-white"
                        style={{ color: regionColor, boxShadow: `4px 4px 0 ${regionColor}` }}
                    >
                        {pokedex.pokemon_entries.length} POKÉMON
                    </span>
                )}
            </div>

            {/* Panel Principal */}
            <div
                className="relative border-[3px] border-[#111111] bg-white transition-all"
                style={{ boxShadow: `8px 8px 0 ${regionColor}` }}
            >
                {/* Etiqueta flotante */}
                <div
                    className="absolute top-[-18px] left-4 sm:left-6 px-3 py-2 z-10 border-[3px] border-[#111111] flex items-center gap-2"
                    style={{ backgroundColor: regionColor }}
                >
                    <Star size={14} className="text-white fill-white" />
                    <span className="font-['Press_Start_2P'] text-[9px] md:text-[10px] tracking-wider text-white uppercase mt-0.5">
                        ESPECIES EMBLEMÁTICAS
                    </span>
                </div>

                <div className="p-6 sm:p-10 pt-12">
                    <p className="font-['Nunito'] font-semibold text-[16px] sm:text-[17px] text-[#444] mb-10 max-w-3xl leading-relaxed text-pretty">
                        Explora las especies más representativas y reconocidas originarias de la región de <strong className="text-[#111]">{regionNameEs}</strong>. Estos Pokémon han dejado una marca indudable en la historia de entrenadores, campeones y leyendas locales.
                    </p>

                    {/* Grid de Cards de Pokémon Destacados */}
                    {popularIds.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 sm:gap-6 mb-12">
                            {popularIds.map((id, index) => (
                                <FeaturedPokemonCard
                                    key={id}
                                    id={id}
                                    pokedex={pokedex}
                                    regionColor={regionColor}
                                    index={index}
                                />
                            ))}
                        </div>
                    )}

                    {/* Botón CTA a la Pokédex Completa filtrado por Generación */}
                    <div className="flex justify-center border-t-[3px] border-[#111] border-dashed pt-10">
                        <Link href={`/pokemon?gen=${generationId}`}>
                            <motion.button
                                className="group flex items-center gap-5 border-[3px] border-[#111111] bg-white px-8 sm:px-10 py-5 cursor-pointer relative overflow-hidden transition-all"
                                style={{ boxShadow: `6px 6px 0 ${regionColor}` }}
                                whileHover={{ x: -2, y: -2, boxShadow: `8px 8px 0 ${regionColor}` }}
                                whileTap={{ x: 2, y: 2, boxShadow: "0px 0px 0 transparent" }}
                            >
                                <div
                                    className="absolute inset-0 w-0 group-hover:w-full transition-all duration-300 ease-out z-0"
                                    style={{ backgroundColor: regionColor }}
                                />

                                <span className="font-['Press_Start_2P'] text-[11px] sm:text-[13px] tracking-widest relative z-10 mt-1 text-[#111111] group-hover:text-white transition-colors duration-200">
                                    EXPLORAR POKÉDEX GENERACIÓN {generationId}
                                </span>

                                <div
                                    className="w-10 h-10 flex items-center justify-center border-[3px] border-[#111] bg-[#111111] relative z-10 transition-transform group-hover:translate-x-2 group-hover:bg-white"
                                >
                                    <ArrowRight size={20} className="text-white group-hover:text-[#111] transition-colors duration-200" />
                                </div>
                            </motion.button>
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
}