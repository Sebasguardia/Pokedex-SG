import type { Metadata } from "next";

export const siteMetadata = {
    title: "Pokédex Sebas",
    description:
        "La Pokédex más completa del universo Pokémon. Explora todos los Pokémon, tipos, movimientos, habilidades, objetos, bayas, regiones y generaciones con datos de PokéAPI v2.",
    url: "https://pokedex-sebas.vercel.app",
    ogImage: "/og-image.png",
    twitterHandle: "@sebas_dev",
};

export function buildMetadata(overrides: Partial<Metadata> = {}): Metadata {
    return {
        title: {
            default: siteMetadata.title,
            template: `%s | ${siteMetadata.title}`,
        },
        description: siteMetadata.description,
        openGraph: {
            type: "website",
            locale: "es_ES",
            url: siteMetadata.url,
            siteName: siteMetadata.title,
            title: siteMetadata.title,
            description: siteMetadata.description,
            images: [{ url: siteMetadata.ogImage, width: 1200, height: 630, alt: "Pokédex Sebas" }],
        },
        twitter: {
            card: "summary_large_image",
            title: siteMetadata.title,
            description: siteMetadata.description,
            images: [siteMetadata.ogImage],
            creator: siteMetadata.twitterHandle,
        },
        robots: {
            index: true,
            follow: true,
            googleBot: { index: true, follow: true },
        },
        ...overrides,
    };
}
