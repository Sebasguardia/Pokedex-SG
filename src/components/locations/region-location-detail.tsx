"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Map, Mountain, Waves, Trees, Home, Anchor,
    Building2, MapPin, Loader2, Key, Layers,
} from "lucide-react";
import { NamedAPIResource } from "@/types/api/common.types";
import { useLocation, useLocationArea } from "@/lib/hooks/locations/useLocations";
import { RegionEncounterTable } from "./region-encounter-table";
import {
    inferLocationType, formatLocationName, LOCATION_TYPE_META,
} from "@/lib/constants/locations/locations.constants";

const TYPE_ICON_MAP: Record<string, React.ElementType> = {
    city: Building2, cave: Mountain, route: Map, water: Waves,
    forest: Trees, building: Home, mountain: Mountain, island: Anchor, other: MapPin,
};

const TYPE_COLOR_MAP: Record<string, string> = {
    city: "#3B82F6", cave: "#78716C", route: "#16A34A", water: "#0EA5E9",
    forest: "#15803D", building: "#D97706", mountain: "#6B7280",
    island: "#0891B2", other: "#6D28D9",
};

interface RegionLocationDetailProps {
    locationRef: NamedAPIResource;
    regionColor: string;
}

/** Loads a single area and renders its encounter table */
function AreaContent({
    areaRef, regionColor,
}: { areaRef: NamedAPIResource; regionColor: string }) {
    const { data: area, isLoading } = useLocationArea(areaRef.name, true);

    if (isLoading) {
        return (
            <div className="py-20 flex flex-col items-center gap-4">
                <Loader2
                    size={32}
                    className="animate-spin"
                    style={{ color: regionColor }}
                />
                <p className="font-['Press_Start_2P'] text-[8px] text-[#888]">
                    ACCEDIENDO AL SECTOR...
                </p>
            </div>
        );
    }

    if (!area) return null;

    return <RegionEncounterTable area={area} regionColor={regionColor} />;
}

export function RegionLocationDetail({
    locationRef, regionColor,
}: RegionLocationDetailProps) {
    const locationName = locationRef.name;
    const locType   = inferLocationType(locationName);
    const typeMeta  = LOCATION_TYPE_META[locType];
    const TypeIcon  = TYPE_ICON_MAP[locType] ?? MapPin;
    const typeColor = TYPE_COLOR_MAP[locType] ?? "#888";
    const displayName = formatLocationName(locationName);

    const { data: location, isLoading } = useLocation(locationName, true);
    const [activeArea, setActiveArea]   = useState<string | null>(null);

    const areas = location?.areas ?? [];
    const effectiveArea = activeArea ?? areas[0]?.name ?? null;

    /* ── Loading ─────────────────────────────────────────────────── */
    if (isLoading) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center py-24 gap-5">
                <Loader2
                    size={40}
                    className="animate-spin"
                    style={{ color: regionColor }}
                />
                <p className="font-['Press_Start_2P'] text-[9px] text-[#888]">
                    CARGANDO LOCACIÓN...
                </p>
            </div>
        );
    }

    /* ── Detail ──────────────────────────────────────────────────── */
    return (
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">

            {/* ── LOCATION HEADER ── */}
            <div className="border-b-[3px] border-[#111] bg-white shrink-0">
                <div className="flex items-stretch">
                    {/* Type column */}
                    <div
                        className="w-14 flex flex-col items-center justify-center shrink-0 border-r-[3px] border-[#111] py-4 gap-1"
                        style={{ backgroundColor: typeColor }}
                    >
                        <TypeIcon size={22} className="text-white" />
                        <span className="font-['Press_Start_2P'] text-[5px] text-white/70 tracking-tight text-center">
                            {locType.toUpperCase()}
                        </span>
                    </div>

                    {/* Name & type */}
                    <div className="flex-1 px-5 py-4">
                        <p
                            className="font-['Press_Start_2P'] text-[7px] mb-1"
                            style={{ color: typeColor }}
                        >
                            {typeMeta.label.toUpperCase()}
                        </p>
                        <h3 className="font-['Nunito'] font-black text-[22px] text-[#111] leading-tight">
                            {displayName}
                        </h3>
                    </div>

                    {/* Sub-area count chip */}
                    <div className="flex items-center gap-2 px-5 border-l-[3px] border-[#111] bg-[#FAFAFA]">
                        <div className="flex flex-col items-center">
                            <Layers size={16} style={{ color: regionColor }} />
                            <span
                                className="font-['Press_Start_2P'] text-[11px] mt-1"
                                style={{ color: regionColor }}
                            >
                                {areas.length}
                            </span>
                            <span className="font-['Press_Start_2P'] text-[6px] text-[#888]">
                                ÁREAS
                            </span>
                        </div>
                    </div>
                </div>

                {/* Accent line */}
                <div className="h-[3px]" style={{ backgroundColor: typeColor }} />
            </div>

            {/* ── AREA TABS ── */}
            {areas.length > 1 && (
                <div
                    className="flex items-end overflow-x-auto border-b-[3px] border-[#111] bg-[#F5F5F5] shrink-0"
                    style={{ scrollbarWidth: "none" }}
                >
                    {areas.map((areaRef) => {
                        const isActive = effectiveArea === areaRef.name;
                        const label    = formatLocationName(areaRef.name);
                        return (
                            <button
                                key={areaRef.name}
                                onClick={() => setActiveArea(areaRef.name)}
                                className="relative flex items-center gap-2 px-5 py-3 border-r-[3px] border-[#111] transition-colors whitespace-nowrap shrink-0"
                                style={{
                                    backgroundColor: isActive ? "#fff" : "transparent",
                                    marginBottom: "-3px",
                                    paddingBottom: isActive ? "15px" : "12px",
                                }}
                            >
                                <span
                                    className="font-['Press_Start_2P'] text-[7px] uppercase"
                                    style={{ color: isActive ? regionColor : "#888" }}
                                >
                                    {label}
                                </span>

                                {isActive && (
                                    <motion.div
                                        layoutId="activeAreaTab"
                                        className="absolute bottom-0 left-0 right-0 h-[3px]"
                                        style={{ backgroundColor: regionColor }}
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>
            )}

            {/* ── AREA CONTENT ── */}
            <div className="flex-1 overflow-y-auto bg-[#FAFAFA]">
                {areas.length === 0 ? (
                    /* Empty state */
                    <div className="py-16 flex flex-col items-center gap-4 text-center">
                        <div className="w-16 h-16 border-[3px] border-[#CCC] border-dashed flex items-center justify-center">
                            <Key size={28} className="text-[#CCC]" />
                        </div>
                        <p className="font-['Press_Start_2P'] text-[10px] text-[#AAA]">
                            SIN SUB-ÁREAS
                        </p>
                        <p className="font-['Nunito'] text-[14px] text-[#888] italic max-w-sm">
                            Esta locación no tiene sub-sectores con datos de encuentros
                            registrados en la PokéAPI.
                        </p>
                    </div>
                ) : effectiveArea ? (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={effectiveArea}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <AreaContent
                                areaRef={
                                    areas.find((a) => a.name === effectiveArea) ?? areas[0]
                                }
                                regionColor={regionColor}
                            />
                        </motion.div>
                    </AnimatePresence>
                ) : null}
            </div>
        </div>
    );
}
