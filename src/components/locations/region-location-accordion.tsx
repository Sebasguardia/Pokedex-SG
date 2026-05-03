"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MapPin, Layers, Loader2, Key, CheckCircle } from "lucide-react";
import { Map, Mountain, Waves, Trees, Home, Anchor, Building2 } from "lucide-react";
import { NamedAPIResource } from "@/types/api/common.types";
import { useLocation, useLocationArea } from "@/lib/hooks/locations/useLocations";
import { RegionEncounterTable } from "./region-encounter-table";
import { inferLocationType, formatLocationName, LOCATION_TYPE_META } from "@/lib/constants/locations/locations.constants";

const TYPE_ICON_MAP: Record<string, React.ElementType> = {
    city: Building2,
    cave: Mountain,
    route: Map,
    water: Waves,
    forest: Trees,
    building: Home,
    mountain: Mountain,
    island: Anchor,
    other: MapPin,
};

// Color tint per type
const TYPE_COLOR_MAP: Record<string, string> = {
    city:     "#3B82F6",
    cave:     "#78716C",
    route:    "#16A34A",
    water:    "#0EA5E9",
    forest:   "#15803D",
    building: "#D97706",
    mountain: "#6B7280",
    island:   "#0891B2",
    other:    "#6D28D9",
};

interface RegionLocationAccordionProps {
    locationRef: NamedAPIResource;
    regionColor: string;
    isOpen: boolean;
    onToggle: () => void;
}

function extractIdFromUrl(url: string): string {
    const parts = url.replace(/\/$/, "").split("/");
    return parts[parts.length - 1];
}

function AreaEncounters({ areaRef, regionColor }: { areaRef: NamedAPIResource; regionColor: string }) {
    const { data: area, isLoading } = useLocationArea(areaRef.name, true);

    if (isLoading) {
        return (
            <div className="py-8 flex flex-col items-center justify-center gap-3">
                <Loader2 size={20} className="animate-spin" style={{ color: regionColor }} />
                <span className="font-['Press_Start_2P'] text-[8px] text-[#888]">CARGANDO DATOS DEL ÁREA...</span>
            </div>
        );
    }

    if (!area) return null;

    const hasEncounters = area.pokemon_encounters.length > 0;

    return (
        <div>
            {/* Area header bar */}
            <div
                className="flex items-center gap-3 px-4 py-2.5 mb-0 border-b-[2px] border-[#111]"
                style={{ backgroundColor: regionColor }}
            >
                <MapPin size={12} className="text-white shrink-0" />
                <span className="font-['Press_Start_2P'] text-[8px] text-white tracking-wider flex-1 uppercase">
                    {formatLocationName(areaRef.name)}
                </span>
                {hasEncounters && (
                    <span className="font-['Nunito'] font-black text-[11px] text-white bg-black/20 px-2 py-0.5">
                        {area.pokemon_encounters.length} PKM
                    </span>
                )}
            </div>

            <div className="bg-white">
                <RegionEncounterTable area={area} regionColor={regionColor} />
            </div>
        </div>
    );
}

