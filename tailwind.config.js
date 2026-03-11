/** @type {import('tailwindcss').Config} */
const config = {
    darkMode: ["class"],
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: { "2xl": "1400px" },
        },
        extend: {
            colors: {
                /* ── Core Pokéball palette ──────────────────── */
                'poke-red': '#CC0000',
                'poke-red-bright': '#E3350D',
                'poke-red-dark': '#990000',
                'poke-black': '#111111',
                'poke-white': '#FFFFFF',

                /* ── Adaptive tokens (switch light↔dark via CSS vars) ── */
                'poke-surface': 'rgb(var(--poke-surface-val) / <alpha-value>)',
                'poke-border': 'rgb(var(--poke-border-val)  / <alpha-value>)',
                'poke-darker': 'rgb(var(--poke-darker-val)  / <alpha-value>)',
                'poke-dark': 'rgb(var(--poke-dark-val)    / <alpha-value>)',

                /* ── Type colors ────────────────────────────── */
                type: {
                    normal: '#A8A878', fire: '#F08030', water: '#6890F0',
                    electric: '#F8D030', grass: '#78C850', ice: '#98D8D8',
                    fighting: '#C03028', poison: '#A040A0', ground: '#E0C068',
                    flying: '#A890F0', psychic: '#F85888', bug: '#A8B820',
                    rock: '#B8A038', ghost: '#705898', dragon: '#7038F8',
                    dark: '#705848', steel: '#B8B8D0', fairy: '#EE99AC',
                },

                /* ── shadcn-ui tokens ──────────────────────── */
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
                secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
                destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
                muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
                accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
                popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
                card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
            },
            fontFamily: {
                pixel: ['"Press Start 2P"', 'cursive'],
                nunito: ['"Nunito"', 'sans-serif'],
                body: ['"Nunito"', 'sans-serif'],
            },
            borderRadius: {
                lg: "var(--radius)", md: "calc(var(--radius) - 2px)", sm: "calc(var(--radius) - 4px)",
            },
            backgroundImage: {
                'pokeball': 'linear-gradient(180deg, #CC0000 0%, #CC0000 47%, #111 47%, #111 53%, #fff 53%, #fff 100%)',
                'poke-hero': 'linear-gradient(135deg, #CC0000 0%, #990000 100%)',
            },
            keyframes: {
                "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
                "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
                "pokeball-spin": { from: { transform: "rotate(0deg)" }, to: { transform: "rotate(360deg)" } },
                "float": { "0%, 100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "pokeball-spin": "pokeball-spin 2s linear infinite",
                "float": "float 3s ease-in-out infinite",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};

module.exports = config;
//
