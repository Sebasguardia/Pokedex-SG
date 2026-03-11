"use client";

import { motion } from "framer-motion";
import { PokemonSprite } from "@/components/shared/pokemon-sprite";
import { TypeBadge } from "@/components/pokemon/type-badge";
import { FavoriteButton } from "@/components/shared/favorite-button";
import { CryButton } from "@/components/pokemon/cry-button";
import { GenerationBadge } from "@/components/shared/generation-badge";
import { formatPokemonId, formatPokemonName } from "@/lib/utils/pokemon.utils";
import { Pokemon } from "@/types/api/pokemon.types";

interface HeroSectionProps {
    pokemon: Pokemon;
    generation?: string;
    flavorText?: string;
    shiny: boolean;
    onShinyToggle: () => void;
}

export function HeroSection({ pokemon, generation, flavorText, shiny, onShinyToggle }: HeroSectionProps) {
    const primaryType = pokemon.types?.[0]?.type?.name ?? "normal";

    return (
        <div className="relative flex flex-col items-center gap-4 p-6 rounded-2xl overflow-hidden border border-poke-border bg-poke-surface">
            {/* Gradient fondo tipo */}
            <div className={`absolute inset-0 bg-gradient-to-b from-type-${primaryType}/20 to-transparent pointer-events-none`} />

            {/* ID */}
            <span className="text-xs font-mono text-muted-foreground">{formatPokemonId(pokemon.id)}</span>

            {/* Sprite animado */}
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
                <PokemonSprite id={pokemon.id} name={pokemon.name} shiny={shiny} size={200} useArtwork />
            </motion.div>

            {/* Nombre */}
            <h1 className="text-2xl font-pixel text-foreground">{formatPokemonName(pokemon.name)}</h1>

            {/* Types */}
            <div className="flex gap-2">
                {pokemon.types.map((t) => (
                    <TypeBadge key={t.type.name} typeName={t.type.name} />
                ))}
            </div>

            {/* Gen badge */}
            {generation && <GenerationBadge generation={generation} />}

            {/* Actions */}
            <div className="flex gap-2">
                <FavoriteButton pokemonId={pokemon.id} />
                {pokemon.cries?.latest && <CryButton cryUrl={pokemon.cries.latest} />}
                <button
                    onClick={onShinyToggle}
                    className={`h-9 px-3 text-xs rounded-full border transition-all ${shiny ? "border-poke-yellow text-poke-yellow bg-poke-yellow/10" : "border-poke-border text-muted-foreground hover:border-poke-yellow"}`}
                >
                    ✨ Shiny
                </button>
            </div>

            {/* Altura / Peso */}
            <div className="flex gap-6 text-sm text-muted-foreground">
                <div className="text-center">
                    <p className="text-foreground font-semibold">{(pokemon.height * 0.1).toFixed(1)}m</p>
                    <p className="text-xs">Altura</p>
                </div>
                <div className="text-center">
                    <p className="text-foreground font-semibold">{(pokemon.weight * 0.1).toFixed(1)}kg</p>
                    <p className="text-xs">Peso</p>
                </div>
            </div>

            {/* Flavor text */}
            {flavorText && (
                <p className="text-center text-sm text-muted-foreground max-w-md italic">&quot;{flavorText}&quot;</p>
            )}
        </div>
    );
}
