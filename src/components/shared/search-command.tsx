"use client";

import { useState } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import { formatPokemonName } from "@/lib/utils/pokemon.utils";

interface SearchCommandProps {
    open: boolean;
    onClose: () => void;
}

export function SearchCommand({ open, onClose }: SearchCommandProps) {
    const [query, setQuery] = useState("");
    const router = useRouter();

    if (!open) return null;

    const handleSelect = (name: string, type: string) => {
        router.push(`/${type}/${name}`);
        setQuery("");
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-start justify-center pt-16">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

            {/* Command Dialog */}
            <div className="relative z-10 w-full max-w-lg mx-4 bg-poke-surface border border-poke-border rounded-xl shadow-2xl shadow-black/50 overflow-hidden">
                {/* Search Input */}
                <div className="flex items-center border-b border-poke-border px-4">
                    <Search className="h-4 w-4 text-muted-foreground mr-3 flex-shrink-0" />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Buscar Pokémon, Moves, Items..."
                        className="flex-1 py-4 bg-transparent text-white placeholder:text-muted-foreground focus:outline-none text-sm"
                        autoFocus
                    />
                    {query && (
                        <button onClick={() => setQuery("")} className="text-muted-foreground hover:text-white">
                            <X className="h-4 w-4" />
                        </button>
                    )}
                    <kbd className="ml-3 hidden sm:flex h-5 select-none items-center gap-1 rounded border border-poke-border bg-poke-darker px-1.5 font-mono text-[10px] text-muted-foreground">
                        ESC
                    </kbd>
                </div>

                {/* Results area */}
                <div className="py-2 max-h-80 overflow-y-auto">
                    {!query ? (
                        <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                            Escribe para buscar Pokémon, tipos, items...
                        </div>
                    ) : (
                        <div className="px-2">
                            <p className="px-2 py-1 text-xs font-pixel text-muted-foreground mb-1">Pokémon</p>
                            <button
                                onClick={() => handleSelect(query.toLowerCase().trim(), "pokemon")}
                                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-left hover:bg-poke-dark transition-colors"
                            >
                                <Search className="h-4 w-4 text-muted-foreground" />
                                <span>Buscar «{query}» en Pokémon</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
