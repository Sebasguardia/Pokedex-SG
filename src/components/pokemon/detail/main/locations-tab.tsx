"use client";

import { EmptyState } from "@/components/ui/empty-state";
import { MapPin } from "lucide-react";

interface LocationsTabProps {
    encounters: any[];
}

export function LocationsTab({ encounters }: LocationsTabProps) {
    if (!encounters || encounters.length === 0) {
        return (
            <EmptyState
                title="Sin encuentros"
                description="Este Pokémon no aparece en la naturaleza en esta versión."
                icon={<MapPin className="h-12 w-12" />}
            />
        );
    }

    return (
        <div className="space-y-4">
            <h3 className="font-['Press_Start_2P'] text-[12px] text-[#111111] mb-6 flex items-center gap-3">
                <span className="w-3 h-3 bg-[#111111]" />
                UBICACIONES
                <span className="flex-1 h-[2px] bg-[#E0E0E0]" />
            </h3>
            <div className="grid grid-cols-1 gap-5">
                {encounters.slice(0, 20).map((enc: any, i: number) => (
                    <div 
                        key={i} 
                        className="group p-5 bg-white border-[3px] border-[#111111] shadow-[6px_6px_0_#111111] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0_#111111] transition-all flex flex-col sm:flex-row sm:items-center gap-4"
                    >
                        <div className="w-10 h-10 bg-[#F9F9F9] border-2 border-[#111111] flex items-center justify-center shadow-[3px_3px_0_#111111] group-hover:bg-[#CC0000] group-hover:text-white transition-colors">
                            <MapPin size={18} strokeWidth={3} />
                        </div>
                        <div className="flex-1">
                            <p className="font-['Nunito'] text-[16px] font-black text-[#111111] capitalize mb-1">
                                {enc.location_area?.name?.replace(/-/g, " ") ?? "Área desconocida"}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {enc.version_details?.map((vd: any, j: number) => (
                                    <div key={j} className="flex items-center gap-2 bg-[#F2F2F2] border-2 border-[#111111] px-2 py-1 shadow-[2px_2px_0_#111111]">
                                        <span className="font-['Press_Start_2P'] text-[7px] text-[#333333] capitalize">
                                            {vd.version.name.replace(/-/g, " ")}
                                        </span>
                                        <div className="w-1 h-1 bg-[#888888] rounded-full" />
                                        <span className="font-['JetBrains_Mono'] text-[11px] font-bold text-[#CC0000]">
                                            Nv. {vd.encounter_details?.[0]?.min_level}–{vd.encounter_details?.[0]?.max_level}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
