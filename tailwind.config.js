/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366f1',
          dark: '#4f46e5',
        },
        secondary: {
          DEFAULT: '#ec4899',
          dark: '#db2777',
        },
        accent: '#8b5cf6',
        background: '#f9fafb',
        foreground: '#1f2937',
        card: '#ffffff',
        'card-foreground': '#1f2937',
        border: '#e5e7eb',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};