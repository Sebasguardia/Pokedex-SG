"use client";

import {
    motion,
    AnimatePresence,
    useScroll,
    useMotionValueEvent,
    useReducedMotion,
    LayoutGroup,
} from "framer-motion";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import * as Dialog from "@radix-ui/react-dialog";
import * as Tooltip from "@radix-ui/react-tooltip";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
    Search, Heart, Scale, Sun, Moon, ChevronRight, X,
    Gamepad2, Dna, Swords, Zap, Backpack, Cherry,
} from "lucide-react";
import { useFavoritesStore } from "@/lib/store/favorites.store";
import { useCompareStore } from "@/lib/store/compare.store";
import { useTheme } from "next-themes";
import {
    useState, useEffect, useCallback, useRef, memo, type ReactNode,
} from "react";
import { useFilterStore } from "@/lib/store/filter.store";
import { SearchCommand } from "@/components/shared/search-command";
import { cn } from "@/lib/utils/cn";

/* ──────────────────────────────────────────────────────────
   CONSTANTS
────────────────────────────────────────────────────────── */
const NAV_LINKS = [
    { href: "/pokemon", label: "Pokédex", icon: <Gamepad2 size={18} />, count: "1025", description: "1025 Pokémon" },
    { href: "/types", label: "Tipos", icon: <Dna size={18} />, count: "18", description: "18 tipos" },
    { href: "/moves", label: "Movimientos", icon: <Swords size={18} />, count: "900+", description: "900+ moves" },
    { href: "/abilities", label: "Habilidades", icon: <Zap size={18} />, count: "300+", description: "Habilidades" },
    { href: "/items", label: "Objetos", icon: <Backpack size={18} />, count: "800+", description: "Items" },
    { href: "/berries", label: "Bayas", icon: <Cherry size={18} />, count: "64", description: "64 bayas" },
    { href: "/compare", label: "Comparador", icon: <Scale size={18} />, count: null, description: "Compara Pokémon" },
] as const;

/* ──────────────────────────────────────────────────────────
   FRAMER VARIANTS
────────────────────────────────────────────────────────── */
const navbarVariants = {
    visible: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 400, damping: 40 } },
    hidden: { y: -100, opacity: 0, transition: { type: "spring" as const, stiffness: 400, damping: 40 } },
};

const overlayVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1, transition: { duration: 0.2 } },
};

const drawerVariants = {
    closed: { x: "-100%", transition: { type: "spring" as const, stiffness: 300, damping: 30, mass: 0.8 } },
    open: { x: "0%", transition: { type: "spring" as const, stiffness: 300, damping: 30, mass: 0.8 } },
};

/* ──────────────────────────────────────────────────────────
   POKÉBALL SVG
────────────────────────────────────────────────────────── */
const PokeBallSVG = memo(function PokeBallSVG({ className, centerColor = "white" }: { className?: string; centerColor?: string }) {
    return (
        <svg viewBox="0 0 28 28" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            {/* Top red half */}
            <path d="M 2 14 A 12 12 0 0 1 26 14 Z" fill="#CC0000" />
            {/* Bottom white half */}
            <path d="M 2 14 A 12 12 0 0 0 26 14 Z" fill="#FFFFFF" />
            {/* Outer circle */}
            <circle cx="14" cy="14" r="12" fill="none" stroke="#111111" strokeWidth="2" />
            {/* Horizontal line */}
            <line x1="2" y1="14" x2="26" y2="14" stroke="#111111" strokeWidth="2" />
            {/* Central button ring */}
            <circle cx="14" cy="14" r="4" fill="#FFFFFF" stroke="#111111" strokeWidth="2" />
            {/* Central button fill */}
            <circle cx="14" cy="14" r="2" fill={centerColor} />
        </svg>
    );
});

