"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function PokemonSearch() {
    const [query, setQuery] = useState("");

    return (
        <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
                placeholder="Nombre o número de Pokémon..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10"
            />
        </div>
    );
}
