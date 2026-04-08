"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search, X, Map, Mountain, Waves, Trees, Home, Anchor,
    Building2, MapPin, SlidersHorizontal, AlertCircle, ChevronRight,
} from "lucide-react";
import Fuse from "fuse.js";
import { NamedAPIResource } from "@/types/api/common.types";
import {
    inferLocationType, formatLocationName,
    LOCATION_TYPE_META, LocationType,
} from "@/lib/constants/locations.constants";
import { RegionLocationDetail } from "./region-location-detail";

/* ── Types ─────────────────────────────────────────────────────────── */
interface RegionLocationsListProps {
    locations:       NamedAPIResource[];
    regionColor:     string;
    regionName:      string;
    preOpenLocation?: string;
}

/* ── Constants ─────────────────────────────────────────────────────── */
const FILTER_OPTIONS: {
    key: LocationType | "all"; label: string; Icon: React.ElementType;
}[] = [
    { key: "all",      label: "Todos",     Icon: MapPin      },
    { key: "city",     label: "Ciudades",  Icon: Building2   },
    { key: "route",    label: "Rutas",     Icon: Map         },
    { key: "cave",     label: "Cuevas",    Icon: Mountain    },
    { key: "water",    label: "Agua",      Icon: Waves       },
    { key: "forest",   label: "Bosques",   Icon: Trees       },
    { key: "mountain", label: "Montañas",  Icon: Mountain    },
    { key: "building", label: "Edificios", Icon: Home        },
    { key: "island",   label: "Islas",     Icon: Anchor      },
];

const TYPE_ICON_MAP: Record<string, React.ElementType> = {
    city: Building2, cave: Mountain, route: Map, water: Waves,
    forest: Trees, building: Home, mountain: Mountain, island: Anchor, other: MapPin,
};

const TYPE_COLOR_MAP: Record<string, string> = {
    city: "#3B82F6", cave: "#78716C", route: "#16A34A", water: "#0EA5E9",
    forest: "#15803D", building: "#D97706", mountain: "#6B7280",
    island: "#0891B2", other: "#6D28D9",
};

/* ── Sidebar list item ─────────────────────────────────────────────── */
function LocationListItem({
    loc, isSelected, regionColor, onClick, idx,
}: {
    loc: NamedAPIResource;
    isSelected: boolean;
    regionColor: string;
    onClick: () => void;
    idx: number;
}) {
    const locType  = inferLocationType(loc.name);
    const TypeIcon = TYPE_ICON_MAP[locType] ?? MapPin;
    const color    = TYPE_COLOR_MAP[locType] ?? "#888";

    return (
        <motion.button
            onClick={onClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: Math.min(idx * 0.012, 0.25) }}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-left border-b border-[#E8E8E8] transition-all group"
            style={{
                backgroundColor: isSelected ? "#fff"        : "transparent",
                borderLeftWidth: "4px",
                borderLeftStyle: "solid",
                borderLeftColor: isSelected ? regionColor   : "transparent",
            }}
        >
            {/* Type icon */}
            <div
                className="w-7 h-7 flex items-center justify-center shrink-0 transition-colors"
                style={{
                    backgroundColor: color + (isSelected ? "25" : "15"),
                    border:          `1.5px solid ${color}${isSelected ? "60" : "30"}`,
                    color,
                }}
            >
                <TypeIcon size={13} />
            </div>

            {/* Name */}
            <span
                className="font-['Nunito'] font-bold text-[13px] flex-1 leading-tight truncate transition-colors"
                style={{ color: isSelected ? "#111" : "#666" }}
            >
                {formatLocationName(loc.name)}
            </span>

            {/* Arrow when selected */}
            {isSelected && (
                <ChevronRight
                    size={14}
                    className="shrink-0 transition-colors"
                    style={{ color: regionColor }}
                />
            )}
        </motion.button>
    );
}

/* ── Placeholder shown when nothing is selected ────────────────────── */
function DetailPlaceholder({
    regionColor, locationCount,
}: { regionColor: string; locationCount: number }) {
    return (
        <motion.div
            key="placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center gap-6 p-10 bg-[#FAFAFA] text-center"
        >
            <div
                className="w-20 h-20 flex items-center justify-center border-[3px] border-dashed"
                style={{ borderColor: regionColor + "60", backgroundColor: regionColor + "0D" }}
            >
                <MapPin size={36} style={{ color: regionColor + "60" }} />
            </div>

            <div>
                <p className="font-['Press_Start_2P'] text-[11px] text-[#AAA] mb-2">
                    SELECCIONA UNA LOCACIÓN
                </p>
                <p className="font-['Nunito'] text-[14px] text-[#888] italic max-w-xs mx-auto">
                    Elige una ubicación en la lista de la izquierda para explorar sus
                    Pokémon disponibles.
                </p>
            </div>

            <div
                className="flex items-center gap-2 px-5 py-2.5 border-[2px] border-dashed border-[#CCC]"
            >
                <MapPin size={14} className="text-[#CCC]" />
                <span className="font-['Press_Start_2P'] text-[7px] text-[#CCC]">
                    {locationCount} LOCACIONES DISPONIBLES
                </span>
            </div>
        </motion.div>
    );
}

