"use client";

import { Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Globe2, Compass, Trees, Mountain, Waves, Building2, Fish, Leaf,
    Map, Zap, ChevronRight
} from "lucide-react";
import { useRegionsList } from "@/lib/hooks/locations/useLocations";
import { REGION_ORDER, REGION_COLORS, REGION_NAMES_ES } from "@/lib/constants/locations/locations.constants";
import { RegionCard } from "@/components/locations/region-card";
import { PageTransitionLocations } from "@/components/shared/page-transitions/locations/page-transition-locations";

// ── Tipos de Zona (datos estáticos) ──────────────────────────────────
const ZONE_TYPES = [
    { icon: Leaf, label: "HIERBA", desc: "Pokémon salvajes en hierbas altas", count: "850+", color: "#1B5E20", bg: "#E8F5E9" },
    { icon: Mountain, label: "CUEVAS", desc: "Laberintos subterráneos y minerales", count: "220+", color: "#4A148C", bg: "#EDE7F6" },
    { icon: Waves, label: "SURF", desc: "Rutas marítimas y cuerpos de agua", count: "180+", color: "#0D47A1", bg: "#E3F2FD" },
    { icon: Fish, label: "PESCA", desc: "Distintas cañas, distintas capturas", count: "95+", color: "#00695C", bg: "#E0F2F1" },
    { icon: Building2, label: "CIUDADES", desc: "Urbes con Gimnasio, Tienda y Centros", count: "120+", color: "#E65100", bg: "#FFF3E0" },
    { icon: Trees, label: "BOSQUES", desc: "Biomas densos y fauna específica", count: "60+", color: "#2E7D32", bg: "#F1F8E9" },
];



// ── Curiosidades del mundo Pokémon ────────────────────────────────────
const FUN_FACTS = [
    { icon: Globe2, text: "Más de 850 locaciones únicas distribuidas en 9 regiones del mundo Pokémon." },
    { icon: Zap, text: "Cada región tiene al menos un Legendario que custodia su equilibrio natural." },
    { icon: Map, text: "Las rutas numeradas indican el orden canónico de exploración del Entrenador." },
    { icon: Compass, text: "Cada bioma determina qué métodos de captura son efectivos: caña, surf o hierba." },
];

// ── Componentes internos ──────────────────────────────────────────────

function SectionTitle({ label, line = true }: { label: string; line?: boolean }) {
    return (
        <div className="flex items-center gap-3 mb-8">
            <div className="w-3 h-3 bg-[#CC0000] shrink-0" />
            <h2 className="font-['Press_Start_2P'] text-[13px] uppercase text-[#111111] whitespace-nowrap">
                {label}
            </h2>
            {line && <div className="h-[3px] bg-[#111111] flex-1" />}
        </div>
    );
}

function ZoneCard({ icon: Icon, label, desc, count, color, bg, index }: any) {
    return (
        <motion.div
            className="group border-2 border-[#111111] bg-white flex flex-col cursor-default overflow-hidden"
            style={{ boxShadow: "4px 4px 0 #111111" }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ delay: index * 0.07, type: "spring", stiffness: 200, damping: 22 }}
            whileHover={{ x: -2, y: -2, boxShadow: "6px 6px 0 #CC0000" }}
        >
            {/* Franja superior de color */}
            <div className="h-[4px]" style={{ backgroundColor: color }} />
            <div className="p-4 flex flex-col gap-3 flex-1">
                <div className="flex items-center justify-between">
                    <div className="w-9 h-9 border-2 border-[#111111] flex items-center justify-center" style={{ backgroundColor: bg }}>
                        <Icon size={18} color={color} strokeWidth={2.5} />
                    </div>
                    <span className="font-['JetBrains_Mono'] font-bold text-[18px]" style={{ color }}>
                        {count}
                    </span>
                </div>
                <h3 className="font-['Press_Start_2P'] text-[10px] text-[#111111]">{label}</h3>
                <p className="font-['Nunito'] text-[12px] text-[#666666] leading-relaxed">{desc}</p>
            </div>
        </motion.div>
    );
}

function GeoRow({ region, country, flag, color, index }: any) {
    return (
        <motion.div
            className="flex items-center gap-4 border-b-2 border-[#111111] py-3 group hover:bg-[#F8F8F8] transition-colors px-3"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, type: "spring", stiffness: 220, damping: 22 }}
        >
            <div className="w-3 h-3 border-2 border-[#111111] shrink-0" style={{ backgroundColor: color }} />
            <span className="font-['Press_Start_2P'] text-[9px] text-[#111111] w-20 shrink-0">{region}</span>
            <div className="h-[2px] bg-[#E0E0E0] flex-1 group-hover:bg-[#111111] transition-colors" />
            <span className="font-['Nunito'] font-bold text-[13px] text-[#444444]">{flag} {country}</span>
        </motion.div>
    );
}

function FactCard({ icon: Icon, text, index }: any) {
    return (
        <motion.div
            className="border-2 border-[#111111] bg-white p-4 flex gap-3 items-start"
            style={{ boxShadow: "3px 3px 0 #111111", borderLeftWidth: "5px", borderLeftColor: "#CC0000" }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, type: "spring", stiffness: 200, damping: 22 }}
        >
            <div className="shrink-0 w-8 h-8 bg-[#111111] flex items-center justify-center">
                <Icon size={16} color="white" />
            </div>
            <p className="font-['Nunito'] text-[13px] text-[#333333] leading-relaxed">{text}</p>
        </motion.div>
    );
}

