"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Cell } from "recharts";
import { useFavoritesStats } from "@/lib/hooks/favorites/useFavorites";
import { TYPE_COLORS, TYPE_NAMES_ES, GEN_COLORS, GEN_LABELS, ALL_TYPES } from "@/lib/constants/favorites/favorites.constants";

export function FavoritesStatsDashboard() {
    const [isOpen, setIsOpen] = useState(false);
    const stats = useFavoritesStats();

    if (stats.totalCount === 0) return null;

    // Type chart data
    const typeData = Object.entries(stats.byType)
        .sort(([,a],[,b]) => b - a)
        .slice(0, 10)
        .map(([t, count]) => ({ name: TYPE_NAMES_ES[t] ?? t, count, color: TYPE_COLORS[t] }));

    // Gen chart data
    const genData = Object.entries(stats.byGeneration)
        .sort(([a],[b]) => Number(a) - Number(b))
        .map(([g, count]) => ({
            name: GEN_LABELS[Number(g)] ?? `Gen ${g}`,
            count,
            color: GEN_COLORS[Number(g)] ?? "#888888",
        }));

    // Radar data
    const radarData = [
        { stat: "PS",       val: stats.avgStats.hp },
        { stat: "Ataque",   val: stats.avgStats.attack },
        { stat: "Defensa",  val: stats.avgStats.defense },
        { stat: "Atk.Esp",  val: stats.avgStats.specialAttack },
        { stat: "Def.Esp",  val: stats.avgStats.specialDefense },
        { stat: "Vel.",     val: stats.avgStats.speed },
    ];

    // Fun facts
    const funFacts: string[] = [];
    if (stats.highestBST) funFacts.push(`El más poderoso (BST) es ${stats.highestBST.nameEs} con ${stats.highestBST.bst}`);
    if (stats.legendaryCount > 0) funFacts.push(`Tienes ${stats.legendaryCount} Pokémon legendario${stats.legendaryCount !== 1 ? "s" : ""}`);
    if (stats.mythicalCount > 0) funFacts.push(`Tienes ${stats.mythicalCount} Pokémon mítico${stats.mythicalCount !== 1 ? "s" : ""}`);
    if (stats.mostCommonType) funFacts.push(`El tipo más común es ${TYPE_NAMES_ES[stats.mostCommonType]}`);
    if (stats.rareTypes.length > 0) funFacts.push(`Tipos no representados: ${stats.rareTypes.map(t => TYPE_NAMES_ES[t]).join(", ")}`);

    return (
        <div className="mb-5">
            {/* Toggle button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 font-press-start text-[11px] text-[#888888] hover:text-[#111111] transition-colors mb-3"
            >
                <BarChart2 size={13} />
                {isOpen ? "Ocultar estadísticas" : "Ver estadísticas ▾"}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        className="overflow-hidden"
                    >
                        <div className="border-2 border-[#111111] bg-white p-5 space-y-6 mb-4"
                            style={{ boxShadow: "4px 4px 0 #111111" }}>
                            {/* Row 1: Metrics */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {[
                                    { label: "BST promedio", val: stats.averageBST },
                                    { label: "Legendarios",  val: stats.legendaryCount },
                                    { label: "Destacados",   val: stats.highlightedCount },
                                    { label: "Colecciones",  val: stats.collectionCount },
                                ].map(({ label, val }) => (
                                    <div key={label} className="border border-[#F0F0F0] p-3 text-center bg-[#FAFAFA]">
                                        <p className="font-press-start text-[20px] text-[#111111]">{val}</p>
                                        <p className="font-nunito text-[13px] text-[#888888] mt-1">{label}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Row 2: Type BarChart */}
                            <div>
                                <p className="font-press-start text-[10px] text-[#888888] mb-3">TIPOS MÁS USADOS</p>
                                <ResponsiveContainer width="100%" height={200}>
                                    <BarChart data={typeData} layout="vertical" barSize={16}>
                                        <XAxis type="number" hide />
                                        <YAxis type="category" dataKey="name"
                                            tick={{ fontFamily: "'Nunito'", fontSize: 13 }} width={80} />
                                        <Tooltip
                                            formatter={(v) => [`${v} Pokémon`, "Cantidad"]}
                                            contentStyle={{ fontFamily: "Nunito", fontSize: 14, border: "2px solid #111111", borderRadius: 0 }}
                                        />
                                        <Bar dataKey="count" fill="#CC0000">
                                            {typeData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Row 3: Gen BarChart */}
                            {genData.length > 1 && (
                                <div>
                                    <p className="font-press-start text-[10px] text-[#888888] mb-3">POR GENERACIÓN</p>
                                    <ResponsiveContainer width="100%" height={160}>
                                        <BarChart data={genData} barSize={28}>
                                            <XAxis dataKey="name" tick={{ fontFamily: "Nunito", fontSize: 12 }} />
                                            <YAxis hide />
                                            <Tooltip
                                                formatter={(v) => [`${v} Pokémon`, "Cantidad"]}
                                                contentStyle={{ fontFamily: "Nunito", fontSize: 14, border: "2px solid #111111", borderRadius: 0 }}
                                            />
                                            <Bar dataKey="count" fill="#CC0000">
                                                {genData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            )}

                            {/* Row 4: Radar */}
                            <div>
                                <p className="font-press-start text-[10px] text-[#888888] mb-3">STATS PROMEDIO DE TU COLECCIÓN</p>
                                <ResponsiveContainer width="100%" height={220}>
                                    <RadarChart data={radarData}>
                                        <PolarGrid />
                                        <PolarAngleAxis dataKey="stat"
                                            tick={{ fontFamily: "Nunito", fontSize: 13 }} />
                                        <PolarRadiusAxis domain={[0, 255]} tick={false} />
                                        <Radar dataKey="val" stroke="#CC0000" fill="#CC0000" fillOpacity={0.25} />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Row 5: Fun Facts */}
                            {funFacts.length > 0 && (
                                <div>
                                    <p className="font-press-start text-[10px] text-[#888888] mb-2">CURIOSIDADES</p>
                                    <ul className="space-y-1.5">
                                        {funFacts.map((f, i) => (
                                            <li key={i} className="flex items-start gap-2 font-nunito text-[14px] text-[#555555]">
                                                <span className="text-[#CC0000] mt-0.5">•</span> {f}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
