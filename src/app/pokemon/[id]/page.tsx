"use client"

import { useState, useMemo, useCallback } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import * as Tabs from "@radix-ui/react-tabs"
import { useParams, useRouter } from "next/navigation"
import { notFound } from "next/navigation"
import { Howl } from "howler"
import Link from "next/link"
import { Home, ChevronRight } from "lucide-react"

import { usePokemon } from "@/lib/hooks/usePokemon"
import { usePokemonSpecies } from "@/lib/hooks/usePokemonSpecies"
import { useEvolutionChain } from "@/lib/hooks/useEvolutionChain"
import { useFavoritesStore } from "@/lib/store/favorites.store"
import { useCompareStore } from "@/lib/store/compare.store"
import { useFilterStore } from "@/lib/store/filter.store"
import { TYPE_CONSTANTS } from "@/lib/constants/types.constants"
import { getIdFromUrl } from "@/lib/utils/pokemon.utils"
import { cn } from "@/lib/utils/cn"
import { PageTransitionPokemon } from "@/components/shared/page-transition-pokemon"

// Hero column components (compact — no data)
import { SpriteStage } from "@/components/pokemon/detail/identity/sprite-stage"
import { PokemonIdentity } from "@/components/pokemon/detail/identity/pokemon-identity"
import { ActionButtons } from "@/components/pokemon/detail/identity/action-buttons"
import { NavigationArrows } from "@/components/pokemon/detail/identity/navigation-arrows"

// Tab: Información
import { FlavorTextCarousel } from "@/components/pokemon/detail/info/flavor-text-carousel"
import { PokedexDataGrid } from "@/components/pokemon/detail/info/pokedex-data-grid"
import { TrainingSection } from "@/components/pokemon/detail/info/training-section"
import { BreedingSection } from "@/components/pokemon/detail/info/breeding-section"

// Tab: Estadísticas
import { StatBars } from "@/components/pokemon/detail/visuals/stat-bars"
import { StatRadar } from "@/components/pokemon/detail/visuals/stat-radar"

// Tab: Habilidades (new)
import { AbilitiesDetail } from "@/components/pokemon/detail/content/abilities-detail"

// Tab: Movimientos (updated)
import { MovesTable } from "@/components/pokemon/detail/content/moves-table"

// Tab: Evolución
import { EvolutionChain } from "@/components/pokemon/detail/content/evolution-chain"

// Tab: Más (new)
import { FormsGallery } from "@/components/pokemon/detail/content/forms-gallery"
import { SpritesGallery } from "@/components/pokemon/detail/content/sprites-gallery"
import { GameLocations } from "@/components/pokemon/detail/content/game-locations"

// Footer
import { RelatedPokemon } from "@/components/pokemon/detail/content/related-pokemon"

// Skeleton
import { DetailSkeleton } from "@/components/pokemon/detail/visuals/DetailSkeleton"

type SpriteMode = "front" | "back"

const TABS = [
    { id: "informacion", label: "Información" },
    { id: "estadisticas", label: "Estadísticas" },
    { id: "habilidades", label: "Habilidades" },
    { id: "movimientos", label: "Movimientos" },
    { id: "evolucion", label: "Evolución" },
    { id: "mas", label: "Más" },
] as const

