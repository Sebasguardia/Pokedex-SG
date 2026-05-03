"use client"

import { useState, useMemo, useCallback, useRef, useEffect } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import * as Tabs from "@radix-ui/react-tabs"
import { useParams, useRouter } from "next/navigation"
import { notFound } from "next/navigation"
import { Howl } from "howler"
import Link from "next/link"
import { Home, ChevronRight, ChevronLeft } from "lucide-react"

import { usePokemon } from "@/lib/hooks/pokemon/usePokemon"
import { usePokemonSpecies } from "@/lib/hooks/pokemon/usePokemonSpecies"
import { useEvolutionChain } from "@/lib/hooks/pokemon/useEvolutionChain"
import { useFavoritesStore } from "@/lib/store/favorites.store"
import { useCompareStore } from "@/lib/store/compare.store"
import { useFilterStore } from "@/lib/store/filter.store"
import { TYPE_CONSTANTS } from "@/lib/constants/types/types.constants"
import { getIdFromUrl } from "@/lib/utils/pokemon.utils"
import { cn } from "@/lib/utils/cn"
import { PageTransitionPokemon } from "@/components/shared/page-transitions/pokemon/page-transition-pokemon"
import { getGenerationByPokemonId } from "@/lib/constants/favorites/favorites.constants"

