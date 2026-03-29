"use client"

import { useState } from "react"
import * as Accordion from "@radix-ui/react-accordion"
import * as Switch from "@radix-ui/react-switch"
import * as Slider from "@radix-ui/react-slider"
import * as Select from "@radix-ui/react-select"
import { motion, AnimatePresence } from "framer-motion"
import { SlidersHorizontal, ChevronDown, Check, Crown, Baby, Layers, ChevronUp, Sparkles, Sprout, TrendingUp, Gem, Weight, Ruler } from "lucide-react"
import { useQueryState } from "nuqs"
import { TYPE_CONSTANTS } from "@/lib/constants/types.constants"

const TYPES_ORDER = [
    "normal", "fire", "water", "electric", "grass", "ice", "fighting", "poison", "ground", "flying",
    "psychic", "bug", "rock", "ghost", "dragon", "dark", "steel", "fairy"
]
const GENS = [1, 2, 3, 4, 5, 6, 7, 8, 9]

export function FilterContent() {
    const [typeFilter, setTypeFilter] = useQueryState("type")
    const [genFilter, setGenFilter] = useQueryState("gen")
    const [legendaryFilter, setLegendaryFilter] = useQueryState("legendary")
    const [mythicalFilter, setMythicalFilter] = useQueryState("mythical")
    const [babyFilter, setBabyFilter] = useQueryState("baby")
    const [formsFilter, setFormsFilter] = useQueryState("forms")
    const [baseStageFilter, setBaseStageFilter] = useQueryState("base")
    const [levelEvoFilter, setLevelEvoFilter] = useQueryState("levelEvo")
    const [itemEvoFilter, setItemEvoFilter] = useQueryState("itemEvo")
    
    const [weightClass, setWeightClass] = useQueryState("weightClass")
    const [heightClass, setHeightClass] = useQueryState("heightClass")

    const [minHp, setMinHp] = useQueryState("minHp")
    const [minAtk, setMinAtk] = useQueryState("minAtk")
    const [minDef, setMinDef] = useQueryState("minDef")
    const [minSpa, setMinSpa] = useQueryState("minSpa")
    const [minSpd, setMinSpd] = useQueryState("minSpd")
    const [minSpe, setMinSpe] = useQueryState("minSpe")

    const [sortField, setSortField] = useQueryState("sort", { defaultValue: "id" })
    const [sortOrder, setSortOrder] = useQueryState("order", { defaultValue: "asc" })

    const types = typeFilter ? typeFilter.split(",") : []

    const toggleType = (t: string) => {
        if (types.includes(t)) {
            const newTypes = types.filter(x => x !== t)
            setTypeFilter(newTypes.length > 0 ? newTypes.join(",") : null)
        } else {
            if (types.length < 2) {
                setTypeFilter([...types, t].join(","))
            }
        }
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    const handleGenToggle = (g: number) => {
        if (genFilter === String(g)) {
            setGenFilter(null)
        } else {
            setGenFilter(String(g))
        }
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    const numRarity = [legendaryFilter, mythicalFilter, babyFilter].filter(v => v === "true").length
    const numEvolution = [baseStageFilter, levelEvoFilter, itemEvoFilter].filter(v => v === "true").length
    const numPhysical = [weightClass, heightClass].filter(v => v !== null).length
    const numStats = [minHp, minAtk, minDef, minSpa, minSpd, minSpe].filter(v => v !== null && v !== "0").length

    return (
        <Accordion.Root type="multiple" defaultValue={["type"]} className="w-full">
            {/* 1. TIPO */}
            <Accordion.Item value="type" className="border-b border-[#F2F2F2]">
                <Accordion.Header>
                    <Accordion.Trigger className="w-full flex items-center justify-between px-5 py-[14px] group outline-none">
                        <div className="flex items-center gap-2">
                            <span className="font-nunito text-[13px] font-bold text-[#111111]">TIPO</span>
                            {types.length > 0 && (
                                <span className="bg-[#F2F2F2] text-[#444444] font-nunito text-[10px] px-2 py-[2px] rounded-full">
                                    {types.length} activos
                                </span>
                            )}
                        </div>
                        <ChevronDown size={14} className="text-[#888888] transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180" />
                    </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                    <div className="px-5 pb-4">
                        <div className="grid grid-cols-3 gap-2">
                            {TYPES_ORDER.map((t, i) => {
                                const isSelected = types.includes(t)
                                const isDimmed = !isSelected && types.length >= 2
                                const color = TYPE_CONSTANTS[t]?.color || "#111111"

                                return (
                                    <motion.button
                                        key={t}
                                        onClick={() => !isDimmed && toggleType(t)}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: i * 0.02, type: "spring", stiffness: 400, damping: 25 }}
                                        whileHover={!isSelected && !isDimmed ? { scale: 1.05, zIndex: 10, borderColor: "rgba(0,0,0,0.3)" } : {}}
                                        className="relative w-full py-[6px] px-1 text-center cursor-pointer outline-none transition-opacity"
                                        style={{
                                            backgroundColor: color,
                                            border: isSelected ? "2px solid #111111" : "2px solid transparent",
                                            boxShadow: isSelected ? "2px 2px 0 #111111" : "none",
                                            opacity: isDimmed ? 0.35 : 1,
                                            pointerEvents: isDimmed ? "none" : "auto"
                                        }}
                                    >
                                        <div className="flex flex-col items-center justify-center gap-[2px]">
                                            <img src={`/icons/${t}.svg`} alt={t} className="w-[14px] h-[14px] opacity-90 drop-shadow-sm brightness-0 invert" />
                                            <span className="text-white font-nunito text-[9px] font-bold uppercase">{t}</span>
                                        </div>
                                        <AnimatePresence>
                                            {isSelected && (
                                                <motion.div
                                                    initial={{ scale: 0, rotate: -45 }}
                                                    animate={{ scale: 1, rotate: 0 }}
                                                    exit={{ scale: 0 }}
                                                    transition={{ type: "spring", bounce: 0.5 }}
                                                    className="absolute -top-[2px] -right-[2px] w-[14px] h-[14px] bg-[#111111] flex items-center justify-center"
                                                >
                                                    <Check size={8} className="text-white" />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.button>
                                )
                            })}
                        </div>
                    </div>
                </Accordion.Content>
            </Accordion.Item>

            {/* 2. GENERACION */}
            <Accordion.Item value="gen" className="border-b border-[#F2F2F2]">
                <Accordion.Header>
                    <Accordion.Trigger className="w-full flex items-center justify-between px-5 py-[14px] group outline-none">
                        <div className="flex items-center gap-2">
                            <span className="font-nunito text-[13px] font-bold text-[#111111]">GENERACIÓN</span>
                            {genFilter && (
                                <span className="bg-[#F2F2F2] text-[#444444] font-nunito text-[10px] px-2 py-[2px] rounded-full">
                                    1 activo
                                </span>
                            )}
                        </div>
                        <ChevronDown size={14} className="text-[#888888] transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180" />
                    </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                    <div className="px-5 pb-4">
                        <div className="grid grid-cols-3 gap-2">
                            {GENS.map(g => {
                                const isSelected = genFilter === String(g)
                                return (
                                    <motion.button
                                        key={g}
                                        onClick={() => handleGenToggle(g)}
                                        animate={isSelected ? { scale: [1, 1.05, 1] } : {}}
                                        transition={{ duration: 0.2 }}
                                        className="flex flex-col items-center justify-center py-2 border cursor-pointer outline-none"
                                        style={{
                                            backgroundColor: isSelected ? "#111111" : "#FFFFFF",
                                            borderColor: isSelected ? "#111111" : "#E0E0E0",
                                            boxShadow: isSelected ? "2px 2px 0 #CC0000" : "none"
                                        }}
                                    >
                                        <span className={`font-pixel text-[8px] ${isSelected ? 'text-white' : 'text-[#888888]'}`}>Gen {g}</span>
                                        {/* Generational years as hint. We can roughly estimate or leave blank if we want strictly accurate. Prompt says "1996, 1999, etc." */}
                                        <span className={`font-mono text-[8px] mt-1 ${isSelected ? 'text-gray-300' : 'text-gray-400'}`}>
                                            {g === 1 ? '1996' : g === 2 ? '1999' : g === 3 ? '2002' : g === 4 ? '2006' : g === 5 ? '2010' : g === 6 ? '2013' : g === 7 ? '2016' : g === 8 ? '2019' : '2022'}
                                        </span>
                                    </motion.button>
                                )
                            })}
                        </div>
                    </div>
                </Accordion.Content>
            </Accordion.Item>

            {/* 3. RAREZA */}
            <Accordion.Item value="rarity" className="border-b border-[#F2F2F2]">
                <Accordion.Header>
                    <Accordion.Trigger className="w-full flex items-center justify-between px-5 py-[14px] group outline-none">
                        <div className="flex items-center gap-2">
                            <span className="font-nunito text-[13px] font-bold text-[#111111]">RAREZA</span>
                            {numRarity > 0 && (
                                <span className="bg-[#F2F2F2] text-[#444444] font-nunito text-[10px] px-2 py-[2px] rounded-full">
                                    {numRarity} activos
                                </span>
                            )}
                        </div>
                        <ChevronDown size={14} className="text-[#888888] transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180" />
                    </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                    <div className="px-5 pb-4 space-y-0">
                        <SpecialSwitch label="Legendario / Mítico" icon={Crown} checked={legendaryFilter === "true" || mythicalFilter === "true"} onCheckedChange={(c) => { setLegendaryFilter(c ? "true" : null); setMythicalFilter(c ? "true" : null); window.scrollTo({ top: 0, behavior: "smooth" }) }} />
                        <SpecialSwitch label="Baby Pokémon" icon={Baby} checked={babyFilter === "true"} onCheckedChange={(c) => { setBabyFilter(c ? "true" : null); window.scrollTo({ top: 0, behavior: "smooth" }) }} />
                    </div>
                </Accordion.Content>
            </Accordion.Item>

            {/* 4. CRIANZA Y EVOLUCIÓN */}
            <Accordion.Item value="evolution" className="border-b border-[#F2F2F2]">
                <Accordion.Header>
                    <Accordion.Trigger className="w-full flex items-center justify-between px-5 py-[14px] group outline-none">
                        <div className="flex items-center gap-2">
                            <span className="font-nunito text-[13px] font-bold text-[#111111]">EVOLUCIÓN</span>
                            {numEvolution > 0 && (
                                <span className="bg-[#F2F2F2] text-[#444444] font-nunito text-[10px] px-2 py-[2px] rounded-full">
                                    {numEvolution} activos
                                </span>
                            )}
                        </div>
                        <ChevronDown size={14} className="text-[#888888] transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180" />
                    </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                    <div className="px-5 pb-4 space-y-0">
                        <SpecialSwitch label="Fase Inicial (Base)" icon={Sprout} checked={baseStageFilter === "true"} onCheckedChange={(c) => { setBaseStageFilter(c ? "true" : null); window.scrollTo({ top: 0, behavior: "smooth" }) }} />
                        <SpecialSwitch label="Evoluciona x Nivel" icon={TrendingUp} checked={levelEvoFilter === "true"} onCheckedChange={(c) => { setLevelEvoFilter(c ? "true" : null); window.scrollTo({ top: 0, behavior: "smooth" }) }} />
                        <SpecialSwitch label="Evoluciona x Objeto" icon={Gem} checked={itemEvoFilter === "true"} onCheckedChange={(c) => { setItemEvoFilter(c ? "true" : null); window.scrollTo({ top: 0, behavior: "smooth" }) }} />
                    </div>
                </Accordion.Content>
            </Accordion.Item>

            {/* 5. FÍSICO */}
            <Accordion.Item value="physical" className="border-b border-[#F2F2F2]">
                <Accordion.Header>
                    <Accordion.Trigger className="w-full flex items-center justify-between px-5 py-[14px] group outline-none">
                        <div className="flex items-center gap-2">
                            <span className="font-nunito text-[13px] font-bold text-[#111111]">FÍSICO</span>
                            {numPhysical > 0 && (
                                <span className="bg-[#F2F2F2] text-[#444444] font-nunito text-[10px] px-2 py-[2px] rounded-full">
                                    {numPhysical} activos
                                </span>
                            )}
                        </div>
                        <ChevronDown size={14} className="text-[#888888] transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180" />
                    </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                    <div className="px-5 pb-4 space-y-0">
                        <div className="pt-2">
                            <span className="font-pixel text-[8px] text-[#888888] mb-2 block">CATERGORÍA DE PESO</span>
                            <div className="flex gap-2">
                                <PhysicalButton label="Pluma" icon={Weight} isActive={weightClass === "feather"} onClick={() => { setWeightClass(weightClass === "feather" ? null : "feather"); window.scrollTo({ top: 0, behavior: "smooth" }) }} />
                                <PhysicalButton label="Pesado" icon={Weight} isActive={weightClass === "heavy"} onClick={() => { setWeightClass(weightClass === "heavy" ? null : "heavy"); window.scrollTo({ top: 0, behavior: "smooth" }) }} />
                            </div>
                        </div>
                        <div className="pt-4 mt-2 border-t border-[#F2F2F2]">
                            <span className="font-pixel text-[8px] text-[#888888] mb-2 block">CATERGORÍA DE ALTURA</span>
                            <div className="flex gap-2">
                                <PhysicalButton label="Pequeño" icon={Ruler} isActive={heightClass === "small"} onClick={() => { setHeightClass(heightClass === "small" ? null : "small"); window.scrollTo({ top: 0, behavior: "smooth" }) }} />
                                <PhysicalButton label="Gigante" icon={Ruler} isActive={heightClass === "giant"} onClick={() => { setHeightClass(heightClass === "giant" ? null : "giant"); window.scrollTo({ top: 0, behavior: "smooth" }) }} />
                            </div>
                        </div>
                    </div>
                </Accordion.Content>
            </Accordion.Item>

            {/* 4. STATS MÍNIMAS */}
            <Accordion.Item value="stats" className="border-b border-[#F2F2F2]">
                <Accordion.Header>
                    <Accordion.Trigger className="w-full flex items-center justify-between px-5 py-[14px] group outline-none">
                        <div className="flex items-center gap-2">
                            <span className="font-nunito text-[13px] font-bold text-[#111111]">STATS MÍNIMAS</span>
                            {numStats > 0 && (
                                <span className="bg-[#F2F2F2] text-[#444444] font-nunito text-[10px] px-2 py-[2px] rounded-full">
                                    {numStats} activos
                                </span>
                            )}
                        </div>
                        <ChevronDown size={14} className="text-[#888888] transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180" />
                    </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                    <div className="px-5 pb-4 space-y-4 pt-2">
                        <StatSlider label="HP" value={minHp} onChange={setMinHp} color="#58C963" />
                        <StatSlider label="Ataque" value={minAtk} onChange={setMinAtk} color="#E85B55" />
                        <StatSlider label="Defensa" value={minDef} onChange={setMinDef} color="#E2943F" />
                        <StatSlider label="Sp. Atk" value={minSpa} onChange={setMinSpa} color="#55A4E8" />
                        <StatSlider label="Sp. Def" value={minSpd} onChange={setMinSpd} color="#8DBE53" />
                        <StatSlider label="Velocidad" value={minSpe} onChange={setMinSpe} color="#D155E8" />
                    </div>
                </Accordion.Content>
            </Accordion.Item>

            {/* 5. ORDENAR POR */}
            <Accordion.Item value="sort" className="border-b border-[#F2F2F2]">
                <Accordion.Header>
                    <Accordion.Trigger className="w-full flex items-center justify-between px-5 py-[14px] group outline-none">
                        <span className="font-nunito text-[13px] font-bold text-[#111111]">ORDENAR POR</span>
                        <ChevronDown size={14} className="text-[#888888] transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180" />
                    </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                    <div className="px-5 pb-4 pt-1 flex gap-2">
                        <Select.Root value={sortField || "id"} onValueChange={setSortField}>
                            <Select.Trigger className="flex-1 flex items-center justify-between bg-white border-2 border-[#111111] px-[14px] py-[10px] font-nunito text-[13px] outline-none data-[state=open]:border-[#CC0000]">
                                <Select.Value />
                                <Select.Icon><ChevronDown size={14} /></Select.Icon>
                            </Select.Trigger>
                            <Select.Portal>
                                <Select.Content className="bg-white border-2 border-[#111111] shadow-[4px_4px_0_#111111] z-50 overflow-hidden">
                                    <Select.Viewport>
                                        {[{ v: "id", l: "ID Nacional" }, { v: "name", l: "Nombre" }, { v: "weight", l: "Peso" }, { v: "height", l: "Altura" }, { v: "hp", l: "HP" }, { v: "attack", l: "Ataque" }, { v: "defense", l: "Defensa" }].map(opt => (
                                            <Select.Item key={opt.v} value={opt.v} className="px-[14px] py-[8px] font-nunito text-[13px] outline-none cursor-pointer hover:bg-[#FFF5F5] hover:border-l-2 hover:border-[#CC0000] data-[state=checked]:text-[#CC0000] flex justify-between items-center group">
                                                <Select.ItemText>{opt.l}</Select.ItemText>
                                                <Select.ItemIndicator><Check size={14} className="text-[#CC0000]" /></Select.ItemIndicator>
                                            </Select.Item>
                                        ))}
                                    </Select.Viewport>
                                </Select.Content>
                            </Select.Portal>
                        </Select.Root>

                        <Select.Root value={sortOrder || "asc"} onValueChange={setSortOrder}>
                            <Select.Trigger className="w-[80px] flex items-center justify-between bg-white border-2 border-[#111111] px-[14px] py-[10px] font-nunito text-[13px] outline-none data-[state=open]:border-[#CC0000]">
                                <Select.Value />
                                <Select.Icon><ChevronDown size={14} /></Select.Icon>
                            </Select.Trigger>
                            <Select.Portal>
                                <Select.Content className="bg-white border-2 border-[#111111] shadow-[4px_4px_0_#111111] z-50 overflow-hidden">
                                    <Select.Viewport>
                                        <Select.Item value="asc" className="px-[14px] py-[8px] font-nunito text-[13px] outline-none cursor-pointer flex justify-between items-center hover:bg-[#FFF5F5] hover:text-[#CC0000]">
                                            <Select.ItemText>ASC</Select.ItemText>
                                            <Select.ItemIndicator><Check size={14} className="text-[#CC0000]" /></Select.ItemIndicator>
                                        </Select.Item>
                                        <Select.Item value="desc" className="px-[14px] py-[8px] font-nunito text-[13px] outline-none cursor-pointer flex justify-between items-center hover:bg-[#FFF5F5] hover:text-[#CC0000]">
                                            <Select.ItemText>DESC</Select.ItemText>
                                            <Select.ItemIndicator><Check size={14} className="text-[#CC0000]" /></Select.ItemIndicator>
                                        </Select.Item>
                                    </Select.Viewport>
                                </Select.Content>
                            </Select.Portal>
                        </Select.Root>
                    </div>
                </Accordion.Content>
            </Accordion.Item>
        </Accordion.Root>
    )
}

function SpecialSwitch({ label, icon: Icon, checked, onCheckedChange }: { label: string, icon: any, checked: boolean, onCheckedChange: (c: boolean) => void }) {
    return (
        <div className="flex justify-between items-center py-2 border-b border-[#F2F2F2] last:border-0 group">
            <div className="flex items-center gap-2">
                <Icon size={14} className={`transition-colors duration-200 ${checked ? 'text-[#CC0000]' : 'text-[#888888]'}`} />
                <span className={`font-nunito text-[13px] transition-colors duration-200 ${checked ? 'text-[#CC0000]' : 'text-[#444444]'}`}>{label}</span>
            </div>
            <Switch.Root
                checked={checked}
                onCheckedChange={onCheckedChange}
                className="w-[36px] h-[20px] rounded-full relative bg-[#E0E0E0] data-[state=checked]:bg-[#CC0000] outline-none cursor-pointer transition-colors group-hover:scale-105"
            >
                <Switch.Thumb className="block w-[16px] h-[16px] bg-white rounded-full transition-transform duration-100 translate-x-[2px] will-change-transform data-[state=checked]:translate-x-[18px] shadow-sm" />
            </Switch.Root>
        </div>
    )
}

function StatSlider({ label, value, onChange, color = "#CC0000" }: { label: string, value: string | null, onChange: (v: string | null) => void, color?: string }) {
    const valNum = parseInt(value || "0")
    const isActive = valNum > 0

    return (
        <div>
            <div className="flex justify-between items-center mb-2">
                <span className="font-nunito text-[12px] text-[#444444]">{label}</span>
                <span className={`font-mono text-[11px] transition-colors duration-200`} style={{ color: isActive ? color : '#AAAAAA' }}>{valNum}</span>
            </div>
            <Slider.Root
                className="relative flex items-center select-none touch-none w-full h-[16px] group"
                value={[valNum]}
                max={255}
                step={5}
                onValueChange={(v) => {
                    onChange(v[0] === 0 ? null : String(v[0]));
                    window.scrollTo({ top: 0, behavior: "smooth" });
                }}
            >
                <Slider.Track className="bg-[#F2F2F2] relative grow h-[4px]">
                    <Slider.Range className="absolute h-full" style={{ backgroundColor: color }} />
                </Slider.Track>
                <Slider.Thumb className="block w-[16px] h-[16px] bg-white border-2 rounded-full outline-none transition-transform cursor-grab active:cursor-grabbing" style={{ borderColor: color, boxShadow: `0 0 0 2px ${color}33` }} />
            </Slider.Root>
        </div>
    )
}

function PhysicalButton({ label, icon: Icon, isActive, onClick }: { label: string, icon: any, isActive: boolean, onClick: () => void }) {
    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 flex flex-col items-center justify-center p-2 rounded-sm border-2 outline-none transition-colors"
            style={{
                backgroundColor: isActive ? "#111111" : "#FFFFFF",
                borderColor: isActive ? "#111111" : "#E0E0E0",
                boxShadow: isActive ? "2px 2px 0 #CC0000" : "none"
            }}
        >
            <Icon size={14} className={isActive ? 'text-white' : 'text-[#888888]'} />
            <span className={`font-nunito text-[10px] font-bold mt-1 ${isActive ? 'text-white' : 'text-[#444444]'}`}>{label}</span>
        </motion.button>
    )
}

interface FilterSidebarProps {
    activeFiltersCount: number;
    onClearAll: () => void;
}

export function FilterSidebar({ activeFiltersCount, onClearAll }: FilterSidebarProps) {
    const [showCleared, setShowCleared] = useState(false)

    const handleClear = () => {
        onClearAll()
        setShowCleared(true)
        setTimeout(() => setShowCleared(false), 1500)
    }

    return (
        <div className="w-[260px] flex-shrink-0 border-r-2 border-[#111111] bg-white pb-10">
            {/* HEADER */}
            <div className="p-5 border-b border-[#F2F2F2] flex justify-between items-center bg-white z-10">
                <div className="flex items-center gap-2">
                    <SlidersHorizontal size={14} className="text-[#888888]" />
                    <h2 className="font-pixel text-[9px] text-[#111111] leading-none m-0 pt-[2px]">FILTROS</h2>

                    <AnimatePresence>
                        {activeFiltersCount > 0 && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                transition={{ type: "spring", bounce: 0.5 }}
                                className="bg-[#CC0000] text-white font-pixel text-[7px] w-[18px] h-[18px] rounded-full flex items-center justify-center pt-[1px]"
                            >
                                {activeFiltersCount}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <motion.button
                    onClick={handleClear}
                    disabled={activeFiltersCount === 0}
                    animate={showCleared ? { x: [0, -3, 3, -2, 2, 0] } : {}}
                    transition={{ duration: 0.3 }}
                    className={`font-nunito text-[12px] text-[#CC0000] bg-transparent border-none p-0 outline-none ${activeFiltersCount === 0 ? 'opacity-30 pointer-events-none' : 'hover:text-[#990000] hover:underline cursor-pointer'}`}
                >
                    {showCleared ? "Limpiado ✓" : "Limpiar todo"}
                </motion.button>
            </div>

            <FilterContent />
        </div>
    )
}
