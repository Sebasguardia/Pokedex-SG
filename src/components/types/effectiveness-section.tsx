"use client"

import { motion } from "framer-motion"
import { PokemonType } from "@/types/api/type.types"
import { EffectivenessChip } from "./effectiveness-chip"
import { Swords, Shield, TrendingUp, TrendingDown, Ban, ShieldAlert, ShieldCheck, ShieldOff } from "lucide-react"

interface Props {
    type: PokemonType
    typeColor: string
}

export function EffectivenessSection({ type, typeColor }: Props) {
    const typeNameES = type.names?.find(n => n.language.name === "es")?.name || type.name
    const attack = type.damage_relations
    const defense = type.damage_relations

    return (
        <motion.section
            className="py-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <div className="flex items-center gap-3 mb-4">
                <span className="w-3 h-3 block shrink-0" style={{ backgroundColor: typeColor }} />
                <h2 className="font-['Press_Start_2P'] text-[11px] text-[#111111]">EFECTIVIDADES</h2>
            </div>
            
            <div className="relative h-[5px] mb-3">
                <motion.div
                    className="absolute top-0 left-0 w-full h-[3px] bg-[#111111] origin-left"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                />
                 <motion.div
                    className="absolute bottom-0 right-0 w-full h-[2px] origin-right"
                    style={{ backgroundColor: typeColor }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                />
            </div>

            <p className="font-['Nunito'] text-[12px] text-[#888888] mb-8">
                Toda la tabla de debilidades y resistencias puras para el tipo {typeNameES}.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {/* COLUMNA: ATACA */}
                <div>
                    <div className="bg-[#111111] px-4 py-2.5 flex items-center gap-2 mb-4 relative" style={{ boxShadow: `3px 3px 0 ${typeColor}` }}>
                        <Swords size={14} className="text-white" />
                        <span className="font-['Nunito'] text-[12px] font-bold text-white uppercase">{typeNameES} ATACA A...</span>
                    </div>

                    <div className="bg-white border-2 border-[#111111] p-5 space-y-6" style={{ boxShadow: "3px 3px 0 #111111" }}>
                        <EffectivenessGroup
                            title="SÚPER EFECTIVO" multi="×2" icon={TrendingUp} color="#22C55E"
                            types={attack.double_damage_to} context="attack" multiplier={2} baseTypeColor={typeColor}
                        />
                        <EffectivenessGroup
                            title="NO MUY EFECTIVO" multi="×0.5" icon={TrendingDown} color="#F97316"
                            types={attack.half_damage_to} context="attack" multiplier={0.5} baseTypeColor={typeColor}
                        />
                        <EffectivenessGroup
                            title="NO AFECTA" multi="×0" icon={Ban} color="#111111"
                            types={attack.no_damage_to} context="attack" multiplier={0} baseTypeColor={typeColor}
                            emptyText="Este tipo no tiene inmunidades al atacar"
                        />
                    </div>
                </div>

                {/* COLUMNA: DEFIENDE */}
                <div>
                    <div className="bg-[#111111] px-4 py-2.5 flex items-center gap-2 mb-4 relative" style={{ boxShadow: `3px 3px 0 ${typeColor}` }}>
                        <Shield size={14} className="text-white" />
                        <span className="font-['Nunito'] text-[12px] font-bold text-white uppercase">CONTRA {typeNameES}...</span>
                    </div>

                    <div className="bg-white border-2 border-[#111111] p-5 space-y-6" style={{ boxShadow: "3px 3px 0 #111111" }}>
                        <EffectivenessGroup
                            title="VULNERABLE" multi="×2" icon={ShieldAlert} color="#DC2626"
                            types={defense.double_damage_from} context="defense" multiplier={2} baseTypeColor={typeColor}
                        />
                        <EffectivenessGroup
                            title="RESISTE" multi="×0.5" icon={ShieldCheck} color="#22C55E"
                            types={defense.half_damage_from} context="defense" multiplier={0.5} baseTypeColor={typeColor}
                        />
                        <EffectivenessGroup
                            title="INMUNE" multi="×0" icon={ShieldOff} color="#888888"
                            types={defense.no_damage_from} context="defense" multiplier={0} baseTypeColor={typeColor}
                            emptyText="Este tipo no tiene inmunidades defensivas"
                        />
                    </div>
                </div>
            </div>
        </motion.section>
    )
}

function EffectivenessGroup({ title, multi, icon: Icon, color, types, context, multiplier, baseTypeColor, emptyText }: any) {
    return (
        <div>
            <div className="flex items-center gap-2 mb-3">
                <Icon size={16} color={color} />
                <h3 className="font-['Press_Start_2P'] text-[8px]" style={{ color }}>{title}</h3>
            </div>

            <div className="flex flex-wrap gap-x-2 gap-y-3">
                {types && types.length > 0 ? (
                    types.map((t: any, idx: number) => (
                        <EffectivenessChip
                            key={t.name}
                            typeName={t.name}
                            multiplier={multiplier}
                            baseTypeColor={baseTypeColor}
                            context={context}
                            index={idx}
                        />
                    ))
                ) : (
                    <span className="font-['Nunito'] text-[12px] text-[#888888] italic">{emptyText || "Ninguno"}</span>
                )}
            </div>
        </div>
    )
}