export function RegionLocationAccordion({
    locationRef, regionColor, isOpen, onToggle,
}: RegionLocationAccordionProps) {
    const locationId   = extractIdFromUrl(locationRef.url);
    const locationName = locationRef.name;
    const locType      = inferLocationType(locationName);
    const typeMeta     = LOCATION_TYPE_META[locType];
    const TypeIcon     = TYPE_ICON_MAP[locType] ?? MapPin;
    const typeColor    = TYPE_COLOR_MAP[locType] ?? "#888888";
    const displayName  = formatLocationName(locationName);

    const { data: location, isLoading: isLoadingLoc } = useLocation(locationName, isOpen);

    return (
        <div
            className="border-[3px] border-[#111111] bg-white transition-all duration-200"
            style={
                isOpen
                    ? { boxShadow: `5px 5px 0 ${regionColor}`, transform: "translate(-2px, -2px)" }
                    : { boxShadow: "3px 3px 0 #111111" }
            }
        >
            {/* ── HEADER BUTTON ── */}
            <button
                className="w-full flex text-left group"
                onClick={onToggle}
                aria-expanded={isOpen}
            >
                {/* Left: Type Icon Column */}
                <div
                    className="w-14 shrink-0 flex flex-col items-center justify-center gap-1 border-r-[3px] border-[#111] py-3 transition-colors"
                    style={{ backgroundColor: isOpen ? typeColor : "#F5F5F5" }}
                >
                    <TypeIcon size={18} style={{ color: isOpen ? "#fff" : typeColor }} />
                    <span
                        className="font-['Press_Start_2P'] text-[5px] leading-tight rotate-0 tracking-tight text-center"
                        style={{ color: isOpen ? "rgba(255,255,255,0.7)" : "#A0A0A0" }}
                    >
                        {locType.toUpperCase()}
                    </span>
                </div>

                {/* Center: Name + ID */}
                <div className="flex-1 px-4 py-3 bg-white group-hover:bg-[#FAFAFA] transition-colors">
                    <div className="flex items-baseline gap-2 mb-1">
                        <span className="font-['Press_Start_2P'] text-[7px] text-[#AAAAAA] tracking-widest">
                            #{locationId.padStart(5, "0")}
                        </span>
                    </div>
                    <span className="font-['Nunito'] font-black text-[17px] text-[#111111] leading-tight">
                        {displayName}
                    </span>
                </div>

                {/* Right: Meta + Chevron */}
                <div className="shrink-0 flex items-center gap-2 px-3 py-3 border-l-[3px] border-[#111] bg-[#FAFAFA] group-hover:bg-[#EFEFEF] transition-colors">
                    {/* Type badge */}
                    <div
                        className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 border-[2px] border-[#111]"
                        style={{ backgroundColor: typeColor + "15" }}
                    >
                        <TypeIcon size={9} style={{ color: typeColor }} />
                        <span className="font-['Press_Start_2P'] text-[7px]" style={{ color: typeColor }}>
                            {typeMeta.label}
                        </span>
                    </div>

                    {/* Areas badge */}
                    <div className="flex items-center gap-1 px-2.5 py-1 bg-[#111] border-[2px] border-[#111]">
                        {isOpen && isLoadingLoc ? (
                            <Loader2 size={10} className="animate-spin text-white" />
                        ) : (
                            <Layers size={9} className="text-white" />
                        )}
                        <span className="font-['Press_Start_2P'] text-[7px] text-white">
                            {location ? `${location.areas.length}Á` : "?Á"}
                        </span>
                    </div>

                    {/* Chevron */}
                    <div className="w-7 h-7 flex items-center justify-center border-[2px] border-[#111] bg-white">
                        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                            <ChevronDown size={15} className="text-[#111]" />
                        </motion.div>
                    </div>
                </div>
            </button>

            {/* ── EXPANDED BODY ── */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                    >
                        {/* Separator bar with region color */}
                        <div className="h-[3px]" style={{ backgroundColor: regionColor }} />

                        <div className="bg-[#FAFAFA] p-4 sm:p-5">
                            {isLoadingLoc ? (
                                /* ── Skeleton Loader ── */
                                <div className="space-y-4">
                                    {[1, 2].map((i) => (
                                        <div key={i} className="animate-pulse">
                                            <div className="h-9 bg-[#E0E0E0] border-[2px] border-[#CCC] mb-3 w-full" />
                                            <div className="space-y-2 px-2">
                                                {[80, 65, 90].map((w, j) => (
                                                    <div key={j} className="h-12 bg-[#EBEBEB] border border-[#DDD]" style={{ width: `${w}%` }} />
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : location?.areas.length === 0 ? (
                                /* ── Empty State ── */
                                <div className="border-[3px] border-dashed border-[#CCCCCC] bg-white p-8 flex flex-col items-center justify-center gap-3 text-center">
                                    <div className="w-12 h-12 border-[3px] border-[#CCC] flex items-center justify-center">
                                        <Key size={22} className="text-[#CCC]" />
                                    </div>
                                    <p className="font-['Press_Start_2P'] text-[9px] text-[#AAAAAA]">SIN SUB-ÁREAS</p>
                                    <p className="font-['Nunito'] text-[13px] text-[#888] italic max-w-xs">
                                        Esta locación no tiene sub-sectores con encuentros Pokémon registrados.
                                    </p>
                                </div>
                            ) : (
                                /* ── Area List ── */
                                <div className="space-y-5">
                                    {/* Area count summary */}
                                    <div className="flex items-center gap-2">
                                        <CheckCircle size={13} style={{ color: regionColor }} />
                                        <span className="font-['Press_Start_2P'] text-[7px] text-[#888]">
                                            {location?.areas.length} {location?.areas.length === 1 ? "SUB-ÁREA" : "SUB-ÁREAS"} DISPONIBLES
                                        </span>
                                    </div>

                                    {location?.areas.map((areaRef, i) => (
                                        <motion.div
                                            key={areaRef.name}
                                            initial={{ opacity: 0, y: 6 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            className="border-[3px] border-[#111] bg-white overflow-hidden shadow-[3px_3px_0_#111]"
                                        >
                                            <AreaEncounters areaRef={areaRef} regionColor={regionColor} />
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}