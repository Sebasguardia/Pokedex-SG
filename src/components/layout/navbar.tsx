"use client";

import {
    motion, AnimatePresence, useScroll, useMotionValueEvent,
    useReducedMotion, LayoutGroup, Variants
} from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";
import * as Tooltip from "@radix-ui/react-tooltip";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
    Search, Heart, Scale, Sun, Moon, ChevronRight, X,
    Gamepad2, Dna, Swords, Zap, Backpack, Cherry, Sparkles,
    Map, Disc3, Users, GitCompare, Trophy, Menu,
    ChevronDown, ArrowRight,
} from "lucide-react";
import { useFavoritesStore } from "@/lib/store/favorites.store";
import { useCompareStore } from "@/lib/store/compare.store";
import { useTheme } from "next-themes";
import {
    useState, useEffect, useCallback, memo, useRef, type ReactNode,
} from "react";
import { useFilterStore } from "@/lib/store/filter.store";
import { SearchCommand } from "@/components/shared/search-command";
import { cn } from "@/lib/utils/cn";

/* ──────────────────────────────────────────────────────────
   NAV STRUCTURE  — grupos con mega-menu
────────────────────────────────────────────────────────── */
const NAV_GROUPS = [
    {
        id: "pokedex",
        label: "Pokémon",
        color: "#CC0000",
        links: [
            { href: "/pokemon", label: "Pokédex", icon: Gamepad2, count: "1025", description: "Todos los Pokémon" },
            { href: "/types", label: "Tipos", icon: Dna, count: "18", description: "18 tipos de batalla" },
            { href: "/locations", label: "Locaciones", icon: Map, count: "850+", description: "Regiones y rutas" },
            { href: "/generations", label: "Generaciones", icon: GitCompare, count: "9", description: "9 generaciones" },
        ],
    },
    {
        id: "combate",
        label: "Combate",
        color: "#3B82F6",
        links: [
            { href: "/moves", label: "Movimientos", icon: Swords, count: "900+", description: "Base de movimientos" },
            { href: "/abilities", label: "Habilidades", icon: Zap, count: "300+", description: "Habilidades especiales" },
            { href: "/natures", label: "Naturalezas", icon: Sparkles, count: "25", description: "25 naturalezas" },
            { href: "/machines", label: "TMs / MOs", icon: Disc3, count: "100+", description: "Máquinas técnicas" },
        ],
    },
    {
        id: "objetos",
        label: "Objetos",
        color: "#F59E0B",
        links: [
            { href: "/items", label: "Objetos", icon: Backpack, count: "800+", description: "Todos los objetos" },
            { href: "/berries", label: "Bayas", icon: Cherry, count: "64", description: "64 bayas" },
        ],
    },
    {
        id: "tools",
        label: "Herramientas",
        color: "#22C55E",
        links: [
            { href: "/compare", label: "Comparador", icon: Scale, count: null, description: "Compara hasta 4 Pokémon" },
            { href: "/team-builder", label: "Constructor", icon: Users, count: null, description: "Arma tu equipo ideal" },
            { href: "/favorites", label: "Favoritos", icon: Heart, count: null, description: "Tu colección personal" },
        ],
    },
] as const;

// Links planos para el drawer mobile
const ALL_LINKS = NAV_GROUPS.flatMap((g) => g.links.map((l) => ({ ...l, groupColor: g.color })));

/* ──────────────────────────────────────────────────────────
   FRAMER VARIANTS
────────────────────────────────────────────────────────── */
const navVariants = {
    visible: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 420, damping: 38 } },
    hidden: { y: -110, opacity: 0, transition: { type: "spring" as const, stiffness: 420, damping: 38 } },
};

