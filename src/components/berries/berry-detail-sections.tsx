"use client";

import { motion } from "framer-motion";
import { Sprout, Clock, Gem, Sparkles, Ruler, Info, Zap, ChevronRight, Apple, Package, Leaf, Wheat, Flame, Droplets, Candy, Citrus } from "lucide-react";
import NumberFlow from "@number-flow/react";
import * as Accordion from "@radix-ui/react-accordion";
import Link from "next/link";
import { FLAVOR_COLORS, FLAVOR_META, FIRMNESS_COLORS, BERRY_CATEGORIES } from "@/lib/constants/berries.constants";
import { formatPokemonName } from "@/lib/utils/pokemon.utils";

// ──────────────────────────────────────────────────────────────
// EFFECT SECTION (and Natural Gift)
// ──────────────────────────────────────────────────────────────
export function BerryEffectSection({ berry, flavorColor }: { berry: any; flavorColor: string }) {
  const hasNaturalGift = berry.natural_gift_power > 0;
  
  return (
    <div className="flex flex-col gap-6">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="p-8 rounded-[32px] border border-white/40 bg-white/30 backdrop-blur-xl shadow-xl shadow-[#16A34A]/5 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Apple size={80} className="text-black" />
        </div>
        
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-white/50 flex items-center justify-center shadow-sm" style={{ color: flavorColor }}>
            <Apple size={20} />
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest font-black">Gastronomía</span>
            <h3 className="font-nunito font-black text-[20px] text-gray-800 leading-none mt-1">
              Efecto y Uso
            </h3>
          </div>
        </div>

        <p className="font-nunito text-[15px] text-gray-700 leading-relaxed relative z-10 max-w-2xl">
          Esta baya tiene propiedades naturales únicas. Puede ser consumida directamente por un Pokémon 
          para restaurar salud o curar estados persistentes. Además, funciona como un ingrediente 
          esencial en la creación de Pokécubos y otras recetas artesanales. Su esencia es vital 
          tanto en la naturaleza como en la alta cocina Pokémon.
        </p>
      </motion.div>

      {hasNaturalGift && <BerryNaturalGifts berry={berry} />}
    </div>
  );
}

