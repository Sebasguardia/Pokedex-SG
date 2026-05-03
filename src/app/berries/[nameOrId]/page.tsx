"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { useBerry } from "@/lib/hooks/berries/useBerries";
import { usePokemonByHeldBerry } from "@/lib/hooks/pokemon/usePokemonByHeldBerry";
import { FLAVOR_COLORS, FLAVOR_META } from "@/lib/constants/berries/berries.constants";
import { getDominantFlavor, buildHeroGradient } from "@/lib/utils/berry.utils";
import { getItemByIdOrName } from "@/lib/api/items";

import { BerryDetailHero } from "@/components/berries/berry-detail-hero";
import { BerryFlavorRadar } from "@/components/berries/berry-flavor-radar";
import { BerryEffectSection } from "@/components/berries/berry-effect-section";
import { BerryGrowthSection } from "@/components/berries/berry-growth-section";
import { BerryContestSection } from "@/components/berries/berry-contest-section";
import { BerryNaturalGifts } from "@/components/berries/berry-natural-gifts";
import { BerryHeldPokemon } from "@/components/berries/berry-held-pokemon";
import { BerryNavigationArrows } from "@/components/berries/berry-navigation-arrows";
import { RelatedBerriesCarousel } from "@/components/berries/related-berries-carousel";
import { GiStrawberry } from "react-icons/gi";
import { PageTransitionBerry } from "@/components/shared/page-transitions/berries/page-transition-berry";
import { EscapedLeaves } from "@/components/shared/ui/escaped-leaves";

export default function BerryDetailPage() {
  const { nameOrId } = useParams<{ nameOrId: string }>();
  const prefersRM = useReducedMotion();

  const { data: berryRaw, isLoading } = useBerry(nameOrId);
  const [berry, setBerry] = useState<any>(null);

  const { data: heldBy } = usePokemonByHeldBerry(berryRaw?.item?.name);

  // Hydrate item sprite + effect text
  useEffect(() => {
    async function hydrate() {
      if (!berryRaw) return;
      if (berryRaw?.item?.name) {
        try {
          const itemFull = await getItemByIdOrName(berryRaw.item.name);
          setBerry({ ...berryRaw, item: itemFull });
        } catch {
          setBerry(berryRaw);
        }
      } else {
        setBerry(berryRaw);
      }
    }
    hydrate();
  }, [berryRaw]);

  // Dynamic scrollbar color
  useEffect(() => {
    if (!berry) return;
    const dominant = getDominantFlavor(berry.flavors);
    const color = dominant ? FLAVOR_COLORS[dominant.flavor.name] ?? "#111" : "#111";
    document.documentElement.style.setProperty("--scroll-color", color);
    return () => { document.documentElement.style.removeProperty("--scroll-color"); };
  }, [berry]);

  // ── Loading state ────────────────────────────────────────────
  if (isLoading || !berry) {
    return (
      <div className="w-full h-screen bg-white flex items-center justify-center">
        <div
          className="border-2 border-[#111111] px-8 py-6 flex flex-col items-center gap-3"
          style={{ boxShadow: "4px 4px 0 #111111" }}
        >
          <div className="flex items-center justify-center">
            <GiStrawberry size={40} className="text-[#CC0000] animate-bounce" />
          </div>
          <span className="font-press-start text-[9px] text-[#111111] tracking-tighter">CARGANDO...</span>
        </div>
      </div>
    );
  }

  const dominantFlavor = getDominantFlavor(berry.flavors);
  const flavorColor = dominantFlavor ? FLAVOR_COLORS[dominantFlavor.flavor.name] ?? "#111" : "#111";
  const heroGradient = buildHeroGradient(berry.flavors);

  // Radar data — includes flavorKey so radar can use per-flavor colors
  const radarData = berry.flavors.map((f: any) => ({
    flavor: FLAVOR_META[f.flavor.name]?.nameEs ?? f.flavor.name,
    flavorKey: f.flavor.name,
    value: f.potency,
    color: FLAVOR_COLORS[f.flavor.name] ?? "#111",
    avg: 15,
  }));

  return (
    <>
      {/* Page-in transition */}
      <PageTransitionBerry
        spriteSrc={berry.item?.sprites?.default ?? ""}
        flavorColor={flavorColor}
      />

      {/* Dynamic scrollbar */}
      <style jsx global>{`
        ::-webkit-scrollbar-thumb { background-color: var(--scroll-color, #888); }
      `}</style>

      {/* Tinte esquina superior izquierda — solo desktop */}
      <div
        className="fixed inset-0 pointer-events-none z-0 hidden md:block"
        style={{ background: `radial-gradient(circle at 0% 0%, ${flavorColor}08, transparent 55%)` }}
      />

      {/* Hojas que "escapan" del hero */}
      {!prefersRM && <EscapedLeaves flavorColor={flavorColor} />}

      <motion.main 
        className="relative z-10 bg-white break-words max-w-[100vw] overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        {/* ── HERO ───────────────────────────────────────────── */}
        <BerryDetailHero
          berry={berry}
          dominantFlavor={dominantFlavor}
          flavorColor={flavorColor}
          heroGradient={heroGradient}
        />

        {/* ── BODY ───────────────────────────────────────────── */}
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12 space-y-16 relative z-10">

          {/* 1. Flavor radar + bar + specs */}
          <BerryFlavorRadar
            radarData={radarData}
            dominantFlavor={dominantFlavor}
            flavorColor={flavorColor}
            smoothness={berry.smoothness}
            berry={berry}
          />

          {/* 2. Effect */}
          <BerryEffectSection berry={berry} flavorColor={flavorColor} />

          {/* 3. Growth — 6 cards verdes */}
          <BerryGrowthSection berry={berry} flavorColor={flavorColor} />

          {/* 4. Contest */}
          <BerryContestSection berry={berry} dominantFlavor={dominantFlavor} />

          {/* 5. Natural Gift */}
          <BerryNaturalGifts berry={berry} />

          {/* 6. Pokémon que la cargan */}
          {heldBy && heldBy.length > 0 && (
            <BerryHeldPokemon pokemon={heldBy} flavorColor={flavorColor} />
          )}

          {/* 7. Navigation arrows */}
          <BerryNavigationArrows currentId={berry.id} />

          {/* 8. Related carousel */}
          <RelatedBerriesCarousel
            currentBerry={berry}
            dominantFlavor={dominantFlavor}
            flavorColor={flavorColor}
          />
        </div>
      </motion.main>
    </>
  );
}