/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-primary': '#0a0a0f',
        'dark-secondary': '#1a1a2e',
        'dark-tertiary': '#16213e',
        'accent-cyan': '#00d4ff',
        'accent-purple': '#7c3aed',
        'accent-mint': '#64ffda',
        'glass-light': 'rgba(255, 255, 255, 0.05)',
        'glass-medium': 'rgba(255, 255, 255, 0.1)',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'float': 'float 30s linear infinite',
        'pulse-slow': 'pulse 20s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%': { transform: 'translateY(0px) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(-100vh) rotate(360deg)', opacity: '0' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
}