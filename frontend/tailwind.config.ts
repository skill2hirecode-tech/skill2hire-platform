import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1E6DCC',
          50: '#E8F1FC',
          100: '#D1E3F9',
          200: '#A3C7F3',
          300: '#75ABED',
          400: '#478FE7',
          500: '#1E6DCC',
          600: '#1857A3',
          700: '#12417A',
          800: '#0C2B51',
          900: '#061528',
        },
        secondary: {
          DEFAULT: '#28A745',
          50: '#E8F7EC',
          100: '#D1EFD9',
          200: '#A3DFB3',
          300: '#75CF8D',
          400: '#47BF67',
          500: '#28A745',
          600: '#208637',
          700: '#186429',
          800: '#10431C',
          900: '#08210E',
        },
        navy: {
          DEFAULT: '#0D2B45',
          50: '#E6EBF0',
          100: '#CDD7E1',
          200: '#9BAFC3',
          300: '#6987A5',
          400: '#375F87',
          500: '#0D2B45',
          600: '#0A2237',
          700: '#081A29',
          800: '#05111C',
          900: '#03090E',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #1E6DCC 0%, #28A745 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0D2B45 0%, #1E6DCC 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
