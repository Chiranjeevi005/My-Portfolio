import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        light: {
          // Background colors
          bgPrimary: '#FFF9F3',
          bgSecondary: '#FFF3E9',
          bgSurface: '#FFFFFF',
          
          // Text colors
          textPrimary: '#3A2D28',
          textSecondary: '#6E5C55',
          textMuted: '#8A6E64',
          textAccent: '#E85D45',
          textHighlight: '#D7745B',
          
          // Border colors
          border: '#E8D5C8',
          
          // Button colors
          buttonPrimary: '#E85D45',
          buttonHover: '#D94A33',
          buttonText: '#FFFFFF',
          
          // Card colors
          cardBg: '#FFFFFF',
          cardBorder: '#F2E5D9',
          
          // Link colors
          link: '#FF6F61',
          linkHover: '#D94A33',
        },
        dark: {
          // Background colors
          bgPrimary: '#181210',
          bgSecondary: '#1E1614',
          bgSurface: '#241A17',
          
          // Text colors
          textPrimary: '#F6E8D8',
          textSecondary: '#DAB9A0',
          textMuted: '#B8947A',
          textAccent: '#FF8A5C',
          textHighlight: '#FFC48A',
          
          // Border colors
          border: '#3C2E2A',
          
          // Button colors
          buttonPrimary: '#FF8A5C',
          buttonHover: '#FF9966',
          buttonText: '#1E1614',
          
          // Card colors
          cardBg: '#241A17',
          cardBorder: '#3C2E2A',
          
          // Link colors
          link: '#FF9D6E',
          linkHover: '#FFB185',
        },
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        signature: ['var(--font-great-vibes)', 'cursive'], // Using Great Vibes as the signature font
        cookie: ['var(--font-cookie)', 'cursive'], // Keeping Cookie for "Build with intent"
      },
      transitionDuration: {
        DEFAULT: '700ms',
      },
      borderRadius: { 
        xl: '1.25rem' 
      },
      spacing: { 
        '72': '18rem', 
        '84': '21rem', 
        '96': '24rem' 
      },
    },
  },
  plugins: [],
};

export default config;