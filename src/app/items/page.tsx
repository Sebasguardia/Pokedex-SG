"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useQueryState, parseAsString, parseAsInteger } from "nuqs"
import { useItemsList } from "@/lib/hooks/useItemsList"
import { POCKET_META } from "@/lib/constants/items.constants"
import { ItemCard } from "@/components/items/item-card"
import { PokeballCard } from "@/components/items/pokeball-card"
import { TMCard } from "@/components/items/tm-card"
import { ItemPocketTabs } from "@/components/items/item-pocket-tabs"
import { ItemPocketHeader } from "@/components/items/item-pocket-header"
import { ItemPocketSearchBar } from "@/components/items/item-pocket-search-bar"
import { ItemsEmptyState } from "@/components/items/items-empty-state"
import { Pagination } from "@/components/shared/pagination"
import { PageTransitionItems } from "@/components/shared/page-transition-items"
import { useFilterStore } from "@/lib/store/filter.store"
import { cn } from "@/lib/utils/cn"
import { useEffect } from "react"

export default function ItemsPage() {
    // URL state with nuqs
    const [pocket, setPocket] = useQueryState("pocket", parseAsString.withDefault("medicine"))
    const [search, setSearch] = useQueryState("q", parseAsString.withDefault(""))
    const [sort, setSort] = useQueryState("sort", parseAsString.withDefault("name"))
    const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1))

    const { setItemsPocket } = useFilterStore()

    // Sync pocket to store for navbar consistency
    useEffect(() => {
        if (pocket) setItemsPocket(pocket);
    }, [pocket, setItemsPocket]);

    const { data, isLoading, isFetching, hasNextPage } = useItemsList({
        pocket,
        search,
        sort,
        page,
        limit: 60
    })

    const pocketMeta = POCKET_META[pocket] || POCKET_META.misc

    const handlePocketChange = (newPocket: string) => {
        setPocket(newPocket)
        setSearch("")
        setPage(1)
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    return (
        <>
            <PageTransitionItems />

            <main className="min-h-screen bg-[#FFFFFF] pb-20">
                {/* Visual Anchor / Small Banner */}
                <div className="bg-[#111111] h-1" />

                <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
                    {/* Page Header (Compact) */}
                    <div className="py-8">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-2 h-8 bg-[#CC0000]" />
                            <h2 className="font-press-start text-[10px] text-[#111111] uppercase tracking-tighter">
                                Sistema de Gestión de Mochila v4.0
                            </h2>
                        </div>
                        <h1 className="font-press-start text-3xl text-[#111111] tracking-widest">
                            OBJETOS
                        </h1>
                    </div>

                    {/* Navigation Tabs (Sticky) */}
                    <ItemPocketTabs
                        activePocket={pocket}
                        onPocketChange={handlePocketChange}
                    />

                    {/* Pocket Info & Search */}
                    <div className="mt-8">
                        <AnimatePresence mode="wait">
                            <ItemPocketHeader
                                key={pocket}
                                pocket={pocket}
                                count={data.count}
                            />
                        </AnimatePresence>

                        <ItemPocketSearchBar
                            pocket={pocket}
                            value={search}
                            onChange={(val) => { setSearch(val); setPage(1); }}
                            sort={sort}
                            onSortChange={(val) => { setSort(val); setPage(1); }}
                        />
                    </div>

                    {/* Items Grid */}
                    <div className="relative min-h-[400px]">
                        <AnimatePresence mode="wait">
                            {isLoading ? (
                                <motion.div
                                    key="loading"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4"
                                >
                                    {Array.from({ length: 12 }).map((_, i) => (
                                        <div key={i} className="bg-white border-2 border-[#111111] animate-pulse h-[166px] shadow-[3px_3px_0_#111111]">
                                            <div className="h-[80px] bg-[#F2F2F2]" />
                                            <div className="p-3 space-y-2">
                                                <div className="h-3 bg-[#F2F2F2] w-3/4" />
                                                <div className="h-2 bg-[#F2F2F2] w-1/2" />
                                            </div>
                                        </div>
                                    ))}
                                </motion.div>
                            ) : data.results.length > 0 ? (
                                <motion.div
                                    key={`grid-${pocket}-${search}`}
                                    initial={{ opacity: 1 }}
                                    className={cn(
                                        "grid gap-3 sm:gap-4",
                                        pocket === "pokeballs"
                                            ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
                                            : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
                                    )}
                                >
                                    {data.results.map((item, i) => {
                                        if (pocket === "pokeballs") {
                                            return <PokeballCard key={item.name} item={item} index={i} />
                                        }
                                        if (pocket === "machines") {
                                            return <TMCard key={item.name} item={item} index={i} />
                                        }
                                        return (
                                            <ItemCard
                                                key={`${item.name}-${i}`}
                                                item={item}
                                                index={i}
                                                pocket={pocket}
                                            />
                                        )
                                    })}
                                </motion.div>
                            ) : (
                                <ItemsEmptyState
                                    key="empty"
                                    pocket={pocket}
                                    pocketMeta={pocketMeta}
                                />
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Pagination */}
                    {data.results.length > 0 && (
                        <Pagination
                            currentPage={page}
                            totalItems={data.count}
                            itemsPerPage={60}
                            onPageChange={(p) => {
                                setPage(p);
                                window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                        />
                    )}
                </div>
            </main>
        </>
    )
}