const megaMenuVariants: Variants = {
    closed: { opacity: 0, y: -8, clipPath: "inset(0 0 100% 0)", transition: { duration: 0.18, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
    open: { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)", transition: { duration: 0.26, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const drawerVariants = {
    closed: { x: "-100%", transition: { type: "spring" as const, stiffness: 340, damping: 32, mass: 0.8 } },
    open: { x: "0%", transition: { type: "spring" as const, stiffness: 340, damping: 32, mass: 0.8 } },
};

/* ──────────────────────────────────────────────────────────
   POKÉBALL SVG
────────────────────────────────────────────────────────── */
const PokeBallSVG = memo(function PokeBallSVG({ className, centerColor = "white" }: { className?: string; centerColor?: string }) {
    return (
        <svg viewBox="0 0 28 28" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M 2 14 A 12 12 0 0 1 26 14 Z" fill="#CC0000" />
            <path d="M 2 14 A 12 12 0 0 0 26 14 Z" fill="#FFFFFF" />
            <circle cx="14" cy="14" r="12" fill="none" stroke="#111111" strokeWidth="2" />
            <line x1="2" y1="14" x2="26" y2="14" stroke="#111111" strokeWidth="2" />
            <circle cx="14" cy="14" r="4" fill="#FFFFFF" stroke="#111111" strokeWidth="2" />
            <circle cx="14" cy="14" r="2" fill={centerColor} />
        </svg>
    );
});

/* ──────────────────────────────────────────────────────────
   NAV LOGO
────────────────────────────────────────────────────────── */
const NavLogo = memo(function NavLogo() {
    const [hov, setHov] = useState(false);

    return (
        <Link href="/" aria-label="PokéDex Home">
            <motion.div
                className="flex items-center gap-2.5 shrink-0 cursor-pointer select-none"
                onHoverStart={() => setHov(true)}
                onHoverEnd={() => setHov(false)}
                whileTap={{ scale: 0.88 }}
            >
                <motion.div
                    initial={{ rotate: 0, scale: 0.4 }}
                    animate={{ rotate: 360, scale: 1 }}
                    transition={{ rotate: { duration: 0.7, ease: "backOut" }, scale: { type: "spring", stiffness: 220, damping: 14 } }}
                    whileHover={{ rotate: [0, -22, 22, -10, 10, 0] as unknown as number, transition: { duration: 0.5 } }}
                >
                    <PokeBallSVG className="w-7 h-7 drop-shadow-sm" centerColor={hov ? "#CC0000" : "white"} />
                </motion.div>

                <div className="hidden sm:flex flex-col justify-center relative overflow-hidden">
                    <span className="font-pixel text-[12px] leading-none tracking-tight">
                        <span className="text-gray-900 dark:text-white">Poké</span>
                        <motion.span
                            className="text-[#CC0000]"
                            animate={hov ? { scale: 1.07, filter: "brightness(1.25)" } : { scale: 1, filter: "brightness(1)" }}
                            transition={{ duration: 0.18 }}
                        >Dex</motion.span>
                    </span>
                    {/* Red scanline underline */}
                    <motion.div
                        className="absolute bottom-0 left-0 h-[1.5px] w-full bg-[#CC0000]"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: hov ? 1 : 0 }}
                        style={{ transformOrigin: hov ? "left" : "right" }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                    />
                </div>
            </motion.div>
        </Link>
    );
});

/* ──────────────────────────────────────────────────────────
   GAMEBOY CURSOR (blinking ▶ selector)
────────────────────────────────────────────────────────── */
function GBCursor({ color = "#CC0000" }: { color?: string }) {
    return (
        <motion.span
            className="inline-block font-pixel text-[8px] select-none"
            style={{ color }}
            animate={{ opacity: [1, 0, 1, 0, 1] }}
            transition={{ duration: 0.9, repeat: Infinity, times: [0, 0.33, 0.5, 0.83, 1] }}
        >
            ▶
        </motion.span>
    );
}

/* ──────────────────────────────────────────────────────────
   MEGA MENU DROP  (GameBoy screen aesthetic)
────────────────────────────────────────────────────────── */
interface MegaMenuProps {
    group: typeof NAV_GROUPS[number];
    isOpen: boolean;
    isActive: (href: string) => boolean;
    onClose: () => void;
}

function MegaMenu({ group, isOpen, isActive, onClose }: MegaMenuProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    variants={megaMenuVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    // Positioned absolutely under its trigger group
                    className="absolute top-full left-0 mt-0 min-w-[220px] z-[60]"
                    onMouseLeave={onClose}
                >
                    {/* GameBoy screen outer bezel */}
                    <div
                        className="border-2 border-[#111111] overflow-hidden"
                        style={{ boxShadow: `4px 4px 0 ${group.color}, 4px 4px 0 2px #111111` }}
                    >
                        {/* Screen header bar */}
                        <div
                            className="flex items-center gap-2 px-3 py-2 border-b border-[#111111]"
                            style={{ backgroundColor: group.color }}
                        >
                            {/* Fake GameBoy LED */}
                            <motion.div
                                className="w-2 h-2 rounded-full bg-white/80"
                                animate={{ opacity: [1, 0.4, 1] }}
                                transition={{ duration: 1.2, repeat: Infinity }}
                            />
                            <span className="font-pixel text-[8px] text-white tracking-widest uppercase">
                                {group.label}
                            </span>
                        </div>

                        {/* CRT scanlines + links */}
                        <div className="relative bg-[#111111]">
                            {/* Scanlines overlay */}
                            <div
                                className="absolute inset-0 pointer-events-none z-10 opacity-[0.06]"
                                style={{
                                    backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 4px)",
                                }}
                            />

                            {group.links.map((link, i) => {
                                const active = isActive(link.href);
                                const Icon = link.icon;
                                return (
                                    <motion.div
                                        key={link.href}
                                        initial={{ opacity: 0, x: -6 }}
                                        animate={{ opacity: 1, x: 0, transition: { delay: i * 0.055 } }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={onClose}
                                            className={cn(
                                                "group relative flex items-center gap-3 px-4 py-3 border-b border-white/10 last:border-b-0 transition-colors duration-100",
                                                active ? "bg-white/10" : "hover:bg-white/[0.07]"
                                            )}
                                        >
                                            {/* Selector cursor */}
                                            <span className="w-3 shrink-0">
                                                {active
                                                    ? <GBCursor color={group.color} />
                                                    : <span className="font-pixel text-[8px] text-white/0 group-hover:text-white/50 transition-colors">▶</span>
                                                }
                                            </span>

                                            {/* Icon */}
                                            <Icon
                                                size={14}
                                                className="shrink-0 transition-colors"
                                                style={{ color: active ? group.color : "rgba(255,255,255,0.5)" }}
                                            />

                                            {/* Label */}
                                            <span
                                                className="font-pixel text-[9px] uppercase tracking-wider transition-colors flex-1"
                                                style={{ color: active ? group.color : "rgba(255,255,255,0.85)" }}
                                            >
                                                {link.label}
                                            </span>

                                            {/* Count */}
                                            {link.count && (
                                                <span className="font-pixel text-[7px] text-white/30 tabular-nums">
                                                    {link.count}
                                                </span>
                                            )}

                                            {/* Hover pixel flash */}
                                            <motion.div
                                                className="absolute left-0 top-0 bottom-0 w-[3px] opacity-0 group-hover:opacity-100 transition-opacity"
                                                style={{ backgroundColor: group.color }}
                                            />
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Bottom GameBoy speaker dots */}
                        <div className="flex items-center justify-end gap-1 px-3 py-2 bg-[#1a1a1a] border-t border-white/10">
                            {[0, 1, 2, 3, 4].map((dot) => (
                                <div key={dot} className="w-[3px] h-[3px] rounded-full bg-white/20" />
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

/* ──────────────────────────────────────────────────────────
   DESKTOP GROUP TRIGGER
────────────────────────────────────────────────────────── */
interface GroupTriggerProps {
    group: typeof NAV_GROUPS[number];
    isActive: (href: string) => boolean;
    isDimmed: boolean;
}

function GroupTrigger({ group, isActive, isDimmed }: GroupTriggerProps) {
    const prefersReduced = useReducedMotion();
    const [open, setOpen] = useState(false);
    const [hov, setHov] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const groupActive = group.links.some((l) => isActive(l.href));

    const openMenu = () => { if (timerRef.current) clearTimeout(timerRef.current); setOpen(true); };
    const closeMenu = () => { timerRef.current = setTimeout(() => setOpen(false), 90); };

    return (
        <div
            className="relative"
            onMouseEnter={() => { openMenu(); setHov(true); }}
            onMouseLeave={() => { closeMenu(); setHov(false); }}
        >
            <motion.button
                animate={{ opacity: isDimmed && !prefersReduced ? 0.38 : 1 }}
                transition={{ duration: 0.14 }}
                className={cn(
                    "relative flex items-center gap-1.5 px-3 py-2 font-nunito text-[13px] font-bold uppercase tracking-[0.05em] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[#CC0000] focus-visible:outline-offset-2",
                    groupActive ? "text-[#CC0000]" : "text-gray-900 hover:text-[#CC0000]"
                )}
                aria-expanded={open ? "true" : "false"}
                aria-haspopup="true"
            >
                {/* Pixel underline on hover */}
                {!groupActive && (
                    <motion.div
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#CC0000]"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: hov ? 1 : 0 }}
                        style={{ transformOrigin: hov ? "left" : "right" }}
                        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                    />
                )}

                {groupActive && (
                    <motion.div
                        layoutId="active-dot"
                        className="absolute -bottom-[9px] left-1/2 -translate-x-1/2 w-[5px] h-[5px] rounded-full bg-[#CC0000]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                )}

                <span>{group.label}</span>

                <motion.div
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDown size={11} className="opacity-60" />
                </motion.div>
            </motion.button>

            {/* Mega menu drop */}
            <div onMouseEnter={openMenu} onMouseLeave={closeMenu}>
                <MegaMenu
                    group={group}
                    isOpen={open}
                    isActive={isActive}
                    onClose={() => setOpen(false)}
                />
            </div>
        </div>
    );
}

/* ──────────────────────────────────────────────────────────
   THEME TOGGLE
────────────────────────────────────────────────────────── */
function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const isDark = theme === "dark";

    return (
        <Tooltip.Provider delayDuration={700}>
            <Tooltip.Root>
                <Tooltip.Trigger asChild>
                    <motion.button
                        aria-label="Cambiar tema"
                        onClick={() => setTheme(isDark ? "light" : "dark")}
                        whileTap={{ scale: 0.92 }}
                        className="w-9 h-9 flex items-center justify-center border-2 border-gray-200 bg-gray-50 hover:border-[#111111] hover:bg-gray-100 transition-colors focus-visible:outline-2 focus-visible:outline-[#CC0000] focus-visible:outline-offset-2"
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            {isDark ? (
                                <motion.div key="moon"
                                    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.22 }}>
                                    <Moon className="h-4 w-4 text-gray-700" />
                                </motion.div>
                            ) : (
                                <motion.div key="sun"
                                    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.22 }}
                                    whileHover={{ rotate: 180, transition: { duration: 0.5, ease: "linear" } }}>
                                    <Sun className="h-4 w-4 text-gray-700" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.button>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                    <Tooltip.Content side="bottom" sideOffset={8}
                        className="bg-[#111111] text-white font-pixel text-[8px] px-2 py-1.5 border border-[#CC0000] z-[100] pointer-events-none rounded-none"
                    >
                        {isDark ? "Modo claro" : "Modo oscuro"}
                        <Tooltip.Arrow className="fill-[#111111]" />
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip.Root>
        </Tooltip.Provider>
    );
}

/* ──────────────────────────────────────────────────────────
   NAV ACTIONS (right side)
────────────────────────────────────────────────────────── */
function NavActions({ onSearchOpen, favCount, compareCount }: {
    onSearchOpen: () => void;
    favCount: number;
    compareCount: number;
}) {
    const [kbdShake, setKbdShake] = useState(false);

    return (
        <div className="flex items-center gap-0.5 shrink-0">
            {/* Search */}
            <motion.button
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setKbdShake(true)}
                onHoverEnd={() => setKbdShake(false)}
                onClick={onSearchOpen}
                aria-label="Buscar (⌘K)"
                className="flex items-center gap-2 px-2.5 py-2 hover:bg-gray-100 transition-colors focus-visible:outline-2 focus-visible:outline-[#CC0000] focus-visible:outline-offset-2"
            >
                <Search className="h-[17px] w-[17px] text-gray-600" />
                <motion.kbd
                    animate={kbdShake ? { x: [-1, 1, -1, 1, 0] } : { x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="hidden sm:inline font-pixel text-[7px] bg-gray-100 border border-gray-300 px-1.5 py-0.5 text-gray-400 rounded-none"
                >⌘K</motion.kbd>
            </motion.button>

            {/* Favorites */}
            <Tooltip.Provider delayDuration={700}>
                <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                        <Link href="/favorites" aria-label={`Favoritos: ${favCount}`}
                            className="relative p-2.5 hover:bg-red-50 transition-colors focus-visible:outline-2 focus-visible:outline-[#CC0000] focus-visible:outline-offset-2">
                            <motion.div whileHover={{ rotate: [-14, 14, -8, 8, 0] as unknown as number }} transition={{ duration: 0.4 }}>
                                <Heart className={cn("h-[17px] w-[17px] transition-all duration-200",
                                    favCount > 0 ? "fill-[#CC0000] text-[#CC0000]" : "text-gray-500")} />
                            </motion.div>
                            <AnimatePresence>
                                {favCount > 0 && (
                                    <motion.span key={favCount}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: [1.35, 1], transition: { type: "spring", stiffness: 600, damping: 15 } }}
                                        exit={{ scale: 0, transition: { duration: 0.14 } }}
                                        className="absolute -top-0.5 -right-0.5 min-w-[17px] h-[17px] bg-[#CC0000] text-white font-pixel text-[6px] border-2 border-white flex items-center justify-center px-0.5 rounded-none"
                                    >
                                        {favCount > 9 ? "9+" : favCount}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </Link>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                        <Tooltip.Content side="bottom" sideOffset={8}
                            className="bg-[#111111] text-white font-pixel text-[8px] px-2 py-1.5 border border-[#CC0000] z-[100] pointer-events-none rounded-none"
                        >
                            Favoritos {favCount > 0 && `(${favCount})`}
                            <Tooltip.Arrow className="fill-[#111111]" />
                        </Tooltip.Content>
                    </Tooltip.Portal>
                </Tooltip.Root>
            </Tooltip.Provider>

            {/* Comparador */}
            <Tooltip.Provider delayDuration={700}>
                <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                        <Link href="/compare" aria-label={`Comparador: ${compareCount}`}
                            className="relative p-2.5 hover:bg-gray-100 transition-colors focus-visible:outline-2 focus-visible:outline-[#CC0000] focus-visible:outline-offset-2">
                            <motion.div whileHover={{ rotate: [0, -8, 8, -5, 5, 0] as unknown as number }} transition={{ duration: 0.5 }}>
                                <Scale className="h-[17px] w-[17px] text-gray-500" />
                            </motion.div>
                            <AnimatePresence>
                                {compareCount > 0 && (
                                    <motion.span key={compareCount}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1, transition: { type: "spring", stiffness: 500, damping: 15 } }}
                                        exit={{ scale: 0, transition: { duration: 0.14 } }}
                                        className="absolute -top-0.5 -right-0.5 min-w-[17px] h-[17px] bg-[#111111] text-white font-pixel text-[6px] border-2 border-white flex items-center justify-center px-0.5 rounded-none"
                                    >
                                        {compareCount}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </Link>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                        <Tooltip.Content side="bottom" sideOffset={8}
                            className="bg-[#111111] text-white font-pixel text-[8px] px-2 py-1.5 border border-[#CC0000] z-[100] pointer-events-none rounded-none"
                        >
                            Comparador {compareCount > 0 && `(${compareCount}/4)`}
                            <Tooltip.Arrow className="fill-[#111111]" />
                        </Tooltip.Content>
                    </Tooltip.Portal>
                </Tooltip.Root>
            </Tooltip.Provider>

            {/* Theme */}
            <ThemeToggle />
        </div>
    );
}

/* ──────────────────────────────────────────────────────────
   HAMBURGER
────────────────────────────────────────────────────────── */
function HamburgerButton({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) {
    const sp = { type: "spring" as const, stiffness: 280, damping: 22 };
    return (
        <button
            onClick={onClick}
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isOpen ? "true" : "false"}
            className="lg:hidden p-2 focus-visible:outline-2 focus-visible:outline-[#CC0000] focus-visible:outline-offset-2"
        >
            <div className="flex flex-col gap-[5px] w-[22px]">
                <motion.div animate={isOpen ? { y: 7, rotate: 45 } : { y: 0, rotate: 0 }} transition={sp} className="h-[2px] w-full bg-gray-900" />
                <motion.div animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }} transition={sp} className="h-[2px] w-full bg-gray-900" />
                <motion.div animate={isOpen ? { y: -7, rotate: -45 } : { y: 0, rotate: 0 }} transition={sp} className="h-[2px] w-full bg-gray-900" />
            </div>
        </button>
    );
}

/* ──────────────────────────────────────────────────────────
   MOBILE DRAWER LINK
────────────────────────────────────────────────────────── */
function MobileLink({ href, label, Icon, count, groupColor, isActive, index, onClose }: {
    href: string; label: string; Icon: React.ElementType; count: string | null;
    groupColor: string; isActive: boolean; index: number; onClose: () => void;
}) {
    return (
        <motion.div
            initial={{ x: -18, opacity: 0 }}
            animate={{ x: 0, opacity: 1, transition: { delay: index * 0.04, type: "spring", stiffness: 320, damping: 26 } }}
        >
            <Dialog.Close asChild>
                <Link href={href} onClick={onClose}
                    className={cn(
                        "group relative flex items-center gap-3 px-5 py-3.5 border-b border-white/[0.06] transition-colors duration-100 overflow-hidden",
                        isActive ? "bg-white/10" : "hover:bg-white/[0.07]"
                    )}
                >
                    {/* Left accent bar */}
                    <motion.div
                        className="absolute left-0 top-0 bottom-0 w-[3px]"
                        style={{ backgroundColor: groupColor }}
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: isActive ? 1 : 0 }}
                        transition={{ duration: 0.18 }}
                    />

                    {/* Cursor */}
                    <span className="w-3 shrink-0">
                        {isActive
                            ? <GBCursor color={groupColor} />
                            : <span className="font-pixel text-[8px] text-white/0 group-hover:text-white/40 transition-colors">▶</span>
                        }
                    </span>

                    <Icon size={14} className="shrink-0" style={{ color: isActive ? groupColor : "rgba(255,255,255,0.45)" }} />

                    <span className="font-pixel text-[9px] uppercase tracking-wider flex-1 transition-colors"
                        style={{ color: isActive ? groupColor : "rgba(255,255,255,0.8)" }}>
                        {label}
                    </span>

                    {count && (
                        <span className="font-pixel text-[7px] text-white/30 tabular-nums">{count}</span>
                    )}

                    <ChevronRight size={11} className="text-white/20 group-hover:text-white/40 transition-colors" />
                </Link>
            </Dialog.Close>
        </motion.div>
    );
}

/* ──────────────────────────────────────────────────────────
   MOBILE DRAWER GROUP HEADER
────────────────────────────────────────────────────────── */
function DrawerGroupHeader({ label, color }: { label: string; color: string }) {
    return (
        <div className="flex items-center gap-2 px-5 pt-4 pb-1.5 border-b border-white/10">
            <div className="w-2 h-2 shrink-0" style={{ backgroundColor: color }} />
            <span className="font-pixel text-[7px] uppercase tracking-[0.15em]"
                style={{ color: `${color}99` }}>
                {label}
            </span>
        </div>
    );
}

/* ──────────────────────────────────────────────────────────
   MAIN NAVBAR
────────────────────────────────────────────────────────── */
export function Navbar() {
    const pathname = usePathname();
    const { scrollY } = useScroll();
    const prefersReduced = useReducedMotion();
    const favCount = useFavoritesStore((s) => s.favorites.length);
    const compareCount = useCompareStore((s) => s.pokemonIds.length);
    const { pokedexFilters, itemsPocket } = useFilterStore();

    const [scrollState, setScrollState] = useState<"top" | "hidden" | "visible">("top");
    const [lastY, setLastY] = useState(0);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [hoveredGroup, setHoveredGroup] = useState<string | null>(null);
    const [searchOpen, setSearchOpen] = useState(false);

    const isScrolled = scrollState !== "top";

    useMotionValueEvent(scrollY, "change", (cur) => {
        if (cur < 20) setScrollState("top");
        else if (cur > lastY + 5) setScrollState("hidden");
        else if (cur < lastY - 5) setScrollState("visible");
        setLastY(cur);
    });

    useEffect(() => {
        setMobileOpen(false);
        if (typeof window !== "undefined" && "scrollRestoration" in window.history)
            window.history.scrollRestoration = "manual";
        const reset = () => { window.scrollTo(0, 0); document.documentElement.scrollTo(0, 0); };
        reset();
        const t = setTimeout(reset, 10);
        return () => clearTimeout(t);
    }, [pathname]);

    const handleKey = useCallback((e: KeyboardEvent) => {
        if ((e.ctrlKey || e.metaKey) && e.key === "k") { e.preventDefault(); setSearchOpen(true); }
        if (e.key === "Escape") setSearchOpen(false);
    }, []);
    useEffect(() => { document.addEventListener("keydown", handleKey); return () => document.removeEventListener("keydown", handleKey); }, [handleKey]);

    const isActive = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);

    // Build the actual href (reuse filter state for /pokemon, /items)
    const resolveHref = (href: string) =>
        href === "/pokemon" && pokedexFilters ? `/pokemon?${pokedexFilters}` :
            href === "/items" && itemsPocket ? `/items?pocket=${itemsPocket}` :
                href;

    const navH = isScrolled ? "58px" : "70px";

    return (
        <LayoutGroup>
            {/* ════════════════════ NAVBAR ════════════════════ */}
            <motion.header
                variants={navVariants}
                animate={scrollState === "hidden" ? "hidden" : "visible"}
                className="fixed top-0 left-0 right-0 z-50 bg-white"
                style={isScrolled
                    ? { borderBottom: "2px solid #111111", boxShadow: "0 2px 0 0 #CC0000", backgroundColor: "rgba(255,255,255,0.95)" }
                    : { backgroundColor: "#ffffff" }
                }
            >
                {/* Scanline sweep animation */}
                {!prefersReduced && (
                    <motion.div
                        aria-hidden="true"
                        className="absolute inset-y-0 w-[80px] pointer-events-none z-0 bg-[linear-gradient(90deg,transparent,rgba(204,0,0,0.09),transparent)]"
                        animate={{ x: ["-80px", "calc(100vw + 80px)"] }}
                        transition={{ duration: 9, repeat: Infinity, ease: "linear", repeatDelay: 5 }}
                    />
                )}

                {/* Pixel top border (GameBoy top bezel) */}
                <div
                    className="h-[3px] w-full"
                    style={{
                        background: "repeating-linear-gradient(90deg, #CC0000 0px, #CC0000 4px, transparent 4px, transparent 8px)",
                    }}
                />

                <div
                    className="relative z-10 max-w-[1340px] mx-auto px-4 sm:px-6 flex items-center justify-between transition-all duration-300"
                    style={{ height: navH }}
                >
                    {/* Logo */}
                    <NavLogo />

                    {/* Desktop nav — group triggers */}
                    <nav
                        className="hidden lg:flex items-center gap-0"
                        onMouseLeave={() => setHoveredGroup(null)}
                    >
                        {NAV_GROUPS.map((group) => (
                            <div
                                key={group.id}
                                onMouseEnter={() => setHoveredGroup(group.id)}
                            >
                                <GroupTrigger
                                    group={group}
                                    isActive={isActive}
                                    isDimmed={hoveredGroup !== null && hoveredGroup !== group.id}
                                />
                            </div>
                        ))}
                    </nav>

                    {/* Right actions + hamburger */}
                    <div className="flex items-center gap-0.5">
                        <NavActions
                            onSearchOpen={() => setSearchOpen(true)}
                            favCount={favCount}
                            compareCount={compareCount}
                        />
                        <div className="lg:hidden ml-1">
                            <HamburgerButton isOpen={mobileOpen} onClick={() => setMobileOpen((v) => !v)} />
                        </div>
                    </div>
                </div>
            </motion.header>

            {/* Spacer */}
            <div style={{ height: `calc(${navH} + 3px)` }} className="transition-all duration-300" />

            {/* ════════════════════ MOBILE DRAWER — GameBoy screen ════════════════════ */}
            <Dialog.Root open={mobileOpen} onOpenChange={setMobileOpen}>
                <AnimatePresence>
                    {mobileOpen && (
                        <Dialog.Portal forceMount>
                            {/* Backdrop */}
                            <Dialog.Overlay className="fixed inset-0 z-40 lg:hidden">
                                <motion.div
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute inset-0 bg-black/70 backdrop-blur-[6px]"
                                />
                            </Dialog.Overlay>

                            {/* Drawer panel */}
                            <Dialog.Content
                                className="fixed left-0 top-0 bottom-0 z-50 lg:hidden focus:outline-none w-[min(82vw,320px)]"
                            >
                                <motion.div
                                    variants={drawerVariants}
                                    initial="closed" animate="open" exit="closed"
                                    className="h-full flex flex-col overflow-hidden bg-[#0f0f0f] border-2 border-l-0 border-[#111111] shadow-[4px_0_0_0_#CC0000]"
                                >
                                    {/* CRT scanlines overlay */}
                                    <div
                                        className="absolute inset-0 pointer-events-none z-10 opacity-[0.04]"
                                        style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 4px)" }}
                                    />

                                    {/* Top pixel stripe */}
                                    <div
                                        className="h-[4px] w-full shrink-0"
                                        style={{ background: "repeating-linear-gradient(90deg, #CC0000 0px, #CC0000 4px, transparent 4px, transparent 8px)" }}
                                    />

                                    {/* Drawer header */}
                                    <div className="flex items-center justify-between px-4 py-3.5 border-b border-white/10 shrink-0">
                                        <div className="flex items-center gap-2.5">
                                            {/* GameBoy LED */}
                                            <motion.div
                                                className="w-2.5 h-2.5 rounded-full bg-[#CC0000]"
                                                animate={{ opacity: [1, 0.3, 1] }}
                                                transition={{ duration: 1.4, repeat: Infinity }}
                                            />
                                            <PokeBallSVG className="w-6 h-6" centerColor="white" />
                                            <span className="font-pixel text-[10px] text-white tracking-tight">PokéDex</span>
                                        </div>
                                        <Dialog.Close asChild>
                                            <button
                                                className="p-1.5 border border-white/20 hover:border-white/50 transition-colors focus-visible:outline-2 focus-visible:outline-[#CC0000] rounded-none"
                                                aria-label="Cerrar menú"
                                            >
                                                <X className="h-3.5 w-3.5 text-white/60" />
                                            </button>
                                        </Dialog.Close>
                                    </div>

                                    {/* Screen power label */}
                                    <div className="px-5 pt-3 pb-1 shrink-0">
                                        <span className="font-pixel text-[7px] text-white/25 uppercase tracking-[0.2em]">
                                            — SELECT MENU —
                                        </span>
                                    </div>

                                    {/* Links by group */}
                                    <Dialog.Title className="sr-only">Navegación</Dialog.Title>
                                    <nav className="flex-1 overflow-y-auto">
                                        {NAV_GROUPS.map((group, gi) => (
                                            <div key={group.id}>
                                                <DrawerGroupHeader label={group.label} color={group.color} />
                                                {group.links.map((link, li) => {
                                                    const Icon = link.icon;
                                                    return (
                                                        <MobileLink
                                                            key={link.href}
                                                            href={resolveHref(link.href)}
                                                            label={link.label}
                                                            Icon={Icon}
                                                            count={"count" in link ? link.count : null}
                                                            groupColor={group.color}
                                                            isActive={isActive(link.href)}
                                                            index={gi * 5 + li}
                                                            onClose={() => setMobileOpen(false)}
                                                        />
                                                    );
                                                })}
                                            </div>
                                        ))}
                                    </nav>

                                    {/* Bottom actions bar */}
                                    <div className="border-t border-white/10 px-4 py-3 shrink-0 space-y-2">
                                        {/* Search button */}
                                        <button
                                            onClick={() => { setSearchOpen(true); setMobileOpen(false); }}
                                            className="w-full flex items-center gap-3 py-2.5 px-3 border border-white/15 hover:border-[#CC0000]/60 transition-colors rounded-none"
                                        >
                                            <Search className="h-3.5 w-3.5 text-white/40" />
                                            <span className="font-pixel text-[8px] text-white/60 uppercase tracking-wider flex-1 text-left">Buscar</span>
                                            <kbd className="font-pixel text-[7px] text-white/25 border border-white/15 px-1.5 py-0.5">⌘K</kbd>
                                        </button>
                                    </div>

                                    {/* Footer — speaker dots */}
                                    <div className="flex items-center justify-between px-4 py-3 border-t border-white/[0.06] shrink-0">
                                        <div className="flex gap-1.5">
                                            {[0, 1, 2, 3, 4, 5].map((i) => (
                                                <div key={i} className="w-[4px] h-[4px] rounded-full bg-white/15" />
                                            ))}
                                        </div>
                                        <span className="font-pixel text-[7px] text-white/20">
                                            <a href="https://pokeapi.co" target="_blank" rel="noopener noreferrer"
                                                className="hover:text-white/40 transition-colors">PokéAPI</a>
                                        </span>
                                    </div>
                                </motion.div>
                            </Dialog.Content>
                        </Dialog.Portal>
                    )}
                </AnimatePresence>
            </Dialog.Root>

            {/* Global search */}
            <SearchCommand open={searchOpen} onClose={() => setSearchOpen(false)} />
        </LayoutGroup>
    );
}