/* ──────────────────────────────────────────────────────────
   NAV LOGO
────────────────────────────────────────────────────────── */
const NavLogo = memo(function NavLogo() {
    const [isHovered, setIsHovered] = useState(false);
    const [centerColor, setCenterColor] = useState("white");

    return (
        <Link href="/" aria-label="PokéDex Home">
            <motion.div
                className="flex items-center gap-2.5 relative shrink-0 cursor-pointer"
                onHoverStart={() => { setIsHovered(true); setCenterColor("#CC0000"); }}
                onHoverEnd={() => { setIsHovered(false); setCenterColor("white"); }}
                whileTap={{ scale: 0.88 }}
            >
                {/* Pokéball */}
                <motion.div
                    initial={{ rotate: 0, scale: 0.5 }}
                    animate={{ rotate: 360, scale: 1 }}
                    transition={{ rotate: { duration: 0.6, ease: "backOut" }, scale: { type: "spring", stiffness: 200, damping: 12 } }}
                    // On hover: wiggle
                    whileHover={{ rotate: [0, -20, 20, -10, 10, 0] as unknown as number }}
                >
                    <PokeBallSVG className="w-7 h-7 drop-shadow-sm" centerColor={centerColor} />
                </motion.div>

                {/* Text */}
                <div className="relative hidden sm:block overflow-hidden">
                    <span className="font-pixel text-[13px] leading-none tracking-tight">
                        <span className="text-gray-900">Poké</span>
                        <motion.span
                            className="text-poke-red"
                            animate={isHovered ? { scale: 1.06, filter: "brightness(1.2)" } : { scale: 1, filter: "brightness(1)" }}
                            transition={{ duration: 0.2 }}
                        >
                            Dex
                        </motion.span>
                    </span>

                    {/* Scanline under text on hover */}
                    <motion.div
                        className="absolute bottom-0 left-0 h-[1px] w-full bg-poke-red"
                        initial={{ scaleX: 0, originX: "left" }}
                        animate={isHovered
                            ? { scaleX: 1, transition: { duration: 0.3 } }
                            : { scaleX: 0, transformOrigin: "right", transition: { duration: 0.2 } }
                        }
                    />
                </div>
            </motion.div>
        </Link>
    );
});

/* ──────────────────────────────────────────────────────────
   NAV LINK ITEM (desktop)
────────────────────────────────────────────────────────── */
interface NavLinkItemProps {
    href: string;
    label: string;
    count: string | null;
    description: string;
    isActive: boolean;
    isDimmed: boolean;
    onHover: () => void;
}

function NavLinkItem({ href, label, count, description, isActive, isDimmed, onHover }: NavLinkItemProps) {
    const prefersReducedMotion = useReducedMotion();
    const [isHovered, setIsHovered] = useState(false);
    const [ripple, setRipple] = useState<{ x: number; y: number; id: number } | null>(null);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const id = Date.now();
        setRipple({ x: e.clientX - rect.left, y: e.clientY - rect.top, id });
        setTimeout(() => setRipple(null), 500);
    };

    return (
        <Tooltip.Provider delayDuration={600}>
            <Tooltip.Root>
                <Tooltip.Trigger asChild>
                    <motion.div
                        className="relative"
                        animate={{ opacity: isDimmed && !prefersReducedMotion ? 0.4 : 1 }}
                        transition={{ duration: 0.15 }}
                        onHoverStart={() => { setIsHovered(true); onHover(); }}
                        onHoverEnd={() => setIsHovered(false)}
                        whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                    >
                        <Link
                            href={href}
                            onClick={handleClick}
                            className={cn(
                                "relative inline-block px-3 py-2 font-nunito text-[13px] font-bold uppercase tracking-[0.05em] transition-colors duration-150 overflow-hidden focus-visible:outline-2 focus-visible:outline-poke-red focus-visible:outline-offset-2 rounded",
                                isActive ? "text-poke-red font-black" : "text-gray-900 hover:text-poke-red"
                            )}
                        >
                            {label}

                            {/* Underline on hover (non-active) */}
                            {!isActive && (
                                <motion.div
                                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-poke-red"
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: isHovered ? 1 : 0 }}
                                    style={{ transformOrigin: isHovered ? "left" : "right" }}
                                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                                />
                            )}

                            {/* Ripple effect */}
                            <AnimatePresence>
                                {ripple && !prefersReducedMotion && (
                                    <motion.span
                                        key={ripple.id}
                                        className="absolute rounded-full bg-poke-red/20 pointer-events-none"
                                        style={{ left: ripple.x - 12, top: ripple.y - 12, width: 24, height: 24 }}
                                        initial={{ scale: 0, opacity: 0.4 }}
                                        animate={{ scale: 3, opacity: 0 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.4 }}
                                    />
                                )}
                            </AnimatePresence>
                        </Link>

                        {/* Travelling active dot */}
                        {isActive && (
                            <motion.div
                                layoutId="active-dot"
                                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[5px] h-[5px] rounded-full bg-poke-red"
                                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                            />
                        )}

                        {/* Count hint */}
                        {count && (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="absolute -top-1 -right-1 text-[9px] text-gray-300 font-nunito leading-none hidden xl:block"
                            >
                                {count}
                            </motion.span>
                        )}
                    </motion.div>
                </Tooltip.Trigger>

                <Tooltip.Portal>
                    <Tooltip.Content
                        side="bottom"
                        sideOffset={10}
                        className="bg-gray-900 text-white text-[11px] font-nunito px-2.5 py-1.5 border border-poke-red z-[100] pointer-events-none animate-in fade-in-0 zoom-in-95"
                        style={{ borderRadius: 0 }}
                    >
                        {description}
                        <Tooltip.Arrow className="fill-gray-900" />
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip.Root>
        </Tooltip.Provider>
    );
}