export default function PokemonDetailPage() {
    const params = useParams<{ id: string }>()
    const router = useRouter()
    const prefersRM = useReducedMotion()

    // UI State
    const [isShiny, setIsShiny] = useState(false)
    const [spriteMode, setSpriteMode] = useState<SpriteMode>("front")
    const [isCrying, setIsCrying] = useState(false)
    const [activeTab, setActiveTab] = useState<string>("informacion")
    const [expandedMove, setExpandedMove] = useState<string | null>(null)

    // Data
    const { data: pokemon, isLoading, isError } = usePokemon(params.id)
    const speciesQueryId = pokemon?.species?.name || params.id
    const { data: species } = usePokemonSpecies(speciesQueryId)
    const evolutionChainId = species?.evolution_chain?.url
        ? getIdFromUrl(species.evolution_chain.url)
        : null
    const { data: evolutionData } = useEvolutionChain(evolutionChainId ?? 0)

    const { toggleFavorite, isFavorite } = useFavoritesStore()
    const { addPokemon, pokemonIds } = useCompareStore()
    const { pokedexFilters } = useFilterStore()
    const pokedexHref = pokedexFilters ? `/pokemon?${pokedexFilters}` : "/pokemon"

    const primaryType = pokemon?.types?.[0]?.type.name ?? "normal"
    const typeColor = (TYPE_CONSTANTS[primaryType] as any)?.color ?? "#A8A878"

    const currentSprite = useMemo(() => {
        if (!pokemon) return null
        const { sprites } = pokemon

        if (isShiny && spriteMode === "back") return sprites?.back_shiny
        if (spriteMode === "back") return sprites?.back_default

        const artwork = sprites?.other?.["official-artwork"]
        if (isShiny) return artwork?.front_shiny || sprites?.front_shiny
        return artwork?.front_default || sprites?.front_default
    }, [pokemon, isShiny, spriteMode])

    const handleCry = useCallback(() => {
        if (!pokemon) return
        const url = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokemon.id}.ogg`
        setIsCrying(true)
        const howl = new Howl({
            src: [url],
            volume: 0.6,
            onend: () => setIsCrying(false),
            onloaderror: () => setIsCrying(false),
        })
        howl.play()
    }, [pokemon])

    const handleShare = useCallback(() => {
        if (typeof navigator !== "undefined" && navigator.share) {
            navigator.share({ url: window.location.href, title: pokemonName })
        } else if (typeof navigator !== "undefined") {
            navigator.clipboard?.writeText(window.location.href)
        }
    }, [])

    if (isLoading) return <DetailSkeleton />
    if (isError || !pokemon) return notFound()

    const pokemonName = pokemon.name
        .split("-")
        .map((w: string) => w[0].toUpperCase() + w.slice(1))
        .join(" ")
    const pokemonIdNum = pokemon.id

    return (
        <>
            {/* Page transition — uses type color and sprite */}
            {!prefersRM && (
                <PageTransitionPokemon 
                    spriteSrc={currentSprite ?? ""} 
                    typeColor={typeColor} 
                />
            )}

            <motion.main
                className="max-w-[1280px] mx-auto px-4 sm:px-6 py-6"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4, ease: "easeOut" }}
            >
                {/* Breadcrumb */}
                <nav className="flex items-center gap-1 mb-6 font-['Nunito'] text-[12px]">
                    <Link href="/" className="text-[#888888] hover:text-[#CC0000] flex items-center gap-1 transition-colors">
                        <Home size={12} /> Inicio
                    </Link>
                    <ChevronRight size={12} className="text-[#888888]" />
                    <Link href={pokedexHref} className="text-[#888888] hover:text-[#CC0000] transition-colors">
                        Pokédex
                    </Link>
                    <ChevronRight size={12} className="text-[#888888]" />
                    <span className="text-[#111111] font-bold">{pokemonName}</span>
                </nav>

                {/* Main layout — LEAN HERO + CONTENT TABS */}
                <div className="flex flex-col lg:flex-row gap-8 items-start">

                    {/* ════════════════════════════════════════
                        LEAN HERO COLUMN (sticky on desktop)
                        Only visual + interactive — no data sections
                    ════════════════════════════════════════ */}
                    <div className="w-full lg:w-[360px] lg:flex-shrink-0 lg:sticky lg:top-[80px] lg:self-start flex flex-col gap-4">

                        {/* Sprite Stage */}
                        <SpriteStage
                            sprite={currentSprite}
                            typeColor={typeColor}
                            primaryType={primaryType}
                            isShiny={isShiny}
                            spriteMode={spriteMode}
                            isCrying={isCrying}
                            pokemonId={pokemon.id}
                            pokemonName={pokemonName}
                            onShinyToggle={() => setIsShiny(p => !p)}
                            onSpriteModeToggle={() => setSpriteMode(p => p === "front" ? "back" : "front")}
                            onCry={handleCry}
                        />

                        {/* Identity: number, name, types, gender */}
                        <PokemonIdentity
                            pokemon={pokemon}
                            species={species}
                            typeColor={typeColor}
                        />

                        {/* ⚠️ PhysicalStats is NO LONGER HERE — it's in Tab Información */}

                        {/* Action Buttons: favorite, compare, share */}
                        <ActionButtons
                            isFavorite={isFavorite(pokemonIdNum)}
                            isInCompare={pokemonIds.includes(pokemonIdNum) as boolean}
                            onFavorite={() => toggleFavorite(pokemonIdNum)}
                            onCompare={() => addPokemon(pokemonIdNum)}
                            onShare={handleShare}
                            pokemonName={pokemonName}
                        />

                        {/* Navigation to prev/next Pokémon */}
                        <NavigationArrows
                            currentId={pokemon.id}
                            onNavigate={(dir) => router.push(`/pokemon/${pokemon.id + dir}`)}
                        />
                    </div>

                    {/* ════════════════════════════════════════
                        CONTENT TABS (all data lives here)
                        6 tabs: Información · Estadísticas · Habilidades
                                Movimientos · Evolución · Más
                    ════════════════════════════════════════ */}
                    <div className="flex-1 min-w-0">
                        <Tabs.Root value={activeTab} onValueChange={(v) => { setActiveTab(v); setExpandedMove(null) }}>

                            {/* Tab List with traveling indicator */}
                            <Tabs.List className="flex border-b-2 border-[#E0E0E0] mb-6 overflow-x-auto scrollbar-none">
                                {TABS.map(tab => (
                                    <Tabs.Trigger key={tab.id} value={tab.id} asChild>
                                        <button
                                            className={cn(
                                                "relative px-4 py-3 font-['Nunito'] text-[13px] font-bold whitespace-nowrap",
                                                "border-b-2 border-transparent -mb-[2px] transition-colors duration-150",
                                                activeTab === tab.id
                                                    ? "text-[#111111] text-[14px]"
                                                    : "text-[#888888] hover:text-[#444444]"
                                            )}
                                        >
                                            {tab.label}
                                            {activeTab === tab.id && (
                                                <motion.div
                                                    layoutId="tab-indicator-v3"
                                                    className="absolute bottom-[-2px] left-0 right-0 h-[2px] bg-[#CC0000]"
                                                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                                                />
                                            )}
                                        </button>
                                    </Tabs.Trigger>
                                ))}
                            </Tabs.List>

                            {/* Tab Panels with fade-in/out */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {/* ── TAB: INFORMACIÓN ── */}
                                    {activeTab === "informacion" && (
                                        <div>
                                            <FlavorTextCarousel flavors={species?.flavor_text_entries} />
                                            <PokedexDataGrid pokemon={pokemon} species={species} />
                                            <TrainingSection pokemon={pokemon} />
                                            <BreedingSection species={species} />
                                        </div>
                                    )}

                                    {/* ── TAB: ESTADÍSTICAS ── */}
                                    {activeTab === "estadisticas" && (
                                        <div>
                                            <StatBars stats={pokemon.stats} />
                                            <StatRadar stats={pokemon.stats} typeColor={typeColor} />
                                        </div>
                                    )}

                                    {/* ── TAB: HABILIDADES (NEW) ── */}
                                    {activeTab === "habilidades" && (
                                        <AbilitiesDetail
                                            abilities={pokemon.abilities}
                                            pokemonId={pokemon.id}
                                        />
                                    )}

                                    {/* ── TAB: MOVIMIENTOS (UPDATED — expandable rows) ── */}
                                    {activeTab === "movimientos" && (
                                        <MovesTable
                                            moves={pokemon.moves}
                                            expandedMove={expandedMove}
                                            onExpandMove={setExpandedMove}
                                        />
                                    )}

                                    {/* ── TAB: EVOLUCIÓN ── */}
                                    {activeTab === "evolucion" && (
                                        <EvolutionChain
                                            chain={evolutionData?.chain}
                                            currentPokemonId={pokemon.id}
                                            typeColor={typeColor}
                                        />
                                    )}

                                    {/* ── TAB: MÁS (NEW) ── */}
                                    {activeTab === "mas" && (
                                        <div>
                                            <FormsGallery
                                                pokemon={pokemon}
                                                species={species}
                                                typeColor={typeColor}
                                            />
                                            <SpritesGallery
                                                sprites={pokemon.sprites}
                                                pokemonId={pokemon.id}
                                            />
                                            <GameLocations pokemonId={pokemon.id} />
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>

                        </Tabs.Root>
                    </div>
                </div>

                {/* Related Pokémon carrusel at the footer */}
                <RelatedPokemon
                    currentType={primaryType}
                    currentGeneration={species?.generation?.name}
                    excludeId={pokemon.id}
                />
            </motion.main>
        </>
    )
}
