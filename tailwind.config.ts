import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'my-primary': {
        '50': '#f5f7fa',
        '100': '#e9ecf5',
        '200': '#ced8e9',
        '300': '#a4b7d5',
        '400': '#7291be',
        '500': '#5173a6',
        '600': '#3e5a8b',
        '700': '#334971',
        '800': '#2d3e5f',
        '900': '#2a3750',
        '950': '#192030',
    },
    'my-accent': {
        '50': '#f0f7ff',
        '100': '#e0effe',
        '200': '#bbdffc',
        '300': '#7fc4fa',
        '400': '#3fa9f5',
        '500': '#128de5',
        '600': '#056ec4',
        '700': '#06579e',
        '800': '#094b83',
        '900': '#0e406c',
        '950': '#092848',
    },
    'my-secondary': {
        '50': '#eff5ff',
        '100': '#dae7ff',
        '200': '#bed6ff',
        '300': '#91bdff',
        '400': '#5d99fd',
        '500': '#3773fa',
        '600': '#2153ef',
        '700': '#193edc',
        '800': '#1b34b2',
        '900': '#1c318c',
        '950': '#161f55',
    },
    'royal-blue': {
        '50': '#f2f5fc',
        '100': '#e1e8f8',
        '200': '#cad6f3',
        '300': '#a5bceb',
        '400': '#7a9ae0',
        '500': '#4f6fd3',
        '600': '#475ec9',
        '700': '#3d4cb8',
        '800': '#374096',
        '900': '#303978',
        '950': '#21254a',
    },
    'my-black': {
        '50': '#f6f7f9',
        '100': '#ededf1',
        '200': '#d6d9e1',
        '300': '#b2b8c7',
        '400': '#8891a8',
        '500': '#6a748d',
        '600': '#545d75',
        '700': '#4b5267',
        '800': '#3c4150',
        '900': '#353945',
        '950': '#23262e',
    },
    
    
    
    
      },
    },
  },
  plugins: [],
};
export default config;
