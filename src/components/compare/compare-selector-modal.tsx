"use client";

import {
    useState, useMemo, useRef, useEffect,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useVirtualizer } from "@tanstack/react-virtual";
import Image from "next/image";
import Fuse from "fuse.js";
import { 
    Search, X, Crown, Sparkles, Baby, Info, Layers
} from "lucide-react";

import { usePokemonList, usePokemonForTeam, useAllPokemonTypesMap } from "@/lib/hooks/useTeamBuilder";
import { COMPARE_COLORS } from "@/lib/constants/compare.constants";
import {
    TYPE_COLORS, TYPE_NAMES_ES, GEN_COLORS,
    PIXEL_URL, extractId, getGenerationByPokemonId,
} from "@/lib/constants/team-builder.constants";
import { LEGENDARY_IDS, MYTHICAL_IDS, BABY_IDS } from "@/lib/constants/special-pokemon.constants";
import { PokemonSprite } from "@/components/shared/pokemon-sprite";

interface CompareSelectorModalProps {
    isOpen:       boolean;
    slotIndex:    number;
    currentSlots: (string | null)[];
    onSelect:     (name: string) => void;
    onClose:      () => void;
}

// ── Stat Bar ─────────────────────────────────────────────────────────────────
function StatBar({ label, value, color }: { label: string; value: number; color: string }) {
    return (
        <div className="flex items-center gap-3">
            <span className="font-press-start text-[7px] text-[#888888] w-[30px] shrink-0">{label}</span>
            <div className="flex-1 h-[6px] bg-[#F5F5F5] overflow-hidden rounded-full border border-[#EEEEEE]">
                <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (value / 255) * 100)}%` }}
                    transition={{ duration: 0.8 }}
                />
            </div>
            <span className="font-jetbrains text-[12px] font-black text-[#111111] w-[28px] shrink-0 text-right">{value}</span>
        </div>
    );
}

// ── Search Result Card ───────────────────────────────────────────────────────
function SearchResultCard({
    name, id, types, isInSlot, isSelected, onSelect, themeColor
}: {
    name: string;
    id: number;
    types?: string[];
    isInSlot: boolean;
    isSelected: boolean;
    onSelect: (name: string) => void;
    themeColor: string;
}) {
    const primaryType = types?.[0];
    const typeColor = primaryType ? TYPE_COLORS[primaryType] : "#E0E0E0";
    const isSpecial = LEGENDARY_IDS.includes(id) || MYTHICAL_IDS.includes(id);

    return (
        <motion.button
            onClick={() => !isInSlot && onSelect(name)}
            className="group relative border-2 flex flex-col transition-all w-full h-full rounded-lg overflow-hidden bg-white"
            style={{
                borderColor: isInSlot ? "#F2F2F2" : isSelected ? themeColor : "#E8E8E8",
                opacity: isInSlot ? 0.6 : 1,
                cursor: isInSlot ? "not-allowed" : "pointer",
                boxShadow: isSelected ? `4px 4px 0 ${themeColor}` : "none"
            }}
            whileHover={!isInSlot ? { borderColor: themeColor, y: -4, boxShadow: `4px 4px 0 ${themeColor}` } : {}}
        >
            {/* Header */}
            <div className="h-[30px] w-full relative px-3 flex items-center shrink-0">
                <span className="font-jetbrains text-[10px] text-[#BBBBBB] font-black italic">
                    #{String(id).padStart(3, "0")}
                </span>
                {isSpecial && <Crown size={12} className="text-[#F59E0B] ml-auto" />}
            </div>

            {/* Content Fixed Image Area */}
            <div className="flex-1 w-full flex items-center justify-center relative overflow-hidden">
                <div 
                    className="absolute inset-0 bg-current opacity-[0.02] blur-3xl rounded-full scale-50"
                    style={{ color: typeColor }}
                />
                <div className="relative z-10 w-[86px] h-[86px] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <PokemonSprite id={id} name={name} size={64} />
                </div>
            </div>

            {/* Info Fixed (85px) */}
            <div className="h-[82px] w-full flex flex-col items-center px-2 pb-4 shrink-0">
                <div className="h-[30px] flex items-end justify-center w-full px-2">
                    <p className="font-nunito font-black text-[14px] text-[#111111] capitalize truncate text-center leading-none">
                        {name.replace(/-/g, " ")}
                    </p>
                </div>
                <div className="h-[35px] flex items-center justify-center gap-1.5 w-full mt-1">
                    {types && types.length > 0 ? (
                        types.map((t) => (
                            <div 
                                key={t} 
                                className="flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-[#111111]/5 shadow-sm"
                                style={{ backgroundColor: `${TYPE_COLORS[t]}10` }}
                            >
                                <div className="w-2 rounded-full h-2" style={{ backgroundColor: TYPE_COLORS[t] }} />
                                <span className="font-nunito text-[9px] font-black uppercase" style={{ color: TYPE_COLORS[t] }}>
                                    {TYPE_NAMES_ES[t]}
                                </span>
                            </div>
                        ))
                    ) : (
                        <div className="h-full w-px" />
                    )}
                </div>
            </div>

            {isInSlot && (
                <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] flex items-center justify-center z-20">
                    <span 
                        className="text-white px-2 py-0.5 font-press-start text-[6px] -rotate-12 border-2 border-white shadow-md uppercase"
                        style={{ backgroundColor: themeColor }}
                    >
                        YA EN COMPARADOR
                    </span>
                </div>
            )}
        </motion.button>
    );
}

// ── Floating Stats Panel ─────────────────────────────────────────────────────
function FloatingStatsPanel({ name, onConfirm, onCancel, themeColor }: {
    name: string; onConfirm: () => void; onCancel: () => void; themeColor: string;
}) {
    const { data, isLoading } = usePokemonForTeam(name, true);

    if (isLoading) return null;
    if (!data) return null;

    const typeColor = TYPE_COLORS[data.types[0]] ?? "#888888";
    const bst = Object.values(data.baseStats).reduce((a, b) => a + b, 0);

    return (
        <motion.div
            className="absolute inset-x-0 bottom-6 z-50 px-6 pointer-events-none"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
        >
            <div 
                className="max-w-4xl mx-auto bg-white border-2 border-[#111111] pointer-events-auto flex flex-col md:flex-row relative"
                style={{ boxShadow: `8px 8px 0 ${themeColor}` }}
            >
                <div className="h-1 w-full absolute top-0 left-0" style={{ backgroundColor: typeColor }} />
                
                {/* Left Section */}
                <div className="p-4 flex flex-col items-center bg-[#FAFAFA] border-r border-[#EEE] min-w-[180px]">
                    <PokemonSprite id={data.pokemonId} name={data.nameEs} size={64} />
                    <div className="text-center mt-2">
                        <span className="font-jetbrains text-[11px] text-[#AAA] font-bold">#{String(data.pokemonId).padStart(3, "0")}</span>
                        <h3 className="font-press-start text-[10px] text-[#111111] uppercase mt-1">{data.nameEs}</h3>
                    </div>
                    <div className="flex gap-1 mt-3">
                        {data.types.map(t => (
                            <div key={t} className="px-2 py-0.5 border border-[#111111] text-white text-[6px] font-press-start uppercase shadow-[1px_1px_0_#111111]" style={{ backgroundColor: TYPE_COLORS[t] }}>
                                {TYPE_NAMES_ES[t]}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex-1 p-5 flex flex-col bg-white">
                    <div className="flex justify-between items-center mb-4">
                        <span className="font-press-start text-[7px] text-[#A0A0A0] uppercase">Estadísticas Base</span>
                        <div className="flex items-center gap-2">
                            <span className="font-nunito text-[14px] font-bold text-[#AAA]">BST</span>
                            <span className="font-jetbrains text-[20px] font-black text-[#111111]">{bst}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-x-8 gap-y-2.5 mb-5 md:mb-0">
                        <StatBar label="HP"  value={data.baseStats.hp}             color="#22C55E" />
                        <StatBar label="ATK" value={data.baseStats.attack}         color="#F59E0B" />
                        <StatBar label="DEF" value={data.baseStats.defense}        color="#3B82F6" />
                        <StatBar label="SPA" value={data.baseStats.specialAttack}  color="#A855F7" />
                        <StatBar label="SPD" value={data.baseStats.specialDefense} color="#14B8A6" />
                        <StatBar label="SPE" value={data.baseStats.speed}          color="#E11D48" />
                    </div>

                    <div className="flex gap-3 mt-auto pt-4 border-t border-[#F5F5F5]">
                        <button onClick={onCancel} className="px-4 py-2 font-nunito text-[14px] font-black hover:bg-[#FFF5F5]" style={{ color: themeColor }}>Cerrar</button>
                        <button
                            onClick={onConfirm}
                            className="flex-1 py-3 text-white font-press-start text-[8px] border-2 border-[#111111] shadow-[4px_4px_0_#111111] active:shadow-none translate-x-0 active:translate-x-1 active:translate-y-1 transition-all"
                            style={{ backgroundColor: themeColor }}
                        >
                            AÑADIR A COMPARACIÓN
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

const ALL_TYPES_LIST = [
    "fire", "water", "electric", "grass", "ice", "fighting", "poison", "ground",
    "flying", "psychic", "bug", "rock", "ghost", "dragon", "dark", "steel", "fairy", "normal",
];

// ── Main Modal ───────────────────────────────────────────────────────────────
export function CompareSelectorModal({ isOpen, slotIndex, currentSlots, onSelect, onClose }: CompareSelectorModalProps) {
    const { data: pokemonList, isLoading } = usePokemonList();
    const { data: allTypesMap } = useAllPokemonTypesMap();

    const [query, setQuery] = useState("");
    const [typeFilters, setTypeFilters] = useState<string[]>([]);
    const [genFilter, setGenFilter] = useState<number | null>(null);
    const [selectedName, setSelectedName] = useState<string | null>(null);
    
    const [legendaryFilter, setLegendaryFilter] = useState(false);
    const [mythicalFilter, setMythicalFilter] = useState(false);
    const [babyFilter, setBabyFilter] = useState(false);
    const [formasFilter, setFormasFilter] = useState(false);

    const parentRef = useRef<HTMLDivElement>(null);
    const themeColor = COMPARE_COLORS[slotIndex] || "#111111";

    useEffect(() => {
        if (isOpen) {
            setQuery(""); setSelectedName(null);
            setTypeFilters([]); setGenFilter(null);
            setLegendaryFilter(false); setMythicalFilter(false); setBabyFilter(false); setFormasFilter(false);
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [isOpen]);

    const fuse = useMemo(() => {
        if (!pokemonList) return null;
        return new Fuse(pokemonList.results, { keys: ["name"], threshold: 0.35 });
    }, [pokemonList]);

    const filtered = useMemo(() => {
        if (!pokemonList) return [];
        let list = [...pokemonList.results];
        
        if (query.trim() && fuse) {
            list = fuse.search(query).map(r => r.item);
        }
        if (genFilter !== null) {
            list = list.filter(p => getGenerationByPokemonId(extractId(p.url)) === genFilter);
        }
        if (typeFilters.length > 0 && allTypesMap) {
            list = list.filter(p => {
                const pTypes = allTypesMap.get(p.name) || [];
                return typeFilters.every(t => pTypes.includes(t));
            });
        }
        if (legendaryFilter) {
            list = list.filter(p => LEGENDARY_IDS.includes(extractId(p.url)));
        }
        if (mythicalFilter) {
            list = list.filter(p => MYTHICAL_IDS.includes(extractId(p.url)));
        }
        if (babyFilter) {
            list = list.filter(p => BABY_IDS.includes(extractId(p.url)));
        }
        if (formasFilter) {
            list = list.filter(p => getGenerationByPokemonId(extractId(p.url)) === 10);
        }
        return list;
    }, [query, genFilter, fuse, pokemonList, typeFilters, allTypesMap, legendaryFilter, mythicalFilter, babyFilter, formasFilter]);

    const COLS = 4; // 4 columns for compare modal to show more
    const ITEM_H = 220; 
    const rowVirtualizer = useVirtualizer({
        count: Math.ceil(filtered.length / COLS),
        getScrollElement: () => parentRef.current,
        estimateSize: () => ITEM_H,
        overscan: 5,
    });

    useEffect(() => {
        if (rowVirtualizer && filtered.length > 0) {
            rowVirtualizer.scrollToIndex(0);
        }
    }, [query, genFilter, typeFilters, legendaryFilter, mythicalFilter, babyFilter, formasFilter]);

    if (!isOpen) return null;

    return (
        <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        >
            <div className="absolute inset-0" onClick={onClose} />

            <motion.div
                className="relative z-10 w-full max-w-[1240px] h-[85vh] border-2 border-[#111111] flex flex-col overflow-hidden bg-white"
                style={{ boxShadow: `12px 12px 0 ${themeColor}` }}
                initial={{ scale: 0.95, opacity: 0, y: 20 }} 
                animate={{ scale: 1, opacity: 1, y: 0 }}
            >
                {/* Header Compacto */}
                <div 
                    className="flex items-center gap-4 px-6 py-4 border-b-2 border-[#111111] text-white shrink-0"
                    style={{ backgroundColor: themeColor }}
                >
                    <Search size={22} className="text-white/80" />
                    <div>
                        <h2 className="font-press-start text-[12px] uppercase">Explorador de Comparación</h2>
                        <p className="font-nunito text-[12px] text-white/70 font-black tracking-widest uppercase mt-1">Slot {(slotIndex ?? 0) + 1}</p>
                    </div>
                    <button onClick={onClose} className="ml-auto text-white/70 hover:text-white hover:rotate-90 transition-all"><X size={28} /></button>
                </div>

                <div className="flex flex-1 overflow-hidden">
                    {/* SIDEBAR COMPACTO */}
                    <aside className="w-[280px] border-r-2 border-[#111111] bg-[#FAFAFA] flex flex-col p-5 gap-5 overflow-y-auto scrollbar-hide shrink-0">
                        <div className="space-y-2">
                            <label className="font-press-start text-[7px] text-[#BBB] uppercase">Filtrar</label>
                            <input
                                autoFocus
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Nombre o ID..."
                                className="w-full h-10 px-3 bg-white border-2 border-[#111111] font-nunito text-[14px] font-black outline-none transition-colors"
                                style={{ outlineColor: themeColor }}
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="font-press-start text-[7px] text-[#BBB] uppercase">Generación</label>
                                {genFilter && <span className="font-jetbrains text-[10px] font-black" style={{ color: themeColor }}>GEN {genFilter}</span>}
                            </div>
                            <div className="grid grid-cols-3 gap-1.5">
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(g => (
                                    <button
                                        key={g}
                                        onClick={() => setGenFilter(genFilter === g ? null : g)}
                                        className="h-8 border-2 font-press-start text-[8px] transition-all hover:-translate-y-0.5"
                                        style={{
                                            backgroundColor: genFilter === g ? themeColor : "white",
                                            borderColor: genFilter === g ? "#111111" : "#E8E8E8",
                                            color: genFilter === g ? "white" : "#111111",
                                            boxShadow: genFilter === g ? "2px 2px 0 #111111" : "none"
                                        }}
                                    >
                                        {g === 10 ? "FORMAS" : ["I","II","III","IV","V","VI","VII","VIII","IX"][g-1]}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="font-press-start text-[7px] text-[#BBB] uppercase">Categorías</label>
                            <div className="grid grid-cols-1 gap-1.5">
                                {[
                                    { id: 'leg', label: 'Legendarios', active: legendaryFilter, setter: setLegendaryFilter, color: '#F59E0B', icon: Crown },
                                    { id: 'myth', label: 'Míticos', active: mythicalFilter, setter: setMythicalFilter, color: '#A855F7', icon: Sparkles },
                                    { id: 'baby', label: 'Bebés', active: babyFilter, setter: setBabyFilter, color: '#EC4899', icon: Baby },
                                    { id: 'formas', label: 'Formas', active: formasFilter, setter: setFormasFilter, color: '#333333', icon: Layers },
                                ].map(f => (
                                    <button
                                        key={f.id}
                                        onClick={() => f.setter(!f.active)}
                                        className="flex items-center gap-2.5 px-3 py-2 border-2 transition-all"
                                        style={{
                                            backgroundColor: f.active ? f.color : "white",
                                            borderColor: "#111111",
                                            color: f.active ? "white" : "#111111",
                                            boxShadow: f.active ? "2px 2px 0 #111111" : "none"
                                        }}
                                    >
                                        <f.icon size={12} />
                                        <span className="font-nunito text-[11px] font-black uppercase tracking-tight">{f.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2 flex-1 flex flex-col min-h-0">
                            <label className="font-press-start text-[7px] text-[#BBB] uppercase">Tipos</label>
                            <div className="grid grid-cols-2 gap-1.5 overflow-y-auto pr-1 scrollbar-hide">
                                {ALL_TYPES_LIST.map(t => {
                                    const active = typeFilters.includes(t);
                                    return (
                                        <button
                                            key={t}
                                            onClick={() => setTypeFilters(prev => 
                                                prev.includes(t) ? prev.filter(x => x !== t) :
                                                prev.length < 2 ? [...prev, t] : [prev[1], t]
                                            )}
                                            className="flex items-center gap-2 px-2 py-2 border-2 transition-all overflow-hidden hover:-translate-y-0.5"
                                            style={{
                                                backgroundColor: active ? TYPE_COLORS[t] : "white",
                                                borderColor: active ? "#111111" : "#E8E8E8",
                                                color: active ? "white" : "#111111",
                                                opacity: typeFilters.length >= 2 && !active ? 0.4 : 1,
                                                boxShadow: active ? "2px 2px 0 #111111" : "none"
                                            }}
                                        >
                                            <div className={`p-0.5 rounded ${active ? "bg-white/20" : "bg-[#F5F5F5]"}`}>
                                                <Image src={`/icons/${t}.svg`} alt="" width={12} height={12} className={active ? "filter brightness-0 invert" : ""} />
                                            </div>
                                            <span className="font-nunito text-[11px] font-black uppercase truncate">{TYPE_NAMES_ES[t]}</span>
                                        </button>
                                    )
                                })}
                            </div>
                            <button
                                onClick={() => { setGenFilter(null); setTypeFilters([]); setQuery(""); setLegendaryFilter(false); setMythicalFilter(false); setBabyFilter(false); setFormasFilter(false); }}
                                className="mt-4 w-full py-3 border-2 border-dashed border-[#DDD] font-press-start text-[8px] text-[#BBB] hover:border-[#111111] hover:text-[#111111] hover:bg-[#F5F5F5] transition-all shrink-0"
                            >
                                RESETEAR FILTROS
                            </button>
                        </div>
                    </aside>

                    {/* MAIN CONTENT AREA */}
                    <div className="flex-1 flex flex-col bg-white overflow-hidden relative">
                        <AnimatePresence>
                            {selectedName && (
                                <FloatingStatsPanel
                                    key={selectedName}
                                    name={selectedName}
                                    onConfirm={() => { onSelect(selectedName); onClose(); }}
                                    onCancel={() => setSelectedName(null)}
                                    themeColor={themeColor}
                                />
                            )}
                        </AnimatePresence>

                        <div className="flex-1 flex flex-col overflow-hidden">
                            <div className="px-5 py-3 border-b border-[#F0F0F0] flex justify-between items-center text-[#999] font-nunito text-[14px] shrink-0 bg-[#FAFAFA]">
                                <div className="flex items-center gap-3">
                                    <Info size={16} style={{ color: themeColor }} />
                                    <p className="font-black text-[14px]">Pokémons encontrados: <span className="text-[#111111]">{filtered.length}</span></p>
                                </div>
                                <span className="font-press-start text-[8px] text-[#CCC] uppercase tracking-tighter">Comparador Pokédex</span>
                            </div>

                            <div ref={parentRef} className="flex-1 overflow-y-auto p-6 scrollbar-hide bg-[#F5F5F5]">
                                {isLoading ? (
                                    <div className="grid grid-cols-4 gap-6 animate-pulse">
                                        {Array.from({ length: 12 }).map((_, i) => <div key={i} className="h-[200px] bg-white border-2 border-[#E0E0E0] rounded-lg" />)}
                                    </div>
                                ) : (
                                    <div style={{ height: rowVirtualizer.getTotalSize(), position: "relative" }}>
                                        {rowVirtualizer.getVirtualItems().map((vRow) => {
                                            const items = filtered.slice(vRow.index * COLS, vRow.index * COLS + COLS);
                                            return (
                                                <div
                                                    key={vRow.index}
                                                    style={{
                                                        position: "absolute", top: 0, left: 0, width: "100%", height: ITEM_H,
                                                        transform: `translateY(${vRow.start}px)`,
                                                        display: "grid", gridTemplateColumns: `repeat(${COLS}, 1fr)`, gap: "20px", paddingBottom: "20px"
                                                    }}
                                                >
                                                    {items.map(p => {
                                                        const id = extractId(p.url);
                                                        return (
                                                            <SearchResultCard
                                                                key={p.name} name={p.name} id={id}
                                                                types={allTypesMap?.get(p.name)}
                                                                isInSlot={currentSlots.includes(p.name)}
                                                                isSelected={selectedName === p.name}
                                                                onSelect={setSelectedName}
                                                                themeColor={themeColor}
                                                            />
                                                        );
                                                    })}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
