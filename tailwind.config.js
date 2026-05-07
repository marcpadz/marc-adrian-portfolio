/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        pixel: {
          bg: '#1A1A2E',
          'bg-alt': '#16213E',
          text: '#EAEAEA',
          muted: '#A0A0B5',
          cyan: '#4DEEEA',
          pink: '#FF6AC1',
          amber: '#FF9F1C',
          green: '#2ECC71',
          yellow: '#FFE66D',
          black: '#0A0A0A',
          'black-alt': '#0D0D0D',
          wood: '#8B5A2B',
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'cursive'],
        terminal: ['"VT323"', 'monospace'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "marquee-scroll": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(calc(-1 * var(--marquee-width)))" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "scanline-flicker": {
          "0%": { opacity: "0.95" },
          "100%": { opacity: "1" },
        },
        "steam-rise": {
          "0%": { transform: "translateY(0) scale(1)", opacity: "0.6" },
          "100%": { transform: "translateY(-30px) scale(1.5)", opacity: "0" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 15px rgba(77, 238, 234, 0.3)" },
          "50%": { boxShadow: "0 0 25px rgba(77, 238, 234, 0.6)" },
        },
        "hue-shift": {
          "0%": { filter: "hue-rotate(0deg)" },
          "100%": { filter: "hue-rotate(360deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "marquee": "marquee-scroll 20s linear infinite",
        blink: "blink 1s step-end infinite",
        "scanline-flicker": "scanline-flicker 0.1s infinite",
        "steam-rise": "steam-rise 3s linear infinite",
        "glow-pulse": "glow-pulse 0.8s ease-in-out infinite",
        "hue-shift": "hue-shift 20s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