/* ──────────────────────────────────────────────────────────
   HAMBURGER BUTTON
────────────────────────────────────────────────────────── */
function HamburgerButton({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) {
    const spring = { type: "spring" as const, stiffness: 260, damping: 20 };
    return (
        <button
            onClick={onClick}
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isOpen}
            className="lg:hidden p-2 focus-visible:outline-2 focus-visible:outline-poke-red focus-visible:outline-offset-2 rounded"
        >
            <div className="flex flex-col gap-[6px] w-[22px]">
                <motion.div animate={isOpen ? { y: 8, rotate: 45 } : { y: 0, rotate: 0 }} transition={spring} className="h-[2px] w-full bg-gray-900 rounded-[1px]" />
                <motion.div animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }} transition={spring} className="h-[2px] w-full bg-gray-900 rounded-[1px]" />
                <motion.div animate={isOpen ? { y: -8, rotate: -45 } : { y: 0, rotate: 0 }} transition={spring} className="h-[2px] w-full bg-gray-900 rounded-[1px]" />
            </div>
        </button>
    );
}

/* ──────────────────────────────────────────────────────────
   THEME TOGGLE
────────────────────────────────────────────────────────── */
function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const isDark = theme === "dark";

    return (
        <motion.button
            aria-label="Cambiar tema"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="w-9 h-9 flex items-center justify-center border border-gray-200 bg-gray-50 hover:border-gray-900 transition-colors focus-visible:outline-2 focus-visible:outline-poke-red focus-visible:outline-offset-2 rounded"
        >
            <AnimatePresence mode="wait" initial={false}>
                {isDark ? (
                    <motion.div key="moon" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.25 }}>
                        <Moon className="h-4 w-4 text-gray-700" />
                    </motion.div>
                ) : (
                    <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.25 }}
                        whileHover={{ rotate: 180, transition: { duration: 0.5, ease: "linear" } }}>
                        <Sun className="h-4 w-4 text-gray-700" />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
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
        <div className="flex items-center gap-1 shrink-0">

            {/* ── Search ── */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setKbdShake(true)}
                onHoverEnd={() => setKbdShake(false)}
                onClick={onSearchOpen}
                aria-label="Buscar (⌘K)"
                className="flex items-center gap-2 px-2.5 py-2 hover:bg-gray-100 transition-colors rounded focus-visible:outline-2 focus-visible:outline-poke-red focus-visible:outline-offset-2"
            >
                <Search className="h-[18px] w-[18px] text-gray-700" />
                <motion.kbd
                    animate={kbdShake ? { x: [-1, 1, -1, 1, 0] } : { x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="hidden sm:inline text-[9px] bg-gray-100 border border-gray-300 px-1.5 py-0.5 font-mono text-gray-400 rounded-sm"
                >
                    ⌘K
                </motion.kbd>
            </motion.button>

            {/* ── Favorites ── */}
            <Link href="/favorites" aria-label={`Favoritos: ${favCount}`} className="relative p-2.5 hover:bg-red-50 transition-colors rounded focus-visible:outline-2 focus-visible:outline-poke-red focus-visible:outline-offset-2 group">
                <motion.div
                    whileHover={{ rotate: [-15, 15, -8, 8, 0] as unknown as number }}
                    transition={{ duration: 0.4 }}
                >
                    <Heart
                        className={cn("h-[18px] w-[18px] transition-all duration-200", favCount > 0 ? "fill-poke-red text-poke-red" : "text-gray-500")}
                    />
                </motion.div>
                <AnimatePresence>
                    {favCount > 0 && (
                        <motion.span
                            key={favCount}
                            initial={{ scale: 0 }}
                            animate={{ scale: [1.3, 1], transition: { type: "spring", stiffness: 600, damping: 15 } }}
                            exit={{ scale: 0, transition: { duration: 0.15 } }}
                            className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] rounded-full bg-poke-red text-white text-[8px] font-pixel border-2 border-white flex items-center justify-center px-0.5"
                        >
                            {favCount > 9 ? "9+" : favCount}
                        </motion.span>
                    )}
                </AnimatePresence>
            </Link>

            {/* ── Compare ── */}
            <Link href="/compare" aria-label={`Comparador: ${compareCount}`} className="relative p-2.5 hover:bg-gray-100 transition-colors rounded focus-visible:outline-2 focus-visible:outline-poke-red focus-visible:outline-offset-2 group">
                <motion.div whileHover={{ rotate: [0, -8, 8, -5, 5, 0] as unknown as number }} transition={{ duration: 0.6 }}>
                    <Scale className="h-[18px] w-[18px] text-gray-500" />
                </motion.div>
                <AnimatePresence>
                    {compareCount > 0 && (
                        <motion.span
                            key={compareCount}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1, transition: { type: "spring", stiffness: 500, damping: 15 } }}
                            exit={{ scale: 0, transition: { duration: 0.15 } }}
                            className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] rounded-full bg-gray-900 text-white text-[8px] font-pixel border-2 border-white flex items-center justify-center px-0.5"
                        >
                            {compareCount}
                        </motion.span>
                    )}
                </AnimatePresence>
            </Link>

            {/* ── Theme toggle ── */}
            <ThemeToggle />
        </div>
    );
}

