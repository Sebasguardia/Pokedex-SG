"use client";

import { motion } from "framer-motion";
import * as Tooltip from "@radix-ui/react-tooltip";
import { FLAVOR_META } from "@/lib/constants/berries/berries.constants";

interface BerryFlavorChipProps {
    flavor: string;
    value: number;
    index?: number;
    dark?: boolean;
}

export function BerryFlavorChip({ flavor, value, index = 0, dark = true }: BerryFlavorChipProps) {
    const meta = FLAVOR_META[flavor];
    if (!meta) return null;

    return (
        <Tooltip.Provider delayDuration={300}>
            <Tooltip.Root>
                <Tooltip.Trigger asChild>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.15 + index * 0.08 }}
                        className={[
                            "inline-flex items-center gap-1.5 px-3 py-1 font-nunito font-bold text-[10px] uppercase tracking-wider cursor-help",
                            dark
                                ? "bg-white/10 border border-white/25 text-white hover:bg-white/20"
                                : "bg-[#F2F2F2] border border-[#E0E0E0] text-[#111111] hover:border-[#111111]",
                        ].join(" ")}
                    >
                        <span className="shrink-0">
                            <meta.icon size={12} />
                        </span>
                        <span className="hidden sm:inline">{meta.nameEs}</span>
                        <span
                            className={[
                                "font-jetbrains text-[10px] px-1",
                                dark ? "bg-black/20 text-white" : "bg-[#111111] text-white",
                            ].join(" ")}
                        >
                            {value}
                        </span>
                    </motion.div>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                    <Tooltip.Content
                        className="z-50 bg-[#111111] text-white p-3 text-[11px] font-nunito max-w-[220px]"
                        style={{ boxShadow: "3px 3px 0 #CC0000" }}
                        sideOffset={6}
                    >
                        <p className="font-bold mb-1 uppercase tracking-wider">{meta.nameEs}</p>
                        <p className="text-white/60 text-[10px]">↑ {meta.plusNature.slice(0, 2).join(", ")}</p>
                        <p className="text-white/60 text-[10px]">↓ {meta.minusNature.slice(0, 2).join(", ")}</p>
                        <Tooltip.Arrow className="fill-[#111111]" />
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip.Root>
        </Tooltip.Provider>
    );
}