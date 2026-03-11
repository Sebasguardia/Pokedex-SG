import { useQuery } from "@tanstack/react-query"
import { getAbilityByIdOrName } from "../api/abilities"

export function usePokemonByAbility(nameOrId?: string) {
    const { data: ability, isLoading } = useQuery({
        queryKey: ["abilities", "detail", "pokemon", nameOrId],
        queryFn: () => getAbilityByIdOrName(nameOrId!),
        enabled: !!nameOrId
    })

    const organized = {
        slot1: [] as any[],
        slot2: [] as any[],
        hidden: [] as any[]
    }

    if (ability?.pokemon) {
        ability.pokemon.forEach((p: any) => {
            if (p.is_hidden) {
                organized.hidden.push(p.pokemon)
            } else if (p.slot === 1) {
                organized.slot1.push(p.pokemon)
            } else if (p.slot === 2) {
                organized.slot2.push(p.pokemon)
            }
        })
    }

    return {
        data: organized,
        isLoading
    }
}
