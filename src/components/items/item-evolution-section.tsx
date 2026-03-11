"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Sparkles, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils/cn"

interface Props {
    item: any
}

export function ItemEvolutionSection({ item }: Props) {
    // This is a simplified version. A real implementation would need to cross-ref
    // which pokemon evolve with this specific item. 
    // For now, we'll implement the UI structure and a message if no data is found.

    return (
        <section className="space-y-6">
            <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-[#A855F7]" />
                <h3 className="font-press-start text-[10px] text-[#111111] uppercase tracking-wider">
                    EVOLUCIONES RELACIONADAS
                </h3>
            </div>

            <div className="p-8 border-2 border-[#111111] bg-[#F9FAFB] shadow-[4px_4px_0_#A855F7] flex flex-col items-center justify-center text-center">
                <p className="font-nunito text-[14px] text-[#888888] italic mb-4">
                    Este objeto es fundamental para activar el proceso de evolución en ciertos Pokémon.
                </p>

                {/* Evolution Example (Mockup for now as API cross-ref is complex) */}
                <div className="flex items-center gap-4 sm:gap-8">
                    <div className="flex flex-col items-center gap-1">
                        <div className="w-16 h-16 bg-white border border-[#E0E0E0] rounded-lg p-1">
                            <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png`} alt="Base" width={64} height={64} />
                        </div>
                        <span className="font-nunito font-bold text-[11px] text-[#111111]">Eevee</span>
                    </div>

                    <ArrowRight className="text-[#888888]" size={16} />

                    <div className="flex flex-col items-center gap-1">
                        <div className="w-12 h-12 bg-white border-2 border-[#111111] shadow-[2px_2px_0_#111111] p-1 flex items-center justify-center">
                            <Image src={item.sprites?.default || "/placeholder-item.png"} alt="Item" width={32} height={32} style={{ imageRendering: "pixelated" }} />
                        </div>
                        <span className="font-jetbrains text-[9px] text-[#A855F7] font-bold">USAR</span>
                    </div>

                    <ArrowRight className="text-[#888888]" size={16} />

                    <div className="flex flex-col items-center gap-1">
                        <div className="w-16 h-16 bg-white border-2 border-[#A855F7] rounded-lg p-1 shadow-[2px_2px_0_#A855F7]">
                            <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/135.png`} alt="Evo" width={64} height={64} />
                        </div>
                        <span className="font-nunito font-bold text-[11px] text-[#A855F7]">Jolteon</span>
                    </div>
                </div>

                <div className="mt-8 flex flex-wrap justify-center gap-2">
                    <span className="px-2 py-1 bg-[#F2F2F2] border border-[#E0E0E0] font-nunito text-[10px] text-[#888888]">
                        Piedras Evolutivas
                    </span>
                    <span className="px-2 py-1 bg-[#F2F2F2] border border-[#E0E0E0] font-nunito text-[10px] text-[#888888]">
                        Intercambio con Objeto
                    </span>
                </div>
            </div>
        </section>
    )
}
