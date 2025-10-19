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
        lightBg: 'var(--background)',
        darkBg: 'var(--background)',
        accent1Light: 'var(--accent1)',
        accent2Light: 'var(--accent2)',
        accent1Dark: 'var(--accent1)',
        accent2Dark: 'var(--accent2)',
        textPrimaryLight: 'var(--text-primary)',
        textSecondaryLight: 'var(--text-secondary)',
        textPrimaryDark: 'var(--text-primary)',
        textSecondaryDark: 'var(--text-secondary)',
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
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