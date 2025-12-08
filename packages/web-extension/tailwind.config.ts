import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,html}',
    './public/**/*.html',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#007ACC',
          hover: '#0063A5',
        },
        secondary: '#0E639C',
        background: '#0D0D0D',
        foreground: '#CCCCCC',
        card: '#252526',
        border: '#3C3C3C',
        muted: '#888888',
      },
    },
  },
  plugins: [],
};

export default config;
