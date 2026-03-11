import { Swords, Shield, Heart, Fingerprint, MapPin } from "lucide-react"

export const ABILITY_CATEGORIES = {
    offensive: {
        label: "Ofensiva",
        id: "offensive",
        icon: Swords,
        color: "#CC0000",
        bg: "#FEE2E2",
        darkBg: "rgba(204,0,0,0.2)",
        darkText: "#FF6B6B"
    },
    defensive: {
        label: "Defensiva",
        id: "defensive",
        icon: Shield,
        color: "#1D4ED8",
        bg: "#DBEAFE",
        darkBg: "rgba(59,130,246,0.2)",
        darkText: "#60A5FA"
    },
    support: {
        label: "Soporte",
        id: "support",
        icon: Heart,
        color: "#7C3AED",
        bg: "#EDE9FE",
        darkBg: "rgba(124,58,237,0.2)",
        darkText: "#A78BFA"
    },
    passive: {
        label: "Pasiva",
        id: "passive",
        icon: Fingerprint,
        color: "#6B7280",
        bg: "#F3F4F6",
        darkBg: "rgba(255,255,255,0.08)",
        darkText: "#E0E0E0"
    },
    overworld: {
        label: "Campo",
        id: "overworld",
        icon: MapPin,
        color: "#15803D",
        bg: "#DCFCE7",
        darkBg: "rgba(34,197,94,0.2)",
        darkText: "#4ADE80"
    }
}

export const ABILITY_SLOT_LABELS = {
    1: "Primer Slot",
    2: "Segundo Slot",
    3: "Habilidad Oculta"
}

export const ABILITY_KEYWORDS = {
    offensive: [
        "Ataque", "daño", "crítico", "potencia", "aumenta el", "golpe", "físico", "especial",
        "Ataque Especial", "Atq. Esp.", "Atq.", "potencia los movimientos", "doble de daño"
    ],
    defensive: [
        "Defensa", "Inmune", "no afecta", "reduce", "mitad", "resistencia", "Defensa Especial",
        "Def. Esp.", "Def.", "protege", "evita", "baja el daño", "inmune a"
    ],
    support: [
        "clima", "terreno", "estadística", "paralizado", "quemado", "aliados", "equipo", "sol",
        "lluvia", "arena", "granizo", "nieve", "ps", "recupera", "cura", "aliado"
    ],
    overworld: [
        "campo", "salvaje", "encuentro", "pasos", "mochila", "fuera de combate", "encabezar"
    ]
}
