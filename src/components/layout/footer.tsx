"use client"

import {
    motion, useScroll, useTransform, useReducedMotion,
    AnimatePresence
} from "framer-motion"
import * as Tooltip from "@radix-ui/react-tooltip"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
    ChevronRight, ExternalLink, Github, Heart,
    Sun, Moon, Search
} from "lucide-react"
import { useFavoritesStore } from "@/lib/store/favorites.store"
import { useCompareStore } from "@/lib/store/compare.store"
import { useUIStore } from "@/lib/store/ui.store"
import { useTheme } from "next-themes"
import { useFilterStore } from "@/lib/store/filter.store"
import { useRef } from "react"
import { PokeBallSVG } from "@/components/shared/pokeball-svg"
import { cn } from "@/lib/utils/cn"

// ─── CONSTANTES ───────────────────────────────────────────────────────────────

const NAV_LINKS = [
    { href: "/pokemon", label: "Pokédex" },
    { href: "/types", label: "Tipos" },
    { href: "/moves", label: "Movimientos" },
    { href: "/abilities", label: "Habilidades" },
    { href: "/items", label: "Objetos" },
    { href: "/berries", label: "Bayas" },
] as const

const TOOL_LINKS = [
    { href: "/compare", label: "Comparador", hasBadge: "compare" },
    { href: "/favorites", label: "Favoritos", hasBadge: "favorites" },
    { href: "/generations", label: "Generaciones", hasBadge: null },
    { href: null, label: "Buscador", hasBadge: null, isSearch: true },
] as const

// ─── VARIANTS ─────────────────────────────────────────────────────────────────

const columnVariants: any = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1, y: 0,
        transition: { delay: i * 0.14, type: "spring", stiffness: 160, damping: 22 }
    })
}

const linkVariants: any = {
    hidden: { opacity: 0, x: -12 },
    visible: (i: number) => ({
        opacity: 1, x: 0,
        transition: { delay: i * 0.07, type: "spring", stiffness: 280, damping: 28 }
    })
}

// ─── HEARTBEAT ────────────────────────────────────────────────────────────────
// Simula un latido real: 2 pulsos por ciclo
const heartbeatVariants: any = {
    beat: {
        scale: [1, 1.0, 1.35, 1.1, 1.35, 1.0, 1],
        color: ["#CC0000", "#FF4444", "#CC0000", "#FF4444", "#CC0000", "#CC0000", "#CC0000"],
        transition: { duration: 1.6, repeat: Infinity, repeatDelay: 0.8, ease: "easeInOut" }
    }
}

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────────────────

export function Footer() {
    const footerRef = useRef<HTMLElement>(null)
    const pathname = usePathname()
    const prefersRM = useReducedMotion()
    const favorites = useFavoritesStore()
    const compare = useCompareStore()
    const { openSearch } = useUIStore()
    const { theme, setTheme } = useTheme()

    // Parallax (solo si no hay reduced motion)
    const { scrollYProgress } = useScroll({ target: footerRef, offset: ["start end", "end end"] })
    const col1Y = useTransform(scrollYProgress, [0, 1], prefersRM ? [0, 0] : [20, 0])
    const col2Y = useTransform(scrollYProgress, [0, 1], prefersRM ? [0, 0] : [30, 0])
    const col3Y = useTransform(scrollYProgress, [0, 1], prefersRM ? [0, 0] : [40, 0])

    return (
        <footer ref={footerRef} className="relative overflow-hidden">

            {/* ── 1. OPENING STRIPE ─────────────────────────────────────────── */}
            <FooterOpeningStripe />

            {/* ── 2. FOOTER BODY ────────────────────────────────────────────── */}
            <motion.div
                className="relative bg-white"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.55, duration: 0.4, ease: "easeOut" }}
            >
                {/* Pokéball ambient background */}
                <AmbientPokeball />

                <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-16 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr] gap-10 lg:gap-14">

                        {/* Columna Brand */}
                        <motion.div
                            custom={0} variants={columnVariants}
                            initial="hidden" whileInView="visible"
                            viewport={{ once: true, margin: "-60px" }}
                            style={{ y: col1Y }}
                        >
                            <FooterBrand />
                        </motion.div>

                        {/* Columna Nav */}
                        <motion.div
                            custom={1} variants={columnVariants}
                            initial="hidden" whileInView="visible"
                            viewport={{ once: true, margin: "-60px" }}
                            style={{ y: col2Y }}
                        >
                            <FooterNavColumn pathname={pathname} />
                        </motion.div>

                        {/* Columna Tools */}
                        <motion.div
                            custom={2} variants={columnVariants}
                            initial="hidden" whileInView="visible"
                            viewport={{ once: true, margin: "-60px" }}
                            style={{ y: col3Y }}
                        >
                            <FooterToolsColumn
                                pathname={pathname}
                                favoritesCount={favorites.favorites.length}
                                compareCount={compare.pokemonIds.filter(Boolean).length}
                                onSearchClick={openSearch}
                            />
                        </motion.div>

                    </div>
                </div>
            </motion.div>

            {/* ── 3. INTERNAL DIVIDER ───────────────────────────────────────── */}
            <FooterInternalDivider />

            {/* ── 4. FOOTER BOTTOM ──────────────────────────────────────────── */}
            <FooterBottom theme={theme} setTheme={setTheme} />

        </footer>
    )
}

