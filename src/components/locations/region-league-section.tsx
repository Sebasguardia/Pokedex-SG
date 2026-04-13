"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Shield, Swords, MapPin, Target } from "lucide-react";
import { REGION_GYM_LEADERS, REGION_ELITE, GymLeader, EliteMember } from "@/lib/constants/region-lore.constants";
import { GYM_LEADER_SPRITES, BADGE_IMAGES, ELITE_SPRITES } from "@/lib/constants/region-assets.constants";
import Image from "next/image";

interface RegionLeagueSectionProps {
    regionName: string;
    regionColor: string;
}

function TypeBadge({ type, color }: { type: string; color: string }) {
    if (!type || type === "Mixto") {
        return (
            <span
                className="font-['Press_Start_2P'] text-[7px] px-2 py-1 text-white border-2 border-[#111111] whitespace-nowrap bg-[#333333]"
            >
                MIXTO
            </span>
        );
    }
    return (
        <span
            className="font-['Press_Start_2P'] text-[7px] px-2 py-1 text-white whitespace-nowrap"
            style={{ backgroundColor: color }}
        >
            {type.toUpperCase()}
        </span>
    );
}

function GymLeaderCard({ leader, index, regionColor }: { leader: GymLeader; index: number; regionColor: string }) {
    const leaderSprite = leader.spriteKey ? GYM_LEADER_SPRITES[leader.spriteKey as keyof typeof GYM_LEADER_SPRITES] : "";
    const badgeImage = leader.badgeKey ? BADGE_IMAGES[leader.badgeKey as keyof typeof BADGE_IMAGES] : "";

    return (
        <motion.div
            className="group border-[3px] border-[#111111] bg-white flex flex-col sm:flex-row h-full relative overflow-hidden"
            style={{ boxShadow: "4px 4px 0 #111111" }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, type: "spring", stiffness: 260, damping: 22 }}
            whileHover={{ x: -2, y: -2, boxShadow: `6px 6px 0 ${regionColor}` }}
        >
            {/* Left Area: Visuals (Sprite, Badge) */}
            <div className="w-full sm:w-[150px] shrink-0 border-b-[3px] sm:border-b-0 sm:border-r-[3px] border-[#111111] flex flex-col items-center justify-center p-4 relative" style={{ backgroundColor: "#FAFAFA" }}>
                {/* Background Pattern / Type Color Hint */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundColor: leader.typeColor }} />

                {/* Badge */}
                <div className="absolute top-2 left-2 z-10">
                    <div className="w-9 h-9 flex items-center justify-center bg-white border-[2px] border-[#111] shadow-[2px_2px_0_#111]">
                        {badgeImage ? <Image src={badgeImage} alt={leader.badge} fill className="p-1 object-contain" unoptimized /> : null}
                    </div>
                </div>

                {/* Number */}
                <div className="absolute top-2 right-2 bg-[#111] text-white font-['Press_Start_2P'] text-[10px] px-2 py-1">
                    #{index + 1}
                </div>

                {/* Sprite */}
                <div className="relative w-28 h-28 mt-6 z-10 transition-transform duration-300 group-hover:scale-110">
                    {leaderSprite ? <Image src={leaderSprite} alt={leader.name} fill className="object-contain" unoptimized /> : null}
                </div>
            </div>

            {/* Right Area: Info */}
            <div className="flex-1 p-5 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="font-['Press_Start_2P'] text-[13px] sm:text-[15px] text-[#111111] uppercase leading-relaxed">{leader.name}</h3>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                            <TypeBadge type={leader.type} color={leader.typeColor} />
                            {leader.city && (
                                <span className="font-['Nunito'] font-bold text-[11px] bg-[#111] text-white px-2 py-0.5 uppercase tracking-wider">{leader.city}</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Lore / Desc */}
                <div className="mb-4 flex-1 flex flex-col gap-3">
                    {leader.description && (
                        <p className="font-['Nunito'] font-semibold text-[12px] text-[#444] leading-relaxed italic border-l-[3px] pl-3" style={{ borderColor: leader.typeColor }}>
                            "{leader.description}"
                        </p>
                    )}

                    {leader.strategy && (
                        <div className="bg-[#f5f5f5] border-[2px] border-[#111] p-2.5 relative shadow-[2px_2px_0_#111]">
                            <div className="flex items-center gap-1.5 mb-1.5 text-[#CC0000]">
                                <Target size={12} />
                                <span className="font-['Press_Start_2P'] text-[7px]">ESTRATEGIA RECOMENDADA</span>
                            </div>
                            <p className="font-['Nunito'] font-medium text-[11px] text-[#222] leading-snug">{leader.strategy}</p>
                        </div>
                    )}
                </div>

                {/* Team */}
                {leader.team && leader.team.length > 0 && (
                    <div className="mt-auto border-t-[3px] border-[#111] pt-3">
                        <div className="flex flex-wrap gap-2.5">
                            {leader.team.map((pkmn, idx) => (
                                <div key={idx} className="relative group/pkmn flex flex-col items-center border-[2px] border-[#111] bg-white w-10 h-10 shadow-[2px_2px_0_#111] transition-transform hover:-translate-y-1">
                                    <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pkmn.id}.png`} alt={pkmn.name} fill className="object-cover scale-[1.2]" unoptimized />
                                    <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/pkmn:opacity-100 transition-opacity bg-[#111] text-white font-['Press_Start_2P'] text-[6px] px-2 py-1.5 whitespace-nowrap z-20 shadow-[2px_2px_0_#CC0000]">
                                        Nv.{pkmn.level} {pkmn.name}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
}

function EliteCard({ member, index }: { member: EliteMember; index: number }) {
    const isChampion = member.role === "champion";
    const highlightColor = isChampion ? "#CC0000" : "#111111";
    const leaderSprite = member.spriteKey ? ELITE_SPRITES[member.spriteKey as keyof typeof ELITE_SPRITES] : "";

    return (
        <motion.div
            className={`border-[4px] border-[${highlightColor}] bg-white flex flex-col ${isChampion ? 'sm:flex-row' : 'sm:flex-row'} h-full relative group`}
            style={{ boxShadow: `6px 6px 0 ${highlightColor}` }}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.07, type: "spring", stiffness: 240, damping: 22 }}
            whileHover={{ x: -2, y: -2, boxShadow: `8px 8px 0 ${highlightColor}` }}
        >
            {/* Left Area (Dark Mode for Elite) */}
            <div className={`w-full sm:w-[170px] shrink-0 border-b-[4px] sm:border-b-0 sm:border-r-[4px] border-[${highlightColor}] flex flex-col items-center justify-center p-4 relative overflow-hidden`} style={{ backgroundColor: "#151515" }}>
                <div className="absolute inset-0 opacity-20" style={{ backgroundColor: member.typeColor }} />

                {/* Role Label */}
                <div className="absolute top-2 left-2 bg-white border-[2px] px-2 py-1.5 z-10" style={{ borderColor: highlightColor, boxShadow: `2px 2px 0 ${highlightColor}` }}>
                    <span className="font-['Press_Start_2P'] text-[6px] tracking-widest uppercase" style={{ color: highlightColor }}>
                        {isChampion ? "CAMPEÓN REGIONAL" : "ALTO MANDO"}
                    </span>
                </div>

                <div className="relative w-[110px] h-[110px] mt-8 z-10 transition-transform duration-500 group-hover:scale-110">
                    {leaderSprite ? <Image src={leaderSprite} alt={member.name} fill className="object-contain" unoptimized /> : null}
                </div>
            </div>

            {/* Right Area */}
            <div className="flex-1 p-5 flex flex-col bg-[#FAFAFA]">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="font-['Press_Start_2P'] text-[16px] sm:text-[18px] text-[#111111] uppercase mb-2">{member.name}</h3>
                        <TypeBadge type={member.type} color={member.typeColor} />
                    </div>
                    {isChampion && <div className="shrink-0"><Trophy size={28} className="text-[#CC0000]" /></div>}
                </div>

                <div className="mb-5 flex-1 flex flex-col gap-3">
                    {member.description && (
                        <p className="font-['Nunito'] font-black text-[13px] text-[#333] leading-relaxed italic border-l-[4px] pl-3 mb-2" style={{ borderColor: highlightColor }}>
                            "{member.description}"
                        </p>
                    )}

                    {member.strategy && (
                        <div className="bg-white border-[2px] border-[#111] p-3 shadow-[3px_3px_0_#111]">
                            <div className="flex items-center gap-2 mb-2 text-[#CC0000]">
                                <Swords size={12} />
                                <span className="font-['Press_Start_2P'] text-[7px] uppercase">REPORTE DE COMBATE</span>
                            </div>
                            <p className="font-['Nunito'] font-semibold text-[11.5px] text-[#222] leading-snug">{member.strategy}</p>
                        </div>
                    )}
                </div>

                {member.team && member.team.length > 0 && (
                    <div className="mt-auto border-t-[3px] border-[#111] pt-4">
                        <div className="flex flex-wrap gap-2.5">
                            {member.team.map((pkmn, idx) => (
                                <div key={idx} className="relative group/pkmn flex flex-col items-center border-[3px] border-[#111] bg-white w-12 h-12 shadow-[3px_3px_0_#111] transition-transform hover:-translate-y-1">
                                    <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pkmn.id}.png`} alt={pkmn.name} fill className="object-cover scale-[1.25]" unoptimized />
                                    {/* Tooltip */}
                                    <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/pkmn:opacity-100 transition-opacity bg-[#111] text-white font-['Press_Start_2P'] text-[7px] px-2 py-1.5 whitespace-nowrap z-20 shadow-[2px_2px_0_#CC0000]">
                                        Nv.{pkmn.level} {pkmn.name.toUpperCase()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
}

export function RegionLeagueSection({ regionName, regionColor }: RegionLeagueSectionProps) {
    const gymData = REGION_GYM_LEADERS[regionName] ?? [];
    const eliteData = REGION_ELITE[regionName] ?? [];

    const [activeGymGame, setActiveGymGame] = useState(0);
    const [activeEliteGame, setActiveEliteGame] = useState(0);

    if (gymData.length === 0) return null;

    return (
        <section>
            {/* Section Header */}
            <div className="flex items-center gap-3 mb-8">
                <div className="w-3 h-3 bg-[#CC0000]" />
                <h2 className="font-['Press_Start_2P'] text-[13px] uppercase text-[#111111] whitespace-nowrap">
                    LIGA POKÉMON
                </h2>
                <div className="h-[3px] bg-[#111111] flex-1" />
                <div className="shrink-0 border-2 border-[#111111] px-3 py-1.5" style={{ boxShadow: `3px 3px 0 ${regionColor}` }}>
                    <Trophy size={14} style={{ color: regionColor }} />
                </div>
            </div>

            {/* Gym Leaders */}
            <div className="mb-10">
                <div className="flex items-center gap-3 mb-5">
                    <span className="font-['Press_Start_2P'] text-[10px] text-[#888888]">LÍDERES DE GIMNASIO</span>

                    {/* Game selector tabs (si hay múltiples entregas) */}
                    {gymData.length > 1 && (
                        <div className="flex gap-2 flex-wrap ml-auto">
                            {gymData.map((g, i) => (
                                <button
                                    key={g.game}
                                    onClick={() => setActiveGymGame(i)}
                                    className="font-['Nunito'] font-bold text-[11px] px-3 py-1.5 border-2 border-[#111111] transition-colors"
                                    style={
                                        activeGymGame === i
                                            ? { backgroundColor: "#111111", color: "#fff" }
                                            : { backgroundColor: "#fff", color: "#111111" }
                                    }
                                >
                                    {g.game}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeGymGame}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {gymData[activeGymGame]?.leaders.map((leader, i) => (
                            <GymLeaderCard
                                key={leader.name + i}
                                leader={leader}
                                index={i}
                                regionColor={regionColor}
                            />
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Alto Mando & Campeón */}
            {eliteData.length > 0 && (
                <div className="mt-14 mb-8">
                    <div className="flex items-center gap-3 mb-6 mix-blend-multiply border-b-2 border-[#111111] pb-2">
                        <Trophy size={16} />
                        <span className="font-['Press_Start_2P'] text-[12px] text-[#111111]">ALTO MANDO Y CAMPEÓN</span>
                    </div>

                    {/* Game selector for elite */}
                    {eliteData.length > 1 && (
                        <div className="flex gap-2 flex-wrap mb-4">
                            {eliteData.map((g, i) => (
                                <button
                                    key={g.game}
                                    onClick={() => setActiveEliteGame(i)}
                                    className="font-['Nunito'] font-bold text-[11px] px-3 py-1.5 border-2 border-[#111111] transition-colors"
                                    style={
                                        activeEliteGame === i
                                            ? { backgroundColor: "#111111", color: "#fff" }
                                            : { backgroundColor: "#fff", color: "#111111" }
                                    }
                                >
                                    {g.game}
                                </button>
                            ))}
                        </div>
                    )}

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeEliteGame}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            {eliteData[activeEliteGame]?.members.map((m, i) => (
                                <div key={m.name + i} className={m.role === "champion" ? "lg:col-span-2" : ""}>
                                    <EliteCard member={m} index={i} />
                                </div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            )}
        </section>
    );
}
