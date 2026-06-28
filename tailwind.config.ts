import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        sans: ['var(--font-inter'],
      },
      colors: {
        foreground: 'hsl(var(--foreground))',
        background: 'hsl(var(--background))',
        'muted-foreground': 'hsl(var(--muted-foreground))',
        border: 'hsl(var(--border))',
      },
    },
  },
};

export default config;