/* ──────────────────────────────────────────────────────────
   MOBILE DRAWER LINK
────────────────────────────────────────────────────────── */
function MobileLink({ href, label, icon, count, isActive, index, onClose }: {
    href: string; label: string; icon: ReactNode; count: string | null;
    isActive: boolean; index: number; onClose: () => void;
}) {
    return (
        <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1, transition: { delay: index * 0.05, type: "spring", stiffness: 300, damping: 25 } }}
        >
            <Dialog.Close asChild>
                <Link href={href} onClick={onClose}
                    className={cn(
                        "flex items-center gap-3 px-5 py-4 border-b border-gray-100 group transition-all duration-150 relative",
                        isActive
                            ? "border-l-4 border-l-poke-red bg-red-50 text-poke-red pl-4"
                            : "hover:bg-gray-50 hover:border-l-4 hover:border-l-poke-red hover:pl-4"
                    )}
                >
                    {/* Pulsing dot for active */}
                    {isActive && (
                        <motion.span
                            animate={{ scale: [1, 1.4, 1] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="absolute right-5 w-2 h-2 rounded-full bg-poke-red"
                        />
                    )}
                    <span className={cn("shrink-0 transition-colors", isActive ? "text-poke-red" : "text-gray-400 group-hover:text-poke-red")}>
                        {icon}
                    </span>
                    <span className="flex-1 font-nunito text-[13px] font-bold uppercase tracking-wider">{label}</span>
                    {count && <span className="text-[10px] text-gray-400 font-nunito">{count}</span>}
                    <ChevronRight className="h-3.5 w-3.5 text-gray-300 group-hover:translate-x-1 transition-transform" />
                </Link>
            </Dialog.Close>
        </motion.div>
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
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);
    const [searchOpen, setSearchOpen] = useState(false);

    const isScrolled = scrollState !== "top";

    /* ── Scroll state tracking ── */
    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest < 20) { setScrollState("top"); }
        else if (latest > lastScrollY + 5) { setScrollState("hidden"); }
        else if (latest < lastScrollY - 5) { setScrollState("visible"); }
        setLastScrollY(latest);
    });

    /* ── Aggressive Scroll Reset on Route Change ── */
    useEffect(() => {
        setMobileOpen(false);

        // Disable automatic scroll restoration to avoid Next.js/Browser clashing
        if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }

        const reset = () => {
            window.scrollTo(0, 0);
            document.documentElement.scrollTo(0, 0);
            document.body.scrollTo(0, 0);
        };

        // Reset immediately
        reset();

        // And again after a small delay to ensure Next.js is done
        const timeoutId = setTimeout(reset, 10);
        return () => clearTimeout(timeoutId);
    }, [pathname]);

    /* ── Global keyboard ── */
    const handleKey = useCallback((e: KeyboardEvent) => {
        if ((e.ctrlKey || e.metaKey) && e.key === "k") { e.preventDefault(); setSearchOpen(true); }
        if (e.key === "Escape") { setSearchOpen(false); }
    }, []);
    useEffect(() => {
        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [handleKey]);

    const isActive = (href: string) =>
        href === "/" ? pathname === "/" : pathname.startsWith(href);

    /* ── Scrolled visual styles ── */
    const scrolledStyle = isScrolled
        ? { boxShadow: "0 2px 0 0 #CC0000", borderBottom: "2px solid #111111" }
        : {};

    return (
        <LayoutGroup>
            {/* ═══════════════════════════════ NAVBAR ═══════════════════════════════ */}
            <motion.header
                variants={navbarVariants}
                animate={scrollState === "hidden" ? "hidden" : "visible"}
                className="fixed top-0 left-0 right-0 z-50 bg-white"
                style={{
                    ...scrolledStyle,
                    backdropFilter: isScrolled ? "blur(12px) saturate(180%)" : "none",
                    backgroundColor: isScrolled ? "rgba(255,255,255,0.93)" : "#ffffff",
                }}
            >
                {/* ── Scanline effect ── */}
                {!prefersReduced && (
                    <motion.div
                        aria-hidden="true"
                        className="absolute inset-y-0 w-[70px] pointer-events-none z-0"
                        style={{ background: "linear-gradient(90deg, transparent, rgba(204,0,0,0.11), transparent)" }}
                        animate={{ x: ["-70px", "calc(100vw + 70px)"] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear", repeatDelay: 4 }}
                    />
                )}

                <div
                    className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 flex items-center justify-between transition-all duration-300"
                    style={{ height: isScrolled ? "60px" : "72px" }}
                >
                    {/* Logo */}
                    <NavLogo />

                    {/* Desktop nav */}
                    <NavigationMenuPrimitive.Root className="hidden lg:block">
                        <NavigationMenuPrimitive.List
                            className="flex items-center gap-0.5"
                            onMouseLeave={() => setHoveredLink(null)}
                        >
                            {NAV_LINKS.map((link) => {
                                const href =
                                    link.href === "/pokemon" && pokedexFilters
                                        ? `/pokemon?${pokedexFilters}`
                                        : link.href === "/items" && itemsPocket
                                            ? `/items?pocket=${itemsPocket}`
                                            : link.href;
                                return (
                                    <NavigationMenuPrimitive.Item key={link.href}>
                                        <NavLinkItem
                                            href={href}
                                            label={link.label}
                                            count={link.count}
                                            description={link.description}
                                            isActive={isActive(link.href)}
                                            isDimmed={hoveredLink !== null && hoveredLink !== link.href}
                                            onHover={() => setHoveredLink(link.href)}
                                        />
                                    </NavigationMenuPrimitive.Item>
                                );
                            })}
                        </NavigationMenuPrimitive.List>
                    </NavigationMenuPrimitive.Root>

                    {/* Actions + hamburger */}
                    <div className="flex items-center gap-1">
                        <NavActions onSearchOpen={() => setSearchOpen(true)} favCount={favCount} compareCount={compareCount} />
                        <HamburgerButton isOpen={mobileOpen} onClick={() => setMobileOpen((v) => !v)} />
                    </div>
                </div>
            </motion.header>

            {/* Spacer */}
            <div style={{ height: isScrolled ? "60px" : "72px" }} className="transition-all duration-300" />

            {/* ═══════════════════════════════ MOBILE DRAWER ═════════════════════════ */}
            <Dialog.Root open={mobileOpen} onOpenChange={setMobileOpen}>
                <AnimatePresence>
                    {mobileOpen && (
                        <Dialog.Portal forceMount>
                            {/* Backdrop */}
                            <Dialog.Overlay className="fixed inset-0 z-40 lg:hidden">
                                <motion.div
                                    variants={overlayVariants}
                                    initial="closed"
                                    animate="open"
                                    exit="closed"
                                    className="absolute inset-0 bg-black/60"
                                    style={{ backdropFilter: "blur(4px)" }}
                                />
                            </Dialog.Overlay>

                            {/* Panel */}
                            <Dialog.Content className="fixed left-0 top-0 bottom-0 z-50 lg:hidden focus:outline-none" style={{ width: "min(80vw, 320px)" }}>
                                <motion.div
                                    variants={drawerVariants}
                                    initial="closed"
                                    animate="open"
                                    exit="closed"
                                    className="h-full bg-white border-r-2 border-gray-900 flex flex-col"
                                >
                                    {/* Red top accent */}
                                    <div className="h-[4px] bg-poke-red w-full shrink-0" />

                                    {/* Drawer header */}
                                    <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 shrink-0">
                                        <NavLogo />
                                        <Dialog.Close asChild>
                                            <button className="p-2 hover:bg-gray-100 transition-colors rounded focus-visible:outline-2 focus-visible:outline-poke-red" aria-label="Cerrar menú">
                                                <X className="h-4 w-4 text-gray-500" />
                                            </button>
                                        </Dialog.Close>
                                    </div>

                                    {/* Links */}
                                    <Dialog.Title className="sr-only">Navegación</Dialog.Title>
                                    <nav className="flex-1 overflow-y-auto py-1">
                                        {NAV_LINKS.map((link, i) => {
                                            const href =
                                                link.href === "/pokemon" && pokedexFilters
                                                    ? `/pokemon?${pokedexFilters}`
                                                    : link.href === "/items" && itemsPocket
                                                        ? `/items?pocket=${itemsPocket}`
                                                        : link.href;
                                            return (
                                                <MobileLink
                                                    key={link.href}
                                                    href={href}
                                                    label={link.label}
                                                    icon={link.icon}
                                                    count={link.count}
                                                    isActive={isActive(link.href)}
                                                    index={i}
                                                    onClose={() => setMobileOpen(false)}
                                                />
                                            );
                                        })}
                                    </nav>

                                    {/* Bottom actions */}
                                    <div className="border-t-2 border-gray-900 px-5 py-4 shrink-0 space-y-3">
                                        {/* Favorites row */}
                                        <Dialog.Close asChild>
                                            <Link href="/favorites"
                                                className="flex items-center gap-3 py-2 text-sm font-nunito font-bold text-gray-700 hover:text-poke-red transition-colors">
                                                <Heart className={cn("h-4 w-4", favCount > 0 ? "fill-poke-red text-poke-red" : "text-gray-400")} />
                                                <span className="flex-1 uppercase tracking-wider">Favoritos</span>
                                                {favCount > 0 && <span className="text-xs bg-poke-red text-white rounded-full px-2 py-0.5 font-pixel">{favCount}</span>}
                                            </Link>
                                        </Dialog.Close>
                                        {/* Search row */}
                                        <button
                                            onClick={() => { setSearchOpen(true); setMobileOpen(false); }}
                                            className="w-full flex items-center gap-3 py-2 text-sm font-nunito font-bold text-gray-700 hover:text-poke-red transition-colors"
                                        >
                                            <Search className="h-4 w-4 text-gray-400" />
                                            <span className="uppercase tracking-wider">Buscar</span>
                                        </button>
                                    </div>

                                    {/* Drawer footer */}
                                    <div className="px-5 py-3 border-t border-gray-100 shrink-0">
                                        <p className="font-nunito text-[11px] text-gray-400 text-center">
                                            Datos por{" "}
                                            <a href="https://pokeapi.co" target="_blank" rel="noreferrer" className="text-poke-red hover:underline">PokéAPI</a>
                                        </p>
                                    </div>
                                </motion.div>
                            </Dialog.Content>
                        </Dialog.Portal>
                    )}
                </AnimatePresence>
            </Dialog.Root>

            {/* Global search command */}
            <SearchCommand open={searchOpen} onClose={() => setSearchOpen(false)} />
        </LayoutGroup>
    );
}
