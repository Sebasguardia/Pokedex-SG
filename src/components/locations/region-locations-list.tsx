"use client";

import { useState, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Search, X, SlidersHorizontal } from "lucide-react";
import Fuse from "fuse.js";
import { NamedAPIResource } from "@/types/api/common.types";
import {
    inferLocationType, formatLocationName,
    LOCATION_TYPE_META, LocationType,
} from "@/lib/constants/locations.constants";
import { RegionLocationAccordion } from "./region-location-accordion";

interface RegionLocationsListProps {
    locations: NamedAPIResource[];
    regionColor: string;
    regionName: string;
    preOpenLocation?: string;  // query param ?location=pallet-town
}

// Tipos de filtro disponibles (Todos + los que tengan al menos 1 locación)
const FILTER_OPTIONS: { key: LocationType | "all"; label: string }[] = [
    { key: "all", label: "Todos" },
    { key: "city", label: "Ciudades" },
    { key: "route", label: "Rutas" },
    { key: "cave", label: "Cuevas" },
    { key: "water", label: "Agua" },
    { key: "forest", label: "Bosques" },
    { key: "mountain", label: "Montañas" },
    { key: "building", label: "Edificios" },
    { key: "island", label: "Islas" },
];

export function RegionLocationsList({
    locations, regionColor, regionName, preOpenLocation,
}: RegionLocationsListProps) {
    const [query, setQuery] = useState("");
    const [typeFilter, setTypeFilter] = useState<LocationType | "all">("all");
    const [openId, setOpenId] = useState<string | null>(preOpenLocation ?? null);
    const parentRef = useRef<HTMLDivElement>(null);

    // Fuse.js para búsqueda fuzzy
    const fuse = useMemo(
        () => new Fuse(locations, { keys: ["name"], threshold: 0.35 }),
        [locations]
    );

    // Lista filtrada (búsqueda + tipo)
    const filtered = useMemo(() => {
        let list = query.trim() ? fuse.search(query).map((r) => r.item) : locations;
        if (typeFilter !== "all") {
            list = list.filter((loc) => inferLocationType(loc.name) === typeFilter);
        }
        return list;
    }, [query, typeFilter, fuse, locations]);

    // Tipos presentes en esta región (para mostrar solo filtros relevantes)
    const presentTypes = useMemo(() => {
        const s = new Set(locations.map((l) => inferLocationType(l.name)));
        return FILTER_OPTIONS.filter((f) => f.key === "all" || s.has(f.key as LocationType));
    }, [locations]);

    const toggleOpen = useCallback((name: string) => {
        setOpenId((prev) => (prev === name ? null : name));
    }, []);

    // Virtualización — cada fila cerrada: 56px, abierta: variable (se deja auto)
    const rowVirtualizer = useVirtualizer({
        count: filtered.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 56,
        overscan: 6,
    });

    return (
        <section>
            {/* Section header */}
            <div className="flex items-center gap-4 mb-6">
                <h2 className="font-press-start text-[15px] uppercase tracking-tighter text-[#111111] whitespace-nowrap">
                    Locaciones
                </h2>
                <div className="h-px bg-[#E0E0E0] flex-1" />
                <span
                    className="font-press-start text-[9px] px-3 py-1.5 border-2 border-[#111111] shrink-0"
                    style={{ color: regionColor }}
                >
                    {locations.length} ubicaciones
                </span>
            </div>

            {/* Panel principal */}
            <div
                className="relative border-2 border-[#111111]"
                style={{ boxShadow: `4px 4px 0 ${regionColor}` }}
            >
                {/* Etiqueta flotante */}
                <div className="absolute top-[-14px] left-4 bg-[#111111] px-3 py-1 z-10">
                    <span className="font-nunito font-bold text-[12px] text-white uppercase">
                        {regionName.toUpperCase()} · {locations.length} LOCACIONES
                    </span>
                </div>

                <div className="p-5 pt-7">
                    {/* ── SEARCHBAR ── */}
                    <div className="flex items-center gap-2 border-2 border-[#111111] px-3 py-2 mb-4 bg-white focus-within:border-[#CC0000] transition-colors">
                        <Search size={14} className="text-[#888888] shrink-0" />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => { setQuery(e.target.value); setOpenId(null); }}
                            placeholder="Buscar locación..."
                            className="flex-1 font-nunito text-[14px] text-[#111111] placeholder:text-[#BBBBBB] outline-none bg-transparent"
                        />
                        {query && (
                            <button onClick={() => setQuery("")} className="text-[#888888] hover:text-[#111111]">
                                <X size={14} />
                            </button>
                        )}
                    </div>

                    {/* ── FILTROS POR TIPO ── */}
                    <div className="flex gap-1.5 flex-wrap mb-4 items-center">
                        <SlidersHorizontal size={12} className="text-[#888888] shrink-0" />
                        {presentTypes.map(({ key, label }) => (
                            <button
                                key={key}
                                onClick={() => setTypeFilter(key as LocationType | "all")}
                                className="font-press-start text-[9.5px] px-2.5 py-1.5 border-2 transition-colors"
                                style={
                                    typeFilter === key
                                        ? { backgroundColor: "#111111", color: "#ffffff", borderColor: "#111111" }
                                        : { backgroundColor: "#ffffff", color: "#888888", borderColor: "#E0E0E0" }
                                }
                            >
                                {label}
                            </button>
                        ))}
                    </div>

                    {/* ── LISTA VIRTUALIZADA ── */}
                    <AnimatePresence mode="wait">
                        {filtered.length === 0 ? (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                className="py-12 flex flex-col items-center gap-2 text-[#888888]"
                            >
                                <Search size={24} />
                                <p className="font-press-start text-[10px]">SIN RESULTADOS</p>
                                <p className="font-nunito text-[13px]">Prueba con otro nombre o filtro</p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="list"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            >
                                {/* Contenedor scrolleable con altura máxima */}
                                <div
                                    ref={parentRef}
                                    className="overflow-y-auto border-2 border-[#E0E0E0]"
                                    style={{ maxHeight: "560px" }}
                                >
                                    {/* Container virtual */}
                                    <div
                                        style={{ height: rowVirtualizer.getTotalSize(), position: "relative" }}
                                    >
                                        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                                            const loc = filtered[virtualRow.index];
                                            return (
                                                <div
                                                    key={loc.name}
                                                    data-index={virtualRow.index}
                                                    ref={rowVirtualizer.measureElement}
                                                    style={{
                                                        position: "absolute",
                                                        top: 0,
                                                        left: 0,
                                                        width: "100%",
                                                        transform: `translateY(${virtualRow.start}px)`,
                                                    }}
                                                >
                                                    <RegionLocationAccordion
                                                        locationRef={loc}
                                                        regionColor={regionColor}
                                                        isOpen={openId === loc.name}
                                                        onToggle={() => toggleOpen(loc.name)}
                                                    />
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Contador de resultados */}
                                <p className="font-nunito text-[12px] text-[#888888] mt-2.5 text-right">
                                    {filtered.length} de {locations.length} locaciones
                                    {query && <span className="ml-1">· buscar: "{query}"</span>}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}