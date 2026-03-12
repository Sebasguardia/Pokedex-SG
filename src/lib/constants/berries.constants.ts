import {
  GiChiliPepper,
  GiCrystalBall,
  GiCandyCanes,
  GiLeafSwirl,
  GiSlicedBread,
} from "react-icons/gi";

// ─────────────────────────────────────────────────────────────
// FLAVOR COLORS
// ─────────────────────────────────────────────────────────────
export const FLAVOR_COLORS: Record<string, string> = {
  spicy: "#EF4444",
  dry: "#60A5FA",
  sweet: "#F472B6",
  bitter: "#4ADE80",
  sour: "#FACC15",
};

// ─────────────────────────────────────────────────────────────
// FLAVOR META — nombre ES, ícono react-icons, naturalezas
// ─────────────────────────────────────────────────────────────
export const FLAVOR_META: Record<string, {
  nameEs: string;
  icon: React.ElementType;
  plusNature: string[];
  minusNature: string[];
}> = {
  spicy: {
    nameEs: "Picante",
    icon: GiChiliPepper,
    plusNature: ["Activa (Lonely)", "Firme (Adamant)", "Pícara (Naughty)", "Audaz (Brave)"],
    minusNature: ["Osada (Bold)", "Modesta (Modest)", "Serena (Calm)", "Miedosa (Timid)"],
  },
  dry: {
    nameEs: "Seco",
    icon: GiCrystalBall,
    plusNature: ["Osada (Bold)", "Agitada (Impish)", "Floja (Lax)", "Plácida (Relaxed)"],
    minusNature: ["Activa (Lonely)", "Afable (Mild)", "Amable (Gentle)", "Activa (Hasty)"],
  },
  sweet: {
    nameEs: "Dulce",
    icon: GiCandyCanes,
    plusNature: ["Miedosa (Timid)", "Alegre (Jolly)", "Ingenua (Naive)", "Activa (Hasty)"],
    minusNature: ["Audaz (Brave)", "Plácida (Relaxed)", "Mansa (Quiet)", "Grosera (Sassy)"],
  },
  bitter: {
    nameEs: "Amargo",
    icon: GiLeafSwirl,
    plusNature: ["Modesta (Modest)", "Afable (Mild)", "Alocada (Rash)", "Mansa (Quiet)"],
    minusNature: ["Firme (Adamant)", "Agitada (Impish)", "Alegre (Jolly)", "Cauta (Careful)"],
  },
  sour: {
    nameEs: "Ácido",
    icon: GiSlicedBread,
    plusNature: ["Serena (Calm)", "Amable (Gentle)", "Cauta (Careful)", "Grosera (Sassy)"],
    minusNature: ["Pícara (Naughty)", "Floja (Lax)", "Ingenua (Naive)", "Alocada (Rash)"],
  },
};

// ─────────────────────────────────────────────────────────────
// FIRMNESS COLORS
// ─────────────────────────────────────────────────────────────
export const FIRMNESS_COLORS: Record<string, string> = {
  "very-soft": "#FDE68A",
  "soft": "#FCD34D",
  "hard": "#92400E",
  "very-hard": "#78350F",
  "super-hard": "#111111",
};

// ─────────────────────────────────────────────────────────────
// BERRY CATEGORIES
// ─────────────────────────────────────────────────────────────
export const BERRY_CATEGORIES: {
  id: string;
  label: string;
  icon: string;
  color: string;
}[] = [
    { id: "healing", label: "Curación", icon: "Heart", color: "#16A34A" },
    { id: "stats", label: "Estadísticas", icon: "TrendingUp", color: "#2563EB" },
    { id: "ev-reducing", label: "EV-reducing", icon: "TrendingDown", color: "#DC2626" },
    { id: "contest", label: "Concurso", icon: "Sparkles", color: "#9333EA" },
    { id: "bait", label: "Cebo", icon: "Apple", color: "#D97706" },
    { id: "other", label: "Otros", icon: "Leaf", color: "#888888" },
  ];