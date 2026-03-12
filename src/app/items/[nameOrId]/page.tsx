"use client"

import { useItem } from "@/lib/hooks/useItem"
import { usePokemonByHeldItem } from "@/lib/hooks/usePokemonByHeldItem"
import { inferItemPocket } from "@/lib/utils/item.utils"
import { PocketDetailRouter } from "@/components/items/detail/layouts/pocket-detail-router"
import { PageTransitionItem } from "@/components/shared/page-transition-item"
import { POCKET_COLORS } from "@/lib/constants/items.constants"
import { Loader2 } from "lucide-react"
import { useSearchParams } from "next/navigation"

interface Props {
    params: { nameOrId: string }
}

export default function ItemDetailPage({ params }: Props) {
    const { data: item, isLoading, isError } = useItem(params.nameOrId)
    const { data: heldPokemon } = usePokemonByHeldItem(item?.name)
    const searchParams = useSearchParams()

    if (isLoading) return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-white">
            <Loader2 className="animate-spin text-[#CC0000]" size={48} />
            <span className="font-press-start text-[8px] text-[#888888] animate-pulse">
                ACCEDIENDO A LA BASE DE DATOS DE OBJETOS...
            </span>
        </div>
    )

    if (isError || !item) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-4">
            <div className="w-20 h-20 bg-[#F2F2F2] border-2 border-[#111111] shadow-[4px_4px_0_#111111] flex items-center justify-center mb-6">
                <span className="text-4xl text-[#888888]">?</span>
            </div>
            <h1 className="font-press-start text-sm text-[#111111] mb-2 uppercase">OBJETO NO ENCONTRADO</h1>
            <p className="font-nunito text-[#888888]">No pudimos localizar este objeto en los registros.</p>
        </div>
    )

    // Use the origin pocket passed via ?from=<pocket> (set when the user clicks a card
    // from a specific section). Fall back to API inference only if not present.
    const fromPocket = searchParams.get("from") || null
    const pocket = fromPocket ?? inferItemPocket(item)
    const colorConfig = POCKET_COLORS[pocket as keyof typeof POCKET_COLORS] || POCKET_COLORS.misc

    return (
        <>
            <PageTransitionItem
                spriteSrc={item.sprites?.default}
                pocketAccent={colorConfig.acento}
            />
            <PocketDetailRouter pocket={pocket} item={item} heldPokemon={heldPokemon || []} />
        </>
    )
}
