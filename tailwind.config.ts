import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/**/*.{ts,tsx}", // Asegúrate que escanee tus archivos de Next.js
    ],
    theme: {
        extend: {
        fontFamily: {
            kdam: ['var(--font-kdam)', 'sans-serif'],
            sans: ['var(--font-geist-sans)', 'sans-serif'],
            mono: ['var(--font-geist-mono)', 'monospace'],
        },
        },
    },
    plugins: [],
};

export default config;