// ─── SUBCOMPONENTES ───────────────────────────────────────────────────────────

function FooterOpeningStripe() {
    return (
        <div className="overflow-hidden">
            {/* Línea negra — crece de izquierda a derecha */}
            <motion.div
                className="h-[3px] bg-[#111111] origin-left"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            />
            {/* Línea roja — crece de DERECHA a izquierda */}
            <motion.div
                className="h-[2px] bg-[#CC0000] origin-right"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            />
        </div>
    )
}

function AmbientPokeball() {
    const prefersRM = useReducedMotion()
    return (
        <motion.div
            className="absolute right-[-80px] bottom-[-80px] pointer-events-none z-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.03 }}
            viewport={{ once: true }}
            transition={{ duration: 2 }}
            whileHover={{ opacity: 0.05 }}
        >
            <motion.div
                animate={prefersRM ? {} : { rotate: 360 }}
                transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
            >
                <PokeBallSVG className="w-[400px] h-[400px] text-[#111111]" />
            </motion.div>
        </motion.div>
    )
}

// ─── FOOTER BRAND ─────────────────────────────────────────────────────────────
function FooterBrand() {
    return (
        <div>
            {/* Logo */}
            <div className="flex items-center gap-3 mb-5">
                <motion.div
                    initial={{ rotate: -180, scale: 0 }}
                    whileInView={{ rotate: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 120, damping: 14 }}
                >
                    <PokeBallSVG className="w-8 h-8" />
                </motion.div>
                <motion.span
                    className="font-pixel text-[15px]"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                >
                    <span className="text-[#111111]">POKÉ</span>
                    <span className="text-[#CC0000]">DEX</span>
                </motion.span>
            </div>

            {/* Tagline + descripción */}
            <p className="font-nunito text-[15px] text-[#444444] leading-[1.65] mb-2">
                Tu enciclopedia Pokémon completa.
            </p>
            <p className="font-nunito text-[13px] text-[#888888] leading-[1.7] mb-7">
                Datos abiertos y gratuitos proporcionados por PokéAPI,
                una API RESTful del universo Pokémon.
            </p>

            {/* Badge PokéAPI */}
            <motion.a
                href="https://pokeapi.co"
                target="_blank" rel="noreferrer"
                className={cn(
                    "inline-flex items-center gap-[10px] px-4 py-[10px]",
                    "bg-[#F2F2F2] border border-[#E0E0E0]",
                    "cursor-pointer no-underline"
                )}
                whileHover={{
                    backgroundColor: "#111111",
                    borderColor: "#111111",
                }}
                transition={{ duration: 0.18 }}
            >
                {/* Dot online con glow */}
                <span className="relative flex items-center justify-center w-[9px] h-[9px]">
                    <motion.span
                        className="absolute rounded-full bg-[#22C55E]"
                        style={{ width: 9, height: 9 }}
                        animate={{ scale: [1, 2.5, 1], opacity: [0.3, 0, 0.3] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.span
                        className="relative rounded-full bg-[#22C55E]"
                        style={{ width: 9, height: 9 }}
                        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                    />
                </span>
                <motion.span
                    className="font-nunito text-[12px] text-[#888888]"
                    whileHover={{ color: "#FFFFFF" }}
                    transition={{ duration: 0.18 }}
                >
                    Powered by PokéAPI
                </motion.span>
                <motion.span whileHover={{ color: "#CC0000", x: 2 }} transition={{ duration: 0.18 }}>
                    <ExternalLink size={12} className="text-[#AAAAAA]" />
                </motion.span>
            </motion.a>

            {/* Github link */}
            <motion.a
                href="#"
                className={cn(
                    "mt-5 inline-flex items-center gap-2 px-4 py-2 flex w-max",
                    "border border-[#E0E0E0] cursor-pointer no-underline"
                )}
                whileHover={{
                    backgroundColor: "#111111",
                    borderColor: "#111111",
                    boxShadow: "3px 3px 0 #CC0000",
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
            >
                <motion.span whileHover={{ color: "#FFFFFF" }} transition={{ duration: 0.15 }}>
                    <Github size={18} className="text-[#888888]" />
                </motion.span>
                <motion.span
                    className="font-nunito text-[12px] text-[#888888]"
                    whileHover={{ color: "#FFFFFF" }}
                    transition={{ duration: 0.15 }}
                >
                    Ver código
                </motion.span>
            </motion.a>
        </div>
    )
}

// ─── FOOTER NAV COLUMN ────────────────────────────────────────────────────────
function FooterNavColumn({ pathname }: { pathname: string }) {
    const { pokedexFilters } = useFilterStore();
    return (
        <div>
            <ColumnTitle title="EXPLORAR" />
            <ul className="list-none p-0 m-0 mt-5">
                {NAV_LINKS.map((link, i) => {
                    const href = link.href === "/pokemon" && pokedexFilters
                        ? `/pokemon?${pokedexFilters}`
                        : link.href;
                    return (
                        <FooterLink
                            key={link.href}
                            href={href}
                            label={link.label}
                            isActive={pathname === link.href || pathname.startsWith(link.href + "/")}
                            index={i}
                        />
                    );
                })}
            </ul>
        </div>
    )
}

// ─── FOOTER TOOLS COLUMN ──────────────────────────────────────────────────────
function FooterToolsColumn({ pathname, favoritesCount, compareCount, onSearchClick }:
    { pathname: string; favoritesCount: number; compareCount: number; onSearchClick: () => void }
) {
    return (
        <div>
            <ColumnTitle title="HERRAMIENTAS" />
            <ul className="list-none p-0 m-0 mt-5">
                {/* Comparador */}
                <FooterLink href="/compare" label="Comparador"
                    isActive={pathname === "/compare"} index={0}
                    badge={compareCount > 0 ? { count: compareCount, variant: "dark" } : undefined}
                />
                {/* Favoritos */}
                <FooterLink href="/favorites" label="Favoritos"
                    isActive={pathname === "/favorites"} index={1}
                    badge={favoritesCount > 0 ? { count: favoritesCount, variant: "red" } : undefined}
                />
                {/* Generaciones */}
                <FooterLink href="/generations" label="Generaciones"
                    isActive={pathname === "/generations"} index={2}
                />
                {/* Búsqueda — no es un link, es un botón */}
                <motion.li
                    custom={3} variants={linkVariants} initial="hidden"
                    whileInView="visible" viewport={{ once: true }}
                    className="flex items-center gap-2 py-[9px] border-b border-[#F2F2F2] cursor-pointer group"
                    onClick={onSearchClick}
                    whileHover="hover"
                >
                    <motion.span
                        className="text-[#CC0000] opacity-0"
                        variants={{ hover: { opacity: 1, x: 0 }, initial: { opacity: 0, x: -8 } }}
                        transition={{ duration: 0.15 }}
                    >
                        <ChevronRight size={13} />
                    </motion.span>
                    <motion.span
                        className="font-nunito text-[14px] font-bold text-[#444444] flex items-center gap-2 transition-colors group-hover:text-[#111111]"
                        variants={{ hover: { x: 5 } }}
                        transition={{ duration: 0.15 }}
                    >
                        Buscador
                        <motion.kbd
                            className="font-mono text-[9px] bg-[#F2F2F2] border border-[#E0E0E0] px-[7px] py-[2px] rounded-[3px] hidden sm:inline"
                            variants={{ hover: { x: [-1, 1, -1, 0] } }}
                            transition={{ duration: 0.25 }}
                        >
                            ⌘K
                        </motion.kbd>
                    </motion.span>
                </motion.li>
            </ul>
        </div>
    )
}

// ─── FOOTER LINK (reutilizable) ───────────────────────────────────────────────
function FooterLink({ href, label, isActive, index, badge }: {
    href: string
    label: string
    isActive: boolean
    index: number
    badge?: { count: number; variant: "red" | "dark" }
}) {
    return (
        <motion.li
            custom={index} variants={linkVariants} initial="hidden"
            whileInView="visible" viewport={{ once: true }}
            className={cn(
                "border-b",
                isActive ? "border-[#CC0000]" : "border-[#F2F2F2]"
            )}
            whileHover="hover"
        >
            <Link href={href} className="flex items-center gap-2 py-[9px] no-underline group block w-full outline-none">
                {/* Flecha animada */}
                <motion.span
                    className="text-[#CC0000]"
                    initial={{ opacity: 0, x: -8 }}
                    variants={{ hover: { opacity: 1, x: 0 } }}
                    animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                    transition={{ duration: 0.15 }}
                >
                    <ChevronRight size={13} />
                </motion.span>

                {/* Texto */}
                <motion.span
                    className={cn(
                        "font-nunito text-[14px] font-bold flex-1 transition-colors",
                        isActive ? "text-[#CC0000]" : "text-[#444444] group-hover:text-[#111111]"
                    )}
                    variants={{ hover: { x: 5 } }}
                    transition={{ duration: 0.15 }}
                >
                    {label}
                </motion.span>

                {/* Badge (favoritos / comparador) */}
                <AnimatePresence>
                    {badge && (
                        <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            transition={{ type: "spring", stiffness: 400, damping: 15 }}
                            className={cn(
                                "font-pixel text-[7px] px-2 py-[3px] text-white",
                                badge.variant === "red" ? "bg-[#CC0000]" : "bg-[#111111]"
                            )}
                        >
                            {badge.count > 9 ? "9+" : badge.count}
                        </motion.span>
                    )}
                </AnimatePresence>

                {/* Punto activo */}
                {isActive && (
                    <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 400 }}
                        className="w-[5px] h-[5px] rounded-full bg-[#CC0000]"
                    />
                )}
            </Link>
        </motion.li>
    )
}

// ─── COLUMN TITLE ─────────────────────────────────────────────────────────────
function ColumnTitle({ title }: { title: string }) {
    return (
        <div>
            <h3 className="font-pixel text-[9px] text-[#111111] tracking-[0.08em]">
                {title}
            </h3>
            <motion.div
                className="h-[2px] bg-[#CC0000] mt-3 origin-left"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                style={{ width: "28px" }}
            />
        </div>
    )
}

// ─── FOOTER INTERNAL DIVIDER ──────────────────────────────────────────────────
function FooterInternalDivider() {
    return (
        <motion.div
            className="h-[1px] bg-[#E0E0E0] origin-center"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
        />
    )
}

// ─── FOOTER BOTTOM ────────────────────────────────────────────────────────────
function FooterBottom({ theme, setTheme }: { theme?: string; setTheme: (t: string) => void }) {
    return (
        <motion.div
            className="bg-[#111111] relative overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
        >
            {/* Scanline del bottom */}
            <ScanlineEffect />

            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-[18px] relative z-10">
                <div className="flex flex-col sm:flex-row flex-wrap items-center justify-between gap-3 text-center sm:text-left">

                    {/* Copyright */}
                    <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
                        <span className="font-nunito text-[12px] text-[#666666]">
                            © 2024 PokéDex
                        </span>
                        <span className="text-[#333333] hidden sm:inline">|</span>
                        <span className="font-nunito text-[11px] text-[#444444]">
                            Pokémon © Nintendo · Game Freak · TPC
                        </span>
                    </div>

                    {/* Versión (centro) */}
                    <Tooltip.Provider delayDuration={400}>
                        <Tooltip.Root>
                            <Tooltip.Trigger asChild>
                                <span className="font-mono text-[10px] text-[#444444] bg-[#1A1A1A] border border-[#2A2A2A] px-3 py-1 cursor-default outline-none">
                                    v1.0.0
                                </span>
                            </Tooltip.Trigger>
                            <Tooltip.Portal>
                                <Tooltip.Content
                                    className="bg-white border border-[#E0E0E0] px-3 py-2 font-nunito text-[11px] text-[#111111] z-50 shadow-sm"
                                    sideOffset={6}
                                >
                                    PokéDex App v1.0.0 · Next.js 14 · PokéAPI v2
                                </Tooltip.Content>
                            </Tooltip.Portal>
                        </Tooltip.Root>
                    </Tooltip.Provider>

                    {/* Corazón + tema toggle */}
                    <div className="flex items-center justify-center gap-4">
                        {/* "Hecho con ♥ y Next.js" */}
                        <motion.div
                            className="flex items-center gap-[5px] font-nunito text-[12px] text-[#888888] cursor-default"
                            whileHover={{ color: "#FFFFFF" }}
                            transition={{ duration: 0.2 }}
                        >
                            <span>Hecho con</span>
                            <motion.span variants={heartbeatVariants} animate="beat">
                                <Heart size={14} fill="currentColor" className="text-[#CC0000]" />
                            </motion.span>
                            <span>y Next.js</span>
                        </motion.div>

                        {/* Easter egg: theme toggle */}
                        <Tooltip.Provider delayDuration={800}>
                            <Tooltip.Root>
                                <Tooltip.Trigger asChild>
                                    <motion.button
                                        onClick={() => setTheme && setTheme(theme === "dark" ? "light" : "dark")}
                                        className="text-[#333333] bg-transparent border-none cursor-pointer p-1"
                                        whileHover={{ color: "#CC0000", scale: 1.1 }}
                                        transition={{ duration: 0.15 }}
                                        aria-label="Cambiar tema"
                                    >
                                        <AnimatePresence mode="wait">
                                            {theme === "dark" ? (
                                                <motion.span key="sun"
                                                    initial={{ rotate: -90, opacity: 0 }}
                                                    animate={{ rotate: 0, opacity: 1 }}
                                                    exit={{ rotate: 90, opacity: 0 }}
                                                    transition={{ duration: 0.25 }}
                                                    className="block"
                                                >
                                                    <Sun size={14} />
                                                </motion.span>
                                            ) : (
                                                <motion.span key="moon"
                                                    initial={{ rotate: 90, opacity: 0 }}
                                                    animate={{ rotate: 0, opacity: 1 }}
                                                    exit={{ rotate: -90, opacity: 0 }}
                                                    transition={{ duration: 0.25 }}
                                                    className="block"
                                                >
                                                    <Moon size={14} />
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                    </motion.button>
                                </Tooltip.Trigger>
                                <Tooltip.Portal>
                                    <Tooltip.Content
                                        className="bg-white border border-[#E0E0E0] px-2 py-1 font-nunito text-[11px] text-[#111111] z-50 shadow-sm"
                                        sideOffset={6}
                                    >
                                        Cambiar tema
                                    </Tooltip.Content>
                                </Tooltip.Portal>
                            </Tooltip.Root>
                        </Tooltip.Provider>
                    </div>

                </div>
            </div>

            {/* Animated stripe final */}
            <FinalStripe />
        </motion.div>
    )
}

// ─── SCANLINE ─────────────────────────────────────────────────────────────────
function ScanlineEffect() {
    const prefersRM = useReducedMotion()
    if (prefersRM) return null
    return (
        <motion.div
            className="absolute top-0 bottom-0 w-[80px] pointer-events-none z-0"
            style={{
                background: "linear-gradient(90deg, transparent, rgba(204,0,0,0.2), transparent)"
            }}
            animate={{ x: ["-10vw", "110vw"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear", repeatDelay: 5 }}
            aria-hidden="true"
        />
    )
}

// ─── FINAL STRIPE ─────────────────────────────────────────────────────────────
function FinalStripe() {
    const prefersRM = useReducedMotion()
    return (
        <motion.div
            className="h-[2px] w-full"
            style={{
                background: "linear-gradient(90deg, #111111 0%, #CC0000 30%, #111111 60%, #CC0000 90%, #111111 100%)",
                backgroundSize: "200% 100%",
            }}
            animate={prefersRM ? {} : {
                backgroundPosition: ["0% 0%", "200% 0%"]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
    )
}
