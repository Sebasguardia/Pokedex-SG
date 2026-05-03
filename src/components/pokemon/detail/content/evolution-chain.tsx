"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Star, RefreshCw, Heart, Sun, Moon, Zap } from "lucide-react"
import { formatPokemonName, formatPokemonId, getIdFromUrl } from "@/lib/utils/pokemon.utils"
import type { ChainLink, EvolutionDetail } from "@/types/api/evolution.types"
import { PokemonSprite } from "@/components/shared/pokemon/pokemon-sprite"
import { ITEMS_ES } from "@/lib/utils/locale.utils"

interface Props {
    chain?: ChainLink
    species?: any
    currentPokemonId?: number
    typeColor?: string
}

const REGIONAL_TAGS = ["alola", "galar", "hisui", "paldea"]

/** Detects if the current variety is a regional form */
function getRegionalContext(species: any, currentId?: number) {
    if (!species || !currentId) return null
    const currentVariety = species.varieties?.find((v: any) => getIdFromUrl(v.pokemon.url) === currentId)
    if (!currentVariety) return null
    
    const name = currentVariety.pokemon.name.toLowerCase()
    return REGIONAL_TAGS.find(tag => name.includes(tag)) || null
}

function getConditionLabel(detail: EvolutionDetail): { label: string; icon?: any; itemImage?: string; itemName?: string } | null {
    if (!detail) return null
    const { 
        trigger, min_level, item, min_happiness, time_of_day, known_move, 
        held_item, location, min_affection, needs_overworld_rain, 
        turn_upside_down, relative_physical_stats, min_beauty, trade_species,
        gender, known_move_type
    } = detail

    const triggerName = trigger?.name || ""
    
    // Support gender requirement
    const genderSuffix = gender === 1 ? " (Hembra)" : gender === 2 ? " (Macho)" : ""

    // Helper for item sprites using Serebii (reliable for Gen 8/9 items)
    const getItemSprite = (name: string) => {
        const serebiiId = name.toLowerCase().replace(/-/g, "")
        return `https://www.serebii.net/itemdex/sprites/${serebiiId}.png`
    }

    // Trade evolutions
    if (triggerName === "trade") {
        if (held_item) {
            const translatedName = ITEMS_ES[held_item.name] || held_item.name.replace(/-/g, " ")
            return { label: `Intercambio con ${translatedName}${genderSuffix}`, icon: RefreshCw, itemImage: getItemSprite(held_item.name), itemName: held_item.name }
        }
        if (trade_species) return { label: `Intercambio por ${formatPokemonName(trade_species.name)}${genderSuffix}`, icon: RefreshCw }
        return { label: `Intercambio${genderSuffix}`, icon: RefreshCw }
    }

    // Item evolutions
    if (triggerName === "use-item" && item) {
        const translatedName = ITEMS_ES[item.name] || item.name.replace(/-/g, " ")
        return {
            label: `${translatedName}${genderSuffix}`,
            itemImage: getItemSprite(item.name),
            itemName: item.name
        }
    }

    // Level up or other special conditions
    if (triggerName === "level-up" || triggerName === "other") {
        const t = time_of_day === "day" ? " (Día)" : time_of_day === "night" ? " (Noche)" : time_of_day === "evening" ? " (Atardecer)" : ""
        let parts = []

        if (min_level) parts.push(`Nv. ${min_level}`)
        if (min_happiness) parts.push(`Amistad${t}`)
        if (min_affection) parts.push(`Afecto${t}`)
        if (min_beauty) parts.push(`Belleza+`)
        if (known_move) parts.push(`Sabe ${formatPokemonName(known_move.name)}`)
        if (known_move_type) parts.push(`Mov. tipo ${formatPokemonName(known_move_type.name)}`)
        if (held_item) {
            const translatedName = ITEMS_ES[held_item.name] || held_item.name.replace(/-/g, " ")
            parts.push(`Con ${translatedName}`)
            return { label: `${parts.join(" + ")}${genderSuffix}`, itemImage: getItemSprite(held_item.name), itemName: held_item.name }
        }
        if (location) parts.push(`En ${formatPokemonName(location.name)}`)
        if (needs_overworld_rain) parts.push(`Lloviendo`)
        if (turn_upside_down) parts.push(`Girar consola`)
        
        if (relative_physical_stats === 1) parts.push(`Atq > Def`)
        else if (relative_physical_stats === -1) parts.push(`Def > Atq`)
        else if (relative_physical_stats === 0) parts.push(`Atq = Def`)

        // Gender check if no other parts
        if (parts.length === 0 && gender) {
            return { label: gender === 1 ? "Hembra" : "Macho", icon: Star }
        }

        // If no explicit conditions found but time
        if (parts.length === 0) {
            if (time_of_day === "day") return { label: `De día${genderSuffix}`, icon: Sun }
            if (time_of_day === "night") return { label: `De noche${genderSuffix}`, icon: Moon }
            if (time_of_day === "evening") return { label: `Al atardecer${genderSuffix}`, icon: Sun }
            return { label: `Subir nivel${genderSuffix}`, icon: Star }
        }

        const finalLabel = `${parts.join(" + ")}${genderSuffix}`
        
        let icon = Star
        if (min_happiness || min_affection) icon = Heart
        if (time_of_day === "day" || time_of_day === "evening") icon = Sun
        if (time_of_day === "night") icon = Moon
        if (known_move || known_move_type) icon = Zap

        return { label: finalLabel, icon }
    }

    return { label: triggerName.replace(/-/g, " "), icon: Star }
}

