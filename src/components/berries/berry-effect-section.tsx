"use client";

import { motion } from "framer-motion";
import { Apple, Info } from "lucide-react";

interface BerryEffectSectionProps {
    berry: any;
    flavorColor: string;
}

const EFFECT_TAGS: { label: string; color: string; match: string[] }[] = [
    { label: "❤ Cura PS", color: "#16A34A", match: ["HP", "hit points", "restore", "heals"] },
    { label: "✚ Cura estado", color: "#2563EB", match: ["status", "poison", "burn", "paralysis", "sleep", "freeze", "confusion"] },
    { label: "↑ Sube stat", color: "#D97706", match: ["raises", "increases", "boosts", "stat"] },
    { label: "⦿ Uso único", color: "#888888", match: ["consumed", "single use", "one-time"] },
];

function detectTags(text: string) {
    return EFFECT_TAGS.filter((tag) =>
        tag.match.some((kw) => text.toLowerCase().includes(kw.toLowerCase()))
    );
}

export function BerryEffectSection({ berry, flavorColor }: BerryEffectSectionProps) {
    const effectText: string =
        berry.item?.effect_entries?.find((e: any) => e.language?.name === "en")?.short_effect ??
        berry.item?.effect_entries?.[0]?.short_effect ??
        "Esta baya puede ser consumida directamente por un Pokémon durante la batalla. Su efecto depende del tipo de baya.";

    const tags = detectTags(effectText);

    return (
        <section>
            <div className="flex items-center gap-3 mb-8">
                <h2 className="font-press-start text-[14px] text-[#111111] uppercase tracking-tighter">EFECTO</h2>
                <div className="h-px bg-[#E0E0E0] flex-1" />
            </div>

            <div className="border-2 border-[#111111] bg-white p-6 relative" style={{ boxShadow: "4px 4px 0 #111111" }}>
                {/* Floating label */}
                <div
                    className="absolute top-[-14px] left-4 px-3 py-1 flex items-center gap-2 text-white font-nunito font-bold text-[12px] uppercase"
                    style={{ backgroundColor: flavorColor }}
                >
                    <Apple size={13} />
                    EFECTO AL USAR
                </div>

                <p className="mt-4 font-nunito text-[14px] text-[#444444] leading-relaxed mb-6">
                    {effectText}
                </p>

                {/* Auto-detected tags */}
                {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {tags.map((tag) => (
                            <span
                                key={tag.label}
                                className="font-nunito font-bold text-[10px] px-2 py-0.5 border uppercase tracking-wider"
                                style={{ color: tag.color, borderColor: tag.color, backgroundColor: `${tag.color}12` }}
                            >
                                {tag.label}
                            </span>
                        ))}
                        <span className="font-nunito font-bold text-[10px] px-2 py-0.5 border uppercase tracking-wider"
                            style={{ color: "#888888", borderColor: "#888888", backgroundColor: "#88888812" }}>
                            ⦿ Uso único
                        </span>
                    </div>
                )}

                <div className="flex items-center gap-2 p-3 bg-[#F8F8F8] border border-[#E0E0E0] font-nunito text-[12px] text-[#888888] italic">
                    <Info size={14} className="text-[#CC0000] shrink-0" />
                    <span>Los efectos pueden variar ligeramente según la versión del juego.</span>
                </div>
            </div>
        </section>
    );
}