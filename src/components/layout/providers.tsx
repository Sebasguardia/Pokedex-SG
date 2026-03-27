"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: Infinity,           // PokéAPI data never changes
                        gcTime: 1000 * 60 * 60 * 24,  // Keep in memory 24 hours
                        retry: 2,
                        refetchOnWindowFocus: false,
                        refetchOnMount: false,         // Never refetch if data exists
                        refetchOnReconnect: false,     // Never refetch on reconnect
                    },
                },
            })
    );

    return (
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </ThemeProvider>
    );
}