/** 
 * Identifies the regional context of an evolution branch.
 * ONLY returns non-null for Type 1 cases (where the base Pokémon also has a regional form).
 * Type 2 cases (only the evolution has a regional form) are handled via TYPE2_INJECTIONS.
 */
function getEvolutionRegion(childName: string, detail: EvolutionDetail, parentName: string): string | null {
    const detailStr = JSON.stringify(detail).toLowerCase()
    
    // 1. Explicit item/location markers in detail string
    for (const tag of REGIONAL_TAGS) {
        if (detailStr.includes(tag)) return tag
    }

    // 2. Known region-exclusive species (separate species, no regional suffix)
    if (["perrserker", "obstagoon", "sirfetchd", "mr-rime", "cursola", "runerigus"].includes(childName)) return "galar"
    if (["kleavor", "ursaluna", "basculegion", "sneasler", "overqwil", "enamorus", "wyrdeer"].includes(childName)) return "hisui"
    if (["clodsire"].includes(childName)) return "paldea"

    // 3. Type 1: Items that specifically produce Alolan forms (when the base also has Alola form)
    const item = detail.item?.name || ""
    // Ninetales-Alola: ice-stone (Vulpix-Alola is Type 1)
    if (childName === "ninetales" && item === "ice-stone") return "alola"
    // Raticate-Alola: night time evolution (Rattata-Alola is Type 1)
    if (childName === "raticate" && detail.time_of_day === "night") return "alola"

    // 4. Inheritance: If parent species is regional, child is same region
    for (const tag of REGIONAL_TAGS) {
        if (parentName.includes(`-${tag}`)) return tag
    }

    // 5. Special parent-specific cases
    if (parentName === "meowth" && detail.min_happiness) return "alola"
    if (parentName === "rockruff" && detail.time_of_day === "evening") return "dusk"

    return null
}

const TYPE1_FAMILIES: Record<string, string[]> = {
    "alola": ["rattata", "raticate", "sandshrew", "sandslash", "vulpix", "ninetales", "diglett", "dugtrio", "meowth", "persian", "geodude", "graveler", "golem", "grimer", "muk"],
    "galar": ["meowth", "perrserker", "ponyta", "rapidash", "slowpoke", "slowbro", "slowking", "farfetchd", "sirfetchd", "mr-mime", "mr-rime", "corsola", "cursola", "zigzagoon", "linoone", "obstagoon", "darumaka", "darmanitan", "yamask", "runerigus"],
    "hisui": ["growlithe", "arcanine", "voltorb", "electrode", "qwilfish", "overqwil", "sneasel", "sneasler", "zorua", "zoroark", "basculin", "basculegion", "rufflet", "braviary", "bergmite", "avalugg"],
    "paldea": ["wooper", "clodsire", "tauros"]
}

function hasType1Form(speciesName: string, region: string): boolean {
    const families = TYPE1_FAMILIES[region] || []
    return families.includes(speciesName)
}

/**
 * Table of "Type 2" regional evolutions:
 * These are Pokémon where ONLY the final evolution has a regional form (the base doesn't).
 * Instead of creating a separate FORMA diagram, these show as extra branches
 * alongside the original evolution in the main diagram.
 */