export function BerryNaturalGifts({ berry }: { berry: any }) {
  const typeName = berry.natural_gift_type?.name || "normal";
  const typeColor = "#A0A0A0"; // This should ideally come from a central type color map

  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      className="p-8 rounded-[32px] border border-white/40 bg-white/30 backdrop-blur-xl shadow-xl shadow-[#A0A0A0]/5 flex flex-col sm:flex-row gap-8 items-center"
    >
      <div className="flex flex-col items-center sm:items-start gap-4 flex-1">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/50 flex items-center justify-center shadow-sm text-gray-500">
            <Zap size={20} />
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest font-black">Ataque Secreto</span>
            <h3 className="font-nunito font-black text-[20px] text-gray-800 leading-none mt-1 uppercase">
              Don Natural
            </h3>
          </div>
        </div>
        
        <p className="font-nunito text-[14px] text-gray-600 leading-relaxed text-center sm:text-left">
          Al usar el movimiento <i className="text-gray-900 font-bold">Don Natural</i>, el Pokémon consume esta baya para desatar una ráfaga de energía elemental.
        </p>
      </div>

      <div className="flex items-center gap-6 bg-white/40 p-5 rounded-2xl border border-white/50 shadow-inner">
        <div className="flex flex-col items-center">
          <span className="font-mono text-[9px] text-gray-400 uppercase font-black mb-1">Poder</span>
          <div className="font-mono text-[32px] font-black leading-none text-gray-900">
            {berry.natural_gift_power}
          </div>
        </div>
        <div className="h-10 w-px bg-black/5" />
        <div className="flex flex-col items-center">
          <span className="font-mono text-[9px] text-gray-400 uppercase font-black mb-1">Tipo</span>
          <div className="px-3 py-1 bg-black text-white rounded-lg font-mono text-[11px] font-black uppercase tracking-widest shadow-lg">
            {typeName}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ──────────────────────────────────────────────────────────────
// GROWTH SECTION
// ──────────────────────────────────────────────────────────────
export function BerryGrowthSection({ berry, flavorColor }: { berry: any; flavorColor: string }) {
  const totalGrowth = berry.growth_time * 4;

  const cardCls = "bg-white/30 backdrop-blur-md border border-white/50 p-6 flex flex-col gap-3 rounded-[32px] shadow-lg transition-all duration-500 hover:shadow-2xl hover:bg-white/50 relative overflow-hidden group";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="flex flex-col gap-8 mt-12"
    >
      <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-600 shadow-sm">
            <Sprout size={20} />
          </div>
          <h2 className="font-nunito font-black text-[32px] text-gray-800 tracking-tight leading-none">
            Ciclo de Crecimiento
          </h2>
        </div>
        <p className="font-nunito text-gray-500 text-[16px] max-w-xl">
          El arte de la horticultura Pokémon requiere paciencia y precisión. Conoce los detalles para una cosecha perfecta.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Stages */}
        <div className={cardCls}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-green-600">
              <Clock size={16} />
              <span className="font-mono text-[10px] font-black uppercase tracking-widest">Temporalidad</span>
            </div>
            <div className="px-2 py-0.5 bg-green-500/10 rounded-full">
              <span className="font-mono text-[10px] font-black text-green-600 uppercase">Fases</span>
            </div>
          </div>
          
          <div className="flex flex-col mt-2">
            <div className="font-mono text-[32px] font-black text-gray-900 leading-none">
              <NumberFlow value={berry.growth_time} />
              <span className="text-[14px] ml-1.5 text-gray-400">h / fase</span>
            </div>
            <span className="font-nunito text-[12px] text-gray-500 mt-1 uppercase font-bold tracking-tight">Crecimiento total: {totalGrowth}h</span>
          </div>
          
          <div className="flex justify-between items-center mt-6 p-3 bg-black/5 rounded-2xl border border-black/5">
            {[Sprout, Leaf, Wheat, Apple].map((Icon, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, y: 10 }}
                whileInView={{ scale: 1, y: 0 }}
                transition={{ type: "spring", delay: 0.2 + i * 0.1 }}
                className="text-green-600/40 group-hover:text-green-600 transition-all duration-500"
              >
                <Icon size={24} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Harvest */}
        <div className={cardCls}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-orange-600">
              <Package size={16} />
              <span className="font-mono text-[10px] font-black uppercase tracking-widest">Producción</span>
            </div>
          </div>
          
          <div className="flex flex-col mt-2">
            <div className="font-mono text-[32px] font-black text-gray-900 leading-none">
              <NumberFlow value={berry.max_harvest} />
              <span className="text-[14px] ml-1.5 text-gray-400">cantidad</span>
            </div>
            <span className="font-nunito text-[12px] text-gray-500 mt-1 uppercase font-bold tracking-tight">Cosecha óptima esperada</span>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-auto pt-6">
            {Array.from({ length: Math.min(berry.max_harvest, 12) }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring", bounce: 0.6, delay: 0.1 + i * 0.05 }}
                className="w-3 h-3 rounded-full shadow-inner"
                style={{ backgroundColor: flavorColor, boxShadow: `0 0 10px ${flavorColor}30` }}
              />
            ))}
            {berry.max_harvest > 12 && (
              <div className="h-3 flex items-center">
                <span className="text-[10px] font-mono font-black text-gray-400">+{berry.max_harvest - 12}</span>
              </div>
            )}
          </div>
        </div>

        {/* Firmness & Soil */}
        <div className={`${cardCls} col-span-1 md:col-span-2 lg:col-span-1 border-white/50`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-blue-600">
              <Gem size={16} />
              <span className="font-mono text-[10px] font-black uppercase tracking-widest">Características</span>
            </div>
          </div>
          
          <div className="space-y-4 mt-2">
             <div className="flex flex-col">
                <span className="font-mono text-[9px] text-gray-400 uppercase font-black mb-0.5">Firmeza</span>
                <div className="font-nunito text-[16px] font-black text-gray-900 capitalize tracking-tight flex items-center gap-2">
                  {berry.firmness.name.replace("-", " ")}
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < 3 ? 'bg-blue-500' : 'bg-gray-200'}`} />
                    ))}
                  </div>
                </div>
             </div>
             <div className="flex flex-col">
                <span className="font-mono text-[9px] text-gray-400 uppercase font-black mb-0.5">Sequedad del Suelo</span>
                <div className="font-mono text-[16px] font-black text-gray-900">
                  {berry.soil_dryness} <span className="text-[11px] text-gray-400 font-bold uppercase">/ hora</span>
                </div>
                <div className="w-full h-1 bg-black/5 mt-1 rounded-full overflow-hidden">
                   <motion.div 
                    className="h-full bg-blue-400" 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(berry.soil_dryness / 20) * 100}%` }}
                   />
                </div>
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ──────────────────────────────────────────────────────────────
// CONTEST SECTION
// ──────────────────────────────────────────────────────────────
export function BerryContestSection({ berry, dominantFlavor }: { berry: any; dominantFlavor: any }) {
  if (!dominantFlavor) return null;
  const flavorName = dominantFlavor.flavor.name;
  
  const contestMap: any = {
    spicy: { type: "Cool (Dureza)", bg: "bg-red-500/5", border: "border-red-500/20", text: "text-red-600" },
    dry: { type: "Beauty (Belleza)", bg: "bg-blue-500/5", border: "border-blue-500/20", text: "text-blue-600" },
    sweet: { type: "Cute (Dulzura)", bg: "bg-pink-500/5", border: "border-pink-500/20", text: "text-pink-600" },
    bitter: { type: "Smart (Ingenio)", bg: "bg-green-500/5", border: "border-green-500/20", text: "text-green-600" },
    sour: { type: "Tough (Dureza)", bg: "bg-yellow-500/5", border: "border-yellow-500/20", text: "text-yellow-600" }
  };
  const contest = contestMap[flavorName] || contestMap.spicy;

  // Import relevant Lucide icons for contest types? 
  // For now we'll use the main flavor icons as they correspond
  const FLAVOR_ICONS: Record<string, any> = {
    spicy: Flame,
    dry: Droplets,
    sweet: Candy,
    bitter: Leaf,
    sour: Citrus,
  };
  const Icon = FLAVOR_ICONS[flavorName];

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      className={`p-8 rounded-[32px] border ${contest.border} ${contest.bg} backdrop-blur-md relative overflow-hidden`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-lg ${contest.text}`}>
            {Icon && <Icon size={24} />}
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-[10px] text-gray-500 uppercase font-black tracking-widest leading-none mb-1">Perfil de Concurso</span>
            <h3 className={`font-nunito font-black text-[22px] ${contest.text} leading-none`}>
              {contest.type}
            </h3>
          </div>
        </div>
        <p className="font-nunito text-[14px] text-gray-700 max-w-sm leading-relaxed">
          Especialmente recomendada para crear Pokécubos que potencien la carisma natural de tu compañero Pokémon.
        </p>
      </div>
    </motion.div>
  );
}

// ──────────────────────────────────────────────────────────────
// HELD POKEMON
// ──────────────────────────────────────────────────────────────
export function BerryHeldPokemon({ pokemon, flavorColor }: { pokemon: any[]; flavorColor: string }) {
  if (!pokemon || pokemon.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="flex flex-col gap-6 mt-16"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-black/5 flex items-center justify-center text-gray-700 shadow-sm">
          <Info size={20} />
        </div>
        <div className="flex flex-col">
          <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest font-black">Distribución Salvaje</span>
          <h2 className="font-nunito font-black text-[28px] text-gray-800 leading-none mt-1">
            Encontrada en Pokémon
          </h2>
        </div>
        <div className="ml-auto px-3 py-1 bg-black/5 rounded-full border border-black/5">
           <span className="font-mono text-[12px] font-black">{pokemon.length} Especies</span>
        </div>
      </div>
      
      <div className="p-6 bg-white/30 backdrop-blur-md border border-white/50 rounded-2xl flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg transform rotate-12">
          <Sparkles size={18} className="text-yellow-500" />
        </div>
        <span className="font-nunito text-[14px] text-gray-700 leading-relaxed font-medium">
          Estos Pokémon han sido vistos portando esta baya en la naturaleza. Intenta usar movimientos como <b className="text-gray-900">Antojo</b> o <b className="text-gray-900">Ladrón</b> para obtenerla sin esfuerzo.
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {pokemon.map((p: any, i: number) => {
          const name = p.pokemon?.name || p.name;
          const sprite = p.pokemon?.sprites?.front_default;
          const maxRarity = p.version_details ? Math.max(...p.version_details.map((v: any) => v.rarity)) : 5;
          const rarityColor = maxRarity >= 50 ? "#16A34A" : maxRarity >= 10 ? "#F59E0B" : "#DC2626";

          return (
            <Link 
              key={name + i} 
              href={`/pokemon/${name}`}
              className="group relative flex flex-col items-center p-4 bg-white/40 backdrop-blur-sm border border-white/50 rounded-[28px] transition-all duration-500 hover:-translate-y-2 hover:bg-white/60 hover:shadow-2xl hover:shadow-[#16A34A]/10 active:scale-95 overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-2 opacity-5 group-hover:opacity-20 transition-opacity">
                <span className="font-mono text-[32px] font-black italic">#{i+1}</span>
              </div>
              
              <div className="relative w-20 h-20 mb-2">
                <div className="absolute inset-0 bg-white/50 rounded-full scale-75 blur-md group-hover:scale-100 transition-transform duration-500" />
                <img src={sprite} alt={name} className="w-full h-full pixelated relative z-10 group-hover:scale-110 transition-transform duration-500" />
              </div>

              <div className="flex flex-col items-center">
                <span className="font-nunito text-[14px] font-black text-gray-900 capitalize text-center">
                  {formatPokemonName(name)}
                </span>
                <div className="flex items-center gap-2 mt-1 px-2.5 py-0.5 rounded-full bg-black/5" style={{ color: rarityColor }}>
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: rarityColor }} />
                  <span className="font-mono text-[9px] font-black">{maxRarity}% Rarity</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
}