// Hero column components (compact — no data)
import { SpriteStage } from "@/components/pokemon/detail/identity/sprite-stage"
import { PokemonVariantSelector } from "@/components/pokemon/detail/identity/pokemon-variant-selector"
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
import { TypeDefenses } from "@/components/pokemon/detail/visuals/type-defenses"

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

    // Data
    const { data: pokemon, isLoading, isError } = usePokemon(params.id)
    const speciesQueryId = pokemon?.species?.name || params.id
    const { data: species } = usePokemonSpecies(speciesQueryId)
    const evolutionChainId = species?.evolution_chain?.url
        ? getIdFromUrl(species.evolution_chain.url)
        : null
    const { data: evolutionData } = useEvolutionChain(evolutionChainId ?? 0)

    const [activeTab, setActiveTab] = useState<string>("informacion")
    const [expandedMove, setExpandedMove] = useState<string | null>(null)

    // Tab Scrolling Logic
    const scrollerRef = useRef<HTMLDivElement>(null)
    const [showLeftArrow, setShowLeftArrow] = useState(false)
    const [showRightArrow, setShowRightArrow] = useState(false)

    const checkScroll = useCallback(() => {
        const el = scrollerRef.current
        if (!el) return
        
        const hasOverflow = el.scrollWidth > el.clientWidth + 2
        const isAtStart = el.scrollLeft <= 10
        const isAtEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 10
        
        setShowLeftArrow(hasOverflow && !isAtStart)
        setShowRightArrow(hasOverflow && !isAtEnd)
    }, [])

    useEffect(() => {
        const el = scrollerRef.current
        if (!el) return

        const observer = new ResizeObserver(() => {
            checkScroll()
        })
        observer.observe(el)
        
        el.addEventListener("scroll", checkScroll, { passive: true })
        window.addEventListener("resize", checkScroll)
        
        checkScroll()
        const timers = [100, 500, 1000, 2000].map(ms => setTimeout(checkScroll, ms))

        return () => {
            observer.disconnect()
            el.removeEventListener("scroll", checkScroll)
            window.removeEventListener("resize", checkScroll)
            timers.forEach(clearTimeout)
        }
    }, [checkScroll])

    useEffect(() => {
        checkScroll()
    }, [activeTab, pokemon, checkScroll])

    const scroll = (direction: "left" | "right") => {
        const el = scrollerRef.current
        if (!el) return
        const amount = direction === "left" ? -200 : 200
        el.scrollBy({ left: amount, behavior: "smooth" })
    }

    const { toggleFavorite, isFavorite } = useFavoritesStore()
    const { addPokemon, pokemonIds } = useCompareStore()
    const { pokedexFilters } = useFilterStore()
    const pokedexHref = pokedexFilters ? `/pokemon?${pokedexFilters}` : "/pokemon"

    const buildFavInput = useCallback(() => {
        if (!pokemon) return null
        const stats = pokemon.stats ?? []
        const getStat = (name: string) => stats.find((s: { stat: { name: string }; base_stat: number }) => s.stat.name === name)?.base_stat ?? 0
        const artwork = pokemon.sprites?.other?.["official-artwork"]?.front_default
            ?? pokemon.sprites?.front_default ?? ""
        const sprite = pokemon.sprites?.front_default ?? ""
        const displayName = pokemon.name.split("-").map((w: string) => w[0].toUpperCase() + w.slice(1)).join(" ")
        const bst = stats.reduce((sum: number, s: { base_stat: number }) => sum + s.base_stat, 0)
        return {
            id:     pokemon.id,
            name:   pokemon.name,
            nameEs: displayName,
            artwork,
            sprite,
            types:  pokemon.types?.map((t: { type: { name: string } }) => t.type.name) ?? [],
            bst,
            baseStats: {
                hp:             getStat("hp"),
                attack:         getStat("attack"),
                defense:        getStat("defense"),
                specialAttack:  getStat("special-attack"),
                specialDefense: getStat("special-defense"),
                speed:          getStat("speed"),
            },
            generation:   getGenerationByPokemonId(pokemon.id),
            isLegendary:  false,
            isMythical:   false,
        }
    }, [pokemon])

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
        const name = pokemon?.name.split("-").map((w: string) => w[0].toUpperCase() + w.slice(1)).join(" ")
        if (typeof navigator !== "undefined" && navigator.share) {
            navigator.share({ url: window.location.href, title: name })
        } else if (typeof navigator !== "undefined") {
            navigator.clipboard?.writeText(window.location.href)
        }
    }, [pokemon])

    const renderTransition = () => {
        if (prefersRM) return null
        return (
            <PageTransitionPokemon 
                spriteSrc={currentSprite ?? ""} 
                typeColor={typeColor} 
                isLoading={isLoading}
            />
        )
    }

    if (isLoading) return (
        <>
            {renderTransition()}
            <DetailSkeleton />
        </>
    )
    if (isError || !pokemon) return notFound()

    const pokemonName = pokemon.name
        .split("-")
        .map((w: string) => w[0].toUpperCase() + w.slice(1))
        .join(" ")
    const pokemonIdNum = pokemon.id

    return (
        <>
            {/* Page transition — uses type color and sprite */}
            {renderTransition()}

            <motion.main
                className="max-w-[1280px] mx-auto px-4 sm:px-6 py-4 sm:py-6 overflow-x-hidden sm:overflow-x-visible"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4, ease: "easeOut" }}
            >
                {/* Back to Pokédex */}
                <Link
                    href={pokedexHref}
                    className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white border-2 border-[#111111] font-['Nunito'] text-[14px] font-black text-[#111111] transition-transform hover:-translate-y-1 active:translate-y-0"
                    style={{ boxShadow: "4px 4px 0 #111111" }}
                >
                    <ChevronLeft size={18} strokeWidth={3} />
                    Volver a la Pokédex
                </Link>

                {/* Main layout — LEAN HERO + CONTENT TABS */}
                <div className="flex flex-col lg:flex-row gap-8 items-start w-full min-w-0 sm:overflow-visible">

                    {/* ════════════════════════════════════════
                        LEAN HERO COLUMN (sticky on desktop)
                        Only visual + interactive — no data sections
                    ════════════════════════════════════════ */}
                    <div className="w-full min-w-0 max-w-[420px] mx-auto lg:max-w-none lg:mx-0 lg:w-[360px] lg:flex-shrink-0 lg:sticky lg:top-[80px] lg:self-start flex flex-col gap-4">

                        {/* Variant Selector (if has multiple forms) */}
                        <PokemonVariantSelector
                            pokemon={pokemon}
                            species={species}
                            typeColor={typeColor}
                        />

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
                            onFavorite={() => {
                                const favInput = buildFavInput()
                                if (favInput) toggleFavorite(favInput)
                            }}
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
                    <div className="flex-1 min-w-0 max-w-full">
                        <Tabs.Root value={activeTab} onValueChange={(v) => { setActiveTab(v); setExpandedMove(null) }}>

                            {/* Tab List with Scroll Arrows */}
                            <div className="relative mb-6 sm:mb-8 isolate w-full">
                                <AnimatePresence>
                                    {showLeftArrow && (
                                        <motion.button
                                            key="left-arrow"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            onClick={(e) => { e.preventDefault(); scroll("left"); }}
                                            className="absolute left-0 top-1/2 -translate-y-1/2 z-[100] p-1.5 sm:p-2 bg-[#111111] text-white border-2 border-white shadow-[2px_2px_0_#111111] hover:bg-[#333333] transition-all active:scale-95 flex items-center justify-center rounded-sm"
                                            aria-label="Scroll izquierda"
                                        >
                                            <ChevronLeft size={20} className="sm:w-6 sm:h-6" strokeWidth={4} />
                                        </motion.button>
                                    )}
                                </AnimatePresence>

                                <Tabs.List asChild>
                                    <div
                                        ref={scrollerRef}
                                        className="flex border-b-4 border-[#111111] overflow-x-auto scrollbar-hide gap-1 sm:gap-2 pt-2 pb-1 px-4 touch-pan-x scroll-smooth w-full max-w-full"
                                    >
                                        {TABS.map(tab => (
                                            <Tabs.Trigger key={tab.id} value={tab.id} asChild>
                                                <button
                                                    className={cn(
                                                        "relative px-3 sm:px-6 py-2.5 sm:py-4 font-['Press_Start_2P'] text-[7px] sm:text-[9px] uppercase transition-all duration-200 whitespace-nowrap flex-shrink-0",
                                                        "border-2 border-transparent",
                                                        activeTab === tab.id
                                                            ? "bg-[#111111] text-white shadow-[4px_4px_0_#CC0000] translate-x-[-2px] translate-y-[-2px]"
                                                            : "bg-white text-[#888888] hover:text-[#111111] hover:border-[#111111]"
                                                    )}
                                                >
                                                    {tab.label}
                                                </button>
                                            </Tabs.Trigger>
                                        ))}
                                    </div>
                                </Tabs.List>

                                <AnimatePresence>
                                    {showRightArrow && (
                                        <motion.button
                                            key="right-arrow"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            onClick={(e) => { e.preventDefault(); scroll("right"); }}
                                            className="absolute right-0 top-1/2 -translate-y-1/2 z-[100] p-1.5 sm:p-2 bg-[#CC0000] text-white border-2 border-white shadow-[2px_2px_0_#111111] hover:bg-[#B30000] transition-all active:scale-95 flex items-center justify-center rounded-sm"
                                            aria-label="Scroll derecha"
                                        >
                                            <ChevronRight size={20} className="sm:w-6 sm:h-6" strokeWidth={4} />
                                        </motion.button>
                                    )}
                                </AnimatePresence>

                                {/* Gradient hints for touch users */}
                                <div className={cn(
                                    "absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white via-white/40 to-transparent pointer-events-none z-10 transition-opacity duration-300",
                                    showLeftArrow ? "opacity-100" : "opacity-0"
                                )} />
                                <div className={cn(
                                    "absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white via-white/40 to-transparent pointer-events-none z-10 transition-opacity duration-300",
                                    showRightArrow ? "opacity-100" : "opacity-0"
                                )} />
                            </div>

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
                                            <TypeDefenses types={pokemon.types.map((t: any) => t.type.name)} />
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
                                            species={species}
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
                    currentId={pokemon.id}
                    currentTypes={pokemon.types.map((t: any) => t.type.name)}
                />
            </motion.main>
        </>
    )
}