const TYPE2_INJECTIONS: Array<{
    parent: string, child: string, formName: string,
    trigger: string, item?: string, min_level?: number

}> = [
    // Alola
    { parent: "pikachu",   child: "raichu",   formName: "raichu-alola",    trigger: "use-item",  item: "thunder-stone" },
    { parent: "cubone",    child: "marowak",   formName: "marowak-alola",   trigger: "level-up",  min_level: 28 },
    { parent: "exeggcute", child: "exeggutor", formName: "exeggutor-alola", trigger: "use-item",  item: "leaf-stone" },
    // Galar
    { parent: "koffing",   child: "weezing",   formName: "weezing-galar",   trigger: "level-up",  min_level: 35 },
    // Hisui starters
    { parent: "quilava",   child: "typhlosion", formName: "typhlosion-hisui", trigger: "level-up", min_level: 36 },
    { parent: "dewott",    child: "samurott",   formName: "samurott-hisui",   trigger: "level-up", min_level: 36 },
    { parent: "dartrix",   child: "decidueye",  formName: "decidueye-hisui",  trigger: "level-up", min_level: 36 },
    // Other Hisui
    { parent: "rufflet",   child: "braviary",   formName: "braviary-hisui",   trigger: "level-up", min_level: 54 },
    { parent: "bergmite",  child: "avalugg",    formName: "avalugg-hisui",    trigger: "level-up", min_level: 37 },
    { parent: "petilil",   child: "lilligant",  formName: "lilligant-hisui",  trigger: "use-item", item: "sun-stone" },
]

/** Returns the specific form name (e.g. 'lycanroc-midday') if evolution details lead to a DIFFERENT FORM of the same species */
function getTargetFormName(speciesName: string, detail: EvolutionDetail): string | null {
    // Lycanroc forms (time-based) — 3 distinct forms, all from Rockruff
    if (speciesName === 'lycanroc') {
        const tod = detail.time_of_day
        if (tod === 'day') return 'lycanroc-midday'
        if (tod === 'night') return 'lycanroc-midnight'
        if (tod === 'evening' || tod === 'dusk') return 'lycanroc-dusk'
    }
    // Ninetales-Alola (ice-stone) — splits from Vulpix which IS also Type 1
    if (speciesName === 'ninetales' && detail.item?.name === 'ice-stone') return 'ninetales-alola'
    // Raticate-Alola (night) — splits from Rattata-Alola which IS also Type 1
    if (speciesName === 'raticate' && detail.time_of_day === 'night') return 'raticate-alola'
    return null
}

/** 
 * Checks if any descendant of `node` would produce a regional form branch via TYPE2_INJECTIONS.
 * Used as lookahead to include shared intermediates in regional chains.
 */
function hasRegionalDescendant(node: ChainLink, tag: string): boolean {
    for (const child of node.evolves_to) {
        const childName = child.species.name.toLowerCase()
        const parentName = node.species.name.toLowerCase()
        // Check regular evolution region
        for (const detail of child.evolution_details || []) {
            const region = getEvolutionRegion(childName, detail, parentName)
            if (region === tag) return true
            const formName = getTargetFormName(childName, detail)
            if (formName?.includes(tag)) return true
        }
        // Check TYPE2 injections (e.g., pikachu→raichu has raichu-alola injection)
        for (const inj of TYPE2_INJECTIONS) {
            if (inj.parent === parentName && inj.child === childName && inj.formName.includes(tag)) return true
        }
        if (hasRegionalDescendant(child, tag)) return true
    }
    return false
}


/** 
 * Splits an evolution chain link into multiple virtual sibling links 
 * AND FILTERS strictly by regional context.
 */
