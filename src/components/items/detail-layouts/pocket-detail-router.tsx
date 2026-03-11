"use client"
// Refreshing module imports

import { MedicineDetailLayout } from "@/components/items/detail-layouts/medicine-detail-layout"
import { PokeballDetailLayout } from "@/components/items/detail-layouts/pokeball-detail-layout"
import { BattleDetailLayout } from "@/components/items/detail-layouts/battle-detail-layout"
import { BerryDetailLayout } from "@/components/items/detail-layouts/berry-detail-layout"
import { MailDetailLayout } from "@/components/items/detail-layouts/mail-detail-layout"
import { MachineDetailLayout } from "@/components/items/detail-layouts/machine-detail-layout"
import { KeyItemDetailLayout } from "@/components/items/detail-layouts/key-item-detail-layout"
import { MiscDetailLayout } from "@/components/items/detail-layouts/misc-detail-layout"

interface Props {
    pocket: string
    item: any
    heldPokemon: any[]
}

export function PocketDetailRouter({ pocket, item, heldPokemon }: Props) {
    switch (pocket) {
        case "medicine":
            return <MedicineDetailLayout item={item} heldPokemon={heldPokemon} pocket={pocket} />
        case "pokeballs":
            return <PokeballDetailLayout item={item} heldPokemon={heldPokemon} pocket={pocket} />
        case "battle":
            return <BattleDetailLayout item={item} heldPokemon={heldPokemon} pocket={pocket} />
        case "berries":
            return <BerryDetailLayout item={item} heldPokemon={heldPokemon} pocket={pocket} />
        case "mail":
            return <MailDetailLayout item={item} heldPokemon={heldPokemon} pocket={pocket} />
        case "machines":
            return <MachineDetailLayout item={item} heldPokemon={heldPokemon} pocket={pocket} />
        case "key":
            return <KeyItemDetailLayout item={item} heldPokemon={heldPokemon} pocket={pocket} />
        default:
            return <MiscDetailLayout item={item} heldPokemon={heldPokemon} pocket={pocket} />
    }
}
