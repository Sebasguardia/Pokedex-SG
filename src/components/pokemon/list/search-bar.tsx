"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X } from "lucide-react"

interface SearchBarProps {
    value: string;
    onChange: (val: string) => void;
    totalCount: number;
}

export function SearchBar({ value, onChange, totalCount }: SearchBarProps) {
    const [isFocused, setIsFocused] = useState(false)
    const [localValue, setLocalValue] = useState(value)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        setLocalValue(value)
    }, [value])

    useEffect(() => {
        if (localValue === value) return
        const handler = setTimeout(() => {
            onChange(localValue)
            if (localValue !== value) {
                window.scrollTo({ top: 0, behavior: "smooth" })
            }
        }, 300)
        return () => clearTimeout(handler)
    }, [localValue, value, onChange])

    const handleClear = () => {
        setLocalValue("")
        onChange("")
        inputRef.current?.focus()
    }

    let hintText = ""
    if (localValue.length > 0) {
        if (!isNaN(Number(localValue))) {
            hintText = `Buscando Pokémon #${localValue}...`
        } else if (totalCount > 0) {
            hintText = `${totalCount} Pokémon encontrados`
        } else {
            hintText = `Sin coincidencias — prueba con otro nombre`
        }
    }

    return (
        <div className="relative w-full my-[20px]">
            <motion.div
                className="relative w-full bg-white h-[46px] md:h-[52px] flex items-center group placeholder-[#888888]"
                animate={{
                    boxShadow: isFocused ? "4px 4px 0 #111111" : "0px 0px 0 #111111"
                }}
                whileHover={!isFocused ? "hover" : ""}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                style={{ border: "2px solid #111111", borderRadius: 0 }}
            >
                {/* Animated Red Border Overlay */}
                <motion.div
                    className="absolute inset-[-2px] border-2 border-[#CC0000] pointer-events-none z-20"
                    initial={{ clipPath: "inset(0 100% 0 0)" }}
                    animate={{ clipPath: isFocused ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)" }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                />

                {/* Input */}
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Busca por nombre o número (p. ej. Pikachu o 25)"
                    value={localValue}
                    onChange={(e) => setLocalValue(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className="w-full h-full bg-transparent px-[52px] font-nunito text-[15px] text-[#111111] placeholder:text-[#888888] outline-none z-10"
                />

                {/* Search Icon */}
                <motion.div
                    className="absolute left-[16px] top-1/2 -translate-y-1/2 z-10 pointer-events-none"
                    animate={{
                        scale: isFocused ? 1.1 : 1,
                        color: isFocused ? "#CC0000" : "#888888"
                    }}
                    transition={{ type: "spring" }}
                >
                    <Search size={20} />
                </motion.div>

                {/* Right side (Clear / KBD) */}
                <div className="absolute right-[14px] top-1/2 -translate-y-1/2 z-10 flex items-center">
                    <AnimatePresence mode="wait">
                        {localValue.length > 0 ? (
                            <motion.button
                                key="clear"
                                onClick={handleClear}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                transition={{ type: "spring", stiffness: 500, damping: 20 }}
                                className="w-[26px] h-[26px] flex items-center justify-center bg-[#F2F2F2] border border-[#E0E0E0] outline-none group/btn transition-colors hover:bg-[#111111]"
                            >
                                <motion.div
                                    className="text-[#888888] group-hover/btn:text-white"
                                    whileHover={{ rotate: 90 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <X size={16} />
                                </motion.div>
                            </motion.button>
                        ) : (
                            <motion.div
                                key="kbd"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="hidden md:block"
                            >
                                <motion.kbd
                                    className="font-mono text-[10px] bg-[#F2F2F2] border border-[#E0E0E0] px-[8px] py-[3px] text-[#888888] inline-block"
                                    variants={{
                                        hover: { x: [0, -2, 2, -1, 1, 0] }
                                    }}
                                    transition={{ duration: 0.3 }}
                                >
                                    ⌘K
                                </motion.kbd>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>

            <AnimatePresence>
                {localValue.length > 0 && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 20, opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden mt-2 font-nunito text-[12px] text-[#888888] pl-1"
                    >
                        {hintText}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
