"use client"

import { useState } from "react"
import { notFound } from "next/navigation"
import { motion } from "framer-motion"

import { useAbility } from "@/lib/hooks/abilities/useAbilities"
import { usePokemonByAbility } from "@/lib/hooks/pokemon/usePokemonByAbility"
import { inferAbilityCategory } from "@/lib/utils/ability.utils"

import { PageTransitionAbility } from "@/components/shared/page-transitions/abilities/page-transition-ability"
import { AbilityDetailHero } from "@/components/abilities/ability-detail-hero"
import { AbilityEffectPanel } from "@/components/abilities/ability-effect-panel"
import { AbilityVersionHistory } from "@/components/abilities/ability-version-history"
import { AbilityPokemonTabs } from "@/components/abilities/ability-pokemon-tabs"
import { RelatedAbilitiesCarousel } from "@/components/abilities/related-abilities-carousel"

interface Props {
    params: { nameOrId: string }
}

export default function AbilityDetailPage({ params }: Props) {
    const { nameOrId } = params
    const { data: ability, isLoading, isError } = useAbility(nameOrId)
    const { data: organizedPokemon, isLoading: loadingPokemon } = usePokemonByAbility(nameOrId)

    if (isLoading) return <AbilityDetailSkeleton />
    if (isError || !ability) return notFound()

    const fullEffect = ability.effect_entries.find((e: any) => e.language.name === "es")?.effect ||
        ability.effect_entries.find((e: any) => e.language.name === "en")?.effect || ""

    const category = inferAbilityCategory(fullEffect) as any

    return (
        <>
            <PageTransitionAbility />

            <main className="min-h-screen bg-[#F8F8F8]">
                <AbilityDetailHero
                    ability={ability}
                    category={category}
                    isHidden={false}
                />

                <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
                    <AbilityEffectPanel
                        ability={ability}
                        typeColor="#111111"
                    />

                    <AbilityVersionHistory ability={ability} typeColor="#111111" />

                    <div className="h-1 bg-[#E0E0E0] w-full" />

                    <AbilityPokemonTabs
                        organizedPokemon={organizedPokemon}
                    />

                    <div className="h-1 bg-[#E0E0E0] w-full" />

                    <RelatedAbilitiesCarousel currentAbilityName={ability.name} />
                </div>
            </main>
        </>
    )
}

function AbilityDetailSkeleton() {
    return (
        <div className="min-h-screen bg-[#F8F8F8] animate-pulse">
            <div className="h-[400px] bg-[#111111] w-full" />
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12 space-y-12">
                <div className="h-64 bg-[#E0E0E0] rounded border-2 border-[#111111]" />
                <div className="h-96 bg-[#E0E0E0] rounded border-2 border-[#111111]" />
            </div>
        </div>
    )
}
