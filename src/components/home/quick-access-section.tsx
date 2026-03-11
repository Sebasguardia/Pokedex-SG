"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Database, Shield, Zap, Flame, Package, Leaf } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useFilterStore } from "@/lib/store/filter.store";

const FEATURES = [
    { id: "01", name: "POKÉDEX", desc: "Todos los Pokémon catalogados", stat: "1025+", icon: Database, href: "/pokemon" },
    { id: "02", name: "TIPOS", desc: "18 tipos y sus relaciones", stat: "18", icon: Shield, href: "/types" },
    { id: "03", name: "MOVIMIENTOS", desc: "Catálogo completo de ataques", stat: "900+", icon: Zap, href: "/moves" },
    { id: "04", name: "HABILIDADES", desc: "Habilidades pasivas únicas", stat: "300+", icon: Flame, href: "/abilities" },
    { id: "05", name: "OBJETOS", desc: "Items, TMs y más", stat: "800+", icon: Package, href: "/items" },
    { id: "06", name: "BAYAS", desc: "Pequeños frutos, gran poder", stat: "64", icon: Leaf, href: "/berries" },
];

function FeatureCard({ feature }: { feature: typeof FEATURES[0] }) {
    const Icon = feature.icon;
    const { pokedexFilters } = useFilterStore();
    const href = feature.href === "/pokemon" && pokedexFilters
        ? `/pokemon?${pokedexFilters}`
        : feature.href;

    return (
        <Link href={href} className="block outline-none">
            <motion.div
                variants={{
                    hidden: { opacity: 0, x: -30 },
                    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 25 } }
                }}
                whileHover="hover"
                whileTap={{ scale: 0.97 }}
                className="relative bg-white border-2 border-gray-900 p-6 flex flex-col h-full group"
                style={{ boxShadow: "4px 4px 0 #111111" }}
                data-cursor="hover"
            >
                {/* Decorative corner triangle */}
                <div className="absolute top-0 left-0 w-0 h-0 border-r-[20px] border-r-transparent border-t-[20px] border-t-poke-red transition-all duration-300 group-hover:border-t-[32px] group-hover:border-r-[32px]" />

                <motion.div
                    className="absolute inset-0 z-[-1] bg-poke-red opacity-0"
                    variants={{ hover: { opacity: 0 } }} // Not used for background color, just to bind hover state
                />

                {/* Hover physics */}
                <motion.div
                    className="absolute inset-0 border-2 border-transparent z-10 pointer-events-none"
                    variants={{
                        hover: {
                            x: 4, y: 4,
                            boxShadow: "0px 0px 0 #111111",
                            transition: { type: "spring", stiffness: 400, damping: 25 }
                        }
                    }}
                />

                {/* Content wrapper - we animate the whole content to simulate physical button press */}
                <motion.div
                    variants={{ hover: { x: 4, y: 4, transition: { type: "spring", stiffness: 400, damping: 25 } } }}
                    className="flex flex-col h-full"
                >
                    {/* Top Row: Ordinal + Icon */}
                    <div className="flex items-start justify-between mb-8">
                        <span className="font-mono text-5xl text-gray-100 font-bold -mt-2 -ml-2 transition-colors duration-300 group-hover:text-gray-200">
                            {feature.id}
                        </span>
                        <motion.div
                            variants={{ hover: { rotate: 0, scale: 1.1, color: "#CC0000" } }}
                            initial={{ rotate: -15, scale: 1, color: "#111111" }}
                            className="text-[40px]"
                        >
                            <Icon />
                        </motion.div>
                    </div>

                    {/* Middle: Title + Desc */}
                    <div className="flex-1">
                        <h3 className="font-pixel text-[11px] text-gray-900 mb-3">{feature.name}</h3>
                        <p className="font-nunito text-[13px] text-gray-500">{feature.desc}</p>
                    </div>

                    {/* Bottom Row */}
                    <div className="flex items-center justify-between mt-6 pt-4 border-t-2 border-dashed border-gray-100">
                        <span className="font-nunito font-bold text-poke-red text-[13px] tracking-wider">{feature.stat}</span>
                        <motion.div variants={{ hover: { x: 6 } }}>
                            <ArrowRight className="w-4 h-4 text-gray-900" />
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>
        </Link>
    );
}

export function QuickAccessSection() {
    return (
        <section className="bg-white py-20 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-12 flex flex-col items-start max-w-2xl">
                    <div className="flex items-center gap-4 mb-3">
                        <motion.div
                            initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true, margin: "-80px" }}
                            className="w-1 h-8 bg-poke-red origin-bottom"
                        />
                        <h2 className="font-pixel text-base md:text-[16px] text-gray-900 uppercase">EXPLORAR</h2>
                    </div>
                    <p className="font-nunito text-[15px] text-gray-500 pl-5">¿Qué quieres descubrir hoy?</p>
                </div>

                {/* Grid */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {FEATURES.map((feat) => (
                        <FeatureCard key={feat.id} feature={feat} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
