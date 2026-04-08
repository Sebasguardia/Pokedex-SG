import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Building2, Home, Trees, Skull, Map as MapIcon, Crosshair, Search, Users, Compass } from "lucide-react";
import Image from "next/image";
import {
    REGION_GEOGRAPHY,
    REGION_CITIES,
    REGION_VILLAINS,
    PALDEA_ZONES,
} from "@/lib/constants/region-lore.constants";
import { REGION_MAPS, CITY_IMAGES, VILLAIN_IMAGES } from "@/lib/constants/region-assets.constants";
import { ImageModal } from "@/components/ui/image-modal";

interface RegionGeographySectionProps {
    regionName: string;
    regionColor: string;
    nameEs: string;
}

const CITY_TYPE_META = {
    gym:      { label: "GIMNASIO",  color: "#CC0000",  icon: Building2 },
    city:     { label: "CIUDAD",    color: "#1565C0",  icon: Building2 },
    town:     { label: "PUEBLO",    color: "#2E7D32",  icon: Home },
    village:  { label: "ALDEA",     color: "#B8860B",  icon: Trees },
    route:    { label: "RUTA",      color: "#888888",  icon: MapPin },
    landmark: { label: "HITO",      color: "#6A1B9A",  icon: MapPin },
};

export function RegionGeographySection({ regionName, regionColor, nameEs }: RegionGeographySectionProps) {
    const geography = REGION_GEOGRAPHY[regionName];
    const cities = REGION_CITIES[regionName] ?? [];
    const villain = REGION_VILLAINS[regionName];

    // State for Image Modal
    const [modalData, setModalData] = useState<{
        isOpen: boolean;
        src: string;
        alt: string;
        title: string;
    }>({
        isOpen: false,
        src: "",
        alt: "",
        title: "",
    });

    const openModal = (src: string, alt: string, title: string) => {
        setModalData({ isOpen: true, src, alt, title });
    };

    if (!geography) return null;

    return (
        <section>
            {/* Section Header */}
            <div className="flex items-center gap-3 mb-8">
                <div className="w-3 h-3 bg-[#CC0000]" />
                <h2 className="font-['Press_Start_2P'] text-[13px] uppercase text-[#111111] whitespace-nowrap">
                    GEOGRAFÍA Y CIUDADES
                </h2>
                <div className="h-[3px] bg-[#111111] flex-1" />
            </div>
            {/* Sección de Geografía y Organización Rival */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-14 items-stretch">
                {/* Cuadro de Descripción */}
                <motion.div
                    className="border-4 border-[#111111] bg-white p-8 relative flex flex-col h-full"
                    style={{ boxShadow: "8px 8px 0 #111111" }}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 200, damping: 22 }}
                >
                    <div className="absolute -top-4 left-6 bg-white border-4 border-[#111111] px-4 py-2 flex items-center gap-2">
                        <MapPin size={16} className="text-[#CC0000]" />
                        <span className="font-['Press_Start_2P'] text-[10px] text-[#111111]">DESCRIPCIÓN</span>
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-center">
                        <p className="font-['Nunito'] font-bold text-[14px] lg:text-[15px] text-[#111111] leading-[1.6] line-clamp-7">
                            {geography.description}
                        </p>
                    </div>

                    <div className="absolute bottom-4 right-4 opacity-10 pointer-events-none">
                        <MapPin size={60} className="text-[#111111]" />
                    </div>
                </motion.div>

                {/* Organización Villana */}
                {villain && (
                    <motion.div
                        className="border-4 border-[#111111] bg-[#111111] p-8 relative group flex flex-col h-full"
                        style={{ boxShadow: `8px 8px 0 ${regionColor}` }}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 22 }}
                    >
                        <div className="absolute -top-4 left-6 bg-[#111111] border-4 border-[#111111] px-4 py-2 flex items-center gap-2" style={{ borderColor: regionColor }}>
                            <Skull size={16} className="text-white" />
                            <span className="font-['Press_Start_2P'] text-[10px] text-white uppercase">ORGANIZACIÓN RIVAL</span>
                        </div>

                        <div className="absolute right-4 bottom-4 opacity-5 pointer-events-none group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                            <Skull size={80} style={{ color: "#ffffff" }} />
                        </div>

                        <div className="flex flex-col md:flex-row gap-6 items-center flex-1">
                            {/* Lado Izquierdo: Info */}
                            <div className="flex-1 flex flex-col justify-center w-full">
                                <motion.span 
                                    className="font-['Press_Start_2P'] text-[14px] xl:text-[18px] text-white block mb-4 tracking-tighter"
                                    style={{ textShadow: `2px 2px 0 ${regionColor}` }}
                                >
                                    {villain.team.toUpperCase()}
                                </motion.span>
                                
                                <div className="inline-flex self-start items-center gap-2 bg-white text-[#111111] px-3 py-1 font-['Press_Start_2P'] text-[8px] mb-5 border-2 border-[#111111]" style={{ boxShadow: `3px 3px 0 ${regionColor}` }}>
                                    <Crosshair size={12} className="text-[#CC0000]" />
                                    LÍDER: {villain.boss.toUpperCase()}
                                </div>
                                
                                <div className="relative">
                                    <p className="font-['Nunito'] font-black text-[13px] xl:text-[14px] leading-relaxed text-[#EEEEEE] border-l-4 pl-4 italic" style={{ borderColor: regionColor }}>
                                        "{villain.goal}"
                                    </p>
                                </div>
                            </div>
                            
                            {/* Lado Derecho: Imagen de la Organización */}
                            <div className="w-full md:w-[220px] shrink-0">
                                <div className="relative group/villain-img">
                                    <div 
                                        className="relative aspect-[4/5] border-2 border-white/20 bg-[#1a1a1a] overflow-hidden rotate-1 group-hover/villain-img:rotate-0 transition-all duration-500"
                                        style={{ boxShadow: `4px 4px 0 ${regionColor}` }}
                                    >
                                        {villain.imageKey && VILLAIN_IMAGES[villain.imageKey] ? (
                                            <Image
                                                src={VILLAIN_IMAGES[villain.imageKey]}
                                                alt={villain.team}
                                                fill
                                                className="object-contain p-1 group-hover:scale-105 transition-transform duration-700"
                                                unoptimized
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                                                <Skull size={30} className="text-white opacity-20 mb-2" />
                                                <span className="font-['Press_Start_2P'] text-[7px] text-white opacity-40 text-center uppercase leading-tight">Data<br/>Expunged</span>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%] opacity-30" />
                                    </div>
                                    <div className="absolute -bottom-3 -right-1 bg-white border border-[#111111] px-2 py-0.5 z-20 group-hover:rotate-1 transition-transform" style={{ boxShadow: "2px 2px 0 #111111" }}>
                                        <span className="font-['Press_Start_2P'] text-[5px] text-[#111111]">INTEL_FILE_{villain.team.substring(0,3).toUpperCase()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Galería de Mapas */}
            {(geography.mainMapKey || geography.inGameMapKey) && (
                <div className="mb-14">
                    <div className="flex flex-col mb-8">
                        <span className="font-['Press_Start_2P'] text-[14px] text-[#111111] mb-2">MAPAS OFICIALES</span>
                        <div className="w-16 h-2 bg-[#111111]" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            { key: geography.mainMapKey, label: "ARTE OFICIAL" },
                            { key: geography.inGameMapKey, label: "VISTA EN JUEGO" }
                        ].map((mapItem, i) => {
                            if (!mapItem.key) return null;
                            const mapUrl = REGION_MAPS[mapItem.key as keyof typeof REGION_MAPS];
                            return (
                                <motion.div
                                    key={mapItem.key}
                                    className="border-4 border-[#111111] bg-white p-3 relative group cursor-pointer"
                                    style={{ boxShadow: "8px 8px 0 #111111" }}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    onClick={() => mapUrl && openModal(mapUrl, `Mapa de ${regionName.toUpperCase()}`, mapItem.label)}
                                >
                                    <figure className="m-0 p-0 relative group">
                                        <div className="absolute -top-4 -right-4 bg-white border-4 border-[#111111] px-4 py-2 z-20 transition-transform group-hover:scale-110" style={{ boxShadow: "4px 4px 0 #111111" }}>
                                            <span className="font-['Press_Start_2P'] text-[9px] text-[#111111]">
                                                {mapItem.label}
                                            </span>
                                        </div>
                                        <div className="aspect-[4/3] relative border-4 border-[#111111] bg-[#F0F0F0] flex items-center justify-center overflow-hidden">
                                            {mapUrl ? (
                                                <>
                                                    <Image 
                                                        src={mapUrl} 
                                                        alt={`Mapa de ${regionName.toUpperCase()}`} 
                                                        fill 
                                                        className="object-cover group-hover:scale-[1.03] animate-pulse-slow transition-transform duration-700" 
                                                        unoptimized
                                                    />
                                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                                        <Search className="text-white opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all" size={48} />
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="flex flex-col items-center opacity-20 group-hover:opacity-40 transition-opacity">
                                                    <MapIcon size={64} className="mb-4 text-[#111111]" />
                                                    <span className="font-['Press_Start_2P'] text-[12px] text-[#111111]">SIN IMAGEN</span>
                                                </div>
                                            )}
                                        </div>
                                        {mapUrl && (
                                            <figcaption className="mt-2 text-right">
                                                <span className="font-['Nunito'] text-[9px] text-[#888888]">© Nintendo/Game Freak - Uso informativo</span>
                                            </figcaption>
                                        )}
                                    </figure>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            )}
            {/* ESTRUCTURA ZONAL DE PALDEA */}
            {regionName === "paldea" && (
                <div className="mb-14">
                    <div className="flex items-center gap-3 mb-8">
                        <span className="font-['Press_Start_2P'] text-[14px] text-[#111111] mb-2 uppercase block">ESTRUCTURA ZONAL DE PALDEA</span>
                        <div className="h-[4px] bg-[#111111] flex-1 translate-y-[-4px]" />
                        <Compass size={24} className="text-[#111111] translate-y-[-4px] hidden sm:block" />
                    </div>
                    <div className="grid grid-cols-1 gap-10 items-start">
                        {Object.entries(PALDEA_ZONES).map(([key, zone], i) => (
                            <motion.div
                                key={key}
                                className="border-4 border-[#111111] bg-white p-6 md:p-8 flex flex-col group relative"
                                style={{ boxShadow: "8px 8px 0 #111111" }}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: (i % 3) * 0.1, type: "spring", stiffness: 280, damping: 24 }}
                                whileHover={{ y: -4, x: -4, boxShadow: "12px 12px 0 #111111" }}
                            >
                                <div className="absolute -top-4 -right-4 border-4 border-[#111111] bg-[#ffdd00] px-3 py-1.5 shadow-[4px_4px_0_#111111] z-10 transition-transform group-hover:scale-110">
                                    <span className="font-['Press_Start_2P'] text-[10px] text-[#111111] uppercase">{key}</span>
                                </div>
                                
                                <h3 className="font-['Press_Start_2P'] text-[16px] md:text-[20px] mt-2 mb-3 text-[#111111] leading-snug">
                                    {zone.name.toUpperCase()}
                                </h3>
                                
                                <p className="font-['Nunito'] font-bold text-[14px] md:text-[16px] text-[#555555] mb-6 leading-relaxed max-w-4xl">
                                    {zone.description}
                                </p>
                                
                                <div className="border-t-4 border-[#111111] pt-6 mt-2">
                                    <span className="font-['Press_Start_2P'] text-[10px] text-[#111111] mb-5 block">ÁREAS COMPRENDIDAS:</span>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                                        {zone.areas.map((area, idx) => (
                                            <div key={idx} className="bg-[#f0f0f0] border-2 border-[#111111] p-2 flex flex-col" style={{ boxShadow: "2px 2px 0 #111111" }}>
                                                {area.imageKey && (
                                                    <div 
                                                        className={`mb-2 border-2 border-[#111111] overflow-hidden group/zimg relative ${CITY_IMAGES[area.imageKey] ? 'cursor-pointer' : ''}`}
                                                        onClick={() => CITY_IMAGES[area.imageKey!] ? openModal(CITY_IMAGES[area.imageKey!], area.name, area.name) : undefined}
                                                    >
                                                        <div className="w-full h-20 sm:h-24 relative bg-[#CCCCCC] flex flex-col items-center justify-center">
                                                            {CITY_IMAGES[area.imageKey] ? (
                                                                <>
                                                                    <Image 
                                                                        src={CITY_IMAGES[area.imageKey]}
                                                                        alt={area.name}
                                                                        fill
                                                                        className="object-cover group-hover/zimg:scale-105 transition-transform duration-500"
                                                                        unoptimized
                                                                    />
                                                                    <div className="absolute inset-0 bg-black/0 group-hover/zimg:bg-black/10 transition-colors flex items-center justify-center">
                                                                        <Search className="text-white opacity-0 group-hover/zimg:opacity-100 scale-75 group-hover/zimg:scale-100 transition-all shadow-black" size={24} />
                                                                    </div>
                                                                </>
                                                            ) : (
                                                                <div className="text-[#888888] font-['Press_Start_2P'] text-[6px] text-center px-2 uppercase leading-relaxed">
                                                                    IMAGEN PENDIENTE <br/><br/>
                                                                    Add URL to:<br/>
                                                                    <span className="text-[#555]">{area.imageKey}</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}

                                                <span className="font-['Nunito'] font-black text-[11px] text-[#111111] leading-snug block mt-0.5">
                                                    {area.name}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}

            {/* Ciudades y Lugares */}
            {cities.length > 0 && (
                <div>
                    <div className="flex items-center gap-3 mb-8">
                        <span className="font-['Press_Start_2P'] text-[14px] text-[#111111] mb-2 uppercase block">LUGARES PRINCIPALES</span>
                        <div className="h-[4px] bg-[#111111] flex-1 translate-y-[-4px]" />
                        {/* Leyenda en cajitas brutales */}
                        <div className="flex gap-2 items-center flex-wrap translate-y-[-4px]">
                            {(["gym", "city", "town"] as const).map((t) => {
                                const meta = CITY_TYPE_META[t];
                                return (
                                    <div key={t} className="flex items-center gap-1.5 px-2 py-1 border-2 border-[#111111] bg-white" style={{ boxShadow: "2px 2px 0 #111111" }}>
                                        <div className="w-2.5 h-2.5 border border-[#111111]" style={{ backgroundColor: meta.color }} />
                                        <span className="font-['Press_Start_2P'] text-[6px] text-[#111111]">{meta.label}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cities.map((city, i) => {
                            const meta = CITY_TYPE_META[city.type];
                            const Icon = meta.icon;
                            return (
                                <motion.div
                                    key={city.name}
                                    className="border-4 border-[#111111] bg-white p-5 flex flex-col group relative"
                                    style={{ boxShadow: "6px 6px 0 #111111" }}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: (i % 3) * 0.1, type: "spring", stiffness: 280, damping: 24 }}
                                    whileHover={{ y: -4, x: -4, boxShadow: "10px 10px 0 #111111" }}
                                >
                                    {/* Etiqueta flotante de tipo */}
                                    <div className="absolute -top-3 -right-3 border-2 border-[#111111] bg-white px-2 py-1 flex items-center gap-1.5 shadow-[2px_2px_0_#111111] z-10 transition-transform group-hover:scale-110">
                                        <div className="w-2 h-2" style={{ backgroundColor: meta.color }} />
                                        <span className="font-['Press_Start_2P'] text-[6px]" style={{ color: meta.color }}>
                                            {meta.label}
                                        </span>
                                    </div>

                                    {/* Cabecera */}
                                    <div className="flex items-start gap-3 mb-4 z-10 relative">
                                        <div className="w-10 h-10 border-2 border-[#111111] flex items-center justify-center shrink-0 bg-[#F5F5F5] group-hover:bg-[#111111] transition-colors mt-0.5" style={{ boxShadow: "2px 2px 0 #111111" }}>
                                            <Icon size={20} className="text-[#111111] group-hover:text-white transition-colors" />
                                        </div>
                                        <div className="flex flex-col">
                                            <h3 className="font-['Press_Start_2P'] text-[10px] leading-snug lg:text-[11px] text-[#111111]">
                                                {city.name.toUpperCase()}
                                            </h3>
                                            {(city as any).nameEn && (
                                                <span className="font-['Nunito'] font-black italic text-[9px] text-[#888888] uppercase tracking-widest mt-1">
                                                    {(city as any).nameEn}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Stats Extra (Población y Conexiones) */}
                                    {((city as any).population !== undefined || ((city as any).connections && (city as any).connections.length > 0)) && (
                                        <div className="flex flex-col gap-2 mb-4 z-10 relative">
                                            {(city as any).population !== undefined && (
                                                <div className="bg-[#EEEEEE] border-2 border-[#111111] px-2 py-1.5 flex items-center gap-2 self-start" style={{ boxShadow: "2px 2px 0 #111111" }}>
                                                    <Users size={12} className="text-[#111111]" />
                                                    <span className="font-['Press_Start_2P'] text-[7px] text-[#111111] mt-0.5">
                                                        POBLACIÓN: {(city as any).population}
                                                    </span>
                                                </div>
                                            )}
                                            {(city as any).connections && (city as any).connections.length > 0 && (
                                                <div className="bg-[#EEEEEE] border-2 border-[#111111] px-2 py-1.5" style={{ boxShadow: "2px 2px 0 #111111" }}>
                                                    <div className="flex items-center gap-1.5 mb-1">
                                                        <MapPin size={10} className="text-[#CC0000]" />
                                                        <span className="font-['Press_Start_2P'] text-[6px] text-[#888888] uppercase">Conexiones</span>
                                                    </div>
                                                    <p className="font-['Nunito'] font-black text-[11px] text-[#111111] leading-tight">
                                                        {(city as any).connections.join(" • ")}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Imagen Opcional */}
                                    {city.imageKey && (
                                        <figure 
                                            className={`mb-4 m-0 p-0 ${CITY_IMAGES[city.imageKey] ? "cursor-pointer group/city-img" : ""}`}
                                            onClick={() => CITY_IMAGES[city.imageKey!] && openModal(CITY_IMAGES[city.imageKey!], city.name, city.name)}
                                        >
                                            <div className="w-full aspect-video border-2 border-[#111111] bg-[#EEEEEE] relative overflow-hidden group-hover:border-[3px] transition-all">
                                                {CITY_IMAGES[city.imageKey] ? (
                                                    <>
                                                        <Image 
                                                            src={CITY_IMAGES[city.imageKey]} 
                                                            alt={city.name} 
                                                            fill 
                                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                            unoptimized
                                                        />
                                                        <div className="absolute inset-0 bg-black/0 group-hover/city-img:bg-black/10 transition-colors flex items-center justify-center">
                                                            <Search className="text-white opacity-0 group-hover/city-img:opacity-100 scale-75 group-hover/city-img:scale-100 transition-all shadow-black" size={32} />
                                                        </div>
                                                    </>
                                                ) : (
                                                    <div className="absolute inset-0 flex items-center justify-center bg-[#CCCCCC]">
                                                        <span className="font-['Press_Start_2P'] text-[8px] text-[#888888] text-center w-full px-2">SIN IMAGEN</span>
                                                    </div>
                                                )}
                                            </div>
                                            {CITY_IMAGES[city.imageKey] && (
                                                <figcaption className="mt-1 text-right">
                                                    <span className="font-['Nunito'] text-[8px] text-[#888888]">© Nintendo/Game Freak - Uso informativo</span>
                                                </figcaption>
                                            )}
                                        </figure>
                                    )}

                                    {/* Content (Description) */}
                                    <p className="font-['Nunito'] font-bold text-[13px] text-[#555555] leading-relaxed flex-1 z-10 relative">
                                        {(city as any).description || "Una zona icónica de la región que aguarda a ser explorada por entrenadores intrépidos."}
                                    </p>

                                    {/* Puntos de interés */}
                                    {(city as any).placesOfInterest && (city as any).placesOfInterest.length > 0 && (
                                        <div className="mt-4 pt-4 border-t-2 border-dashed border-[#CCCCCC]">
                                            <span className="font-['Press_Start_2P'] text-[7px] text-[#888888] mb-2 block">PUNTOS DE INTERÉS:</span>
                                            <div className="flex flex-wrap gap-2">
                                                {(city as any).placesOfInterest.map((poi: string) => (
                                                    <div key={poi} className="bg-[#111111] text-white px-2 py-1 font-['Nunito'] font-black text-[10px]">
                                                        {poi}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    
                                    {/* Decoración extra para gyms */}
                                    {city.type === "gym" && (
                                        <div className="absolute bottom-4 right-4 opacity-10 pointer-events-none group-hover:opacity-20 group-hover:rotate-12 transition-all">
                                            <Building2 size={40} />
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            )}
            <ImageModal 
                isOpen={modalData.isOpen}
                onClose={() => setModalData({ ...modalData, isOpen: false })}
                src={modalData.src}
                alt={modalData.alt}
                title={modalData.title}
            />
        </section>
    );
}
