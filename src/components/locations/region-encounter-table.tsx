"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
    Leaf, Fish, Waves, Hammer, Zap, Gift, Mountain, Sparkles,
    Anchor, Radio, CircleDot, MapPin, Triangle, Trees,
    AlertTriangle, ChevronDown, Sun, Moon, Sunrise, Clock, Bug,
} from "lucide-react";
import { LocationArea } from "@/types/api/location.types";
import { ENCOUNTER_METHOD_META } from "@/lib/constants/locations.constants";

/* ── Icon map ──────────────────────────────────────────────────────── */
const ICON_MAP: Record<string, React.ElementType> = {
    Leaf, Fish, Waves, Hammer, Zap, Gift, Mountain, Sparkles,
    Anchor, Radio, CircleDot, MapPin, Triangle, Trees,
};

/* ── Helpers ───────────────────────────────────────────────────────── */
function extractId(url: string): number {
    return parseInt(url.match(/\/(\d+)\/?$/)?.[1] ?? "0");
}
function capitalize(s: string) {
    return s.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

type ChanceTier = { label: string; color: string; bg: string };
function getChanceTier(chance: number): ChanceTier {
    if (chance >= 50) return { label: "MUY COMÚN",   color: "#16A34A", bg: "#DCFCE7" };
    if (chance >= 25) return { label: "COMÚN",        color: "#CA8A04", bg: "#FEF9C3" };
    if (chance >= 10) return { label: "POCO COMÚN",   color: "#EA580C", bg: "#FFEDD5" };
    if (chance >= 5)  return { label: "RARO",          color: "#DC2626", bg: "#FEE2E2" };
    return                   { label: "MUY RARO",      color: "#7C3AED", bg: "#EDE9FE" };
}

function formatCondition(name: string): string | null {
    const MAP: Record<string, string> = {
        "time-of-day-morning": "Mañana",
        "time-of-day-day":     "Día",
        "time-of-day-night":   "Noche",
        "radar-encounter":     "Radar Pokémon",
        "no-condition":        "",
        "swarm":               "Enjambre",
    };
    return name in MAP ? (MAP[name] || null) : capitalize(name.replace(/-/g, " "));
}

function ConditionIcon({ name }: { name: string }) {
    if (name.includes("morning")) return <Sunrise size={10} />;
    if (name.includes("night"))   return <Moon    size={10} />;
    if (name.includes("day"))     return <Sun     size={10} />;
    if (name.includes("radar"))   return <Radio   size={10} />;
    if (name.includes("swarm"))   return <Bug     size={10} />;
    return <Clock size={10} />;
}

/* ── Interfaces ────────────────────────────────────────────────────── */
interface RegionEncounterTableProps {
    area: LocationArea;
    regionColor: string;
}

interface EncounterEntry {
    pokemon:    { name: string; id: number };
    minLv:      number;
    maxLv:      number;
    chance:     number;
    conditions: string[];
}

/* ── PokémonCard ───────────────────────────────────────────────────── */
function PokemonCard({
    pokemon, minLv, maxLv, chance, conditions, regionColor, idx,
}: EncounterEntry & { regionColor: string; idx: number }) {
    const [imgError, setImgError] = useState(false);
    const tier    = getChanceTier(chance);
    const gifSrc  = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemon.id}.gif`;
    const pngSrc  = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
    const filteredConds = conditions.map(formatCondition).filter(Boolean) as string[];

    return (
        <motion.div
            className="border-[3px] border-[#111] bg-white flex flex-col overflow-hidden hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#111] transition-all"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.04, duration: 0.3 }}
        >
            {/* ── Sprite zone ── */}
            <div
                className="relative flex items-center justify-center h-[120px] border-b-[3px] border-[#111] overflow-hidden"
                style={{ backgroundColor: tier.bg }}
            >
                {/* National # */}
                <span className="absolute top-2 left-2.5 font-['Press_Start_2P'] text-[7px] text-[#888]/80">
                    #{String(pokemon.id).padStart(3, "0")}
                </span>

                {/* Chance badge */}
                <div
                    className="absolute top-2 right-2 px-2 py-0.5 border-[2px] border-[#111] font-['Press_Start_2P'] text-[8px] text-white"
                    style={{ backgroundColor: tier.color }}
                >
                    {chance}%
                </div>

                {/* Sprite / GIF */}
                <Image
                    src={imgError ? pngSrc : gifSrc}
                    alt={pokemon.name}
                    width={96}
                    height={96}
                    className="object-contain drop-shadow-md"
                    unoptimized
                    onError={() => setImgError(true)}
                />
            </div>

            {/* ── Name + tier ── */}
            <div className="px-3 pt-2.5 pb-2 border-b-[2px] border-[#EBEBEB]">
                <p className="font-['Nunito'] font-black text-[16px] text-[#111] capitalize leading-tight">
                    {capitalize(pokemon.name)}
                </p>
                <p className="font-['Press_Start_2P'] text-[7px] mt-0.5" style={{ color: tier.color }}>
                    {tier.label}
                </p>
            </div>

            {/* ── Stats row: level | chance bar ── */}
            <div className="grid grid-cols-2 divide-x-[2px] divide-[#EBEBEB]">
                <div className="px-3 py-2.5">
                    <p className="font-['Press_Start_2P'] text-[6px] text-[#AAA] mb-1.5">NIVEL</p>
                    <p className="font-['Press_Start_2P'] text-[12px] text-[#111]">
                        {minLv === maxLv ? minLv : `${minLv}–${maxLv}`}
                    </p>
                    <p className="font-['Nunito'] text-[10px] text-[#888] mt-0.5">
                        {minLv === maxLv ? "Fijo" : "Rango de nivel"}
                    </p>
                </div>

                <div className="px-3 py-2.5">
                    <p className="font-['Press_Start_2P'] text-[6px] text-[#AAA] mb-1.5">TASA DE APARICIÓN</p>
                    <p className="font-['Press_Start_2P'] text-[12px]" style={{ color: tier.color }}>
                        {chance}%
                    </p>
                    {/* Progress bar */}
                    <div className="h-[6px] bg-[#E8E8E8] w-full mt-1.5 overflow-hidden">
                        <motion.div
                            className="h-full"
                            style={{ backgroundColor: tier.color }}
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(chance, 100)}%` }}
                            transition={{ duration: 0.7, delay: idx * 0.04, ease: "easeOut" }}
                        />
                    </div>
                </div>
            </div>

            {/* ── Conditions ── */}
            {filteredConds.length > 0 && (
                <div className="px-3 py-2 border-t-[2px] border-[#EBEBEB] flex flex-wrap gap-1.5">
                    {filteredConds.map((c, i) => (
                        <span
                            key={i}
                            className="flex items-center gap-1 font-['Nunito'] font-bold text-[10px] px-2 py-0.5 border border-[#DDD] bg-[#F8F8F8] text-[#555]"
                        >
                            <ConditionIcon name={conditions[i]} />
                            {c}
                        </span>
                    ))}
                </div>
            )}
        </motion.div>
    );
}

