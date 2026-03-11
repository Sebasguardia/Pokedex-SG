"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import {
    Home,
    Gamepad2,
    Dna,
    Swords,
    Backpack,
    Cherry,
    Map,
    History,
    Scale,
    Heart,
    Zap
} from "lucide-react";

export function Sidebar() {
    const pathname = usePathname();

    const links = [
        { name: "Inicio", href: "/", icon: Home },
        { name: "Pokédex", href: "/pokemon", icon: Gamepad2 },
        { name: "Tipos", href: "/types", icon: Dna },
        { name: "Movimientos", href: "/moves", icon: Swords },
        { name: "Habilidades", href: "/abilities", icon: Zap },
        { name: "Objetos", href: "/items", icon: Backpack },
        { name: "Bayas", href: "/berries", icon: Cherry },
        { name: "Regiones", href: "/locations", icon: Map },
        { name: "Generaciones", href: "/generations", icon: History },
        { name: "Comparador", href: "/compare", icon: Scale },
        { name: "Favoritos", href: "/favorites", icon: Heart },
    ];

    return (
        <aside className="fixed inset-y-0 left-0 z-40 hidden w-56 flex-col bg-white dark:bg-poke-black border-r border-gray-200 dark:border-poke-border/50 xl:flex">
            {/* Spacer for navbar */}
            <div className="h-16 border-b-2 border-poke-black dark:border-poke-border" />
            <div className="flex-1 overflow-auto py-6 custom-scrollbar">
                <nav className="grid gap-1 px-4">
                    <div className="mb-4 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground font-pixel">
                        Explorar
                    </div>

                    {links.slice(0, 9).map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== '/');

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-poke-red text-white"
                                        : "text-gray-600 dark:text-muted-foreground hover:bg-poke-red/10 hover:text-poke-red"
                                )}
                            >
                                <Icon className={cn("h-4 w-4", isActive ? "text-poke-red" : "text-muted-foreground")} />
                                {link.name}
                            </Link>
                        );
                    })}

                    <div className="mb-4 mt-6 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground font-pixel">
                        Herramientas
                    </div>

                    {links.slice(9).map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== '/');

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-poke-red text-white"
                                        : "text-gray-600 dark:text-muted-foreground hover:bg-poke-red/10 hover:text-poke-red"
                                )}
                            >
                                <Icon className={cn("h-4 w-4", isActive ? "text-poke-red" : "text-muted-foreground")} />
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </aside>
    );
}
