"use client";

import {
    useState, useMemo, useRef, useCallback,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useVirtualizer } from "@tanstack/react-virtual";
import Image from "next/image";
import Fuse from "fuse.js";
import {
    SlidersHorizontal, Search, X, LayoutGrid, List, Plus, Info, CheckCircle2, Star, Zap, Activity, ArrowRightLeft
} from "lucide-react";

import { useLightPokemonPool } from "@/lib/hooks/useTeamBuilder";
import { useTeamBuilderStore } from "@/lib/stores/teamBuilderStore";
import { useTeamAnalysis } from "@/lib/hooks/useTeamAnalysis";
import { getPokemonForTeam } from "@/lib/api/team-builder";
import {
    TYPE_COLORS, TYPE_NAMES_ES, GEN_COLORS,
    SPRITE_URL, PIXEL_URL, getGenerationByPokemonId,
} from "@/lib/constants/team-builder.constants";
import { PoolPokemon } from "@/types/api/team-builder.types";
import { generateRecommendations } from "@/lib/utils/team-recommendations";
import { TypeBadgeTeam } from "./type-badge-team";
import { PokemonSprite } from "@/components/shared/pokemon-sprite";

// ── COMPONENTE TOOLTIP PERSONALIZADO ──
function CustomTooltip({ children, content, side = "top" }: { children: React.ReactNode; content: React.ReactNode; side?: "top" | "left" | "right" }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="relative inline-block" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
            {children}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: side === "top" ? 5 : 0, x: side === "left" ? 5 : side === "right" ? -5 : 0 }}
                        animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className={`absolute z-[100] p-3 border-2 border-[#111111] bg-white text-[#111111] shadow-[4px_4px_0_#111111] rounded-none pointer-events-none whitespace-normal min-w-[200px]
                            ${side === "top" ? "bottom-full left-1/2 -translate-x-1/2 mb-2" : ""}
                            ${side === "left" ? "right-full top-1/2 -translate-y-1/2 mr-3" : ""}
                            ${side === "right" ? "left-full top-1/2 -translate-y-1/2 ml-3" : ""}
                        `}
                    >
                        {content}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

interface FilterState {
    query: string;
    type: string | null;
    gen: number | null;
    sortBy: "id" | "bst" | "speed" | "attack";
    direction: "asc" | "desc";
}

const ALL_TYPES_LIST = [
    "fire", "water", "electric", "grass", "ice", "fighting", "poison", "ground",
    "flying", "psychic", "bug", "rock", "ghost", "dragon", "dark", "steel", "fairy", "normal",
];

interface TeamFilterPanelProps {
    filters: FilterState;
    onChange: (f: Partial<FilterState>) => void;
    onClear: () => void;
    count: number;
}

