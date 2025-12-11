import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          50: '#FDF8F3',
          100: '#F5E6D3',
          200: '#E0D5C1',
          300: '#C4A484',
          400: '#A67C52',
          500: '#8B6914',
          600: '#6B4F0F',
          700: '#4A3728',
          800: '#3D2914',
          900: '#1A1A1A',
        },
        gold: {
          300: '#FFE066',
          400: '#FFD700',
          500: '#DAA520',
          600: '#B8860B',
        },
        cream: '#FDF6E3',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Playfair Display', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'Work Sans', '-apple-system', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
