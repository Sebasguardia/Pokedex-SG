"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Gem, Sprout, Zap } from "lucide-react";
import * as Tooltip from "@radix-ui/react-tooltip";
import * as HoverCard from "@radix-ui/react-hover-card";
import { useState } from "react";

import { FLAVOR_COLORS, FIRMNESS_COLORS, FLAVOR_META } from "@/lib/constants/berries.constants";
import { getDominantFlavor } from "@/lib/utils/berry.utils";

interface BerryCardProps {
  berry: any;
  index?: number;
}

export function BerryCard({ berry, index = 0 }: BerryCardProps) {
  const router = useRouter();
  const prefersRM = useReducedMotion();
  const [isLeaving, setIsLeaving] = useState(false);

  const dominant = getDominantFlavor(berry.flavors);
  const domColor = dominant ? FLAVOR_COLORS[dominant.flavor.name] ?? "#111111" : "#111111";
  const spriteSrc: string = berry.item?.sprites?.default ?? "";
  const nameEs = `Baya ${berry.name.charAt(0).toUpperCase() + berry.name.slice(1)}`;

  const bobDuration = 2.5 + (index % 5) * 0.4;
  const bobDelay = (index % 8) * 0.35;

  function handleClick() {
    if (prefersRM) { router.push(`/berries/${berry.name}`); return; }
    setIsLeaving(true);
    setTimeout(() => router.push(`/berries/${berry.name}`), 200);
  }

  return (
    <Tooltip.Provider delayDuration={0}>
      <HoverCard.Root openDelay={450}>
        <HoverCard.Trigger asChild>
          <motion.div
            initial={prefersRM ? { opacity: 0 } : { opacity: 0, clipPath: "inset(0 100% 0 0)" }}
            whileInView={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
            viewport={{ once: true, margin: "-20px" }}
            animate={isLeaving ? { opacity: 0, scale: 0.97 } : {}}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: (index % 15) * 0.04 }}
            whileHover={prefersRM ? {} : { x: 4, y: 4, boxShadow: "0px 0px 0 #111111" }}
            whileTap={{ scale: 0.97 }}
            onClick={handleClick}
            className="group relative bg-white border-2 border-[#111111] overflow-hidden cursor-pointer"
            style={{ boxShadow: "4px 4px 0 #111111" }}
          >
            {/* Top strip — dominant flavor color */}
            <div className="h-[3px] w-full" style={{ backgroundColor: domColor }} />

            {/* Sprite area */}
            <div
              className="h-[88px] relative overflow-hidden flex items-center justify-center"
              style={{ background: `radial-gradient(circle at center, ${domColor}22 0%, white 72%)` }}
            >
              <div className="absolute top-1.5 left-2">
                <span className="font-jetbrains text-[9px] text-[#888888]">
                  #{String(berry.id).padStart(2, "0")}
                </span>
              </div>

              {spriteSrc ? (
                <motion.img
                  src={spriteSrc}
                  alt={nameEs}
                  className="w-[52px] h-[52px]"
                  style={{ imageRendering: "pixelated", filter: `drop-shadow(0 2px 4px ${domColor}4D)` }}
                  animate={prefersRM ? {} : { y: [0, -5, 0], rotate: [-2, 2, -2] }}
                  transition={{
                    y: { duration: bobDuration, repeat: Infinity, ease: "easeInOut", delay: bobDelay },
                    rotate: { duration: bobDuration + 0.5, repeat: Infinity, ease: "easeInOut", delay: bobDelay },
                  }}
                />
              ) : (
                <div className="w-[52px] h-[52px] bg-[#F2F2F2]" />
              )}
            </div>

            {/* Card body */}
            <div className="p-3">
              {/* Name + flavor badge */}
              <div className="flex items-start justify-between gap-1 mb-2">
                <h3 className="font-nunito font-bold text-[13px] text-[#111111] group-hover:text-[#CC0000] transition-colors line-clamp-1">
                  {nameEs}
                </h3>
                {dominant && dominant.potency > 0 && (
                  <div
                    className="shrink-0 px-1.5 py-0.5 flex items-center gap-0.5"
                    style={{ backgroundColor: `${domColor}22`, color: domColor }}
                  >
                    {(() => {
                      const Icon = FLAVOR_META[dominant.flavor.name]?.icon;
                      return Icon ? <Icon size={10} /> : null;
                    })()}
                    <span className="font-nunito font-bold text-[8px]">
                      {FLAVOR_META[dominant.flavor.name]?.nameEs}
                    </span>
                  </div>
                )}
              </div>

              <div className="h-px bg-[#E0E0E0] w-full mb-2" />

              {/* Mini flavor bar */}
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <div className="h-[5px] flex gap-[1px] mb-3 overflow-hidden group-hover:h-[7px] transition-all duration-300">
                    {berry.flavors.map((fl: any, i: number) =>
                      fl.potency > 0 ? (
                        <motion.div
                          key={fl.flavor.name}
                          className="h-full"
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: i * 0.05, ease: "easeOut" }}
                          style={{ flex: fl.potency, backgroundColor: FLAVOR_COLORS[fl.flavor.name], transformOrigin: "left" }}
                        />
                      ) : null
                    )}
                  </div>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content className="z-50 bg-[#111111] text-white px-2 py-1.5 text-[10px] font-nunito" sideOffset={5}>
                    {berry.flavors.filter((fl: any) => fl.potency > 0)
                      .map((fl: any) => `${FLAVOR_META[fl.flavor.name]?.nameEs}: ${fl.potency}`)
                      .join(" · ")}
                    <Tooltip.Arrow className="fill-[#111111]" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>

              <div className="h-px bg-[#E0E0E0] w-full mb-2" />

              {/* Stats row */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Sprout size={11} className="text-[#16A34A]" />
                  <span className="font-nunito text-[10px] text-[#888888]">{berry.growth_time}h</span>
                </div>
                <div className="flex items-center gap-1">
                  <Gem size={11} color={FIRMNESS_COLORS[berry.firmness.name] ?? "#111"} />
                  <span className="font-nunito text-[10px] text-[#888888] capitalize">
                    {berry.firmness.name.replace("-", " ")}
                  </span>
                </div>
                {berry.natural_gift_power > 0 && (
                  <div className="flex items-center gap-1 ml-auto">
                    <Zap size={11} className="text-orange-500" />
                    <span className="font-jetbrains text-[10px] text-[#888888]">{berry.natural_gift_power}</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </HoverCard.Trigger>

        {/* Hover card */}
        <HoverCard.Portal>
          <HoverCard.Content
            className="z-50 w-[220px] bg-white border-2 border-[#111111] hidden md:block"
            style={{ boxShadow: "5px 5px 0 #111111" }}
            sideOffset={10}
          >
            <div className="h-[3px] w-full" style={{ backgroundColor: domColor }} />
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              className="flex flex-col gap-2 p-4"
            >
              <div className="flex items-center gap-3">
                {spriteSrc && (
                  <img src={spriteSrc} alt={nameEs} className="w-10 h-10" style={{ imageRendering: "pixelated" }} />
                )}
                <div>
                  <span className="font-nunito font-bold text-[13px] text-[#111111] block">{nameEs}</span>
                  <span className="font-jetbrains text-[9px] text-[#888888]">#{String(berry.id).padStart(2, "0")}</span>
                </div>
              </div>
              <div className="h-px bg-[#E0E0E0] w-full" />
              <div className="flex gap-[2px] h-1.5">
                {berry.flavors.map((fl: any) =>
                  fl.potency > 0 ? (
                    <div key={fl.flavor.name} style={{ flex: fl.potency, backgroundColor: FLAVOR_COLORS[fl.flavor.name] }} />
                  ) : null
                )}
              </div>
              <div className="flex gap-1.5 flex-wrap">
                {berry.flavors.filter((fl: any) => fl.potency > 0).map((fl: any) => (
                  <span key={fl.flavor.name} className="font-nunito text-[10px] px-1.5 py-0.5"
                    style={{ color: FLAVOR_COLORS[fl.flavor.name], backgroundColor: `${FLAVOR_COLORS[fl.flavor.name]}18` }}>
                    {FLAVOR_META[fl.flavor.name]?.nameEs}: {fl.potency}
                  </span>
                ))}
              </div>
              <div className="h-px bg-[#E0E0E0] w-full" />
              <span className="font-nunito text-[10px] text-[#888888] italic">
                Crece en {berry.growth_time}h · Max {berry.max_harvest} bayas
              </span>
            </motion.div>
            <HoverCard.Arrow className="fill-[#111111]" />
          </HoverCard.Content>
        </HoverCard.Portal>
      </HoverCard.Root>
    </Tooltip.Provider>
  );
}