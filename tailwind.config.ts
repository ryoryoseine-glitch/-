import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2E7D32',
        text: '#212121',
        subtext: '#757575',
        divider: '#EEEEEE'
      },
      boxShadow: {
        card: '0 2px 10px rgba(0,0,0,0.08)'
      }
    }
  },
  plugins: []
};

export default config;
