"use client";

import { useState } from "react";
import { Search, X, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TYPE_CONSTANTS } from "@/lib/constants/types.constants";
import { GENERATIONS } from "@/lib/constants/generations.constants";
import { cn } from "@/lib/utils/cn";

interface PokemonFiltersProps {
    onSearch: (q: string) => void;
    onTypeChange: (type: string) => void;
    onGenChange: (gen: string) => void;
    activeType: string;
    activeGen: string;
}

export function PokemonFilters({ onSearch, onTypeChange, onGenChange, activeType, activeGen }: PokemonFiltersProps) {
    const [query, setQuery] = useState("");

    const handleSearch = (q: string) => {
        setQuery(q);
        onSearch(q);
    };

    return (
        <div className="flex flex-col gap-4 mb-6">
            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Buscar Pokémon por nombre o número..."
                    value={query}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10"
                />
                {query && (
                    <button onClick={() => handleSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white">
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>

            {/* Type filter */}
            <div className="flex flex-wrap gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onTypeChange("")}
                    className={cn(!activeType && "border-poke-red/60 bg-poke-red/10 text-poke-red")}
                >
                    Todos
                </Button>
                {Object.entries(TYPE_CONSTANTS).map(([key, { name, color }]) => (
                    <button
                        key={key}
                        onClick={() => onTypeChange(key)}
                        className={cn(
                            "px-3 py-1 text-xs rounded-full text-white border transition-all",
                            activeType === key ? "border-white scale-105" : "border-transparent opacity-70 hover:opacity-100"
                        )}
                        style={{ backgroundColor: color }}
                    >
                        {name}
                    </button>
                ))}
            </div>

            {/* Generation filter */}
            <div className="flex flex-wrap gap-2">
                {GENERATIONS.map((gen) => (
                    <Button
                        key={gen.name}
                        variant="outline"
                        size="sm"
                        onClick={() => onGenChange(gen.name === activeGen ? "" : gen.name)}
                        className={cn(activeGen === gen.name && "border-poke-yellow/60 bg-poke-yellow/10 text-poke-yellow")}
                    >
                        {gen.label}
                    </Button>
                ))}
            </div>
        </div>
    );
}
