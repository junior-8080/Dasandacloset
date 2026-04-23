import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#C0392B",
          "red-dark": "#922B21",
          "red-light": "#E74C3C",
          orange: "#D35400",
          charcoal: "#1C1C1E",
          "charcoal-light": "#3A3A3C",
          cream: "#FAF8F5",
          "cream-dark": "#F0EDE8",
          gold: "#D4AF37",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(135deg, #C0392B 0%, #D35400 100%)",
        "brand-gradient-dark":
          "linear-gradient(135deg, #922B21 0%, #B7460E 100%)",
      },
      boxShadow: {
        "brand-glow": "0 8px 32px rgba(192, 57, 43, 0.25)",
        "card-hover": "0 20px 60px rgba(0, 0, 0, 0.12)",
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        shimmer: "shimmer 2s infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;