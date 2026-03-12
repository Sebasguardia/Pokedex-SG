"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  Radar, ResponsiveContainer, Tooltip as RechartsTooltip,
} from "recharts";
import { Leaf } from "lucide-react";
import NumberFlow from "@number-flow/react";
import { FLAVOR_COLORS, FLAVOR_META } from "@/lib/constants/berries.constants";

interface RadarEntry {
  flavor: string;
  flavorKey: string;
  value: number;
  color: string;
}

interface BerryFlavorRadarProps {
  radarData: RadarEntry[];
  dominantFlavor: any;
  flavorColor: string;
  smoothness?: number;
  berry: any;
}

function CustomTick(props: any) {
  const { payload, x, y } = props;
  const entry = (props.radarData as RadarEntry[]).find((d) => d.flavor === payload.value);
  if (!entry) return null;
  const Icon = FLAVOR_META[entry.flavorKey]?.icon;
  return (
    <g>
      <circle cx={x} cy={y} r={17} fill={`${entry.color}1A`} stroke={entry.color} strokeWidth={1} />
      <foreignObject x={x - 8} y={y - 8} width={16} height={16}>
        <div className="flex items-center justify-center w-full h-full" style={{ color: entry.color }}>
          {Icon ? <Icon size={14} /> : null}
        </div>
      </foreignObject>
      <text x={x} y={y + 28} textAnchor="middle" fill={entry.color} fontSize={9} fontFamily="monospace">
        {entry.value}
      </text>
    </g>
  );
}

// ─────────────────────────────────────────────────────────────
// BERRY FLAVOR RADAR
// ─────────────────────────────────────────────────────────────
export function BerryFlavorRadar({ radarData, dominantFlavor, flavorColor, smoothness, berry }: BerryFlavorRadarProps) {
  const prefersRM = useReducedMotion();
  const sorted = [...radarData].sort((a, b) => b.value - a.value);
  const chartData = radarData.map((d) => ({ ...d, avg: 15 }));
  const totalPotency = radarData.reduce((s, d) => s + d.value, 0);

  return (
    <section>
      <div className="flex items-center gap-3 mb-8">
        <h2 className="font-press-start text-[14px] text-[#111111] uppercase tracking-tighter">
          PERFIL DE SABOR
        </h2>
        <div className="h-px bg-[#E0E0E0] flex-1" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        {/* LEFT: Radar */}
        <div className="md:col-span-7">
          <div className="border-2 border-[#111111] bg-white p-6 relative h-full flex flex-col items-center justify-center min-h-[400px]" style={{ boxShadow: "4px 4px 0 #111111" }}>
            <div className="absolute top-[-14px] left-4 bg-[#111111] px-3 py-1 z-10 border-2 border-[#111111]">
              <span className="font-press-start text-[9px] text-white tracking-widest uppercase">Radar</span>
            </div>

            <div className="w-full h-full flex items-center justify-center py-2">
              <ResponsiveContainer width="100%" height={320}>
                <RadarChart cx="50%" cy="50%" outerRadius="72%" data={chartData}>
                  <PolarGrid gridType="polygon" stroke="rgba(0,0,0,0.1)" strokeWidth={1} />
                  <PolarAngleAxis
                    dataKey="flavor"
                    tick={(props) => <CustomTick {...props} radarData={radarData} />}
                    tickLine={false}
                  />
                  <PolarRadiusAxis angle={90} domain={[0, 40]} tick={false} axisLine={false} />
                  <Radar
                    name="Promedio" dataKey="avg"
                    stroke="#D1D5DB" fill="rgba(0,0,0,0.02)" strokeWidth={1.5}
                    strokeDasharray="4 3" dot={false} isAnimationActive={false}
                  />
                  <Radar
                    name="Esta baya" dataKey="value"
                    stroke={flavorColor} fill={`${flavorColor}40`} strokeWidth={2.5}
                    dot={{ r: 4, fill: flavorColor, stroke: "#fff", strokeWidth: 1.5 }}
                    activeDot={{ r: 6, fill: flavorColor }}
                    isAnimationActive={!prefersRM} animationBegin={200} animationDuration={900} animationEasing="ease-out"
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="flex justify-center gap-5 mt-2">
              <div className="flex items-center gap-1.5 font-nunito text-[10px] text-[#888888]">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: flavorColor }} />
                Esta baya
              </div>
              <div className="flex items-center gap-1.5 font-nunito text-[10px] text-[#888888]">
                <div className="w-5 h-0 border-t border-dashed border-[#888888]" />
                Promedio
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Intensidades + Especificaciones */}
        <div className="md:col-span-5 flex flex-col gap-6">
          {/* Intensidades */}
          <div className="border-2 border-[#111111] bg-white p-5 relative flex-1" style={{ boxShadow: "4px 4px 0 #111111" }}>
            <div className="absolute top-[-14px] left-4 bg-[#111111] px-3 py-1 z-10 border-2 border-[#111111]">
              <span className="font-press-start text-[9px] text-white tracking-widest uppercase">Intensidades</span>
            </div>

            <div className="flex flex-col mt-4 gap-0.5">
              {sorted.map((d, i) => {
                const Icon = FLAVOR_META[d.flavorKey]?.icon;
                return (
                  <div key={d.flavorKey} className="flex items-center gap-3 py-2 border-b border-[#F2F2F2]">
                    <div className="w-[90px] flex items-center gap-2 shrink-0">
                      <span className="flex items-center justify-center" style={{ color: d.color }}>
                        {Icon ? <Icon size={14} /> : null}
                      </span>
                      <span className="font-nunito font-bold text-[13px]" style={{ color: d.color }}>{d.flavor}</span>
                    </div>
                    <div className="flex-1 bg-[#F2F2F2] h-2 rounded-full overflow-hidden border border-[#E0E0E0]">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: d.color }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(d.value / 40) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
                      />
                    </div>
                    <span className="font-jetbrains font-bold text-[13px] w-4 text-right" style={{ color: d.value > 0 ? d.color : "#CCCCCC" }}>
                      {d.value}
                    </span>
                  </div>
                );
              })}

              <div className="h-0.5 bg-[#111111] mt-4" />
              <div className="flex justify-between items-center px-1">
                <span className="font-jetbrains text-[10px] text-[#888888] uppercase tracking-wider">Total</span>
                <span className="font-press-start text-[12px] text-[#111111]">{totalPotency}</span>
              </div>
            </div>
          </div>

          {/* Especificaciones */}
          <div className="bg-[#111111] p-5 flex-1 flex flex-col justify-center relative overflow-hidden group">
            <div className="absolute bottom-[-10px] right-[-10px] opacity-10 group-hover:scale-110 transition-transform duration-500">
              <Leaf size={100} className="text-[#16A34A]" />
            </div>

            <div className="space-y-4 relative z-10">
              <div className="space-y-1">
                <span className="font-press-start text-[8px] text-[#CC0000] uppercase tracking-widest">Especificaciones</span>
                <div className="h-0.5 bg-[#CC0000]/30 w-10" />
              </div>

              <div className="space-y-2.5">
                {[
                  { label: "Smoothness", value: smoothness ?? "—" },
                  { label: "Grow time", value: `${berry?.growth_time}h` },
                  { label: "Max harvest", value: berry?.max_harvest },
                ].map((spec) => (
                  <div key={spec.label} className="flex justify-between border-b border-white/10 pb-1 group/row">
                    <span className="font-nunito text-[13px] font-bold text-white/50 group-hover/row:text-white transition-colors">
                      {spec.label}
                    </span>
                    <span className="font-press-start text-[11px] text-white">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}