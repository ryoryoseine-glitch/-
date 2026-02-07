import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"] ,
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0b0f1a",
          900: "#111827",
          800: "#1f2937",
          700: "#374151",
          600: "#4b5563",
          500: "#6b7280",
          400: "#9ca3af",
          300: "#d1d5db",
          200: "#e5e7eb",
          100: "#f3f4f6"
        },
        mint: {
          500: "#35b88f",
          600: "#2c9b78"
        }
      }
    }
  },
  plugins: []
};

export default config;
