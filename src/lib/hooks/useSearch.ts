"use client";

import { useState, useMemo } from "react";
import Fuse from "fuse.js";

interface SearchItem {
    name: string;
    id: number;
    type: "pokemon" | "move" | "ability" | "item" | "berry" | "type";
}

export function useSearch(items: SearchItem[], query: string) {
    const fuse = useMemo(
        () =>
            new Fuse(items, {
                keys: ["name", "id"],
                threshold: 0.3,
                includeScore: true,
            }),
        [items]
    );

    const results = useMemo(() => {
        if (!query.trim()) return items.slice(0, 8);
        return fuse.search(query).map((r) => r.item);
    }, [fuse, query, items]);

    return results;
}
