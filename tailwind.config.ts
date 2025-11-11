import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1400px"
      }
    },
    extend: {
      colors: {
        background: "rgb(var(--color-bg))",
        foreground: "rgb(var(--color-fg))",
        muted: "rgb(var(--color-muted))",
        accent: "rgb(var(--color-accent))",
        brand: "rgb(var(--color-brand))",
        success: "rgb(var(--color-success))",
        warning: "rgb(var(--color-warning))",
        destructive: "rgb(var(--color-destructive))",
        border: "rgba(var(--color-border), <alpha-value>)",
        card: "rgb(var(--color-card))"
      },
      fontFamily: {
        inter: ["var(--font-inter)", "Inter", "sans-serif"],
        display: ["var(--font-playfair)", "Playfair Display", "serif"],
        outfit: ["var(--font-outfit)", "Outfit", "sans-serif"]
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem"
      },
      boxShadow: {
        glass: "0 20px 45px rgba(15, 23, 42, 0.08)",
        card: "0 10px 30px rgba(15, 23, 42, 0.12)"
      }
    }
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        ".glass-panel": {
          background: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(22px)",
          border: "1px solid rgba(255, 255, 255, 0.3)"
        }
      });
    })
  ]
};

export default config;
