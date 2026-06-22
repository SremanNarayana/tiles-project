/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50:  '#FDF8EC',
          100: '#FAF0D0',
          200: '#F4DFA0',
          300: '#ECC964',
          400: '#E0B03A',
          500: '#C09B52',
          600: '#A67C35',
          700: '#85602A',
          800: '#654A22',
          900: '#4A3318',
        },
        stone: {
          50:  '#FAFAF9',
          100: '#F5F5F4',
          150: '#F0EDE8',
          200: '#E7E5E4',
          300: '#D6D3D1',
          400: '#A8A29E',
          500: '#78716C',
          600: '#57534E',
          700: '#44403C',
          800: '#292524',
          900: '#1C1917',
          950: '#0C0A09',
        },
        cream: '#F9F4EC',
        /* Ocean theme palette */
        ocean: {
          950: '#010810',
          900: '#020C1B',
          800: '#041228',
          750: '#061A3A',
          700: '#082048',
          600: '#0D2E60',
          500: '#1A4480',
          400: '#2A5F9E',
          300: '#4A82C0',
          200: '#7AAED8',
          100: '#B8D6EE',
          50:  '#E8F4FB',
        },
        cyan: {
          50:  '#ECFEFF',
          100: '#CFFAFE',
          200: '#A5F3FC',
          300: '#67E8F9',
          400: '#22D3EE',
          500: '#06B6D4',
          600: '#0891B2',
          700: '#0E7490',
          800: '#155E75',
          900: '#164E63',
        },
      },
      fontFamily: {
        serif:  ["Cormorant Garamond", "Playfair Display", "Georgia", "serif"],
        display:["Cinzel", "serif"],
        sans:   ["General Sans", "Inter", "sans-serif"],
        tamil:  ["Noto Sans Tamil", "sans-serif"],
      },
      animation: {
        'scroll-x':       'scroll-x 35s linear infinite',
        'float-slow':     'float-slow 8s ease-in-out infinite',
        'shimmer':        'shimmer 2.5s linear infinite',
        'fade-up':        'fade-up 0.7s ease forwards',
        'pulse-soft':     'pulse-soft 3s ease-in-out infinite',
        'spin-slow':      'spin 12s linear infinite',
        /* Wave animations */
        'wave1':          'wave1 9s linear infinite',
        'wave2':          'wave2 13s linear infinite',
        'wave3':          'wave3 7s linear infinite',
        /* Bubble float */
        'bubble':         'bubble 6s ease-in-out infinite',
        'bubble-alt':     'bubble 9s ease-in-out infinite 2s',
        /* 3D floating shapes */
        'float-tile':     'float-tile 5s ease-in-out infinite',
        'float-tile-alt': 'float-tile-alt 6.5s ease-in-out infinite',
        'float-tile-lg':  'float-tile 9s ease-in-out infinite',
        'float-shape':    'float-shape 7s ease-in-out infinite',
      },
      keyframes: {
        'scroll-x': {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-18px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition:  '200% center' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.6' },
        },
        /* Ocean wave keyframes */
        'wave1': {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'wave2': {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(50%)' },
        },
        'wave3': {
          '0%':   { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'bubble': {
          '0%, 100%': { transform: 'translateY(0px) scale(1)', opacity: '0.6' },
          '50%':      { transform: 'translateY(-30px) scale(1.1)', opacity: '0.9' },
        },
        /* Tile shape keyframes */
        'float-tile': {
          '0%, 100%': { transform: 'translateY(0px) rotate(45deg)' },
          '50%':      { transform: 'translateY(-14px) rotate(45deg)' },
        },
        'float-tile-alt': {
          '0%, 100%': { transform: 'translateY(-8px) rotate(45deg)' },
          '50%':      { transform: 'translateY(8px) rotate(45deg)' },
        },
        'float-shape': {
          '0%, 100%': { transform: 'translateY(0px) rotate(30deg) scale(1)' },
          '50%':      { transform: 'translateY(-22px) rotate(34deg) scale(1.04)' },
        },
      },
      boxShadow: {
        'gold':      '0 4px 24px rgba(192, 155, 82, 0.25)',
        'gold-lg':   '0 8px 48px rgba(192, 155, 82, 0.35)',
        'gold-glow': '0 0 0 1px rgba(192,155,82,0.12), 0 4px 24px rgba(192,155,82,0.22), 0 16px 48px rgba(192,155,82,0.10)',
        'soft':      '0 2px 20px rgba(28, 25, 23, 0.06)',
        'card':      '0 4px 40px rgba(28, 25, 23, 0.08)',
        'card-lg':   '0 8px 60px rgba(28, 25, 23, 0.12)',
        'card-3d':    '0 1px 2px rgba(28,25,23,0.04), 0 4px 10px rgba(28,25,23,0.06), 0 14px 32px rgba(28,25,23,0.07), 0 32px 64px rgba(28,25,23,0.04)',
        'card-3d-lg': '0 2px 4px rgba(28,25,23,0.05), 0 8px 20px rgba(28,25,23,0.09), 0 24px 56px rgba(28,25,23,0.11), 0 52px 96px rgba(28,25,23,0.06)',
        'float':      '0 8px 20px rgba(28,25,23,0.09), 0 20px 50px rgba(28,25,23,0.07), 0 44px 88px rgba(28,25,23,0.04)',
        'float-gold': '0 4px 16px rgba(192,155,82,0.20), 0 14px 44px rgba(192,155,82,0.14), 0 32px 72px rgba(192,155,82,0.07)',
        'inset-top':  'inset 0 1px 0 rgba(255,255,255,0.85)',
        /* Ocean glass shadows */
        'ocean-card': '0 4px 24px rgba(2,12,27,0.5), 0 12px 48px rgba(2,12,27,0.3), inset 0 1px 0 rgba(255,255,255,0.08)',
        'ocean-glow': '0 0 0 1px rgba(6,182,212,0.15), 0 4px 24px rgba(6,182,212,0.12), 0 16px 48px rgba(2,12,27,0.4)',
        'cyan-glow':  '0 0 20px rgba(6,182,212,0.3), 0 0 60px rgba(6,182,212,0.15)',
      },
    },
  },
  plugins: [],
}
