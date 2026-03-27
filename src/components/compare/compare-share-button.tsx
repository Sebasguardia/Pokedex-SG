"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link2, Check } from "lucide-react"

interface CompareShareButtonProps {
    shareUrl:    string
    filledCount: number
}

export function CompareShareButton({ shareUrl, filledCount }: CompareShareButtonProps) {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        if (!shareUrl || filledCount === 0) return
        try {
            await navigator.clipboard.writeText(shareUrl)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch {}
    }

    return (
        <motion.button
            onClick={handleCopy}
            disabled={filledCount === 0}
            animate={copied ? { backgroundColor: "#DCFCE7", borderColor: "#22C55E" } : {}}
            className={`flex items-center gap-2 border-2 border-[#111111] px-3 py-2 font-press-start text-[8px] transition-all
                ${filledCount === 0 ? "opacity-40 cursor-not-allowed text-gray-400" : "hover:bg-[#F0F0F0] text-[#111111]"}`}
            style={filledCount > 0 ? { boxShadow: "3px 3px 0 #111111" } : undefined}
        >
            <AnimatePresence mode="wait">
                {copied ? (
                    <motion.span key="check" className="flex items-center gap-2 text-[#15803D]"
                        initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}>
                        <Check className="w-3.5 h-3.5" />
                        ¡COPIADO!
                    </motion.span>
                ) : (
                    <motion.span key="share" className="flex items-center gap-2"
                        initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}>
                        <Link2 className="w-3.5 h-3.5" />
                        COMPARTIR
                    </motion.span>
                )}
            </AnimatePresence>
        </motion.button>
    )
}
