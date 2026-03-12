"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Loader2, Check } from "lucide-react"

interface Props {
    onTrigger: () => void
    isFetching: boolean
    hasNextPage: boolean
    pocketAccent: string
}

export function InfiniteScrollTrigger({ onTrigger, isFetching, hasNextPage, pocketAccent }: Props) {
    const observerTarget = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isFetching && hasNextPage) {
                    onTrigger()
                }
            },
            { threshold: 0.1 }
        )

        if (observerTarget.current) {
            observer.observe(observerTarget.current)
        }

        return () => observer.disconnect()
    }, [onTrigger, isFetching, hasNextPage])

    return (
        <div ref={observerTarget} className="py-12 flex flex-col items-center justify-center gap-4">
            {isFetching ? (
                <div className="flex flex-col items-center gap-2">
                    <Loader2 className="animate-spin" style={{ color: pocketAccent }} size={32} />
                    <span className="font-press-start text-[7px] text-[#888888]">Cargando más objetos...</span>
                </div>
            ) : !hasNextPage ? (
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center gap-2"
                >
                    <div
                        className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-[#111111]"
                        style={{ backgroundColor: pocketAccent }}
                    >
                        <Check className="text-white" size={20} />
                    </div>
                    <span className="font-press-start text-[7px] text-[#111111]">¡Todos los objetos cargados!</span>
                </motion.div>
            ) : null}
        </div>
    )
}