/* ── Main Component ─────────────────────────────────────────────────── */
export function RegionLocationsList({
    locations, regionColor, regionName, preOpenLocation,
}: RegionLocationsListProps) {
    const [query,      setQuery     ] = useState("");
    const [typeFilter, setTypeFilter] = useState<LocationType | "all">("all");
    const [selectedLoc, setSelectedLoc] = useState<NamedAPIResource | null>(
        preOpenLocation
            ? (locations.find((l) => l.name === preOpenLocation) ?? null)
            : null
    );

    /* Fuse.js fuzzy search */
    const fuse = useMemo(
        () => new Fuse(locations, { keys: ["name"], threshold: 0.35 }),
        [locations]
    );

    /* Filtered list */
    const filtered = useMemo(() => {
        let list = query.trim()
            ? fuse.search(query).map((r) => r.item)
            : locations;
        if (typeFilter !== "all")
            list = list.filter((loc) => inferLocationType(loc.name) === typeFilter);
        return list;
    }, [query, typeFilter, fuse, locations]);

    /* Category counts */
    const categoryCounts = useMemo(() => {
        const c: Record<string, number> = { all: locations.length };
        locations.forEach((l) => {
            const t = inferLocationType(l.name);
            c[t]    = (c[t] ?? 0) + 1;
        });
        return c;
    }, [locations]);

    /* Only show filters that exist in this region */
    const presentTypes = useMemo(() => {
        const s = new Set(locations.map((l) => inferLocationType(l.name)));
        return FILTER_OPTIONS.filter(
            (f) => f.key === "all" || s.has(f.key as LocationType)
        );
    }, [locations]);

    const handleFilterChange = useCallback((key: LocationType | "all") => {
        setTypeFilter(key);
        setSelectedLoc(null);
    }, []);

    return (
        <section>
            {/* ── SECTION HEADER ── */}
            <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 bg-[#CC0000]" />
                <h2 className="font-['Press_Start_2P'] text-[13px] uppercase text-[#111111] whitespace-nowrap">
                    LOCACIONES
                </h2>
                <div className="h-[3px] bg-[#111111] flex-1" />
                <span
                    className="font-['Press_Start_2P'] text-[9px] px-3 py-1.5 border-2 border-[#111111] shrink-0"
                    style={{ color: regionColor, boxShadow: `3px 3px 0 ${regionColor}` }}
                >
                    {locations.length} UBICACIONES
                </span>
            </div>

            {/* ── OUTER PANEL ── */}
            <div
                className="border-[3px] border-[#111111] relative"
                style={{ boxShadow: `6px 6px 0 ${regionColor}` }}
            >
                {/* Floating label */}
                <div className="absolute top-[-16px] left-4 bg-[#111111] px-3 py-1.5 z-10">
                    <span className="font-['Press_Start_2P'] text-[9px] text-white tracking-widest">
                        {regionName.toUpperCase()} · MAPA DE LOCACIONES
                    </span>
                </div>

                <div className="pt-8">
                    {/* ── TOOLBAR ── */}
                    <div className="px-4 sm:px-5 pb-4 border-b-[3px] border-[#111]">
                        {/* Search */}
                        <div className="flex items-center gap-3 border-[3px] border-[#111111] px-4 py-3 mb-3 bg-white shadow-[3px_3px_0_#111] focus-within:shadow-none focus-within:border-[#CC0000] transition-all">
                            <Search size={16} className="text-[#888888] shrink-0" />
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => {
                                    setQuery(e.target.value);
                                    setSelectedLoc(null);
                                }}
                                placeholder={`Buscar en ${regionName}...`}
                                className="flex-1 font-['Nunito'] font-bold text-[15px] text-[#111111] placeholder:text-[#BBBBBB] outline-none bg-transparent"
                            />
                            {query && (
                                <button
                                    onClick={() => setQuery("")}
                                    className="border-[2px] border-[#111] bg-[#EFEFEF] p-1 hover:bg-[#CC0000] hover:border-[#CC0000] hover:text-white transition-colors"
                                    aria-label="Limpiar búsqueda"
                                >
                                    <X size={12} />
                                </button>
                            )}
                        </div>

                        {/* Category filter pills */}
                        <div className="flex flex-wrap gap-1.5 items-center">
                            <SlidersHorizontal size={12} className="text-[#888] shrink-0" />
                            {presentTypes.map(({ key, label, Icon }) => {
                                const isActive = typeFilter === key;
                                const count    = categoryCounts[key] ?? 0;
                                return (
                                    <button
                                        key={key}
                                        onClick={() =>
                                            handleFilterChange(key as LocationType | "all")
                                        }
                                        className="flex items-center gap-1.5 px-2.5 py-1.5 border-[2px] transition-all"
                                        style={{
                                            backgroundColor: isActive ? "#111111"  : "#ffffff",
                                            color:           isActive ? "#ffffff"  : "#333333",
                                            borderColor:     isActive ? "#111111"  : "#CCCCCC",
                                            boxShadow:       isActive
                                                ? `2px 2px 0 ${regionColor}`
                                                : "none",
                                        }}
                                    >
                                        <Icon
                                            size={10}
                                            style={{ color: isActive ? regionColor : "#888" }}
                                        />
                                        <span className="font-['Press_Start_2P'] text-[7px] uppercase">
                                            {label}
                                        </span>
                                        <span
                                            className="font-['Nunito'] font-black text-[11px] px-1.5 border min-w-[20px] text-center rounded-sm"
                                            style={{
                                                borderColor:     isActive ? regionColor   : "#E0E0E0",
                                                color:           isActive ? regionColor   : "#888",
                                                backgroundColor: isActive
                                                    ? "rgba(255,255,255,0.12)"
                                                    : "#F5F5F5",
                                            }}
                                        >
                                            {count}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* ── TWO-COLUMN LAYOUT: SIDEBAR + DETAIL ── */}
                    <div className="flex flex-col md:flex-row" style={{ minHeight: "580px", maxHeight: "820px" }}>

                        {/* ── LEFT SIDEBAR ── */}
                        <div
                            className="w-full md:w-[270px] shrink-0 border-b-[3px] md:border-b-0 md:border-r-[3px] border-[#111] flex flex-col overflow-hidden bg-[#FAFAFA]"
                            style={{ maxHeight: "820px" }}
                        >
                            {/* Sticky count header */}
                            <div className="px-3 py-2.5 bg-[#111] flex items-center justify-between shrink-0 sticky top-0 z-10">
                                <span className="font-['Press_Start_2P'] text-[7px] text-white/80">
                                    {filtered.length} LOCACIONES
                                </span>
                                {query && (
                                    <span className="font-['Nunito'] text-[10px] text-white/50 italic truncate ml-2 max-w-[100px]">
                                        "{query}"
                                    </span>
                                )}
                            </div>

                            {/* List */}
                            <div className="overflow-y-auto flex-1">
                                {filtered.length === 0 ? (
                                    <div className="py-12 flex flex-col items-center gap-3 text-center">
                                        <AlertCircle size={24} className="text-[#CCC]" />
                                        <p className="font-['Press_Start_2P'] text-[8px] text-[#CCC] px-4">
                                            SIN RESULTADOS
                                        </p>
                                        <button
                                            onClick={() => {
                                                setQuery("");
                                                setTypeFilter("all");
                                            }}
                                            className="font-['Press_Start_2P'] text-[7px] px-3 py-1.5 border-[2px] border-[#CCC] text-[#CCC] hover:border-[#111] hover:text-[#111] transition-colors mt-1"
                                        >
                                            LIMPIAR
                                        </button>
                                    </div>
                                ) : (
                                    filtered.map((loc, idx) => (
                                        <LocationListItem
                                            key={loc.name}
                                            loc={loc}
                                            idx={idx}
                                            isSelected={selectedLoc?.name === loc.name}
                                            regionColor={regionColor}
                                            onClick={() => setSelectedLoc(loc)}
                                        />
                                    ))
                                )}
                            </div>
                        </div>

                        {/* ── RIGHT DETAIL PANEL ── */}
                        <div className="flex-1 flex flex-col overflow-hidden min-h-[400px] md:min-h-0">
                            <AnimatePresence mode="wait">
                                {selectedLoc ? (
                                    <motion.div
                                        key={selectedLoc.name}
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -5 }}
                                        transition={{ duration: 0.2 }}
                                        className="flex-1 flex flex-col overflow-hidden"
                                    >
                                        <RegionLocationDetail
                                            locationRef={selectedLoc}
                                            regionColor={regionColor}
                                        />
                                    </motion.div>
                                ) : (
                                    <DetailPlaceholder
                                        regionColor={regionColor}
                                        locationCount={locations.length}
                                    />
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}