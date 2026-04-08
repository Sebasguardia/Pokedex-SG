"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ImageModalProps {
    isOpen: boolean;
    onClose: () => void;
    src: string;
    alt: string;
    title: string;
}

export function ImageModal({ isOpen, onClose, src, alt, title }: ImageModalProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!mounted) return null;

    const modalContent = (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8 isolate">
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-zoom-out"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Modal Content - Absolute Fit */}
                    <motion.div
                        className="relative w-full h-full flex flex-col items-center justify-center pointer-events-none p-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {/* Content Assembly */}
                        <div className="flex flex-col items-center max-w-full max-h-full pointer-events-auto cursor-zoom-out" onClick={onClose}>
                            {/* Image - Height calculated to leave space for labels */}
                            <img 
                                src={src} 
                                alt={alt} 
                                className="w-auto h-auto max-w-[95vw] max-h-[calc(100vh-120px)] object-contain shadow-2xl"
                            />

                            {/* Labels - Tight and integrated */}
                            <div className="mt-3 flex flex-col md:flex-row justify-between items-center w-full max-w-full px-2 gap-2">
                                <div className="bg-[#111111]/95 px-2 py-1 border border-white/20 flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-[#CC0000]" />
                                    <span className="font-['Press_Start_2P'] text-[7px] md:text-[8px] text-white uppercase">
                                        {title}
                                    </span>
                                </div>
                                
                                <div className="hidden md:block">
                                    <span className="font-['Nunito'] font-black text-[9px] text-white/40 italic uppercase tracking-widest">
                                        © Nintendo/Game Freak - Uso informativo
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );

    return createPortal(modalContent, document.body);
}
