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
        ],
    },
};

module.exports = nextConfig;
