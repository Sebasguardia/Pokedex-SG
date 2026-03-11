"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { useFilterStore } from "@/lib/store/filter.store";

export default function NotFound() {
    const { pokedexFilters } = useFilterStore();
    const pokedexHref = pokedexFilters ? `/pokemon?${pokedexFilters}` : "/pokemon";
    return (
        <div className="flex min-h-[80vh] flex-col items-center justify-center text-center px-4">
            {/* Pokéball broken SVG */}
            <div className="mb-8 text-[80px] leading-none select-none">⚙️</div>

            <p className="font-pixel text-poke-red text-sm mb-2">Error 404</p>
            <h1 className="text-3xl font-pixel text-white mb-4">¡Página no encontrada!</h1>
            <p className="text-muted-foreground max-w-sm mb-8 text-sm">
                Parece que este Pokémon se escapó... o la página que buscas no existe en nuestra Pokédex.
            </p>

            <div className="flex gap-3">
                <Link href="/">
                    <Button className="gap-2">
                        <Home className="h-4 w-4" />
                        Ir al inicio
                    </Button>
                </Link>
                <Link href={pokedexHref}>
                    <Button variant="outline">Ver Pokédex</Button>
                </Link>
            </div>
        </div>
    );
}
