import type { Metadata } from "next";
import React from "react";
import "./globals.css";
import { Providers } from "@/components/layout/providers";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageTransition } from "@/components/layout/page-transition";
import { buildMetadata } from "@/lib/utils/metadata.utils";
import { NuqsAdapter } from 'nuqs/adapters/next/app'

export const metadata: Metadata = buildMetadata();

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Nunito:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-nunito min-h-screen antialiased bg-white text-gray-900 selection:bg-poke-red selection:text-white flex flex-col">
        <NuqsAdapter>
          <Providers>
            <Navbar />
            <main className="flex-1 w-full">
              {children}
            </main>
            <Footer />
          </Providers>
        </NuqsAdapter>
      </body>
    </html>
  );
}
