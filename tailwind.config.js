/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  safelist: [
    // Dynamic category colors
    { pattern: /bg-(blue|purple|green|orange|red|teal|violet|pink|cyan|amber|emerald|sky|indigo|lime)-(50|100|200|500|600|700|900)/ },
    { pattern: /text-(blue|purple|green|orange|red|teal|violet|pink|cyan|amber|emerald|sky|indigo|lime)-(300|400|500|600|700|800)/ },
    { pattern: /from-(blue|purple|green|orange|violet|pink|cyan|emerald|sky|indigo)-([456])00/ },
    { pattern: /to-(blue|purple|green|orange|violet|pink|cyan|emerald|sky|indigo)-([456789])00/ },
    { pattern: /ring-(primary|secondary|blue|green|red|yellow|purple|teal)-(400|500)/ },
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd',
          400: '#60a5fa', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8',
          800: '#1e40af', 900: '#1e3a8a', 950: '#172554',
        },
        secondary: {
          50:  '#f0fdfa', 100: '#ccfbf1', 200: '#99f6e4', 300: '#5eead4',
          400: '#2dd4bf', 500: '#14b8a6', 600: '#0d9488', 700: '#0f766e',
          800: '#115e59', 900: '#134e4a',
        },
        accent: {
          50:  '#fff7ed', 100: '#ffedd5', 200: '#fed7aa', 300: '#fdba74',
          400: '#fb923c', 500: '#f97316', 600: '#ea580c', 700: '#c2410c',
          800: '#9a3412', 900: '#7c2d12',
        },
        // Glass design tokens
        glass: {
          white: 'rgba(255,255,255,0.08)',
          dark:  'rgba(15,23,42,0.6)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        // Aurora gradients
        'aurora-blue':   'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'aurora-green':  'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
        'aurora-orange': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'aurora-purple': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'aurora-sunset': 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        'aurora-ocean':  'linear-gradient(135deg, #0575e6 0%, #021b79 100%)',
        // Tool backgrounds
        'tool-primary':  'linear-gradient(135deg, #2563eb 0%, #0d9488 100%)',
        'tool-glass':    'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        'mesh-blue':     'radial-gradient(at 40% 20%, hsla(228,100%,74%,0.4) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(189,100%,56%,0.3) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(355,100%,93%,0.2) 0px, transparent 50%)',
      },
      boxShadow: {
        'glass':        '0 8px 32px rgba(31,38,135,0.15)',
        'glass-hover':  '0 16px 48px rgba(31,38,135,0.25)',
        'tool':         '0 4px 24px rgba(37,99,235,0.12)',
        'tool-hover':   '0 8px 32px rgba(37,99,235,0.2)',
        'result':       '0 2px 12px rgba(0,0,0,0.08)',
        'inner-soft':   'inset 0 2px 4px rgba(0,0,0,0.04)',
        'glow-blue':    '0 0 20px rgba(37,99,235,0.3)',
        'glow-green':   '0 0 20px rgba(13,148,136,0.3)',
        'glow-purple':  '0 0 20px rgba(109,40,217,0.3)',
      },
      backdropBlur: {
        xs: '2px',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      animation: {
        'fade-in':       'fadeIn 0.5s ease-out',
        'fade-in-up':    'fadeInUp 0.5s ease-out',
        'slide-up':      'slideUp 0.4s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
        'pulse-soft':    'pulseSoft 2s ease-in-out infinite',
        'float':         'float 3s ease-in-out infinite',
        'gradient-x':    'gradientX 4s ease infinite',
        'spin-slow':     'spin 3s linear infinite',
        'scale-in':      'scaleIn 0.2s ease-out',
        'shimmer':       'shimmer 1.5s infinite',
      },
      keyframes: {
        fadeIn:        { '0%': { opacity: '0' },                                    '100%': { opacity: '1' } },
        fadeInUp:      { '0%': { opacity: '0', transform: 'translateY(16px)' },     '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideUp:       { '0%': { transform: 'translateY(20px)', opacity: '0' },     '100%': { transform: 'translateY(0)', opacity: '1' } },
        scaleIn:       { '0%': { transform: 'scale(0.95)', opacity: '0' },          '100%': { transform: 'scale(1)', opacity: '1' } },
        pulseSoft:     { '0%,100%': { opacity: '1' },                               '50%': { opacity: '0.7' } },
        float:         { '0%,100%': { transform: 'translateY(0)' },                 '50%': { transform: 'translateY(-8px)' } },
        bounceGentle:  { '0%,20%,50%,80%,100%': { transform: 'translateY(0)' },    '40%': { transform: 'translateY(-8px)' }, '60%': { transform: 'translateY(-4px)' } },
        gradientX:     { '0%,100%': { backgroundPosition: '0% 50%' },              '50%': { backgroundPosition: '100% 50%' } },
        shimmer:       { '0%': { backgroundPosition: '-200% 0' },                   '100%': { backgroundPosition: '200% 0' } },
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
