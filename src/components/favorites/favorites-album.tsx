"use client";

import { FavoritePokemon } from "@/types/api/favorites.types";
import { FavoriteCardAlbum } from "./favorite-card-album";
import { FavoritesNoResults } from "./favorites-no-results";

export function FavoritesAlbum({ items, onClearFilters }: { items: FavoritePokemon[]; onClearFilters: () => void }) {
    if (items.length === 0) return <FavoritesNoResults onClear={onClearFilters} />;
    return (
        <div className="grid gap-3" style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
        }}>
            {items.filter(poke => poke && poke.id).map((poke) => (
                <FavoriteCardAlbum key={poke.id} pokemon={poke} />
            ))}
        </div>
    );
}
