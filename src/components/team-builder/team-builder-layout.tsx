"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

// ── Sección colapsable ────────────────────────────────────────────────────────

interface AnalysisSectionProps {
    title: string;
    defaultOpen?: boolean;
    badge?: React.ReactNode;
    children: React.ReactNode;
    accent?: string;   // color de la franja izquierda
    infoTitle?: string;
    infoText?: React.ReactNode;
}

export function AnalysisSection({
    title, defaultOpen = true, badge, children, accent = "#CC0000", infoTitle, infoText
}: AnalysisSectionProps) {
    const [open, setOpen] = useState(defaultOpen);

    return (
        <div className="border-2 border-[#E0E0E0] relative z-10 transition-all focus-within:z-20 hover:z-20">
            {/* Header Flex Row */}
            <div className="flex items-stretch bg-[#FAFAFA]">
                {/* Trigger */}
                <button
                    onClick={() => setOpen((o) => !o)}
                    className="flex-1 flex items-center gap-3 px-4 py-3.5 hover:bg-[#F0F0F0] transition-colors text-left"
                    style={{ borderLeft: `3px solid ${accent}` }}
                >
                    <span className="font-press-start text-[10px] text-[#111111] flex-1">
                        {title.toUpperCase()}
                    </span>
                    {badge && <span className="shrink-0">{badge}</span>}
                    <motion.div
                        animate={{ rotate: open ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="shrink-0"
                    >
                        <ChevronDown size={14} className="text-[#888888]" />
                    </motion.div>
                </button>

                {/* Info Tooltip (if provided) */}
                {infoTitle && infoText && (
                    <div className="flex items-center pr-4 relative group">
                        <div className="w-6 h-6 rounded-full border border-[#111111] bg-white text-[#555555] cursor-help flex items-center justify-center transition-colors group-hover:bg-[#111111] group-hover:text-white">
                            <HelpCircle size={12} />
                        </div>
                        <div className="absolute right-0 top-full mt-2 z-[9999] w-[300px] p-4 bg-white border-2 border-[#111111] shadow-[4px_4px_0_#111111] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all pointer-events-none">
                            <h4 className="font-press-start text-[10px] mb-2 uppercase" style={{ color: accent }}>{infoTitle}</h4>
                            <div className="font-nunito text-[13px] text-[#444444] leading-tight">
                                {infoText}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Content */}
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0, overflow: "hidden" }}
                        animate={{ height: "auto", opacity: 1, transitionEnd: { overflow: "visible" } }}
                        exit={{ height: 0, opacity: 0, overflow: "hidden" }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="p-4 pt-3">{children}</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ── Separador de sección ──────────────────────────────────────────────────────

interface SectionDividerProps {
    label: string;
}

export function SectionDivider({ label }: SectionDividerProps) {
    return (
        <div className="flex items-center gap-4">
            <p className="font-press-start text-[9px] text-[#888888] uppercase tracking-widest whitespace-nowrap">
                {label}
            </p>
            <div className="h-px bg-[#E0E0E0] flex-1" />
        </div>
    );
}

// ── Layout principal del Team Builder ────────────────────────────────────────

interface TeamBuilderLayoutProps {
    constructor: React.ReactNode;   // Zona A — sticky en desktop
    analysis: React.ReactNode;   // Zona B — scrollable
    modal?: React.ReactNode;   // Modales (search, share, import)
}

export function TeamBuilderLayout({
    constructor: constructorZone, analysis, modal,
}: TeamBuilderLayoutProps) {
    return (
        <div className="relative min-h-screen bg-white">
            {/* Dot grid background */}
            <div
                className="fixed inset-0 z-0 pointer-events-none opacity-[0.02]"
                style={{
                    backgroundImage: "radial-gradient(#111111 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                }}
            />

            <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 py-8">
                {/* Layout: sticky constructor | scrollable analysis */}
                <div className="flex flex-col xl:flex-row gap-8 items-start">
                    {/* Zona A — sticky en XL */}
                    <div className="w-full xl:w-[440px] xl:sticky xl:top-6 shrink-0">
                        {constructorZone}
                    </div>

                    {/* Zona B — scrollable */}
                    <div className="flex-1 min-w-0">
                        {analysis}
                    </div>
                </div>
            </div>

            {/* Modales */}
            {modal}
        </div>
    );
}

// ── Panel de información con etiqueta flotante ────────────────────────────────

interface InfoPanelProps {
    label: string;
    labelColor?: string;
    shadowColor?: string;
    children: React.ReactNode;
}

export function InfoPanel({
    label, labelColor = "#111111", shadowColor = "#111111", children,
}: InfoPanelProps) {
    return (
        <div
            className="relative border-2 border-[#111111] bg-white p-5 pt-7 mt-4"
            style={{ boxShadow: `4px 4px 0 ${shadowColor}` }}
        >
            <div
                className="absolute top-[-14px] left-4 px-3 py-1 z-10 border-2 border-[#111111]"
                style={{ backgroundColor: labelColor }}
            >
                <span className="font-nunito font-bold text-[11px] text-white uppercase tracking-wider">{label}</span>
            </div>
            <div className="relative z-0">
                {children}
            </div>
        </div>
    );
}