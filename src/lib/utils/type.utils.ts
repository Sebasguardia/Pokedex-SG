import { TYPE_CONSTANTS } from "@/lib/constants/types/types.constants";

export function getTypeColor(typeName: string): string {
    return TYPE_CONSTANTS[typeName]?.color ?? "#A8A878";
}

export function getTypeGradient(typeName: string): string {
    return TYPE_CONSTANTS[typeName]?.gradient ?? "from-[#A8A878] to-[#6D6D4E]";
}

export function getTypeLabel(typeName: string): string {
    return TYPE_CONSTANTS[typeName]?.name ?? typeName;
}
