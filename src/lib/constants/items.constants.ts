import {
    HeartPulse,
    Circle,
    Swords,
    Leaf,
    Package,
    Disc,
    Key,
    Box,
    Mail
} from "lucide-react"

export const POCKET_COLORS = {
    medicine: {
        fondo: "#FEE2E2",
        acento: "#EF4444",
        icon: HeartPulse
    },
    pokeballs: {
        fondo: "#FEF9C3",
        acento: "#CA8A04",
        icon: Circle
    },
    battle: {
        fondo: "#FEF3C7",
        acento: "#D97706",
        icon: Swords
    },
    berries: {
        fondo: "#DCFCE7",
        acento: "#16A34A",
        icon: Leaf
    },
    mail: {
        fondo: "#EDE9FE",
        acento: "#7C3AED",
        icon: Mail
    },
    machines: {
        fondo: "#DBEAFE",
        acento: "#2563EB",
        icon: Disc
    },
    key: {
        fondo: "#FFF7ED",
        acento: "#EA580C",
        icon: Key
    },
    misc: {
        fondo: "#F3F4F6",
        acento: "#6B7280",
        icon: Box
    }
} as const

export const POCKET_META: Record<string, { label: string, shortDesc: string, acento: string, fondo: string, icon: any }> = {
    medicine: {
        label: "Medicina",
        shortDesc: "Pociones, antídotos y curación",
        acento: "#EF4444",
        fondo: "#FEE2E2",
        icon: HeartPulse
    },
    pokeballs: {
        label: "Poké Balls",
        shortDesc: "Dispositivos para capturar Pokémon salvajes",
        acento: "#CA8A04",
        fondo: "#FEF9C3",
        icon: Circle
    },
    battle: {
        label: "Batalla",
        shortDesc: "Objetos de mejora para usar en combate",
        acento: "#D97706",
        fondo: "#FEF3C7",
        icon: Swords
    },
    berries: {
        label: "Bayas",
        shortDesc: "Cultivos naturales con efectos diversos",
        acento: "#16A34A",
        fondo: "#DCFCE7",
        icon: Leaf
    },
    mail: {
        label: "Correo",
        shortDesc: "Cartas y mensajes para enviar",
        acento: "#7C3AED",
        fondo: "#EDE9FE",
        icon: Mail
    },
    machines: {
        label: "TMs y CTs",
        shortDesc: "Máquinas para enseñar movimientos",
        acento: "#2563EB",
        fondo: "#DBEAFE",
        icon: Disc
    },
    key: {
        label: "Objetos Clave",
        shortDesc: "Herramientas cruciales para la aventura",
        acento: "#EA580C",
        fondo: "#FFF7ED",
        icon: Key
    },
    misc: {
        label: "Otros",
        shortDesc: "Gemas, fósiIes, ventas valiosas y más",
        acento: "#6B7280",
        fondo: "#F3F4F6",
        icon: Box
    }
}
