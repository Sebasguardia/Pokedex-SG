"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { TYPE_COLORS, POKEMON_TYPES } from "@/lib/constants/colors";
import {
    Shield, Droplet, Leaf, Zap, Circle,
    Orbit, Skull, Mountain, Wind, Brain,
    Bug, MountainSnow, Ghost, Flame, Snowflake,
    Star, Moon, Wand2
} from "lucide-react";

// Mapping react-icons to types
const TYPE_ICONS: Record<string, React.ElementType> = {
    normal: Circle, fighting: Orbit, flying: Wind, poison: Skull,
    ground: Mountain, rock: MountainSnow, bug: Bug, ghost: Ghost,
    steel: Shield, fire: Flame, water: Droplet, grass: Leaf,
    electric: Zap, psychic: Brain, ice: Snowflake, dragon: Flame,
    dark: Moon, fairy: Wand2
};

const ORDERED_TYPES = [
    "normal", "fire", "water", "grass", "electric", "ice",
    "fighting", "poison", "ground", "flying", "psychic", "bug",
    "rock", "ghost", "dragon", "dark", "steel", "fairy"
];

function TypePill({ type, isHoveredTarget, setHoveredType }: { type: string, isHoveredTarget: boolean, setHoveredType: (t: string | null) => void }) {
    const Icon = TYPE_ICONS[type] || Circle;
    const color = TYPE_COLORS[type as keyof typeof TYPE_COLORS] || TYPE_COLORS.normal;

    return (
        <Link href={`/types`} className="block outline-none" onMouseEnter={() => setHoveredType(type)} onFocus={() => setHoveredType(type)}>
            <motion.div
                variants={{
                    hidden: { scale: 0 },
                    visible: { scale: 1, transition: { type: "spring", stiffness: 300, damping: 20 } }
                }}
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
                className="w-full h-full p-2.5 flex flex-col justify-center items-center border-[2px] transition-all relative"
                style={{
                    backgroundColor: color,
                    borderColor: "transparent",
                    opacity: isHoveredTarget ? 1 : 1
                }}
                data-cursor="hover"
            >
                <motion.div variants={{ hover: { rotate: [-10, 0, 10, 0] } }} transition={{ duration: 0.5 }}>
                    <Icon className="text-white w-5 h-5 mb-1.5 drop-shadow-sm" />
                </motion.div>
                <span className="font-pixel text-[8px] text-white uppercase tracking-wider drop-shadow-sm">{type}</span>

                {/* Outline overlaid on hover purely for styling to allow proper box-shadow rendering */}
                <motion.div
                    className="absolute inset-[-2px] border-2 border-[#111] pointer-events-none opacity-0 z-10"
                    variants={{ hover: { opacity: 1, boxShadow: "3px 3px 0 #111111" } }}
                />
            </motion.div>
        </Link>
    );
}

export function TypesShowcase() {
    const [hoveredType, setHoveredType] = useState<string | null>(null);

    return (
        <section className="bg-white py-20 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col items-center justify-center text-center mb-12">
                    <h2 className="font-pixel text-[16px] md:text-[20px] text-gray-900 mb-4">LOS 18 TIPOS</h2>
                    <p className="font-nunito text-[15px] text-gray-500">Cada Pokémon pertenece a uno o dos tipos elementales.</p>
                </div>

                {/* 18 Types Grid */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={{ visible: { transition: { staggerChildren: 0.03 } } }}
                    onMouseLeave={() => setHoveredType(null)}
                    className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 gap-3"
                >
                    {ORDERED_TYPES.map((type) => {
                        const isDimmed = hoveredType !== null && hoveredType !== type;
                        return (
                            <motion.div
                                key={type}
                                animate={{ opacity: isDimmed ? 0.3 : 1, scale: hoveredType === type ? 1.08 : 1, zIndex: hoveredType === type ? 10 : 1 }}
                                transition={{ duration: 0.2 }}
                            >
                                <TypePill type={type} setHoveredType={setHoveredType} isHoveredTarget={hoveredType === type} />
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Action Button */}
                <div className="flex justify-center mt-12">
                    <Link href="/types">
                        <motion.button
                            whileHover="hover"
                            whileTap={{ scale: 0.97 }}
                            className="flex items-center justify-center bg-transparent text-gray-900 font-nunito font-bold text-sm px-6 py-3 border-2 border-gray-900"
                            style={{ boxShadow: "4px 4px 0 #888888" }}
                            variants={{ hover: { x: 4, y: 4, boxShadow: "0px 0px 0 #888888" } }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            data-cursor="hover"
                        >
                            Ver tabla de efectividades <motion.span variants={{ hover: { x: 8 } }} className="ml-2 block"><ArrowRight className="w-4 h-4" /></motion.span>
                        </motion.button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