/* ── Version Dropdown ───────────────────────────────────────────────── */
function VersionDropdown({
    versions, active, onChange, regionColor,
}: {
    versions: string[];
    active:   string;
    onChange: (v: string) => void;
    regionColor: string;
}) {
    const [open, setOpen] = useState(false);

    if (versions.length <= 1) return null;

    return (
        <div className="relative mb-6">
            <p className="font-['Press_Start_2P'] text-[7px] text-[#888] mb-2 uppercase tracking-widest">
                VERSIÓN DEL JUEGO
            </p>
            <button
                className="w-full flex items-center justify-between px-4 py-3 border-[3px] border-[#111] bg-white font-['Press_Start_2P'] text-[9px] text-[#111] text-left transition-all"
                style={{ boxShadow: open ? `4px 4px 0 ${regionColor}` : "3px 3px 0 #111" }}
                onClick={() => setOpen((v) => !v)}
            >
                <span>{capitalize(active)}</span>
                <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={14} className="text-[#111]" />
                </motion.div>
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        className="absolute top-full left-0 right-0 z-30 bg-white border-[3px] border-[#111] border-t-0 max-h-[220px] overflow-y-auto shadow-[4px_4px_0_#111]"
                        initial={{ opacity: 0, scaleY: 0.9 }}
                        animate={{ opacity: 1, scaleY: 1 }}
                        exit={{ opacity: 0, scaleY: 0.9 }}
                        style={{ transformOrigin: "top" }}
                        transition={{ duration: 0.15 }}
                    >
                        {versions.map((v) => {
                            const isActive = v === active;
                            return (
                                <button
                                    key={v}
                                    onClick={() => { onChange(v); setOpen(false); }}
                                    className="w-full text-left px-4 py-3 font-['Press_Start_2P'] text-[8px] border-b border-[#EBEBEB] last:border-0 transition-colors hover:bg-[#F5F5F5]"
                                    style={{ color: isActive ? regionColor : "#111" }}
                                >
                                    {capitalize(v)} {isActive && "✓"}
                                </button>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

/* ── Main Export ────────────────────────────────────────────────────── */
export function RegionEncounterTable({ area, regionColor }: RegionEncounterTableProps) {
    /* Collect all unique versions */
    const allVersions = useMemo(() => {
        const seen  = new Set<string>();
        const result: string[] = [];
        area.pokemon_encounters.forEach((pe) =>
            pe.version_details.forEach((vd) => {
                if (!seen.has(vd.version.name)) {
                    seen.add(vd.version.name);
                    result.push(vd.version.name);
                }
            })
        );
        return result;
    }, [area]);

    const [activeVersion, setActiveVersion] = useState(allVersions[0] ?? "");

    /* Build encounter map by method for the active version */
    const encountersByMethod = useMemo(() => {
        const map = new Map<string, EncounterEntry[]>();

        area.pokemon_encounters.forEach((pe) => {
            const vd = pe.version_details.find((v) => v.version.name === activeVersion);
            if (!vd) return;

            vd.encounter_details.forEach((ed) => {
                const method = ed.method.name;
                if (!map.has(method)) map.set(method, []);
                const id       = extractId(pe.pokemon.url);
                const existing = map.get(method)!.find((e) => e.pokemon.name === pe.pokemon.name);
                if (!existing) {
                    map.get(method)!.push({
                        pokemon:    { name: pe.pokemon.name, id },
                        minLv:      ed.min_level,
                        maxLv:      ed.max_level,
                        chance:     ed.chance,
                        conditions: ed.condition_values.map((c) => c.name),
                    });
                }
            });
        });

        map.forEach((arr) => arr.sort((a, b) => b.chance - a.chance));
        return map;
    }, [area, activeVersion]);

    const hasEncounters =
        encountersByMethod.size > 0 &&
        Array.from(encountersByMethod.values()).some((v) => v.length > 0);

    /* Empty state */
    if (allVersions.length === 0 || !hasEncounters) {
        return (
            <div className="py-14 flex flex-col items-center gap-4 text-center">
                <AlertTriangle size={28} className="text-[#CCC]" />
                <p className="font-['Press_Start_2P'] text-[9px] text-[#AAA]">SIN ENCUENTROS</p>
                <p className="font-['Nunito'] text-[14px] text-[#888] italic max-w-sm">
                    No hay Pokémon registrados en esta área para la versión seleccionada.
                </p>
            </div>
        );
    }

    /* Stats summary */
    let totalPokemon = 0;
    encountersByMethod.forEach((arr) => { totalPokemon += arr.length; });

    return (
        <div className="p-5">
            {/* Version dropdown */}
            <VersionDropdown
                versions={allVersions}
                active={activeVersion}
                onChange={setActiveVersion}
                regionColor={regionColor}
            />

            {/* Stats bar */}
            <div className="flex items-center gap-3 mb-6 py-2.5 px-4 bg-[#111] border-[2px] border-[#111]">
                <span className="font-['Press_Start_2P'] text-[7px] text-white/60">ENCONTRADOS</span>
                <span className="font-['Press_Start_2P'] text-[11px] text-white">{totalPokemon}</span>
                <span className="font-['Press_Start_2P'] text-[7px] text-white/60">POKÉMON ·</span>
                <span className="font-['Press_Start_2P'] text-[11px] text-white">{encountersByMethod.size}</span>
                <span className="font-['Press_Start_2P'] text-[7px] text-white/60">MÉTODOS</span>
                <div className="flex-1" />
                <span
                    className="font-['Press_Start_2P'] text-[7px]"
                    style={{ color: regionColor }}
                >
                    {capitalize(activeVersion)}
                </span>
            </div>

            {/* Encounter groups by method */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeVersion}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="space-y-8"
                >
                    {Array.from(encountersByMethod.entries()).map(([method, encounters]) => {
                        if (encounters.length === 0) return null;
                        const meta      = ENCOUNTER_METHOD_META[method] ?? { label: capitalize(method), icon: "MapPin" };
                        const IconComp  = ICON_MAP[meta.icon] ?? MapPin;

                        return (
                            <div key={method}>
                                {/* Method header */}
                                <div className="flex items-center gap-3 mb-4">
                                    <div
                                        className="w-8 h-8 flex items-center justify-center border-[2px] border-[#111] shrink-0"
                                        style={{ backgroundColor: regionColor }}
                                    >
                                        <IconComp size={15} className="text-white" />
                                    </div>
                                    <span className="font-['Press_Start_2P'] text-[9px] text-[#111] uppercase">
                                        {meta.label}
                                    </span>
                                    <div className="h-[2px] bg-[#E0E0E0] flex-1" />
                                    <span className="font-['Nunito'] font-black text-[12px] text-[#888] bg-[#F0F0F0] px-2 py-0.5 border border-[#DDD]">
                                        {encounters.length} PKM
                                    </span>
                                </div>

                                {/* Pokémon card grid */}
                                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                                    {encounters.map((enc, i) => (
                                        <PokemonCard
                                            key={enc.pokemon.name}
                                            {...enc}
                                            regionColor={regionColor}
                                            idx={i}
                                        />
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}