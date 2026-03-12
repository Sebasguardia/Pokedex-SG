"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Info } from "lucide-react";
import { formatPokemonName } from "@/lib/utils/pokemon.utils";

interface BerryHeldPokemonProps {
    pokemon: any[];
    flavorColor: string;
}

function rarityColor(rarity: number): string {
    if (rarity >= 50) return "#16A34A";
    if (rarity >= 10) return "#F59E0B";
    return "#CC0000";
}

function rarityLabel(rarity: number): string {
    if (rarity >= 50) return "Común";
    if (rarity >= 10) return "Poco frecuente";
    return "Raro";
}

export function BerryHeldPokemon({ pokemon, flavorColor }: BerryHeldPokemonProps) {
    if (!pokemon || pokemon.length === 0) return null;

    return (
        <section>
            <div className="flex items-center gap-3 mb-8">
                <h2 className="font-press-start text-[14px] text-[#111111] uppercase tracking-tighter">
                    POKÉMON RELACIONADOS
                </h2>
                <div className="h-px bg-[#E0E0E0] flex-1" />
                <div className="px-3 py-1 font-press-start text-[8px] text-white" style={{ backgroundColor: flavorColor }}>
                    {pokemon.length} Pokémon
                </div>
            </div>

            {/* Strategic tip */}
            <div
                className="flex items-start gap-2 p-4 border-2 border-[#E0E0E0] mb-6 bg-[#F8F8F8]"
                style={{ borderLeft: `4px solid ${flavorColor}` }}
            >
                <Info size={14} color={flavorColor} className="mt-0.5 shrink-0" />
                <p className="font-nunito text-[13px] text-[#444444] leading-relaxed italic">
                    Para obtener esta baya en estado salvaje, captura estos Pokémon o usa{" "}
                    <strong>Ladrón</strong> / <strong>Antojo</strong>.
                </p>
            </div>

            {/* Grid — same pattern as ability-pokemon-tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {pokemon.map((p: any, i: number) => {
                    const name: string = p.pokemon?.name ?? p.name ?? "unknown";
                    const sprite: string = p.pokemon?.sprites?.front_default ?? "";
                    const maxRarity: number = p.version_details?.length
                        ? Math.max(...p.version_details.map((v: any) => v.rarity))
                        : 5;
                    const rc = rarityColor(maxRarity);

                    return (
                        <Link key={name + i} href={`/pokemon/${name}`}>
                            <motion.div
                                className="bg-[#FAFAFA] border-2 border-[#111111] p-3 text-center group cursor-pointer"
                                whileHover={{ y: -4, boxShadow: "4px 4px 0 #111111" }}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.02 }}
                            >
                                {sprite && (
                                    <div className="relative mb-2 bg-white p-2 border border-[#E0E0E0]">
                                        <img
                                            src={sprite}
                                            alt={name}
                                            className="w-full h-auto object-contain"
                                            style={{ imageRendering: "pixelated" }}
                                        />
                                    </div>
                                )}
                                <span className="font-nunito font-bold text-[11px] capitalize text-[#111111] truncate block group-hover:text-[#CC0000] transition-colors">
                                    {formatPokemonName(name)}
                                </span>
                                <div className="flex items-center justify-center gap-1 mt-1">
                                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: rc }} />
                                    <span className="font-jetbrains text-[9px] text-[#888888]">{maxRarity}%</span>
                                </div>
                            </motion.div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}