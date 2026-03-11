"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Plus, ArrowRight } from "lucide-react";

// Massive Pokeball silhouette for the background
function BgPokeball({ className }: { className?: string }) {
    return (
        <motion.div
            className={`absolute opacity-[0.08] pointer-events-none text-white ${className}`}
            animate={{ rotate: 360 }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        >
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path d="M50 5C25.147 5 5 25.147 5 50H40C40 44.477 44.477 40 50 40C55.523 40 60 44.477 60 50H95C95 25.147 74.853 5 50 5Z" fill="currentColor" />
                <path d="M50 95C74.853 95 95 74.853 95 50H60C60 55.523 55.523 60 50 60C44.477 60 40 55.523 40 50H5C5 74.853 25.147 95 50 95Z" fill="currentColor" />
                <path fillRule="evenodd" clipRule="evenodd" d="M95 50C95 52.761 92.761 55 90 55H63.1C61.467 62.067 56.533 67 50 67C43.467 67 38.533 62.067 36.9 55H10C7.239 55 5 52.761 5 50C5 47.239 7.239 45 10 45H36.9C38.533 37.933 43.467 33 50 33C56.533 33 61.467 37.933 63.1 45H90C92.761 45 95 47.239 95 50ZM50 60C55.523 60 60 55.523 60 50C60 44.477 55.523 40 50 40C44.477 40 40 44.477 40 50C40 55.523 44.477 60 50 60Z" fill="currentColor" />
            </svg>
        </motion.div>
    );
}

function Slot() {
    return (
        <motion.div
            variants={{
                initial: { opacity: 0.4, borderStyle: "dashed", scale: 1 },
                hover: { opacity: 1, borderStyle: "solid", scale: 1.08 }
            }}
            initial="initial"
            whileHover="hover"
            className="w-[70px] h-[70px] sm:w-[90px] sm:h-[90px] border-2 border-white flex flex-col items-center justify-center gap-1 cursor-pointer"
        >
            <motion.div variants={{ hover: { rotate: 90 } }}>
                <Plus className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </motion.div>
            <span className="font-nunito text-[9px] text-white uppercase tracking-wider hidden sm:block">Seleccionar</span>
        </motion.div>
    );
}

export function ComparatorBanner() {
    return (
        <section className="relative bg-poke-red py-24 overflow-hidden flex flex-col items-center justify-center text-center">

            {/* Background Decoratives */}
            <BgPokeball className="w-[300px] h-[300px] left-[-100px] top-[-50px]" />
            <BgPokeball className="w-[500px] h-[500px] left-1/2 -translate-x-1/2 top-[-100px]" />
            <BgPokeball className="w-[300px] h-[300px] right-[-100px] bottom-[-50px]" />

            <div
                className="absolute inset-0 pointer-events-none opacity-5 mix-blend-overlay"
                style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, white 10px, white 11px)" }}
            />

            <div className="relative z-10 max-w-2xl px-4 flex flex-col items-center">
                {/* Eyebrow */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-10 h-px bg-white" />
                    <span className="font-nunito text-[12px] text-white uppercase tracking-widest border border-white px-2 py-0.5 relative overflow-hidden group">
                        NUEVO
                    </span>
                    <div className="w-10 h-px bg-white" />
                </div>

                {/* Title */}
                <div className="mb-6 relative">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
                        className="flex flex-col gap-2"
                    >
                        <motion.span variants={{ hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 200 } } }} className="font-pixel text-[20px] md:text-[24px] text-white block">
                            ¿QUIÉN ES
                        </motion.span>
                        <motion.span variants={{ hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 200 } } }} className="font-pixel text-[20px] md:text-[24px] text-white block">
                            EL MEJOR?
                        </motion.span>
                    </motion.div>

                    {/* Quick light flash effect */}
                    <motion.div
                        initial={{ x: "-200%" }}
                        whileInView={{ x: "200%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="absolute inset-0 z-20 pointer-events-none mix-blend-overlay"
                        style={{
                            background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.8) 50%, transparent 100%)",
                            width: "50%",
                        }}
                    />
                </div>

                {/* Subtitle */}
                <p className="font-nunito text-[16px] text-white opacity-90 max-w-[480px] mb-12 leading-relaxed">
                    Compara hasta 3 Pokémon lado a lado. Stats, tipos, movimientos y todo lo que necesitas saber.
                </p>

                {/* Preview Slots */}
                <div className="flex items-center gap-2 sm:gap-4 mb-12">
                    <Slot />
                    <span className="font-pixel text-[10px] text-white opacity-60">VS</span>
                    <Slot />
                    <span className="font-pixel text-[10px] text-white opacity-60">VS</span>
                    <Slot />
                </div>

                {/* CTA */}
                <Link href="/compare">
                    <motion.button
                        whileHover={{ x: 4, y: 4, boxShadow: "0px 0px 0 rgba(0,0,0,0.3)" }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center justify-center bg-white text-poke-red font-nunito font-bold text-sm px-8 py-4 border-2 border-white relative z-20"
                        style={{ boxShadow: "4px 4px 0 rgba(0,0,0,0.3)" }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        data-cursor="hover"
                    >
                        Ir al Comparador <ArrowRight className="ml-2 w-4 h-4" />
                    </motion.button>
                </Link>
            </div>
        </section>
    );
}
