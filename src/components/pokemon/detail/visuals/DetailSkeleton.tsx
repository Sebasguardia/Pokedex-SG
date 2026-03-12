"use client"

import { motion } from "framer-motion"

function Shimmer({ className }: { className?: string }) {
    return (
        <div className={`relative overflow-hidden bg-[#F2F2F2] ${className}`}>
            <motion.div
                className="absolute inset-0"
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)" }}
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
        </div>
    )
}

export function DetailSkeleton() {
    return (
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-6">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-6">
                <Shimmer className="h-3 w-12" />
                <Shimmer className="h-3 w-3" />
                <Shimmer className="h-3 w-16" />
                <Shimmer className="h-3 w-3" />
                <Shimmer className="h-3 w-20" />
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Hero Column */}
                <div className="w-full lg:w-[360px] flex-shrink-0">
                    {/* Stage */}
                    <Shimmer className="w-full aspect-square mb-4" />

                    {/* Controls */}
                    <div className="flex justify-center gap-2 mb-6">
                        <Shimmer className="h-8 w-20" />
                        <Shimmer className="h-8 w-10" />
                        <Shimmer className="h-8 w-20" />
                    </div>

                    {/* ID + badges */}
                    <div className="flex gap-2 mb-2">
                        <Shimmer className="h-3 w-12" />
                        <Shimmer className="h-4 w-16" />
                    </div>

                    {/* Name */}
                    <Shimmer className="h-6 w-48 mb-2" />
                    <Shimmer className="h-3 w-24 mb-4" />

                    {/* Type badges */}
                    <div className="flex gap-2 mb-4">
                        <Shimmer className="h-8 w-24" />
                        <Shimmer className="h-8 w-24" />
                    </div>

                    {/* Physical stats */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                        {[0, 1, 2, 3].map(i => <Shimmer key={i} className="h-[72px]" />)}
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-2 mb-4">
                        <Shimmer className="flex-1 h-10" />
                        <Shimmer className="h-10 w-12" />
                        <Shimmer className="h-10 w-12" />
                    </div>

                    {/* Nav arrows */}
                    <div className="flex gap-3">
                        <Shimmer className="flex-1 h-14" />
                        <Shimmer className="flex-1 h-14" />
                    </div>
                </div>

                {/* Content area */}
                <div className="flex-1">
                    {/* Tab list */}
                    <div className="flex gap-0 border-b-2 border-[#E0E0E0] mb-6">
                        {[80, 60, 90, 70].map((w, i) => (
                            <Shimmer key={i} className={`h-10 w-[${w}px] mx-1`} />
                        ))}
                    </div>

                    {/* Content lines */}
                    <div className="h-24 bg-[#F8F8F8] border-l-4 border-[#E0E0E0] mb-6 p-4">
                        <Shimmer className="h-3 w-full mb-2" />
                        <Shimmer className="h-3 w-4/5 mb-2" />
                        <Shimmer className="h-3 w-3/5" />
                    </div>

                    {[0, 1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="flex gap-4 py-3 border-b border-[#F2F2F2]">
                            <Shimmer className="h-3 w-24 flex-shrink-0" />
                            <Shimmer className="h-3 flex-1" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
