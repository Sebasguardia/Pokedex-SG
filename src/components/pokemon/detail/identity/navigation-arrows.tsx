import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { usePokemon } from "@/lib/hooks/pokemon/usePokemon"
import { formatPokemonId, formatPokemonName } from "@/lib/utils/pokemon.utils"
import { useQueryClient } from "@tanstack/react-query"
import { pokemonKeys } from "@/lib/constants/api/query-keys"
import { getPokemonByIdOrName, getPokemonSpecies } from "@/lib/api/pokemon"

interface Props {
    currentId?: number
    onNavigate: (dir: number) => void
}

function ArrowCard({ id, direction }: { id: number, direction: "prev" | "next" }) {
    const router = useRouter()
    const queryClient = useQueryClient()
    const { data } = usePokemon(id)

    const handleMouseEnter = () => {
        // Prefetch pokemon + species so navigating is instant
        if (!queryClient.getQueryData(pokemonKeys.detail(id))) {
            queryClient.prefetchQuery({
                queryKey: pokemonKeys.detail(id),
                queryFn: () => getPokemonByIdOrName(id),
                staleTime: Infinity
            })
        }
        if (!queryClient.getQueryData(pokemonKeys.species(id))) {
            queryClient.prefetchQuery({
                queryKey: pokemonKeys.species(id),
                queryFn: () => getPokemonSpecies(id),
                staleTime: Infinity
            })
        }
    }

    if (!data) return <div className="flex-1" />

    const sprite = data.sprites?.front_default
    const isPrev = direction === "prev"

    return (
        <motion.button
            onClick={() => router.push(`/pokemon/${id}`)}
            onMouseEnter={handleMouseEnter}
            className="flex-1 flex items-center justify-between gap-1 sm:gap-2 p-2 sm:p-3 border border-[#E0E0E0] min-w-0"
            style={{ flexDirection: isPrev ? "row" : "row-reverse" }}
            whileHover={{ borderColor: "#111111", boxShadow: "3px 3px 0 #111111" }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
            <motion.div whileHover={{ x: isPrev ? -3 : 3 }} transition={{ type: "spring", stiffness: 600 }} className="flex-shrink-0">
                {isPrev ? <ChevronLeft size={14} className="text-[#888888]" /> : <ChevronRight size={14} className="text-[#888888]" />}
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} className="flex-shrink-0">
                {sprite && (
                    <Image
                        src={sprite}
                        alt={data.name}
                        width={28}
                        height={28}
                        style={{ imageRendering: "pixelated" }}
                    />
                )}
            </motion.div>

            <div className={`flex flex-col ${isPrev ? "items-start" : "items-end"} min-w-0 overflow-hidden`}>
                <span className="font-['Nunito'] text-[11px] sm:text-[12px] text-[#111111] font-bold truncate block w-full">
                    {formatPokemonName(data.name)}
                </span>
                <span className="font-['JetBrains_Mono'] text-[9px] sm:text-[10px] text-[#888888]">
                    {formatPokemonId(id)}
                </span>
            </div>
        </motion.button>
    )
}

export function NavigationArrows({ currentId, onNavigate }: Props) {
    if (!currentId) return null

    return (
        <div className="flex gap-1.5 sm:gap-2 mb-4 w-full">
            {currentId > 1 ? (
                <ArrowCard id={currentId - 1} direction="prev" />
            ) : (
                <div className="flex-1" />
            )}
            {currentId < 1025 ? (
                <ArrowCard id={currentId + 1} direction="next" />
            ) : (
                <div className="flex-1" />
            )}
        </div>
    )
}
