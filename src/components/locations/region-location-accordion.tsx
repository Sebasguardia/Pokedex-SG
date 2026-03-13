"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MapPin, Layers, Loader2 } from "lucide-react";
import { NamedAPIResource } from "@/types/api/common.types";
import { useLocation, useLocationArea } from "@/lib/hooks/useLocations";
import { RegionEncounterTable } from "./region-encounter-table";
import { inferLocationType, formatLocationName, LOCATION_TYPE_META } from "@/lib/constants/locations.constants";
import {
    Map, Mountain, Waves, Trees, Home, Anchor, Building2, Mountain as Mountain2,
} from "lucide-react";

// Mapa de ícono de tipo
const TYPE_ICON_MAP: Record<string, React.ElementType> = {
    city: Building2, cave: Mountain, route: Map, water: Waves,
    forest: Trees, building: Home, mountain: Mountain2, island: Anchor, other: MapPin,
};

interface RegionLocationAccordionProps {
    locationRef: NamedAPIResource;
    regionColor: string;
    isOpen: boolean;
    onToggle: () => void;
}

function extractNameFromUrl(url: string): string {
    const parts = url.replace(/\/$/, "").split("/");
    return parts[parts.length - 1];
}

// Sub-componente para un área individual (carga lazy)
function AreaEncounters({ areaRef, regionColor }: { areaRef: NamedAPIResource; regionColor: string }) {
    const areaName = extractNameFromUrl(areaRef.url);
    const { data: area, isLoading } = useLocationArea(areaName, true);

    const areaLabel = formatLocationName(
        areaRef.name.replace(areaName.split("-area")[0] + "-", "")
    ) || "Área principal";

    if (isLoading) {
        return (
            <div className="py-4 flex items-center gap-2 text-[#888888]">
                <Loader2 size={13} className="animate-spin" />
                <span className="font-nunito text-[12px]">Cargando encuentros...</span>
            </div>
        );
    }

    if (!area) return null;

    return (
        <div className="mb-4 last:mb-0">
            {/* Área label */}
            <div className="flex items-center gap-1.5 mb-3">
                <MapPin size={11} style={{ color: regionColor }} />
                <span className="font-nunito font-bold text-[12.5px] text-[#555555] uppercase tracking-wide">
                    {formatLocationName(areaRef.name)}
                </span>
            </div>
            <RegionEncounterTable area={area} regionColor={regionColor} />
        </div>
    );
}

export function RegionLocationAccordion({
    locationRef, regionColor, isOpen, onToggle,
}: RegionLocationAccordionProps) {
    const locationName = extractNameFromUrl(locationRef.url);
    const locType = inferLocationType(locationName);
    const typeMeta = LOCATION_TYPE_META[locType];
    const TypeIcon = TYPE_ICON_MAP[locType] ?? MapPin;
    const displayName = formatLocationName(locationName);

    // La locación solo se carga cuando el acordeón está abierto
    const { data: location, isLoading: isLoadingLoc } = useLocation(locationName, isOpen);

    return (
        <div
            className="border-b border-[#F0F0F0] last:border-b-0 transition-colors"
            style={isOpen ? { backgroundColor: "#FAFAFA" } : {}}
        >
            {/* ── HEADER (siempre visible) ── */}
            <button
                className="w-full flex items-center gap-3 px-4 py-3.5 text-left group"
                onClick={onToggle}
            >
                {/* Dot de color + tipo */}
                <div
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: isOpen ? regionColor : "#CCCCCC" }}
                />

                <TypeIcon size={13} className={isOpen ? "" : "text-[#888888]"} style={isOpen ? { color: regionColor } : {}} />

                {/* Nombre */}
                <span
                    className="font-nunito font-bold text-[14.5px] flex-1 text-left transition-colors"
                    style={{ color: isOpen ? "#111111" : "#444444" }}
                >
                    {displayName}
                </span>

                {/* Tipo label */}
                <span className="font-nunito text-[11px] text-[#AAAAAA] hidden sm:block shrink-0">
                    {typeMeta.label}
                </span>

                {/* Áreas count (si ya cargó) */}
                {location && (
                    <div
                        className="shrink-0 px-2 py-0.5 border font-jetbrains text-[10.5px]"
                        style={{ borderColor: regionColor, color: regionColor, backgroundColor: `${regionColor}12` }}
                    >
                        {location.areas.length} {location.areas.length === 1 ? "área" : "áreas"}
                    </div>
                )}

                {/* Loading indicator */}
                {isOpen && isLoadingLoc && (
                    <Loader2 size={13} className="animate-spin text-[#888888] shrink-0" />
                )}

                {/* Chevron */}
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="shrink-0"
                >
                    <ChevronDown size={15} style={{ color: isOpen ? regionColor : "#888888" }} />
                </motion.div>
            </button>

            {/* Borde inferior del color cuando está abierto */}
            {isOpen && (
                <div className="h-[2px] mx-4" style={{ backgroundColor: regionColor, opacity: 0.4 }} />
            )}

            {/* ── BODY (acordeón animado) ── */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                    >
                        <div className="px-4 pb-5 pt-3">
                            {isLoadingLoc ? (
                                /* Skeleton de 3 filas mientras carga la locación */
                                <div className="space-y-2">
                                    {[90, 70, 85].map((w, i) => (
                                        <div key={i} className="flex items-center gap-2 animate-pulse">
                                            <div className="w-8 h-8 bg-[#E8E8E8]" />
                                            <div className="h-3 bg-[#E8E8E8]" style={{ width: `${w}%` }} />
                                        </div>
                                    ))}
                                </div>
                            ) : location?.areas.length === 0 ? (
                                <p className="font-nunito text-[13px] text-[#888888] italic py-2">
                                    Sin sub-áreas registradas en esta locación.
                                </p>
                            ) : (
                                /* Áreas — cada una carga sus encounters de forma independiente */
                                <div className="space-y-5">
                                    {location?.areas.map((areaRef) => (
                                        <AreaEncounters key={areaRef.name} areaRef={areaRef} regionColor={regionColor} />
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