function splitEvolutionChain(node: ChainLink, regionalTag: string | null): ChainLink {
    if (!node.evolves_to || node.evolves_to.length === 0) return { ...node }

    const newEvolvesTo: ChainLink[] = []

    for (const child of node.evolves_to) {
        const childName = child.species.name.toLowerCase()
        const parentName = node.species.name.toLowerCase()
        
        // Handle branches with NO details (e.g. Dipplin/Hydrapple in some API versions)
        if (child.evolution_details?.length === 0) {
            if (!regionalTag) {
                let fallbackDetails: EvolutionDetail[] = []
                if (childName === "dipplin") {
                    fallbackDetails = [{ trigger: { name: "use-item", url: "" }, item: { name: "syrupy-apple", url: "" } } as any]
                } else if (childName === "hydrapple") {
                    fallbackDetails = [{ trigger: { name: "level-up", url: "" }, known_move: { name: "dragon-cheer", url: "" } } as any]
                }
                newEvolvesTo.push(splitEvolutionChain({ ...child, evolution_details: fallbackDetails }, regionalTag))
            }
            continue
        }

        const explicitDetailsForRegion = (child.evolution_details || []).filter(d => getEvolutionRegion(childName, d, parentName) === regionalTag)

        // Filter details by regional context
        const validDetails = (child.evolution_details || []).filter(detail => {
            const branchRegion = getEvolutionRegion(childName, detail, parentName)
            if (regionalTag) {
                if (branchRegion === regionalTag) return true
                // If it's a Type 1 family, and this branch is "normal" (null), include it ONLY if there's no explicit regional branch
                if (branchRegion === null && hasType1Form(childName, regionalTag) && explicitDetailsForRegion.length === 0) return true
                return false
            } else {
                return branchRegion === null
            }
        })

        // LOOKAHEAD: shared intermediary stage (e.g. Pikachu in Alola context due to Type 2 injection)
        if (validDetails.length === 0 && regionalTag && hasRegionalDescendant(child, regionalTag)) {
            newEvolvesTo.push(splitEvolutionChain({ ...child, evolution_details: child.evolution_details || [] }, regionalTag))
            continue
        }

        if (validDetails.length === 0) continue

        // Group details by specific form (e.g. Lycanroc midday vs midnight)
        const formGroups: Record<string, EvolutionDetail[]> = {}
        for (const detail of validDetails) {
            const formName = getTargetFormName(childName, detail) || '__default__'
            if (!formGroups[formName]) formGroups[formName] = []
            formGroups[formName].push(detail)
        }

        // Create one branch per form group
        for (const formName of Object.keys(formGroups)) {
            const details = formGroups[formName]
            let formOverride = formName !== '__default__' ? formName : undefined

            // If we are in a regional diagram, and this is a Type 1 species without a specific override, force it!
            if (!formOverride && regionalTag && hasType1Form(childName, regionalTag)) {
                formOverride = `${childName}-${regionalTag}`
            }

            newEvolvesTo.push(splitEvolutionChain({
                ...child,
                evolution_details: details,
                ...(formOverride ? { _formOverride: formOverride } : {})
            } as any, regionalTag))
        }

        // TYPE 2 INJECTIONS (null context only): add extra regional form branches inline
        if (!regionalTag) {
            for (const inj of TYPE2_INJECTIONS) {
                if (inj.parent === parentName && inj.child === childName) {
                    const injDetail = {
                        trigger: { name: inj.trigger, url: "" },
                        ...(inj.item ? { item: { name: inj.item, url: "" } } : {}),
                        ...(inj.min_level ? { min_level: inj.min_level } : {})
                    } as any
                    newEvolvesTo.push(splitEvolutionChain({
                        ...child,
                        evolution_details: [injDetail],
                        _formOverride: inj.formName
                    } as any, null))
                }
            }
        }
    }

    return { ...node, evolves_to: newEvolvesTo }
}

import { useEffect, useState } from "react"

// Simple module-level cache for variety IDs
const varietyCache: Record<string, { id: number; name: string }> = {}

