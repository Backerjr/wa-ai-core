import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/design-system/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        surface: "var(--surface)",
        "soft-white": "var(--soft-white)",
        primary: "var(--primary)",
        "primary-foreground": "var(--soft-white)",
        secondary: "var(--secondary)",
        "secondary-foreground": "var(--core-black)",
        highlight: "var(--highlight)",
        "signal-green": "var(--signal-green)",
        "alert-red": "var(--alert-red)",
        destructive: "var(--alert-red)",
        "destructive-foreground": "var(--soft-white)",
        accent: "var(--surface)",
        "accent-foreground": "var(--text-primary)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
      },
      spacing: {
        "4": "4px",
        "8": "8px",
        "12": "12px",
        "16": "16px",
        "24": "24px",
        "32": "32px",
        "48": "48px",
      },
      borderRadius: {
        "8": "8px",
        "12": "12px",
        "20": "20px",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        sm: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      fontSize: {
        h1: "2.5rem",
        h2: "2.0rem",
        h3: "1.5rem",
        body: "1.0rem",
        small: "0.875rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
