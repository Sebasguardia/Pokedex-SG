"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import * as Tooltip from "@radix-ui/react-tooltip"
import { Heart, GitCompare, Share2, Check } from "lucide-react"

interface Props {
    isFavorite: boolean
    isInCompare: boolean
    onFavorite: () => void
    onCompare: () => void
    onShare: () => void
    pokemonName?: string
}

function HeartParticle({ id }: { id: number }) {
    const angle = (id / 5) * 360
    const distance = 30 + Math.random() * 20
    const dx = Math.cos((angle * Math.PI) / 180) * distance
    const dy = Math.sin((angle * Math.PI) / 180) * distance - 20

    return (
        <motion.div
            className="absolute text-[#CC0000] text-[12px] pointer-events-none"
            style={{ left: "50%", top: "50%", translateX: "-50%", translateY: "-50%" }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 0.5 }}
            animate={{ x: dx, y: dy, opacity: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: id * 0.05, ease: "easeOut" }}
        >
            ❤
        </motion.div>
    )
}

export function ActionButtons({ isFavorite, isInCompare, onFavorite, onCompare, onShare, pokemonName }: Props) {
    const [particles, setParticles] = useState<number[]>([])
    const [copied, setCopied] = useState(false)
    const [compareSpin, setCompareSpin] = useState(false)

    const handleFavorite = () => {
        if (!isFavorite) {
            setParticles([0, 1, 2, 3, 4])
            setTimeout(() => setParticles([]), 700)
        }
        onFavorite()
    }

    const handleShare = async () => {
        try {
            if (navigator.share) {
                await navigator.share({ url: window.location.href, title: `Pokédex - ${pokemonName}` })
            } else {
                await navigator.clipboard.writeText(window.location.href)
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
            }
        } catch { }
    }

    const handleCompare = () => {
        setCompareSpin(true)
        setTimeout(() => setCompareSpin(false), 400)
        onCompare()
    }

    return (
        <div className="flex gap-2 mb-4">
            {/* Favorite */}
            <motion.button
                onClick={handleFavorite}
                className="relative flex-1 flex items-center justify-center gap-2 py-[10px] border-2 border-[#111111] font-['Nunito'] text-[13px] font-bold overflow-visible"
                style={{
                    backgroundColor: isFavorite ? "#CC0000" : "#FFFFFF",
                    color: isFavorite ? "white" : "#111111",
                    boxShadow: "3px 3px 0 #111111"
                }}
                whileHover={{ x: 3, y: 3, boxShadow: "0px 0px 0 #111111" }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
                {/* Particles */}
                {particles.map(id => <HeartParticle key={id} id={id} />)}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={isFavorite ? "filled" : "empty"}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: isFavorite ? [1, 1.4, 1] : 1 }}
                        transition={{ duration: 0.4, ease: "backOut" }}
                    >
                        <Heart size={16} className={isFavorite ? "fill-white" : ""} />
                    </motion.div>
                </AnimatePresence>
                {isFavorite ? "Guardado" : "Guardar"}
            </motion.button>

            {/* Compare */}
            <Tooltip.Provider>
                <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                        <motion.button
                            onClick={handleCompare}
                            className="flex items-center justify-center px-4 py-[10px] border-2 border-[#111111]"
                            style={{
                                backgroundColor: isInCompare ? "#111111" : "#FFFFFF",
                                color: isInCompare ? "white" : "#444444",
                                boxShadow: "3px 3px 0 #111111"
                            }}
                            whileHover={{ x: 3, y: 3, boxShadow: "0px 0px 0 #111111" }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <motion.div
                                animate={{ rotate: compareSpin ? 180 : 0 }}
                                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            >
                                <GitCompare size={16} />
                            </motion.div>
                        </motion.button>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                        <Tooltip.Content className="bg-[#111111] text-white font-['Nunito'] text-[11px] px-2 py-1 z-50" sideOffset={5}>
                            {isInCompare ? "En el comparador" : "Añadir al comparador"}
                            <Tooltip.Arrow className="fill-[#111111]" />
                        </Tooltip.Content>
                    </Tooltip.Portal>
                </Tooltip.Root>
            </Tooltip.Provider>

            {/* Share */}
            <motion.button
                onClick={handleShare}
                className="flex items-center justify-center px-4 py-[10px] border-2 border-[#E0E0E0]"
                whileHover={{ borderColor: "#111111", color: "#111111" }}
                whileTap={{ scale: 0.98 }}
                style={{ color: "#888888" }}
            >
                <AnimatePresence mode="wait">
                    {copied
                        ? <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><Check size={16} className="text-green-600" /></motion.div>
                        : <motion.div key="share" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><Share2 size={16} /></motion.div>
                    }
                </AnimatePresence>
            </motion.button>
        </div>
    )
}