function PokemonCard({ node, currentPokemonId, index, typeColor = "#CC0000", regionalTag }: { node: ChainLink; currentPokemonId?: number; index: number; typeColor?: string; regionalTag: string | null }) {
    const speciesId = getIdFromUrl(node.species.url)
    const isCurrent = speciesId === currentPokemonId
    
    const [resolvedId, setResolvedId] = useState(speciesId)
    const [resolvedName, setResolvedName] = useState(node.species.name)
    const [isLoading, setIsLoading] = useState(false)

    // Form override from splitEvolutionChain (e.g. lycanroc-midday, raichu-alola)
    const formOverride: string | undefined = (node as any)._formOverride

    // Resolve the variety name: use formOverride > regional heuristic > species name
    const varietyName = formOverride
        ? formOverride
        : (regionalTag && !node.species.name.toLowerCase().includes(regionalTag)) 
            ? `${node.species.name}-${regionalTag}` 
            : node.species.name

    useEffect(() => {
        // If it's already the current Pokémon, we already have the correct ID (from currentPokemonId prop)
        if (isCurrent && currentPokemonId) {
            setResolvedId(currentPokemonId)
        }

        // Only need to resolve if it's a known form override or potentially a regional variant
        if (!formOverride && !regionalTag && !node.species.name.includes("-") && !isCurrent) return

        const targetName = varietyName.toLowerCase()
        
        // Check cache first
        if (varietyCache[targetName]) {
            setResolvedId(varietyCache[targetName].id)
            setResolvedName(varietyCache[targetName].name)
            return
        }

        async function resolveVariety() {
            setIsLoading(true)
            try {
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${targetName}`)
                if (!res.ok) throw new Error("Not found")
                const data = await res.json()
                
                varietyCache[targetName] = { id: data.id, name: data.name }
                setResolvedId(data.id)
                setResolvedName(data.name)
            } catch (err) {
                // Fallback to species
                varietyCache[targetName] = { id: speciesId, name: node.species.name }
            } finally {
                setIsLoading(false)
            }
        }

        resolveVariety()
    }, [varietyName, speciesId, isCurrent, currentPokemonId, regionalTag, node.species.name])

    const displayId = resolvedId
    const displayName = resolvedName

    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 280, damping: 22 }}
            className="flex flex-col items-center gap-2"
        >
            <Link href={`/pokemon/${displayId}`} className="flex flex-col items-center gap-2 group relative">
                {isCurrent && (
                    <div 
                        className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#111111] text-white px-2 py-0.5 rounded-sm font-['Press_Start_2P'] text-[6px] tracking-wider z-10 whitespace-nowrap"
                        style={{ boxShadow: `2px 2px 0 ${typeColor}` }}
                    >
                        ACTUAL
                    </div>
                )}
                <motion.div
                    className="flex items-center justify-center relative overflow-hidden"
                    style={{
                        width: 72, height: 72,
                        backgroundColor: isCurrent ? `${typeColor}15` : "#FFFFFF",
                        border: isCurrent ? `3px solid ${typeColor}` : "3px solid #111111",
                        boxShadow: isCurrent ? `2px 2px 0 ${typeColor}40` : "2px 2px 0 rgba(17,17,17,0.15)",
                        borderRadius: "8px"
                    }}
                    whileHover={{ 
                        scale: 1.05, 
                        borderColor: "#111111", 
                        boxShadow: "4px 4px 0 #111111",
                        backgroundColor: "#FFFFFF" 
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                    <div className="absolute inset-0 opacity-10 pointer-events-none" 
                         style={{ backgroundImage: "radial-gradient(#111 1px, transparent 1px)", backgroundSize: "8px 8px" }} />
                    <PokemonSprite
                        id={displayId}
                        name={displayName}
                        size={52}
                    />
                    {isLoading && (
                        <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
                            <RefreshCw size={16} className="animate-spin text-[#111111]" />
                        </div>
                    )}
                </motion.div>
                <div className="flex flex-col items-center text-center mt-1">
                    <span className="font-['Press_Start_2P'] text-[8px] text-[#A0A0A0] leading-none mb-1">
                        {formatPokemonId(speciesId)}
                    </span>
                    <span 
                        className="font-['Nunito'] text-[14px] font-black capitalize transition-colors"
                        style={{ color: isCurrent ? typeColor : "#111111" }}
                    >
                        {formatPokemonName(displayName)}
                    </span>
                </div>
            </Link>
        </motion.div>
    )
}

function EvolutionArrow({ details }: { details: EvolutionDetail[] }) {
    if (!details || details.length === 0) return (
        <div className="px-6 sm:px-10 flex-shrink-0 flex items-center justify-center">
            <ArrowRight size={28} className="text-[#111111] opacity-30" strokeWidth={3} />
        </div>
    )
    
    // Support multiple conditions (e.g. trade + item)
    const conditions = details.map(getConditionLabel).filter(Boolean) as Array<{ label: string; icon?: any; itemImage?: string; itemName?: string }>

    return (
        <div className="flex flex-col items-center justify-center gap-1 px-1 sm:px-1.5 flex-shrink-0 min-w-[65px] sm:min-w-[85px]">
            <motion.div 
                initial={{ x: -3, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}
            >
                <ArrowRight size={28} className="text-[#111111]" strokeWidth={4} />
            </motion.div>
            <div className="flex flex-col gap-2 items-center">
                {conditions.map((c, i) => {
                    const box = (
                        <div 
                            className={`flex items-center gap-2 border-2 border-[#111111] px-4 py-2 bg-white relative transition-all duration-200 ${c.itemName ? "group cursor-pointer hover:-translate-y-1 hover:shadow-[4px_4px_0_#CC0000]" : ""}`}
                            style={{ boxShadow: "2px 2px 0 #111111" }}
                        >
                            {c.itemImage ? (
                                <img src={c.itemImage} alt="item" width={28} height={28} style={{ imageRendering: "pixelated" }} className="drop-shadow-sm" />
                            ) : c.icon ? (
                                <c.icon size={16} className="text-[#111111]" strokeWidth={2.5} />
                            ) : null}
                            <span className={`font-['Nunito'] text-[11px] font-black uppercase tracking-widest ${c.itemName ? "text-[#111111] group-hover:text-[#CC0000]" : "text-[#111111]"}`}>
                                {c.label}
                            </span>
                        </div>
                    )

                    return c.itemName ? (
                        <Link key={i} href={`/items/${c.itemName}`}>
                            {box}
                        </Link>
                    ) : (
                        <div key={i}>{box}</div>
                    )
                })}
            </div>
        </div>
    )
}

