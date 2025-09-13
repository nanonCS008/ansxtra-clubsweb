import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          pink: '#D946EF',
          purple: '#7C3AED',
          blue: '#3B82F6',
          'dark-blue': '#0F172A',
        },
        pink: {
          500: '#D946EF',
          600: '#C026D3',
        },
        purple: {
          500: '#7C3AED',
          600: '#7C3AED',
          700: '#6D28D9',
          900: '#5B21B6',
        },
        blue: {
          500: '#3B82F6',
          600: '#2563EB',
        },
        slate: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
        status: {
          submitted: '#F59E0B',
          'under-review': '#3B82F6',
          accepted: '#10B981',
          rejected: '#EF4444',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-brand': 'linear-gradient(135deg, #D946EF 0%, #7C3AED 50%, #3B82F6 100%)',
        'gradient-brand-reverse': 'linear-gradient(135deg, #3B82F6 0%, #7C3AED 50%, #D946EF 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      boxShadow: {
        'brand': '0 4px 14px 0 rgba(217, 70, 239, 0.15)',
        'brand-lg': '0 10px 25px -3px rgba(124, 58, 237, 0.1), 0 4px 6px -2px rgba(124, 58, 237, 0.05)',
      },
    },
  },
  plugins: [],
}
export default config
