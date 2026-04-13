/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "raw.githubusercontent.com",
                pathname: "/PokeAPI/sprites/**",
            },
            {
                protocol: "https",
                hostname: "pokeapi.co",
            },
            {
                protocol: "https",
                hostname: "play.pokemonshowdown.com",
            },
            {
                protocol: "https",
                hostname: "images.wikidexcdn.net",
            },
            {
                protocol: "https",
                hostname: "static.wikia.nocookie.net",
            },
            {
                protocol: "https",
                hostname: "encrypted-tbn0.gstatic.com",
            },
        ],
    },
};

module.exports = nextConfig;