/** Renders the evolution chain as a branching recursive tree */
function RecursiveChain({ node, details, currentPokemonId, typeColor, regionalTag }: { node: ChainLink; details?: EvolutionDetail[]; currentPokemonId?: number; typeColor?: string; regionalTag: string | null }) {
    const hasChildren = node.evolves_to.length > 0

    return (
        <div className="flex items-center flex-nowrap h-full">
            {details && details.length > 0 && <EvolutionArrow details={details} />}
            <PokemonCard 
                node={node} 
                currentPokemonId={currentPokemonId} 
                index={0} 
                typeColor={typeColor} 
                regionalTag={regionalTag} 
            />
            
            {hasChildren && (
                <div className="flex flex-col justify-center gap-8 relative pl-8 ml-2">
                    {/* Vertical connecting line for siblings */}
                    {node.evolves_to.length > 1 && (
                        <div className="absolute left-0 top-6 bottom-6 w-[2px] bg-[#E0E0E0]/60 border-dashed" />
                    )}
                    
                    {node.evolves_to.map((child, i) => (
                        <div key={`${child.species.name}-${i}`} className="relative">
                            {/* Horizontal connector from parent to child branch */}
                            <div className="absolute top-1/2 -left-8 w-8 h-[2px] bg-[#E0E0E0]/60 border-dashed" />
                            <RecursiveChain 
                                node={child} 
                                details={child.evolution_details} 
                                currentPokemonId={currentPokemonId} 
                                typeColor={typeColor} 
                                regionalTag={regionalTag}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export function EvolutionChain({ chain, species, currentPokemonId, typeColor }: Props) {
    if (!chain) return (
        <div className="py-8 text-center font-['Nunito'] text-[13px] text-[#888888] italic">
            Cargando cadena de evolución...
        </div>
    )

    // Find all regional tags present anywhere in the chain by traversing and using getEvolutionRegion
    const getChainRegions = (node: ChainLink, regions: Set<string | null> = new Set()): Set<string | null> => {
        const name = node.species.name.toLowerCase()
        
        // Check if this species itself is a regional form
        const selfTag = REGIONAL_TAGS.find(t => name.includes(`-${t}`)) || null
        if (selfTag) regions.add(selfTag)
        
        // Manual tags for region-exclusive species without regional suffix
        if (["perrserker", "obstagoon", "sirfetchd", "mr-rime", "cursola", "runerigus"].includes(name)) regions.add("galar")
        if (["kleavor", "ursaluna", "basculegion", "sneasler", "overqwil", "enamorus", "wyrdeer"].includes(name)) regions.add("hisui")
        if (["clodsire"].includes(name)) regions.add("paldea")

        // Check if this base species is part of a Type 1 family
        for (const tag of REGIONAL_TAGS) {
            if (hasType1Form(name, tag)) regions.add(tag)
        }

        // Check each child's evolution details for regional context
        node.evolves_to.forEach(child => {
            const childName = child.species.name.toLowerCase()
            child.evolution_details?.forEach(d => {
                const region = getEvolutionRegion(childName, d, name)
                if (region) regions.add(region)
            })
            // Check manual TYPE2 injections (not directly adding regions, they go to normal tree)
            // But actually we DON'T add a new region for TYPE 2, because they are injected inline into the normal tree!
            // Wait: we already removed Pikachu manual injection, so we are good.
            
            // Also check if child has no details but is a known regional skip
            if (!child.evolution_details?.length) {
                regions.add(null) // will be in the normal tree via fallback
            }
            getChainRegions(child, regions)
        })
        
        return regions
    }

    const chainRegions = getChainRegions(chain)
    // Always ensure null (original) is included
    chainRegions.add(null)
    
    const allRegions = Array.from(chainRegions).sort((a, b) => {
        if (a === null) return -1
        if (b === null) return 1
        return a.localeCompare(b)
    })

    // Prepare a list of evolution diagrams to show
    const diagrams = allRegions.map((tag) => {
        // Build this specific regional tree
        // If it's a Type 1 family, force the base pokemon to its regional form
        const isBaseType1 = tag && hasType1Form(chain.species.name, tag)
        const regionalRoot = {
            ...chain,
            ...(isBaseType1 ? { _formOverride: `${chain.species.name}-${tag}` } : {})
        } as ChainLink
        
        // Split and filter the chain according to this context
        const rootChain = splitEvolutionChain(regionalRoot, tag)
        
        return {
            id: tag || "original",
            name: tag ? `FORMA ${tag.toUpperCase()}` : "FORMA ORIGINAL",
            tag,
            chain: rootChain,
            isCurrent: false // We'll handle highlighting in recursive chain
        }
    })

    const showHeaders = diagrams.length > 1

    return (
        <div className="mt-2 flex flex-col gap-8">
            <style jsx>{`
                .evolution-scroll::-webkit-scrollbar {
                    height: 12px;
                }
                .evolution-scroll::-webkit-scrollbar-track {
                    background: #F0F0F0;
                    border-radius: 10px;
                }
                .evolution-scroll::-webkit-scrollbar-thumb {
                    background: #111111;
                    border-radius: 10px;
                    border: 3px solid #F0F0F0;
                }
                .evolution-scroll::-webkit-scrollbar-thumb:hover {
                    background: #CC0000;
                }
            `}</style>
            
            {diagrams.map((diag: any) => {
                const hasEvolutions = diag.chain.evolves_to.length > 0
                
                return (
                    <div key={diag.id} className="flex flex-col gap-4">
                        {showHeaders && (
                            <div className="flex items-center gap-4 px-4 sm:px-8">
                                <div className="h-[2px] flex-grow bg-[#E0E0E0]" />
                                <span className="font-['Press_Start_2P'] text-[7px] text-[#A0A0A0] uppercase tracking-[0.2em]">
                                    {diag.tag ? `FORMA ${diag.tag}` : "FORMA ORIGINAL"}
                                </span>
                                <div className="h-[2px] flex-grow bg-[#E0E0E0]" />
                            </div>
                        )}

                        <div 
                            className="w-full relative overflow-x-auto overflow-y-hidden evolution-scroll"
                            style={{ 
                                backgroundColor: "#FFFFFF", 
                                border: "3px solid #111111", 
                                boxShadow: "12px 12px 0 rgba(0,0,0,0.1)", 
                                borderRadius: "24px", 
                                margin: "16px 0"
                            }}
                        >
                            <div className="w-max min-w-full h-full flex items-center justify-center p-8 lg:p-12">
                                {hasEvolutions ? (
                                    <RecursiveChain 
                                        node={diag.chain} 
                                        currentPokemonId={currentPokemonId} 
                                        typeColor={typeColor} 
                                        regionalTag={diag.tag} 
                                    />
                                ) : (
                                    <div className="flex flex-col items-center gap-4 py-4">
                                        <PokemonCard node={diag.chain} currentPokemonId={currentPokemonId} index={0} regionalTag={diag.tag} />
                                        <p className="font-['Nunito'] text-[13px] text-[#888888] italic">No tiene evoluciones en esta forma</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
