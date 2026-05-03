"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Nature } from "@/types/api/nature.types";
import {
    NatureMeta, FLAVOR_COLORS, FLAVOR_NAMES_ES,
    BERRIES_BY_FLAVOR, FLAVOR_STAT_RELATION, STAT_NAMES_ES,
} from "@/lib/constants/natures/natures.constants";

interface NatureFlavorPanelProps {
    nature: Nature;
    meta: NatureMeta;
}

function FlavorCard({
    flavorKey, label, relation, berries, isLike, primaryColor,
}: {
    flavorKey: string;
    label: string;
    relation: string;
    berries: { name: string; nameEs: string; id: number }[];
    isLike: boolean;
    primaryColor: string;
}) {
    const color = FLAVOR_COLORS[flavorKey];

    return (
        <motion.div
            className="relative border-2 border-[#111111] bg-white flex-1 min-w-[260px]"
            style={{ boxShadow: isLike ? `4px 4px 0 ${color}` : "4px 4px 0 #CC0000" }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: isLike ? 0 : 0.1 }}
        >
            {/* Etiqueta flotante */}
            <div
                className="absolute top-[-14px] left-4 px-3 py-1"
                style={{ backgroundColor: isLike ? color : "#CC0000" }}
            >
                <span className="font-nunito font-bold text-[11px] text-white uppercase">
                    {isLike ? "Le Gusta" : "Detesta"}
                </span>
            </div>

            {/* Franja lateral */}
            <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ backgroundColor: color }} />

            <div className="pl-5 pr-4 pt-5 pb-4">
                {/* Nombre del sabor */}
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 border-2 border-[#111111] flex items-center justify-center" style={{ backgroundColor: `${color}22` }}>
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                    </div>
                    <div>
                        <p className="font-press-start text-[13px]" style={{ color }}>{label.toUpperCase()}</p>
                        <p className="font-nunito text-[12px] text-[#888888] mt-0.5">
                            Relacionado con: {STAT_NAMES_ES[relation] ?? relation}
                        </p>
                    </div>
                </div>

                <p className="font-nunito text-[13px] text-[#555555] leading-relaxed mb-4">
                    {isLike
                        ? `El Pokémon preferirá alimentos con sabor ${FLAVOR_NAMES_ES[flavorKey].toLowerCase()}. Aumenta su disposición en concursos y Pokéblocks.`
                        : `El Pokémon rechazará alimentos con sabor ${FLAVOR_NAMES_ES[flavorKey].toLowerCase()}. Comer este sabor puede reducir su amistad.`
                    }
                </p>

                {/* Bayas */}
                <div>
                    <p className="font-press-start text-[9px] text-[#888888] mb-3 uppercase">
                        {isLike ? "Bayas que le gustan:" : "Bayas a evitar:"}
                    </p>
                    <div className="flex flex-col gap-2">
                        {berries.map((berry) => (
                            <Link key={berry.name} href={`/berries/${berry.name}`}>
                                <motion.div
                                    className="flex items-center gap-3 border border-[#E0E0E0] bg-[#FAFAFA] px-3 py-2"
                                    whileHover={{ borderColor: color, backgroundColor: `${color}0A`, x: 2 }}
                                    transition={{ duration: 0.15 }}
                                >
                                    <Image
                                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/berries/${berry.name}-berry.png`}
                                        alt={berry.nameEs}
                                        width={28} height={28}
                                        className="object-contain shrink-0"
                                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                                    />
                                    <span className="font-nunito font-bold text-[13px] text-[#111111] flex-1">{berry.nameEs}</span>
                                    <ChevronRight size={13} style={{ color }} />
                                </motion.div>
                            </Link>
                        ))}
                    </div>

                    <Link href={`/berries?flavor=${flavorKey}`}>
                        <motion.div
                            className="mt-3 flex items-center gap-2 border-2 border-[#111111] px-4 py-2.5 justify-center font-press-start text-[9px] bg-white"
                            style={{ boxShadow: `2px 2px 0 ${color}` }}
                            whileHover={{ x: 2, y: 2, boxShadow: "0px 0px 0 transparent" }}
                        >
                            <span style={{ color }}>Ver todas las bayas {label.toLowerCase()}s</span>
                            <ChevronRight size={11} style={{ color }} />
                        </motion.div>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}

export function NatureFlavorPanel({ nature, meta }: NatureFlavorPanelProps) {
    return (
        <section>
            <div className="flex items-center gap-4 mb-6">
                <h2 className="font-press-start text-[14px] uppercase tracking-tighter text-[#111111] whitespace-nowrap">
                    Sabores y Bayas
                </h2>
                <div className="h-px bg-[#E0E0E0] flex-1" />
            </div>

            {meta.isNeutral ? (
                <div
                    className="border-2 border-[#E0E0E0] p-8 text-center"
                    style={{ boxShadow: "4px 4px 0 #E0E0E0" }}
                >
                    <p className="font-press-start text-[11px] text-[#888888] mb-3">SIN PREFERENCIAS</p>
                    <p className="font-nunito text-[15px] text-[#888888] mb-2">
                        Esta naturaleza no tiene preferencias de sabor.
                    </p>
                    <p className="font-nunito text-[14px] text-[#AAAAAA]">
                        Puede comer cualquier Pokéblock o Poffin sin penalización en concursos.
                    </p>
                </div>
            ) : (
                <div className="flex flex-col gap-5">
                    {/* Cards de sabor */}
                    <div className="flex gap-5 flex-wrap">
                        {meta.likesFlavor && (
                            <FlavorCard
                                flavorKey={meta.likesFlavor}
                                label={FLAVOR_NAMES_ES[meta.likesFlavor]}
                                relation={FLAVOR_STAT_RELATION[meta.likesFlavor]}
                                berries={BERRIES_BY_FLAVOR[meta.likesFlavor] ?? []}
                                isLike={true}
                                primaryColor={FLAVOR_COLORS[meta.likesFlavor]}
                            />
                        )}
                        {meta.hatesFlavor && (
                            <FlavorCard
                                flavorKey={meta.hatesFlavor}
                                label={FLAVOR_NAMES_ES[meta.hatesFlavor]}
                                relation={FLAVOR_STAT_RELATION[meta.hatesFlavor]}
                                berries={BERRIES_BY_FLAVOR[meta.hatesFlavor] ?? []}
                                isLike={false}
                                primaryColor={FLAVOR_COLORS[meta.hatesFlavor]}
                            />
                        )}
                    </div>

                    {/* Nota informativa */}
                    <motion.div
                        className="border-l-4 bg-[#111111] px-5 py-4"
                        style={{ borderColor: meta.likesFlavor ? FLAVOR_COLORS[meta.likesFlavor] : "#888888" }}
                        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                    >
                        <p className="font-nunito text-[13px] text-white/70 leading-relaxed">
                            La relación sabor-naturaleza también afecta el consumo de bayas en batalla.
                            Cuando un Pokémon come una baya de su sabor favorito con poca salud,
                            su efecto puede verse potenciado dependiendo del juego.
                        </p>
                    </motion.div>
                </div>
            )}
        </section>
    );
}