// ── Contenido Principal ───────────────────────────────────────────────
function LocationsContent() {
    const { data: regions, isLoading } = useRegionsList();

    const sorted = regions
        ? REGION_ORDER.map((name) => regions.find((r) => r.name === name)).filter(Boolean)
        : [];

    return (
        <>
            <PageTransitionLocations />

            {/* Dot grid BG */}
            <div
                className="fixed inset-0 z-0 pointer-events-none opacity-[0.02]"
                style={{ backgroundImage: "radial-gradient(#111111 1px, transparent 1px)", backgroundSize: "32px 32px" }}
            />

            <motion.main
                className="relative min-h-screen bg-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.35 }}
            >
                <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10 relative z-10">

                    {/* ── HERO HEADER ── */}
                    <div className="pb-12">
                        {/* Cuadros de colores de regiones */}
                        <div className="flex gap-1.5 mb-5">
                            {REGION_ORDER.map((name, i) => (
                                <motion.div
                                    key={name}
                                    className="w-3 h-3 border-2 border-[#111111]"
                                    style={{ backgroundColor: REGION_COLORS[name] }}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.5 + i * 0.06 }}
                                />
                            ))}
                        </div>

                        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
                            {/* Left: Título */}
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-4 h-4 bg-[#CC0000] border-2 border-[#111111]" />
                                    <h1 className="font-['Press_Start_2P'] text-[22px] md:text-[28px] text-[#111111] leading-none">
                                        LOCACIONES
                                    </h1>
                                    <motion.div
                                        className="bg-white text-[#111111] border-2 border-[#111111] flex items-center justify-center min-w-[34px] h-9 ml-2"
                                        style={{ boxShadow: "4px 4px 0 #111111" }}
                                        initial={{ scale: 0, y: -10 }}
                                        animate={{ scale: 1, y: 0 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.7 }}
                                    >
                                        <span className="font-['Press_Start_2P'] text-[13px] pt-1">9</span>
                                    </motion.div>
                                </div>

                                <div className="bg-[#111111] text-white px-4 py-2.5 border-2 border-[#111111] w-fit" style={{ boxShadow: "4px 4px 0 #CC0000" }}>
                                    <p className="font-['Nunito'] text-[13px] font-bold tracking-widest uppercase">
                                        El Mapa del Mundo Pokémon · 9 Regiones · Miles de Encuentros
                                    </p>
                                </div>

                                <p className="font-['Nunito'] text-[14px] text-[#555555] max-w-[520px] leading-relaxed">
                                    Cada ruta, cueva, ciudad y misterioso cuerpo de agua tiene algo que ofrecer. Explora el mapamundi completo y descubre qué Pokémon habitan cada rincón del planeta.
                                </p>
                            </div>

                            {/* Right: chips de región */}
                            <div className="flex gap-2 flex-wrap max-w-[320px] justify-start md:justify-end">
                                {REGION_ORDER.map((name, i) => (
                                    <motion.div
                                        key={name}
                                        className="border-2 border-[#111111] bg-white px-2 py-1.5 cursor-default"
                                        style={{ boxShadow: "3px 3px 0 #111111" }}
                                        whileHover={{ x: -2, y: -2, boxShadow: "5px 5px 0 #CC0000" }}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 + i * 0.04 }}
                                    >
                                        <span className="font-['Press_Start_2P'] text-[9px]" style={{ color: REGION_COLORS[name] }}>
                                            {REGION_NAMES_ES[name]?.toUpperCase()}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Separador grueso */}
                        <motion.div
                            className="h-[4px] bg-[#111111] w-full"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            style={{ transformOrigin: "left" }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        />
                    </div>





                    {/* ── GRID DE REGIONES ── */}
                    <section>
                        <SectionTitle label="MAPAMUNDI POKÉMON" />

                        <AnimatePresence mode="wait">
                            {isLoading ? (
                                <motion.div
                                    key="skeleton"
                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                >
                                    {Array.from({ length: 9 }).map((_, i) => (
                                        <div key={i} className="border-2 border-[#111111] bg-[#F8F8F8] animate-pulse overflow-hidden relative" style={{ height: 260, boxShadow: "4px 4px 0 #111111" }}>
                                            <div className="absolute top-0 left-0 w-full h-[4px] bg-[#E0E0E0]" />
                                            <div className="p-5 flex flex-col gap-4 h-full">
                                                <div className="w-1/2 h-6 bg-[#E0E0E0]" />
                                                <div className="w-full h-12 bg-[#E0E0E0]" />
                                                <div className="grid grid-cols-3 gap-2 mt-auto">
                                                    <div className="h-[60px] border-2 border-[#E0E0E0] bg-white" />
                                                    <div className="h-[60px] border-2 border-[#E0E0E0] bg-white" />
                                                    <div className="h-[60px] border-2 border-[#E0E0E0] bg-white" />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="content"
                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {sorted.map((region: any, i: number) => (
                                        <RegionCard key={region.name} region={region} index={i} />
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </section>

                </div>
            </motion.main>
        </>
    );
}

export default function LocationsPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen bg-white flex items-center justify-center">
                    <div className="border-2 border-[#111111] px-6 py-4" style={{ boxShadow: "4px 4px 0 #CC0000" }}>
                        <span className="font-['Press_Start_2P'] text-[10px] text-[#111111]">CARGANDO...</span>
                    </div>
                </div>
            }
        >
            <LocationsContent />
        </Suspense>
    );
}