export function TeamFilterPanel({ filters, onChange, onClear, count }: TeamFilterPanelProps) {
    const hasFilter = filters.type || filters.gen !== null || filters.query.trim();

    return (
        <div className="flex flex-col gap-6 p-6 border-2 border-[#111111] bg-white shadow-[4px_4px_0_#111111] relative overflow-hidden group">
            {/* Fondo con grid sutil */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#111_1.5px,transparent_1.5px)] [background-size:16px_16px]" />
            
            <div className="relative z-10 flex flex-col gap-6">
                {/* Search Bar Pro */}
                <div className="relative">
                    <div className="flex items-center gap-3 border-2 border-[#111111] px-4 py-3 bg-white focus-within:shadow-[3px_3px_0_#CC0000] focus-within:border-[#CC0000] transition-all">
                        <Search size={18} className="text-[#888888] shrink-0" />
                        <input
                            type="text"
                            value={filters.query}
                            onChange={(e) => onChange({ query: e.target.value })}
                            placeholder="Ej: Charizard, Iron Valiant, 1007..."
                            className="flex-1 font-nunito font-bold text-[15px] outline-none bg-transparent text-[#111111] placeholder:text-[#BBBBBB]"
                        />
                        {filters.query && (
                            <button onClick={() => onChange({ query: "" })} className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors">
                                <X size={14} />
                            </button>
                        )}
                    </div>
                </div>

                {/* Filtros Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6">
                    <div className="space-y-4">
                        {/* Tipos */}
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-1.5 h-4 bg-[#CC0000]" />
                                <p className="font-press-start text-[8px] text-[#111111] uppercase tracking-wider">Filtrar por Tipo</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => onChange({ type: null })}
                                    className={`font-press-start text-[8px] px-3 py-2 border-2 transition-all ${
                                        !filters.type ? "bg-[#111111] border-[#111111] text-white shadow-[2px_2px_0_#888888]" : "bg-white border-[#E0E0E0] text-[#888888] hover:border-[#111111]"
                                    }`}
                                >
                                    TODOS
                                </button>
                                {ALL_TYPES_LIST.map((t) => {
                                    const color = TYPE_COLORS[t] ?? "#888888";
                                    const active = filters.type === t;
                                    return (
                                        <motion.button
                                            key={t}
                                            onClick={() => onChange({ type: active ? null : t })}
                                            className="flex items-center gap-2 font-press-start text-[8px] px-2.5 py-2 border-2 transition-all"
                                            style={active
                                                ? { backgroundColor: color, borderColor: "#111111", color: "#ffffff", boxShadow: "2px 2px 0 #111111" }
                                                : { backgroundColor: "white", borderColor: "#E0E0E0", color: "#666666" }}
                                            whileHover={{ y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <div className={`w-3.5 h-3.5 flex items-center justify-center ${active ? "opacity-100" : "opacity-40"}`}>
                                                <img src={`/icons/${t}.svg`} alt="" className={`w-full h-full object-contain ${active ? "filter brightness-0 invert" : ""}`} />
                                            </div>
                                            {TYPE_NAMES_ES[t]?.toUpperCase()}
                                        </motion.button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Generación */}
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-1.5 h-4 bg-[#60A5FA]" />
                                <p className="font-press-start text-[8px] text-[#111111] uppercase tracking-wider">Generación</p>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                                <button
                                    onClick={() => onChange({ gen: null })}
                                    className={`font-press-start text-[8px] px-4 py-2 border-2 transition-all ${
                                        filters.gen === null ? "bg-[#111111] border-[#111111] text-white" : "bg-white border-[#E0E0E0] text-[#888888]"
                                    }`}
                                >
                                    TODAS
                                </button>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((g) => {
                                    const active = filters.gen === g;
                                    return (
                                        <button
                                            key={g}
                                            onClick={() => onChange({ gen: active ? null : g })}
                                            className={`font-press-start text-[8px] px-3 py-2 border-2 transition-all ${
                                                active ? "bg-[#60A5FA] border-[#111111] text-white shadow-[2px_2px_0_#111111]" : "bg-white border-[#E0E0E0] text-[#888888] hover:border-[#60A5FA]"
                                            }`}
                                        >
                                            GEN {["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"][g - 1]}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Sorting Bar Vertical (on large) */}
                    <div className="flex lg:flex-col gap-4 border-t lg:border-t-0 lg:border-l border-[#E0E0E0] pt-6 lg:pt-0 lg:pl-6 min-w-[160px]">
                        <p className="font-press-start text-[8px] text-[#111111] uppercase tracking-wider mb-2">Ordenación</p>
                        <div className="flex flex-col gap-2 w-full">
                            {([["id", "Número Pokedex"], ["bst", "Estadística Base"], ["speed", "Velocidad Más Alta"], ["attack", "Ataque Físico"]] as const).map(([key, label]) => (
                                <button
                                    key={key}
                                    onClick={() => onChange({
                                        sortBy: key,
                                        direction: filters.sortBy === key && filters.direction === "desc" ? "asc" : "desc",
                                    })}
                                    className={`flex justify-between items-center px-3 py-2.5 border-2 font-nunito font-black text-[13px] transition-all ${
                                        filters.sortBy === key ? "bg-[#111111] border-[#111111] text-white" : "bg-white border-[#E0E0E0] text-[#555555] hover:bg-slate-50"
                                    }`}
                                >
                                    <span className="truncate mr-2">{label}</span>
                                    {filters.sortBy === key && (
                                        <span className="font-press-start text-[8px]">{filters.direction === "desc" ? "↓" : "↑"}</span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer del Switcher */}
                <div className="flex items-center justify-between mt-2 pt-4 border-t-2 border-[#11111110]">
                    <div className="flex items-center gap-4">
                        <div className="bg-[#111111] px-3 py-1 flex items-center gap-2">
                             <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                             <span className="font-press-start text-[10px] text-white">{count}</span>
                        </div>
                        <span className="font-nunito font-black text-[14px] text-[#888888] uppercase tracking-tight">Especies Encontradas</span>
                    </div>

                    {hasFilter && (
                        <button 
                            onClick={onClear} 
                            className="flex items-center gap-2 font-press-start text-[8px] text-[#CC0000] px-4 py-2 border-2 border-[#CC0000] hover:bg-[#CC0000] hover:text-white transition-all shadow-[2px_2px_0_#CC000022] active:translate-y-0.5 active:shadow-none"
                        >
                            <X size={12} /> REINICIAR FILTROS
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export function TeamPokemonPool() {
    const { data: pool, isLoading } = useLightPokemonPool(1350);
    const { activeTeam, addMember } = useTeamBuilderStore();
    const analysis = useTeamAnalysis();

    const [filters, setFilters] = useState<FilterState>({
        query: "", type: null, gen: null, sortBy: "id", direction: "asc",
    });
    const [view, setView] = useState<"grid" | "list">("grid");
    const [replacingPokemon, setReplacingPokemon] = useState<PoolPokemon | null>(null);
    const parentRef = useRef<HTMLDivElement>(null);

    const teamIds = new Set(activeTeam.members.map((m) => m.pokemonId));

    const handleAdd = useCallback(async (p: PoolPokemon) => {
        if (activeTeam.members.length < 6) {
            try {
                const details = await getPokemonForTeam(p.id);
                addMember({
                    pokemonId: p.id,
                    name: p.name,
                    nameEs: p.nameEs,
                    types: p.types,
                    sprite: p.sprite,
                    artwork: p.artwork,
                    baseStats: p.baseStats,
                    ability: details.ability || details.availableAbilities?.[0] || { name: "unknown", nameEs: "desconocida", slot: 1 },
                    availableAbilities: details.availableAbilities,
                });
            } catch (err) {
                console.error("Error adding pokemon:", err);
            }
        } else {
            setReplacingPokemon(p);
        }
    }, [activeTeam.members.length, addMember]);

    const handleReplace = useCallback(async (slot: number) => {
        if (!replacingPokemon) return;
        try {
            const details = await getPokemonForTeam(replacingPokemon.id);
            addMember({
                pokemonId: replacingPokemon.id,
                name: replacingPokemon.name,
                nameEs: replacingPokemon.nameEs,
                types: replacingPokemon.types,
                sprite: replacingPokemon.sprite,
                artwork: replacingPokemon.artwork,
                baseStats: replacingPokemon.baseStats,
                ability: details.ability || details.availableAbilities?.[0] || { name: "unknown", nameEs: "desconocida", slot: 1 },
                availableAbilities: details.availableAbilities,
            }, slot);
            setReplacingPokemon(null);
        } catch (err) {
            console.error("Error replacing pokemon:", err);
        }
    }, [replacingPokemon, addMember]);

    const fuse = useMemo(() => {
        if (!pool) return null;
        return new Fuse(pool, { keys: ["name", "nameEs"], threshold: 0.35 });
    }, [pool]);

    const filtered = useMemo(() => {
        if (!pool) return [];
        let list: PoolPokemon[] = filters.query.trim() && fuse
            ? fuse.search(filters.query).map((r) => r.item)
            : [...pool];

        if (filters.type) list = list.filter((p) => p.types.includes(filters.type!));
        if (filters.gen !== null) list = list.filter((p) => getGenerationByPokemonId(p.id) === filters.gen);

        list.sort((a, b) => {
            const val = (p: PoolPokemon) =>
                filters.sortBy === "id" ? p.id :
                    filters.sortBy === "bst" ? p.bst :
                        filters.sortBy === "speed" ? p.baseStats.speed :
                            p.baseStats.attack;
            return filters.direction === "desc" ? val(b) - val(a) : val(a) - val(b);
        });

        return list;
    }, [pool, filters, fuse]);

    const recommendedIds = useMemo(() => {
        if (!pool || !analysis) return new Set<number>();
        const recs = generateRecommendations(activeTeam.members, pool, analysis, 30);
        return new Set(recs.map((r) => r.pokemonId));
    }, [pool, analysis, activeTeam.members.length]);

    const COLS = view === "grid" ? 4 : 1;
    const ITEM_H = view === "grid" ? 260 : 64; // Aumentado a 260 para evitar recortes
    const rowCount = Math.ceil(filtered.length / COLS);

    const rowVirtualizer = useVirtualizer({
        count: rowCount,
        getScrollElement: () => parentRef.current,
        estimateSize: () => ITEM_H,
        overscan: 10,
    });

    const nextSlot = activeTeam.members.length < 6 ? activeTeam.members.length : -1;

    return (
        <section className="flex flex-col gap-6">
            <div className="flex items-center justify-between border-b-2 border-[#111111] pb-4">
                <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-[#F59E0B] text-white flex items-center justify-center border-2 border-[#111111] shadow-[3px_3px_0_#111111]">
                        <Search size={22} />
                    </div>
                    <div>
                        <h3 className="font-press-start text-[14px] text-[#111111] uppercase leading-tight">Explorador Global</h3>
                        <p className="font-nunito text-[14px] text-[#888888] font-black">Filtrar entre {pool ? pool.length : '...'} especies</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex border-2 border-[#111111] overflow-hidden bg-white shadow-[2px_2px_0_#111111]">
                        <button onClick={() => setView("grid")} className={`px-3 py-2 transition-colors ${view === "grid" ? "bg-[#111111] text-white" : "hover:bg-slate-50"}`}>
                            <LayoutGrid size={13} />
                        </button>
                        <button onClick={() => setView("list")} className={`px-3 py-2 transition-colors ${view === "list" ? "bg-[#111111] text-white" : "hover:bg-slate-50"}`}>
                            <List size={13} />
                        </button>
                    </div>
                    
                    <CustomTooltip 
                        side="left"
                        content={
                            <div className="space-y-3 w-[280px]">
                                <p className="font-press-start text-[9px] text-[#F59E0B] uppercase mb-2 underline decoration-2">Explorador de Equipo</p>
                                <div className="space-y-2 font-nunito text-[13px] leading-snug">
                                    <p>Busca entre los más de **1000 Pokémon** de todas las generaciones.</p>
                                    <p>Identifica Pokémon recomendados con el icono de la **estrella ★**, son aquellos que cubren debilidades de tu equipo actual.</p>
                                    <p className="italic text-[#888888]">Haz clic en cualquier Pokémon para añadirlo a tu primer espacio libre.</p>
                                </div>
                            </div>
                        }
                    >
                        <button className="w-8 h-8 rounded-full border-2 border-[#111111] flex items-center justify-center bg-[#FAFAFA] hover:bg-white transition-colors shadow-[2px_2px_0_#111111]">
                            <Info size={16} className="text-[#111111]" />
                        </button>
                    </CustomTooltip>
                </div>
            </div>

            <TeamFilterPanel
                filters={filters}
                onChange={(f) => setFilters((prev) => ({ ...prev, ...f }))}
                onClear={() => setFilters({ query: "", type: null, gen: null, sortBy: "id", direction: "asc" })}
                count={filtered.length}
            />

            <div className="mt-2">
                {isLoading ? (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div key={i} className="h-[200px] border-2 border-slate-100 bg-slate-50 animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <div
                        ref={parentRef}
                        className="overflow-y-auto border-2 border-[#111111] bg-white scrollbar-thin scrollbar-thumb-[#111] scrollbar-track-slate-100"
                        style={{ height: 680 }} // Aumentado altura del contenedor
                    >
                        <div style={{ height: rowVirtualizer.getTotalSize(), position: "relative" }}>
                            {rowVirtualizer.getVirtualItems().map((vRow) => {
                                const rowItems = filtered.slice(vRow.index * COLS, vRow.index * COLS + COLS);
                                return (
                                    <div
                                        key={vRow.index}
                                        style={{
                                            position: "absolute",
                                            top: 0, left: 0,
                                            width: "100%",
                                            height: ITEM_H,
                                            transform: `translateY(${vRow.start}px)`,
                                            display: view === "grid" ? "grid" : "flex",
                                            gridTemplateColumns: view === "grid" ? `repeat(4, 1fr)` : undefined,
                                            gap: "12px",
                                            padding: "16px", // Más padding para que se vea completo
                                        }}
                                    >
                                        {rowItems.map((p) => (
                                            view === "grid" ? (
                                                <PoolCardGrid
                                                    key={p.id} pokemon={p}
                                                    inTeam={teamIds.has(p.id)} isRec={recommendedIds.has(p.id)}
                                                    onAdd={() => handleAdd(p)}
                                                />
                                            ) : (
                                                <PoolCardList
                                                    key={p.id} pokemon={p}
                                                    inTeam={teamIds.has(p.id)} isRec={recommendedIds.has(p.id)}
                                                    onAdd={() => handleAdd(p)}
                                                />
                                            )
                                        ))}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            {/* Modal de Reemplazo */}
            <AnimatePresence>
                {replacingPokemon && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-[#11111190] backdrop-blur-sm">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="w-full max-w-[500px] bg-white border-4 border-[#111111] shadow-[8px_8px_0_#111111] p-6"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h4 className="font-press-start text-[12px] text-[#111111] uppercase select-none">Equipo Lleno</h4>
                                <button onClick={() => setReplacingPokemon(null)} className="text-[#888888] hover:text-[#111111]">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="bg-[#FFF5F5] border-2 border-[#CC0000] p-4 mb-6 flex items-center gap-4">
                                <div className="w-16 h-16 bg-white border-2 border-[#111111] flex items-center justify-center shrink-0">
                                    <Image src={PIXEL_URL(replacingPokemon.id)} alt={replacingPokemon.nameEs} width={64} height={64} unoptimized className="object-contain" />
                                </div>
                                <div>
                                    <p className="font-nunito font-black text-[15px] text-[#111111]">
                                        Tu equipo está lleno. Selecciona a quién quieres reemplazar por <span className="text-[#CC0000] underline">{replacingPokemon.nameEs}</span>:
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                {activeTeam.members.map((m) => (
                                    <button
                                        key={m.slot}
                                        onClick={() => handleReplace(m.slot)}
                                        className="group relative flex items-center gap-3 p-3 border-2 border-[#11111108] bg-slate-50 hover:bg-white hover:border-[#111111] hover:shadow-[3px_3px_0_#111111] transition-all text-left"
                                    >
                                        <div className="w-10 h-10 bg-white border border-[#11111110] group-hover:border-[#111111] flex items-center justify-center">
                                            <Image src={PIXEL_URL(m.pokemonId)} alt={m.nameEs} width={40} height={40} unoptimized className="object-contain" />
                                        </div>
                                        <div className="flex-1 overflow-hidden">
                                            <p className="font-nunito font-black text-[13px] text-[#111111] truncate uppercase">{m.nameEs}</p>
                                            <p className="font-press-start text-[7px] text-[#888888]">Remplazar</p>
                                        </div>
                                        <ArrowRightLeft size={14} className="text-[#CC0000] opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => setReplacingPokemon(null)}
                                className="w-full mt-6 py-3 border-2 border-[#111111] font-press-start text-[9px] uppercase tracking-widest hover:bg-[#F8F8F8] transition-colors"
                            >
                                Cancelar
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}

function PoolCardGrid({ pokemon, inTeam, isRec, onAdd }: {
    pokemon: PoolPokemon; inTeam: boolean; isRec: boolean; onAdd: () => void;
}) {
    const primaryColor = TYPE_COLORS[pokemon.types[0]] ?? "#888888";
    
    return (
        <motion.div
            onClick={!inTeam ? onAdd : undefined}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`relative flex flex-col items-center border-2 transition-all p-4 group overflow-hidden ${
                inTeam ? "bg-slate-50 border-slate-200" : "bg-white border-[#11111110] hover:border-[#111111] hover:shadow-[4px_4px_0_#111111] cursor-pointer"
            }`}
        >
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-16 h-16 opacity-5 pointer-events-none -translate-y-1/2 translate-x-1/2 rounded-full" style={{ backgroundColor: primaryColor }} />
            
            {/* Recommendation Star */}
            {isRec && !inTeam && (
                <div className="absolute top-3 right-3 z-10 animate-bounce">
                    <Star size={16} className="text-[#F59E0B]" fill="#F59E0B" />
                </div>
            )}

            {/* ID Badge */}
            <div className="absolute top-2 left-3 font-jetbrains text-[10px] text-slate-300 font-bold">
                #{String(pokemon.id).padStart(4, '0')}
            </div>

            {/* Pokemon Image (Larger) */}
            <div className="relative w-24 h-24 mb-3 transition-transform group-hover:scale-110 flex items-center justify-center">
                <PokemonSprite id={pokemon.id} name={pokemon.nameEs} size={64} className={inTeam ? "grayscale opacity-30" : ""} />
            </div>

            <div className="w-full space-y-2">
                <p className={`font-press-start text-[8px] text-center truncate ${inTeam ? "text-slate-400" : "text-[#111111]"}`}>
                    {pokemon.nameEs.toUpperCase()}
                </p>

                <div className="flex justify-center gap-1.5">
                    {pokemon.types.map((t) => (
                        <div key={t} className="w-5 h-5 rounded-full flex items-center justify-center border border-white shadow-sm" style={{ backgroundColor: TYPE_COLORS[t] }}>
                            <img src={`/icons/${t}.svg`} alt="" className="w-2.5 h-2.5 filter brightness-0 invert" />
                        </div>
                    ))}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                    <div className="flex items-center gap-1">
                        <Activity size={10} className="text-slate-300" />
                        <span className="font-jetbrains text-[11px] font-bold text-slate-400">BST {pokemon.bst}</span>
                    </div>
                    {inTeam ? (
                        <CheckCircle2 size={12} className="text-emerald-500" />
                    ) : (
                        <div className="w-5 h-5 bg-slate-100 flex items-center justify-center group-hover:bg-[#111111] group-hover:text-white transition-colors">
                            <Plus size={10} />
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

function PoolCardList({ pokemon, inTeam, isRec, onAdd }: {
    pokemon: PoolPokemon; inTeam: boolean; isRec: boolean; onAdd: () => void;
}) {
    const primaryColor = TYPE_COLORS[pokemon.types[0]] ?? "#888888";
    return (
        <motion.div
            onClick={!inTeam ? onAdd : undefined}
            className={`w-full flex items-center gap-4 px-6 py-3 border-b-2 border-slate-50 transition-all ${
                inTeam ? "bg-slate-50 opacity-50" : "bg-white hover:bg-slate-50 cursor-pointer"
            }`}
        >
            <div className="w-12 h-12 flex items-center justify-center">
                <PokemonSprite id={pokemon.id} name={pokemon.nameEs} size={48} />
            </div>

            <div className="flex-1">
                <p className="font-nunito font-black text-[15px] text-[#111111]">{pokemon.nameEs}</p>
                <div className="flex gap-1.5 mt-0.5">
                    {pokemon.types.map((t) => (
                        <TypeBadgeTeam key={t} type={t} variant="solid" size="xs" />
                    ))}
                </div>
            </div>

            <div className="flex items-center gap-8">
                <div className="text-right">
                    <p className="font-press-start text-[7px] text-slate-300 mb-0.5 uppercase tracking-tighter">Estadística Base</p>
                    <p className="font-jetbrains text-[16px] font-black text-slate-500">{pokemon.bst}</p>
                </div>

                {isRec && !inTeam && (
                    <div className="bg-amber-100 text-amber-700 px-2 py-1 flex items-center gap-1.5 border border-amber-200">
                        <Star size={12} fill="currentColor" />
                        <span className="font-press-start text-[7px]">RECOMENDADO</span>
                    </div>
                )}

                {inTeam ? (
                    <CheckCircle2 size={20} className="text-emerald-500" />
                ) : (
                    <div className="w-8 h-8 flex items-center justify-center bg-slate-100 text-slate-400 group-hover:bg-[#111111] group-hover:text-white transition-all">
                        <Plus size={16} />
                    </div>
                )}
            </div>
        </motion.div>
    );
}