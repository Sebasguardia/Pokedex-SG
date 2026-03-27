"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useFavoritesStore } from "@/lib/store/favorites.store";
import { useFilteredFavorites, useFavorites } from "@/lib/hooks/useFavorites";
import { PageTransitionFavorites } from "@/components/favorites/page-transition-favorites";
import { FavoritesPageHeader } from "@/components/favorites/favorites-page-header";
import { FavoritesSidebar } from "@/components/favorites/favorites-sidebar";
import { FavoritesToolbar } from "@/components/favorites/favorites-toolbar";
import { FavoritesFilterPanel } from "@/components/favorites/favorites-filter-panel";
import { FavoritesStatsDashboard } from "@/components/favorites/favorites-stats-dashboard";
import { FavoritesGrid } from "@/components/favorites/favorites-grid";
import { FavoritesList } from "@/components/favorites/favorites-list";
import { FavoritesAlbum } from "@/components/favorites/favorites-album";
import { FavoritesEmptyState } from "@/components/favorites/favorites-empty-state";
import { FavoritesBulkActionsBar } from "@/components/favorites/favorites-bulk-actions-bar";
import { CollectionCreateModal } from "@/components/favorites/collection-create-modal";
import { FavoritesExportModal } from "@/components/favorites/favorites-export-modal";
import { FavoritesImportModal } from "@/components/favorites/favorites-import-modal";
import type { FavoriteCollection } from "@/types/api/favorites.types";
import { decodeCollectionFromUrl } from "@/lib/constants/favorites.constants";

function FavoritesPageInner() {
    const searchParams = useSearchParams();
    const { favorites, viewMode, clearFilters, setActiveCollection } = useFavoritesStore();
    const filtered = useFilteredFavorites();

    // Modals
    const [showExport, setShowExport] = useState(false);
    const [showImport, setShowImport] = useState(false);
    const [showCollectionModal, setShowCollectionModal] = useState(false);
    const [editingCollection, setEditingCollection] = useState<FavoriteCollection | null>(null);
    const [prefillImportJson, setPrefillImportJson] = useState<string | undefined>(undefined);

    // Handle URL params
    useEffect(() => {
        const collectionParam = searchParams.get("collection");
        if (collectionParam) setActiveCollection(collectionParam);

        const importParam = searchParams.get("import");
        if (importParam) {
            const ids = decodeCollectionFromUrl(importParam);
            if (ids) {
                // Build minimal import JSON from IDs
                setPrefillImportJson(JSON.stringify({
                    version: 1,
                    favorites: [],
                    importedIds: ids,
                    collections: [],
                }));
                setShowImport(true);
            }
        }
    }, []);

    const handleCreateCollection = () => {
        setEditingCollection(null);
        setShowCollectionModal(true);
    };

    const handleEditCollection = (col: FavoriteCollection) => {
        setEditingCollection(col);
        setShowCollectionModal(true);
    };

    return (
        <PageTransitionFavorites>
            <div className="min-h-screen bg-white">
                {/* Hero header */}
                <div className="bg-[#111111] relative">
                    {/* Dot grid */}
                    <div
                        className="absolute inset-0 opacity-[0.08]"
                        style={{
                            backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
                            backgroundSize: "24px 24px",
                        }}
                    />
                    <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-0">
                        <FavoritesPageHeader
                            onExport={() => setShowExport(true)}
                            onImport={() => setShowImport(true)}
                            onCreateCollection={handleCreateCollection}
                        />
                    </div>
                </div>

                {/* Main content */}
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
                    {favorites.length === 0 ? (
                        <FavoritesEmptyState />
                    ) : (
                        <div className="flex gap-6 items-start">
                            {/* Sidebar */}
                            <FavoritesSidebar
                                onCreateCollection={handleCreateCollection}
                                onEditCollection={handleEditCollection}
                            />

                            {/* Main column */}
                            <div className="flex-1 min-w-0">
                                <FavoritesToolbar />
                                <FavoritesFilterPanel />
                                <FavoritesStatsDashboard />

                                {/* Views */}
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={viewMode}
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -8 }}
                                        transition={{ duration: 0.18 }}
                                    >
                                        {viewMode === "grid"  && <FavoritesGrid  items={filtered} onClearFilters={clearFilters} />}
                                        {viewMode === "list"  && <FavoritesList  items={filtered} onClearFilters={clearFilters} />}
                                        {viewMode === "album" && <FavoritesAlbum items={filtered} onClearFilters={clearFilters} />}
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Modals */}
            <CollectionCreateModal
                isOpen={showCollectionModal}
                onClose={() => setShowCollectionModal(false)}
                editCollection={editingCollection}
            />
            <FavoritesExportModal isOpen={showExport} onClose={() => setShowExport(false)} />
            <FavoritesImportModal isOpen={showImport} onClose={() => setShowImport(false)} prefillJson={prefillImportJson} />

            {/* Fixed bulk bar */}
            <FavoritesBulkActionsBar />
        </PageTransitionFavorites>
    );
}

export default function FavoritesPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">
            <p className="font-press-start text-[10px] text-[#CCCCCC]">Cargando...</p>
        </div>}>
            <FavoritesPageInner />
        </Suspense>
    );
}
